import {
    FaPlayCircle,
    FaCheckCircle,
    FaLock,
} from "react-icons/fa";


function LessonSidebar({
    lessons,
    selectedLesson,
    setSelectedLesson,
    completedLessons,
}) {

    const completedCount =
        lessons.filter((lesson) =>
            completedLessons.includes(
                lesson.id
            )
        ).length;


    return (

        <aside className="
            bg-white
            rounded-3xl
            border
            border-slate-200
            shadow-sm
            overflow-hidden
        ">

            {/* ==================================================
                HEADER
            ================================================== */}

            <div className="
                p-6
                border-b
                border-slate-100
            ">

                <div className="
                    flex
                    items-start
                    justify-between
                    gap-4
                ">

                    <div>

                        <p className="
                            text-xs
                            uppercase
                            tracking-widest
                            font-bold
                            text-indigo-600
                        ">

                            Course Content

                        </p>

                        <h2 className="
                            text-xl
                            font-black
                            text-slate-900
                            mt-1
                        ">

                            Lessons

                        </h2>

                    </div>


                    <div className="
                        rounded-xl
                        bg-indigo-50
                        px-3
                        py-2
                        text-center
                    ">

                        <p className="
                            text-lg
                            font-black
                            text-indigo-600
                        ">

                            {completedCount}/
                            {lessons.length}

                        </p>

                        <p className="
                            text-[10px]
                            uppercase
                            tracking-wide
                            font-bold
                            text-slate-400
                        ">

                            Done

                        </p>

                    </div>

                </div>


                {/* Overall lesson progress */}

                <div className="mt-5">

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
                                    lessons.length > 0
                                        ? `${(
                                            completedCount /
                                            lessons.length
                                        ) * 100}%`
                                        : "0%",
                            }}
                        />

                    </div>

                </div>

            </div>


            {/* ==================================================
                LESSON LIST
            ================================================== */}

            <div className="
                p-4
                max-h-[650px]
                overflow-y-auto
            ">

                {lessons.length === 0 ? (

                    <div className="
                        py-10
                        text-center
                        text-slate-500
                    ">

                        No lessons available.

                    </div>

                ) : (

                    <div className="space-y-2">

                        {lessons.map(
                            (lesson, index) => {

                                const completed =
                                    completedLessons.includes(
                                        lesson.id
                                    );

                                const active =
                                    selectedLesson?.id ===
                                    lesson.id;

                                return (

                                    <button
                                        key={lesson.id}
                                        onClick={() =>
                                            setSelectedLesson(
                                                lesson
                                            )
                                        }
                                        className={`
                                            group
                                            w-full
                                            text-left
                                            rounded-2xl
                                            p-3
                                            transition-all
                                            border
                                            ${
                                                active
                                                    ? "bg-indigo-600 border-indigo-600 text-white shadow-md"
                                                    : "bg-white border-transparent hover:border-indigo-100 hover:bg-indigo-50"
                                            }
                                        `}
                                    >

                                        <div className="
                                            flex
                                            items-center
                                            gap-3
                                        ">

                                            {/* Number / status */}

                                            <div className={`
                                                shrink-0
                                                w-10
                                                h-10
                                                rounded-xl
                                                flex
                                                items-center
                                                justify-center
                                                ${
                                                    active
                                                        ? "bg-white/15 text-white"
                                                        : completed
                                                            ? "bg-green-50 text-green-600"
                                                            : "bg-slate-100 text-slate-500"
                                                }
                                            `}>

                                                {completed ? (

                                                    <FaCheckCircle />

                                                ) : (

                                                    <FaPlayCircle />

                                                )}

                                            </div>


                                            {/* Content */}

                                            <div className="min-w-0 flex-1">

                                                <div className="
                                                    flex
                                                    items-center
                                                    justify-between
                                                    gap-2
                                                ">

                                                    <span className={`
                                                        text-[11px]
                                                        font-bold
                                                        uppercase
                                                        tracking-wide
                                                        ${
                                                            active
                                                                ? "text-white/70"
                                                                : "text-slate-400"
                                                        }
                                                    `}>

                                                        Lesson{" "}
                                                        {index + 1}

                                                    </span>


                                                    {completed && (

                                                        <span className={`
                                                            text-[10px]
                                                            font-bold
                                                            ${
                                                                active
                                                                    ? "text-white/80"
                                                                    : "text-green-600"
                                                            }
                                                        `}>

                                                            Done

                                                        </span>

                                                    )}

                                                </div>


                                                <p className={`
                                                    mt-1
                                                    font-semibold
                                                    text-sm
                                                    truncate
                                                    ${
                                                        active
                                                            ? "text-white"
                                                            : "text-slate-700"
                                                    }
                                                `}>

                                                    {lesson.title}

                                                </p>

                                            </div>

                                        </div>

                                    </button>

                                );

                            }
                        )}

                    </div>

                )}

            </div>

        </aside>

    );

}


export default LessonSidebar;