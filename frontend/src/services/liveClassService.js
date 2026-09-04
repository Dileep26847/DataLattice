import api from "./api";

// ==========================================
// Get All Live Classes
// ==========================================
export const getLiveClasses = async () => {

  const response = await api.get("/live-classes");

  return response.data;

};

// ==========================================
// Get Live Class
// ==========================================
export const getLiveClass = async (id) => {

  const response = await api.get(`/live-classes/${id}`);

  return response.data;

};

// ==========================================
// Get Classes By Batch
// ==========================================
export const getBatchClasses = async (batchId) => {

  const response = await api.get(
    `/live-classes/batch/${batchId}`
  );

  return response.data;

};

// ==========================================
// Create Live Class
// ==========================================
export const createLiveClass = async (liveClass) => {

  const response = await api.post(
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

  const response = await api.put(
    `/live-classes/${id}`,
    liveClass
  );

  return response.data;

};

// ==========================================
// Delete Live Class
// ==========================================
export const deleteLiveClass = async (id) => {

  const response = await api.delete(
    `/live-classes/${id}`
  );

  return response.data;

};