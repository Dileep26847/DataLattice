import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
    FaSearch,
    FaEye,
    FaEdit,
    FaTrash,
    FaFileAlt,
} from "react-icons/fa";

import {
    getSubmissions,
    deleteSubmission,
} from "../../../services/assignmentSubmissionService";

import GradeSubmissionModal from "./GradeSubmissionModal";

function AssignmentSubmissionTable() {

    const [submissions, setSubmissions] = useState([]);

    const [filteredSubmissions, setFilteredSubmissions] =
        useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const [showGrade, setShowGrade] =
        useState(false);

    const [selectedSubmission, setSelectedSubmission] =
        useState(null);

    // ======================================
    // Load Submissions
    // ======================================

    useEffect(() => {

        loadSubmissions();

    }, []);

    // ======================================
    // Search
    // ======================================

    useEffect(() => {

        const keyword =
            search.toLowerCase().trim();

        if (!keyword) {

            setFilteredSubmissions(
                submissions
            );

            return;

        }

        const filtered =
            submissions.filter((submission) => {

                return (

                    submission.student_name
                        ?.toLowerCase()
                        .includes(keyword)

                    ||

                    submission.student_email
                        ?.toLowerCase()
                        .includes(keyword)

                    ||

                    submission.assignment_title
                        ?.toLowerCase()
                        .includes(keyword)

                    ||

                    submission.course_title
                        ?.toLowerCase()
                        .includes(keyword)

                    ||

                    submission.status
                        ?.toLowerCase()
                        .includes(keyword)

                );

            });

        setFilteredSubmissions(filtered);

    }, [search, submissions]);

    // ======================================
    // Get All Submissions
    // ======================================

    const loadSubmissions = async () => {

        try {

            setLoading(true);

            const data =
                await getSubmissions();

            setSubmissions(
                data.submissions || []
            );

            setFilteredSubmissions(
                data.submissions || []
            );

        } catch (err) {

            console.error(
                "LOAD SUBMISSIONS ERROR:",
                err
            );

            toast.error(
                err?.response?.data?.message ||
                "Failed to load submissions"
            );

        } finally {

            setLoading(false);

        }

    };

    // ======================================
    // Delete Submission
    // ======================================

    const handleDelete = async (id) => {

        const confirmed =
            window.confirm(
                "Are you sure you want to delete this submission?"
            );

        if (!confirmed) return;

        try {

            await deleteSubmission(id);

            toast.success(
                "Submission deleted successfully"
            );

            loadSubmissions();

        } catch (err) {

            console.error(
                "DELETE SUBMISSION ERROR:",
                err
            );

            toast.error(
                err?.response?.data?.message ||
                "Failed to delete submission"
            );

        }

    };

    // ======================================
    // Open Submission File
    // ======================================

    const handleViewSubmission = (
        submissionUrl
    ) => {

        if (!submissionUrl) {

            toast.error(
                "No submission file available"
            );

            return;

        }

        window.open(
            submissionUrl,
            "_blank",
            "noopener,noreferrer"
        );

    };

    return (

        <div className="bg-white rounded-3xl shadow-lg p-6">

            {/* ======================================
                Header
            ====================================== */}

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">

                <div>

                    <h2 className="text-2xl font-bold text-slate-800">

                        Student Submissions

                    </h2>

                    <p className="text-slate-500 mt-1">

                        Review and evaluate submitted assignments.

                    </p>

                </div>

            </div>

            {/* ======================================
                Search
            ====================================== */}

            <div className="relative mb-6">

                <FaSearch
                    className="
                        absolute
                        left-4
                        top-4
                        text-slate-400
                    "
                />

                <input
                    type="text"
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                    placeholder="Search student, assignment, course..."
                    className="
                        w-full
                        pl-12
                        pr-4
                        py-3
                        rounded-xl
                        border
                        border-slate-200
                        outline-none
                        focus:ring-2
                        focus:ring-cyan-500
                    "
                />

            </div>

            {/* ======================================
                Loading
            ====================================== */}

            {loading ? (

                <div className="py-20 text-center">

                    <p className="text-lg text-slate-500">

                        Loading submissions...

                    </p>

                </div>

            ) : (

                <div className="overflow-x-auto">

                    <table className="w-full">

                        {/* ======================================
                            Table Header
                        ====================================== */}

                        <thead>

                            <tr className="border-b border-slate-200">

                                <th className="text-left py-4 px-3">
                                    Student
                                </th>

                                <th className="text-left py-4 px-3">
                                    Assignment
                                </th>

                                <th className="text-left py-4 px-3">
                                    Course
                                </th>

                                <th className="text-center py-4 px-3">
                                    Submitted
                                </th>

                                <th className="text-center py-4 px-3">
                                    Marks
                                </th>

                                <th className="text-center py-4 px-3">
                                    Status
                                </th>

                                <th className="text-center py-4 px-3">
                                    Actions
                                </th>

                            </tr>

                        </thead>

                        {/* ======================================
                            Table Body
                        ====================================== */}

                        <tbody>

                            {filteredSubmissions.length > 0 ? (

                                filteredSubmissions.map(
                                    (submission) => (

                                        <tr
                                            key={submission.id}
                                            className="
                                                border-b
                                                border-slate-100
                                                hover:bg-slate-50
                                                transition
                                            "
                                        >

                                            {/* Student */}

                                            <td className="py-5 px-3">

                                                <div>

                                                    <p className="font-bold text-slate-800">

                                                        {
                                                            submission.student_name ||
                                                            "Unknown Student"
                                                        }

                                                    </p>

                                                    <p className="text-sm text-slate-500">

                                                        {
                                                            submission.student_email ||
                                                            "-"
                                                        }

                                                    </p>

                                                </div>

                                            </td>

                                            {/* Assignment */}

                                            <td className="py-5 px-3">

                                                <p className="font-semibold">

                                                    {
                                                        submission.assignment_title ||
                                                        "-"
                                                    }

                                                </p>

                                            </td>

                                            {/* Course */}

                                            <td className="py-5 px-3">

                                                {
                                                    submission.course_title ||
                                                    "-"
                                                }

                                            </td>

                                            {/* Submitted */}

                                            <td className="py-5 px-3 text-center">

                                                {submission.submitted_at
                                                    ? new Date(
                                                        submission.submitted_at
                                                    ).toLocaleString()
                                                    : "-"
                                                }

                                            </td>

                                            {/* Marks */}

                                            <td className="py-5 px-3 text-center">

                                                {submission.marks !== null &&
                                                submission.marks !== undefined
                                                    ? (
                                                        <span className="font-bold">

                                                            {
                                                                submission.marks
                                                            }

                                                            {" / "}

                                                            {
                                                                submission.total_marks
                                                            }

                                                        </span>
                                                    )
                                                    : (

                                                        <span className="text-slate-400">

                                                            Not Graded

                                                        </span>

                                                    )
                                                }

                                            </td>

                                            {/* Status */}

                                            <td className="py-5 px-3 text-center">

                                                <span
                                                    className={`
                                                        inline-flex
                                                        px-3
                                                        py-1
                                                        rounded-full
                                                        text-sm
                                                        font-semibold
                                                        ${
                                                            submission.status ===
                                                            "Reviewed"

                                                                ? "bg-green-100 text-green-700"

                                                                : "bg-yellow-100 text-yellow-700"
                                                        }
                                                    `}
                                                >

                                                    {
                                                        submission.status ||
                                                        "Pending"
                                                    }

                                                </span>

                                            </td>

                                            {/* Actions */}

                                            <td className="py-5 px-3">

                                                <div className="flex justify-center gap-2">

                                                    {/* View */}

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handleViewSubmission(
                                                                submission.submission_url
                                                            )
                                                        }
                                                        className="
                                                            bg-slate-700
                                                            hover:bg-slate-800
                                                            text-white
                                                            p-3
                                                            rounded-xl
                                                        "
                                                        title="View Submission"
                                                    >

                                                        <FaEye />

                                                    </button>

                                                    {/* Grade */}

                                                    <button
                                                        type="button"
                                                        onClick={() => {

                                                            setSelectedSubmission(
                                                                submission
                                                            );

                                                            setShowGrade(
                                                                true
                                                            );

                                                        }}
                                                        className="
                                                            bg-blue-600
                                                            hover:bg-blue-700
                                                            text-white
                                                            p-3
                                                            rounded-xl
                                                        "
                                                        title="Grade Submission"
                                                    >

                                                        <FaEdit />

                                                    </button>

                                                    {/* Delete */}

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handleDelete(
                                                                submission.id
                                                            )
                                                        }
                                                        className="
                                                            bg-red-600
                                                            hover:bg-red-700
                                                            text-white
                                                            p-3
                                                            rounded-xl
                                                        "
                                                        title="Delete Submission"
                                                    >

                                                        <FaTrash />

                                                    </button>

                                                </div>

                                            </td>

                                        </tr>

                                    )
                                )

                            ) : (

                                <tr>

                                    <td
                                        colSpan="7"
                                        className="
                                            py-20
                                            text-center
                                            text-slate-500
                                        "
                                    >

                                        <div className="flex flex-col items-center gap-3">

                                            <FaFileAlt
                                                className="text-4xl text-slate-300"
                                            />

                                            <p>

                                                No submissions found.

                                            </p>

                                        </div>

                                    </td>

                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>

            )}

            {/* ======================================
                Grade Submission Modal
            ====================================== */}

            {showGrade && (

                <GradeSubmissionModal

                    submission={
                        selectedSubmission
                    }

                    close={() =>
                        setShowGrade(false)
                    }

                    refresh={
                        loadSubmissions
                    }

                />

            )}

        </div>

    );

}

export default AssignmentSubmissionTable;