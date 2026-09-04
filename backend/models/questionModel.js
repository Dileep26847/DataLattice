const db = require("../database/db");

// ======================================
// Create Question
// ======================================

const createQuestion = (question, callback) => {

    const sql = `
        INSERT INTO questions
        (
            quiz_id,
            question,
            option1,
            option2,
            option3,
            option4,
            correct_option
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            question.quiz_id,
            question.question,
            question.option1,
            question.option2,
            question.option3,
            question.option4,
            question.correct_option
        ],
        callback
    );

};

// ======================================
// Get Questions By Quiz
// ======================================

const getQuestionsByQuiz = (quizId, callback) => {

    db.query(
        `
        SELECT *
        FROM questions
        WHERE quiz_id=?
        ORDER BY id ASC
        `,
        [quizId],
        callback
    );

};

// ======================================
// Get Question By ID
// ======================================

const getQuestionById = (id, callback) => {

    db.query(
        "SELECT * FROM questions WHERE id=?",
        [id],
        callback
    );

};

// ======================================
// Update Question
// ======================================

const updateQuestion = (id, question, callback) => {

    const sql = `
        UPDATE questions
        SET
            question=?,
            option1=?,
            option2=?,
            option3=?,
            option4=?,
            correct_option=?
        WHERE id=?
    `;

    db.query(
        sql,
        [
            question.question,
            question.option1,
            question.option2,
            question.option3,
            question.option4,
            question.correct_option,
            id
        ],
        callback
    );

};

// ======================================
// Delete Question
// ======================================

const deleteQuestion = (id, callback) => {

    db.query(
        "DELETE FROM questions WHERE id=?",
        [id],
        callback
    );

};

module.exports = {

    createQuestion,
    getQuestionsByQuiz,
    getQuestionById,
    updateQuestion,
    deleteQuestion

};