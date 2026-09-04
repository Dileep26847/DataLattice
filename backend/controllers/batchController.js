const batchModel = require("../models/batchModel");

// ======================================
// Create Batch
// ======================================
exports.createBatch = (req, res) => {

  const {
    batch_name,
    course_id,
    mentor_name,
    start_date,
    end_date,
    status,
  } = req.body;

  if (!batch_name || !course_id) {

    return res.status(400).json({
      success: false,
      message: "Batch Name and Course are required.",
    });

  }

  batchModel.createBatch(
    {
      batch_name,
      course_id,
      mentor_name,
      start_date,
      end_date,
      status: status || "Upcoming",
    },
    (err) => {

      if (err) {

        return res.status(500).json({
          success: false,
          message: err.message,
        });

      }

      return res.status(201).json({
        success: true,
        message: "Batch created successfully.",
      });

    }
  );

};

// ======================================
// Get All Batches
// ======================================
exports.getAllBatches = (req, res) => {

  batchModel.getAllBatches((err, batches) => {

    if (err) {

      return res.status(500).json({
        success: false,
        message: err.message,
      });

    }

    return res.status(200).json({
      success: true,
      total: batches.length,
      batches,
    });

  });

};

// ======================================
// Get Batch By ID
// ======================================
exports.getBatchById = (req, res) => {

  batchModel.getBatchById(
    req.params.id,
    (err, result) => {

      if (err) {

        return res.status(500).json({
          success: false,
          message: err.message,
        });

      }

      if (result.length === 0) {

        return res.status(404).json({
          success: false,
          message: "Batch not found.",
        });

      }

      return res.status(200).json({
        success: true,
        batch: result[0],
      });

    }
  );

};

// ======================================
// Update Batch
// ======================================
exports.updateBatch = (req, res) => {

  batchModel.updateBatch(
    req.params.id,
    req.body,
    (err) => {

      if (err) {

        return res.status(500).json({
          success: false,
          message: err.message,
        });

      }

      return res.status(200).json({
        success: true,
        message: "Batch updated successfully.",
      });

    }
  );

};

// ======================================
// Delete Batch
// ======================================
exports.deleteBatch = (req, res) => {

  batchModel.deleteBatch(
    req.params.id,
    (err) => {

      if (err) {

        return res.status(500).json({
          success: false,
          message: err.message,
        });

      }

      return res.status(200).json({
        success: true,
        message: "Batch deleted successfully.",
      });

    }
  );

};

// ======================================
// Assign Student To Batch
// ======================================
exports.assignStudent = (req, res) => {

  const {
    batch_id,
    student_id,
  } = req.body;

  if (!batch_id || !student_id) {

    return res.status(400).json({
      success: false,
      message: "Batch ID and Student ID are required.",
    });

  }

  batchModel.assignStudent(
    batch_id,
    student_id,
    (err) => {

      if (err) {

        return res.status(500).json({
          success: false,
          message: err.message,
        });

      }

      return res.status(200).json({
        success: true,
        message: "Student assigned successfully.",
      });

    }
  );

};

// ======================================
// Get Students In Batch
// ======================================
exports.getBatchStudents = (req, res) => {

  batchModel.getBatchStudents(
    req.params.batchId,
    (err, students) => {

      if (err) {

        return res.status(500).json({
          success: false,
          message: err.message,
        });

      }

      return res.status(200).json({
        success: true,
        total: students.length,
        students,
      });

    }
  );

};