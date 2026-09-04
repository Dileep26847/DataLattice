import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Button from "../../components/common/Button";

import {
    getCourses,
} from "../../services/courseManagementService";

import {
    uploadAssignmentPDF,
} from "../../services/assignmentManagementService";

function AssignmentForm({
    form,
    handleChange,
    handleSubmit,
    loading,
    buttonText,
    close,
}) {

    const [courses, setCourses] = useState([]);

    const [uploading, setUploading] =
        useState(false);

    // ======================================
    // Load Courses
    // ======================================

    useEffect(() => {

        loadCourses();

    }, []);

    const loadCourses = async () => {

        try {

            const data =
                await getCourses();

            setCourses(
                data.courses || []
            );

        } catch (err) {

            console.error(
                "LOAD COURSES ERROR:",
                err
            );

            toast.error(
                "Failed to load courses"
            );

        }

    };

    // ======================================
    // Upload Assignment PDF
    // ======================================

    const handlePDFUpload = async (e) => {

        const file =
            e.target.files?.[0];

        if (!file) return;

        try {

            // Validate PDF

            if (
                file.type !== "application/pdf" &&
                !file.name.toLowerCase().endsWith(".pdf")
            ) {

                toast.error(
                    "Only PDF files are allowed."
                );

                e.target.value = "";

                return;

            }

            // 20 MB limit

            if (
                file.size >
                20 * 1024 * 1024
            ) {

                toast.error(
                    "PDF must be smaller than 20 MB."
                );

                e.target.value = "";

                return;

            }

            setUploading(true);

            const response =
                await uploadAssignmentPDF(file);

            handleChange({

                target: {

                    name: "attachment_url",

                    value: response.file,

                },

            });

            toast.success(
                "Assignment PDF uploaded successfully"
            );

        } catch (err) {

            console.error(
                "ASSIGNMENT PDF UPLOAD ERROR:",
                err
            );

            toast.error(

                err?.response?.data?.message ||

                err?.message ||

                "PDF upload failed"

            );

        } finally {

            setUploading(false);

            // Allow same file selection again

            e.target.value = "";

        }

    };

    // ======================================
    // PDF URL
    // ======================================

    const getPDFUrl = () => {

        if (!form.attachment_url) {
            return "";
        }

        if (
            form.attachment_url.startsWith(
                "http://"
            ) ||
            form.attachment_url.startsWith(
                "https://"
            )
        ) {

            return form.attachment_url;

        }

        return `http://localhost:5000/uploads/pdfs/${form.attachment_url}`;

    };

    return (

        <form
            onSubmit={handleSubmit}
            className="space-y-8"
        >

            {/* ======================================
                Course
            ====================================== */}

            <div>

                <label className="block mb-2 font-semibold">
                    Course
                </label>

                <select
                    name="course_id"
                    value={form.course_id}
                    onChange={handleChange}
                    required
                    className="w-full rounded-2xl border border-slate-300 px-5 py-4 outline-none focus:ring-2 focus:ring-cyan-500"
                >

                    <option value="">
                        Select Course
                    </option>

                    {courses.map((course) => (

                        <option
                            key={course.id}
                            value={course.id}
                        >

                            {course.title}

                        </option>

                    ))}

                </select>

            </div>

            {/* ======================================
                Assignment Title
            ====================================== */}

            <div>

                <label className="block mb-2 font-semibold">
                    Assignment Title
                </label>

                <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="React Project Assignment"
                    required
                    className="w-full rounded-2xl border border-slate-300 px-5 py-4 outline-none focus:ring-2 focus:ring-cyan-500"
                />

            </div>

            {/* ======================================
                Description
            ====================================== */}

            <div>

                <label className="block mb-2 font-semibold">
                    Description
                </label>

                <textarea
                    rows="6"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Describe the assignment requirements..."
                    className="w-full rounded-2xl border border-slate-300 px-5 py-4 resize-none outline-none focus:ring-2 focus:ring-cyan-500"
                />

            </div>

            {/* ======================================
                Due Date + Marks
            ====================================== */}

            <div className="grid lg:grid-cols-2 gap-6">

                {/* Due Date */}

                <div>

                    <label className="block mb-2 font-semibold">
                        Due Date
                    </label>

                    <input
                        type="datetime-local"
                        name="due_date"
                        value={form.due_date}
                        onChange={handleChange}
                        className="w-full rounded-2xl border border-slate-300 px-5 py-4 outline-none focus:ring-2 focus:ring-cyan-500"
                    />

                </div>

                {/* Total Marks */}

                <div>

                    <label className="block mb-2 font-semibold">
                        Total Marks
                    </label>

                    <input
                        type="number"
                        name="total_marks"
                        value={form.total_marks}
                        onChange={handleChange}
                        placeholder="100"
                        min="1"
                        required
                        className="w-full rounded-2xl border border-slate-300 px-5 py-4 outline-none focus:ring-2 focus:ring-cyan-500"
                    />

                </div>

            </div>

            {/* ======================================
                PDF Upload
            ====================================== */}

            <div>

                <label className="block mb-2 font-semibold">
                    Assignment PDF
                </label>

                <input
                    type="file"
                    accept=".pdf,application/pdf"
                    onChange={handlePDFUpload}
                    disabled={uploading}
                    className="w-full rounded-2xl border border-dashed border-cyan-300 p-5 cursor-pointer"
                />

                {uploading && (

                    <p className="mt-3 text-cyan-600 font-semibold">
                        Uploading PDF...
                    </p>

                )}

                {/* Uploaded PDF */}

                {form.attachment_url &&
                    !uploading && (

                        <div className="mt-4 bg-green-50 border border-green-200 rounded-2xl p-5">

                            <div className="flex items-center justify-between gap-4">

                                <div>

                                    <p className="text-green-700 font-semibold">

                                        ✓ PDF Attached

                                    </p>

                                    <p className="text-sm text-slate-500 mt-1 break-all">

                                        {form.attachment_url}

                                    </p>

                                </div>

                                <a
                                    href={getPDFUrl()}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="shrink-0 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl"
                                >

                                    View PDF

                                </a>

                            </div>

                        </div>

                    )}

            </div>

            {/* ======================================
                Buttons
            ====================================== */}

            <div className="flex justify-end gap-4 pt-4">

                <Button
                    type="button"
                    variant="secondary"
                    onClick={close}
                >

                    Cancel

                </Button>

                <Button
                    type="submit"
                    disabled={
                        loading ||
                        uploading
                    }
                >

                    {loading
                        ? "Saving..."
                        : uploading
                        ? "Uploading..."
                        : buttonText}

                </Button>

            </div>

        </form>

    );

}

export default AssignmentForm;