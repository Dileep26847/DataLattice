const db = require("../database/db");


// ======================================
// CREATE PAYMENT
// ======================================

const createPayment = (
  payment,
  callback
) => {

  const sql = `

    INSERT INTO payments

    (
      student_id,
      course_id,
      razorpay_order_id,
      amount,
      status
    )

    VALUES (?, ?, ?, ?, ?)

  `;


  db.query(

    sql,

    [

      payment.student_id,

      payment.course_id,

      payment.razorpay_order_id,

      payment.amount,

      payment.status,

    ],

    callback

  );

};



// ======================================
// UPDATE PAYMENT AFTER VERIFICATION
// ======================================

const updatePayment = (
  payment,
  callback
) => {

  const sql = `

    UPDATE payments

    SET

      razorpay_payment_id = ?,

      razorpay_signature = ?,

      status = 'Success'

    WHERE razorpay_order_id = ?

  `;


  db.query(

    sql,

    [

      payment.razorpay_payment_id,

      payment.razorpay_signature,

      payment.razorpay_order_id,

    ],

    callback

  );

};



// ======================================
// GET PAYMENT BY ORDER ID
// ======================================

const getPaymentByOrderId = (
  orderId,
  callback
) => {

  db.query(

    `

      SELECT *

      FROM payments

      WHERE razorpay_order_id = ?

      LIMIT 1

    `,

    [orderId],

    callback

  );

};



// ======================================
// GET STUDENT PAYMENT HISTORY
// ======================================

const getPaymentsByStudent = (
  studentId,
  callback
) => {

  const sql = `

    SELECT

      payments.*,

      courses.title,

      courses.thumbnail

    FROM payments

    JOIN courses

      ON courses.id =
         payments.course_id

    WHERE payments.student_id = ?

    ORDER BY payments.created_at DESC

  `;


  db.query(

    sql,

    [studentId],

    callback

  );

};



module.exports = {

  createPayment,

  updatePayment,

  getPaymentByOrderId,

  getPaymentsByStudent,

};