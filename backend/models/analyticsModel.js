const db = require("../database/db");

// ==========================================
// ANALYTICS OVERVIEW
// ==========================================

const getOverviewStats = (callback) => {

    const sql = `
        SELECT

            (
                SELECT COUNT(*)
                FROM users
                WHERE role = 'student'
            ) AS students,

            (
                SELECT COUNT(*)
                FROM courses
            ) AS courses,

            (
                SELECT COUNT(*)
                FROM enrollments
            ) AS enrollments,

            (
                SELECT COUNT(*)
                FROM assignments
            ) AS assignments
    `;

    db.query(sql, callback);
};


// ==========================================
// STUDENT GROWTH
// ==========================================

const getStudentGrowth = (callback) => {

    const sql = `
        SELECT

            DATE_FORMAT(created_at, '%Y-%m') AS month,

            DATE_FORMAT(
                created_at,
                '%b %Y'
            ) AS month_label,

            COUNT(*) AS students

        FROM users

        WHERE role = 'student'

        GROUP BY
            DATE_FORMAT(created_at, '%Y-%m'),
            DATE_FORMAT(created_at, '%b %Y')

        ORDER BY
            DATE_FORMAT(created_at, '%Y-%m')
    `;

    db.query(sql, callback);
};


// ==========================================
// ENROLLMENT GROWTH
// ==========================================
//
// IMPORTANT:
// We previously discovered that your
// enrollments table does NOT contain
// created_at.
//
// Therefore we are NOT using created_at here.
// We will add the correct enrollment date
// after checking the actual table structure.
// ==========================================

const getEnrollmentGrowth = (callback) => {

    const sql = `
        SELECT
            COUNT(*) AS enrollments
        FROM enrollments
    `;

    db.query(sql, callback);
};


// ==========================================
// COURSE DISTRIBUTION
// ==========================================

const getCourseDistribution = (callback) => {

    const sql = `
        SELECT

            COALESCE(category, 'Uncategorized') AS name,

            COUNT(*) AS value

        FROM courses

        GROUP BY category

        ORDER BY value DESC
    `;

    db.query(sql, callback);
};


// ==========================================
// EXPORTS
// ==========================================

module.exports = {

    getOverviewStats,

    getStudentGrowth,

    getEnrollmentGrowth,

    getCourseDistribution,

};