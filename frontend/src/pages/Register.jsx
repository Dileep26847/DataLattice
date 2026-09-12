import {
  useState,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  motion,
} from "framer-motion";

import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaArrowLeft,
  FaArrowRight,
  FaGraduationCap,
  FaBookOpen,
  FaUsers,
  FaChartLine,
  FaPhone,
  FaShieldAlt,
  FaCheckCircle,
  FaRedo,
} from "react-icons/fa";

import {
  registerUser,
  requestSignupOtp,
  verifySignupOtp,
} from "../services/authService";

import {
  successToast,
  errorToast,
} from "../utils/toast";

import dataLatticeLogo from "../assets/datalattice-logo.png";


function Register() {

  const navigate =
    useNavigate();


  const [formData, setFormData] =
    useState({

      full_name: "",
      email: "",
      phone: "",
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


  const [otpLoading, setOtpLoading] =
    useState(false);


  const [verifyLoading, setVerifyLoading] =
    useState(false);


  const [otp, setOtp] =
    useState("");


  const [verificationToken, setVerificationToken] =
    useState("");


  const [otpSent, setOtpSent] =
    useState(false);


  const [phoneVerified, setPhoneVerified] =
    useState(false);


  const [otpExpiresAt, setOtpExpiresAt] =
    useState(null);


  const [resendAvailableAt, setResendAvailableAt] =
    useState(null);


  const [resendCountdown, setResendCountdown] =
    useState(0);


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
  // PHONE VALIDATION
  // ============================================================

  const validatePhone = (
    phone
  ) => {

    const value =
      phone.trim();


    if (!value) {

      return "Phone number is required.";

    }


    const digits =
      value.replace(
        /\D/g,
        ""
      );


    if (
      digits.length < 10 ||
      digits.length > 15
    ) {

      return "Please enter a valid phone number.";

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


    if (
      name === "phone" &&
      phoneVerified
    ) {

      setPhoneVerified(false);
      setOtpSent(false);
      setVerificationToken("");
      setOtp("");
      setOtpExpiresAt(null);
      setResendAvailableAt(null);
      setResendCountdown(0);

    }


    setFormData(
      (previous) => ({

        ...previous,

        [name]:
          value,

      })
    );


    setErrors(
      (previous) => ({

        ...previous,

        [name]:
          "",

        form:
          "",

      })
    );

  };


  // ============================================================
  // OTP CHANGE
  // ============================================================

  const handleOtpChange = (
    event
  ) => {

    const value =
      event.target.value
        .replace(
          /\D/g,
          ""
        )
        .slice(
          0,
          6
        );


    setOtp(
      value
    );


    setErrors(
      (previous) => ({

        ...previous,

        otp:
          "",

        form:
          "",

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


    const phoneError =
      validatePhone(
        formData.phone
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


    if (phoneError) {

      newErrors.phone =
        phoneError;

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


    if (
      !phoneVerified
    ) {

      newErrors.phone =
        newErrors.phone ||
        "Please verify your phone number before creating your account.";

    }


    setErrors(
      newErrors
    );


    return (
      Object.keys(newErrors).length === 0
    );

  };


  // ============================================================
  // REQUEST OTP
  // ============================================================

  const handleRequestOtp = async () => {

    const phoneError =
      validatePhone(
        formData.phone
      );


    if (phoneError) {

      setErrors(
        (previous) => ({

          ...previous,

          phone:
            phoneError,

          form:
            "",

        })
      );


      return;

    }


    setOtpLoading(
      true
    );


    setErrors(
      (previous) => ({

        ...previous,

        phone:
          "",

        form:
          "",

      })
    );


    try {

      const data =
        await requestSignupOtp(
          formData.phone.trim()
        );


      setOtpSent(
        true
      );


      setPhoneVerified(
        false
      );


      setVerificationToken(
        ""
      );


      setOtp(
        ""
      );


      setOtpExpiresAt(
        data?.expiresAt ||
        null
      );


      /*
       * The backend currently enforces a 60-second
       * resend cooldown.
       *
       * The countdown is maintained locally for
       * immediate UI feedback.
       */

      const cooldownEnd =
        Date.now() +
        60 * 1000;


      setResendAvailableAt(
        cooldownEnd
      );


      setResendCountdown(
        60
      );


      successToast(
        data?.message ||
        "OTP sent successfully."
      );

    }

    catch (error) {

      console.error(
        "OTP REQUEST ERROR:",
        error
      );


      const message =
        error.response?.data?.message ||
        error.message ||
        "Unable to send OTP.";


      setErrors(
        (previous) => ({

          ...previous,

          phone:
            message,

          form:
            "",

        })
      );


      errorToast(
        message
      );

    }

    finally {

      setOtpLoading(
        false
      );

    }

  };


  // ============================================================
  // VERIFY OTP
  // ============================================================

  const handleVerifyOtp = async () => {

    if (
      otp.length !== 6
    ) {

      setErrors(
        (previous) => ({

          ...previous,

          otp:
            "Please enter the 6-digit verification code.",

        })
      );


      return;

    }


    setVerifyLoading(
      true
    );


    setErrors(
      (previous) => ({

        ...previous,

        otp:
          "",

        form:
          "",

      })
    );


    try {

      const data =
        await verifySignupOtp(

          formData.phone.trim(),

          otp

        );


      if (
        !data?.verificationToken
      ) {

        throw new Error(
          "Phone verification could not be completed."
        );

      }


      setVerificationToken(
        data.verificationToken
      );


      setPhoneVerified(
        true
      );


      setOtpSent(
        true
      );


      setOtpExpiresAt(
        data?.verificationExpiresAt ||
        null
      );


      successToast(
        data?.message ||
        "Phone number verified successfully."
      );

    }

    catch (error) {

      console.error(
        "OTP VERIFICATION ERROR:",
        error
      );


      const message =
        error.response?.data?.message ||
        error.message ||
        "Invalid verification code.";


      setErrors(
        (previous) => ({

          ...previous,

          otp:
            message,

          form:
            "",

        })
      );


      errorToast(
        message
      );

    }

    finally {

      setVerifyLoading(
        false
      );

    }

  };


  // ============================================================
  // RESEND OTP
  // ============================================================

  const handleResendOtp = async () => {

    if (
      resendCountdown > 0
    ) {

      return;

    }


    await handleRequestOtp();

  };


  // ============================================================
  // CHANGE PHONE
  // ============================================================

  const handleChangePhone = () => {

    setPhoneVerified(
      false
    );


    setOtpSent(
      false
    );


    setVerificationToken(
      ""
    );


    setOtp(
      ""
    );


    setOtpExpiresAt(
      null
    );


    setResendAvailableAt(
      null
    );


    setResendCountdown(
      0
    );


    setErrors(
      (previous) => ({

        ...previous,

        phone:
          "",

        otp:
          "",

        form:
          "",

      })
    );

  };


  // ============================================================
  // RESEND COUNTDOWN
  // ============================================================

  useState(() => {

    /*
     * This intentionally uses a self-contained interval
     * initializer so the existing component does not need
     * another lifecycle dependency.
     *
     * The interval is only active while a resend timestamp
     * exists.
     */

    if (!resendAvailableAt) {

      return undefined;

    }


    const interval =
      setInterval(() => {

        const remaining =
          Math.max(
            0,
            Math.ceil(
              (
                resendAvailableAt -
                Date.now()
              ) / 1000
            )
          );


        setResendCountdown(
          remaining
        );


        if (
          remaining <= 0
        ) {

          clearInterval(
            interval
          );

          setResendAvailableAt(
            null
          );

        }

      }, 1000);


    return () =>
      clearInterval(
        interval
      );

  }, [
    resendAvailableAt,
  ]);


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


    setLoading(
      true
    );


    try {

      const data =
        await registerUser({

          full_name:
            formData.full_name.trim(),

          email:
            formData.email
              .trim()
              .toLowerCase(),

          phone:
            formData.phone.trim(),

          password:
            formData.password,

          verificationToken:
            verificationToken,

        });


      successToast(
        data?.message ||
        "Account created successfully."
      );


      setTimeout(() => {

        navigate(
          "/login",
          {
            replace:
              true,
          }
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

        form:
          message,

      });


      errorToast(
        message
      );

    }

    finally {

      setLoading(
        false
      );

    }

  };


  return (

    <div
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-white
      "
    >

      {/* ======================================================
          BACKGROUND
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          overflow-hidden
        "
      >

        <div
          className="
            absolute
            -left-40
            top-10
            h-[500px]
            w-[500px]
            rounded-full
            bg-blue-200/30
            blur-3xl
          "
        />


        <div
          className="
            absolute
            right-[-160px]
            top-20
            h-[550px]
            w-[550px]
            rounded-full
            bg-violet-200/30
            blur-3xl
          "
        />


        <div
          className="
            absolute
            inset-0
            opacity-[0.04]
          "
          style={{
            backgroundImage:
              "linear-gradient(#2563eb 1px, transparent 1px), linear-gradient(90deg, #2563eb 1px, transparent 1px)",
            backgroundSize:
              "46px 46px",
          }}
        />

      </div>


      {/* ======================================================
          MAIN
      ====================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          flex
          min-h-screen
          w-full
          max-w-[1440px]
          items-center
          px-5
          py-10
          sm:px-8
          lg:px-12
          xl:px-16
        "
      >

        <div
          className="
            grid
            w-full
            items-center
            gap-10
            lg:grid-cols-[1fr_470px]
            xl:grid-cols-[1fr_500px]
            xl:gap-20
          "
        >

          {/* ==================================================
              LEFT CONTENT
          ================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              x: -30,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.7,
            }}
            className="
              hidden
              lg:block
            "
          >

            <Link
              to="/"
              className="
                inline-flex
                items-center
                gap-3
              "
            >

              <div
                className="
                  flex
                  h-14
                  w-14
                  shrink-0
                  items-center
                  justify-center
                  overflow-hidden
                "
              >

                <img
                  src={dataLatticeLogo}
                  alt="DataLattice"
                  className="
                    h-full
                    w-full
                    object-contain
                  "
                />

              </div>


              <div>

                <div
                  className="
                    text-3xl
                    font-black
                    tracking-tight
                    bg-gradient-to-r
                    from-blue-700
                    via-blue-600
                    to-violet-600
                    bg-clip-text
                    text-transparent
                  "
                >
                  DataLattice
                </div>


                <div
                  className="
                    mt-1
                    text-[9px]
                    font-semibold
                    tracking-[0.22em]
                    text-slate-400
                  "
                >
                  LEARN • BUILD • GROW
                </div>

              </div>

            </Link>


            <div
              className="
                mt-20
                max-w-[650px]
              "
            >

              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-blue-100
                  bg-blue-50
                  px-4
                  py-2
                  text-sm
                  font-semibold
                  text-blue-700
                "
              >

                <FaGraduationCap />

                Start your learning journey

              </div>


              <h1
                className="
                  mt-7
                  text-6xl
                  font-black
                  leading-[0.98]
                  tracking-[-0.055em]
                  text-slate-950
                  xl:text-7xl
                "
              >

                Learn.

                <br />

                Build.

                <br />

                <span
                  className="
                    bg-gradient-to-r
                    from-blue-600
                    via-violet-600
                    to-purple-600
                    bg-clip-text
                    text-transparent
                  "
                >
                  Grow.
                </span>

              </h1>


              <p
                className="
                  mt-7
                  max-w-[570px]
                  text-lg
                  leading-8
                  text-slate-600
                "
              >
                Create your DataLattice account and start
                building industry-ready skills through
                practical learning, projects, mentorship,
                live classes and career-focused programs.
              </p>


              {/* BENEFITS */}

              <div
                className="
                  mt-9
                  grid
                  max-w-[620px]
                  grid-cols-3
                  gap-4
                "
              >

                <RegisterBenefit
                  icon={<FaBookOpen />}
                  title="Learn"
                  text="Industry-ready curriculum."
                />


                <RegisterBenefit
                  icon={<FaUsers />}
                  title="Build"
                  text="Projects with expert guidance."
                />


                <RegisterBenefit
                  icon={<FaChartLine />}
                  title="Grow"
                  text="Prepare for your career."
                />

              </div>

            </div>

          </motion.div>


          {/* ==================================================
              REGISTER CARD
          ================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              x: 30,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.7,
              delay: 0.1,
            }}
            className="
              relative
              w-full
            "
          >

            {/* Glow */}

            <div
              className="
                pointer-events-none
                absolute
                -inset-5
                rounded-[38px]
                bg-gradient-to-br
                from-blue-300/20
                via-violet-300/20
                to-cyan-300/20
                blur-3xl
              "
            />


            <div
              className="
                relative
                rounded-[30px]
                border
                border-blue-100
                bg-white
                p-6
                shadow-[0_25px_80px_rgba(15,23,42,0.12)]
                sm:p-8
              "
            >

              {/* ==================================================
                  CARD HEADER
              ================================================== */}

              <div
                className="
                  flex
                  items-center
                  gap-3
                "
              >

                <div
                  className="
                    flex
                    h-12
                    w-12
                    shrink-0
                    items-center
                    justify-center
                    overflow-hidden
                  "
                >

                  <img
                    src={dataLatticeLogo}
                    alt="DataLattice"
                    className="
                      h-full
                      w-full
                      object-contain
                    "
                  />

                </div>


                <div>

                  <h2
                    className="
                      text-3xl
                      font-black
                      tracking-tight
                      text-slate-950
                    "
                  >

                    Create your{" "}

                    <span
                      className="
                        bg-gradient-to-r
                        from-blue-600
                        to-violet-600
                        bg-clip-text
                        text-transparent
                      "
                    >
                      account
                    </span>

                  </h2>


                  <p
                    className="
                      mt-1
                      text-sm
                      text-slate-500
                    "
                  >
                    Join DataLattice and start learning today.
                  </p>

                </div>

              </div>


              {/* ==================================================
                  BACK TO HOME
              ================================================== */}

              <Link
                to="/"
                className="
                  mt-5
                  inline-flex
                  items-center
                  gap-2
                  text-xs
                  font-semibold
                  text-slate-400
                  transition-colors
                  hover:text-blue-600
                "
              >

                <FaArrowLeft size={10} />

                Back to Home

              </Link>


              {/* ==================================================
                  SERVER ERROR
              ================================================== */}

              {errors.form && (

                <motion.div
                  initial={{
                    opacity: 0,
                    y: -5,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  className="
                    mt-5
                    rounded-xl
                    border
                    border-red-200
                    bg-red-50
                    px-4
                    py-3
                    text-sm
                    text-red-600
                  "
                >

                  {errors.form}

                </motion.div>

              )}


              {/* ==================================================
                  FORM
              ================================================== */}

              <form
                onSubmit={handleSubmit}
                noValidate
                className="
                  mt-6
                  space-y-4
                "
              >

                {/* NAME */}

                <RegisterInput
                  id="full_name"
                  label="Full name"
                  icon={<FaUser />}
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  autoComplete="name"
                  error={errors.full_name}
                />


                {/* EMAIL */}

                <RegisterInput
                  id="email"
                  label="Email address"
                  icon={<FaEnvelope />}
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  autoComplete="email"
                  error={errors.email}
                />


                {/* PHONE */}

                <div>

                  <label
                    htmlFor="phone"
                    className="
                      mb-2
                      block
                      text-xs
                      font-bold
                      text-slate-700
                    "
                  >
                    Phone number
                  </label>


                  <div
                    className="
                      flex
                      gap-2
                    "
                  >

                    <div className="relative flex-1">

                      <FaPhone
                        className="
                          absolute
                          left-4
                          top-1/2
                          -translate-y-1/2
                          text-slate-400
                        "
                        size={13}
                      />


                      <input
                        id="phone"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 72043 76429"
                        autoComplete="tel"
                        disabled={phoneVerified}
                        className="
                          h-12
                          w-full
                          rounded-xl
                          border
                          border-slate-200
                          bg-white
                          pl-11
                          pr-4
                          text-sm
                          text-slate-800
                          outline-none
                          transition-all
                          duration-200
                          placeholder:text-slate-400
                          focus:border-blue-400
                          focus:ring-4
                          focus:ring-blue-100/60
                          disabled:bg-slate-50
                          disabled:text-slate-500
                        "
                      />

                    </div>


                    {phoneVerified ? (

                      <button
                        type="button"
                        onClick={handleChangePhone}
                        className="
                          h-12
                          shrink-0
                          rounded-xl
                          border
                          border-slate-200
                          bg-white
                          px-4
                          text-xs
                          font-bold
                          text-slate-600
                          transition-colors
                          hover:border-blue-200
                          hover:text-blue-600
                        "
                      >
                        Change
                      </button>

                    ) : (

                      <button
                        type="button"
                        onClick={handleRequestOtp}
                        disabled={
                          otpLoading ||
                          !formData.phone.trim()
                        }
                        className="
                          h-12
                          shrink-0
                          rounded-xl
                          bg-blue-600
                          px-4
                          text-xs
                          font-bold
                          text-white
                          transition-all
                          hover:bg-blue-700
                          disabled:cursor-not-allowed
                          disabled:opacity-50
                        "
                      >

                        {otpLoading
                          ? "Sending..."
                          : otpSent
                            ? "Resend OTP"
                            : "Send OTP"
                        }

                      </button>

                    )}

                  </div>


                  {errors.phone && (

                    <p
                      className="
                        mt-1.5
                        text-xs
                        text-red-500
                      "
                    >
                      {errors.phone}
                    </p>

                  )}


                  {phoneVerified && (

                    <div
                      className="
                        mt-2
                        flex
                        items-center
                        gap-2
                        text-xs
                        font-semibold
                        text-emerald-600
                      "
                    >

                      <FaCheckCircle />

                      Phone number verified

                    </div>

                  )}

                </div>


                {/* ==================================================
                    OTP VERIFICATION
                ================================================== */}

                {otpSent &&
                  !phoneVerified && (

                    <motion.div
                      initial={{
                        opacity: 0,
                        height: 0,
                      }}
                      animate={{
                        opacity: 1,
                        height: "auto",
                      }}
                      className="
                        rounded-2xl
                        border
                        border-blue-100
                        bg-blue-50/60
                        p-4
                      "
                    >

                      <div
                        className="
                          flex
                          items-start
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
                            rounded-xl
                            bg-white
                            text-blue-600
                            shadow-sm
                          "
                        >

                          <FaShieldAlt
                            size={14}
                          />

                        </div>


                        <div
                          className="
                            min-w-0
                            flex-1
                          "
                        >

                          <p
                            className="
                              text-sm
                              font-bold
                              text-slate-900
                            "
                          >
                            Verify your phone
                          </p>


                          <p
                            className="
                              mt-1
                              text-[11px]
                              leading-5
                              text-slate-500
                            "
                          >
                            Enter the 6-digit verification code sent
                            to your phone.
                          </p>

                        </div>

                      </div>


                      <div
                        className="
                          mt-4
                          flex
                          gap-2
                        "
                      >

                        <input
                          type="text"
                          inputMode="numeric"
                          autoComplete="one-time-code"
                          maxLength={6}
                          value={otp}
                          onChange={handleOtpChange}
                          placeholder="000000"
                          aria-label="6-digit verification code"
                          className="
                            h-12
                            min-w-0
                            flex-1
                            rounded-xl
                            border
                            border-slate-200
                            bg-white
                            px-4
                            text-center
                            text-lg
                            font-bold
                            tracking-[0.3em]
                            text-slate-800
                            outline-none
                            transition-all
                            placeholder:text-slate-300
                            focus:border-blue-400
                            focus:ring-4
                            focus:ring-blue-100/60
                          "
                        />


                        <button
                          type="button"
                          onClick={handleVerifyOtp}
                          disabled={
                            verifyLoading ||
                            otp.length !== 6
                          }
                          className="
                            h-12
                            shrink-0
                            rounded-xl
                            bg-blue-600
                            px-5
                            text-xs
                            font-bold
                            text-white
                            transition-all
                            hover:bg-blue-700
                            disabled:cursor-not-allowed
                            disabled:opacity-50
                          "
                        >

                          {verifyLoading
                            ? "Verifying..."
                            : "Verify"
                          }

                        </button>

                      </div>


                      {errors.otp && (

                        <p
                          className="
                            mt-2
                            text-xs
                            text-red-500
                          "
                        >
                          {errors.otp}
                        </p>

                      )}


                      <div
                        className="
                          mt-3
                          flex
                          items-center
                          justify-between
                          gap-3
                        "
                      >

                        <button
                          type="button"
                          onClick={handleChangePhone}
                          className="
                            text-[11px]
                            font-semibold
                            text-slate-500
                            hover:text-blue-600
                          "
                        >
                          Change number
                        </button>


                        <button
                          type="button"
                          onClick={handleResendOtp}
                          disabled={
                            otpLoading ||
                            resendCountdown > 0
                          }
                          className="
                            inline-flex
                            items-center
                            gap-1.5
                            text-[11px]
                            font-bold
                            text-blue-600
                            hover:text-blue-700
                            disabled:cursor-not-allowed
                            disabled:text-slate-400
                          "
                        >

                          <FaRedo
                            size={9}
                          />

                          {resendCountdown > 0
                            ? `Resend in ${resendCountdown}s`
                            : "Resend OTP"
                          }

                        </button>

                      </div>


                      {otpExpiresAt && (

                        <p
                          className="
                            mt-2
                            text-[10px]
                            text-slate-400
                          "
                        >
                          Verification code expires after the
                          server-defined validity period.
                        </p>

                      )}

                    </motion.div>

                  )}


                {/* PASSWORD */}

                <div>

                  <label
                    htmlFor="password"
                    className="
                      mb-2
                      block
                      text-xs
                      font-bold
                      text-slate-700
                    "
                  >
                    Password
                  </label>


                  <div className="relative">

                    <FaLock
                      className="
                        absolute
                        left-4
                        top-1/2
                        -translate-y-1/2
                        text-slate-400
                      "
                      size={13}
                    />


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
                        h-12
                        w-full
                        rounded-xl
                        border
                        border-slate-200
                        bg-white
                        pl-11
                        pr-11
                        text-sm
                        text-slate-800
                        outline-none
                        transition-all
                        placeholder:text-slate-400
                        focus:border-blue-400
                        focus:ring-4
                        focus:ring-blue-100/60
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
                        transition-colors
                        hover:text-blue-600
                      "
                      aria-label={
                        showPassword
                          ? "Hide password"
                          : "Show password"
                      }
                    >

                      {showPassword
                        ? <FaEyeSlash />
                        : <FaEye />
                      }

                    </button>

                  </div>


                  {errors.password && (

                    <p
                      className="
                        mt-1.5
                        text-xs
                        text-red-500
                      "
                    >
                      {errors.password}
                    </p>

                  )}

                </div>


                {/* CONFIRM PASSWORD */}

                <div>

                  <label
                    htmlFor="confirm_password"
                    className="
                      mb-2
                      block
                      text-xs
                      font-bold
                      text-slate-700
                    "
                  >
                    Confirm password
                  </label>


                  <div className="relative">

                    <FaLock
                      className="
                        absolute
                        left-4
                        top-1/2
                        -translate-y-1/2
                        text-slate-400
                      "
                      size={13}
                    />


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
                        h-12
                        w-full
                        rounded-xl
                        border
                        border-slate-200
                        bg-white
                        pl-11
                        pr-11
                        text-sm
                        text-slate-800
                        outline-none
                        transition-all
                        placeholder:text-slate-400
                        focus:border-blue-400
                        focus:ring-4
                        focus:ring-blue-100/60
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
                        transition-colors
                        hover:text-blue-600
                      "
                      aria-label={
                        showConfirmPassword
                          ? "Hide confirm password"
                          : "Show confirm password"
                      }
                    >

                      {showConfirmPassword
                        ? <FaEyeSlash />
                        : <FaEye />
                      }

                    </button>

                  </div>


                  {errors.confirm_password && (

                    <p
                      className="
                        mt-1.5
                        text-xs
                        text-red-500
                      "
                    >
                      {errors.confirm_password}
                    </p>

                  )}

                </div>


                {/* TERMS */}

                <label
                  className="
                    flex
                    cursor-pointer
                    items-start
                    gap-2.5
                    pt-1
                    text-[11px]
                    leading-5
                    text-slate-500
                  "
                >

                  <input
                    type="checkbox"
                    required
                    className="
                      mt-1
                      h-4
                      w-4
                      shrink-0
                      accent-blue-600
                    "
                  />


                  <span>

                    I agree to the{" "}

                    <button
                      type="button"
                      className="
                        font-semibold
                        text-blue-600
                        hover:underline
                      "
                    >
                      Terms & Conditions
                    </button>

                    {" "}and{" "}

                    <button
                      type="button"
                      className="
                        font-semibold
                        text-blue-600
                        hover:underline
                      "
                    >
                      Privacy Policy
                    </button>

                    {" "}of DataLattice.

                  </span>

                </label>


                {/* ==================================================
                    REGISTER BUTTON
                ================================================== */}

                <motion.button
                  type="submit"
                  disabled={
                    loading ||
                    !phoneVerified
                  }
                  whileHover={
                    loading ||
                    !phoneVerified
                      ? {}
                      : {
                          y: -1,
                        }
                  }
                  whileTap={
                    loading ||
                    !phoneVerified
                      ? {}
                      : {
                          scale: 0.985,
                        }
                  }
                  className="
                    mt-2
                    flex
                    h-12
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-gradient-to-r
                    from-blue-600
                    via-indigo-600
                    to-violet-600
                    text-sm
                    font-bold
                    text-white
                    shadow-[0_14px_30px_rgba(37,99,235,0.24)]
                    transition-all
                    duration-300
                    hover:shadow-[0_18px_38px_rgba(37,99,235,0.32)]
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                >

                  {loading
                    ? "Creating account..."
                    : !phoneVerified
                      ? "Verify Phone to Continue"
                      : "Create Account"
                  }


                  {!loading &&
                    phoneVerified && (

                    <FaArrowRight
                      size={13}
                    />

                  )}

                </motion.button>


                {/* LOGIN */}

                <p
                  className="
                    pt-2
                    text-center
                    text-xs
                    text-slate-500
                  "
                >

                  Already have an account?{" "}

                  <Link
                    to="/login"
                    className="
                      font-bold
                      text-blue-600
                      hover:underline
                    "
                  >
                    Sign in
                  </Link>

                </p>

              </form>

            </div>

          </motion.div>

        </div>

      </div>

    </div>

  );

}


// ============================================================
// REGISTER INPUT
// ============================================================

function RegisterInput({
  id,
  label,
  icon,
  type,
  name,
  value,
  onChange,
  placeholder,
  autoComplete,
  error,
}) {

  return (

    <div>

      <label
        htmlFor={id}
        className="
          mb-2
          block
          text-xs
          font-bold
          text-slate-700
        "
      >
        {label}
      </label>


      <div className="relative">

        <span
          className="
            absolute
            left-4
            top-1/2
            z-10
            -translate-y-1/2
            text-slate-400
          "
        >
          {icon}
        </span>


        <input
          id={id}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className="
            h-12
            w-full
            rounded-xl
            border
            border-slate-200
            bg-white
            pl-11
            pr-4
            text-sm
            text-slate-800
            outline-none
            transition-all
            duration-200
            placeholder:text-slate-400
            focus:border-blue-400
            focus:ring-4
            focus:ring-blue-100/60
          "
        />

      </div>


      {error && (

        <p
          className="
            mt-1.5
            text-xs
            text-red-500
          "
        >
          {error}
        </p>

      )}

    </div>

  );

}


// ============================================================
// REGISTER BENEFIT
// ============================================================

function RegisterBenefit({
  icon,
  title,
  text,
}) {

  return (

    <div
      className="
        rounded-2xl
        border
        border-slate-200
        bg-white/80
        p-4
        shadow-sm
        backdrop-blur
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
          bg-blue-50
          text-blue-600
        "
      >
        {icon}
      </div>


      <p
        className="
          mt-3
          text-sm
          font-black
          text-slate-900
        "
      >
        {title}
      </p>


      <p
        className="
          mt-1
          text-[11px]
          leading-5
          text-slate-500
        "
      >
        {text}
      </p>

    </div>

  );

}


export default Register;