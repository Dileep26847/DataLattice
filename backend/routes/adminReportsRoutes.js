const express = require("express");

const router = express.Router();

const verifyToken =
  require("../middleware/authMiddleware");

const authorizeRoles =
  require("../middleware/roleMiddleware");

const adminReportsController =
  require("../controllers/adminReportsController");

// ==========================================
// REPORT SUMMARY
// ADMIN ONLY
// ==========================================

router.get(
  "/summary",
  verifyToken,
  authorizeRoles("admin"),
  adminReportsController.getReportSummary
);

// ==========================================
// STUDENT REPORT
// ADMIN ONLY
// ==========================================

router.get(
  "/students",
  verifyToken,
  authorizeRoles("admin"),
  adminReportsController.getStudentReport
);

// ==========================================
// COURSE REPORT
// ADMIN ONLY
// ==========================================

router.get(
  "/courses",
  verifyToken,
  authorizeRoles("admin"),
  adminReportsController.getCourseReport
);

// ==========================================
// ENROLLMENT REPORT
// ADMIN ONLY
// ==========================================

router.get(
  "/enrollments",
  verifyToken,
  authorizeRoles("admin"),
  adminReportsController.getEnrollmentReport
);

module.exports = router;