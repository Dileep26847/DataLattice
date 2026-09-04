import { useState } from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaArrowLeft,
  FaGraduationCap,
} from "react-icons/fa";

import { registerUser } from "../services/authService";

import {
  successToast,
  errorToast,
} from "../utils/toast";


function Register() {

  const navigate =
    useNavigate();


  const [formData, setFormData] =
    useState({

      full_name: "",
      email: "",
      password: "",
      confirm_password: "",

    });


  const [errors, setErrors] =
    useState({});


  const [showPassword, setShowPassword] =
    useState(false);


  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);


  const [loading, setLoading] =
    useState(false);


  // ============================================================
  // NAME VALIDATION
  // ============================================================

  const validateName = (
    name
  ) => {

    const value =
      name.trim();


    if (!value) {

      return "Full name is required.";

    }


    if (value.length < 2) {

      return "Name must contain at least 2 characters.";

    }


    if (
      !/^[A-Za-zÀ-ÿ\s.'-]+$/.test(
        value
      )
    ) {

      return "Name contains invalid characters.";

    }


    return "";

  };


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


    if (
      !emailRegex.test(value)
    ) {

      return "Please enter a valid email address.";

    }


    return "";

  };


  // ============================================================
  // PASSWORD
  // ============================================================

  const validatePassword = (
    password
  ) => {

    if (!password) {

      return "Password is required.";

    }


    if (password.length < 6) {

      return "Password must be at least 6 characters.";

    }


    return "";

  };


  // ============================================================
  // CHANGE
  // ============================================================

  const handleChange = (
    event
  ) => {

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
        form: "",
      })
    );

  };


  // ============================================================
  // FORM VALIDATION
  // ============================================================

  const validateForm = () => {

    const newErrors = {};


    const nameError =
      validateName(
        formData.full_name
      );


    const emailError =
      validateEmail(
        formData.email
      );


    const passwordError =
      validatePassword(
        formData.password
      );


    if (nameError) {

      newErrors.full_name =
        nameError;

    }


    if (emailError) {

      newErrors.email =
        emailError;

    }


    if (passwordError) {

      newErrors.password =
        passwordError;

    }


    if (
      !formData.confirm_password
    ) {

      newErrors.confirm_password =
        "Please confirm your password.";

    }

    else if (
      formData.password !==
      formData.confirm_password
    ) {

      newErrors.confirm_password =
        "Passwords do not match.";

    }


    setErrors(
      newErrors
    );


    return (
      Object.keys(newErrors).length === 0
    );

  };


  // ============================================================
  // SUBMIT
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
        await registerUser({

          full_name:
            formData.full_name.trim(),

          email:
            formData.email
              .trim()
              .toLowerCase(),

          password:
            formData.password,

        });


      successToast(
        data?.message ||
        "Account created successfully."
      );


      setTimeout(() => {

        navigate(
          "/login",
          { replace: true }
        );

      }, 800);

    }

    catch (error) {

      console.error(
        "REGISTRATION ERROR:",
        error
      );


      const message =
        error.response?.data?.message ||
        error.message ||
        "Registration failed.";


      setErrors({
        form: message,
      });


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


            <div className="mt-20">

              <p className="
                text-sm
                uppercase
                tracking-[0.2em]
                font-semibold
                text-blue-100
              ">
                Start your journey
              </p>


              <h2 className="
                mt-4
                text-5xl
                font-extrabold
                leading-tight
              ">
                Learn.
                <br />
                Build.
                <br />
                Get ahead.
              </h2>


              <p className="
                mt-6
                max-w-md
                text-lg
                leading-8
                text-blue-100
              ">
                Create your Data Lattice account and
                access courses, projects, assignments,
                live classes and certifications.
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
              Everything you need to learn.
            </p>

            <p className="
              mt-1
              text-sm
              text-blue-100
            ">
              One account for your complete learning journey.
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
            mt-8
          ">

            <h2 className="
              text-4xl
              font-extrabold
              text-slate-900
            ">
              Create your account
            </h2>


            <p className="
              mt-3
              text-slate-500
            ">
              Join Data Lattice and start learning today.
            </p>


            {/* SERVER ERROR */}

            {errors.form && (

              <div className="
                mt-6
                rounded-xl
                border
                border-red-200
                bg-red-50
                px-4
                py-3
                text-sm
                text-red-600
              ">

                {errors.form}

              </div>

            )}


            <form
              onSubmit={handleSubmit}
              noValidate
              className="
                mt-8
                space-y-5
              "
            >


              {/* NAME */}

              <div>

                <label
                  htmlFor="full_name"
                  className="
                    block
                    mb-2
                    text-sm
                    font-bold
                    text-slate-700
                  "
                >
                  Full name
                </label>


                <div className="relative">

                  <FaUser className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-slate-400
                  " />


                  <input
                    id="full_name"
                    type="text"
                    name="full_name"
                    value={
                      formData.full_name
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="Enter your full name"
                    autoComplete="name"
                    className="
                      w-full
                      rounded-xl
                      border
                      border-slate-300
                      bg-slate-50
                      py-3.5
                      pl-12
                      pr-4
                      outline-none
                      focus:border-blue-600
                      focus:ring-2
                      focus:ring-blue-100
                    "
                  />

                </div>


                {errors.full_name && (

                  <p className="
                    mt-2
                    text-sm
                    text-red-500
                  ">
                    {errors.full_name}
                  </p>

                )}

              </div>


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
                    value={
                      formData.email
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="you@example.com"
                    autoComplete="email"
                    className="
                      w-full
                      rounded-xl
                      border
                      border-slate-300
                      bg-slate-50
                      py-3.5
                      pl-12
                      pr-4
                      outline-none
                      focus:border-blue-600
                      focus:ring-2
                      focus:ring-blue-100
                    "
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
                    value={
                      formData.password
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="Create a password"
                    autoComplete="new-password"
                    className="
                      w-full
                      rounded-xl
                      border
                      border-slate-300
                      bg-slate-50
                      py-3.5
                      pl-12
                      pr-12
                      outline-none
                      focus:border-blue-600
                      focus:ring-2
                      focus:ring-blue-100
                    "
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


              {/* CONFIRM PASSWORD */}

              <div>

                <label
                  htmlFor="confirm_password"
                  className="
                    block
                    mb-2
                    text-sm
                    font-bold
                    text-slate-700
                  "
                >
                  Confirm password
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
                    id="confirm_password"
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    name="confirm_password"
                    value={
                      formData.confirm_password
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="Confirm your password"
                    autoComplete="new-password"
                    className="
                      w-full
                      rounded-xl
                      border
                      border-slate-300
                      bg-slate-50
                      py-3.5
                      pl-12
                      pr-12
                      outline-none
                      focus:border-blue-600
                      focus:ring-2
                      focus:ring-blue-100
                    "
                  />


                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(
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

                    {showConfirmPassword
                      ? <FaEyeSlash />
                      : <FaEye />
                    }

                  </button>

                </div>


                {errors.confirm_password && (

                  <p className="
                    mt-2
                    text-sm
                    text-red-500
                  ">
                    {errors.confirm_password}
                  </p>

                )}

              </div>


              {/* REGISTER */}

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
                  ? "Creating account..."
                  : "Create Account"
                }

              </button>


              {/* LOGIN */}

              <p className="
                text-center
                text-sm
                text-slate-500
              ">

                Already have an account?{" "}

                <Link
                  to="/login"
                  className="
                    font-bold
                    text-blue-600
                  "
                >
                  Sign in
                </Link>

              </p>

            </form>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Register;