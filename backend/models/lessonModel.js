const db = require("../database/db");

// ======================================
// CREATE LESSON
// ======================================

const createLesson = (
    lesson,
    callback
) => {

    const sql = `
        INSERT INTO lessons
        (
            course_id,
            title,
            description,
            video_url,
            pdf_url,
            lesson_order
        )
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            lesson.course_id,
            lesson.title,
            lesson.description || null,
            lesson.video_url || null,
            lesson.pdf_url || null,
            lesson.lesson_order,
        ],
        callback
    );

};


// ======================================
// GET ALL LESSONS
// ADMIN / MENTOR
// ======================================

const getAllLessons = (
    callback
) => {

    const sql = `
        SELECT
            lessons.id,
            lessons.course_id,
            lessons.title,
            lessons.description,
            lessons.video_url,
            lessons.pdf_url,
            lessons.lesson_order,
            lessons.created_at,
            courses.title AS course_title

        FROM lessons

        INNER JOIN courses
            ON lessons.course_id = courses.id

        ORDER BY
            lessons.course_id ASC,
            lessons.lesson_order ASC
    `;

    db.query(
        sql,
        callback
    );

};


// ======================================
// GET ALL LESSONS FOR STUDENT
// ======================================

const getAllLessonsForStudent = (
    studentId,
    callback
) => {

    const sql = `
        SELECT DISTINCT
            lessons.id,
            lessons.course_id,
            lessons.title,
            lessons.description,
            lessons.video_url,
            lessons.pdf_url,
            lessons.lesson_order,
            lessons.created_at,
            courses.title AS course_title

        FROM lessons

        INNER JOIN courses
            ON lessons.course_id = courses.id

        LEFT JOIN batches
            ON batches.course_id = courses.id

        LEFT JOIN batch_students
            ON batch_students.batch_id = batches.id
            AND batch_students.student_id = ?

        LEFT JOIN enrollments
            ON enrollments.course_id = courses.id
            AND enrollments.user_id = ?

        WHERE
            batch_students.student_id IS NOT NULL
            OR enrollments.user_id IS NOT NULL

        ORDER BY
            lessons.course_id ASC,
            lessons.lesson_order ASC
    `;

    db.query(
        sql,
        [
            studentId,
            studentId
        ],
        callback
    );

};


// ======================================
// GET LESSONS BY COURSE
// ADMIN / MENTOR
// ======================================

const getLessonsByCourse = (
    courseId,
    callback
) => {

    const sql = `
        SELECT
            lessons.id,
            lessons.course_id,
            lessons.title,
            lessons.description,
            lessons.video_url,
            lessons.pdf_url,
            lessons.lesson_order,
            lessons.created_at,
            courses.title AS course_title

        FROM lessons

        INNER JOIN courses
            ON lessons.course_id = courses.id

        WHERE lessons.course_id = ?

        ORDER BY
            lessons.lesson_order ASC
    `;

    db.query(
        sql,
        [courseId],
        callback
    );

};


// ======================================
// GET LESSONS BY COURSE FOR STUDENT
// ======================================

const getLessonsByCourseForStudent = (
    courseId,
    studentId,
    callback
) => {

    const sql = `
        SELECT
            lessons.id,
            lessons.course_id,
            lessons.title,
            lessons.description,
            lessons.video_url,
            lessons.pdf_url,
            lessons.lesson_order,
            lessons.created_at,
            courses.title AS course_title

        FROM lessons

        INNER JOIN courses
            ON lessons.course_id = courses.id

        WHERE
            lessons.course_id = ?

            AND
            (
                EXISTS (
                    SELECT 1

                    FROM batches

                    INNER JOIN batch_students
                        ON batch_students.batch_id = batches.id

                    WHERE
                        batches.course_id = courses.id
                        AND batch_students.student_id = ?
                )

                OR

                EXISTS (
                    SELECT 1

                    FROM enrollments

                    WHERE
                        enrollments.course_id = courses.id
                        AND enrollments.user_id = ?
                )
            )

        ORDER BY
            lessons.lesson_order ASC
    `;

    db.query(
        sql,
        [
            courseId,
            studentId,
            studentId
        ],
        callback
    );

};


// ======================================
// GET LESSON BY ID
// ADMIN / MENTOR
// ======================================

const getLessonById = (
    id,
    callback
) => {

    const sql = `
        SELECT
            lessons.id,
            lessons.course_id,
            lessons.title,
            lessons.description,
            lessons.video_url,
            lessons.pdf_url,
            lessons.lesson_order,
            lessons.created_at,
            courses.title AS course_title

        FROM lessons

        INNER JOIN courses
            ON lessons.course_id = courses.id

        WHERE lessons.id = ?
    `;

    db.query(
        sql,
        [id],
        callback
    );

};


// ======================================
// GET LESSON BY ID FOR STUDENT
// ======================================

const getLessonByIdForStudent = (
    lessonId,
    studentId,
    callback
) => {

    const sql = `
        SELECT
            lessons.id,
            lessons.course_id,
            lessons.title,
            lessons.description,
            lessons.video_url,
            lessons.pdf_url,
            lessons.lesson_order,
            lessons.created_at,
            courses.title AS course_title

        FROM lessons

        INNER JOIN courses
            ON lessons.course_id = courses.id

        WHERE
            lessons.id = ?

            AND
            (
                EXISTS (
                    SELECT 1

                    FROM batches

                    INNER JOIN batch_students
                        ON batch_students.batch_id = batches.id

                    WHERE
                        batches.course_id = courses.id
                        AND batch_students.student_id = ?
                )

                OR

                EXISTS (
                    SELECT 1

                    FROM enrollments

                    WHERE
                        enrollments.course_id = courses.id
                        AND enrollments.user_id = ?
                )
            )
    `;

    db.query(
        sql,
        [
            lessonId,
            studentId,
            studentId
        ],
        callback
    );

};


// ======================================
// UPDATE LESSON
// ======================================

const updateLesson = (
    id,
    lesson,
    callback
) => {

    const sql = `
        UPDATE lessons

        SET
            course_id = ?,
            title = ?,
            description = ?,
            video_url = ?,
            pdf_url = ?,
            lesson_order = ?

        WHERE id = ?
    `;

    db.query(
        sql,
        [
            lesson.course_id,
            lesson.title,
            lesson.description || null,
            lesson.video_url || null,
            lesson.pdf_url || null,
            lesson.lesson_order,
            id,
        ],
        callback
    );

};


// ======================================
// DELETE LESSON
// ======================================

const deleteLesson = (
    id,
    callback
) => {

    db.query(
        `
            DELETE FROM lessons
            WHERE id = ?
        `,
        [id],
        callback
    );

};


// ======================================
// EXPORT
// ======================================

module.exports = {

    createLesson,

    getAllLessons,

    getAllLessonsForStudent,

    getLessonsByCourse,

    getLessonsByCourseForStudent,

    getLessonById,

    getLessonByIdForStudent,

    updateLesson,

    deleteLesson,

};