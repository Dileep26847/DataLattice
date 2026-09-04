const enrollmentModel =
  require("../models/enrollmentModel");

const db =
  require("../database/db");


// ======================================
// ENROLL STUDENT
// ======================================

exports.enrollStudent = (
  req,
  res
) => {

  let {
    user_id,
    course_id,
  } = req.body;


  // ======================================
  // Validate Course
  // ======================================

  if (!course_id) {

    return res.status(400).json({

      success: false,

      message:
        "Course ID is required",

    });

  }


  // ======================================
  // Student Can Only Enroll Themselves
  // ======================================

  if (
    req.user.role === "student"
  ) {

    user_id =
      req.user.id;

  }


  // ======================================
  // Admin Must Provide Student ID
  // ======================================

  if (
    req.user.role === "admin" &&
    !user_id
  ) {

    return res.status(400).json({

      success: false,

      message:
        "User ID is required for admin enrollment",

    });

  }


  // ======================================
  // Get Course
  // ======================================

  db.query(

    `

      SELECT

        id,

        title,

        price

      FROM courses

      WHERE id = ?

      LIMIT 1

    `,

    [course_id],

    (courseErr, courses) => {

      if (courseErr) {

        console.error(
          courseErr
        );

        return res.status(500).json({

          success: false,

          message:
            "Failed to fetch course",

        });

      }


      if (
        !courses ||
        courses.length === 0
      ) {

        return res.status(404).json({

          success: false,

          message:
            "Course not found",

        });

      }


      const course =
        courses[0];


      // ======================================
      // Student + Paid Course
      // ======================================

      if (

        req.user.role === "student" &&

        Number(course.price) > 0

      ) {

        return res.status(402).json({

          success: false,

          message:
            "This course requires payment before enrollment",

        });

      }


      // ======================================
      // Check Existing Enrollment
      // ======================================

      enrollmentModel.checkEnrollment(

        user_id,

        course_id,

        (checkErr, existing) => {

          if (checkErr) {

            return res.status(500).json({

              success: false,

              message:
                checkErr.message,

            });

          }


          if (
            existing.length > 0
          ) {

            return res.status(409).json({

              success: false,

              message:
                "Student is already enrolled in this course",

            });

          }


          // ======================================
          // Create Enrollment
          // ======================================

          enrollmentModel.enrollStudent(

            {

              user_id,

              course_id,

            },

            (err) => {

              if (err) {

                return res.status(500).json({

                  success: false,

                  message:
                    err.message,

                });

              }


              return res.status(201).json({

                success: true,

                message:
                  "Student Enrolled Successfully",

              });

            }

          );

        }

      );

    }

  );

};



// ======================================
// GET USER ENROLLMENTS
// ======================================

exports.getUserEnrollments = (
  req,
  res
) => {

  const requestedUserId =
    Number(
      req.params.userId
    );


  if (!requestedUserId) {

    return res.status(400).json({

      success: false,

      message:
        "Valid user ID is required",

    });

  }


  // ======================================
  // Student Ownership
  // ======================================

  if (

    req.user.role === "student" &&

    Number(req.user.id) !==
      requestedUserId

  ) {

    return res.status(403).json({

      success: false,

      message:
        "You are not authorized to access these enrollments",

    });

  }


  enrollmentModel.getUserEnrollments(

    requestedUserId,

    (err, results) => {

      if (err) {

        return res.status(500).json({

          success: false,

          message:
            err.message,

        });

      }


      return res.status(200).json({

        success: true,

        total:
          results.length,

        enrollments:
          results,

      });

    }

  );

};



// ======================================
// GET MY COURSES
// ======================================

exports.getMyCourses = (
  req,
  res
) => {

  enrollmentModel.getUserEnrollments(

    req.user.id,

    (err, results) => {

      if (err) {

        return res.status(500).json({

          success: false,

          message:
            err.message,

        });

      }


      return res.status(200).json({

        success: true,

        total:
          results.length,

        courses:
          results,

      });

    }

  );

};



// ======================================
// DELETE ENROLLMENT
// ======================================

exports.deleteEnrollment = (
  req,
  res
) => {

  const enrollmentId =
    Number(
      req.params.id
    );


  if (!enrollmentId) {

    return res.status(400).json({

      success: false,

      message:
        "Valid enrollment ID is required",

    });

  }


  // ======================================
  // ADMIN
  // ======================================

  if (
    req.user.role === "admin"
  ) {

    enrollmentModel.deleteEnrollment(

      enrollmentId,

      (err, result) => {

        if (err) {

          return res.status(500).json({

            success: false,

            message:
              err.message,

          });

        }


        if (
          result.affectedRows === 0
        ) {

          return res.status(404).json({

            success: false,

            message:
              "Enrollment not found",

          });

        }


        return res.status(200).json({

          success: true,

          message:
            "Enrollment Deleted Successfully",

        });

      }

    );

    return;

  }


  // ======================================
  // STUDENT
  // ======================================

  enrollmentModel.deleteEnrollmentByUserId(

    enrollmentId,

    req.user.id,

    (err, result) => {

      if (err) {

        return res.status(500).json({

          success: false,

          message:
            err.message,

        });

      }


      if (
        result.affectedRows === 0
      ) {

        return res.status(403).json({

          success: false,

          message:
            "You are not authorized to delete this enrollment",

        });

      }


      return res.status(200).json({

        success: true,

        message:
          "Enrollment Deleted Successfully",

      });

    }

  );

};