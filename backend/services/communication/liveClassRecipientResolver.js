/**
 * DataLattice - Live Class Recipient Resolver
 *
 * Resolves eligible student recipients for live-class communication.
 *
 * Current eligibility foundation:
 * - Student must belong to the target batch through batch_students.
 * - User must have role = student.
 * - Email recipients require email consent.
 * - WhatsApp recipients require WhatsApp consent.
 * - Contact details are resolved from users + student_profiles.
 * - Batch metadata is resolved from the real batches table.
 *
 * Important:
 * - This resolver does not send messages.
 * - This resolver does not create communication jobs.
 * - This resolver does not query one student at a time when resolving
 *   a batch.
 * - Parent recipients are intentionally deferred until a parent relationship
 *   model is available.
 * - communicationDb uses the callback-based mysql2 pool, so database
 *   calls are wrapped in Promises locally.
 */

const communicationDb = require("./communicationDb");

const { pool } = communicationDb;

// ============================================================
// DATABASE QUERY HELPER
//
// communicationDb uses mysql2's callback-based pool.
//
// Keep the resolver Promise-based internally without changing
// the shared communicationDb contract.
// ============================================================

function query(
    sql,
    params = []
) {
    return new Promise(
        (
            resolve,
            reject
        ) => {
            pool.query(
                sql,
                params,
                (
                    error,
                    results
                ) => {
                    if (error) {
                        return reject(error);
                    }

                    resolve(results);
                }
            );
        }
    );
}

/**
 * Normalize a communication channel.
 *
 * @param {string} channel
 * @returns {string}
 */
function normalizeChannel(channel) {
    return String(channel || "")
        .trim()
        .toUpperCase();
}

/**
 * Normalize a phone number for WhatsApp.
 *
 * The current system stores phone numbers in student_profiles.phone.
 * We remove whitespace, brackets, hyphens and other formatting characters.
 *
 * If the number starts with "+", the plus is preserved.
 *
 * @param {string|null} phone
 * @returns {string|null}
 */
function normalizePhone(phone) {
    if (!phone) {
        return null;
    }

    const normalized = String(phone)
        .trim()
        .replace(/[^\d+]/g, "");

    if (!normalized) {
        return null;
    }

    /*
     * A plus sign is valid only at the beginning.
     *
     * Examples:
     *
     * +917204376429 -> valid format
     * 917204376429  -> preserved
     * 72043-76429   -> normalized
     */

    const plusCount =
        (
            normalized.match(/\+/g) ||
            []
        ).length;

    if (
        plusCount > 1 ||
        (
            normalized.includes("+") &&
            !normalized.startsWith("+")
        )
    ) {
        return null;
    }

    const digits =
        normalized.replace(
            "+",
            ""
        );

    /*
     * Avoid passing obviously invalid values to a provider.
     *
     * We intentionally do not force a country code here because
     * the existing student profile model may contain international
     * numbers. Provider-specific country normalization belongs in
     * the provider layer.
     */

    if (
        !/^\d+$/.test(
            digits
        )
    ) {
        return null;
    }

    if (
        digits.length < 7 ||
        digits.length > 15
    ) {
        return null;
    }

    return normalized;
}

/**
 * Check whether a student has consent for a specific channel.
 *
 * Transactional/system live-class communication requires the corresponding
 * base channel consent.
 *
 * @param {object} recipient
 * @param {string} channel
 * @returns {boolean}
 */
function hasChannelConsent(
    recipient,
    channel
) {
    const normalizedChannel =
        normalizeChannel(
            channel
        );

    if (
        normalizedChannel ===
        "EMAIL"
    ) {
        return Number(
            recipient.email_consent
        ) === 1;
    }

    if (
        normalizedChannel ===
        "WHATSAPP"
    ) {
        return Number(
            recipient.whatsapp_consent
        ) === 1;
    }

    return false;
}

/**
 * Build a single channel recipient object.
 *
 * @param {object} student
 * @param {string} channel
 * @returns {object|null}
 */
function buildChannelRecipient(
    student,
    channel
) {
    const normalizedChannel =
        normalizeChannel(
            channel
        );

    if (
        !hasChannelConsent(
            student,
            normalizedChannel
        )
    ) {
        return null;
    }

    if (
        normalizedChannel ===
        "EMAIL"
    ) {
        if (
            !student.email
        ) {
            return null;
        }

        return {
            user_id:
                student.user_id,

            recipient_user_id:
                student.user_id,

            recipient_type:
                "STUDENT",

            recipient_name:
                student.full_name,

            full_name:
                student.full_name,

            channel:
                "EMAIL",

            address:
                student.email,

            email:
                student.email,

            phone:
                student.phone,

            batch_id:
                student.batch_id,

            batch_name:
                student.batch_name || null,
        };
    }

    if (
        normalizedChannel ===
        "WHATSAPP"
    ) {
        const phone =
            normalizePhone(
                student.phone
            );

        if (!phone) {
            return null;
        }

        return {
            user_id:
                student.user_id,

            recipient_user_id:
                student.user_id,

            recipient_type:
                "STUDENT",

            recipient_name:
                student.full_name,

            full_name:
                student.full_name,

            channel:
                "WHATSAPP",

            address:
                phone,

            email:
                student.email,

            phone,

            batch_id:
                student.batch_id,

            batch_name:
                student.batch_name || null,
        };
    }

    return null;
}

/**
 * Resolve students belonging to a batch.
 *
 * This is the database-level recipient discovery step.
 *
 * The query intentionally uses batch_students rather than relying only on
 * student_profiles.batch_id because batch_students is the existing explicit
 * batch membership relationship used by the LMS.
 *
 * Batch metadata is joined in the same query so recipient resolution does
 * not introduce N+1 queries.
 *
 * @param {number|string} batchId
 * @returns {Promise<object[]>}
 */
async function getBatchStudents(
    batchId
) {
    if (!batchId) {
        throw new Error(
            "batchId is required"
        );
    }

    const sql = `
        SELECT
            u.id AS user_id,
            u.full_name,
            u.email,
            u.role,

            bs.batch_id,

            b.batch_name,

            sp.phone,
            sp.batch_id AS student_profile_batch_id,

            COALESCE(
                cp.email_consent,
                0
            ) AS email_consent,

            COALESCE(
                cp.whatsapp_consent,
                0
            ) AS whatsapp_consent,

            COALESCE(
                cp.marketing_email_consent,
                0
            ) AS marketing_email_consent,

            COALESCE(
                cp.marketing_whatsapp_consent,
                0
            ) AS marketing_whatsapp_consent,

            cp.preferred_channel,
            cp.consent_source,
            cp.consent_at

        FROM batch_students bs

        INNER JOIN users u
            ON u.id = bs.student_id

        INNER JOIN batches b
            ON b.id = bs.batch_id

        LEFT JOIN student_profiles sp
            ON sp.user_id = u.id

        LEFT JOIN communication_preferences cp
            ON cp.user_id = u.id

        WHERE bs.batch_id = ?
          AND LOWER(u.role) = 'student'

        ORDER BY
            u.full_name ASC,
            u.id ASC
    `;

    const rows =
        await query(
            sql,
            [
                batchId,
            ]
        );

    return rows || [];
}

/**
 * Resolve all eligible communication recipients for a live class batch.
 *
 * Example:
 *
 * const recipients = await resolveBatchRecipients({
 *     batchId: 12,
 *     channels: ["EMAIL", "WHATSAPP"]
 * });
 *
 * Result:
 * [
 *     {
 *         user_id: 25,
 *         recipient_user_id: 25,
 *         recipient_type: "STUDENT",
 *         recipient_name: "Student Name",
 *         channel: "EMAIL",
 *         address: "student@example.com",
 *         ...
 *     },
 *     {
 *         user_id: 25,
 *         recipient_user_id: 25,
 *         recipient_type: "STUDENT",
 *         recipient_name: "Student Name",
 *         channel: "WHATSAPP",
 *         address: "+917204376429",
 *         ...
 *     }
 * ]
 *
 * @param {object} options
 * @param {number|string} options.batchId
 * @param {string[]} [options.channels]
 * @returns {Promise<object[]>}
 */
async function resolveBatchRecipients({
    batchId,
    channels = [
        "EMAIL",
        "WHATSAPP",
    ],
}) {
    if (!batchId) {
        throw new Error(
            "batchId is required"
        );
    }

    if (
        !Array.isArray(
            channels
        ) ||
        channels.length === 0
    ) {
        throw new Error(
            "channels must be a non-empty array"
        );
    }

    const normalizedChannels = [
        ...new Set(
            channels
                .map(
                    normalizeChannel
                )
                .filter(Boolean)
        ),
    ];

    const supportedChannels = [
        "EMAIL",
        "WHATSAPP",
    ];

    const unsupportedChannels =
        normalizedChannels.filter(
            (
                channel
            ) =>
                !supportedChannels.includes(
                    channel
                )
        );

    if (
        unsupportedChannels.length >
        0
    ) {
        throw new Error(
            `Unsupported live-class communication channel(s): ${unsupportedChannels.join(", ")}`
        );
    }

    const students =
        await getBatchStudents(
            batchId
        );

    const recipients = [];

    for (
        const student of
            students
    ) {
        for (
            const channel of
                normalizedChannels
        ) {
            const recipient =
                buildChannelRecipient(
                    student,
                    channel
                );

            if (
                recipient
            ) {
                recipients.push(
                    recipient
                );
            }
        }
    }

    return recipients;
}

/**
 * Resolve a single student's eligible channels.
 *
 * This helper is useful when a future workflow needs to notify one student
 * instead of an entire batch.
 *
 * @param {number|string} userId
 * @param {string[]} [channels]
 * @returns {Promise<object[]>}
 */
async function resolveStudentRecipients(
    userId,
    channels = [
        "EMAIL",
        "WHATSAPP",
    ]
) {
    if (!userId) {
        throw new Error(
            "userId is required"
        );
    }

    if (
        !Array.isArray(
            channels
        ) ||
        channels.length === 0
    ) {
        throw new Error(
            "channels must be a non-empty array"
        );
    }

    const normalizedChannels = [
        ...new Set(
            channels
                .map(
                    normalizeChannel
                )
                .filter(Boolean)
        ),
    ];

    const supportedChannels = [
        "EMAIL",
        "WHATSAPP",
    ];

    const unsupportedChannels =
        normalizedChannels.filter(
            (
                channel
            ) =>
                !supportedChannels.includes(
                    channel
                )
        );

    if (
        unsupportedChannels.length >
        0
    ) {
        throw new Error(
            `Unsupported live-class communication channel(s): ${unsupportedChannels.join(", ")}`
        );
    }

    const sql = `
        SELECT
            u.id AS user_id,
            u.full_name,
            u.email,
            u.role,

            sp.phone,
            sp.batch_id AS student_profile_batch_id,

            b.batch_name,

            COALESCE(
                cp.email_consent,
                0
            ) AS email_consent,

            COALESCE(
                cp.whatsapp_consent,
                0
            ) AS whatsapp_consent,

            COALESCE(
                cp.marketing_email_consent,
                0
            ) AS marketing_email_consent,

            COALESCE(
                cp.marketing_whatsapp_consent,
                0
            ) AS marketing_whatsapp_consent,

            cp.preferred_channel,
            cp.consent_source,
            cp.consent_at

        FROM users u

        LEFT JOIN student_profiles sp
            ON sp.user_id = u.id

        LEFT JOIN batches b
            ON b.id = sp.batch_id

        LEFT JOIN communication_preferences cp
            ON cp.user_id = u.id

        WHERE u.id = ?
          AND LOWER(u.role) = 'student'

        LIMIT 1
    `;

    const rows =
        await query(
            sql,
            [
                userId,
            ]
        );

    if (
        !rows.length
    ) {
        return [];
    }

    const student = {
        ...rows[0],

        batch_id:
            rows[0]
                .student_profile_batch_id,
    };

    return normalizedChannels
        .map(
            (
                channel
            ) =>
                buildChannelRecipient(
                    student,
                    channel
                )
        )
        .filter(Boolean);
}

/**
 * Resolve recipients directly from a live-class automation event.
 *
 * Expected event payload:
 *
 * {
 *     live_class_id: 123,
 *     batch_id: 10,
 *     ...
 * }
 *
 * @param {object} event
 * @param {object} rule
 * @returns {Promise<object[]>}
 */
async function resolveLiveClassRecipientsFromEvent(
    event,
    rule = {}
) {
    if (!event) {
        throw new Error(
            "event is required"
        );
    }

    let payload;

    try {
        payload =
            typeof event.payload_json ===
                "string"
                ? JSON.parse(
                    event.payload_json
                )
                : (
                    event.payload_json ||
                    event.payload ||
                    {}
                );
    } catch (
        error
    ) {
        throw new Error(
            `Invalid live-class event payload: ${error.message}`
        );
    }

    const batchId =
        payload.batch_id ||
        event.batch_id;

    if (!batchId) {
        throw new Error(
            "LIVE_CLASS event does not contain a batch_id"
        );
    }

    let channels = [
        "EMAIL",
        "WHATSAPP",
    ];

    if (
        rule &&
        rule.channels_json
    ) {
        if (
            Array.isArray(
                rule.channels_json
            )
        ) {
            channels =
                rule.channels_json;

        } else if (
            typeof rule.channels_json ===
            "string"
        ) {
            try {
                const parsed =
                    JSON.parse(
                        rule.channels_json
                    );

                if (
                    Array.isArray(
                        parsed
                    )
                ) {
                    channels =
                        parsed;
                }
            } catch (
                error
            ) {
                /*
                 * Keep default channels when malformed JSON is
                 * encountered. Rule validation belongs to the
                 * automation configuration layer.
                 */
            }

        } else if (
            typeof rule.channels_json ===
                "object" &&
            Array.isArray(
                rule.channels_json.channels
            )
        ) {
            channels =
                rule.channels_json.channels;
        }
    }

    return resolveBatchRecipients({
        batchId,
        channels,
    });
}

/**
 * Return recipient counts grouped by channel.
 *
 * Useful for automation diagnostics and testing.
 *
 * @param {object[]} recipients
 * @returns {object}
 */
function getRecipientCounts(
    recipients = []
) {
    return recipients.reduce(
        (
            counts,
            recipient
        ) => {
            const channel =
                normalizeChannel(
                    recipient.channel
                );

            if (
                channel ===
                "EMAIL"
            ) {
                counts.email += 1;
            }

            if (
                channel ===
                "WHATSAPP"
            ) {
                counts.whatsapp += 1;
            }

            counts.total += 1;

            return counts;
        },
        {
            total: 0,
            email: 0,
            whatsapp: 0,
        }
    );
}

module.exports = {
    normalizeChannel,
    normalizePhone,
    hasChannelConsent,
    getBatchStudents,
    resolveBatchRecipients,
    resolveStudentRecipients,
    resolveLiveClassRecipientsFromEvent,
    getRecipientCounts,
};