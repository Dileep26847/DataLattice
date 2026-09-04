const db = require("../database/db");

// ============================
// Check Enrollment
// ============================

const checkEnrollment = (
    userId,
    courseId,
    callback
) => {

    db.query(
        `
        SELECT id
        FROM enrollments
        WHERE user_id = ?
          AND course_id = ?
        `,
        [
            userId,
            courseId
        ],
        callback
    );

};


// ============================
// Enroll Student
// ============================

const enrollStudent = (
    enrollment,
    callback
) => {

    const sql = `
        INSERT INTO enrollments
        (
            user_id,
            course_id
        )
        VALUES (?, ?)
    `;

    db.query(
        sql,
        [
            enrollment.user_id,
            enrollment.course_id
        ],
        callback
    );

};


// ============================
// Get Courses By User
// ============================

const getUserEnrollments = (
    userId,
    callback
) => {

    const sql = `
        SELECT
            enrollments.id,
            courses.id AS course_id,
            courses.title,
            courses.description,
            courses.thumbnail,
            courses.price,
            enrollments.enrolled_at
        FROM enrollments
        JOIN courses
            ON enrollments.course_id = courses.id
        WHERE enrollments.user_id = ?
        ORDER BY enrollments.enrolled_at DESC
    `;

    db.query(
        sql,
        [
            userId
        ],
        callback
    );

};


// ============================
// Delete Enrollment
// ============================
// Admin use.
// ============================

const deleteEnrollment = (
    id,
    callback
) => {

    db.query(
        `
        DELETE FROM enrollments
        WHERE id = ?
        `,
        [
            id
        ],
        callback
    );

};


// ============================
// Delete Enrollment By User ID
// ============================
// Student ownership use.
// ============================

const deleteEnrollmentByUserId = (
    enrollmentId,
    userId,
    callback
) => {

    db.query(
        `
        DELETE FROM enrollments
        WHERE id = ?
          AND user_id = ?
        `,
        [
            enrollmentId,
            userId
        ],
        callback
    );

};


module.exports = {

    checkEnrollment,

    enrollStudent,

    getUserEnrollments,

    deleteEnrollment,

    deleteEnrollmentByUserId

};