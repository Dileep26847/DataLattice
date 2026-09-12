const studentDashboardModel =
    require("../models/studentDashboardModel");


// ============================================================
// GET STUDENT DASHBOARD STATISTICS
// ============================================================

exports.getDashboardStats = (
    req,
    res
) => {

    const requestedStudentId =
        Number(req.params.studentId);


    // ========================================================
    // VALIDATE REQUESTED STUDENT ID
    // ========================================================

    if (!requestedStudentId) {

        return res.status(400).json({

            success: false,

            message:
                "Valid Student ID is required"

        });

    }


    // ========================================================
    // DETERMINE TARGET STUDENT
    // ========================================================

    let targetStudentId =
        requestedStudentId;


    // ========================================================
    // STUDENT OWNERSHIP CHECK
    // ========================================================

    if (
        req.user.role === "student"
    ) {

        targetStudentId =
            Number(req.user.id);


        // ====================================================
        // PREVENT CROSS-STUDENT ACCESS
        // ====================================================

        if (
            !targetStudentId
            ||
            targetStudentId !==
            requestedStudentId
        ) {

            return res.status(403).json({

                success: false,

                message:
                    "You are not authorized to access this dashboard"

            });

        }

    }


    // ========================================================
    // GET DASHBOARD DATA
    // ========================================================

    studentDashboardModel.getDashboardStats(

        targetStudentId,

        (err, result) => {

            if (err) {

                console.error(
                    "STUDENT DASHBOARD ERROR:",
                    err
                );

                return res.status(500).json({

                    success: false,

                    message:
                        "Failed to load student dashboard",

                    error:
                        process.env.NODE_ENV === "development"
                            ? err.message
                            : undefined

                });

            }


            const stats =
                result?.[0] || {};


            // =================================================
            // RESPONSE
            // =================================================

            return res.status(200).json({

                success: true,

                stats: {

                    totalCourses:
                        Number(
                            stats.totalCourses || 0
                        ),

                    completedLessons:
                        Number(
                            stats.completedLessons || 0
                        ),

                    totalLessons:
                        Number(
                            stats.totalLessons || 0
                        ),

                    totalAssignments:
                        Number(
                            stats.totalAssignments || 0
                        ),

                    submittedAssignments:
                        Number(
                            stats.submittedAssignments || 0
                        ),

                    overallProgress:
                        Number(
                            stats.overallProgress || 0
                        )

                }

            });

        }

    );

};


// ============================================================
// GET STUDENT COURSES
// ============================================================

exports.getMyCourses = (
    req,
    res
) => {

    const requestedStudentId =
        Number(req.params.studentId);


    // ========================================================
    // VALIDATE REQUESTED STUDENT ID
    // ========================================================

    if (!requestedStudentId) {

        return res.status(400).json({

            success: false,

            message:
                "Valid Student ID is required"

        });

    }


    // ========================================================
    // DETERMINE TARGET STUDENT
    // ========================================================

    let targetStudentId =
        requestedStudentId;


    // ========================================================
    // OWNERSHIP CHECK
    // ========================================================

    if (
        req.user.role === "student"
    ) {

        targetStudentId =
            Number(req.user.id);


        // ====================================================
        // PREVENT CROSS-STUDENT ACCESS
        // ====================================================

        if (
            !targetStudentId
            ||
            targetStudentId !==
            requestedStudentId
        ) {

            return res.status(403).json({

                success: false,

                message:
                    "You are not authorized to access these courses"

            });

        }

    }


    // ========================================================
    // GET COURSES
    // ========================================================

    studentDashboardModel.getMyCourses(

        targetStudentId,

        (err, courses) => {

            if (err) {

                console.error(
                    "STUDENT COURSES ERROR:",
                    err
                );

                return res.status(500).json({

                    success: false,

                    message:
                        "Failed to load student courses",

                    error:
                        process.env.NODE_ENV === "development"
                            ? err.message
                            : undefined

                });

            }


            return res.status(200).json({

                success: true,

                total:
                    courses?.length || 0,

                courses:
                    courses || []

            });

        }

    );

};