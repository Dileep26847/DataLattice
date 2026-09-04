const express = require("express");

const router = express.Router();

const verifyToken =
    require("../middleware/authMiddleware");

const authorizeRoles =
    require("../middleware/authorizeRoles");

const adminStudentController =
    require("../controllers/adminStudentController");


// ============================================================
// GET ALL STUDENTS
// ============================================================

router.get(
    "/students",
    verifyToken,
  authorizeRoles("admin", "super_admin"),
    adminStudentController.getAllStudents
);


// ============================================================
// GET ONE STUDENT
// ============================================================

router.get(
    "/students/:id",
    verifyToken,
  authorizeRoles("admin", "super_admin"),
    adminStudentController.getStudent
);


// ============================================================
// GET AVAILABLE BATCHES
// ============================================================

router.get(
    "/student-batches",
    verifyToken,
  authorizeRoles("admin", "super_admin"),
    adminStudentController.getBatches
);


// ============================================================
// CREATE STUDENT
// ============================================================

router.post(
    "/create-student",
    verifyToken,
  authorizeRoles("admin", "super_admin"),
    adminStudentController.createStudent
);


// ============================================================
// UPDATE STUDENT
// ============================================================

router.put(
    "/update-student/:id",
    verifyToken,
  authorizeRoles("admin", "super_admin"),
    adminStudentController.updateStudent
);


// ============================================================
// DELETE STUDENT
// ============================================================

router.delete(
    "/delete-student/:id",
    verifyToken,
  authorizeRoles("admin", "super_admin"),
    adminStudentController.deleteStudent
);


// ============================================================
// EXPORT
// ============================================================

module.exports = router;