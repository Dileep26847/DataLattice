import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
    gradeSubmission,
} from "../../../services/assignmentSubmissionService";

function GradeSubmissionModal({
    submission,
    close,
    refresh,
}) {

    const [loading, setLoading] = useState(false);

    const [marks, setMarks] = useState("");

    const [feedback, setFeedback] = useState("");

    // ======================================
    // Load Existing Grade
    // ======================================

    useEffect(() => {

        if (!submission) return;

        setMarks(
            submission.marks !== null &&
            submission.marks !== undefined
                ? submission.marks
                : ""
        );

        setFeedback(
            submission.feedback || ""
        );

    }, [submission]);

    // ======================================
    // Submit Grade
    // ======================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (
            marks === "" ||
            marks === null ||
            marks === undefined
        ) {

            return toast.error(
                "Please enter marks."
            );

        }

        const numericMarks =
            Number(marks);

        const totalMarks =
            Number(
                submission.total_marks
            );

        // ======================================
        // Validate Marks
        // ======================================

        if (numericMarks < 0) {

            return toast.error(
                "Marks cannot be negative."
            );

        }

        if (
            totalMarks &&
            numericMarks > totalMarks
        ) {

            return toast.error(
                `Marks cannot exceed ${totalMarks}.`
            );

        }

        try {

            setLoading(true);

            await gradeSubmission(

                submission.id,

                {
                    marks: numericMarks,

                    feedback:
                        feedback.trim() ||
                        null,
                }

            );

            toast.success(
                "Submission graded successfully."
            );

            refresh();

            close();

        } catch (err) {

            console.error(
                "GRADE SUBMISSION ERROR:",
                err
            );

            toast.error(

                err?.response?.data?.message ||

                "Failed to grade submission."

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
                    max-w-2xl
                    p-8
                "
            >

                {/* ======================================
                    Header
                ====================================== */}

                <div className="flex justify-between items-start mb-8">

                    <div>

                        <h2 className="text-3xl font-black text-slate-800">

                            Grade Assignment

                        </h2>

                        <p className="text-slate-500 mt-2">

                            Review the student's submission
                            and provide marks and feedback.

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
                    Student Information
                ====================================== */}

                <div
                    className="
                        bg-slate-50
                        rounded-2xl
                        p-5
                        mb-6
                    "
                >

                    <div className="grid md:grid-cols-2 gap-4">

                        <div>

                            <p className="text-sm text-slate-500">

                                Student

                            </p>

                            <p className="font-bold text-slate-800">

                                {
                                    submission?.student_name ||
                                    "-"
                                }

                            </p>

                        </div>

                        <div>

                            <p className="text-sm text-slate-500">

                                Email

                            </p>

                            <p className="font-semibold text-slate-800">

                                {
                                    submission?.student_email ||
                                    "-"
                                }

                            </p>

                        </div>

                        <div>

                            <p className="text-sm text-slate-500">

                                Assignment

                            </p>

                            <p className="font-bold text-slate-800">

                                {
                                    submission?.assignment_title ||
                                    "-"
                                }

                            </p>

                        </div>

                        <div>

                            <p className="text-sm text-slate-500">

                                Course

                            </p>

                            <p className="font-semibold text-slate-800">

                                {
                                    submission?.course_title ||
                                    "-"
                                }

                            </p>

                        </div>

                    </div>

                </div>

                {/* ======================================
                    Form
                ====================================== */}

                <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                >

                    {/* Marks */}

                    <div>

                        <label className="block mb-2 font-semibold">

                            Marks

                        </label>

                        <div className="flex items-center gap-3">

                            <input
                                type="number"
                                min="0"
                                max={
                                    submission?.total_marks ||
                                    undefined
                                }
                                value={marks}
                                onChange={(e) =>
                                    setMarks(
                                        e.target.value
                                    )
                                }
                                placeholder="Enter marks"
                                className="
                                    flex-1
                                    rounded-2xl
                                    border
                                    border-slate-300
                                    px-5
                                    py-4
                                    outline-none
                                    focus:ring-2
                                    focus:ring-cyan-500
                                "
                                required
                            />

                            <span
                                className="
                                    text-lg
                                    font-bold
                                    text-slate-500
                                "
                            >

                                /

                                {" "}

                                {
                                    submission?.total_marks ||
                                    0
                                }

                            </span>

                        </div>

                    </div>

                    {/* Feedback */}

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
                            placeholder="Write feedback for the student..."
                            className="
                                w-full
                                rounded-2xl
                                border
                                border-slate-300
                                px-5
                                py-4
                                resize-none
                                outline-none
                                focus:ring-2
                                focus:ring-cyan-500
                            "
                        />

                    </div>

                    {/* Buttons */}

                    <div className="flex justify-end gap-4 pt-4">

                        <button
                            type="button"
                            onClick={close}
                            disabled={loading}
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

                            Cancel

                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="
                                px-6
                                py-3
                                rounded-xl
                                bg-cyan-600
                                hover:bg-cyan-700
                                text-white
                                font-semibold
                                disabled:opacity-50
                            "
                        >

                            {loading
                                ? "Saving..."
                                : "Save Grade"
                            }

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default GradeSubmissionModal;