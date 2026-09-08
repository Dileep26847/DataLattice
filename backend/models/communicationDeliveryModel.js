const db = require("../services/communication/communicationDb").pool;

// ============================================================
// COMMUNICATION DELIVERY MODEL
// ============================================================
//
// Stores channel/provider-level delivery attempts.
//
// A communication job represents the logical message.
// A delivery represents an individual provider attempt.
//
// This separation allows us to track:
// - retries
// - provider message IDs
// - delivery status
// - provider responses
// - failure reasons
//
// Provider names:
// - EMAIL providers
// - WHATSAPP providers
// - IN_APP internal notification provider
//
// ============================================================


// ============================================================
// CREATE DELIVERY ATTEMPT
// ============================================================

const createDelivery = (
  deliveryData,
  callback
) => {

  const {
    communication_job_id,
    attempt_number,
    provider_name,
    provider_message_id,
    status,
    sent_at,
    delivered_at,
    failed_at,
    error_code,
    error_message,
    provider_response,
  } = deliveryData;

  const sql = `
    INSERT INTO communication_deliveries
    (
      communication_job_id,
      attempt_number,
      provider_name,
      provider_message_id,
      status,
      sent_at,
      delivered_at,
      failed_at,
      error_code,
      error_message,
      provider_response
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      communication_job_id,
      attempt_number || 1,
      provider_name || null,
      provider_message_id || null,
      status || "QUEUED",
      sent_at || null,
      delivered_at || null,
      failed_at || null,
      error_code || null,
      error_message || null,
      provider_response
        ? JSON.stringify(
            provider_response
          )
        : null,
    ],
    callback
  );

};


// ============================================================
// GET DELIVERY BY ID
// ============================================================

const getDeliveryById = (
  deliveryId,
  callback
) => {

  const sql = `
    SELECT
      *
    FROM communication_deliveries
    WHERE id = ?
    LIMIT 1
  `;

  db.query(
    sql,
    [deliveryId],
    callback
  );

};


// ============================================================
// GET DELIVERIES FOR JOB
// ============================================================

const getDeliveriesByJobId = (
  jobId,
  callback
) => {

  const sql = `
    SELECT
      *
    FROM communication_deliveries
    WHERE communication_job_id = ?
    ORDER BY
      attempt_number ASC,
      id ASC
  `;

  db.query(
    sql,
    [jobId],
    callback
  );

};


// ============================================================
// GET LATEST DELIVERY
// ============================================================

const getLatestDeliveryByJobId = (
  jobId,
  callback
) => {

  const sql = `
    SELECT
      *
    FROM communication_deliveries
    WHERE communication_job_id = ?
    ORDER BY
      attempt_number DESC,
      id DESC
    LIMIT 1
  `;

  db.query(
    sql,
    [jobId],
    callback
  );

};


// ============================================================
// MARK DELIVERY AS PROCESSING
// ============================================================

const markDeliveryAsProcessing = (
  deliveryId,
  callback
) => {

  const sql = `
    UPDATE communication_deliveries
    SET
      status = 'PROCESSING'
    WHERE id = ?
  `;

  db.query(
    sql,
    [deliveryId],
    callback
  );

};


// ============================================================
// MARK DELIVERY AS SENT
// ============================================================
//
// providerName is optional for backward compatibility.
//
// Existing callers that provide only:
//
// markDeliveryAsSent(
//   deliveryId,
//   providerMessageId,
//   providerResponse,
//   callback
// )
//
// continue to work.
//
// IN_APP callers may provide:
//
// markDeliveryAsSent(
//   deliveryId,
//   providerMessageId,
//   providerResponse,
//   providerName,
//   callback
// )
//
// ============================================================

const markDeliveryAsSent = (
  deliveryId,
  providerMessageId,
  providerResponse,
  providerNameOrCallback,
  maybeCallback
) => {

  let providerName = null;
  let callback = maybeCallback;

  // ----------------------------------------------------------
  // Backward-compatible signature:
  //
  // markDeliveryAsSent(
  //   deliveryId,
  //   providerMessageId,
  //   providerResponse,
  //   callback
  // )
  // ----------------------------------------------------------

  if (
    typeof providerNameOrCallback ===
    "function"
  ) {

    callback =
      providerNameOrCallback;

  } else {

    providerName =
      providerNameOrCallback ||
      null;

  }

  const sql = `
    UPDATE communication_deliveries
    SET
      status = 'SENT',
      provider_name = COALESCE(
        ?,
        provider_name
      ),
      provider_message_id = ?,
      sent_at = NOW(),
      provider_response = ?,
      error_code = NULL,
      error_message = NULL
    WHERE id = ?
  `;

  db.query(
    sql,
    [
      providerName,

      providerMessageId ||
        null,

      providerResponse
        ? JSON.stringify(
            providerResponse
          )
        : null,

      deliveryId,
    ],
    callback
  );

};


// ============================================================
// MARK DELIVERY AS DELIVERED
// ============================================================

const markDeliveryAsDelivered = (
  deliveryId,
  providerResponse,
  callback
) => {

  const sql = `
    UPDATE communication_deliveries
    SET
      status = 'DELIVERED',
      delivered_at = NOW(),
      provider_response = COALESCE(
        ?,
        provider_response
      )
    WHERE id = ?
  `;

  db.query(
    sql,
    [
      providerResponse
        ? JSON.stringify(
            providerResponse
          )
        : null,
      deliveryId,
    ],
    callback
  );

};


// ============================================================
// MARK DELIVERY AS FAILED
// ============================================================

const markDeliveryAsFailed = (
  deliveryId,
  errorCode,
  errorMessage,
  providerResponse,
  callback
) => {

  const sql = `
    UPDATE communication_deliveries
    SET
      status = 'FAILED',
      failed_at = NOW(),
      error_code = ?,
      error_message = ?,
      provider_response = ?
    WHERE id = ?
  `;

  db.query(
    sql,
    [
      errorCode || null,
      errorMessage || null,
      providerResponse
        ? JSON.stringify(
            providerResponse
          )
        : null,
      deliveryId,
    ],
    callback
  );

};


// ============================================================
// MARK DELIVERY AS BOUNCED
// ============================================================

const markDeliveryAsBounced = (
  deliveryId,
  errorCode,
  errorMessage,
  providerResponse,
  callback
) => {

  const sql = `
    UPDATE communication_deliveries
    SET
      status = 'BOUNCED',
      failed_at = NOW(),
      error_code = ?,
      error_message = ?,
      provider_response = ?
    WHERE id = ?
  `;

  db.query(
    sql,
    [
      errorCode || null,
      errorMessage || null,
      providerResponse
        ? JSON.stringify(
            providerResponse
          )
        : null,
      deliveryId,
    ],
    callback
  );

};


// ============================================================
// MARK DELIVERY AS CANCELLED
// ============================================================

const markDeliveryAsCancelled = (
  deliveryId,
  callback
) => {

  const sql = `
    UPDATE communication_deliveries
    SET
      status = 'CANCELLED'
    WHERE id = ?
  `;

  db.query(
    sql,
    [deliveryId],
    callback
  );

};


// ============================================================
// GET DELIVERY COUNTS
// ============================================================

const getDeliveryCounts = (
  callback
) => {

  const sql = `
    SELECT
      status,
      COUNT(*) AS count
    FROM communication_deliveries
    GROUP BY
      status
    ORDER BY
      status
  `;

  db.query(
    sql,
    callback
  );

};


// ============================================================
// EXPORTS
// ============================================================

module.exports = {

  createDelivery,

  getDeliveryById,

  getDeliveriesByJobId,

  getLatestDeliveryByJobId,

  markDeliveryAsProcessing,

  markDeliveryAsSent,

  markDeliveryAsDelivered,

  markDeliveryAsFailed,

  markDeliveryAsBounced,

  markDeliveryAsCancelled,

  getDeliveryCounts,

};