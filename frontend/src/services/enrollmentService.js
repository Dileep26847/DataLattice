import api from "./api";

// ======================================
// Enroll Student
// ======================================

export const enrollCourse = async (userId, courseId) => {

    const response = await api.post(
        "/enrollments",
        {
            user_id: userId,
            course_id: courseId
        }
    );

    return response.data;

};

// ======================================
// Get Student Courses
// ======================================

export const getMyCourses = async (studentId) => {

    const response = await api.get(
        `/student/dashboard/${studentId}/courses`
    );

    return response.data;

};

// ======================================
// Cancel Enrollment
// ======================================

export const cancelEnrollment = async (enrollmentId) => {

    const response = await api.delete(
        `/enrollments/${enrollmentId}`
    );

    return response.data;

};