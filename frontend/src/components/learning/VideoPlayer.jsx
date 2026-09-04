import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";

import {
    saveVideoProgress,
    getVideoProgress,
} from "../../services/videoProgressService";

function VideoPlayer({ lesson, onLessonCompleted }) {

    const playerRef = useRef(null);

    const lastSavedSecondRef = useRef(0);

    const [playing, setPlaying] =
        useState(false);

    const [playedSeconds, setPlayedSeconds] =
        useState(0);

    const [duration, setDuration] =
        useState(0);

    const [loaded, setLoaded] =
        useState(false);

    const [saving, setSaving] =
        useState(false);

    const [videoCompleted, setVideoCompleted] =
        useState(false);


    // ============================================================
    // LOAD SAVED VIDEO PROGRESS
    // ============================================================

    useEffect(() => {

        let cancelled = false;

        const loadSavedProgress = async () => {

            setLoaded(false);
            setPlayedSeconds(0);
            setDuration(0);
            setVideoCompleted(false);
            lastSavedSecondRef.current = 0;

            if (!lesson?.id) {
                setLoaded(true);
                return;
            }

            try {

                const data =
                    await getVideoProgress(
                        lesson.id
                    );

                if (cancelled) return;

                const saved =
                    data?.progress;

                if (saved) {

                    setPlayedSeconds(
                        Number(
                            saved.watch_time || 0
                        )
                    );

                    setVideoCompleted(
                        Boolean(
                            saved.completed
                        )
                    );

                    lastSavedSecondRef.current =
                        Number(
                            saved.watch_time || 0
                        );

                }

            } catch (error) {

                console.error(
                    "Failed to load video progress:",
                    error
                );

            } finally {

                if (!cancelled) {
                    setLoaded(true);
                }

            }

        };

        loadSavedProgress();

        return () => {
            cancelled = true;
        };

    }, [lesson?.id]);


    // ============================================================
    // SAVE PROGRESS
    // ============================================================

    const persistProgress = async (
        seconds,
        percentage,
        force = false
    ) => {

        if (
            !lesson?.id ||
            !lesson?.course_id ||
            !loaded
        ) {
            return;
        }

        const safeSeconds =
            Math.max(
                0,
                Math.floor(
                    Number(seconds || 0)
                )
            );

        const safePercentage =
            Math.min(
                100,
                Math.max(
                    0,
                    Math.floor(
                        Number(
                            percentage || 0
                        )
                    )
                )
            );

        if (!force) {

            const difference =
                safeSeconds -
                lastSavedSecondRef.current;

            if (difference < 10) {
                return;
            }

        }

        try {

            setSaving(true);

            await saveVideoProgress({

                course_id:
                    lesson.course_id,

                lesson_id:
                    lesson.id,

                watch_time:
                    safeSeconds,

                watched_percentage:
                    safePercentage,

            });

            lastSavedSecondRef.current =
                safeSeconds;

        } catch (error) {

            console.error(
                "Failed to save video progress:",
                error
            );

        } finally {

            setSaving(false);

        }

    };


    // ============================================================
    // VIDEO READY
    // ============================================================

    const handleReady = () => {

        if (
            playerRef.current &&
            playedSeconds > 0
        ) {

            try {

                playerRef.current.seekTo(
                    playedSeconds,
                    "seconds"
                );

            } catch (error) {

                console.error(
                    "Unable to resume video:",
                    error
                );

            }

        }

    };


    // ============================================================
    // VIDEO DURATION
    // ============================================================

    const handleDuration = (
        videoDuration
    ) => {

        const safeDuration =
            Number(
                videoDuration || 0
            );

        setDuration(
            safeDuration
        );

    };


    // ============================================================
    // VIDEO PROGRESS
    // ============================================================

    const handleProgress = (
        state
    ) => {

        if (!loaded) return;

        const seconds =
            Number(
                state?.playedSeconds || 0
            );

        setPlayedSeconds(
            seconds
        );

        const percentage =
            Number(
                state?.played || 0
            ) * 100;

        // Save every ~10 seconds,
        // without depending on exact callback timing.
        persistProgress(
            seconds,
            percentage
        );

    };


    // ============================================================
    // VIDEO ENDED
    // ============================================================

    const handleEnded = async () => {

        setPlaying(false);

        setPlayedSeconds(
            duration || playedSeconds
        );

        setVideoCompleted(true);

        await persistProgress(
            duration || playedSeconds,
            100,
            true
        );

        // Tell LearningPage to refresh
        // course progress and completed lessons.
        if (onLessonCompleted) {

            onLessonCompleted();

        }

    };


    // ============================================================
    // MANUAL PAUSE SAVE
    // ============================================================

    const handlePause = () => {

        setPlaying(false);

        if (
            duration > 0 &&
            playedSeconds > 0
        ) {

            const percentage =
                (playedSeconds / duration) *
                100;

            persistProgress(
                playedSeconds,
                percentage,
                true
            );

        }

    };


    // ============================================================
    // NO LESSON
    // ============================================================

    if (!lesson) {

        return (

            <div className="
                aspect-video
                bg-slate-950
                flex
                items-center
                justify-center
                text-white
                rounded-3xl
            ">

                <div className="text-center px-6">

                    <div className="
                        w-16
                        h-16
                        mx-auto
                        rounded-2xl
                        bg-white/10
                        flex
                        items-center
                        justify-center
                        text-2xl
                    ">

                        ▶

                    </div>

                    <p className="
                        mt-4
                        font-semibold
                        text-slate-300
                    ">

                        Select a lesson to start learning.

                    </p>

                </div>

            </div>

        );

    }


    // ============================================================
    // CALCULATE DISPLAY PROGRESS
    // ============================================================

    const watchedPercentage =
        duration > 0
            ? Math.min(
                100,
                Math.round(
                    (playedSeconds / duration) * 100
                )
            )
            : 0;


    const watchedMinutes =
        Math.floor(
            playedSeconds / 60
        );

    const watchedSeconds =
        Math.floor(
            playedSeconds % 60
        );


    const totalMinutes =
        Math.floor(
            duration / 60
        );

    const totalSeconds =
        Math.floor(
            duration % 60
        );


    const formatTime = (
        minutes,
        seconds
    ) => {

        return `${minutes}:${String(
            seconds
        ).padStart(2, "0")}`;

    };


    // ============================================================
    // RENDER
    // ============================================================

    return (

        <div className="
            bg-white
            rounded-3xl
            overflow-hidden
        ">

            {/* ==================================================
                VIDEO
            ================================================== */}

            <div className="
                aspect-video
                bg-black
                relative
            ">

                <ReactPlayer
                    ref={playerRef}
                    url={lesson.video_url}
                    width="100%"
                    height="100%"
                    controls
                    playing={playing}

                    onReady={
                        handleReady
                    }

                    onDuration={
                        handleDuration
                    }

                    onPlay={() =>
                        setPlaying(true)
                    }

                    onPause={
                        handlePause
                    }

                    onProgress={
                        handleProgress
                    }

                    onEnded={
                        handleEnded
                    }
                />

            </div>


            {/* ==================================================
                VIDEO STATUS
            ================================================== */}

            <div className="
                px-6
                sm:px-8
                pt-6
            ">

                <div className="
                    flex
                    items-center
                    justify-between
                    gap-4
                    mb-2
                ">

                    <span className="
                        text-sm
                        font-semibold
                        text-slate-600
                    ">

                        Video Progress

                    </span>


                    <div className="
                        flex
                        items-center
                        gap-3
                    ">

                        {saving && (

                            <span className="
                                text-xs
                                text-slate-400
                            ">

                                Saving...

                            </span>

                        )}

                        {videoCompleted && (

                            <span className="
                                inline-flex
                                items-center
                                gap-1.5
                                text-xs
                                font-bold
                                text-green-600
                            ">

                                ✓ Completed

                            </span>

                        )}

                        <span className="
                            text-sm
                            font-black
                            text-indigo-600
                        ">

                            {watchedPercentage}%

                        </span>

                    </div>

                </div>


                <div className="
                    h-2.5
                    bg-slate-100
                    rounded-full
                    overflow-hidden
                ">

                    <div
                        className="
                            h-full
                            bg-gradient-to-r
                            from-indigo-600
                            to-cyan-500
                            rounded-full
                            transition-all
                            duration-300
                        "
                        style={{
                            width:
                                `${watchedPercentage}%`,
                        }}
                    />

                </div>


                <div className="
                    flex
                    justify-between
                    mt-2
                    text-xs
                    text-slate-400
                ">

                    <span>

                        Watched{" "}
                        {formatTime(
                            watchedMinutes,
                            watchedSeconds
                        )}

                    </span>

                    <span>

                        {duration > 0
                            ? formatTime(
                                totalMinutes,
                                totalSeconds
                            )
                            : "--:--"}

                    </span>

                </div>

            </div>


            {/* ==================================================
                LESSON INFORMATION
            ================================================== */}

            <div className="
                p-6
                sm:p-8
            ">

                <div className="
                    flex
                    flex-col
                    sm:flex-row
                    sm:items-start
                    sm:justify-between
                    gap-4
                ">

                    <div>

                        <p className="
                            text-xs
                            uppercase
                            tracking-widest
                            font-bold
                            text-indigo-600
                            mb-2
                        ">

                            Current Lesson

                        </p>

                        <h2 className="
                            text-2xl
                            sm:text-3xl
                            font-black
                            text-slate-900
                        ">

                            {lesson.title}

                        </h2>

                    </div>


                    {videoCompleted && (

                        <span className="
                            shrink-0
                            inline-flex
                            items-center
                            gap-2
                            rounded-xl
                            bg-green-50
                            border
                            border-green-100
                            px-4
                            py-2
                            text-sm
                            font-bold
                            text-green-700
                        ">

                            ✓ Complete

                        </span>

                    )}

                </div>


                {lesson.description && (

                    <p className="
                        mt-4
                        text-slate-600
                        leading-7
                    ">

                        {lesson.description}

                    </p>

                )}

            </div>

        </div>

    );

}

export default VideoPlayer;