import axios from "axios";

import API_BASE_URL from "../config/api";

const API =
  `${API_BASE_URL}/admin/lessons`;


// ======================================
// TOKEN
// ======================================

const getToken = () =>
  localStorage.getItem("token");


// ======================================
// AUTH HEADERS
// ======================================

const authConfig = () => ({
  headers: {
    Authorization:
      `Bearer ${getToken()}`,
  },
});


// ======================================
// GET ALL LESSONS
// ======================================

export const getLessons =
  async () => {

    const response =
      await axios.get(
        API,
        authConfig()
      );

    return response.data;

  };


// ======================================
// GET LESSON
// ======================================

export const getLesson =
  async (id) => {

    const response =
      await axios.get(
        `${API}/${id}`,
        authConfig()
      );

    return response.data;

  };


// ======================================
// GET LESSONS BY COURSE
// ======================================

export const getLessonsByCourse =
  async (courseId) => {

    const response =
      await axios.get(
        `${API}/course/${courseId}`,
        authConfig()
      );

    return response.data;

  };


// ======================================
// ADD LESSON
// ======================================

export const addLesson =
  async (lesson) => {

    const response =
      await axios.post(
        API,
        lesson,
        authConfig()
      );

    return response.data;

  };


// ======================================
// UPDATE LESSON
// ======================================

export const updateLesson =
  async (
    id,
    lesson
  ) => {

    const response =
      await axios.put(
        `${API}/${id}`,
        lesson,
        authConfig()
      );

    return response.data;

  };


// ======================================
// DELETE LESSON
// ======================================

export const deleteLesson =
  async (id) => {

    const response =
      await axios.delete(
        `${API}/${id}`,
        authConfig()
      );

    return response.data;

  };


// ======================================
// UPLOAD VIDEO
// ======================================

export const uploadLessonVideo =
  async (file) => {

    const formData =
      new FormData();

    formData.append(
      "video",
      file
    );


    const response =
      await axios.post(

        `${API_BASE_URL}/upload/video`,

        formData,

        {
          headers: {
            Authorization:
              `Bearer ${getToken()}`,

            "Content-Type":
              "multipart/form-data",
          },
        }

      );


    return response.data;

  };


// ======================================
// UPLOAD PDF
// ======================================

export const uploadLessonPDF =
  async (file) => {

    const formData =
      new FormData();

    formData.append(
      "pdf",
      file
    );


    const response =
      await axios.post(

        `${API_BASE_URL}/upload/pdf`,

        formData,

        {
          headers: {
            Authorization:
              `Bearer ${getToken()}`,

            "Content-Type":
              "multipart/form-data",
          },
        }

      );


    return response.data;

  };