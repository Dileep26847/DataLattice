import { useEffect, useState } from "react";

import { motion } from "framer-motion";

import {
    FaChartLine,
    FaBullseye,
    FaBookOpen,
    FaTasks,
} from "react-icons/fa";

import {
    getDashboardStats,
} from "../../services/studentDashboardService";


function ProgressChart() {

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
    // LOAD STATS
    // ========================================================

    useEffect(() => {

        if (user?.id) {

            loadStats();

        } else {

            setLoading(false);

        }

    }, []);


    // ========================================================
    // FETCH STATS
    // ========================================================

    const loadStats =
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
                    "Progress Chart Error:",
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

                    Loading learning analytics...

                </p>

            </div>

        );

    }


    // ========================================================
    // NORMALIZED VALUES
    // ========================================================

    const progress =
        Number(
            stats.overallProgress || 0
        );


    const completedLessons =
        Number(
            stats.completedLessons || 0
        );


    const enrolledCourses =
        Number(
            stats.totalCourses || 0
        );


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
    // RENDER
    // ========================================================

    return (

        <motion.div

            whileHover={{
                y: -5,
            }}

            className="bg-white rounded-3xl shadow-xl p-8"

        >

            {/* =================================================
                HEADER
            ================================================= */}

            <div className="flex justify-between items-center">

                <div>

                    <p className="text-indigo-600 font-semibold">

                        Learning Analytics

                    </p>


                    <h2 className="text-3xl font-black mt-2">

                        Your Progress

                    </h2>


                    <p className="text-slate-500 mt-2">

                        Your current learning performance.

                    </p>

                </div>


                <div className="w-14 h-14 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-600 text-2xl">

                    <FaChartLine />

                </div>

            </div>


            {/* =================================================
                MAIN PROGRESS
            ================================================= */}

            <div className="mt-10">

                <div className="flex justify-between items-center mb-3">

                    <span className="font-semibold">

                        Overall Course Progress

                    </span>


                    <span className="font-black text-indigo-600">

                        {progress}%

                    </span>

                </div>


                <div className="w-full h-5 rounded-full bg-slate-200 overflow-hidden">

                    <motion.div

                        initial={{
                            width: 0,
                        }}

                        animate={{
                            width: `${progress}%`,
                        }}

                        transition={{
                            duration: 1,
                        }}

                        className="h-full rounded-full bg-gradient-to-r from-indigo-600 to-cyan-400"

                    />

                </div>

            </div>


            {/* =================================================
                STATISTICS
            ================================================= */}

            <div className="grid md:grid-cols-3 gap-5 mt-10">


                {/* COURSES */}

                <div className="rounded-2xl bg-indigo-50 p-5">

                    <div className="flex items-center gap-3">

                        <div className="w-11 h-11 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600">

                            <FaBookOpen />

                        </div>


                        <div>

                            <p className="text-slate-500 text-sm">

                                Enrolled Courses

                            </p>


                            <h3 className="text-2xl font-black">

                                {enrolledCourses}

                            </h3>

                        </div>

                    </div>

                </div>


                {/* LESSONS */}

                <div className="rounded-2xl bg-green-50 p-5">

                    <div className="flex items-center gap-3">

                        <div className="w-11 h-11 rounded-xl bg-green-100 flex items-center justify-center text-green-600">

                            <FaChartLine />

                        </div>


                        <div>

                            <p className="text-slate-500 text-sm">

                                Completed Lessons

                            </p>


                            <h3 className="text-2xl font-black">

                                {completedLessons}

                            </h3>

                        </div>

                    </div>

                </div>


                {/* ASSIGNMENTS */}

                <div className="rounded-2xl bg-orange-50 p-5">

                    <div className="flex items-center gap-3">

                        <div className="w-11 h-11 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600">

                            <FaTasks />

                        </div>


                        <div>

                            <p className="text-slate-500 text-sm">

                                Pending Assignments

                            </p>


                            <h3 className="text-2xl font-black">

                                {pendingAssignments}

                            </h3>

                        </div>

                    </div>

                </div>

            </div>


            {/* =================================================
                GOAL
            ================================================= */}

            <div className="mt-8 rounded-2xl bg-purple-50 p-6">

                <div className="flex items-center gap-4">

                    <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600 text-xl">

                        <FaBullseye />

                    </div>


                    <div>

                        <h3 className="font-bold text-lg">

                            Keep Going 🚀

                        </h3>


                        <p className="text-slate-500 text-sm mt-1">

                            Complete your pending assignments
                            and continue your lessons to improve
                            your overall progress.

                        </p>

                    </div>

                </div>

            </div>

        </motion.div>

    );

}


export default ProgressChart;