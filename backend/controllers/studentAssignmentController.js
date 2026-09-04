const assignmentModel =
    require("../models/assignmentModel");

const enrollmentModel =
    require("../models/enrollmentModel");


// ======================================
// Check Student Course Enrollment
// ======================================

const checkStudentEnrollment = (
    studentId,
    courseId,
    callback
) => {

    enrollmentModel.checkEnrollment(
        studentId,
        courseId,
        (err, results) => {

            if (err) {
                return callback(err);
            }

            if (
                !results ||
                results.length === 0
            ) {

                return callback(
                    null,
                    false
                );

            }

            callback(
                null,
                true
            );

        }
    );

};


// ======================================
// Get Assignments By Course
// STUDENT
// ======================================

exports.getAssignmentsByCourse = (
    req,
    res
) => {

    const courseId =
        req.params.courseId;

    const studentId =
        req.user.id;

    if (!courseId) {

        return res.status(400).json({
            success: false,
            message: "Course ID is required",
        });

    }

    checkStudentEnrollment(
        studentId,
        courseId,
        (err, enrolled) => {

            if (err) {

                console.error(
                    "STUDENT ENROLLMENT CHECK ERROR:",
                    err
                );

                return res.status(500).json({
                    success: false,
                    message: err.message,
                });

            }

            if (!enrolled) {

                return res.status(403).json({
                    success: false,
                    message:
                        "You are not enrolled in this course",
                });

            }

            assignmentModel.getAssignmentsByCourse(
                courseId,
                (assignmentErr, assignments) => {

                    if (assignmentErr) {

                        console.error(
                            "STUDENT ASSIGNMENTS ERROR:",
                            assignmentErr
                        );

                        return res.status(500).json({
                            success: false,
                            message:
                                assignmentErr.message,
                        });

                    }

                    return res.status(200).json({
                        success: true,
                        total:
                            assignments.length,
                        assignments,
                    });

                }
            );

        }
    );

};


// ======================================
// Get Assignment By ID
// STUDENT
// ======================================

exports.getAssignmentById = (
    req,
    res
) => {

    const assignmentId =
        req.params.id;

    const studentId =
        req.user.id;

    assignmentModel.getAssignmentById(
        assignmentId,
        (err, results) => {

            if (err) {

                return res.status(500).json({
                    success: false,
                    message: err.message,
                });

            }

            if (
                !results ||
                results.length === 0
            ) {

                return res.status(404).json({
                    success: false,
                    message:
                        "Assignment not found",
                });

            }

            const assignment =
                results[0];

            checkStudentEnrollment(
                studentId,
                assignment.course_id,
                (enrollmentErr, enrolled) => {

                    if (enrollmentErr) {

                        return res.status(500).json({
                            success: false,
                            message:
                                enrollmentErr.message,
                        });

                    }

                    if (!enrolled) {

                        return res.status(403).json({
                            success: false,
                            message:
                                "You are not enrolled in this course",
                        });

                    }

                    return res.status(200).json({
                        success: true,
                        assignment,
                    });

                }
            );

        }
    );

};