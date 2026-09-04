const express = require("express");

const router = express.Router();

const quizController = require("../controllers/quizController");

// ======================================
// Create Quiz
// ======================================

router.post("/", quizController.createQuiz);

// ======================================
// Get All Quizzes
// ======================================

router.get("/", quizController.getAllQuizzes);

// ======================================
// Get Quiz By ID
// ======================================

router.get("/:id", quizController.getQuizById);

// ======================================
// Update Quiz
// ======================================

router.put("/:id", quizController.updateQuiz);

// ======================================
// Delete Quiz
// ======================================

router.delete("/:id", quizController.deleteQuiz);

module.exports = router;