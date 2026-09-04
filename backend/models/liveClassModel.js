const db = require("../database/db");

// ============================================================
// CREATE LIVE CLASS
// ============================================================

const createLiveClass = (
  liveClass,
  callback
) => {

  const sql = `
    INSERT INTO live_classes
    (
      batch_id,
      title,
      description,
      zoom_link,
      meeting_id,
      meeting_password,
      recording_link,
      class_date,
      start_time,
      end_time,
      status
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      liveClass.batch_id,
      liveClass.title,
      liveClass.description || null,
      liveClass.zoom_link,
      liveClass.meeting_id || null,
      liveClass.meeting_password || null,
      liveClass.recording_link || null,
      liveClass.class_date,
      liveClass.start_time,
      liveClass.end_time || null,
      liveClass.status || "Upcoming",
    ],
    callback
  );

};


// ============================================================
// GET ALL LIVE CLASSES
// Admin / Mentor
// ============================================================

const getAllLiveClasses = (
  callback
) => {

  const sql = `
    SELECT
      live_classes.*,
      batches.batch_name,
      batches.course_id

    FROM live_classes

    JOIN batches
      ON batches.id = live_classes.batch_id

    ORDER BY
      class_date DESC,
      start_time DESC
  `;

  db.query(
    sql,
    callback
  );

};


// ============================================================
// GET LIVE CLASSES FOR STUDENT
// ============================================================

const getLiveClassesForStudent = (
  studentId,
  callback
) => {

  const sql = `
    SELECT DISTINCT
      live_classes.*,
      batches.batch_name,
      batches.course_id

    FROM live_classes

    JOIN batches
      ON batches.id = live_classes.batch_id

    JOIN batch_students
      ON batch_students.batch_id = batches.id

    WHERE
      batch_students.student_id = ?

    ORDER BY
      class_date DESC,
      start_time DESC
  `;

  db.query(
    sql,
    [studentId],
    callback
  );

};


// ============================================================
// GET LIVE CLASS BY ID
// Admin / Mentor
// ============================================================

const getLiveClassById = (
  id,
  callback
) => {

  const sql = `
    SELECT
      live_classes.*,
      batches.batch_name,
      batches.course_id

    FROM live_classes

    JOIN batches
      ON batches.id = live_classes.batch_id

    WHERE
      live_classes.id = ?
  `;

  db.query(
    sql,
    [id],
    callback
  );

};


// ============================================================
// GET LIVE CLASS BY ID FOR STUDENT
// Ownership enforced by SQL
// ============================================================

const getLiveClassByIdForStudent = (
  id,
  studentId,
  callback
) => {

  const sql = `
    SELECT
      live_classes.*,
      batches.batch_name,
      batches.course_id

    FROM live_classes

    JOIN batches
      ON batches.id = live_classes.batch_id

    JOIN batch_students
      ON batch_students.batch_id = batches.id

    WHERE
      live_classes.id = ?
      AND batch_students.student_id = ?
  `;

  db.query(
    sql,
    [
      id,
      studentId
    ],
    callback
  );

};


// ============================================================
// GET CLASSES BY BATCH
// Admin / Mentor
// ============================================================

const getClassesByBatch = (
  batchId,
  callback
) => {

  const sql = `
    SELECT
      live_classes.*,
      batches.batch_name,
      batches.course_id

    FROM live_classes

    JOIN batches
      ON batches.id = live_classes.batch_id

    WHERE
      live_classes.batch_id = ?

    ORDER BY
      class_date DESC,
      start_time DESC
  `;

  db.query(
    sql,
    [batchId],
    callback
  );

};


// ============================================================
// GET CLASSES BY BATCH FOR STUDENT
// ============================================================

const getClassesByBatchForStudent = (
  batchId,
  studentId,
  callback
) => {

  const sql = `
    SELECT
      live_classes.*,
      batches.batch_name,
      batches.course_id

    FROM live_classes

    JOIN batches
      ON batches.id = live_classes.batch_id

    JOIN batch_students
      ON batch_students.batch_id = batches.id

    WHERE
      live_classes.batch_id = ?
      AND batch_students.student_id = ?

    ORDER BY
      class_date DESC,
      start_time DESC
  `;

  db.query(
    sql,
    [
      batchId,
      studentId
    ],
    callback
  );

};


// ============================================================
// GET LIVE CLASS BY ZOOM MEETING ID
//
// Used by Zoom webhook.
//
// Example:
// Zoom meeting ID:
// 84063422888
//
// Finds the corresponding SkillNova live class.
// ============================================================

const getLiveClassByMeetingId = (
  meetingId,
  callback
) => {

  const sql = `
    SELECT
      live_classes.*,
      batches.batch_name,
      batches.course_id

    FROM live_classes

    JOIN batches
      ON batches.id = live_classes.batch_id

    WHERE
      live_classes.meeting_id = ?

    LIMIT 1
  `;

  db.query(
    sql,
    [
      String(meetingId)
    ],
    callback
  );

};


// ============================================================
// UPDATE LIVE CLASS
// ============================================================

const updateLiveClass = (
  id,
  liveClass,
  callback
) => {

  const sql = `
    UPDATE live_classes

    SET
      batch_id = ?,
      title = ?,
      description = ?,
      zoom_link = ?,
      meeting_id = ?,
      meeting_password = ?,
      recording_link = ?,
      class_date = ?,
      start_time = ?,
      end_time = ?,
      status = ?

    WHERE
      id = ?
  `;

  db.query(
    sql,
    [
      liveClass.batch_id,
      liveClass.title,
      liveClass.description || null,
      liveClass.zoom_link,
      liveClass.meeting_id || null,
      liveClass.meeting_password || null,
      liveClass.recording_link || null,
      liveClass.class_date,
      liveClass.start_time,
      liveClass.end_time || null,
      liveClass.status || "Upcoming",
      id,
    ],
    callback
  );

};


// ============================================================
// UPDATE RECORDING LINK
//
// Used by Zoom webhook.
//
// When Zoom sends:
// recording.completed
//
// SkillNova will:
// 1. Save recording URL
// 2. Mark class Completed
// ============================================================

const updateRecordingLink = (
  liveClassId,
  recordingLink,
  callback
) => {

  const sql = `
    UPDATE live_classes

    SET
      recording_link = ?,
      status = 'Completed'

    WHERE
      id = ?
  `;

  db.query(
    sql,
    [
      recordingLink,
      liveClassId
    ],
    callback
  );

};


// ============================================================
// UPDATE RECORDING BY ZOOM MEETING ID
//
// Kept as a useful helper for direct meeting-ID updates.
// ============================================================

const updateRecordingByMeetingId = (
  meetingId,
  recordingLink,
  callback
) => {

  const sql = `
    UPDATE live_classes

    SET
      recording_link = ?,
      status = 'Completed'

    WHERE
      meeting_id = ?
  `;

  db.query(
    sql,
    [
      recordingLink,
      String(meetingId)
    ],
    callback
  );

};


// ============================================================
// DELETE LIVE CLASS
// ============================================================

const deleteLiveClass = (
  id,
  callback
) => {

  db.query(
    "DELETE FROM live_classes WHERE id = ?",
    [id],
    callback
  );

};


// ============================================================
// EXPORT
// ============================================================

module.exports = {

  // Create
  createLiveClass,

  // Get
  getAllLiveClasses,
  getLiveClassesForStudent,
  getLiveClassById,
  getLiveClassByIdForStudent,
  getClassesByBatch,
  getClassesByBatchForStudent,

  // Zoom
  getLiveClassByMeetingId,

  // Update
  updateLiveClass,
  updateRecordingLink,
  updateRecordingByMeetingId,

  // Delete
  deleteLiveClass,

};