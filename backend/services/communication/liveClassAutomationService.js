// ======================================
// DataLattice - Live Class Automation
// ======================================

const crypto =
    require("crypto");

const automationEventModel =
    require("../../models/automationEventModel");

// ======================================
// LIVE CLASS SCHEDULED EVENT
// ======================================

const emitLiveClassScheduledEvent =
    async (
        liveClass
    ) => {

        if (
            !liveClass ||
            !liveClass.id
        ) {

            throw new Error(
                "Live class ID is required to emit automation event."
            );

        }

        if (
            !liveClass.batch_id
        ) {

            throw new Error(
                "Live class batch ID is required to emit automation event."
            );

        }

        // ======================================
        // IDEMPOTENCY KEY
        // ======================================
        //
        // The same live class must never create
        // duplicate scheduled events.
        //
        // ======================================

        const eventKey =
            `LIVE_CLASS_SCHEDULED:${liveClass.id}`;

        // ======================================
        // EVENT PAYLOAD
        // ======================================

        const payload = {

            live_class_id:
                Number(
                    liveClass.id
                ),

            batch_id:
                Number(
                    liveClass.batch_id
                ),

            course_id:
                liveClass.course_id
                    ? Number(
                        liveClass.course_id
                    )
                    : null,

            title:
                liveClass.title ||
                null,

            description:
                liveClass.description ||
                null,

            class_date:
                liveClass.class_date ||
                null,

            start_time:
                liveClass.start_time ||
                null,

            end_time:
                liveClass.end_time ||
                null,

            status:
                liveClass.status ||
                "Upcoming",

            zoom_link:
                liveClass.zoom_link ||
                null,

            meeting_id:
                liveClass.meeting_id ||
                null,

            batch_name:
                liveClass.batch_name ||
                null,

            source:
                "live_class",

            created_by:
                liveClass.created_by
                    ? Number(
                        liveClass.created_by
                    )
                    : null,

        };

        // ======================================
        // CREATE DURABLE AUTOMATION EVENT
        // ======================================

        try {

            const result =
                await new Promise(
                    (
                        resolve,
                        reject
                    ) => {

                        automationEventModel.createEvent(

                            {

                                event_key:
                                    eventKey,

                                event_type:
                                    "LIVE_CLASS_SCHEDULED",

                                aggregate_type:
                                    "LIVE_CLASS",

                                aggregate_id:
                                    Number(
                                        liveClass.id
                                    ),

                                payload_json:
                                    payload,

                            },

                            (
                                error,
                                response
                            ) => {

                                if (
                                    error
                                ) {

                                    return reject(
                                        error
                                    );

                                }

                                resolve(
                                    response
                                );

                            }

                        );

                    }
                );

            return {

                created:
                    true,

                duplicate:
                    false,

                eventKey,

                eventId:
                    result?.insertId ||
                    null,

            };

        } catch (
            error
        ) {

            // ==================================
            // DUPLICATE EVENT
            // ==================================
            //
            // event_key is unique in the database.
            // A duplicate means the event already
            // exists and therefore should not be
            // emitted again.
            //
            // ==================================

            if (
                error &&
                (
                    error.code ===
                        "ER_DUP_ENTRY" ||
                    error.errno ===
                        1062
                )
            ) {

                console.log(
                    `[LiveClassAutomation] Event already exists: ${eventKey}`
                );

                return {

                    created:
                        false,

                    duplicate:
                        true,

                    eventKey,

                    eventId:
                        null,

                };

            }

            throw error;

        }

    };

// ======================================
// LIVE CLASS UPDATED EVENT
// ======================================

const emitLiveClassUpdatedEvent =
    async (
        liveClass
    ) => {

        if (
            !liveClass ||
            !liveClass.id
        ) {

            throw new Error(
                "Live class ID is required to emit automation event."
            );

        }

        const timestamp =
            Date.now();

        const eventKey =
            `LIVE_CLASS_UPDATED:${liveClass.id}:${timestamp}`;

        const payload = {

            live_class_id:
                Number(
                    liveClass.id
                ),

            batch_id:
                liveClass.batch_id
                    ? Number(
                        liveClass.batch_id
                    )
                    : null,

            course_id:
                liveClass.course_id
                    ? Number(
                        liveClass.course_id
                    )
                    : null,

            title:
                liveClass.title ||
                null,

            description:
                liveClass.description ||
                null,

            class_date:
                liveClass.class_date ||
                null,

            start_time:
                liveClass.start_time ||
                null,

            end_time:
                liveClass.end_time ||
                null,

            status:
                liveClass.status ||
                null,

            zoom_link:
                liveClass.zoom_link ||
                null,

            meeting_id:
                liveClass.meeting_id ||
                null,

            batch_name:
                liveClass.batch_name ||
                null,

            source:
                "live_class",

        };

        try {

            const result =
                await new Promise(
                    (
                        resolve,
                        reject
                    ) => {

                        automationEventModel.createEvent(

                            {

                                event_key,

                                event_type:
                                    "LIVE_CLASS_UPDATED",

                                aggregate_type:
                                    "LIVE_CLASS",

                                aggregate_id:
                                    Number(
                                        liveClass.id
                                    ),

                                payload_json:
                                    payload,

                            },

                            (
                                error,
                                response
                            ) => {

                                if (
                                    error
                                ) {

                                    return reject(
                                        error
                                    );

                                }

                                resolve(
                                    response
                                );

                            }

                        );

                    }
                );

            return {

                created:
                    true,

                duplicate:
                    false,

                eventKey,

                eventId:
                    result?.insertId ||
                    null,

            };

        } catch (
            error
        ) {

            if (
                error &&
                (
                    error.code ===
                        "ER_DUP_ENTRY" ||
                    error.errno ===
                        1062
                )
            ) {

                return {

                    created:
                        false,

                    duplicate:
                        true,

                    eventKey,

                    eventId:
                        null,

                };

            }

            throw error;

        }

    };

// ======================================
// LIVE CLASS CANCELLED EVENT
// ======================================

const emitLiveClassCancelledEvent =
    async (
        liveClass
    ) => {

        if (
            !liveClass ||
            !liveClass.id
        ) {

            throw new Error(
                "Live class ID is required to emit automation event."
            );

        }

        const eventKey =
            `LIVE_CLASS_CANCELLED:${liveClass.id}`;

        const payload = {

            live_class_id:
                Number(
                    liveClass.id
                ),

            batch_id:
                liveClass.batch_id
                    ? Number(
                        liveClass.batch_id
                    )
                    : null,

            course_id:
                liveClass.course_id
                    ? Number(
                        liveClass.course_id
                    )
                    : null,

            title:
                liveClass.title ||
                null,

            class_date:
                liveClass.class_date ||
                null,

            start_time:
                liveClass.start_time ||
                null,

            end_time:
                liveClass.end_time ||
                null,

            status:
                liveClass.status ||
                "Cancelled",

            source:
                "live_class",

        };

        try {

            const result =
                await new Promise(
                    (
                        resolve,
                        reject
                    ) => {

                        automationEventModel.createEvent(

                            {

                                event_key,

                                event_type:
                                    "LIVE_CLASS_CANCELLED",

                                aggregate_type:
                                    "LIVE_CLASS",

                                aggregate_id:
                                    Number(
                                        liveClass.id
                                    ),

                                payload_json:
                                    payload,

                            },

                            (
                                error,
                                response
                            ) => {

                                if (
                                    error
                                ) {

                                    return reject(
                                        error
                                    );

                                }

                                resolve(
                                    response
                                );

                            }

                        );

                    }
                );

            return {

                created:
                    true,

                duplicate:
                    false,

                eventKey,

                eventId:
                    result?.insertId ||
                    null,

            };

        } catch (
            error
        ) {

            if (
                error &&
                (
                    error.code ===
                        "ER_DUP_ENTRY" ||
                    error.errno ===
                        1062
                )
            ) {

                return {

                    created:
                        false,

                    duplicate:
                        true,

                    eventKey,

                    eventId:
                        null,

                };

            }

            throw error;

        }

    };

// ======================================
// EXPORT
// ======================================

module.exports = {

    emitLiveClassScheduledEvent,

    emitLiveClassUpdatedEvent,

    emitLiveClassCancelledEvent,

};