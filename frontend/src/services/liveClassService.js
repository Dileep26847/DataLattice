import api from "./api";

// ==========================================
// Get All Live Classes
// ==========================================

export const getLiveClasses = async () => {

  const response =
    await api.get(
      "/live-classes"
    );

  return response.data;

};


// ==========================================
// Get Live Class
// ==========================================

export const getLiveClass = async (
  id
) => {

  const response =
    await api.get(
      `/live-classes/${id}`
    );

  return response.data;

};


// ==========================================
// Get Classes By Batch
// ==========================================

export const getBatchClasses = async (
  batchId
) => {

  const response =
    await api.get(
      `/live-classes/batch/${batchId}`
    );

  return response.data;

};


// ==========================================
// JOIN LIVE CLASS
//
// Attendance is recorded by the backend
// before the Zoom meeting is opened.
//
// Backend verifies:
// 1. Logged-in user is a student
// 2. Student belongs to the class batch
// 3. Live class exists
//
// After successful response, the
// LiveClasses page opens Zoom.
// ==========================================

export const joinLiveClass = async (
  id
) => {

  const response =
    await api.post(
      `/live-classes/${id}/join`
    );

  return response.data;

};


// ==========================================
// Create Live Class
// ==========================================

export const createLiveClass = async (
  liveClass
) => {

  const response =
    await api.post(
      "/live-classes",
      liveClass
    );

  return response.data;

};


// ==========================================
// Update Live Class
// ==========================================

export const updateLiveClass = async (
  id,
  liveClass
) => {

  const response =
    await api.put(
      `/live-classes/${id}`,
      liveClass
    );

  return response.data;

};


// ==========================================
// Delete Live Class
// ==========================================

export const deleteLiveClass = async (
  id
) => {

  const response =
    await api.delete(
      `/live-classes/${id}`
    );

  return response.data;

};