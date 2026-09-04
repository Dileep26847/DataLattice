import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
    FaPlus,
    FaSearch,
    FaEdit,
    FaTrash,
    FaUsers,
} from "react-icons/fa";

import {
    getBatches,
    deleteBatch,
} from "../../../services/batchService";

import AddBatchModal from "./AddBatchModal";
import EditBatchModal from "./EditBatchModal";
import AssignStudentModal from "./AssignStudentModal";

function BatchTable() {

    const [batches, setBatches] = useState([]);

    const [filteredBatches, setFilteredBatches] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [search, setSearch] =
        useState("");

    const [showAdd, setShowAdd] =
        useState(false);

    const [showEdit, setShowEdit] =
        useState(false);

    const [showAssign, setShowAssign] =
        useState(false);

    const [selectedBatch, setSelectedBatch] =
        useState(null);

    // ======================================
    // Load Batches
    // ======================================

    useEffect(() => {

        loadBatches();

    }, []);

    // ======================================
    // Search Batches
    // ======================================

    useEffect(() => {

        const keyword =
            search.toLowerCase().trim();

        if (!keyword) {

            setFilteredBatches(batches);

            return;

        }

        const filtered =
            batches.filter((batch) => {

                return (

                    batch.batch_name
                        ?.toLowerCase()
                        .includes(keyword)

                    ||

                    batch.course_title
                        ?.toLowerCase()
                        .includes(keyword)

                    ||

                    batch.mentor_name
                        ?.toLowerCase()
                        .includes(keyword)

                    ||

                    batch.status
                        ?.toLowerCase()
                        .includes(keyword)

                );

            });

        setFilteredBatches(filtered);

    }, [search, batches]);

    // ======================================
    // Get All Batches
    // ======================================

    const loadBatches = async () => {

        try {

            setLoading(true);

            const data =
                await getBatches();

            setBatches(
                data.batches || []
            );

            setFilteredBatches(
                data.batches || []
            );

        } catch (err) {

            console.error(
                "LOAD BATCHES ERROR:",
                err
            );

            toast.error(
                err?.response?.data?.message ||
                "Failed to load batches"
            );

        } finally {

            setLoading(false);

        }

    };

    // ======================================
    // Delete Batch
    // ======================================

    const handleDelete = async (id) => {

        const confirmed =
            window.confirm(
                "Are you sure you want to delete this batch?"
            );

        if (!confirmed) return;

        try {

            await deleteBatch(id);

            toast.success(
                "Batch deleted successfully"
            );

            loadBatches();

        } catch (err) {

            console.error(
                "DELETE BATCH ERROR:",
                err
            );

            toast.error(
                err?.response?.data?.message ||
                "Failed to delete batch"
            );

        }

    };

    // ======================================
    // Status Badge
    // ======================================

    const getStatusClass = (status) => {

        switch (
            status?.toLowerCase()
        ) {

            case "active":

                return "bg-green-100 text-green-700";

            case "completed":

                return "bg-blue-100 text-blue-700";

            case "upcoming":

                return "bg-yellow-100 text-yellow-700";

            case "cancelled":

                return "bg-red-100 text-red-700";

            default:

                return "bg-slate-100 text-slate-700";

        }

    };

    return (

        <div className="bg-white rounded-3xl shadow-lg p-6">

            {/* ======================================
                Header
            ====================================== */}

            <div className="
                flex
                flex-col
                lg:flex-row
                lg:items-center
                lg:justify-between
                gap-4
                mb-6
            ">

                <div>

                    <h2 className="text-2xl font-bold text-slate-800">

                        Batches

                    </h2>

                    <p className="text-slate-500 mt-1">

                        Manage courses, mentors and student batches.

                    </p>

                </div>

                <button
                    type="button"
                    onClick={() =>
                        setShowAdd(true)
                    }
                    className="
                        bg-cyan-600
                        hover:bg-cyan-700
                        text-white
                        px-6
                        py-3
                        rounded-xl
                        flex
                        items-center
                        justify-center
                        gap-3
                        font-semibold
                    "
                >

                    <FaPlus />

                    Add Batch

                </button>

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
                    placeholder="
                        Search batch, course, mentor...
                    "
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

                        Loading batches...

                    </p>

                </div>

            ) : (

                <div className="overflow-x-auto">

                    <table className="w-full">

                        {/* ======================================
                            Table Header
                        ====================================== */}

                        <thead>

                            <tr className="
                                border-b
                                border-slate-200
                            ">

                                <th className="
                                    text-left
                                    py-4
                                    px-3
                                ">
                                    Batch
                                </th>

                                <th className="
                                    text-left
                                    py-4
                                    px-3
                                ">
                                    Course
                                </th>

                                <th className="
                                    text-left
                                    py-4
                                    px-3
                                ">
                                    Mentor
                                </th>

                                <th className="
                                    text-center
                                    py-4
                                    px-3
                                ">
                                    Duration
                                </th>

                                <th className="
                                    text-center
                                    py-4
                                    px-3
                                ">
                                    Students
                                </th>

                                <th className="
                                    text-center
                                    py-4
                                    px-3
                                ">
                                    Status
                                </th>

                                <th className="
                                    text-center
                                    py-4
                                    px-3
                                ">
                                    Actions
                                </th>

                            </tr>

                        </thead>

                        {/* ======================================
                            Table Body
                        ====================================== */}

                        <tbody>

                            {filteredBatches.length > 0 ? (

                                filteredBatches.map(
                                    (batch) => (

                                        <tr
                                            key={batch.id}
                                            className="
                                                border-b
                                                border-slate-100
                                                hover:bg-slate-50
                                                transition
                                            "
                                        >

                                            {/* Batch */}

                                            <td className="
                                                py-5
                                                px-3
                                            ">

                                                <p className="
                                                    font-bold
                                                    text-slate-800
                                                ">

                                                    {
                                                        batch.batch_name
                                                    }

                                                </p>

                                                <p className="
                                                    text-sm
                                                    text-slate-500
                                                ">

                                                    Batch #
                                                    {batch.id}

                                                </p>

                                            </td>

                                            {/* Course */}

                                            <td className="
                                                py-5
                                                px-3
                                            ">

                                                {
                                                    batch.course_title ||
                                                    "-"
                                                }

                                            </td>

                                            {/* Mentor */}

                                            <td className="
                                                py-5
                                                px-3
                                            ">

                                                {
                                                    batch.mentor_name ||
                                                    "-"
                                                }

                                            </td>

                                            {/* Duration */}

                                            <td className="
                                                py-5
                                                px-3
                                                text-center
                                            ">

                                                <div>

                                                    <p className="text-sm">

                                                        {
                                                            batch.start_date
                                                                ? new Date(
                                                                    batch.start_date
                                                                ).toLocaleDateString()
                                                                : "-"
                                                        }

                                                    </p>

                                                    <p className="
                                                        text-xs
                                                        text-slate-400
                                                        my-1
                                                    ">

                                                        to

                                                    </p>

                                                    <p className="text-sm">

                                                        {
                                                            batch.end_date
                                                                ? new Date(
                                                                    batch.end_date
                                                                ).toLocaleDateString()
                                                                : "-"
                                                        }

                                                    </p>

                                                </div>

                                            </td>

                                            {/* Students */}

                                            <td className="
                                                py-5
                                                px-3
                                                text-center
                                            ">

                                                <div className="
                                                    inline-flex
                                                    items-center
                                                    gap-2
                                                    font-semibold
                                                ">

                                                    <FaUsers
                                                        className="
                                                            text-cyan-600
                                                        "
                                                    />

                                                    {
                                                        batch.total_students ??
                                                        0
                                                    }

                                                </div>

                                            </td>

                                            {/* Status */}

                                            <td className="
                                                py-5
                                                px-3
                                                text-center
                                            ">

                                                <span
                                                    className={`
                                                        inline-flex
                                                        px-3
                                                        py-1
                                                        rounded-full
                                                        text-sm
                                                        font-semibold
                                                        ${getStatusClass(
                                                            batch.status
                                                        )}
                                                    `}
                                                >

                                                    {
                                                        batch.status ||
                                                        "Upcoming"
                                                    }

                                                </span>

                                            </td>

                                            {/* Actions */}

                                            <td className="
                                                py-5
                                                px-3
                                            ">

                                                <div className="
                                                    flex
                                                    justify-center
                                                    gap-2
                                                ">

                                                    {/* Edit */}

                                                    <button
                                                        type="button"
                                                        onClick={() => {

                                                            setSelectedBatch(
                                                                batch
                                                            );

                                                            setShowEdit(
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
                                                        title="Edit Batch"
                                                    >

                                                        <FaEdit />

                                                    </button>

                                                    {/* Assign Student */}

                                                    <button
                                                        type="button"
                                                        onClick={() => {

                                                            setSelectedBatch(
                                                                batch
                                                            );

                                                            setShowAssign(
                                                                true
                                                            );

                                                        }}
                                                        className="
                                                            bg-cyan-600
                                                            hover:bg-cyan-700
                                                            text-white
                                                            p-3
                                                            rounded-xl
                                                        "
                                                        title="Assign Student"
                                                    >

                                                        <FaUsers />

                                                    </button>

                                                    {/* Delete */}

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handleDelete(
                                                                batch.id
                                                            )
                                                        }
                                                        className="
                                                            bg-red-600
                                                            hover:bg-red-700
                                                            text-white
                                                            p-3
                                                            rounded-xl
                                                        "
                                                        title="Delete Batch"
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

                                        No batches found.

                                    </td>

                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>

            )}

            {/* ======================================
                Add Batch Modal
            ====================================== */}

            {showAdd && (

                <AddBatchModal

                    close={() =>
                        setShowAdd(false)
                    }

                    refresh={
                        loadBatches
                    }

                />

            )}

            {/* ======================================
                Edit Batch Modal
            ====================================== */}

            {showEdit && (

                <EditBatchModal

                    batch={
                        selectedBatch
                    }

                    close={() =>
                        setShowEdit(false)
                    }

                    refresh={
                        loadBatches
                    }

                />

            )}

            {/* ======================================
                Assign Student Modal
            ====================================== */}

            {showAssign && (

                <AssignStudentModal

                    batch={
                        selectedBatch
                    }

                    close={() =>
                        setShowAssign(false)
                    }

                    refresh={
                        loadBatches
                    }

                />

            )}

        </div>

    );

}

export default BatchTable;