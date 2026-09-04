import axios from "axios";
import API_BASE_URL from "../config/api";

const API = `${API_BASE_URL}/admin`;

const getToken = () => localStorage.getItem("token");

const authConfig = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});

// ======================================
// Get Courses
// ======================================

export const getCourses = async () => {

  const response = await axios.get(

    `${API}/courses`,

    authConfig()

  );

  return response.data;

};

// ======================================
// Create Course
// ======================================

export const createCourse = async (course) => {

  const response = await axios.post(

    `${API}/create-course`,

    course,

    authConfig()

  );

  return response.data;

};

// ======================================
// Update Course
// ======================================

export const updateCourse = async (id, course) => {

  const response = await axios.put(

    `${API}/update-course/${id}`,

    course,

    authConfig()

  );

  return response.data;

};

// ======================================
// Delete Course
// ======================================

export const deleteCourse = async (id) => {

  const response = await axios.delete(

    `${API}/delete-course/${id}`,

    authConfig()

  );

  return response.data;

};