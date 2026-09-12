const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userModel = require("../models/userModel");
const otpService = require("../services/otpService");
const otpDeliveryService = require("../services/otpDeliveryService");
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


        // ----------------------------------------------------
        // Validate required signup fields.
        // ----------------------------------------------------

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


        // ----------------------------------------------------
        // Normalize and validate the phone number before any
        // database operation.
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
        // Verify the server-side signup verification proof.
        //
        // The browser cannot bypass phone verification by
        // sending a simple "phoneVerified: true" flag.
        // ----------------------------------------------------

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


        // ----------------------------------------------------
        // Check whether the email already exists.
        // ----------------------------------------------------

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


                    // ------------------------------------------------
                    // Check whether the phone already belongs to
                    // another account.
                    //
                    // The database also enforces the unique index,
                    // but checking here gives the user a clean
                    // application-level response.
                    // ------------------------------------------------

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


                                // ----------------------------------------
                                // Hash password.
                                // ----------------------------------------

                                const hashedPassword =
                                    await bcrypt.hash(
                                        password,
                                        10
                                    );


                                // ----------------------------------------
                                // Create verified student account.
                                // ----------------------------------------

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


                                            // MySQL duplicate-key
                                            // protection remains the
                                            // final database safeguard.
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


                                        // --------------------------------
                                        // Consume the signup verification
                                        // proof only after successful user
                                        // creation.
                                        // --------------------------------

                                        try {

                                            await signupVerificationService
                                                .consumeVerifiedProof(
                                                    verification.verificationId
                                                );

                                        } catch (verificationError) {

                                            /*
                                             * The user has already been
                                             * created at this point.
                                             *
                                             * Log the operational error
                                             * without exposing internal
                                             * database details.
                                             */

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

exports.requestOtp = async (req, res) => {

    try {

        const { phone } = req.body;


        if (!phone) {

            return res.status(400).json({

                success: false,

                message:
                    "Phone number is required"

            });

        }


        const result =
            await otpService.requestOtp({

                phone,

                purpose:
                    otpService.OTP_PURPOSE_SIGNUP

            });


        // ----------------------------------------------------
        // Deliver OTP through the configured provider.
        //
        // The OTP itself is never returned to the frontend.
        // ----------------------------------------------------

        await otpDeliveryService.sendOtp({

            phone:
                result.phone,

            otp:
                result.otp,

            purpose:
                otpService.OTP_PURPOSE_SIGNUP,

            expiresAt:
                result.expiresAt,

            challengeId:
                result.challengeId

        });


        /*
         * IMPORTANT:
         *
         * The OTP itself is intentionally NOT returned
         * to the frontend.
         */

        return res.status(200).json({

            success: true,

            message:
                "OTP sent successfully",

            phone:
                result.phone,

            expiresAt:
                result.expiresAt,

            challengeId:
                result.challengeId

        });

    } catch (error) {

        if (
            error.code ===
            "OTP_RESEND_COOLDOWN"
        ) {

            return res.status(429).json({

                success: false,

                message:
                    error.message,

                retryAfterSeconds:
                    error.retryAfterSeconds

            });

        }


        if (
            error.code ===
            "WHATSAPP_PROVIDER_NOT_CONFIGURED"
        ) {

            return res.status(503).json({

                success: false,

                message:
                    "OTP delivery service is not configured."

            });

        }


        if (
            error.code ===
            "OTP_PROVIDER_UNSUPPORTED"
        ) {

            return res.status(503).json({

                success: false,

                message:
                    "OTP delivery provider is not supported."

            });

        }


        console.error(
            "OTP request error:",
            error.message
        );


        return res.status(400).json({

            success: false,

            message:
                error.message

        });

    }

};


// ================= VERIFY OTP =================

exports.verifyOtp = async (req, res) => {

    try {

        const {
            phone,
            otp
        } = req.body;


        if (
            !phone ||
            !otp
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Phone number and OTP are required"

            });

        }


        const result =
            await otpService.verifyOtp({

                phone,

                otp,

                purpose:
                    otpService.OTP_PURPOSE_SIGNUP

            });


        return res.status(200).json({

            success: true,

            message:
                "Phone number verified successfully",

            phone:
                result.phone,

            challengeId:
                result.challengeId,

            // -----------------------------------------------
            // This token proves successful phone verification
            // to the registration endpoint.
            //
            // It is NOT the OTP and cannot be used to verify
            // another phone number.
            // -----------------------------------------------

            verificationToken:
                result.verificationToken,

            verificationExpiresAt:
                result.verificationExpiresAt

        });

    } catch (error) {

        if (
            error.code ===
            "OTP_ATTEMPTS_EXCEEDED"
        ) {

            return res.status(429).json({

                success: false,

                message:
                    error.message

            });

        }


        if (
            error.code ===
            "OTP_EXPIRED"
        ) {

            return res.status(410).json({

                success: false,

                message:
                    error.message

            });

        }


        console.error(
            "OTP verification error:",
            error.message
        );


        return res.status(400).json({

            success: false,

            message:
                error.message

        });

    }

};


// ================= LOGIN =================

exports.login = (req, res) => {

    const { email, password } = req.body;


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