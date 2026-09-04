const express = require("express");

const router = express.Router();

const verifyToken =
    require("../middleware/authMiddleware");

const settingsController =
    require("../controllers/settingsController");

// ======================================
// CHANGE PASSWORD
// ======================================

router.put(
    "/change-password",
    verifyToken,
    settingsController.changePassword
);

module.exports = router;