const express = require("express");

const router = express.Router();

const verifyToken =
  require("../middleware/authMiddleware");

const authorizeRoles =
  require("../middleware/roleMiddleware");

const mentorController =
  require("../controllers/mentorController");

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