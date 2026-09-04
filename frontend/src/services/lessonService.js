import api from "./api";

// ============================================================
// STUDENT LESSON SERVICE
// ============================================================

// ------------------------------------------------------------
// Get Lessons By Course
// ------------------------------------------------------------

export const getLessonsByCourse = async (courseId) => {

    if (!courseId) {

        throw new Error(
            "Course ID is required"
        );

    }

    const response = await api.get(
        `/student/lessons/course/${courseId}`
    );

    return response.data;

};


// ------------------------------------------------------------
// Get Lesson By ID
// ------------------------------------------------------------

export const getLessonById = async (lessonId) => {

    if (!lessonId) {

        throw new Error(
            "Lesson ID is required"
        );

    }

    const response = await api.get(
        `/student/lessons/${lessonId}`
    );

    return response.data;

};