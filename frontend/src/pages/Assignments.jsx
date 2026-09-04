import {
    useEffect,
    useState,
} from "react";

import { motion } from "framer-motion";

import {
    FaClipboardCheck,
    FaClock,
    FaBookOpen,
    FaExternalLinkAlt,
    FaUpload,
    FaCheckCircle,
    FaHourglassHalf,
} from "react-icons/fa";

import { getMyCourses } from "../services/studentDashboardService";

import {
    getCourseAssignments,
    submitAssignment,
    getMySubmission,
} from "../services/studentAssignmentService";


// ============================================================
// STUDENT ASSIGNMENTS PAGE
// ============================================================

function Assignments() {

    // ========================================================
    // LOGGED-IN USER
    // ========================================================

    const getStoredUser = () => {

        try {

            return (
                JSON.parse(
                    localStorage.getItem("user")
                ) || null
            );

        } catch (error) {

            console.error(
                "Failed to read logged-in user:",
                error
            );

            return null;

        }

    };


    const user =
        getStoredUser();


    // ========================================================
    // STATE
    // ========================================================

    const [
        assignments,
        setAssignments,
    ] = useState([]);


    const [
        loading,
        setLoading,
    ] = useState(true);


    const [
        submitting,
        setSubmitting,
    ] = useState(null);


    const [
        submissionUrls,
        setSubmissionUrls,
    ] = useState({});


    const [
        message,
        setMessage,
    ] = useState("");


    const [
        messageType,
        setMessageType,
    ] = useState("info");


    // ========================================================
    // LOAD ASSIGNMENTS
    // ========================================================

    useEffect(() => {

        if (user?.id) {

            loadAssignments();

        } else {

            setLoading(false);

            setMessage(
                "Please log in to view your assignments."
            );

            setMessageType("error");

        }

    }, []);


    // ========================================================
    // LOAD STUDENT ASSIGNMENTS
    // ========================================================

    const loadAssignments = async () => {

        try {

            setLoading(true);

            setMessage("");


            // ------------------------------------------------
            // Get enrolled courses
            // ------------------------------------------------

            const courseData =
                await getMyCourses(
                    user.id
                );


            const courses =
                Array.isArray(
                    courseData?.courses
                )
                    ? courseData.courses
                    : [];


            // ------------------------------------------------
            // No courses
            // ------------------------------------------------

            if (
                courses.length === 0
            ) {

                setAssignments([]);

                return;

            }


            // ------------------------------------------------
            // Get assignments from
            // every enrolled course
            // ------------------------------------------------

            const assignmentRequests =
                courses.map(
                    async (course) => {

                        const courseId =
                            course.course_id ||
                            course.id;


                        if (!courseId) {

                            return [];

                        }


                        try {

                            const data =
                                await getCourseAssignments(
                                    courseId
                                );


                            const courseAssignments =
                                Array.isArray(
                                    data?.assignments
                                )
                                    ? data.assignments
                                    : [];


                            return courseAssignments.map(
                                (assignment) => ({

                                    ...assignment,

                                    course_title:
                                        course.title,

                                })
                            );

                        } catch (error) {

                            // ------------------------------------------------
                            // A student should normally have access here.
                            // If one course fails, don't break all courses.
                            // ------------------------------------------------

                            console.error(
                                `Failed to load assignments for course ${courseId}:`,
                                error
                            );

                            return [];

                        }

                    }
                );


            const results =
                await Promise.all(
                    assignmentRequests
                );


            const allAssignments =
                results.flat();


            // ------------------------------------------------
            // Sort by due date
            // ------------------------------------------------

            allAssignments.sort(
                (a, b) => {

                    if (!a.due_date) {

                        return 1;

                    }

                    if (!b.due_date) {

                        return -1;

                    }

                    return (
                        new Date(
                            a.due_date
                        ) -
                        new Date(
                            b.due_date
                        )
                    );

                }
            );


            // ------------------------------------------------
            // Get submission status
            // ------------------------------------------------

            const assignmentsWithSubmissions =
                await Promise.all(

                    allAssignments.map(
                        async (
                            assignment
                        ) => {

                            try {

                                const data =
                                    await getMySubmission(
                                        assignment.id
                                    );


                                return {

                                    ...assignment,

                                    submission:
                                        data?.submission ||
                                        null,

                                    submitted:
                                        Boolean(
                                            data?.submitted
                                        ),

                                };

                            } catch (error) {

                                console.error(
                                    `Failed to check submission for assignment ${assignment.id}:`,
                                    error
                                );


                                return {

                                    ...assignment,

                                    submission: null,

                                    submitted: false,

                                };

                            }

                        }
                    )

                );


            setAssignments(
                assignmentsWithSubmissions
            );

        } catch (error) {

            console.error(
                "Assignments Error:",
                error
            );


            setAssignments([]);


            setMessage(
                error?.response?.data?.message ||
                error?.message ||
                "Failed to load assignments."
            );


            setMessageType(
                "error"
            );

        } finally {

            setLoading(false);

        }

    };


    // ========================================================
    // FORMAT DATE
    // ========================================================

    const formatDate = (
        date
    ) => {

        if (!date) {

            return "No due date";

        }


        const parsedDate =
            new Date(date);


        if (
            Number.isNaN(
                parsedDate.getTime()
            )
        ) {

            return date;

        }


        return parsedDate.toLocaleDateString(
            "en-IN",
            {
                day: "numeric",
                month: "short",
                year: "numeric",
            }
        );

    };


    // ========================================================
    // CHECK IF ASSIGNMENT IS OVERDUE
    // ========================================================

    const isOverdue = (
        assignment
    ) => {

        if (
            !assignment?.due_date
        ) {

            return false;

        }


        if (
            assignment?.submitted ||
            assignment?.submission
        ) {

            return false;

        }


        const dueDate =
            new Date(
                assignment.due_date
            );


        if (
            Number.isNaN(
                dueDate.getTime()
            )
        ) {

            return false;

        }


        return (
            dueDate.getTime() <
            Date.now()
        );

    };


    // ========================================================
    // HANDLE URL CHANGE
    // ========================================================

    const handleUrlChange = (
        assignmentId,
        value
    ) => {

        setSubmissionUrls(
            (previous) => ({

                ...previous,

                [assignmentId]:
                    value,

            })
        );

    };


    // ========================================================
    // SUBMIT ASSIGNMENT
    // ========================================================

    const handleSubmit = async (
        assignmentId
    ) => {

        const submissionUrl =
            submissionUrls[
                assignmentId
            ];


        if (
            !submissionUrl ||
            !submissionUrl.trim()
        ) {

            setMessage(
                "Please enter your submission URL."
            );

            setMessageType(
                "error"
            );

            return;

        }


        // ----------------------------------------------------
        // Basic URL validation
        // ----------------------------------------------------

        try {

            new URL(
                submissionUrl.trim()
            );

        } catch {

            setMessage(
                "Please enter a valid URL."
            );

            setMessageType(
                "error"
            );

            return;

        }


        try {

            setSubmitting(
                assignmentId
            );


            setMessage("");


            await submitAssignment({

                assignment_id:
                    assignmentId,

                submission_url:
                    submissionUrl.trim(),

            });


            setMessage(
                "Assignment submitted successfully! 🎉"
            );


            setMessageType(
                "success"
            );


            // ------------------------------------------------
            // Clear input
            // ------------------------------------------------

            setSubmissionUrls(
                (previous) => ({

                    ...previous,

                    [assignmentId]:
                        "",

                })
            );


            // ------------------------------------------------
            // Refresh assignments
            // ------------------------------------------------

            await loadAssignments();

        } catch (error) {

            console.error(
                "Submission Error:",
                error
            );


            setMessage(
                error?.response?.data?.message ||
                error?.message ||
                "Failed to submit assignment."
            );


            setMessageType(
                "error"
            );

        } finally {

            setSubmitting(
                null
            );

        }

    };


    // ========================================================
    // LOADING
    // ========================================================

    if (loading) {

        return (

            <div className="
                min-h-screen
                bg-slate-100
                p-6
                md:p-8
            ">

                <div className="
                    max-w-6xl
                    mx-auto
                ">

                    <div className="
                        bg-white
                        rounded-3xl
                        shadow-xl
                        p-10
                    ">

                        <div className="
                            animate-pulse
                        ">

                            <div className="
                                h-8
                                bg-slate-200
                                rounded
                                w-1/3
                            " />

                            <div className="
                                h-4
                                bg-slate-200
                                rounded
                                w-1/2
                                mt-4
                            " />


                            <div className="
                                space-y-5
                                mt-10
                            ">

                                {[1, 2].map(
                                    (item) => (

                                        <div
                                            key={item}
                                            className="
                                                border
                                                border-slate-200
                                                rounded-3xl
                                                p-7
                                            "
                                        >

                                            <div className="
                                                h-6
                                                bg-slate-200
                                                rounded
                                                w-1/2
                                            " />

                                            <div className="
                                                h-4
                                                bg-slate-200
                                                rounded
                                                w-3/4
                                                mt-5
                                            " />

                                            <div className="
                                                h-12
                                                bg-slate-200
                                                rounded-2xl
                                                mt-7
                                            " />

                                        </div>

                                    )
                                )}

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        );

    }


    // ========================================================
    // EMPTY STATE
    // ========================================================

    if (
        assignments.length === 0
    ) {

        return (

            <div className="
                min-h-screen
                bg-slate-100
                p-6
                md:p-8
            ">

                <div className="
                    max-w-6xl
                    mx-auto
                ">

                    <div className="
                        mb-10
                    ">

                        <div className="
                            flex
                            items-center
                            gap-4
                        ">

                            <div className="
                                w-16
                                h-16
                                rounded-2xl
                                bg-indigo-100
                                flex
                                items-center
                                justify-center
                            ">

                                <FaClipboardCheck
                                    className="
                                        text-indigo-600
                                    "
                                    size={30}
                                />

                            </div>


                            <div>

                                <p className="
                                    text-indigo-600
                                    font-semibold
                                ">

                                    Academic Tasks

                                </p>


                                <h1 className="
                                    text-4xl
                                    font-black
                                    text-slate-800
                                ">

                                    My Assignments

                                </h1>

                            </div>

                        </div>

                    </div>


                    {message && (

                        <Message
                            message={message}
                            type={messageType}
                        />

                    )}


                    <div className="
                        bg-white
                        rounded-3xl
                        shadow-xl
                        p-12
                        text-center
                    ">

                        <FaClipboardCheck
                            className="
                                mx-auto
                                text-indigo-500
                            "
                            size={60}
                        />


                        <h2 className="
                            text-3xl
                            font-black
                            mt-6
                        ">

                            No Assignments

                        </h2>


                        <p className="
                            text-slate-500
                            mt-3
                            max-w-xl
                            mx-auto
                        ">

                            You don't have any assignments
                            from your enrolled courses yet.

                        </p>

                    </div>

                </div>

            </div>

        );

    }


    // ========================================================
    // PAGE
    // ========================================================

    return (

        <div className="
            min-h-screen
            bg-slate-100
            p-6
            md:p-8
        ">

            <div className="
                max-w-6xl
                mx-auto
            ">

                {/* ====================================================
                    HEADER
                ==================================================== */}

                <div className="
                    mb-10
                ">

                    <div className="
                        flex
                        items-center
                        gap-4
                    ">

                        <div className="
                            w-16
                            h-16
                            rounded-2xl
                            bg-indigo-100
                            flex
                            items-center
                            justify-center
                        ">

                            <FaClipboardCheck
                                className="
                                    text-indigo-600
                                "
                                size={30}
                            />

                        </div>


                        <div>

                            <p className="
                                text-indigo-600
                                font-semibold
                            ">

                                Academic Tasks

                            </p>


                            <h1 className="
                                text-4xl
                                font-black
                                text-slate-800
                            ">

                                My Assignments

                            </h1>

                        </div>

                    </div>


                    <p className="
                        text-slate-500
                        mt-4
                        text-lg
                    ">

                        View, submit and track your
                        course assignments.

                    </p>

                </div>


                {/* ====================================================
                    MESSAGE
                ==================================================== */}

                {message && (

                    <Message
                        message={message}
                        type={messageType}
                    />

                )}


                {/* ====================================================
                    ASSIGNMENTS
                ==================================================== */}

                <div className="
                    space-y-8
                ">

                    {assignments.map(
                        (
                            assignment
                        ) => {

                            const submitted =
                                Boolean(
                                    assignment.submitted ||
                                    assignment.submission
                                );


                            const overdue =
                                isOverdue(
                                    assignment
                                );


                            return (

                                <motion.div
                                    key={
                                        assignment.id
                                    }

                                    initial={{
                                        opacity: 0,
                                        y: 20,
                                    }}

                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                    }}

                                    whileHover={{
                                        y: -4,
                                    }}

                                    transition={{
                                        duration: 0.2,
                                    }}

                                    className="
                                        bg-white
                                        rounded-3xl
                                        shadow-xl
                                        border
                                        border-slate-100
                                        p-7
                                        md:p-9
                                    "
                                >

                                    {/* ==================================
                                        ASSIGNMENT HEADER
                                    ================================== */}

                                    <div className="
                                        flex
                                        flex-col
                                        lg:flex-row
                                        lg:justify-between
                                        gap-6
                                    ">

                                        <div className="
                                            flex-1
                                        ">

                                            <div className="
                                                flex
                                                items-center
                                                gap-3
                                            ">

                                                <FaBookOpen
                                                    className="
                                                        text-indigo-600
                                                    "
                                                />


                                                <span className="
                                                    text-indigo-600
                                                    font-semibold
                                                ">

                                                    {assignment.course_title ||
                                                        "Course"}

                                                </span>

                                            </div>


                                            <h2 className="
                                                text-3xl
                                                font-black
                                                text-slate-800
                                                mt-3
                                            ">

                                                {assignment.title}

                                            </h2>


                                            <p className="
                                                text-slate-500
                                                mt-4
                                                text-lg
                                                leading-7
                                            ">

                                                {assignment.description ||
                                                    "Complete this assignment and submit your work."}

                                            </p>

                                        </div>


                                        {/* ==================================
                                            STATUS
                                        ================================== */}

                                        <div>

                                            {submitted ? (

                                                <div className="
                                                    inline-flex
                                                    items-center
                                                    gap-2
                                                    bg-green-100
                                                    text-green-700
                                                    px-5
                                                    py-3
                                                    rounded-2xl
                                                    font-bold
                                                ">

                                                    <FaCheckCircle />

                                                    Submitted

                                                </div>

                                            ) : overdue ? (

                                                <div className="
                                                    inline-flex
                                                    items-center
                                                    gap-2
                                                    bg-red-100
                                                    text-red-700
                                                    px-5
                                                    py-3
                                                    rounded-2xl
                                                    font-bold
                                                ">

                                                    <FaClock />

                                                    Overdue

                                                </div>

                                            ) : (

                                                <div className="
                                                    inline-flex
                                                    items-center
                                                    gap-2
                                                    bg-orange-100
                                                    text-orange-700
                                                    px-5
                                                    py-3
                                                    rounded-2xl
                                                    font-bold
                                                ">

                                                    <FaHourglassHalf />

                                                    Pending

                                                </div>

                                            )}

                                        </div>

                                    </div>


                                    {/* ==================================
                                        DETAILS
                                    ================================== */}

                                    <div className="
                                        grid
                                        grid-cols-1
                                        md:grid-cols-3
                                        gap-4
                                        mt-7
                                    ">

                                        {/* Due Date */}

                                        <div className="
                                            rounded-2xl
                                            bg-slate-50
                                            p-5
                                        ">

                                            <div className="
                                                flex
                                                items-center
                                                gap-3
                                                text-slate-500
                                            ">

                                                <FaClock />

                                                <span>
                                                    Due Date
                                                </span>

                                            </div>


                                            <p className={`
                                                font-bold
                                                mt-2
                                                ${
                                                    overdue
                                                        ? "text-red-600"
                                                        : "text-slate-800"
                                                }
                                            `}>

                                                {formatDate(
                                                    assignment.due_date
                                                )}

                                            </p>

                                        </div>


                                        {/* Total Marks */}

                                        <div className="
                                            rounded-2xl
                                            bg-slate-50
                                            p-5
                                        ">

                                            <div className="
                                                flex
                                                items-center
                                                gap-3
                                                text-slate-500
                                            ">

                                                <FaClipboardCheck />

                                                <span>
                                                    Total Marks
                                                </span>

                                            </div>


                                            <p className="
                                                font-bold
                                                text-slate-800
                                                mt-2
                                            ">

                                                {assignment.total_marks ??
                                                    0}

                                            </p>

                                        </div>


                                        {/* Status */}

                                        <div className="
                                            rounded-2xl
                                            bg-slate-50
                                            p-5
                                        ">

                                            <div className="
                                                flex
                                                items-center
                                                gap-3
                                                text-slate-500
                                            ">

                                                <FaCheckCircle />

                                                <span>
                                                    Status
                                                </span>

                                            </div>


                                            <p className={`
                                                font-bold
                                                mt-2
                                                ${
                                                    submitted
                                                        ? "text-green-600"
                                                        : overdue
                                                        ? "text-red-600"
                                                        : "text-orange-600"
                                                }
                                            `}>

                                                {submitted
                                                    ? "Submitted"
                                                    : overdue
                                                    ? "Overdue"
                                                    : "Not Submitted"}

                                            </p>

                                        </div>

                                    </div>


                                    {/* ==================================
                                        ATTACHMENT
                                    ================================== */}

                                    {assignment.attachment_url && (

                                        <div className="
                                            mt-7
                                        ">

                                            <a
                                                href={
                                                    assignment.attachment_url
                                                }

                                                target="_blank"

                                                rel="noopener noreferrer"

                                                className="
                                                    inline-flex
                                                    items-center
                                                    gap-3
                                                    text-indigo-600
                                                    font-bold
                                                    hover:text-indigo-800
                                                    transition
                                                "
                                            >

                                                View Assignment Attachment

                                                <FaExternalLinkAlt
                                                    size={14}
                                                />

                                            </a>

                                        </div>

                                    )}


                                    {/* ==================================
                                        EXISTING SUBMISSION
                                    ================================== */}

                                    {submitted &&
                                        assignment.submission && (

                                        <div className="
                                            mt-8
                                            rounded-2xl
                                            bg-green-50
                                            border
                                            border-green-200
                                            p-6
                                        ">

                                            <h3 className="
                                                font-bold
                                                text-green-800
                                                text-lg
                                            ">

                                                Your Submission

                                            </h3>


                                            <a
                                                href={
                                                    assignment.submission.submission_url
                                                }

                                                target="_blank"

                                                rel="noopener noreferrer"

                                                className="
                                                    inline-flex
                                                    items-center
                                                    gap-2
                                                    mt-3
                                                    text-green-700
                                                    font-semibold
                                                    hover:underline
                                                    break-all
                                                "
                                            >

                                                {
                                                    assignment
                                                        .submission
                                                        .submission_url
                                                }

                                                <FaExternalLinkAlt
                                                    size={13}
                                                />

                                            </a>


                                            <div className="
                                                mt-5
                                                grid
                                                grid-cols-1
                                                md:grid-cols-2
                                                gap-4
                                            ">

                                                {/* Submission Status */}

                                                <div>

                                                    <p className="
                                                        text-sm
                                                        text-green-600
                                                    ">

                                                        Status

                                                    </p>


                                                    <p className="
                                                        font-bold
                                                        text-green-800
                                                    ">

                                                        {
                                                            assignment
                                                                .submission
                                                                .status ||
                                                            "Submitted"
                                                        }

                                                    </p>

                                                </div>


                                                {/* Marks */}

                                                <div>

                                                    <p className="
                                                        text-sm
                                                        text-green-600
                                                    ">

                                                        Marks

                                                    </p>


                                                    <p className="
                                                        font-bold
                                                        text-green-800
                                                    ">

                                                        {
                                                            assignment
                                                                .submission
                                                                .marks !==
                                                                null &&
                                                            assignment
                                                                .submission
                                                                .marks !==
                                                                undefined

                                                                ? `${assignment.submission.marks} / ${assignment.total_marks}`

                                                                : "Pending"
                                                        }

                                                    </p>

                                                </div>

                                            </div>


                                            {/* Feedback */}

                                            {assignment
                                                .submission
                                                .feedback && (

                                                <div className="
                                                    mt-5
                                                ">

                                                    <p className="
                                                        text-sm
                                                        text-green-600
                                                    ">

                                                        Mentor Feedback

                                                    </p>


                                                    <p className="
                                                        mt-1
                                                        text-green-900
                                                        leading-6
                                                    ">

                                                        {
                                                            assignment
                                                                .submission
                                                                .feedback
                                                        }

                                                    </p>

                                                </div>

                                            )}

                                        </div>

                                    )}


                                    {/* ==================================
                                        SUBMIT ASSIGNMENT
                                    ================================== */}

                                    {!submitted &&
                                        !overdue && (

                                        <div className="
                                            mt-8
                                            border-t
                                            border-slate-200
                                            pt-8
                                        ">

                                            <h3 className="
                                                text-xl
                                                font-bold
                                                text-slate-800
                                            ">

                                                Submit Assignment

                                            </h3>


                                            <p className="
                                                text-slate-500
                                                mt-2
                                            ">

                                                Paste a Google Drive,
                                                GitHub, GitHub Pages
                                                or other submission URL.

                                            </p>


                                            <div className="
                                                mt-5
                                                flex
                                                flex-col
                                                lg:flex-row
                                                gap-4
                                            ">

                                                <input
                                                    type="url"

                                                    value={
                                                        submissionUrls[
                                                            assignment.id
                                                        ] || ""
                                                    }

                                                    onChange={(
                                                        event
                                                    ) =>
                                                        handleUrlChange(
                                                            assignment.id,
                                                            event.target.value
                                                        )
                                                    }

                                                    placeholder="
                                                        https://github.com/username/project
                                                    "

                                                    disabled={
                                                        submitting ===
                                                        assignment.id
                                                    }

                                                    className="
                                                        flex-1
                                                        border
                                                        border-slate-300
                                                        rounded-2xl
                                                        px-5
                                                        py-4
                                                        text-slate-700
                                                        outline-none
                                                        focus:ring-2
                                                        focus:ring-indigo-500
                                                        focus:border-indigo-500
                                                        disabled:bg-slate-100
                                                    "
                                                />


                                                <button
                                                    onClick={() =>
                                                        handleSubmit(
                                                            assignment.id
                                                        )
                                                    }

                                                    disabled={
                                                        submitting ===
                                                        assignment.id
                                                    }

                                                    className="
                                                        bg-indigo-600
                                                        hover:bg-indigo-700
                                                        disabled:opacity-50
                                                        disabled:cursor-not-allowed
                                                        text-white
                                                        rounded-2xl
                                                        px-7
                                                        py-4
                                                        font-bold
                                                        flex
                                                        items-center
                                                        justify-center
                                                        gap-3
                                                        transition
                                                        whitespace-nowrap
                                                    "
                                                >

                                                    <FaUpload />

                                                    {
                                                        submitting ===
                                                        assignment.id

                                                            ? "Submitting..."

                                                            : "Submit Assignment"
                                                    }

                                                </button>

                                            </div>

                                        </div>

                                    )}


                                    {/* ==================================
                                        OVERDUE MESSAGE
                                    ================================== */}

                                    {!submitted &&
                                        overdue && (

                                        <div className="
                                            mt-8
                                            rounded-2xl
                                            bg-red-50
                                            border
                                            border-red-200
                                            p-5
                                            text-red-700
                                            font-semibold
                                        ">

                                            This assignment is overdue
                                            and can no longer be submitted
                                            from the student portal.

                                        </div>

                                    )}

                                </motion.div>

                            );

                        }
                    )}

                </div>

            </div>

        </div>

    );

}


// ============================================================
// MESSAGE COMPONENT
// ============================================================

function Message({
    message,
    type = "info",
}) {

    const styles = {

        success: `
            bg-green-50
            border-green-200
            text-green-700
        `,

        error: `
            bg-red-50
            border-red-200
            text-red-700
        `,

        info: `
            bg-indigo-50
            border-indigo-200
            text-indigo-700
        `,

    };


    return (

        <div className="
            mb-6
        ">

            <div className={`
                rounded-2xl
                border
                p-5
                font-semibold
                ${styles[type] || styles.info}
            `}>

                {message}

            </div>

        </div>

    );

}


export default Assignments;