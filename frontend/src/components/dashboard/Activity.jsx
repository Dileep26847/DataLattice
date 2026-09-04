import { useEffect, useState } from "react";

import { motion } from "framer-motion";

import {
    FaBookOpen,
    FaClipboardCheck,
    FaTasks,
    FaChartLine,
    FaClock,
} from "react-icons/fa";

import {
    getDashboardStats,
} from "../../services/studentDashboardService";


function Activity() {

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
    // LOAD ACTIVITY
    // ========================================================

    useEffect(() => {

        if (user?.id) {

            loadActivity();

        } else {

            setLoading(false);

        }

    }, []);


    // ========================================================
    // FETCH DATA
    // ========================================================

    const loadActivity =
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
                    "Activity Error:",
                    error
                );

            }

            finally {

                setLoading(false);

            }

        };


    // ========================================================
    // LOADING
    // ========================================================

    if (loading) {

        return (

            <div className="bg-white rounded-3xl shadow-xl p-8">

                <p className="text-slate-500">

                    Loading activity...

                </p>

            </div>

        );

    }


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
    // ACTIVITIES
    // ========================================================

    const activities = [

        {

            icon:
                <FaBookOpen />,

            color:
                "bg-blue-100 text-blue-600",

            title:
                "Courses Enrolled",

            subtitle:

                `${stats.totalCourses} course${
                    Number(stats.totalCourses) === 1
                        ? ""
                        : "s"
                } currently enrolled`,

        },

        {

            icon:
                <FaChartLine />,

            color:
                "bg-green-100 text-green-600",

            title:
                "Lessons Completed",

            subtitle:

                `${stats.completedLessons} lesson${
                    Number(stats.completedLessons) === 1
                        ? ""
                        : "s"
                } completed`,

        },

        {

            icon:
                <FaTasks />,

            color:
                "bg-orange-100 text-orange-600",

            title:
                "Assignments Pending",

            subtitle:

                `${pendingAssignments} assignment${
                    pendingAssignments === 1
                        ? ""
                        : "s"
                } waiting for completion`,

        },

        {

            icon:
                <FaClipboardCheck />,

            color:
                "bg-purple-100 text-purple-600",

            title:
                "Overall Progress",

            subtitle:

                `${Number(
                    stats.overallProgress || 0
                )}% course progress`,

        },

    ];


    // ========================================================
    // RENDER
    // ========================================================

    return (

        <div className="bg-white rounded-3xl shadow-xl p-8">

            <div className="flex justify-between items-center mb-8">

                <div>

                    <p className="text-indigo-600 font-semibold">

                        Learning Overview

                    </p>


                    <h2 className="text-3xl font-black">

                        Recent Activity

                    </h2>

                </div>


                <FaClock
                    className="text-indigo-600"
                    size={28}
                />

            </div>


            <div className="space-y-6">

                {activities.map(
                    (item) => (

                        <motion.div

                            key={item.title}

                            whileHover={{
                                x: 5,
                            }}

                            className="flex items-start gap-4 border-b pb-5 last:border-none"

                        >

                            <div
                                className={`
                                    w-12
                                    h-12
                                    rounded-xl
                                    flex
                                    items-center
                                    justify-center
                                    text-lg
                                    ${item.color}
                                `}
                            >

                                {item.icon}

                            </div>


                            <div className="flex-1">

                                <h3 className="font-bold text-gray-800">

                                    {item.title}

                                </h3>


                                <p className="text-gray-500 text-sm mt-1">

                                    {item.subtitle}

                                </p>

                            </div>

                        </motion.div>

                    )
                )}

            </div>

        </div>

    );

}


export default Activity;