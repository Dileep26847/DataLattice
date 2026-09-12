const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    startTotpSetup,
    verifyTotpSetup,
    verifyTotp,
    getTotpStatus,
    disableTotp,
} = require("../controllers/totpController");


// ============================================================
// AUTHENTICATOR / TOTP ROUTES
// ============================================================

// Start authenticator setup
router.post(
    "/setup",
    authMiddleware,
    startTotpSetup
);


// Verify the first authenticator code and enable TOTP
router.post(
    "/setup/verify",
    authMiddleware,
    verifyTotpSetup
);


// Verify an already-enabled authenticator code
router.post(
    "/verify",
    authMiddleware,
    verifyTotp
);


// Get current authenticator status
router.get(
    "/status",
    authMiddleware,
    getTotpStatus
);


// Disable authenticator verification
router.delete(
    "/",
    authMiddleware,
    disableTotp
);


module.exports = router;