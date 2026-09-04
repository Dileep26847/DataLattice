const express = require("express");

const router = express.Router();

const verifyToken =
    require("../middleware/authMiddleware");

const authorizeRoles =
    require("../middleware/roleMiddleware");

const lessonController =
    require("../controllers/lessonController");


// ============================================================
// STUDENT LESSON ROUTES
// ============================================================

// ------------------------------------------------------------
// Get All Lessons Available To Logged-In Student
// ------------------------------------------------------------

router.get(
    "/",
    verifyToken,
    authorizeRoles("student"),
    lessonController.getAllLessons
);


// ------------------------------------------------------------
// Get Lessons By Course
// Student can only access an enrolled/batch course.
// ------------------------------------------------------------

router.get(
    "/course/:courseId",
    verifyToken,
    authorizeRoles("student"),
    lessonController.getLessonsByCourse
);


// ------------------------------------------------------------
// Get Single Lesson
// Student can only access a lesson belonging to a
// course they are enrolled in / assigned to.
// ------------------------------------------------------------

router.get(
    "/:id",
    verifyToken,
    authorizeRoles("student"),
    lessonController.getLessonById
);


module.exports = router;