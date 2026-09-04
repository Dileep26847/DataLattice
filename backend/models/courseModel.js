const db = require("../database/db");

// =====================================
// Get All Courses
// =====================================

const getAllCourses = () => {

  return new Promise((resolve, reject) => {

    const sql = `
      SELECT *
      FROM courses
      ORDER BY id DESC
    `;

    db.query(
      sql,
      (err, results) => {

        if (err) {
          return reject(err);
        }

        resolve(results);

      }
    );

  });

};


// =====================================
// Get Courses Available To Student
// =====================================
// A student can access a course when:
// 1. The student belongs to a batch linked
//    to that course
// OR
// 2. The student has an existing direct
//    enrollment for that course.
//
// DISTINCT prevents duplicate courses
// when both conditions are true.
// =====================================

const getCoursesForStudent = (studentId) => {

  return new Promise((resolve, reject) => {

    const sql = `
      SELECT DISTINCT
        courses.*
      FROM courses

      LEFT JOIN batches
        ON batches.course_id = courses.id

      LEFT JOIN batch_students
        ON batch_students.batch_id = batches.id
        AND batch_students.student_id = ?

      LEFT JOIN enrollments
        ON enrollments.course_id = courses.id
        AND enrollments.user_id = ?

      WHERE
        batch_students.student_id IS NOT NULL
        OR enrollments.user_id IS NOT NULL

      ORDER BY courses.id DESC
    `;

    db.query(
      sql,
      [
        studentId,
        studentId
      ],
      (err, results) => {

        if (err) {
          return reject(err);
        }

        resolve(results);

      }
    );

  });

};


// =====================================
// Create Course
// =====================================

const createCourse = (course) => {

  return new Promise((resolve, reject) => {

    const sql = `
      INSERT INTO courses
      (
        title,
        description,
        price,
        instructor,
        category,
        thumbnail,
        status,
        level,
        duration,
        language,
        is_paid
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
      sql,
      [
        course.title,
        course.description,
        course.price,
        course.instructor,
        course.category,
        course.thumbnail,
        course.status,
        course.level,
        course.duration,
        course.language,
        course.is_paid,
      ],
      (err, result) => {

        if (err) {
          return reject(err);
        }

        resolve(result);

      }
    );

  });

};


// =====================================
// Update Course
// =====================================

const updateCourse = (id, course) => {

  return new Promise((resolve, reject) => {

    const sql = `
      UPDATE courses
      SET
        title = ?,
        description = ?,
        price = ?,
        instructor = ?,
        category = ?,
        thumbnail = ?,
        status = ?,
        level = ?,
        duration = ?,
        language = ?,
        is_paid = ?
      WHERE id = ?
    `;

    db.query(
      sql,
      [
        course.title,
        course.description,
        course.price,
        course.instructor,
        course.category,
        course.thumbnail,
        course.status,
        course.level,
        course.duration,
        course.language,
        course.is_paid,
        id,
      ],
      (err, result) => {

        if (err) {
          return reject(err);
        }

        resolve(result);

      }
    );

  });

};


// =====================================
// Delete Course
// =====================================

const deleteCourse = (id) => {

  return new Promise((resolve, reject) => {

    db.query(
      "DELETE FROM courses WHERE id = ?",
      [id],
      (err, result) => {

        if (err) {
          return reject(err);
        }

        resolve(result);

      }
    );

  });

};


module.exports = {

  getAllCourses,

  getCoursesForStudent,

  createCourse,

  updateCourse,

  deleteCourse,

};