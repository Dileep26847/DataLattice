import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Button from "../../components/common/Button";

import { getCourses } from "../../../services/courseManagementService";

function BatchForm({
    form,
    handleChange,
    handleSubmit,
    loading,
    buttonText,
    close,
}) {

    const [courses, setCourses] = useState([]);

    const [coursesLoading, setCoursesLoading] =
        useState(true);

    // ======================================
    // Load Courses
    // ======================================

    useEffect(() => {

        loadCourses();

    }, []);

    const loadCourses = async () => {

        try {

            setCoursesLoading(true);

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

        } finally {

            setCoursesLoading(false);

        }

    };

    return (

        <form
            onSubmit={handleSubmit}
            className="space-y-7"
        >

            {/* ======================================
                Batch Name
            ====================================== */}

            <div>

                <label className="
                    block
                    mb-2
                    font-semibold
                    text-slate-700
                ">

                    Batch Name

                </label>

                <input
                    type="text"
                    name="batch_name"
                    value={form.batch_name}
                    onChange={handleChange}
                    placeholder="MERN Full Stack Batch - 01"
                    className="
                        w-full
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

            </div>

            {/* ======================================
                Course + Mentor
            ====================================== */}

            <div className="
                grid
                lg:grid-cols-2
                gap-6
            ">

                {/* Course */}

                <div>

                    <label className="
                        block
                        mb-2
                        font-semibold
                        text-slate-700
                    ">

                        Course

                    </label>

                    <select
                        name="course_id"
                        value={form.course_id}
                        onChange={handleChange}
                        disabled={coursesLoading}
                        className="
                            w-full
                            rounded-2xl
                            border
                            border-slate-300
                            px-5
                            py-4
                            outline-none
                            focus:ring-2
                            focus:ring-cyan-500
                            disabled:bg-slate-100
                        "
                        required
                    >

                        <option value="">

                            {coursesLoading
                                ? "Loading courses..."
                                : "Select Course"
                            }

                        </option>

                        {courses.map(
                            (course) => (

                                <option
                                    key={course.id}
                                    value={course.id}
                                >

                                    {course.title}

                                </option>

                            )
                        )}

                    </select>

                </div>

                {/* Mentor */}

                <div>

                    <label className="
                        block
                        mb-2
                        font-semibold
                        text-slate-700
                    ">

                        Mentor Name

                    </label>

                    <input
                        type="text"
                        name="mentor_name"
                        value={form.mentor_name}
                        onChange={handleChange}
                        placeholder="Enter mentor name"
                        className="
                            w-full
                            rounded-2xl
                            border
                            border-slate-300
                            px-5
                            py-4
                            outline-none
                            focus:ring-2
                            focus:ring-cyan-500
                        "
                    />

                </div>

            </div>

            {/* ======================================
                Start Date + End Date
            ====================================== */}

            <div className="
                grid
                lg:grid-cols-2
                gap-6
            ">

                {/* Start Date */}

                <div>

                    <label className="
                        block
                        mb-2
                        font-semibold
                        text-slate-700
                    ">

                        Start Date

                    </label>

                    <input
                        type="date"
                        name="start_date"
                        value={form.start_date}
                        onChange={handleChange}
                        className="
                            w-full
                            rounded-2xl
                            border
                            border-slate-300
                            px-5
                            py-4
                            outline-none
                            focus:ring-2
                            focus:ring-cyan-500
                        "
                    />

                </div>

                {/* End Date */}

                <div>

                    <label className="
                        block
                        mb-2
                        font-semibold
                        text-slate-700
                    ">

                        End Date

                    </label>

                    <input
                        type="date"
                        name="end_date"
                        value={form.end_date}
                        onChange={handleChange}
                        min={form.start_date || undefined}
                        className="
                            w-full
                            rounded-2xl
                            border
                            border-slate-300
                            px-5
                            py-4
                            outline-none
                            focus:ring-2
                            focus:ring-cyan-500
                        "
                    />

                </div>

            </div>

            {/* ======================================
                Status
            ====================================== */}

            <div>

                <label className="
                    block
                    mb-2
                    font-semibold
                    text-slate-700
                ">

                    Status

                </label>

                <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    className="
                        w-full
                        rounded-2xl
                        border
                        border-slate-300
                        px-5
                        py-4
                        outline-none
                        focus:ring-2
                        focus:ring-cyan-500
                    "
                >

                    <option value="Upcoming">
                        Upcoming
                    </option>

                    <option value="Active">
                        Active
                    </option>

                    <option value="Completed">
                        Completed
                    </option>

                    <option value="Cancelled">
                        Cancelled
                    </option>

                </select>

            </div>

            {/* ======================================
                Buttons
            ====================================== */}

            <div className="
                flex
                justify-end
                gap-4
                pt-4
            ">

                <Button
                    type="button"
                    variant="secondary"
                    onClick={close}
                    disabled={loading}
                >

                    Cancel

                </Button>

                <Button
                    type="submit"
                    disabled={
                        loading ||
                        coursesLoading
                    }
                >

                    {loading
                        ? "Saving..."
                        : buttonText
                    }

                </Button>

            </div>

        </form>

    );

}

export default BatchForm;