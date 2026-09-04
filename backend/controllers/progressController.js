const progressModel = require("../models/progressModel");

// ======================================
// Mark Lesson Complete
// ======================================
exports.markLessonComplete = (req, res) => {

  const { course_id, lesson_id } = req.body;

  if (!course_id || !lesson_id) {
    return res.status(400).json({
      success: false,
      message: "Course ID and Lesson ID are required",
    });
  }

  progressModel.markLessonComplete(
    {
      user_id: req.user.id,
      course_id,
      lesson_id,
    },
    (err) => {

      if (err) {
        return res.status(500).json({
          success: false,
          message: err.message,
        });
      }

      return res.status(200).json({
        success: true,
        message: "Lesson marked as completed.",
      });

    }
  );

};

// ======================================
// Get Completed Lessons
// ======================================
exports.getCompletedLessons = (req, res) => {

  const { courseId } = req.params;

  progressModel.getCompletedLessons(
    req.user.id,
    courseId,
    (err, results) => {

      if (err) {
        return res.status(500).json({
          success: false,
          message: err.message,
        });
      }

      return res.status(200).json({
        success: true,
        completedLessons: results,
      });

    }
  );

};

// ======================================
// Get Course Progress
// ======================================
exports.getCourseProgress = (req, res) => {

  const { courseId } = req.params;

  progressModel.getCourseProgress(
    req.user.id,
    courseId,
    (err, result) => {

      if (err) {
        return res.status(500).json({
          success: false,
          message: err.message,
        });
      }

      const completed = Number(result[0]?.completedLessons || 0);
      const total = Number(result[0]?.totalLessons || 0);

      const progress =
        total === 0
          ? 0
          : Math.round((completed / total) * 100);

      return res.status(200).json({
        success: true,
        completedLessons: completed,
        totalLessons: total,
        progress,
      });

    }
  );

};

// ======================================
// Resume Learning
// ======================================
exports.resumeLearning = (req, res) => {

  const { courseId } = req.params;

  progressModel.getNextLesson(
    req.user.id,
    courseId,
    (err, lessons) => {

      if (err) {

        return res.status(500).json({
          success: false,
          message: err.message,
        });

      }

      return res.status(200).json({

        success: true,

        lesson: lessons.length > 0 ? lessons[0] : null,

      });

    }
  );

};