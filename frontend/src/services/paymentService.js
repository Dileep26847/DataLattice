import api from "./api";


// ==========================================
// CREATE RAZORPAY ORDER
// ==========================================
// IMPORTANT:
// Only course_id is sent.
// Backend gets the actual price from MySQL.
// ==========================================

export const createOrder = async (
  course_id
) => {

  const response =
    await api.post(

      "/payment/create-order",

      {
        course_id,
      }

    );


  return response.data;

};



// ==========================================
// VERIFY PAYMENT
// ==========================================

export const verifyPayment = async (
  paymentData
) => {

  const response =
    await api.post(

      "/payment/verify",

      paymentData

    );


  return response.data;

};



// ==========================================
// PAYMENT HISTORY
// ==========================================

export const getPaymentHistory =
  async () => {

    const response =
      await api.get(

        "/payment/history"

      );


    return response.data;

  };