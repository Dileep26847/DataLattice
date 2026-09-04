const db = require("../database/db");

// ==========================================
// STUDENT REPORT
// ==========================================

exports.getStudentReport = (req, res) => {

    const sql = `
        SELECT
            COUNT(*) AS total_students,

            SUM(
                CASE
                    WHEN role = 'student'
                    THEN 1
                    ELSE 0
                END
            ) AS registered_students

        FROM users

        WHERE role = 'student'
    `;

    db.query(sql, (err, result) => {

        if (err) {

            console.error(
                "STUDENT REPORT ERROR:",
                err
            );

            return res.status(500).json({
                success: false,
                message: err.message
            });

        }

        res.json({

            success: true,

            report: result[0]

        });

    });

};


// ==========================================
// COURSE REPORT
// ==========================================

exports.getCourseReport = (req, res) => {

    const sql = `
        SELECT

            COUNT(*) AS total_courses,

            COALESCE(
                SUM(price),
                0
            ) AS total_course_value

        FROM courses
    `;

    db.query(sql, (err, result) => {

        if (err) {

            console.error(
                "COURSE REPORT ERROR:",
                err
            );

            return res.status(500).json({
                success: false,
                message: err.message
            });

        }

        res.json({

            success: true,

            report: result[0]

        });

    });

};


// ==========================================
// ENROLLMENT REPORT
// ==========================================

exports.getEnrollmentReport = (req, res) => {

    const sql = `
        SELECT

            COUNT(*) AS total_enrollments

        FROM enrollments
    `;

    db.query(sql, (err, result) => {

        if (err) {

            console.error(
                "ENROLLMENT REPORT ERROR:",
                err
            );

            return res.status(500).json({
                success: false,
                message: err.message
            });

        }

        res.json({

            success: true,

            report: result[0]

        });

    });

};


// ==========================================
// COMPLETE REPORT SUMMARY
// ==========================================

exports.getReportSummary = (req, res) => {

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

    db.query(sql, (err, result) => {

        if (err) {

            console.error(
                "REPORT SUMMARY ERROR:",
                err
            );

            return res.status(500).json({
                success: false,
                message: err.message
            });

        }

        res.json({

            success: true,

            summary: result[0]

        });

    });

};