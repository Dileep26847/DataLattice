const {
  pool: db,
} = require("./communicationDb");

// ============================================================
// AUTOMATION SCHEDULER
//
// Responsibilities:
// 1. Find enabled scheduled automation rules.
// 2. Provide scheduler status.
// 3. Calculate scheduled execution times.
// 4. Keep scheduling separate from message delivery.
//
// IMPORTANT:
// This scheduler does NOT send Email or WhatsApp.
// It prepares/identifies automation work for the event
// processor and communication worker.
// ============================================================

const DEFAULT_POLL_INTERVAL_MS = 60000;

const automationScheduler = {

  // ==========================================================
  // GET ENABLED SCHEDULED RULES
  // ==========================================================

  getScheduledRules(
    callback
  ) {

    const sql = `
      SELECT
        id,
        automation_key,
        name,
        description,
        trigger_type,
        event_name,
        schedule_expression,
        timezone,
        channels_json,
        recipient_type,
        template_key,
        conditions_json,
        retry_policy_json,
        enabled,
        created_by,
        created_at,
        updated_at
      FROM automation_rules
      WHERE
        enabled = 1
        AND schedule_expression IS NOT NULL
        AND TRIM(schedule_expression) <> ''
      ORDER BY
        id ASC
    `;

    db.query(
      sql,
      callback
    );
  },

  // ==========================================================
  // GET RULE BY AUTOMATION KEY
  // ==========================================================

  getRuleByKey(
    automationKey,
    callback
  ) {

    const sql = `
      SELECT
        id,
        automation_key,
        name,
        description,
        trigger_type,
        event_name,
        schedule_expression,
        timezone,
        channels_json,
        recipient_type,
        template_key,
        conditions_json,
        retry_policy_json,
        enabled,
        created_by,
        created_at,
        updated_at
      FROM automation_rules
      WHERE
        automation_key = ?
        AND enabled = 1
      LIMIT 1
    `;

    db.query(
      sql,
      [automationKey],
      callback
    );
  },

  // ==========================================================
  // PARSE SCHEDULE CONFIGURATION
  //
  // Supported schedule formats:
  //
  // 1. Numeric delay:
  //    60
  //
  // 2. JSON:
  //    {
  //      "delay_minutes": 60
  //    }
  //
  // 3. JSON:
  //    {
  //      "delay_seconds": 3600
  //    }
  //
  // 4. Explicit:
  //    {
  //      "scheduled_at": "2026-09-06T18:00:00"
  //    }
  //
  // 5. Cron-like expression:
  //    The scheduler stores/reads the expression but does not
  //    implement a cron parser here. A dedicated cron parser
  //    can be introduced without changing the rest of the
  //    communication architecture.
  // ==========================================================

  parseSchedule(
    scheduleExpression
  ) {

    if (
      scheduleExpression ===
        null ||
      scheduleExpression ===
        undefined
    ) {

      return {
        type:
          "IMMEDIATE",

        delayMs:
          0,

        scheduledAt:
          null,

        expression:
          null,
      };
    }

    if (
      typeof scheduleExpression ===
      "number"
    ) {

      if (
        Number.isFinite(
          scheduleExpression
        ) &&
        scheduleExpression >= 0
      ) {

        return {
          type:
            "DELAY_MINUTES",

          delayMs:
            scheduleExpression *
            60 *
            1000,

          scheduledAt:
            null,

          expression:
            String(
              scheduleExpression
            ),
        };
      }
    }

    const expression =
      String(
        scheduleExpression
      ).trim();

    if (
      !expression
    ) {

      return {
        type:
          "IMMEDIATE",

        delayMs:
          0,

        scheduledAt:
          null,

        expression:
          null,
      };
    }

    // --------------------------------------------------------
    // JSON configuration
    // --------------------------------------------------------

    if (
      expression.startsWith("{") &&
      expression.endsWith("}")
    ) {

      try {

        const config =
          JSON.parse(
            expression
          );

        if (
          config.scheduled_at
        ) {

          const date =
            new Date(
              config.scheduled_at
            );

          if (
            !Number.isNaN(
              date.getTime()
            )
          ) {

            return {
              type:
                "SCHEDULED_AT",

              delayMs:
                Math.max(
                  date.getTime() -
                  Date.now(),
                  0
                ),

              scheduledAt:
                date,

              expression,
            };
          }
        }

        if (
          Number.isFinite(
            Number(
              config.delay_seconds
            )
          )
        ) {

          return {
            type:
              "DELAY_SECONDS",

            delayMs:
              Math.max(
                Number(
                  config.delay_seconds
                ),
                0
              ) *
              1000,

            scheduledAt:
              null,

            expression,
          };
        }

        if (
          Number.isFinite(
            Number(
              config.delay_minutes
            )
          )
        ) {

          return {
            type:
              "DELAY_MINUTES",

            delayMs:
              Math.max(
                Number(
                  config.delay_minutes
                ),
                0
              ) *
              60 *
              1000,

            scheduledAt:
              null,

            expression,
          };
        }

        return {
          type:
            "CONFIGURATION",

          delayMs:
            0,

          scheduledAt:
            null,

          expression,

          config,
        };

      } catch (
        error
      ) {

        return {
          type:
            "INVALID",

          delayMs:
            0,

          scheduledAt:
            null,

          expression,

          error:
            error.message,
        };
      }
    }

    // --------------------------------------------------------
    // Numeric string = delay in minutes
    // --------------------------------------------------------

    if (
      /^\d+(\.\d+)?$/.test(
        expression
      )
    ) {

      const minutes =
        Number(
          expression
        );

      return {
        type:
          "DELAY_MINUTES",

        delayMs:
          minutes *
          60 *
          1000,

        scheduledAt:
          null,

        expression,
      };
    }

    // --------------------------------------------------------
    // Cron expression
    //
    // We identify it here but deliberately do not attempt to
    // execute cron syntax without a dedicated parser.
    // --------------------------------------------------------

    const cronParts =
      expression.split(
        /\s+/
      );

    if (
      cronParts.length >= 5
    ) {

      return {
        type:
          "CRON",

        delayMs:
          0,

        scheduledAt:
          null,

        expression,
      };
    }

    return {
      type:
        "UNKNOWN",

      delayMs:
        0,

      scheduledAt:
        null,

      expression,
    };
  },

  // ==========================================================
  // CALCULATE NEXT RUN
  //
  // For delay-based schedules this returns a Date.
  // For cron expressions, the expression is returned and an
  // external cron calculation layer can determine the next
  // occurrence.
  // ==========================================================

  calculateNextRun(
    scheduleExpression,
    fromDate = new Date()
  ) {

    const schedule =
      this.parseSchedule(
        scheduleExpression
      );

    if (
      schedule.type ===
        "IMMEDIATE"
    ) {

      return {
        type:
          schedule.type,

        nextRunAt:
          new Date(
            fromDate
          ),

        expression:
          schedule.expression,
      };
    }

    if (
      schedule.type ===
        "DELAY_MINUTES" ||
      schedule.type ===
        "DELAY_SECONDS"
    ) {

      return {
        type:
          schedule.type,

        nextRunAt:
          new Date(
            fromDate.getTime() +
            schedule.delayMs
          ),

        expression:
          schedule.expression,
      };
    }

    if (
      schedule.type ===
        "SCHEDULED_AT"
    ) {

      return {
        type:
          schedule.type,

        nextRunAt:
          schedule.scheduledAt,

        expression:
          schedule.expression,
      };
    }

    if (
      schedule.type ===
        "CRON"
    ) {

      return {
        type:
          schedule.type,

        nextRunAt:
          null,

        expression:
          schedule.expression,
      };
    }

    return {
      type:
        schedule.type,

      nextRunAt:
        null,

      expression:
        schedule.expression,
    };
  },

  // ==========================================================
  // VALIDATE TIMEZONE
  // ==========================================================

  isValidTimezone(
    timezone
  ) {

    if (
      !timezone
    ) {

      return false;
    }

    try {

      new Intl.DateTimeFormat(
        "en-US",
        {
          timeZone:
            timezone,
        }
      );

      return true;

    } catch (
      error
    ) {

      return false;
    }
  },

  // ==========================================================
  // NORMALIZE TIMEZONE
  // ==========================================================

  normalizeTimezone(
    timezone
  ) {

    if (
      this.isValidTimezone(
        timezone
      )
    ) {

      return timezone;
    }

    return "UTC";
  },

  // ==========================================================
  // GET SCHEDULER STATUS
  // ==========================================================

  getStatus() {

    return {
      running:
        this.running === true,

      pollIntervalMs:
        this.pollIntervalMs ||
        DEFAULT_POLL_INTERVAL_MS,

      lastRunAt:
        this.lastRunAt ||
        null,

      nextRunAt:
        this.nextRunAt ||
        null,
    };
  },

  // ==========================================================
  // RUN ONE SCHEDULER CYCLE
  //
  // This is intentionally read-only at this stage.
  //
  // It discovers enabled scheduled rules and calculates their
  // scheduling metadata.
  //
  // Actual event creation will be connected when the live-class
  // and recurring automation workflows are implemented.
  // ==========================================================

  async runCycle() {

    const rules =
      await new Promise(
        (
          resolve,
          reject
        ) => {

          this.getScheduledRules(
            (
              error,
              rows
            ) => {

              if (error) {
                return reject(
                  error
                );
              }

              resolve(
                rows || []
              );
            }
          );

        }
      );

    const scheduledRules =
      rules.map(
        (rule) => {

          const schedule =
            this.calculateNextRun(
              rule.schedule_expression
            );

          return {
            ruleId:
              rule.id,

            automationKey:
              rule.automation_key,

            eventName:
              rule.event_name,

            timezone:
              this.normalizeTimezone(
                rule.timezone
              ),

            scheduleExpression:
              rule.schedule_expression,

            scheduleType:
              schedule.type,

            nextRunAt:
              schedule.nextRunAt,

            validTimezone:
              this.isValidTimezone(
                rule.timezone
              ),
          };
        }
      );

    this.lastRunAt =
      new Date();

    return {
      rulesFound:
        rules.length,

      scheduledRules,
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
        "[AutomationScheduler] Already running"
      );

      return this;
    }

    const pollInterval =
      Math.max(
        Number(
          options.pollIntervalMs ||
          process.env.AUTOMATION_SCHEDULER_POLL_INTERVAL_MS ||
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
      `[AutomationScheduler] Started. Poll interval: ${pollInterval}ms`
    );

    this.scheduleNextCycle();

    return this;
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
              "[AutomationScheduler] Cycle failed:",
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
      "[AutomationScheduler] Stopped"
    );

    return this;
  },

};

// ============================================================
// INITIAL STATE
// ============================================================

automationScheduler.running =
  false;

automationScheduler.timer =
  null;

automationScheduler.pollIntervalMs =
  DEFAULT_POLL_INTERVAL_MS;

automationScheduler.lastRunAt =
  null;

automationScheduler.nextRunAt =
  null;

// ============================================================
// EXPORT
// ============================================================

module.exports =
  automationScheduler;