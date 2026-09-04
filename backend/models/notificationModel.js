const db = require("../database/db");

// ==========================================
// GET USER NOTIFICATIONS
// ==========================================

const getUserNotifications = (userId, callback) => {
  const sql = `
    SELECT
      id,
      user_id,
      title,
      message,
      type,
      is_read,
      created_at
    FROM notifications
    WHERE user_id = ?
    ORDER BY created_at DESC
    LIMIT 50
  `;

  db.query(sql, [userId], callback);
};


// ==========================================
// GET UNREAD COUNT
// ==========================================

const getUnreadCount = (userId, callback) => {
  const sql = `
    SELECT COUNT(*) AS unreadCount
    FROM notifications
    WHERE user_id = ?
      AND is_read = FALSE
  `;

  db.query(sql, [userId], callback);
};


// ==========================================
// CREATE NOTIFICATION
// ==========================================

const createNotification = (
  userId,
  title,
  message,
  type,
  callback
) => {
  const sql = `
    INSERT INTO notifications
    (
      user_id,
      title,
      message,
      type
    )
    VALUES (?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      userId,
      title,
      message,
      type || "system",
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
  const sql = `
    UPDATE notifications
    SET is_read = TRUE
    WHERE id = ?
      AND user_id = ?
  `;

  db.query(
    sql,
    [
      notificationId,
      userId,
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
  const sql = `
    UPDATE notifications
    SET is_read = TRUE
    WHERE user_id = ?
      AND is_read = FALSE
  `;

  db.query(
    sql,
    [userId],
    callback
  );
};


// ==========================================
// DELETE NOTIFICATION
// ==========================================

const deleteNotification = (
  notificationId,
  userId,
  callback
) => {
  const sql = `
    DELETE FROM notifications
    WHERE id = ?
      AND user_id = ?
  `;

  db.query(
    sql,
    [
      notificationId,
      userId,
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

};