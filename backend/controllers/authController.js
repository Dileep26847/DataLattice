const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const axios = require("axios");

const userModel = require("../models/userModel");
const otpService = require("../services/otpService");
const signupVerificationService =
    require("../services/signupVerificationService");


// ================= REGISTER =================

exports.register = async (req, res) => {

    try {

        const {
            full_name,
            email,
            phone,
            password,
            verificationToken
        } = req.body;


        if (
            !full_name ||
            !email ||
            !phone ||
            !password ||
            !verificationToken
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Full name, email, phone, password and phone verification are required."

            });

        }


        let normalizedPhone;


        try {

            normalizedPhone =
                otpService.normalizePhoneNumber(
                    phone
                );

        } catch (error) {

            return res.status(400).json({

                success: false,

                message:
                    error.message

            });

        }


        let verification;


        try {

            verification =
                await signupVerificationService
                    .verifyVerificationProof({

                        phone:
                            normalizedPhone,

                        verificationToken,

                    });

        } catch (error) {

            if (
                error.code ===
                "SIGNUP_VERIFICATION_EXPIRED"
            ) {

                return res.status(410).json({

                    success: false,

                    message:
                        error.message

                });

            }


            return res.status(400).json({

                success: false,

                message:
                    error.message

            });

        }


        userModel.findUserByEmail(
            email,
            async (err, users) => {

                try {

                    if (err) {

                        return res.status(500).json({

                            success: false,

                            message:
                                "Unable to complete registration."

                        });

                    }


                    if (
                        users.length > 0
                    ) {

                        return res.status(400).json({

                            success: false,

                            message:
                                "Email already exists."

                        });

                    }


                    userModel.findUserByPhone(
                        normalizedPhone,
                        async (
                            phoneError,
                            phoneUsers
                        ) => {

                            try {

                                if (
                                    phoneError
                                ) {

                                    return res.status(500).json({

                                        success: false,

                                        message:
                                            "Unable to complete registration."

                                    });

                                }


                                if (
                                    phoneUsers.length > 0
                                ) {

                                    return res.status(400).json({

                                        success: false,

                                        message:
                                            "Phone number is already registered."

                                    });

                                }


                                const hashedPassword =
                                    await bcrypt.hash(
                                        password,
                                        10
                                    );


                                userModel.createUser(
                                    {

                                        full_name,

                                        email,

                                        phone:
                                            normalizedPhone,

                                        password:
                                            hashedPassword,

                                        role:
                                            "student",

                                        phone_verified_at:
                                            new Date()

                                    },
                                    async (
                                        createError,
                                        result
                                    ) => {

                                        if (
                                            createError
                                        ) {

                                            console.error(
                                                "Registration error:",
                                                createError.message
                                            );


                                            if (
                                                createError.code ===
                                                "ER_DUP_ENTRY"
                                            ) {

                                                return res.status(409).json({

                                                    success: false,

                                                    message:
                                                        "Email or phone number is already registered."

                                                });

                                            }


                                            return res.status(500).json({

                                                success: false,

                                                message:
                                                    "Unable to complete registration."

                                            });

                                        }


                                        try {

                                            await signupVerificationService
                                                .consumeVerifiedProof(
                                                    verification.verificationId
                                                );

                                        } catch (verificationError) {

                                            console.error(
                                                "Signup verification consumption error:",
                                                verificationError.message
                                            );

                                        }


                                        return res.status(201).json({

                                            success: true,

                                            message:
                                                "Student registered successfully.",

                                            user: {

                                                id:
                                                    result.insertId,

                                                full_name,

                                                email,

                                                phone:
                                                    normalizedPhone,

                                                phone_verified:
                                                    true

                                            }

                                        });

                                    }
                                );

                            } catch (error) {

                                console.error(
                                    "Registration processing error:",
                                    error.message
                                );


                                return res.status(500).json({

                                    success: false,

                                    message:
                                        "Unable to complete registration."

                                });

                            }

                        }
                    );

                } catch (error) {

                    console.error(
                        "Registration processing error:",
                        error.message
                    );


                    return res.status(500).json({

                        success: false,

                        message:
                            "Unable to complete registration."

                    });

                }

            }
        );

    } catch (error) {

        console.error(
            "Registration error:",
            error.message
        );


        return res.status(500).json({

            success: false,

            message:
                "Unable to complete registration."

        });

    }

};


// ================= REQUEST OTP =================
//
// OTP sending is now handled by the MSG91 OTP Widget
// on the frontend.
//
// This endpoint is kept so the existing route does not
// break. The frontend should NOT call this endpoint for
// the new MSG91 signup flow.
//

exports.requestOtp = async (req, res) => {

    return res.status(410).json({

        success: false,

        message:
            "OTP sending is now handled by the MSG91 OTP Widget. Please use the current signup interface."

    });

};


// ================= VERIFY OTP =================
//
// MSG91 OTP Widget flow:
//
// 1. Frontend calls MSG91 sendOtp()
// 2. MSG91 sends the OTP
// 3. User enters OTP
// 4. Frontend calls MSG91 verifyOtp()
// 5. MSG91 returns an access token
// 6. Frontend sends phone + OTP + accessToken here
// 7. Backend verifies the access token with MSG91
// 8. DataLattice creates its own verification proof
//
// The MSG91 AuthKey NEVER goes to the frontend.
//

exports.verifyOtp = async (req, res) => {

    try {

        const {
            phone,
            otp,
            accessToken
        } = req.body;


        if (
            !phone ||
            !otp ||
            !accessToken
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Phone number, OTP and MSG91 access token are required"

            });

        }


        // ----------------------------------------------------
        // Normalize phone number using the existing
        // DataLattice OTP service.
        // ----------------------------------------------------

        let normalizedPhone;


        try {

            normalizedPhone =
                otpService.normalizePhoneNumber(
                    phone
                );

        } catch (error) {

            return res.status(400).json({

                success: false,

                message:
                    error.message

            });

        }


        // ----------------------------------------------------
        // MSG91 AuthKey must exist on the backend.
        // ----------------------------------------------------

        const authKey =
            process.env.MSG91_AUTHKEY;


        if (!authKey) {

            console.error(
                "MSG91_AUTHKEY is not configured."
            );


            return res.status(500).json({

                success: false,

                message:
                    "MSG91 OTP verification is not configured on the server."

            });

        }


        // ----------------------------------------------------
        // Verify MSG91 Widget access token.
        // ----------------------------------------------------

        let msg91Response;


        try {

            msg91Response =
                await axios.post(

                    "https://control.msg91.com/api/v5/widget/verifyAccessToken",

                    new URLSearchParams({

                        authkey:
                            authKey,

                        "access-token":
                            accessToken

                    }).toString(),

                    {

                        headers: {

                            "Content-Type":
                                "application/x-www-form-urlencoded"

                        },

                        timeout:
                            15000

                    }

                );

        } catch (error) {

            console.error(

                "MSG91 access-token verification failed:",

                error.response?.data ||
                error.message

            );


            return res.status(401).json({

                success: false,

                message:
                    "MSG91 could not verify the OTP. Please try again."

            });

        }


        const providerData =
            msg91Response?.data || {};


        // ----------------------------------------------------
        // Check MSG91 response.
        //
        // MSG91 widget/API responses can differ depending
        // on the current widget/API version, so handle the
        // common successful response formats.
        // ----------------------------------------------------

        const providerType =
            String(
                providerData?.type || ""
            ).toLowerCase();


        const providerMessage =
            String(
                providerData?.message || ""
            ).toLowerCase();


        const providerSucceeded =

            providerType ===
            "success"

            ||

            providerData?.success ===
            true

            ||

            (
                msg91Response.status >=
                    200 &&

                msg91Response.status <
                    300 &&

                !providerData?.error &&

                !providerData?.errors &&

                (
                    providerMessage.includes(
                        "success"
                    )

                    ||

                    providerMessage.includes(
                        "verified"
                    )

                    ||

                    Object.keys(
                        providerData
                    ).length > 0
                )
            );


        if (
            !providerSucceeded
        ) {

            console.error(

                "MSG91 rejected access token:",

                providerData

            );


            return res.status(401).json({

                success: false,

                message:
                    providerData?.message ||
                    "OTP verification failed. Please try again."

            });

        }


        // ----------------------------------------------------
        // MSG91 has successfully verified the OTP.
        //
        // Now create the existing DataLattice
        // signup verification proof.
        // ----------------------------------------------------

        let verificationProof;


        try {

            verificationProof =
                await signupVerificationService
                    .createVerificationProof(
                        normalizedPhone
                    );

        } catch (error) {

            console.error(

                "Signup verification proof creation error:",

                error.message

            );


            return res.status(500).json({

                success: false,

                message:
                    "Phone verification was successful, but DataLattice could not create the verification proof."

            });

        }


        return res.status(200).json({

            success: true,

            message:
                "Phone number verified successfully",

            phone:
                normalizedPhone,

            verificationToken:
                verificationProof.verificationToken,

            verificationExpiresAt:
                verificationProof.expiresAt

        });

    } catch (error) {

        console.error(

            "OTP verification error:",

            error.message

        );


        return res.status(500).json({

            success: false,

            message:
                "OTP verification failed"

        });

    }

};


// ================= LOGIN =================

exports.login = (req, res) => {

    const {
        email,
        password
    } = req.body;


    if (
        !email ||
        !password
    ) {

        return res.status(400).json({

            success: false,

            message:
                "Email and Password are required"

        });

    }


    userModel.findUserByEmail(
        email,
        async (
            err,
            users
        ) => {

            if (err) {

                return res.status(500).json({

                    success: false,

                    message:
                        err.message

                });

            }


            if (
                users.length === 0
            ) {

                return res.status(404).json({

                    success: false,

                    message:
                        "User Not Found"

                });

            }


            const user =
                users[0];


            const isMatch =
                await bcrypt.compare(
                    password,
                    user.password
                );


            if (!isMatch) {

                return res.status(401).json({

                    success: false,

                    message:
                        "Invalid Password"

                });

            }


            const token =
                jwt.sign(

                    {

                        id:
                            user.id,

                        email:
                            user.email,

                        role:
                            user.role

                    },

                    process.env.JWT_SECRET,

                    {

                        expiresIn:
                            "1d"

                    }

                );


            res.json({

                success:
                    true,

                message:
                    "Login Successful",

                token,

                user: {

                    id:
                        user.id,

                    full_name:
                        user.full_name,

                    email:
                        user.email,

                    role:
                        user.role

                }

            });

        }
    );

};