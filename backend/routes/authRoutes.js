const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");


// ================= AUTH ROUTES =================

router.post(
    "/register",
    authController.register
);


router.post(
    "/login",
    authController.login
);


// ================= OTP ROUTES =================

router.post(
    "/otp/request",
    authController.requestOtp
);


router.post(
    "/otp/verify",
    authController.verifyOtp
);


module.exports = router;