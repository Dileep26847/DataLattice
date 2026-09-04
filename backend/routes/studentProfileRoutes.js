const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const studentProfileController =
  require("../controllers/studentProfileController");

// ======================================
// Create Student Profile
// Admin or Student
// ======================================

router.post(
  "/",
  verifyToken,
  authorizeRoles("admin", "student"),
  studentProfileController.createStudentProfile
);

// ======================================
// Get All Student Profiles
// ADMIN ONLY
// ======================================

router.get(
  "/",
  verifyToken,
  authorizeRoles("admin"),
  studentProfileController.getAllStudentProfiles
);

// ======================================
// Get Student Profile By ID
// Admin or Student
// Ownership checked in controller
// ======================================

router.get(
  "/:id",
  verifyToken,
  authorizeRoles("admin", "student"),
  studentProfileController.getStudentProfileById
);

// ======================================
// Get Profile By User ID
// Admin or Student
// Ownership checked in controller
// ======================================

router.get(
  "/user/:userId",
  verifyToken,
  authorizeRoles("admin", "student"),
  studentProfileController.getProfileByUserId
);

// ======================================
// Update Student Profile
// Admin or Student
// Ownership checked in controller
// ======================================

router.put(
  "/:id",
  verifyToken,
  authorizeRoles("admin", "student"),
  studentProfileController.updateStudentProfile
);

// ======================================
// Delete Student Profile
// Admin or Student
// Ownership checked in controller
// ======================================

router.delete(
  "/:id",
  verifyToken,
  authorizeRoles("admin", "student"),
  studentProfileController.deleteStudentProfile
);

module.exports = router;