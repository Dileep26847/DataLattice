const express = require("express");

const router = express.Router();

const verifyToken =
    require("../middleware/authMiddleware");

const studentSubmissionController =
    require("../controllers/studentSubmissionController");


// ======================================
// Submit Assignment
// ======================================

router.post(
    "/",
    verifyToken,
    studentSubmissionController.submitAssignment
);


// ======================================
// Get My Submission
// ======================================

router.get(
    "/my/assignment/:assignmentId",
    verifyToken,
    studentSubmissionController.getMySubmission
);


module.exports = router;