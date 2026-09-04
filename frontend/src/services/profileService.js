import api from "./api";

// ======================================
// Get My Profile
// ======================================

export const getProfile = async () => {

    const response = await api.get(
        "/profile/me"
    );

    return response.data;
};


// ======================================
// Update My Profile
// ======================================

export const updateProfile = async (profile) => {

    const response = await api.put(
        "/profile/me",
        profile
    );

    return response.data;
};