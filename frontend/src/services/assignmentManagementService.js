import axios from "axios";
import API_BASE_URL from "../config/api";

const API = `${API_BASE_URL}/admin/assignments`;

// ======================================
// Get JWT Token
// ======================================

const getToken = () => {
    return localStorage.getItem("token");
};

// ======================================
// Auth Headers
// ======================================

const headers = () => ({
    Authorization: `Bearer ${getToken()}`,
});

// ======================================
// Get All Assignments
// ======================================

export const getAssignments = async () => {

    const response = await axios.get(
        API,
        {
            headers: headers(),
        }
    );

    return response.data;
};

// ======================================
// Get Assignment By ID
// ======================================

export const getAssignment = async (id) => {

    const response = await axios.get(
        `${API}/${id}`,
        {
            headers: headers(),
        }
    );

    return response.data;
};

// ======================================
// Get Assignments By Course
// ======================================

export const getAssignmentsByCourse = async (courseId) => {

    const response = await axios.get(
        `${API}/course/${courseId}`,
        {
            headers: headers(),
        }
    );

    return response.data;
};

// ======================================
// Create Assignment
// ======================================

export const addAssignment = async (assignment) => {

    const response = await axios.post(
        API,
        assignment,
        {
            headers: headers(),
        }
    );

    return response.data;
};

// ======================================
// Update Assignment
// ======================================

export const updateAssignment = async (
    id,
    assignment
) => {

    const response = await axios.put(
        `${API}/${id}`,
        assignment,
        {
            headers: headers(),
        }
    );

    return response.data;
};

// ======================================
// Delete Assignment
// ======================================

export const deleteAssignment = async (id) => {

    const response = await axios.delete(
        `${API}/${id}`,
        {
            headers: headers(),
        }
    );

    return response.data;
};

// ======================================
// Upload Assignment PDF
// ======================================

export const uploadAssignmentPDF = async (file) => {

    const formData = new FormData();

    formData.append("pdf", file);

    const response = await axios.post(
        `${API_BASE_URL}/upload/pdf`,
        formData,
        {
            headers: {
                Authorization: `Bearer ${getToken()}`,
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return response.data;
};