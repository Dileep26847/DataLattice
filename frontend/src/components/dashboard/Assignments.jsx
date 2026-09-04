import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
    FaClipboardCheck,
    FaClock,
    FaArrowRight,
    FaBookOpen,
} from "react-icons/fa";

import { getMyCourses } from "../../services/studentDashboardService";
import { getCourseAssignments } from "../../services/studentAssignmentService";

function Assignments() {

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    const navigate = useNavigate();

    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        if (user?.id) {
            loadAssignments();
        } else {
            setLoading(false);
        }

    }, []);

    const loadAssignments = async () => {

        try {

            setLoading(true);

            // ======================================
            // Get Student Courses
            // ======================================

            const courseData =
                await getMyCourses(user.id);

            const courses =
                courseData.courses || [];

            if (courses.length === 0) {

                setAssignments([]);

                return;

            }

            // ======================================
            // Get Assignments For Each Course
            // ======================================

            const assignmentRequests =
                courses.map(async (course) => {

                    try {

                        const courseId =
                            course.course_id ||
                            course.id;

                        const data =
                            await getCourseAssignments(
                                courseId
                            );

                        const courseAssignments =
                            data.assignments || [];

                        return courseAssignments.map(
                            (assignment) => ({
                                ...assignment,
                                course_title:
                                    course.title,
                            })
                        );

                    } catch (error) {

                        console.error(
                            `Failed to load assignments for course ${course.id}`,
                            error
                        );

                        return [];

                    }

                });

            const results =
                await Promise.all(
                    assignmentRequests
                );

            // ======================================
            // Combine All Assignments
            // ======================================

            const allAssignments =
                results.flat();

            // ======================================
            // Sort By Due Date
            // ======================================

            allAssignments.sort(
                (a, b) => {

                    if (!a.due_date) {
                        return 1;
                    }

                    if (!b.due_date) {
                        return -1;
                    }

                    return (
                        new Date(a.due_date) -
                        new Date(b.due_date)
                    );

                }
            );

            setAssignments(
                allAssignments
            );

        } catch (error) {

            console.error(
                "Dashboard Assignments Error:",
                error
            );

            setAssignments([]);

        } finally {

            setLoading(false);

        }

    };

    // ======================================
    // Format Due Date
    // ======================================

    const formatDate = (date) => {

        if (!date) {
            return "No due date";
        }

        const parsedDate =
            new Date(date);

        if (
            isNaN(
                parsedDate.getTime()
            )
        ) {

            return date;

        }

        return parsedDate.toLocaleDateString(
            "en-IN",
            {
                day: "numeric",
                month: "short",
                year: "numeric",
            }
        );

    };

    // ======================================
    // Loading
    // ======================================

    if (loading) {

        return (

            <div className="bg-white rounded-3xl shadow-xl p-8">

                <p className="text-slate-500">
                    Loading assignments...
                </p>

            </div>

        );

    }

    // ======================================
    // Empty
    // ======================================

    if (assignments.length === 0) {

        return (

            <div className="bg-white rounded-3xl shadow-xl p-8">

                <div className="flex items-center gap-3">

                    <FaClipboardCheck
                        className="text-indigo-600"
                        size={30}
                    />

                    <div>

                        <p className="text-indigo-600 font-semibold">
                            Academic Tasks
                        </p>

                        <h2 className="text-3xl font-black">
                            Assignments
                        </h2>

                    </div>

                </div>

                <div className="text-center py-10">

                    <FaBookOpen
                        className="mx-auto text-slate-300"
                        size={45}
                    />

                    <p className="text-slate-500 mt-4">
                        No assignments available yet.
                    </p>

                    <button
                        onClick={() =>
                            navigate(
                                "/student/assignments"
                            )
                        }
                        className="mt-5 text-indigo-600 font-semibold hover:text-indigo-800"
                    >
                        View Assignments
                    </button>

                </div>

            </div>

        );

    }

    // ======================================
    // Open Assignments Page
    // ======================================

    const openAssignments = () => {

        navigate(
            "/student/assignments"
        );

    };

    // ======================================
    // Assignment List
    // ======================================

    return (

        <div className="bg-white rounded-3xl shadow-xl p-8">

            {/* Header */}

            <div className="flex justify-between items-center">

                <div>

                    <p className="text-indigo-600 font-semibold">
                        Academic Tasks
                    </p>

                    <h2 className="text-3xl font-black">
                        Assignments
                    </h2>

                </div>

                <FaClipboardCheck
                    className="text-indigo-600"
                    size={32}
                />

            </div>

            {/* Assignment List */}

            <div className="space-y-6 mt-8">

                {assignments
                    .slice(0, 5)
                    .map((assignment) => (

                        <motion.div
                            whileHover={{
                                y: -4,
                            }}
                            key={assignment.id}
                            className="border rounded-2xl p-6"
                        >

                            <div className="flex flex-col lg:flex-row justify-between gap-5">

                                {/* Assignment Information */}

                                <div className="flex-1">

                                    <h3 className="text-xl font-bold">

                                        {assignment.title}

                                    </h3>

                                    <p className="text-slate-500 mt-2">

                                        {assignment.description ||
                                            "Complete this assignment and submit your work."}

                                    </p>

                                    {/* Course */}

                                    <div className="mt-4">

                                        <span className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-lg text-sm font-semibold">

                                            <FaBookOpen />

                                            {assignment.course_title ||
                                                "Course"}

                                        </span>

                                    </div>

                                    {/* Details */}

                                    <div className="flex flex-wrap gap-5 mt-4 text-slate-500">

                                        <span className="flex items-center gap-2">

                                            <FaClock />

                                            Due:

                                            <strong className="text-slate-700">

                                                {formatDate(
                                                    assignment.due_date
                                                )}

                                            </strong>

                                        </span>

                                        <span>

                                            Marks:

                                            <strong className="text-slate-700 ml-1">

                                                {assignment.total_marks ||
                                                    0}

                                            </strong>

                                        </span>

                                    </div>

                                </div>

                                {/* Open Button */}

                                <div className="flex items-center">

                                    <button
                                        onClick={
                                            openAssignments
                                        }
                                        className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-5 py-3 flex items-center gap-2 font-semibold transition"
                                    >

                                        Open

                                        <FaArrowRight />

                                    </button>

                                </div>

                            </div>

                        </motion.div>

                    ))}

            </div>

            {/* View All */}

            {assignments.length > 5 && (

                <div className="text-center mt-8">

                    <button
                        onClick={
                            openAssignments
                        }
                        className="text-indigo-600 font-semibold hover:text-indigo-800"
                    >

                        View All Assignments →

                    </button>

                </div>

            )}

        </div>

    );

}

export default Assignments;