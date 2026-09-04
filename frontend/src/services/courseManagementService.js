import axios from "axios";

import API_BASE_URL from "../config/api";

const API = `${API_BASE_URL}/admin`;


const UPLOAD_API = `${API_BASE_URL}/upload`;

const token = () => localStorage.getItem("token");

const headers = () => ({
  Authorization: `Bearer ${token()}`,
});

// ======================================
// Get Courses
// ======================================
export const getCourses = async () => {

  const res = await axios.get(`${API}/courses`, {
    headers: headers(),
  });

  return res.data;

};

// ======================================
// Get Course
// ======================================
export const getCourse = async (id) => {

  const res = await axios.get(`${API}/courses/${id}`, {
    headers: headers(),
  });

  return res.data;

};

// ======================================
// Add Course
// ======================================
export const addCourse = async (course) => {

  const res = await axios.post(
    `${API}/courses`,
    course,
    {
      headers: headers(),
    }
  );

  return res.data;

};

// ======================================
// Update Course
// ======================================
export const updateCourse = async (
  id,
  course
) => {

  const res = await axios.put(
    `${API}/courses/${id}`,
    course,
    {
      headers: headers(),
    }
  );

  return res.data;

};

// ======================================
// Delete Course
// ======================================
export const deleteCourse = async (id) => {

  const res = await axios.delete(
    `${API}/courses/${id}`,
    {
      headers: headers(),
    }
  );

  return res.data;

};

// ======================================
// Upload Thumbnail
// ======================================
export const uploadThumbnail = async (file) => {

  const formData = new FormData();

  formData.append("thumbnail", file);

  const res = await axios.post(

    `${UPLOAD_API}/thumbnail`,

    formData,

    {
      headers: {
        ...headers(),
        "Content-Type": "multipart/form-data",
      },
    }


  );

  return res.data;

};