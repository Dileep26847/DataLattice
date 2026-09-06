const {
  pool: db,
} = require("../services/communication/communicationDb");

// ============================================================
// AUTOMATION EVENT MODEL
// ============================================================

const automationEventModel = {

  // ==========================================================
  // CREATE EVENT
  // ==========================================================

  createEvent(
    data,
    callback
  ) {

    const sql = `
      INSERT INTO automation_events (
        event_key,
        event_type,
        aggregate_type,
        aggregate_id,
        payload_json,
        status,
        available_at,
        attempts,
        last_error
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      data.event_key,
      data.event_type,
      data.aggregate_type || null,
      data.aggregate_id || null,
      typeof data.payload_json === "string"
        ? data.payload_json
        : JSON.stringify(data.payload_json || {}),
      data.status || "PENDING",
      data.available_at || new Date(),
      Number.isInteger(data.attempts)
        ? data.attempts
        : 0,
      data.last_error || null,
    ];

    db.query(
      sql,
      values,
      callback
    );
  },

  // ==========================================================
  // GET EVENT BY ID
  // ==========================================================

  getEventById(
    eventId,
    callback
  ) {

    const sql = `
      SELECT
        id,
        event_key,
        event_type,
        aggregate_type,
        aggregate_id,
        payload_json,
        status,
        available_at,
        processed_at,
        attempts,
        last_error,
        created_at
      FROM automation_events
      WHERE id = ?
      LIMIT 1
    `;

    db.query(
      sql,
      [eventId],
      callback
    );
  },

  // ==========================================================
  // GET EVENT BY UNIQUE EVENT KEY
  // ==========================================================

  getEventByKey(
    eventKey,
    callback
  ) {

    const sql = `
      SELECT
        id,
        event_key,
        event_type,
        aggregate_type,
        aggregate_id,
        payload_json,
        status,
        available_at,
        processed_at,
        attempts,
        last_error,
        created_at
      FROM automation_events
      WHERE event_key = ?
      LIMIT 1
    `;

    db.query(
      sql,
      [eventKey],
      callback
    );
  },

  // ==========================================================
  // CHECK EVENT KEY EXISTS
  // ==========================================================

  eventKeyExists(
    eventKey,
    callback
  ) {

    const sql = `
      SELECT
        id
      FROM automation_events
      WHERE event_key = ?
      LIMIT 1
    `;

    db.query(
      sql,
      [eventKey],
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
  // CLAIM NEXT AVAILABLE EVENT
  //
  // Uses a transaction and row locking so multiple workers
  // cannot process the same event simultaneously.
  // ==========================================================

  claimNextEvent(
    callback
  ) {

    db.getConnection(
      (connectionError, connection) => {

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
                event_key,
                event_type,
                aggregate_type,
                aggregate_id,
                payload_json,
                status,
                available_at,
                processed_at,
                attempts,
                last_error,
                created_at
              FROM automation_events
              WHERE
                status = 'PENDING'
                AND available_at <= NOW()
              ORDER BY
                available_at ASC,
                id ASC
              LIMIT 1
              FOR UPDATE SKIP LOCKED
            `;

            connection.query(
              selectSql,
              (selectError, rows) => {

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

                const event =
                  rows[0];

                const updateSql = `
                  UPDATE automation_events
                  SET
                    status = 'PROCESSING',
                    attempts = attempts + 1
                  WHERE id = ?
                `;

                connection.query(
                  updateSql,
                  [event.id],
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

                        event.attempts =
                          Number(event.attempts || 0) + 1;

                        event.status =
                          "PROCESSING";

                        callback(
                          null,
                          event
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
  // MARK EVENT AS PROCESSED
  // ==========================================================

  markEventAsProcessed(
    eventId,
    callback
  ) {

    const sql = `
      UPDATE automation_events
      SET
        status = 'PROCESSED',
        processed_at = CURRENT_TIMESTAMP,
        last_error = NULL
      WHERE id = ?
    `;

    db.query(
      sql,
      [eventId],
      callback
    );
  },

  // ==========================================================
  // MARK EVENT AS FAILED
  // ==========================================================

  markEventAsFailed(
    eventId,
    errorMessage,
    callback
  ) {

    const sql = `
      UPDATE automation_events
      SET
        status = 'FAILED',
        last_error = ?,
        processed_at = NULL
      WHERE id = ?
    `;

    db.query(
      sql,
      [
        errorMessage
          ? String(errorMessage).slice(
              0,
              65535
            )
          : "Unknown automation event error",
        eventId,
      ],
      callback
    );
  },

  // ==========================================================
  // RESET EVENT FOR RETRY
  // ==========================================================

  retryEvent(
    eventId,
    availableAt,
    errorMessage,
    callback
  ) {

    const sql = `
      UPDATE automation_events
      SET
        status = 'PENDING',
        available_at = ?,
        last_error = ?,
        processed_at = NULL
      WHERE id = ?
    `;

    db.query(
      sql,
      [
        availableAt || new Date(),
        errorMessage
          ? String(errorMessage).slice(
              0,
              65535
            )
          : null,
        eventId,
      ],
      callback
    );
  },

  // ==========================================================
  // GET PENDING EVENT COUNT
  // ==========================================================

  getPendingEventCount(
    callback
  ) {

    const sql = `
      SELECT
        COUNT(*) AS count
      FROM automation_events
      WHERE
        status = 'PENDING'
        AND available_at <= NOW()
    `;

    db.query(
      sql,
      callback
    );
  },

  // ==========================================================
  // GET EVENT COUNTS BY STATUS
  // ==========================================================

  getEventCounts(
    callback
  ) {

    const sql = `
      SELECT
        status,
        COUNT(*) AS count
      FROM automation_events
      GROUP BY status
      ORDER BY status ASC
    `;

    db.query(
      sql,
      callback
    );
  },

  // ==========================================================
  // GET RECENT EVENTS
  // ==========================================================

  getRecentEvents(
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
        event_key,
        event_type,
        aggregate_type,
        aggregate_id,
        payload_json,
        status,
        available_at,
        processed_at,
        attempts,
        last_error,
        created_at
      FROM automation_events
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

};

// ============================================================
// EXPORT
// ============================================================

module.exports =
  automationEventModel;