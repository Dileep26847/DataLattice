const courseModel = require("../models/courseModel");


// ============================================================
// GET COURSES
// ============================================================
//
// PUBLIC:
//   Returns the course catalogue.
//
// AUTHENTICATED STUDENT:
//   If authentication is available, student-specific
//   filtering can still be used.
//
// ADMIN / MENTOR:
//   Returns all courses.
//
// ============================================================

const getCourses = async (req, res) => {

  try {

    let courses = [];


    // ========================================================
    // PUBLIC VISITOR
    // ========================================================
    //
    // req.user does not exist for public requests.
    //
    // In this case return the complete course catalogue.
    //

    if (!req.user) {

      courses =
        await courseModel.getAllCourses();

    }


    // ========================================================
    // STUDENT
    // ========================================================

    else if (
      req.user.role === "student"
    ) {

      courses =
        await courseModel.getCoursesForStudent(
          req.user.id
        );

    }


    // ========================================================
    // ADMIN / MENTOR
    // ========================================================

    else {

      courses =
        await courseModel.getAllCourses();

    }


    // ========================================================
    // RESPONSE
    // ========================================================

    return res.status(200).json({

      success: true,

      total: Array.isArray(courses)
        ? courses.length
        : 0,

      courses:
        Array.isArray(courses)
          ? courses
          : [],

    });

  }

  catch (error) {

    console.error(
      "GET COURSES ERROR:",
      error
    );

    return res.status(500).json({

      success: false,

      message:
        "Failed to Fetch Courses",

      courses: [],

    });

  }

};


// ============================================================
// SEARCH COURSES
// ============================================================
//
// PUBLIC COURSE SEARCH
//
// GET /api/courses/search?q=python
//
// Searches common course fields without requiring login.
//
// ============================================================

const searchCourses = async (req, res) => {

  try {

    const keyword =
      String(
        req.query.q || ""
      )
        .trim()
        .toLowerCase();


    // ========================================================
    // EMPTY SEARCH
    // ========================================================

    if (!keyword) {

      const courses =
        await courseModel.getAllCourses();

      return res.status(200).json({

        success: true,

        total: courses.length,

        courses,

      });

    }


    // ========================================================
    // LOAD COURSES
    // ========================================================

    const allCourses =
      await courseModel.getAllCourses();


    // ========================================================
    // SEARCH
    // ========================================================

    const courses =
      allCourses.filter((course) => {

        const searchableText = [

          course.title,

          course.course_name,

          course.name,

          course.description,

          course.instructor,

          course.instructor_name,

          course.mentor,

          course.mentor_name,

          course.category,

          course.level,

        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();


        return searchableText.includes(
          keyword
        );

      });


    // ========================================================
    // RESPONSE
    // ========================================================

    return res.status(200).json({

      success: true,

      total: courses.length,

      courses,

    });

  }

  catch (error) {

    console.error(
      "SEARCH COURSES ERROR:",
      error
    );

    return res.status(500).json({

      success: false,

      message:
        "Failed to Search Courses",

      courses: [],

    });

  }

};


// ============================================================
// CREATE COURSE
// ============================================================

const createCourse = async (req, res) => {

  try {

    await courseModel.createCourse(
      req.body
    );

    return res.status(201).json({

      success: true,

      message:
        "Course Created Successfully",

    });

  }

  catch (error) {

    console.error(
      "CREATE COURSE ERROR:",
      error
    );

    return res.status(500).json({

      success: false,

      message:
        "Failed to Create Course",

    });

  }

};


// ============================================================
// UPDATE COURSE
// ============================================================

const updateCourse = async (req, res) => {

  try {

    await courseModel.updateCourse(

      req.params.id,

      req.body

    );

    return res.status(200).json({

      success: true,

      message:
        "Course Updated Successfully",

    });

  }

  catch (error) {

    console.error(
      "UPDATE COURSE ERROR:",
      error
    );

    return res.status(500).json({

      success: false,

      message:
        "Failed to Update Course",

    });

  }

};


// ============================================================
// DELETE COURSE
// ============================================================

const deleteCourse = async (req, res) => {

  try {

    await courseModel.deleteCourse(
      req.params.id
    );

    return res.status(200).json({

      success: true,

      message:
        "Course Deleted Successfully",

    });

  }

  catch (error) {

    console.error(
      "DELETE COURSE ERROR:",
      error
    );

    return res.status(500).json({

      success: false,

      message:
        "Failed to Delete Course",

    });

  }

};


// ============================================================
// EXPORTS
// ============================================================

module.exports = {

  getCourses,

  searchCourses,

  createCourse,

  updateCourse,

  deleteCourse,

};