const db = require("../database/db");

// ============================================================
// GET STUDENT DASHBOARD STATISTICS
// ============================================================

const getDashboardStats = (
    studentId,
    callback
) => {

    /*
     * A student can access a course through:
     *
     * 1. Direct enrollment
     * 2. Batch assignment
     *
     * The UNION removes duplicates when the student
     * has both direct enrollment and batch access.
     */

    const sql = `

        SELECT

            /* ==================================================
               TOTAL COURSES
            ================================================== */

            (
                SELECT COUNT(*)
                FROM (

                    SELECT DISTINCT course_id
                    FROM enrollments
                    WHERE user_id = ?

                    UNION

                    SELECT DISTINCT b.course_id
                    FROM batches b

                    INNER JOIN batch_students bs
                        ON bs.batch_id = b.id

                    WHERE bs.student_id = ?

                ) accessible_courses
            ) AS totalCourses,


            /* ==================================================
               COMPLETED LESSONS
            ================================================== */

            (
                SELECT COUNT(DISTINCT lp.lesson_id)

                FROM lesson_progress lp

                INNER JOIN lessons l
                    ON l.id = lp.lesson_id

                INNER JOIN (

                    SELECT DISTINCT course_id
                    FROM enrollments
                    WHERE user_id = ?

                    UNION

                    SELECT DISTINCT b.course_id
                    FROM batches b

                    INNER JOIN batch_students bs
                        ON bs.batch_id = b.id

                    WHERE bs.student_id = ?

                ) accessible_courses

                    ON accessible_courses.course_id =
                       l.course_id

                WHERE lp.user_id = ?
                  AND lp.completed = TRUE
            ) AS completedLessons,


            /* ==================================================
               TOTAL LESSONS
            ================================================== */

            (
                SELECT COUNT(*)

                FROM lessons l

                INNER JOIN (

                    SELECT DISTINCT course_id
                    FROM enrollments
                    WHERE user_id = ?

                    UNION

                    SELECT DISTINCT b.course_id
                    FROM batches b

                    INNER JOIN batch_students bs
                        ON bs.batch_id = b.id

                    WHERE bs.student_id = ?

                ) accessible_courses

                    ON accessible_courses.course_id =
                       l.course_id

            ) AS totalLessons,


            /* ==================================================
               TOTAL ASSIGNMENTS
            ================================================== */

            (
                SELECT COUNT(*)

                FROM assignments a

                INNER JOIN (

                    SELECT DISTINCT course_id
                    FROM enrollments
                    WHERE user_id = ?

                    UNION

                    SELECT DISTINCT b.course_id
                    FROM batches b

                    INNER JOIN batch_students bs
                        ON bs.batch_id = b.id

                    WHERE bs.student_id = ?

                ) accessible_courses

                    ON accessible_courses.course_id =
                       a.course_id

            ) AS totalAssignments,


            /* ==================================================
               SUBMITTED ASSIGNMENTS
            ================================================== */

            (
                SELECT COUNT(DISTINCT a.id)

                FROM assignments a

                INNER JOIN (

                    SELECT DISTINCT course_id
                    FROM enrollments
                    WHERE user_id = ?

                    UNION

                    SELECT DISTINCT b.course_id
                    FROM batches b

                    INNER JOIN batch_students bs
                        ON bs.batch_id = b.id

                    WHERE bs.student_id = ?

                ) accessible_courses

                    ON accessible_courses.course_id =
                       a.course_id

                INNER JOIN assignment_submissions s
                    ON s.assignment_id = a.id
                    AND s.student_id = ?

            ) AS submittedAssignments

    `;


    db.query(

        sql,

        [

            // totalCourses
            studentId,
            studentId,

            // completedLessons
            studentId,
            studentId,
            studentId,

            // totalLessons
            studentId,
            studentId,

            // totalAssignments
            studentId,
            studentId,

            // submittedAssignments
            studentId,
            studentId,
            studentId

        ],

        (err, result) => {

            if (err) {

                return callback(err);

            }


            const stats =
                result?.[0] || {};


            const totalLessons =
                Number(
                    stats.totalLessons || 0
                );


            const completedLessons =
                Number(
                    stats.completedLessons || 0
                );


            const overallProgress =
                totalLessons > 0

                    ? Math.min(
                        100,
                        Math.round(
                            (
                                completedLessons /
                                totalLessons
                            ) * 100
                        )
                    )

                    : 0;


            callback(

                null,

                [{

                    totalCourses:
                        Number(
                            stats.totalCourses || 0
                        ),

                    completedLessons,

                    totalLessons,

                    totalAssignments:
                        Number(
                            stats.totalAssignments || 0
                        ),

                    submittedAssignments:
                        Number(
                            stats.submittedAssignments || 0
                        ),

                    overallProgress

                }]

            );

        }

    );

};


// ============================================================
// GET STUDENT COURSES
// ============================================================

const getMyCourses = (
    studentId,
    callback
) => {

    /*
     * Build one unified list of courses available
     * to this student.
     *
     * Direct enrollment OR batch assignment.
     */

    const sql = `

        SELECT

            accessible.course_id,

            accessible.enrollment_id,

            accessible.enrolled_at,

            c.title,

            c.description,

            c.thumbnail,

            c.price,

            c.level,

            c.duration,

            c.language,

            c.category,

            c.instructor,

            c.status,


            /* ==================================================
               TOTAL LESSONS
            ================================================== */

            (
                SELECT COUNT(*)

                FROM lessons l

                WHERE l.course_id =
                      accessible.course_id

            ) AS totalLessons,


            /* ==================================================
               COMPLETED LESSONS
            ================================================== */

            (
                SELECT COUNT(DISTINCT lp.lesson_id)

                FROM lesson_progress lp

                INNER JOIN lessons l2
                    ON l2.id = lp.lesson_id

                WHERE lp.user_id = ?

                  AND lp.course_id =
                      accessible.course_id

                  AND lp.completed = TRUE

            ) AS completedLessons


        FROM (

            /* ==================================================
               DIRECT ENROLLMENTS
            ================================================== */

            SELECT

                e.course_id,

                e.id AS enrollment_id,

                e.enrolled_at

            FROM enrollments e

            WHERE e.user_id = ?


            UNION


            /* ==================================================
               BATCH COURSES
            ================================================== */

            SELECT

                b.course_id,

                NULL AS enrollment_id,

                NULL AS enrolled_at

            FROM batches b

            INNER JOIN batch_students bs
                ON bs.batch_id = b.id

            WHERE bs.student_id = ?

        ) accessible


        INNER JOIN courses c
            ON c.id = accessible.course_id


        GROUP BY

            accessible.course_id,
            accessible.enrollment_id,
            accessible.enrolled_at,
            c.id


        ORDER BY

            CASE

                WHEN accessible.enrolled_at IS NULL
                    THEN 1

                ELSE 0

            END,

            accessible.enrolled_at DESC,

            c.id DESC

    `;


    db.query(

        sql,

        [

            // completedLessons
            studentId,

            // direct enrollment
            studentId,

            // batch assignment
            studentId

        ],

        (err, results) => {

            if (err) {

                return callback(err);

            }


            const courses =
                (results || []).map(
                    (course) => {

                        const totalLessons =
                            Number(
                                course.totalLessons || 0
                            );


                        const completedLessons =
                            Math.min(

                                totalLessons,

                                Number(
                                    course.completedLessons ||
                                    0
                                )

                            );


                        const progress =

                            totalLessons > 0

                                ? Math.min(

                                    100,

                                    Math.round(

                                        (
                                            completedLessons /
                                            totalLessons
                                        ) * 100

                                    )

                                )

                                : 0;


                        return {

                            ...course,

                            totalLessons,

                            completedLessons,

                            progress

                        };

                    }
                );


            callback(

                null,

                courses

            );

        }

    );

};


// ============================================================
// EXPORTS
// ============================================================

module.exports = {

    getDashboardStats,

    getMyCourses

};