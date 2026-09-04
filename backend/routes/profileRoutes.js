const express = require("express");

const router = express.Router();

const verifyToken =
    require("../middleware/authMiddleware");

const profileController =
    require("../controllers/profileController");


// ======================================
// Get My Profile
// ======================================

router.get(
    "/me",
    verifyToken,
    profileController.getProfile
);


// ======================================
// Update My Profile
// ======================================

router.put(
    "/me",
    verifyToken,
    profileController.updateProfile
);


module.exports = router;