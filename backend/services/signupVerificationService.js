const crypto = require("crypto");

const db = require("../database/db");


// ============================================================
// SIGNUP VERIFICATION CONFIGURATION
// ============================================================

const SIGNUP_VERIFICATION_EXPIRY_MINUTES = 10;

const SIGNUP_VERIFICATION_TOKEN_BYTES = 32;


// ============================================================
// DATABASE QUERY HELPER
// ============================================================
//
// The existing database connection uses the callback-style
// mysql2 API. This helper allows this service to use async/await
// without changing the shared database configuration.
// ============================================================

const query = (
    sql,
    parameters = []
) => {

    return new Promise(
        (
            resolve,
            reject
        ) => {

            db.query(
                sql,
                parameters,
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


// ============================================================
// TOKEN GENERATION
// ============================================================

const generateVerificationToken = () => {

    return crypto.randomBytes(
        SIGNUP_VERIFICATION_TOKEN_BYTES
    ).toString("hex");

};


// ============================================================
// TOKEN HASHING
// ============================================================

const hashVerificationToken = (
    token
) => {

    if (
        typeof token !== "string" ||
        token.trim().length === 0
    ) {

        throw new Error(
            "Signup verification token is required."
        );

    }


    return crypto
        .createHash("sha256")
        .update(
            token.trim(),
            "utf8"
        )
        .digest("hex");

};


// ============================================================
// DATE HELPERS
// ============================================================

const getFutureDate = (
    minutes
) => {

    const date =
        new Date();


    date.setMinutes(
        date.getMinutes() +
        minutes
    );


    return date;

};


// ============================================================
// MYSQL DATETIME FORMATTER
// ============================================================

const toMysqlDateTime = (
    date
) => {

    const pad = (
        value
    ) =>
        String(value)
            .padStart(
                2,
                "0"
            );


    return (

        `${date.getFullYear()}-` +
        `${pad(date.getMonth() + 1)}-` +
        `${pad(date.getDate())} ` +
        `${pad(date.getHours())}:` +
        `${pad(date.getMinutes())}:` +
        `${pad(date.getSeconds())}`

    );

};


// ============================================================
// INVALIDATE PREVIOUS VERIFICATION PROOFS
// ============================================================

const invalidatePreviousVerifications = async (
    phone
) => {

    await query(
        `
            UPDATE signup_phone_verifications

            SET consumed_at = CURRENT_TIMESTAMP

            WHERE phone_e164 = ?

            AND consumed_at IS NULL
        `,
        [
            phone,
        ]
    );

};


// ============================================================
// CREATE SIGNUP VERIFICATION PROOF
// ============================================================

const createVerificationProof = async (
    phone
) => {

    if (
        typeof phone !== "string" ||
        phone.trim().length === 0
    ) {

        throw new Error(
            "Phone number is required."
        );

    }


    const normalizedPhone =
        phone.trim();


    // --------------------------------------------------------
    // Only the newest successful OTP verification should
    // produce a valid signup proof.
    // --------------------------------------------------------

    await invalidatePreviousVerifications(
        normalizedPhone
    );


    // --------------------------------------------------------
    // Generate a high-entropy random token.
    //
    // The raw token is returned only to the caller.
    // The database receives only its SHA-256 hash.
    // --------------------------------------------------------

    const verificationToken =
        generateVerificationToken();


    const verificationTokenHash =
        hashVerificationToken(
            verificationToken
        );


    const expiresAt =
        getFutureDate(
            SIGNUP_VERIFICATION_EXPIRY_MINUTES
        );


    // --------------------------------------------------------
    // Store the verification proof.
    // --------------------------------------------------------

    const result =
        await query(
            `
                INSERT INTO signup_phone_verifications

                (
                    phone_e164,
                    verification_token_hash,
                    expires_at
                )

                VALUES

                (
                    ?,
                    ?,
                    ?
                )
            `,
            [
                normalizedPhone,

                verificationTokenHash,

                toMysqlDateTime(
                    expiresAt
                ),
            ]
        );


    return {

        id:
            result.insertId,

        phone:
            normalizedPhone,

        verificationToken,

        expiresAt,

    };

};


// ============================================================
// FIND ACTIVE VERIFICATION PROOF
// ============================================================

const findActiveVerification = async ({
    phone,
    verificationToken,
}) => {

    const verificationTokenHash =
        hashVerificationToken(
            verificationToken
        );


    const rows =
        await query(
            `
                SELECT

                    id,

                    phone_e164,

                    verification_token_hash,

                    expires_at,

                    consumed_at,

                    created_at

                FROM signup_phone_verifications

                WHERE phone_e164 = ?

                AND verification_token_hash = ?

                AND consumed_at IS NULL

                ORDER BY id DESC

                LIMIT 1
            `,
            [
                phone,

                verificationTokenHash,
            ]
        );


    return rows[0] || null;

};


// ============================================================
// CONSUME VERIFICATION PROOF
// ============================================================

const consumeVerification = async (
    verificationId
) => {

    return query(
        `
            UPDATE signup_phone_verifications

            SET consumed_at = CURRENT_TIMESTAMP

            WHERE id = ?

            AND consumed_at IS NULL
        `,
        [
            verificationId,
        ]
    );

};


// ============================================================
// VERIFY SIGNUP VERIFICATION PROOF
// ============================================================

const verifyVerificationProof = async ({
    phone,
    verificationToken,
}) => {

    if (
        typeof phone !== "string" ||
        phone.trim().length === 0
    ) {

        const error =
            new Error(
                "Phone number is required."
            );


        error.code =
            "SIGNUP_VERIFICATION_PHONE_REQUIRED";


        throw error;

    }


    if (
        typeof verificationToken !== "string" ||
        verificationToken.trim().length === 0
    ) {

        const error =
            new Error(
                "Signup verification proof is required."
            );


        error.code =
            "SIGNUP_VERIFICATION_TOKEN_REQUIRED";


        throw error;

    }


    const normalizedPhone =
        phone.trim();


    const verification =
        await findActiveVerification({

            phone:
                normalizedPhone,

            verificationToken,

        });


    if (
        !verification
    ) {

        const error =
            new Error(
                "Phone verification is invalid or has expired."
            );


        error.code =
            "SIGNUP_VERIFICATION_INVALID";


        throw error;

    }


    // --------------------------------------------------------
    // Expiration check
    // --------------------------------------------------------

    const expiresAt =
        new Date(
            verification.expires_at
        );


    if (
        expiresAt <=
        new Date()
    ) {

        await consumeVerification(
            verification.id
        );


        const error =
            new Error(
                "Phone verification has expired. Please verify your phone again."
            );


        error.code =
            "SIGNUP_VERIFICATION_EXPIRED";


        throw error;

    }


    return {

        verified:
            true,

        verificationId:
            verification.id,

        phone:
            verification.phone_e164,

        expiresAt:
            verification.expires_at,

    };

};


// ============================================================
// CONSUME VERIFIED SIGNUP PROOF
// ============================================================
//
// This must be called after the user has been successfully
// created.
//
// The conditional UPDATE prevents the same verification proof
// from being consumed twice.
// ============================================================

const consumeVerifiedProof = async (
    verificationId
) => {

    const result =
        await consumeVerification(
            verificationId
        );


    if (
        !result ||
        result.affectedRows !== 1
    ) {

        const error =
            new Error(
                "Signup verification proof could not be consumed."
            );


        error.code =
            "SIGNUP_VERIFICATION_CONSUME_FAILED";


        throw error;

    }


    return {

        consumed:
            true,

        verificationId,

    };

};


// ============================================================
// EXPORTS
// ============================================================

module.exports = {

    SIGNUP_VERIFICATION_EXPIRY_MINUTES,

    SIGNUP_VERIFICATION_TOKEN_BYTES,

    generateVerificationToken,

    hashVerificationToken,

    createVerificationProof,

    verifyVerificationProof,

    consumeVerifiedProof,

};