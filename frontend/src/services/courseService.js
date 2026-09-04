import api from "./api";


// ============================================================
// GET PUBLIC COURSE CATALOGUE
// ============================================================
//
// No login required.
//
// GET /api/courses
// ============================================================

export const getAllCourses = async () => {

  const response =
    await api.get("/courses");

  return response.data;

};


// ============================================================
// GET COURSE BY ID
// ============================================================

export const getCourseById = async (id) => {

  const response =
    await api.get(
      `/courses/${id}`
    );

  return response.data;

};


// ============================================================
// SEARCH COURSES
// ============================================================
//
// No login required.
//
// GET /api/courses/search?q=keyword
// ============================================================

export const searchCourses = async (
  keyword
) => {

  const response =
    await api.get(
      "/courses/search",
      {
        params: {
          q: keyword,
        },
      }
    );

  return response.data;

};