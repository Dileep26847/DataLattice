import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import {
    FaPlay,
    FaClock,
    FaBookOpen,
    FaCheckCircle,
} from "react-icons/fa";

import { getMyCourses } from "../services/studentDashboardService";


function MyCourses() {

    const navigate = useNavigate();

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    const [courses, setCourses] = useState([]);

    const [loading, setLoading] = useState(true);


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
                Array.isArray(data?.courses)
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
    // OPEN COURSE
    // ============================================================

    const continueLearning = (courseId) => {

        if (!courseId) return;

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

                <div className="mb-8">

                    <p className="text-indigo-600 font-semibold">
                        Continue Learning
                    </p>

                    <h2 className="text-3xl font-black">
                        My Courses
                    </h2>

                </div>


                <div className="
                    grid
                    grid-cols-1
                    sm:grid-cols-2
                    xl:grid-cols-3
                    gap-6
                ">

                    {[1, 2, 3].map(
                        (item) => (

                            <div
                                key={item}
                                className="
                                    bg-white
                                    rounded-3xl
                                    shadow-lg
                                    overflow-hidden
                                    animate-pulse
                                "
                            >

                                <div className="
                                    h-48
                                    bg-slate-200
                                " />

                                <div className="p-6">

                                    <div className="
                                        h-4
                                        bg-slate-200
                                        rounded
                                        w-1/3
                                    " />

                                    <div className="
                                        h-7
                                        bg-slate-200
                                        rounded
                                        mt-4
                                    " />

                                    <div className="
                                        h-3
                                        bg-slate-200
                                        rounded
                                        mt-6
                                    " />

                                    <div className="
                                        h-12
                                        bg-slate-200
                                        rounded-2xl
                                        mt-6
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

                <div className="mb-8">

                    <p className="text-indigo-600 font-semibold">
                        Continue Learning
                    </p>

                    <h2 className="text-3xl font-black">
                        My Courses
                    </h2>

                </div>


                <div className="
                    bg-white
                    rounded-3xl
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

                        <FaBookOpen />

                    </div>


                    <h3 className="
                        text-2xl
                        font-black
                        mt-6
                    ">

                        No Courses Yet

                    </h3>


                    <p className="
                        text-slate-500
                        mt-3
                        max-w-md
                        mx-auto
                    ">

                        You haven't enrolled in any courses yet.
                        Start learning by enrolling in a course.

                    </p>

                </div>

            </section>

        );

    }


    // ============================================================
    // COURSE CARDS
    // ============================================================

    return (

        <section>

            {/* ====================================================
                SECTION HEADER
            ==================================================== */}

            <div className="
                flex
                flex-col
                sm:flex-row
                sm:items-end
                sm:justify-between
                gap-3
                mb-8
            ">

                <div>

                    <p className="
                        text-indigo-600
                        font-semibold
                    ">

                        Continue Learning

                    </p>


                    <h2 className="
                        text-3xl
                        font-black
                        text-slate-800
                    ">

                        My Courses

                    </h2>

                </div>


                <p className="
                    text-sm
                    text-slate-500
                ">

                    {courses.length}{" "}
                    {courses.length === 1
                        ? "course"
                        : "courses"}{" "}
                    enrolled

                </p>

            </div>


            {/* ====================================================
                RESPONSIVE COURSE GRID
            ==================================================== */}

            <div className="
                grid
                grid-cols-1
                sm:grid-cols-2
                xl:grid-cols-3
                gap-6
                items-stretch
            ">

                {courses.map(
                    (course) => {

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


                        return (

                            <motion.div

                                key={
                                    course.course_id ||
                                    course.id
                                }

                                whileHover={{
                                    y: -6,
                                }}

                                transition={{
                                    duration: 0.2,
                                }}

                                className="
                                    group
                                    h-full
                                    bg-white
                                    rounded-3xl
                                    border
                                    border-slate-200
                                    shadow-md
                                    hover:shadow-xl
                                    overflow-hidden
                                    flex
                                    flex-col
                                "
                            >

                                {/* =================================================
                                    THUMBNAIL
                                ================================================= */}

                                <div className="
                                    relative
                                    h-48
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
                                        onError={(event) => {

                                            event.currentTarget.src =
                                                "https://placehold.co/800x450?text=Data Lattice";

                                        }}
                                    />


                                    {/* Progress Badge */}

                                    <div className="
                                        absolute
                                        top-4
                                        right-4
                                        px-3
                                        py-1.5
                                        rounded-full
                                        bg-white/95
                                        backdrop-blur
                                        text-indigo-600
                                        text-sm
                                        font-bold
                                        shadow
                                    ">

                                        {progress}%

                                    </div>


                                    {/* Completed Badge */}

                                    {completed && (

                                        <div className="
                                            absolute
                                            top-4
                                            left-4
                                            flex
                                            items-center
                                            gap-2
                                            px-3
                                            py-1.5
                                            rounded-full
                                            bg-green-600
                                            text-white
                                            text-xs
                                            font-bold
                                            shadow
                                        ">

                                            <FaCheckCircle />

                                            Completed

                                        </div>

                                    )}

                                </div>


                                {/* =================================================
                                    COURSE CONTENT
                                ================================================= */}

                                <div className="
                                    p-6
                                    flex
                                    flex-col
                                    flex-1
                                ">

                                    {/* Meta */}

                                    <div className="
                                        flex
                                        items-center
                                        justify-between
                                        gap-3
                                        text-sm
                                        text-slate-500
                                    ">

                                        <span className="
                                            flex
                                            items-center
                                            gap-2
                                        ">

                                            <FaClock />

                                            {course.duration ||
                                                "Self paced"}

                                        </span>


                                        <span className="
                                            capitalize
                                            truncate
                                        ">

                                            {course.level ||
                                                "All Levels"}

                                        </span>

                                    </div>


                                    {/* Title */}

                                    <h3 className="
                                        mt-5
                                        text-xl
                                        font-black
                                        text-slate-800
                                        line-clamp-2
                                        min-h-[56px]
                                    ">

                                        {course.title}

                                    </h3>


                                    {/* Description */}

                                    <p className="
                                        mt-3
                                        text-sm
                                        text-slate-500
                                        line-clamp-2
                                        min-h-[40px]
                                    ">

                                        {course.description ||
                                            "Continue your learning journey and build your skills."}

                                    </p>


                                    {/* =================================================
                                        LESSON PROGRESS
                                    ================================================= */}

                                    <div className="mt-6">

                                        <div className="
                                            flex
                                            justify-between
                                            items-center
                                            text-sm
                                            mb-2
                                        ">

                                            <span className="
                                                font-semibold
                                                text-slate-600
                                            ">

                                                Course Progress

                                            </span>


                                            <span className="
                                                font-bold
                                                text-indigo-600
                                            ">

                                                {progress}%

                                            </span>

                                        </div>


                                        <div className="
                                            h-2.5
                                            rounded-full
                                            bg-slate-200
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
                                                }}

                                                className="
                                                    h-full
                                                    rounded-full
                                                    bg-gradient-to-r
                                                    from-indigo-600
                                                    to-cyan-500
                                                "
                                            />

                                        </div>


                                        {/* Lesson Count */}

                                        <p className="
                                            text-xs
                                            text-slate-400
                                            mt-2
                                        ">

                                            {course.completedLessons ||
                                                0}{" "}
                                            of{" "}
                                            {course.totalLessons ||
                                                0}{" "}
                                            lessons completed

                                        </p>

                                    </div>


                                    {/* =================================================
                                        ACTION
                                    ================================================= */}

                                    <button

                                        onClick={() =>
                                            continueLearning(
                                                course.course_id ||
                                                course.id
                                            )
                                        }

                                        className="
                                            mt-auto
                                            pt-6
                                            w-full
                                        "
                                    >

                                        <span className="
                                            w-full
                                            rounded-2xl
                                            bg-indigo-600
                                            hover:bg-indigo-700
                                            text-white
                                            py-3.5
                                            font-bold
                                            flex
                                            items-center
                                            justify-center
                                            gap-3
                                            transition
                                        ">

                                            <FaPlay />

                                            {completed
                                                ? "Review Course"
                                                : "Continue Learning"}

                                        </span>

                                    </button>

                                </div>

                            </motion.div>

                        );

                    }
                )}

            </div>

        </section>

    );

}


export default MyCourses;