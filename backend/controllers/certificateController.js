const certificateModel = require("../models/certificateModel");

// ======================================
// Get My Certificates
// ======================================

exports.getMyCertificates = (req, res) => {

    const studentId = req.user.id;

    certificateModel.getStudentCertificates(
        studentId,
        (err, certificates) => {

            if (err) {

                console.error(
                    "Get certificates error:",
                    err
                );

                return res.status(500).json({
                    success: false,
                    message: err.message
                });

            }

            return res.json({
                success: true,
                total: certificates.length,
                certificates
            });

        }
    );
};


// ======================================
// Get Certificate By ID
// ======================================

exports.getCertificateById = (req, res) => {

    const certificateId = req.params.id;

    certificateModel.getCertificateById(
        certificateId,
        (err, certificates) => {

            if (err) {

                return res.status(500).json({
                    success: false,
                    message: err.message
                });

            }

            if (certificates.length === 0) {

                return res.status(404).json({
                    success: false,
                    message: "Certificate Not Found"
                });

            }

            const certificate = certificates[0];

            // Student can only view their own certificate
            if (
                Number(certificate.student_id) !==
                Number(req.user.id)
            ) {

                return res.status(403).json({
                    success: false,
                    message:
                        "You are not authorized to access this certificate."
                });

            }

            return res.json({
                success: true,
                certificate
            });

        }
    );
};


// ======================================
// Issue Certificate
// ======================================

exports.issueCertificate = (req, res) => {

    const studentId = req.user.id;

    const {
        course_id
    } = req.body;

    if (!course_id) {

        return res.status(400).json({
            success: false,
            message: "Course ID is required."
        });

    }

    // ==================================
    // Check Existing Certificate
    // ==================================

    certificateModel.getCertificateByStudentCourse(
        studentId,
        course_id,
        (err, existing) => {

            if (err) {

                return res.status(500).json({
                    success: false,
                    message: err.message
                });

            }

            if (existing.length > 0) {

                return res.json({
                    success: true,
                    eligible: true,
                    alreadyIssued: true,
                    message:
                        "Certificate already exists.",
                    certificate: existing[0]
                });

            }

            // ==================================
            // Check Eligibility
            // ==================================

            certificateModel.checkCourseEligibility(
                studentId,
                course_id,
                (err, results) => {

                    if (err) {

                        return res.status(500).json({
                            success: false,
                            message: err.message
                        });

                    }

                    const eligibility = results[0];

                    const totalLessons =
                        Number(
                            eligibility.total_lessons || 0
                        );

                    const completedLessons =
                        Number(
                            eligibility.completed_lessons || 0
                        );

                    const passedQuizzes =
                        Number(
                            eligibility.passed_quizzes || 0
                        );

                    const lessonsCompleted =
                        totalLessons > 0 &&
                        completedLessons >= totalLessons;

                    const quizPassed =
                        passedQuizzes > 0;

                    // ==================================
                    // Not Eligible
                    // ==================================

                    if (
                        !lessonsCompleted ||
                        !quizPassed
                    ) {

                        return res.status(403).json({

                            success: false,

                            eligible: false,

                            message:
                                "Complete all lessons and pass the quiz before requesting a certificate.",

                            progress: {
                                totalLessons,
                                completedLessons,
                                lessonsCompleted,
                                quizPassed
                            }

                        });

                    }

                    // ==================================
                    // Generate Certificate Number
                    // ==================================

                    const certificateNumber =
                        `CERT-${Date.now()}-${studentId}-${course_id}`;

                    // ==================================
                    // Create Certificate
                    // ==================================

                    certificateModel.createCertificate(
                        {
                            student_id: studentId,
                            course_id: course_id,
                            certificate_number:
                                certificateNumber
                        },
                        (err, result) => {

                            if (err) {

                                return res.status(500).json({
                                    success: false,
                                    message: err.message
                                });

                            }

                            return res.status(201).json({

                                success: true,

                                eligible: true,

                                alreadyIssued: false,

                                message:
                                    "Certificate Issued Successfully",

                                certificateId:
                                    result.insertId,

                                certificateNumber

                            });

                        }
                    );

                }
            );

        }
    );
};