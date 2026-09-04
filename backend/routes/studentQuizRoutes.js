const express = require("express");

const router = express.Router();

const verifyToken =
    require("../middleware/authMiddleware");

const authorizeRoles =
    require("../middleware/authorizeRoles");

const studentQuizController =
    require("../controllers/studentQuizController");


// ======================================
// STUDENT QUIZ ROUTES
// ======================================


// ======================================
// Get Available Quizzes
// GET /api/student/quizzes/:studentId
// ======================================

router.get(
    "/:studentId",
    verifyToken,
    authorizeRoles("student"),
    studentQuizController.getAvailableQuizzes
);


// ======================================
// Get Quiz Details
// GET /api/student/quizzes/quiz/:quizId
// ======================================

router.get(
    "/quiz/:quizId",
    verifyToken,
    authorizeRoles("student"),
    studentQuizController.getQuizById
);


// ======================================
// Get Quiz Questions
// GET /api/student/quizzes/quiz/:quizId/questions
// ======================================

router.get(
    "/quiz/:quizId/questions",
    verifyToken,
    authorizeRoles("student"),
    studentQuizController.getQuizQuestions
);


// ======================================
// Start Quiz
// POST /api/student/quizzes/quiz/start
// ======================================

router.post(
    "/quiz/start",
    verifyToken,
    authorizeRoles("student"),
    studentQuizController.startQuiz
);


// ======================================
// Submit Quiz
// POST /api/student/quizzes/quiz/submit
// ======================================

router.post(
    "/quiz/submit",
    verifyToken,
    authorizeRoles("student"),
    studentQuizController.submitQuiz
);


// ======================================
// Get Quiz Result
// GET /api/student/quizzes/result/:attemptId
// ======================================

router.get(
    "/result/:attemptId",
    verifyToken,
    authorizeRoles("student"),
    studentQuizController.getQuizResult
);


module.exports = router;