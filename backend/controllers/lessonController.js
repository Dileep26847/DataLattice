const lessonModel = require("../models/lessonModel");

// ======================================
// CREATE LESSON
// ADMIN ONLY
// ======================================

exports.createLesson = (req, res) => {

    const {
        course_id,
        title,
        description,
        video_url,
        pdf_url,
        lesson_order,
    } = req.body;

    if (
        !course_id ||
        !title ||
        lesson_order === undefined ||
        lesson_order === null ||
        lesson_order === ""
    ) {
        return res.status(400).json({
            success: false,
            message:
                "Course ID, Lesson Title and Lesson Order are required.",
        });
    }

    lessonModel.createLesson(
        {
            course_id,
            title,
            description,
            video_url,
            pdf_url,
            lesson_order,
        },
        (err, result) => {

            if (err) {

                console.error(
                    "CREATE LESSON ERROR:",
                    err
                );

                return res.status(500).json({
                    success: false,
                    message: err.message,
                });

            }

            return res.status(201).json({
                success: true,
                message: "Lesson Created Successfully",
                lessonId: result?.insertId,
            });

        }
    );
};


// ======================================
// GET ALL LESSONS
// ======================================

exports.getAllLessons = (req, res) => {

    const role = req.user.role;
    const userId = req.user.id;

    const callback = (err, results) => {

        if (err) {

            console.error(
                "GET ALL LESSONS ERROR:",
                err
            );

            return res.status(500).json({
                success: false,
                message: err.message,
            });

        }

        return res.status(200).json({
            success: true,
            total: results.length,
            lessons: results,
        });

    };


    // ADMIN / MENTOR

    if (
        role === "admin" ||
        role === "mentor"
    ) {

        return lessonModel.getAllLessons(
            callback
        );

    }


    // STUDENT

    if (role === "student") {

        return lessonModel.getAllLessonsForStudent(
            userId,
            callback
        );

    }


    return res.status(403).json({
        success: false,
        message: "Access denied.",
    });

};


// ======================================
// GET LESSONS BY COURSE
// ======================================

exports.getLessonsByCourse = (
    req,
    res
) => {

    const { courseId } = req.params;

    const role = req.user.role;
    const userId = req.user.id;

    const callback = (err, results) => {

        if (err) {

            console.error(
                "GET COURSE LESSONS ERROR:",
                err
            );

            return res.status(500).json({
                success: false,
                message: err.message,
            });

        }

        return res.status(200).json({
            success: true,
            total: results.length,
            lessons: results,
        });

    };


    // ADMIN / MENTOR

    if (
        role === "admin" ||
        role === "mentor"
    ) {

        return lessonModel.getLessonsByCourse(
            courseId,
            callback
        );

    }


    // STUDENT

    if (role === "student") {

        return lessonModel.getLessonsByCourseForStudent(
            courseId,
            userId,
            callback
        );

    }


    return res.status(403).json({
        success: false,
        message: "Access denied.",
    });

};


// ======================================
// GET LESSON BY ID
// ======================================

exports.getLessonById = (
    req,
    res
) => {

    const { id } = req.params;

    const role = req.user.role;
    const userId = req.user.id;

    const callback = (err, results) => {

        if (err) {

            console.error(
                "GET LESSON ERROR:",
                err
            );

            return res.status(500).json({
                success: false,
                message: err.message,
            });

        }

        if (
            !results ||
            results.length === 0
        ) {

            return res.status(404).json({
                success: false,
                message: "Lesson Not Found",
            });

        }

        return res.status(200).json({
            success: true,
            lesson: results[0],
        });

    };


    // ADMIN / MENTOR

    if (
        role === "admin" ||
        role === "mentor"
    ) {

        return lessonModel.getLessonById(
            id,
            callback
        );

    }


    // STUDENT

    if (role === "student") {

        return lessonModel.getLessonByIdForStudent(
            id,
            userId,
            callback
        );

    }


    return res.status(403).json({
        success: false,
        message: "Access denied.",
    });

};


// ======================================
// UPDATE LESSON
// ADMIN ONLY
// ======================================

exports.updateLesson = (
    req,
    res
) => {

    const { id } = req.params;

    const {
        course_id,
        title,
        description,
        video_url,
        pdf_url,
        lesson_order,
    } = req.body;


    if (
        !course_id ||
        !title ||
        lesson_order === undefined ||
        lesson_order === null ||
        lesson_order === ""
    ) {

        return res.status(400).json({
            success: false,
            message:
                "Course ID, Lesson Title and Lesson Order are required.",
        });

    }


    lessonModel.updateLesson(
        id,
        {
            course_id,
            title,
            description,
            video_url,
            pdf_url,
            lesson_order,
        },
        (err, result) => {

            if (err) {

                console.error(
                    "UPDATE LESSON ERROR:",
                    err
                );

                return res.status(500).json({
                    success: false,
                    message: err.message,
                });

            }


            if (
                result &&
                result.affectedRows === 0
            ) {

                return res.status(404).json({
                    success: false,
                    message: "Lesson Not Found",
                });

            }


            return res.status(200).json({
                success: true,
                message:
                    "Lesson Updated Successfully",
            });

        }
    );

};


// ======================================
// DELETE LESSON
// ADMIN ONLY
// ======================================

exports.deleteLesson = (
    req,
    res
) => {

    const { id } = req.params;


    lessonModel.deleteLesson(
        id,
        (err, result) => {

            if (err) {

                console.error(
                    "DELETE LESSON ERROR:",
                    err
                );

                return res.status(500).json({
                    success: false,
                    message: err.message,
                });

            }


            if (
                result &&
                result.affectedRows === 0
            ) {

                return res.status(404).json({
                    success: false,
                    message: "Lesson Not Found",
                });

            }


            return res.status(200).json({
                success: true,
                message:
                    "Lesson Deleted Successfully",
            });

        }
    );

};