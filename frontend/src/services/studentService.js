import axios from "axios";

import API_BASE_URL from "../config/api";

const API = `${API_BASE_URL}/admin`;

const token = () => localStorage.getItem("token");

// ================================
// Get All Students
// ================================
export const getStudents = async () => {

  const response = await axios.get(
    `${API}/students`,
    {
      headers: {
        Authorization: `Bearer ${token()}`,
      },
    }
  );

  return response.data;

};

// ================================
// Delete Student
// ================================
export const deleteStudent = async (id) => {

  const response = await axios.delete(
    `${API}/students/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token()}`,
      },
    }
  );

  return response.data;

};