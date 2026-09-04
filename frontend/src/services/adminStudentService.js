import axios from "axios";

import API_BASE_URL from "../config/api";


// ============================================================
// ADMIN STUDENT API
// ============================================================

const API =
    `${API_BASE_URL}/admin`;


// ============================================================
// GET TOKEN
// ============================================================

const getToken = () => {

    return localStorage.getItem(
        "token"
    );

};


// ============================================================
// AUTH CONFIG
// ============================================================

const authConfig = () => {

    const token =
        getToken();

    return {

        headers: {

            Authorization:
                `Bearer ${token}`,

        },

    };

};


// ============================================================
// GET ALL STUDENTS
// ============================================================

export const getStudents =
    async () => {

        const response =
            await axios.get(

                `${API}/students`,

                authConfig()

            );

        return response.data;

    };


// ============================================================
// GET ONE STUDENT
// ============================================================

export const getStudent =
    async (
        studentId
    ) => {

        const response =
            await axios.get(

                `${API}/students/${studentId}`,

                authConfig()

            );

        return response.data;

    };


// ============================================================
// GET BATCHES
// ============================================================

export const getStudentBatches =
    async () => {

        const response =
            await axios.get(

                `${API}/student-batches`,

                authConfig()

            );

        return response.data;

    };


// ============================================================
// CREATE STUDENT
// ============================================================

export const createStudent =
    async (
        studentData
    ) => {

        const response =
            await axios.post(

                `${API}/create-student`,

                studentData,

                authConfig()

            );

        return response.data;

    };


// ============================================================
// UPDATE STUDENT
// ============================================================

export const updateStudent =
    async (
        studentId,
        studentData
    ) => {

        const response =
            await axios.put(

                `${API}/update-student/${studentId}`,

                studentData,

                authConfig()

            );

        return response.data;

    };


// ============================================================
// DELETE STUDENT
// ============================================================

export const deleteStudent =
    async (
        studentId
    ) => {

        const response =
            await axios.delete(

                `${API}/delete-student/${studentId}`,

                authConfig()

            );

        return response.data;

    };


// ============================================================
// EXPORT DEFAULT API OBJECT
// ============================================================

const adminStudentService = {

    getStudents,

    getStudent,

    getStudentBatches,

    createStudent,

    updateStudent,

    deleteStudent,

};


export default adminStudentService;