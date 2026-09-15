// ======================================
// SkillNova LMS - Backend Server
// ======================================

const express = require("express");
const cors = require("cors");

require("dotenv").config();

// ======================================
// DATABASE CONNECTION
// ======================================

require("./database/db");

// ======================================
// COMMUNICATION RUNTIME
// ======================================

const communicationRuntime =
    require("./services/communication/communicationRuntime");

// ======================================
// CONTROLLER IMPORTS
// ======================================

const mentorController =
    require("./controllers/mentorController");

// ======================================
// ROUTE IMPORTS
// ======================================

const authRoutes =
    require("./routes/authRoutes");

const profileRoutes =
    require("./routes/profileRoutes");

const courseRoutes =
    require("./routes/courseRoutes");

const lessonRoutes =
    require("./routes/lessonRoutes");

const studentLessonRoutes =
    require("./routes/studentLessonRoutes");

const enrollmentRoutes =
    require("./routes/enrollmentRoutes");

const progressRoutes =
    require("./routes/progressRoutes");

const videoProgressRoutes =
    require("./routes/videoProgressRoutes");

const assignmentRoutes =
    require("./routes/assignmentRoutes");

const assignmentSubmissionRoutes =
    require("./routes/assignmentSubmissionRoutes");

// ======================================
// PAYMENT ROUTES
// ======================================

const paymentRoutes =
    require("./routes/paymentRoutes");

// ======================================
// STUDENT ASSIGNMENT ROUTES
// ======================================

const studentAssignmentRoutes =
    require("./routes/studentAssignmentRoutes");

const studentSubmissionRoutes =
    require("./routes/studentSubmissionRoutes");

const studentQuizRoutes =
    require("./routes/studentQuizRoutes");

const studentProfileRoutes =
    require("./routes/studentProfileRoutes");

// ======================================
// CERTIFICATE ROUTES
// ======================================

const certificateRoutes =
    require("./routes/certificateRoutes");

// ======================================
// DASHBOARD ROUTES
// ======================================

const studentDashboardRoutes =
    require("./routes/studentDashboardRoutes");

const dashboardRoutes =
    require("./routes/dashboardRoutes");

// ======================================
// LIVE CLASS ROUTES
// ======================================

const liveClassRoutes =
    require("./routes/liveClassRoutes");

const zoomWebhookRoutes =
    require("./routes/zoomWebhookRoutes");

// ======================================
// SUPPORT ROUTES
// ======================================

const supportRoutes =
    require("./routes/supportRoutes");

// ======================================
// ADMIN ROUTES
// ======================================

const adminRoutes =
    require("./routes/adminRoutes");

const adminStudentRoutes =
    require("./routes/adminStudentRoutes");

const adminCourseRoutes =
    require("./routes/adminCourseRoutes");

// ======================================
// ADMIN REPORT ROUTES
// ======================================

const adminReportsRoutes =
    require("./routes/adminReportsRoutes");

// ======================================
// BATCH ROUTES
// ======================================

const batchRoutes =
    require("./routes/batchRoutes");

// ======================================
// MENTOR ROUTES
// ======================================

const mentorRoutes =
    require("./routes/mentorRoutes");

// ======================================
// SETTINGS ROUTES
// ======================================

const settingsRoutes =
    require("./routes/settingsRoutes");

// ======================================
// NOTIFICATION ROUTES
// ======================================

const notificationRoutes =
    require("./routes/notificationRoutes");

// ======================================
// ANALYTICS ROUTES
// ======================================

const analyticsRoutes =
    require("./routes/analyticsRoutes");

// ======================================
// UPLOAD ROUTES
// ======================================

const uploadRoutes =
    require("./routes/uploadRoutes");

// ======================================
// COMMUNICATION ROUTES
// ======================================

const communicationRoutes =
    require("./routes/communicationRoutes");

// ======================================
// AUTHENTICATOR / TOTP ROUTES
// ======================================

const totpRoutes =
    require("./routes/totpRoutes");

// ======================================
// EXPRESS APP
// ======================================

const app = express();

// ======================================
// PORT
// ======================================

const PORT =
    process.env.PORT || 5000;

// ======================================
// CORS
// ======================================

// Supports:
// Local development:
// CORS_ORIGINS=http://localhost:5173
//
// Multiple origins:

const allowedOrigins = (
    process.env.CORS_ORIGINS ||
    "http://localhost:5173"
)
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

app.use(
    cors({
        origin: (origin, callback) => {

            // Allow requests with no origin
            // such as Postman/server-to-server requests.
            if (!origin) {
                return callback(null, true);
            }

            if (allowedOrigins.includes(origin)) {
                return callback(null, true);
            }

            console.warn(
                `CORS blocked origin: ${origin}`
            );

            return callback(
                new Error("Not allowed by CORS")
            );
        },

        credentials: true,
    })
);

// ======================================
// JSON
// ======================================

app.use(
    express.json()
);

// ======================================
// URL ENCODED
// ======================================

app.use(
    express.urlencoded({
        extended: true,
    })
);

// ======================================
// STATIC UPLOADS
// ======================================

app.use(
    "/uploads",
    express.static("uploads")
);

// ======================================
// HEALTH CHECK
// ======================================

app.get(
    "/",
    (req, res) => {

        res.status(200).json({

            success: true,

            message:
                "SkillNova LMS Backend Running Successfully 🚀",

            status: "Online",

        });

    }
);

// ======================================
// API ROUTES
// ======================================

// ======================================
// AUTHENTICATION
// ======================================

app.use(
    "/api/auth",
    authRoutes
);

// ======================================
// PROFILE
// ======================================

app.use(
    "/api/profile",
    profileRoutes
);

// ======================================
// COURSES
// ======================================

app.use(
    "/api/courses",
    courseRoutes
);

// ======================================
// LESSONS
// ======================================

app.use(
    "/api/admin/lessons",
    lessonRoutes
);

// ======================================
// STUDENT LESSONS
// ======================================

app.use(
    "/api/student/lessons",
    studentLessonRoutes
);

// ======================================
// ENROLLMENTS
// ======================================

app.use(
    "/api/enrollments",
    enrollmentRoutes
);

// ======================================
// PAYMENT
// ======================================
//
// IMPORTANT:
//
// paymentRoutes contains:
//
// POST /create-order
// POST /verify
// GET  /history
//
// Mounted here:
//
// /api/payment/create-order
// /api/payment/verify
// /api/payment/history
//
// Authentication remains enforced inside
// paymentRoutes through verifyToken.
//

app.use(
    "/api/payment",
    paymentRoutes
);

// ======================================
// LESSON PROGRESS
// ======================================

app.use(
    "/api/progress",
    progressRoutes
);

// ======================================
// VIDEO PROGRESS
// ======================================

app.use(
    "/api/video-progress",
    videoProgressRoutes
);

// ======================================
// ADMIN ASSIGNMENTS
// ======================================

app.use(
    "/api/admin/assignments",
    assignmentRoutes
);

// ======================================
// ADMIN SUBMISSIONS
// ======================================

app.use(
    "/api/admin/submissions",
    assignmentSubmissionRoutes
);

// ======================================
// STUDENT ASSIGNMENTS
// ======================================

app.use(
    "/api/student/assignments",
    studentAssignmentRoutes
);

// ======================================
// STUDENT SUBMISSIONS
// ======================================

app.use(
    "/api/student/submissions",
    studentSubmissionRoutes
);

// ======================================
// STUDENT QUIZZES
// ======================================

app.use(
    "/api/student/quizzes",
    studentQuizRoutes
);

// ======================================
// STUDENT PROFILES
// ======================================

app.use(
    "/api/student-profiles",
    studentProfileRoutes
);

// ======================================
// CERTIFICATES
// ======================================

app.use(
    "/api/certificates",
    certificateRoutes
);

// ======================================
// STUDENT DASHBOARD
// ======================================

app.use(
    "/api/student/dashboard",
    studentDashboardRoutes
);

// ======================================
// ZOOM WEBHOOK
// ======================================

app.use(
    "/api/zoom/webhook",
    zoomWebhookRoutes
);

// ======================================
// LIVE CLASSES
// ======================================

app.use(
    "/api/live-classes",
    liveClassRoutes
);

// ======================================
// SUPPORT
// ======================================

app.use(
    "/api/support",
    supportRoutes
);

// ======================================
// ADMIN CORE ROUTES
// ======================================

app.use(
    "/api/admin",
    adminRoutes
);

// ======================================
// ADMIN STUDENT MANAGEMENT
// ======================================

app.use(
    "/api/admin",
    adminStudentRoutes
);

// ======================================
// ADMIN COURSE MANAGEMENT
// ======================================

app.use(
    "/api/admin",
    adminCourseRoutes
);

// ======================================
// ADMIN DASHBOARD
// ======================================

app.use(
    "/api/admin",
    dashboardRoutes
);

// ======================================
// ADMIN ANALYTICS
// ======================================

app.use(
    "/api/admin/analytics",
    analyticsRoutes
);

// ======================================
// ADMIN REPORTS
// ======================================

app.use(
    "/api/admin/reports",
    adminReportsRoutes
);

// ======================================
// BATCHES
// ======================================

app.use(
    "/api/batches",
    batchRoutes
);

// ======================================
// PUBLIC MENTORS
// READ ONLY
// ======================================

app.get(
    "/api/mentors/public",
    mentorController.getPublicMentors
);

// ======================================
// ADMIN MENTORS
// ======================================

app.use(
    "/api/admin",
    mentorRoutes
);

// ======================================
// SETTINGS
// ======================================

app.use(
    "/api/settings",
    settingsRoutes
);

// ======================================
// NOTIFICATIONS
// ======================================

app.use(
    "/api/notifications",
    notificationRoutes
);

// ======================================
// FILE UPLOADS
// ======================================

app.use(
    "/api/upload",
    uploadRoutes
);

// ======================================
// COMMUNICATION
// ======================================

app.use(
    "/api/communication",
    communicationRoutes
);

// ======================================
// AUTHENTICATOR / TOTP
// ======================================

app.use(
    "/api/totp",
    totpRoutes
);

// ======================================
// 404 HANDLER
// ======================================

app.use(
    (req, res) => {

        res.status(404).json({

            success: false,

            message:
                `Route not found: ${req.method} ${req.originalUrl}`,

        });

    }
);

// ======================================
// GLOBAL ERROR HANDLER
// ======================================

app.use(
    (err, req, res, next) => {

        console.error(
            "GLOBAL ERROR:",
            err
        );

        res.status(
            err.status || 500
        ).json({

            success: false,

            message:
                err.message ||
                "Internal Server Error",

        });

    }
);

// ======================================
// START SERVER
// ======================================

const server =
    app.listen(
        PORT,
        "0.0.0.0",
        () => {

            console.log("");
            console.log("======================================");
            console.log("🚀 SkillNova LMS Backend");
            console.log("======================================");

            console.log(
                `🌐 Server: http://localhost:${PORT}`
            );

            console.log(
                `💳 Payments: http://localhost:${PORT}/api/payment`
            );

            console.log(
                `👨‍🎓 Students: http://localhost:${PORT}/api/admin/students`
            );

            console.log(
                `👨‍🏫 Mentors: http://localhost:${PORT}/api/admin/mentors`
            );

            console.log(
                `🌐 Public Mentors: http://localhost:${PORT}/api/mentors/public`
            );

            console.log(
                `📚 Admin Courses: http://localhost:${PORT}/api/admin/courses`
            );

            console.log(
                `📦 Batches: http://localhost:${PORT}/api/batches`
            );

            console.log(
                `📊 Analytics: http://localhost:${PORT}/api/admin/analytics`
            );

            console.log(
                `📑 Reports: http://localhost:${PORT}/api/admin/reports`
            );

            console.log(
                `⚙️ Settings: http://localhost:${PORT}/api/settings`
            );

            console.log(
                `🔔 Notifications: http://localhost:${PORT}/api/notifications`
            );

            console.log(
                `📤 Uploads: http://localhost:${PORT}/api/upload`
            );

            console.log(
                `🖼️ Static Files: http://localhost:${PORT}/uploads`
            );

            console.log("======================================");
            console.log("");

            // ======================================
            // COMMUNICATION RUNTIME
            // ======================================

            try {

                communicationRuntime.start();

                console.log(
                    "📨 Communication runtime initialized"
                );

            } catch (
                error
            ) {

                console.error(
                    "❌ Communication runtime failed to start:",
                    error
                );

            }

        }
    );

// ======================================
// GRACEFUL SHUTDOWN
// ======================================

let isShuttingDown =
    false;

const gracefulShutdown =
    async (
        signal
    ) => {

        if (
            isShuttingDown
        ) {

            return;
        }

        isShuttingDown =
            true;

        console.log("");
        console.log(
            `🛑 Received ${signal}. Shutting down gracefully...`
        );

        // ======================================
        // STOP COMMUNICATION SERVICES
        // ======================================

        try {

            communicationRuntime.stop();

        } catch (
            error
        ) {

            console.error(
                "❌ Communication runtime shutdown failed:",
                error
            );

        }

        // ======================================
        // STOP HTTP SERVER
        // ======================================

        server.close(
            () => {

                console.log(
                    "🌐 HTTP server stopped"
                );

                console.log(
                    "✅ Backend shutdown complete"
                );

                process.exit(
                    0
                );

            }
        );

        // ======================================
        // SHUTDOWN TIMEOUT
        // ======================================

        setTimeout(
            () => {

                console.error(
                    "⚠️ Graceful shutdown timed out"
                );

                process.exit(
                    1
                );

            },
            10000
        ).unref();

    };

// ======================================
// PROCESS SIGNALS
// ======================================

process.on(
    "SIGINT",
    () => {

        gracefulShutdown(
            "SIGINT"
        );

    }
);

process.on(
    "SIGTERM",
    () => {

        gracefulShutdown(
            "SIGTERM"
        );

    }
);

// ======================================
// UNHANDLED ERRORS
// ======================================

process.on(
    "uncaughtException",
    (error) => {

        console.error(
            "❌ UNCAUGHT EXCEPTION:",
            error
        );

        gracefulShutdown(
            "uncaughtException"
        );

    }
);

process.on(
    "unhandledRejection",
    (reason) => {

        console.error(
            "❌ UNHANDLED REJECTION:",
            reason
        );

        gracefulShutdown(
            "unhandledRejection"
        );

    }
);