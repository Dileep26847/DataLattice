const express = require("express");
const router = express.Router();

const verifyToken =
    require("../middleware/authMiddleware");

const authorizeRoles =
    require("../middleware/roleMiddleware");

const enrollmentController =
    require("../controllers/enrollmentController");

// ===================================
// Enroll Student
// Admin or Student
// ===================================

router.post(
    "/",
    verifyToken,
    authorizeRoles("admin", "student"),
    enrollmentController.enrollStudent
);

// ===================================
// Get User Enrollments
// Admin or Student
// Ownership checked in controller
// ===================================

router.get(
    "/user/:userId",
    verifyToken,
    authorizeRoles("admin", "student"),
    enrollmentController.getUserEnrollments
);

// ===================================
// Get Logged In Student Courses
// Student only
// ===================================

router.get(
    "/my-courses",
    verifyToken,
    authorizeRoles("student"),
    enrollmentController.getMyCourses
);

// ===================================
// Delete Enrollment
// Admin or Student
// Ownership checked in controller
// ===================================

router.delete(
    "/:id",
    verifyToken,
    authorizeRoles("admin", "student"),
    enrollmentController.deleteEnrollment
);

module.exports = router;