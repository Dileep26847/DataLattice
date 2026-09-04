const express = require("express");

const router = express.Router();

const verifyToken =
  require("../middleware/authMiddleware");

const authorizeRoles =
  require("../middleware/roleMiddleware");

const analyticsController =
  require("../controllers/analyticsController");

// ==========================================
// ANALYTICS OVERVIEW
// ADMIN ONLY
// ==========================================

router.get(
  "/overview",
  verifyToken,
  authorizeRoles("admin"),
  analyticsController.getOverview
);

module.exports = router;