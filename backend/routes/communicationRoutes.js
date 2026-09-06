// ======================================
// DataLattice - Communication Routes
// ======================================

const express =
    require("express");

const router =
    express.Router();

const verifyToken =
    require("../middleware/authMiddleware");

const authorizeRoles =
    require("../middleware/authorizeRoles");

const communicationController =
    require("../controllers/communicationController");


// ======================================
// ADMIN AUTHORIZATION
// ======================================
//
// Everything under this router is restricted
// to administrative users.
//
// ======================================

router.use(
    verifyToken,
    authorizeRoles(
        "admin",
        "super_admin"
    )
);


// ======================================
// COMMUNICATION HEALTH
// ======================================

router.get(
    "/health",
    communicationController.getCommunicationHealth
);


// ======================================
// COMMUNICATION STATUS
// ======================================

router.get(
    "/status",
    communicationController.getCommunicationStatus
);


// ======================================
// COMMUNICATION QUEUE
// ======================================

router.get(
    "/queue",
    communicationController.getCommunicationQueue
);


// ======================================
// DELIVERY STATUS
// ======================================

router.get(
    "/deliveries",
    communicationController.getCommunicationDeliveries
);


// ======================================
// PROVIDER STATUS
// ======================================

router.get(
    "/providers",
    communicationController.getCommunicationProviders
);


// ======================================
// AUTOMATION CENTER OVERVIEW
// ======================================

router.get(
    "/automation/overview",
    communicationController.getAutomationOverview
);


// ======================================
// AUTOMATION RULES
// ======================================

router.get(
    "/automation/rules",
    communicationController.getAutomationRules
);


// ======================================
// AUTOMATION RUNS
// ======================================

router.get(
    "/automation/runs",
    communicationController.getAutomationRuns
);


// ======================================
// AUTOMATION EVENTS
// ======================================

router.get(
    "/automation/events",
    communicationController.getAutomationEvents
);


// ======================================
// COMMUNICATION JOBS
// ======================================

router.get(
    "/jobs",
    communicationController.getCommunicationJobs
);


// ======================================
// EXPORT
// ======================================

module.exports =
    router;