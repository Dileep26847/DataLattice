const {
  pool: db,
} = require("../services/communication/communicationDb");

// ============================================================
// AUTOMATION RUN MODEL
// ============================================================

const automationRunModel = {

  // ==========================================================
  // CREATE AUTOMATION RUN
  // ==========================================================

  createRun(
    data,
    callback
  ) {

    const sql = `
      INSERT INTO automation_runs (
        automation_rule_id,
        event_id,
        run_key,
        status,
        scheduled_at,
        total_jobs,
        queued_jobs,
        successful_jobs,
        skipped_jobs,
        error_message
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      data.automation_rule_id,
      data.event_id || null,
      data.run_key,
      data.status || "QUEUED",
      data.scheduled_at || new Date(),
      Number.isInteger(data.total_jobs)
        ? data.total_jobs
        : 0,
      Number.isInteger(data.queued_jobs)
        ? data.queued_jobs
        : 0,
      Number.isInteger(data.successful_jobs)
        ? data.successful_jobs
        : 0,
      Number.isInteger(data.skipped_jobs)
        ? data.skipped_jobs
        : 0,
      data.error_message || null,
    ];

    db.query(
      sql,
      values,
      callback
    );
  },

  // ==========================================================
  // GET RUN BY ID
  // ==========================================================

  getRunById(
    runId,
    callback
  ) {

    const sql = `
      SELECT
        id,
        automation_rule_id,
        event_id,
        run_key,
        status,
        scheduled_at,
        started_at,
        finished_at,
        total_jobs,
        queued_jobs,
        successful_jobs,
        skipped_jobs,
        error_message,
        created_at,
        updated_at
      FROM automation_runs
      WHERE id = ?
      LIMIT 1
    `;

    db.query(
      sql,
      [runId],
      callback
    );
  },

  // ==========================================================
  // GET RUN BY UNIQUE RUN KEY
  // ==========================================================

  getRunByKey(
    runKey,
    callback
  ) {

    const sql = `
      SELECT
        id,
        automation_rule_id,
        event_id,
        run_key,
        status,
        scheduled_at,
        started_at,
        finished_at,
        total_jobs,
        queued_jobs,
        successful_jobs,
        skipped_jobs,
        error_message,
        created_at,
        updated_at
      FROM automation_runs
      WHERE run_key = ?
      LIMIT 1
    `;

    db.query(
      sql,
      [runKey],
      callback
    );
  },

  // ==========================================================
  // CHECK RUN KEY EXISTS
  // ==========================================================

  runKeyExists(
    runKey,
    callback
  ) {

    const sql = `
      SELECT
        id
      FROM automation_runs
      WHERE run_key = ?
      LIMIT 1
    `;

    db.query(
      sql,
      [runKey],
      (error, rows) => {

        if (error) {
          return callback(
            error
          );
        }

        callback(
          null,
          rows.length > 0
        );
      }
    );
  },

  // ==========================================================
  // MARK RUN AS STARTED
  // ==========================================================

  markRunAsStarted(
    runId,
    callback
  ) {

    const sql = `
      UPDATE automation_runs
      SET
        status = 'RUNNING',
        started_at = CURRENT_TIMESTAMP,
        finished_at = NULL,
        error_message = NULL
      WHERE id = ?
    `;

    db.query(
      sql,
      [runId],
      callback
    );
  },

  // ==========================================================
  // MARK RUN AS COMPLETED
  // ==========================================================

  markRunAsCompleted(
    runId,
    data,
    callback
  ) {

    const sql = `
      UPDATE automation_runs
      SET
        status = 'COMPLETED',
        finished_at = CURRENT_TIMESTAMP,
        total_jobs = ?,
        queued_jobs = ?,
        successful_jobs = ?,
        skipped_jobs = ?,
        error_message = NULL
      WHERE id = ?
    `;

    const values = [
      Number.isInteger(data.total_jobs)
        ? data.total_jobs
        : 0,

      Number.isInteger(data.queued_jobs)
        ? data.queued_jobs
        : 0,

      Number.isInteger(data.successful_jobs)
        ? data.successful_jobs
        : 0,

      Number.isInteger(data.skipped_jobs)
        ? data.skipped_jobs
        : 0,

      runId,
    ];

    db.query(
      sql,
      values,
      callback
    );
  },

  // ==========================================================
  // MARK RUN AS FAILED
  // ==========================================================

  markRunAsFailed(
    runId,
    errorMessage,
    callback
  ) {

    const sql = `
      UPDATE automation_runs
      SET
        status = 'FAILED',
        finished_at = CURRENT_TIMESTAMP,
        error_message = ?
      WHERE id = ?
    `;

    const safeError =
      errorMessage
        ? String(errorMessage).slice(
            0,
            65535
          )
        : "Unknown automation run error";

    db.query(
      sql,
      [
        safeError,
        runId,
      ],
      callback
    );
  },

  // ==========================================================
  // UPDATE RUN COUNTERS
  // ==========================================================

  updateRunCounters(
    runId,
    data,
    callback
  ) {

    const sql = `
      UPDATE automation_runs
      SET
        total_jobs = ?,
        queued_jobs = ?,
        successful_jobs = ?,
        skipped_jobs = ?
      WHERE id = ?
    `;

    const values = [
      Number.isInteger(data.total_jobs)
        ? data.total_jobs
        : 0,

      Number.isInteger(data.queued_jobs)
        ? data.queued_jobs
        : 0,

      Number.isInteger(data.successful_jobs)
        ? data.successful_jobs
        : 0,

      Number.isInteger(data.skipped_jobs)
        ? data.skipped_jobs
        : 0,

      runId,
    ];

    db.query(
      sql,
      values,
      callback
    );
  },

  // ==========================================================
  // GET RUNS BY AUTOMATION RULE
  // ==========================================================

  getRunsByRuleId(
    automationRuleId,
    limit = 50,
    callback
  ) {

    const safeLimit = Math.min(
      Math.max(
        Number(limit) || 50,
        1
      ),
      200
    );

    const sql = `
      SELECT
        id,
        automation_rule_id,
        event_id,
        run_key,
        status,
        scheduled_at,
        started_at,
        finished_at,
        total_jobs,
        queued_jobs,
        successful_jobs,
        skipped_jobs,
        error_message,
        created_at,
        updated_at
      FROM automation_runs
      WHERE automation_rule_id = ?
      ORDER BY
        created_at DESC,
        id DESC
      LIMIT ?
    `;

    db.query(
      sql,
      [
        automationRuleId,
        safeLimit,
      ],
      callback
    );
  },

  // ==========================================================
  // GET RUNS BY EVENT
  // ==========================================================

  getRunsByEventId(
    eventId,
    callback
  ) {

    const sql = `
      SELECT
        id,
        automation_rule_id,
        event_id,
        run_key,
        status,
        scheduled_at,
        started_at,
        finished_at,
        total_jobs,
        queued_jobs,
        successful_jobs,
        skipped_jobs,
        error_message,
        created_at,
        updated_at
      FROM automation_runs
      WHERE event_id = ?
      ORDER BY
        created_at DESC,
        id DESC
    `;

    db.query(
      sql,
      [eventId],
      callback
    );
  },

  // ==========================================================
  // GET RECENT RUNS
  // ==========================================================

  getRecentRuns(
    limit = 50,
    callback
  ) {

    const safeLimit = Math.min(
      Math.max(
        Number(limit) || 50,
        1
      ),
      200
    );

    const sql = `
      SELECT
        id,
        automation_rule_id,
        event_id,
        run_key,
        status,
        scheduled_at,
        started_at,
        finished_at,
        total_jobs,
        queued_jobs,
        successful_jobs,
        skipped_jobs,
        error_message,
        created_at,
        updated_at
      FROM automation_runs
      ORDER BY
        created_at DESC,
        id DESC
      LIMIT ?
    `;

    db.query(
      sql,
      [safeLimit],
      callback
    );
  },

  // ==========================================================
  // GET RUN COUNTS BY STATUS
  // ==========================================================

  getRunCounts(
    callback
  ) {

    const sql = `
      SELECT
        status,
        COUNT(*) AS count
      FROM automation_runs
      GROUP BY status
      ORDER BY status ASC
    `;

    db.query(
      sql,
      callback
    );
  },

  // ==========================================================
  // GET QUEUED RUNS
  // ==========================================================

  getQueuedRuns(
    callback
  ) {

    const sql = `
      SELECT
        id,
        automation_rule_id,
        event_id,
        run_key,
        status,
        scheduled_at,
        started_at,
        finished_at,
        total_jobs,
        queued_jobs,
        successful_jobs,
        skipped_jobs,
        error_message,
        created_at,
        updated_at
      FROM automation_runs
      WHERE
        status = 'QUEUED'
        AND scheduled_at <= NOW()
      ORDER BY
        scheduled_at ASC,
        id ASC
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
  automationRunModel;