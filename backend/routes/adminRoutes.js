const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/authorizeRoles");

const adminController = require("../controllers/adminController");
const adminDashboardController = require("../controllers/adminDashboardController");

// ==========================================
// New Admin Dashboard
// ==========================================
router.get(
  "/dashboard",
  verifyToken,
  authorizeRoles("admin", "super_admin"),
  adminDashboardController.getDashboard
);

// ==========================================
// Students
// ==========================================
router.get(
  "/students",
  verifyToken,
  authorizeRoles("admin", "super_admin"),
  adminController.getAllStudents
);

router.delete(
  "/students/:id",
  verifyToken,
  authorizeRoles("admin", "super_admin"),
  adminController.deleteStudent
);

module.exports = router;