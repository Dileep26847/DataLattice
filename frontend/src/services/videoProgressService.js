import api from "./api";

// ======================================
// Save Video Progress
// ======================================
export const saveVideoProgress = async (data) => {

  const response = await api.post(
    "/video-progress/save",
    data
  );

  return response.data;

};

// ======================================
// Get Video Progress
// ======================================
export const getVideoProgress = async (lessonId) => {

  const response = await api.get(
    `/video-progress/${lessonId}`
  );

  return response.data;

};

// ======================================
// Mark Video Complete
// ======================================
export const completeVideo = async (
  courseId,
  lessonId
) => {

  const response = await api.post(
    "/video-progress/complete",
    {
      course_id: courseId,
      lesson_id: lessonId,
    }
  );

  return response.data;
};