const express = require("express");

const router = express.Router();

const questionController = require("../controllers/questionController");

// ======================================
// Create
// ======================================

router.post("/", questionController.createQuestion);

// ======================================
// Read
// ======================================

router.get("/quiz/:quizId", questionController.getQuestionsByQuiz);

router.get("/:id", questionController.getQuestionById);

// ======================================
// Update
// ======================================

router.put("/:id", questionController.updateQuestion);

// ======================================
// Delete
// ======================================

router.delete("/:id", questionController.deleteQuestion);

module.exports = router;