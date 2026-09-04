import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
    assignStudent,
    getBatchStudents,
} from "../../../services/batchService";

import {
    getStudents,
} from "../../../services/studentManagementService";

function AssignStudentModal({
    batch,
    close,
    refresh,
}) {

    const [students, setStudents] = useState([]);

    const [assignedStudents, setAssignedStudents] =
        useState([]);

    const [selectedStudent, setSelectedStudent] =
        useState("");

    const [loading, setLoading] =
        useState(true);

    const [assigning, setAssigning] =
        useState(false);

    // ======================================
    // Load Students
    // ======================================

    useEffect(() => {

        if (!batch) return;

        loadStudents();

    }, [batch]);

    const loadStudents = async () => {

        try {

            setLoading(true);

            const [
                studentResponse,
                batchStudentResponse,
            ] = await Promise.all([

                getStudents(),

                getBatchStudents(batch.id),

            ]);

            setStudents(
                studentResponse.students || []
            );

            setAssignedStudents(
                batchStudentResponse.students || []
            );

        } catch (err) {

            console.error(
                "LOAD BATCH STUDENTS ERROR:",
                err
            );

            toast.error(

                err?.response?.data?.message ||

                "Failed to load students."

            );

        } finally {

            setLoading(false);

        }

    };

    // ======================================
    // Assign Student
    // ======================================

    const handleAssign = async (e) => {

        e.preventDefault();

        if (!selectedStudent) {

            return toast.error(
                "Please select a student."
            );

        }

        // ======================================
        // Prevent Duplicate Assignment
        // ======================================

        const alreadyAssigned =
            assignedStudents.some(
                (student) =>
                    String(student.id) ===
                    String(selectedStudent)
            );

        if (alreadyAssigned) {

            return toast.error(
                "This student is already assigned to this batch."
            );

        }

        try {

            setAssigning(true);

            await assignStudent(

                batch.id,

                Number(selectedStudent)

            );

            toast.success(
                "Student assigned successfully."
            );

            setSelectedStudent("");

            await loadStudents();

            refresh();

        } catch (err) {

            console.error(
                "ASSIGN STUDENT ERROR:",
                err
            );

            toast.error(

                err?.response?.data?.message ||

                "Failed to assign student."

            );

        } finally {

            setAssigning(false);

        }

    };

    return (

        <div
            className="
                fixed
                inset-0
                bg-black/50
                backdrop-blur-sm
                flex
                items-center
                justify-center
                z-50
                p-6
            "
        >

            <div
                className="
                    bg-white
                    rounded-3xl
                    shadow-2xl
                    w-full
                    max-w-3xl
                    p-8
                    max-h-[95vh]
                    overflow-y-auto
                "
            >

                {/* ======================================
                    Header
                ====================================== */}

                <div
                    className="
                        flex
                        justify-between
                        items-start
                        mb-8
                    "
                >

                    <div>

                        <h2
                            className="
                                text-3xl
                                font-black
                                text-slate-800
                            "
                        >

                            Assign Students

                        </h2>

                        <p className="
                            text-slate-500
                            mt-2
                        ">

                            Assign students to:

                        </p>

                        <p className="
                            font-bold
                            text-cyan-600
                            mt-1
                        ">

                            {batch?.batch_name}

                        </p>

                    </div>

                    <button
                        type="button"
                        onClick={close}
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

                {/* ======================================
                    Assign Student Form
                ====================================== */}

                <form
                    onSubmit={handleAssign}
                    className="
                        bg-slate-50
                        rounded-2xl
                        p-5
                        mb-8
                    "
                >

                    <label className="
                        block
                        mb-2
                        font-semibold
                        text-slate-700
                    ">

                        Select Student

                    </label>

                    <div className="
                        flex
                        flex-col
                        sm:flex-row
                        gap-3
                    ">

                        <select
                            value={selectedStudent}
                            onChange={(e) =>
                                setSelectedStudent(
                                    e.target.value
                                )
                            }
                            disabled={
                                loading ||
                                assigning
                            }
                            className="
                                flex-1
                                rounded-xl
                                border
                                border-slate-300
                                px-4
                                py-3
                                outline-none
                                focus:ring-2
                                focus:ring-cyan-500
                                disabled:bg-slate-100
                            "
                        >

                            <option value="">

                                {loading
                                    ? "Loading students..."
                                    : "Select Student"
                                }

                            </option>

                            {students
                                .filter(
                                    (student) =>
                                        !assignedStudents.some(
                                            (assigned) =>
                                                String(
                                                    assigned.id
                                                ) ===
                                                String(
                                                    student.id
                                                )
                                        )
                                )
                                .map(
                                    (student) => (

                                        <option
                                            key={student.id}
                                            value={student.id}
                                        >

                                            {student.full_name}
                                            {" — "}
                                            {student.email}

                                        </option>

                                    )
                                )}

                        </select>

                        <button
                            type="submit"
                            disabled={
                                loading ||
                                assigning ||
                                !selectedStudent
                            }
                            className="
                                bg-cyan-600
                                hover:bg-cyan-700
                                text-white
                                px-6
                                py-3
                                rounded-xl
                                font-semibold
                                disabled:opacity-50
                            "
                        >

                            {assigning
                                ? "Assigning..."
                                : "Assign Student"
                            }

                        </button>

                    </div>

                </form>

                {/* ======================================
                    Assigned Students
                ====================================== */}

                <div>

                    <div className="
                        flex
                        justify-between
                        items-center
                        mb-4
                    ">

                        <h3 className="
                            text-xl
                            font-bold
                            text-slate-800
                        ">

                            Assigned Students

                        </h3>

                        <span className="
                            bg-cyan-100
                            text-cyan-700
                            px-3
                            py-1
                            rounded-full
                            font-semibold
                        ">

                            {assignedStudents.length}

                        </span>

                    </div>

                    {loading ? (

                        <div className="
                            py-10
                            text-center
                            text-slate-500
                        ">

                            Loading students...

                        </div>

                    ) : assignedStudents.length > 0 ? (

                        <div className="
                            border
                            border-slate-200
                            rounded-2xl
                            overflow-hidden
                        ">

                            {assignedStudents.map(
                                (student) => (

                                    <div
                                        key={student.id}
                                        className="
                                            flex
                                            items-center
                                            justify-between
                                            gap-4
                                            px-5
                                            py-4
                                            border-b
                                            last:border-b-0
                                            border-slate-100
                                        "
                                    >

                                        <div>

                                            <p className="
                                                font-semibold
                                                text-slate-800
                                            ">

                                                {
                                                    student.full_name
                                                }

                                            </p>

                                            <p className="
                                                text-sm
                                                text-slate-500
                                            ">

                                                {
                                                    student.email
                                                }

                                            </p>

                                        </div>

                                        <span className="
                                            text-sm
                                            font-semibold
                                            text-green-600
                                        ">

                                            Assigned

                                        </span>

                                    </div>

                                )
                            )}

                        </div>

                    ) : (

                        <div className="
                            py-10
                            text-center
                            bg-slate-50
                            rounded-2xl
                            text-slate-500
                        ">

                            No students assigned to this batch yet.

                        </div>

                    )}

                </div>

                {/* ======================================
                    Close
                ====================================== */}

                <div className="
                    flex
                    justify-end
                    mt-6
                ">

                    <button
                        type="button"
                        onClick={close}
                        className="
                            px-6
                            py-3
                            rounded-xl
                            bg-slate-200
                            hover:bg-slate-300
                            text-slate-700
                            font-semibold
                        "
                    >

                        Close

                    </button>

                </div>

            </div>

        </div>

    );

}

export default AssignStudentModal;