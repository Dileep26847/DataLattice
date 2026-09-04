const db = require("../database/db");


// ============================================================
// CREATE MENTOR
// USER + MENTOR PROFILE
// ============================================================

const createMentor = (
  mentor,
  callback
) => {

  db.beginTransaction(
    (transactionError) => {

      if (transactionError) {

        return callback(
          transactionError
        );

      }


      // ======================================================
      // CREATE USER
      // ======================================================

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
          'mentor'
        )

      `;


      db.query(

        userSql,

        [
          mentor.full_name,
          mentor.email,
          mentor.password,
        ],

        (
          userError,
          userResult
        ) => {

          if (userError) {

            return db.rollback(
              () =>
                callback(
                  userError
                )
            );

          }


          const userId =
            userResult.insertId;


          // ==================================================
          // CREATE MENTOR PROFILE
          // ==================================================

          const mentorSql = `

            INSERT INTO mentor_profiles
            (
              user_id,
              phone,
              designation,
              specialization,
              experience
            )

            VALUES
            (
              ?,
              ?,
              ?,
              ?,
              ?
            )

          `;


          db.query(

            mentorSql,

            [
              userId,
              mentor.phone || null,
              mentor.designation || null,
              mentor.specialization || null,
              mentor.experience || null,
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


              // ==============================================
              // COMMIT
              // ==============================================

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
                      user_id: userId,
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
// GET ALL MENTORS
// ============================================================

const getMentors = (
  callback
) => {

  const sql = `

    SELECT

      u.id,

      u.full_name,

      u.email,

      u.role,

      u.created_at,

      mp.id AS mentor_profile_id,

      mp.user_id AS mentor_profile_user_id,

      mp.phone,

      mp.designation,

      mp.specialization,

      mp.experience

    FROM users u

    LEFT JOIN mentor_profiles mp

      ON u.id = mp.user_id

    WHERE

      u.role = 'mentor'

    ORDER BY

      u.id DESC

  `;


  db.query(
    sql,
    callback
  );

};


// ============================================================
// GET MENTOR BY ID
// ============================================================

const getMentorById = (
  mentorId,
  callback
) => {

  const sql = `

    SELECT

      u.id,

      u.full_name,

      u.email,

      u.role,

      u.created_at,

      mp.id AS mentor_profile_id,

      mp.user_id AS mentor_profile_user_id,

      mp.phone,

      mp.designation,

      mp.specialization,

      mp.experience

    FROM users u

    LEFT JOIN mentor_profiles mp

      ON u.id = mp.user_id

    WHERE

      u.id = ?

      AND u.role = 'mentor'

    LIMIT 1

  `;


  db.query(

    sql,

    [mentorId],

    callback

  );

};


// ============================================================
// UPDATE MENTOR
// USER + EXISTING PROFILE
// ============================================================

const updateMentor = (
  id,
  mentor,
  callback
) => {

  db.beginTransaction(
    (transactionError) => {

      if (transactionError) {

        return callback(
          transactionError
        );

      }


      // ======================================================
      // UPDATE USER
      // ======================================================

      const userSql = `

        UPDATE users

        SET

          full_name = ?,

          email = ?

        WHERE

          id = ?

          AND role = 'mentor'

      `;


      db.query(

        userSql,

        [
          mentor.full_name,
          mentor.email,
          id,
        ],

        (userError) => {

          if (userError) {

            return db.rollback(
              () =>
                callback(
                  userError
                )
            );

          }


          // ==================================================
          // CHECK WHETHER PROFILE EXISTS
          // ==================================================

          const profileCheckSql = `

            SELECT

              id

            FROM mentor_profiles

            WHERE user_id = ?

            LIMIT 1

          `;


          db.query(

            profileCheckSql,

            [id],

            (
              profileCheckError,
              profileRows
            ) => {

              if (profileCheckError) {

                return db.rollback(
                  () =>
                    callback(
                      profileCheckError
                    )
                );

              }


              // =================================================
              // PROFILE EXISTS → UPDATE
              // =================================================

              if (
                profileRows.length > 0
              ) {

                const updateProfileSql = `

                  UPDATE mentor_profiles

                  SET

                    phone = ?,

                    designation = ?,

                    specialization = ?,

                    experience = ?

                  WHERE

                    user_id = ?

                `;


                db.query(

                  updateProfileSql,

                  [
                    mentor.phone || null,

                    mentor.designation ||
                      null,

                    mentor.specialization ||
                      null,

                    mentor.experience ||
                      null,

                    id,
                  ],

                  (profileUpdateError) => {

                    if (profileUpdateError) {

                      return db.rollback(
                        () =>
                          callback(
                            profileUpdateError
                          )
                      );

                    }


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


                        callback(null);

                      }
                    );

                  }

                );

                return;

              }


              // =================================================
              // PROFILE DOES NOT EXIST → CREATE
              // =================================================

              const insertProfileSql = `

                INSERT INTO mentor_profiles
                (
                  user_id,
                  phone,
                  designation,
                  specialization,
                  experience
                )

                VALUES
                (
                  ?,
                  ?,
                  ?,
                  ?,
                  ?
                )

              `;


              db.query(

                insertProfileSql,

                [
                  id,

                  mentor.phone ||
                    null,

                  mentor.designation ||
                    null,

                  mentor.specialization ||
                    null,

                  mentor.experience ||
                    null,
                ],

                (profileInsertError) => {

                  if (profileInsertError) {

                    return db.rollback(
                      () =>
                        callback(
                          profileInsertError
                        )
                    );

                  }


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


                      callback(null);

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
// DELETE MENTOR
// PROFILE → USER
// ============================================================

const deleteMentor = (
  id,
  callback
) => {

  db.beginTransaction(
    (transactionError) => {

      if (transactionError) {

        return callback(
          transactionError
        );

      }


      // ======================================================
      // DELETE PROFILE
      // ======================================================

      db.query(

        `
          DELETE FROM mentor_profiles
          WHERE user_id = ?
        `,

        [id],

        (profileError) => {

          if (profileError) {

            return db.rollback(
              () =>
                callback(
                  profileError
                )
            );

          }


          // ==================================================
          // DELETE USER
          // ==================================================

          db.query(

            `
              DELETE FROM users

              WHERE

                id = ?

                AND role = 'mentor'
            `,

            [id],

            (
              userError,
              userResult
            ) => {

              if (userError) {

                return db.rollback(
                  () =>
                    callback(
                      userError
                    )
                );

              }


              if (
                userResult.affectedRows === 0
              ) {

                return db.rollback(
                  () =>
                    callback(
                      new Error(
                        "Mentor not found."
                      )
                    )
                );

              }


              // ============================================
              // COMMIT
              // ============================================

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
                    userResult
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
// EXPORTS
// ============================================================

module.exports = {

  createMentor,

  getMentors,

  getMentorById,

  updateMentor,

  deleteMentor,

};