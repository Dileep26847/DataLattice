import { useState } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaArrowLeft,
  FaGraduationCap,
} from "react-icons/fa";

import { loginUser } from "../services/authService";

import {
  successToast,
  errorToast,
} from "../utils/toast";


function Login() {

  const navigate =
    useNavigate();


  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });


  const [errors, setErrors] =
    useState({
      email: "",
      password: "",
    });


  const [showPassword, setShowPassword] =
    useState(false);


  const [loading, setLoading] =
    useState(false);


  // ============================================================
  // EMAIL VALIDATION
  // ============================================================

  const validateEmail = (
    email
  ) => {

    const value =
      email.trim();

    if (!value) {

      return "Email address is required.";

    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (!emailRegex.test(value)) {

      return "Please enter a valid email address.";

    }

    return "";

  };


  // ============================================================
  // CHANGE
  // ============================================================

  const handleChange = (event) => {

    const {
      name,
      value,
    } = event.target;


    setFormData(
      (previous) => ({
        ...previous,
        [name]: value,
      })
    );


    setErrors(
      (previous) => ({
        ...previous,
        [name]: "",
      })
    );

  };


  // ============================================================
  // VALIDATION
  // ============================================================

  const validateForm = () => {

    const emailError =
      validateEmail(
        formData.email
      );


    let passwordError = "";


    if (!formData.password) {

      passwordError =
        "Password is required.";

    }

    else if (
      formData.password.length < 6
    ) {

      passwordError =
        "Password must be at least 6 characters.";

    }


    setErrors({

      email:
        emailError,

      password:
        passwordError,

    });


    return (
      !emailError &&
      !passwordError
    );

  };


  // ============================================================
  // LOGIN
  // ============================================================

  const handleSubmit = async (
    event
  ) => {

    event.preventDefault();


    if (!validateForm()) {

      return;

    }


    setLoading(true);


    try {

      const data =
        await loginUser({

          email:
            formData.email
              .trim()
              .toLowerCase(),

          password:
            formData.password,

        });


      // ========================================================
      // NEVER ACCEPT EMPTY AUTH RESPONSE
      // ========================================================

      if (
        !data ||
        !data.token ||
        !data.user
      ) {

        throw new Error(
          "Invalid authentication response from server."
        );

      }


      // ========================================================
      // SAVE ONLY AFTER SUCCESS
      // ========================================================

      localStorage.setItem(
        "token",
        data.token
      );


      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );


      window.dispatchEvent(
        new Event("Data Lattice-auth-change")
      );


      successToast(
        data.message ||
        "Login successful."
      );

      // ========================================================
// PENDING ENROLLMENT REDIRECT
// ========================================================

const pendingEnrollment =
  localStorage.getItem(
    "datalattice_pending_enrollment"
  );


if (
  pendingEnrollment &&
  data.user.role === "student"
) {

  navigate(
    "/enroll/payment",
    {
      replace: true,
    }
  );

  return;

}


// ========================================================
// ROLE REDIRECT
// ========================================================

if (
  data.user.role === "admin"
) {

  navigate(
    "/admin/dashboard",
    {
      replace: true,
    }
  );

}

else if (
  data.user.role === "student"
) {

  navigate(
    "/student/dashboard",
    {
      replace: true,
    }
  );

}

else if (
  data.user.role === "mentor"
) {

  navigate(
    "/mentor/dashboard",
    {
      replace: true,
    }
  );

}

else {

  navigate(
    "/",
    {
      replace: true,
    }
  );

}


      // ========================================================
      // ROLE REDIRECT
      // ========================================================

      if (
        data.user.role === "admin"
      ) {

        navigate(
          "/admin/dashboard",
          { replace: true }
        );

      }

      else if (
        data.user.role === "student"
      ) {

        navigate(
          "/student/dashboard",
          { replace: true }
        );

      }

      else if (
        data.user.role === "mentor"
      ) {

        navigate(
          "/mentor/dashboard",
          { replace: true }
        );

      }

      else {

        navigate(
          "/",
          { replace: true }
        );

      }

    }

    catch (error) {

      console.error(
        "LOGIN ERROR:",
        error
      );


      // ========================================================
      // IMPORTANT:
      // NEVER KEEP AUTH DATA AFTER FAILED LOGIN
      // ========================================================

      localStorage.removeItem(
        "token"
      );

      localStorage.removeItem(
        "user"
      );


      const message =
        error.response?.data?.message ||
        error.message ||
        "Invalid email or password.";


      errorToast(
        message
      );

    }

    finally {

      setLoading(false);

    }

  };


  return (

    <div className="
      min-h-screen
      bg-slate-50
      flex
      items-center
      justify-center
      px-4
      py-10
    ">

      <div className="
        w-full
        max-w-6xl
        bg-white
        rounded-3xl
        shadow-xl
        overflow-hidden
        grid
        lg:grid-cols-2
      ">


        {/* =====================================================
            LEFT PANEL
        ====================================================== */}

        <div className="
          hidden
          lg:flex
          flex-col
          justify-between
          p-12
          text-white
          bg-gradient-to-br
          from-blue-600
          via-indigo-600
          to-violet-600
        ">

          <div>

            <div className="
              flex
              items-center
              gap-3
            ">

              <div className="
                w-12
                h-12
                rounded-2xl
                bg-white/15
                flex
                items-center
                justify-center
                text-2xl
              ">

                <FaGraduationCap />

              </div>


              <div>

                <h1 className="
                  text-2xl
                  font-extrabold
                ">
                  Data Lattice
                </h1>

                <p className="
                  text-sm
                  text-blue-100
                ">
                  Learn Without Limits
                </p>

              </div>

            </div>


            <div className="mt-24">

              <p className="
                text-sm
                uppercase
                tracking-[0.2em]
                font-semibold
                text-blue-100
              ">
                Data Lattice LMS
              </p>


              <h2 className="
                mt-4
                text-6xl
                font-extrabold
                leading-tight
              ">
                Learn.
                <br />
                Build.
                <br />
                Grow.
              </h2>


              <p className="
                mt-6
                max-w-md
                text-lg
                leading-8
                text-blue-100
              ">
                Access your courses, live classes,
                assignments, projects and learning
                progress from one place.
              </p>

            </div>

          </div>


          <div className="
            rounded-2xl
            border
            border-white/20
            bg-white/10
            p-5
          ">

            <p className="font-bold">
              Your learning journey continues here.
            </p>

            <p className="
              mt-1
              text-sm
              text-blue-100
            ">
              Sign in to access Data Lattice LMS.
            </p>

          </div>

        </div>


        {/* =====================================================
            RIGHT PANEL
        ====================================================== */}

        <div className="
          p-7
          sm:p-10
          lg:p-14
        ">

          <Link
            to="/"
            className="
              inline-flex
              items-center
              gap-2
              text-sm
              font-semibold
              text-slate-500
              hover:text-blue-600
            "
          >

            <FaArrowLeft />

            Back to Home

          </Link>


          <div className="
            max-w-md
            mx-auto
            mt-12
          ">

            <h2 className="
              text-4xl
              font-extrabold
              text-slate-900
            ">
              Welcome back 👋
            </h2>


            <p className="
              mt-3
              text-slate-500
            ">
              Sign in to continue your learning journey.
            </p>


            <form
              onSubmit={handleSubmit}
              noValidate
              className="
                mt-9
                space-y-6
              "
            >


              {/* EMAIL */}

              <div>

                <label
                  htmlFor="email"
                  className="
                    block
                    mb-2
                    text-sm
                    font-bold
                    text-slate-700
                  "
                >
                  Email address
                </label>


                <div className="relative">

                  <FaEnvelope className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-slate-400
                  " />


                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    autoComplete="email"
                    className={`
                      w-full
                      rounded-xl
                      border
                      bg-slate-50
                      py-4
                      pl-12
                      pr-4
                      outline-none
                      transition
                      ${
                        errors.email
                          ? "border-red-400 focus:ring-2 focus:ring-red-100"
                          : "border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                      }
                    `}
                  />

                </div>


                {errors.email && (

                  <p className="
                    mt-2
                    text-sm
                    text-red-500
                  ">
                    {errors.email}
                  </p>

                )}

              </div>


              {/* PASSWORD */}

              <div>

                <label
                  htmlFor="password"
                  className="
                    block
                    mb-2
                    text-sm
                    font-bold
                    text-slate-700
                  "
                >
                  Password
                </label>


                <div className="relative">

                  <FaLock className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-slate-400
                  " />


                  <input
                    id="password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    className={`
                      w-full
                      rounded-xl
                      border
                      bg-slate-50
                      py-4
                      pl-12
                      pr-12
                      outline-none
                      transition
                      ${
                        errors.password
                          ? "border-red-400 focus:ring-2 focus:ring-red-100"
                          : "border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                      }
                    `}
                  />


                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        (previous) =>
                          !previous
                      )
                    }
                    className="
                      absolute
                      right-4
                      top-1/2
                      -translate-y-1/2
                      text-slate-400
                      hover:text-blue-600
                    "
                  >

                    {showPassword
                      ? <FaEyeSlash />
                      : <FaEye />
                    }

                  </button>

                </div>


                {errors.password && (

                  <p className="
                    mt-2
                    text-sm
                    text-red-500
                  ">
                    {errors.password}
                  </p>

                )}

              </div>


              {/* SUBMIT */}

              <button
                type="submit"
                disabled={loading}
                className="
                  w-full
                  rounded-xl
                  bg-blue-600
                  py-4
                  text-white
                  font-bold
                  shadow-lg
                  shadow-blue-600/20
                  hover:bg-blue-700
                  transition
                  disabled:opacity-60
                  disabled:cursor-not-allowed
                "
              >

                {loading
                  ? "Signing in..."
                  : "Sign In"
                }

              </button>


              {/* REGISTER */}

              <p className="
                text-center
                text-sm
                text-slate-500
              ">

                Don't have an account?{" "}

                <Link
                  to="/register"
                  className="
                    font-bold
                    text-blue-600
                    hover:text-blue-700
                  "
                >
                  Create an account
                </Link>

              </p>

            </form>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Login;