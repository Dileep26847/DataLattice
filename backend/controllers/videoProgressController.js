const videoProgressModel = require("../models/videoProgressModel");
const progressModel = require("../models/progressModel");

// ======================================
// Save Video Progress
// ======================================
exports.saveProgress = (req, res) => {

  const {
    course_id,
    lesson_id,
    watch_time = 0,
    watched_percentage = 0,
  } = req.body;

  if (!course_id || !lesson_id) {

    return res.status(400).json({
      success: false,
      message: "Course ID and Lesson ID are required",
    });

  }

  const safeWatchTime =
    Math.max(0, Number(watch_time) || 0);

  const safePercentage =
    Math.min(
      100,
      Math.max(
        0,
        Number(watched_percentage) || 0
      )
    );

  // Lesson is considered complete at 90%
  const completed =
    safePercentage >= 90;

  videoProgressModel.saveVideoProgress(
    {
      user_id: req.user.id,
      course_id,
      lesson_id,
      watch_time: safeWatchTime,
      watched_percentage: safePercentage,
      completed,
    },
    (err) => {

      if (err) {

        console.error(
          "SAVE VIDEO PROGRESS ERROR:",
          err
        );

        return res.status(500).json({
          success: false,
          message: "Failed to save video progress",
        });

      }

      // ======================================
      // Automatically mark LMS lesson complete
      // ======================================

      if (!completed) {

        return res.status(200).json({
          success: true,
          completed: false,
          message: "Video progress saved.",
        });

      }

      progressModel.markLessonComplete(
        {
          user_id: req.user.id,
          course_id,
          lesson_id,
        },
        (progressError) => {

          if (progressError) {

            console.error(
              "MARK LESSON COMPLETE ERROR:",
              progressError
            );

            return res.status(500).json({
              success: false,
              completed: true,
              message:
                "Video progress saved, but lesson completion could not be updated.",
            });

          }

          return res.status(200).json({
            success: true,
            completed: true,
            message:
              "Video progress and lesson completion saved.",
          });

        }
      );

    }
  );

};


// ======================================
// Get Saved Progress
// ======================================
exports.getProgress = (req, res) => {

  const { lessonId } = req.params;

  if (!lessonId) {

    return res.status(400).json({
      success: false,
      message: "Lesson ID is required",
    });

  }

  videoProgressModel.getVideoProgress(
    req.user.id,
    lessonId,
    (err, result) => {

      if (err) {

        console.error(
          "GET VIDEO PROGRESS ERROR:",
          err
        );

        return res.status(500).json({
          success: false,
          message: "Failed to load video progress",
        });

      }

      return res.status(200).json({
        success: true,
        progress:
          result?.length
            ? result[0]
            : null,
      });

    }
  );

};


// ======================================
// Mark Video Complete
// ======================================
exports.completeVideo = (req, res) => {

  const {
    course_id,
    lesson_id,
  } = req.body;

  if (!course_id || !lesson_id) {

    return res.status(400).json({
      success: false,
      message:
        "Course ID and Lesson ID are required",
    });

  }

  videoProgressModel.markVideoComplete(
    req.user.id,
    lesson_id,
    (err) => {

      if (err) {

        console.error(
          "MARK VIDEO COMPLETE ERROR:",
          err
        );

        return res.status(500).json({
          success: false,
          message: "Failed to mark video complete",
        });

      }

      // ======================================
      // Keep LMS lesson progress synchronized
      // ======================================

      progressModel.markLessonComplete(
        {
          user_id: req.user.id,
          course_id,
          lesson_id,
        },
        (progressError) => {

          if (progressError) {

            console.error(
              "MARK LESSON COMPLETE ERROR:",
              progressError
            );

            return res.status(500).json({
              success: false,
              message:
                "Video completed, but lesson progress could not be updated.",
            });

          }

          return res.status(200).json({
            success: true,
            completed: true,
            message:
              "Video and lesson marked complete.",
          });

        }
      );

    }
  );

};