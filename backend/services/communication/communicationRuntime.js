const automationEventProcessor = require("./automationEventProcessor");
const communicationWorker = require("./communicationWorker");
const automationScheduler = require("./automationScheduler");
const liveClassReminderScheduler = require("./liveClassReminderScheduler");

// ============================================================
// COMMUNICATION RUNTIME
//
// Responsibilities:
// 1. Start communication background services.
// 2. Stop communication background services.
// 3. Keep startup/shutdown centralized.
// 4. Respect environment-controlled enable/disable flags.
//
// Services:
// - Automation Event Processor
// - Communication Worker
// - Automation Scheduler
// - Live Class Reminder Scheduler
//
// IMPORTANT:
// This module does not send messages directly.
// Providers remain behind communicationService.
// ============================================================

const DEFAULT_EVENT_PROCESSOR_INTERVAL_MS =
  5000;

const DEFAULT_WORKER_POLL_INTERVAL_MS =
  5000;

const DEFAULT_SCHEDULER_POLL_INTERVAL_MS =
  60000;

const communicationRuntime = {

  running:
    false,

  // ==========================================================
  // ENVIRONMENT FLAG
  // ==========================================================

  isEnabled() {

    const value =
      String(
        process.env.COMMUNICATION_RUNTIME_ENABLED ??
        "true"
      )
        .trim()
        .toLowerCase();

    return ![
      "false",
      "0",
      "no",
      "off",
      "disabled",
    ].includes(
      value
    );
  },

  // ==========================================================
  // START RUNTIME
  // ==========================================================

  start() {

    if (
      this.running
    ) {

      console.log(
        "[CommunicationRuntime] Already running"
      );

      return this;
    }

    if (
      !this.isEnabled()
    ) {

      console.log(
        "[CommunicationRuntime] Disabled by COMMUNICATION_RUNTIME_ENABLED"
      );

      return this;
    }

    const eventProcessorInterval =
      Math.max(
        Number(
          process.env.AUTOMATION_EVENT_POLL_INTERVAL_MS ||
          DEFAULT_EVENT_PROCESSOR_INTERVAL_MS
        ) ||
        DEFAULT_EVENT_PROCESSOR_INTERVAL_MS,

        1000
      );

    const eventProcessorBatchSize =
      Math.max(
        Number(
          process.env.AUTOMATION_EVENT_BATCH_SIZE ||
          100
        ) ||
        100,

        1
      );

    const workerPollInterval =
      Math.max(
        Number(
          process.env.COMMUNICATION_WORKER_POLL_INTERVAL_MS ||
          DEFAULT_WORKER_POLL_INTERVAL_MS
        ) ||
        DEFAULT_WORKER_POLL_INTERVAL_MS,

        1000
      );

    const workerBatchSize =
      Math.max(
        Number(
          process.env.COMMUNICATION_WORKER_BATCH_SIZE ||
          1
        ) ||
        1,

        1
      );

    const schedulerPollInterval =
      Math.max(
        Number(
          process.env.AUTOMATION_SCHEDULER_POLL_INTERVAL_MS ||
          DEFAULT_SCHEDULER_POLL_INTERVAL_MS
        ) ||
        DEFAULT_SCHEDULER_POLL_INTERVAL_MS,

        10000
      );

    const liveClassReminderPollInterval =
      Math.max(
        Number(
          process.env.LIVE_CLASS_REMINDER_POLL_INTERVAL_MS ||
          DEFAULT_SCHEDULER_POLL_INTERVAL_MS
        ) ||
        DEFAULT_SCHEDULER_POLL_INTERVAL_MS,

        10000
      );

    console.log(
      "[CommunicationRuntime] Starting communication services..."
    );

    // --------------------------------------------------------
    // AUTOMATION EVENT PROCESSOR
    // --------------------------------------------------------

    automationEventProcessor.start({
      pollIntervalMs:
        eventProcessorInterval,

      batchSize:
        eventProcessorBatchSize,
    });

    // --------------------------------------------------------
    // COMMUNICATION WORKER
    // --------------------------------------------------------

    communicationWorker.startWorker({
      pollIntervalMs:
        workerPollInterval,

      batchSize:
        workerBatchSize,
    });

    // --------------------------------------------------------
    // GENERIC AUTOMATION SCHEDULER
    // --------------------------------------------------------

    automationScheduler.start({
      pollIntervalMs:
        schedulerPollInterval,
    });

    // --------------------------------------------------------
    // LIVE CLASS REMINDER SCHEDULER
    //
    // Creates future-dated automation events for:
    //
    // - 24-hour reminders
    // - 1-hour reminders
    //
    // It does not send messages.
    // --------------------------------------------------------

    liveClassReminderScheduler.start({
      pollIntervalMs:
        liveClassReminderPollInterval,
    });

    this.running =
      true;

    console.log(
      "[CommunicationRuntime] Communication services started"
    );

    return this;
  },

  // ==========================================================
  // STOP RUNTIME
  // ==========================================================

  stop() {

    if (
      !this.running
    ) {

      return this;
    }

    console.log(
      "[CommunicationRuntime] Stopping communication services..."
    );

    // --------------------------------------------------------
    // Stop generic scheduler first.
    //
    // This prevents new scheduled work from being discovered
    // while the rest of the communication pipeline shuts down.
    // --------------------------------------------------------

    try {

      automationScheduler.stop();

    } catch (
      error
    ) {

      console.error(
        "[CommunicationRuntime] Scheduler shutdown failed:",
        error.message
      );
    }

    // --------------------------------------------------------
    // Stop live class reminder scheduler.
    //
    // This prevents new live-class reminder events from being
    // created while the rest of the pipeline shuts down.
    // --------------------------------------------------------

    try {

      liveClassReminderScheduler.stop();

    } catch (
      error
    ) {

      console.error(
        "[CommunicationRuntime] Live class reminder scheduler shutdown failed:",
        error.message
      );
    }

    // --------------------------------------------------------
    // Stop event processor.
    // --------------------------------------------------------

    try {

      automationEventProcessor.stop();

    } catch (
      error
    ) {

      console.error(
        "[CommunicationRuntime] Event processor shutdown failed:",
        error.message
      );
    }

    // --------------------------------------------------------
    // Stop communication worker.
    // --------------------------------------------------------

    try {

      communicationWorker.stopWorker();

    } catch (
      error
    ) {

      console.error(
        "[CommunicationRuntime] Communication worker shutdown failed:",
        error.message
      );
    }

    this.running =
      false;

    console.log(
      "[CommunicationRuntime] Communication services stopped"
    );

    return this;
  },

  // ==========================================================
  // STATUS
  // ==========================================================

  getStatus() {

    return {
      enabled:
        this.isEnabled(),

      running:
        this.running,

      eventProcessor:
        typeof automationEventProcessor.getStatus ===
          "function"
          ? automationEventProcessor.getStatus()
          : null,

      communicationWorker:
        typeof communicationWorker.getStatus ===
          "function"
          ? communicationWorker.getStatus()
          : null,

      automationScheduler:
        typeof automationScheduler.getStatus ===
          "function"
          ? automationScheduler.getStatus()
          : null,

      liveClassReminderScheduler:
        typeof liveClassReminderScheduler.getStatus ===
          "function"
          ? liveClassReminderScheduler.getStatus()
          : null,
    };
  },

};

module.exports =
  communicationRuntime;