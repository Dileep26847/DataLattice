const express = require("express");

const router =
    express.Router();

const zoomWebhookController =
    require("../controllers/zoomWebhookController");


// ============================================================
// ZOOM WEBHOOK
// IMPORTANT:
// NO JWT AUTHENTICATION HERE
// ============================================================

router.post(
    "/",
    zoomWebhookController.handleZoomWebhook
);


module.exports = router;