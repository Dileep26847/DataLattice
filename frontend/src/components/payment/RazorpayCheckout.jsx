import {
  createOrder,
  verifyPayment,
} from "../../services/paymentService";


// ======================================
// Load Razorpay Script
// ======================================

const loadRazorpayScript = () => {

  return new Promise(
    (resolve) => {

      // ======================================
      // Already Loaded
      // ======================================

      if (
        window.Razorpay
      ) {

        resolve(true);

        return;

      }


      // ======================================
      // Create Script
      // ======================================

      const script =
        document.createElement(
          "script"
        );


      script.src =
        "https://checkout.razorpay.com/v1/checkout.js";


      script.onload = () =>
        resolve(true);


      script.onerror = () =>
        resolve(false);


      document.body.appendChild(
        script
      );

    }
  );

};



// ======================================
// OPEN RAZORPAY CHECKOUT
// ======================================

export const openRazorpayCheckout =
  async ({

    course,

    onSuccess,

    onFailure,

  }) => {

    // ======================================
    // Validate Course
    // ======================================

    if (
      !course ||
      !course.id
    ) {

      console.error(
        "Invalid course"
      );

      if (onFailure) {
        onFailure();
      }

      return;

    }


    // ======================================
    // Load Razorpay
    // ======================================

    const loaded =
      await loadRazorpayScript();


    if (!loaded) {

      alert(
        "Failed to load Razorpay. Please check your internet connection."
      );


      if (onFailure) {
        onFailure();
      }


      return;

    }


    try {

      // ======================================
      // Create Order
      // ======================================
      // IMPORTANT:
      // We send ONLY course.id.
      // Backend gets price from database.
      // ======================================

      const {
        order
      } = await createOrder(
        course.id
      );


      if (
        !order ||
        !order.id
      ) {

        throw new Error(
          "Invalid Razorpay order"
        );

      }


      // ======================================
      // User Information
      // ======================================

      let user = null;


      try {

        user =
          JSON.parse(
            localStorage.getItem(
              "user"
            )
          );

      }

      catch {

        user = null;

      }


      // ======================================
      // Razorpay Options
      // ======================================

      const options = {

        key:
          import.meta.env
            .VITE_RAZORPAY_KEY_ID,

        amount:
          order.amount,

        currency:
          order.currency,

        name:
          "Data Lattice",

        description:
          course.title,

        order_id:
          order.id,


        // ======================================
        // Payment Handler
        // ======================================

        handler:
          async function (
            response
          ) {

            try {

              // ======================================
              // Verify On Backend
              // ======================================

              const result =
                await verifyPayment({

                  razorpay_order_id:
                    response.razorpay_order_id,

                  razorpay_payment_id:
                    response.razorpay_payment_id,

                  razorpay_signature:
                    response.razorpay_signature,

                });


              if (
                !result.success
              ) {

                throw new Error(
                  result.message ||
                  "Payment verification failed"
                );

              }


              // ======================================
              // Payment Successful
              // ======================================

              if (onSuccess) {

                onSuccess(
                  result
                );

              }

            }

            catch (error) {

              console.error(
                "Payment verification failed:",
                error
              );


              if (onFailure) {

                onFailure(
                  error
                );

              }

            }

          },


        // ======================================
        // Prefill
        // ======================================

        prefill: {

          name:
            user?.full_name || "",

          email:
            user?.email || "",

        },


        // ======================================
        // Theme
        // ======================================

        theme: {

          color:
            "#0891b2",

        },


        // ======================================
        // Modal
        // ======================================

        modal: {

          ondismiss:
            function () {

              console.log(
                "Razorpay checkout closed"
              );

            },

        },

      };


      // ======================================
      // Create Payment Object
      // ======================================

      const paymentObject =
        new window.Razorpay(
          options
        );


      // ======================================
      // Payment Failed
      // ======================================

      paymentObject.on(
        "payment.failed",
        function (response) {

          console.error(
            "Razorpay payment failed:",
            response?.error
          );


          if (onFailure) {

            onFailure(
              response?.error
            );

          }

        }
      );


      // ======================================
      // Open Checkout
      // ======================================

      paymentObject.open();

    }

    catch (error) {

      console.error(
        "Razorpay checkout error:",
        error
      );


      if (onFailure) {

        onFailure(
          error
        );

      }

    }

  };