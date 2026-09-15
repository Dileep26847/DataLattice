const express = require("express");

const router = express.Router();

const verifyToken =
  require("../middleware/authMiddleware");

const authorizeRoles =
  require("../middleware/roleMiddleware");

const liveClassController =
  require("../controllers/liveClassController");

const zoomWebhookController =
  require("../controllers/zoomWebhookController");


// ======================================
// Create Live Class
// ADMIN ONLY
// ======================================

router.post(
  "/",
  verifyToken,
  authorizeRoles("admin"),
  liveClassController.createLiveClass
);


// ======================================
// Get All Live Classes
// Admin / Mentor / Student
//
// Student receives only their
// authorized batch classes.
// ======================================

router.get(
  "/",
  verifyToken,
  authorizeRoles(
    "admin",
    "mentor",
    "student"
  ),
  liveClassController.getAllLiveClasses
);


// ======================================
// Get Classes By Batch
//
// Student:
//   Only own batch.
//
// Admin / Mentor:
//   Allowed.
// ======================================

router.get(
  "/batch/:batchId",
  verifyToken,
  authorizeRoles(
    "admin",
    "mentor",
    "student"
  ),
  liveClassController.getClassesByBatch
);


// ======================================
// JOIN LIVE CLASS
//
// Student only.
//
// Flow:
//
// Student clicks Join
//       ↓
// Backend verifies student
//       ↓
// Attendance recorded
//       ↓
// Frontend opens Zoom
//
// Current attendance status:
// Present
//
// Future:
// Zoom join/leave events will be
// used for actual duration tracking.
// ======================================

router.post(
  "/:id/join",
  verifyToken,
  authorizeRoles("student"),
  liveClassController.joinLiveClass
);


// ======================================
// ZOOM WEBHOOK
//
// Public endpoint.
// Zoom calls this endpoint directly.
//
// IMPORTANT:
// Keep this route public because Zoom
// does not send our JWT token.
//
// Future attendance integration:
// meeting.participant_joined
// meeting.participant_left
// ======================================

router.post(
  "/webhook/zoom",
  zoomWebhookController.handleZoomWebhook
);


// ======================================
// Get Live Class By ID
//
// Student:
//   Only own batch.
//
// Admin / Mentor:
//   Allowed.
// ======================================

router.get(
  "/:id",
  verifyToken,
  authorizeRoles(
    "admin",
    "mentor",
    "student"
  ),
  liveClassController.getLiveClassById
);


// ======================================
// Update Live Class
// ADMIN ONLY
// ======================================

router.put(
  "/:id",
  verifyToken,
  authorizeRoles("admin"),
  liveClassController.updateLiveClass
);


// ======================================
// Delete Live Class
// ADMIN ONLY
// ======================================

router.delete(
  "/:id",
  verifyToken,
  authorizeRoles("admin"),
  liveClassController.deleteLiveClass
);


// ======================================
// EXPORT
// ======================================

module.exports = router;