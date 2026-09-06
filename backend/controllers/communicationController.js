// ======================================
// DataLattice - Communication Controller
// ======================================

const communicationRuntime =
    require("../services/communication/communicationRuntime");

const communicationJobModel =
    require("../models/communicationJobModel");

const automationEventModel =
    require("../models/automationEventModel");

const automationRuleModel =
    require("../models/automationRuleModel");

const automationRunModel =
    require("../models/automationRunModel");

const communicationDeliveryModel =
    require("../models/communicationDeliveryModel");

const {
    pool: communicationDb,
} = require("../services/communication/communicationDb");

const providers =
    require("../services/communication/providers");


// ======================================
// CALLBACK -> PROMISE HELPER
// ======================================

function callbackToPromise(executor) {

    return new Promise(
        (
            resolve,
            reject
        ) => {

            executor(
                (
                    error,
                    result
                ) => {

                    if (error) {

                        reject(error);

                        return;
                    }

                    resolve(result);

                }
            );

        }
    );

}


// ======================================
// SAFE LIMIT
// ======================================

function getSafeLimit(
    value,
    fallback = 50
) {

    return Math.min(
        Math.max(
            Number(value) || fallback,
            1
        ),
        200
    );

}


// ======================================
// DIRECT DATABASE QUERY
// ======================================

function query(
    sql,
    params = []
) {

    return callbackToPromise(
        callback =>
            communicationDb.query(
                sql,
                params,
                callback
            )
    );

}


// ======================================
// COMMUNICATION HEALTH
// ======================================

const getCommunicationHealth = async (
    req,
    res
) => {

    try {

        const runtimeStatus =
            communicationRuntime.getStatus();

        const [
            queueCounts,
            pendingEventRows,
            deliveryCounts,
            eventCounts,
            runCounts,
        ] = await Promise.all([

            callbackToPromise(
                callback =>
                    communicationJobModel.getQueueCounts(
                        callback
                    )
            ),

            callbackToPromise(
                callback =>
                    automationEventModel.getPendingEventCount(
                        callback
                    )
            ),

            callbackToPromise(
                callback =>
                    communicationDeliveryModel.getDeliveryCounts(
                        callback
                    )
            ),

            callbackToPromise(
                callback =>
                    automationEventModel.getEventCounts(
                        callback
                    )
            ),

            callbackToPromise(
                callback =>
                    automationRunModel.getRunCounts(
                        callback
                    )
            ),

        ]);

        const providerStatus =
            providers.getProviderStatus();

        const pendingEvents =
            Number(
                pendingEventRows?.[0]?.count || 0
            );

        return res.status(200).json({

            success: true,

            data: {

                runtime:
                    runtimeStatus,

                queue:
                    queueCounts || [],

                automationEvents: {

                    pending:
                        pendingEvents,

                    counts:
                        eventCounts || [],

                },

                automationRuns: {

                    counts:
                        runCounts || [],

                },

                deliveries:
                    deliveryCounts || [],

                providers:
                    providerStatus,

                timestamp:
                    new Date().toISOString(),

            },

        });

    } catch (
        error
    ) {

        console.error(
            "[CommunicationController] Health check failed:",
            error
        );

        return res.status(500).json({

            success: false,

            message:
                "Unable to retrieve communication health",

        });

    }

};


// ======================================
// COMMUNICATION RUNTIME STATUS
// ======================================

const getCommunicationStatus = (
    req,
    res
) => {

    try {

        return res.status(200).json({

            success: true,

            data:
                communicationRuntime.getStatus(),

        });

    } catch (
        error
    ) {

        console.error(
            "[CommunicationController] Status check failed:",
            error
        );

        return res.status(500).json({

            success: false,

            message:
                "Unable to retrieve communication status",

        });

    }

};


// ======================================
// COMMUNICATION QUEUE STATUS
// ======================================

const getCommunicationQueue = async (
    req,
    res
) => {

    try {

        const [
            queueCounts,
            dueJobRows,
            pendingEventRows,
        ] = await Promise.all([

            callbackToPromise(
                callback =>
                    communicationJobModel.getQueueCounts(
                        callback
                    )
            ),

            callbackToPromise(
                callback =>
                    communicationJobModel.getDueJobCount(
                        callback
                    )
            ),

            callbackToPromise(
                callback =>
                    automationEventModel.getPendingEventCount(
                        callback
                    )
            ),

        ]);

        return res.status(200).json({

            success: true,

            data: {

                jobs:
                    queueCounts || [],

                dueJobs:
                    Number(
                        dueJobRows?.[0]?.count || 0
                    ),

                pendingAutomationEvents:
                    Number(
                        pendingEventRows?.[0]?.count || 0
                    ),

            },

        });

    } catch (
        error
    ) {

        console.error(
            "[CommunicationController] Queue check failed:",
            error
        );

        return res.status(500).json({

            success: false,

            message:
                "Unable to retrieve communication queue",

        });

    }

};


// ======================================
// DELIVERY STATUS
// ======================================

const getCommunicationDeliveries = async (
    req,
    res
) => {

    try {

        const deliveryCounts =
            await callbackToPromise(
                callback =>
                    communicationDeliveryModel.getDeliveryCounts(
                        callback
                    )
            );

        return res.status(200).json({

            success: true,

            data:
                deliveryCounts || [],

        });

    } catch (
        error
    ) {

        console.error(
            "[CommunicationController] Delivery check failed:",
            error
        );

        return res.status(500).json({

            success: false,

            message:
                "Unable to retrieve delivery status",

        });

    }

};


// ======================================
// PROVIDER STATUS
// ======================================

const getCommunicationProviders = (
    req,
    res
) => {

    try {

        return res.status(200).json({

            success: true,

            data:
                providers.getProviderStatus(),

        });

    } catch (
        error
    ) {

        console.error(
            "[CommunicationController] Provider check failed:",
            error
        );

        return res.status(500).json({

            success: false,

            message:
                "Unable to retrieve communication provider status",

        });

    }

};


// ======================================
// AUTOMATION RULES
// ======================================

const getAutomationRules = async (
    req,
    res
) => {

    try {

        /*
         * getActiveRules() intentionally returns enabled
         * rules only because that is the current model
         * contract.
         */

        const rules =
            await callbackToPromise(
                callback =>
                    automationRuleModel.getActiveRules(
                        callback
                    )
            );

        return res.status(200).json({

            success: true,

            data:
                rules || [],

        });

    } catch (
        error
    ) {

        console.error(
            "[CommunicationController] Automation rules retrieval failed:",
            error
        );

        return res.status(500).json({

            success: false,

            message:
                "Unable to retrieve automation rules",

        });

    }

};


// ======================================
// AUTOMATION RUNS
// ======================================

const getAutomationRuns = async (
    req,
    res
) => {

    try {

        const limit =
            getSafeLimit(
                req.query.limit
            );

        const runs =
            await callbackToPromise(
                callback =>
                    automationRunModel.getRecentRuns(
                        limit,
                        callback
                    )
            );

        return res.status(200).json({

            success: true,

            data:
                runs || [],

        });

    } catch (
        error
    ) {

        console.error(
            "[CommunicationController] Automation runs retrieval failed:",
            error
        );

        return res.status(500).json({

            success: false,

            message:
                "Unable to retrieve automation runs",

        });

    }

};


// ======================================
// AUTOMATION EVENTS
// ======================================

const getAutomationEvents = async (
    req,
    res
) => {

    try {

        const limit =
            getSafeLimit(
                req.query.limit
            );

        const events =
            await callbackToPromise(
                callback =>
                    automationEventModel.getRecentEvents(
                        limit,
                        callback
                    )
            );

        return res.status(200).json({

            success: true,

            data:
                events || [],

        });

    } catch (
        error
    ) {

        console.error(
            "[CommunicationController] Automation events retrieval failed:",
            error
        );

        return res.status(500).json({

            success: false,

            message:
                "Unable to retrieve automation events",

        });

    }

};


// ======================================
// COMMUNICATION JOBS
// ======================================

const getCommunicationJobs = async (
    req,
    res
) => {

    try {

        const limit =
            getSafeLimit(
                req.query.limit
            );

        const jobs =
            await query(
                `
                SELECT
                    id,
                    automation_run_id,
                    automation_rule_id,
                    template_id,
                    channel,
                    recipient_type,
                    recipient_user_id,
                    recipient_address,
                    recipient_name,
                    subject,
                    idempotency_key,
                    status,
                    priority,
                    scheduled_at,
                    started_at,
                    sent_at,
                    completed_at,
                    attempt_count,
                    max_attempts,
                    next_attempt_at,
                    locked_at,
                    locked_by,
                    last_error,
                    created_at,
                    updated_at
                FROM communication_jobs
                ORDER BY
                    created_at DESC,
                    id DESC
                LIMIT ?
                `,
                [
                    limit,
                ]
            );

        return res.status(200).json({

            success: true,

            data:
                jobs || [],

        });

    } catch (
        error
    ) {

        console.error(
            "[CommunicationController] Communication jobs retrieval failed:",
            error
        );

        return res.status(500).json({

            success: false,

            message:
                "Unable to retrieve communication jobs",

        });

    }

};


// ======================================
// AUTOMATION OVERVIEW
// ======================================

const getAutomationOverview = async (
    req,
    res
) => {

    try {

        const limit =
            getSafeLimit(
                req.query.limit,
                20
            );

        const [
            rules,
            runs,
            events,
            jobs,
            queueCounts,
            dueJobRows,
            eventCounts,
            runCounts,
        ] = await Promise.all([

            callbackToPromise(
                callback =>
                    automationRuleModel.getActiveRules(
                        callback
                    )
            ),

            callbackToPromise(
                callback =>
                    automationRunModel.getRecentRuns(
                        limit,
                        callback
                    )
            ),

            callbackToPromise(
                callback =>
                    automationEventModel.getRecentEvents(
                        limit,
                        callback
                    )
            ),

            query(
                `
                SELECT
                    id,
                    automation_run_id,
                    automation_rule_id,
                    template_id,
                    channel,
                    recipient_type,
                    recipient_user_id,
                    recipient_address,
                    recipient_name,
                    subject,
                    idempotency_key,
                    status,
                    priority,
                    scheduled_at,
                    started_at,
                    sent_at,
                    completed_at,
                    attempt_count,
                    max_attempts,
                    next_attempt_at,
                    locked_at,
                    locked_by,
                    last_error,
                    created_at,
                    updated_at
                FROM communication_jobs
                ORDER BY
                    created_at DESC,
                    id DESC
                LIMIT ?
                `,
                [
                    limit,
                ]
            ),

            callbackToPromise(
                callback =>
                    communicationJobModel.getQueueCounts(
                        callback
                    )
            ),

            callbackToPromise(
                callback =>
                    communicationJobModel.getDueJobCount(
                        callback
                    )
            ),

            callbackToPromise(
                callback =>
                    automationEventModel.getEventCounts(
                        callback
                    )
            ),

            callbackToPromise(
                callback =>
                    automationRunModel.getRunCounts(
                        callback
                    )
            ),

        ]);

        return res.status(200).json({

            success: true,

            data: {

                rules:
                    rules || [],

                runs:
                    runs || [],

                events:
                    events || [],

                jobs:
                    jobs || [],

                counts: {

                    queue:
                        queueCounts || [],

                    dueJobs:
                        Number(
                            dueJobRows?.[0]?.count || 0
                        ),

                    events:
                        eventCounts || [],

                    runs:
                        runCounts || [],

                },

                timestamp:
                    new Date().toISOString(),

            },

        });

    } catch (
        error
    ) {

        console.error(
            "[CommunicationController] Automation overview retrieval failed:",
            error
        );

        return res.status(500).json({

            success: false,

            message:
                "Unable to retrieve automation overview",

        });

    }

};


// ======================================
// EXPORTS
// ======================================

module.exports = {

    getCommunicationHealth,

    getCommunicationStatus,

    getCommunicationQueue,

    getCommunicationDeliveries,

    getCommunicationProviders,

    getAutomationRules,

    getAutomationRuns,

    getAutomationEvents,

    getCommunicationJobs,

    getAutomationOverview,

};