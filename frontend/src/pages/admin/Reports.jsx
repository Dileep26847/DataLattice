import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
    getReportSummary,
    getStudentReport,
    getCourseReport,
    getEnrollmentReport,
} from "../../services/adminReportsService";

import {
    FaUsers,
    FaBookOpen,
    FaUserGraduate,
    FaClipboardList,
    FaChartBar,
    FaSyncAlt,
} from "react-icons/fa";


// ============================================================
// ADMIN REPORTS
// IMPORTANT:
// This page is CONTENT ONLY.
// AdminSidebar + AdminTopbar are provided by AdminLayout.
// ============================================================

function Reports() {

    const [summary, setSummary] = useState({
        students: 0,
        courses: 0,
        enrollments: 0,
        assignments: 0,
    });

    const [studentReport, setStudentReport] = useState(null);
    const [courseReport, setCourseReport] = useState(null);
    const [enrollmentReport, setEnrollmentReport] = useState(null);

    const [loading, setLoading] = useState(true);


    // ========================================================
    // LOAD REPORTS
    // ========================================================

    const loadReports = async () => {

        try {

            setLoading(true);

            const [
                summaryData,
                studentsData,
                coursesData,
                enrollmentsData,
            ] = await Promise.all([

                getReportSummary(),
                getStudentReport(),
                getCourseReport(),
                getEnrollmentReport(),

            ]);


            setSummary(
                summaryData?.summary || {
                    students: 0,
                    courses: 0,
                    enrollments: 0,
                    assignments: 0,
                }
            );


            setStudentReport(
                studentsData?.report || null
            );


            setCourseReport(
                coursesData?.report || null
            );


            setEnrollmentReport(
                enrollmentsData?.report || null
            );

        }

        catch (error) {

            console.error(
                "REPORTS FRONTEND ERROR:",
                error
            );

            toast.error(
                "Failed to load reports"
            );

        }

        finally {

            setLoading(false);

        }

    };


    // ========================================================
    // INITIAL LOAD
    // ========================================================

    useEffect(() => {

        loadReports();

    }, []);


    // ========================================================
    // STAT CARD
    // ========================================================

    const StatCard = ({
        title,
        value,
        icon,
        description,
    }) => (

        <div
            className="
                bg-white
                rounded-3xl
                shadow-lg
                p-7
            "
        >

            <div
                className="
                    flex
                    items-center
                    justify-between
                    gap-5
                "
            >

                <div>

                    <p
                        className="
                            text-sm
                            font-semibold
                            text-slate-500
                        "
                    >
                        {title}
                    </p>


                    <h2
                        className="
                            text-4xl
                            font-black
                            text-slate-800
                            mt-3
                        "
                    >

                        {loading
                            ? "..."
                            : Number(
                                value || 0
                            ).toLocaleString()
                        }

                    </h2>


                    <p
                        className="
                            text-xs
                            text-slate-400
                            mt-2
                        "
                    >
                        {description}
                    </p>

                </div>


                <div
                    className="
                        shrink-0
                        bg-cyan-100
                        text-cyan-600
                        p-5
                        rounded-2xl
                        text-2xl
                    "
                >

                    {icon}

                </div>

            </div>

        </div>

    );


    // ========================================================
    // RENDER
    // ========================================================

    return (

        <div
            className="
                w-full
                space-y-8
            "
        >

            {/* ==================================================
                PAGE HEADER
            ================================================== */}

            <div
                className="
                    flex
                    flex-col
                    md:flex-row
                    md:items-center
                    md:justify-between
                    gap-4
                "
            >

                <div>

                    <h1
                        className="
                            text-4xl
                            font-black
                            text-slate-800
                        "
                    >
                        Reports
                    </h1>


                    <p
                        className="
                            text-slate-500
                            mt-2
                        "
                    >
                        Review important Data Lattice LMS
                        performance reports.
                    </p>

                </div>


                <button
                    type="button"
                    onClick={loadReports}
                    disabled={loading}
                    className="
                        flex
                        items-center
                        justify-center
                        gap-3
                        bg-cyan-600
                        hover:bg-cyan-700
                        disabled:bg-slate-400
                        text-white
                        px-6
                        py-3
                        rounded-xl
                        font-semibold
                        transition
                    "
                >

                    <FaSyncAlt
                        className={
                            loading
                                ? "animate-spin"
                                : ""
                        }
                    />

                    Refresh Reports

                </button>

            </div>


            {/* ==================================================
                SUMMARY
            ================================================== */}

            <div
                className="
                    grid
                    sm:grid-cols-2
                    xl:grid-cols-4
                    gap-6
                "
            >

                <StatCard
                    title="Total Students"
                    value={summary.students}
                    icon={<FaUserGraduate />}
                    description="Registered students"
                />


                <StatCard
                    title="Total Courses"
                    value={summary.courses}
                    icon={<FaBookOpen />}
                    description="Available courses"
                />


                <StatCard
                    title="Enrollments"
                    value={summary.enrollments}
                    icon={<FaUsers />}
                    description="Course enrollments"
                />


                <StatCard
                    title="Assignments"
                    value={summary.assignments}
                    icon={<FaClipboardList />}
                    description="Created assignments"
                />

            </div>


            {/* ==================================================
                DETAILED REPORTS
            ================================================== */}

            <div
                className="
                    grid
                    xl:grid-cols-3
                    gap-8
                "
            >

                {/* ==================================================
                    STUDENT REPORT
                ================================================== */}

                <div
                    className="
                        bg-white
                        rounded-3xl
                        shadow-lg
                        p-8
                    "
                >

                    <div
                        className="
                            flex
                            items-center
                            gap-4
                            mb-7
                        "
                    >

                        <div
                            className="
                                bg-cyan-100
                                text-cyan-600
                                p-4
                                rounded-2xl
                                text-xl
                            "
                        >
                            <FaUserGraduate />
                        </div>


                        <div>

                            <h2
                                className="
                                    text-xl
                                    font-black
                                    text-slate-800
                                "
                            >
                                Student Report
                            </h2>


                            <p
                                className="
                                    text-sm
                                    text-slate-500
                                "
                            >
                                Student registration overview
                            </p>

                        </div>

                    </div>


                    <div className="space-y-5">

                        <div
                            className="
                                flex
                                justify-between
                                items-center
                                bg-slate-50
                                rounded-xl
                                px-5
                                py-4
                            "
                        >

                            <span className="text-slate-500">
                                Total Students
                            </span>


                            <strong
                                className="
                                    text-xl
                                    text-slate-800
                                "
                            >

                                {loading
                                    ? "..."
                                    : Number(
                                        studentReport?.total_students || 0
                                    ).toLocaleString()
                                }

                            </strong>

                        </div>


                        <div
                            className="
                                flex
                                justify-between
                                items-center
                                bg-slate-50
                                rounded-xl
                                px-5
                                py-4
                            "
                        >

                            <span className="text-slate-500">
                                Registered Students
                            </span>


                            <strong
                                className="
                                    text-xl
                                    text-cyan-600
                                "
                            >

                                {loading
                                    ? "..."
                                    : Number(
                                        studentReport?.registered_students || 0
                                    ).toLocaleString()
                                }

                            </strong>

                        </div>

                    </div>

                </div>


                {/* ==================================================
                    COURSE REPORT
                ================================================== */}

                <div
                    className="
                        bg-white
                        rounded-3xl
                        shadow-lg
                        p-8
                    "
                >

                    <div
                        className="
                            flex
                            items-center
                            gap-4
                            mb-7
                        "
                    >

                        <div
                            className="
                                bg-blue-100
                                text-blue-600
                                p-4
                                rounded-2xl
                                text-xl
                            "
                        >
                            <FaBookOpen />
                        </div>


                        <div>

                            <h2
                                className="
                                    text-xl
                                    font-black
                                    text-slate-800
                                "
                            >
                                Course Report
                            </h2>


                            <p
                                className="
                                    text-sm
                                    text-slate-500
                                "
                            >
                                Course overview
                            </p>

                        </div>

                    </div>


                    <div className="space-y-5">

                        <div
                            className="
                                flex
                                justify-between
                                items-center
                                bg-slate-50
                                rounded-xl
                                px-5
                                py-4
                            "
                        >

                            <span className="text-slate-500">
                                Total Courses
                            </span>


                            <strong
                                className="
                                    text-xl
                                    text-slate-800
                                "
                            >

                                {loading
                                    ? "..."
                                    : Number(
                                        courseReport?.total_courses || 0
                                    ).toLocaleString()
                                }

                            </strong>

                        </div>


                        <div
                            className="
                                flex
                                justify-between
                                items-center
                                bg-slate-50
                                rounded-xl
                                px-5
                                py-4
                            "
                        >

                            <span className="text-slate-500">
                                Course Value
                            </span>


                            <strong
                                className="
                                    text-xl
                                    text-blue-600
                                "
                            >

                                ₹
                                {loading
                                    ? "..."
                                    : Number(
                                        courseReport?.total_course_value || 0
                                    ).toLocaleString()
                                }

                            </strong>

                        </div>

                    </div>

                </div>


                {/* ==================================================
                    ENROLLMENT REPORT
                ================================================== */}

                <div
                    className="
                        bg-white
                        rounded-3xl
                        shadow-lg
                        p-8
                    "
                >

                    <div
                        className="
                            flex
                            items-center
                            gap-4
                            mb-7
                        "
                    >

                        <div
                            className="
                                bg-purple-100
                                text-purple-600
                                p-4
                                rounded-2xl
                                text-xl
                            "
                        >
                            <FaChartBar />
                        </div>


                        <div>

                            <h2
                                className="
                                    text-xl
                                    font-black
                                    text-slate-800
                                "
                            >
                                Enrollment Report
                            </h2>


                            <p
                                className="
                                    text-sm
                                    text-slate-500
                                "
                            >
                                Enrollment overview
                            </p>

                        </div>

                    </div>


                    <div className="space-y-5">

                        <div
                            className="
                                flex
                                justify-between
                                items-center
                                bg-slate-50
                                rounded-xl
                                px-5
                                py-4
                            "
                        >

                            <span className="text-slate-500">
                                Total Enrollments
                            </span>


                            <strong
                                className="
                                    text-xl
                                    text-purple-600
                                "
                            >

                                {loading
                                    ? "..."
                                    : Number(
                                        enrollmentReport?.total_enrollments || 0
                                    ).toLocaleString()
                                }

                            </strong>

                        </div>

                    </div>

                </div>

            </div>


            {/* ==================================================
                REPORT CENTER
            ================================================== */}

            <div
                className="
                    bg-white
                    rounded-3xl
                    shadow-lg
                    p-8
                "
            >

                <div
                    className="
                        flex
                        items-center
                        gap-4
                        mb-6
                    "
                >

                    <div
                        className="
                            bg-slate-100
                            text-slate-600
                            p-4
                            rounded-2xl
                        "
                    >
                        <FaChartBar />
                    </div>


                    <div>

                        <h2
                            className="
                                text-2xl
                                font-black
                                text-slate-800
                            "
                        >
                            Report Center
                        </h2>


                        <p
                            className="
                                text-slate-500
                                mt-1
                            "
                        >
                            More detailed filtering and export
                            functionality can be added here.
                        </p>

                    </div>

                </div>


                <div
                    className="
                        grid
                        md:grid-cols-3
                        gap-5
                    "
                >

                    <div
                        className="
                            border
                            border-slate-200
                            rounded-2xl
                            p-6
                        "
                    >

                        <h3 className="font-bold">
                            Student Reports
                        </h3>


                        <p
                            className="
                                text-sm
                                text-slate-500
                                mt-2
                            "
                        >
                            Registration and student activity
                            reporting.
                        </p>

                    </div>


                    <div
                        className="
                            border
                            border-slate-200
                            rounded-2xl
                            p-6
                        "
                    >

                        <h3 className="font-bold">
                            Course Reports
                        </h3>


                        <p
                            className="
                                text-sm
                                text-slate-500
                                mt-2
                            "
                        >
                            Course inventory and value reporting.
                        </p>

                    </div>


                    <div
                        className="
                            border
                            border-slate-200
                            rounded-2xl
                            p-6
                        "
                    >

                        <h3 className="font-bold">
                            Enrollment Reports
                        </h3>


                        <p
                            className="
                                text-sm
                                text-slate-500
                                mt-2
                            "
                        >
                            Enrollment statistics and trends.
                        </p>

                    </div>

                </div>

            </div>

        </div>

    );

}


export default Reports;