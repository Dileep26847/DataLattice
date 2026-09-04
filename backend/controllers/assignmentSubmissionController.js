const assignmentSubmissionModel =
    require("../models/assignmentSubmissionModel");

// ======================================
// Get All Submissions
// ADMIN ONLY
// ======================================

exports.getAllSubmissions = (req, res) => {

    assignmentSubmissionModel.getAllSubmissions(
        (err, submissions) => {

            if (err) {

                console.error(
                    "GET SUBMISSIONS ERROR:",
                    err
                );

                return res.status(500).json({
                    success: false,
                    message:
                        err.message ||
                        "Failed to fetch submissions",
                });
            }

            return res.status(200).json({
                success: true,
                total: submissions.length,
                submissions,
            });
        }
    );
};


// ======================================
// Get Submission By ID
// ADMIN ONLY
// ======================================

exports.getSubmissionById = (req, res) => {

    assignmentSubmissionModel.getSubmissionById(
        req.params.id,
        (err, results) => {

            if (err) {

                console.error(
                    "GET SUBMISSION ERROR:",
                    err
                );

                return res.status(500).json({
                    success: false,
                    message:
                        err.message ||
                        "Failed to fetch submission",
                });
            }

            if (
                !results ||
                results.length === 0
            ) {

                return res.status(404).json({
                    success: false,
                    message: "Submission not found",
                });
            }

            return res.status(200).json({
                success: true,
                submission: results[0],
            });
        }
    );
};


// ======================================
// Get Submissions By Assignment
// ADMIN ONLY
// ======================================

exports.getSubmissionsByAssignment = (
    req,
    res
) => {

    assignmentSubmissionModel.getSubmissionsByAssignment(
        req.params.assignmentId,
        (err, submissions) => {

            if (err) {

                console.error(
                    "GET ASSIGNMENT SUBMISSIONS ERROR:",
                    err
                );

                return res.status(500).json({
                    success: false,
                    message:
                        err.message ||
                        "Failed to fetch submissions",
                });
            }

            return res.status(200).json({
                success: true,
                total: submissions.length,
                submissions,
            });
        }
    );
};


// ======================================
// Grade Submission
// ADMIN ONLY
// ======================================

exports.gradeSubmission = (
    req,
    res
) => {

    const {
        marks,
        feedback
    } = req.body;

    // ======================================
    // Marks Required
    // ======================================

    if (
        marks === undefined ||
        marks === null ||
        marks === ""
    ) {

        return res.status(400).json({
            success: false,
            message: "Marks are required",
        });
    }

    const numericMarks = Number(marks);

    // ======================================
    // Marks Must Be Valid Number
    // ======================================

    if (
        Number.isNaN(numericMarks) ||
        !Number.isFinite(numericMarks)
    ) {

        return res.status(400).json({
            success: false,
            message: "Marks must be a valid number",
        });
    }

    // ======================================
    // Negative Marks
    // ======================================

    if (numericMarks < 0) {

        return res.status(400).json({
            success: false,
            message: "Marks cannot be negative",
        });
    }

    // ======================================
    // Get Assignment Maximum Marks
    // ======================================

    assignmentSubmissionModel.getSubmissionById(
        req.params.id,
        (err, results) => {

            if (err) {

                console.error(
                    "GET SUBMISSION FOR GRADING ERROR:",
                    err
                );

                return res.status(500).json({
                    success: false,
                    message:
                        err.message ||
                        "Failed to validate submission",
                });
            }

            if (
                !results ||
                results.length === 0
            ) {

                return res.status(404).json({
                    success: false,
                    message: "Submission not found",
                });
            }

            const submission =
                results[0];

            const totalMarks =
                Number(submission.total_marks);

            // ======================================
            // Validate Maximum Marks
            // ======================================

            if (
                Number.isFinite(totalMarks) &&
                numericMarks > totalMarks
            ) {

                return res.status(400).json({
                    success: false,
                    message:
                        `Marks cannot exceed ${totalMarks}`,
                });
            }

            // ======================================
            // Grade
            // ======================================

            assignmentSubmissionModel.gradeSubmission(
                req.params.id,
                numericMarks,
                feedback
                    ? String(feedback).trim()
                    : null,
                (gradeErr, result) => {

                    if (gradeErr) {

                        console.error(
                            "GRADE SUBMISSION ERROR:",
                            gradeErr
                        );

                        return res.status(500).json({
                            success: false,
                            message:
                                gradeErr.message ||
                                "Failed to grade submission",
                        });
                    }

                    if (
                        !result ||
                        result.affectedRows === 0
                    ) {

                        return res.status(404).json({
                            success: false,
                            message:
                                "Submission not found",
                        });
                    }

                    return res.status(200).json({
                        success: true,
                        message:
                            "Submission graded successfully",
                    });
                }
            );
        }
    );
};


// ======================================
// Delete Submission
// ADMIN ONLY
// ======================================

exports.deleteSubmission = (
    req,
    res
) => {

    assignmentSubmissionModel.deleteSubmission(
        req.params.id,
        (err, result) => {

            if (err) {

                console.error(
                    "DELETE SUBMISSION ERROR:",
                    err
                );

                return res.status(500).json({
                    success: false,
                    message:
                        err.message ||
                        "Failed to delete submission",
                });
            }

            if (
                !result ||
                result.affectedRows === 0
            ) {

                return res.status(404).json({
                    success: false,
                    message:
                        "Submission not found",
                });
            }

            return res.status(200).json({
                success: true,
                message:
                    "Submission deleted successfully",
            });
        }
    );
};