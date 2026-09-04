const db = require("../database/db");


// ============================================================
// CREATE STUDENT
// USER + STUDENT PROFILE
// ============================================================

const createStudent = (
    student,
    callback
) => {

    db.beginTransaction(
        (transactionError) => {

            if (transactionError) {

                return callback(
                    transactionError
                );

            }


            // =================================================
            // CREATE USER
            // =================================================

            const userSql = `

                INSERT INTO users
                (
                    full_name,
                    email,
                    password,
                    role
                )

                VALUES
                (
                    ?,
                    ?,
                    ?,
                    'student'
                )

            `;


            db.query(

                userSql,

                [
                    student.full_name,
                    student.email,
                    student.password
                ],

                (
                    userError,
                    userResult
                ) => {

                    if (userError) {

                        return db.rollback(
                            () => callback(
                                userError
                            )
                        );

                    }


                    const userId =
                        userResult.insertId;


                    // =========================================
                    // CREATE STUDENT PROFILE
                    // =========================================

                    const profileSql = `

                        INSERT INTO student_profiles
                        (
                            user_id,
                            batch_id,
                            admission_date,
                            education,
                            college_name,
                            graduation_year,
                            phone,
                            address,
                            city,
                            state,
                            country,
                            linkedin_url,
                            github_url,
                            resume_url,
                            profile_image,
                            certificate_status,
                            placement_status
                        )

                        VALUES
                        (
                            ?,
                            ?,
                            ?,
                            ?,
                            ?,
                            ?,
                            ?,
                            ?,
                            ?,
                            ?,
                            ?,
                            ?,
                            ?,
                            ?,
                            ?,
                            ?,
                            ?
                        )

                    `;


                    db.query(

                        profileSql,

                        [

                            userId,

                            student.batch_id ||
                                null,

                            student.admission_date ||
                                null,

                            student.education ||
                                null,

                            student.college_name ||
                                null,

                            student.graduation_year ||
                                null,

                            student.phone ||
                                null,

                            student.address ||
                                null,

                            student.city ||
                                null,

                            student.state ||
                                null,

                            student.country ||
                                null,

                            student.linkedin_url ||
                                null,

                            student.github_url ||
                                null,

                            student.resume_url ||
                                null,

                            student.profile_image ||
                                null,

                            student.certificate_status ||
                                "Pending",

                            student.placement_status ||
                                "Training",

                        ],

                        (profileError) => {

                            if (profileError) {

                                return db.rollback(
                                    () =>
                                        callback(
                                            profileError
                                        )
                                );

                            }


                            // =================================
                            // COMMIT
                            // =================================

                            db.commit(
                                (commitError) => {

                                    if (commitError) {

                                        return db.rollback(
                                            () =>
                                                callback(
                                                    commitError
                                                )
                                        );

                                    }


                                    callback(
                                        null,
                                        {
                                            user_id:
                                                userId
                                        }
                                    );

                                }
                            );

                        }

                    );

                }

            );

        }
    );

};


// ============================================================
// GET STUDENT BY ID
// ============================================================

const getStudentById = (
    studentId,
    callback
) => {

    const sql = `

        SELECT

            u.id,

            u.full_name,

            u.email,

            u.role,

            u.created_at,

            sp.id AS profile_id,

            sp.user_id AS profile_user_id,

            sp.batch_id,

            b.batch_name,

            sp.admission_date,

            sp.education,

            sp.college_name,

            sp.graduation_year,

            sp.phone,

            sp.address,

            sp.city,

            sp.state,

            sp.country,

            sp.linkedin_url,

            sp.github_url,

            sp.resume_url,

            sp.profile_image,

            sp.certificate_status,

            sp.placement_status,

            sp.created_at AS profile_created_at,

            sp.updated_at AS profile_updated_at

        FROM users u

        LEFT JOIN student_profiles sp

            ON u.id = sp.user_id

        LEFT JOIN batches b

            ON sp.batch_id = b.id

        WHERE

            u.id = ?

            AND u.role = 'student'

        LIMIT 1

    `;


    db.query(

        sql,

        [studentId],

        callback

    );

};


// ============================================================
// UPDATE USER
// ============================================================

const updateUser = (
    connection,
    studentId,
    fullName,
    email,
    callback
) => {

    const sql = `

        UPDATE users

        SET

            full_name = ?,

            email = ?

        WHERE

            id = ?

            AND role = 'student'

    `;


    connection.query(

        sql,

        [
            fullName,
            email,
            studentId
        ],

        callback

    );

};


// ============================================================
// UPDATE USER WITH PASSWORD
// ============================================================

const updateUserWithPassword = (
    connection,
    studentId,
    fullName,
    email,
    hashedPassword,
    callback
) => {

    const sql = `

        UPDATE users

        SET

            full_name = ?,

            email = ?,

            password = ?

        WHERE

            id = ?

            AND role = 'student'

    `;


    connection.query(

        sql,

        [
            fullName,
            email,
            hashedPassword,
            studentId
        ],

        callback

    );

};


// ============================================================
// UPSERT STUDENT PROFILE
// ============================================================

const upsertStudentProfile = (
    connection,
    profile,
    callback
) => {

    const sql = `

        INSERT INTO student_profiles
        (
            user_id,
            batch_id,
            admission_date,
            education,
            college_name,
            graduation_year,
            phone,
            address,
            city,
            state,
            country,
            linkedin_url,
            github_url,
            resume_url,
            profile_image,
            certificate_status,
            placement_status
        )

        VALUES
        (
            ?,
            ?,
            ?,
            ?,
            ?,
            ?,
            ?,
            ?,
            ?,
            ?,
            ?,
            ?,
            ?,
            ?,
            ?,
            ?,
            ?
        )

        ON DUPLICATE KEY UPDATE

            batch_id =
                VALUES(batch_id),

            admission_date =
                VALUES(admission_date),

            education =
                VALUES(education),

            college_name =
                VALUES(college_name),

            graduation_year =
                VALUES(graduation_year),

            phone =
                VALUES(phone),

            address =
                VALUES(address),

            city =
                VALUES(city),

            state =
                VALUES(state),

            country =
                VALUES(country),

            linkedin_url =
                VALUES(linkedin_url),

            github_url =
                VALUES(github_url),

            resume_url =
                VALUES(resume_url),

            profile_image =
                VALUES(profile_image),

            certificate_status =
                VALUES(certificate_status),

            placement_status =
                VALUES(placement_status)

    `;


    connection.query(

        sql,

        [

            profile.user_id,

            profile.batch_id,

            profile.admission_date,

            profile.education,

            profile.college_name,

            profile.graduation_year,

            profile.phone,

            profile.address,

            profile.city,

            profile.state,

            profile.country,

            profile.linkedin_url,

            profile.github_url,

            profile.resume_url,

            profile.profile_image,

            profile.certificate_status,

            profile.placement_status,

        ],

        callback

    );

};


// ============================================================
// GET ALL STUDENTS
// ============================================================

const getAllStudents = (
    callback
) => {

    const sql = `

        SELECT

            u.id,

            u.full_name,

            u.email,

            u.role,

            u.created_at,

            sp.id AS profile_id,

            sp.user_id AS profile_user_id,

            sp.phone,

            sp.education,

            sp.college_name,

            sp.graduation_year,

            sp.batch_id,

            b.batch_name,

            sp.admission_date,

            sp.address,

            sp.city,

            sp.state,

            sp.country,

            sp.linkedin_url,

            sp.github_url,

            sp.resume_url,

            sp.profile_image,

            sp.placement_status,

            sp.certificate_status

        FROM users u

        LEFT JOIN student_profiles sp

            ON u.id = sp.user_id

        LEFT JOIN batches b

            ON sp.batch_id = b.id

        WHERE

            u.role = 'student'

        ORDER BY

            u.id DESC

    `;


    db.query(

        sql,

        callback

    );

};


// ============================================================
// GET BATCHES
// ============================================================

const getBatches = (
    callback
) => {

    const sql = `

        SELECT

            id,

            batch_name,

            course_id,

            mentor_name,

            start_date,

            end_date,

            status,

            created_at

        FROM batches

        ORDER BY

            id DESC

    `;


    db.query(

        sql,

        callback

    );

};


// ============================================================
// DELETE STUDENT
// ============================================================

const deleteStudent = (
    studentId,
    callback
) => {

    const sql = `

        DELETE FROM users

        WHERE id = ?

        AND role = 'student'

    `;


    db.query(

        sql,

        [studentId],

        callback

    );

};


// ============================================================
// EXPORTS
// ============================================================

module.exports = {

    createStudent,

    getStudentById,

    updateUser,

    updateUserWithPassword,

    upsertStudentProfile,

    getAllStudents,

    getBatches,

    deleteStudent,

};