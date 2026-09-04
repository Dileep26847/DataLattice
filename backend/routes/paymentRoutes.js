const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");

const paymentController = require("../controllers/paymentController");

// ======================================
// Create Razorpay Order
// ======================================
router.post(
  "/create-order",
  verifyToken,
  paymentController.createOrder
);

// ======================================
// Verify Payment
// ======================================
router.post(
  "/verify",
  verifyToken,
  paymentController.verifyPayment
);

// ======================================
// Payment History
// ======================================
router.get(
  "/history",
  verifyToken,
  paymentController.getMyPayments
);

module.exports = router;