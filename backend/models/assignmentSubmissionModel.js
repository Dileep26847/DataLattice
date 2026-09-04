const db = require("../database/db");

// ============================================================
// CREATE ASSIGNMENT SUBMISSION
// STUDENT
// ============================================================

const createSubmission = (
    assignmentIdOrData,
    studentId,
    submissionUrl,
    callback
) => {

    let assignmentId;
    let actualStudentId;
    let actualSubmissionUrl;
    let actualCallback;

    // --------------------------------------------------------
    // Support object-based controller call
    // --------------------------------------------------------

    if (
        typeof assignmentIdOrData === "object" &&
        assignmentIdOrData !== null
    ) {

        assignmentId =
            assignmentIdOrData.assignment_id;

        actualStudentId =
            assignmentIdOrData.student_id;

        actualSubmissionUrl =
            assignmentIdOrData.submission_url;

        actualCallback =
            studentId;

    } else {

        assignmentId =
            assignmentIdOrData;

        actualStudentId =
            studentId;

        actualSubmissionUrl =
            submissionUrl;

        actualCallback =
            callback;

    }

    // --------------------------------------------------------
    // Validation
    // --------------------------------------------------------

    if (
        !assignmentId ||
        !actualStudentId ||
        !actualSubmissionUrl
    ) {

        return actualCallback(
            new Error(
                "Assignment ID, Student ID and Submission URL are required."
            )
        );

    }

    // --------------------------------------------------------
    // Insert Submission
    // --------------------------------------------------------

    const sql = `
        INSERT INTO assignment_submissions
        (
            assignment_id,
            student_id,
            submission_url,
            status
        )
        VALUES (?, ?, ?, 'Submitted')
    `;

    db.query(
        sql,
        [
            assignmentId,
            actualStudentId,
            actualSubmissionUrl
        ],
        (err, result) => {

            if (err) {

                console.error(
                    "CREATE SUBMISSION ERROR:",
                    err
                );

                return actualCallback(err);

            }

            return actualCallback(
                null,
                result
            );

        }
    );

};


// ============================================================
// GET ASSIGNMENT FOR STUDENT SUBMISSION
// ============================================================

const getAssignmentForSubmission = (
    assignmentId,
    callback
) => {

    const sql = `
        SELECT
            assignments.id,
            assignments.course_id,
            assignments.title,
            assignments.description,
            assignments.total_marks,
            assignments.due_date,
            assignments.created_at

        FROM assignments

        WHERE assignments.id = ?

        LIMIT 1
    `;

    db.query(
        sql,
        [assignmentId],
        callback
    );

};


// ============================================================
// CHECK EXISTING SUBMISSION
// ============================================================

const checkExistingSubmission = (
    assignmentId,
    studentId,
    callback
) => {

    const sql = `
        SELECT
            id,
            assignment_id,
            student_id,
            submission_url,
            submitted_at,
            marks,
            feedback,
            status

        FROM assignment_submissions

        WHERE
            assignment_id = ?
            AND student_id = ?

        ORDER BY
            submitted_at DESC

        LIMIT 1
    `;

    db.query(
        sql,
        [
            assignmentId,
            studentId
        ],
        callback
    );

};


// ============================================================
// GET MY SUBMISSION
// STUDENT
// ============================================================

const getMySubmission = (
    assignmentId,
    studentId,
    callback
) => {

    const sql = `
        SELECT

            assignment_submissions.id,

            assignment_submissions.assignment_id,

            assignment_submissions.student_id,

            assignment_submissions.submission_url,

            assignment_submissions.submitted_at,

            assignment_submissions.marks,

            assignment_submissions.feedback,

            assignment_submissions.status,

            assignments.title AS assignment_title,

            assignments.description AS assignment_description,

            assignments.total_marks,

            assignments.course_id

        FROM assignment_submissions

        INNER JOIN assignments
            ON assignments.id =
               assignment_submissions.assignment_id

        WHERE
            assignment_submissions.assignment_id = ?

            AND

            assignment_submissions.student_id = ?

        ORDER BY
            assignment_submissions.submitted_at DESC

        LIMIT 1
    `;

    db.query(
        sql,
        [
            assignmentId,
            studentId
        ],
        callback
    );

};


// ============================================================
// GET ALL ASSIGNMENT SUBMISSIONS
// ADMIN
// ============================================================

const getAllSubmissions = (
    callback
) => {

    const sql = `
        SELECT

            assignment_submissions.id,

            assignment_submissions.assignment_id,

            assignment_submissions.student_id,

            assignment_submissions.submission_url,

            assignment_submissions.submitted_at,

            assignment_submissions.marks,

            assignment_submissions.feedback,

            assignment_submissions.status,

            users.full_name AS student_name,

            users.email AS student_email,

            assignments.title AS assignment_title,

            assignments.total_marks,

            courses.title AS course_title

        FROM assignment_submissions

        INNER JOIN users
            ON users.id =
               assignment_submissions.student_id

        INNER JOIN assignments
            ON assignments.id =
               assignment_submissions.assignment_id

        INNER JOIN courses
            ON courses.id =
               assignments.course_id

        ORDER BY
            assignment_submissions.submitted_at DESC
    `;

    db.query(
        sql,
        callback
    );

};


// ============================================================
// GET SUBMISSION BY ID
// ADMIN
// ============================================================

const getSubmissionById = (
    id,
    callback
) => {

    const sql = `
        SELECT

            assignment_submissions.*,

            users.full_name AS student_name,

            users.email AS student_email,

            assignments.title AS assignment_title,

            assignments.description AS assignment_description,

            assignments.total_marks,

            courses.title AS course_title

        FROM assignment_submissions

        INNER JOIN users
            ON users.id =
               assignment_submissions.student_id

        INNER JOIN assignments
            ON assignments.id =
               assignment_submissions.assignment_id

        INNER JOIN courses
            ON courses.id =
               assignments.course_id

        WHERE
            assignment_submissions.id = ?
    `;

    db.query(
        sql,
        [id],
        callback
    );

};


// ============================================================
// GET SUBMISSIONS BY ASSIGNMENT
// ADMIN
// ============================================================

const getSubmissionsByAssignment = (
    assignmentId,
    callback
) => {

    const sql = `
        SELECT

            assignment_submissions.*,

            users.full_name AS student_name,

            users.email AS student_email,

            assignments.title AS assignment_title,

            assignments.total_marks

        FROM assignment_submissions

        INNER JOIN users
            ON users.id =
               assignment_submissions.student_id

        INNER JOIN assignments
            ON assignments.id =
               assignment_submissions.assignment_id

        WHERE
            assignment_submissions.assignment_id = ?

        ORDER BY
            assignment_submissions.submitted_at DESC
    `;

    db.query(
        sql,
        [assignmentId],
        callback
    );

};


// ============================================================
// GRADE SUBMISSION
// ADMIN
// ============================================================

const gradeSubmission = (
    id,
    marks,
    feedback,
    callback
) => {

    const sql = `
        UPDATE assignment_submissions

        SET
            marks = ?,
            feedback = ?,
            status = 'Reviewed'

        WHERE id = ?
    `;

    db.query(
        sql,
        [
            marks,
            feedback,
            id
        ],
        callback
    );

};


// ============================================================
// DELETE SUBMISSION
// ADMIN
// ============================================================

const deleteSubmission = (
    id,
    callback
) => {

    const sql = `
        DELETE FROM assignment_submissions

        WHERE id = ?
    `;

    db.query(
        sql,
        [id],
        callback
    );

};


// ============================================================
// EXPORTS
// ============================================================

module.exports = {

    createSubmission,

    getAssignmentForSubmission,

    checkExistingSubmission,

    getMySubmission,

    getAllSubmissions,

    getSubmissionById,

    getSubmissionsByAssignment,

    gradeSubmission,

    deleteSubmission

};