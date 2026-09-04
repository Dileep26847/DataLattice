import { useState } from "react";
import toast from "react-hot-toast";

import AssignmentForm from "./AssignmentForm";

import {
    addAssignment,
} from "../../services/assignmentManagementService";

function AddAssignmentModal({
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
    // Handle Input Change
    // ======================================

    const handleChange = (e) => {

        setForm({

            ...form,

            [e.target.name]: e.target.value,

        });

    };

    // ======================================
    // Submit Assignment
    // ======================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        // Required fields

        if (
            !form.course_id ||
            !form.title.trim() ||
            !form.total_marks
        ) {

            return toast.error(
                "Course, Assignment Title and Total Marks are required."
            );

        }

        if (Number(form.total_marks) <= 0) {

            return toast.error(
                "Total marks must be greater than 0."
            );

        }

        try {

            setLoading(true);

            await addAssignment({

                course_id: Number(form.course_id),

                title: form.title.trim(),

                description:
                    form.description.trim(),

                due_date:
                    form.due_date || null,

                total_marks:
                    Number(form.total_marks),

                attachment_url:
                    form.attachment_url || null,

            });

            toast.success(
                "Assignment Created Successfully"
            );

            refresh();

            close();

        } catch (err) {

            console.error(
                "CREATE ASSIGNMENT ERROR:",
                err
            );

            toast.error(

                err?.response?.data?.message ||

                "Failed to create assignment"

            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-6">

            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl p-8 overflow-y-auto max-h-[95vh]">

                {/* Header */}

                <div className="flex justify-between items-center mb-8">

                    <div>

                        <h2 className="text-3xl font-black text-slate-800">

                            Add New Assignment

                        </h2>

                        <p className="text-slate-500 mt-2">

                            Create an assignment for a course.

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

                    buttonText="Create Assignment"

                    close={close}

                />

            </div>

        </div>

    );

}

export default AddAssignmentModal;