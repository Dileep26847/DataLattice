const mysql = require("mysql2/promise");
const path = require("path");

require("dotenv").config({
    path: path.resolve(__dirname, "../../.env"),
});


// ============================================================
// DATABASE CONFIGURATION
// ============================================================

const databaseConfig = {

    host:
        process.env.DB_HOST,

    port:
        Number(
            process.env.DB_PORT ||
            3306
        ),

    user:
        process.env.DB_USER,

    password:
        process.env.DB_PASSWORD,

    database:
        process.env.DB_NAME,

};


// ============================================================
// MIGRATION
// ============================================================

const runMigration = async () => {

    let connection;


    try {

        console.log("");
        console.log(
            "============================================================"
        );
        console.log(
            "DataLattice - Phone OTP Infrastructure Migration"
        );
        console.log(
            "============================================================"
        );


        // ========================================================
        // CONNECT
        // ========================================================

        connection =
            await mysql.createConnection(
                databaseConfig
            );


        console.log(
            "✅ MySQL connection established."
        );


        // ========================================================
        // CHECK USERS TABLE
        // ========================================================

        const [usersTables] =
            await connection.query(
                "SHOW TABLES LIKE 'users'"
            );


        if (
            usersTables.length === 0
        ) {

            throw new Error(
                "The users table does not exist. Create the existing LMS database schema before running this migration."
            );

        }


        console.log(
            "✅ Existing users table found."
        );


        // ========================================================
        // CHECK PHONE COLUMN
        // ========================================================

        const [phoneColumns] =
            await connection.query(
                "SHOW COLUMNS FROM users LIKE 'phone'"
            );


        if (
            phoneColumns.length === 0
        ) {

            console.log(
                "➕ Adding users.phone..."
            );


            await connection.query(
                `
                    ALTER TABLE users
                    ADD COLUMN phone VARCHAR(20)
                    NULL
                    AFTER email
                `
            );


            console.log(
                "✅ users.phone added."
            );

        } else {

            console.log(
                "ℹ️ users.phone already exists."
            );

        }


        // ========================================================
        // CHECK PHONE VERIFIED AT COLUMN
        // ========================================================

        const [phoneVerifiedColumns] =
            await connection.query(
                "SHOW COLUMNS FROM users LIKE 'phone_verified_at'"
            );


        if (
            phoneVerifiedColumns.length === 0
        ) {

            console.log(
                "➕ Adding users.phone_verified_at..."
            );


            await connection.query(
                `
                    ALTER TABLE users
                    ADD COLUMN phone_verified_at DATETIME
                    NULL
                    AFTER phone
                `
            );


            console.log(
                "✅ users.phone_verified_at added."
            );

        } else {

            console.log(
                "ℹ️ users.phone_verified_at already exists."
            );

        }


        // ========================================================
        // CHECK UNIQUE PHONE INDEX
        // ========================================================

        const [phoneIndexes] =
            await connection.query(
                "SHOW INDEX FROM users WHERE Key_name = 'uq_users_phone'"
            );


        if (
            phoneIndexes.length === 0
        ) {

            console.log(
                "➕ Adding unique users.phone index..."
            );


            await connection.query(
                `
                    ALTER TABLE users
                    ADD UNIQUE INDEX uq_users_phone (phone)
                `
            );


            console.log(
                "✅ Unique users.phone index added."
            );

        } else {

            console.log(
                "ℹ️ Unique users.phone index already exists."
            );

        }


        // ========================================================
        // CREATE OTP CHALLENGES TABLE
        // ========================================================

        console.log(
            "🔎 Checking otp_challenges table..."
        );


        await connection.query(
            `
                CREATE TABLE IF NOT EXISTS otp_challenges (

                    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,

                    phone_e164 VARCHAR(20) NOT NULL,

                    purpose VARCHAR(40) NOT NULL,

                    otp_hash VARCHAR(255) NOT NULL,

                    expires_at DATETIME NOT NULL,

                    attempts INT UNSIGNED NOT NULL DEFAULT 0,

                    max_attempts INT UNSIGNED NOT NULL DEFAULT 5,

                    resend_count INT UNSIGNED NOT NULL DEFAULT 0,

                    last_sent_at DATETIME NOT NULL,

                    consumed_at DATETIME NULL,

                    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

                    PRIMARY KEY (id),

                    INDEX idx_otp_phone_purpose (
                        phone_e164,
                        purpose
                    ),

                    INDEX idx_otp_expires_at (
                        expires_at
                    ),

                    INDEX idx_otp_created_at (
                        created_at
                    ),

                    INDEX idx_otp_consumed_at (
                        consumed_at
                    )

                )
                ENGINE=InnoDB
                DEFAULT CHARSET=utf8mb4
                COLLATE=utf8mb4_unicode_ci
            `
        );


        console.log(
            "✅ otp_challenges table is ready."
        );


        // ========================================================
        // FINAL STRUCTURE VERIFICATION
        // ========================================================

        console.log(
            "🔎 Verifying users table..."
        );


        const [verifiedPhoneColumns] =
            await connection.query(
                "SHOW COLUMNS FROM users LIKE 'phone'"
            );


        if (
            verifiedPhoneColumns.length !== 1
        ) {

            throw new Error(
                "Final verification failed: users.phone is missing."
            );

        }


        const [verifiedPhoneVerifiedColumns] =
            await connection.query(
                "SHOW COLUMNS FROM users LIKE 'phone_verified_at'"
            );


        if (
            verifiedPhoneVerifiedColumns.length !== 1
        ) {

            throw new Error(
                "Final verification failed: users.phone_verified_at is missing."
            );

        }


        const [verifiedPhoneIndexes] =
            await connection.query(
                "SHOW INDEX FROM users WHERE Key_name = 'uq_users_phone'"
            );


        if (
            verifiedPhoneIndexes.length === 0
        ) {

            throw new Error(
                "Final verification failed: uq_users_phone index is missing."
            );

        }


        console.log(
            "✅ users.phone verified."
        );

        console.log(
            "✅ users.phone_verified_at verified."
        );

        console.log(
            "✅ uq_users_phone verified."
        );


        // ========================================================
        // VERIFY OTP TABLE
        // ========================================================

        console.log(
            "🔎 Verifying otp_challenges table..."
        );


        const [otpTables] =
            await connection.query(
                "SHOW TABLES LIKE 'otp_challenges'"
            );


        if (
            otpTables.length !== 1
        ) {

            throw new Error(
                "Final verification failed: otp_challenges table is missing."
            );

        }


        const [otpColumns] =
            await connection.query(
                "SHOW COLUMNS FROM otp_challenges"
            );


        const requiredOtpColumns = [

            "id",

            "phone_e164",

            "purpose",

            "otp_hash",

            "expires_at",

            "attempts",

            "max_attempts",

            "resend_count",

            "last_sent_at",

            "consumed_at",

            "created_at",

        ];


        const actualOtpColumns =
            otpColumns.map(
                (column) =>
                    column.Field
            );


        const missingOtpColumns =
            requiredOtpColumns.filter(
                (column) =>
                    !actualOtpColumns.includes(
                        column
                    )
            );


        if (
            missingOtpColumns.length > 0
        ) {

            throw new Error(
                `Final verification failed: otp_challenges is missing columns: ${missingOtpColumns.join(", ")}`
            );

        }


        console.log(
            "✅ otp_challenges table verified."
        );


        // ========================================================
        // SUCCESS
        // ========================================================

        console.log("");
        console.log(
            "============================================================"
        );
        console.log(
            "✅ DataLattice OTP infrastructure migration completed."
        );
        console.log(
            "============================================================"
        );
        console.log("");
        console.log(
            "Database infrastructure:"
        );
        console.log(
            "  • users.phone"
        );
        console.log(
            "  • users.phone_verified_at"
        );
        console.log(
            "  • uq_users_phone"
        );
        console.log(
            "  • otp_challenges"
        );
        console.log(
            "  • OTP lookup indexes"
        );
        console.log(
            "  • OTP expiration index"
        );
        console.log("");
        console.log(
            "No existing user records were modified."
        );
        console.log("");


    } catch (error) {

        console.error("");
        console.error(
            "============================================================"
        );
        console.error(
            "❌ DataLattice OTP migration failed."
        );
        console.error(
            "============================================================"
        );
        console.error(
            error.message
        );
        console.error("");


        process.exitCode = 1;


    } finally {

        if (connection) {

            await connection.end();

            console.log(
                "🔌 MySQL connection closed."
            );

        }

    }

};


// ============================================================
// EXECUTE
// ============================================================

runMigration();