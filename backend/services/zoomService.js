const axios = require("axios");


// ============================================================
// ZOOM CONFIGURATION
// ============================================================

const ZOOM_BASE_URL =
    "https://api.zoom.us/v2";

const ZOOM_TOKEN_URL =
    "https://zoom.us/oauth/token";


// ============================================================
// GET ZOOM ACCESS TOKEN
// ============================================================

const getZoomAccessToken = async () => {

    const {
        ZOOM_ACCOUNT_ID,
        ZOOM_CLIENT_ID,
        ZOOM_CLIENT_SECRET,
    } = process.env;


    if (
        !ZOOM_ACCOUNT_ID ||
        !ZOOM_CLIENT_ID ||
        !ZOOM_CLIENT_SECRET
    ) {

        throw new Error(
            "Zoom credentials are missing in backend/.env"
        );

    }


    const credentials =
        Buffer
            .from(
                `${ZOOM_CLIENT_ID}:${ZOOM_CLIENT_SECRET}`
            )
            .toString("base64");


    try {

        const response =
            await axios.post(

                ZOOM_TOKEN_URL,

                null,

                {

                    params: {

                        grant_type:
                            "account_credentials",

                        account_id:
                            ZOOM_ACCOUNT_ID,

                    },

                    headers: {

                        Authorization:
                            `Basic ${credentials}`,

                    },

                }

            );


        if (
            !response.data ||
            !response.data.access_token
        ) {

            throw new Error(
                "Zoom did not return an access token."
            );

        }


        return response.data.access_token;


    } catch (error) {

        console.error(
            "ZOOM TOKEN ERROR:",
            error.response?.data ||
            error.message
        );


        throw error;

    }

};


// ============================================================
// CREATE ZOOM MEETING
// ============================================================

const createZoomMeeting = async ({
    topic,
    start_time,
    duration,
    timezone = "Asia/Kolkata",
    agenda = "",
}) => {

    const accessToken =
        await getZoomAccessToken();


    if (!topic) {

        throw new Error(
            "Zoom meeting topic is required."
        );

    }


    if (!start_time) {

        throw new Error(
            "Zoom meeting start time is required."
        );

    }


    const meetingPayload = {

        topic,

        type: 2,

        start_time,

        duration:

            Number(duration) > 0
                ? Number(duration)
                : 60,

        timezone,

        agenda,

        settings: {

            host_video: true,

            participant_video: true,

            join_before_host: false,

            mute_upon_entry: true,

            waiting_room: true,

            auto_recording: "cloud",

        },

    };


    try {

        /*
         * "me" means the authenticated Zoom user.
         *
         * This works with the account-level
         * Server-to-Server OAuth application.
         */

        const response =
            await axios.post(

                `${ZOOM_BASE_URL}/users/me/meetings`,

                meetingPayload,

                {

                    headers: {

                        Authorization:
                            `Bearer ${accessToken}`,

                        "Content-Type":
                            "application/json",

                    },

                }

            );


        return response.data;


    } catch (error) {

        console.error(
            "ZOOM CREATE MEETING ERROR:"
        );

        console.error(
            "Status:",
            error.response?.status
        );

        console.error(
            "Data:",
            error.response?.data
        );


        throw error;

    }

};


// ============================================================
// GET ZOOM MEETING
// ============================================================

const getZoomMeeting = async (
    meetingId
) => {

    if (!meetingId) {

        throw new Error(
            "Zoom meeting ID is required."
        );

    }


    const accessToken =
        await getZoomAccessToken();


    try {

        const response =
            await axios.get(

                `${ZOOM_BASE_URL}/meetings/${meetingId}`,

                {

                    headers: {

                        Authorization:
                            `Bearer ${accessToken}`,

                    },

                }

            );


        return response.data;


    } catch (error) {

        console.error(
            "ZOOM GET MEETING ERROR:",
            error.response?.data ||
            error.message
        );


        throw error;

    }

};


// ============================================================
// UPDATE ZOOM MEETING
// ============================================================

const updateZoomMeeting = async (
    meetingId,
    meetingData
) => {

    if (!meetingId) {

        throw new Error(
            "Zoom meeting ID is required."
        );

    }


    const accessToken =
        await getZoomAccessToken();


    try {

        await axios.patch(

            `${ZOOM_BASE_URL}/meetings/${meetingId}`,

            meetingData,

            {

                headers: {

                    Authorization:
                        `Bearer ${accessToken}`,

                    "Content-Type":
                        "application/json",

                },

            }

        );


        return true;


    } catch (error) {

        console.error(
            "ZOOM UPDATE MEETING ERROR:",
            error.response?.data ||
            error.message
        );


        throw error;

    }

};


// ============================================================
// DELETE ZOOM MEETING
// ============================================================

const deleteZoomMeeting = async (
    meetingId
) => {

    if (!meetingId) {

        throw new Error(
            "Zoom meeting ID is required."
        );

    }


    const accessToken =
        await getZoomAccessToken();


    try {

        await axios.delete(

            `${ZOOM_BASE_URL}/meetings/${meetingId}`,

            {

                headers: {

                    Authorization:
                        `Bearer ${accessToken}`,

                },

            }

        );


        return true;


    } catch (error) {

        console.error(
            "ZOOM DELETE MEETING ERROR:",
            error.response?.data ||
            error.message
        );


        throw error;

    }

};


// ============================================================
// EXPORTS
// ============================================================

module.exports = {

    getZoomAccessToken,

    createZoomMeeting,

    getZoomMeeting,

    updateZoomMeeting,

    deleteZoomMeeting,

};