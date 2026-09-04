import api from "./api";

// ======================================
// Mark Lesson Complete
// ======================================

export const markLessonComplete = async (
    courseId,
    lessonId
) => {

    const response = await api.post(
        "/progress/complete",
        {
            course_id: courseId,
            lesson_id: lessonId,
        }
    );

    return response.data;
};


// ======================================
// Get Completed Lessons
// ======================================

export const getCompletedLessons = async (
    courseId
) => {

    const response = await api.get(
        `/progress/completed/${courseId}`
    );

    return response.data;
};


// ======================================
// Get Course Progress
// ======================================

export const getCourseProgress = async (
    courseId
) => {

    const response = await api.get(
        `/progress/course/${courseId}`
    );

    return response.data;
};


// ======================================
// Resume Learning
// ======================================

export const resumeLearning = async (
    courseId
) => {

    const response = await api.get(
        `/progress/resume/${courseId}`
    );

    return response.data;
};