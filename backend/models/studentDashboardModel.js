const db = require("../database/db");

// ============================================================
// GET STUDENT DASHBOARD STATISTICS
// ============================================================

const getDashboardStats = (
    studentId,
    callback
) => {

    const sql = `
        SELECT

            (
                SELECT COUNT(*)
                FROM enrollments
                WHERE user_id = ?
            ) AS totalCourses,

            (
                SELECT COUNT(*)
                FROM lesson_progress lp

                INNER JOIN lessons l
                    ON l.id = lp.lesson_id

                INNER JOIN enrollments e
                    ON e.course_id = l.course_id
                    AND e.user_id = ?

                WHERE lp.user_id = ?
                  AND lp.completed = TRUE
            ) AS completedLessons,

            (
                SELECT COUNT(*)
                FROM lessons l

                INNER JOIN enrollments e
                    ON e.course_id = l.course_id

                WHERE e.user_id = ?
            ) AS totalLessons,

            (
                SELECT COUNT(*)
                FROM assignments a

                INNER JOIN enrollments e
                    ON e.course_id = a.course_id

                WHERE e.user_id = ?
            ) AS totalAssignments,

            (
                SELECT COUNT(DISTINCT a.id)
                FROM assignments a

                INNER JOIN enrollments e
                    ON e.course_id = a.course_id

                INNER JOIN assignment_submissions s
                    ON s.assignment_id = a.id
                    AND s.student_id = ?

                WHERE e.user_id = ?
            ) AS submittedAssignments
    `;

    db.query(
        sql,
        [
            studentId,
            studentId,
            studentId,
            studentId,
            studentId,
            studentId,
            studentId
        ],
        (err, result) => {

            if (err) {
                return callback(err);
            }

            const stats = result?.[0] || {};

            const totalLessons =
                Number(stats.totalLessons || 0);

            const completedLessons =
                Number(stats.completedLessons || 0);

            const overallProgress =
                totalLessons > 0
                    ? Math.round(
                        (completedLessons / totalLessons) * 100
                    )
                    : 0;

            callback(
                null,
                [{
                    totalCourses:
                        Number(stats.totalCourses || 0),

                    completedLessons,

                    totalLessons,

                    totalAssignments:
                        Number(stats.totalAssignments || 0),

                    submittedAssignments:
                        Number(stats.submittedAssignments || 0),

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

    const sql = `

        SELECT

            e.id AS enrollment_id,

            c.id AS course_id,

            c.title,

            c.description,

            c.thumbnail,

            c.price,

            c.level,

            c.duration,

            c.language,

            c.category,

            e.enrolled_at,

            /* ================================================
               TOTAL LESSONS
            ================================================= */

            (
                SELECT COUNT(*)
                FROM lessons l
                WHERE l.course_id = c.id
            ) AS totalLessons,

            /* ================================================
               COMPLETED LESSONS
            ================================================= */

            (
                SELECT COUNT(*)
                FROM lesson_progress lp

                INNER JOIN lessons l2
                    ON l2.id = lp.lesson_id

                WHERE
                    lp.user_id = ?
                    AND lp.course_id = c.id
                    AND lp.completed = TRUE
            ) AS completedLessons

        FROM enrollments e

        INNER JOIN courses c
            ON c.id = e.course_id

        WHERE e.user_id = ?

        ORDER BY e.enrolled_at DESC

    `;

    db.query(
        sql,
        [
            studentId,
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
                                    course.completedLessons || 0
                                )
                            );

                        const progress =
                            totalLessons > 0
                                ? Math.round(
                                    (
                                        completedLessons /
                                        totalLessons
                                    ) * 100
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
// EXPORT
// ============================================================

module.exports = {

    getDashboardStats,

    getMyCourses

};