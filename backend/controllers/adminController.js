const adminModel = require("../models/adminModel");

// ==========================================
// Dashboard Statistics
// ==========================================
exports.getDashboardStats = (req, res) => {
  adminModel.getDashboardStats((err, stats) => {
    if (err) {
      console.error(err);

      return res.status(500).json({
        success: false,
        message: "Failed to fetch dashboard statistics",
      });
    }

    res.status(200).json({
      success: true,
      stats,
    });
  });
};

// ==========================================
// Get All Students
// ==========================================
exports.getAllStudents = (req, res) => {
  adminModel.getAllStudents((err, students) => {
    if (err) {
      console.error(err);

      return res.status(500).json({
        success: false,
        message: "Failed to fetch students",
      });
    }

    res.status(200).json({
      success: true,
      total: students.length,
      students,
    });
  });
};

// ==========================================
// Delete Student
// ==========================================
exports.deleteStudent = (req, res) => {
  const { id } = req.params;

  adminModel.deleteStudent(id, (err, result) => {
    if (err) {
      console.error(err);

      return res.status(500).json({
        success: false,
        message: "Failed to delete student",
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Student deleted successfully",
    });
  });
};