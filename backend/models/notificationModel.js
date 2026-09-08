const db = require("../database/db");

// ==========================================
// NOTIFICATION MODEL
// ==========================================
//
// This model remains callback-based to preserve
// compatibility with the existing notification
// controller and application architecture.
//
// C8.7 enhancements:
// - Cursor-based notification pagination
// - Efficient user-scoped queries
// - Notification action URLs
// - Automation/source metadata
// - Idempotency support
// - Read timestamps
// - Strict user ownership
// - Backward-compatible method signatures
// ==========================================


// ==========================================
// CONSTANTS
// ==========================================

const DEFAULT_PAGE_SIZE = 20;

const MAX_PAGE_SIZE = 50;


// ==========================================
// NORMALIZE PAGE SIZE
// ==========================================

const normalizePageSize = (
  value
) => {

  const parsed =
    Number.parseInt(
      value,
      10
    );

  if (
    Number.isNaN(parsed)
  ) {

    return DEFAULT_PAGE_SIZE;

  }

  return Math.min(
    Math.max(
      parsed,
      1
    ),
    MAX_PAGE_SIZE
  );

};


// ==========================================
// NORMALIZE USER ID
// ==========================================

const normalizeUserId = (
  userId
) => {

  const parsed =
    Number.parseInt(
      userId,
      10
    );

  if (
    Number.isNaN(parsed) ||
    parsed <= 0
  ) {

    return null;

  }

  return parsed;

};


// ==========================================
// NORMALIZE NOTIFICATION ID
// ==========================================

const normalizeNotificationId = (
  notificationId
) => {

  const parsed =
    Number.parseInt(
      notificationId,
      10
    );

  if (
    Number.isNaN(parsed) ||
    parsed <= 0
  ) {

    return null;

  }

  return parsed;

};


// ==========================================
// NORMALIZE CURSOR
// ==========================================
//
// Cursor format:
//
// {
//   createdAt: "2026-09-06 20:30:00",
//   id: 123
// }
//
// The cursor is intentionally opaque to the
// frontend and encoded as Base64.
//
// ==========================================

const decodeCursor = (
  cursor
) => {

  if (
    !cursor ||
    typeof cursor !== "string"
  ) {

    return null;

  }

  try {

    const decoded =
      Buffer
        .from(
          cursor,
          "base64url"
        )
        .toString(
          "utf8"
        );

    const parsed =
      JSON.parse(
        decoded
      );

    if (
      !parsed ||
      typeof parsed !== "object" ||
      !parsed.createdAt ||
      !parsed.id
    ) {

      return null;

    }

    const notificationId =
      normalizeNotificationId(
        parsed.id
      );

    if (!notificationId) {

      return null;

    }

    const createdAt =
      new Date(
        parsed.createdAt
      );

    if (
      Number.isNaN(
        createdAt.getTime()
      )
    ) {

      return null;

    }

    return {

      createdAt:
        parsed.createdAt,

      id:
        notificationId,

    };

  } catch (error) {

    return null;

  }

};


// ==========================================
// ENCODE CURSOR
// ==========================================

const encodeCursor = (
  notification
) => {

  if (
    !notification ||
    !notification.created_at ||
    !notification.id
  ) {

    return null;

  }

  const payload =
    JSON.stringify({

      createdAt:
        notification.created_at,

      id:
        notification.id,

    });

  return Buffer
    .from(
      payload,
      "utf8"
    )
    .toString(
      "base64url"
    );

};


// ==========================================
// GET USER NOTIFICATIONS
// ==========================================
//
// Backward-compatible signatures:
//
// getUserNotifications(
//   userId,
//   callback
// )
//
// OR:
//
// getUserNotifications(
//   userId,
//   options,
//   callback
// )
//
// options:
//
// {
//   limit,
//   cursor
// }
//
// ==========================================

const getUserNotifications = (
  userId,
  optionsOrCallback,
  maybeCallback
) => {

  const normalizedUserId =
    normalizeUserId(
      userId
    );


  let options = {};

  let callback =
    maybeCallback;


  // ========================================
  // BACKWARD COMPATIBILITY
  // ========================================

  if (
    typeof optionsOrCallback ===
    "function"
  ) {

    callback =
      optionsOrCallback;

  } else {

    options =
      optionsOrCallback || {};

  }


  if (
    typeof callback !==
    "function"
  ) {

    return;

  }


  // ========================================
  // VALIDATE USER
  // ========================================

  if (!normalizedUserId) {

    return callback(
      new Error(
        "Invalid user ID."
      )
    );

  }


  // ========================================
  // PAGINATION
  // ========================================

  const limit =
    normalizePageSize(
      options.limit
    );

  const cursor =
    decodeCursor(
      options.cursor
    );


  // ========================================
  // BASE QUERY
  // ========================================

  let sql = `
    SELECT
      id,
      user_id,
      title,
      message,
      type,
      action_url,
      source_type,
      source_id,
      metadata_json,
      is_read,
      read_at,
      created_at
    FROM notifications
    WHERE user_id = ?
  `;

  const params = [
    normalizedUserId,
  ];


  // ========================================
  // CURSOR CONDITION
  // ========================================

  if (cursor) {

    sql += `
      AND (
        created_at < ?
        OR (
          created_at = ?
          AND id < ?
        )
      )
    `;

    params.push(
      cursor.createdAt,
      cursor.createdAt,
      cursor.id
    );

  }


  // ========================================
  // ORDER + LIMIT
  // ========================================

  sql += `
    ORDER BY
      created_at DESC,
      id DESC
    LIMIT ?
  `;

  params.push(
    limit + 1
  );


  // ========================================
  // EXECUTE QUERY
  // ========================================

  db.query(
    sql,
    params,
    (
      error,
      rows
    ) => {

      if (error) {

        return callback(
          error
        );

      }


      // ====================================
      // DETERMINE NEXT PAGE
      // ====================================

      const hasMore =
        rows.length >
        limit;


      const notifications =
        hasMore
          ? rows.slice(
              0,
              limit
            )
          : rows;


      const nextCursor =
        hasMore &&
        notifications.length > 0
          ? encodeCursor(
              notifications[
                notifications.length - 1
              ]
            )
          : null;


      // ====================================
      // PARSE METADATA
      // ====================================

      const normalizedNotifications =
        notifications.map(
          (
            notification
          ) => {

            let metadata =
              notification.metadata_json;


            if (
              typeof metadata ===
              "string"
            ) {

              try {

                metadata =
                  JSON.parse(
                    metadata
                  );

              } catch (
                error
              ) {

                metadata =
                  null;

              }

            }


            return {

              ...notification,

              metadata_json:
                metadata,

            };

          }
        );


      return callback(
        null,
        {

          notifications:
            normalizedNotifications,

          nextCursor,

          hasMore,

        }
      );

    }
  );

};


// ==========================================
// GET UNREAD COUNT
// ==========================================

const getUnreadCount = (
  userId,
  callback
) => {

  const normalizedUserId =
    normalizeUserId(
      userId
    );


  if (!normalizedUserId) {

    return callback(
      new Error(
        "Invalid user ID."
      )
    );

  }


  const sql = `
    SELECT
      COUNT(*) AS unreadCount
    FROM notifications
    WHERE user_id = ?
      AND is_read = FALSE
  `;


  db.query(
    sql,
    [
      normalizedUserId,
    ],
    callback
  );

};


// ==========================================
// CREATE NOTIFICATION
// ==========================================
//
// Backward-compatible signature:
//
// createNotification(
//   userId,
//   title,
//   message,
//   type,
//   callback
// )
//
// Enhanced signature:
//
// createNotification(
//   userId,
//   title,
//   message,
//   type,
//   options,
//   callback
// )
//
// options:
//
// {
//   actionUrl,
//   sourceType,
//   sourceId,
//   metadata,
//   idempotencyKey
// }
//
// ==========================================

const createNotification = (
  userId,
  title,
  message,
  type,
  optionsOrCallback,
  maybeCallback
) => {

  const normalizedUserId =
    normalizeUserId(
      userId
    );


  let options = {};

  let callback =
    maybeCallback;


  // ========================================
  // BACKWARD COMPATIBILITY
  // ========================================

  if (
    typeof optionsOrCallback ===
    "function"
  ) {

    callback =
      optionsOrCallback;

  } else {

    options =
      optionsOrCallback || {};

  }


  if (
    typeof callback !==
    "function"
  ) {

    return;

  }


  // ========================================
  // VALIDATE REQUIRED VALUES
  // ========================================

  if (!normalizedUserId) {

    return callback(
      new Error(
        "Invalid user ID."
      )
    );

  }


  if (
    typeof title !==
      "string" ||
    !title.trim()
  ) {

    return callback(
      new Error(
        "Notification title is required."
      )
    );

  }


  if (
    typeof message !==
      "string" ||
    !message.trim()
  ) {

    return callback(
      new Error(
        "Notification message is required."
      )
    );

  }


  // ========================================
  // NORMALIZE OPTIONAL VALUES
  // ========================================

  const normalizedType =
    typeof type ===
      "string" &&
    type.trim()
      ? type.trim()
      : "system";


  const actionUrl =
    typeof options.actionUrl ===
      "string" &&
    options.actionUrl.trim()
      ? options.actionUrl.trim()
      : null;


  const sourceType =
    typeof options.sourceType ===
      "string" &&
    options.sourceType.trim()
      ? options.sourceType.trim()
      : null;


  const sourceId =
    options.sourceId !==
      undefined &&
    options.sourceId !==
      null &&
    String(
      options.sourceId
    ).trim()
      ? options.sourceId
      : null;


  const metadata =
    options.metadata !==
      undefined &&
    options.metadata !==
      null
      ? JSON.stringify(
          options.metadata
        )
      : null;


  const idempotencyKey =
    typeof options.idempotencyKey ===
      "string" &&
    options.idempotencyKey.trim()
      ? options.idempotencyKey.trim()
      : null;


  // ========================================
  // INSERT
  // ========================================
  //
  // When an idempotency key is supplied,
  // duplicate creation resolves to the
  // existing notification instead of creating
  // another row.
  //
  // ========================================

  const sql = `
    INSERT INTO notifications
    (
      user_id,
      title,
      message,
      type,
      action_url,
      source_type,
      source_id,
      metadata_json,
      idempotency_key
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
      id = LAST_INSERT_ID(id)
  `;


  db.query(
    sql,
    [
      normalizedUserId,
      title.trim(),
      message.trim(),
      normalizedType,
      actionUrl,
      sourceType,
      sourceId,
      metadata,
      idempotencyKey,
    ],
    callback
  );

};


// ==========================================
// MARK ONE AS READ
// ==========================================

const markAsRead = (
  notificationId,
  userId,
  callback
) => {

  const normalizedNotificationId =
    normalizeNotificationId(
      notificationId
    );


  const normalizedUserId =
    normalizeUserId(
      userId
    );


  if (
    !normalizedNotificationId ||
    !normalizedUserId
  ) {

    return callback(
      null,
      {
        affectedRows: 0,
      }
    );

  }


  const sql = `
    UPDATE notifications
    SET
      is_read = TRUE,
      read_at = COALESCE(
        read_at,
        CURRENT_TIMESTAMP
      )
    WHERE id = ?
      AND user_id = ?
      AND is_read = FALSE
  `;


  db.query(
    sql,
    [
      normalizedNotificationId,
      normalizedUserId,
    ],
    callback
  );

};


// ==========================================
// MARK ALL AS READ
// ==========================================

const markAllAsRead = (
  userId,
  callback
) => {

  const normalizedUserId =
    normalizeUserId(
      userId
    );


  if (!normalizedUserId) {

    return callback(
      new Error(
        "Invalid user ID."
      )
    );

  }


  const sql = `
    UPDATE notifications
    SET
      is_read = TRUE,
      read_at = COALESCE(
        read_at,
        CURRENT_TIMESTAMP
      )
    WHERE user_id = ?
      AND is_read = FALSE
  `;


  db.query(
    sql,
    [
      normalizedUserId,
    ],
    callback
  );

};


// ==========================================
// DELETE NOTIFICATION
// ==========================================
//
// Ownership is always enforced by:
//
//   id + user_id
//
// This prevents a student from deleting
// another student's notification even if they
// know the notification ID.
//
// ==========================================

const deleteNotification = (
  notificationId,
  userId,
  callback
) => {

  const normalizedNotificationId =
    normalizeNotificationId(
      notificationId
    );


  const normalizedUserId =
    normalizeUserId(
      userId
    );


  if (
    !normalizedNotificationId ||
    !normalizedUserId
  ) {

    return callback(
      null,
      {
        affectedRows: 0,
      }
    );

  }


  const sql = `
    DELETE FROM notifications
    WHERE id = ?
      AND user_id = ?
  `;


  db.query(
    sql,
    [
      normalizedNotificationId,
      normalizedUserId,
    ],
    callback
  );

};


// ==========================================
// GET NOTIFICATION BY ID
// ==========================================
//
// User ownership is required.
//
// ==========================================

const getNotificationById = (
  notificationId,
  userId,
  callback
) => {

  const normalizedNotificationId =
    normalizeNotificationId(
      notificationId
    );


  const normalizedUserId =
    normalizeUserId(
      userId
    );


  if (
    !normalizedNotificationId ||
    !normalizedUserId
  ) {

    return callback(
      null,
      null
    );

  }


  const sql = `
    SELECT
      id,
      user_id,
      title,
      message,
      type,
      action_url,
      source_type,
      source_id,
      metadata_json,
      is_read,
      read_at,
      created_at
    FROM notifications
    WHERE id = ?
      AND user_id = ?
    LIMIT 1
  `;


  db.query(
    sql,
    [
      normalizedNotificationId,
      normalizedUserId,
    ],
    (
      error,
      rows
    ) => {

      if (error) {

        return callback(
          error
        );

      }


      if (
        !rows ||
        rows.length === 0
      ) {

        return callback(
          null,
          null
        );

      }


      const notification =
        rows[0];


      if (
        typeof notification.metadata_json ===
        "string"
      ) {

        try {

          notification.metadata_json =
            JSON.parse(
              notification.metadata_json
            );

        } catch (
          error
        ) {

          notification.metadata_json =
            null;

        }

      }


      return callback(
        null,
        notification
      );

    }
  );

};


// ==========================================
// GET USER NOTIFICATION COUNTS
// ==========================================

const getUserNotificationCounts = (
  userId,
  callback
) => {

  const normalizedUserId =
    normalizeUserId(
      userId
    );


  if (!normalizedUserId) {

    return callback(
      new Error(
        "Invalid user ID."
      )
    );

  }


  const sql = `
    SELECT
      COUNT(*) AS totalCount,
      SUM(
        CASE
          WHEN is_read = FALSE
          THEN 1
          ELSE 0
        END
      ) AS unreadCount
    FROM notifications
    WHERE user_id = ?
  `;


  db.query(
    sql,
    [
      normalizedUserId,
    ],
    callback
  );

};


// ==========================================
// EXPORTS
// ==========================================

module.exports = {

  getUserNotifications,

  getUnreadCount,

  createNotification,

  markAsRead,

  markAllAsRead,

  deleteNotification,

  getNotificationById,

  getUserNotificationCounts,

};