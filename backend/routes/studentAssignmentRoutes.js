const express = require("express");

const router = express.Router();

const verifyToken =
    require("../middleware/authMiddleware");

const studentAssignmentController =
    require("../controllers/studentAssignmentController");


// ======================================
// STUDENT ASSIGNMENTS
// ======================================

// Get Assignments By Course
router.get(
    "/course/:courseId",
    verifyToken,
    studentAssignmentController.getAssignmentsByCourse
);


// Get Assignment By ID
router.get(
    "/:id",
    verifyToken,
    studentAssignmentController.getAssignmentById
);


module.exports = router;