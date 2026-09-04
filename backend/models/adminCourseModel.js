const db = require("../database/db");

// ==========================================
// Get All Courses
// ==========================================

const getAllCourses = (callback) => {

  const sql = `
    SELECT
      id,
      title,
      description,
      instructor,
      category,
      price,
      thumbnail,
      created_at
    FROM courses
    ORDER BY created_at DESC
  `;

  db.query(sql, callback);

};


// ==========================================
// Get Course By ID
// ==========================================

const getCourseById = (id, callback) => {

  const sql = `
    SELECT
      id,
      title,
      description,
      instructor,
      category,
      price,
      thumbnail,
      created_at
    FROM courses
    WHERE id = ?
  `;

  db.query(
    sql,
    [id],
    callback
  );

};


// ==========================================
// Add Course
// ==========================================

const addCourse = (
  course,
  callback
) => {

  const sql = `
    INSERT INTO courses
    (
      title,
      description,
      instructor,
      category,
      price,
      thumbnail
    )
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      course.title,
      course.description,
      course.instructor,
      course.category,
      course.price,
      course.thumbnail || null,
    ],
    callback
  );

};


// ==========================================
// Update Course
// ==========================================

const updateCourse = (
  id,
  course,
  callback
) => {

  const sql = `
    UPDATE courses
    SET
      title = ?,
      description = ?,
      instructor = ?,
      category = ?,
      price = ?,
      thumbnail = ?
    WHERE id = ?
  `;

  db.query(
    sql,
    [
      course.title,
      course.description,
      course.instructor,
      course.category,
      course.price,
      course.thumbnail || null,
      id,
    ],
    callback
  );

};


// ==========================================
// Delete Course
// ==========================================

const deleteCourse = (
  id,
  callback
) => {

  const sql = `
    DELETE FROM courses
    WHERE id = ?
  `;

  db.query(
    sql,
    [id],
    callback
  );

};


// ==========================================
// Export
// ==========================================

module.exports = {

  getAllCourses,

  getCourseById,

  addCourse,

  updateCourse,

  deleteCourse,

};