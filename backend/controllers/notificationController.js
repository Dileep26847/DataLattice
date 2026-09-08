const notificationModel =
  require("../models/notificationModel");


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
// GET NOTIFICATIONS
// ==========================================
//
// Returns notifications belonging only to
// the authenticated user.
//
// Supports cursor pagination:
//
// ?limit=20
// ?cursor=<opaque-cursor>
//
// ==========================================

exports.getNotifications = (
  req,
  res
) => {

  const userId =
    req.user.id;


  const limit =
    normalizePageSize(
      req.query.limit
    );


  const cursor =
    typeof req.query.cursor ===
      "string" &&
    req.query.cursor.trim()
      ? req.query.cursor.trim()
      : null;


  notificationModel.getUserNotifications(

    userId,

    {
      limit,

      cursor,

    },

    (
      err,
      result
    ) => {

      if (err) {

        console.error(
          "GET NOTIFICATIONS ERROR:",
          err
        );

        return res.status(500).json({

          success: false,

          message:
            "Failed to load notifications.",

        });

      }


      notificationModel.getUnreadCount(

        userId,

        (
          countError,
          countResult
        ) => {

          if (countError) {

            console.error(
              "GET UNREAD COUNT ERROR:",
              countError
            );

            return res.status(500).json({

              success: false,

              message:
                "Failed to load unread count.",

            });

          }


          const unreadCount =
            Number(
              countResult?.[0]?.unreadCount ||
              0
            );


          return res.status(200).json({

            success: true,

            notifications:
              result?.notifications ||
              [],

            unreadCount:

              Math.max(
                0,
                unreadCount
              ),

            pagination: {

              limit,

              hasMore:
                Boolean(
                  result?.hasMore
                ),

              nextCursor:
                result?.nextCursor ||
                null,

            },

          });

        }

      );

    }

  );

};


// ==========================================
// GET UNREAD COUNT
// ==========================================

exports.getUnreadCount = (
  req,
  res
) => {

  const userId =
    req.user.id;


  notificationModel.getUnreadCount(

    userId,

    (
      err,
      result
    ) => {

      if (err) {

        console.error(
          "UNREAD COUNT ERROR:",
          err
        );

        return res.status(500).json({

          success: false,

          message:
            "Failed to load unread count.",

        });

      }


      const unreadCount =
        Number(
          result?.[0]?.unreadCount ||
          0
        );


      return res.status(200).json({

        success: true,

        unreadCount:

          Math.max(
            0,
            unreadCount
          ),

      });

    }

  );

};


// ==========================================
// CREATE NOTIFICATION
// ==========================================
//
// Admins can create notifications for a
// specific user.
//
// Super Admin is also supported.
//
// The model performs the final database
// insertion and idempotency handling.
//
// ==========================================

exports.createNotification = (
  req,
  res
) => {

  const {
    userId,
    title,
    message,
    type,
    actionUrl,
    sourceType,
    sourceId,
    metadata,
    idempotencyKey,
  } = req.body;


  // ========================================
  // REQUIRED VALUES
  // ========================================

  if (
    !userId ||
    !title ||
    !message
  ) {

    return res.status(400).json({

      success: false,

      message:
        "userId, title and message are required.",

    });

  }


  notificationModel.createNotification(

    userId,

    title,

    message,

    type,

    {

      actionUrl,

      sourceType,

      sourceId,

      metadata,

      idempotencyKey,

    },

    (
      err,
      result
    ) => {

      if (err) {

        console.error(
          "CREATE NOTIFICATION ERROR:",
          err
        );

        return res.status(500).json({

          success: false,

          message:
            "Failed to create notification.",

        });

      }


      return res.status(201).json({

        success: true,

        message:
          "Notification created successfully.",

        notificationId:
          result.insertId,

      });

    }

  );

};


// ==========================================
// MARK AS READ
// ==========================================
//
// Ownership is enforced by the model using:
//
// notification.id + authenticated user.id
//
// ==========================================

exports.markAsRead = (
  req,
  res
) => {

  const notificationId =
    req.params.id;


  const userId =
    req.user.id;


  notificationModel.markAsRead(

    notificationId,

    userId,

    (
      err,
      result
    ) => {

      if (err) {

        console.error(
          "MARK NOTIFICATION READ ERROR:",
          err
        );

        return res.status(500).json({

          success: false,

          message:
            "Failed to mark notification as read.",

        });

      }


      if (
        result.affectedRows === 0
      ) {

        return res.status(404).json({

          success: false,

          message:
            "Notification not found or already read.",

        });

      }


      return res.status(200).json({

        success: true,

        message:
          "Notification marked as read.",

      });

    }

  );

};


// ==========================================
// MARK ALL AS READ
// ==========================================

exports.markAllAsRead = (
  req,
  res
) => {

  const userId =
    req.user.id;


  notificationModel.markAllAsRead(

    userId,

    (
      err,
      result
    ) => {

      if (err) {

        console.error(
          "MARK ALL READ ERROR:",
          err
        );

        return res.status(500).json({

          success: false,

          message:
            "Failed to mark notifications as read.",

        });

      }


      return res.status(200).json({

        success: true,

        message:
          "All notifications marked as read.",

        updatedCount:
          Number(
            result?.affectedRows ||
            0
          ),

      });

    }

  );

};


// ==========================================
// DELETE NOTIFICATION
// ==========================================
//
// Ownership is enforced by:
//
// notification.id + authenticated user.id
//
// ==========================================

exports.deleteNotification = (
  req,
  res
) => {

  const notificationId =
    req.params.id;


  const userId =
    req.user.id;


  notificationModel.deleteNotification(

    notificationId,

    userId,

    (
      err,
      result
    ) => {

      if (err) {

        console.error(
          "DELETE NOTIFICATION ERROR:",
          err
        );

        return res.status(500).json({

          success: false,

          message:
            "Failed to delete notification.",

        });

      }


      if (
        result.affectedRows === 0
      ) {

        return res.status(404).json({

          success: false,

          message:
            "Notification not found.",

        });

      }


      return res.status(200).json({

        success: true,

        message:
          "Notification deleted successfully.",

      });

    }

  );

};


// ==========================================
// EXPORTS
// ==========================================
//
// Existing controller exports are preserved.
//
// ==========================================