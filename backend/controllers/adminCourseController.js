const adminCourseModel = require("../models/adminCourseModel");

// ==========================================
// Get All Courses
// ==========================================
exports.getAllCourses = (req, res) => {
  adminCourseModel.getAllCourses((err, courses) => {
    if (err) {
      console.error(err);

      return res.status(500).json({
        success: false,
        message: "Failed to fetch courses",
      });
    }

    res.status(200).json({
      success: true,
      total: courses.length,
      courses,
    });
  });
};

// ==========================================
// Get Course By ID
// ==========================================
exports.getCourseById = (req, res) => {
  const { id } = req.params;

  adminCourseModel.getCourseById(id, (err, result) => {
    if (err) {
      console.error(err);

      return res.status(500).json({
        success: false,
        message: "Failed to fetch course",
      });
    }

    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    res.status(200).json({
      success: true,
      course: result[0],
    });
  });
};

// ==========================================
// Add Course
// ==========================================
exports.addCourse = (req, res) => {
  const {
    title,
    description,
    instructor,
    category,
    price,
    thumbnail,
  } = req.body;

  if (
    !title ||
    !description ||
    !instructor ||
    !category ||
    price === undefined
  ) {
    return res.status(400).json({
      success: false,
      message: "Please fill all required fields",
    });
  }

  adminCourseModel.addCourse(
    {
      title,
      description,
      instructor,
      category,
      price,
      thumbnail,
    },
    (err, result) => {
      if (err) {
        console.error(err);

        return res.status(500).json({
          success: false,
          message: "Failed to add course",
        });
      }

      res.status(201).json({
        success: true,
        message: "Course created successfully",
        courseId: result.insertId,
      });
    }
  );
};

// ==========================================
// Update Course
// ==========================================
exports.updateCourse = (req, res) => {
  const { id } = req.params;

  const {
    title,
    description,
    instructor,
    category,
    price,
    thumbnail,
  } = req.body;

  adminCourseModel.updateCourse(
    id,
    {
      title,
      description,
      instructor,
      category,
      price,
      thumbnail,
    },
    (err, result) => {
      if (err) {
        console.error(err);

        return res.status(500).json({
          success: false,
          message: "Failed to update course",
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: "Course not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Course updated successfully",
      });
    }
  );
};

// ==========================================
// Delete Course
// ==========================================
exports.deleteCourse = (req, res) => {
  const { id } = req.params;

  adminCourseModel.deleteCourse(id, (err, result) => {
    if (err) {
      console.error(err);

      return res.status(500).json({
        success: false,
        message: "Failed to delete course",
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    });
  });
};