const db = require("../database/db");


// ============================================================
// CREATE BATCH
// ============================================================

const createBatch = (
  batch,
  callback
) => {

  const sql = `

    INSERT INTO batches
    (
      batch_name,
      course_id,
      mentor_name,
      start_date,
      end_date,
      status
    )

    VALUES (?, ?, ?, ?, ?, ?)

  `;


  db.query(

    sql,

    [
      batch.batch_name,
      batch.course_id,
      batch.mentor_name || null,
      batch.start_date || null,
      batch.end_date || null,
      batch.status || "Upcoming",
    ],

    callback

  );

};


// ============================================================
// GET ALL BATCHES
// ============================================================

const getAllBatches = (
  callback
) => {

  const sql = `

    SELECT

      batches.*,

      courses.title AS course_title,

      (
        SELECT COUNT(*)

        FROM batch_students

        WHERE
          batch_students.batch_id =
          batches.id

      ) AS total_students

    FROM batches

    LEFT JOIN courses

      ON courses.id =
         batches.course_id

    ORDER BY
      batches.created_at DESC

  `;


  db.query(
    sql,
    callback
  );

};


// ============================================================
// GET BATCH BY ID
// ============================================================

const getBatchById = (
  id,
  callback
) => {

  const sql = `

    SELECT

      batches.*,

      courses.title AS course_title,

      (
        SELECT COUNT(*)

        FROM batch_students

        WHERE
          batch_students.batch_id =
          batches.id

      ) AS total_students

    FROM batches

    LEFT JOIN courses

      ON courses.id =
         batches.course_id

    WHERE
      batches.id = ?

    LIMIT 1

  `;


  db.query(

    sql,

    [id],

    callback

  );

};


// ============================================================
// UPDATE BATCH
// ============================================================

const updateBatch = (
  id,
  batch,
  callback
) => {

  const sql = `

    UPDATE batches

    SET

      batch_name = ?,

      course_id = ?,

      mentor_name = ?,

      start_date = ?,

      end_date = ?,

      status = ?

    WHERE
      id = ?

  `;


  db.query(

    sql,

    [

      batch.batch_name,

      batch.course_id,

      batch.mentor_name || null,

      batch.start_date || null,

      batch.end_date || null,

      batch.status || "Upcoming",

      id,

    ],

    callback

  );

};


// ============================================================
// DELETE BATCH
// ============================================================

const deleteBatch = (
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


      // ================================================
      // REMOVE STUDENT ASSIGNMENTS
      // ================================================

      db.query(

        `
          DELETE FROM batch_students
          WHERE batch_id = ?
        `,

        [id],

        (assignmentError) => {

          if (assignmentError) {

            return db.rollback(
              () =>
                callback(
                  assignmentError
                )
            );

          }


          // ==============================================
          // DELETE BATCH
          // ==============================================

          db.query(

            `
              DELETE FROM batches
              WHERE id = ?
            `,

            [id],

            (
              deleteError,
              result
            ) => {

              if (deleteError) {

                return db.rollback(
                  () =>
                    callback(
                      deleteError
                    )
                );

              }


              if (
                result.affectedRows === 0
              ) {

                return db.rollback(
                  () =>
                    callback(
                      new Error(
                        "Batch not found."
                      )
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


                  callback(
                    null,
                    result
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
// ASSIGN STUDENT TO BATCH
// ============================================================

const assignStudent = (
  batchId,
  studentId,
  callback
) => {

  // ==========================================================
  // FIRST CHECK WHETHER ALREADY ASSIGNED
  // ==========================================================

  const checkSql = `

    SELECT id

    FROM batch_students

    WHERE
      batch_id = ?

      AND student_id = ?

    LIMIT 1

  `;


  db.query(

    checkSql,

    [
      batchId,
      studentId,
    ],

    (
      checkError,
      rows
    ) => {

      if (checkError) {

        return callback(
          checkError
        );

      }


      if (
        rows.length > 0
      ) {

        const error =
          new Error(
            "Student is already assigned to this batch."
          );

        error.code =
          "STUDENT_ALREADY_ASSIGNED";

        return callback(
          error
        );

      }


      // ======================================================
      // INSERT ASSIGNMENT
      // ======================================================

      const insertSql = `

        INSERT INTO batch_students
        (
          batch_id,
          student_id
        )

        VALUES (?, ?)

      `;


      db.query(

        insertSql,

        [
          batchId,
          studentId,
        ],

        callback

      );

    }

  );

};


// ============================================================
// GET STUDENTS BY BATCH
// ============================================================

const getBatchStudents = (
  batchId,
  callback
) => {

  const sql = `

    SELECT

      users.id,

      users.full_name,

      users.email,

      users.created_at

    FROM batch_students

    INNER JOIN users

      ON users.id =
         batch_students.student_id

    WHERE
      batch_students.batch_id = ?

    ORDER BY
      users.full_name ASC

  `;


  db.query(

    sql,

    [batchId],

    callback

  );

};


// ============================================================
// EXPORTS
// ============================================================

module.exports = {

  createBatch,

  getAllBatches,

  getBatchById,

  updateBatch,

  deleteBatch,

  assignStudent,

  getBatchStudents,

};