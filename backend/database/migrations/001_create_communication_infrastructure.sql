-- ============================================================
-- DATALATTICE COMMUNICATION INFRASTRUCTURE
-- Migration: 001_create_communication_infrastructure.sql
--
-- Purpose:
--   Establish the database foundation for:
--   - communication preferences
--   - message templates
--   - automation rules
--   - durable automation events
--   - automation runs
--   - communication jobs
--   - channel-level delivery tracking
--
-- IMPORTANT:
--   This migration does NOT modify or delete existing LMS tables.
-- ============================================================


USE skillnova_lms;


-- ============================================================
-- 1. COMMUNICATION PREFERENCES
-- ============================================================
--
-- Stores communication consent/preferences for existing users.
--
-- Marketing and transactional consent are kept separate.
-- A user can therefore receive necessary transactional
-- communication without automatically opting into marketing.
--
-- Parent/guardian preferences will be added when the
-- student-parent relationship is introduced.
-- ============================================================

CREATE TABLE IF NOT EXISTS communication_preferences (

    id INT NOT NULL AUTO_INCREMENT,

    user_id INT NOT NULL,

    email_consent TINYINT(1) NOT NULL DEFAULT 0,

    whatsapp_consent TINYINT(1) NOT NULL DEFAULT 0,

    marketing_email_consent TINYINT(1) NOT NULL DEFAULT 0,

    marketing_whatsapp_consent TINYINT(1) NOT NULL DEFAULT 0,

    preferred_channel VARCHAR(20) DEFAULT NULL,

    consent_source VARCHAR(100) DEFAULT NULL,

    consent_at TIMESTAMP NULL DEFAULT NULL,

    updated_at TIMESTAMP NULL
        DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    created_at TIMESTAMP NULL
        DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (id),

    UNIQUE KEY uq_communication_preferences_user (
        user_id
    ),

    KEY idx_communication_preferences_email (
        email_consent
    ),

    KEY idx_communication_preferences_whatsapp (
        whatsapp_consent
    ),

    CONSTRAINT fk_communication_preferences_user
        FOREIGN KEY (user_id)
        REFERENCES users (id)
        ON DELETE CASCADE,

    CONSTRAINT chk_communication_preferences_channel
        CHECK (
            preferred_channel IS NULL
            OR preferred_channel IN (
                'EMAIL',
                'WHATSAPP'
            )
        )

) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;


-- ============================================================
-- 2. MESSAGE TEMPLATES
-- ============================================================
--
-- Database-driven templates.
--
-- Example:
--
-- template_key:
--   LIVE_CLASS_REMINDER
--
-- channel:
--   EMAIL
--
-- subject_template:
--   Your DataLattice live class is scheduled
--
-- body_template:
--   Hello {{student_name}}, ...
--
-- Template versions are immutable from the application
-- perspective. A new version can be created rather than
-- silently changing an already-used template.
-- ============================================================

CREATE TABLE IF NOT EXISTS message_templates (

    id INT NOT NULL AUTO_INCREMENT,

    template_key VARCHAR(100)
        CHARACTER SET ascii
        COLLATE ascii_bin
        NOT NULL,

    name VARCHAR(200) NOT NULL,

    channel VARCHAR(20) NOT NULL,

    category VARCHAR(30) NOT NULL DEFAULT 'TRANSACTIONAL',

    subject_template VARCHAR(500) DEFAULT NULL,

    body_template TEXT NOT NULL,

    variables_json JSON DEFAULT NULL,

    version INT NOT NULL DEFAULT 1,

    is_active TINYINT(1) NOT NULL DEFAULT 1,

    created_by INT DEFAULT NULL,

    created_at TIMESTAMP NULL
        DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP NULL
        DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id),

    UNIQUE KEY uq_message_template_version (
        template_key,
        channel,
        version
    ),

    KEY idx_message_templates_key_active (
        template_key,
        is_active
    ),

    KEY idx_message_templates_channel_active (
        channel,
        is_active
    ),

    KEY idx_message_templates_created_by (
        created_by
    ),

    CONSTRAINT fk_message_templates_created_by
        FOREIGN KEY (created_by)
        REFERENCES users (id)
        ON DELETE SET NULL,

    CONSTRAINT chk_message_templates_channel
        CHECK (
            channel IN (
                'EMAIL',
                'WHATSAPP',
                'SMS',
                'PUSH',
                'IN_APP',
                'TELEGRAM'
            )
        ),

    CONSTRAINT chk_message_templates_category
        CHECK (
            category IN (
                'TRANSACTIONAL',
                'MARKETING',
                'SYSTEM'
            )
        ),

    CONSTRAINT chk_message_templates_version
        CHECK (
            version >= 1
        )

) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;


-- ============================================================
-- 3. AUTOMATION RULES
-- ============================================================
--
-- Defines reusable automation behavior.
--
-- Examples:
--
-- LIVE_CLASS_REMINDER
--   trigger_type = SCHEDULE
--   schedule_expression = ...
--   channels_json = ["EMAIL","WHATSAPP"]
--
-- PROJECT_PUBLISHED
--   trigger_type = EVENT
--   event_name = PROJECT_PUBLISHED
--
-- Conditions and recipient configuration are intentionally
-- stored as JSON so the automation engine can evolve without
-- repeatedly changing the schema.
-- ============================================================

CREATE TABLE IF NOT EXISTS automation_rules (

    id INT NOT NULL AUTO_INCREMENT,

    automation_key VARCHAR(100)
        CHARACTER SET ascii
        COLLATE ascii_bin
        NOT NULL,

    name VARCHAR(200) NOT NULL,

    description TEXT DEFAULT NULL,

    trigger_type VARCHAR(20) NOT NULL,

    event_name VARCHAR(100) DEFAULT NULL,

    schedule_expression VARCHAR(255) DEFAULT NULL,

    timezone VARCHAR(100) NOT NULL DEFAULT 'UTC',

    channels_json JSON NOT NULL,

    recipient_type VARCHAR(50) NOT NULL,

    template_key VARCHAR(100)
        CHARACTER SET ascii
        COLLATE ascii_bin
        DEFAULT NULL,

    conditions_json JSON DEFAULT NULL,

    retry_policy_json JSON DEFAULT NULL,

    enabled TINYINT(1) NOT NULL DEFAULT 1,

    created_by INT DEFAULT NULL,

    created_at TIMESTAMP NULL
        DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP NULL
        DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id),

    UNIQUE KEY uq_automation_rules_key (
        automation_key
    ),

    KEY idx_automation_rules_enabled (
        enabled
    ),

    KEY idx_automation_rules_trigger (
        trigger_type,
        enabled
    ),

    KEY idx_automation_rules_event (
        event_name,
        enabled
    ),

    KEY idx_automation_rules_created_by (
        created_by
    ),

    CONSTRAINT fk_automation_rules_created_by
        FOREIGN KEY (created_by)
        REFERENCES users (id)
        ON DELETE SET NULL,

    CONSTRAINT chk_automation_rules_trigger
        CHECK (
            trigger_type IN (
                'EVENT',
                'SCHEDULE'
            )
        ),

    CONSTRAINT chk_automation_rules_recipient
        CHECK (
            recipient_type IN (
                'STUDENT',
                'PARENT',
                'TRAINER',
                'ADMIN',
                'LEAD',
                'CUSTOM'
            )
        )

) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;


-- ============================================================
-- 4. AUTOMATION EVENTS
-- ============================================================
--
-- Durable event/outbox boundary.
--
-- Examples:
--
-- LIVE_CLASS_SCHEDULED
-- STUDENT_REGISTERED
-- PROJECT_PUBLISHED
-- WEEKLY_REPORT_GENERATED
--
-- This lets the application record an event before background
-- processing occurs.
--
-- It also gives us a clean migration path toward Redis/BullMQ
-- or an external event bus later.
-- ============================================================

CREATE TABLE IF NOT EXISTS automation_events (

    id BIGINT NOT NULL AUTO_INCREMENT,

    event_key VARCHAR(100)
        CHARACTER SET ascii
        COLLATE ascii_bin
        NOT NULL,

    event_type VARCHAR(100)
        CHARACTER SET ascii
        COLLATE ascii_bin
        NOT NULL,

    aggregate_type VARCHAR(100)
        CHARACTER SET ascii
        COLLATE ascii_bin
        DEFAULT NULL,

    aggregate_id BIGINT DEFAULT NULL,

    payload_json JSON NOT NULL,

    status VARCHAR(20) NOT NULL DEFAULT 'PENDING',

    available_at TIMESTAMP NULL
        DEFAULT CURRENT_TIMESTAMP,

    processed_at TIMESTAMP NULL DEFAULT NULL,

    attempts INT NOT NULL DEFAULT 0,

    last_error TEXT DEFAULT NULL,

    created_at TIMESTAMP NULL
        DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (id),

    UNIQUE KEY uq_automation_events_key (
        event_key
    ),

    KEY idx_automation_events_pending (
        status,
        available_at,
        id
    ),

    KEY idx_automation_events_type (
        event_type,
        created_at
    ),

    KEY idx_automation_events_aggregate (
        aggregate_type,
        aggregate_id
    ),

    CONSTRAINT chk_automation_events_status
        CHECK (
            status IN (
                'PENDING',
                'PROCESSING',
                'PROCESSED',
                'FAILED'
            )
        )

) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;


-- ============================================================
-- 5. AUTOMATION RUNS
-- ============================================================
--
-- Represents one execution of an automation rule.
--
-- Example:
--
-- Weekly Student Report
-- Run: 2026-09-07
-- Total: 500
-- Successful: 487
-- Failed: 13
-- ============================================================

CREATE TABLE IF NOT EXISTS automation_runs (

    id BIGINT NOT NULL AUTO_INCREMENT,

    automation_rule_id INT NOT NULL,

    event_id BIGINT DEFAULT NULL,

    run_key VARCHAR(191)
        CHARACTER SET ascii
        COLLATE ascii_bin
        NOT NULL,

    status VARCHAR(20) NOT NULL DEFAULT 'QUEUED',

    scheduled_at TIMESTAMP NULL DEFAULT NULL,

    started_at TIMESTAMP NULL DEFAULT NULL,

    finished_at TIMESTAMP NULL DEFAULT NULL,

    total_jobs INT NOT NULL DEFAULT 0,

    queued_jobs INT NOT NULL DEFAULT 0,

    successful_jobs INT NOT NULL DEFAULT 0,

    failed_jobs INT NOT NULL DEFAULT 0,

    skipped_jobs INT NOT NULL DEFAULT 0,

    error_message TEXT DEFAULT NULL,

    created_at TIMESTAMP NULL
        DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP NULL
        DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id),

    UNIQUE KEY uq_automation_runs_key (
        run_key
    ),

    KEY idx_automation_runs_rule (
        automation_rule_id,
        created_at
    ),

    KEY idx_automation_runs_status (
        status,
        scheduled_at
    ),

    KEY idx_automation_runs_event (
        event_id
    ),

    CONSTRAINT fk_automation_runs_rule
        FOREIGN KEY (automation_rule_id)
        REFERENCES automation_rules (id)
        ON DELETE RESTRICT,

    CONSTRAINT fk_automation_runs_event
        FOREIGN KEY (event_id)
        REFERENCES automation_events (id)
        ON DELETE SET NULL,

    CONSTRAINT chk_automation_runs_status
        CHECK (
            status IN (
                'QUEUED',
                'RUNNING',
                'COMPLETED',
                'PARTIAL',
                'FAILED',
                'CANCELLED'
            )
        )

) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;


-- ============================================================
-- 6. COMMUNICATION JOBS
-- ============================================================
--
-- One job represents one recipient + one communication channel.
--
-- Example:
--
-- Student 101
-- Email
-- LIVE_CLASS_REMINDER
--
-- Student 101
-- WhatsApp
-- LIVE_CLASS_REMINDER
--
-- These are separate jobs so channel-level failures are
-- accurately tracked.
--
-- The recipient information is intentionally snapshotted here.
-- This protects historical delivery records if a user later
-- changes their email/phone number.
-- ============================================================

CREATE TABLE IF NOT EXISTS communication_jobs (

    id BIGINT NOT NULL AUTO_INCREMENT,

    automation_run_id BIGINT DEFAULT NULL,

    automation_rule_id INT DEFAULT NULL,

    template_id INT DEFAULT NULL,

    channel VARCHAR(20) NOT NULL,

    recipient_type VARCHAR(50) NOT NULL,

    recipient_user_id INT DEFAULT NULL,

    recipient_address VARCHAR(320) NOT NULL,

    recipient_name VARCHAR(200) DEFAULT NULL,

    subject VARCHAR(500) DEFAULT NULL,

    rendered_body TEXT DEFAULT NULL,

    payload_json JSON DEFAULT NULL,

    idempotency_key VARCHAR(191)
        CHARACTER SET ascii
        COLLATE ascii_bin
        NOT NULL,

    status VARCHAR(20) NOT NULL DEFAULT 'QUEUED',

    priority TINYINT NOT NULL DEFAULT 5,

    scheduled_at TIMESTAMP NULL DEFAULT NULL,

    started_at TIMESTAMP NULL DEFAULT NULL,

    sent_at TIMESTAMP NULL DEFAULT NULL,

    completed_at TIMESTAMP NULL DEFAULT NULL,

    attempt_count INT NOT NULL DEFAULT 0,

    max_attempts INT NOT NULL DEFAULT 3,

    next_attempt_at TIMESTAMP NULL DEFAULT NULL,

    locked_at TIMESTAMP NULL DEFAULT NULL,

    locked_by VARCHAR(100) DEFAULT NULL,

    last_error TEXT DEFAULT NULL,

    created_at TIMESTAMP NULL
        DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP NULL
        DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id),

    UNIQUE KEY uq_communication_jobs_idempotency (
        idempotency_key
    ),

    KEY idx_communication_jobs_queue (
        status,
        scheduled_at,
        priority,
        id
    ),

    KEY idx_communication_jobs_retry (
        status,
        next_attempt_at
    ),

    KEY idx_communication_jobs_recipient (
        recipient_user_id,
        created_at
    ),

    KEY idx_communication_jobs_run (
        automation_run_id
    ),

    KEY idx_communication_jobs_rule (
        automation_rule_id
    ),

    KEY idx_communication_jobs_template (
        template_id
    ),

    KEY idx_communication_jobs_channel_status (
        channel,
        status,
        created_at
    ),

    CONSTRAINT fk_communication_jobs_run
        FOREIGN KEY (automation_run_id)
        REFERENCES automation_runs (id)
        ON DELETE SET NULL,

    CONSTRAINT fk_communication_jobs_rule
        FOREIGN KEY (automation_rule_id)
        REFERENCES automation_rules (id)
        ON DELETE SET NULL,

    CONSTRAINT fk_communication_jobs_template
        FOREIGN KEY (template_id)
        REFERENCES message_templates (id)
        ON DELETE SET NULL,

    CONSTRAINT fk_communication_jobs_recipient
        FOREIGN KEY (recipient_user_id)
        REFERENCES users (id)
        ON DELETE SET NULL,

    CONSTRAINT chk_communication_jobs_channel
        CHECK (
            channel IN (
                'EMAIL',
                'WHATSAPP',
                'SMS',
                'PUSH',
                'IN_APP',
                'TELEGRAM'
            )
        ),

    CONSTRAINT chk_communication_jobs_recipient
        CHECK (
            recipient_type IN (
                'STUDENT',
                'PARENT',
                'TRAINER',
                'ADMIN',
                'LEAD',
                'CUSTOM'
            )
        ),

    CONSTRAINT chk_communication_jobs_status
        CHECK (
            status IN (
                'QUEUED',
                'PROCESSING',
                'SENT',
                'DELIVERED',
                'FAILED',
                'CANCELLED'
            )
        ),

    CONSTRAINT chk_communication_jobs_priority
        CHECK (
            priority BETWEEN 1 AND 10
        ),

    CONSTRAINT chk_communication_jobs_attempts
        CHECK (
            attempt_count >= 0
            AND max_attempts >= 1
        )

) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;


-- ============================================================
-- 7. COMMUNICATION DELIVERIES
-- ============================================================
--
-- Channel/provider-level delivery history.
--
-- One communication job may have multiple delivery attempts.
--
-- Example:
--
-- Job:
--   WhatsApp → FAILED
--
-- Attempt 1:
--   provider timeout
--
-- Attempt 2:
--   provider accepted
--
-- This preserves the complete operational history.
-- ============================================================

CREATE TABLE IF NOT EXISTS communication_deliveries (

    id BIGINT NOT NULL AUTO_INCREMENT,

    communication_job_id BIGINT NOT NULL,

    attempt_number INT NOT NULL,

    provider VARCHAR(100) NOT NULL,

    provider_message_id VARCHAR(255) DEFAULT NULL,

    status VARCHAR(30) NOT NULL,

    provider_status VARCHAR(100) DEFAULT NULL,

    failure_code VARCHAR(100) DEFAULT NULL,

    failure_reason TEXT DEFAULT NULL,

    request_metadata_json JSON DEFAULT NULL,

    response_metadata_json JSON DEFAULT NULL,

    attempted_at TIMESTAMP NULL
        DEFAULT CURRENT_TIMESTAMP,

    delivered_at TIMESTAMP NULL DEFAULT NULL,

    created_at TIMESTAMP NULL
        DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (id),

    UNIQUE KEY uq_communication_delivery_attempt (
        communication_job_id,
        attempt_number
    ),

    KEY idx_communication_deliveries_job (
        communication_job_id,
        created_at
    ),

    KEY idx_communication_deliveries_provider_message (
        provider_message_id
    ),

    KEY idx_communication_deliveries_status (
        status,
        created_at
    ),

    KEY idx_communication_deliveries_provider (
        provider,
        status,
        created_at
    ),

    CONSTRAINT fk_communication_deliveries_job
        FOREIGN KEY (communication_job_id)
        REFERENCES communication_jobs (id)
        ON DELETE CASCADE,

    CONSTRAINT chk_communication_deliveries_status
        CHECK (
            status IN (
                'QUEUED',
                'PROCESSING',
                'SENT',
                'DELIVERED',
                'FAILED',
                'BOUNCED',
                'REJECTED'
            )
        ),

    CONSTRAINT chk_communication_deliveries_attempt
        CHECK (
            attempt_number >= 1
        )

) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;


-- ============================================================
-- MIGRATION COMPLETE
-- ============================================================