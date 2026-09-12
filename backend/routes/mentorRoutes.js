const express = require("express");

const router = express.Router();

const verifyToken =
  require("../middleware/authMiddleware");

const authorizeRoles =
  require("../middleware/roleMiddleware");

const mentorController =
  require("../controllers/mentorController");


// ======================================
// PUBLIC MENTOR DIRECTORY
// READ ONLY
// ======================================
//
// This endpoint is intentionally separate
// from the admin mentor-management endpoint.
//
// Public pages must never use:
//
//   /api/admin/mentors
//
// because that endpoint is protected for
// administrative operations.
//
// Only non-sensitive mentor profile fields
// are returned by the public controller.
//

router.get(
  "/public",
  mentorController.getPublicMentors
);


// ======================================
// CREATE MENTOR
// ADMIN ONLY
// ======================================

router.post(
  "/create-mentor",
  verifyToken,
  authorizeRoles("admin"),
  mentorController.createMentor
);


// ======================================
// GET ALL MENTORS
// ADMIN ONLY
// ======================================

router.get(
  "/mentors",
  verifyToken,
  authorizeRoles("admin"),
  mentorController.getMentors
);


// ======================================
// UPDATE MENTOR
// ADMIN ONLY
// ======================================

router.put(
  "/update-mentor/:id",
  verifyToken,
  authorizeRoles("admin"),
  mentorController.updateMentor
);


// ======================================
// DELETE MENTOR
// ADMIN ONLY
// ======================================

router.delete(
  "/delete-mentor/:id",
  verifyToken,
  authorizeRoles("admin"),
  mentorController.deleteMentor
);


module.exports = router;