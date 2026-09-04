const express = require("express");

const router = express.Router();

const verifyToken =
  require("../middleware/authMiddleware");

const authorizeRoles =
  require("../middleware/roleMiddleware");

const supportController =
  require("../controllers/supportController");

// ==========================================
// STUDENT SUPPORT
// ==========================================

// ------------------------------------------
// Create Ticket
// STUDENT ONLY
// ------------------------------------------

router.post(
  "/",
  verifyToken,
  authorizeRoles("student"),
  supportController.createTicket
);

// ------------------------------------------
// Get My Tickets
// STUDENT ONLY
// ------------------------------------------

router.get(
  "/my",
  verifyToken,
  authorizeRoles("student"),
  supportController.getMyTickets
);

// ==========================================
// ADMIN SUPPORT
// ==========================================

// ------------------------------------------
// Get All Tickets
// ADMIN ONLY
// ------------------------------------------

router.get(
  "/",
  verifyToken,
  authorizeRoles("admin"),
  supportController.getAllTickets
);

// ------------------------------------------
// Get Ticket By ID
// ADMIN ONLY
// ------------------------------------------

router.get(
  "/:id",
  verifyToken,
  authorizeRoles("admin"),
  supportController.getTicketById
);

// ------------------------------------------
// Reply To Ticket
// ADMIN ONLY
// ------------------------------------------

router.put(
  "/:id/reply",
  verifyToken,
  authorizeRoles("admin"),
  supportController.replyTicket
);

module.exports = router;