import api from "./api";

// ============================================================
// STUDENT — GET ASSIGNMENTS BY COURSE
// ============================================================

export const getCourseAssignments = async (
    courseId
) => {

    if (!courseId) {

        throw new Error(
            "Course ID is required"
        );

    }

    const response = await api.get(
        `/student/assignments/course/${courseId}`
    );

    return response.data;

};


// ============================================================
// STUDENT — GET ASSIGNMENT BY ID
// ============================================================

export const getAssignment = async (
    assignmentId
) => {

    if (!assignmentId) {

        throw new Error(
            "Assignment ID is required"
        );

    }

    const response = await api.get(
        `/student/assignments/${assignmentId}`
    );

    return response.data;

};


// ============================================================
// STUDENT — SUBMIT ASSIGNMENT
// ============================================================

export const submitAssignment = async (
    submission
) => {

    if (!submission?.assignment_id) {

        throw new Error(
            "Assignment ID is required"
        );

    }

    if (
        !submission?.submission_url ||
        !String(
            submission.submission_url
        ).trim()
    ) {

        throw new Error(
            "Submission URL is required"
        );

    }

    const response = await api.post(
        "/student/submissions",
        {
            assignment_id:
                submission.assignment_id,

            submission_url:
                String(
                    submission.submission_url
                ).trim(),
        }
    );

    return response.data;

};


// ============================================================
// STUDENT — GET MY SUBMISSION
// ============================================================

export const getMySubmission = async (
    assignmentId
) => {

    if (!assignmentId) {

        throw new Error(
            "Assignment ID is required"
        );

    }

    const response = await api.get(
        `/student/submissions/my/assignment/${assignmentId}`
    );

    return response.data;

};