const db = require("../database/db");

// ======================================
// Save Video Progress
// ======================================
const saveVideoProgress = (progress, callback) => {

  const sql = `
    INSERT INTO video_progress
    (
      user_id,
      course_id,
      lesson_id,
      watch_time,
      watched_percentage,
      completed
    )
    VALUES (?, ?, ?, ?, ?, ?)

    ON DUPLICATE KEY UPDATE

      watch_time = VALUES(watch_time),
      watched_percentage = VALUES(watched_percentage),
      completed = VALUES(completed),
      updated_at = CURRENT_TIMESTAMP
  `;

  db.query(
    sql,
    [
      progress.user_id,
      progress.course_id,
      progress.lesson_id,
      progress.watch_time,
      progress.watched_percentage,
      progress.completed,
    ],
    callback
  );

};

// ======================================
// Get Video Progress
// ======================================
const getVideoProgress = (
  userId,
  lessonId,
  callback
) => {

  const sql = `
    SELECT *
    FROM video_progress
    WHERE
      user_id = ?
      AND lesson_id = ?
    LIMIT 1
  `;

  db.query(
    sql,
    [userId, lessonId],
    callback
  );

};

// ======================================
// Mark Video Complete
// ======================================
const markVideoComplete = (
  userId,
  lessonId,
  callback
) => {

  const sql = `
    UPDATE video_progress
    SET
      completed = TRUE,
      watched_percentage = 100,
      updated_at = CURRENT_TIMESTAMP
    WHERE
      user_id = ?
      AND lesson_id = ?
  `;

  db.query(
    sql,
    [userId, lessonId],
    callback
  );

};

module.exports = {

  saveVideoProgress,

  getVideoProgress,

  markVideoComplete,

};