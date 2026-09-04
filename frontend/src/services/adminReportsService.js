import axios from "axios";
import API_BASE_URL from "../config/api";

// ==========================================
// TOKEN
// ==========================================

const getToken = () => {
    return localStorage.getItem("token");
};


// ==========================================
// AUTH CONFIG
// ==========================================

const authConfig = () => ({
    headers: {
        Authorization: `Bearer ${getToken()}`,
    },
});


// ==========================================
// REPORT SUMMARY
// ==========================================

export const getReportSummary = async () => {

    const response = await axios.get(
        `${API_BASE_URL}/admin/reports/summary`,
        authConfig()
    );

    return response.data;
};


// ==========================================
// STUDENT REPORT
// ==========================================

export const getStudentReport = async () => {

    const response = await axios.get(
        `${API_BASE_URL}/admin/reports/students`,
        authConfig()
    );

    return response.data;
};


// ==========================================
// COURSE REPORT
// ==========================================

export const getCourseReport = async () => {

    const response = await axios.get(
        `${API_BASE_URL}/admin/reports/courses`,
        authConfig()
    );

    return response.data;
};


// ==========================================
// ENROLLMENT REPORT
// ==========================================

export const getEnrollmentReport = async () => {

    const response = await axios.get(
        `${API_BASE_URL}/admin/reports/enrollments`,
        authConfig()
    );

    return response.data;
};