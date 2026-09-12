const communicationDb = require("./services/communication/communicationDb");
const engine = require("./services/communication/automationEngine");

const EVENT_KEY = "C87_INAPP_ENGINE_METADATA_TEST_002";

const db = communicationDb.pool;

db.query(
  `
    SELECT *
    FROM automation_events
    WHERE event_key = ?
    LIMIT 1
  `,
  [EVENT_KEY],
  async (queryError, rows) => {
    if (queryError) {
      console.error("EVENT_QUERY_ERROR:", queryError);
      process.exit(1);
      return;
    }

    try {
      const event = rows[0];

      if (!event) {
        throw new Error(
          `Automation event with key ${EVENT_KEY} was not found.`
        );
      }

      console.log("EVENT_ID:", event.id);
      console.log("EVENT_STATUS_BEFORE:", event.status);

      const processResult = await engine.processEvent(event);

      console.log(
        "PROCESS_RESULT:",
        JSON.stringify(processResult, null, 2)
      );

      setTimeout(() => {
        db.query(
          `
            SELECT *
            FROM communication_jobs
            WHERE idempotency_key LIKE ?
            ORDER BY id DESC
            LIMIT 5
          `,
          [`%${EVENT_KEY}%`],
          (jobError, jobs) => {
            if (jobError) {
              console.error("JOB_QUERY_ERROR:", jobError);
              process.exit(1);
              return;
            }

            console.log(
              "JOBS:",
              JSON.stringify(jobs, null, 2)
            );

            db.query(
              `
                SELECT *
                FROM notifications
                WHERE user_id = 2
                  AND (
                    title = 'DataLattice IN_APP Metadata Test'
                    OR idempotency_key LIKE ?
                  )
                ORDER BY id DESC
                LIMIT 5
              `,
              [`%${EVENT_KEY}%`],
              (notificationError, notifications) => {
                if (notificationError) {
                  console.error(
                    "NOTIFICATION_QUERY_ERROR:",
                    notificationError
                  );
                  process.exit(1);
                  return;
                }

                console.log(
                  "NOTIFICATIONS:",
                  JSON.stringify(
                    notifications,
                    null,
                    2
                  )
                );

                process.exit(0);
              }
            );
          }
        );
      }, 3000);
    } catch (processingError) {
      console.error(
        "PROCESS_EVENT_ERROR:",
        processingError
      );

      process.exit(1);
    }
  }
);