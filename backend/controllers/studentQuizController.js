const studentQuizModel = require("../models/studentQuizModel");

const sendServerError = (res, err) => res.status(500).json({
    success: false,
    message: process.env.NODE_ENV === "production" ? "Internal server error" : err.message,
});

exports.getAvailableQuizzes = (req, res) => {
    studentQuizModel.getAvailableQuizzes(req.user.id, (err, quizzes) => {
        if (err) return sendServerError(res, err);
        const updatedQuizzes = quizzes.map((quiz) => ({
            ...quiz,
            unlocked: Number(quiz.completed_lessons) >= Number(quiz.total_lessons),
        }));
        return res.json({ success: true, total: updatedQuizzes.length, quizzes: updatedQuizzes });
    });
};

exports.getQuizById = (req, res) => {
    studentQuizModel.getQuizById(req.params.quizId, req.user.id, (err, quiz) => {
        if (err) return sendServerError(res, err);
        if (!quiz.length) return res.status(404).json({ success: false, message: "Quiz Not Found" });
        return res.json({ success: true, quiz: quiz[0] });
    });
};

exports.getQuizQuestions = (req, res) => {
    studentQuizModel.getQuizQuestions(req.params.quizId, req.user.id, (err, questions) => {
        if (err) return sendServerError(res, err);
        return res.json({ success: true, total: questions.length, questions });
    });
};

exports.startQuiz = (req, res) => {
    const { quiz_id, total_questions } = req.body;
    const parsedQuizId = Number(quiz_id);
    const parsedTotal = Number(total_questions);

    if (!Number.isInteger(parsedQuizId) || parsedQuizId <= 0 || !Number.isInteger(parsedTotal) || parsedTotal < 0) {
        return res.status(400).json({ success: false, message: "Valid quiz_id and total_questions are required" });
    }

    studentQuizModel.startQuizAttempt({ quiz_id: parsedQuizId, student_id: req.user.id, total_questions: parsedTotal }, (err, result) => {
        if (err) return sendServerError(res, err);
        if (!result.affectedRows) return res.status(403).json({ success: false, message: "You are not enrolled in this quiz's course" });
        return res.status(201).json({ success: true, attemptId: result.insertId, message: "Quiz Started Successfully" });
    });
};

exports.submitQuiz = (req, res) => {
    const { attemptId, quizId, answers } = req.body;
    const parsedAttemptId = Number(attemptId);
    const parsedQuizId = Number(quizId);

    if (!Number.isInteger(parsedAttemptId) || parsedAttemptId <= 0 || !Number.isInteger(parsedQuizId) || parsedQuizId <= 0 || !Array.isArray(answers)) {
        return res.status(400).json({ success: false, message: "Valid attemptId, quizId and answers are required" });
    }

    studentQuizModel.getAttemptForStudent(parsedAttemptId, req.user.id, (attemptErr, attempts) => {
        if (attemptErr) return sendServerError(res, attemptErr);
        if (!attempts.length) return res.status(404).json({ success: false, message: "Quiz attempt not found" });
        const attempt = attempts[0];
        if (Number(attempt.quiz_id) !== parsedQuizId) return res.status(403).json({ success: false, message: "Attempt does not belong to this quiz" });
        if (attempt.status !== "Started") return res.status(409).json({ success: false, message: "This quiz attempt has already been submitted" });

        studentQuizModel.getCorrectAnswers(parsedQuizId, req.user.id, (err, correctAnswers) => {
            if (err) return sendServerError(res, err);

            let correct = 0;
            let wrong = 0;
            let score = 0;
            let totalMarks = 0;
            const rows = [];

            correctAnswers.forEach((question) => {
                totalMarks += Number(question.marks) || 0;
                const studentAnswer = answers.find((a) => Number(a.question_id) === Number(question.id));
                const selected = studentAnswer ? studentAnswer.selected_option : null;
                const isCorrect = selected !== null && Number(selected) === Number(question.correct_option);
                if (isCorrect) {
                    correct += 1;
                    score += Number(question.marks) || 0;
                } else {
                    wrong += 1;
                }
                rows.push([parsedAttemptId, question.id, selected, question.correct_option, isCorrect ? 1 : 0, isCorrect ? question.marks : 0]);
            });

            const percentage = totalMarks === 0 ? 0 : Number(((score / totalMarks) * 100).toFixed(2));
            const result = { correct, wrong, score, totalMarks, percentage };

            studentQuizModel.saveQuizAnswers(rows, (answerErr) => {
                if (answerErr) return sendServerError(res, answerErr);
                studentQuizModel.updateQuizAttempt(parsedAttemptId, req.user.id, result, (updateErr, updateResult) => {
                    if (updateErr) return sendServerError(res, updateErr);
                    if (!updateResult.affectedRows) return res.status(409).json({ success: false, message: "Quiz attempt could not be submitted" });
                    return res.json({ success: true, result: { attemptId: parsedAttemptId, score, totalMarks, correct, wrong, percentage, status: percentage >= Number(attempt.passing_marks || 40) ? "PASS" : "FAIL" } });
                });
            });
        });
    });
};

exports.getQuizResult = (req, res) => {
    studentQuizModel.getQuizResult(req.params.attemptId, req.user.id, (err, result) => {
        if (err) return sendServerError(res, err);
        if (!result.length) return res.status(404).json({ success: false, message: "Result Not Found" });
        return res.json({ success: true, result: result[0] });
    });
};