const express = require("express");

const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/authorizeRoles");

const assignmentController = require("../controllers/assignmentController");

// ======================================
// Assignment Management
// ADMIN ONLY
// ======================================

// Get All Assignments
router.get(
    "/",
    verifyToken,
    authorizeRoles("admin"),
    assignmentController.getAllAssignments
);

// Create Assignment
router.post(
    "/",
    verifyToken,
    authorizeRoles("admin"),
    assignmentController.createAssignment
);

// Get Assignments By Course
router.get(
    "/course/:courseId",
    verifyToken,
    authorizeRoles("admin"),
    assignmentController.getAssignmentsByCourse
);

// Get Assignment By ID
router.get(
    "/:id",
    verifyToken,
    authorizeRoles("admin"),
    assignmentController.getAssignmentById
);

// Update Assignment
router.put(
    "/:id",
    verifyToken,
    authorizeRoles("admin"),
    assignmentController.updateAssignment
);

// Delete Assignment
router.delete(
    "/:id",
    verifyToken,
    authorizeRoles("admin"),
    assignmentController.deleteAssignment
);

module.exports = router;