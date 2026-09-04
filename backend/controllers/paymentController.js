const Razorpay = require("razorpay");
const crypto = require("crypto");

const db = require("../database/db");

const paymentModel = require("../models/paymentModel");
const enrollmentModel = require("../models/enrollmentModel");

// ======================================
// Razorpay Instance
// ======================================

const razorpay = new Razorpay({

  key_id: process.env.RAZORPAY_KEY_ID,

  key_secret: process.env.RAZORPAY_KEY_SECRET,

});


// ======================================
// CREATE RAZORPAY ORDER
// ======================================

exports.createOrder = async (req, res) => {

  console.log("\n========================================");
  console.log("CREATE RAZORPAY ORDER");
  console.log("========================================");

  try {

    const { course_id } = req.body;

    // ======================================
    // Authentication
    // ======================================

    if (!req.user) {

      return res.status(401).json({

        success: false,

        message: "User not authenticated",

      });

    }


    // ======================================
    // Validate Course
    // ======================================

    if (!course_id) {

      return res.status(400).json({

        success: false,

        message: "Course ID is required",

      });

    }


    // ======================================
    // Get Course From Database
    // ======================================

    const courseSql = `

      SELECT

        id,

        title,

        price

      FROM courses

      WHERE id = ?

      LIMIT 1

    `;


    db.query(

      courseSql,

      [course_id],

      async (courseErr, courses) => {

        if (courseErr) {

          console.error(
            "Course lookup error:",
            courseErr
          );

          return res.status(500).json({

            success: false,

            message: "Failed to fetch course",

          });

        }


        // ======================================
        // Course Not Found
        // ======================================

        if (
          !courses ||
          courses.length === 0
        ) {

          return res.status(404).json({

            success: false,

            message: "Course not found",

          });

        }


        const course = courses[0];


        // ======================================
        // Course Price
        // ======================================

        const amount = Number(course.price);


        if (
          !Number.isFinite(amount) ||
          amount < 0
        ) {

          return res.status(400).json({

            success: false,

            message: "Invalid course price",

          });

        }


        // ======================================
        // Free Course
        // ======================================

        if (amount === 0) {

          return res.status(400).json({

            success: false,

            message:
              "This course is free. Payment is not required.",

          });

        }


        // ======================================
        // Check Existing Enrollment
        // ======================================

        enrollmentModel.checkEnrollment(

          req.user.id,

          course.id,

          async (enrollErr, existing) => {

            if (enrollErr) {

              console.error(
                "Enrollment check error:",
                enrollErr
              );

              return res.status(500).json({

                success: false,

                message:
                  "Failed to check enrollment",

              });

            }


            // ======================================
            // Already Enrolled
            // ======================================

            if (
              existing &&
              existing.length > 0
            ) {

              return res.status(409).json({

                success: false,

                message:
                  "You are already enrolled in this course",

              });

            }


            // ======================================
            // Razorpay Order
            // ======================================

            const options = {

              amount:
                Math.round(amount * 100),

              currency: "INR",

              receipt:
                `course_${course.id}_${req.user.id}_${Date.now()}`,

            };


            console.log(
              "Razorpay order:",
              options
            );


            let order;


            try {

              order =
                await razorpay.orders.create(
                  options
                );

            }

            catch (razorpayError) {

              console.error(
                "Razorpay order error:",
                razorpayError
              );

              return res.status(500).json({

                success: false,

                message:
                  razorpayError?.error?.description ||
                  "Failed to create Razorpay order",

              });

            }


            console.log(
              "Razorpay Order Created:",
              order.id
            );


            // ======================================
            // Save Payment
            // ======================================

            paymentModel.createPayment(

              {

                student_id:
                  req.user.id,

                course_id:
                  course.id,

                razorpay_order_id:
                  order.id,

                amount:
                  amount,

                status:
                  "Pending",

              },

              (paymentErr) => {

                if (paymentErr) {

                  console.error(
                    "Payment record error:",
                    paymentErr
                  );

                  return res.status(500).json({

                    success: false,

                    message:
                      "Order created but payment record could not be saved",

                  });

                }


                // ======================================
                // Response
                // ======================================

                return res.status(200).json({

                  success: true,

                  message:
                    "Razorpay order created successfully",

                  order,

                });

              }

            );

          }

        );

      }

    );

  }

  catch (err) {

    console.error(
      "Create order error:",
      err
    );

    return res.status(500).json({

      success: false,

      message:
        err.message ||
        "Failed to create payment order",

    });

  }

};



// ======================================
// VERIFY RAZORPAY PAYMENT
// ======================================

exports.verifyPayment = async (
  req,
  res
) => {

  console.log("\n========================================");
  console.log("VERIFY RAZORPAY PAYMENT");
  console.log("========================================");


  try {

    const {

      razorpay_order_id,

      razorpay_payment_id,

      razorpay_signature,

    } = req.body;


    // ======================================
    // Authentication
    // ======================================

    if (!req.user) {

      return res.status(401).json({

        success: false,

        message: "User not authenticated",

      });

    }


    // ======================================
    // Validate Data
    // ======================================

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature
    ) {

      return res.status(400).json({

        success: false,

        message:
          "Payment verification data is incomplete",

      });

    }


    // ======================================
    // Find Our Payment Record
    // ======================================

    paymentModel.getPaymentByOrderId(

      razorpay_order_id,

      async (paymentErr, payments) => {

        if (paymentErr) {

          console.error(
            "Payment lookup error:",
            paymentErr
          );

          return res.status(500).json({

            success: false,

            message:
              "Failed to find payment record",

          });

        }


        if (
          !payments ||
          payments.length === 0
        ) {

          return res.status(404).json({

            success: false,

            message:
              "Payment order not found",

          });

        }


        const payment = payments[0];


        // ======================================
        // Verify Payment Belongs To User
        // ======================================

        if (
          Number(payment.student_id) !==
          Number(req.user.id)
        ) {

          return res.status(403).json({

            success: false,

            message:
              "You are not authorized to verify this payment",

          });

        }


        // ======================================
        // Already Successful
        // ======================================

        if (
          payment.status === "Success"
        ) {

          return res.status(200).json({

            success: true,

            message:
              "Payment already verified",

          });

        }


        // ======================================
        // Verify Razorpay Signature
        // ======================================

        const generatedSignature =
          crypto

            .createHmac(
              "sha256",
              process.env.RAZORPAY_KEY_SECRET
            )

            .update(
              `${razorpay_order_id}|${razorpay_payment_id}`
            )

            .digest("hex");


        if (
          generatedSignature !==
          razorpay_signature
        ) {

          console.error(
            "Invalid Razorpay signature"
          );

          return res.status(400).json({

            success: false,

            message:
              "Invalid payment signature",

          });

        }


        // ======================================
        // Fetch Payment From Razorpay
        // ======================================

        let razorpayPayment;


        try {

          razorpayPayment =
            await razorpay.payments.fetch(
              razorpay_payment_id
            );

        }

        catch (razorpayError) {

          console.error(
            "Razorpay payment fetch error:",
            razorpayError
          );

          return res.status(400).json({

            success: false,

            message:
              "Unable to verify payment with Razorpay",

          });

        }


        // ======================================
        // Verify Order ID
        // ======================================

        if (
          razorpayPayment.order_id !==
          razorpay_order_id
        ) {

          return res.status(400).json({

            success: false,

            message:
              "Payment order mismatch",

          });

        }


        // ======================================
        // Verify Amount
        // ======================================

        const expectedAmount =
          Math.round(
            Number(payment.amount) * 100
          );


        if (
          Number(razorpayPayment.amount) !==
          expectedAmount
        ) {

          console.error(
            "Payment amount mismatch"
          );

          return res.status(400).json({

            success: false,

            message:
              "Payment amount mismatch",

          });

        }


        // ======================================
        // Verify Payment Status
        // ======================================

        if (
          razorpayPayment.status !==
          "captured"
        ) {

          return res.status(400).json({

            success: false,

            message:
              `Payment is not captured. Current status: ${razorpayPayment.status}`,

          });

        }


        // ======================================
        // Check Course Enrollment
        // ======================================

        enrollmentModel.checkEnrollment(

          payment.student_id,

          payment.course_id,

          (enrollCheckErr, existingEnrollment) => {

            if (enrollCheckErr) {

              console.error(
                "Enrollment check error:",
                enrollCheckErr
              );

              return res.status(500).json({

                success: false,

                message:
                  "Failed to check enrollment",

              });

            }


            // ======================================
            // Already Enrolled
            // ======================================

            if (
              existingEnrollment &&
              existingEnrollment.length > 0
            ) {

              paymentModel.updatePayment(

                {

                  razorpay_payment_id,

                  razorpay_signature,

                  razorpay_order_id,

                },

                (updateErr) => {

                  if (updateErr) {

                    console.error(
                      updateErr
                    );

                    return res.status(500).json({

                      success: false,

                      message:
                        "Payment verified but payment record update failed",

                    });

                  }


                  return res.status(200).json({

                    success: true,

                    message:
                      "Payment verified. Student was already enrolled.",

                  });

                }

              );

              return;

            }


            // ======================================
            // Create Enrollment
            // ======================================

            enrollmentModel.enrollStudent(

              {

                user_id:
                  payment.student_id,

                course_id:
                  payment.course_id,

              },

              (enrollErr) => {

                if (enrollErr) {

                  console.error(
                    "Enrollment creation error:",
                    enrollErr
                  );

                  return res.status(500).json({

                    success: false,

                    message:
                      "Payment verified but enrollment could not be created",

                  });

                }


                // ======================================
                // Update Payment
                // ======================================

                paymentModel.updatePayment(

                  {

                    razorpay_payment_id,

                    razorpay_signature,

                    razorpay_order_id,

                  },

                  (updateErr) => {

                    if (updateErr) {

                      console.error(
                        "Payment update error:",
                        updateErr
                      );

                      return res.status(500).json({

                        success: false,

                        message:
                          "Enrollment created but payment record update failed",

                      });

                    }


                    // ======================================
                    // SUCCESS
                    // ======================================

                    return res.status(200).json({

                      success: true,

                      message:
                        "Payment verified and course enrolled successfully",

                    });

                  }

                );

              }

            );

          }

        );

      }

    );

  }

  catch (err) {

    console.error(
      "Verify payment error:",
      err
    );

    return res.status(500).json({

      success: false,

      message:
        err.message ||
        "Payment verification failed",

    });

  }

};



// ======================================
// PAYMENT HISTORY
// ======================================

exports.getMyPayments = (
  req,
  res
) => {

  if (!req.user) {

    return res.status(401).json({

      success: false,

      message:
        "User not authenticated",

    });

  }


  paymentModel.getPaymentsByStudent(

    req.user.id,

    (err, payments) => {

      if (err) {

        console.error(
          "Payment history error:",
          err
        );

        return res.status(500).json({

          success: false,

          message:
            "Failed to fetch payment history",

        });

      }


      return res.status(200).json({

        success: true,

        total:
          payments.length,

        payments,

      });

    }

  );

};