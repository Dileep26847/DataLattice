const bcrypt = require("bcrypt");

const settingsModel =
    require("../models/settingsModel");

// ======================================
// CHANGE PASSWORD
// ======================================

exports.changePassword = (req, res) => {

    // ======================================
    // AUTHENTICATED USER
    // ======================================

    const userId = req.user.id;

    const {
        currentPassword,
        newPassword,
    } = req.body;


    // ======================================
    // VALIDATION
    // ======================================

    if (
        !currentPassword ||
        !newPassword
    ) {

        return res.status(400).json({

            success: false,

            message:
                "Current password and new password are required.",

        });

    }


    // ======================================
    // PASSWORD LENGTH
    // ======================================

    if (
        newPassword.length < 6
    ) {

        return res.status(400).json({

            success: false,

            message:
                "New password must be at least 6 characters.",

        });

    }


    // ======================================
    // GET CURRENT PASSWORD
    // ======================================

    settingsModel.getUserPassword(

        userId,

        async (err, results) => {

            if (err) {

                console.error(
                    "GET USER PASSWORD ERROR:",
                    err
                );

                return res.status(500).json({

                    success: false,

                    message:
                        "Unable to verify current password.",

                });

            }


            // ======================================
            // USER NOT FOUND
            // ======================================

            if (
                !results ||
                results.length === 0
            ) {

                return res.status(404).json({

                    success: false,

                    message:
                        "User not found.",

                });

            }


            try {

                // ======================================
                // COMPARE PASSWORD
                // ======================================

                const isMatch =
                    await bcrypt.compare(

                        currentPassword,

                        results[0].password

                    );


                if (!isMatch) {

                    return res.status(401).json({

                        success: false,

                        message:
                            "Current password is incorrect.",

                    });

                }


                // ======================================
                // HASH NEW PASSWORD
                // ======================================

                const hashedPassword =
                    await bcrypt.hash(

                        newPassword,

                        10

                    );


                // ======================================
                // UPDATE PASSWORD
                // ======================================

                settingsModel.updatePassword(

                    userId,

                    hashedPassword,

                    (updateError) => {

                        if (updateError) {

                            console.error(
                                "UPDATE PASSWORD ERROR:",
                                updateError
                            );

                            return res.status(500).json({

                                success: false,

                                message:
                                    "Unable to update password.",

                            });

                        }


                        // ======================================
                        // SUCCESS
                        // ======================================

                        return res.status(200).json({

                            success: true,

                            message:
                                "Password updated successfully.",

                        });

                    }

                );

            }

            catch (error) {

                console.error(
                    "PASSWORD CHANGE ERROR:",
                    error
                );

                return res.status(500).json({

                    success: false,

                    message:
                        "Unable to update password.",

                });

            }

        }

    );

};