const {
  pool: db,
} = require("./communicationDb");

// ============================================================
// LIVE CLASS REMINDER SCHEDULER
//
// Responsibilities:
// 1. Find upcoming live classes.
// 2. Resolve the real batch name.
// 3. Calculate 24-hour reminder time.
// 4. Calculate 1-hour reminder time.
// 5. Create future-dated automation events.
// 6. Prevent duplicate reminder events.
//
// IMPORTANT:
// - This service DOES NOT send Email.
// - This service DOES NOT send WhatsApp.
// - This service DOES NOT create communication jobs directly.
// - The automation event processor handles events when they
//   become available.
// - The communication worker remains responsible for delivery.
// - communicationDb uses the callback-based mysql2 pool, so
//   database calls are wrapped in Promises locally.
// - Live-class times are interpreted in the DataLattice
//   application timezone: Asia/Kolkata.
// ============================================================

const DEFAULT_POLL_INTERVAL_MS =
  60000;

const APPLICATION_TIMEZONE =
  "Asia/Kolkata";

const REMINDER_WINDOWS = {
  TWENTY_FOUR_HOURS: {
    key:
      "24H",

    offsetMs:
      24 *
      60 *
      60 *
      1000,
  },

  ONE_HOUR: {
    key:
      "1H",

    offsetMs:
      60 *
      60 *
      1000,
  },
};

// ============================================================
// DATABASE QUERY HELPER
//
// communicationDb uses mysql2's callback-based pool.
//
// This helper gives this service Promise-compatible database
// access without changing the shared communicationDb contract.
// ============================================================

function query(
  sql,
  params = []
) {

  return new Promise(
    (
      resolve,
      reject
    ) => {

      db.query(
        sql,
        params,
        (
          error,
          results
        ) => {

          if (
            error
          ) {

            return reject(
              error
            );
          }

          resolve(
            results
          );
        }
      );

    }
  );
}

// ============================================================
// NORMALIZE DATE PART
// ============================================================
//
// MySQL DATE values may arrive as:
// - YYYY-MM-DD
// - JavaScript Date
// - strings containing a date prefix
//
// Always return a validated YYYY-MM-DD value.
// ============================================================

function normalizeDatePart(
  value
) {

  if (
    !value
  ) {

    return null;
  }

  let datePart;

  if (
    value instanceof Date
  ) {

    if (
      Number.isNaN(
        value.getTime()
      )
    ) {

      return null;
    }

    /*
     * Do not use the local machine date here.
     *
     * The database value represents the class date itself,
     * therefore the ISO date portion is the safest normalized
     * representation for a MySQL DATE value.
     */

    datePart =
      value
        .toISOString()
        .slice(
          0,
          10
        );

  } else {

    datePart =
      String(
        value
      )
        .trim()
        .slice(
          0,
          10
        );
  }

  if (
    !/^\d{4}-\d{2}-\d{2}$/.test(
      datePart
    )
  ) {

    return null;
  }

  const dateCheck =
    new Date(
      `${datePart}T00:00:00Z`
    );

  if (
    Number.isNaN(
      dateCheck.getTime()
    )
  ) {

    return null;
  }

  return datePart;
}

// ============================================================
// NORMALIZE TIME PART
// ============================================================
//
// Supports:
// - HH:MM
// - HH:MM:SS
//
// Returns HH:MM:SS.
// ============================================================

function normalizeTimePart(
  value
) {

  if (
    value === null ||
    value === undefined
  ) {

    return null;
  }

  let timePart =
    String(
      value
    )
      .trim();

  if (
    /^\d{2}:\d{2}$/.test(
      timePart
    )
  ) {

    timePart =
      `${timePart}:00`;
  }

  if (
    !/^\d{2}:\d{2}:\d{2}$/.test(
      timePart
    )
  ) {

    return null;
  }

  const [
    hours,
    minutes,
    seconds,
  ] =
    timePart
      .split(":")
      .map(
        Number
      );

  if (
    hours > 23 ||
    minutes > 59 ||
    seconds > 59
  ) {

    return null;
  }

  return timePart;
}

// ============================================================
// IST OFFSET
// ============================================================
//
// DataLattice currently uses Asia/Kolkata.
//
// Asia/Kolkata is UTC+05:30 and does not observe DST.
//
// Convert an Asia/Kolkata local datetime into a UTC Date.
// ============================================================

function buildIndiaDate(
  datePart,
  timePart
) {

  const normalizedDate =
    normalizeDatePart(
      datePart
    );

  const normalizedTime =
    normalizeTimePart(
      timePart
    );

  if (
    !normalizedDate ||
    !normalizedTime
  ) {

    return null;
  }

  /*
   * The string represents a wall-clock time in
   * Asia/Kolkata, not the Node.js machine timezone.
   *
   * Example:
   *
   * 2026-09-06 20:00:00 IST
   *
   * becomes:
   *
   * 2026-09-06T14:30:00.000Z
   */

  const result =
    new Date(
      `${normalizedDate}T${normalizedTime}+05:30`
    );

  if (
    Number.isNaN(
      result.getTime()
    )
  ) {

    return null;
  }

  return result;
}

// ============================================================
// FORMAT DATE FOR EVENT PAYLOAD
// ============================================================

function formatDateForPayload(
  value
) {

  return normalizeDatePart(
    value
  );
}

// ============================================================
// FORMAT TIME FOR EVENT PAYLOAD
// ============================================================

function formatTimeForPayload(
  value
) {

  return normalizeTimePart(
    value
  );
}

const liveClassReminderScheduler = {

  running:
    false,

  timer:
    null,

  pollIntervalMs:
    DEFAULT_POLL_INTERVAL_MS,

  lastRunAt:
    null,

  lastRunResult:
    null,

  // ==========================================================
  // GET UPCOMING LIVE CLASSES
  //
  // Resolve batch_name in the same query.
  //
  // This avoids N+1 queries while ensuring communication
  // templates receive production batch data.
  // ==========================================================

  async getUpcomingLiveClasses() {

    const sql = `
      SELECT
        lc.id,
        lc.batch_id,
        b.batch_name,
        lc.title,
        lc.description,
        lc.class_date,
        lc.start_time,
        lc.end_time,
        lc.status,
        lc.zoom_link,
        lc.meeting_id
      FROM live_classes lc
      LEFT JOIN batches b
        ON b.id = lc.batch_id
      WHERE
        lc.class_date >= CURDATE()
      ORDER BY
        lc.class_date ASC,
        lc.start_time ASC,
        lc.id ASC
    `;

    const rows =
      await query(
        sql
      );

    return rows || [];
  },

  // ==========================================================
  // BUILD CLASS DATETIME
  //
  // IMPORTANT:
  // The database class date/time is interpreted explicitly as
  // Asia/Kolkata rather than relying on the server's timezone.
  // ==========================================================

  buildClassDateTime(
    liveClass
  ) {

    if (
      !liveClass ||
      !liveClass.class_date ||
      !liveClass.start_time
    ) {

      return null;
    }

    return buildIndiaDate(
      liveClass.class_date,
      liveClass.start_time
    );
  },

  // ==========================================================
  // CHECK CANCELLED CLASS
  // ==========================================================

  isCancelled(
    liveClass
  ) {

    const status =
      String(
        liveClass?.status || ""
      )
        .trim()
        .toUpperCase();

    return [
      "CANCELLED",
      "CANCELED",
      "DELETED",
    ].includes(
      status
    );
  },

  // ==========================================================
  // BUILD EVENT PAYLOAD
  // ==========================================================

  buildEventPayload(
    liveClass,
    reminderType,
    reminderAt,
    classDateTime
  ) {

    return {
      live_class_id:
        liveClass.id,

      batch_id:
        liveClass.batch_id,

      batch_name:
        liveClass.batch_name ||
        null,

      title:
        liveClass.title,

      description:
        liveClass.description ||
        null,

      class_date:
        formatDateForPayload(
          liveClass.class_date
        ),

      start_time:
        formatTimeForPayload(
          liveClass.start_time
        ),

      end_time:
        formatTimeForPayload(
          liveClass.end_time
        ),

      status:
        liveClass.status,

      zoom_link:
        liveClass.zoom_link ||
        null,

      meeting_id:
        liveClass.meeting_id ||
        null,

      reminder_type:
        reminderType,

      reminder_at:
        reminderAt
          .toISOString(),

      class_starts_at:
        classDateTime
          .toISOString(),

      timezone:
        APPLICATION_TIMEZONE,

      source:
        "LIVE_CLASS_REMINDER_SCHEDULER",
    };
  },

  // ==========================================================
  // CREATE REMINDER EVENT
  //
  // The event_key is unique in automation_events.
  //
  // Therefore:
  //
  // LIVE_CLASS_REMINDER_24H:123
  //
  // can only exist once.
  //
  // Same for:
  //
  // LIVE_CLASS_REMINDER_1H:123
  //
  // IMPORTANT:
  // ON DUPLICATE KEY UPDATE deliberately performs no change.
  // This makes scheduler polling idempotent.
  // ==========================================================

  async createReminderEvent(
    liveClass,
    reminderType,
    reminderAt,
    classDateTime
  ) {

    const eventKey =
      `LIVE_CLASS_REMINDER_${reminderType}:${liveClass.id}`;

    const payload =
      this.buildEventPayload(
        liveClass,
        reminderType,
        reminderAt,
        classDateTime
      );

    const sql = `
      INSERT INTO automation_events (
        event_key,
        event_type,
        aggregate_type,
        aggregate_id,
        payload_json,
        status,
        available_at
      )
      VALUES (
        ?,
        ?,
        ?,
        ?,
        ?,
        'PENDING',
        ?
      )
      ON DUPLICATE KEY UPDATE
        event_key = event_key
    `;

    const result =
      await query(
        sql,
        [
          eventKey,

          `LIVE_CLASS_REMINDER_${reminderType}`,

          "LIVE_CLASS",

          liveClass.id,

          JSON.stringify(
            payload
          ),

          reminderAt,
        ]
      );

    return {
      eventKey,

      created:
        result.affectedRows === 1,

      duplicate:
        result.affectedRows === 0,
    };
  },

  // ==========================================================
  // PROCESS ONE LIVE CLASS
  // ==========================================================

  async processLiveClass(
    liveClass,
    now = new Date()
  ) {

    if (
      this.isCancelled(
        liveClass
      )
    ) {

      return {
        liveClassId:
          liveClass.id,

        skipped:
          true,

        reason:
          "CLASS_CANCELLED",

        remindersCreated:
          0,

        remindersSkipped:
          0,
      };
    }

    const classDateTime =
      this.buildClassDateTime(
        liveClass
      );

    if (
      !classDateTime
    ) {

      return {
        liveClassId:
          liveClass.id,

        skipped:
          true,

        reason:
          "INVALID_CLASS_DATETIME",

        remindersCreated:
          0,

        remindersSkipped:
          0,
      };
    }

    /*
     * Never create reminders for a class that has already
     * started.
     */

    if (
      classDateTime.getTime() <=
      now.getTime()
    ) {

      return {
        liveClassId:
          liveClass.id,

        skipped:
          true,

        reason:
          "CLASS_ALREADY_STARTED",

        remindersCreated:
          0,

        remindersSkipped:
          0,
      };
    }

    let remindersCreated =
      0;

    let remindersSkipped =
      0;

    const reminderResults =
      [];

    for (
      const reminderWindow of
        Object.values(
          REMINDER_WINDOWS
        )
    ) {

      const reminderAt =
        new Date(
          classDateTime.getTime() -
          reminderWindow.offsetMs
        );

      /*
       * If this reminder time has already passed,
       * don't create a late reminder.
       */

      if (
        reminderAt.getTime() <=
        now.getTime()
      ) {

        remindersSkipped +=
          1;

        reminderResults.push({
          reminderType:
            reminderWindow.key,

          reminderAt,

          created:
            false,

          skipped:
            true,

          reason:
            "REMINDER_TIME_ALREADY_PASSED",
        });

        continue;
      }

      const result =
        await this.createReminderEvent(
          liveClass,

          reminderWindow.key,

          reminderAt,

          classDateTime
        );

      if (
        result.created
      ) {

        remindersCreated +=
          1;

      } else {

        remindersSkipped +=
          1;
      }

      reminderResults.push({
        reminderType:
          reminderWindow.key,

        reminderAt,

        created:
          result.created,

        duplicate:
          result.duplicate,

        eventKey:
          result.eventKey,
      });
    }

    return {
      liveClassId:
        liveClass.id,

      skipped:
        false,

      remindersCreated,

      remindersSkipped,

      reminderResults,
    };
  },

  // ==========================================================
  // RUN ONE SCHEDULER CYCLE
  // ==========================================================

  async runCycle() {

    const startedAt =
      new Date();

    const liveClasses =
      await this.getUpcomingLiveClasses();

    let classesProcessed =
      0;

    let classesSkipped =
      0;

    let remindersCreated =
      0;

    let remindersSkipped =
      0;

    const results =
      [];

    for (
      const liveClass of
        liveClasses
    ) {

      const result =
        await this.processLiveClass(
          liveClass,
          startedAt
        );

      results.push(
        result
      );

      if (
        result.skipped
      ) {

        classesSkipped +=
          1;

      } else {

        classesProcessed +=
          1;
      }

      remindersCreated +=
        Number(
          result.remindersCreated ||
          0
        );

      remindersSkipped +=
        Number(
          result.remindersSkipped ||
          0
        );
    }

    const completedAt =
      new Date();

    const cycleResult = {
      startedAt,

      completedAt,

      timezone:
        APPLICATION_TIMEZONE,

      classesFound:
        liveClasses.length,

      classesProcessed,

      classesSkipped,

      remindersCreated,

      remindersSkipped,

      results,
    };

    this.lastRunAt =
      completedAt;

    this.lastRunResult =
      cycleResult;

    return cycleResult;
  },

  // ==========================================================
  // GET STATUS
  // ==========================================================

  getStatus() {

    return {
      running:
        this.running === true,

      pollIntervalMs:
        this.pollIntervalMs,

      timezone:
        APPLICATION_TIMEZONE,

      lastRunAt:
        this.lastRunAt,

      lastRunResult:
        this.lastRunResult,
    };
  },

  // ==========================================================
  // START
  // ==========================================================

  start(
    options = {}
  ) {

    if (
      this.running
    ) {

      console.log(
        "[LiveClassReminderScheduler] Already running"
      );

      return this;
    }

    const pollInterval =
      Math.max(
        Number(
          options.pollIntervalMs ||
          process.env.LIVE_CLASS_REMINDER_POLL_INTERVAL_MS ||
          DEFAULT_POLL_INTERVAL_MS
        ) ||
        DEFAULT_POLL_INTERVAL_MS,

        10000
      );

    this.running =
      true;

    this.pollIntervalMs =
      pollInterval;

    console.log(
      `[LiveClassReminderScheduler] Started. Poll interval: ${pollInterval}ms`
    );

    console.log(
      `[LiveClassReminderScheduler] Timezone: ${APPLICATION_TIMEZONE}`
    );

    /*
     * Execute immediately after startup.
     */

    this.runInitialCycle();

    return this;
  },

  // ==========================================================
  // INITIAL CYCLE
  // ==========================================================

  async runInitialCycle() {

    try {

      await this.runCycle();

    } catch (
      error
    ) {

      console.error(
        "[LiveClassReminderScheduler] Initial cycle failed:",
        error.message
      );
    }

    if (
      this.running
    ) {

      this.scheduleNextCycle();
    }
  },

  // ==========================================================
  // SCHEDULE NEXT CYCLE
  // ==========================================================

  scheduleNextCycle() {

    if (
      !this.running
    ) {

      return;
    }

    this.timer =
      setTimeout(
        async () => {

          if (
            !this.running
          ) {

            return;
          }

          try {

            await this.runCycle();

          } catch (
            error
          ) {

            console.error(
              "[LiveClassReminderScheduler] Cycle failed:",
              error.message
            );
          }

          this.scheduleNextCycle();

        },

        this.pollIntervalMs
      );
  },

  // ==========================================================
  // STOP
  // ==========================================================

  stop() {

    this.running =
      false;

    if (
      this.timer
    ) {

      clearTimeout(
        this.timer
      );

      this.timer =
        null;
    }

    console.log(
      "[LiveClassReminderScheduler] Stopped"
    );

    return this;
  },

};

module.exports =
  liveClassReminderScheduler;