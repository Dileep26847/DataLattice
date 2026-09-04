const assignmentSubmissionModel =
    require("../models/assignmentSubmissionModel");

const enrollmentModel =
    require("../models/enrollmentModel");


// ======================================
// Submit Assignment
// STUDENT
// ======================================

exports.submitAssignment = (
    req,
    res
) => {

    const studentId =
        req.user.id;

    const {
        assignment_id,
        submission_url
    } = req.body;

    // ======================================
    // Validation
    // ======================================

    if (!assignment_id) {

        return res.status(400).json({
            success: false,
            message:
                "Assignment ID is required",
        });

    }

    if (
        !submission_url ||
        !String(submission_url).trim()
    ) {

        return res.status(400).json({
            success: false,
            message:
                "Submission URL is required",
        });

    }

    const cleanUrl =
        String(
            submission_url
        ).trim();

    // ======================================
    // Get Assignment
    // ======================================

    assignmentSubmissionModel
        .getAssignmentForSubmission(
            assignment_id,
            (assignmentErr, assignments) => {

                if (assignmentErr) {

                    return res.status(500).json({
                        success: false,
                        message:
                            assignmentErr.message,
                    });

                }

                if (
                    !assignments ||
                    assignments.length === 0
                ) {

                    return res.status(404).json({
                        success: false,
                        message:
                            "Assignment not found",
                    });

                }

                const assignment =
                    assignments[0];

                // ======================================
                // Check Enrollment
                // ======================================

                enrollmentModel.checkEnrollment(
                    studentId,
                    assignment.course_id,
                    (
                        enrollmentErr,
                        enrollments
                    ) => {

                        if (enrollmentErr) {

                            return res.status(500).json({
                                success: false,
                                message:
                                    enrollmentErr.message,
                            });

                        }

                        if (
                            !enrollments ||
                            enrollments.length === 0
                        ) {

                            return res.status(403).json({
                                success: false,
                                message:
                                    "You are not enrolled in this course",
                            });

                        }

                        // ======================================
                        // Check Existing Submission
                        // ======================================

                        assignmentSubmissionModel
                            .checkExistingSubmission(
                                assignment_id,
                                studentId,
                                (
                                    submissionErr,
                                    existing
                                ) => {

                                    if (submissionErr) {

                                        return res.status(500).json({
                                            success: false,
                                            message:
                                                submissionErr.message,
                                        });

                                    }

                                    if (
                                        existing &&
                                        existing.length > 0
                                    ) {

                                        return res.status(409).json({
                                            success: false,
                                            message:
                                                "You have already submitted this assignment",
                                        });

                                    }

                                    // ======================================
                                    // Submit
                                    // ======================================

                                    assignmentSubmissionModel
                                        .createSubmission(
                                            {
                                                assignment_id,
                                                student_id:
                                                    studentId,
                                                submission_url:
                                                    cleanUrl,
                                                status:
                                                    "Submitted",
                                            },
                                            (
                                                createErr,
                                                result
                                            ) => {

                                                if (createErr) {

                                                    console.error(
                                                        "CREATE SUBMISSION ERROR:",
                                                        createErr
                                                    );

                                                    return res.status(500).json({
                                                        success: false,
                                                        message:
                                                            createErr.message,
                                                    });

                                                }

                                                return res.status(201).json({
                                                    success: true,
                                                    message:
                                                        "Assignment submitted successfully",
                                                    submissionId:
                                                        result.insertId,
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


// ======================================
// Get My Submission
// STUDENT
// ======================================

exports.getMySubmission = (
    req,
    res
) => {

    const studentId =
        req.user.id;

    const assignmentId =
        req.params.assignmentId;

    if (!assignmentId) {

        return res.status(400).json({
            success: false,
            message:
                "Assignment ID is required",
        });

    }

    assignmentSubmissionModel
        .getAssignmentForSubmission(
            assignmentId,
            (assignmentErr, assignments) => {

                if (assignmentErr) {

                    return res.status(500).json({
                        success: false,
                        message:
                            assignmentErr.message,
                    });

                }

                if (
                    !assignments ||
                    assignments.length === 0
                ) {

                    return res.status(404).json({
                        success: false,
                        message:
                            "Assignment not found",
                    });

                }

                const assignment =
                    assignments[0];

                enrollmentModel.checkEnrollment(
                    studentId,
                    assignment.course_id,
                    (
                        enrollmentErr,
                        enrollments
                    ) => {

                        if (enrollmentErr) {

                            return res.status(500).json({
                                success: false,
                                message:
                                    enrollmentErr.message,
                            });

                        }

                        if (
                            !enrollments ||
                            enrollments.length === 0
                        ) {

                            return res.status(403).json({
                                success: false,
                                message:
                                    "You are not enrolled in this course",
                            });

                        }

                        assignmentSubmissionModel
                            .getMySubmission(
                                assignmentId,
                                studentId,
                                (
                                    submissionErr,
                                    submissions
                                ) => {

                                    if (submissionErr) {

                                        return res.status(500).json({
                                            success: false,
                                            message:
                                                submissionErr.message,
                                        });

                                    }

                                    if (
                                        !submissions ||
                                        submissions.length === 0
                                    ) {

                                        return res.status(200).json({
                                            success: true,
                                            submitted: false,
                                            submission: null,
                                        });

                                    }

                                    return res.status(200).json({
                                        success: true,
                                        submitted: true,
                                        submission:
                                            submissions[0],
                                    });

                                }
                            );

                    }
                );

            }
        );

};