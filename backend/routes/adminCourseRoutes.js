const express = require("express");
const router = express.Router();

const adminCourseController =
  require("../controllers/adminCourseController");

const verifyToken =
  require("../middleware/authMiddleware");

const authorizeRoles =
  require("../middleware/roleMiddleware");

// ==========================================
// GET ALL COURSES
// ADMIN ONLY
// ==========================================

router.get(
  "/courses",
  verifyToken,
  authorizeRoles("admin"),
  adminCourseController.getAllCourses
);

// ==========================================
// GET COURSE BY ID
// ADMIN ONLY
// ==========================================

router.get(
  "/courses/:id",
  verifyToken,
  authorizeRoles("admin"),
  adminCourseController.getCourseById
);

// ==========================================
// ADD COURSE
// ADMIN ONLY
// ==========================================

router.post(
  "/courses",
  verifyToken,
  authorizeRoles("admin"),
  adminCourseController.addCourse
);

// ==========================================
// UPDATE COURSE
// ADMIN ONLY
// ==========================================

router.put(
  "/courses/:id",
  verifyToken,
  authorizeRoles("admin"),
  adminCourseController.updateCourse
);

// ==========================================
// DELETE COURSE
// ADMIN ONLY
// ==========================================

router.delete(
  "/courses/:id",
  verifyToken,
  authorizeRoles("admin"),
  adminCourseController.deleteCourse
);

module.exports = router;