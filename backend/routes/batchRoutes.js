const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");
const batchController = require("../controllers/batchController");

// ======================================
// Create Batch - ADMIN ONLY
// ======================================

router.post(
    "/",
    verifyToken,
    authorizeRoles("admin"),
    batchController.createBatch
);

// ======================================
// Get All Batches - ADMIN ONLY
// ======================================

router.get(
    "/",
    verifyToken,
    authorizeRoles("admin"),
    batchController.getAllBatches
);

// ======================================
// Get Batch By ID - ADMIN ONLY
// ======================================

router.get(
    "/:id",
    verifyToken,
    authorizeRoles("admin"),
    batchController.getBatchById
);

// ======================================
// Update Batch - ADMIN ONLY
// ======================================

router.put(
    "/:id",
    verifyToken,
    authorizeRoles("admin"),
    batchController.updateBatch
);

// ======================================
// Delete Batch - ADMIN ONLY
// ======================================

router.delete(
    "/:id",
    verifyToken,
    authorizeRoles("admin"),
    batchController.deleteBatch
);

// ======================================
// Assign Student To Batch - ADMIN ONLY
// ======================================

router.post(
    "/assign-student",
    verifyToken,
    authorizeRoles("admin"),
    batchController.assignStudent
);

// ======================================
// Get Students In Batch - ADMIN ONLY
// ======================================

router.get(
    "/students/:batchId",
    verifyToken,
    authorizeRoles("admin"),
    batchController.getBatchStudents
);

module.exports = router;