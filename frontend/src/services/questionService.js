import api from "./api";

// ======================================
// Get Questions By Quiz
// ======================================

export const getQuestionsByQuiz = async (quizId) => {

  const response = await api.get(
    `/admin/questions/quiz/${quizId}`
  );

  return response.data;

};

// ======================================
// Get Single Question
// ======================================

export const getQuestionById = async (id) => {

  const response = await api.get(
    `/admin/questions/${id}`
  );

  return response.data;

};

// ======================================
// Create Question
// ======================================

export const createQuestion = async (question) => {

  const response = await api.post(
    "/admin/questions",
    question
  );

  return response.data;

};

// ======================================
// Update Question
// ======================================

export const updateQuestion = async (
  id,
  question
) => {

  const response = await api.put(
    `/admin/questions/${id}`,
    question
  );

  return response.data;

};

// ======================================
// Delete Question
// ======================================

export const deleteQuestion = async (id) => {

  const response = await api.delete(
    `/admin/questions/${id}`
  );

  return response.data;

};