// ============================================================
// SkillNova LMS - Zoom Webhook Controller
// ============================================================

const crypto = require("crypto");

const liveClassModel =
    require("../models/liveClassModel");


// ============================================================
// GET ZOOM WEBHOOK SECRET
// ============================================================

const getWebhookSecret = () => {

    const secret =
        (
            process.env.ZOOM_WEBHOOK_SECRET_TOKEN ||
            process.env.ZOOM_WEBHOOK_SECRET ||
            ""
        ).trim();

    if (!secret) {

        throw new Error(
            "ZOOM_WEBHOOK_SECRET_TOKEN is missing in backend/.env"
        );

    }

    return secret;

};


// ============================================================
// CREATE ZOOM CRC RESPONSE
// ============================================================

const createZoomValidationResponse = (
    plainToken
) => {

    const secret =
        getWebhookSecret();

    const encryptedToken =
        crypto
            .createHmac(
                "sha256",
                secret
            )
            .update(plainToken)
            .digest("hex");

    return {

        plainToken,

        encryptedToken,

    };

};


// ============================================================
// VERIFY ZOOM WEBHOOK SIGNATURE
// ============================================================

const verifyZoomSignature = (
    req
) => {

    const timestamp =
        req.headers[
            "x-zm-request-timestamp"
        ];

    const signature =
        req.headers[
            "x-zm-signature"
        ];

    if (
        !timestamp ||
        !signature
    ) {

        console.error(
            "ZOOM SIGNATURE HEADERS MISSING"
        );

        return false;

    }


    const secret =
        getWebhookSecret();


    const message =
        `v0:${timestamp}:${JSON.stringify(
            req.body
        )}`;


    const expectedHash =
        crypto
            .createHmac(
                "sha256",
                secret
            )
            .update(message)
            .digest("hex");


    const expectedSignature =
        `v0=${expectedHash}`;


    if (
        signature.length !==
        expectedSignature.length
    ) {

        return false;

    }


    try {

        return crypto.timingSafeEqual(

            Buffer.from(
                signature,
                "utf8"
            ),

            Buffer.from(
                expectedSignature,
                "utf8"
            )

        );

    } catch {

        return false;

    }

};


// ============================================================
// ZOOM WEBHOOK
// ============================================================

exports.handleZoomWebhook =
    async (req, res) => {

        try {

            const body =
                req.body || {};


            console.log("");
            console.log(
                "======================================"
            );

            console.log(
                "ZOOM WEBHOOK RECEIVED"
            );

            console.log(
                "Event:",
                body.event || "unknown"
            );

            console.log(
                "======================================"
            );


            // =================================================
            // URL VALIDATION / CRC
            // =================================================

            if (
                body.event ===
                "endpoint.url_validation"
            ) {

                const plainToken =
                    body.payload?.plainToken;


                console.log(
                    "ZOOM CRC VALIDATION REQUEST"
                );


                if (!plainToken) {

                    console.error(
                        "Zoom plainToken missing."
                    );

                    return res.status(400).json({

                        success: false,

                        message:
                            "Zoom plainToken is missing."

                    });

                }


                const response =
                    createZoomValidationResponse(
                        plainToken
                    );


                console.log(
                    "ZOOM CRC RESPONSE GENERATED"
                );


                return res
                    .status(200)
                    .json(response);

            }


            // =================================================
            // VERIFY NORMAL WEBHOOK SIGNATURE
            // =================================================

            if (
                !verifyZoomSignature(req)
            ) {

                console.error(
                    "INVALID ZOOM WEBHOOK SIGNATURE"
                );

                return res.status(401).json({

                    success: false,

                    message:
                        "Invalid Zoom webhook signature."

                });

            }


            // =================================================
            // EVENT INFORMATION
            // =================================================

            const event =
                body.event;


            const object =
                body.payload?.object;


            const meetingId =
                object?.id
                    ? String(object.id)
                    : null;


            console.log(
                "Zoom Event:",
                event
            );

            console.log(
                "Meeting ID:",
                meetingId
            );


            // =================================================
            // NO MEETING ID
            // =================================================

            if (!meetingId) {

                return res.status(200).json({

                    success: true,

                    event,

                    message:
                        "Webhook received without meeting ID."

                });

            }


            // =================================================
            // MEETING STARTED
            // =================================================

            if (
                event ===
                "meeting.started"
            ) {

                console.log(
                    `Zoom meeting ${meetingId} started.`
                );


                return res.status(200).json({

                    success: true,

                    event,

                    meetingId,

                    message:
                        "Meeting started event received."

                });

            }


            // =================================================
            // MEETING ENDED
            // =================================================

            if (
                event ===
                "meeting.ended"
            ) {

                console.log(
                    `Zoom meeting ${meetingId} ended.`
                );


                return res.status(200).json({

                    success: true,

                    event,

                    meetingId,

                    message:
                        "Meeting ended event received."

                });

            }


            // =================================================
            // RECORDING COMPLETED
            // =================================================

            if (
                event ===
                "recording.completed"
            ) {

                console.log(
                    `Recording completed for meeting ${meetingId}.`
                );


                const recordingFiles =
                    body.payload
                        ?.object
                        ?.recording_files ||
                    [];


                const videoRecording =
                    recordingFiles.find(
                        (file) =>
                            file.file_type ===
                            "MP4"
                    );


                const recordingUrl =
                    videoRecording?.play_url ||
                    videoRecording?.download_url ||
                    null;


                if (!recordingUrl) {

                    console.warn(
                        "No usable MP4 recording URL found."
                    );

                    return res.status(200).json({

                        success: true,

                        event,

                        meetingId,

                        message:
                            "Recording received but no usable recording URL was found."

                    });

                }


                // =================================================
                // FIND LMS CLASS
                // =================================================

                liveClassModel
                    .getLiveClassByMeetingId(
                        meetingId,
                        (
                            findError,
                            rows
                        ) => {

                            if (findError) {

                                console.error(
                                    "FIND LIVE CLASS ERROR:",
                                    findError
                                );

                                return res.status(500).json({

                                    success: false,

                                    message:
                                        "Database error while locating live class."

                                });

                            }


                            if (
                                !rows ||
                                rows.length === 0
                            ) {

                                console.warn(
                                    `No LMS live class found for Zoom meeting ${meetingId}.`
                                );

                                return res.status(200).json({

                                    success: true,

                                    event,

                                    meetingId,

                                    message:
                                        "Recording received but matching LMS class was not found."

                                });

                            }


                            const liveClass =
                                rows[0];


                            // =============================================
                            // SAVE RECORDING
                            // =============================================

                            liveClassModel
                                .updateRecordingLink(
                                    liveClass.id,
                                    recordingUrl,
                                    (
                                        updateError
                                    ) => {

                                        if (
                                            updateError
                                        ) {

                                            console.error(
                                                "SAVE RECORDING ERROR:",
                                                updateError
                                            );

                                            return res.status(500).json({

                                                success: false,

                                                message:
                                                    "Failed to save recording link."

                                            });

                                        }


                                        console.log(
                                            "RECORDING LINK SAVED"
                                        );

                                        console.log(
                                            "Live Class ID:",
                                            liveClass.id
                                        );


                                        return res.status(200).json({

                                            success: true,

                                            event,

                                            meetingId,

                                            liveClassId:
                                                liveClass.id,

                                            message:
                                                "Recording link saved successfully."

                                        });

                                    }
                                );

                        }
                    );

                return;

            }


            // =================================================
            // OTHER EVENTS
            // =================================================

            console.log(
                "Zoom event received:",
                event
            );


            return res.status(200).json({

                success: true,

                event,

                meetingId,

                message:
                    "Zoom webhook received."

            });


        } catch (error) {

            console.error(
                "ZOOM WEBHOOK ERROR:",
                error
            );


            return res.status(500).json({

                success: false,

                message:
                    error.message ||
                    "Zoom webhook processing failed."

            });

        }

    };