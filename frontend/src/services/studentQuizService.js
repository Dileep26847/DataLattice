import api from "./api";

// ======================================
// Available Quizzes
// ======================================

export const getAvailableQuizzes = async (
    studentId
) => {

    const response = await api.get(
        `/student/quizzes/${studentId}`
    );

    return response.data;

};


// ======================================
// Quiz Details
// ======================================

export const getQuizById = async (
    quizId
) => {

    const response = await api.get(
        `/student/quizzes/quiz/${quizId}`
    );

    return response.data;

};


// ======================================
// Quiz Questions
// ======================================

export const getQuizQuestions = async (
    quizId
) => {

    const response = await api.get(
        `/student/quizzes/quiz/${quizId}/questions`
    );

    return response.data;

};


// ======================================
// Start Quiz
// ======================================

export const startQuiz = async (
    data
) => {

    const response = await api.post(
        "/student/quizzes/quiz/start",
        data
    );

    return response.data;

};


// ======================================
// Submit Quiz
// ======================================

export const submitQuiz = async (
    data
) => {

    const response = await api.post(
        "/student/quizzes/quiz/submit",
        data
    );

    return response.data;

};


// ======================================
// Quiz Result
// ======================================

export const getQuizResult = async (
    attemptId
) => {

    const response = await api.get(
        `/student/quizzes/result/${attemptId}`
    );

    return response.data;

};