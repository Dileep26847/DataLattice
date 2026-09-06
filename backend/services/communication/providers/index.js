const EmailProvider =
    require("./EmailProvider");

const WhatsAppProvider =
    require("./WhatsAppProvider");

// ============================================================
// PROVIDER FACTORY
// ============================================================
//
// Central registry for communication providers.
//
// Adding SMS, Push, Telegram, etc. later should only require
// registering the new provider here and implementing its
// provider contract.
//
// ============================================================

const providers = {
    EMAIL:
        new EmailProvider(),

    WHATSAPP:
        new WhatsAppProvider(),
};

// ============================================================
// GET PROVIDER
// ============================================================

const getProvider = (
    channel
) => {
    const normalizedChannel =
        String(
            channel || ""
        )
            .trim()
            .toUpperCase();

    const provider =
        providers[
            normalizedChannel
        ];

    if (!provider) {
        throw new Error(
            `No communication provider configured for channel: ${normalizedChannel}`
        );
    }

    return provider;
};

// ============================================================
// PROVIDER STATUS
// ============================================================

const getProviderStatus = () => {
    return Object.entries(
        providers
    ).map(
        ([
            channel,
            provider,
        ]) => ({
            channel,

            provider:
                provider.name,

            configured:
                provider.isConfigured(),
        })
    );
};

module.exports = {
    providers,
    getProvider,
    getProviderStatus,
};