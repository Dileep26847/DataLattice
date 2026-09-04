import api from "./api";

// ======================================
// Get My Certificates
// ======================================

export const getMyCertificates = async () => {

    const response = await api.get(
        "/certificates/my-certificates"
    );

    return response.data;
};


// ======================================
// Get Certificate By ID
// ======================================

export const getCertificateById = async (
    certificateId
) => {

    const response = await api.get(
        `/certificates/${certificateId}`
    );

    return response.data;
};


// ======================================
// Issue Certificate
// ======================================

export const issueCertificate = async (
    courseId
) => {

    const response = await api.post(
        "/certificates/issue",
        {
            course_id: courseId
        }
    );

    return response.data;
};