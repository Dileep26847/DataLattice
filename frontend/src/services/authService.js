import api from "./api";


// ============================================================
// REGISTER
// ============================================================

export const registerUser = async (
  userData
) => {

  const response =
    await api.post(
      "/auth/register",
      userData
    );

  return response.data;

};


// ============================================================
// REQUEST SIGNUP OTP
// ============================================================

export const requestSignupOtp = async (
  phone
) => {

  const response =
    await api.post(
      "/auth/otp/request",
      {
        phone,
      }
    );

  return response.data;

};


// ============================================================
// VERIFY SIGNUP OTP
// ============================================================

export const verifySignupOtp = async (
  phone,
  otp
) => {

  const response =
    await api.post(
      "/auth/otp/verify",
      {
        phone,
        otp,
      }
    );

  return response.data;

};


// ============================================================
// LOGIN
// ============================================================

export const loginUser = async (
  userData
) => {

  const response =
    await api.post(
      "/auth/login",
      userData
    );

  return response.data;

};