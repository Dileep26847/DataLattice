import api from "./api";

// ============================================================
// GET LOGGED-IN USER
// ============================================================

const getLoggedInUser = () => {

    try {

        return (
            JSON.parse(
                localStorage.getItem("user")
            ) || null
        );

    } catch (error) {

        console.error(
            "Failed to read logged-in user:",
            error
        );

        return null;

    }

};


// ============================================================
// GET STUDENT DASHBOARD STATISTICS
// ============================================================

export const getDashboardStats = async (
    studentId = null
) => {

    const user =
        getLoggedInUser();

    const id =
        studentId || user?.id;

    if (!id) {

        throw new Error(
            "Student ID is required"
        );

    }

    const response =
        await api.get(
            `/student/dashboard/${id}`
        );

    return response.data;

};


// ============================================================
// GET STUDENT COURSES
// ============================================================

export const getMyCourses = async (
    studentId = null
) => {

    const user =
        getLoggedInUser();

    const id =
        studentId || user?.id;

    if (!id) {

        throw new Error(
            "Student ID is required"
        );

    }

    const response =
        await api.get(
            `/student/dashboard/${id}/courses`
        );

    return response.data;

};