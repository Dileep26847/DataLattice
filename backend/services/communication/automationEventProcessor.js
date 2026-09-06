const automationEngine =
  require("./automationEngine");

// ============================================================
// AUTOMATION EVENT PROCESSOR
//
// Responsibilities:
// 1. Consume pending automation events.
// 2. Pass each event to the Automation Engine.
// 3. Allow the Automation Engine to create automation runs and
//    communication jobs.
// 4. Never send Email/WhatsApp directly.
//
// The Communication Worker remains responsible for delivery.
// ============================================================

const DEFAULT_POLL_INTERVAL_MS = 5000;

const automationEventProcessor = {

  // ==========================================================
  // PROCESS ONE EVENT
  // ==========================================================

  async processNextEvent() {

    try {

      const result =
        await automationEngine.processNextEvent();

      return result;

    } catch (
      error
    ) {

      console.error(
        "[AutomationEventProcessor] Event processing failed:",
        error.message
      );

      return {
        processed: false,
        failed: true,
        error:
          error.message,
      };
    }
  },

  // ==========================================================
  // PROCESS AVAILABLE EVENTS
  //
  // Drains currently available events.
  //
  // A safety limit prevents an unhealthy queue from causing an
  // unbounded synchronous processing loop.
  // ==========================================================

  async processAvailableEvents(
    maxEvents = 100
  ) {

    const safeMaxEvents =
      Math.min(
        Math.max(
          Number(maxEvents) || 100,
          1
        ),
        1000
      );

    let processed = 0;
    let failed = 0;

    for (
      let index = 0;
      index < safeMaxEvents;
      index += 1
    ) {

      const result =
        await this.processNextEvent();

      if (
        !result ||
        result.processed !== true
      ) {

        if (
          result &&
          result.failed
        ) {
          failed += 1;
        }

        break;
      }

      processed += 1;
    }

    return {
      processed,
      failed,
    };
  },

  // ==========================================================
  // START PROCESSOR
  //
  // The processor polls the durable automation_events table.
  //
  // It does not create another process if one is already
  // running inside this application instance.
  // ==========================================================

  start(
    options = {}
  ) {

    if (
      this.running
    ) {

      console.log(
        "[AutomationEventProcessor] Already running"
      );

      return this;
    }

    const pollInterval =
      Math.max(
        Number(
          options.pollIntervalMs ||
          process.env.AUTOMATION_EVENT_POLL_INTERVAL_MS ||
          DEFAULT_POLL_INTERVAL_MS
        ) || DEFAULT_POLL_INTERVAL_MS,
        1000
      );

    const batchSize =
      Math.min(
        Math.max(
          Number(
            options.batchSize ||
            process.env.AUTOMATION_EVENT_BATCH_SIZE ||
            100
          ) || 100,
          1
        ),
        1000
      );

    this.running = true;

    this.pollIntervalMs =
      pollInterval;

    this.batchSize =
      batchSize;

    console.log(
      `[AutomationEventProcessor] Started. Poll interval: ${pollInterval}ms`
    );

    console.log(
      `[AutomationEventProcessor] Batch size: ${batchSize}`
    );

    this.scheduleNextPoll();

    return this;
  },

  // ==========================================================
  // SCHEDULE NEXT POLL
  // ==========================================================

  scheduleNextPoll() {

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

            await this.processAvailableEvents(
              this.batchSize
            );

          } catch (
            error
          ) {

            console.error(
              "[AutomationEventProcessor] Poll cycle failed:",
              error.message
            );
          }

          this.scheduleNextPoll();

        },
        this.pollIntervalMs
      );
  },

  // ==========================================================
  // STOP PROCESSOR
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
      "[AutomationEventProcessor] Stopped"
    );

    return this;
  },

  // ==========================================================
  // STATUS
  // ==========================================================

  getStatus() {

    return {
      running:
        this.running === true,

      pollIntervalMs:
        this.pollIntervalMs ||
        null,

      batchSize:
        this.batchSize ||
        null,
    };
  },

};

// ============================================================
// INITIAL STATE
// ============================================================

automationEventProcessor.running =
  false;

automationEventProcessor.timer =
  null;

automationEventProcessor.pollIntervalMs =
  DEFAULT_POLL_INTERVAL_MS;

automationEventProcessor.batchSize =
  100;

// ============================================================
// EXPORT
// ============================================================

module.exports =
  automationEventProcessor;