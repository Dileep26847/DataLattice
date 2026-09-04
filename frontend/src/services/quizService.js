import api from "./api";

// ======================================
// Get All Quizzes
// ======================================

export const getQuizzes = async () => {
  const response = await api.get("/admin/quizzes");
  return response.data;
};

// ======================================
// Create Quiz
// ======================================

export const createQuiz = async (quiz) => {
  const response = await api.post("/admin/quizzes", quiz);
  return response.data;
};

// ======================================
// Update Quiz
// ======================================

export const updateQuiz = async (id, quiz) => {
  const response = await api.put(`/admin/quizzes/${id}`, quiz);
  return response.data;
};

// ======================================
// Delete Quiz
// ======================================

export const deleteQuiz = async (id) => {
  const response = await api.delete(`/admin/quizzes/${id}`);
  return response.data;
};

// ======================================
// Get Quiz By ID
// ======================================

export const getQuizById = async (id) => {
  const response = await api.get(`/admin/quizzes/${id}`);
  return response.data;
};