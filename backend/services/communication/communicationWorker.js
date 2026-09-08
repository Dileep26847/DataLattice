const os = require("os");
const crypto = require("crypto");

const communicationJobModel =
  require("../../models/communicationJobModel");

const communicationDeliveryModel =
  require("../../models/communicationDeliveryModel");

const notificationModel =
  require("../../models/notificationModel");

const communicationService =
  require("./communicationService");

const {
  calculateNextAttemptAt,
  shouldRetry,
  classifyError,
} =
  require("./retryPolicy");

// ============================================================
// DATALATTICE COMMUNICATION WORKER
// ============================================================
//
// Processes database-backed communication jobs.
//
// Flow:
//
// QUEUED
//   ↓
// PROCESSING
//   ↓
// provider.send()
//   ↓
// SENT
//
// On transient failure:
//
// PROCESSING
//   ↓
// QUEUED
//   ↓
// retry
//
// On permanent/exhausted failure:
//
// PROCESSING
//   ↓
// FAILED
//
// Every provider attempt is recorded in
// communication_deliveries.
//
// IMPORTANT:
//
// The Automation Engine renders and snapshots the template
// variables into communication_jobs.payload_json.
//
// The worker MUST use that snapshot directly instead of
// attempting to reconstruct recipient/template data.
//
// IN_APP:
//
// IN_APP notifications do not use an external provider.
// They are persisted directly into the existing notifications
// table using recipient_user_id.
//
// The communication job's idempotency_key is reused as the
// notification idempotency key so a retried worker execution
// cannot create duplicate in-app notifications.
//
// ============================================================


// ============================================================
// WORKER CONFIGURATION
// ============================================================

const WORKER_ID =
  process.env.COMMUNICATION_WORKER_ID ||
  `${os.hostname()}-${process.pid}-${crypto.randomBytes(4).toString("hex")}`;

const POLL_INTERVAL_MS =
  Number(
    process.env.COMMUNICATION_WORKER_POLL_INTERVAL_MS ||
    5000
  );


// ============================================================
// CALLBACK → PROMISE HELPER
// ============================================================

const claimNextJob =
  () => {

    return new Promise(
      (
        resolve,
        reject
      ) => {

        communicationJobModel
          .claimNextJob(
            WORKER_ID,
            (
              error,
              job
            ) => {

              if (error) {
                reject(error);
                return;
              }

              resolve(job);

            }
          );

      }
    );

  };


// ============================================================
// MARK JOB AS SENT
// ============================================================

const markJobAsSent =
  (
    jobId
  ) => {

    return new Promise(
      (
        resolve,
        reject
      ) => {

        communicationJobModel
          .markJobAsSent(
            jobId,
            (
              error,
              result
            ) => {

              if (error) {
                reject(error);
                return;
              }

              resolve(
                result
              );

            }
          );

      }
    );

  };


// ============================================================
// MARK JOB FOR RETRY
// ============================================================

const markJobForRetry =
  (
    jobId,
    nextAttemptAt,
    errorMessage
  ) => {

    return new Promise(
      (
        resolve,
        reject
      ) => {

        communicationJobModel
          .markJobForRetry(
            jobId,
            nextAttemptAt,
            errorMessage,
            (
              error,
              result
            ) => {

              if (error) {
                reject(error);
                return;
              }

              resolve(
                result
              );

            }
          );

      }
    );

  };


// ============================================================
// MARK JOB AS FAILED
// ============================================================

const markJobAsFailed =
  (
    jobId,
    errorMessage
  ) => {

    return new Promise(
      (
        resolve,
        reject
      ) => {

        communicationJobModel
          .markJobAsFailed(
            jobId,
            errorMessage,
            (
              error,
              result
            ) => {

              if (error) {
                reject(error);
                return;
              }

              resolve(
                result
              );

            }
          );

      }
    );

  };


// ============================================================
// CREATE DELIVERY ATTEMPT
// ============================================================

const createDeliveryAttempt =
  (
    job
  ) => {

    return new Promise(
      (
        resolve,
        reject
      ) => {

        communicationDeliveryModel
          .createDelivery(
            {

              communication_job_id:
                job.id,

              attempt_number:
                job.attempt_count || 1,

              status:
                "PROCESSING",

            },

            (
              error,
              result
            ) => {

              if (error) {
                reject(error);
                return;
              }

              resolve(
                result
              );

            }
          );

      }
    );

  };


// ============================================================
// MARK DELIVERY AS SENT
// ============================================================

const markDeliveryAsSent =
  (
    deliveryId,
    providerResult
  ) => {

    return new Promise(
      (
        resolve,
        reject
      ) => {

        const provider =
          providerResult &&
          providerResult.provider
            ? providerResult.provider
            : {};

        communicationDeliveryModel
           .markDeliveryAsSent(
    deliveryId,

    provider.providerMessageId,

    provider.response,

    provider.provider ||
      null,

    (
      error,
      result
    ) => {

              if (error) {
                reject(error);
                return;
              }

              resolve(
                result
              );

            }
          );

      }
    );

  };


// ============================================================
// MARK DELIVERY AS FAILED
// ============================================================

const markDeliveryAsFailed =
  (
    deliveryId,
    error
  ) => {

    return new Promise(
      (
        resolve,
        reject
      ) => {

        communicationDeliveryModel
          .markDeliveryAsFailed(
            deliveryId,

            error &&
            error.code
              ? error.code
              : null,

            error &&
            error.message
              ? error.message
              : "Communication provider failed",

            error &&
            error.response
              ? error.response.data ||
                error.response
              : null,

            (
              updateError,
              result
            ) => {

              if (updateError) {
                reject(updateError);
                return;
              }

              resolve(
                result
              );

            }
          );

      }
    );

  };


// ============================================================
// GET JOB PAYLOAD
// ============================================================

const getJobPayload =
  (
    job
  ) => {

    if (
      !job ||
      !job.payload_json
    ) {
      return {};
    }

    if (
      typeof job.payload_json ===
      "object"
    ) {
      return job.payload_json;
    }

    try {

      return JSON.parse(
        job.payload_json
      );

    } catch (
      error
    ) {

      return {};

    }

  };


// ============================================================
// GET TEMPLATE VARIABLES
// ============================================================
//
// Automation Engine stores the final variable snapshot under:
//
// payload_json.template_variables
//
// Example:
//
// {
//   templateKey: "LIVE_CLASS_REMINDER_1H_EMAIL",
//   template_variables: {
//     student_name: "sandy",
//     title: "DataLattice Automation Test Class",
//     class_date: "2026-09-06",
//     start_time: "16:00:00",
//     batch_name: "Test Batch 2",
//     description: "...",
//     zoom_link: "..."
//   }
// }
//
// The worker uses this exact snapshot.
//
// ============================================================

const getJobVariables =
  (
    job
  ) => {

    const payload =
      getJobPayload(
        job
      );

    if (
      payload &&
      payload.template_variables &&
      typeof payload.template_variables ===
        "object" &&
      !Array.isArray(
        payload.template_variables
      )
    ) {

      return payload.template_variables;

    }

    // ----------------------------------------------------------
    // Backward compatibility
    // ----------------------------------------------------------
    //
    // Older jobs may have stored variables directly in
    // payload_json before template_variables was introduced.
    //
    // Do not pass infrastructure fields as template variables.
    //

    const {
      templateKey,
      template_key,
      templateId,
      template_id,
      templateVariables,
      template_variables,
      ...legacyVariables
    } =
      payload || {};

    if (
      templateVariables &&
      typeof templateVariables ===
        "object" &&
      !Array.isArray(
        templateVariables
      )
    ) {

      return templateVariables;

    }

    return legacyVariables;

  };


// ============================================================
// GET TEMPLATE KEY
// ============================================================

const getTemplateKey =
  (
    job,
    payload
  ) => {

    return (
      payload.templateKey ||
      payload.template_key ||
      job.template_key ||
      null
    );

  };


// ============================================================
// SEND IN-APP JOB
// ============================================================
//
// IN_APP notifications do not use an external provider.
//
// The notification is written directly into the existing
// notifications table.
//
// The communication job remains the source of delivery
// tracking, while the notifications table becomes the
// user-facing in-app notification store.
//
// Idempotency:
//
// communication_jobs.idempotency_key
//          ↓
// notifications.idempotency_key
//
// This ensures retries cannot create duplicate notifications.
//
// ============================================================

const sendInAppJob =
  (
    job,
    payload,
    variables
  ) => {

    return new Promise(
      (
        resolve,
        reject
      ) => {

        const recipientUserId =
          Number(
            job.recipient_user_id
          );

        if (
          !Number.isInteger(
            recipientUserId
          ) ||
          recipientUserId <= 0
        ) {

          reject(
            new Error(
              `IN_APP communication job ${job.id} does not contain a valid recipient user id`
            )
          );

          return;

        }

        const notification =
          payload &&
          payload.notification &&
          typeof payload.notification ===
            "object" &&
          !Array.isArray(
            payload.notification
          )
            ? payload.notification
            : {};

        const title =
          String(
            notification.title ||
            variables.title ||
            "DataLattice Notification"
          )
            .trim()
            .slice(
              0,
              150
            );

        const message =
          String(
            notification.message ||
            variables.message ||
            ""
          )
            .trim();

        if (!title) {

          reject(
            new Error(
              `IN_APP communication job ${job.id} has an empty notification title`
            )
          );

          return;

        }

        if (!message) {

          reject(
            new Error(
              `IN_APP communication job ${job.id} has an empty notification message`
            )
          );

          return;

        }

        const metadata =
          notification.metadata &&
          typeof notification.metadata ===
            "object" &&
          !Array.isArray(
            notification.metadata
          )
            ? notification.metadata
            : {};

        notificationModel
          .createNotification(

            recipientUserId,

            title,

            message,

            notification.type ||
              "system",

            {

              actionUrl:
                notification.action_url ||
                notification.actionUrl ||
                null,

              sourceType:
                notification.source_type ||
                notification.sourceType ||
                "automation",

              sourceId:
                notification.source_id ||
                notification.sourceId ||
                null,

              metadata,

              idempotencyKey:
                job.idempotency_key ||
                null,

            },

            (
              error,
              result
            ) => {

              if (error) {

                reject(
                  error
                );

                return;

              }

              const notificationId =
                result &&
                result.insertId
                  ? result.insertId
                  : null;

              resolve({

                templateId:
                  job.template_id ||
                  null,

                templateKey:
                  job.template_key ||
                  null,

                channel:
                  "IN_APP",

                recipient:
                  recipientUserId,

                provider: {

                  provider:
                    "IN_APP",

                  providerMessageId:
                    notificationId,

                  response: {

                    notificationId,

                  },

                },

              });

            }

          );

      }
    );

  };


// ============================================================
// SEND JOB
// ============================================================

const sendJob =
  async (
    job
  ) => {

    const payload =
      getJobPayload(
        job
      );

    const templateKey =
      getTemplateKey(
        job,
        payload
      );

    if (!templateKey) {

      throw new Error(
        `Communication job ${job.id} does not contain a template key`
      );

    }

    const variables =
      getJobVariables(
        job
      );

    // ----------------------------------------------------------
    // IN_APP
    // ----------------------------------------------------------
    //
    // IN_APP notifications are persisted directly into the
    // notifications table and do not go through an external
    // communication provider.
    //

    if (
      String(
        job.channel ||
        ""
      ).toUpperCase() ===
      "IN_APP"
    ) {

      return sendInAppJob(
        job,
        payload,
        variables
      );

    }

    // ----------------------------------------------------------
    // External communication channels
    // ----------------------------------------------------------

    return communicationService.send({

      channel:
        job.channel,

      templateKey,

      to:
        job.recipient_address,

      variables,

    });

  };


// ============================================================
// PROCESS JOB
// ============================================================

const processJob =
  async (
    job
  ) => {

    if (!job) {

      return {
        processed: false,
        reason: "NO_JOB",
      };

    }

    let delivery = null;

    try {

      delivery =
        await createDeliveryAttempt(
          job
        );

      const result =
        await sendJob(
          job
        );

      await markDeliveryAsSent(
        delivery.insertId,
        result
      );

      await markJobAsSent(
        job.id
      );

      return {

        processed: true,

        success: true,

        jobId:
          job.id,

        deliveryId:
          delivery.insertId,

        provider:
          result.provider ||
          null,

      };

    } catch (
      error
    ) {

      if (
        delivery &&
        delivery.insertId
      ) {

        try {

          await markDeliveryAsFailed(
            delivery.insertId,
            error
          );

        } catch (
          deliveryError
        ) {

          console.error(
            "Failed to record communication delivery error:",
            deliveryError.message
          );

        }

      }

      const classification =
        classifyError(
          error
        );

      const retry =
        shouldRetry({

          attemptCount:
            job.attempt_count,

          maxAttempts:
            job.max_attempts,

          permanentFailure:
            classification.permanent,

        });

      if (retry) {

        const nextAttemptAt =
          calculateNextAttemptAt(
            job.attempt_count
          );

        await markJobForRetry(

          job.id,

          nextAttemptAt,

          error.message

        );

        return {

          processed: true,

          success: false,

          retried: true,

          jobId:
            job.id,

          deliveryId:
            delivery
              ? delivery.insertId
              : null,

          error:
            error.message,

        };

      }

      await markJobAsFailed(

        job.id,

        error.message

      );

      return {

        processed: true,

        success: false,

        retried: false,

        failed: true,

        jobId:
          job.id,

        deliveryId:
          delivery
            ? delivery.insertId
            : null,

        error:
          error.message,

      };

    }

  };


// ============================================================
// PROCESS ONE JOB
// ============================================================

const processNextJob =
  async () => {

    const job =
      await claimNextJob();

    if (!job) {

      return {
        processed: false,
      };

    }

    return processJob(
      job
    );

  };


// ============================================================
// WORKER LOOP
// ============================================================

let workerRunning =
  false;

let workerTimer =
  null;


const runWorker =
  async () => {

    if (workerRunning) {
      return;
    }

    workerRunning = true;

    try {

      const result =
        await processNextJob();

      if (
        result &&
        result.processed
      ) {

        workerRunning =
          false;

        setImmediate(
          runWorker
        );

        return;

      }

    } catch (
      error
    ) {

      console.error(
        "Communication worker error:",
        error.message
      );

    }

    workerRunning =
      false;

    workerTimer =
      setTimeout(
        runWorker,
        POLL_INTERVAL_MS
      );

  };


// ============================================================
// START WORKER
// ============================================================

const startWorker =
  () => {

    if (workerRunning) {

      console.log(
        "Communication worker is already running."
      );

      return;

    }

    console.log(
      "========================================"
    );

    console.log(
      "DataLattice Communication Worker"
    );

    console.log(
      `Worker ID: ${WORKER_ID}`
    );

    console.log(
      `Poll interval: ${POLL_INTERVAL_MS}ms`
    );

    console.log(
      "========================================"
    );

    runWorker();

  };


// ============================================================
// STOP WORKER
// ============================================================

const stopWorker =
  () => {

    if (workerTimer) {

      clearTimeout(
        workerTimer
      );

      workerTimer =
        null;

    }

    workerRunning =
      false;

  };


// ============================================================
// EXPORTS
// ============================================================

module.exports = {

  WORKER_ID,

  POLL_INTERVAL_MS,

  processJob,

  processNextJob,

  startWorker,

  stopWorker,

};