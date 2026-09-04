import axios from "axios";

import API_BASE_URL from "../config/api";

const API = `${API_BASE_URL}/batches`;

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
// Get All Batches
// ======================================

export const getBatches = async () => {

    const response = await axios.get(
        API,
        {
            headers: headers(),
        }
    );

    return response.data;
};

// ======================================
// Get Batch By ID
// ======================================

export const getBatch = async (id) => {

    const response = await axios.get(
        `${API}/${id}`,
        {
            headers: headers(),
        }
    );

    return response.data;
};

// ======================================
// Get Batch By ID
// Alias used by Batch Details
// ======================================

export const getBatchById = async (id) => {

    return getBatch(id);

};

// ======================================
// Create Batch
// ======================================

export const createBatch = async (batch) => {

    const response = await axios.post(
        API,
        batch,
        {
            headers: headers(),
        }
    );

    return response.data;
};

// ======================================
// Update Batch
// ======================================

export const updateBatch = async (
    id,
    batch
) => {

    const response = await axios.put(
        `${API}/${id}`,
        batch,
        {
            headers: headers(),
        }
    );

    return response.data;
};

// ======================================
// Delete Batch
// ======================================

export const deleteBatch = async (id) => {

    const response = await axios.delete(
        `${API}/${id}`,
        {
            headers: headers(),
        }
    );

    return response.data;
};

// ======================================
// Assign Student To Batch
// ======================================

export const assignStudent = async (
    batch_id,
    student_id
) => {

    const response = await axios.post(
        `${API}/assign-student`,
        {
            batch_id,
            student_id,
        },
        {
            headers: headers(),
        }
    );

    return response.data;
};

// ======================================
// Get Students In Batch
// ======================================

export const getBatchStudents = async (
    batchId
) => {

    const response = await axios.get(
        `${API}/students/${batchId}`,
        {
            headers: headers(),
        }
    );

    return response.data;
};