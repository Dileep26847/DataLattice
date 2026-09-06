const {
  pool: db,
} = require("./communicationDb");

// ============================================================
// MESSAGE TEMPLATE MODEL
// ============================================================
//
// Stores reusable communication templates.
//
// Responsibilities:
//
// 1. Retrieve active templates.
// 2. Retrieve templates by ID/key.
// 3. Create templates.
// 4. Update templates.
// 5. Activate/deactivate templates.
// 6. Check template-version uniqueness.
//
// Templates are intentionally database-driven so communication
// content can be changed without changing business logic.
//
// ============================================================

const messageTemplateModel = {

  // ==========================================================
  // GET ACTIVE TEMPLATE BY KEY
  // ==========================================================

  getActiveTemplateByKey(
    templateKey,
    callback
  ) {

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
      WHERE
        template_key = ?
        AND is_active = 1
      ORDER BY
        version DESC,
        id DESC
      LIMIT 1
    `;

    db.query(
      sql,
      [templateKey],
      callback
    );
  },

  // ==========================================================
  // GET TEMPLATE BY ID
  // ==========================================================

  getTemplateById(
    templateId,
    callback
  ) {

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
  },

  // ==========================================================
  // GET ALL ACTIVE TEMPLATES
  // ==========================================================

  getActiveTemplates(
    callback
  ) {

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
      WHERE is_active = 1
      ORDER BY
        template_key ASC,
        version DESC,
        id DESC
    `;

    db.query(
      sql,
      callback
    );
  },

  // ==========================================================
  // CREATE TEMPLATE
  // ==========================================================

  createTemplate(
    data,
    callback
  ) {

    const sql = `
      INSERT INTO message_templates (
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

    const variablesJson =
      data.variables_json !==
      undefined &&
      data.variables_json !==
      null
        ? JSON.stringify(
            data.variables_json
          )
        : null;

    const values = [
      data.template_key,
      data.name,
      data.channel,
      data.category,
      data.subject_template ||
        null,
      data.body_template ||
        "",
      variablesJson,
      Number(
        data.version
      ) || 1,
      data.is_active === false
        ? 0
        : 1,
      data.created_by ||
        null,
    ];

    db.query(
      sql,
      values,
      callback
    );
  },

  // ==========================================================
  // UPDATE TEMPLATE
  // ==========================================================

  updateTemplate(
    templateId,
    data,
    callback
  ) {

    const sql = `
      UPDATE message_templates
      SET
        template_key = ?,
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

    const variablesJson =
      data.variables_json !==
      undefined &&
      data.variables_json !==
      null
        ? JSON.stringify(
            data.variables_json
          )
        : null;

    const values = [
      data.template_key,
      data.name,
      data.channel,
      data.category,
      data.subject_template ||
        null,
      data.body_template ||
        "",
      variablesJson,
      Number(
        data.version
      ) || 1,
      data.is_active === false
        ? 0
        : 1,
      templateId,
    ];

    db.query(
      sql,
      values,
      callback
    );
  },

  // ==========================================================
  // DEACTIVATE TEMPLATE
  // ==========================================================

  deactivateTemplate(
    templateId,
    callback
  ) {

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
  },

  // ==========================================================
  // ACTIVATE TEMPLATE
  // ==========================================================

  activateTemplate(
    templateId,
    callback
  ) {

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
  },

  // ==========================================================
  // CHECK TEMPLATE VERSION EXISTS
  // ==========================================================

  templateVersionExists(
    templateKey,
    version,
    excludeTemplateId,
    callback
  ) {

    let sql = `
      SELECT
        id
      FROM message_templates
      WHERE
        template_key = ?
        AND version = ?
    `;

    const params = [
      templateKey,
      Number(
        version
      ) || 1,
    ];

    if (
      excludeTemplateId
    ) {

      sql += `
        AND id <> ?
      `;

      params.push(
        excludeTemplateId
      );

    }

    sql += `
      LIMIT 1
    `;

    db.query(
      sql,
      params,
      (
        error,
        rows
      ) => {

        if (
          error
        ) {

          return callback(
            error
          );

        }

        callback(
          null,
          rows.length > 0
        );

      }
    );
  },

};

// ============================================================
// EXPORT
// ============================================================

module.exports =
  messageTemplateModel;