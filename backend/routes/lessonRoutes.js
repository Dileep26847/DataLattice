const express = require("express");

const router = express.Router();

const lessonController =
    require("../controllers/lessonController");

const verifyToken =
    require("../middleware/authMiddleware");

const authorizeRoles =
    require("../middleware/roleMiddleware");


// ======================================
// CREATE LESSON
// ADMIN ONLY
// ======================================

router.post(
    "/",
    verifyToken,
    authorizeRoles("admin"),
    lessonController.createLesson
);


// ======================================
// GET ALL LESSONS
// ADMIN / MENTOR / STUDENT
// ======================================

router.get(
    "/",
    verifyToken,
    authorizeRoles(
        "admin",
        "mentor",
        "student"
    ),
    lessonController.getAllLessons
);


// ======================================
// GET LESSONS BY COURSE
// ADMIN / MENTOR / STUDENT
// ======================================

router.get(
    "/course/:courseId",
    verifyToken,
    authorizeRoles(
        "admin",
        "mentor",
        "student"
    ),
    lessonController.getLessonsByCourse
);


// ======================================
// GET LESSON BY ID
// ADMIN / MENTOR / STUDENT
// ======================================

router.get(
    "/:id",
    verifyToken,
    authorizeRoles(
        "admin",
        "mentor",
        "student"
    ),
    lessonController.getLessonById
);


// ======================================
// UPDATE LESSON
// ADMIN ONLY
// ======================================

router.put(
    "/:id",
    verifyToken,
    authorizeRoles("admin"),
    lessonController.updateLesson
);


// ======================================
// DELETE LESSON
// ADMIN ONLY
// ======================================

router.delete(
    "/:id",
    verifyToken,
    authorizeRoles("admin"),
    lessonController.deleteLesson
);


module.exports = router;