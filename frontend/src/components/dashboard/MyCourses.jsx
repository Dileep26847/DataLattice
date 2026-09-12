import { useEffect, useState } from "react";

import {
    motion,
} from "framer-motion";

import {
    useNavigate,
} from "react-router-dom";

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


// ============================================================
// MY COURSES
// ============================================================

function MyCourses() {

    const navigate =
        useNavigate();


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


    const user =
        getStoredUser();


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
                await getMyCourses(
                    user.id
                );


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

                {/* ==================================================
                    HEADER SKELETON
                ================================================== */}

                <div
                    className="
                        mb-5
                        flex
                        items-end
                        justify-between
                    "
                >

                    <div>

                        <div
                            className="
                                h-3
                                w-24
                                animate-pulse
                                rounded
                                bg-[#E6EDF7]
                            "
                        />


                        <div
                            className="
                                mt-2
                                h-7
                                w-40
                                animate-pulse
                                rounded-lg
                                bg-[#E6EDF7]
                            "
                        />

                    </div>

                </div>


                {/* ==================================================
                    COURSE SKELETONS
                ================================================== */}

                <div
                    className="
                        grid
                        grid-cols-1
                        gap-5
                        sm:grid-cols-2
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
                                    shadow-[0_8px_24px_rgba(11,27,58,0.04)]
                                    animate-pulse
                                "
                            >

                                <div
                                    className="
                                        h-40
                                        bg-[#EAF2FF]
                                    "
                                />


                                <div
                                    className="
                                        p-5
                                    "
                                >

                                    <div
                                        className="
                                            h-3
                                            w-24
                                            rounded
                                            bg-[#E6EDF7]
                                        "
                                    />


                                    <div
                                        className="
                                            mt-4
                                            h-5
                                            w-full
                                            rounded
                                            bg-[#E6EDF7]
                                        "
                                    />


                                    <div
                                        className="
                                            mt-2
                                            h-3
                                            w-2/3
                                            rounded
                                            bg-[#E6EDF7]
                                        "
                                    />


                                    <div
                                        className="
                                            mt-6
                                            h-2
                                            w-full
                                            rounded-full
                                            bg-[#E6EDF7]
                                        "
                                    />


                                    <div
                                        className="
                                            mt-5
                                            h-10
                                            w-full
                                            rounded-xl
                                            bg-[#E6EDF7]
                                        "
                                    />

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

                {/* ==================================================
                    HEADER
                ================================================== */}

                <div
                    className="
                        mb-5
                        flex
                        items-end
                        justify-between
                    "
                >

                    <div>

                        <p
                            className="
                                text-xs
                                font-bold
                                uppercase
                                tracking-[0.12em]
                                text-[#1463FF]
                            "
                        >

                            Continue Learning

                        </p>


                        <h2
                            className="
                                mt-1
                                text-2xl
                                font-bold
                                tracking-[-0.03em]
                                text-[#0B1B3A]
                            "
                        >

                            My Courses

                        </h2>

                    </div>

                </div>


                {/* ==================================================
                    EMPTY CARD
                ================================================== */}

                <div
                    className="
                        rounded-[22px]
                        border
                        border-[#E6EDF7]
                        bg-white
                        px-6
                        py-9
                        text-center
                        shadow-[0_8px_24px_rgba(11,27,58,0.04)]
                    "
                >

                    <div
                        className="
                            mx-auto
                            flex
                            h-14
                            w-14
                            items-center
                            justify-center
                            rounded-2xl
                            bg-[#EAF2FF]
                            text-[#1463FF]
                        "
                    >

                        <FaBookOpen
                            size={20}
                        />

                    </div>


                    <h3
                        className="
                            mt-4
                            text-lg
                            font-bold
                            text-[#0B1B3A]
                        "
                    >

                        No Courses Yet

                    </h3>


                    <p
                        className="
                            mt-2
                            text-sm
                            text-[#64748B]
                        "
                    >

                        You haven't enrolled in any
                        courses yet.

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

            <div
                className="
                    mb-5
                    flex
                    items-end
                    justify-between
                    gap-4
                "
            >

                <div>

                    <p
                        className="
                            text-xs
                            font-bold
                            uppercase
                            tracking-[0.12em]
                            text-[#1463FF]
                        "
                    >

                        Continue Learning

                    </p>


                    <h2
                        className="
                            mt-1
                            text-2xl
                            font-bold
                            tracking-[-0.03em]
                            text-[#0B1B3A]
                            sm:text-[26px]
                        "
                    >

                        My Courses

                    </h2>

                </div>


                {/* ==================================================
                    COURSE COUNT
                ================================================== */}

                <div
                    className="
                        shrink-0
                        rounded-full
                        border
                        border-[#DCEAFF]
                        bg-[#F5F9FF]
                        px-3
                        py-1.5
                        text-[11px]
                        font-bold
                        text-[#1463FF]
                    "
                >

                    {courses.length}{" "}
                    {courses.length === 1
                        ? "course"
                        : "courses"}

                </div>

            </div>


            {/* ====================================================
                COURSE GRID
            ==================================================== */}

            <div
                className="
                    grid
                    grid-cols-1
                    items-stretch
                    gap-5
                    sm:grid-cols-2
                    xl:grid-cols-3
                "
            >

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
                                initial={{
                                    opacity: 0,
                                    y: 10,
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
                                    min-w-0
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

                                {/* =========================================
                                    COURSE IMAGE
                                ========================================= */}

                                <div
                                    className="
                                        relative
                                        h-[170px]
                                        shrink-0
                                        overflow-hidden
                                        bg-[#EAF2FF]
                                    "
                                >

                                    <img
                                        src={
                                            course.thumbnail ||
                                            "https://placehold.co/800x450?text=Data%20Lattice"
                                        }
                                        alt={
                                            course.title ||
                                            "Course"
                                        }
                                        className="
                                            h-full
                                            w-full
                                            object-cover
                                            transition-transform
                                            duration-500
                                            group-hover:scale-[1.035]
                                        "
                                        onError={(
                                            event
                                        ) => {

                                            event.currentTarget.src =
                                                "https://placehold.co/800x450?text=Data%20Lattice";

                                        }}
                                    />


                                    {/* =====================================
                                        IMAGE OVERLAY
                                    ===================================== */}

                                    <div
                                        className="
                                            pointer-events-none
                                            absolute
                                            inset-0
                                            bg-gradient-to-t
                                            from-[#0B1B3A]/30
                                            via-transparent
                                            to-transparent
                                        "
                                    />


                                    {/* =====================================
                                        PROGRESS BADGE
                                    ===================================== */}

                                    <div
                                        className="
                                            absolute
                                            right-3
                                            top-3
                                            rounded-full
                                            border
                                            border-white/70
                                            bg-white/95
                                            px-2.5
                                            py-1
                                            text-[10px]
                                            font-bold
                                            text-[#1463FF]
                                            shadow-sm
                                        "
                                    >

                                        {progress}%

                                    </div>


                                    {/* =====================================
                                        COMPLETED BADGE
                                    ===================================== */}

                                    {completed && (

                                        <div
                                            className="
                                                absolute
                                                left-3
                                                top-3
                                                inline-flex
                                                items-center
                                                gap-1.5
                                                rounded-full
                                                bg-[#D2E4D4]
                                                px-2.5
                                                py-1
                                                text-[10px]
                                                font-bold
                                                text-[#315B3A]
                                            "
                                        >

                                            <FaCheckCircle
                                                size={10}
                                            />

                                            Completed

                                        </div>

                                    )}

                                </div>


                                {/* =========================================
                                    COURSE CONTENT
                                ========================================= */}

                                <div
                                    className="
                                        flex
                                        flex-1
                                        flex-col
                                        p-5
                                    "
                                >

                                    {/* =====================================
                                        META
                                    ===================================== */}

                                    <div
                                        className="
                                            flex
                                            items-center
                                            justify-between
                                            gap-3
                                        "
                                    >

                                        <span
                                            className="
                                                inline-flex
                                                min-w-0
                                                items-center
                                                gap-1.5
                                                text-[11px]
                                                font-medium
                                                text-[#64748B]
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
                                                    bg-[#F5F9FF]
                                                    text-[#1463FF]
                                                "
                                            >

                                                <FaClock
                                                    size={9}
                                                />

                                            </span>


                                            <span
                                                className="
                                                    truncate
                                                "
                                            >

                                                {course.duration ||
                                                    "Self paced"}

                                            </span>

                                        </span>


                                        <span
                                            className="
                                                shrink-0
                                                rounded-full
                                                bg-[#F5F9FF]
                                                px-2.5
                                                py-1
                                                text-[10px]
                                                font-semibold
                                                capitalize
                                                text-[#64748B]
                                            "
                                        >

                                            {course.level ||
                                                "All Levels"}

                                        </span>

                                    </div>


                                    {/* =====================================
                                        TITLE
                                    ===================================== */}

                                    <h3
                                        className="
                                            mt-3
                                            min-h-[48px]
                                            line-clamp-2
                                            text-[17px]
                                            font-bold
                                            leading-6
                                            tracking-[-0.02em]
                                            text-[#0B1B3A]
                                        "
                                    >

                                        {course.title ||
                                            "Untitled Course"}

                                    </h3>


                                    {/* =====================================
                                        DESCRIPTION
                                    ===================================== */}

                                    <p
                                        className="
                                            mt-2
                                            min-h-[40px]
                                            line-clamp-2
                                            text-xs
                                            leading-5
                                            text-[#64748B]
                                        "
                                    >

                                        {course.description ||
                                            "Continue your learning journey and build your skills."}

                                    </p>


                                    {/* =====================================
                                        PROGRESS
                                    ===================================== */}

                                    <div
                                        className="
                                            mt-5
                                        "
                                    >

                                        <div
                                            className="
                                                mb-2
                                                flex
                                                items-center
                                                justify-between
                                                gap-3
                                            "
                                        >

                                            <span
                                                className="
                                                    text-[11px]
                                                    font-semibold
                                                    text-[#64748B]
                                                "
                                            >

                                                Progress

                                            </span>


                                            <span
                                                className="
                                                    text-[11px]
                                                    font-bold
                                                    text-[#1463FF]
                                                "
                                            >

                                                {progress}%

                                            </span>

                                        </div>


                                        <div
                                            className="
                                                h-1.5
                                                w-full
                                                overflow-hidden
                                                rounded-full
                                                bg-[#EAF2FF]
                                            "
                                        >

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
                                                    ease: "easeOut",
                                                }}
                                                className="
                                                    h-full
                                                    rounded-full
                                                    bg-[#1463FF]
                                                "
                                            />

                                        </div>


                                        <p
                                            className="
                                                mt-2
                                                text-[10px]
                                                text-[#64748B]
                                            "
                                        >

                                            {totalLessons > 0
                                                ? `${completedLessons} of ${totalLessons} lessons completed`
                                                : "Start learning to track progress"}

                                        </p>

                                    </div>


                                    {/* =====================================
                                        ACTION
                                    ===================================== */}

                                    <button
                                        type="button"
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
                                            disabled:cursor-not-allowed
                                            disabled:opacity-50
                                        "
                                    >

                                        <FaPlay
                                            size={9}
                                        />


                                        <span>
                                            {completed
                                                ? "Review Course"
                                                : "Continue Learning"}
                                        </span>


                                        <FaArrowRight
                                            className="
                                                ml-auto
                                                text-[9px]
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