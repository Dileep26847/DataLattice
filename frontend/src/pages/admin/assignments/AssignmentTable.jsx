import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
    FaSearch,
    FaPlus,
    FaEdit,
    FaTrash,
    FaFilePdf,
} from "react-icons/fa";

import {
    getAssignments,
    deleteAssignment,
} from "../../services/assignmentManagementService";

import AddAssignmentModal from "./AddAssignmentModal";
import EditAssignmentModal from "./EditAssignmentModal";

function AssignmentTable() {

    const [assignments, setAssignments] = useState([]);
    const [filteredAssignments, setFilteredAssignments] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);

    const [selectedAssignment, setSelectedAssignment] =
        useState(null);

    // ======================================
    // Load Assignments
    // ======================================

    useEffect(() => {

        loadAssignments();

    }, []);

    // ======================================
    // Search
    // ======================================

    useEffect(() => {

        const keyword =
            search.trim().toLowerCase();

        if (!keyword) {

            setFilteredAssignments(assignments);

            return;

        }

        const filtered =
            assignments.filter((assignment) => {

                return (

                    assignment.title
                        ?.toLowerCase()
                        .includes(keyword)

                    ||

                    assignment.course_title
                        ?.toLowerCase()
                        .includes(keyword)

                    ||

                    assignment.description
                        ?.toLowerCase()
                        .includes(keyword)

                );

            });

        setFilteredAssignments(filtered);

    }, [search, assignments]);

    // ======================================
    // Get All Assignments
    // ======================================

    const loadAssignments = async () => {

        try {

            setLoading(true);

            const data =
                await getAssignments();

            setAssignments(
                data.assignments || []
            );

            setFilteredAssignments(
                data.assignments || []
            );

        } catch (err) {

            console.error(
                "LOAD ASSIGNMENTS ERROR:",
                err
            );

            toast.error(
                err?.response?.data?.message ||
                "Failed to load assignments"
            );

        } finally {

            setLoading(false);

        }

    };

    // ======================================
    // Delete Assignment
    // ======================================

    const handleDelete = async (id) => {

        const confirmed =
            window.confirm(
                "Are you sure you want to delete this assignment?"
            );

        if (!confirmed) return;

        try {

            await deleteAssignment(id);

            toast.success(
                "Assignment deleted successfully"
            );

            loadAssignments();

        } catch (err) {

            console.error(
                "DELETE ASSIGNMENT ERROR:",
                err
            );

            toast.error(
                err?.response?.data?.message ||
                "Failed to delete assignment"
            );

        }

    };

    // ======================================
    // Format Date
    // ======================================

    const formatDate = (date) => {

        if (!date) return "No due date";

        const parsedDate =
            new Date(date);

        if (Number.isNaN(parsedDate.getTime())) {
            return "Invalid date";
        }

        return parsedDate.toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric",
            }
        );

    };

    return (

        <>

            {/* ======================================
                Header
            ====================================== */}

            <div className="bg-white rounded-3xl shadow-lg p-6">

                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">

                    <div>

                        <h2 className="text-2xl font-black text-slate-800">
                            Assignments
                        </h2>

                        <p className="text-slate-500 mt-1">
                            Manage assignments for your LMS courses.
                        </p>

                    </div>

                    <button
                        type="button"
                        onClick={() => setShowAdd(true)}
                        className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-xl flex items-center justify-center gap-3 transition"
                    >

                        <FaPlus />

                        Add Assignment

                    </button>

                </div>

                {/* ======================================
                    Search
                ====================================== */}

                <div className="relative mb-8">

                    <FaSearch
                        className="absolute left-4 top-4 text-slate-400"
                    />

                    <input
                        type="text"
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                        placeholder="Search assignments or courses..."
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:ring-2 focus:ring-cyan-500"
                    />

                </div>

                {/* ======================================
                    Loading
                ====================================== */}

                {loading ? (

                    <div className="py-20 text-center">

                        <p className="text-lg text-slate-500">
                            Loading assignments...
                        </p>

                    </div>

                ) : (

                    <div className="overflow-x-auto">

                        <table className="w-full min-w-[900px]">

                            <thead>

                                <tr className="border-b border-slate-200 bg-slate-50">

                                    <th className="text-left p-4">
                                        Assignment
                                    </th>

                                    <th className="text-left p-4">
                                        Course
                                    </th>

                                    <th className="text-left p-4">
                                        Due Date
                                    </th>

                                    <th className="text-center p-4">
                                        Marks
                                    </th>

                                    <th className="text-center p-4">
                                        Resource
                                    </th>

                                    <th className="text-center p-4">
                                        Actions
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {filteredAssignments.length > 0 ? (

                                    filteredAssignments.map(
                                        (assignment) => (

                                            <tr
                                                key={assignment.id}
                                                className="border-b border-slate-100 hover:bg-slate-50 transition"
                                            >

                                                {/* Assignment */}

                                                <td className="p-4">

                                                    <div>

                                                        <h3 className="font-bold text-slate-800">

                                                            {assignment.title}

                                                        </h3>

                                                        {assignment.description && (

                                                            <p className="text-sm text-slate-500 mt-1 max-w-md line-clamp-2">

                                                                {assignment.description}

                                                            </p>

                                                        )}

                                                    </div>

                                                </td>

                                                {/* Course */}

                                                <td className="p-4">

                                                    <span className="font-medium text-slate-700">

                                                        {assignment.course_title ||
                                                            "Unknown Course"}

                                                    </span>

                                                </td>

                                                {/* Due Date */}

                                                <td className="p-4">

                                                    <span className="text-slate-600">

                                                        {formatDate(
                                                            assignment.due_date
                                                        )}

                                                    </span>

                                                </td>

                                                {/* Marks */}

                                                <td className="p-4 text-center">

                                                    <span className="inline-flex px-3 py-1 rounded-full bg-cyan-100 text-cyan-700 font-semibold">

                                                        {assignment.total_marks ??
                                                            0}

                                                    </span>

                                                </td>

                                                {/* Resource */}

                                                <td className="p-4">

                                                    <div className="flex justify-center">

                                                        {assignment.attachment_url ? (

                                                            <a
                                                                href={
                                                                    assignment.attachment_url.startsWith(
                                                                        "http"
                                                                    )
                                                                        ? assignment.attachment_url
                                                                        : `http://localhost:5000/uploads/pdfs/${assignment.attachment_url}`
                                                                }
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-red-600 hover:text-red-700 text-xl"
                                                                title="Open attachment"
                                                            >

                                                                <FaFilePdf />

                                                            </a>

                                                        ) : (

                                                            <span className="text-slate-400 text-sm">

                                                                No File

                                                            </span>

                                                        )}

                                                    </div>

                                                </td>

                                                {/* Actions */}

                                                <td className="p-4">

                                                    <div className="flex justify-center gap-3">

                                                        <button
                                                            type="button"
                                                            onClick={() => {

                                                                setSelectedAssignment(
                                                                    assignment
                                                                );

                                                                setShowEdit(
                                                                    true
                                                                );

                                                            }}
                                                            className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-xl transition"
                                                            title="Edit Assignment"
                                                        >

                                                            <FaEdit />

                                                        </button>

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleDelete(
                                                                    assignment.id
                                                                )
                                                            }
                                                            className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-xl transition"
                                                            title="Delete Assignment"
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
                                            colSpan="6"
                                            className="py-20 text-center text-slate-500"
                                        >

                                            No Assignments Found

                                        </td>

                                    </tr>

                                )}

                            </tbody>

                        </table>

                    </div>

                )}

            </div>

            {/* ======================================
                Add Assignment
            ====================================== */}

            {showAdd && (

                <AddAssignmentModal
                    close={() =>
                        setShowAdd(false)
                    }
                    refresh={loadAssignments}
                />

            )}

            {/* ======================================
                Edit Assignment
            ====================================== */}

            {showEdit && (

                <EditAssignmentModal
                    assignment={
                        selectedAssignment
                    }
                    close={() =>
                        setShowEdit(false)
                    }
                    refresh={loadAssignments}
                />

            )}

        </>

    );

}

export default AssignmentTable;