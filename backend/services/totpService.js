// ======================================
// DataLattice - TOTP Authenticator Service
// ======================================

const {
    generateSecret,
    generateURI,
    verify,
} = require("otplib");

const db =
    require("../database/db");

const {
    encryptTotpSecret,
    decryptTotpSecret,
} =
    require("../utils/totpEncryption");
    
// ======================================
// CONFIGURATION
// ======================================

const TOTP_ISSUER =
    process.env.TOTP_ISSUER ||
    "DataLattice";

const TOTP_ALGORITHM =
    "sha1";

const TOTP_DIGITS =
    6;

const TOTP_PERIOD =
    30;

// ======================================
// DATABASE PROMISE WRAPPER
// ======================================
//
// The existing LMS database connection uses
// callback-based mysql2 queries.
//
// Do NOT change database/db.js globally.
// TOTP uses this local Promise wrapper so that
// async/await can safely be used here.
//

const query =
    (
        sql,
        params = []
    ) => {

        return new Promise(
            (
                resolve,
                reject
            ) => {

                db.query(
                    sql,
                    params,
                    (
                        error,
                        results
                    ) => {

                        if (error) {

                            return reject(
                                error
                            );

                        }

                        resolve(
                            results
                        );

                    }
                );

            }
        );

    };

// ======================================
// VALIDATION HELPERS
// ======================================

const normalizeUserId =
    (userId) => {

        const parsedUserId =
            Number(userId);

        if (
            !Number.isInteger(
                parsedUserId
            ) ||
            parsedUserId <= 0
        ) {

            throw new Error(
                "Invalid user ID"
            );

        }

        return parsedUserId;

    };

const normalizeOtp =
    (otp) => {

        return String(
            otp || ""
        )
            .replace(/\s+/g, "")
            .trim();

    };

// ======================================
// FIND USER
// ======================================

const findUserById =
    async (
        userId
    ) => {

        const normalizedUserId =
            normalizeUserId(
                userId
            );

        const rows =
            await query(
                `
                SELECT
                    id,
                    full_name,
                    email,
                    role
                FROM users
                WHERE id = ?
                LIMIT 1
                `,
                [
                    normalizedUserId
                ]
            );

        if (
            rows.length === 0
        ) {

            throw new Error(
                "User not found"
            );

        }

        return rows[0];

    };

// ======================================
// FIND TOTP RECORD
// ======================================

const findTotpByUserId =
    async (
        userId
    ) => {

        const normalizedUserId =
            normalizeUserId(
                userId
            );

        const rows =
            await query(
                `
                SELECT
                    id,
                    user_id,
                    encrypted_secret,
                    enabled,
                    verified_at,
                    last_used_at,
                    created_at,
                    updated_at
                FROM user_totp
                WHERE user_id = ?
                LIMIT 1
                `,
                [
                    normalizedUserId
                ]
            );

        if (
            rows.length === 0
        ) {

            return null;

        }

        return rows[0];

    };

// ======================================
// CREATE TOTP SETUP
// ======================================

const createTotpSetup =
    async (
        userId
    ) => {

        const user =
            await findUserById(
                userId
            );

        const existing =
            await findTotpByUserId(
                user.id
            );

        if (
            existing &&
            Number(
                existing.enabled
            ) === 1
        ) {

            const error =
                new Error(
                    "Authenticator is already enabled"
                );

            error.code =
                "TOTP_ALREADY_ENABLED";

            throw error;

        }

        // ----------------------------------
        // Generate a unique authenticator
        // secret for this user.
        // ----------------------------------

        const secret =
            generateSecret();

        // ----------------------------------
        // Encrypt the secret before storing.
        // The plaintext secret is never stored.
        // ----------------------------------

        const encryptedSecret =
            encryptTotpSecret(
                secret
            );

        // ----------------------------------
        // Authenticator account label
        // ----------------------------------

        const accountName =
            user.email;

        // ----------------------------------
        // Generate standard otpauth URI.
        // Google Authenticator and compatible
        // authenticator applications can use it.
        // ----------------------------------

        const otpauthUri =
            generateURI({
                issuer:
                    TOTP_ISSUER,

                label:
                    accountName,

                secret,

                algorithm:
                    TOTP_ALGORITHM,

                digits:
                    TOTP_DIGITS,

                period:
                    TOTP_PERIOD,
            });

        // ----------------------------------
        // Store or replace pending setup.
        // ----------------------------------

        if (existing) {

            await query(
                `
                UPDATE user_totp
                SET
                    encrypted_secret = ?,
                    enabled = 0,
                    verified_at = NULL,
                    last_used_at = NULL,
                    updated_at = CURRENT_TIMESTAMP
                WHERE user_id = ?
                `,
                [
                    encryptedSecret,
                    user.id
                ]
            );

        } else {

            await query(
                `
                INSERT INTO user_totp (
                    user_id,
                    encrypted_secret,
                    enabled,
                    verified_at,
                    last_used_at
                )
                VALUES (
                    ?,
                    ?,
                    0,
                    NULL,
                    NULL
                )
                `,
                [
                    user.id,
                    encryptedSecret
                ]
            );

        }

        return {

            userId:
                user.id,

            issuer:
                TOTP_ISSUER,

            accountName,

            otpauthUri,

        };

    };

// ======================================
// VERIFY TOTP SETUP
// ======================================

const verifyTotpSetup =
    async (
        userId,
        otp
    ) => {

        const normalizedUserId =
            normalizeUserId(
                userId
            );

        const normalizedOtp =
            normalizeOtp(
                otp
            );

        if (
            !/^\d{6}$/.test(
                normalizedOtp
            )
        ) {

            const error =
                new Error(
                    "Authenticator code must contain exactly 6 digits"
                );

            error.code =
                "TOTP_INVALID_FORMAT";

            throw error;

        }

        const record =
            await findTotpByUserId(
                normalizedUserId
            );

        if (!record) {

            const error =
                new Error(
                    "Authenticator setup has not been started"
                );

            error.code =
                "TOTP_SETUP_NOT_FOUND";

            throw error;

        }

        const secret =
            decryptTotpSecret(
                record.encrypted_secret
            );

        const verification =
            await verify({
                secret,
                token:
                    normalizedOtp,

                algorithm:
                    TOTP_ALGORITHM,

                digits:
                    TOTP_DIGITS,

                period:
                    TOTP_PERIOD,
            });

        const isValid =
            typeof verification === "boolean"
                ? verification
                : Boolean(
                    verification.valid
                );

        if (!isValid) {

            const error =
                new Error(
                    "Invalid authenticator code"
                );

            error.code =
                "TOTP_INVALID";

            throw error;

        }

        await query(
            `
            UPDATE user_totp
            SET
                enabled = 1,
                verified_at = CURRENT_TIMESTAMP,
                last_used_at = CURRENT_TIMESTAMP,
                updated_at = CURRENT_TIMESTAMP
            WHERE user_id = ?
            `,
            [
                normalizedUserId
            ]
        );

        return {

            success:
                true,

            enabled:
                true,

            verifiedAt:
                new Date(),

        };

    };

// ======================================
// VERIFY ENABLED TOTP
// ======================================

const verifyTotp =
    async (
        userId,
        otp
    ) => {

        const normalizedUserId =
            normalizeUserId(
                userId
            );

        const normalizedOtp =
            normalizeOtp(
                otp
            );

        if (
            !/^\d{6}$/.test(
                normalizedOtp
            )
        ) {

            const error =
                new Error(
                    "Authenticator code must contain exactly 6 digits"
                );

            error.code =
                "TOTP_INVALID_FORMAT";

            throw error;

        }

        const record =
            await findTotpByUserId(
                normalizedUserId
            );

        if (
            !record ||
            Number(
                record.enabled
            ) !== 1
        ) {

            const error =
                new Error(
                    "Authenticator is not enabled"
                );

            error.code =
                "TOTP_NOT_ENABLED";

            throw error;

        }

        const secret =
            decryptTotpSecret(
                record.encrypted_secret
            );

        const verification =
            await verify({
                secret,
                token:
                    normalizedOtp,

                algorithm:
                    TOTP_ALGORITHM,

                digits:
                    TOTP_DIGITS,

                period:
                    TOTP_PERIOD,
            });

        const isValid =
            typeof verification === "boolean"
                ? verification
                : Boolean(
                    verification.valid
                );

        if (!isValid) {

            const error =
                new Error(
                    "Invalid authenticator code"
                );

            error.code =
                "TOTP_INVALID";

            throw error;

        }

        await query(
            `
            UPDATE user_totp
            SET
                last_used_at = CURRENT_TIMESTAMP,
                updated_at = CURRENT_TIMESTAMP
            WHERE user_id = ?
            `,
            [
                normalizedUserId
            ]
        );

        return {

            success:
                true,

            verified:
                true,

        };

    };

// ======================================
// GET TOTP STATUS
// ======================================

const getTotpStatus =
    async (
        userId
    ) => {

        const normalizedUserId =
            normalizeUserId(
                userId
            );

        const record =
            await findTotpByUserId(
                normalizedUserId
            );

        if (!record) {

            return {

                enabled:
                    false,

                configured:
                    false,

                verifiedAt:
                    null,

            };

        }

        return {

            enabled:
                Number(
                    record.enabled
                ) === 1,

            configured:
                true,

            verifiedAt:
                record.verified_at ||
                null,

        };

    };

// ======================================
// DISABLE TOTP
// ======================================

const disableTotp =
    async (
        userId
    ) => {

        const normalizedUserId =
            normalizeUserId(
                userId
            );

        await query(
            `
            DELETE FROM user_totp
            WHERE user_id = ?
            `,
            [
                normalizedUserId
            ]
        );

        return {

            success:
                true,

            enabled:
                false,

        };

    };

// ======================================
// EXPORTS
// ======================================

module.exports = {

    createTotpSetup,

    verifyTotpSetup,

    verifyTotp,

    getTotpStatus,

    disableTotp,

};