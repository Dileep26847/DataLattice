import api from "./api";

// ======================================
// Get All Submissions
// ======================================

export const getSubmissions = async () => {

    const response = await api.get(
        "/admin/submissions"
    );

    return response.data;

};


// ======================================
// Get Assignment Submissions
// ======================================

export const getAssignmentSubmissions = async (
    assignmentId
) => {

    const response = await api.get(
        `/admin/submissions/assignment/${assignmentId}`
    );

    return response.data;

};


// ======================================
// Review Submission
// ======================================

export const reviewSubmission = async (
    id,
    reviewData
) => {

    const response = await api.put(
        `/admin/submissions/${id}`,
        reviewData
    );

    return response.data;

};


// ======================================
// Delete Submission
// ======================================

export const deleteSubmission = async (id) => {

    const response = await api.delete(
        `/admin/submissions/${id}`
    );

    return response.data;

};