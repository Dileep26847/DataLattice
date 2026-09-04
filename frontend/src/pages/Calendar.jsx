import { useEffect, useMemo, useState } from "react";
import {
    FaCalendarAlt,
    FaChevronLeft,
    FaChevronRight,
    FaVideo,
    FaClock,
} from "react-icons/fa";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import { getLiveClasses } from "../services/liveClassService";

function Calendar() {

    const [classes, setClasses] = useState([]);

    const [currentDate, setCurrentDate] =
        useState(new Date());

    const [selectedDate, setSelectedDate] =
        useState(new Date());

    const [loading, setLoading] =
        useState(true);

    // ======================================
    // Load Classes
    // ======================================

    useEffect(() => {

        loadClasses();

    }, []);

    const loadClasses = async () => {

        try {

            const data =
                await getLiveClasses();

            setClasses(
                data.liveClasses || []
            );

        } catch (error) {

            console.error(error);

            toast.error(
                error?.response?.data?.message ||
                "Failed to load calendar."
            );

        } finally {

            setLoading(false);

        }

    };

    // ======================================
    // Calendar Helpers
    // ======================================

    const year =
        currentDate.getFullYear();

    const month =
        currentDate.getMonth();

    const firstDay =
        new Date(
            year,
            month,
            1
        ).getDay();

    const daysInMonth =
        new Date(
            year,
            month + 1,
            0
        ).getDate();

    const monthName =
        currentDate.toLocaleString(
            "en-IN",
            {
                month: "long",
                year: "numeric",
            }
        );

    const previousMonth = () => {

        setCurrentDate(
            new Date(
                year,
                month - 1,
                1
            )
        );

    };

    const nextMonth = () => {

        setCurrentDate(
            new Date(
                year,
                month + 1,
                1
            )
        );

    };

    // ======================================
    // Date Key
    // ======================================

    const getDateKey = (date) => {

        const y =
            date.getFullYear();

        const m =
            String(
                date.getMonth() + 1
            ).padStart(2, "0");

        const d =
            String(
                date.getDate()
            ).padStart(2, "0");

        return `${y}-${m}-${d}`;

    };

    const selectedDateKey =
        getDateKey(selectedDate);

    // ======================================
    // Classes For Selected Date
    // ======================================

    const selectedClasses =
        useMemo(() => {

            return classes.filter(
                (item) =>
                    item.class_date ===
                    selectedDateKey
            );

        }, [
            classes,
            selectedDateKey,
        ]);

    // ======================================
    // Classes On Date
    // ======================================

    const hasClassOnDate = (day) => {

        const date =
            new Date(
                year,
                month,
                day
            );

        const key =
            getDateKey(date);

        return classes.some(
            (item) =>
                item.class_date === key
        );

    };

    // ======================================
    // Today
    // ======================================

    const todayKey =
        getDateKey(
            new Date()
        );

    // ======================================
    // Loading
    // ======================================

    if (loading) {

        return (

            <div className="min-h-screen bg-slate-100 p-8">

                <div className="max-w-7xl mx-auto">

                    <div className="bg-white rounded-3xl shadow-xl p-10">

                        <p className="text-slate-500">
                            Loading calendar...
                        </p>

                    </div>

                </div>

            </div>

        );

    }

    // ======================================
    // Render
    // ======================================

    return (

        <div className="min-h-screen bg-slate-100 p-6 md:p-8">

            <div className="max-w-7xl mx-auto">

                {/* Header */}

                <div className="mb-10">

                    <div className="flex items-center gap-4">

                        <div className="w-16 h-16 rounded-2xl bg-indigo-100 flex items-center justify-center">

                            <FaCalendarAlt
                                className="text-indigo-600"
                                size={32}
                            />

                        </div>

                        <div>

                            <p className="text-indigo-600 font-semibold">
                                Schedule
                            </p>

                            <h1 className="text-4xl font-black text-slate-800">
                                Calendar
                            </h1>

                        </div>

                    </div>

                    <p className="text-slate-500 text-lg mt-4">
                        Keep track of your upcoming live classes.
                    </p>

                </div>

                {/* Main Grid */}

                <div className="grid lg:grid-cols-3 gap-8">

                    {/* Calendar */}

                    <div className="lg:col-span-2 bg-white rounded-3xl shadow-xl p-6 md:p-8">

                        {/* Calendar Header */}

                        <div className="flex justify-between items-center mb-8">

                            <button
                                onClick={
                                    previousMonth
                                }
                                className="w-11 h-11 rounded-xl bg-slate-100 hover:bg-indigo-100 hover:text-indigo-600 flex items-center justify-center transition"
                            >

                                <FaChevronLeft />

                            </button>

                            <h2 className="text-2xl font-black text-slate-800">
                                {monthName}
                            </h2>

                            <button
                                onClick={
                                    nextMonth
                                }
                                className="w-11 h-11 rounded-xl bg-slate-100 hover:bg-indigo-100 hover:text-indigo-600 flex items-center justify-center transition"
                            >

                                <FaChevronRight />

                            </button>

                        </div>

                        {/* Week Days */}

                        <div className="grid grid-cols-7 mb-3">

                            {[
                                "Sun",
                                "Mon",
                                "Tue",
                                "Wed",
                                "Thu",
                                "Fri",
                                "Sat",
                            ].map(
                                (day) => (

                                    <div
                                        key={day}
                                        className="text-center text-sm font-bold text-slate-400 py-3"
                                    >
                                        {day}
                                    </div>

                                )
                            )}

                        </div>

                        {/* Calendar Days */}

                        <div className="grid grid-cols-7 gap-2">

                            {Array.from(
                                {
                                    length: firstDay,
                                }
                            ).map(
                                (_, index) => (

                                    <div
                                        key={`empty-${index}`}
                                        className="h-20"
                                    />

                                )
                            )}

                            {Array.from(
                                {
                                    length:
                                        daysInMonth,
                                }
                            ).map(
                                (_, index) => {

                                    const day =
                                        index + 1;

                                    const date =
                                        new Date(
                                            year,
                                            month,
                                            day
                                        );

                                    const key =
                                        getDateKey(
                                            date
                                        );

                                    const selected =
                                        key ===
                                        selectedDateKey;

                                    const today =
                                        key ===
                                        todayKey;

                                    const hasClass =
                                        hasClassOnDate(
                                            day
                                        );

                                    return (

                                        <button
                                            key={day}
                                            onClick={() =>
                                                setSelectedDate(
                                                    date
                                                )
                                            }
                                            className={`h-20 rounded-2xl p-2 flex flex-col items-center justify-center transition ${
                                                selected
                                                    ? "bg-indigo-600 text-white shadow-lg"
                                                    : today
                                                    ? "bg-indigo-50 text-indigo-700"
                                                    : "hover:bg-slate-100 text-slate-700"
                                            }`}
                                        >

                                            <span className="font-bold">
                                                {day}
                                            </span>

                                            {hasClass && (

                                                <span
                                                    className={`mt-2 w-2 h-2 rounded-full ${
                                                        selected
                                                            ? "bg-white"
                                                            : "bg-indigo-600"
                                                    }`}
                                                />

                                            )}

                                        </button>

                                    );

                                }
                            )}

                        </div>

                    </div>

                    {/* Selected Date */}

                    <div>

                        <div className="bg-white rounded-3xl shadow-xl p-7">

                            <p className="text-indigo-600 font-semibold">
                                Selected Date
                            </p>

                            <h2 className="text-2xl font-black mt-2">

                                {selectedDate.toLocaleDateString(
                                    "en-IN",
                                    {
                                        weekday:
                                            "long",
                                        day: "numeric",
                                        month: "long",
                                    }
                                )}

                            </h2>

                            <div className="mt-7 space-y-5">

                                {selectedClasses.length ===
                                0 ? (

                                    <div className="text-center py-10">

                                        <FaCalendarAlt
                                            className="mx-auto text-slate-300"
                                            size={45}
                                        />

                                        <p className="text-slate-500 mt-4">
                                            No classes scheduled.
                                        </p>

                                    </div>

                                ) : (

                                    selectedClasses.map(
                                        (item) => (

                                            <motion.div
                                                key={
                                                    item.id
                                                }
                                                initial={{
                                                    opacity: 0,
                                                    y: 10,
                                                }}
                                                animate={{
                                                    opacity: 1,
                                                    y: 0,
                                                }}
                                                className="border rounded-2xl p-5"
                                            >

                                                <div className="flex items-start gap-3">

                                                    <div className="w-11 h-11 rounded-xl bg-indigo-100 flex items-center justify-center">

                                                        <FaVideo
                                                            className="text-indigo-600"
                                                        />

                                                    </div>

                                                    <div className="flex-1">

                                                        <h3 className="font-bold text-slate-800">
                                                            {
                                                                item.title
                                                            }
                                                        </h3>

                                                        <div className="flex items-center gap-2 mt-2 text-sm text-slate-500">

                                                            <FaClock />

                                                            {
                                                                item.start_time
                                                            }

                                                            {item.end_time &&
                                                                ` - ${item.end_time}`}

                                                        </div>

                                                    </div>

                                                </div>

                                                {item.zoom_link && (

                                                    <a
                                                        href={
                                                            item.zoom_link
                                                        }
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl py-3 font-semibold flex items-center justify-center gap-2"
                                                    >

                                                        <FaVideo />

                                                        Join Class

                                                    </a>

                                                )}

                                            </motion.div>

                                        )
                                    )

                                )}

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Calendar;