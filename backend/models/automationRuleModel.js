const {
  pool: db,
} = require("../services/communication/communicationDb");

// ============================================================
// AUTOMATION RULE MODEL
// ============================================================

const automationRuleModel = {

  // ==========================================================
  // GET ACTIVE RULES BY EVENT NAME
  // ==========================================================

  getActiveRulesByEventType(
    eventType,
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
        event_name = ?
        AND enabled = 1
      ORDER BY
        id ASC
    `;

    db.query(
      sql,
      [eventType],
      callback
    );
  },

  // ==========================================================
  // GET RULE BY ID
  // ==========================================================

  getRuleById(
    ruleId,
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
      WHERE id = ?
      LIMIT 1
    `;

    db.query(
      sql,
      [ruleId],
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
      WHERE automation_key = ?
      LIMIT 1
    `;

    db.query(
      sql,
      [automationKey],
      callback
    );
  },

  // ==========================================================
  // GET ALL ENABLED RULES
  // ==========================================================

  getActiveRules(
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
      WHERE enabled = 1
      ORDER BY id ASC
    `;

    db.query(
      sql,
      callback
    );
  },

  // ==========================================================
  // CREATE RULE
  // ==========================================================

  createRule(
    data,
    callback
  ) {

    const sql = `
      INSERT INTO automation_rules (
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
        created_by
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      data.automation_key,
      data.name,
      data.description || null,
      data.trigger_type,
      data.event_name || null,
      data.schedule_expression || null,
      data.timezone || "UTC",
      data.channels_json
        ? JSON.stringify(
            data.channels_json
          )
        : null,
      data.recipient_type,
      data.template_key || null,
      data.conditions_json
        ? JSON.stringify(
            data.conditions_json
          )
        : null,
      data.retry_policy_json
        ? JSON.stringify(
            data.retry_policy_json
          )
        : null,
      data.enabled === false
        ? 0
        : 1,
      data.created_by || null,
    ];

    db.query(
      sql,
      values,
      callback
    );
  },

  // ==========================================================
  // UPDATE RULE
  // ==========================================================

  updateRule(
    ruleId,
    data,
    callback
  ) {

    const sql = `
      UPDATE automation_rules
      SET
        automation_key = ?,
        name = ?,
        description = ?,
        trigger_type = ?,
        event_name = ?,
        schedule_expression = ?,
        timezone = ?,
        channels_json = ?,
        recipient_type = ?,
        template_key = ?,
        conditions_json = ?,
        retry_policy_json = ?,
        enabled = ?
      WHERE id = ?
    `;

    const values = [
      data.automation_key,
      data.name,
      data.description || null,
      data.trigger_type,
      data.event_name || null,
      data.schedule_expression || null,
      data.timezone || "UTC",
      data.channels_json
        ? JSON.stringify(
            data.channels_json
          )
        : null,
      data.recipient_type,
      data.template_key || null,
      data.conditions_json
        ? JSON.stringify(
            data.conditions_json
          )
        : null,
      data.retry_policy_json
        ? JSON.stringify(
            data.retry_policy_json
          )
        : null,
      data.enabled === false
        ? 0
        : 1,
      ruleId,
    ];

    db.query(
      sql,
      values,
      callback
    );
  },

  // ==========================================================
  // ENABLE RULE
  // ==========================================================

  activateRule(
    ruleId,
    callback
  ) {

    const sql = `
      UPDATE automation_rules
      SET enabled = 1
      WHERE id = ?
    `;

    db.query(
      sql,
      [ruleId],
      callback
    );
  },

  // ==========================================================
  // DISABLE RULE
  // ==========================================================

  deactivateRule(
    ruleId,
    callback
  ) {

    const sql = `
      UPDATE automation_rules
      SET enabled = 0
      WHERE id = ?
    `;

    db.query(
      sql,
      [ruleId],
      callback
    );
  },

  // ==========================================================
  // CHECK AUTOMATION KEY EXISTS
  // ==========================================================

  ruleKeyExists(
    automationKey,
    excludeRuleId,
    callback
  ) {

    let sql = `
      SELECT
        id
      FROM automation_rules
      WHERE automation_key = ?
    `;

    const params = [
      automationKey,
    ];

    if (
      excludeRuleId
    ) {

      sql += `
        AND id <> ?
      `;

      params.push(
        excludeRuleId
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

        if (error) {
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
  automationRuleModel;