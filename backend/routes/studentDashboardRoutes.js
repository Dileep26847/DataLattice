const express = require("express");

const router = express.Router();

const verifyToken =
    require("../middleware/authMiddleware");

const authorizeRoles =
    require("../middleware/roleMiddleware");

const studentDashboardController =
    require("../controllers/studentDashboardController");


// ============================================================
// STUDENT DASHBOARD STATS
// ============================================================

router.get(

    "/:studentId",

    verifyToken,

    authorizeRoles(
        "student",
        "admin"
    ),

    studentDashboardController.getDashboardStats

);


// ============================================================
// STUDENT COURSES
// ============================================================

router.get(

    "/:studentId/courses",

    verifyToken,

    authorizeRoles(
        "student",
        "admin"
    ),

    studentDashboardController.getMyCourses

);


module.exports = router;