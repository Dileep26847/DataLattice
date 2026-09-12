const mysql = require("mysql2/promise");
const path = require("path");

require("dotenv").config({
    path: path.resolve(__dirname, "../../.env"),
});


// ============================================================
// DATABASE CONFIGURATION
// ============================================================

const databaseConfig = {
    host: process.env.DB_HOST,

    port: Number(
        process.env.DB_PORT ||
        3306
    ),

    user: process.env.DB_USER,

    password: process.env.DB_PASSWORD,

    database: process.env.DB_NAME,
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
            "DataLattice - TOTP Authenticator Infrastructure Migration"
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
            "MySQL connection established."
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
            "Existing users table found."
        );


        // ========================================================
        // CHECK USER ID COLUMN
        // ========================================================

        const [userIdColumns] =
            await connection.query(
                "SHOW COLUMNS FROM users LIKE 'id'"
            );


        if (
            userIdColumns.length === 0
        ) {

            throw new Error(
                "The users table does not contain the required id column."
            );

        }


        console.log(
            "users.id verified."
        );


        // ========================================================
        // CREATE USER TOTP TABLE
        // ========================================================

        console.log(
            "Checking user_totp table..."
        );


        await connection.query(
            `
                CREATE TABLE IF NOT EXISTS user_totp (

                    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,

                    user_id INT NOT NULL,

                    encrypted_secret TEXT NOT NULL,

                    enabled TINYINT(1) NOT NULL DEFAULT 0,

                    verified_at DATETIME NULL,

                    last_used_at DATETIME NULL,

                    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

                    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
                        ON UPDATE CURRENT_TIMESTAMP,

                    PRIMARY KEY (id),

                    UNIQUE INDEX uq_user_totp_user_id (
                        user_id
                    ),

                    CONSTRAINT fk_user_totp_user
                        FOREIGN KEY (user_id)
                        REFERENCES users(id)
                        ON DELETE CASCADE
                        ON UPDATE CASCADE,

                    INDEX idx_user_totp_enabled (
                        enabled
                    ),

                    INDEX idx_user_totp_verified_at (
                        verified_at
                    )

                )
                ENGINE=InnoDB
                DEFAULT CHARSET=utf8mb4
                COLLATE=utf8mb4_unicode_ci
            `
        );


        console.log(
            "user_totp table is ready."
        );


        // ========================================================
        // FINAL STRUCTURE VERIFICATION
        // ========================================================

        console.log(
            "Verifying user_totp table..."
        );


        const [totpTables] =
            await connection.query(
                "SHOW TABLES LIKE 'user_totp'"
            );


        if (
            totpTables.length !== 1
        ) {

            throw new Error(
                "Final verification failed: user_totp table is missing."
            );

        }


        const [totpColumns] =
            await connection.query(
                "SHOW COLUMNS FROM user_totp"
            );


        const requiredTotpColumns = [

            "id",

            "user_id",

            "encrypted_secret",

            "enabled",

            "verified_at",

            "last_used_at",

            "created_at",

            "updated_at",

        ];


        const actualTotpColumns =
            totpColumns.map(
                (column) =>
                    column.Field
            );


        const missingTotpColumns =
            requiredTotpColumns.filter(
                (column) =>
                    !actualTotpColumns.includes(
                        column
                    )
            );


        if (
            missingTotpColumns.length > 0
        ) {

            throw new Error(
                `Final verification failed: user_totp is missing columns: ${missingTotpColumns.join(", ")}`
            );

        }


        // ========================================================
        // VERIFY UNIQUE USER INDEX
        // ========================================================

        const [totpIndexes] =
            await connection.query(
                "SHOW INDEX FROM user_totp WHERE Key_name = 'uq_user_totp_user_id'"
            );


        if (
            totpIndexes.length === 0
        ) {

            throw new Error(
                "Final verification failed: uq_user_totp_user_id index is missing."
            );

        }


        console.log(
            "user_totp columns verified."
        );

        console.log(
            "uq_user_totp_user_id verified."
        );


        // ========================================================
        // SUCCESS
        // ========================================================

        console.log("");
        console.log(
            "============================================================"
        );
        console.log(
            "DataLattice TOTP infrastructure migration completed."
        );
        console.log(
            "============================================================"
        );
        console.log("");
        console.log(
            "Database infrastructure:"
        );
        console.log(
            "  - user_totp"
        );
        console.log(
            "  - encrypted TOTP secret storage"
        );
        console.log(
            "  - one TOTP configuration per user"
        );
        console.log(
            "  - enabled state"
        );
        console.log(
            "  - verification timestamp"
        );
        console.log(
            "  - last-used timestamp"
        );
        console.log(
            "  - user foreign-key relationship"
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
            "TOTP infrastructure migration failed."
        );
        console.error(
            "============================================================"
        );
        console.error("");
        console.error(error);
        console.error("");

        process.exitCode = 1;

    } finally {

        if (
            connection
        ) {

            await connection.end();

        }

    }

};


// ============================================================
// RUN MIGRATION
// ============================================================

runMigration();