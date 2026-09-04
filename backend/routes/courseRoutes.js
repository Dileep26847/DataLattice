const express = require("express");

const router = express.Router();

const {
  getCourses,
  searchCourses,
  createCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/courseController");

const verifyToken =
  require("../middleware/authMiddleware");

const authorizeRoles =
  require("../middleware/roleMiddleware");


// ============================================================
// PUBLIC COURSE CATALOGUE
// ============================================================
//
// Anyone can view available courses.
//
// This is intentionally PUBLIC because:
// - Landing page visitors need to browse courses
// - Users should not be forced to login just to see courses
// - Login/enrollment happens later
//
// GET /api/courses
// ============================================================

router.get(
  "/",
  getCourses
);


// ============================================================
// PUBLIC COURSE SEARCH
// ============================================================
//
// Anyone can search the course catalogue.
//
// GET /api/courses/search?q=python
// ============================================================

router.get(
  "/search",
  searchCourses
);


// ============================================================
// CREATE COURSE
// ADMIN ONLY
// ============================================================
//
// POST /api/courses/create-course
// ============================================================

router.post(
  "/create-course",
  verifyToken,
  authorizeRoles("admin"),
  createCourse
);


// ============================================================
// UPDATE COURSE
// ADMIN ONLY
// ============================================================
//
// PUT /api/courses/update-course/:id
// ============================================================

router.put(
  "/update-course/:id",
  verifyToken,
  authorizeRoles("admin"),
  updateCourse
);


// ============================================================
// DELETE COURSE
// ADMIN ONLY
// ============================================================
//
// DELETE /api/courses/delete-course/:id
// ============================================================

router.delete(
  "/delete-course/:id",
  verifyToken,
  authorizeRoles("admin"),
  deleteCourse
);


module.exports = router;