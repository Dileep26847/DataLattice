// ======================================
// DataLattice - TOTP Secret Encryption
// ======================================

const crypto =
    require("crypto");

// ======================================
// ENCRYPTION CONFIGURATION
// ======================================

const ALGORITHM =
    "aes-256-gcm";

const IV_LENGTH =
    12;

const AUTH_TAG_LENGTH =
    16;

const KEY_LENGTH =
    32;

// ======================================
// GET ENCRYPTION KEY
// ======================================

function getEncryptionKey() {

    const rawKey =
        process.env.TOTP_ENCRYPTION_KEY;

    if (!rawKey) {

        throw new Error(
            "TOTP_ENCRYPTION_KEY is not configured"
        );

    }

    if (
        !/^[a-fA-F0-9]{64}$/.test(
            rawKey
        )
    ) {

        throw new Error(
            "TOTP_ENCRYPTION_KEY must be a 64-character hexadecimal value"
        );

    }

    const key =
        Buffer.from(
            rawKey,
            "hex"
        );

    if (
        key.length !== KEY_LENGTH
    ) {

        throw new Error(
            "TOTP_ENCRYPTION_KEY must represent exactly 32 bytes"
        );

    }

    return key;

}

// ======================================
// ENCRYPT TOTP SECRET
// ======================================

function encryptTotpSecret(
    secret
) {

    if (
        !secret ||
        typeof secret !== "string"
    ) {

        throw new Error(
            "A valid TOTP secret is required for encryption"
        );

    }

    const key =
        getEncryptionKey();

    const iv =
        crypto.randomBytes(
            IV_LENGTH
        );

    const cipher =
        crypto.createCipheriv(
            ALGORITHM,
            key,
            iv
        );

    const encrypted =
        Buffer.concat([

            cipher.update(
                secret,
                "utf8"
            ),

            cipher.final(),

        ]);

    const authTag =
        cipher.getAuthTag();

    return [

        iv.toString(
            "base64"
        ),

        authTag.toString(
            "base64"
        ),

        encrypted.toString(
            "base64"
        ),

    ].join(".");

}

// ======================================
// DECRYPT TOTP SECRET
// ======================================

function decryptTotpSecret(
    encryptedSecret
) {

    if (
        !encryptedSecret ||
        typeof encryptedSecret !== "string"
    ) {

        throw new Error(
            "A valid encrypted TOTP secret is required for decryption"
        );

    }

    const parts =
        encryptedSecret.split(
            "."
        );

    if (
        parts.length !== 3
    ) {

        throw new Error(
            "Invalid encrypted TOTP secret format"
        );

    }

    const [
        ivBase64,
        authTagBase64,
        encryptedBase64,
    ] =
        parts;

    const iv =
        Buffer.from(
            ivBase64,
            "base64"
        );

    const authTag =
        Buffer.from(
            authTagBase64,
            "base64"
        );

    const encrypted =
        Buffer.from(
            encryptedBase64,
            "base64"
        );

    if (
        iv.length !== IV_LENGTH
    ) {

        throw new Error(
            "Invalid TOTP encryption IV"
        );

    }

    if (
        authTag.length !== AUTH_TAG_LENGTH
    ) {

        throw new Error(
            "Invalid TOTP encryption authentication tag"
        );

    }

    const key =
        getEncryptionKey();

    const decipher =
        crypto.createDecipheriv(
            ALGORITHM,
            key,
            iv
        );

    decipher.setAuthTag(
        authTag
    );

    const decrypted =
        Buffer.concat([

            decipher.update(
                encrypted
            ),

            decipher.final(),

        ]);

    return decrypted.toString(
        "utf8"
    );

}

// ======================================
// EXPORTS
// ======================================

module.exports = {

    encryptTotpSecret,

    decryptTotpSecret,

};