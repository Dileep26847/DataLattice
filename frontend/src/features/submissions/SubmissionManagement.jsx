import { useEffect, useState } from "react";

import {
    FaClipboardList,
    FaExternalLinkAlt,
    FaSearch,
    FaUserGraduate,
    FaBook,
    FaEdit,
    FaTimes,
} from "react-icons/fa";

import toast from "react-hot-toast";

// ======================================
// Assignment Submission Service
// ======================================

import {
    getSubmissions,
    gradeSubmission,
} from "../../services/assignmentSubmissionService";


function SubmissionManagement() {

    const [submissions, setSubmissions] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const [selectedSubmission, setSelectedSubmission] =
        useState(null);

    const [marks, setMarks] = useState("");

    const [feedback, setFeedback] = useState("");

    const [reviewLoading, setReviewLoading] =
        useState(false);


    // ======================================
    // Load Submissions
    // ======================================

    useEffect(() => {

        loadSubmissions();

    }, []);


    const loadSubmissions = async () => {

        try {

            setLoading(true);

            const data = await getSubmissions();

            setSubmissions(
                data.submissions || []
            );

        } catch (error) {

            console.error(
                "LOAD SUBMISSIONS ERROR:",
                error
            );

            toast.error(
                error?.response?.data?.message ||
                "Failed to load submissions."
            );

        } finally {

            setLoading(false);

        }

    };


    // ======================================
    // Open Review Modal
    // ======================================

    const openReview = (submission) => {

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

    };


    // ======================================
    // Close Review Modal
    // ======================================

    const closeReview = () => {

        if (reviewLoading) return;

        setSelectedSubmission(null);

        setMarks("");

        setFeedback("");

    };


    // ======================================
    // Submit Review
    // ======================================

    const handleReview = async (e) => {

        e.preventDefault();


        // ======================================
        // Marks Required
        // ======================================

        if (marks === "") {

            toast.error(
                "Please enter marks."
            );

            return;

        }


        // ======================================
        // Convert Marks
        // ======================================

        const numericMarks =
            Number(marks);


        // ======================================
        // Validate Number
        // ======================================

        if (isNaN(numericMarks)) {

            toast.error(
                "Marks must be a number."
            );

            return;

        }


        // ======================================
        // Negative Marks
        // ======================================

        if (numericMarks < 0) {

            toast.error(
                "Marks cannot be negative."
            );

            return;

        }


        // ======================================
        // Maximum Marks
        // ======================================

        const totalMarks =
            Number(
                selectedSubmission?.total_marks ||
                100
            );


        if (numericMarks > totalMarks) {

            toast.error(
                `Marks cannot exceed ${totalMarks}.`
            );

            return;

        }


        try {

            setReviewLoading(true);


            // ======================================
            // Grade Submission
            // ======================================

            await gradeSubmission(
    selectedSubmission.id,
    {
        marks: numericMarks,
        feedback: feedback.trim(),
    }
);


            toast.success(
                "Submission reviewed successfully!"
            );


            closeReview();


            await loadSubmissions();


        } catch (error) {

            console.error(
                "GRADE SUBMISSION ERROR:",
                error
            );

            toast.error(
                error?.response?.data?.message ||
                "Failed to review submission."
            );

        } finally {

            setReviewLoading(false);

        }

    };


    // ======================================
    // Search
    // ======================================

    const filteredSubmissions =
        submissions.filter((submission) => {

            const text =
                search.toLowerCase();

            return (

                submission.student_name
                    ?.toLowerCase()
                    .includes(text) ||

                submission.assignment_title
                    ?.toLowerCase()
                    .includes(text) ||

                submission.status
                    ?.toLowerCase()
                    .includes(text)

            );

        });


    // ======================================
    // Loading
    // ======================================

    if (loading) {

        return (

            <div className="p-8">

                <div className="bg-white rounded-3xl shadow p-10">

                    <p className="text-slate-500">

                        Loading submissions...

                    </p>

                </div>

            </div>

        );

    }


    // ======================================
    // Main UI
    // ======================================

    return (

        <div className="min-h-screen bg-slate-100 p-8">

            <div className="max-w-7xl mx-auto">


                {/* ======================================
                    Header
                ====================================== */}

                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-5 mb-8">

                    <div>

                        <div className="flex items-center gap-3">

                            <FaClipboardList
                                className="text-indigo-600"
                                size={32}
                            />

                            <h1 className="text-4xl font-black">

                                Submissions

                            </h1>

                        </div>

                        <p className="text-slate-500 mt-2">

                            Review student assignment submissions.

                        </p>

                    </div>


                    <div className="bg-white rounded-2xl px-6 py-4 shadow">

                        <p className="text-sm text-slate-500">

                            Total Submissions

                        </p>

                        <p className="text-3xl font-black text-indigo-600">

                            {submissions.length}

                        </p>

                    </div>

                </div>


                {/* ======================================
                    Search
                ====================================== */}

                <div className="bg-white rounded-3xl shadow-lg p-5 mb-8">

                    <div className="relative">

                        <FaSearch
                            className="
                                absolute
                                left-4
                                top-1/2
                                -translate-y-1/2
                                text-slate-400
                            "
                        />

                        <input
                            type="text"
                            value={search}
                            onChange={(e) =>
                                setSearch(
                                    e.target.value
                                )
                            }
                            placeholder="Search student, assignment or status..."
                            className="
                                w-full
                                border
                                border-slate-200
                                rounded-2xl
                                py-4
                                pl-12
                                pr-5
                                outline-none
                                focus:ring-2
                                focus:ring-indigo-500
                            "
                        />

                    </div>

                </div>


                {/* ======================================
                    Table
                ====================================== */}

                {filteredSubmissions.length === 0 ? (

                    <div className="bg-white rounded-3xl shadow-lg p-12 text-center">

                        <FaClipboardList
                            className="mx-auto text-slate-300"
                            size={60}
                        />

                        <h2 className="text-2xl font-bold mt-5">

                            No submissions found

                        </h2>

                    </div>

                ) : (

                    <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

                        <div className="overflow-x-auto">

                            <table className="w-full">

                                <thead className="bg-slate-50 border-b">

                                    <tr>

                                        <th className="text-left px-6 py-5">
                                            Student
                                        </th>

                                        <th className="text-left px-6 py-5">
                                            Assignment
                                        </th>

                                        <th className="text-left px-6 py-5">
                                            Submitted
                                        </th>

                                        <th className="text-left px-6 py-5">
                                            Status
                                        </th>

                                        <th className="text-left px-6 py-5">
                                            Marks
                                        </th>

                                        <th className="text-left px-6 py-5">
                                            Actions
                                        </th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {filteredSubmissions.map(
                                        (submission) => (

                                            <tr
                                                key={
                                                    submission.id
                                                }
                                                className="
                                                    border-b
                                                    last:border-none
                                                    hover:bg-slate-50
                                                "
                                            >

                                                {/* Student */}

                                                <td className="px-6 py-5">

                                                    <div className="flex items-center gap-3">

                                                        <div className="
                                                            w-11
                                                            h-11
                                                            rounded-xl
                                                            bg-indigo-100
                                                            flex
                                                            items-center
                                                            justify-center
                                                        ">

                                                            <FaUserGraduate
                                                                className="text-indigo-600"
                                                            />

                                                        </div>

                                                        <div>

                                                            <p className="font-bold">

                                                                {
                                                                    submission.student_name ||
                                                                    "Unknown Student"
                                                                }

                                                            </p>

                                                            <p className="text-sm text-slate-500">

                                                                ID:{" "}

                                                                {
                                                                    submission.student_id
                                                                }

                                                            </p>

                                                        </div>

                                                    </div>

                                                </td>


                                                {/* Assignment */}

                                                <td className="px-6 py-5">

                                                    <div className="flex items-center gap-3">

                                                        <FaBook
                                                            className="text-indigo-500"
                                                        />

                                                        <span className="font-semibold">

                                                            {
                                                                submission.assignment_title ||
                                                                "Assignment"
                                                            }

                                                        </span>

                                                    </div>

                                                </td>


                                                {/* Date */}

                                                <td className="px-6 py-5 text-slate-600">

                                                    {submission.submitted_at
                                                        ? new Date(
                                                            submission.submitted_at
                                                        ).toLocaleDateString(
                                                            "en-IN"
                                                        )
                                                        : "—"
                                                    }

                                                </td>


                                                {/* Status */}

                                                <td className="px-6 py-5">

                                                    <span
                                                        className={`
                                                            px-4
                                                            py-2
                                                            rounded-full
                                                            text-sm
                                                            font-bold
                                                            ${
                                                                submission.status ===
                                                                "Reviewed"
                                                                    ? "bg-green-100 text-green-700"
                                                                    : "bg-orange-100 text-orange-700"
                                                            }
                                                        `}
                                                    >

                                                        {
                                                            submission.status ||
                                                            "Submitted"
                                                        }

                                                    </span>

                                                </td>


                                                {/* Marks */}

                                                <td className="px-6 py-5">

                                                    {submission.marks !==
                                                        null &&
                                                    submission.marks !==
                                                        undefined
                                                        ? (

                                                            <span className="
                                                                font-bold
                                                                text-green-600
                                                            ">

                                                                {
                                                                    submission.marks
                                                                }

                                                                {
                                                                    submission.total_marks
                                                                        ? ` / ${submission.total_marks}`
                                                                        : ""
                                                                }

                                                            </span>

                                                        )
                                                        : (

                                                            <span className="text-slate-400">

                                                                Pending

                                                            </span>

                                                        )}

                                                </td>


                                                {/* Actions */}

                                                <td className="px-6 py-5">

                                                    <div className="flex items-center gap-3">

                                                        {submission.submission_url && (

                                                            <a
                                                                href={
                                                                    submission.submission_url
                                                                }
                                                                target="_blank"
                                                                rel="noreferrer"
                                                                className="
                                                                    p-3
                                                                    rounded-xl
                                                                    bg-slate-100
                                                                    hover:bg-slate-200
                                                                    text-slate-700
                                                                "
                                                                title="Open Submission"
                                                            >

                                                                <FaExternalLinkAlt />

                                                            </a>

                                                        )}


                                                        <button
                                                            onClick={() =>
                                                                openReview(
                                                                    submission
                                                                )
                                                            }
                                                            className="
                                                                px-4
                                                                py-3
                                                                rounded-xl
                                                                bg-indigo-600
                                                                hover:bg-indigo-700
                                                                text-white
                                                                font-semibold
                                                                flex
                                                                items-center
                                                                gap-2
                                                            "
                                                        >

                                                            <FaEdit />

                                                            Review

                                                        </button>

                                                    </div>

                                                </td>

                                            </tr>

                                        )
                                    )}

                                </tbody>

                            </table>

                        </div>

                    </div>

                )}


            </div>


            {/* ======================================
                Review Modal
            ====================================== */}

            {selectedSubmission && (

                <div className="
                    fixed
                    inset-0
                    z-50
                    bg-black/50
                    backdrop-blur-sm
                    flex
                    items-center
                    justify-center
                    p-6
                ">

                    <div className="
                        bg-white
                        w-full
                        max-w-2xl
                        rounded-3xl
                        shadow-2xl
                    ">


                        {/* Header */}

                        <div className="
                            flex
                            justify-between
                            items-center
                            border-b
                            p-6
                        ">

                            <div>

                                <h2 className="text-2xl font-black">

                                    Review Submission

                                </h2>

                                <p className="text-slate-500 mt-1">

                                    {
                                        selectedSubmission.assignment_title
                                    }

                                </p>

                            </div>


                            <button
                                onClick={
                                    closeReview
                                }
                                className="
                                    text-xl
                                    text-slate-500
                                    hover:text-red-500
                                "
                            >

                                <FaTimes />

                            </button>

                        </div>


                        {/* Form */}

                        <form
                            onSubmit={
                                handleReview
                            }
                            className="
                                p-6
                                space-y-6
                            "
                        >


                            {/* Student */}

                            <div className="
                                bg-indigo-50
                                rounded-2xl
                                p-5
                            ">

                                <p className="
                                    text-sm
                                    text-indigo-600
                                ">

                                    Student

                                </p>

                                <p className="
                                    text-xl
                                    font-bold
                                    text-indigo-900
                                ">

                                    {
                                        selectedSubmission.student_name
                                    }

                                </p>

                            </div>


                            {/* Submission URL */}

                            {selectedSubmission.submission_url && (

                                <div>

                                    <label className="
                                        block
                                        font-semibold
                                        mb-2
                                    ">

                                        Student Submission

                                    </label>

                                    <a
                                        href={
                                            selectedSubmission.submission_url
                                        }
                                        target="_blank"
                                        rel="noreferrer"
                                        className="
                                            flex
                                            items-center
                                            justify-between
                                            border
                                            rounded-xl
                                            p-4
                                            text-indigo-600
                                            hover:bg-indigo-50
                                        "
                                    >

                                        <span className="truncate">

                                            {
                                                selectedSubmission.submission_url
                                            }

                                        </span>

                                        <FaExternalLinkAlt />

                                    </a>

                                </div>

                            )}


                            {/* Marks */}

                            <div>

                                <label className="
                                    block
                                    font-semibold
                                    mb-2
                                ">

                                    Marks

                                </label>

                                <input
                                    type="number"
                                    min="0"
                                    max={
                                        selectedSubmission.total_marks ||
                                        100
                                    }
                                    value={marks}
                                    onChange={(e) =>
                                        setMarks(
                                            e.target.value
                                        )
                                    }
                                    placeholder={`
                                        Enter marks out of ${
                                            selectedSubmission.total_marks ||
                                            100
                                        }
                                    `}
                                    className="
                                        w-full
                                        border
                                        border-slate-300
                                        rounded-xl
                                        px-4
                                        py-4
                                        outline-none
                                        focus:ring-2
                                        focus:ring-indigo-500
                                    "
                                />

                            </div>


                            {/* Feedback */}

                            <div>

                                <label className="
                                    block
                                    font-semibold
                                    mb-2
                                ">

                                    Feedback

                                </label>

                                <textarea
                                    value={feedback}
                                    onChange={(e) =>
                                        setFeedback(
                                            e.target.value
                                        )
                                    }
                                    rows="5"
                                    placeholder="Write feedback for the student..."
                                    className="
                                        w-full
                                        border
                                        border-slate-300
                                        rounded-xl
                                        px-4
                                        py-4
                                        outline-none
                                        focus:ring-2
                                        focus:ring-indigo-500
                                        resize-none
                                    "
                                />

                            </div>


                            {/* Buttons */}

                            <div className="
                                flex
                                justify-end
                                gap-4
                            ">

                                <button
                                    type="button"
                                    onClick={
                                        closeReview
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
                                    disabled={
                                        reviewLoading
                                    }
                                    className="
                                        px-6
                                        py-3
                                        rounded-xl
                                        bg-indigo-600
                                        hover:bg-indigo-700
                                        disabled:opacity-50
                                        text-white
                                        font-semibold
                                    "
                                >

                                    {
                                        reviewLoading
                                            ? "Saving..."
                                            : "Save Review"
                                    }

                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            )}

        </div>

    );

}


export default SubmissionManagement;