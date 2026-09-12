const totpService = require("../services/totpService");


// ============================================================
// START TOTP SETUP
// ============================================================

const startTotpSetup = async (req, res) => {

    try {

        const userId =
            req.user.id;


        const setup =
            await totpService.createTotpSetup(
                userId
            );


        return res.status(200).json({

            success:
                true,

            message:
                "Authenticator setup initialized successfully.",

            data: {

                issuer:
                    setup.issuer,

                accountName:
                    setup.accountName,

                otpauthUri:
                    setup.otpauthUri,

            },

        });

    } catch (error) {

        console.error(
            "TOTP setup error:",
            error.message
        );


        return res.status(400).json({

            success:
                false,

            message:
                error.message ||
                "Unable to initialize authenticator setup.",

        });

    }

};


// ============================================================
// VERIFY TOTP SETUP
// ============================================================

const verifyTotpSetup = async (req, res) => {

    try {

        const userId =
            req.user.id;

        const {
            otp,
        } =
            req.body;


        const result =
            await totpService.verifyTotpSetup(
                userId,
                otp
            );


        if (
            !result.success
        ) {

            return res.status(400).json({

                success:
                    false,

                message:
                    "Invalid authenticator code.",

            });

        }


        return res.status(200).json({

            success:
                true,

            message:
                result.alreadyEnabled
                    ? "Authenticator verification is already enabled."
                    : "Authenticator verification enabled successfully.",

        });

    } catch (error) {

        console.error(
            "TOTP setup verification error:",
            error.message
        );


        return res.status(400).json({

            success:
                false,

            message:
                error.message ||
                "Unable to verify authenticator code.",

        });

    }

};


// ============================================================
// VERIFY ENABLED TOTP
// ============================================================

const verifyTotp = async (req, res) => {

    try {

        const userId =
            req.user.id;

        const {
            otp,
        } =
            req.body;


        const result =
            await totpService.verifyTotp(
                userId,
                otp
            );


        if (
            !result.valid
        ) {

            return res.status(401).json({

                success:
                    false,

                message:
                    "Invalid authenticator code.",

            });

        }


        return res.status(200).json({

            success:
                true,

            message:
                "Authenticator code verified successfully.",

        });

    } catch (error) {

        console.error(
            "TOTP verification error:",
            error.message
        );


        return res.status(401).json({

            success:
                false,

            message:
                "Authenticator verification failed.",

        });

    }

};


// ============================================================
// GET TOTP STATUS
// ============================================================

const getTotpStatus = async (req, res) => {

    try {

        const userId =
            req.user.id;


        const status =
            await totpService.getTotpStatus(
                userId
            );


        return res.status(200).json({

            success:
                true,

            data:
                status,

        });

    } catch (error) {

        console.error(
            "TOTP status error:",
            error.message
        );


        return res.status(500).json({

            success:
                false,

            message:
                "Unable to retrieve authenticator status.",

        });

    }

};


// ============================================================
// DISABLE TOTP
// ============================================================

const disableTotp = async (req, res) => {

    try {

        const userId =
            req.user.id;


        await totpService.disableTotp(
            userId
        );


        return res.status(200).json({

            success:
                true,

            message:
                "Authenticator verification disabled successfully.",

        });

    } catch (error) {

        console.error(
            "TOTP disable error:",
            error.message
        );


        return res.status(500).json({

            success:
                false,

            message:
                "Unable to disable authenticator verification.",

        });

    }

};


// ============================================================
// EXPORTS
// ============================================================

module.exports = {

    startTotpSetup,

    verifyTotpSetup,

    verifyTotp,

    getTotpStatus,

    disableTotp,

};