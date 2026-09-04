import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    FaVideo,
    FaClock,
    FaCalendarAlt,
    FaUsers,
} from "react-icons/fa";

import { getLiveClasses } from "../../services/liveClassService";

export default function UpcomingClasses() {

    const [classes, setClasses] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadClasses();

    }, []);

    const loadClasses = async () => {

        try {

            setLoading(true);

            const data =
                await getLiveClasses();

            const liveClasses =
                data.liveClasses || [];

            // ======================================
            // Keep Upcoming / Ongoing Classes
            // ======================================

            const filteredClasses =
                liveClasses.filter((item) => {

                    const status =
                        String(
                            item.status || ""
                        ).toLowerCase();

                    return (
                        status === "upcoming" ||
                        status === "ongoing"
                    );

                });

            // ======================================
            // Sort By Date + Start Time
            // ======================================

            filteredClasses.sort(
                (a, b) => {

                    const dateA =
                        new Date(
                            `${a.class_date}T${a.start_time || "00:00:00"}`
                        );

                    const dateB =
                        new Date(
                            `${b.class_date}T${b.start_time || "00:00:00"}`
                        );

                    return dateA - dateB;

                }
            );

            setClasses(
                filteredClasses.slice(0, 3)
            );

        } catch (error) {

            console.error(
                "Upcoming Classes Error:",
                error
            );

            setClasses([]);

        } finally {

            setLoading(false);

        }

    };

    // ======================================
    // Format Date
    // ======================================

    const formatDate = (date) => {

        if (!date) {
            return "Date unavailable";
        }

        const parsedDate =
            new Date(date);

        if (isNaN(parsedDate.getTime())) {
            return date;
        }

        return parsedDate.toLocaleDateString(
            "en-IN",
            {
                weekday: "short",
                day: "numeric",
                month: "short",
            }
        );

    };

    // ======================================
    // Format Time
    // ======================================

    const formatTime = (time) => {

        if (!time) {
            return "Time unavailable";
        }

        const parts =
            String(time).split(":");

        if (parts.length < 2) {
            return time;
        }

        const hours =
            Number(parts[0]);

        const minutes =
            parts[1];

        const period =
            hours >= 12
                ? "PM"
                : "AM";

        const displayHour =
            hours % 12 || 12;

        return `${displayHour}:${minutes} ${period}`;

    };

    // ======================================
    // Loading
    // ======================================

    if (loading) {

        return (

            <div className="bg-white rounded-3xl shadow-xl p-8">

                <p className="text-slate-500">
                    Loading upcoming classes...
                </p>

            </div>

        );

    }

    // ======================================
    // Empty
    // ======================================

    if (classes.length === 0) {

        return (

            <div className="bg-white rounded-3xl shadow-xl p-8">

                <div className="flex justify-between items-center mb-8">

                    <div>

                        <p className="text-indigo-600 font-semibold">
                            Schedule
                        </p>

                        <h2 className="text-3xl font-black">
                            Upcoming Live Classes
                        </h2>

                    </div>

                    <FaCalendarAlt
                        className="text-indigo-600"
                        size={30}
                    />

                </div>

                <div className="text-center py-10">

                    <FaVideo
                        className="mx-auto text-slate-300"
                        size={45}
                    />

                    <p className="text-slate-500 mt-4">
                        No upcoming live classes.
                    </p>

                </div>

            </div>

        );

    }

    // ======================================
    // Classes
    // ======================================

    return (

        <div className="bg-white rounded-3xl shadow-xl p-8">

            {/* Header */}

            <div className="flex justify-between items-center mb-8">

                <div>

                    <p className="text-indigo-600 font-semibold">
                        Schedule
                    </p>

                    <h2 className="text-3xl font-black">
                        Upcoming Live Classes
                    </h2>

                </div>

                <FaCalendarAlt
                    className="text-indigo-600"
                    size={30}
                />

            </div>

            {/* Class List */}

            <div className="space-y-5">

                {classes.map((item) => {

                    const status =
                        String(
                            item.status || "Upcoming"
                        ).toLowerCase();

                    const isOngoing =
                        status === "ongoing";

                    return (

                        <motion.div
                            key={item.id}
                            whileHover={{
                                x: 5,
                            }}
                            className="border rounded-2xl p-5"
                        >

                            <div className="flex flex-col lg:flex-row justify-between gap-5">

                                {/* Class Information */}

                                <div>

                                    <h3 className="text-xl font-bold">

                                        {item.title}

                                    </h3>

                                    {item.description && (

                                        <p className="text-slate-500 text-sm mt-2 line-clamp-2">

                                            {item.description}

                                        </p>

                                    )}

                                    <div className="flex flex-wrap gap-5 mt-4 text-slate-500">

                                        <span className="flex items-center gap-2">

                                            <FaCalendarAlt />

                                            {formatDate(
                                                item.class_date
                                            )}

                                        </span>

                                        <span className="flex items-center gap-2">

                                            <FaClock />

                                            {formatTime(
                                                item.start_time
                                            )}

                                            {item.end_time &&
                                                ` - ${formatTime(
                                                    item.end_time
                                                )}`}

                                        </span>

                                    </div>

                                    {/* Batch */}

                                    {item.batch_name && (

                                        <div className="mt-4">

                                            <span className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-lg text-sm font-semibold">

                                                <FaUsers />

                                                {item.batch_name}

                                            </span>

                                        </div>

                                    )}

                                </div>

                                {/* Action */}

                                <div className="flex flex-col items-start lg:items-end justify-between gap-3">

                                    <span
                                        className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${
                                            isOngoing
                                                ? "bg-green-100 text-green-700"
                                                : "bg-blue-100 text-blue-700"
                                        }`}
                                    >

                                        {isOngoing
                                            ? "Ongoing"
                                            : "Upcoming"}

                                    </span>

                                    {item.zoom_link && (

                                        <a
                                            href={
                                                item.zoom_link
                                            }
                                            target="_blank"
                                            rel="noreferrer"
                                            className="rounded-xl bg-indigo-600 hover:bg-indigo-700 px-5 py-2.5 text-white flex items-center gap-2 font-semibold transition"
                                        >

                                            <FaVideo />

                                            {isOngoing
                                                ? "Join Now"
                                                : "Join Class"}

                                        </a>

                                    )}

                                </div>

                            </div>

                        </motion.div>

                    );

                })}

            </div>

        </div>

    );

}