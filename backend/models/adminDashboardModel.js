const db = require("../database/db");

// ======================================
// Dashboard Statistics
// ======================================
const getDashboardStats = (callback) => {

  const sql = `
    SELECT
      (SELECT COUNT(*) FROM users WHERE role='student') AS students,
      (SELECT COUNT(*) FROM courses) AS courses,
      (SELECT COUNT(*) FROM support_tickets WHERE status='Open') AS tickets,
      0 AS revenue
  `;

  db.query(sql, callback);

};

// ======================================
// Recent Students
// ======================================
const getRecentStudents = (callback) => {

  db.query(
    `
    SELECT
      id,
      full_name,
      email,
      created_at
    FROM users
    WHERE role='student'
    ORDER BY created_at DESC
    LIMIT 5
    `,
    callback
  );

};

// ======================================
// Recent Courses
// ======================================
const getRecentCourses = (callback) => {

  db.query(
    `
    SELECT
      id,
      title,
      instructor,
      price
    FROM courses
    ORDER BY created_at DESC
    LIMIT 5
    `,
    callback
  );

};

// ======================================
// Recent Tickets
// ======================================
const getRecentTickets = (callback) => {

  db.query(
    `
    SELECT
      support_tickets.id,
      users.full_name,
      support_tickets.category,
      support_tickets.status,
      support_tickets.created_at
    FROM support_tickets
    INNER JOIN users
      ON users.id = support_tickets.student_id
    ORDER BY support_tickets.created_at DESC
    LIMIT 5
    `,
    callback
  );

};

// ======================================
// Student Growth
// ======================================
const getStudentGrowth = (callback) => {

  db.query(
    `
    SELECT
      DATE_FORMAT(created_at,'%b') AS month,
      COUNT(*) AS students
    FROM users
    WHERE role='student'
    GROUP BY MONTH(created_at), DATE_FORMAT(created_at,'%b')
    ORDER BY MONTH(created_at)
    `,
    callback
  );

};

// ======================================
// Course Distribution
// ======================================
const getCourseDistribution = (callback) => {

  db.query(
    `
    SELECT
      category AS name,
      COUNT(*) AS value
    FROM courses
    GROUP BY category
    `,
    callback
  );

};

// ======================================
// Support Analytics
// ======================================
const getSupportAnalytics = (callback) => {

  db.query(
    `
    SELECT
      status,
      COUNT(*) AS total
    FROM support_tickets
    GROUP BY status
    `,
    callback
  );

};

module.exports = {

  getDashboardStats,

  getRecentStudents,

  getRecentCourses,

  getRecentTickets,

  getStudentGrowth,

  getCourseDistribution,

  getSupportAnalytics,

};