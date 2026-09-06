/*
===============================================================================
DataLattice LMS
Migration: 002_seed_live_class_communication_templates.sql

Purpose:
  Seed production communication templates and automation rules for
  live-class reminders.

Channels:
  - EMAIL
  - WHATSAPP

Reminder windows:
  - 24 hours before live class
  - 1 hour before live class

Important:
  - These messages are TRANSACTIONAL.
  - Templates use the DataLattice template renderer syntax:
      {{variable}}
  - Do not use Handlebars block syntax such as:
      {{#if ...}}
      {{/if}}
  - This migration is safe to re-run.
===============================================================================
*/

USE skillnova_lms;


/*
===============================================================================
1. LIVE CLASS REMINDER TEMPLATES
===============================================================================
*/


/*
-------------------------------------------------------------------------------
1.1 LIVE CLASS — 24 HOURS — EMAIL
-------------------------------------------------------------------------------
*/

INSERT INTO message_templates (
    template_key,
    name,
    channel,
    category,
    subject_template,
    body_template,
    variables_json,
    version,
    is_active
)
VALUES (
    'LIVE_CLASS_REMINDER_24H_EMAIL',
    'Live Class Reminder - 24 Hours - Email',
    'EMAIL',
    'TRANSACTIONAL',
    'Reminder: {{title}} is tomorrow',
    '<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Live Class Reminder</title>
</head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:Arial,Helvetica,sans-serif;color:#0f172a;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f8fafc;padding:32px 16px;">
    <tr>
      <td align="center">

        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:620px;background:#ffffff;border:1px solid #e2e8f0;border-radius:16px;overflow:hidden;">

          <tr>
            <td style="padding:28px 32px;background:#2563eb;color:#ffffff;">
              <div style="font-size:12px;font-weight:bold;letter-spacing:1.5px;text-transform:uppercase;">
                DATALATTICE
              </div>

              <div style="margin-top:8px;font-size:26px;font-weight:700;">
                Live Class Reminder
              </div>
            </td>
          </tr>

          <tr>
            <td style="padding:32px;">

              <p style="margin:0 0 16px;font-size:16px;line-height:1.6;">
                Hi {{student_name}},
              </p>

              <p style="margin:0 0 24px;font-size:16px;line-height:1.6;color:#475569;">
                This is a reminder that your upcoming live class is scheduled for tomorrow.
              </p>

              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;">
                <tr>
                  <td style="padding:20px;">

                    <div style="font-size:20px;font-weight:700;color:#0f172a;">
                      {{title}}
                    </div>

                    <div style="margin-top:12px;font-size:14px;color:#475569;">
                      <strong>Date:</strong> {{class_date}}
                    </div>

                    <div style="margin-top:8px;font-size:14px;color:#475569;">
                      <strong>Time:</strong> {{start_time}}
                    </div>

                    <div style="margin-top:8px;font-size:14px;color:#475569;">
                      <strong>Batch:</strong> {{batch_name}}
                    </div>

                    <div style="margin-top:16px;font-size:14px;line-height:1.6;color:#475569;">
                      {{description}}
                    </div>

                  </td>
                </tr>
              </table>

              <div style="margin-top:24px;padding:16px;background:#eff6ff;border-radius:10px;color:#1e40af;font-size:14px;line-height:1.6;">
                Your live class link:
                <br>
                <a href="{{zoom_link}}" style="color:#2563eb;font-weight:700;text-decoration:none;">
                  Join Live Class
                </a>
              </div>

              <p style="margin:24px 0 0;font-size:14px;line-height:1.6;color:#64748b;">
                Please join on time and keep your learning materials ready.
              </p>

              <p style="margin:24px 0 0;font-size:14px;line-height:1.6;color:#475569;">
                Regards,<br>
                <strong>DataLattice Team</strong>
              </p>

            </td>
          </tr>

          <tr>
            <td style="padding:20px 32px;background:#f8fafc;border-top:1px solid #e2e8f0;font-size:12px;color:#94a3b8;text-align:center;">
              This is an automated transactional message from DataLattice.
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>
</body>
</html>',
    JSON_OBJECT(
        'student_name', 'Student full name',
        'title', 'Live class title',
        'description', 'Live class description',
        'class_date', 'Live class date',
        'start_time', 'Live class start time',
        'batch_name', 'Batch name',
        'zoom_link', 'Live class meeting link'
    ),
    1,
    1
)
ON DUPLICATE KEY UPDATE
    name = VALUES(name),
    channel = VALUES(channel),
    category = VALUES(category),
    subject_template = VALUES(subject_template),
    body_template = VALUES(body_template),
    variables_json = VALUES(variables_json),
    is_active = VALUES(is_active),
    updated_at = CURRENT_TIMESTAMP;


/*
-------------------------------------------------------------------------------
1.2 LIVE CLASS — 24 HOURS — WHATSAPP
-------------------------------------------------------------------------------
*/

INSERT INTO message_templates (
    template_key,
    name,
    channel,
    category,
    subject_template,
    body_template,
    variables_json,
    version,
    is_active
)
VALUES (
    'LIVE_CLASS_REMINDER_24H_WHATSAPP',
    'Live Class Reminder - 24 Hours - WhatsApp',
    'WHATSAPP',
    'TRANSACTIONAL',
    NULL,
    'Hi {{student_name}},

Reminder from DataLattice.

Your live class is scheduled for tomorrow.

Class: {{title}}
Date: {{class_date}}
Time: {{start_time}}
Batch: {{batch_name}}

{{description}}

Join the live class:
{{zoom_link}}

Please join on time.

- DataLattice Team',
    JSON_OBJECT(
        'student_name', 'Student full name',
        'title', 'Live class title',
        'description', 'Live class description',
        'class_date', 'Live class date',
        'start_time', 'Live class start time',
        'batch_name', 'Batch name',
        'zoom_link', 'Live class meeting link'
    ),
    1,
    1
)
ON DUPLICATE KEY UPDATE
    name = VALUES(name),
    channel = VALUES(channel),
    category = VALUES(category),
    subject_template = VALUES(subject_template),
    body_template = VALUES(body_template),
    variables_json = VALUES(variables_json),
    is_active = VALUES(is_active),
    updated_at = CURRENT_TIMESTAMP;


/*
-------------------------------------------------------------------------------
1.3 LIVE CLASS — 1 HOUR — EMAIL
-------------------------------------------------------------------------------
*/

INSERT INTO message_templates (
    template_key,
    name,
    channel,
    category,
    subject_template,
    body_template,
    variables_json,
    version,
    is_active
)
VALUES (
    'LIVE_CLASS_REMINDER_1H_EMAIL',
    'Live Class Reminder - 1 Hour - Email',
    'EMAIL',
    'TRANSACTIONAL',
    'Starting soon: {{title}}',
    '<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Live Class Starting Soon</title>
</head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:Arial,Helvetica,sans-serif;color:#0f172a;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f8fafc;padding:32px 16px;">
    <tr>
      <td align="center">

        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:620px;background:#ffffff;border:1px solid #e2e8f0;border-radius:16px;overflow:hidden;">

          <tr>
            <td style="padding:28px 32px;background:#4f46e5;color:#ffffff;">

              <div style="font-size:12px;font-weight:bold;letter-spacing:1.5px;text-transform:uppercase;">
                DATALATTICE
              </div>

              <div style="margin-top:8px;font-size:26px;font-weight:700;">
                Your Live Class Starts Soon
              </div>

            </td>
          </tr>

          <tr>
            <td style="padding:32px;">

              <p style="margin:0 0 16px;font-size:16px;line-height:1.6;">
                Hi {{student_name}},
              </p>

              <p style="margin:0 0 24px;font-size:16px;line-height:1.6;color:#475569;">
                Your live class starts in approximately one hour.
              </p>

              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;">
                <tr>
                  <td style="padding:20px;">

                    <div style="font-size:20px;font-weight:700;color:#0f172a;">
                      {{title}}
                    </div>

                    <div style="margin-top:12px;font-size:14px;color:#475569;">
                      <strong>Date:</strong> {{class_date}}
                    </div>

                    <div style="margin-top:8px;font-size:14px;color:#475569;">
                      <strong>Time:</strong> {{start_time}}
                    </div>

                    <div style="margin-top:8px;font-size:14px;color:#475569;">
                      <strong>Batch:</strong> {{batch_name}}
                    </div>

                    <div style="margin-top:16px;font-size:14px;line-height:1.6;color:#475569;">
                      {{description}}
                    </div>

                  </td>
                </tr>
              </table>

              <div style="margin-top:24px;text-align:center;">
                <a
                  href="{{zoom_link}}"
                  style="display:inline-block;padding:14px 24px;background:#2563eb;color:#ffffff;border-radius:10px;text-decoration:none;font-weight:700;"
                >
                  Join Live Class
                </a>
              </div>

              <p style="margin:24px 0 0;font-size:14px;line-height:1.6;color:#64748b;">
                Please be ready a few minutes before the class begins.
              </p>

              <p style="margin:24px 0 0;font-size:14px;line-height:1.6;color:#475569;">
                Regards,<br>
                <strong>DataLattice Team</strong>
              </p>

            </td>
          </tr>

          <tr>
            <td style="padding:20px 32px;background:#f8fafc;border-top:1px solid #e2e8f0;font-size:12px;color:#94a3b8;text-align:center;">
              This is an automated transactional message from DataLattice.
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>
</body>
</html>',
    JSON_OBJECT(
        'student_name', 'Student full name',
        'title', 'Live class title',
        'description', 'Live class description',
        'class_date', 'Live class date',
        'start_time', 'Live class start time',
        'batch_name', 'Batch name',
        'zoom_link', 'Live class meeting link'
    ),
    1,
    1
)
ON DUPLICATE KEY UPDATE
    name = VALUES(name),
    channel = VALUES(channel),
    category = VALUES(category),
    subject_template = VALUES(subject_template),
    body_template = VALUES(body_template),
    variables_json = VALUES(variables_json),
    is_active = VALUES(is_active),
    updated_at = CURRENT_TIMESTAMP;


/*
-------------------------------------------------------------------------------
1.4 LIVE CLASS — 1 HOUR — WHATSAPP
-------------------------------------------------------------------------------
*/

INSERT INTO message_templates (
    template_key,
    name,
    channel,
    category,
    subject_template,
    body_template,
    variables_json,
    version,
    is_active
)
VALUES (
    'LIVE_CLASS_REMINDER_1H_WHATSAPP',
    'Live Class Reminder - 1 Hour - WhatsApp',
    'WHATSAPP',
    'TRANSACTIONAL',
    NULL,
    'Hi {{student_name}},

Your DataLattice live class starts in about 1 hour.

Class: {{title}}
Date: {{class_date}}
Time: {{start_time}}
Batch: {{batch_name}}

{{description}}

Join here:
{{zoom_link}}

Please be ready before the class starts.

- DataLattice Team',
    JSON_OBJECT(
        'student_name', 'Student full name',
        'title', 'Live class title',
        'description', 'Live class description',
        'class_date', 'Live class date',
        'start_time', 'Live class start time',
        'batch_name', 'Batch name',
        'zoom_link', 'Live class meeting link'
    ),
    1,
    1
)
ON DUPLICATE KEY UPDATE
    name = VALUES(name),
    channel = VALUES(channel),
    category = VALUES(category),
    subject_template = VALUES(subject_template),
    body_template = VALUES(body_template),
    variables_json = VALUES(variables_json),
    is_active = VALUES(is_active),
    updated_at = CURRENT_TIMESTAMP;


/*
===============================================================================
2. LIVE CLASS REMINDER AUTOMATION RULES
===============================================================================
*/


/*
-------------------------------------------------------------------------------
2.1 24 HOURS — EMAIL
-------------------------------------------------------------------------------
*/

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
    enabled
)
VALUES (
    'LIVE_CLASS_REMINDER_24H_EMAIL',
    'Live Class Reminder - 24 Hours - Email',
    'Send a transactional email reminder to eligible students 24 hours before a scheduled live class.',
    'EVENT',
    'LIVE_CLASS_REMINDER_24H',
    NULL,
    'Asia/Kolkata',
    JSON_ARRAY('EMAIL'),
    'STUDENT',
    'LIVE_CLASS_REMINDER_24H_EMAIL',
    JSON_OBJECT(
        'equals',
        JSON_OBJECT(
            'status',
            'SCHEDULED'
        )
    ),
    JSON_OBJECT(
        'max_attempts',
        3,
        'backoff_seconds',
        JSON_ARRAY(60, 300, 900)
    ),
    1
)
ON DUPLICATE KEY UPDATE
    name = VALUES(name),
    description = VALUES(description),
    trigger_type = VALUES(trigger_type),
    event_name = VALUES(event_name),
    schedule_expression = VALUES(schedule_expression),
    timezone = VALUES(timezone),
    channels_json = VALUES(channels_json),
    recipient_type = VALUES(recipient_type),
    template_key = VALUES(template_key),
    conditions_json = VALUES(conditions_json),
    retry_policy_json = VALUES(retry_policy_json),
    enabled = VALUES(enabled),
    updated_at = CURRENT_TIMESTAMP;


/*
-------------------------------------------------------------------------------
2.2 24 HOURS — WHATSAPP
-------------------------------------------------------------------------------
*/

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
    enabled
)
VALUES (
    'LIVE_CLASS_REMINDER_24H_WHATSAPP',
    'Live Class Reminder - 24 Hours - WhatsApp',
    'Send a transactional WhatsApp reminder to eligible students 24 hours before a scheduled live class.',
    'EVENT',
    'LIVE_CLASS_REMINDER_24H',
    NULL,
    'Asia/Kolkata',
    JSON_ARRAY('WHATSAPP'),
    'STUDENT',
    'LIVE_CLASS_REMINDER_24H_WHATSAPP',
    JSON_OBJECT(
        'equals',
        JSON_OBJECT(
            'status',
            'SCHEDULED'
        )
    ),
    JSON_OBJECT(
        'max_attempts',
        3,
        'backoff_seconds',
        JSON_ARRAY(60, 300, 900)
    ),
    1
)
ON DUPLICATE KEY UPDATE
    name = VALUES(name),
    description = VALUES(description),
    trigger_type = VALUES(trigger_type),
    event_name = VALUES(event_name),
    schedule_expression = VALUES(schedule_expression),
    timezone = VALUES(timezone),
    channels_json = VALUES(channels_json),
    recipient_type = VALUES(recipient_type),
    template_key = VALUES(template_key),
    conditions_json = VALUES(conditions_json),
    retry_policy_json = VALUES(retry_policy_json),
    enabled = VALUES(enabled),
    updated_at = CURRENT_TIMESTAMP;


/*
-------------------------------------------------------------------------------
2.3 1 HOUR — EMAIL
-------------------------------------------------------------------------------
*/

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
    enabled
)
VALUES (
    'LIVE_CLASS_REMINDER_1H_EMAIL',
    'Live Class Reminder - 1 Hour - Email',
    'Send a transactional email reminder to eligible students 1 hour before a scheduled live class.',
    'EVENT',
    'LIVE_CLASS_REMINDER_1H',
    NULL,
    'Asia/Kolkata',
    JSON_ARRAY('EMAIL'),
    'STUDENT',
    'LIVE_CLASS_REMINDER_1H_EMAIL',
    JSON_OBJECT(
        'equals',
        JSON_OBJECT(
            'status',
            'SCHEDULED'
        )
    ),
    JSON_OBJECT(
        'max_attempts',
        3,
        'backoff_seconds',
        JSON_ARRAY(60, 300, 900)
    ),
    1
)
ON DUPLICATE KEY UPDATE
    name = VALUES(name),
    description = VALUES(description),
    trigger_type = VALUES(trigger_type),
    event_name = VALUES(event_name),
    schedule_expression = VALUES(schedule_expression),
    timezone = VALUES(timezone),
    channels_json = VALUES(channels_json),
    recipient_type = VALUES(recipient_type),
    template_key = VALUES(template_key),
    conditions_json = VALUES(conditions_json),
    retry_policy_json = VALUES(retry_policy_json),
    enabled = VALUES(enabled),
    updated_at = CURRENT_TIMESTAMP;


/*
-------------------------------------------------------------------------------
2.4 1 HOUR — WHATSAPP
-------------------------------------------------------------------------------
*/

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
    enabled
)
VALUES (
    'LIVE_CLASS_REMINDER_1H_WHATSAPP',
    'Live Class Reminder - 1 Hour - WhatsApp',
    'Send a transactional WhatsApp reminder to eligible students 1 hour before a scheduled live class.',
    'EVENT',
    'LIVE_CLASS_REMINDER_1H',
    NULL,
    'Asia/Kolkata',
    JSON_ARRAY('WHATSAPP'),
    'STUDENT',
    'LIVE_CLASS_REMINDER_1H_WHATSAPP',
    JSON_OBJECT(
        'equals',
        JSON_OBJECT(
            'status',
            'SCHEDULED'
        )
    ),
    JSON_OBJECT(
        'max_attempts',
        3,
        'backoff_seconds',
        JSON_ARRAY(60, 300, 900)
    ),
    1
)
ON DUPLICATE KEY UPDATE
    name = VALUES(name),
    description = VALUES(description),
    trigger_type = VALUES(trigger_type),
    event_name = VALUES(event_name),
    schedule_expression = VALUES(schedule_expression),
    timezone = VALUES(timezone),
    channels_json = VALUES(channels_json),
    recipient_type = VALUES(recipient_type),
    template_key = VALUES(template_key),
    conditions_json = VALUES(conditions_json),
    retry_policy_json = VALUES(retry_policy_json),
    enabled = VALUES(enabled),
    updated_at = CURRENT_TIMESTAMP;


/*
===============================================================================
3. VERIFICATION
===============================================================================

Expected templates:
  LIVE_CLASS_REMINDER_24H_EMAIL
  LIVE_CLASS_REMINDER_24H_WHATSAPP
  LIVE_CLASS_REMINDER_1H_EMAIL
  LIVE_CLASS_REMINDER_1H_WHATSAPP

Expected automation rules:
  LIVE_CLASS_REMINDER_24H_EMAIL
  LIVE_CLASS_REMINDER_24H_WHATSAPP
  LIVE_CLASS_REMINDER_1H_EMAIL
  LIVE_CLASS_REMINDER_1H_WHATSAPP

All four templates must have:
  category = TRANSACTIONAL

All four rules must have:
  enabled = 1
===============================================================================
*/