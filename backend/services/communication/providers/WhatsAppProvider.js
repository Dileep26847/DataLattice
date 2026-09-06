const axios = require("axios");

// ============================================================
// DATALATTICE WHATSAPP PROVIDER
// ============================================================
//
// Provider abstraction for WhatsApp Business Cloud API.
//
// Required environment variables:
//
// WHATSAPP_API_URL
// WHATSAPP_ACCESS_TOKEN
// WHATSAPP_PHONE_NUMBER_ID
//
// Example API URL:
//
// https://graph.facebook.com/vXX.X
//
// The provider is isolated so the automation engine does not
// depend directly on Meta/Facebook API implementation details.
//
// ============================================================

class WhatsAppProvider {
    constructor() {
        this.name = "whatsapp_cloud_api";

        this.apiUrl =
            process.env.WHATSAPP_API_URL ||
            "";

        this.accessToken =
            process.env.WHATSAPP_ACCESS_TOKEN ||
            "";

        this.phoneNumberId =
            process.env.WHATSAPP_PHONE_NUMBER_ID ||
            "";
    }

    // ============================================================
    // PROVIDER HEALTH
    // ============================================================

    isConfigured() {
        return Boolean(
            this.apiUrl &&
            this.accessToken &&
            this.phoneNumberId
        );
    }

    // ============================================================
    // SEND TEXT MESSAGE
    // ============================================================

    async send({
        to,
        text,
    }) {
        if (!to) {
            throw new Error(
                "WhatsApp recipient is required"
            );
        }

        if (!text) {
            throw new Error(
                "WhatsApp message text is required"
            );
        }

        if (!this.isConfigured()) {
            throw new Error(
                "WhatsApp provider is not configured"
            );
        }

        const normalizedBaseUrl =
            this.apiUrl.replace(
                /\/+$/,
                ""
            );

        const endpoint =
            `${normalizedBaseUrl}/${this.phoneNumberId}/messages`;

        const response =
            await axios.post(
                endpoint,

                {
                    messaging_product:
                        "whatsapp",

                    recipient_type:
                        "individual",

                    to:
                        this.normalizePhoneNumber(
                            to
                        ),

                    type:
                        "text",

                    text: {
                        preview_url:
                            false,

                        body:
                            text,
                    },
                },

                {
                    headers: {
                        Authorization:
                            `Bearer ${this.accessToken}`,

                        "Content-Type":
                            "application/json",
                    },

                    timeout: 15000,
                }
            );

        const messages =
            response.data &&
            Array.isArray(
                response.data.messages
            )
                ? response.data.messages
                : [];

        return {
            success: true,

            provider:
                this.name,

            providerMessageId:
                messages.length > 0
                    ? messages[0].id || null
                    : null,

            response:
                response.data || null,
        };
    }

    // ============================================================
    // NORMALIZE PHONE NUMBER
    // ============================================================

    normalizePhoneNumber(phone) {
        return String(phone)
            .trim()
            .replace(
                /[\s\-().]/g,
                ""
            )
            .replace(
                /^\+/,
                ""
            );
    }
}

module.exports = WhatsAppProvider;