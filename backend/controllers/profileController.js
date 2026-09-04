const profileModel = require("../models/profileModel");


// =====================================
// Get My Profile
// =====================================

exports.getProfile = (req, res) => {

    const userId = req.user.id;

    profileModel.getProfileByUserId(
        userId,
        (err, results) => {

            if (err) {

                return res.status(500).json({
                    success: false,
                    message: err.message,
                });

            }

            if (results.length === 0) {

                return res.status(404).json({
                    success: false,
                    message: "Profile not found",
                });

            }

            return res.status(200).json({
                success: true,
                profile: results[0],
            });

        }
    );

};


// =====================================
// Update My Profile
// =====================================

exports.updateProfile = (req, res) => {

    const userId = req.user.id;

    const {
        phone,
        bio,
        profile_image,
    } = req.body;


    profileModel.checkProfile(
        userId,
        (err, results) => {

            if (err) {

                return res.status(500).json({
                    success: false,
                    message: err.message,
                });

            }


            // =====================================
            // Create Profile
            // =====================================

            if (results.length === 0) {

                return profileModel.createProfile(
                    {
                        user_id: userId,
                        phone,
                        bio,
                        profile_image,
                    },
                    (err) => {

                        if (err) {

                            return res.status(500).json({
                                success: false,
                                message: err.message,
                            });

                        }

                        return res.status(201).json({
                            success: true,
                            message:
                                "Profile Created Successfully",
                        });

                    }
                );

            }


            // =====================================
            // Update Profile
            // =====================================

            profileModel.updateProfile(
                userId,
                {
                    phone,
                    bio,
                    profile_image,
                },
                (err) => {

                    if (err) {

                        return res.status(500).json({
                            success: false,
                            message: err.message,
                        });

                    }

                    return res.status(200).json({
                        success: true,
                        message:
                            "Profile Updated Successfully",
                    });

                }
            );

        }
    );

};