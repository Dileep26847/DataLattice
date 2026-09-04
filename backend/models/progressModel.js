const db = require("../database/db");

// ======================================
// Mark Lesson Complete
// ======================================
const markLessonComplete = (progress, callback) => {

  const sql = `
    INSERT INTO lesson_progress
    (
      user_id,
      course_id,
      lesson_id,
      completed
    )
    VALUES (?, ?, ?, TRUE)

    ON DUPLICATE KEY UPDATE

    completed = TRUE,
    completed_at = CURRENT_TIMESTAMP
  `;

  db.query(
    sql,
    [
      progress.user_id,
      progress.course_id,
      progress.lesson_id,
    ],
    callback
  );

};

// ======================================
// Get Completed Lessons
// ======================================
const getCompletedLessons = (userId, courseId, callback) => {

  const sql = `
    SELECT lesson_id
    FROM lesson_progress
    WHERE
      user_id = ?
      AND course_id = ?
      AND completed = TRUE
  `;

  db.query(
    sql,
    [userId, courseId],
    callback
  );

};

// ======================================
// Get Course Progress
// ======================================
const getCourseProgress = (userId, courseId, callback) => {

  const sql = `
    SELECT

      COUNT(lp.lesson_id) AS completedLessons,

      (
        SELECT COUNT(*)
        FROM lessons
        WHERE course_id = ?
      ) AS totalLessons

    FROM lesson_progress lp

    WHERE
      lp.user_id = ?
      AND lp.course_id = ?
      AND lp.completed = TRUE
  `;

  db.query(
    sql,
    [
      courseId,
      userId,
      courseId,
    ],
    callback
  );

};

// ======================================
// Get Next Lesson (Resume Learning)
// ======================================
const getNextLesson = (userId, courseId, callback) => {

  const sql = `
    SELECT
      l.*
    FROM lessons l
    WHERE
      l.course_id = ?
      AND l.id NOT IN (
        SELECT lesson_id
        FROM lesson_progress
        WHERE
          user_id = ?
          AND completed = TRUE
      )
    ORDER BY l.lesson_order ASC
    LIMIT 1
  `;

  db.query(
    sql,
    [
      courseId,
      userId,
    ],
    callback
  );

};

module.exports = {

  markLessonComplete,

  getCompletedLessons,

  getCourseProgress,

  getNextLesson,

};