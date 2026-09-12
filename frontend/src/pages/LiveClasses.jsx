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
    FaArrowRight,
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

    const [classes, setClasses] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [refreshing, setRefreshing] =
        useState(false);

    const [lastUpdated, setLastUpdated] =
        useState(null);


    // ========================================================
    // LOAD CLASSES
    // ========================================================

    useEffect(() => {

        loadClasses();

    }, []);


    const loadClasses = async (
        showRefresh = false
    ) => {

        try {

            if (showRefresh) {

                setRefreshing(true);

            } else {

                setLoading(true);

            }


            const data =
                await getLiveClasses();


            const liveClasses =
                Array.isArray(
                    data?.liveClasses
                )
                    ? data.liveClasses
                    : [];


            setClasses(
                liveClasses
            );

            setLastUpdated(
                new Date()
            );


            console.log(
                "========== LIVE CLASS DEBUG =========="
            );


            console.table(
                liveClasses.map(
                    (item) => ({
                        id: item.id,
                        title: item.title,
                        class_date:
                            item.class_date,
                        start_time:
                            item.start_time,
                        end_time:
                            item.end_time,
                        status:
                            item.status,
                    })
                )
            );


            console.log(
                "======================================"
            );

        } catch (error) {

            console.error(
                "LOAD LIVE CLASSES ERROR:",
                error
            );


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

    const getClassDateTime = (
        item,
        timeValue
    ) => {

        if (
            !item?.class_date ||
            !timeValue
        ) {

            return null;

        }


        try {

            const date =
                String(
                    item.class_date
                ).slice(0, 10);


            const time =
                String(
                    timeValue
                ).slice(0, 8);


            const dateParts =
                date
                    .split("-")
                    .map(Number);


            const timeParts =
                time
                    .split(":")
                    .map(Number);


            const year =
                dateParts[0];

            const month =
                dateParts[1];

            const day =
                dateParts[2];


            const hours =
                timeParts[0];

            const minutes =
                timeParts[1];

            const seconds =
                timeParts[2] || 0;


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
                (5 * 60 + 30) *
                60 *
                1000;


            const utcTimestamp =
                Date.UTC(
                    year,
                    month - 1,
                    day,
                    hours,
                    minutes,
                    seconds
                ) -
                istOffset;


            const result =
                new Date(
                    utcTimestamp
                );


            if (
                Number.isNaN(
                    result.getTime()
                )
            ) {

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

    const formatDate = (
        value
    ) => {

        if (!value) {

            return "Not provided";

        }


        try {

            const rawDate =
                String(value)
                    .slice(0, 10);


            const [
                year,
                month,
                day,
            ] =
                rawDate
                    .split("-")
                    .map(Number);


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
                    month: "short",
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

    const formatTime = (
        value
    ) => {

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

    const formatTimeRange = (
        item
    ) => {

        const start =
            formatTime(
                item.start_time
            );


        const end =
            formatTime(
                item.end_time
            );


        if (
            start &&
            end
        ) {

            return (
                `${start} - ${end}`
            );

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
    } =
        useMemo(() => {

            const now =
                new Date();


            const ongoingClasses =
                [];

            const upcomingClasses =
                [];

            const completedClasses =
                [];


            classes.forEach(
                (item) => {

                    if (
                        !item?.class_date ||
                        !item?.start_time
                    ) {

                        return;

                    }


                    const status =
                        String(
                            item.status ||
                            ""
                        )
                            .trim()
                            .toLowerCase();


                    // ----------------------------------------------
                    // CANCELLED
                    // ----------------------------------------------

                    if (
                        status ===
                        "cancelled"
                    ) {

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


                    if (
                        !startDateTime
                    ) {

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
                        status ===
                            "completed" ||
                        (
                            endDateTime &&
                            now >=
                                endDateTime
                        ) ||
                        (
                            !endDateTime &&
                            now >=
                                startDateTime
                        )
                    ) {

                        completedClasses.push(
                            item
                        );

                        return;

                    }


                    // ----------------------------------------------
                    // ONGOING
                    // ----------------------------------------------

                    if (
                        now >=
                            startDateTime &&
                        endDateTime &&
                        now <
                            endDateTime
                    ) {

                        ongoingClasses.push(
                            item
                        );

                        return;

                    }


                    // ----------------------------------------------
                    // UPCOMING
                    // ----------------------------------------------

                    if (
                        now <
                        startDateTime
                    ) {

                        upcomingClasses.push(
                            item
                        );

                    }

                }
            );


            // ==================================================
            // SORT UPCOMING
            // ==================================================

            upcomingClasses.sort(
                (a, b) => {

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
                        (
                            aTime?.getTime() ||
                            0
                        ) -
                        (
                            bTime?.getTime() ||
                            0
                        )
                    );

                }
            );


            // ==================================================
            // SORT ONGOING
            // ==================================================

            ongoingClasses.sort(
                (a, b) => {

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
                        (
                            aTime?.getTime() ||
                            0
                        ) -
                        (
                            bTime?.getTime() ||
                            0
                        )
                    );

                }
            );


            // ==================================================
            // SORT COMPLETED
            // ==================================================

            completedClasses.sort(
                (a, b) => {

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
                        (
                            bTime?.getTime() ||
                            0
                        ) -
                        (
                            aTime?.getTime() ||
                            0
                        )
                    );

                }
            );


            return {
                ongoing:
                    ongoingClasses,
                upcoming:
                    upcomingClasses,
                completed:
                    completedClasses,
            };

        }, [classes]);


    // ============================================================
    // JOIN CLASS
    // ============================================================

    const handleJoinClass = (
        item
    ) => {

        if (
            !item?.zoom_link
        ) {

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

    const ClassCard = ({
        item,
        type,
    }) => {

        const isOngoing =
            type === "ongoing";


        const isUpcoming =
            type === "upcoming";


        const isCompleted =
            type === "completed";


        return (

            <motion.article
                initial={{
                    opacity: 0,
                    y: 12,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                whileHover={{
                    y: -3,
                }}
                transition={{
                    duration: 0.22,
                }}
                className="
                    group
                    flex
                    h-full
                    flex-col
                    overflow-hidden
                    rounded-[22px]
                    border
                    border-[#E6EDF7]
                    bg-white
                    shadow-[0_8px_24px_rgba(11,27,58,0.045)]
                    transition-shadow
                    duration-300
                    hover:border-[#D5E5F7]
                    hover:shadow-[0_14px_34px_rgba(11,27,58,0.08)]
                "
            >

                {/* ==================================================
                    CARD TOP
                ================================================== */}

                <div
                    className="
                        relative
                        h-[148px]
                        shrink-0
                        overflow-hidden
                        bg-[#EAF2FF]
                    "
                >

                    {/* Decorative DataLattice pattern */}

                    <div
                        className="
                            pointer-events-none
                            absolute
                            inset-0
                            opacity-60
                        "
                    >

                        <div
                            className="
                                absolute
                                -right-16
                                -top-20
                                h-56
                                w-56
                                rounded-full
                                border
                                border-[#1463FF]/10
                            "
                        />

                        <div
                            className="
                                absolute
                                -right-4
                                -top-10
                                h-40
                                w-40
                                rounded-full
                                border
                                border-[#06B6D4]/10
                            "
                        />

                        <div
                            className="
                                absolute
                                bottom-0
                                left-0
                                h-px
                                w-full
                                bg-[#1463FF]/10
                            "
                        />

                    </div>


                    {/* Main icon */}

                    <div
                        className="
                            absolute
                            left-5
                            top-5
                            flex
                            h-11
                            w-11
                            items-center
                            justify-center
                            rounded-xl
                            bg-white
                            text-[#1463FF]
                            shadow-sm
                        "
                    >

                        <FaVideo
                            size={17}
                        />

                    </div>


                    {/* Status */}

                    <div
                        className="
                            absolute
                            right-4
                            top-4
                        "
                    >

                        {isOngoing && (

                            <span
                                className="
                                    inline-flex
                                    items-center
                                    gap-1.5
                                    rounded-full
                                    bg-[#1463FF]
                                    px-3
                                    py-1.5
                                    text-[10px]
                                    font-bold
                                    tracking-wide
                                    text-white
                                    shadow-sm
                                "
                            >

                                <span
                                    className="
                                        h-1.5
                                        w-1.5
                                        animate-pulse
                                        rounded-full
                                        bg-white
                                    "
                                />

                                LIVE NOW

                            </span>

                        )}


                        {isUpcoming && (

                            <span
                                className="
                                    inline-flex
                                    items-center
                                    gap-1.5
                                    rounded-full
                                    bg-white
                                    px-3
                                    py-1.5
                                    text-[10px]
                                    font-bold
                                    tracking-wide
                                    text-[#1463FF]
                                    shadow-sm
                                "
                            >

                                UPCOMING

                            </span>

                        )}


                        {isCompleted && (

                            <span
                                className="
                                    inline-flex
                                    items-center
                                    gap-1.5
                                    rounded-full
                                    bg-[#D2E4D4]
                                    px-3
                                    py-1.5
                                    text-[10px]
                                    font-bold
                                    tracking-wide
                                    text-[#315B3A]
                                "
                            >

                                <FaCheckCircle
                                    size={9}
                                />

                                COMPLETED

                            </span>

                        )}

                    </div>


                    {/* Class number */}

                    <div
                        className="
                            absolute
                            bottom-4
                            left-5
                            text-[10px]
                            font-semibold
                            text-[#64748B]
                        "
                    >

                        SESSION #{item.id}

                    </div>

                </div>


                {/* ==================================================
                    CARD CONTENT
                ================================================== */}

                <div
                    className="
                        flex
                        flex-1
                        flex-col
                        p-5
                    "
                >

                    {/* ==================================================
                        TITLE
                    ================================================== */}

                    <h3
                        className="
                            line-clamp-2
                            text-[17px]
                            font-bold
                            leading-6
                            tracking-[-0.02em]
                            text-[#0B1B3A]
                        "
                    >

                        {item.title ||
                            "Live Class"}

                    </h3>


                    {/* ==================================================
                        BATCH
                    ================================================== */}

                    <div
                        className="
                            mt-2.5
                            flex
                            min-w-0
                            items-center
                            gap-2
                            text-xs
                            font-semibold
                            text-[#1463FF]
                        "
                    >

                        <span
                            className="
                                flex
                                h-6
                                w-6
                                shrink-0
                                items-center
                                justify-center
                                rounded-lg
                                bg-[#EAF2FF]
                            "
                        >

                            <FaUsers
                                size={10}
                            />

                        </span>


                        <span
                            className="
                                truncate
                            "
                        >

                            {item.batch_name ||
                                "Assigned Batch"}

                        </span>

                    </div>


                    {/* ==================================================
                        DETAILS
                    ================================================== */}

                    <div
                        className="
                            mt-5
                            grid
                            grid-cols-1
                            gap-2.5
                        "
                    >

                        {/* DATE */}

                        <div
                            className="
                                flex
                                items-center
                                gap-3
                                rounded-xl
                                border
                                border-[#E6EDF7]
                                bg-[#F8FBFF]
                                px-3.5
                                py-3
                            "
                        >

                            <span
                                className="
                                    flex
                                    h-8
                                    w-8
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-lg
                                    bg-[#EAF2FF]
                                    text-[#1463FF]
                                "
                            >

                                <FaCalendarAlt
                                    size={11}
                                />

                            </span>


                            <div
                                className="
                                    min-w-0
                                "
                            >

                                <p
                                    className="
                                        text-[9px]
                                        font-semibold
                                        uppercase
                                        tracking-[0.08em]
                                        text-[#94A3B8]
                                    "
                                >

                                    Date

                                </p>


                                <p
                                    className="
                                        mt-0.5
                                        truncate
                                        text-xs
                                        font-semibold
                                        text-[#0B1B3A]
                                    "
                                >

                                    {formatDate(
                                        item.class_date
                                    )}

                                </p>

                            </div>

                        </div>


                        {/* TIME */}

                        <div
                            className="
                                flex
                                items-center
                                gap-3
                                rounded-xl
                                border
                                border-[#E6EDF7]
                                bg-[#F8FBFF]
                                px-3.5
                                py-3
                            "
                        >

                            <span
                                className="
                                    flex
                                    h-8
                                    w-8
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-lg
                                    bg-[#EAF2FF]
                                    text-[#06B6D4]
                                "
                            >

                                <FaClock
                                    size={11}
                                />

                            </span>


                            <div
                                className="
                                    min-w-0
                                "
                            >

                                <p
                                    className="
                                        text-[9px]
                                        font-semibold
                                        uppercase
                                        tracking-[0.08em]
                                        text-[#94A3B8]
                                    "
                                >

                                    Time · IST

                                </p>


                                <p
                                    className="
                                        mt-0.5
                                        truncate
                                        text-xs
                                        font-semibold
                                        text-[#0B1B3A]
                                    "
                                >

                                    {formatTimeRange(
                                        item
                                    )}

                                </p>

                            </div>

                        </div>


                        {/* MENTOR */}

                        <div
                            className="
                                flex
                                items-center
                                gap-3
                                rounded-xl
                                border
                                border-[#E6EDF7]
                                bg-[#F8FBFF]
                                px-3.5
                                py-3
                            "
                        >

                            <span
                                className="
                                    flex
                                    h-8
                                    w-8
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-lg
                                    bg-[#EAF2FF]
                                    text-[#1463FF]
                                "
                            >

                                <FaUserTie
                                    size={11}
                                />

                            </span>


                            <div
                                className="
                                    min-w-0
                                "
                            >

                                <p
                                    className="
                                        text-[9px]
                                        font-semibold
                                        uppercase
                                        tracking-[0.08em]
                                        text-[#94A3B8]
                                    "
                                >

                                    Mentor

                                </p>


                                <p
                                    className="
                                        mt-0.5
                                        truncate
                                        text-xs
                                        font-semibold
                                        text-[#0B1B3A]
                                    "
                                >

                                    {item.mentor_name ||
                                        item.mentor ||
                                        "Mentor"}

                                </p>

                            </div>

                        </div>

                    </div>


                    {/* ==================================================
                        DESCRIPTION
                    ================================================== */}

                    {item.description && (

                        <p
                            className="
                                mt-4
                                line-clamp-2
                                text-[11px]
                                leading-5
                                text-[#64748B]
                            "
                        >

                            {item.description}

                        </p>

                    )}


                    {/* ==================================================
                        MEETING ID
                    ================================================== */}

                    {isOngoing &&
                        item.meeting_id && (

                            <div
                                className="
                                    mt-4
                                    flex
                                    items-center
                                    gap-3
                                    rounded-xl
                                    border
                                    border-[#DCEAFF]
                                    bg-[#F5F9FF]
                                    px-3.5
                                    py-3
                                "
                            >

                                <FaKey
                                    className="
                                        shrink-0
                                        text-[#1463FF]
                                    "
                                    size={12}
                                />


                                <div>

                                    <p
                                        className="
                                            text-[9px]
                                            font-semibold
                                            uppercase
                                            tracking-[0.08em]
                                            text-[#94A3B8]
                                        "
                                    >

                                        Meeting ID

                                    </p>


                                    <p
                                        className="
                                            mt-0.5
                                            text-xs
                                            font-bold
                                            text-[#0B1B3A]
                                        "
                                    >

                                        {item.meeting_id}

                                    </p>

                                </div>

                            </div>

                        )}


                    {/* ==================================================
                        ACTION
                    ================================================== */}

                    <div
                        className="
                            mt-auto
                            pt-5
                        "
                    >

                        {/* LIVE */}

                        {isOngoing && (

                            item.zoom_link ? (

                                <button
                                    type="button"
                                    onClick={() =>
                                        handleJoinClass(
                                            item
                                        )
                                    }
                                    className="
                                        flex
                                        w-full
                                        items-center
                                        justify-center
                                        gap-2
                                        rounded-xl
                                        bg-[#1463FF]
                                        px-4
                                        py-3
                                        text-xs
                                        font-bold
                                        text-white
                                        shadow-[0_7px_18px_rgba(20,99,255,0.14)]
                                        transition-all
                                        duration-200
                                        hover:bg-[#0B1B3A]
                                        hover:shadow-[0_9px_22px_rgba(11,27,58,0.14)]
                                    "
                                >

                                    <FaPlayCircle
                                        size={12}
                                    />

                                    Join Live Class

                                    <FaExternalLinkAlt
                                        className="ml-auto"
                                        size={9}
                                    />

                                </button>

                            ) : (

                                <div
                                    className="
                                        w-full
                                        rounded-xl
                                        border
                                        border-[#E6EDF7]
                                        bg-[#F5F9FF]
                                        px-4
                                        py-3
                                        text-center
                                        text-xs
                                        font-semibold
                                        text-[#94A3B8]
                                    "
                                >

                                    Meeting Link Not Available

                                </div>

                            )

                        )}


                        {/* UPCOMING */}

                        {isUpcoming && (

                            <div
                                className="
                                    flex
                                    w-full
                                    items-center
                                    justify-center
                                    gap-2
                                    rounded-xl
                                    border
                                    border-[#DCEAFF]
                                    bg-[#EAF2FF]
                                    px-4
                                    py-3
                                    text-xs
                                    font-bold
                                    text-[#1463FF]
                                "
                            >

                                <FaClock
                                    size={11}
                                />

                                Upcoming Session

                            </div>

                        )}


                        {/* COMPLETED */}

                        {isCompleted && (

                            item.recording_link ? (

                                <a
                                    href={
                                        item.recording_link
                                    }
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="
                                        flex
                                        w-full
                                        items-center
                                        justify-center
                                        gap-2
                                        rounded-xl
                                        bg-[#0B1B3A]
                                        px-4
                                        py-3
                                        text-xs
                                        font-bold
                                        text-white
                                        transition-all
                                        duration-200
                                        hover:bg-[#1463FF]
                                    "
                                >

                                    <FaPlayCircle
                                        size={12}
                                    />

                                    Watch Recording

                                    <FaExternalLinkAlt
                                        className="ml-auto"
                                        size={9}
                                    />

                                </a>

                            ) : (

                                <div
                                    className="
                                        w-full
                                        rounded-xl
                                        border
                                        border-[#E6EDF7]
                                        bg-[#F5F9FF]
                                        px-4
                                        py-3
                                        text-center
                                        text-xs
                                        font-semibold
                                        text-[#94A3B8]
                                    "
                                >

                                    Recording Not Available

                                </div>

                            )

                        )}

                    </div>

                </div>

            </motion.article>

        );

    };


    // ============================================================
    // LOADING
    // ============================================================

    if (loading) {

        return (

            <div
                className="
                    min-h-full
                    bg-[#F5F9FF]
                    px-4
                    py-5
                    sm:px-6
                    lg:px-8
                "
            >

                <div
                    className="
                        mx-auto
                        w-full
                        max-w-[1500px]
                    "
                >

                    {/* HEADER SKELETON */}

                    <div
                        className="
                            overflow-hidden
                            rounded-[24px]
                            border
                            border-[#E6EDF7]
                            bg-white
                            p-6
                            shadow-[0_8px_24px_rgba(11,27,58,0.04)]
                            sm:p-7
                        "
                    >

                        <div
                            className="
                                flex
                                items-center
                                gap-4
                            "
                        >

                            <div
                                className="
                                    h-12
                                    w-12
                                    animate-pulse
                                    rounded-xl
                                    bg-[#EAF2FF]
                                "
                            />


                            <div
                                className="
                                    flex-1
                                "
                            >

                                <div
                                    className="
                                        h-3
                                        w-28
                                        animate-pulse
                                        rounded
                                        bg-[#E6EDF7]
                                    "
                                />


                                <div
                                    className="
                                        mt-2
                                        h-7
                                        w-48
                                        animate-pulse
                                        rounded-lg
                                        bg-[#E6EDF7]
                                    "
                                />

                            </div>

                        </div>

                    </div>


                    {/* CARD SKELETONS */}

                    <div
                        className="
                            mt-6
                            grid
                            grid-cols-1
                            gap-5
                            md:grid-cols-2
                            xl:grid-cols-3
                        "
                    >

                        {[1, 2, 3].map(
                            (item) => (

                                <div
                                    key={item}
                                    className="
                                        overflow-hidden
                                        rounded-[22px]
                                        border
                                        border-[#E6EDF7]
                                        bg-white
                                    "
                                >

                                    <div
                                        className="
                                            h-[148px]
                                            animate-pulse
                                            bg-[#EAF2FF]
                                        "
                                    />


                                    <div
                                        className="
                                            space-y-3
                                            p-5
                                        "
                                    >

                                        <div
                                            className="
                                                h-5
                                                w-4/5
                                                animate-pulse
                                                rounded
                                                bg-[#E6EDF7]
                                            "
                                        />


                                        <div
                                            className="
                                                h-3
                                                w-1/2
                                                animate-pulse
                                                rounded
                                                bg-[#E6EDF7]
                                            "
                                        />


                                        <div
                                            className="
                                                mt-5
                                                h-11
                                                animate-pulse
                                                rounded-xl
                                                bg-[#F5F9FF]
                                            "
                                        />


                                        <div
                                            className="
                                                h-11
                                                animate-pulse
                                                rounded-xl
                                                bg-[#F5F9FF]
                                            "
                                        />


                                        <div
                                            className="
                                                h-10
                                                animate-pulse
                                                rounded-xl
                                                bg-[#E6EDF7]
                                            "
                                        />

                                    </div>

                                </div>

                            )
                        )}

                    </div>

                </div>

            </div>

        );

    }


    // ============================================================
    // PAGE
    // ============================================================

    return (

        <div
            className="
                min-h-full
                bg-[#F5F9FF]
                px-4
                py-5
                sm:px-6
                lg:px-8
                xl:px-10
            "
        >

            <div
                className="
                    mx-auto
                    w-full
                    max-w-[1500px]
                "
            >

                {/* ==================================================
                    HEADER
                ================================================== */}

                <section
                    className="
                        relative
                        overflow-hidden
                        rounded-[24px]
                        border
                        border-[#E6EDF7]
                        bg-white
                        px-5
                        py-6
                        shadow-[0_8px_24px_rgba(11,27,58,0.04)]
                        sm:px-7
                        sm:py-7
                    "
                >

                    {/* Decorative background */}

                    <div
                        className="
                            pointer-events-none
                            absolute
                            -right-24
                            -top-28
                            h-72
                            w-72
                            rounded-full
                            border
                            border-[#1463FF]/[0.06]
                        "
                    />

                    <div
                        className="
                            pointer-events-none
                            absolute
                            -right-8
                            -top-12
                            h-48
                            w-48
                            rounded-full
                            border
                            border-[#06B6D4]/[0.07]
                        "
                    />


                    <div
                        className="
                            relative
                            flex
                            flex-col
                            gap-6
                            lg:flex-row
                            lg:items-center
                            lg:justify-between
                        "
                    >

                        {/* LEFT */}

                        <div
                            className="
                                min-w-0
                            "
                        >

                            <div
                                className="
                                    flex
                                    items-center
                                    gap-3
                                "
                            >

                                <div
                                    className="
                                        flex
                                        h-12
                                        w-12
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-xl
                                        bg-[#EAF2FF]
                                        text-[#1463FF]
                                    "
                                >

                                    <FaVideo
                                        size={19}
                                    />

                                </div>


                                <div>

                                    <p
                                        className="
                                            text-[10px]
                                            font-bold
                                            uppercase
                                            tracking-[0.14em]
                                            text-[#1463FF]
                                        "
                                    >

                                        Learning Schedule

                                    </p>


                                    <h1
                                        className="
                                            mt-1
                                            text-2xl
                                            font-bold
                                            tracking-[-0.035em]
                                            text-[#0B1B3A]
                                            sm:text-[28px]
                                        "
                                    >

                                        Live Classes

                                    </h1>

                                </div>

                            </div>


                            <p
                                className="
                                    mt-4
                                    max-w-2xl
                                    text-sm
                                    leading-6
                                    text-[#64748B]
                                "
                            >

                                Join live sessions, learn
                                directly from mentors, and
                                access recordings from your
                                completed classes.

                            </p>


                            <div
                                className="
                                    mt-3
                                    inline-flex
                                    items-center
                                    gap-2
                                    rounded-full
                                    bg-[#F5F9FF]
                                    px-3
                                    py-1.5
                                    text-[10px]
                                    font-semibold
                                    text-[#64748B]
                                "
                            >

                                <FaClock
                                    className="text-[#06B6D4]"
                                    size={9}
                                />

                                All times shown in
                                India Standard Time (IST)

                            </div>

                        </div>


                        {/* RIGHT */}

                        <div
                            className="
                                flex
                                shrink-0
                                flex-col
                                items-stretch
                                gap-3
                                sm:flex-row
                                sm:items-center
                            "
                        >

                            {/* SESSION COUNT */}

                            <div
                                className="
                                    rounded-xl
                                    border
                                    border-[#E6EDF7]
                                    bg-[#F8FBFF]
                                    px-4
                                    py-3
                                "
                            >

                                <p
                                    className="
                                        text-[9px]
                                        font-bold
                                        uppercase
                                        tracking-[0.1em]
                                        text-[#94A3B8]
                                    "
                                >

                                    Total Sessions

                                </p>


                                <p
                                    className="
                                        mt-1
                                        text-lg
                                        font-bold
                                        text-[#0B1B3A]
                                    "
                                >

                                    {classes.length}

                                </p>

                            </div>


                            {/* REFRESH */}

                            <button
                                type="button"
                                onClick={() =>
                                    loadClasses(
                                        true
                                    )
                                }
                                disabled={
                                    refreshing
                                }
                                className="
                                    flex
                                    items-center
                                    justify-center
                                    gap-2
                                    rounded-xl
                                    border
                                    border-[#DCEAFF]
                                    bg-white
                                    px-4
                                    py-3
                                    text-xs
                                    font-bold
                                    text-[#1463FF]
                                    transition-all
                                    duration-200
                                    hover:border-[#1463FF]
                                    hover:bg-[#F5F9FF]
                                    disabled:cursor-not-allowed
                                    disabled:opacity-50
                                "
                            >

                                <FaSyncAlt
                                    className={
                                        refreshing
                                            ? "animate-spin"
                                            : ""
                                    }
                                    size={11}
                                />

                                {refreshing
                                    ? "Refreshing..."
                                    : "Refresh"}

                            </button>

                        </div>

                    </div>


                    {/* LAST UPDATED */}

                    {lastUpdated && (

                        <div
                            className="
                                relative
                                mt-5
                                border-t
                                border-[#E6EDF7]
                                pt-4
                            "
                        >

                            <p
                                className="
                                    text-[10px]
                                    font-medium
                                    text-[#94A3B8]
                                "
                            >

                                Last updated{" "}

                                {lastUpdated.toLocaleTimeString(
                                    "en-IN",
                                    {
                                        hour:
                                            "numeric",
                                        minute:
                                            "2-digit",
                                    }
                                )}

                            </p>

                        </div>

                    )}

                </section>


                {/* ==================================================
                    SESSION OVERVIEW
                ================================================== */}

                {!loading &&
                    classes.length > 0 && (

                        <section
                            className="
                                mt-5
                                grid
                                grid-cols-1
                                gap-3
                                sm:grid-cols-3
                            "
                        >

                            {/* LIVE */}

                            <div
                                className="
                                    flex
                                    items-center
                                    justify-between
                                    rounded-[18px]
                                    border
                                    border-[#DCEAFF]
                                    bg-white
                                    px-4
                                    py-4
                                    shadow-[0_5px_18px_rgba(11,27,58,0.025)]
                                "
                            >

                                <div
                                    className="
                                        flex
                                        items-center
                                        gap-3
                                    "
                                >

                                    <span
                                        className="
                                            flex
                                            h-9
                                            w-9
                                            items-center
                                            justify-center
                                            rounded-xl
                                            bg-[#EAF2FF]
                                            text-[#1463FF]
                                        "
                                    >

                                        <FaVideo
                                            size={12}
                                        />

                                    </span>


                                    <div>

                                        <p
                                            className="
                                                text-[10px]
                                                font-semibold
                                                uppercase
                                                tracking-[0.08em]
                                                text-[#94A3B8]
                                            "
                                        >

                                            Live Now

                                        </p>


                                        <p
                                            className="
                                                mt-0.5
                                                text-sm
                                                font-bold
                                                text-[#0B1B3A]
                                            "
                                        >

                                            Active Sessions

                                        </p>

                                    </div>

                                </div>


                                <span
                                    className="
                                        text-xl
                                        font-bold
                                        text-[#1463FF]
                                    "
                                >

                                    {ongoing.length}

                                </span>

                            </div>


                            {/* UPCOMING */}

                            <div
                                className="
                                    flex
                                    items-center
                                    justify-between
                                    rounded-[18px]
                                    border
                                    border-[#E6EDF7]
                                    bg-white
                                    px-4
                                    py-4
                                    shadow-[0_5px_18px_rgba(11,27,58,0.025)]
                                "
                            >

                                <div
                                    className="
                                        flex
                                        items-center
                                        gap-3
                                    "
                                >

                                    <span
                                        className="
                                            flex
                                            h-9
                                            w-9
                                            items-center
                                            justify-center
                                            rounded-xl
                                            bg-[#F5F9FF]
                                            text-[#06B6D4]
                                        "
                                    >

                                        <FaCalendarAlt
                                            size={12}
                                        />

                                    </span>


                                    <div>

                                        <p
                                            className="
                                                text-[10px]
                                                font-semibold
                                                uppercase
                                                tracking-[0.08em]
                                                text-[#94A3B8]
                                            "
                                        >

                                            Upcoming

                                        </p>


                                        <p
                                            className="
                                                mt-0.5
                                                text-sm
                                                font-bold
                                                text-[#0B1B3A]
                                            "
                                        >

                                            Scheduled

                                        </p>

                                    </div>

                                </div>


                                <span
                                    className="
                                        text-xl
                                        font-bold
                                        text-[#06B6D4]
                                    "
                                >

                                    {upcoming.length}

                                </span>

                            </div>


                            {/* COMPLETED */}

                            <div
                                className="
                                    flex
                                    items-center
                                    justify-between
                                    rounded-[18px]
                                    border
                                    border-[#E6EDF7]
                                    bg-white
                                    px-4
                                    py-4
                                    shadow-[0_5px_18px_rgba(11,27,58,0.025)]
                                "
                            >

                                <div
                                    className="
                                        flex
                                        items-center
                                        gap-3
                                    "
                                >

                                    <span
                                        className="
                                            flex
                                            h-9
                                            w-9
                                            items-center
                                            justify-center
                                            rounded-xl
                                            bg-[#D2E4D4]
                                            text-[#315B3A]
                                        "
                                    >

                                        <FaCheckCircle
                                            size={12}
                                        />

                                    </span>


                                    <div>

                                        <p
                                            className="
                                                text-[10px]
                                                font-semibold
                                                uppercase
                                                tracking-[0.08em]
                                                text-[#94A3B8]
                                            "
                                        >

                                            Completed

                                        </p>


                                        <p
                                            className="
                                                mt-0.5
                                                text-sm
                                                font-bold
                                                text-[#0B1B3A]
                                            "
                                        >

                                            Past Sessions

                                        </p>

                                    </div>

                                </div>


                                <span
                                    className="
                                        text-xl
                                        font-bold
                                        text-[#315B3A]
                                    "
                                >

                                    {completed.length}

                                </span>

                            </div>

                        </section>

                    )}


                {/* ==================================================
                    EMPTY
                ================================================== */}

                {!loading &&
                    classes.length === 0 && (

                        <section
                            className="
                                mt-6
                                rounded-[24px]
                                border
                                border-[#E6EDF7]
                                bg-white
                                px-6
                                py-14
                                text-center
                                shadow-[0_8px_24px_rgba(11,27,58,0.04)]
                            "
                        >

                            <div
                                className="
                                    mx-auto
                                    flex
                                    h-16
                                    w-16
                                    items-center
                                    justify-center
                                    rounded-2xl
                                    bg-[#EAF2FF]
                                    text-[#1463FF]
                                "
                            >

                                <FaVideo
                                    size={24}
                                />

                            </div>


                            <h2
                                className="
                                    mt-5
                                    text-xl
                                    font-bold
                                    text-[#0B1B3A]
                                "
                            >

                                No Live Classes Yet

                            </h2>


                            <p
                                className="
                                    mx-auto
                                    mt-2
                                    max-w-md
                                    text-sm
                                    leading-6
                                    text-[#64748B]
                                "
                            >

                                Your assigned live classes
                                will appear here when they
                                are scheduled.

                            </p>


                            <button
                                type="button"
                                onClick={() =>
                                    loadClasses(
                                        true
                                    )
                                }
                                className="
                                    mt-6
                                    inline-flex
                                    items-center
                                    gap-2
                                    rounded-xl
                                    bg-[#1463FF]
                                    px-5
                                    py-3
                                    text-xs
                                    font-bold
                                    text-white
                                    transition
                                    hover:bg-[#0B1B3A]
                                "
                            >

                                <FaSyncAlt
                                    size={10}
                                />

                                Check Again

                            </button>

                        </section>

                    )}


                {/* ==================================================
                    LIVE NOW
                ================================================== */}

                {ongoing.length > 0 && (

                    <section
                        className="
                            mt-7
                        "
                    >

                        <div
                            className="
                                mb-4
                                flex
                                items-end
                                justify-between
                                gap-4
                            "
                        >

                            <div>

                                <div
                                    className="
                                        flex
                                        items-center
                                        gap-2
                                    "
                                >

                                    <span
                                        className="
                                            h-2
                                            w-2
                                            animate-pulse
                                            rounded-full
                                            bg-[#1463FF]
                                        "
                                    />


                                    <p
                                        className="
                                            text-[10px]
                                            font-bold
                                            uppercase
                                            tracking-[0.12em]
                                            text-[#1463FF]
                                        "
                                    >

                                        Happening Now

                                    </p>

                                </div>


                                <h2
                                    className="
                                        mt-1
                                        text-xl
                                        font-bold
                                        tracking-[-0.025em]
                                        text-[#0B1B3A]
                                    "
                                >

                                    Live Sessions

                                </h2>

                            </div>


                            <span
                                className="
                                    rounded-full
                                    bg-[#EAF2FF]
                                    px-3
                                    py-1
                                    text-[10px]
                                    font-bold
                                    text-[#1463FF]
                                "
                            >

                                {ongoing.length} Active

                            </span>

                        </div>


                        <div
                            className="
                                grid
                                grid-cols-1
                                gap-5
                                md:grid-cols-2
                                xl:grid-cols-3
                            "
                        >

                            {ongoing.map(
                                (item) => (

                                    <ClassCard
                                        key={
                                            item.id
                                        }
                                        item={
                                            item
                                        }
                                        type="ongoing"
                                    />

                                )
                            )}

                        </div>

                    </section>

                )}


                {/* ==================================================
                    UPCOMING
                ================================================== */}

                <section
                    className="
                        mt-8
                    "
                >

                    <div
                        className="
                            mb-4
                            flex
                            items-end
                            justify-between
                            gap-4
                        "
                    >

                        <div>

                            <p
                                className="
                                    text-[10px]
                                    font-bold
                                    uppercase
                                    tracking-[0.12em]
                                    text-[#1463FF]
                                "
                            >

                                Your Schedule

                            </p>


                            <h2
                                className="
                                    mt-1
                                    text-xl
                                    font-bold
                                    tracking-[-0.025em]
                                    text-[#0B1B3A]
                                "
                            >

                                Upcoming Classes

                            </h2>

                        </div>


                        <span
                            className="
                                rounded-full
                                bg-[#F5F9FF]
                                px-3
                                py-1
                                text-[10px]
                                font-bold
                                text-[#64748B]
                            "
                        >

                            {upcoming.length}{" "}

                            {upcoming.length === 1
                                ? "Class"
                                : "Classes"}

                        </span>

                    </div>


                    {upcoming.length === 0 ? (

                        <div
                            className="
                                rounded-[22px]
                                border
                                border-[#E6EDF7]
                                bg-white
                                px-6
                                py-10
                                text-center
                            "
                        >

                            <div
                                className="
                                    mx-auto
                                    flex
                                    h-12
                                    w-12
                                    items-center
                                    justify-center
                                    rounded-xl
                                    bg-[#F5F9FF]
                                    text-[#94A3B8]
                                "
                            >

                                <FaCalendarAlt
                                    size={17}
                                />

                            </div>


                            <h3
                                className="
                                    mt-4
                                    text-base
                                    font-bold
                                    text-[#0B1B3A]
                                "
                            >

                                No Upcoming Classes

                            </h3>


                            <p
                                className="
                                    mt-1.5
                                    text-xs
                                    text-[#64748B]
                                "
                            >

                                New scheduled classes
                                will appear here.

                            </p>

                        </div>

                    ) : (

                        <div
                            className="
                                grid
                                grid-cols-1
                                gap-5
                                md:grid-cols-2
                                xl:grid-cols-3
                            "
                        >

                            {upcoming.map(
                                (item) => (

                                    <ClassCard
                                        key={
                                            item.id
                                        }
                                        item={
                                            item
                                        }
                                        type="upcoming"
                                    />

                                )
                            )}

                        </div>

                    )}

                </section>


                {/* ==================================================
                    PAST CLASSES
                ================================================== */}

                <section
                    className="
                        mt-8
                        pb-6
                    "
                >

                    <div
                        className="
                            mb-4
                            flex
                            items-end
                            justify-between
                            gap-4
                        "
                    >

                        <div>

                            <p
                                className="
                                    text-[10px]
                                    font-bold
                                    uppercase
                                    tracking-[0.12em]
                                    text-[#315B3A]
                                "
                            >

                                Learning History

                            </p>


                            <h2
                                className="
                                    mt-1
                                    text-xl
                                    font-bold
                                    tracking-[-0.025em]
                                    text-[#0B1B3A]
                                "
                            >

                                Past Classes & Recordings

                            </h2>

                        </div>


                        <span
                            className="
                                rounded-full
                                bg-[#D2E4D4]
                                px-3
                                py-1
                                text-[10px]
                                font-bold
                                text-[#315B3A]
                            "
                        >

                            {completed.length}{" "}

                            {completed.length === 1
                                ? "Class"
                                : "Classes"}

                        </span>

                    </div>


                    {completed.length === 0 ? (

                        <div
                            className="
                                rounded-[22px]
                                border
                                border-[#E6EDF7]
                                bg-white
                                px-6
                                py-10
                                text-center
                            "
                        >

                            <div
                                className="
                                    mx-auto
                                    flex
                                    h-12
                                    w-12
                                    items-center
                                    justify-center
                                    rounded-xl
                                    bg-[#D2E4D4]
                                    text-[#315B3A]
                                "
                            >

                                <FaCheckCircle
                                    size={17}
                                />

                            </div>


                            <h3
                                className="
                                    mt-4
                                    text-base
                                    font-bold
                                    text-[#0B1B3A]
                                "
                            >

                                No Past Classes Yet

                            </h3>


                            <p
                                className="
                                    mt-1.5
                                    text-xs
                                    text-[#64748B]
                                "
                            >

                                Completed live sessions
                                and their recordings
                                will appear here.

                            </p>

                        </div>

                    ) : (

                        <div
                            className="
                                grid
                                grid-cols-1
                                gap-5
                                md:grid-cols-2
                                xl:grid-cols-3
                            "
                        >

                            {completed.map(
                                (item) => (

                                    <ClassCard
                                        key={
                                            item.id
                                        }
                                        item={
                                            item
                                        }
                                        type="completed"
                                    />

                                )
                            )}

                        </div>

                    )}

                </section>

            </div>

        </div>

    );

}


export default LiveClasses;