const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");
const videoProgressController = require("../controllers/videoProgressController");

// ======================================
// Save Video Progress
// ======================================
router.post(
  "/save",
  verifyToken,
  videoProgressController.saveProgress
);

// ======================================
// Get Saved Video Progress
// ======================================
router.get(
  "/:lessonId",
  verifyToken,
  videoProgressController.getProgress
);

// ======================================
// Mark Video Complete
// ======================================
router.post(
  "/complete",
  verifyToken,
  videoProgressController.completeVideo
);

module.exports = router;