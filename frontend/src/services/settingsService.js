import api from "./api";

// ======================================
// CHANGE PASSWORD
// ======================================

export const changePassword = async (
    passwordData
) => {

    const response = await api.put(
        "/settings/change-password",
        passwordData
    );

    return response.data;

};