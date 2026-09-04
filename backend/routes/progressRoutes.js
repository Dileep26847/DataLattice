const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");
const progressController = require("../controllers/progressController");

// ======================================
// Mark Lesson Complete
// ======================================
router.post(
  "/complete",
  verifyToken,
  progressController.markLessonComplete
);

// ======================================
// Get Completed Lessons
// ======================================
router.get(
  "/completed/:courseId",
  verifyToken,
  progressController.getCompletedLessons
);

// ======================================
// Get Course Progress
// ======================================
router.get(
  "/course/:courseId",
  verifyToken,
  progressController.getCourseProgress
);

// ======================================
// Resume Learning
// ======================================
router.get(
  "/resume/:courseId",
  verifyToken,
  progressController.resumeLearning
);

module.exports = router;