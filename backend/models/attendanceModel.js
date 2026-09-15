const db = require("../database/db");

// ============================================================
// RECORD STUDENT JOIN
//
// Current attendance logic:
//
// Student clicks "Join Live Class"
// → create/update attendance
// → status becomes Present
//
// Future Zoom integration can update duration/status using
// the same table without changing the database structure.
// ============================================================

const recordStudentJoin = (
  liveClassId,
  studentId,
  callback
) => {

  const sql = `
    INSERT INTO live_class_attendance
    (
      live_class_id,
      student_id,
      total_duration_seconds,
      current_joined_at,
      last_joined_at,
      status
    )
    VALUES (?, ?, 0, NOW(), NOW(), 'Present')

    ON DUPLICATE KEY UPDATE
      current_joined_at = NOW(),
      last_joined_at = NOW(),
      status = 'Present'
  `;

  db.query(
    sql,
    [
      liveClassId,
      studentId
    ],
    callback
  );

};


// ============================================================
// GET ATTENDANCE FOR STUDENT + LIVE CLASS
// ============================================================

const getStudentAttendance = (
  liveClassId,
  studentId,
  callback
) => {

  const sql = `
    SELECT
      id,
      live_class_id,
      student_id,
      total_duration_seconds,
      current_joined_at,
      last_joined_at,
      last_left_at,
      zoom_participant_id,
      zoom_participant_uuid,
      status,
      created_at,
      updated_at

    FROM live_class_attendance

    WHERE
      live_class_id = ?
      AND student_id = ?

    LIMIT 1
  `;

  db.query(
    sql,
    [
      liveClassId,
      studentId
    ],
    callback
  );

};


// ============================================================
// GET ALL ATTENDANCE FOR STUDENT
// ============================================================

const getStudentAttendanceList = (
  studentId,
  callback
) => {

  const sql = `
    SELECT
      live_class_attendance.*,
      live_classes.title,
      live_classes.class_date,
      live_classes.start_time,
      live_classes.end_time

    FROM live_class_attendance

    JOIN live_classes
      ON live_classes.id =
         live_class_attendance.live_class_id

    WHERE
      live_class_attendance.student_id = ?

    ORDER BY
      live_classes.class_date DESC,
      live_classes.start_time DESC
  `;

  db.query(
    sql,
    [
      studentId
    ],
    callback
  );

};


// ============================================================
// EXPORT
// ============================================================

module.exports = {

  recordStudentJoin,

  getStudentAttendance,

  getStudentAttendanceList,

};