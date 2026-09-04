const db = require("../database/db");

// ======================================
// Dashboard Statistics
// ======================================

const getDashboardStats = (callback) => {

    const sql = `

        SELECT

            (SELECT COUNT(*) FROM users WHERE role='student') AS students,

            (SELECT COUNT(*) FROM users WHERE role='mentor') AS mentors,

            (SELECT COUNT(*) FROM courses) AS courses,

            (SELECT COUNT(*) FROM batches) AS batches

    `;

    db.query(sql, callback);

};

// ======================================
// Recent Students
// ======================================

const getRecentStudents = (callback) => {

    const sql = `

        SELECT

            id,

            full_name,

            email,

            created_at

        FROM users

        WHERE role='student'

        ORDER BY created_at DESC

        LIMIT 5

    `;

    db.query(sql, callback);

};

module.exports = {

    getDashboardStats,

    getRecentStudents,

};