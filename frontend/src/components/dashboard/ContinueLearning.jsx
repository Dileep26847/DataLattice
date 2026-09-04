import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import {
    FaPlay,
    FaClock,
    FaArrowRight,
    FaBookOpen,
    FaCheckCircle,
} from "react-icons/fa";

import {
    getMyCourses,
} from "../../services/studentDashboardService";


function ContinueLearning() {

    const navigate = useNavigate();

    // ============================================================
    // USER
    // ============================================================

    const getStoredUser = () => {

        try {

            return (
                JSON.parse(
                    localStorage.getItem("user")
                ) || null
            );

        } catch {

            return null;

        }

    };

    const user = getStoredUser();


    // ============================================================
    // STATE
    // ============================================================

    const [course, setCourse] = useState(null);

    const [loading, setLoading] =
        useState(true);


    // ============================================================
    // LOAD COURSE
    // ============================================================

    useEffect(() => {

        if (user?.id) {

            loadCourse();

        } else {

            setLoading(false);

        }

    }, []);


    // ============================================================
    // FETCH STUDENT COURSES
    // ============================================================

    const loadCourse = async () => {

        try {

            setLoading(true);

            const data =
                await getMyCourses(user.id);

            const courses =
                Array.isArray(data?.courses)
                    ? data.courses
                    : [];


            if (courses.length === 0) {

                setCourse(null);

                return;

            }


            // ====================================================
            // PRIORITY
            // ====================================================
            // 1. Continue the course with the highest progress
            // 2. Ignore completed courses if active courses exist
            // 3. Otherwise show the first course
            // ====================================================

            const activeCourses =
                courses.filter(
                    (item) =>
                        Number(
                            item.progress || 0
                        ) < 100
                );


            const sourceCourses =
                activeCourses.length > 0
                    ? activeCourses
                    : courses;


            const selectedCourse =
                [...sourceCourses].sort(
                    (a, b) =>
                        Number(
                            b.progress || 0
                        ) -
                        Number(
                            a.progress || 0
                        )
                )[0];


            setCourse(
                selectedCourse
            );

        } catch (error) {

            console.error(
                "Continue Learning Error:",
                error
            );

            setCourse(null);

        } finally {

            setLoading(false);

        }

    };


    // ============================================================
    // COURSE ID
    // ============================================================

    const getCourseId = () => {

        return (
            course?.course_id ??
            course?.courseId ??
            course?.id ??
            null
        );

    };


    // ============================================================
    // OPEN COURSE
    // ============================================================

    const handleContinueLearning = () => {

        const courseId =
            getCourseId();


        if (!courseId) {

            console.error(
                "Course ID missing:",
                course
            );

            return;

        }


        navigate(
            `/student/learn/${courseId}`
        );

    };


    // ============================================================
    // LOADING
    // ============================================================

    if (loading) {

        return (

            <section>

                <div className="
                    h-[270px]
                    rounded-[28px]
                    bg-white
                    border
                    border-slate-200
                    shadow-sm
                    overflow-hidden
                    animate-pulse
                ">

                    <div className="
                        h-full
                        bg-slate-100
                    " />

                </div>

            </section>

        );

    }


    // ============================================================
    // EMPTY STATE
    // ============================================================

    if (!course) {

        return (

            <section>

                <div className="
                    rounded-[28px]
                    bg-white
                    border
                    border-slate-200
                    shadow-sm
                    px-7
                    py-8
                ">

                    <div className="
                        flex
                        items-center
                        gap-4
                    ">

                        <div className="
                            w-12
                            h-12
                            rounded-2xl
                            bg-indigo-50
                            text-indigo-600
                            flex
                            items-center
                            justify-center
                            text-lg
                        ">

                            <FaBookOpen />

                        </div>


                        <div>

                            <p className="
                                text-sm
                                font-semibold
                                text-indigo-600
                            ">

                                Continue Learning

                            </p>


                            <h2 className="
                                text-xl
                                font-black
                                text-slate-900
                            ">

                                Start your learning journey

                            </h2>

                        </div>

                    </div>


                    <p className="
                        text-slate-500
                        text-sm
                        mt-4
                    ">

                        You haven't enrolled in any courses yet.

                    </p>

                </div>

            </section>

        );

    }


    // ============================================================
    // NORMALIZE COURSE DATA
    // ============================================================

    const progress =
        Math.min(
            100,
            Math.max(
                0,
                Number(
                    course.progress || 0
                )
            )
        );


    const completed =
        progress >= 100;


    const totalLessons =
        Number(
            course.totalLessons ??
            course.total_lessons ??
            0
        );


    const completedLessons =
        Math.min(
            totalLessons,
            Number(
                course.completedLessons ??
                course.completed_lessons ??
                0
            )
        );


    const courseId =
        getCourseId();


    // ============================================================
    // RENDER
    // ============================================================

    return (

        <section>

            <motion.div
                whileHover={{
                    y: -2,
                }}
                transition={{
                    duration: 0.2,
                }}
                className="
                    relative
                    overflow-hidden
                    rounded-[28px]
                    bg-gradient-to-br
                    from-indigo-700
                    via-indigo-600
                    to-cyan-500
                    shadow-lg
                    shadow-indigo-100
                "
            >

                {/* =================================================
                    DECORATIVE BACKGROUND
                ================================================= */}

                <div className="
                    pointer-events-none
                    absolute
                    -right-20
                    -top-24
                    w-64
                    h-64
                    rounded-full
                    bg-white/10
                    blur-3xl
                " />


                <div className="
                    pointer-events-none
                    absolute
                    right-24
                    -bottom-32
                    w-72
                    h-72
                    rounded-full
                    bg-cyan-300/10
                    blur-3xl
                " />


                {/* =================================================
                    CONTENT
                ================================================= */}

                <div className="
                    relative
                    px-6
                    sm:px-8
                    lg:px-9
                    py-7
                    sm:py-8
                ">

                    <div className="
                        flex
                        flex-col
                        lg:flex-row
                        lg:items-center
                        gap-7
                    ">

                        {/* =================================================
                            LEFT CONTENT
                        ================================================= */}

                        <div className="
                            min-w-0
                            flex-1
                        ">

                            {/* Label */}

                            <div className="
                                inline-flex
                                items-center
                                gap-2
                                rounded-full
                                bg-white/15
                                border
                                border-white/10
                                px-3
                                py-1.5
                                text-xs
                                font-bold
                                text-white
                                backdrop-blur-sm
                            ">

                                <FaBookOpen
                                    className="text-xs"
                                />

                                Continue Learning

                            </div>


                            {/* Title */}

                            <h2 className="
                                mt-4
                                text-2xl
                                sm:text-3xl
                                lg:text-[34px]
                                font-black
                                leading-tight
                                tracking-tight
                                text-white
                                line-clamp-2
                            ">

                                {course.title ||
                                    "Your Course"}

                            </h2>


                            {/* Description */}

                            <p className="
                                mt-2
                                max-w-2xl
                                text-sm
                                sm:text-base
                                leading-6
                                text-indigo-100
                                line-clamp-1
                            ">

                                {course.description ||
                                    "Continue your learning journey and build your skills."}

                            </p>


                            {/* Course Meta */}

                            <div className="
                                flex
                                flex-wrap
                                items-center
                                gap-x-6
                                gap-y-2
                                mt-4
                                text-sm
                                text-white/90
                            ">

                                <span className="
                                    inline-flex
                                    items-center
                                    gap-2
                                ">

                                    <FaClock
                                        className="text-white/80"
                                    />

                                    {course.duration ||
                                        "Self paced"}

                                </span>


                                <span className="
                                    font-semibold
                                ">

                                    {course.level ||
                                        "All Levels"}

                                </span>


                                {totalLessons > 0 && (

                                    <span className="
                                        text-white/80
                                    ">

                                        {completedLessons}
                                        /
                                        {totalLessons}
                                        {" "}
                                        lessons

                                    </span>

                                )}

                            </div>

                        </div>


                        {/* =================================================
                            PLAY BUTTON
                        ================================================= */}

                        <div className="
                            shrink-0
                            flex
                            items-center
                            justify-center
                        ">

                            <motion.button
                                whileHover={{
                                    scale: 1.06,
                                }}
                                whileTap={{
                                    scale: 0.96,
                                }}
                                onClick={
                                    handleContinueLearning
                                }
                                disabled={!courseId}
                                aria-label="Continue learning"
                                className="
                                    w-20
                                    h-20
                                    sm:w-24
                                    sm:h-24
                                    rounded-full
                                    bg-white
                                    text-indigo-600
                                    flex
                                    items-center
                                    justify-center
                                    shadow-xl
                                    shadow-black/10
                                    transition
                                    disabled:opacity-50
                                "
                            >

                                <FaPlay
                                    className="
                                        text-2xl
                                        sm:text-3xl
                                        ml-1
                                    "
                                />

                            </motion.button>

                        </div>

                    </div>


                    {/* =================================================
                        BOTTOM PROGRESS ROW
                    ================================================= */}

                    <div className="
                        mt-6
                        pt-5
                        border-t
                        border-white/15
                    ">

                        <div className="
                            flex
                            flex-col
                            sm:flex-row
                            sm:items-center
                            sm:justify-between
                            gap-4
                        ">

                            {/* Progress */}

                            <div className="
                                flex-1
                                min-w-0
                            ">

                                <div className="
                                    flex
                                    items-center
                                    justify-between
                                    mb-2
                                ">

                                    <span className="
                                        text-xs
                                        sm:text-sm
                                        font-semibold
                                        text-white/90
                                    ">

                                        {completed
                                            ? "Course Completed"
                                            : "Course Progress"}

                                    </span>


                                    <span className="
                                        text-sm
                                        font-black
                                        text-white
                                    ">

                                        {progress}%

                                    </span>

                                </div>


                                <div className="
                                    h-2
                                    w-full
                                    rounded-full
                                    bg-white/20
                                    overflow-hidden
                                ">

                                    <motion.div
                                        initial={{
                                            width: 0,
                                        }}
                                        animate={{
                                            width:
                                                `${progress}%`,
                                        }}
                                        transition={{
                                            duration: 0.8,
                                            ease: "easeOut",
                                        }}
                                        className="
                                            h-full
                                            rounded-full
                                            bg-white
                                        "
                                    />

                                </div>

                            </div>


                            {/* Action */}

                            <button
                                onClick={
                                    handleContinueLearning
                                }
                                disabled={!courseId}
                                className="
                                    shrink-0
                                    inline-flex
                                    items-center
                                    justify-center
                                    gap-2
                                    rounded-xl
                                    bg-white
                                    px-5
                                    py-2.5
                                    text-sm
                                    font-bold
                                    text-indigo-700
                                    shadow-sm
                                    transition
                                    hover:bg-indigo-50
                                    disabled:opacity-50
                                    disabled:cursor-not-allowed
                                "
                            >

                                {completed ? (
                                    <>
                                        <FaCheckCircle />

                                        Review Course
                                    </>
                                ) : (
                                    <>
                                        Continue

                                        <FaArrowRight
                                            className="text-xs"
                                        />
                                    </>
                                )}

                            </button>

                        </div>

                    </div>

                </div>

            </motion.div>

        </section>

    );

}


export default ContinueLearning;