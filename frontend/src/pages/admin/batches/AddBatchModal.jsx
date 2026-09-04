import { useState } from "react";
import toast from "react-hot-toast";

import BatchForm from "./BatchForm";

import {
    createBatch,
} from "../../../services/batchService";

function AddBatchModal({
    close,
    refresh,
}) {

    const [loading, setLoading] =
        useState(false);

    const [form, setForm] = useState({

        batch_name: "",

        course_id: "",

        mentor_name: "",

        start_date: "",

        end_date: "",

        status: "Upcoming",

    });

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
    // Submit Batch
    // ======================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        // ======================================
        // Required Fields
        // ======================================

        if (
            !form.batch_name.trim() ||
            !form.course_id
        ) {

            return toast.error(
                "Batch Name and Course are required."
            );

        }

        // ======================================
        // Date Validation
        // ======================================

        if (
            form.start_date &&
            form.end_date &&
            form.end_date < form.start_date
        ) {

            return toast.error(
                "End date cannot be before start date."
            );

        }

        try {

            setLoading(true);

            await createBatch({

                batch_name:
                    form.batch_name.trim(),

                course_id:
                    Number(form.course_id),

                mentor_name:
                    form.mentor_name.trim() ||
                    null,

                start_date:
                    form.start_date ||
                    null,

                end_date:
                    form.end_date ||
                    null,

                status:
                    form.status ||
                    "Upcoming",

            });

            toast.success(
                "Batch created successfully."
            );

            refresh();

            close();

        } catch (err) {

            console.error(
                "CREATE BATCH ERROR:",
                err
            );

            toast.error(

                err?.response?.data?.message ||

                "Failed to create batch."

            );

        } finally {

            setLoading(false);

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
                    max-w-4xl
                    p-8
                    overflow-y-auto
                    max-h-[95vh]
                "
            >

                {/* ======================================
                    Header
                ====================================== */}

                <div
                    className="
                        flex
                        justify-between
                        items-center
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

                            Add New Batch

                        </h2>

                        <p
                            className="
                                text-slate-500
                                mt-2
                            "
                        >

                            Create a new batch for an LMS course.

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
                            transition
                        "
                    >

                        ✕

                    </button>

                </div>

                {/* ======================================
                    Batch Form
                ====================================== */}

                <BatchForm

                    form={form}

                    handleChange={handleChange}

                    handleSubmit={handleSubmit}

                    loading={loading}

                    buttonText="Create Batch"

                    close={close}

                />

            </div>

        </div>

    );

}

export default AddBatchModal;