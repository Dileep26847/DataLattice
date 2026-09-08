const express = require("express");

const router = express.Router();

const verifyToken =
  require("../middleware/authMiddleware");

const authorizeRoles =
  require("../middleware/roleMiddleware");

const notificationController =
  require("../controllers/notificationController");


// ==========================================
// GET ALL NOTIFICATIONS
// AUTHENTICATED USERS
// ==========================================
//
// The controller uses req.user.id and the
// model enforces user ownership.
//
// ==========================================

router.get(
  "/",
  verifyToken,
  notificationController.getNotifications
);


// ==========================================
// GET UNREAD COUNT
// AUTHENTICATED USERS
// ==========================================

router.get(
  "/unread-count",
  verifyToken,
  notificationController.getUnreadCount
);


// ==========================================
// CREATE NOTIFICATION
// ADMIN + SUPER ADMIN ONLY
// ==========================================
//
// Administrative creation remains separate
// from automation-generated notifications.
//
// ==========================================

router.post(
  "/",
  verifyToken,
  authorizeRoles(
    "admin",
    "super_admin"
  ),
  notificationController.createNotification
);


// ==========================================
// MARK ALL AS READ
// AUTHENTICATED USERS
// ==========================================
//
// Only notifications belonging to the
// authenticated user are updated.
//
// ==========================================

router.put(
  "/read-all",
  verifyToken,
  notificationController.markAllAsRead
);


// ==========================================
// MARK ONE AS READ
// AUTHENTICATED USERS
// ==========================================
//
// Ownership is enforced in the model using:
//
// notification ID + authenticated user ID
//
// ==========================================

router.put(
  "/:id/read",
  verifyToken,
  notificationController.markAsRead
);


// ==========================================
// DELETE NOTIFICATION
// AUTHENTICATED USERS
// ==========================================
//
// Ownership is enforced in the model.
//
// ==========================================

router.delete(
  "/:id",
  verifyToken,
  notificationController.deleteNotification
);


module.exports = router;