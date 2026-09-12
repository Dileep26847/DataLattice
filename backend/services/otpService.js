const crypto = require("crypto");

const db = require("../database/db");

const signupVerificationService =
    require("./signupVerificationService");


// ============================================================
// OTP CONFIGURATION
// ============================================================

const OTP_LENGTH = 6;

const OTP_EXPIRY_MINUTES = 5;

const OTP_RESEND_COOLDOWN_SECONDS = 60;

const OTP_MAX_ATTEMPTS = 5;

const OTP_PURPOSE_SIGNUP =
    "signup_phone_verification";


// ============================================================
// PHONE NORMALIZATION
// ============================================================

const normalizePhoneNumber = (phone) => {

    if (
        typeof phone !== "string"
    ) {

        throw new Error(
            "Phone number must be a string."
        );

    }


    let normalized =
        phone.trim();


    // --------------------------------------------------------
    // Remove common formatting characters.
    // --------------------------------------------------------

    normalized =
        normalized.replace(
            /[\s().-]/g,
            ""
        );


    // --------------------------------------------------------
    // Convert 00-prefixed international numbers.
    // Example:
    // 0091XXXXXXXXXX
    // → +91XXXXXXXXXX
    // --------------------------------------------------------

    if (
        normalized.startsWith("00")
    ) {

        normalized =
            `+${normalized.slice(2)}`;

    }


    // --------------------------------------------------------
    // Require international format.
    // --------------------------------------------------------

    if (
        !normalized.startsWith("+")
    ) {

        throw new Error(
            "Phone number must include the international country code."
        );

    }


    // --------------------------------------------------------
    // E.164-compatible practical validation.
    //
    // E.164:
    // + followed by 8-15 digits.
    // --------------------------------------------------------

    if (
        !/^\+[1-9]\d{7,14}$/.test(
            normalized
        )
    ) {

        throw new Error(
            "Please enter a valid international phone number."
        );

    }


    return normalized;

};


// ============================================================
// OTP GENERATION
// ============================================================

const generateOtp = () => {

    const minimum =
        10 ** (OTP_LENGTH - 1);

    const maximum =
        10 ** OTP_LENGTH;


    return crypto
        .randomInt(
            minimum,
            maximum
        )
        .toString();

};


// ============================================================
// OTP HASHING
// ============================================================

const hashOtp = (
    phone,
    otp
) => {

    const secret =
        process.env.OTP_HASH_SECRET ||
        process.env.JWT_SECRET;


    if (!secret) {

        throw new Error(
            "OTP_HASH_SECRET is not configured."
        );

    }


    return crypto
        .createHmac(
            "sha256",
            secret
        )
        .update(
            `${phone}:${otp}`
        )
        .digest("hex");

};


// ============================================================
// OTP COMPARISON
// ============================================================

const compareOtp = (
    phone,
    otp,
    storedHash
) => {

    const calculatedHash =
        hashOtp(
            phone,
            otp
        );


    const calculatedBuffer =
        Buffer.from(
            calculatedHash,
            "utf8"
        );


    const storedBuffer =
        Buffer.from(
            storedHash,
            "utf8"
        );


    if (
        calculatedBuffer.length !==
        storedBuffer.length
    ) {

        return false;

    }


    return crypto.timingSafeEqual(
        calculatedBuffer,
        storedBuffer
    );

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


const getCooldownDate = (
    seconds
) => {

    const date =
        new Date();


    date.setSeconds(
        date.getSeconds() +
        seconds
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
// FIND ACTIVE CHALLENGE
// ============================================================

const findActiveChallenge = (
    phone,
    purpose
) => {

    return new Promise(
        (
            resolve,
            reject
        ) => {

            const sql = `

                SELECT

                    id,

                    phone_e164,

                    purpose,

                    otp_hash,

                    expires_at,

                    attempts,

                    max_attempts,

                    resend_count,

                    last_sent_at,

                    consumed_at,

                    created_at

                FROM otp_challenges

                WHERE phone_e164 = ?

                AND purpose = ?

                AND consumed_at IS NULL

                ORDER BY id DESC

                LIMIT 1

            `;


            db.query(
                sql,
                [
                    phone,
                    purpose,
                ],
                (
                    error,
                    rows
                ) => {

                    if (error) {

                        return reject(
                            error
                        );

                    }


                    resolve(
                        rows[0] ||
                        null
                    );

                }
            );

        }
    );

};


// ============================================================
// INVALIDATE ACTIVE CHALLENGES
// ============================================================

const invalidateActiveChallenges = (
    phone,
    purpose
) => {

    return new Promise(
        (
            resolve,
            reject
        ) => {

            const sql = `

                UPDATE otp_challenges

                SET consumed_at = CURRENT_TIMESTAMP

                WHERE phone_e164 = ?

                AND purpose = ?

                AND consumed_at IS NULL

            `;


            db.query(
                sql,
                [
                    phone,
                    purpose,
                ],
                (
                    error,
                    result
                ) => {

                    if (error) {

                        return reject(
                            error
                        );

                    }


                    resolve(
                        result
                    );

                }
            );

        }
    );

};


// ============================================================
// CREATE OTP CHALLENGE
// ============================================================

const createChallenge = ({
    phone,
    purpose = OTP_PURPOSE_SIGNUP,
}) => {

    return new Promise(
        (
            resolve,
            reject
        ) => {

            const otp =
                generateOtp();


            const otpHash =
                hashOtp(
                    phone,
                    otp
                );


            const expiresAt =
                getFutureDate(
                    OTP_EXPIRY_MINUTES
                );


            const lastSentAt =
                new Date();


            const sql = `

                INSERT INTO otp_challenges

                (
                    phone_e164,
                    purpose,
                    otp_hash,
                    expires_at,
                    attempts,
                    max_attempts,
                    resend_count,
                    last_sent_at
                )

                VALUES

                (
                    ?,
                    ?,
                    ?,
                    ?,
                    0,
                    ?,
                    0,
                    ?
                )

            `;


            db.query(
                sql,
                [
                    phone,
                    purpose,
                    otpHash,
                    toMysqlDateTime(
                        expiresAt
                    ),
                    OTP_MAX_ATTEMPTS,
                    toMysqlDateTime(
                        lastSentAt
                    ),
                ],
                (
                    error,
                    result
                ) => {

                    if (error) {

                        return reject(
                            error
                        );

                    }


                    resolve({

                        id:
                            result.insertId,

                        otp,

                        expiresAt,

                    });

                }
            );

        }
    );

};


// ============================================================
// REQUEST OTP
// ============================================================

const requestOtp = async ({
    phone,
    purpose = OTP_PURPOSE_SIGNUP,
}) => {

    const normalizedPhone =
        normalizePhoneNumber(
            phone
        );


    // --------------------------------------------------------
    // Check the latest active challenge.
    // --------------------------------------------------------

    const existingChallenge =
        await findActiveChallenge(
            normalizedPhone,
            purpose
        );


    if (
        existingChallenge
    ) {

        const lastSentAt =
            new Date(
                existingChallenge.last_sent_at
            );


        const cooldownUntil =
            new Date(
                lastSentAt.getTime() +
                (
                    OTP_RESEND_COOLDOWN_SECONDS *
                    1000
                )
            );


        const now =
            new Date();


        if (
            cooldownUntil >
            now
        ) {

            const remainingSeconds =
                Math.ceil(
                    (
                        cooldownUntil.getTime() -
                        now.getTime()
                    ) /
                    1000
                );


            const error =
                new Error(
                    `Please wait ${remainingSeconds} seconds before requesting another OTP.`
                );


            error.code =
                "OTP_RESEND_COOLDOWN";


            error.retryAfterSeconds =
                remainingSeconds;


            throw error;

        }

    }


    // --------------------------------------------------------
    // Invalidate previous active challenge.
    //
    // Only the newest OTP remains valid.
    // --------------------------------------------------------

    await invalidateActiveChallenges(
        normalizedPhone,
        purpose
    );


    // --------------------------------------------------------
    // Create new challenge.
    // --------------------------------------------------------

    const challenge =
        await createChallenge({

            phone:
                normalizedPhone,

            purpose,

        });


    return {

        challengeId:
            challenge.id,

        phone:
            normalizedPhone,

        expiresAt:
            challenge.expiresAt,

        // IMPORTANT:
        // The OTP is returned internally so that the
        // delivery provider can deliver it.
        //
        // The controller must NEVER expose this
        // value to the browser.
        otp:
            challenge.otp,

    };

};


// ============================================================
// INCREMENT ATTEMPTS
// ============================================================

const incrementAttempts = (
    challengeId
) => {

    return new Promise(
        (
            resolve,
            reject
        ) => {

            const sql = `

                UPDATE otp_challenges

                SET attempts = attempts + 1

                WHERE id = ?

                AND consumed_at IS NULL

            `;


            db.query(
                sql,
                [
                    challengeId,
                ],
                (
                    error,
                    result
                ) => {

                    if (error) {

                        return reject(
                            error
                        );

                    }


                    resolve(
                        result
                    );

                }
            );

        }
    );

};


// ============================================================
// CONSUME CHALLENGE
// ============================================================

const consumeChallenge = (
    challengeId
) => {

    return new Promise(
        (
            resolve,
            reject
        ) => {

            const sql = `

                UPDATE otp_challenges

                SET consumed_at = CURRENT_TIMESTAMP

                WHERE id = ?

                AND consumed_at IS NULL

            `;


            db.query(
                sql,
                [
                    challengeId,
                ],
                (
                    error,
                    result
                ) => {

                    if (error) {

                        return reject(
                            error
                        );

                    }


                    resolve(
                        result
                    );

                }
            );

        }
    );

};


// ============================================================
// MARK PHONE AS VERIFIED
// ============================================================
//
// This helper is intentionally retained for existing code
// compatibility.
//
// Signup verification itself no longer calls this function
// because a signup user does not exist yet at OTP verification
// time.
//
// The registration workflow will mark the newly created user
// as verified after validating the signup verification proof.
// ============================================================

const markPhoneVerified = (
    phone
) => {

    return new Promise(
        (
            resolve,
            reject
        ) => {

            const sql = `

                UPDATE users

                SET

                    phone_verified_at =
                        CURRENT_TIMESTAMP

                WHERE phone = ?

            `;


            db.query(
                sql,
                [
                    phone,
                ],
                (
                    error,
                    result
                ) => {

                    if (error) {

                        return reject(
                            error
                        );

                    }


                    resolve(
                        result
                    );

                }
            );

        }
    );

};


// ============================================================
// VERIFY OTP
// ============================================================

const verifyOtp = async ({
    phone,
    otp,
    purpose = OTP_PURPOSE_SIGNUP,
}) => {

    const normalizedPhone =
        normalizePhoneNumber(
            phone
        );


    if (
        typeof otp !== "string" &&
        typeof otp !== "number"
    ) {

        const error =
            new Error(
                "OTP is required."
            );


        error.code =
            "OTP_REQUIRED";


        throw error;

    }


    const normalizedOtp =
        String(
            otp
        ).trim();


    if (
        !/^\d{6}$/.test(
            normalizedOtp
        )
    ) {

        const error =
            new Error(
                "Please enter a valid 6-digit OTP."
            );


        error.code =
            "OTP_INVALID_FORMAT";


        throw error;

    }


    const challenge =
        await findActiveChallenge(
            normalizedPhone,
            purpose
        );


    if (
        !challenge
    ) {

        const error =
            new Error(
                "OTP is invalid or has expired."
            );


        error.code =
            "OTP_NOT_FOUND";


        throw error;

    }


    // --------------------------------------------------------
    // Expiration check
    // --------------------------------------------------------

    const expiresAt =
        new Date(
            challenge.expires_at
        );


    if (
        expiresAt <=
        new Date()
    ) {

        await consumeChallenge(
            challenge.id
        );


        const error =
            new Error(
                "OTP has expired. Please request a new OTP."
            );


        error.code =
            "OTP_EXPIRED";


        throw error;

    }


    // --------------------------------------------------------
    // Attempt limit
    // --------------------------------------------------------

    if (
        Number(
            challenge.attempts
        ) >=
        Number(
            challenge.max_attempts
        )
    ) {

        await consumeChallenge(
            challenge.id
        );


        const error =
            new Error(
                "Too many incorrect OTP attempts. Please request a new OTP."
            );


        error.code =
            "OTP_ATTEMPTS_EXCEEDED";


        throw error;

    }


    // --------------------------------------------------------
    // Verify OTP
    // --------------------------------------------------------

    const isValid =
        compareOtp(
            normalizedPhone,
            normalizedOtp,
            challenge.otp_hash
        );


    if (!isValid) {

        await incrementAttempts(
            challenge.id
        );


        const attemptsUsed =
            Number(
                challenge.attempts
            ) + 1;


        const attemptsRemaining =
            Math.max(
                Number(
                    challenge.max_attempts
                ) -
                attemptsUsed,
                0
            );


        if (
            attemptsRemaining === 0
        ) {

            await consumeChallenge(
                challenge.id
            );

        }


        const error =
            new Error(
                attemptsRemaining === 0
                    ? "Too many incorrect OTP attempts. Please request a new OTP."
                    : "Incorrect OTP. Please try again."
            );


        error.code =
            attemptsRemaining === 0
                ? "OTP_ATTEMPTS_EXCEEDED"
                : "OTP_INVALID";


        error.attemptsRemaining =
            attemptsRemaining;


        throw error;

    }


    // --------------------------------------------------------
    // Atomically consume the OTP challenge.
    //
    // This prevents a previously valid OTP from being
    // reused after successful verification.
    // --------------------------------------------------------

    const consumed =
        await consumeChallenge(
            challenge.id
        );


    if (
        !consumed ||
        consumed.affectedRows !== 1
    ) {

        const error =
            new Error(
                "OTP verification could not be completed. Please request a new OTP."
            );


        error.code =
            "OTP_CONSUME_FAILED";


        throw error;

    }


    // --------------------------------------------------------
    // CREATE SIGNUP VERIFICATION PROOF
    // --------------------------------------------------------
    //
    // The OTP has now been successfully verified.
    //
    // Because the user does not necessarily exist yet, we do
    // NOT update users.phone_verified_at here.
    //
    // Instead, create a short-lived server-side proof that the
    // registration endpoint will require.
    // --------------------------------------------------------

    const verificationProof =
        await signupVerificationService
            .createVerificationProof(
                normalizedPhone
            );


    return {

        verified:
            true,

        phone:
            normalizedPhone,

        challengeId:
            challenge.id,

        verificationToken:
            verificationProof.verificationToken,

        verificationExpiresAt:
            verificationProof.expiresAt,

    };

};


// ============================================================
// EXPORTS
// ============================================================

module.exports = {

    OTP_PURPOSE_SIGNUP,

    OTP_LENGTH,

    OTP_EXPIRY_MINUTES,

    OTP_RESEND_COOLDOWN_SECONDS,

    OTP_MAX_ATTEMPTS,

    normalizePhoneNumber,

    generateOtp,

    hashOtp,

    requestOtp,

    verifyOtp,

};