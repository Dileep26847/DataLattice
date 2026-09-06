const {
  pool: db,
} = require("../services/communication/communicationDb");

// ============================================================
// COMMUNICATION JOB MODEL
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
        started_at,
        sent_at,
        completed_at,
        attempt_count,
        max_attempts,
        next_attempt_at,
        locked_at,
        locked_by,
        last_error
      )
      VALUES (
        ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?, ?, ?, ?, ?
      )
    `;

    const values = [
      data.automation_run_id || null,
      data.automation_rule_id || null,
      data.template_id || null,
      data.channel,
      data.recipient_type,
      data.recipient_user_id || null,
      data.recipient_address,
      data.recipient_name || null,
      data.subject || null,
      data.rendered_body || null,
      typeof data.payload_json === "string"
        ? data.payload_json
        : JSON.stringify(
            data.payload_json || {}
          ),
      data.idempotency_key,
      data.status || "QUEUED",
      Number.isInteger(data.priority)
        ? data.priority
        : 5,
      data.scheduled_at || new Date(),
      data.started_at || null,
      data.sent_at || null,
      data.completed_at || null,
      Number.isInteger(data.attempt_count)
        ? data.attempt_count
        : 0,
      Number.isInteger(data.max_attempts)
        ? data.max_attempts
        : 3,
      data.next_attempt_at || null,
      data.locked_at || null,
      data.locked_by || null,
      data.last_error || null,
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
  // CLAIM NEXT QUEUED JOB
  //
  // Uses:
  // - transaction
  // - row locking
  // - SKIP LOCKED
  //
  // This allows multiple communication workers to safely
  // process jobs without claiming the same job.
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

        if (connectionError) {
          return callback(
            connectionError
          );
        }

        connection.beginTransaction(
          (transactionError) => {

            if (transactionError) {

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
                AND scheduled_at <= NOW()
                AND (
                  next_attempt_at IS NULL
                  OR next_attempt_at <= NOW()
                )
              ORDER BY
                priority DESC,
                scheduled_at ASC,
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

                if (selectError) {

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
                    started_at = CURRENT_TIMESTAMP,
                    attempt_count =
                      attempt_count + 1,
                    locked_at =
                      CURRENT_TIMESTAMP,
                    locked_by = ?,
                    last_error = NULL
                  WHERE id = ?
                `;

                connection.query(
                  updateSql,
                  [
                    workerId,
                    job.id,
                  ],
                  (updateError) => {

                    if (updateError) {

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
                      (commitError) => {

                        if (commitError) {

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

                        job.attempt_count =
                          Number(
                            job.attempt_count || 0
                          ) + 1;

                        job.started_at =
                          new Date();

                        job.locked_at =
                          new Date();

                        job.locked_by =
                          workerId;

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
    providerMessageId,
    callback
  ) {

    const sql = `
      UPDATE communication_jobs
      SET
        status = 'SENT',
        sent_at = CURRENT_TIMESTAMP,
        completed_at = CURRENT_TIMESTAMP,
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
        completed_at = CURRENT_TIMESTAMP,
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
        last_error = ?
      WHERE id = ?
    `;

    const safeError =
      errorMessage
        ? String(
            errorMessage
          ).slice(
            0,
            65535
          )
        : "Communication delivery failed";

    db.query(
      sql,
      [
        nextAttemptAt,
        safeError,
        jobId,
      ],
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
        completed_at = CURRENT_TIMESTAMP,
        locked_at = NULL,
        locked_by = NULL,
        last_error = ?
      WHERE id = ?
    `;

    const safeError =
      errorMessage
        ? String(
            errorMessage
          ).slice(
            0,
            65535
          )
        : "Communication delivery failed";

    db.query(
      sql,
      [
        safeError,
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
    reason,
    callback
  ) {

    const sql = `
      UPDATE communication_jobs
      SET
        status = 'CANCELLED',
        completed_at = CURRENT_TIMESTAMP,
        locked_at = NULL,
        locked_by = NULL,
        last_error = ?
      WHERE
        id = ?
        AND status IN (
          'QUEUED',
          'PROCESSING'
        )
    `;

    db.query(
      sql,
      [
        reason || null,
        jobId,
      ],
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
        AND scheduled_at <= NOW()
        AND (
          next_attempt_at IS NULL
          OR next_attempt_at <= NOW()
        )
    `;

    db.query(
      sql,
      callback
    );
  },

};

// ============================================================
// EXPORT
// ============================================================

module.exports =
  communicationJobModel;
