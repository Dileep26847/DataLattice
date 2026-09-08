-- ============================================================
-- DATALATTICE MIGRATION 004
-- ============================================================
-- Purpose:
-- Allow IN_APP communication jobs to omit an external
-- recipient address.
--
-- EMAIL / WHATSAPP / SMS / PUSH / TELEGRAM jobs may continue
-- to store their provider-specific recipient address.
--
-- IN_APP jobs identify the recipient through recipient_user_id
-- and therefore do not require recipient_address.
-- ============================================================

ALTER TABLE communication_jobs
  MODIFY COLUMN recipient_address VARCHAR(320) NULL;