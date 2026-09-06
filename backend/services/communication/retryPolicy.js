// ============================================================
// DATALATTICE COMMUNICATION RETRY POLICY
// ============================================================
//
// Centralized retry policy for communication jobs.
//
// Retry delays use exponential backoff:
//
// Attempt 1 → 1 minute
// Attempt 2 → 5 minutes
// Attempt 3 → 15 minutes
//
// Permanent failures should be marked FAILED by the worker
// instead of being retried indefinitely.
//
// ============================================================


// ============================================================
// DEFAULT RETRY DELAYS
// ============================================================

const DEFAULT_RETRY_DELAYS = [
  60,
  300,
  900,
];


// ============================================================
// GET RETRY DELAY
// ============================================================

const getRetryDelaySeconds = (
  attemptNumber,
  retryDelays =
    DEFAULT_RETRY_DELAYS
) => {

  const attempt =
    Number(
      attemptNumber
    );

  if (
    !Number.isInteger(
      attempt
    ) ||
    attempt < 1
  ) {
    return null;
  }

  if (
    !Array.isArray(
      retryDelays
    ) ||
    retryDelays.length === 0
  ) {
    return null;
  }

  const index =
    Math.min(
      attempt - 1,
      retryDelays.length - 1
    );

  return Number(
    retryDelays[index]
  );

};


// ============================================================
// CALCULATE NEXT ATTEMPT
// ============================================================

const calculateNextAttemptAt = (
  attemptNumber,
  retryDelays =
    DEFAULT_RETRY_DELAYS
) => {

  const delaySeconds =
    getRetryDelaySeconds(
      attemptNumber,
      retryDelays
    );

  if (
    delaySeconds === null
  ) {
    return null;
  }

  const nextAttempt =
    new Date(
      Date.now() +
      delaySeconds * 1000
    );

  return nextAttempt;

};


// ============================================================
// SHOULD RETRY
// ============================================================

const shouldRetry = ({
  attemptCount,
  maxAttempts,
  permanentFailure = false,
}) => {

  if (
    permanentFailure
  ) {
    return false;
  }

  const attempts =
    Number(
      attemptCount
    );

  const maximum =
    Number(
      maxAttempts
    );

  if (
    !Number.isFinite(
      attempts
    ) ||
    !Number.isFinite(
      maximum
    )
  ) {
    return false;
  }

  return (
    attempts < maximum
  );

};


// ============================================================
// CLASSIFY PROVIDER ERROR
// ============================================================
//
// Providers may return errors that should never be retried,
// such as invalid recipient addresses or invalid credentials.
//
// This function provides conservative defaults. Provider-specific
// error classification can be extended later.
//
// ============================================================

const classifyError = (
  error
) => {

  if (!error) {

    return {
      permanent: false,
      reason: null,
    };

  }

  const message =
    String(
      error.message || ""
    ).toLowerCase();

  const status =
    Number(
      error.response &&
      error.response.status
    );

  const permanentStatusCodes = [
    400,
    401,
    403,
    404,
    422,
  ];

  if (
    permanentStatusCodes.includes(
      status
    )
  ) {

    return {
      permanent: true,
      reason:
        "Provider returned a permanent HTTP error",
    };

  }

  const permanentPatterns = [
    "invalid recipient",
    "invalid email",
    "invalid phone",
    "recipient not found",
    "unauthorized",
    "authentication failed",
    "invalid access token",
    "not configured",
  ];

  const isPermanent =
    permanentPatterns.some(
      (
        pattern
      ) =>
        message.includes(
          pattern
        )
    );

  return {

    permanent:
      isPermanent,

    reason:
      isPermanent
        ? "Provider error classified as permanent"
        : null,

  };

};


// ============================================================
// EXPORTS
// ============================================================

module.exports = {

  DEFAULT_RETRY_DELAYS,

  getRetryDelaySeconds,

  calculateNextAttemptAt,

  shouldRetry,

  classifyError,

};