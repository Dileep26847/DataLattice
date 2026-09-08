-- ==========================================
-- DATALATTICE NOTIFICATION ENHANCEMENTS
-- Migration: 003
-- ==========================================

-- ==========================================
-- ADD NOTIFICATION ACTION / SOURCE METADATA
-- ==========================================

ALTER TABLE notifications
    ADD COLUMN action_url VARCHAR(500) NULL
        AFTER type,

    ADD COLUMN source_type VARCHAR(50) NULL
        AFTER action_url,

    ADD COLUMN source_id BIGINT NULL
        AFTER source_type,

    ADD COLUMN metadata_json JSON NULL
        AFTER source_id,

    ADD COLUMN read_at TIMESTAMP NULL
        AFTER is_read;


-- ==========================================
-- ADD AUTOMATION IDEMPOTENCY KEY
-- ==========================================

ALTER TABLE notifications
    ADD COLUMN idempotency_key VARCHAR(255) NULL
        AFTER metadata_json;


-- ==========================================
-- PERFORMANCE INDEX
-- ==========================================

ALTER TABLE notifications
    ADD INDEX idx_notifications_user_created_id
    (
        user_id,
        created_at,
        id
    );


-- ==========================================
-- UNREAD NOTIFICATION INDEX
-- ==========================================

ALTER TABLE notifications
    ADD INDEX idx_notifications_user_read_created
    (
        user_id,
        is_read,
        created_at,
        id
    );


-- ==========================================
-- IDEMPOTENCY INDEX
-- ==========================================

ALTER TABLE notifications
    ADD UNIQUE INDEX uq_notifications_idempotency_key
    (
        idempotency_key
    );