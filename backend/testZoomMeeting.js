require("dotenv").config();

const {
    createZoomMeeting,
} = require("./services/zoomService");

const run = async () => {

    try {

        const meeting =
            await createZoomMeeting({

                topic:
                    "SkillNova Zoom Integration Test",

                start_time:
                    "2026-08-30T18:00:00Z",

                duration:
                    60,

                timezone:
                    "Asia/Kolkata",

                agenda:
                    "Testing SkillNova LMS Zoom integration",

            });

        console.log("");
        console.log("====================================");
        console.log("ZOOM MEETING CREATED SUCCESSFULLY");
        console.log("====================================");

        console.log("Meeting ID:", meeting.id);
        console.log("Join URL:", meeting.join_url);
        console.log("Password:", meeting.password);
        console.log("Start URL:", meeting.start_url);

        console.log("====================================");

    } catch (error) {

        console.error("");
        console.error("====================================");
        console.error("ZOOM MEETING CREATION FAILED");
        console.error("====================================");

        console.error(
            error.response?.data ||
            error.message
        );

    }

};

run();