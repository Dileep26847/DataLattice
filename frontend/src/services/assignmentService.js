import api from "./api";

// ============================================================
// ADMIN — GET ALL ASSIGNMENTS
// ============================================================

export const getAssignments = async () => {

    const response = await api.get(
        "/admin/assignments"
    );

    return response.data;

};


// ============================================================
// ADMIN — GET ASSIGNMENT BY ID
// ============================================================

export const getAssignment = async (
    id
) => {

    const response = await api.get(
        `/admin/assignments/${id}`
    );

    return response.data;

};


// ============================================================
// ADMIN — CREATE ASSIGNMENT
// ============================================================

export const createAssignment = async (
    assignment
) => {

    const response = await api.post(
        "/admin/assignments",
        assignment
    );

    return response.data;

};


// ============================================================
// ADMIN — UPDATE ASSIGNMENT
// ============================================================

export const updateAssignment = async (
    id,
    assignment
) => {

    const response = await api.put(
        `/admin/assignments/${id}`,
        assignment
    );

    return response.data;

};


// ============================================================
// ADMIN — DELETE ASSIGNMENT
// ============================================================

export const deleteAssignment = async (
    id
) => {

    const response = await api.delete(
        `/admin/assignments/${id}`
    );

    return response.data;

};


// ============================================================
// ADMIN — GET ASSIGNMENTS BY COURSE
// ============================================================

export const getCourseAssignments = async (
    courseId
) => {

    const response = await api.get(
        `/admin/assignments/course/${courseId}`
    );

    return response.data;

};