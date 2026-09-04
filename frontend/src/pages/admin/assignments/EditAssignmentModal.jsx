import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import AssignmentForm from "./AssignmentForm";

import {
    updateAssignment,
} from "../../services/assignmentManagementService";

function EditAssignmentModal({
    assignment,
    close,
    refresh,
}) {

    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        course_id: "",
        title: "",
        description: "",
        due_date: "",
        total_marks: "",
        attachment_url: "",
    });

    // ======================================
    // Load Assignment Data
    // ======================================

    useEffect(() => {

        if (!assignment) return;

        let dueDate = "";

        if (assignment.due_date) {

            const date = new Date(
                assignment.due_date
            );

            if (!isNaN(date.getTime())) {

                const pad = (value) =>
                    String(value).padStart(2, "0");

                dueDate =
                    `${date.getFullYear()}-${pad(
                        date.getMonth() + 1
                    )}-${pad(
                        date.getDate()
                    )}T${pad(
                        date.getHours()
                    )}:${pad(
                        date.getMinutes()
                    )}`;

            }

        }

        setForm({

            course_id:
                assignment.course_id || "",

            title:
                assignment.title || "",

            description:
                assignment.description || "",

            due_date:
                dueDate,

            total_marks:
                assignment.total_marks || "",

            attachment_url:
                assignment.attachment_url || "",

        });

    }, [assignment]);

    // ======================================
    // Handle Input Change
    // ======================================

    const handleChange = (e) => {

        setForm({

            ...form,

            [e.target.name]:
                e.target.value,

        });

    };

    // ======================================
    // Submit
    // ======================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (
            !form.course_id ||
            !form.title.trim() ||
            !form.total_marks
        ) {

            return toast.error(
                "Course, Assignment Title and Total Marks are required."
            );

        }

        if (
            Number(form.total_marks) <= 0
        ) {

            return toast.error(
                "Total marks must be greater than 0."
            );

        }

        try {

            setLoading(true);

            await updateAssignment(

                assignment.id,

                {

                    course_id:
                        Number(form.course_id),

                    title:
                        form.title.trim(),

                    description:
                        form.description.trim(),

                    due_date:
                        form.due_date || null,

                    total_marks:
                        Number(form.total_marks),

                    attachment_url:
                        form.attachment_url || null,

                }

            );

            toast.success(
                "Assignment Updated Successfully"
            );

            refresh();

            close();

        } catch (err) {

            console.error(
                "UPDATE ASSIGNMENT ERROR:",
                err
            );

            toast.error(

                err?.response?.data?.message ||

                "Failed to update assignment"

            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-6">

            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl p-8 max-h-[95vh] overflow-y-auto">

                {/* Header */}

                <div className="flex justify-between items-center mb-8">

                    <div>

                        <h2 className="text-3xl font-black text-slate-800">

                            Edit Assignment

                        </h2>

                        <p className="text-slate-500 mt-2">

                            Update assignment details.

                        </p>

                    </div>

                    <button
                        type="button"
                        onClick={close}
                        className="text-3xl font-bold text-slate-500 hover:text-red-500 transition"
                    >

                        ✕

                    </button>

                </div>

                {/* Form */}

                <AssignmentForm

                    form={form}

                    handleChange={handleChange}

                    handleSubmit={handleSubmit}

                    loading={loading}

                    buttonText="Update Assignment"

                    close={close}

                />

            </div>

        </div>

    );

}

export default EditAssignmentModal;