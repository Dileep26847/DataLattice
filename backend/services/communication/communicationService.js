const messageTemplateModel =
  require("../../models/messageTemplateModel");

const {
  renderMessageTemplate,
  validateTemplateVariables,
} =
  require("./templateRenderer");

const {
  getProvider,
} =
  require("./providers");

// ============================================================
// DATALATTICE COMMUNICATION SERVICE
// ============================================================
//
// Central communication service.
//
// Responsibilities:
//
// 1. Load active database template.
// 2. Validate template variables.
// 3. Render subject/body.
// 4. Select channel provider.
// 5. Send the communication.
// 6. Return provider result.
//
// This service does NOT implement:
//
// - Scheduling
// - Queues
// - Retries
// - Automation rules
// - Recipient discovery
//
// Those responsibilities will be implemented separately.
//
// ============================================================


// ============================================================
// GET TEMPLATE
// ============================================================

const getTemplate = (
  templateKey
) => {

  return new Promise(
    (
      resolve,
      reject
    ) => {

      messageTemplateModel
        .getActiveTemplateByKey(
          templateKey,
          (
            error,
            rows
          ) => {

            if (error) {
              reject(error);
              return;
            }

            if (
              !rows ||
              rows.length === 0
            ) {

              reject(
                new Error(
                  `Active communication template not found: ${templateKey}`
                )
              );

              return;

            }

            resolve(
              rows[0]
            );

          }
        );

    }
  );

};


// ============================================================
// SEND EMAIL
// ============================================================

const sendEmail = async ({
  templateKey,
  to,
  variables = {},
  replyTo,
}) => {

  if (!templateKey) {
    throw new Error(
      "templateKey is required"
    );
  }

  if (!to) {
    throw new Error(
      "Email recipient is required"
    );
  }

  const template =
    await getTemplate(
      templateKey
    );

  if (
    String(
      template.channel
    ).toUpperCase() !==
    "EMAIL"
  ) {

    throw new Error(
      `Template ${templateKey} is not configured for EMAIL`
    );

  }

  const validation =
    validateTemplateVariables(
      template.body_template,
      variables
    );

  if (!validation.valid) {

    throw new Error(
      `Missing template variables: ${validation.missingVariables.join(", ")}`
    );

  }

  const rendered =
    renderMessageTemplate({
      subjectTemplate:
        template.subject_template,

      bodyTemplate:
        template.body_template,

      variables,
    });

  const provider =
    getProvider(
      "EMAIL"
    );

  const result =
    await provider.send({

      to,

      subject:
        rendered.subject,

      text:
        rendered.body,

      html:
        rendered.body,

      replyTo,

    });

  return {

    templateId:
      template.id,

    templateKey:
      template.template_key,

    channel:
      "EMAIL",

    recipient:
      to,

    subject:
      rendered.subject,

    body:
      rendered.body,

    provider:
      result,

  };

};


// ============================================================
// SEND WHATSAPP
// ============================================================

const sendWhatsApp = async ({
  templateKey,
  to,
  variables = {},
}) => {

  if (!templateKey) {
    throw new Error(
      "templateKey is required"
    );
  }

  if (!to) {
    throw new Error(
      "WhatsApp recipient is required"
    );
  }

  const template =
    await getTemplate(
      templateKey
    );

  if (
    String(
      template.channel
    ).toUpperCase() !==
    "WHATSAPP"
  ) {

    throw new Error(
      `Template ${templateKey} is not configured for WHATSAPP`
    );

  }

  const validation =
    validateTemplateVariables(
      template.body_template,
      variables
    );

  if (!validation.valid) {

    throw new Error(
      `Missing template variables: ${validation.missingVariables.join(", ")}`
    );

  }

  const rendered =
    renderMessageTemplate({
      subjectTemplate:
        null,

      bodyTemplate:
        template.body_template,

      variables,
    });

  const provider =
    getProvider(
      "WHATSAPP"
    );

  const result =
    await provider.send({

      to,

      text:
        rendered.body,

    });

  return {

    templateId:
      template.id,

    templateKey:
      template.template_key,

    channel:
      "WHATSAPP",

    recipient:
      to,

    body:
      rendered.body,

    provider:
      result,

  };

};


// ============================================================
// SEND BY CHANNEL
// ============================================================

const send = async ({
  channel,
  templateKey,
  to,
  variables = {},
  replyTo,
}) => {

  const normalizedChannel =
    String(
      channel || ""
    )
      .trim()
      .toUpperCase();

  switch (
    normalizedChannel
  ) {

    case "EMAIL":

      return sendEmail({
        templateKey,
        to,
        variables,
        replyTo,
      });

    case "WHATSAPP":

      return sendWhatsApp({
        templateKey,
        to,
        variables,
      });

    default:

      throw new Error(
        `Unsupported communication channel: ${normalizedChannel}`
      );

  }

};


// ============================================================
// EXPORTS
// ============================================================

module.exports = {

  getTemplate,

  sendEmail,

  sendWhatsApp,

  send,

};