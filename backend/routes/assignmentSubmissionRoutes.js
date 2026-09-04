const express = require("express");

const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/authorizeRoles");

const assignmentSubmissionController =
    require("../controllers/assignmentSubmissionController");

// ======================================
// ADMIN SUBMISSION MANAGEMENT
// ======================================

// Get All Submissions
router.get(
    "/",
    verifyToken,
    authorizeRoles("admin"),
    assignmentSubmissionController.getAllSubmissions
);

// Get Submission By ID
router.get(
    "/:id",
    verifyToken,
    authorizeRoles("admin"),
    assignmentSubmissionController.getSubmissionById
);

// Get Submissions By Assignment
router.get(
    "/assignment/:assignmentId",
    verifyToken,
    authorizeRoles("admin"),
    assignmentSubmissionController.getSubmissionsByAssignment
);

// Grade Submission
router.put(
    "/:id/grade",
    verifyToken,
    authorizeRoles("admin"),
    assignmentSubmissionController.gradeSubmission
);

// Delete Submission
router.delete(
    "/:id",
    verifyToken,
    authorizeRoles("admin"),
    assignmentSubmissionController.deleteSubmission
);

module.exports = router;