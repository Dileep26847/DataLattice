import { useEffect, useState } from "react";

import {
    FaBookOpen,
    FaClipboardCheck,
    FaTasks,
    FaChartLine,
} from "react-icons/fa";

import { motion } from "framer-motion";

import {
    getDashboardStats,
} from "../../services/studentDashboardService";


// ============================================================
// DATALATTICE STUDENT DASHBOARD
// STATS CARDS
// ============================================================

function StatsCards() {

    const user = JSON.parse(
        localStorage.getItem("user")
    );


    const [stats, setStats] = useState({

        totalCourses: 0,

        completedLessons: 0,

        totalLessons: 0,

        totalAssignments: 0,

        submittedAssignments: 0,

        overallProgress: 0,

    });


    const [loading, setLoading] =
        useState(true);


    // ========================================================
    // LOAD DASHBOARD
    // ========================================================

    useEffect(() => {

        if (user?.id) {

            fetchDashboardStats();

        } else {

            setLoading(false);

        }

    }, []);


    // ========================================================
    // FETCH STATS
    // ========================================================

    const fetchDashboardStats =
        async () => {

            try {

                const data =
                    await getDashboardStats(
                        user.id
                    );


                setStats(

                    data?.stats || {

                        totalCourses: 0,

                        completedLessons: 0,

                        totalLessons: 0,

                        totalAssignments: 0,

                        submittedAssignments: 0,

                        overallProgress: 0,

                    }

                );

            }

            catch (error) {

                console.error(
                    "Dashboard Stats Error:",
                    error
                );

            }

            finally {

                setLoading(false);

            }

        };


    // ========================================================
    // PENDING ASSIGNMENTS
    // ========================================================

    const pendingAssignments =
        Math.max(

            0,

            Number(
                stats.totalAssignments || 0
            )

            -

            Number(
                stats.submittedAssignments || 0
            )

        );


    // ========================================================
    // SAFE PROGRESS
    // ========================================================

    const progressValue =
        Math.min(

            100,

            Math.max(

                0,

                Number(
                    stats.overallProgress || 0
                )

            )

        );


    // ========================================================
    // CARD CONFIGURATION
    // ========================================================

    const cards = [

        {
            title:
                "Courses Enrolled",

            value:
                stats.totalCourses,

            subtitle:
                "Active Courses",

            icon:
                <FaBookOpen />,

            cardColor:
                "#D2E4D4",

            iconColor:
                "#B8D1BA",

            iconText:
                "#0B1B3A",

            accent:
                "#7FAF84",
        },


        {
            title:
                "Completed Lessons",

            value:
                stats.completedLessons,

            subtitle:
                "Keep Learning",

            icon:
                <FaClipboardCheck />,

            cardColor:
                "#C8E2F2",

            iconColor:
                "#A7CDDF",

            iconText:
                "#1463FF",

            accent:
                "#06B6D4",
        },


        {
            title:
                "Pending Assignments",

            value:
                pendingAssignments,

            subtitle:
                "Complete Soon",

            icon:
                <FaTasks />,

            cardColor:
                "#FCE2C8",

            iconColor:
                "#E7CDA7",

            iconText:
                "#0B1B3A",

            accent:
                "#D59A5B",
        },


        {
            title:
                "Overall Progress",

            value:
                `${progressValue}%`,

            subtitle:
                "Course Progress",

            icon:
                <FaChartLine />,

            cardColor:
                "#ECD9F5",

            iconColor:
                "#D9BEE8",

            iconText:
                "#1463FF",

            accent:
                "#9B70B5",

            progress:
                progressValue,
        },

    ];


    // ========================================================
    // LOADING
    // ========================================================

    if (loading) {

        return (

            <div
                className="
                    grid
                    grid-cols-1
                    gap-4
                    sm:grid-cols-2
                    xl:grid-cols-4
                "
            >

                {cards.map(
                    (_, index) => (

                        <div
                            key={index}
                            className="
                                h-[154px]
                                animate-pulse
                                rounded-2xl
                                border
                                border-[#E6EDF7]
                                bg-white
                            "
                        />

                    )
                )}

            </div>

        );

    }


    // ========================================================
    // RENDER
    // ========================================================

    return (

        <div
            className="
                grid
                grid-cols-1
                gap-4
                sm:grid-cols-2
                xl:grid-cols-4
            "
        >

            {cards.map(
                (card, index) => (

                    <motion.div

                        key={card.title}

                        initial={{
                            opacity: 0,
                            y: 12,
                        }}

                        animate={{
                            opacity: 1,
                            y: 0,
                        }}

                        transition={{
                            delay:
                                index * 0.07,

                            duration:
                                0.4,

                            ease:
                                [0.22, 1, 0.36, 1],
                        }}

                        whileHover={{
                            y: -3,
                        }}

                        style={{
                            backgroundColor:
                                card.cardColor,
                        }}

                        className="
                            group
                            relative
                            min-w-0
                            overflow-hidden
                            rounded-2xl
                            border
                            border-white/70
                            p-5
                            shadow-[0_7px_22px_rgba(11,27,58,0.055)]
                            transition-all
                            duration-300
                            hover:shadow-[0_12px_30px_rgba(11,27,58,0.09)]
                        "
                    >

                        {/* ==================================================
                            TOP ACCENT
                        ================================================== */}

                        <div
                            className="
                                absolute
                                inset-x-0
                                top-0
                                h-[3px]
                            "
                            style={{
                                backgroundColor:
                                    card.accent,
                            }}
                        />


                        {/* ==================================================
                            HEADER
                        ================================================== */}

                        <div
                            className="
                                flex
                                items-start
                                justify-between
                                gap-4
                            "
                        >

                            <div
                                className="
                                    min-w-0
                                "
                            >

                                <p
                                    className="
                                        truncate
                                        text-[12px]
                                        font-medium
                                        leading-5
                                        text-[#334155]
                                    "
                                >

                                    {card.title}

                                </p>


                                <p
                                    className="
                                        mt-2
                                        text-[30px]
                                        font-bold
                                        leading-none
                                        tracking-[-0.035em]
                                        text-[#0B1B3A]
                                    "
                                >

                                    {card.value}

                                </p>

                            </div>


                            {/* ==================================================
                                ICON
                            ================================================== */}

                            <div
                                className="
                                    flex
                                    h-11
                                    w-11
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-xl
                                    transition-transform
                                    duration-300
                                    group-hover:scale-105
                                "
                                style={{
                                    backgroundColor:
                                        card.iconColor,

                                    color:
                                        card.iconText,
                                }}
                            >

                                {card.icon}

                            </div>

                        </div>


                        {/* ==================================================
                            FOOTER
                        ================================================== */}

                        <div
                            className="
                                mt-5
                                flex
                                min-h-[20px]
                                items-center
                                justify-between
                                gap-3
                            "
                        >

                            <p
                                className="
                                    text-[11px]
                                    font-medium
                                    text-[#475569]
                                "
                            >

                                {card.subtitle}

                            </p>


                            {card.title ===
                                "Completed Lessons" && (

                                <span
                                    className="
                                        h-1.5
                                        w-1.5
                                        shrink-0
                                        rounded-full
                                        bg-[#06B6D4]
                                    "
                                />

                            )}


                            {card.title ===
                                "Pending Assignments" && (

                                <span
                                    className="
                                        rounded-full
                                        bg-white/55
                                        px-2
                                        py-1
                                        text-[9px]
                                        font-semibold
                                        text-[#0B1B3A]
                                    "
                                >

                                    Action

                                </span>

                            )}

                        </div>


                        {/* ==================================================
                            PROGRESS
                        ================================================== */}

                        {typeof card.progress ===
                            "number" && (

                            <div
                                className="
                                    mt-4
                                    h-1.5
                                    w-full
                                    overflow-hidden
                                    rounded-full
                                    bg-white/60
                                "
                            >

                                <motion.div
                                    initial={{
                                        width: 0,
                                    }}

                                    animate={{
                                        width:
                                            `${card.progress}%`,
                                    }}

                                    transition={{
                                        delay:
                                            0.3 +
                                            index * 0.07,

                                        duration:
                                            0.8,

                                        ease:
                                            [0.22, 1, 0.36, 1],
                                    }}

                                    className="
                                        h-full
                                        rounded-full
                                        bg-[#1463FF]
                                    "
                                />

                            </div>

                        )}

                    </motion.div>

                )
            )}

        </div>

    );

}


export default StatsCards;