const analyticsModel =
    require("../models/analyticsModel");


// ==========================================
// ANALYTICS OVERVIEW
// ==========================================

exports.getOverview = (req, res) => {

    analyticsModel.getOverviewStats(

        (err, stats) => {

            if (err) {

                console.error(
                    "ANALYTICS OVERVIEW ERROR:",
                    err
                );

                return res.status(500).json({

                    success: false,

                    message:
                        "Failed to load analytics overview",

                    error: err.message,

                });

            }


            analyticsModel.getStudentGrowth(

                (growthError, studentGrowth) => {

                    if (growthError) {

                        console.error(
                            "ANALYTICS STUDENT GROWTH ERROR:",
                            growthError
                        );

                        return res.status(500).json({

                            success: false,

                            message:
                                "Failed to load student growth",

                            error:
                                growthError.message,

                        });

                    }


                    analyticsModel.getEnrollmentGrowth(

                        (
                            enrollmentError,
                            enrollmentData
                        ) => {

                            if (enrollmentError) {

                                console.error(
                                    "ANALYTICS ENROLLMENT ERROR:",
                                    enrollmentError
                                );

                                return res.status(500).json({

                                    success: false,

                                    message:
                                        "Failed to load enrollment analytics",

                                    error:
                                        enrollmentError.message,

                                });

                            }


                            analyticsModel.getCourseDistribution(

                                (
                                    courseError,
                                    courseDistribution
                                ) => {

                                    if (courseError) {

                                        console.error(
                                            "ANALYTICS COURSE ERROR:",
                                            courseError
                                        );

                                        return res.status(500).json({

                                            success: false,

                                            message:
                                                "Failed to load course analytics",

                                            error:
                                                courseError.message,

                                        });

                                    }


                                    return res.status(200).json({

                                        success: true,

                                        stats:
                                            stats[0] || {},

                                        studentGrowth,

                                        enrollmentData,

                                        courseDistribution,

                                    });

                                }

                            );

                        }

                    );

                }

            );

        }

    );

};