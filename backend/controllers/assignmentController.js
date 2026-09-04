const assignmentModel = require("../models/assignmentModel");

// ======================================
// Create Assignment
// ======================================
exports.createAssignment = (req, res) => {

    const {
        course_id,
        title,
        description,
        due_date,
        total_marks,
        attachment_url
    } = req.body;

    if (!course_id || !title) {

        return res.status(400).json({
            success: false,
            message: "Course and Assignment Title are required."
        });

    }

    assignmentModel.createAssignment(
        {
            course_id,
            title,
            description,
            due_date,
            total_marks,
            attachment_url
        },
        (err) => {

            if (err) {

                return res.status(500).json({
                    success: false,
                    message: err.message
                });

            }

            return res.status(201).json({
                success: true,
                message: "Assignment Created Successfully"
            });

        }
    );

};

// ======================================
// Get All Assignments
// ======================================
exports.getAllAssignments = (req, res) => {

    assignmentModel.getAllAssignments((err, assignments) => {

        if (err) {

            return res.status(500).json({
                success: false,
                message: err.message
            });

        }

        return res.json({
            success: true,
            total: assignments.length,
            assignments
        });

    });

};

// ======================================
// Get Assignments By Course
// ======================================

exports.getAssignmentsByCourse = (req, res) => {

  assignmentModel.getAssignmentsByCourse(

    req.params.courseId,

    (err, assignments) => {

      if (err) {

        return res.status(500).json({
          success: false,
          message: err.message,
        });

      }

      return res.json({
        success: true,
        assignments,
      });

    }

  );

};

// ======================================
// Get Assignment
// ======================================
exports.getAssignmentById = (req, res) => {

    assignmentModel.getAssignmentById(
        req.params.id,
        (err, result) => {

            if (err) {

                return res.status(500).json({
                    success: false,
                    message: err.message
                });

            }

            if (result.length === 0) {

                return res.status(404).json({
                    success: false,
                    message: "Assignment Not Found"
                });

            }

            return res.json({
                success: true,
                assignment: result[0]
            });

        }
    );

};

// ======================================
// Update Assignment
// ======================================
exports.updateAssignment = (req, res) => {

    assignmentModel.updateAssignment(
        req.params.id,
        req.body,
        (err) => {

            if (err) {

                return res.status(500).json({
                    success: false,
                    message: err.message
                });

            }

            return res.json({
                success: true,
                message: "Assignment Updated Successfully"
            });

        }
    );

};

// ======================================
// Delete Assignment
// ======================================
exports.deleteAssignment = (req, res) => {

    assignmentModel.deleteAssignment(
        req.params.id,
        (err) => {

            if (err) {

                return res.status(500).json({
                    success: false,
                    message: err.message
                });

            }

            return res.json({
                success: true,
                message: "Assignment Deleted Successfully"
            });

        }
    );

};