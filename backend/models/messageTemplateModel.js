const db = require("../database/db");

// ============================================================
// MESSAGE TEMPLATE MODEL
// ============================================================
//
// Database-driven communication templates.
//
// Supported channels currently:
// EMAIL
// WHATSAPP
//
// Templates are identified by template_key and can be activated
// or deactivated without changing application code.
//
// ============================================================


// ============================================================
// GET ACTIVE TEMPLATE BY KEY
// ============================================================

const getActiveTemplateByKey = (
  templateKey,
  callback
) => {

  const sql = `
    SELECT
      id,
      template_key,
      name,
      channel,
      category,
      subject_template,
      body_template,
      variables_json,
      version,
      is_active,
      created_by,
      created_at,
      updated_at
    FROM message_templates
    WHERE template_key = ?
      AND is_active = 1
    ORDER BY version DESC
    LIMIT 1
  `;

  db.query(
    sql,
    [templateKey],
    callback
  );

};


// ============================================================
// GET TEMPLATE BY ID
// ============================================================

const getTemplateById = (
  templateId,
  callback
) => {

  const sql = `
    SELECT
      id,
      template_key,
      name,
      channel,
      category,
      subject_template,
      body_template,
      variables_json,
      version,
      is_active,
      created_by,
      created_at,
      updated_at
    FROM message_templates
    WHERE id = ?
    LIMIT 1
  `;

  db.query(
    sql,
    [templateId],
    callback
  );

};


// ============================================================
// GET ACTIVE TEMPLATES
// ============================================================

const getActiveTemplates = (
  channel,
  callback
) => {

  let sql = `
    SELECT
      id,
      template_key,
      name,
      channel,
      category,
      subject_template,
      body_template,
      variables_json,
      version,
      is_active,
      created_by,
      created_at,
      updated_at
    FROM message_templates
    WHERE is_active = 1
  `;

  const params = [];

  if (channel) {

    sql += `
      AND channel = ?
    `;

    params.push(
      channel
    );

  }

  sql += `
    ORDER BY
      channel ASC,
      category ASC,
      template_key ASC,
      version DESC
  `;

  db.query(
    sql,
    params,
    callback
  );

};


// ============================================================
// CREATE TEMPLATE
// ============================================================

const createTemplate = (
  templateData,
  callback
) => {

  const {
    template_key,
    name,
    channel,
    category,
    subject_template,
    body_template,
    variables_json,
    version,
    is_active,
    created_by,
  } = templateData;

  const sql = `
    INSERT INTO message_templates
    (
      template_key,
      name,
      channel,
      category,
      subject_template,
      body_template,
      variables_json,
      version,
      is_active,
      created_by
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      template_key,
      name,
      channel,
      category ||
        "TRANSACTIONAL",
      subject_template ||
        null,
      body_template,
      variables_json
        ? JSON.stringify(
            variables_json
          )
        : null,
      version || 1,
      is_active === undefined
        ? 1
        : is_active,
      created_by ||
        null,
    ],
    callback
  );

};


// ============================================================
// UPDATE TEMPLATE
// ============================================================

const updateTemplate = (
  templateId,
  templateData,
  callback
) => {

  const {
    name,
    channel,
    category,
    subject_template,
    body_template,
    variables_json,
    version,
    is_active,
  } = templateData;

  const sql = `
    UPDATE message_templates
    SET
      name = ?,
      channel = ?,
      category = ?,
      subject_template = ?,
      body_template = ?,
      variables_json = ?,
      version = ?,
      is_active = ?
    WHERE id = ?
  `;

  db.query(
    sql,
    [
      name,
      channel,
      category ||
        "TRANSACTIONAL",
      subject_template ||
        null,
      body_template,
      variables_json
        ? JSON.stringify(
            variables_json
          )
        : null,
      version || 1,
      is_active === undefined
        ? 1
        : is_active,
      templateId,
    ],
    callback
  );

};


// ============================================================
// DEACTIVATE TEMPLATE
// ============================================================

const deactivateTemplate = (
  templateId,
  callback
) => {

  const sql = `
    UPDATE message_templates
    SET
      is_active = 0
    WHERE id = ?
  `;

  db.query(
    sql,
    [templateId],
    callback
  );

};


// ============================================================
// ACTIVATE TEMPLATE
// ============================================================

const activateTemplate = (
  templateId,
  callback
) => {

  const sql = `
    UPDATE message_templates
    SET
      is_active = 1
    WHERE id = ?
  `;

  db.query(
    sql,
    [templateId],
    callback
  );

};


// ============================================================
// CHECK TEMPLATE KEY + VERSION
// ============================================================

const templateVersionExists = (
  templateKey,
  version,
  callback
) => {

  const sql = `
    SELECT
      id
    FROM message_templates
    WHERE template_key = ?
      AND version = ?
    LIMIT 1
  `;

  db.query(
    sql,
    [
      templateKey,
      version,
    ],
    callback
  );

};


// ============================================================
// EXPORTS
// ============================================================

module.exports = {

  getActiveTemplateByKey,

  getTemplateById,

  getActiveTemplates,

  createTemplate,

  updateTemplate,

  deactivateTemplate,

  activateTemplate,

  templateVersionExists,

};