const db = require("../database/db");

const getAvailableQuizzes = (studentId, callback) => {
    const sql = `
        SELECT q.id, q.course_id, q.title, q.description, q.time_limit,
               q.total_marks, q.passing_marks, q.status, c.title AS course_name,
               (SELECT COUNT(*) FROM questions WHERE quiz_id = q.id) AS total_questions,
               (SELECT COUNT(*) FROM lessons WHERE course_id = q.course_id) AS total_lessons,
               (SELECT COUNT(*) FROM lesson_progress lp
                WHERE lp.user_id = e.user_id AND lp.course_id = q.course_id AND lp.completed = TRUE) AS completed_lessons
        FROM quizzes q
        INNER JOIN courses c ON c.id = q.course_id
        INNER JOIN enrollments e ON e.course_id = q.course_id AND e.user_id = ?
        WHERE q.status = 'Published'
        ORDER BY q.created_at DESC
    `;
    db.query(sql, [studentId], callback);
};

const getQuizById = (quizId, studentId, callback) => {
    const sql = `
        SELECT q.*
        FROM quizzes q
        INNER JOIN enrollments e ON e.course_id = q.course_id AND e.user_id = ?
        WHERE q.id = ? AND q.status = 'Published'
        LIMIT 1
    `;
    db.query(sql, [studentId, quizId], callback);
};

const getQuizQuestions = (quizId, studentId, callback) => {
    const sql = `
        SELECT q.id, q.quiz_id, q.question, q.option1, q.option2, q.option3, q.option4, q.marks
        FROM questions q
        INNER JOIN quizzes z ON z.id = q.quiz_id
        INNER JOIN enrollments e ON e.course_id = z.course_id AND e.user_id = ?
        WHERE q.quiz_id = ? AND z.status = 'Published'
        ORDER BY q.id ASC
    `;
    db.query(sql, [studentId, quizId], callback);
};

const startQuizAttempt = (data, callback) => {
    const sql = `
        INSERT INTO quiz_attempts (quiz_id, student_id, total_questions, status)
        SELECT q.id, ?, ?, 'Started'
        FROM quizzes q
        INNER JOIN enrollments e ON e.course_id = q.course_id AND e.user_id = ?
        WHERE q.id = ? AND q.status = 'Published'
        LIMIT 1
    `;
    db.query(sql, [data.student_id, data.total_questions, data.student_id, data.quiz_id], callback);
};

const getAttemptForStudent = (attemptId, studentId, callback) => {
    const sql = `
        SELECT qa.id, qa.quiz_id, qa.student_id, qa.status, qa.total_questions,
               qa.correct_answers, qa.wrong_answers, qa.score, qa.total_marks,
               qa.percentage, qa.submitted_at, q.title, q.passing_marks
        FROM quiz_attempts qa
        INNER JOIN quizzes q ON q.id = qa.quiz_id
        WHERE qa.id = ? AND qa.student_id = ?
        LIMIT 1
    `;
    db.query(sql, [attemptId, studentId], callback);
};

const saveQuizAnswers = (answers, callback) => {
    if (!answers.length) return callback(null);
    const sql = `
        INSERT INTO quiz_answers
        (attempt_id, question_id, selected_option, correct_option, is_correct, marks_awarded)
        VALUES ?
    `;
    db.query(sql, [answers], callback);
};

const getCorrectAnswers = (quizId, studentId, callback) => {
    const sql = `
        SELECT q.id, q.correct_option, q.marks
        FROM questions q
        INNER JOIN quizzes z ON z.id = q.quiz_id
        INNER JOIN enrollments e ON e.course_id = z.course_id AND e.user_id = ?
        WHERE q.quiz_id = ? AND z.status = 'Published'
    `;
    db.query(sql, [studentId, quizId], callback);
};

const updateQuizAttempt = (attemptId, studentId, result, callback) => {
    const sql = `
        UPDATE quiz_attempts
        SET correct_answers = ?, wrong_answers = ?, score = ?, total_marks = ?,
            percentage = ?, status = 'Submitted', submitted_at = NOW()
        WHERE id = ? AND student_id = ? AND status = 'Started'
    `;
    db.query(sql, [result.correct, result.wrong, result.score, result.totalMarks, result.percentage, attemptId, studentId], callback);
};

const getQuizResult = (attemptId, studentId, callback) => {
    getAttemptForStudent(attemptId, studentId, callback);
};

module.exports = {
    getAvailableQuizzes,
    getQuizById,
    getQuizQuestions,
    startQuizAttempt,
    getAttemptForStudent,
    saveQuizAnswers,
    getCorrectAnswers,
    updateQuizAttempt,
    getQuizResult,
};