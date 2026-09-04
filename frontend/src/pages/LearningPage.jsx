import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
    FaArrowLeft,
    FaArrowRight,
    FaCheckCircle,
    FaBookOpen,
    FaChevronLeft,
    FaChevronRight,
} from "react-icons/fa";

import { getLessonsByCourse } from "../services/lessonService";

import {
    getCourseProgress,
    getCompletedLessons,
    markLessonComplete,
    resumeLearning,
} from "../services/progressService";

import VideoPlayer from "../components/learning/VideoPlayer";
import LessonSidebar from "../components/learning/LessonSidebar";
import NotesPanel from "../components/learning/NotesPanel";
import ProgressBar from "../components/learning/ProgressBar";

import StudentAssignments from "../features/studentAssignments/StudentAssignments";

import QuizSection from "../components/learning/QuizSection";


// ============================================================
// LEARNING PAGE
// ============================================================

function LearningPage() {

    const { courseId } = useParams();

    const navigate = useNavigate();


    // ============================================================
    // STATE
    // ============================================================

    const [lessons, setLessons] =
        useState([]);

    const [selectedLesson, setSelectedLesson] =
        useState(null);

    const [completedLessons, setCompletedLessons] =
        useState([]);

    const [progress, setProgress] =
        useState(0);

    const [loading, setLoading] =
        useState(true);

    const [completingLesson, setCompletingLesson] =
        useState(false);

    const [mobileLessonsOpen, setMobileLessonsOpen] =
        useState(false);


    // ============================================================
    // LOAD PAGE
    // ============================================================

    useEffect(() => {

        if (!courseId) {
            return;
        }

        loadPage();

    }, [courseId]);


    // ============================================================
    // LOAD COMPLETE LEARNING PAGE
    // ============================================================

    const loadPage = async () => {

        try {

            setLoading(true);


            // ----------------------------------------------------
            // LOAD LESSONS
            // ----------------------------------------------------

            const lessonData =
                await getLessonsByCourse(
                    courseId
                );

            const lessonList =
                lessonData?.lessons || [];

            setLessons(
                lessonList
            );


            // ----------------------------------------------------
            // LOAD COMPLETED LESSONS FIRST
            // ----------------------------------------------------

            let completedIds = [];

            try {

                const completedData =
                    await getCompletedLessons(
                        courseId
                    );

                completedIds =
                    (
                        completedData?.completedLessons ||
                        []
                    ).map(
                        (item) =>
                            Number(item.lesson_id)
                    );

                setCompletedLessons(
                    completedIds
                );

            } catch (error) {

                console.error(
                    "Failed to load completed lessons:",
                    error
                );

            }


            // ----------------------------------------------------
            // RESUME LEARNING
            // ----------------------------------------------------

            try {

                const resume =
                    await resumeLearning(
                        courseId
                    );

                if (
                    resume?.lesson
                ) {

                    setSelectedLesson(
                        resume.lesson
                    );

                } else if (
                    lessonList.length > 0
                ) {

                    // If everything is completed,
                    // open the last lesson.

                    if (
                        completedIds.length >=
                        lessonList.length
                    ) {

                        setSelectedLesson(
                            lessonList[
                                lessonList.length - 1
                            ]
                        );

                    } else {

                        // Otherwise find the first
                        // incomplete lesson.

                        const firstIncomplete =
                            lessonList.find(
                                (lesson) =>
                                    !completedIds.includes(
                                        Number(lesson.id)
                                    )
                            );

                        setSelectedLesson(
                            firstIncomplete ||
                            lessonList[0]
                        );

                    }

                } else {

                    setSelectedLesson(
                        null
                    );

                }

            } catch (error) {

                console.error(
                    "Resume learning error:",
                    error
                );

                if (
                    lessonList.length > 0
                ) {

                    setSelectedLesson(
                        lessonList[0]
                    );

                }

            }


            // ----------------------------------------------------
            // LOAD COURSE PROGRESS
            // ----------------------------------------------------

            await loadProgress();

        } catch (error) {

            console.error(
                "Learning page error:",
                error
            );

        } finally {

            setLoading(false);

        }

    };


    // ============================================================
    // LOAD COURSE PROGRESS
    // ============================================================

    const loadProgress = async () => {

        try {

            const progressData =
                await getCourseProgress(
                    courseId
                );

            setProgress(
                Number(
                    progressData?.progress || 0
                )
            );


            const completedData =
                await getCompletedLessons(
                    courseId
                );

            const completedIds =
                (
                    completedData?.completedLessons ||
                    []
                ).map(
                    (item) =>
                        Number(item.lesson_id)
                );

            setCompletedLessons(
                completedIds
            );

        } catch (error) {

            console.error(
                "Progress loading error:",
                error
            );

        }

    };


    // ============================================================
    // SELECT LESSON
    // ============================================================

    const handleSelectLesson = (
        lesson
    ) => {

        if (!lesson) {
            return;
        }

        setSelectedLesson(
            lesson
        );

        setMobileLessonsOpen(
            false
        );

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });

    };


    // ============================================================
    // MARK LESSON COMPLETE
    // ============================================================

    const handleCompleteLesson = async () => {

        if (
            !selectedLesson ||
            completingLesson
        ) {
            return;
        }


        const alreadyCompleted =
            completedLessons.includes(
                Number(
                    selectedLesson.id
                )
            );


        if (alreadyCompleted) {
            return;
        }


        try {

            setCompletingLesson(
                true
            );


            await markLessonComplete(
                courseId,
                selectedLesson.id
            );


            await loadProgress();


        } catch (error) {

            console.error(
                "Lesson completion error:",
                error
            );

            alert(
                "Unable to mark this lesson as completed."
            );

        } finally {

            setCompletingLesson(
                false
            );

        }

    };


    // ============================================================
    // VIDEO COMPLETED
    // ============================================================

    const handleVideoCompleted = async () => {

        try {

            await loadProgress();

        } catch (error) {

            console.error(
                "Failed to refresh course progress:",
                error
            );

        }

    };


    // ============================================================
    // CURRENT LESSON INDEX
    // ============================================================

    const currentIndex =
        lessons.findIndex(
            (lesson) =>
                Number(lesson.id) ===
                Number(selectedLesson?.id)
        );


    // ============================================================
    // PREVIOUS LESSON
    // ============================================================

    const previousLesson =
        currentIndex > 0
            ? lessons[
                currentIndex - 1
            ]
            : null;


    // ============================================================
    // NEXT LESSON
    // ============================================================

    const nextLesson =
        currentIndex >= 0 &&
        currentIndex <
            lessons.length - 1
            ? lessons[
                currentIndex + 1
            ]
            : null;


    // ============================================================
    // NAVIGATE PREVIOUS
    // ============================================================

    const handlePreviousLesson = () => {

        if (!previousLesson) {
            return;
        }

        handleSelectLesson(
            previousLesson
        );

    };


    // ============================================================
    // NAVIGATE NEXT
    // ============================================================

    const handleNextLesson = () => {

        if (!nextLesson) {
            return;
        }

        handleSelectLesson(
            nextLesson
        );

    };


    // ============================================================
    // LOADING SCREEN
    // ============================================================

    if (loading) {

        return (

            <div className="
                min-h-screen
                bg-slate-100
                flex
                items-center
                justify-center
                px-6
            ">

                <div className="
                    w-full
                    max-w-md
                    bg-white
                    rounded-3xl
                    shadow-xl
                    border
                    border-slate-200
                    p-10
                    text-center
                ">

                    <div className="
                        w-16
                        h-16
                        mx-auto
                        rounded-2xl
                        bg-indigo-50
                        text-indigo-600
                        flex
                        items-center
                        justify-center
                        text-2xl
                    ">

                        <FaBookOpen />

                    </div>


                    <h1 className="
                        text-2xl
                        font-black
                        text-slate-900
                        mt-6
                    ">

                        Loading Course

                    </h1>


                    <p className="
                        text-slate-500
                        mt-2
                    ">

                        Preparing your learning environment...

                    </p>


                    <div className="
                        mt-6
                        h-2
                        bg-slate-100
                        rounded-full
                        overflow-hidden
                    ">

                        <div className="
                            h-full
                            w-1/2
                            bg-indigo-600
                            rounded-full
                            animate-pulse
                        " />

                    </div>

                </div>

            </div>

        );

    }


    // ============================================================
    // EMPTY COURSE
    // ============================================================

    if (!lessons.length) {

        return (

            <div className="
                min-h-screen
                bg-slate-100
                flex
                items-center
                justify-center
                px-6
            ">

                <div className="
                    max-w-lg
                    w-full
                    bg-white
                    rounded-3xl
                    border
                    border-slate-200
                    shadow-lg
                    p-10
                    text-center
                ">

                    <div className="
                        w-16
                        h-16
                        mx-auto
                        rounded-2xl
                        bg-indigo-50
                        text-indigo-600
                        flex
                        items-center
                        justify-center
                        text-2xl
                    ">

                        <FaBookOpen />

                    </div>


                    <h1 className="
                        text-2xl
                        font-black
                        text-slate-900
                        mt-5
                    ">

                        No Lessons Available

                    </h1>


                    <p className="
                        text-slate-500
                        mt-2
                    ">

                        This course does not have any lessons yet.

                    </p>


                    <button
                        onClick={() =>
                            navigate(
                                "/student/my-courses"
                            )
                        }
                        className="
                            mt-6
                            inline-flex
                            items-center
                            gap-2
                            px-5
                            py-3
                            rounded-xl
                            bg-indigo-600
                            text-white
                            font-bold
                            hover:bg-indigo-700
                            transition
                        "
                    >

                        <FaArrowLeft />

                        Back to My Courses

                    </button>

                </div>

            </div>

        );

    }


    // ============================================================
    // COMPLETION STATUS
    // ============================================================

    const currentLessonCompleted =
        selectedLesson
            ? completedLessons.includes(
                Number(
                    selectedLesson.id
                )
            )
            : false;


    // ============================================================
    // RENDER
    // ============================================================

    return (

        <div className="
            min-h-screen
            bg-slate-100
        ">


            {/* ====================================================
                TOP HEADER
            ==================================================== */}

            <header className="
                sticky
                top-0
                z-30
                bg-white/95
                backdrop-blur
                border-b
                border-slate-200
            ">

                <div className="
                    max-w-[1600px]
                    mx-auto
                    px-4
                    sm:px-6
                    lg:px-8
                    py-4
                ">

                    <div className="
                        flex
                        items-center
                        justify-between
                        gap-4
                    ">


                        {/* Back */}

                        <button
                            onClick={() =>
                                navigate(
                                    "/student/my-courses"
                                )
                            }
                            className="
                                shrink-0
                                inline-flex
                                items-center
                                gap-2
                                rounded-xl
                                px-3
                                py-2
                                text-sm
                                font-semibold
                                text-slate-600
                                hover:bg-slate-100
                                transition
                            "
                        >

                            <FaArrowLeft />

                            <span className="
                                hidden
                                sm:inline
                            ">

                                My Courses

                            </span>

                        </button>


                        {/* Course progress */}

                        <div className="
                            flex-1
                            max-w-xl
                            hidden
                            md:block
                        ">

                            <div className="
                                flex
                                items-center
                                justify-between
                                mb-2
                            ">

                                <span className="
                                    text-xs
                                    font-bold
                                    uppercase
                                    tracking-wider
                                    text-slate-400
                                ">

                                    Course Progress

                                </span>


                                <span className="
                                    text-sm
                                    font-black
                                    text-indigo-600
                                ">

                                    {progress}%

                                </span>

                            </div>


                            <div className="
                                h-2
                                rounded-full
                                bg-slate-100
                                overflow-hidden
                            ">

                                <div
                                    className="
                                        h-full
                                        rounded-full
                                        bg-gradient-to-r
                                        from-indigo-600
                                        to-cyan-500
                                        transition-all
                                    "
                                    style={{
                                        width:
                                            `${Math.min(
                                                100,
                                                Math.max(
                                                    0,
                                                    progress
                                                )
                                            )}%`,
                                    }}
                                />

                            </div>

                        </div>


                        {/* Mobile lessons */}

                        <button
                            onClick={() =>
                                setMobileLessonsOpen(
                                    true
                                )
                            }
                            className="
                                lg:hidden
                                shrink-0
                                inline-flex
                                items-center
                                gap-2
                                rounded-xl
                                bg-indigo-50
                                text-indigo-600
                                px-4
                                py-2.5
                                text-sm
                                font-bold
                            "
                        >

                            <FaBookOpen />

                            Lessons

                        </button>

                    </div>

                </div>

            </header>


            {/* ====================================================
                MOBILE LESSON DRAWER
            ==================================================== */}

            {mobileLessonsOpen && (

                <div className="
                    fixed
                    inset-0
                    z-50
                    lg:hidden
                ">

                    {/* Overlay */}

                    <button
                        aria-label="Close lessons"
                        onClick={() =>
                            setMobileLessonsOpen(
                                false
                            )
                        }
                        className="
                            absolute
                            inset-0
                            bg-slate-950/40
                        "
                    />


                    {/* Drawer */}

                    <div className="
                        absolute
                        left-0
                        top-0
                        bottom-0
                        w-[88%]
                        max-w-sm
                        bg-slate-100
                        shadow-2xl
                        overflow-y-auto
                        p-4
                    ">

                        <LessonSidebar
                            lessons={lessons}
                            selectedLesson={
                                selectedLesson
                            }
                            setSelectedLesson={
                                handleSelectLesson
                            }
                            completedLessons={
                                completedLessons
                            }
                        />

                    </div>

                </div>

            )}


            {/* ====================================================
                MAIN
            ==================================================== */}

            <main className="
                max-w-[1600px]
                mx-auto
                px-4
                sm:px-6
                lg:px-8
                py-6
                lg:py-8
            ">


                {/* ==================================================
                    PAGE TITLE
                ================================================== */}

                <div className="
                    mb-6
                ">

                    <div className="
                        flex
                        flex-col
                        md:flex-row
                        md:items-end
                        md:justify-between
                        gap-4
                    ">

                        <div>

                            <p className="
                                text-xs
                                uppercase
                                tracking-[0.18em]
                                font-black
                                text-indigo-600
                            ">

                                Learning Center

                            </p>


                            <h1 className="
                                text-2xl
                                sm:text-3xl
                                lg:text-4xl
                                font-black
                                tracking-tight
                                text-slate-900
                                mt-1
                            ">

                                Continue Learning

                            </h1>


                            <p className="
                                text-slate-500
                                mt-2
                            ">

                                Watch lessons, take notes,
                                complete activities and
                                track your progress.

                            </p>

                        </div>


                        {/* Desktop progress */}

                        <div className="
                            md:hidden
                            bg-white
                            rounded-2xl
                            border
                            border-slate-200
                            p-4
                        ">

                            <div className="
                                flex
                                justify-between
                                text-sm
                                font-semibold
                                mb-2
                            ">

                                <span>
                                    Course Progress
                                </span>

                                <span className="
                                    text-indigo-600
                                ">
                                    {progress}%
                                </span>

                            </div>

                            <div className="
                                h-2
                                bg-slate-100
                                rounded-full
                                overflow-hidden
                            ">

                                <div
                                    className="
                                        h-full
                                        bg-indigo-600
                                        rounded-full
                                    "
                                    style={{
                                        width:
                                            `${progress}%`,
                                    }}
                                />

                            </div>

                        </div>

                    </div>

                </div>


                {/* ==================================================
                    LEARNING LAYOUT
                ================================================== */}

                <div className="
                    grid
                    grid-cols-1
                    lg:grid-cols-[minmax(0,1fr)_360px]
                    gap-6
                    xl:gap-8
                    items-start
                ">


                    {/* =================================================
                        MAIN CONTENT
                    ================================================= */}

                    <section className="
                        min-w-0
                        space-y-6
                    ">


                        {/* =============================================
                            VIDEO
                        ============================================= */}

                        <div className="
                            bg-white
                            rounded-3xl
                            border
                            border-slate-200
                            shadow-sm
                            overflow-hidden
                        ">

                            <VideoPlayer
                                lesson={
                                    selectedLesson
                                }
                                onLessonCompleted={
                                    handleVideoCompleted
                                }
                            />

                        </div>


                        {/* =============================================
                            LESSON STATUS
                        ============================================= */}

                        <div className="
                            bg-white
                            rounded-3xl
                            border
                            border-slate-200
                            shadow-sm
                            p-5
                            sm:p-6
                        ">

                            <div className="
                                flex
                                flex-col
                                sm:flex-row
                                sm:items-center
                                sm:justify-between
                                gap-4
                            ">


                                <div>

                                    <p className="
                                        text-xs
                                        uppercase
                                        tracking-wider
                                        font-bold
                                        text-slate-400
                                    ">

                                        Lesson{" "}
                                        {currentIndex + 1}
                                        {" "}of{" "}
                                        {lessons.length}

                                    </p>


                                    <h2 className="
                                        text-xl
                                        font-black
                                        text-slate-900
                                        mt-1
                                    ">

                                        {selectedLesson?.title}

                                    </h2>

                                </div>


                                {currentLessonCompleted ? (

                                    <div className="
                                        shrink-0
                                        inline-flex
                                        items-center
                                        justify-center
                                        gap-2
                                        rounded-xl
                                        bg-green-50
                                        border
                                        border-green-100
                                        px-5
                                        py-3
                                        text-sm
                                        font-bold
                                        text-green-700
                                    ">

                                        <FaCheckCircle />

                                        Lesson Completed

                                    </div>

                                ) : (

                                    <button
                                        onClick={
                                            handleCompleteLesson
                                        }
                                        disabled={
                                            completingLesson
                                        }
                                        className="
                                            shrink-0
                                            inline-flex
                                            items-center
                                            justify-center
                                            gap-2
                                            rounded-xl
                                            bg-indigo-600
                                            px-5
                                            py-3
                                            text-sm
                                            font-bold
                                            text-white
                                            hover:bg-indigo-700
                                            disabled:opacity-60
                                            disabled:cursor-not-allowed
                                            transition
                                        "
                                    >

                                        <FaCheckCircle />

                                        {completingLesson
                                            ? "Saving..."
                                            : "Mark Complete"}

                                    </button>

                                )}

                            </div>

                        </div>


                        {/* =============================================
                            NOTES
                        ============================================= */}

                        <div className="
                            bg-white
                            rounded-3xl
                            border
                            border-slate-200
                            shadow-sm
                            overflow-hidden
                        ">

                            <NotesPanel
                                lesson={
                                    selectedLesson
                                }
                            />

                        </div>


                        {/* =============================================
                            COURSE PROGRESS
                        ============================================= */}

                        <div className="
                            bg-white
                            rounded-3xl
                            border
                            border-slate-200
                            shadow-sm
                            p-6
                        ">

                            <ProgressBar
                                progress={
                                    progress
                                }
                            />

                        </div>


                        {/* =============================================
                            LESSON NAVIGATION
                        ============================================= */}

                        <div className="
                            bg-white
                            rounded-3xl
                            border
                            border-slate-200
                            shadow-sm
                            p-5
                            sm:p-6
                        ">

                            <div className="
                                flex
                                flex-col
                                sm:flex-row
                                gap-3
                                justify-between
                            ">


                                {/* Previous */}

                                <button
                                    onClick={
                                        handlePreviousLesson
                                    }
                                    disabled={
                                        !previousLesson
                                    }
                                    className="
                                        group
                                        inline-flex
                                        items-center
                                        justify-center
                                        gap-3
                                        rounded-2xl
                                        border
                                        border-slate-200
                                        px-5
                                        py-3.5
                                        text-sm
                                        font-bold
                                        text-slate-700
                                        hover:bg-slate-50
                                        disabled:opacity-40
                                        disabled:cursor-not-allowed
                                        transition
                                    "
                                >

                                    <FaChevronLeft
                                        className="
                                            text-xs
                                            group-hover:-translate-x-1
                                            transition
                                        "
                                    />

                                    <span>

                                        Previous Lesson

                                    </span>

                                </button>


                                {/* Next */}

                                <button
                                    onClick={
                                        handleNextLesson
                                    }
                                    disabled={
                                        !nextLesson
                                    }
                                    className="
                                        group
                                        inline-flex
                                        items-center
                                        justify-center
                                        gap-3
                                        rounded-2xl
                                        bg-indigo-600
                                        px-5
                                        py-3.5
                                        text-sm
                                        font-bold
                                        text-white
                                        hover:bg-indigo-700
                                        disabled:opacity-40
                                        disabled:cursor-not-allowed
                                        transition
                                    "
                                >

                                    <span>

                                        Next Lesson

                                    </span>

                                    <FaChevronRight
                                        className="
                                            text-xs
                                            group-hover:translate-x-1
                                            transition
                                        "
                                    />

                                </button>

                            </div>

                        </div>


                        {/* =============================================
                            ASSIGNMENTS
                        ============================================= */}

                        <div className="
                            bg-white
                            rounded-3xl
                            border
                            border-slate-200
                            shadow-sm
                            overflow-hidden
                        ">

                            <StudentAssignments
                                courseId={
                                    courseId
                                }
                                lessonId={
                                    selectedLesson?.id
                                }
                            />

                        </div>


                        {/* =============================================
                            QUIZ
                        ============================================= */}

                        <div className="
                            bg-white
                            rounded-3xl
                            border
                            border-slate-200
                            shadow-sm
                            overflow-hidden
                        ">

                            <QuizSection
                                courseId={
                                    courseId
                                }
                                lessonId={
                                    selectedLesson?.id
                                }
                            />

                        </div>

                    </section>


                    {/* =================================================
                        DESKTOP LESSON SIDEBAR
                    ================================================= */}

                    <aside className="
                        hidden
                        lg:block
                        lg:sticky
                        lg:top-24
                        min-w-0
                    ">

                        <LessonSidebar
                            lessons={
                                lessons
                            }
                            selectedLesson={
                                selectedLesson
                            }
                            setSelectedLesson={
                                handleSelectLesson
                            }
                            completedLessons={
                                completedLessons
                            }
                        />

                    </aside>

                </div>

            </main>

        </div>

    );

}


export default LearningPage;