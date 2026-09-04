import axios from "axios";

import API_BASE_URL from "../config/api";

const API =
    `${API_BASE_URL}/admin/submissions`;

// ======================================
// Get JWT Token
// ======================================

const getToken = () => {

    return localStorage.getItem("token");

};


// ======================================
// Auth Headers
// ======================================

const headers = () => {

    const token = getToken();

    return {
        Authorization: `Bearer ${token}`,
    };

};


// ======================================
// Get All Submissions
// ======================================

export const getSubmissions = async () => {

    const response = await axios.get(
        API,
        {
            headers: headers(),
        }
    );

    return response.data;

};


// ======================================
// Get Submission By ID
// ======================================

export const getSubmission = async (
    id
) => {

    const response = await axios.get(
        `${API}/${id}`,
        {
            headers: headers(),
        }
    );

    return response.data;

};


// ======================================
// Get Submissions By Assignment
// ======================================

export const getSubmissionsByAssignment = async (
    assignmentId
) => {

    const response = await axios.get(
        `${API}/assignment/${assignmentId}`,
        {
            headers: headers(),
        }
    );

    return response.data;

};


// ======================================
// Grade Submission
// ======================================

export const gradeSubmission = async (
    id,
    gradeData
) => {

    const response = await axios.put(
        `${API}/${id}/grade`,
        {
            marks: gradeData.marks,
            feedback:
                gradeData.feedback ?? null,
        },
        {
            headers: headers(),
        }
    );

    return response.data;

};


// ======================================
// Delete Submission
// ======================================

export const deleteSubmission = async (
    id
) => {

    const response = await axios.delete(
        `${API}/${id}`,
        {
            headers: headers(),
        }
    );

    return response.data;

};