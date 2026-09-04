const db = require("../database/db");

// ======================================
// Get Student Certificates
// ======================================

const getStudentCertificates = (
    studentId,
    callback
) => {

    const sql = `
        SELECT
            certificates.id,
            certificates.student_id,
            certificates.course_id,
            certificates.certificate_number,
            certificates.certificate_date,
            certificates.status,
            courses.title AS course_title,
            users.full_name AS student_name
        FROM certificates
        INNER JOIN courses
            ON courses.id = certificates.course_id
        INNER JOIN users
            ON users.id = certificates.student_id
        WHERE certificates.student_id = ?
        ORDER BY certificates.certificate_date DESC
    `;

    db.query(sql, [studentId], callback);
};


// ======================================
// Get Certificate By ID
// ======================================

const getCertificateById = (
    certificateId,
    callback
) => {

    const sql = `
        SELECT
            certificates.id,
            certificates.student_id,
            certificates.course_id,
            certificates.certificate_number,
            certificates.certificate_date,
            certificates.status,
            courses.title AS course_title,
            users.full_name AS student_name
        FROM certificates
        INNER JOIN courses
            ON courses.id = certificates.course_id
        INNER JOIN users
            ON users.id = certificates.student_id
        WHERE certificates.id = ?
    `;

    db.query(
        sql,
        [certificateId],
        callback
    );
};


// ======================================
// Check Existing Certificate
// ======================================

const getCertificateByStudentCourse = (
    studentId,
    courseId,
    callback
) => {

    const sql = `
        SELECT *
        FROM certificates
        WHERE
            student_id = ?
            AND course_id = ?
        LIMIT 1
    `;

    db.query(
        sql,
        [
            studentId,
            courseId
        ],
        callback
    );
};

// ======================================
// Check Course Eligibility
// ======================================

const checkCourseEligibility = (
    studentId,
    courseId,
    callback
) => {

    const sql = `
        SELECT

            (
                SELECT COUNT(*)
                FROM lessons
                WHERE course_id = ?
            ) AS total_lessons,

            (
                SELECT COUNT(*)
                FROM lesson_progress
                WHERE
                    user_id = ?
                    AND course_id = ?
                    AND completed = TRUE
            ) AS completed_lessons,

            (
                SELECT COUNT(*)
                FROM quiz_attempts qa
                INNER JOIN quizzes q
                    ON q.id = qa.quiz_id
                WHERE
                    qa.student_id = ?
                    AND q.course_id = ?
                    AND qa.status = 'Submitted'
                    AND qa.score >= q.passing_marks
            ) AS passed_quizzes

    `;

    db.query(
        sql,
        [
            courseId,

            studentId,
            courseId,

            studentId,
            courseId
        ],
        callback
    );
};


// ======================================
// Create Certificate
// ======================================

const createCertificate = (
    certificate,
    callback
) => {

    const sql = `
        INSERT INTO certificates
        (
            student_id,
            course_id,
            certificate_number,
            status
        )
        VALUES (?, ?, ?, 'Issued')
    `;

    db.query(
        sql,
        [
            certificate.student_id,
            certificate.course_id,
            certificate.certificate_number
        ],
        callback
    );
};


// ======================================
// Export
// ======================================

module.exports = {

    getStudentCertificates,

    getCertificateById,

    getCertificateByStudentCourse,

    checkCourseEligibility,

    createCertificate

};