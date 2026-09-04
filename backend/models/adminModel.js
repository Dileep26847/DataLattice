const db = require("../database/db");

// ==========================================
// Total Students
// ==========================================
const getTotalStudents = (callback) => {
  const sql = `
    SELECT COUNT(*) AS totalStudents
    FROM users
    WHERE role = 'student'
  `;

  db.query(sql, callback);
};

// ==========================================
// Total Courses
// ==========================================
const getTotalCourses = (callback) => {
  const sql = `
    SELECT COUNT(*) AS totalCourses
    FROM courses
  `;

  db.query(sql, callback);
};

// ==========================================
// Total Lessons
// ==========================================
const getTotalLessons = (callback) => {
  const sql = `
    SELECT COUNT(*) AS totalLessons
    FROM lessons
  `;

  db.query(sql, callback);
};

// ==========================================
// Total Enrollments
// ==========================================
const getTotalEnrollments = (callback) => {
  const sql = `
    SELECT COUNT(*) AS totalEnrollments
    FROM enrollments
  `;

  db.query(sql, callback);
};

// ==========================================
// Get Dashboard Statistics
// ==========================================
const getDashboardStats = (callback) => {
  getTotalStudents((err, students) => {
    if (err) return callback(err);

    getTotalCourses((err, courses) => {
      if (err) return callback(err);

      getTotalLessons((err, lessons) => {
        if (err) return callback(err);

        getTotalEnrollments((err, enrollments) => {
          if (err) return callback(err);

          callback(null, {
            totalStudents: students[0].totalStudents,
            totalCourses: courses[0].totalCourses,
            totalLessons: lessons[0].totalLessons,
            totalEnrollments: enrollments[0].totalEnrollments,
          });
        });
      });
    });
  });
};

// ==========================================
// Get All Students
// ==========================================
const getAllStudents = (callback) => {
  const sql = `
    SELECT
      id,
      full_name,
      email,
      role,
      created_at
    FROM users
    WHERE role = 'student'
    ORDER BY created_at DESC
  `;

  db.query(sql, callback);
};

// ==========================================
// Delete Student
// ==========================================
const deleteStudent = (id, callback) => {
  const sql = `
    DELETE FROM users
    WHERE id = ?
  `;

  db.query(sql, [id], callback);
};

module.exports = {
  getDashboardStats,
  getAllStudents,
  deleteStudent,
};