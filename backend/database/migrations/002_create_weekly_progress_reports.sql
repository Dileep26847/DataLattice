-- ============================================================
-- DATALATTICE WEEKLY PROGRESS REPORTS
-- ============================================================
--
-- Historical weekly progress snapshots.
--
-- Responsibilities:
--
-- 1. Store one immutable progress snapshot per student/week.
-- 2. Preserve historical reporting data even when live LMS
--    data changes later.
-- 3. Support idempotent weekly report generation.
-- 4. Store calculated metrics from real LMS activity.
-- 5. Store course-level progress as JSON.
-- 6. Store the communication payload used when the report
--    becomes ready for automation.
--
-- Reporting period:
--
-- The application generates reports for completed weeks.
--
-- Example:
--
-- week_start = 2026-09-07
-- week_end   = 2026-09-13
--
-- ============================================================

CREATE TABLE IF NOT EXISTS weekly_progress_reports (

    -- --------------------------------------------------------
    -- PRIMARY KEY
    -- --------------------------------------------------------

    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,

    -- --------------------------------------------------------
    -- STUDENT
    -- --------------------------------------------------------

    student_id INT NOT NULL,

    -- --------------------------------------------------------
    -- REPORTING PERIOD
    -- --------------------------------------------------------

    week_start DATE NOT NULL,

    week_end DATE NOT NULL,

    -- --------------------------------------------------------
    -- LESSON ACTIVITY
    -- --------------------------------------------------------

    lessons_completed INT UNSIGNED NOT NULL DEFAULT 0,

    -- --------------------------------------------------------
    -- VIDEO ACTIVITY
    --
    -- This represents video progress records updated during
    -- the reporting period.
    --
    -- It is intentionally NOT called "minutes watched"
    -- because the current video_progress table stores the
    -- latest watch state rather than a historical watch-session
    -- ledger.
    -- --------------------------------------------------------

    video_activity_count INT UNSIGNED NOT NULL DEFAULT 0,

    -- --------------------------------------------------------
    -- QUIZ ACTIVITY
    -- --------------------------------------------------------

    quizzes_submitted INT UNSIGNED NOT NULL DEFAULT 0,

    quizzes_passed INT UNSIGNED NOT NULL DEFAULT 0,

    quizzes_failed INT UNSIGNED NOT NULL DEFAULT 0,

    average_quiz_percentage DECIMAL(5,2) NOT NULL DEFAULT 0.00,

    best_quiz_percentage DECIMAL(5,2) NOT NULL DEFAULT 0.00,

    -- --------------------------------------------------------
    -- ASSIGNMENT ACTIVITY
    -- --------------------------------------------------------

    assignments_submitted INT UNSIGNED NOT NULL DEFAULT 0,

    -- --------------------------------------------------------
    -- CURRENT OVERALL PROGRESS
    --
    -- This is the student's progress snapshot at the time the
    -- weekly report is generated.
    -- --------------------------------------------------------

    overall_progress_percentage DECIMAL(5,2) NOT NULL DEFAULT 0.00,

    -- --------------------------------------------------------
    -- COURSE-LEVEL PROGRESS
    --
    -- Stores a historical JSON snapshot such as:
    --
    -- [
    --   {
    --     "course_id": 1,
    --     "course_title": "Data Analytics",
    --     "total_lessons": 20,
    --     "completed_lessons": 12,
    --     "progress_percentage": 60
    --   }
    -- ]
    -- --------------------------------------------------------

    course_progress_json JSON NOT NULL,

    -- --------------------------------------------------------
    -- REPORT PAYLOAD
    --
    -- Stores the complete generated report payload used by
    -- the communication automation layer.
    --
    -- This keeps the communication snapshot independent from
    -- future changes to the live LMS tables.
    -- --------------------------------------------------------

    report_payload_json JSON NOT NULL,

    -- --------------------------------------------------------
    -- GENERATION STATUS
    --
    -- GENERATED:
    --   Snapshot calculated successfully.
    --
    -- FAILED:
    --   Snapshot generation failed.
    --
    -- --------------------------------------------------------

    status ENUM(
        'GENERATED',
        'FAILED'
    ) NOT NULL DEFAULT 'GENERATED',

    -- --------------------------------------------------------
    -- ERROR INFORMATION
    -- --------------------------------------------------------

    error_message TEXT NULL,

    -- --------------------------------------------------------
    -- TIMESTAMPS
    -- --------------------------------------------------------

    generated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    -- --------------------------------------------------------
    -- PRIMARY KEY
    -- --------------------------------------------------------

    PRIMARY KEY (id),

    -- --------------------------------------------------------
    -- ONE SNAPSHOT PER STUDENT PER WEEK
    --
    -- This is the primary idempotency guarantee for historical
    -- weekly snapshots.
    -- --------------------------------------------------------

    UNIQUE KEY uq_weekly_progress_student_week (
        student_id,
        week_start
    ),

    -- --------------------------------------------------------
    -- LOOKUP INDEXES
    -- --------------------------------------------------------

    KEY idx_weekly_progress_student (
        student_id
    ),

    KEY idx_weekly_progress_week (
        week_start,
        week_end
    ),

    KEY idx_weekly_progress_status (
        status
    ),

    KEY idx_weekly_progress_generated_at (
        generated_at
    ),

    -- --------------------------------------------------------
    -- FOREIGN KEY
    -- --------------------------------------------------------

    CONSTRAINT fk_weekly_progress_student
        FOREIGN KEY (
            student_id
        )
        REFERENCES users (
            id
        )
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    -- --------------------------------------------------------
    -- DATA VALIDATION
    -- --------------------------------------------------------

    CONSTRAINT chk_weekly_progress_week_range
        CHECK (
            week_end >= week_start
        ),

    CONSTRAINT chk_weekly_progress_overall_progress
        CHECK (
            overall_progress_percentage >= 0
            AND overall_progress_percentage <= 100
        ),

    CONSTRAINT chk_weekly_progress_average_quiz
        CHECK (
            average_quiz_percentage >= 0
            AND average_quiz_percentage <= 100
        ),

    CONSTRAINT chk_weekly_progress_best_quiz
        CHECK (
            best_quiz_percentage >= 0
            AND best_quiz_percentage <= 100
        )

)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;