const {
  pool: db,
} = require("./communicationDb");

// ============================================================
// COMMUNICATION JOB MODEL
// ============================================================
//
// Stores asynchronous communication jobs.
//
// Responsibilities:
//
// 1. Create communication jobs.
// 2. Retrieve jobs.
// 3. Claim queued jobs safely.
// 4. Track processing/sending state.
// 5. Handle retries.
// 6. Handle permanent failures.
// 7. Cancel jobs.
// 8. Provide queue/operational counts.
//
// The communication worker consumes these jobs and delegates
// actual delivery to the configured communication provider.
//
// This model intentionally uses the callback-based mysql2 pool
// exposed by communicationDb.js.
//
// ============================================================

const communicationJobModel = {

  // ==========================================================
  // CREATE JOB
  // ==========================================================

  createJob(
    data,
    callback
  ) {

    const sql = `
      INSERT INTO communication_jobs (
        automation_run_id,
        automation_rule_id,
        template_id,
        channel,
        recipient_type,
        recipient_user_id,
        recipient_address,
        recipient_name,
        subject,
        rendered_body,
        payload_json,
        idempotency_key,
        status,
        priority,
        scheduled_at,
        attempt_count,
        max_attempts
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const payloadJson =
      data.payload_json !==
      undefined &&
      data.payload_json !==
      null
        ? JSON.stringify(
            data.payload_json
          )
        : null;

    const values = [
      data.automation_run_id ||
        null,

      data.automation_rule_id ||
        null,

      data.template_id ||
        null,

      data.channel,

      data.recipient_type,

      data.recipient_user_id ||
        null,

      data.recipient_address,

      data.recipient_name ||
        null,

      data.subject ||
        null,

      data.rendered_body ||
        "",

      payloadJson,

      data.idempotency_key,

      data.status ||
        "QUEUED",

      Number(
        data.priority
      ) || 5,

      data.scheduled_at ||
        null,

      Number(
        data.attempt_count
      ) || 0,

      Number(
        data.max_attempts
      ) || 3,
    ];

    db.query(
      sql,
      values,
      callback
    );
  },

  // ==========================================================
  // GET JOB BY ID
  // ==========================================================

  getJobById(
    jobId,
    callback
  ) {

    const sql = `
      SELECT
        id,
        automation_run_id,
        automation_rule_id,
        template_id,
        channel,
        recipient_type,
        recipient_user_id,
        recipient_address,
        recipient_name,
        subject,
        rendered_body,
        payload_json,
        idempotency_key,
        status,
        priority,
        scheduled_at,
        started_at,
        sent_at,
        completed_at,
        attempt_count,
        max_attempts,
        next_attempt_at,
        locked_at,
        locked_by,
        last_error,
        created_at,
        updated_at
      FROM communication_jobs
      WHERE id = ?
      LIMIT 1
    `;

    db.query(
      sql,
      [jobId],
      callback
    );
  },

  // ==========================================================
  // GET JOB BY IDEMPOTENCY KEY
  // ==========================================================

  getJobByIdempotencyKey(
    idempotencyKey,
    callback
  ) {

    const sql = `
      SELECT
        id,
        automation_run_id,
        automation_rule_id,
        template_id,
        channel,
        recipient_type,
        recipient_user_id,
        recipient_address,
        recipient_name,
        subject,
        rendered_body,
        payload_json,
        idempotency_key,
        status,
        priority,
        scheduled_at,
        started_at,
        sent_at,
        completed_at,
        attempt_count,
        max_attempts,
        next_attempt_at,
        locked_at,
        locked_by,
        last_error,
        created_at,
        updated_at
      FROM communication_jobs
      WHERE idempotency_key = ?
      LIMIT 1
    `;

    db.query(
      sql,
      [idempotencyKey],
      callback
    );
  },

  // ==========================================================
  // CLAIM NEXT JOB
  // ==========================================================
  //
  // Claims one due queued job.
  //
  // FOR UPDATE SKIP LOCKED allows multiple workers to operate
  // safely without processing the same job simultaneously.
  //
  // ==========================================================

  claimNextJob(
    workerId,
    callback
  ) {

    db.getConnection(
      (
        connectionError,
        connection
      ) => {

        if (
          connectionError
        ) {

          return callback(
            connectionError
          );

        }

        connection.beginTransaction(
          transactionError => {

            if (
              transactionError
            ) {

              connection.release();

              return callback(
                transactionError
              );

            }

            const selectSql = `
              SELECT
                id,
                automation_run_id,
                automation_rule_id,
                template_id,
                channel,
                recipient_type,
                recipient_user_id,
                recipient_address,
                recipient_name,
                subject,
                rendered_body,
                payload_json,
                idempotency_key,
                status,
                priority,
                scheduled_at,
                started_at,
                sent_at,
                completed_at,
                attempt_count,
                max_attempts,
                next_attempt_at,
                locked_at,
                locked_by,
                last_error,
                created_at,
                updated_at
              FROM communication_jobs
              WHERE
                status = 'QUEUED'
                AND (
                  scheduled_at IS NULL
                  OR scheduled_at <= NOW()
                )
                AND (
                  next_attempt_at IS NULL
                  OR next_attempt_at <= NOW()
                )
              ORDER BY
                priority DESC,
                id ASC
              LIMIT 1
              FOR UPDATE SKIP LOCKED
            `;

            connection.query(
              selectSql,
              (
                selectError,
                rows
              ) => {

                if (
                  selectError
                ) {

                  return connection.rollback(
                    () => {

                      connection.release();

                      callback(
                        selectError
                      );

                    }
                  );

                }

                if (
                  !rows ||
                  rows.length === 0
                ) {

                  return connection.rollback(
                    () => {

                      connection.release();

                      callback(
                        null,
                        null
                      );

                    }
                  );

                }

                const job =
                  rows[0];

                const updateSql = `
                  UPDATE communication_jobs
                  SET
                    status = 'PROCESSING',
                    started_at = COALESCE(
                      started_at,
                      NOW()
                    ),
                    locked_at = NOW(),
                    locked_by = ?,
                    attempt_count = attempt_count + 1
                  WHERE id = ?
                `;

                connection.query(
                  updateSql,
                  [
                    workerId ||
                      "communication-worker",
                    job.id,
                  ],
                  updateError => {

                    if (
                      updateError
                    ) {

                      return connection.rollback(
                        () => {

                          connection.release();

                          callback(
                            updateError
                          );

                        }
                      );

                    }

                    connection.commit(
                      commitError => {

                        if (
                          commitError
                        ) {

                          return connection.rollback(
                            () => {

                              connection.release();

                              callback(
                                commitError
                              );

                            }
                          );

                        }

                        connection.release();

                        job.status =
                          "PROCESSING";

                        job.locked_at =
                          new Date();

                        job.locked_by =
                          workerId ||
                          "communication-worker";

                        job.attempt_count =
                          Number(
                            job.attempt_count ||
                            0
                          ) + 1;

                        callback(
                          null,
                          job
                        );

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
  },

  // ==========================================================
  // MARK JOB AS SENT
  // ==========================================================

  markJobAsSent(
    jobId,
    callback
  ) {

    const sql = `
      UPDATE communication_jobs
      SET
        status = 'SENT',
        sent_at = NOW(),
        completed_at = NOW(),
        locked_at = NULL,
        locked_by = NULL,
        last_error = NULL
      WHERE id = ?
    `;

    db.query(
      sql,
      [jobId],
      callback
    );
  },

  // ==========================================================
  // MARK JOB AS DELIVERED
  // ==========================================================

  markJobAsDelivered(
    jobId,
    callback
  ) {

    const sql = `
      UPDATE communication_jobs
      SET
        status = 'DELIVERED',
        sent_at = COALESCE(
          sent_at,
          NOW()
        ),
        completed_at = NOW(),
        locked_at = NULL,
        locked_by = NULL,
        last_error = NULL
      WHERE id = ?
    `;

    db.query(
      sql,
      [jobId],
      callback
    );
  },

  // ==========================================================
  // MARK JOB FOR RETRY
  // ==========================================================

  markJobForRetry(
    jobId,
    nextAttemptAt,
    errorMessage,
    callback
  ) {

    const sql = `
      UPDATE communication_jobs
      SET
        status = 'QUEUED',
        next_attempt_at = ?,
        locked_at = NULL,
        locked_by = NULL,
        last_error = ?,
        completed_at = NULL
      WHERE id = ?
    `;

    const values = [
      nextAttemptAt ||
        new Date(),

      errorMessage ||
        "Communication delivery failed and will be retried",

      jobId,
    ];

    db.query(
      sql,
      values,
      callback
    );
  },

  // ==========================================================
  // MARK JOB AS FAILED
  // ==========================================================

  markJobAsFailed(
    jobId,
    errorMessage,
    callback
  ) {

    const sql = `
      UPDATE communication_jobs
      SET
        status = 'FAILED',
        completed_at = NOW(),
        locked_at = NULL,
        locked_by = NULL,
        last_error = ?
      WHERE id = ?
    `;

    db.query(
      sql,
      [
        errorMessage ||
          "Communication delivery failed",
        jobId,
      ],
      callback
    );
  },

  // ==========================================================
  // CANCEL JOB
  // ==========================================================

  cancelJob(
    jobId,
    callback
  ) {

    const sql = `
      UPDATE communication_jobs
      SET
        status = 'CANCELLED',
        completed_at = NOW(),
        locked_at = NULL,
        locked_by = NULL
      WHERE id = ?
    `;

    db.query(
      sql,
      [jobId],
      callback
    );
  },

  // ==========================================================
  // GET QUEUE COUNTS
  // ==========================================================

  getQueueCounts(
    callback
  ) {

    const sql = `
      SELECT
        status,
        COUNT(*) AS count
      FROM communication_jobs
      GROUP BY status
      ORDER BY status ASC
    `;

    db.query(
      sql,
      callback
    );
  },

  // ==========================================================
  // GET DUE JOB COUNT
  // ==========================================================

  getDueJobCount(
    callback
  ) {

    const sql = `
      SELECT
        COUNT(*) AS count
      FROM communication_jobs
      WHERE
        status = 'QUEUED'
        AND (
          scheduled_at IS NULL
          OR scheduled_at <= NOW()
        )
        AND (
          next_attempt_at IS NULL
          OR next_attempt_at <= NOW()
        )
    `;

    db.query(
      sql,
      (
        error,
        rows
      ) => {

        if (
          error
        ) {

          return callback(
            error
          );

        }

        callback(
          null,
          Number(
            rows[0]?.count ||
            0
          )
        );

      }
    );
  },

};

// ============================================================
// EXPORT
// ============================================================

module.exports =
  communicationJobModel;