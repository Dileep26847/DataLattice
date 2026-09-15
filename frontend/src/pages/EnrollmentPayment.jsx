import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  FaArrowLeft,
  FaArrowRight,
  FaCheckCircle,
  FaBookOpen,
  FaChartLine,
  FaDatabase,
  FaSpinner,
  FaShieldAlt,
  FaGraduationCap,
} from "react-icons/fa";

import {
  getAllCourses,
} from "../services/courseService";

import {
  openRazorpayCheckout,
} from "../components/payment/RazorpayCheckout";

import {
  successToast,
  errorToast,
} from "../utils/toast";


const PENDING_ENROLLMENT_KEY =
  "datalattice_pending_enrollment";


/*
|--------------------------------------------------------------------------
| ONLY THESE TWO PROGRAMS ARE ALLOWED ON THE ENROLLMENT PAGE
|--------------------------------------------------------------------------
|
| Important:
| We are NOT deleting or changing courses in the database.
| We are only filtering which courses are displayed here.
|
*/

const ALLOWED_COURSES = [
  "data science",
  "data analytics",
];


function normalizeCourseTitle(title) {
  return String(title || "")
    .trim()
    .toLowerCase();
}


function isAllowedCourse(course) {
  const normalizedTitle =
    normalizeCourseTitle(course?.title);

  return ALLOWED_COURSES.includes(
    normalizedTitle
  );
}


function EnrollmentPayment() {

  const navigate =
    useNavigate();


  const [courses, setCourses] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [selectedCourseId, setSelectedCourseId] =
    useState(null);

  const [paymentLoading, setPaymentLoading] =
    useState(false);


  // ============================================================
  // GET CURRENT USER
  // ============================================================

  const getCurrentUser = () => {

    try {

      const token =
        localStorage.getItem("token");

      const user =
        JSON.parse(
          localStorage.getItem("user")
        );

      if (!token || !user) {

        return null;

      }

      return user;

    }

    catch {

      return null;

    }

  };


  // ============================================================
  // LOAD COURSES
  // ============================================================

  useEffect(() => {

    const loadCourses =
      async () => {

        try {

          setLoading(true);

          const data =
            await getAllCourses();

          const allCourses =
            Array.isArray(data?.courses)
              ? data.courses
              : [];


          /*
          |--------------------------------------------------------------------------
          | FILTER FOR ENROLLMENT PAGE
          |--------------------------------------------------------------------------
          |
          | Backend may contain many courses.
          | Enrollment page shows ONLY:
          |
          | 1. Data Science
          | 2. Data Analytics
          |
          */

          const availableCourses =
            allCourses.filter(
              isAllowedCourse
            );


          setCourses(
            availableCourses
          );


          // ======================================================
          // RESTORE PENDING COURSE
          // ======================================================

          const pendingCourseId =
            localStorage.getItem(
              PENDING_ENROLLMENT_KEY
            );


          if (pendingCourseId) {

            const matchingCourse =
              availableCourses.find(
                (course) =>
                  String(course.id) ===
                  String(pendingCourseId)
              );


            if (matchingCourse) {

              setSelectedCourseId(
                matchingCourse.id
              );

            }

          }

        }

        catch (error) {

          console.error(
            "ENROLLMENT COURSES ERROR:",
            error
          );

          errorToast(
            "Unable to load courses. Please try again."
          );

        }

        finally {

          setLoading(false);

        }

      };


    loadCourses();

  }, []);


  // ============================================================
  // COURSE HELPERS
  // ============================================================

  const selectedCourse =
    useMemo(
      () =>
        courses.find(
          (course) =>
            String(course.id) ===
            String(selectedCourseId)
        ) || null,
      [
        courses,
        selectedCourseId,
      ]
    );


  const formatPrice =
    (price) => {

      const amount =
        Number(price);

      if (
        !Number.isFinite(amount)
      ) {

        return "Contact us";

      }

      return new Intl.NumberFormat(
        "en-IN",
        {
          style: "currency",
          currency: "INR",
          maximumFractionDigits: 0,
        }
      ).format(amount);

    };


  // ============================================================
  // COURSE ICON
  // ============================================================

  const getCourseIcon =
    (course) => {

      const title =
        normalizeCourseTitle(
          course?.title
        );


      if (
        title === "data science"
      ) {

        return (
          <FaChartLine />
        );

      }


      if (
        title === "data analytics"
      ) {

        return (
          <FaDatabase />
        );

      }


      return (
        <FaBookOpen />
      );

    };


  // ============================================================
  // SELECT COURSE
  // ============================================================

  const handleSelectCourse =
    (course) => {

      if (!course?.id) {

        return;

      }

      setSelectedCourseId(
        course.id
      );

      localStorage.setItem(
        PENDING_ENROLLMENT_KEY,
        String(course.id)
      );

    };


  // ============================================================
  // START PAYMENT
  // ============================================================

  const handlePayment =
    async () => {

      if (!selectedCourse) {

        errorToast(
          "Please select a course first."
        );

        return;

      }


      // ========================================================
      // AUTH CHECK
      // ========================================================

      const user =
        getCurrentUser();


      if (!user) {

        localStorage.setItem(
          PENDING_ENROLLMENT_KEY,
          String(selectedCourse.id)
        );


        navigate(
          "/login",
          {
            state: {
              from: "/enroll/payment",
              courseId:
                selectedCourse.id,
            },
          }
        );

        return;

      }


      // ========================================================
      // START RAZORPAY
      // ========================================================

      try {

        setPaymentLoading(true);


        await openRazorpayCheckout({

          course:
            selectedCourse,


          onSuccess:
            (result) => {

              localStorage.removeItem(
                PENDING_ENROLLMENT_KEY
              );


              successToast(
                result?.message ||
                "Payment successful. Your course is now enrolled."
              );


              navigate(
                "/student/dashboard",
                {
                  replace: true,
                }
              );

            },


          onFailure:
            (error) => {

              console.error(
                "CHECKOUT FAILURE:",
                error
              );


              errorToast(
                error?.message ||
                "Payment could not be completed. Please try again."
              );

              setPaymentLoading(
                false
              );

            },

        });

      }

      catch (error) {

        console.error(
          "PAYMENT START ERROR:",
          error
        );


        errorToast(
          error?.response?.data?.message ||
          error?.message ||
          "Unable to start payment."
        );


        setPaymentLoading(
          false
        );

      }

    };


  // ============================================================
  // LOADING
  // ============================================================

  if (loading) {

    return (

      <div
        className="
          flex
          min-h-screen
          items-center
          justify-center
          bg-[#F5F9FF]
          px-5
        "
      >

        <div className="text-center">

          <div
            className="
              mx-auto
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              bg-[#EAF2FF]
              text-[#1463FF]
            "
          >

            <FaSpinner
              className="animate-spin"
              size={22}
            />

          </div>


          <p
            className="
              mt-5
              font-semibold
              text-[#64748B]
            "
          >

            Loading programs...

          </p>

        </div>

      </div>

    );

  }


  // ============================================================
  // UI
  // ============================================================

  return (

    <div
      className="
        min-h-screen
        bg-[#F5F9FF]
        text-[#111827]
      "
    >

      {/* ========================================================
          HEADER
      ======================================================== */}

      <header
        className="
          sticky
          top-0
          z-50
          border-b
          border-[#E6EDF7]
          bg-white/90
          backdrop-blur-xl
        "
      >

        <div
          className="
            mx-auto
            flex
            h-[72px]
            max-w-7xl
            items-center
            justify-between
            px-5
            lg:px-8
          "
        >

          {/* BACK */}

          <button
            type="button"
            onClick={() =>
              navigate(-1)
            }
            className="
              inline-flex
              items-center
              gap-2
              rounded-xl
              px-3
              py-2
              text-sm
              font-bold
              text-[#64748B]
              transition
              hover:bg-[#F5F9FF]
              hover:text-[#1463FF]
            "
          >

            <FaArrowLeft />

            Back

          </button>


          {/* DATALATTICE BRAND */}

          <div
            className="
              hidden
              items-center
              gap-3
              sm:flex
            "
          >

            <div
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                bg-[#1463FF]
                text-white
              "
            >

              <FaGraduationCap />

            </div>


            <div>

              <p
                className="
                  font-extrabold
                  text-[#0B1B3A]
                "
              >

                DataLattice

              </p>

              <p
                className="
                  text-xs
                  text-[#64748B]
                "
              >

                Enrollment

              </p>

            </div>

          </div>


          {/* SECURE CHECKOUT */}

          <div
            className="
              inline-flex
              items-center
              gap-2
              text-xs
              font-bold
              text-[#64748B]
              sm:text-sm
            "
          >

            <FaShieldAlt
              className="text-[#06B6D4]"
            />

            Secure checkout

          </div>

        </div>

      </header>


      {/* ========================================================
          MAIN
      ======================================================== */}

      <main
        className="
          mx-auto
          max-w-7xl
          px-5
          py-12
          lg:px-8
          lg:py-16
        "
      >

        {/* ======================================================
            HERO
        ====================================================== */}

        <div className="max-w-3xl">

          <p
            className="
              text-sm
              font-extrabold
              uppercase
              tracking-[0.18em]
              text-[#1463FF]
            "
          >

            Start your journey

          </p>


          <h1
            className="
              mt-3
              text-4xl
              font-black
              tracking-tight
              text-[#0B1B3A]
              sm:text-5xl
              lg:text-6xl
            "
          >

            Choose your
            <span
              className="
                text-[#1463FF]
              "
            >
              {" "}learning path.
            </span>

          </h1>


          <p
            className="
              mt-5
              max-w-2xl
              text-base
              leading-7
              text-[#64748B]
              sm:text-lg
            "
          >

            Select a DataLattice program and continue
            to secure Razorpay checkout. Your enrollment
            is created only after the payment is verified
            by our backend.

          </p>

        </div>


        {/* ======================================================
            CONTENT
        ====================================================== */}

        <div
          className="
            mt-12
            grid
            gap-8
            lg:grid-cols-[1fr_380px]
            lg:items-start
          "
        >

          {/* ====================================================
              AVAILABLE PROGRAMS
          ==================================================== */}

          <section>

            <div
              className="
                mb-5
                flex
                items-center
                justify-between
              "
            >

              <div>

                <h2
                  className="
                    text-2xl
                    font-black
                    text-[#0B1B3A]
                  "
                >

                  Available Programs

                </h2>

                <p
                  className="
                    mt-1
                    text-sm
                    text-[#64748B]
                  "
                >

                  Choose the program you want to pursue.

                </p>

              </div>


              {/* ALWAYS REFLECTS THE FILTERED LIST */}

              <span
                className="
                  rounded-full
                  bg-[#EAF2FF]
                  px-4
                  py-2
                  text-sm
                  font-bold
                  text-[#1463FF]
                "
              >

                {courses.length}

              </span>

            </div>


            {courses.length === 0 ? (

              <div
                className="
                  rounded-3xl
                  border
                  border-[#E6EDF7]
                  bg-white
                  p-10
                  text-center
                  shadow-[0_10px_35px_rgba(11,27,58,0.06)]
                "
              >

                <FaBookOpen
                  className="
                    mx-auto
                    text-[#94A3B8]
                  "
                  size={30}
                />

                <h3
                  className="
                    mt-5
                    text-xl
                    font-bold
                    text-[#0B1B3A]
                  "
                >

                  No programs available

                </h3>

                <p
                  className="
                    mt-2
                    text-sm
                    text-[#64748B]
                  "
                >

                  Data Science and Data Analytics
                  programs are currently unavailable.

                </p>

              </div>

            ) : (

              <div
                className="
                  grid
                  gap-5
                  md:grid-cols-2
                "
              >

                {courses.map(
                  (course) => {

                    const isSelected =
                      String(
                        selectedCourseId
                      ) ===
                      String(
                        course.id
                      );


                    const normalizedTitle =
                      normalizeCourseTitle(
                        course.title
                      );


                    const isDataScience =
                      normalizedTitle ===
                      "data science";


                    return (

                      <button
                        key={course.id}
                        type="button"
                        onClick={() =>
                          handleSelectCourse(
                            course
                          )
                        }
                        className={`
                          group
                          relative
                          w-full
                          rounded-3xl
                          border
                          bg-white
                          p-6
                          text-left
                          shadow-[0_10px_35px_rgba(11,27,58,0.06)]
                          transition
                          duration-300
                          hover:-translate-y-1
                          hover:shadow-[0_18px_45px_rgba(20,99,255,0.12)]
                          ${
                            isSelected
                              ? "border-[#1463FF] ring-4 ring-[#1463FF]/10"
                              : "border-[#E6EDF7]"
                          }
                        `}
                      >

                        {/* CHECK */}

                        <div
                          className="
                            absolute
                            right-5
                            top-5
                          "
                        >

                          <div
                            className={`
                              flex
                              h-7
                              w-7
                              items-center
                              justify-center
                              rounded-full
                              ${
                                isSelected
                                  ? "bg-[#1463FF] text-white"
                                  : "bg-[#F5F9FF] text-[#CBD5E1]"
                              }
                            `}
                          >

                            <FaCheckCircle />

                          </div>

                        </div>


                        {/* ICON */}

                        <div
                          className={`
                            flex
                            h-14
                            w-14
                            items-center
                            justify-center
                            rounded-2xl
                            bg-[#EAF2FF]
                            text-xl
                            ${
                              isDataScience
                                ? "text-[#1463FF]"
                                : "text-[#06B6D4]"
                            }
                          `}
                        >

                          {getCourseIcon(
                            course
                          )}

                        </div>


                        {/* TITLE */}

                        <h3
                          className="
                            mt-6
                            pr-10
                            text-xl
                            font-black
                            leading-tight
                            text-[#0B1B3A]
                          "
                        >

                          {course.title}

                        </h3>


                        {/* DESCRIPTION */}

                        <p
                          className="
                            mt-3
                            line-clamp-3
                            min-h-[66px]
                            text-sm
                            leading-6
                            text-[#64748B]
                          "
                        >

                          {course.description ||
                            (
                              isDataScience
                                ? "Master Python, statistics, machine learning, AI and real-world data science projects."
                                : "Learn SQL, Python, Power BI and business analytics through practical projects."
                            )
                          }

                        </p>


                        {/* FOOTER */}

                        <div
                          className="
                            mt-6
                            flex
                            items-center
                            justify-between
                            border-t
                            border-[#E6EDF7]
                            pt-5
                          "
                        >

                          <span
                            className="
                              text-lg
                              font-black
                              text-[#1463FF]
                            "
                          >

                            {formatPrice(
                              course.price
                            )}

                          </span>


                          <span
                            className="
                              text-xs
                              font-bold
                              text-[#64748B]
                              transition
                              group-hover:text-[#1463FF]
                            "
                          >

                            Select

                          </span>

                        </div>

                      </button>

                    );

                  }
                )}

              </div>

            )}

          </section>


          {/* ====================================================
              ORDER SUMMARY
          ==================================================== */}

          <aside
            className="
              lg:sticky
              lg:top-[96px]
            "
          >

            <div
              className="
                overflow-hidden
                rounded-3xl
                border
                border-[#E6EDF7]
                bg-white
                shadow-[0_18px_50px_rgba(11,27,58,0.09)]
              "
            >

              {/* HEADER */}

              <div
                className="
                  bg-[#0B1B3A]
                  p-7
                  text-white
                "
              >

                <p
                  className="
                    text-xs
                    font-bold
                    uppercase
                    tracking-[0.16em]
                    text-blue-200
                  "
                >

                  Enrollment

                </p>


                <h2
                  className="
                    mt-2
                    text-2xl
                    font-black
                  "
                >

                  Order Summary

                </h2>

              </div>


              {/* BODY */}

              <div className="p-7">

                {!selectedCourse ? (

                  <div
                    className="
                      rounded-2xl
                      border
                      border-dashed
                      border-[#CBD5E1]
                      bg-[#F8FAFC]
                      p-6
                      text-center
                    "
                  >

                    <div
                      className="
                        mx-auto
                        flex
                        h-12
                        w-12
                        items-center
                        justify-center
                        rounded-xl
                        bg-[#EAF2FF]
                        text-[#1463FF]
                      "
                    >

                      <FaBookOpen />

                    </div>


                    <p
                      className="
                        mt-4
                        text-sm
                        font-semibold
                        leading-6
                        text-[#64748B]
                      "
                    >

                      Select a program to
                      continue with enrollment.

                    </p>

                  </div>

                ) : (

                  <>

                    {/* SELECTED COURSE */}

                    <div>

                      <p
                        className="
                          text-xs
                          font-bold
                          uppercase
                          tracking-wider
                          text-[#64748B]
                        "
                      >

                        Selected program

                      </p>


                      <h3
                        className="
                          mt-2
                          text-xl
                          font-black
                          leading-tight
                          text-[#0B1B3A]
                        "
                      >

                        {selectedCourse.title}

                      </h3>

                    </div>


                    <div
                      className="
                        my-6
                        h-px
                        bg-[#E6EDF7]
                      "
                    />


                    {/* PRICE */}

                    <div
                      className="
                        flex
                        items-center
                        justify-between
                      "
                    >

                      <span
                        className="
                          text-sm
                          font-medium
                          text-[#64748B]
                        "
                      >

                        Program fee

                      </span>


                      <span
                        className="
                          text-2xl
                          font-black
                          text-[#0B1B3A]
                        "
                      >

                        {formatPrice(
                          selectedCourse.price
                        )}

                      </span>

                    </div>


                    {/* BENEFITS */}

                    <div
                      className="
                        mt-5
                        space-y-3
                      "
                    >

                      {[
                        "Full course access",
                        "Practical projects",
                        "Mentor guidance",
                        "Career support",
                      ].map(
                        (item) => (

                          <div
                            key={item}
                            className="
                              flex
                              items-center
                              gap-3
                              text-sm
                              text-[#475569]
                            "
                          >

                            <FaCheckCircle
                              className="
                                shrink-0
                                text-[#06B6D4]
                              "
                            />

                            {item}

                          </div>

                        )
                      )}

                    </div>


                    {/* PAYMENT BUTTON */}

                    <button
                      type="button"
                      onClick={handlePayment}
                      disabled={
                        paymentLoading
                      }
                      className="
                        mt-8
                        flex
                        w-full
                        items-center
                        justify-center
                        gap-3
                        rounded-2xl
                        bg-[#1463FF]
                        px-5
                        py-4
                        font-black
                        text-white
                        shadow-[0_12px_25px_rgba(20,99,255,0.25)]
                        transition
                        hover:bg-[#0f55dd]
                        disabled:cursor-not-allowed
                        disabled:opacity-60
                      "
                    >

                      {paymentLoading ? (

                        <>

                          <FaSpinner
                            className="animate-spin"
                          />

                          Processing...

                        </>

                      ) : (

                        <>

                          Proceed to Secure Payment

                          <FaArrowRight />

                        </>

                      )}

                    </button>


                    <p
                      className="
                        mt-4
                        text-center
                        text-xs
                        leading-5
                        text-[#94A3B8]
                      "
                    >

                      You will be redirected to
                      Razorpay's secure checkout.

                    </p>

                  </>

                )}

              </div>

            </div>


            {/* ==================================================
                SECURITY
            ================================================== */}

            <div
              className="
                mt-5
                rounded-2xl
                border
                border-[#E6EDF7]
                bg-white
                p-5
              "
            >

              <div
                className="
                  flex
                  gap-3
                "
              >

                <div
                  className="
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    bg-[#EAF2FF]
                    text-[#1463FF]
                  "
                >

                  <FaShieldAlt />

                </div>


                <div>

                  <p
                    className="
                      text-sm
                      font-bold
                      text-[#0B1B3A]
                    "
                  >

                    Secure payment

                  </p>

                  <p
                    className="
                      mt-1
                      text-xs
                      leading-5
                      text-[#64748B]
                    "
                  >

                    Payment verification is handled
                    securely by the DataLattice backend.

                  </p>

                </div>

              </div>

            </div>

          </aside>

        </div>

      </main>


      {/* ========================================================
          FOOTER
      ======================================================== */}

      <footer
        className="
          border-t
          border-[#E6EDF7]
          bg-white
          py-8
        "
      >

        <div
          className="
            mx-auto
            flex
            max-w-7xl
            flex-col
            gap-2
            px-5
            text-center
            text-sm
            text-[#94A3B8]
            sm:flex-row
            sm:items-center
            sm:justify-between
            sm:px-8
            sm:text-left
          "
        >

          <p>
            © {new Date().getFullYear()} DataLattice.
            All rights reserved.
          </p>

          <p>
            Learn. Build. Grow.
          </p>

        </div>

      </footer>

    </div>

  );

}


export default EnrollmentPayment;