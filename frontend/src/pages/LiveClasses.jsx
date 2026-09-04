import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

import {
    FaVideo,
    FaCalendarAlt,
    FaClock,
    FaUsers,
    FaKey,
    FaPlayCircle,
    FaExternalLinkAlt,
    FaSyncAlt,
    FaCheckCircle,
    FaUserTie,
} from "react-icons/fa";

import toast from "react-hot-toast";

import { getLiveClasses } from "../services/liveClassService";


// ============================================================
// LIVE CLASSES
// ============================================================

function LiveClasses() {

    // ========================================================
    // STATE
    // ========================================================

    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [lastUpdated, setLastUpdated] = useState(null);


    // ========================================================
    // LOAD CLASSES
    // ========================================================

    useEffect(() => {
        loadClasses();
    }, []);


    const loadClasses = async (showRefresh = false) => {

        try {

            if (showRefresh) {
                setRefreshing(true);
            } else {
                setLoading(true);
            }

            const data = await getLiveClasses();

            const liveClasses = Array.isArray(data?.liveClasses)
                ? data.liveClasses
                : [];

            setClasses(liveClasses);
            setLastUpdated(new Date());

            console.log("========== LIVE CLASS DEBUG ==========");

            console.table(
                liveClasses.map((item) => ({
                    id: item.id,
                    title: item.title,
                    class_date: item.class_date,
                    start_time: item.start_time,
                    end_time: item.end_time,
                    status: item.status,
                }))
            );

            console.log("======================================");

        } catch (error) {

            console.error("LOAD LIVE CLASSES ERROR:", error);

            toast.error(
                error?.response?.data?.message ||
                "Failed to load live classes."
            );

            setClasses([]);

        } finally {

            setLoading(false);
            setRefreshing(false);

        }

    };


    // ============================================================
    // CONVERT IST DATE + TIME TO JAVASCRIPT TIMESTAMP
    // ============================================================
    //
    // MySQL stores:
    //
    // class_date = 2026-08-29
    // start_time = 20:25:00
    //
    // This means:
    //
    // 29 August 2026, 8:25 PM IST
    //
    // IST = UTC + 05:30
    //
    // This function is ONLY used for comparing time.
    // ============================================================

    const getClassDateTime = (item, timeValue) => {

        if (!item?.class_date || !timeValue) {
            return null;
        }

        try {

            const date = String(item.class_date).slice(0, 10);
            const time = String(timeValue).slice(0, 8);

            const dateParts = date.split("-").map(Number);
            const timeParts = time.split(":").map(Number);

            const year = dateParts[0];
            const month = dateParts[1];
            const day = dateParts[2];

            const hours = timeParts[0];
            const minutes = timeParts[1];
            const seconds = timeParts[2] || 0;

            if (
                !Number.isFinite(year) ||
                !Number.isFinite(month) ||
                !Number.isFinite(day) ||
                !Number.isFinite(hours) ||
                !Number.isFinite(minutes)
            ) {
                return null;
            }

            const istOffset =
                (5 * 60 + 30) * 60 * 1000;

            const utcTimestamp =
                Date.UTC(
                    year,
                    month - 1,
                    day,
                    hours,
                    minutes,
                    seconds
                ) - istOffset;

            const result = new Date(utcTimestamp);

            if (Number.isNaN(result.getTime())) {
                return null;
            }

            return result;

        } catch (error) {

            console.error(
                "DATE/TIME PARSE ERROR:",
                error
            );

            return null;

        }

    };


    // ============================================================
    // FORMAT DATE
    // ============================================================

    const formatDate = (value) => {

        if (!value) {
            return "Not provided";
        }

        try {

            const rawDate =
                String(value).slice(0, 10);

            const [year, month, day] =
                rawDate.split("-").map(Number);

            if (
                !year ||
                !month ||
                !day
            ) {
                return value;
            }

            const date =
                new Date(
                    year,
                    month - 1,
                    day
                );

            return date.toLocaleDateString(
                "en-IN",
                {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                }
            );

        } catch {

            return value;

        }

    };


    // ============================================================
    // FORMAT TIME
    // ============================================================
    //
    // IMPORTANT:
    //
    // DO NOT use:
    //
    // new Date("20:25:00")
    //
    // MySQL TIME is already IST.
    //
    // 20:25:00 -> 8:25 PM
    // ============================================================

    const formatTime = (value) => {

        if (!value) {
            return "";
        }

        try {

            const rawTime =
                String(value)
                    .trim()
                    .slice(0, 8);

            const parts =
                rawTime.split(":");

            const hours =
                Number(parts[0]);

            const minutes =
                Number(parts[1]);

            if (
                !Number.isFinite(hours) ||
                !Number.isFinite(minutes)
            ) {
                return value;
            }

            if (
                hours < 0 ||
                hours > 23 ||
                minutes < 0 ||
                minutes > 59
            ) {
                return value;
            }

            const period =
                hours >= 12
                    ? "PM"
                    : "AM";

            const displayHour =
                hours % 12 || 12;

            return (
                `${displayHour}:` +
                `${String(minutes).padStart(2, "0")} ` +
                `${period}`
            );

        } catch {

            return value;

        }

    };


    // ============================================================
    // FORMAT TIME RANGE
    // ============================================================

    const formatTimeRange = (item) => {

        const start =
            formatTime(item.start_time);

        const end =
            formatTime(item.end_time);

        if (start && end) {
            return `${start} - ${end}`;
        }

        if (start) {
            return start;
        }

        return "Time not provided";

    };


    // ============================================================
    // CLASSIFICATION
    // ============================================================

    const {
        ongoing,
        upcoming,
        completed,
    } = useMemo(() => {

        const now = new Date();

        const ongoingClasses = [];
        const upcomingClasses = [];
        const completedClasses = [];

        classes.forEach((item) => {

            if (
                !item?.class_date ||
                !item?.start_time
            ) {
                return;
            }

            const status =
                String(item.status || "")
                    .trim()
                    .toLowerCase();

            // ----------------------------------------------
            // CANCELLED
            // ----------------------------------------------

            if (status === "cancelled") {
                return;
            }

            // ----------------------------------------------
            // START
            // ----------------------------------------------

            const startDateTime =
                getClassDateTime(
                    item,
                    item.start_time
                );

            if (!startDateTime) {
                return;
            }

            // ----------------------------------------------
            // END
            // ----------------------------------------------

            const endDateTime =
                item.end_time
                    ? getClassDateTime(
                        item,
                        item.end_time
                    )
                    : null;

            // ----------------------------------------------
            // COMPLETED
            // ----------------------------------------------

            if (
                status === "completed" ||
                (
                    endDateTime &&
                    now >= endDateTime
                ) ||
                (
                    !endDateTime &&
                    now >= startDateTime
                )
            ) {

                completedClasses.push(item);
                return;

            }

            // ----------------------------------------------
            // ONGOING
            // ----------------------------------------------

            if (
                now >= startDateTime &&
                endDateTime &&
                now < endDateTime
            ) {

                ongoingClasses.push(item);
                return;

            }

            // ----------------------------------------------
            // UPCOMING
            // ----------------------------------------------

            if (now < startDateTime) {

                upcomingClasses.push(item);

            }

        });


        // ==================================================
        // SORT UPCOMING
        // ==================================================

        upcomingClasses.sort((a, b) => {

            const aTime =
                getClassDateTime(
                    a,
                    a.start_time
                );

            const bTime =
                getClassDateTime(
                    b,
                    b.start_time
                );

            return (
                (aTime?.getTime() || 0) -
                (bTime?.getTime() || 0)
            );

        });


        // ==================================================
        // SORT ONGOING
        // ==================================================

        ongoingClasses.sort((a, b) => {

            const aTime =
                getClassDateTime(
                    a,
                    a.start_time
                );

            const bTime =
                getClassDateTime(
                    b,
                    b.start_time
                );

            return (
                (aTime?.getTime() || 0) -
                (bTime?.getTime() || 0)
            );

        });


        // ==================================================
        // SORT COMPLETED
        // ==================================================

        completedClasses.sort((a, b) => {

            const aTime =
                getClassDateTime(
                    a,
                    a.start_time
                );

            const bTime =
                getClassDateTime(
                    b,
                    b.start_time
                );

            return (
                (bTime?.getTime() || 0) -
                (aTime?.getTime() || 0)
            );

        });


        return {
            ongoing: ongoingClasses,
            upcoming: upcomingClasses,
            completed: completedClasses,
        };

    }, [classes]);


    // ============================================================
    // JOIN CLASS
    // ============================================================

    const handleJoinClass = (item) => {

        if (!item?.zoom_link) {

            toast.error(
                "Meeting link is not available."
            );

            return;

        }

        window.open(
            item.zoom_link,
            "_blank",
            "noopener,noreferrer"
        );

    };


    // ============================================================
    // CLASS CARD
    // ============================================================

    const ClassCard = ({ item, type }) => {

        const isOngoing =
            type === "ongoing";

        const isUpcoming =
            type === "upcoming";

        const isCompleted =
            type === "completed";


        return (

            <motion.div
                initial={{
                    opacity: 0,
                    y: 15,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                transition={{
                    duration: 0.3,
                }}
                className="
                    bg-white
                    rounded-3xl
                    border
                    border-slate-200
                    shadow-lg
                    hover:shadow-xl
                    transition
                    overflow-hidden
                "
            >

                <div className="
                    p-6
                    sm:p-7
                ">

                    {/* ==================================================
                        TOP BADGE
                    ================================================== */}

                    <div className="
                        flex
                        items-start
                        justify-between
                        gap-4
                        mb-5
                    ">

                        <div>

                            {isOngoing && (

                                <span className="
                                    inline-flex
                                    items-center
                                    gap-2
                                    bg-red-50
                                    text-red-600
                                    px-3
                                    py-1.5
                                    rounded-full
                                    text-xs
                                    font-bold
                                ">

                                    <span className="
                                        w-2
                                        h-2
                                        rounded-full
                                        bg-red-500
                                        animate-pulse
                                    " />

                                    LIVE NOW

                                </span>

                            )}

                            {isUpcoming && (

                                <span className="
                                    inline-flex
                                    items-center
                                    gap-2
                                    bg-indigo-50
                                    text-indigo-600
                                    px-3
                                    py-1.5
                                    rounded-full
                                    text-xs
                                    font-bold
                                ">

                                    <FaClock />

                                    UPCOMING

                                </span>

                            )}

                            {isCompleted && (

                                <span className="
                                    inline-flex
                                    items-center
                                    gap-2
                                    bg-green-50
                                    text-green-600
                                    px-3
                                    py-1.5
                                    rounded-full
                                    text-xs
                                    font-bold
                                ">

                                    <FaCheckCircle />

                                    PAST CLASS

                                </span>

                            )}

                        </div>


                        <span className="
                            text-xs
                            text-slate-400
                            font-medium
                        ">

                            #{item.id}

                        </span>

                    </div>


                    {/* ==================================================
                        TITLE
                    ================================================== */}

                    <h3 className="
                        text-2xl
                        font-black
                        text-slate-900
                        leading-tight
                    ">

                        {item.title || "Live Class"}

                    </h3>


                    {/* ==================================================
                        BATCH
                    ================================================== */}

                    <div className="
                        mt-3
                        flex
                        items-center
                        gap-2
                        text-sm
                        text-cyan-600
                        font-semibold
                    ">

                        <FaUsers />

                        {item.batch_name ||
                            "Assigned Batch"}

                    </div>


                    {/* ==================================================
                        INFORMATION
                    ================================================== */}

                    <div className="
                        grid
                        grid-cols-1
                        sm:grid-cols-2
                        gap-3
                        mt-6
                    ">

                        {/* MENTOR */}

                        <div className="
                            flex
                            items-center
                            gap-3
                            rounded-2xl
                            bg-slate-50
                            p-4
                        ">

                            <FaUserTie
                                className="
                                    text-purple-600
                                    shrink-0
                                "
                            />

                            <div className="min-w-0">

                                <p className="
                                    text-xs
                                    text-slate-400
                                ">

                                    Mentor

                                </p>

                                <p className="
                                    text-sm
                                    font-semibold
                                    text-slate-800
                                    truncate
                                ">

                                    {item.mentor_name ||
                                        item.mentor ||
                                        "Mentor"}

                                </p>

                            </div>

                        </div>


                        {/* DATE */}

                        <div className="
                            flex
                            items-center
                            gap-3
                            rounded-2xl
                            bg-slate-50
                            p-4
                        ">

                            <FaCalendarAlt
                                className="
                                    text-blue-600
                                    shrink-0
                                "
                            />

                            <div className="min-w-0">

                                <p className="
                                    text-xs
                                    text-slate-400
                                ">

                                    Date

                                </p>

                                <p className="
                                    text-sm
                                    font-semibold
                                    text-slate-800
                                ">

                                    {formatDate(
                                        item.class_date
                                    )}

                                </p>

                            </div>

                        </div>


                        {/* TIME */}

                        <div className="
                            flex
                            items-center
                            gap-3
                            rounded-2xl
                            bg-slate-50
                            p-4
                        ">

                            <FaClock
                                className="
                                    text-orange-600
                                    shrink-0
                                "
                            />

                            <div>

                                <p className="
                                    text-xs
                                    text-slate-400
                                ">

                                    Time · Delhi / IST

                                </p>

                                <p className="
                                    text-sm
                                    font-semibold
                                    text-slate-800
                                ">

                                    {formatTimeRange(item)}

                                </p>

                            </div>

                        </div>


                        {/* COURSE */}

                        <div className="
                            flex
                            items-center
                            gap-3
                            rounded-2xl
                            bg-slate-50
                            p-4
                        ">

                            <FaUsers
                                className="
                                    text-cyan-600
                                    shrink-0
                                "
                            />

                            <div className="min-w-0">

                                <p className="
                                    text-xs
                                    text-slate-400
                                ">

                                    Course

                                </p>

                                <p className="
                                    text-sm
                                    font-semibold
                                    text-slate-800
                                ">

                                    {item.course_id
                                        ? `Course #${item.course_id}`
                                        : "Assigned Course"}

                                </p>

                            </div>

                        </div>

                    </div>


                    {/* ==================================================
                        DESCRIPTION
                    ================================================== */}

                    {item.description && (

                        <div className="
                            mt-6
                            rounded-2xl
                            bg-slate-50
                            border
                            border-slate-100
                            p-4
                        ">

                            <p className="
                                text-sm
                                text-slate-600
                                leading-6
                            ">

                                {item.description}

                            </p>

                        </div>

                    )}


                    {/* ==================================================
                        MEETING ID
                    ================================================== */}

                    {isOngoing &&
                        item.meeting_id && (

                            <div className="
                                mt-5
                                rounded-2xl
                                bg-red-50
                                border
                                border-red-100
                                p-4
                            ">

                                <div className="
                                    flex
                                    items-center
                                    gap-3
                                ">

                                    <FaKey
                                        className="
                                            text-red-500
                                        "
                                    />

                                    <div>

                                        <p className="
                                            text-xs
                                            text-red-400
                                            font-semibold
                                        ">

                                            Meeting ID

                                        </p>

                                        <p className="
                                            font-bold
                                            text-red-700
                                        ">

                                            {item.meeting_id}

                                        </p>

                                    </div>

                                </div>

                            </div>

                        )}


                    {/* ==================================================
                        ACTION
                    ================================================== */}

                    <div className="mt-6">

                        {/* LIVE */}

                        {isOngoing && (

                            item.zoom_link ? (

                                <button
                                    type="button"
                                    onClick={() =>
                                        handleJoinClass(item)
                                    }
                                    className="
                                        w-full
                                        rounded-2xl
                                        bg-red-500
                                        hover:bg-red-600
                                        text-white
                                        py-4
                                        font-bold
                                        flex
                                        items-center
                                        justify-center
                                        gap-3
                                        transition
                                    "
                                >

                                    <FaPlayCircle />

                                    Join Live Class

                                    <FaExternalLinkAlt
                                        size={12}
                                    />

                                </button>

                            ) : (

                                <div className="
                                    w-full
                                    rounded-2xl
                                    bg-slate-100
                                    text-slate-400
                                    py-4
                                    text-center
                                    font-semibold
                                ">

                                    Meeting Link Not Available

                                </div>

                            )

                        )}


                        {/* UPCOMING */}

                        {isUpcoming && (

                            <div className="
                                w-full
                                rounded-2xl
                                bg-indigo-50
                                border
                                border-indigo-100
                                text-indigo-700
                                py-4
                                text-center
                                font-bold
                            ">

                                <div className="
                                    flex
                                    items-center
                                    justify-center
                                    gap-2
                                ">

                                    <FaClock />

                                    Upcoming Session

                                </div>

                            </div>

                        )}


                        {/* COMPLETED */}

                        {isCompleted && (

                            item.recording_link ? (

                                <a
                                    href={item.recording_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="
                                        w-full
                                        rounded-2xl
                                        bg-slate-700
                                        hover:bg-slate-800
                                        text-white
                                        py-4
                                        font-bold
                                        flex
                                        items-center
                                        justify-center
                                        gap-3
                                        transition
                                    "
                                >

                                    <FaPlayCircle />

                                    Watch Recording

                                    <FaExternalLinkAlt
                                        size={12}
                                    />

                                </a>

                            ) : (

                                <div className="
                                    w-full
                                    rounded-2xl
                                    bg-slate-100
                                    text-slate-400
                                    py-4
                                    text-center
                                    font-semibold
                                ">

                                    Recording Not Available

                                </div>

                            )

                        )}

                    </div>

                </div>

            </motion.div>

        );

    };


    // ============================================================
    // LOADING
    // ============================================================

    if (loading) {

        return (

            <div className="
                min-h-screen
                bg-slate-100
                flex
                items-center
                justify-center
                p-6
            ">

                <div className="
                    bg-white
                    rounded-3xl
                    shadow-lg
                    p-10
                    text-center
                ">

                    <div className="
                        w-12
                        h-12
                        border-4
                        border-indigo-100
                        border-t-indigo-600
                        rounded-full
                        animate-spin
                        mx-auto
                    " />

                    <p className="
                        mt-5
                        text-slate-600
                        font-semibold
                    ">

                        Loading live classes...

                    </p>

                </div>

            </div>

        );

    }


    // ============================================================
    // PAGE
    // ============================================================

    return (

        <div className="
            min-h-screen
            bg-slate-100
            p-5
            sm:p-6
            md:p-8
        ">

            <div className="
                max-w-7xl
                mx-auto
            ">

                {/* ==================================================
                    HEADER
                ================================================== */}

                <div className="
                    bg-white
                    rounded-3xl
                    border
                    border-slate-200
                    shadow-sm
                    p-6
                    sm:p-8
                    mb-8
                ">

                    <div className="
                        flex
                        flex-col
                        lg:flex-row
                        lg:items-center
                        lg:justify-between
                        gap-6
                    ">

                        <div>

                            <div className="
                                flex
                                items-center
                                gap-4
                            ">

                                <div className="
                                    w-14
                                    h-14
                                    sm:w-16
                                    sm:h-16
                                    rounded-2xl
                                    bg-indigo-50
                                    text-indigo-600
                                    flex
                                    items-center
                                    justify-center
                                ">

                                    <FaVideo size={28} />

                                </div>


                                <div>

                                    <p className="
                                        text-indigo-600
                                        font-semibold
                                    ">

                                        Learning Schedule

                                    </p>

                                    <h1 className="
                                        text-3xl
                                        sm:text-4xl
                                        font-black
                                        text-slate-900
                                    ">

                                        Live Classes

                                    </h1>

                                </div>

                            </div>


                            <p className="
                                text-slate-500
                                mt-5
                                max-w-2xl
                            ">

                                Join live sessions, learn
                                directly from mentors, and
                                watch recordings of past
                                classes.

                            </p>


                            <p className="
                                text-xs
                                text-slate-400
                                mt-2
                            ">

                                All class times are shown in
                                Delhi / India Standard Time (IST).

                            </p>

                        </div>


                        {/* REFRESH */}

                        <button
                            type="button"
                            onClick={() =>
                                loadClasses(true)
                            }
                            disabled={refreshing}
                            className="
                                shrink-0
                                px-5
                                py-3
                                rounded-2xl
                                border
                                border-slate-200
                                bg-slate-50
                                text-slate-700
                                font-semibold
                                flex
                                items-center
                                justify-center
                                gap-3
                                hover:bg-indigo-50
                                hover:text-indigo-600
                                disabled:opacity-50
                                transition
                            "
                        >

                            <FaSyncAlt
                                className={
                                    refreshing
                                        ? "animate-spin"
                                        : ""
                                }
                            />

                            {refreshing
                                ? "Refreshing..."
                                : "Refresh"}

                        </button>

                    </div>


                    {lastUpdated && (

                        <p className="
                            text-xs
                            text-slate-400
                            mt-5
                        ">

                            Last updated{" "}

                            {lastUpdated.toLocaleTimeString(
                                "en-IN",
                                {
                                    hour: "numeric",
                                    minute: "2-digit",
                                }
                            )}

                        </p>

                    )}

                </div>


                {/* ==================================================
                    EMPTY
                ================================================== */}

                {!loading &&
                    classes.length === 0 && (

                        <div className="
                            bg-white
                            rounded-3xl
                            border
                            border-slate-200
                            shadow-lg
                            p-12
                            text-center
                        ">

                            <div className="
                                w-20
                                h-20
                                mx-auto
                                rounded-2xl
                                bg-indigo-50
                                text-indigo-600
                                flex
                                items-center
                                justify-center
                                text-3xl
                            ">

                                <FaVideo />

                            </div>


                            <h2 className="
                                text-2xl
                                font-black
                                text-slate-800
                                mt-6
                            ">

                                No Live Classes Yet

                            </h2>


                            <p className="
                                text-slate-500
                                mt-3
                                max-w-md
                                mx-auto
                            ">

                                Your assigned live classes
                                will appear here when they
                                are scheduled.

                            </p>

                        </div>

                    )}


                {/* ==================================================
                    LIVE NOW
                ================================================== */}

                {ongoing.length > 0 && (

                    <section className="mb-10">

                        <div className="
                            flex
                            items-center
                            gap-3
                            mb-6
                        ">

                            <span className="
                                w-3
                                h-3
                                rounded-full
                                bg-red-500
                                animate-pulse
                            " />


                            <h2 className="
                                text-2xl
                                font-black
                                text-slate-900
                            ">

                                Live Now

                            </h2>


                            <span className="
                                bg-red-50
                                text-red-600
                                px-3
                                py-1
                                rounded-full
                                text-xs
                                font-bold
                            ">

                                {ongoing.length}

                            </span>

                        </div>


                        <div className="
                            grid
                            lg:grid-cols-2
                            gap-6
                        ">

                            {ongoing.map((item) => (

                                <ClassCard
                                    key={item.id}
                                    item={item}
                                    type="ongoing"
                                />

                            ))}

                        </div>

                    </section>

                )}


                {/* ==================================================
                    UPCOMING
                ================================================== */}

                <section className="mb-10">

                    <div className="
                        flex
                        flex-col
                        sm:flex-row
                        sm:items-end
                        sm:justify-between
                        gap-3
                        mb-6
                    ">

                        <div>

                            <p className="
                                text-indigo-600
                                font-semibold
                            ">

                                Schedule

                            </p>


                            <h2 className="
                                text-3xl
                                font-black
                                text-slate-900
                            ">

                                Upcoming Classes

                            </h2>

                        </div>


                        <span className="
                            self-start
                            sm:self-auto
                            bg-indigo-100
                            text-indigo-700
                            px-4
                            py-2
                            rounded-xl
                            font-bold
                            text-sm
                        ">

                            {upcoming.length}{" "}

                            {upcoming.length === 1
                                ? "Class"
                                : "Classes"}

                        </span>

                    </div>


                    {upcoming.length === 0 ? (

                        <div className="
                            bg-white
                            rounded-3xl
                            border
                            border-slate-200
                            shadow-lg
                            p-10
                            text-center
                        ">

                            <FaCalendarAlt
                                className="
                                    mx-auto
                                    text-slate-300
                                "
                                size={45}
                            />


                            <h3 className="
                                text-xl
                                font-bold
                                text-slate-800
                                mt-5
                            ">

                                No Upcoming Classes

                            </h3>


                            <p className="
                                text-slate-500
                                mt-2
                            ">

                                New scheduled classes
                                will appear here.

                            </p>

                        </div>

                    ) : (

                        <div className="
                            grid
                            lg:grid-cols-2
                            gap-6
                        ">

                            {upcoming.map((item) => (

                                <ClassCard
                                    key={item.id}
                                    item={item}
                                    type="upcoming"
                                />

                            ))}

                        </div>

                    )}

                </section>


                {/* ==================================================
                    PAST CLASSES
                ================================================== */}

                <section>

                    <div className="
                        flex
                        flex-col
                        sm:flex-row
                        sm:items-center
                        sm:justify-between
                        gap-4
                        mb-6
                    ">

                        <div className="
                            flex
                            items-center
                            gap-3
                        ">

                            <div className="
                                w-10
                                h-10
                                rounded-xl
                                bg-green-50
                                text-green-600
                                flex
                                items-center
                                justify-center
                            ">

                                <FaCheckCircle />

                            </div>


                            <div>

                                <p className="
                                    text-green-600
                                    font-semibold
                                    text-sm
                                ">

                                    Your History

                                </p>


                                <h2 className="
                                    text-3xl
                                    font-black
                                    text-slate-900
                                ">

                                    Past Classes & Recordings

                                </h2>

                            </div>

                        </div>


                        <span className="
                            self-start
                            sm:self-auto
                            bg-green-100
                            text-green-700
                            px-4
                            py-2
                            rounded-xl
                            font-bold
                            text-sm
                        ">

                            {completed.length}{" "}

                            {completed.length === 1
                                ? "Class"
                                : "Classes"}

                        </span>

                    </div>


                    {completed.length === 0 ? (

                        <div className="
                            bg-white
                            rounded-3xl
                            border
                            border-slate-200
                            shadow-lg
                            p-10
                            text-center
                        ">

                            <FaCheckCircle
                                className="
                                    mx-auto
                                    text-slate-300
                                "
                                size={45}
                            />


                            <h3 className="
                                text-xl
                                font-bold
                                text-slate-800
                                mt-5
                            ">

                                No Past Classes Yet

                            </h3>


                            <p className="
                                text-slate-500
                                mt-2
                            ">

                                Completed live sessions
                                and their recordings
                                will appear here.

                            </p>

                        </div>

                    ) : (

                        <div className="
                            grid
                            lg:grid-cols-2
                            gap-6
                        ">

                            {completed.map((item) => (

                                <ClassCard
                                    key={item.id}
                                    item={item}
                                    type="completed"
                                />

                            ))}

                        </div>

                    )}

                </section>

            </div>

        </div>

    );

}


export default LiveClasses;