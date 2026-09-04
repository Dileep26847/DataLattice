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
    // CARDS
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

            gradient:
                "from-indigo-600 to-blue-500",

        },

        {

            title:
                "Completed Lessons",

            value:
                stats.completedLessons,

            subtitle:
                "Keep Learning 🚀",

            icon:
                <FaClipboardCheck />,

            gradient:
                "from-green-600 to-emerald-500",

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

            gradient:
                "from-orange-500 to-red-500",

        },

        {

            title:
                "Overall Progress",

            value:
                `${stats.overallProgress}%`,

            subtitle:
                "Course Progress",

            icon:
                <FaChartLine />,

            gradient:
                "from-purple-600 to-pink-500",

        },

    ];


    // ========================================================
    // LOADING
    // ========================================================

    if (loading) {

        return (

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

                {cards.map(
                    (_, index) => (

                        <div
                            key={index}
                            className="h-40 rounded-3xl bg-slate-200 animate-pulse"
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

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

            {cards.map(
                (card, index) => (

                    <motion.div

                        key={card.title}

                        initial={{
                            opacity: 0,
                            y: 40,
                        }}

                        animate={{
                            opacity: 1,
                            y: 0,
                        }}

                        transition={{
                            delay:
                                index * 0.1,

                            duration:
                                0.4,
                        }}

                        whileHover={{
                            y: -8,
                            scale: 1.03,
                        }}

                        className={`
                            bg-gradient-to-r
                            ${card.gradient}
                            rounded-3xl
                            shadow-xl
                            p-7
                            text-white
                        `}

                    >

                        <div className="flex justify-between">

                            <div>

                                <p className="text-white/80 text-sm">

                                    {card.title}

                                </p>


                                <h2 className="text-4xl font-black mt-3">

                                    {card.value}

                                </h2>


                                <p className="mt-4 text-white/80">

                                    {card.subtitle}

                                </p>

                            </div>


                            <div className="w-16 h-16 rounded-2xl bg-white/20 flex justify-center items-center text-3xl">

                                {card.icon}

                            </div>

                        </div>

                    </motion.div>

                )
            )}

        </div>

    );

}


export default StatsCards;