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
// ADMIN ONLY
// ==========================================

router.post(
  "/",
  verifyToken,
  authorizeRoles("admin"),
  notificationController.createNotification
);

// ==========================================
// MARK ALL AS READ
// AUTHENTICATED USERS
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

router.put(
  "/:id/read",
  verifyToken,
  notificationController.markAsRead
);

// ==========================================
// DELETE NOTIFICATION
// AUTHENTICATED USERS
// CONTROLLER HANDLES OWNERSHIP
// ==========================================

router.delete(
  "/:id",
  verifyToken,
  notificationController.deleteNotification
);

module.exports = router;