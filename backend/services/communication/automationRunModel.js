const {
  pool: db,
} = require("./communicationDb");

// ============================================================
// AUTOMATION RUN MODEL
// ============================================================
//
// Stores the execution history of automation rules.
//
// An automation run represents one execution of one automation
// rule for one automation event.
//
// Responsibilities:
//
// 1. Create automation runs.
// 2. Prevent duplicate runs using run_key.
// 3. Track run lifecycle.
// 4. Track communication-job counters.
// 5. Provide operational/history queries.
//
// IMPORTANT:
//
// The automation_runs database constraint uses:
//
// QUEUED
// RUNNING
// COMPLETED
// FAILED
//
// Therefore this model must use RUNNING when an automation run
// begins execution.
//
// This model intentionally uses the callback-based mysql2 pool
// exposed by communicationDb.js.
//
// ============================================================

const automationRunModel = {

  // ==========================================================
  // CREATE RUN
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
        scheduled_at
      )
      VALUES (?, ?, ?, ?, ?)
    `;

    const values = [
      data.automation_rule_id,

      data.event_id ||
        null,

      data.run_key,

      data.status ||
        "QUEUED",

      data.scheduled_at ||
        new Date(),
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
  // GET RUN BY RUN KEY
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
          rows.length > 0
        );

      }
    );
  },

  // ==========================================================
  // MARK RUN AS STARTED
  // ==========================================================
  //
  // Database status:
  //
  // QUEUED -> RUNNING
  //
  // Do NOT use PROCESSING here because the database check
  // constraint does not permit PROCESSING.
  //
  // ==========================================================

  markRunAsStarted(
    runId,
    callback
  ) {

    const sql = `
      UPDATE automation_runs
      SET
        status = 'RUNNING',
        started_at = COALESCE(
          started_at,
          NOW()
        )
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
    callback
  ) {

    const sql = `
      UPDATE automation_runs
      SET
        status = 'COMPLETED',
        finished_at = NOW()
      WHERE id = ?
    `;

    db.query(
      sql,
      [runId],
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
        finished_at = NOW(),
        error_message = ?
      WHERE id = ?
    `;

    db.query(
      sql,
      [
        errorMessage ||
          "Unknown automation run error",

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
    counters,
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
      Number(
        counters.total_jobs ||
        0
      ),

      Number(
        counters.queued_jobs ||
        0
      ),

      Number(
        counters.successful_jobs ||
        0
      ),

      Number(
        counters.skipped_jobs ||
        0
      ),

      runId,
    ];

    db.query(
      sql,
      values,
      callback
    );
  },

  // ==========================================================
  // GET RUNS BY RULE ID
  // ==========================================================

  getRunsByRuleId(
    ruleId,
    limit,
    callback
  ) {

    const safeLimit =
      Math.min(
        Math.max(
          Number(
            limit
          ) || 50,
          1
        ),
        500
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
      ORDER BY id DESC
      LIMIT ?
    `;

    db.query(
      sql,
      [
        ruleId,
        safeLimit,
      ],
      callback
    );
  },

  // ==========================================================
  // GET RUNS BY EVENT ID
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
      ORDER BY id DESC
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
    limit,
    callback
  ) {

    const safeLimit =
      Math.min(
        Math.max(
          Number(
            limit
          ) || 50,
          1
        ),
        500
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
      ORDER BY id DESC
      LIMIT ?
    `;

    db.query(
      sql,
      [safeLimit],
      callback
    );
  },

  // ==========================================================
  // GET RUN COUNTS
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
      WHERE status = 'QUEUED'
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