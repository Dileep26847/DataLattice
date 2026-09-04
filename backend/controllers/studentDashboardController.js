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
    // VALIDATE STUDENT ID
    // ========================================================

    if (!requestedStudentId) {

        return res.status(400).json({

            success: false,

            message:
                "Valid Student ID is required"

        });

    }


    // ========================================================
    // STUDENT OWNERSHIP CHECK
    // ========================================================

    if (

        req.user.role === "student"

        &&

        Number(req.user.id) !==
        requestedStudentId

    ) {

        return res.status(403).json({

            success: false,

            message:
                "You are not authorized to access this dashboard"

        });

    }


    // ========================================================
    // GET DASHBOARD DATA
    // ========================================================

    studentDashboardModel.getDashboardStats(

        requestedStudentId,

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
    // VALIDATE STUDENT ID
    // ========================================================

    if (!requestedStudentId) {

        return res.status(400).json({

            success: false,

            message:
                "Valid Student ID is required"

        });

    }


    // ========================================================
    // OWNERSHIP CHECK
    // ========================================================

    if (

        req.user.role === "student"

        &&

        Number(req.user.id) !==
        requestedStudentId

    ) {

        return res.status(403).json({

            success: false,

            message:
                "You are not authorized to access these courses"

        });

    }


    // ========================================================
    // GET COURSES
    // ========================================================

    studentDashboardModel.getMyCourses(

        requestedStudentId,

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