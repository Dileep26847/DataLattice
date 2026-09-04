import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
    FaSearch,
    FaEye,
    FaTrash,
    FaCheckCircle,
    FaClock,
} from "react-icons/fa";

import DashboardLayout from "../../components/layout/DashboardLayout";

import {
    getSubmissions,
    gradeSubmission,
    deleteSubmission,
} from "../../services/assignmentSubmissionService";

function AssignmentSubmissionManagement() {

    const [submissions, setSubmissions] = useState([]);
    const [filteredSubmissions, setFilteredSubmissions] = useState([]);

    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    const [selectedSubmission, setSelectedSubmission] =
        useState(null);

    const [showGradeModal, setShowGradeModal] =
        useState(false);

    const [marks, setMarks] = useState("");
    const [feedback, setFeedback] = useState("");

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

        const keyword = search.toLowerCase().trim();

        const filtered = submissions.filter(
            (submission) =>
                submission.student_name
                    ?.toLowerCase()
                    .includes(keyword) ||

                submission.student_email
                    ?.toLowerCase()
                    .includes(keyword) ||

                submission.assignment_title
                    ?.toLowerCase()
                    .includes(keyword) ||

                submission.course_title
                    ?.toLowerCase()
                    .includes(keyword)
        );

        setFilteredSubmissions(filtered);

    }, [search, submissions]);

    // ======================================
    // Fetch
    // ======================================

    const loadSubmissions = async () => {

        try {

            setLoading(true);

            const data = await getSubmissions();

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
    // Delete
    // ======================================

    const handleDelete = async (id) => {

        const confirmed = window.confirm(
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
    // Open Grade Modal
    // ======================================

    const openGradeModal = (submission) => {

        setSelectedSubmission(submission);

        setMarks(
            submission.marks !== null &&
            submission.marks !== undefined
                ? submission.marks
                : ""
        );

        setFeedback(
            submission.feedback || ""
        );

        setShowGradeModal(true);

    };

    // ======================================
    // Grade
    // ======================================

    const handleGrade = async (e) => {

        e.preventDefault();

        if (
            marks === "" ||
            marks === null ||
            marks === undefined
        ) {

            return toast.error(
                "Marks are required"
            );

        }

        const numericMarks = Number(marks);

        if (numericMarks < 0) {

            return toast.error(
                "Marks cannot be negative"
            );

        }

        if (
            selectedSubmission?.total_marks !== undefined &&
            numericMarks >
                Number(selectedSubmission.total_marks)
        ) {

            return toast.error(
                `Marks cannot exceed ${selectedSubmission.total_marks}`
            );

        }

        try {

            await gradeSubmission(
                selectedSubmission.id,
                numericMarks,
                feedback
            );

            toast.success(
                "Submission graded successfully"
            );

            setShowGradeModal(false);

            setSelectedSubmission(null);

            loadSubmissions();

        } catch (err) {

            console.error(
                "GRADE SUBMISSION ERROR:",
                err
            );

            toast.error(
                err?.response?.data?.message ||
                "Failed to grade submission"
            );

        }

    };

    // ======================================
    // UI
    // ======================================

    return (

        <DashboardLayout>

            <div className="space-y-8">

                {/* Header */}

                <div>

                    <h1 className="text-3xl font-black text-slate-800">
                        Assignment Submissions
                    </h1>

                    <p className="text-slate-500 mt-2">
                        Review, grade and manage student assignment submissions.
                    </p>

                </div>

                {/* Search */}

                <div className="relative">

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
                        placeholder="Search student, assignment or course..."
                        className="
                            w-full
                            pl-12
                            pr-4
                            py-4
                            rounded-2xl
                            bg-slate-100
                            outline-none
                            focus:ring-2
                            focus:ring-cyan-500
                        "
                    />

                </div>

                {/* Table */}

                <div className="bg-white rounded-3xl shadow-sm overflow-hidden">

                    {loading ? (

                        <div className="py-20 text-center text-slate-500">
                            Loading submissions...
                        </div>

                    ) : (

                        <div className="overflow-x-auto">

                            <table className="w-full">

                                <thead>

                                    <tr className="border-b bg-slate-50">

                                        <th className="text-left px-6 py-5">
                                            Student
                                        </th>

                                        <th className="text-left px-6 py-5">
                                            Assignment
                                        </th>

                                        <th className="text-left px-6 py-5">
                                            Course
                                        </th>

                                        <th className="text-center px-6 py-5">
                                            Submitted
                                        </th>

                                        <th className="text-center px-6 py-5">
                                            Marks
                                        </th>

                                        <th className="text-center px-6 py-5">
                                            Status
                                        </th>

                                        <th className="text-center px-6 py-5">
                                            Actions
                                        </th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {filteredSubmissions.length > 0 ? (

                                        filteredSubmissions.map(
                                            (submission) => (

                                                <tr
                                                    key={submission.id}
                                                    className="
                                                        border-b
                                                        hover:bg-slate-50
                                                        transition
                                                    "
                                                >

                                                    {/* Student */}

                                                    <td className="px-6 py-5">

                                                        <div className="font-bold text-slate-800">
                                                            {submission.student_name}
                                                        </div>

                                                        <div className="text-sm text-slate-500">
                                                            {submission.student_email}
                                                        </div>

                                                    </td>

                                                    {/* Assignment */}

                                                    <td className="px-6 py-5">

                                                        <div className="font-semibold">
                                                            {submission.assignment_title}
                                                        </div>

                                                    </td>

                                                    {/* Course */}

                                                    <td className="px-6 py-5">

                                                        {submission.course_title}

                                                    </td>

                                                    {/* Submitted */}

                                                    <td className="px-6 py-5 text-center text-sm">

                                                        {submission.submitted_at
                                                            ? new Date(
                                                                submission.submitted_at
                                                            ).toLocaleDateString()
                                                            : "—"
                                                        }

                                                    </td>

                                                    {/* Marks */}

                                                    <td className="px-6 py-5 text-center">

                                                        {submission.marks !== null &&
                                                        submission.marks !== undefined
                                                            ? `${submission.marks}/${submission.total_marks}`
                                                            : `—/${submission.total_marks}`
                                                        }

                                                    </td>

                                                    {/* Status */}

                                                    <td className="px-6 py-5">

                                                        <div className="flex justify-center">

                                                            {submission.status ===
                                                            "Reviewed" ? (

                                                                <span className="
                                                                    inline-flex
                                                                    items-center
                                                                    gap-2
                                                                    px-3
                                                                    py-2
                                                                    rounded-full
                                                                    bg-green-100
                                                                    text-green-700
                                                                    text-sm
                                                                    font-semibold
                                                                ">

                                                                    <FaCheckCircle />

                                                                    Reviewed

                                                                </span>

                                                            ) : (

                                                                <span className="
                                                                    inline-flex
                                                                    items-center
                                                                    gap-2
                                                                    px-3
                                                                    py-2
                                                                    rounded-full
                                                                    bg-yellow-100
                                                                    text-yellow-700
                                                                    text-sm
                                                                    font-semibold
                                                                ">

                                                                    <FaClock />

                                                                    Pending

                                                                </span>

                                                            )}

                                                        </div>

                                                    </td>

                                                    {/* Actions */}

                                                    <td className="px-6 py-5">

                                                        <div className="flex justify-center gap-3">

                                                            {submission.submission_url && (

                                                                <a
                                                                    href={
                                                                        submission.submission_url
                                                                    }
                                                                    target="_blank"
                                                                    rel="noreferrer"
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

                                                                </a>

                                                            )}

                                                            <button
                                                                onClick={() =>
                                                                    openGradeModal(
                                                                        submission
                                                                    )
                                                                }
                                                                className="
                                                                    bg-cyan-600
                                                                    hover:bg-cyan-700
                                                                    text-white
                                                                    px-4
                                                                    py-3
                                                                    rounded-xl
                                                                    font-semibold
                                                                "
                                                            >

                                                                Grade

                                                            </button>

                                                            <button
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

                                                No submissions found.

                                            </td>

                                        </tr>

                                    )}

                                </tbody>

                            </table>

                        </div>

                    )}

                </div>

            </div>

            {/* Grade Modal */}

            {showGradeModal && selectedSubmission && (

                <div className="
                    fixed
                    inset-0
                    bg-black/50
                    backdrop-blur-sm
                    flex
                    items-center
                    justify-center
                    z-50
                    p-6
                ">

                    <div className="
                        bg-white
                        rounded-3xl
                        shadow-2xl
                        w-full
                        max-w-xl
                        p-8
                    ">

                        <div className="flex justify-between items-center mb-8">

                            <div>

                                <h2 className="text-2xl font-black">
                                    Grade Submission
                                </h2>

                                <p className="text-slate-500 mt-1">
                                    {selectedSubmission.assignment_title}
                                </p>

                            </div>

                            <button
                                type="button"
                                onClick={() =>
                                    setShowGradeModal(false)
                                }
                                className="
                                    text-3xl
                                    font-bold
                                    text-slate-400
                                    hover:text-red-500
                                "
                            >
                                ✕
                            </button>

                        </div>

                        <form
                            onSubmit={handleGrade}
                            className="space-y-6"
                        >

                            <div>

                                <label className="block mb-2 font-semibold">
                                    Student
                                </label>

                                <div className="
                                    bg-slate-100
                                    rounded-xl
                                    px-4
                                    py-3
                                ">

                                    {selectedSubmission.student_name}

                                </div>

                            </div>

                            <div>

                                <label className="block mb-2 font-semibold">
                                    Marks
                                </label>

                                <input
                                    type="number"
                                    min="0"
                                    max={
                                        selectedSubmission.total_marks
                                    }
                                    value={marks}
                                    onChange={(e) =>
                                        setMarks(e.target.value)
                                    }
                                    placeholder={
                                        `Maximum ${selectedSubmission.total_marks}`
                                    }
                                    className="
                                        w-full
                                        rounded-xl
                                        border
                                        border-slate-300
                                        px-4
                                        py-3
                                        outline-none
                                        focus:ring-2
                                        focus:ring-cyan-500
                                    "
                                />

                                <p className="text-sm text-slate-500 mt-2">
                                    Maximum marks:{" "}
                                    {selectedSubmission.total_marks}
                                </p>

                            </div>

                            <div>

                                <label className="block mb-2 font-semibold">
                                    Feedback
                                </label>

                                <textarea
                                    rows="5"
                                    value={feedback}
                                    onChange={(e) =>
                                        setFeedback(
                                            e.target.value
                                        )
                                    }
                                    placeholder="Enter feedback for the student..."
                                    className="
                                        w-full
                                        rounded-xl
                                        border
                                        border-slate-300
                                        px-4
                                        py-3
                                        resize-none
                                        outline-none
                                        focus:ring-2
                                        focus:ring-cyan-500
                                    "
                                />

                            </div>

                            <div className="flex justify-end gap-4">

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowGradeModal(false)
                                    }
                                    className="
                                        px-6
                                        py-3
                                        rounded-xl
                                        bg-slate-200
                                        hover:bg-slate-300
                                        font-semibold
                                    "
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="
                                        px-6
                                        py-3
                                        rounded-xl
                                        bg-cyan-600
                                        hover:bg-cyan-700
                                        text-white
                                        font-semibold
                                    "
                                >
                                    Save Grade
                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            )}

        </DashboardLayout>

    );
}

export default AssignmentSubmissionManagement;