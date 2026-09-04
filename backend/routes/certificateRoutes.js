const express = require("express");

const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");

const certificateController = require("../controllers/certificateController");

// ======================================
// Get My Certificates
// ======================================

router.get(
    "/my-certificates",
    verifyToken,
    certificateController.getMyCertificates
);

// ======================================
// Get Certificate By ID
// ======================================

router.get(
    "/:id",
    verifyToken,
    certificateController.getCertificateById
);

// ======================================
// Issue Certificate
// ======================================

router.post(
    "/issue",
    verifyToken,
    certificateController.issueCertificate
);

module.exports = router;