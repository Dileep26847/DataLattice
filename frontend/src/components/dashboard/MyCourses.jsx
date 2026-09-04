import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import {
    FaPlay,
    FaClock,
    FaBookOpen,
    FaCheckCircle,
    FaArrowRight,
} from "react-icons/fa";

import {
    getMyCourses,
} from "../../services/studentDashboardService";


function MyCourses() {

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

    const [courses, setCourses] =
        useState([]);

    const [loading, setLoading] =
        useState(true);


    // ============================================================
    // LOAD COURSES
    // ============================================================

    useEffect(() => {

        if (user?.id) {

            loadCourses();

        } else {

            setLoading(false);

        }

    }, []);


    // ============================================================
    // FETCH COURSES
    // ============================================================

    const loadCourses = async () => {

        try {

            setLoading(true);

            const data =
                await getMyCourses(user.id);


            setCourses(
                Array.isArray(
                    data?.courses
                )
                    ? data.courses
                    : []
            );

        } catch (error) {

            console.error(
                "My Courses Error:",
                error
            );

            setCourses([]);

        } finally {

            setLoading(false);

        }

    };


    // ============================================================
    // COURSE ID
    // ============================================================

    const getCourseId = (course) => {

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

    const openCourse = (course) => {

        const courseId =
            getCourseId(course);


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
                    flex
                    items-end
                    justify-between
                    mb-5
                ">

                    <div>

                        <div className="
                            h-4
                            w-28
                            bg-slate-200
                            rounded
                            animate-pulse
                        " />

                        <div className="
                            h-8
                            w-44
                            bg-slate-200
                            rounded
                            mt-2
                            animate-pulse
                        " />

                    </div>

                </div>


                <div className="
                    grid
                    grid-cols-1
                    sm:grid-cols-2
                    xl:grid-cols-3
                    gap-5
                ">

                    {[1, 2, 3].map(
                        (item) => (

                            <div
                                key={item}
                                className="
                                    bg-white
                                    rounded-2xl
                                    border
                                    border-slate-200
                                    overflow-hidden
                                    animate-pulse
                                "
                            >

                                <div className="
                                    h-40
                                    bg-slate-200
                                " />

                                <div className="p-5">

                                    <div className="
                                        h-4
                                        w-24
                                        bg-slate-200
                                        rounded
                                    " />

                                    <div className="
                                        h-6
                                        w-full
                                        bg-slate-200
                                        rounded
                                        mt-4
                                    " />

                                    <div className="
                                        h-3
                                        w-2/3
                                        bg-slate-200
                                        rounded
                                        mt-3
                                    " />

                                    <div className="
                                        h-2
                                        w-full
                                        bg-slate-200
                                        rounded
                                        mt-6
                                    " />

                                    <div className="
                                        h-11
                                        w-full
                                        bg-slate-200
                                        rounded-xl
                                        mt-5
                                    " />

                                </div>

                            </div>

                        )
                    )}

                </div>

            </section>

        );

    }


    // ============================================================
    // EMPTY STATE
    // ============================================================

    if (courses.length === 0) {

        return (

            <section>

                <div className="
                    flex
                    items-end
                    justify-between
                    mb-5
                ">

                    <div>

                        <p className="
                            text-indigo-600
                            text-sm
                            font-bold
                        ">

                            Continue Learning

                        </p>


                        <h2 className="
                            text-2xl
                            sm:text-3xl
                            font-black
                            text-slate-900
                            mt-1
                        ">

                            My Courses

                        </h2>

                    </div>

                </div>


                <div className="
                    rounded-2xl
                    bg-white
                    border
                    border-slate-200
                    p-8
                    text-center
                ">

                    <div className="
                        w-14
                        h-14
                        mx-auto
                        rounded-2xl
                        bg-indigo-50
                        text-indigo-600
                        flex
                        items-center
                        justify-center
                        text-xl
                    ">

                        <FaBookOpen />

                    </div>


                    <h3 className="
                        mt-4
                        text-xl
                        font-black
                        text-slate-900
                    ">

                        No Courses Yet

                    </h3>


                    <p className="
                        mt-2
                        text-sm
                        text-slate-500
                    ">

                        You haven't enrolled in any courses yet.

                    </p>

                </div>

            </section>

        );

    }


    // ============================================================
    // RENDER
    // ============================================================

    return (

        <section>

            {/* ====================================================
                HEADER
            ==================================================== */}

            <div className="
                flex
                items-end
                justify-between
                gap-4
                mb-5
            ">

                <div>

                    <p className="
                        text-indigo-600
                        text-sm
                        font-bold
                    ">

                        Continue Learning

                    </p>


                    <h2 className="
                        text-2xl
                        sm:text-3xl
                        font-black
                        text-slate-900
                        mt-1
                    ">

                        My Courses

                    </h2>

                </div>


                <span className="
                    shrink-0
                    text-xs
                    sm:text-sm
                    font-semibold
                    text-slate-500
                ">

                    {courses.length}{" "}
                    {courses.length === 1
                        ? "course"
                        : "courses"}

                </span>

            </div>


            {/* ====================================================
                COURSE GRID
            ==================================================== */}

            <div className="
                grid
                grid-cols-1
                sm:grid-cols-2
                xl:grid-cols-3
                gap-5
                items-stretch
            ">

                {courses.map(
                    (course) => {

                        const courseId =
                            getCourseId(
                                course
                            );


                        // ==================================================
                        // PROGRESS
                        // ==================================================

                        const progress =
                            Math.min(
                                100,
                                Math.max(
                                    0,
                                    Number(
                                        course.progress ||
                                        0
                                    )
                                )
                            );


                        const completed =
                            progress >= 100;


                        // ==================================================
                        // LESSON COUNTS
                        // ==================================================

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


                        return (

                            <motion.article

                                key={
                                    courseId ||
                                    course.enrollment_id
                                }

                                whileHover={{
                                    y: -3,
                                }}

                                transition={{
                                    duration: 0.18,
                                }}

                                className="
                                    group
                                    h-full
                                    overflow-hidden
                                    rounded-2xl
                                    bg-white
                                    border
                                    border-slate-200
                                    shadow-sm
                                    hover:shadow-lg
                                    hover:border-indigo-100
                                    flex
                                    flex-col
                                "
                            >

                                {/* =========================================
                                    IMAGE
                                ========================================= */}

                                <div className="
                                    relative
                                    h-40
                                    shrink-0
                                    overflow-hidden
                                    bg-slate-100
                                ">

                                    <img
                                        src={
                                            course.thumbnail ||
                                            "https://placehold.co/800x450?text=Data Lattice"
                                        }
                                        alt={
                                            course.title ||
                                            "Course"
                                        }
                                        className="
                                            w-full
                                            h-full
                                            object-cover
                                            transition-transform
                                            duration-500
                                            group-hover:scale-105
                                        "
                                        onError={(
                                            event
                                        ) => {

                                            event.currentTarget.src =
                                                "https://placehold.co/800x450?text=Data Lattice";

                                        }}
                                    />


                                    {/* Overlay */}

                                    <div className="
                                        absolute
                                        inset-0
                                        bg-gradient-to-t
                                        from-black/35
                                        via-transparent
                                        to-transparent
                                    " />


                                    {/* Progress */}

                                    <div className="
                                        absolute
                                        top-3
                                        right-3
                                        px-2.5
                                        py-1
                                        rounded-full
                                        bg-white/95
                                        text-indigo-600
                                        text-xs
                                        font-black
                                        shadow-sm
                                    ">

                                        {progress}%

                                    </div>


                                    {/* Completed */}

                                    {completed && (

                                        <div className="
                                            absolute
                                            top-3
                                            left-3
                                            inline-flex
                                            items-center
                                            gap-1.5
                                            px-2.5
                                            py-1
                                            rounded-full
                                            bg-green-600
                                            text-white
                                            text-[11px]
                                            font-bold
                                        ">

                                            <FaCheckCircle />

                                            Completed

                                        </div>

                                    )}

                                </div>


                                {/* =========================================
                                    CONTENT
                                ========================================= */}

                                <div className="
                                    flex
                                    flex-col
                                    flex-1
                                    p-5
                                ">

                                    {/* Meta */}

                                    <div className="
                                        flex
                                        items-center
                                        justify-between
                                        gap-3
                                        text-xs
                                        text-slate-500
                                    ">

                                        <span className="
                                            inline-flex
                                            items-center
                                            gap-1.5
                                            min-w-0
                                        ">

                                            <FaClock
                                                className="shrink-0"
                                            />

                                            <span className="
                                                truncate
                                            ">

                                                {course.duration ||
                                                    "Self paced"}

                                            </span>

                                        </span>


                                        <span className="
                                            shrink-0
                                            capitalize
                                        ">

                                            {course.level ||
                                                "All Levels"}

                                        </span>

                                    </div>


                                    {/* Title */}

                                    <h3 className="
                                        mt-3
                                        text-lg
                                        font-black
                                        leading-6
                                        text-slate-900
                                        line-clamp-2
                                        min-h-[48px]
                                    ">

                                        {course.title ||
                                            "Untitled Course"}

                                    </h3>


                                    {/* Description */}

                                    <p className="
                                        mt-2
                                        text-xs
                                        leading-5
                                        text-slate-500
                                        line-clamp-2
                                        min-h-[40px]
                                    ">

                                        {course.description ||
                                            "Continue your learning journey and build your skills."}

                                    </p>


                                    {/* =====================================
                                        PROGRESS
                                    ===================================== */}

                                    <div className="mt-5">

                                        <div className="
                                            flex
                                            items-center
                                            justify-between
                                            mb-2
                                        ">

                                            <span className="
                                                text-xs
                                                font-semibold
                                                text-slate-600
                                            ">

                                                Progress

                                            </span>


                                            <span className="
                                                text-xs
                                                font-black
                                                text-indigo-600
                                            ">

                                                {progress}%

                                            </span>

                                        </div>


                                        <div className="
                                            h-2
                                            w-full
                                            rounded-full
                                            bg-slate-100
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
                                                    duration: 0.7,
                                                }}
                                                className="
                                                    h-full
                                                    rounded-full
                                                    bg-indigo-600
                                                "
                                            />

                                        </div>


                                        <p className="
                                            mt-2
                                            text-[11px]
                                            text-slate-400
                                        ">

                                            {totalLessons > 0
                                                ? `${completedLessons} of ${totalLessons} lessons completed`
                                                : "Start learning to track progress"}

                                        </p>

                                    </div>


                                    {/* =====================================
                                        BUTTON
                                    ===================================== */}

                                    <button
                                        onClick={() =>
                                            openCourse(
                                                course
                                            )
                                        }
                                        disabled={
                                            !courseId
                                        }
                                        className="
                                            mt-5
                                            w-full
                                            rounded-xl
                                            bg-indigo-600
                                            px-4
                                            py-3
                                            text-sm
                                            font-bold
                                            text-white
                                            flex
                                            items-center
                                            justify-center
                                            gap-2
                                            transition
                                            hover:bg-indigo-700
                                            disabled:opacity-50
                                            disabled:cursor-not-allowed
                                        "
                                    >

                                        <FaPlay
                                            className="text-xs"
                                        />


                                        <span>

                                            {completed
                                                ? "Review Course"
                                                : "Continue Learning"}

                                        </span>


                                        <FaArrowRight
                                            className="
                                                ml-auto
                                                text-[10px]
                                            "
                                        />

                                    </button>

                                </div>

                            </motion.article>

                        );

                    }
                )}

            </div>

        </section>

    );

}


export default MyCourses;