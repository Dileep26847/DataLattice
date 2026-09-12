const crypto = require("crypto");
const twilio = require("twilio");


// ============================================================
// OTP DELIVERY SERVICE
// ============================================================
//
// This service provides a provider boundary between the OTP
// generation logic and the actual delivery channel.
//
// Current providers:
// - Development console provider
// - Twilio WhatsApp provider
//
// Production delivery channel:
// - WhatsApp via Twilio
//
// IMPORTANT:
// The OTP is never returned to the frontend.
// In development, it is displayed only in the backend terminal
// so that the OTP lifecycle can be tested safely.
//
// The OTP generation, hashing, expiration and verification
// logic remains inside otpService.js.
//
// This service is responsible only for delivery.
// ============================================================


// ============================================================
// DELIVERY CONFIGURATION
// ============================================================

const DEVELOPMENT_PROVIDER =
    "development_console";

const WHATSAPP_PROVIDER =
    "whatsapp";


// ============================================================
// TWILIO CLIENT
// ============================================================
//
// The Twilio client is created only when WhatsApp delivery is
// actually requested.
//
// This prevents unnecessary initialization when the local
// development console provider is being used.
// ============================================================

const getTwilioClient = () => {

    const accountSid =
        process.env.TWILIO_ACCOUNT_SID;

    const authToken =
        process.env.TWILIO_AUTH_TOKEN;


    if (
        !accountSid ||
        !authToken
    ) {

        const error =
            new Error(
                "Twilio WhatsApp credentials are not configured."
            );


        error.code =
            "TWILIO_CREDENTIALS_NOT_CONFIGURED";


        error.provider =
            WHATSAPP_PROVIDER;


        throw error;

    }


    return twilio(
        accountSid,
        authToken
    );

};


// ============================================================
// GET CURRENT PROVIDER
// ============================================================

const getProvider = () => {

    const configuredProvider =
        process.env.OTP_DELIVERY_PROVIDER;


    if (
        configuredProvider
    ) {

        return configuredProvider
            .trim()
            .toLowerCase();

    }


    /*
     * Local development defaults to the console provider.
     *
     * This allows us to test the OTP system before WhatsApp
     * credentials are configured.
     */

    if (
        process.env.NODE_ENV !==
        "production"
    ) {

        return DEVELOPMENT_PROVIDER;

    }


    /*
     * Production must be explicitly configured.
     */

    return WHATSAPP_PROVIDER;

};


// ============================================================
// DEVELOPMENT CONSOLE DELIVERY
// ============================================================

const sendDevelopmentOtp = async ({
    phone,
    otp,
    purpose,
    expiresAt,
    challengeId,
}) => {

    /*
     * The development provider must NEVER be available in
     * production.
     */

    if (
        process.env.NODE_ENV ===
        "production"
    ) {

        throw new Error(
            "Development OTP delivery is disabled in production."
        );

    }


    console.log(
        "\n============================================================"
    );

    console.log(
        "DATALATTICE DEVELOPMENT OTP"
    );

    console.log(
        "============================================================"
    );

    console.log(
        `Provider      : ${DEVELOPMENT_PROVIDER}`
    );

    console.log(
        `Purpose       : ${purpose}`
    );

    console.log(
        `Phone         : ${phone}`
    );

    console.log(
        `Challenge ID  : ${challengeId}`
    );

    console.log(
        `OTP           : ${otp}`
    );

    console.log(
        `Expires At    : ${expiresAt}`
    );

    console.log(
        "============================================================\n"
    );


    return {

        success:
            true,

        provider:
            DEVELOPMENT_PROVIDER,

        challengeId,

    };

};


// ============================================================
// TWILIO WHATSAPP DELIVERY
// ============================================================
//
// Twilio WhatsApp authentication templates use a single
// content variable containing the one-time passcode.
//
// The Verification Codes template currently configured in
// the DataLattice Twilio trial uses:
//
// {{1}} = OTP
//
// IMPORTANT:
// The OTP itself is never logged here.
// ============================================================

const sendWhatsAppOtp = async ({
    phone,
    otp,
    purpose,
    expiresAt,
    challengeId,
}) => {

    const twilioClient =
        getTwilioClient();


    const from =
        process.env.TWILIO_WHATSAPP_FROM;

    const contentSid =
        process.env.TWILIO_WHATSAPP_CONTENT_SID;


    if (
        !from
    ) {

        const error =
            new Error(
                "Twilio WhatsApp sender is not configured."
            );


        error.code =
            "TWILIO_WHATSAPP_FROM_NOT_CONFIGURED";


        error.provider =
            WHATSAPP_PROVIDER;


        throw error;

    }


    if (
        !contentSid
    ) {

        const error =
            new Error(
                "Twilio WhatsApp Content SID is not configured."
            );


        error.code =
            "TWILIO_WHATSAPP_CONTENT_SID_NOT_CONFIGURED";


        error.provider =
            WHATSAPP_PROVIDER;


        throw error;

    }


    /*
     * The Twilio Trial Console generated request for the
     * configured Verification Codes authentication template
     * uses one content variable:
     *
     * {{1}} = OTP
     *
     * The OTP is generated server-side by otpService.js.
     */

    const contentVariables =
        JSON.stringify({

            "1":
                otp,

        });


    /*
     * Twilio's WhatsApp API expects the destination in
     * WhatsApp address format.
     *
     * otpService.js already normalizes the phone number to
     * E.164 format before this service is called.
     */

    const to =
        phone.startsWith(
            "whatsapp:"
        )
            ? phone
            : `whatsapp:${phone}`;


    const message =
        await twilioClient.messages.create({

            from,

            to,

            contentSid,

            contentVariables,

        });


    /*
     * Do not log the OTP.
     *
     * The Twilio message SID is safe to use for operational
     * tracing and future delivery-status observability.
     */

    return {

        success:
            true,

        provider:
            WHATSAPP_PROVIDER,

        challengeId,

        deliveryRequestId:
            message.sid,

        messageSid:
            message.sid,

        status:
            message.status || null,

        expiresAt,

    };

};


// ============================================================
// SEND OTP
// ============================================================

const sendOtp = async ({
    phone,
    otp,
    purpose,
    expiresAt,
    challengeId,
}) => {

    if (
        !phone ||
        !otp
    ) {

        throw new Error(
            "Phone number and OTP are required for delivery."
        );

    }


    const provider =
        getProvider();


    switch (
        provider
    ) {

        case DEVELOPMENT_PROVIDER:

            return sendDevelopmentOtp({

                phone,

                otp,

                purpose,

                expiresAt,

                challengeId,

            });


        case WHATSAPP_PROVIDER:

            return sendWhatsAppOtp({

                phone,

                otp,

                purpose,

                expiresAt,

                challengeId,

            });


        default: {

            const error =
                new Error(
                    `Unsupported OTP delivery provider: ${provider}`
                );


            error.code =
                "OTP_PROVIDER_UNSUPPORTED";


            throw error;

        }

    }

};


// ============================================================
// GENERATE PROVIDER REQUEST ID
// ============================================================
//
// This will be useful for operational observability and
// delivery tracing across providers.
// ============================================================

const generateDeliveryRequestId = () => {

    return crypto.randomUUID();

};


// ============================================================
// EXPORTS
// ============================================================

module.exports = {

    DEVELOPMENT_PROVIDER,

    WHATSAPP_PROVIDER,

    getProvider,

    sendOtp,

    generateDeliveryRequestId,

};