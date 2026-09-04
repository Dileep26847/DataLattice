const db = require("../database/db");

// ======================================
// Create Quiz
// ======================================

const createQuiz = (quiz, callback) => {

    const sql = `
        INSERT INTO quizzes
        (
            course_id,
            title,
            description,
            time_limit,
            passing_marks,
            total_marks,
            status
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            quiz.course_id,
            quiz.title,
            quiz.description,
            quiz.time_limit,
            quiz.passing_marks,
            quiz.total_marks,
            quiz.status
        ],
        callback
    );

};

// ======================================
// Get All Quizzes
// ======================================

const getAllQuizzes = (callback) => {

    const sql = `
        SELECT
            quizzes.*,
            courses.title AS course_title
        FROM quizzes
        JOIN courses
            ON courses.id = quizzes.course_id
        ORDER BY quizzes.created_at DESC
    `;

    db.query(sql, callback);

};

// ======================================
// Get Quiz By ID
// ======================================

const getQuizById = (id, callback) => {

    db.query(
        "SELECT * FROM quizzes WHERE id=?",
        [id],
        callback
    );

};

// ======================================
// Update Quiz
// ======================================

const updateQuiz = (id, quiz, callback) => {

    const sql = `
        UPDATE quizzes
        SET
            course_id=?,
            title=?,
            description=?,
            time_limit=?,
            passing_marks=?,
            total_marks=?,
            status=?
        WHERE id=?
    `;

    db.query(
        sql,
        [
            quiz.course_id,
            quiz.title,
            quiz.description,
            quiz.time_limit,
            quiz.passing_marks,
            quiz.total_marks,
            quiz.status,
            id
        ],
        callback
    );

};

// ======================================
// Delete Quiz
// ======================================

const deleteQuiz = (id, callback) => {

    db.query(
        "DELETE FROM quizzes WHERE id=?",
        [id],
        callback
    );

};

module.exports = {

    createQuiz,
    getAllQuizzes,
    getQuizById,
    updateQuiz,
    deleteQuiz

};