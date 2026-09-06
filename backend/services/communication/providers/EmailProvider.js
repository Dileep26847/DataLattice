const nodemailer = require("nodemailer");

// ============================================================
// DATAlattice EMAIL PROVIDER
// ============================================================
//
// This provider is intentionally isolated from the automation
// engine. Business logic should never call nodemailer directly.
//
// Required environment variables:
//
// EMAIL_HOST
// EMAIL_PORT
// EMAIL_USER
// EMAIL_PASSWORD
// EMAIL_FROM
//
// Optional:
//
// EMAIL_SECURE=true
//
// ============================================================

class EmailProvider {
    constructor() {
        this.name = "smtp";

        this.host =
            process.env.EMAIL_HOST || "";

        this.port =
            Number(process.env.EMAIL_PORT || 587);

        this.user =
            process.env.EMAIL_USER || "";

        this.password =
            process.env.EMAIL_PASSWORD || "";

        this.from =
            process.env.EMAIL_FROM ||
            this.user;

        this.secure =
            String(
                process.env.EMAIL_SECURE || "false"
            ).toLowerCase() === "true";

        this.transporter = null;

        this.initialize();
    }

    // ============================================================
    // INITIALIZE TRANSPORT
    // ============================================================

    initialize() {
        if (
            !this.host ||
            !this.user ||
            !this.password
        ) {
            return;
        }

        this.transporter =
            nodemailer.createTransport({
                host: this.host,
                port: this.port,
                secure: this.secure,

                auth: {
                    user: this.user,
                    pass: this.password,
                },

                connectionTimeout: 10000,
                greetingTimeout: 10000,
                socketTimeout: 15000,
            });
    }

    // ============================================================
    // PROVIDER HEALTH
    // ============================================================

    isConfigured() {
        return Boolean(
            this.host &&
            this.user &&
            this.password
        );
    }

    // ============================================================
    // VERIFY PROVIDER
    // ============================================================

    async verify() {
        if (!this.isConfigured()) {
            return {
                ok: false,
                provider: this.name,
                reason:
                    "Email provider is not configured",
            };
        }

        try {
            await this.transporter.verify();

            return {
                ok: true,
                provider: this.name,
            };
        } catch (error) {
            return {
                ok: false,
                provider: this.name,
                reason: error.message,
            };
        }
    }

    // ============================================================
    // SEND EMAIL
    // ============================================================

    async send({
        to,
        subject,
        text,
        html,
        replyTo,
        headers,
    }) {
        if (!to) {
            throw new Error(
                "Email recipient is required"
            );
        }

        if (!this.isConfigured()) {
            throw new Error(
                "Email provider is not configured"
            );
        }

        if (!this.transporter) {
            this.initialize();
        }

        if (!this.transporter) {
            throw new Error(
                "Email transporter could not be initialized"
            );
        }

        const message = {
            from: this.from,
            to,
            subject:
                subject ||
                "DataLattice",

            text:
                text ||
                "",

            html:
                html ||
                undefined,
        };

        if (replyTo) {
            message.replyTo = replyTo;
        }

        if (headers) {
            message.headers = headers;
        }

        const result =
            await this.transporter.sendMail(
                message
            );

        return {
            success: true,

            provider: this.name,

            providerMessageId:
                result.messageId || null,

            response:
                result.response || null,

            accepted:
                result.accepted || [],

            rejected:
                result.rejected || [],
        };
    }
}

module.exports = EmailProvider;