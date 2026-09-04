const db = require("../database/db");

// ======================================
// Create Assignment
// ======================================
const createAssignment = (assignment, callback) => {

    const sql = `
        INSERT INTO assignments
        (
            course_id,
            title,
            description,
            due_date,
            total_marks,
            attachment_url
        )
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            assignment.course_id,
            assignment.title,
            assignment.description,
            assignment.due_date,
            assignment.total_marks,
            assignment.attachment_url
        ],
        callback
    );
};

// ======================================
// Get All Assignments
// ======================================
const getAllAssignments = (callback) => {

    const sql = `
        SELECT
            assignments.*,
            courses.title AS course_title
        FROM assignments
        JOIN courses
            ON courses.id = assignments.course_id
        ORDER BY assignments.created_at DESC
    `;

    db.query(sql, callback);
};

// ======================================
// Get Assignments By Course
// ======================================

const getAssignmentsByCourse = (
  courseId,
  callback
) => {

  const sql = `
    SELECT *
    FROM assignments
    WHERE course_id = ?
    ORDER BY due_date ASC
  `;

  db.query(
    sql,
    [courseId],
    callback
  );

};

// ======================================
// Get Assignment By ID
// ======================================
const getAssignmentById = (id, callback) => {

    db.query(
        "SELECT * FROM assignments WHERE id=?",
        [id],
        callback
    );
};

// ======================================
// Update Assignment
// ======================================
const updateAssignment = (id, assignment, callback) => {

    const sql = `
        UPDATE assignments
        SET
            course_id=?,
            title=?,
            description=?,
            due_date=?,
            total_marks=?,
            attachment_url=?
        WHERE id=?
    `;

    db.query(
        sql,
        [
            assignment.course_id,
            assignment.title,
            assignment.description,
            assignment.due_date,
            assignment.total_marks,
            assignment.attachment_url,
            id
        ],
        callback
    );
};

// ======================================
// Delete Assignment
// ======================================
const deleteAssignment = (id, callback) => {

    db.query(
        "DELETE FROM assignments WHERE id=?",
        [id],
        callback
    );
};

module.exports = {

    createAssignment,

    getAllAssignments,

    getAssignmentsByCourse,

    getAssignmentById,

    updateAssignment,

    deleteAssignment

};