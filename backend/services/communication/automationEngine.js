const crypto = require("crypto");

const automationRuleModel = require("../../models/automationRuleModel");
const automationEventModel = require("./automationEventModel");
const automationRunModel = require("./automationRunModel");
const messageTemplateModel = require("./messageTemplateModel");
const communicationJobModel = require("./communicationJobModel");
const recipientResolver = require("./recipientResolver");
const templateRenderer = require("./templateRenderer");

// ============================================================
// AUTOMATION ENGINE
// ============================================================
//
// Responsibilities:
//
// 1. Accept durable automation events.
// 2. Find matching enabled automation rules.
// 3. Evaluate rule conditions.
// 4. Create an automation run.
// 5. Resolve recipients.
// 6. Load and render communication templates.
// 7. Create communication jobs.
// 8. Keep communication sending asynchronous.
//
// Business services should emit events.
// They should NOT directly send email/WhatsApp messages.
//
// ============================================================

// ============================================================
// CALLBACK -> PROMISE HELPER
// ============================================================

function callbackToPromise(
  executor
) {

  return new Promise(
    (
      resolve,
      reject
    ) => {

      executor(
        (
          error,
          result
        ) => {

          if (error) {
            return reject(
              error
            );
          }

          resolve(
            result
          );
        }
      );

    }
  );
}

// ============================================================
// SAFE JSON PARSER
// ============================================================

function parseJson(
  value,
  fallback
) {

  if (
    value === null ||
    value === undefined
  ) {

    return fallback;

  }

  if (
    typeof value === "object"
  ) {

    return value;

  }

  if (
    typeof value !== "string"
  ) {

    return fallback;

  }

  try {

    return JSON.parse(
      value
    );

  } catch (
    error
  ) {

    return fallback;

  }

}

// ============================================================
// NORMALIZE EVENT
// ============================================================

function normalizeEvent(
  event
) {

  if (
    !event ||
    typeof event !== "object"
  ) {

    throw new Error(
      "Automation event is required"
    );

  }

  const normalizedEvent = {
    ...event,
  };

  normalizedEvent.event_type =
    normalizedEvent.event_type ||
    normalizedEvent.eventName ||
    normalizedEvent.type ||
    null;

  normalizedEvent.event_key =
    normalizedEvent.event_key ||
    normalizedEvent.eventKey ||
    null;

  normalizedEvent.payload_json =
    parseJson(
      normalizedEvent.payload_json,
      {}
    );

  return normalizedEvent;

}

// ============================================================
// GET EVENT PAYLOAD
// ============================================================

function getEventPayload(
  event
) {

  return parseJson(
    event.payload_json,
    {}
  );

}

// ============================================================
// GET NESTED VALUE
// ============================================================

function getNestedValue(
  object,
  path
) {

  if (
    !object ||
    !path
  ) {

    return undefined;

  }

  const parts =
    String(path)
      .split(".")
      .filter(
        Boolean
      );

  let current =
    object;

  for (
    const part of parts
  ) {

    if (
      current === null ||
      current === undefined
    ) {

      return undefined;

    }

    current =
      current[part];

  }

  return current;

}

// ============================================================
// CONDITION EVALUATION
// ============================================================

function evaluateConditions(
  conditions,
  event
) {

  const normalizedConditions =
    parseJson(
      conditions,
      {}
    );

  if (
    !normalizedConditions ||
    Object.keys(
      normalizedConditions
    ).length === 0
  ) {

    return true;

  }

  const payload =
    getEventPayload(
      event
    );

  // ----------------------------------------------------------
  // EQUALS
  // ----------------------------------------------------------

  if (
    normalizedConditions.equals
  ) {

    const equals =
      normalizedConditions.equals;

    for (
      const [
        field,
        expectedValue
      ] of Object.entries(
        equals
      )
    ) {

      const actualValue =
        getNestedValue(
          payload,
          field
        );

      if (
        String(actualValue) !==
        String(expectedValue)
      ) {

        return false;

      }

    }

  }

  // ----------------------------------------------------------
  // NOT EQUALS
  // ----------------------------------------------------------

  if (
    normalizedConditions.not_equals
  ) {

    const notEquals =
      normalizedConditions.not_equals;

    for (
      const [
        field,
        expectedValue
      ] of Object.entries(
        notEquals
      )
    ) {

      const actualValue =
        getNestedValue(
          payload,
          field
        );

      if (
        String(actualValue) ===
        String(expectedValue)
      ) {

        return false;

      }

    }

  }

  // ----------------------------------------------------------
  // IN
  // ----------------------------------------------------------

  if (
    normalizedConditions.in
  ) {

    const inConditions =
      normalizedConditions.in;

    for (
      const [
        field,
        expectedValues
      ] of Object.entries(
        inConditions
      )
    ) {

      const actualValue =
        getNestedValue(
          payload,
          field
        );

      const values =
        Array.isArray(
          expectedValues
        )
          ? expectedValues
          : [expectedValues];

      const matched =
        values.some(
          (
            expectedValue
          ) =>
            String(actualValue) ===
            String(expectedValue)
        );

      if (
        !matched
      ) {

        return false;

      }

    }

  }

  return true;

}

// ============================================================
// GET RULE CHANNELS
// ============================================================

function getRuleChannels(
  rule
) {

  const channels =
    parseJson(
      rule.channels_json,
      []
    );

  if (
    Array.isArray(
      channels
    )
  ) {

    return channels
      .map(
        channel =>
          String(
            channel
          ).trim().toUpperCase()
      )
      .filter(
        Boolean
      );

  }

  if (
    channels &&
    typeof channels === "object"
  ) {

    return Object.keys(
      channels
    )
      .map(
        channel =>
          String(
            channel
          ).trim().toUpperCase()
      )
      .filter(
        Boolean
      );

  }

  if (
    typeof channels === "string"
  ) {

    return channels
      .split(",")
      .map(
        channel =>
          String(
            channel
          ).trim().toUpperCase()
      )
      .filter(
        Boolean
      );

  }

  return [];

}

// ============================================================
// GET MAX ATTEMPTS
// ============================================================

function getMaxAttempts(
  rule
) {

  const retryPolicy =
    parseJson(
      rule.retry_policy_json,
      {}
    );

  const maxAttempts =
    Number(
      retryPolicy.max_attempts
    );

  if (
    Number.isInteger(
      maxAttempts
    ) &&
    maxAttempts > 0
  ) {

    return maxAttempts;

  }

  return 3;

}

// ============================================================
// CREATE RUN KEY
// ============================================================

function createRunKey(
  rule,
  event
) {

  return [
    "AUTOMATION_RUN",
    rule.id,
    event.id ||
      "NO_EVENT_ID",
    event.event_key ||
      event.id ||
      Date.now(),
  ].join(
    ":"
  );

}

// ============================================================
// CREATE JOB IDEMPOTENCY KEY
// ============================================================

function createJobIdempotencyKey(
  rule,
  event,
  recipient,
  channel
) {

  const rawKey = [
    "COMMUNICATION_JOB",
    rule.id,
    event.id ||
      "NO_EVENT_ID",
    recipient.user_id ||
      recipient.id ||
      recipient.recipient_user_id ||
      recipient.recipient_address ||
      "NO_RECIPIENT",
    channel,
  ].join(
    ":"
  );

  return crypto
    .createHash(
      "sha256"
    )
    .update(
      rawKey
    )
    .digest(
      "hex"
    );

}

// ============================================================
// DUPLICATE ERROR DETECTION
// ============================================================

function isDuplicateError(
  error
) {

  if (
    !error
  ) {

    return false;

  }

  return (
    error.code ===
      "ER_DUP_ENTRY" ||
    error.errno ===
      1062
  );

}

// ============================================================
// EMIT EVENT
// ============================================================

async function emitEvent(
  data
) {

  if (
    !data ||
    typeof data !== "object"
  ) {

    throw new Error(
      "Automation event data is required"
    );

  }

  if (
    !data.event_key
  ) {

    throw new Error(
      "Automation event_key is required"
    );

  }

  if (
    !data.event_type
  ) {

    throw new Error(
      "Automation event_type is required"
    );

  }

  const event = {
    event_key:
      data.event_key,

    event_type:
      data.event_type,

    aggregate_type:
      data.aggregate_type ||
      null,

    aggregate_id:
      data.aggregate_id ||
      null,

    payload_json:
      data.payload_json ||
      {},
  };

  try {

    const result =
      await callbackToPromise(
        callback =>
          automationEventModel.createEvent(
            event,
            callback
          )
      );

    console.log(
      "[AutomationEngine] Event created:",
      event.event_key
    );

    return {
      success: true,
      duplicate: false,
      result,
    };

  } catch (
    error
  ) {

    if (
      isDuplicateError(
        error
      )
    ) {

      console.log(
        "[AutomationEngine] Duplicate event ignored:",
        event.event_key
      );

      return {
        success: true,
        duplicate: true,
      };

    }

    console.error(
      "[AutomationEngine] Failed to create event:",
      error
    );

    throw error;

  }

}

// ============================================================
// PROCESS NEXT EVENT
// ============================================================

async function processNextEvent() {

  let event;

  try {

    event =
      await callbackToPromise(
        callback =>
          automationEventModel.claimNextEvent(
            callback
          )
      );

  } catch (
    error
  ) {

    console.error(
      "[AutomationEngine] Failed to claim next event:",
      error
    );

    throw error;

  }

  if (
    !event
  ) {

    return {
      processed: false,
      reason: "NO_EVENT",
    };

  }

  console.log(
    "[AutomationEngine] Processing event:",
    {
      id:
        event.id,

      event_key:
        event.event_key,

      event_type:
        event.event_type,
    }
  );

  try {

    const result =
      await processEvent(
        event
      );

    await callbackToPromise(
      callback =>
        automationEventModel.markEventAsProcessed(
          event.id,
          callback
        )
    );

    console.log(
      "[AutomationEngine] Event processed:",
      {
        id:
          event.id,

        event_key:
          event.event_key,

        result,
      }
    );

    return {
      processed: true,
      event,
      result,
    };

  } catch (
    error
  ) {

    console.error(
      "[AutomationEngine] Event processing failed:",
      {
        eventId:
          event.id,

        eventKey:
          event.event_key,

        error:
          error.message,
      }
    );

    try {

      await callbackToPromise(
        callback =>
          automationEventModel.markEventAsFailed(
            event.id,
            error.message,
            callback
          )
      );

    } catch (
      markError
    ) {

      console.error(
        "[AutomationEngine] Failed to mark event as failed:",
        markError
      );

    }

    throw error;

  }

}

// ============================================================
// PROCESS EVENT
// ============================================================

async function processEvent(
  event,
  callback
) {

  const promise =
    processEventInternal(
      event
    );

  if (
    typeof callback ===
    "function"
  ) {

    promise
      .then(
        result =>
          callback(
            null,
            result
          )
      )
      .catch(
        error =>
          callback(
            error
          )
      );

    return;

  }

  return promise;

}

// ============================================================
// PROCESS EVENT INTERNAL
// ============================================================

async function processEventInternal(
  rawEvent
) {

  const event =
    normalizeEvent(
      rawEvent
    );

  if (
    !event.event_type
  ) {

    throw new Error(
      "Automation event_type is required"
    );

  }

  console.log(
    "[AutomationEngine] Looking for active rules:",
    event.event_type
  );

  const rules =
    await callbackToPromise(
      callback =>
        automationRuleModel.getActiveRulesByEventType(
          event.event_type,
          callback
        )
    );

  console.log(
    "[AutomationEngine] Matching active rules:",
    {
      eventType:
        event.event_type,

      count:
        Array.isArray(
          rules
        )
          ? rules.length
          : 0,
    }
  );

  if (
    !Array.isArray(
      rules
    ) ||
    rules.length === 0
  ) {

    console.warn(
      "[AutomationEngine] No active automation rules found:",
      event.event_type
    );

    return {
      success: true,
      event_id:
        event.id,

      event_type:
        event.event_type,

      matched_rules: 0,
      executed_rules: 0,
      created_jobs: 0,
    };

  }

  let executedRules = 0;
  let createdJobs = 0;
  let skippedRules = 0;

  for (
    const rule of rules
  ) {

    console.log(
      "[AutomationEngine] Evaluating rule:",
      {
        id:
          rule.id,

        automation_key:
          rule.automation_key,

        event_name:
          rule.event_name,

        template_key:
          rule.template_key,

        recipient_type:
          rule.recipient_type,

        enabled:
          rule.enabled,
      }
    );

    const matches =
      evaluateConditions(
        rule.conditions_json,
        event
      );

    if (
      !matches
    ) {

      skippedRules += 1;

      console.log(
        "[AutomationEngine] Rule skipped because conditions did not match:",
        rule.automation_key
      );

      continue;

    }

    const ruleResult =
      await executeRule(
        rule,
        event
      );

    executedRules += 1;

    createdJobs +=
      Number(
        ruleResult.created_jobs ||
        0
      );

  }

  return {
    success: true,

    event_id:
      event.id,

    event_type:
      event.event_type,

    matched_rules:
      rules.length,

    executed_rules:
      executedRules,

    skipped_rules:
      skippedRules,

    created_jobs:
      createdJobs,
  };

}

// ============================================================
// EXECUTE RULE
// ============================================================

async function executeRule(
  rule,
  event
) {

  const runKey =
    createRunKey(
      rule,
      event
    );

  console.log(
    "[AutomationEngine] Executing rule:",
    {
      ruleId:
        rule.id,

      automationKey:
        rule.automation_key,

      runKey,
    }
  );

  // ----------------------------------------------------------
  // CREATE AUTOMATION RUN
  // ----------------------------------------------------------

  let run;

  try {

    run =
      await callbackToPromise(
        callback =>
          automationRunModel.createRun(
            {
              automation_rule_id:
                rule.id,

              event_id:
                event.id ||
                null,

              run_key:
                runKey,

              status:
                "QUEUED",

              scheduled_at:
                new Date(),
            },
            callback
          )
      );

  } catch (
    error
  ) {

    if (
      isDuplicateError(
        error
      )
    ) {

      console.warn(
        "[AutomationEngine] Duplicate automation run ignored:",
        runKey
      );

      return {
        success: true,
        duplicate: true,
        created_jobs: 0,
      };

    }

    console.error(
      "[AutomationEngine] Failed to create automation run:",
      {
        ruleId:
          rule.id,

        eventId:
          event.id,

        error:
          error.message,
      }
    );

    throw error;

  }

  const runId =
    run && run.insertId
      ? run.insertId
      : run && run.id
        ? run.id
        : null;

  console.log(
    "[AutomationEngine] Automation run created:",
    {
      runId,
      ruleId:
        rule.id,
      eventId:
        event.id,
    }
  );

  // ----------------------------------------------------------
  // MARK RUN AS STARTED
  // ----------------------------------------------------------

  if (
    runId
  ) {

    try {

      await callbackToPromise(
        callback =>
          automationRunModel.markRunAsStarted(
            runId,
            callback
          )
      );

    } catch (
      error
    ) {

      console.error(
        "[AutomationEngine] Failed to mark run as started:",
        error
      );

      throw error;

    }

  }

  // ----------------------------------------------------------
  // LOAD TEMPLATE
  // ----------------------------------------------------------

  if (
    !rule.template_key
  ) {

    const error =
      new Error(
        `Automation rule ${rule.automation_key} has no template_key`
      );

    if (
      runId
    ) {

      await safelyMarkRunFailed(
        runId,
        error.message
      );

    }

    throw error;

  }

  const template =
    await callbackToPromise(
      callback =>
        messageTemplateModel.getActiveTemplateByKey(
          rule.template_key,
          callback
        )
    );

  if (
    !template
  ) {

    const error =
      new Error(
        `Active message template not found: ${rule.template_key}`
      );

    if (
      runId
    ) {

      await safelyMarkRunFailed(
        runId,
        error.message
      );

    }

    throw error;

  }

  console.log(
    "[AutomationEngine] Template loaded:",
    {
      templateId:
        template.id,

      templateKey:
        template.template_key,

      channel:
        template.channel,
    }
  );

  // ----------------------------------------------------------
  // RESOLVE RECIPIENTS
  // ----------------------------------------------------------

  const recipients =
    await recipientResolver.resolveRecipientsFromEvent(
      event,
      rule
    );

  const normalizedRecipients =
    Array.isArray(
      recipients
    )
      ? recipients
      : [];

  console.log(
    "[AutomationEngine] Recipients resolved:",
    {
      rule:
        rule.automation_key,

      count:
        normalizedRecipients.length,
    }
  );

  // ----------------------------------------------------------
  // CHANNELS
  // ----------------------------------------------------------

  const ruleChannels =
    getRuleChannels(
      rule
    );

  console.log(
    "[AutomationEngine] Rule channels:",
    ruleChannels
  );

  // ----------------------------------------------------------
  // CREATE COMMUNICATION JOBS
  // ----------------------------------------------------------

  let queuedJobs = 0;
  let skippedJobs = 0;

  for (
    const recipient of normalizedRecipients
  ) {

    const recipientChannels =
      getRecipientChannels(
        recipient
      );

    const channels =
      ruleChannels.length > 0
        ? ruleChannels
            .filter(
              channel =>
                recipientChannels.length === 0 ||
                recipientChannels.includes(
                  channel
                )
            )
        : recipientChannels;

    for (
      const channel of channels
    ) {

      try {

        const jobResult =
          await createCommunicationJob(
            rule,
            event,
            template,
            recipient,
            channel,
            runId
          );

        if (
          jobResult.duplicate
        ) {

          skippedJobs += 1;

        } else {

          queuedJobs += 1;

        }

      } catch (
        error
      ) {

        console.error(
          "[AutomationEngine] Failed to create communication job:",
          {
            rule:
              rule.automation_key,

            recipient:
              recipient.user_id ||
              recipient.id ||
              recipient.email ||
              recipient.phone,

            channel,

            error:
              error.message,
          }
        );

        if (
          runId
        ) {

          await safelyMarkRunFailed(
            runId,
            error.message
          );

        }

        throw error;

      }

    }

  }

  // ----------------------------------------------------------
  // COMPLETE RUN
  // ----------------------------------------------------------

  if (
    runId
  ) {

    try {

      await callbackToPromise(
        callback =>
          automationRunModel.updateRunCounters(
            runId,
            {
              total_jobs:
                queuedJobs +
                skippedJobs,

              queued_jobs:
                queuedJobs,

              successful_jobs:
                0,

              skipped_jobs:
                skippedJobs,
            },
            callback
          )
      );

      await callbackToPromise(
        callback =>
          automationRunModel.markRunAsCompleted(
            runId,
            callback
          )
      );

    } catch (
      error
    ) {

      console.error(
        "[AutomationEngine] Failed to complete automation run:",
        error
      );

      throw error;

    }

  }

  console.log(
    "[AutomationEngine] Rule execution completed:",
    {
      rule:
        rule.automation_key,

      runId,

      queuedJobs,

      skippedJobs,
    }
  );

  return {
    success: true,

    run_id:
      runId,

    created_jobs:
      queuedJobs,

    skipped_jobs:
      skippedJobs,
  };

}

// ============================================================
// GET RECIPIENT CHANNELS
// ============================================================

function getRecipientChannels(
  recipient
) {

  if (
    !recipient ||
    typeof recipient !== "object"
  ) {

    return [];

  }

  if (
    Array.isArray(
      recipient.channels
    )
  ) {

    return recipient.channels
      .map(
        channel =>
          String(
            channel
          ).trim().toUpperCase()
      )
      .filter(
        Boolean
      );

  }

  const channels = [];

  if (
    recipient.email ||
    recipient.email_address
  ) {

    channels.push(
      "EMAIL"
    );

  }

  if (
    recipient.phone ||
    recipient.whatsapp ||
    recipient.whatsapp_number ||
    recipient.phone_number
  ) {

    channels.push(
      "WHATSAPP"
    );

  }

  return channels;

}

// ============================================================
// CREATE COMMUNICATION JOB
// ============================================================

async function createCommunicationJob(
  rule,
  event,
  template,
  recipient,
  channel,
  runId
) {

  const normalizedChannel =
    String(
      channel
    )
      .trim()
      .toUpperCase();

  // ----------------------------------------------------------
  // RENDER TEMPLATE
  // ----------------------------------------------------------

  const payload =
    getEventPayload(
      event
    );

  const templateVariables = {
    ...payload,

    recipient:
      recipient || {},

    student:
      recipient || {},

    user:
      recipient || {},

    event:
      payload || {},
  };

  const subjectTemplate =
    template.subject_template ||
    "";

  const bodyTemplate =
    template.body_template ||
    "";

  let renderedSubject =
    subjectTemplate;

  let renderedBody =
    bodyTemplate;

  if (
    templateRenderer &&
    typeof templateRenderer.renderTemplate ===
      "function"
  ) {

    renderedSubject =
      templateRenderer.renderTemplate(
        subjectTemplate,
        templateVariables
      );

    renderedBody =
      templateRenderer.renderTemplate(
        bodyTemplate,
        templateVariables
      );

  } else if (
    templateRenderer &&
    typeof templateRenderer.renderMessageTemplate ===
      "function"
  ) {

    const rendered =
      templateRenderer.renderMessageTemplate(
        template,
        templateVariables
      );

    renderedSubject =
      rendered.subject ||
      "";

    renderedBody =
      rendered.body ||
      "";

  } else {

    renderedSubject =
      renderFallbackTemplate(
        subjectTemplate,
        templateVariables
      );

    renderedBody =
      renderFallbackTemplate(
        bodyTemplate,
        templateVariables
      );

  }

  // ----------------------------------------------------------
  // VALIDATE TEMPLATE VARIABLES
  // ----------------------------------------------------------

  if (
    templateRenderer &&
    typeof templateRenderer.validateTemplateVariables ===
      "function"
  ) {

    const validation =
      templateRenderer.validateTemplateVariables(
        template,
        templateVariables
      );

    if (
      validation === false
    ) {

      throw new Error(
        `Template variable validation failed: ${template.template_key}`
      );

    }

    if (
      validation &&
      validation.valid === false
    ) {

      throw new Error(
        validation.error ||
        `Template variable validation failed: ${template.template_key}`
      );

    }

  }

  // ----------------------------------------------------------
  // RESOLVE ADDRESS
  // ----------------------------------------------------------

  const recipientAddress =
    resolveRecipientAddress(
      recipient,
      normalizedChannel
    );

  if (
    !recipientAddress
  ) {

    console.warn(
      "[AutomationEngine] Recipient has no address for channel:",
      {
        userId:
          recipient.user_id ||
          recipient.id,

        channel:
          normalizedChannel,
      }
    );

    return {
      success: true,
      skipped: true,
      reason: "NO_RECIPIENT_ADDRESS",
    };

  }

  // ----------------------------------------------------------
  // IDEMPOTENCY
  // ----------------------------------------------------------

  const idempotencyKey =
    createJobIdempotencyKey(
      rule,
      event,
      recipient,
      normalizedChannel
    );

  // ----------------------------------------------------------
  // JOB DATA
  // ----------------------------------------------------------

  const maxAttempts =
    getMaxAttempts(
      rule
    );

  const jobData = {

    automation_run_id:
      runId ||
      null,

    automation_rule_id:
      rule.id,

    template_id:
      template.id,

    channel:
      normalizedChannel,

    recipient_type:
      rule.recipient_type,

    recipient_user_id:
      recipient.user_id ||
      recipient.id ||
      null,

    recipient_address:
      recipientAddress,

    recipient_name:
      recipient.full_name ||
      recipient.name ||
      null,

    subject:
      renderedSubject ||
      null,

    rendered_body:
      renderedBody,

    payload_json:
      {
        event:
          payload,

        recipient:
          recipient,

        template_key:
          template.template_key,
      },

    idempotency_key:
      idempotencyKey,

    status:
      "QUEUED",

    priority:
      5,

    scheduled_at:
      new Date(),

    attempt_count:
      0,

    max_attempts:
      maxAttempts,
  };

  try {

    const result =
      await callbackToPromise(
        callback =>
          communicationJobModel.createJob(
            jobData,
            callback
          )
      );

    console.log(
      "[AutomationEngine] Communication job queued:",
      {
        jobId:
          result &&
          result.insertId
            ? result.insertId
            : result &&
                result.id
              ? result.id
              : null,

        rule:
          rule.automation_key,

        channel:
          normalizedChannel,

        recipientUserId:
          recipient.user_id ||
          recipient.id ||
          null,
      }
    );

    return {
      success: true,
      duplicate: false,
      result,
    };

  } catch (
    error
  ) {

    if (
      isDuplicateError(
        error
      )
    ) {

      console.warn(
        "[AutomationEngine] Duplicate communication job ignored:",
        idempotencyKey
      );

      return {
        success: true,
        duplicate: true,
      };

    }

    throw error;

  }

}

// ============================================================
// RESOLVE RECIPIENT ADDRESS
// ============================================================

function resolveRecipientAddress(
  recipient,
  channel
) {

  if (
    !recipient
  ) {

    return null;

  }

  if (
    channel ===
    "EMAIL"
  ) {

    return (
      recipient.email ||
      recipient.email_address ||
      recipient.recipient_address ||
      null
    );

  }

  if (
    channel ===
    "WHATSAPP"
  ) {

    return (
      recipient.whatsapp ||
      recipient.whatsapp_number ||
      recipient.phone ||
      recipient.phone_number ||
      recipient.recipient_address ||
      null
    );

  }

  return (
    recipient.recipient_address ||
    null
  );

}

// ============================================================
// FALLBACK TEMPLATE RENDERER
// ============================================================

function renderFallbackTemplate(
  template,
  variables
) {

  if (
    template === null ||
    template === undefined
  ) {

    return "";

  }

  return String(
    template
  ).replace(
    /\{\{\s*([^{}]+?)\s*\}\}/g,
    (
      match,
      path
    ) => {

      const value =
        getNestedValue(
          variables,
          String(
            path
          ).trim()
        );

      if (
        value === null ||
        value === undefined
      ) {

        return "";

      }

      return String(
        value
      );

    }
  );

}

// ============================================================
// SAFELY MARK RUN FAILED
// ============================================================

async function safelyMarkRunFailed(
  runId,
  errorMessage
) {

  try {

    await callbackToPromise(
      callback =>
        automationRunModel.markRunAsFailed(
          runId,
          errorMessage,
          callback
        )
    );

  } catch (
    error
  ) {

    console.error(
      "[AutomationEngine] Failed to mark automation run as failed:",
      {
        runId,
        error:
          error.message,
      }
    );

  }

}

// ============================================================
// EXPORT
// ============================================================

module.exports = {

  emitEvent,

  processNextEvent,

  processEvent,

  evaluateConditions,

  getRuleChannels,

  createCommunicationJob,

};