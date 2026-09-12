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
            "DataLattice - Signup Phone Verification Migration"
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
                "The users table does not exist."
            );

        }


        console.log(
            "Existing users table found."
        );


        // ========================================================
        // CREATE SIGNUP VERIFICATION TABLE
        // ========================================================

        await connection.query(
            `
                CREATE TABLE IF NOT EXISTS signup_phone_verifications (

                    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,

                    phone_e164 VARCHAR(20) NOT NULL,

                    verification_token_hash CHAR(64) NOT NULL,

                    expires_at DATETIME NOT NULL,

                    consumed_at DATETIME NULL,

                    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

                    PRIMARY KEY (id),

                    UNIQUE INDEX uq_signup_verification_token_hash (
                        verification_token_hash
                    ),

                    INDEX idx_signup_verification_phone (
                        phone_e164
                    ),

                    INDEX idx_signup_verification_expires_at (
                        expires_at
                    ),

                    INDEX idx_signup_verification_consumed_at (
                        consumed_at
                    ),

                    INDEX idx_signup_verification_phone_consumed (
                        phone_e164,
                        consumed_at
                    )

                )
                ENGINE=InnoDB
                DEFAULT CHARSET=utf8mb4
                COLLATE=utf8mb4_unicode_ci
            `
        );


        console.log(
            "signup_phone_verifications table is ready."
        );


        // ========================================================
        // FINAL STRUCTURE VERIFICATION
        // ========================================================

        const [tables] =
            await connection.query(
                "SHOW TABLES LIKE 'signup_phone_verifications'"
            );


        if (
            tables.length !== 1
        ) {

            throw new Error(
                "Final verification failed: signup_phone_verifications table is missing."
            );

        }


        const [columns] =
            await connection.query(
                "SHOW COLUMNS FROM signup_phone_verifications"
            );


        const requiredColumns = [

            "id",

            "phone_e164",

            "verification_token_hash",

            "expires_at",

            "consumed_at",

            "created_at",

        ];


        const actualColumns =
            columns.map(
                (column) =>
                    column.Field
            );


        const missingColumns =
            requiredColumns.filter(
                (column) =>
                    !actualColumns.includes(
                        column
                    )
            );


        if (
            missingColumns.length > 0
        ) {

            throw new Error(
                `Final verification failed: missing columns: ${missingColumns.join(", ")}`
            );

        }


        console.log(
            "signup_phone_verifications structure verified."
        );


        // ========================================================
        // SUCCESS
        // ========================================================

        console.log("");
        console.log(
            "============================================================"
        );
        console.log(
            "DataLattice signup verification migration completed."
        );
        console.log(
            "============================================================"
        );
        console.log("");


    } catch (error) {

        console.error("");
        console.error(
            "============================================================"
        );
        console.error(
            "Signup verification migration failed."
        );
        console.error(
            "============================================================"
        );

        console.error(
            error.message
        );

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