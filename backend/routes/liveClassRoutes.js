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
  authorizeRoles("admin", "mentor", "student"),
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
  authorizeRoles("admin", "mentor", "student"),
  liveClassController.getClassesByBatch
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

// ======================================
// ZOOM WEBHOOK
// Public endpoint
// Zoom calls this endpoint directly.
// ======================================

router.post(
  "/webhook/zoom",
  zoomWebhookController.handleZoomWebhook
);

router.get(
  "/:id",
  verifyToken,
  authorizeRoles("admin", "mentor", "student"),
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

module.exports = router;