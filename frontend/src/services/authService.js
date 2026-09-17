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
// VERIFY MSG91 SIGNUP TOKEN
// ============================================================
//
// OTP sending and OTP verification are now handled by the
// MSG91 OTP Widget on the frontend.
//
// After MSG91 successfully verifies the OTP, the widget
// returns an access token.
//
// That access token is sent to our backend.
//
// The backend verifies the token directly with MSG91 before
// creating our own signup verification proof.
//
// ============================================================

export const verifySignupOtp = async (
  phone,
  otp,
  accessToken
) => {

  const response =
    await api.post(
      "/auth/otp/verify",
      {
        phone,
        otp,
        accessToken,
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