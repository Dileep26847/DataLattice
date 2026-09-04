import api from "./api";

// ======================================
// Get All Student Profiles
// ======================================
export const getStudentProfiles = async () => {

  const response = await api.get("/student-profiles");

  return response.data;

};

// ======================================
// Get Student Profile
// ======================================
export const getStudentProfile = async (id) => {

  const response = await api.get(
    `/student-profiles/${id}`
  );

  return response.data;

};

// ======================================
// Create Student Profile
// ======================================
export const createStudentProfile = async (profile) => {

  const response = await api.post(
    "/student-profiles",
    profile
  );

  return response.data;

};

// ======================================
// Update Student Profile
// ======================================
export const updateStudentProfile = async (
  id,
  profile
) => {

  const response = await api.put(
    `/student-profiles/${id}`,
    profile
  );

  return response.data;

};

// ======================================
// Delete Student Profile
// ======================================
export const deleteStudentProfile = async (id) => {

  const response = await api.delete(
    `/student-profiles/${id}`
  );

  return response.data;

};