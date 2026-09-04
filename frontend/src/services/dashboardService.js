import axios from "axios";
import API_BASE_URL from "../config/api";

const API = `${API_BASE_URL}/admin/dashboard`;

const getToken = () => localStorage.getItem("token");

const authConfig = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});

// ===============================
// Admin Dashboard
// ===============================
export const getDashboard = async () => {
  const response = await axios.get(
    API,
    authConfig()
  );

  return response.data;
};

// ===============================
// Student Dashboard
// ===============================
export const getDashboardStats = async (studentId) => {

  const response = await axios.get(

    `${API_BASE_URL}/student/dashboard/${studentId}`,

    authConfig()

  );

  return response.data;

};