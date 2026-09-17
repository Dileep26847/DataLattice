import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
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
  verifySignupOtp,
} from "../services/authService";
import {
  successToast,
  errorToast,
} from "../utils/toast";
import dataLatticeLogo from "../assets/datalattice-logo.png";

const MSG91_WIDGET_ID =
  import.meta.env.VITE_MSG91_WIDGET_ID;

const MSG91_WIDGET_TOKEN =
  import.meta.env.VITE_MSG91_WIDGET_TOKEN;

const MSG91_WIDGET_SCRIPT_ID =
  "datalattice-msg91-otp-script";

const MSG91_WIDGET_SCRIPT_URL =
  "https://verify.msg91.com/otp-provider.js";

const MSG91_INIT_KEY =
  "__datalatticeMsg91Initialized";

const OTP_EXPIRY_SECONDS = 15 * 60;
const RESEND_SECONDS = 60;

const getNestedValue = (data, paths = []) => {
  for (const path of paths) {
    let current = data;

    for (const key of path.split(".")) {
      if (current == null) {
        current = undefined;
        break;
      }

      current = current[key];
    }

    if (
      current !== undefined &&
      current !== null &&
      current !== ""
    ) {
      return current;
    }
  }

  return null;
};

/*
 * MSG91 custom Web SDK can return the OTP request
 * identifier in `message`.
 *
 * Example:
 * {
 *   type: "success",
 *   message: "REQUEST_ID"
 * }
 */
const extractMsg91RequestId = (data) => {
  if (!data) {
    return null;
  }

  if (typeof data === "string") {
    return data;
  }

  return getNestedValue(data, [
    "reqId",
    "req_id",
    "request_id",
    "requestId",
    "message",
    "data.reqId",
    "data.req_id",
    "data.request_id",
    "data.requestId",
    "data.message",
  ]);
};

const extractMsg91AccessToken = (data) => {
  if (!data) {
    return null;
  }

  if (typeof data === "string") {
    return data;
  }

  return getNestedValue(data, [
    "access-token",
    "accessToken",
    "access_token",
    "token",
    "data.access-token",
    "data.accessToken",
    "data.access_token",
    "data.token",
    "message",
    "data.message",
  ]);
};

const areMsg91MethodsReady = () => {
  return (
    typeof window !== "undefined" &&
    typeof window.sendOtp === "function" &&
    typeof window.verifyOtp === "function" &&
    typeof window.retryOtp === "function"
  );
};

const getFriendlyMsg91Error = (error) => {
  if (!error) {
    return "Unable to complete OTP verification.";
  }

  if (typeof error === "string") {
    return error;
  }

  return (
    error?.message ||
    error?.error ||
    error?.description ||
    error?.data?.message ||
    "Unable to complete OTP verification."
  );
};

const validateName = (value) => {
  const name = value.trim();

  if (!name) {
    return "Full name is required.";
  }

  if (
    !/^[A-Za-zÀ-ÿ][A-Za-zÀ-ÿ\s.'-]{1,49}$/.test(
      name
    )
  ) {
    return "Please enter a valid name.";
  }

  return "";
};

const validateEmail = (value) => {
  const email = value.trim();

  if (!email) {
    return "Email address is required.";
  }

  if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      email
    )
  ) {
    return "Please enter a valid email address.";
  }

  return "";
};

const validatePhone = (value) => {
  const digits = value.replace(/\D/g, "");

  if (!digits) {
    return "Phone number is required.";
  }

  if (
    digits.length < 10 ||
    digits.length > 15
  ) {
    return "Please enter a valid phone number.";
  }

  return "";
};

/*
 * The previous Register.jsx referenced validatePassword()
 * without defining it. That caused a runtime error.
 *
 * We keep the client-side requirement simple:
 * minimum 8 characters.
 */
const validatePassword = (value) => {
  if (!value) {
    return "Password is required.";
  }

  if (value.length < 8) {
    return "Password must contain at least 8 characters.";
  }

  return "";
};

const getInternationalPhone = (phone) => {
  const raw = phone.trim();

  if (raw.startsWith("+")) {
    return raw;
  }

  const digits = raw.replace(/\D/g, "");

  /*
   * Existing registration behavior:
   * exactly 10 digits = Indian number.
   */
  if (digits.length === 10) {
    return `+91${digits}`;
  }

  return `+${digits}`;
};

const getMsg91Identifier = (internationalPhone) => {
  return internationalPhone.replace(/\+/g, "");
};

export default function Register() {
  const navigate = useNavigate();

  const otpInputRef = useRef(null);

  const [msg91Ready, setMsg91Ready] =
    useState(false);

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    password: "",
    confirm_password: "",
  });

  const [errors, setErrors] = useState({});

  const [showPassword, setShowPassword] =
    useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  const [loading, setLoading] =
    useState(false);

  const [otpLoading, setOtpLoading] =
    useState(false);

  const [verifyLoading, setVerifyLoading] =
    useState(false);

  const [otp, setOtp] = useState("");

  const [
    msg91RequestId,
    setMsg91RequestId,
  ] = useState(null);

  const [
    verificationToken,
    setVerificationToken,
  ] = useState("");

  const [otpSent, setOtpSent] =
    useState(false);

  const [phoneVerified, setPhoneVerified] =
    useState(false);

  const [
    otpExpiresAt,
    setOtpExpiresAt,
  ] = useState(null);

  const [
    remainingSeconds,
    setRemainingSeconds,
  ] = useState(0);

  const [
    resendAvailableAt,
    setResendAvailableAt,
  ] = useState(null);

  const [
    resendCountdown,
    setResendCountdown,
  ] = useState(0);

  /*
   * ------------------------------------------------------------
   * MSG91 SDK INITIALIZATION
   * ------------------------------------------------------------
   */
  useEffect(() => {
    let intervalId;
    let attempts = 0;
    let cancelled = false;

    const finishIfReady = () => {
      if (cancelled) {
        return true;
      }

      if (areMsg91MethodsReady()) {
        setMsg91Ready(true);

        if (intervalId) {
          clearInterval(intervalId);
        }

        return true;
      }

      return false;
    };

    const initialize = () => {
      if (cancelled) {
        return;
      }

      if (finishIfReady()) {
        return;
      }

      if (
        typeof window.initSendOTP !==
        "function"
      ) {
        attempts += 1;

        if (attempts >= 100) {
          if (intervalId) {
            clearInterval(intervalId);
          }

          console.error(
            "MSG91 OTP SDK initialization function was not found."
          );

          setMsg91Ready(false);
        }

        return;
      }

      try {
        /*
         * HeroSignupCard and Register can both exist
         * in the application. This global guard prevents
         * the same MSG91 widget from being initialized
         * multiple times.
         */
        if (!window[MSG91_INIT_KEY]) {
          window.initSendOTP({
            widgetId: MSG91_WIDGET_ID,
            tokenAuth: MSG91_WIDGET_TOKEN,
            identifier: "",
            exposeMethods: true,
            success: () => {},
            failure: (sdkError) => {
              console.error(
                "MSG91 widget initialization error:",
                sdkError
              );
            },
          });

          window[MSG91_INIT_KEY] = true;
        }
      } catch (sdkError) {
        console.error(
          "MSG91 widget initialization exception:",
          sdkError
        );
      }

      attempts += 1;

      finishIfReady();
    };

    const existingScript =
      document.getElementById(
        MSG91_WIDGET_SCRIPT_ID
      );

    if (!existingScript) {
      const script =
        document.createElement("script");

      script.id =
        MSG91_WIDGET_SCRIPT_ID;

      script.src =
        MSG91_WIDGET_SCRIPT_URL;

      script.async = true;

      script.onload = () => {
        initialize();
      };

      script.onerror = () => {
        console.error(
          "Unable to load MSG91 OTP SDK."
        );

        setMsg91Ready(false);
      };

      document.body.appendChild(
        script
      );
    }

    intervalId = window.setInterval(
      initialize,
      100
    );

    initialize();

    return () => {
      cancelled = true;

      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, []);

  /*
   * ------------------------------------------------------------
   * OTP EXPIRY TIMER
   * ------------------------------------------------------------
   */
  useEffect(() => {
    if (!otpExpiresAt) {
      return undefined;
    }

    const updateCountdown = () => {
      const seconds = Math.max(
        0,
        Math.ceil(
          (otpExpiresAt - Date.now()) /
            1000
        )
      );

      setRemainingSeconds(seconds);

      if (seconds <= 0) {
        setOtpExpiresAt(null);
      }
    };

    updateCountdown();

    const interval =
      window.setInterval(
        updateCountdown,
        1000
      );

    return () => {
      clearInterval(interval);
    };
  }, [otpExpiresAt]);

  /*
   * ------------------------------------------------------------
   * RESEND TIMER
   * ------------------------------------------------------------
   */
  useEffect(() => {
    if (!resendAvailableAt) {
      return undefined;
    }

    const updateCountdown = () => {
      const seconds = Math.max(
        0,
        Math.ceil(
          (resendAvailableAt - Date.now()) /
            1000
        )
      );

      setResendCountdown(seconds);

      if (seconds <= 0) {
        setResendAvailableAt(null);
      }
    };

    updateCountdown();

    const interval =
      window.setInterval(
        updateCountdown,
        1000
      );

    return () => {
      clearInterval(interval);
    };
  }, [resendAvailableAt]);

  /*
   * ------------------------------------------------------------
   * OTP INPUT FOCUS
   * ------------------------------------------------------------
   */
  useEffect(() => {
    if (otpSent && !phoneVerified) {
      window.setTimeout(() => {
        otpInputRef.current?.focus();
      }, 150);
    }
  }, [otpSent, phoneVerified]);

  /*
   * ------------------------------------------------------------
   * FORM CHANGE
   * ------------------------------------------------------------
   */
  const handleChange = (event) => {
    const {
      name,
      value,
    } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
      submit: "",
    }));
  };

  /*
   * ------------------------------------------------------------
   * OTP CHANGE
   * ------------------------------------------------------------
   */
  const handleOtpChange = (event) => {
    const digits =
      event.target.value.replace(
        /\D/g,
        ""
      );

    setOtp(
      digits.slice(0, 6)
    );

    setErrors((previous) => ({
      ...previous,
      otp: "",
    }));
  };

  /*
   * ------------------------------------------------------------
   * FORM VALIDATION
   * ------------------------------------------------------------
   */
  const validateForm = () => {
    const nextErrors = {};

    const nameError =
      validateName(
        formData.full_name
      );

    if (nameError) {
      nextErrors.full_name =
        nameError;
    }

    const emailError =
      validateEmail(
        formData.email
      );

    if (emailError) {
      nextErrors.email =
        emailError;
    }

    const phoneError =
      validatePhone(
        formData.phone
      );

    if (phoneError) {
      nextErrors.phone =
        phoneError;
    }

    const passwordError =
      validatePassword(
        formData.password
      );

    if (passwordError) {
      nextErrors.password =
        passwordError;
    }

    if (
      !formData.confirm_password
    ) {
      nextErrors.confirm_password =
        "Please confirm your password.";
    } else if (
      formData.password !==
      formData.confirm_password
    ) {
      nextErrors.confirm_password =
        "Passwords do not match.";
    }

    setErrors(nextErrors);

    return (
      Object.keys(nextErrors).length ===
      0
    );
  };

  /*
   * ------------------------------------------------------------
   * REQUEST OTP
   * ------------------------------------------------------------
   */
  const handleRequestOtp = () => {
    setErrors((previous) => ({
      ...previous,
      submit: "",
    }));

    const valid = validateForm();

    if (!valid) {
      return;
    }

    if (phoneVerified) {
      return;
    }

    if (
      !MSG91_WIDGET_ID ||
      !MSG91_WIDGET_TOKEN
    ) {
      setErrors((previous) => ({
        ...previous,
        submit:
          "OTP service is not configured. Please contact support.",
      }));

      console.error(
        "Missing VITE_MSG91_WIDGET_ID or VITE_MSG91_WIDGET_TOKEN."
      );

      return;
    }

    if (
      !msg91Ready ||
      !areMsg91MethodsReady()
    ) {
      setErrors((previous) => ({
        ...previous,
        submit:
          "OTP service is still loading. Please wait a moment and try again.",
      }));

      return;
    }

    const internationalPhone =
      getInternationalPhone(
        formData.phone
      );

    const identifier =
      getMsg91Identifier(
        internationalPhone
      );

    setOtpLoading(true);

    try {
      window.sendOtp(
        identifier,
        (data) => {
          console.log(
            "MSG91 REGISTER OTP REQUEST SUCCESS:",
            data
          );

          const requestId =
            extractMsg91RequestId(
              data
            );

          /*
           * CRITICAL:
           *
           * MSG91 can return the request ID
           * as:
           *
           * data.message
           *
           * Do not remove the message fallback.
           */

          if (!requestId) {
            console.error(
              "MSG91 OTP response did not contain a request ID:",
              data
            );

            setOtpLoading(false);

            setErrors((previous) => ({
              ...previous,
              submit:
                "OTP was sent, but the verification session could not be created. Please try again.",
            }));

            return;
          }

          setMsg91RequestId(
            requestId
          );

          setOtp("");

          setOtpSent(true);

          setPhoneVerified(false);

          setVerificationToken("");

          setOtpExpiresAt(
            Date.now() +
              OTP_EXPIRY_SECONDS *
                1000
          );

          setResendAvailableAt(
            Date.now() +
              RESEND_SECONDS *
                1000
          );

          setRemainingSeconds(
            OTP_EXPIRY_SECONDS
          );

          setResendCountdown(
            RESEND_SECONDS
          );

          setOtpLoading(false);

          successToast(
            "OTP sent successfully."
          );
        },
        (sdkError) => {
          console.error(
            "MSG91 REGISTER OTP REQUEST ERROR:",
            sdkError
          );

          setOtpLoading(false);

          setErrors((previous) => ({
            ...previous,
            submit:
              getFriendlyMsg91Error(
                sdkError
              ),
          }));
        }
      );
    } catch (sdkError) {
      console.error(
        "MSG91 register sendOtp exception:",
        sdkError
      );

      setOtpLoading(false);

      setErrors((previous) => ({
        ...previous,
        submit:
          getFriendlyMsg91Error(
            sdkError
          ),
      }));
    }
  };

  /*
   * ------------------------------------------------------------
   * VERIFY OTP
   * ------------------------------------------------------------
   */
  const handleVerifyOtp = () => {
    setErrors((previous) => ({
      ...previous,
      otp: "",
    }));

    const cleanOtp =
      otp.replace(/\D/g, "");

    if (
      cleanOtp.length !== 4 &&
      cleanOtp.length !== 6
    ) {
      setErrors((previous) => ({
        ...previous,
        otp:
          "Please enter the OTP sent to your phone.",
      }));

      return;
    }

    if (!msg91RequestId) {
      setErrors((previous) => ({
        ...previous,
        otp:
          "Your OTP session is no longer available. Please request a new OTP.",
      }));

      return;
    }

    if (
      otpExpiresAt &&
      Date.now() > otpExpiresAt
    ) {
      setErrors((previous) => ({
        ...previous,
        otp:
          "This OTP has expired. Please request a new OTP.",
      }));

      return;
    }

    if (
      typeof window.verifyOtp !==
      "function"
    ) {
      setErrors((previous) => ({
        ...previous,
        otp:
          "OTP verification service is not ready. Please refresh and try again.",
      }));

      return;
    }

    const internationalPhone =
      getInternationalPhone(
        formData.phone
      );

    setVerifyLoading(true);

    try {
      window.verifyOtp(
        Number(cleanOtp),
        (data) => {
          console.log(
            "MSG91 REGISTER OTP VERIFY SUCCESS:",
            data
          );

          const accessToken =
            extractMsg91AccessToken(
              data
            );

          if (!accessToken) {
            console.error(
              "MSG91 verification succeeded but access token was not found:",
              data
            );

            setVerifyLoading(false);

            setErrors((previous) => ({
              ...previous,
              otp:
                "OTP was verified, but the verification token was not returned. Please try again.",
            }));

            return;
          }

          verifySignupOtp(
            internationalPhone,
            cleanOtp,
            accessToken
          )
            .then((response) => {
              if (
                !response?.verificationToken
              ) {
                throw new Error(
                  "DataLattice verification token was not returned."
                );
              }

              setVerificationToken(
                response.verificationToken
              );

              setPhoneVerified(
                true
              );

              setOtpSent(true);

              setOtpExpiresAt(null);

              setRemainingSeconds(
                0
              );

              setVerifyLoading(
                false
              );

              successToast(
                "Phone number verified successfully."
              );
            })
            .catch(
              (backendError) => {
                console.error(
                  "DataLattice signup OTP verification error:",
                  backendError
                );

                setVerifyLoading(
                  false
                );

                setErrors(
                  (previous) => ({
                    ...previous,
                    otp:
                      backendError
                        ?.response
                        ?.data
                        ?.message ||
                      backendError?.message ||
                      "Phone verification could not be completed. Please try again.",
                  })
                );
              }
            );
        },
        (sdkError) => {
          console.error(
            "MSG91 REGISTER OTP VERIFY ERROR:",
            sdkError
          );

          setVerifyLoading(false);

          setErrors((previous) => ({
            ...previous,
            otp:
              getFriendlyMsg91Error(
                sdkError
              ),
          }));
        },
        msg91RequestId
      );
    } catch (sdkError) {
      console.error(
        "MSG91 register verifyOtp exception:",
        sdkError
      );

      setVerifyLoading(false);

      setErrors((previous) => ({
        ...previous,
        otp:
          getFriendlyMsg91Error(
            sdkError
          ),
      }));
    }
  };

  /*
   * ------------------------------------------------------------
   * RESEND OTP
   * ------------------------------------------------------------
   */
  const handleResendOtp = () => {
    if (
      resendCountdown > 0 ||
      !msg91RequestId
    ) {
      return;
    }

    setErrors((previous) => ({
      ...previous,
      otp: "",
    }));

    if (
      typeof window.retryOtp !==
      "function"
    ) {
      setErrors((previous) => ({
        ...previous,
        otp:
          "OTP resend service is not ready. Please try again.",
      }));

      return;
    }

    setVerifyLoading(false);

    try {
      window.retryOtp(
        "11",
        (data) => {
          console.log(
            "MSG91 REGISTER OTP RESEND SUCCESS:",
            data
          );

          const newRequestId =
            extractMsg91RequestId(
              data
            );

          if (newRequestId) {
            setMsg91RequestId(
              newRequestId
            );
          }

          setOtp("");

          setOtpExpiresAt(
            Date.now() +
              OTP_EXPIRY_SECONDS *
                1000
          );

          setResendAvailableAt(
            Date.now() +
              RESEND_SECONDS *
                1000
          );

          setRemainingSeconds(
            OTP_EXPIRY_SECONDS
          );

          setResendCountdown(
            RESEND_SECONDS
          );

          successToast(
            "A new OTP has been sent."
          );
        },
        (sdkError) => {
          console.error(
            "MSG91 REGISTER OTP RESEND ERROR:",
            sdkError
          );

          setErrors((previous) => ({
            ...previous,
            otp:
              getFriendlyMsg91Error(
                sdkError
              ),
          }));
        },
        msg91RequestId
      );
    } catch (sdkError) {
      console.error(
        "MSG91 register retryOtp exception:",
        sdkError
      );

      setErrors((previous) => ({
        ...previous,
        otp:
          getFriendlyMsg91Error(
            sdkError
          ),
      }));
    }
  };

  /*
   * ------------------------------------------------------------
   * CHANGE PHONE
   * ------------------------------------------------------------
   */
  const handleChangePhone = () => {
    setOtpSent(false);

    setPhoneVerified(false);

    setMsg91RequestId(null);

    setVerificationToken("");

    setOtp("");

    setOtpExpiresAt(null);

    setResendAvailableAt(null);

    setRemainingSeconds(0);

    setResendCountdown(0);

    setErrors({});
  };

  /*
   * ------------------------------------------------------------
   * SUBMIT REGISTRATION
   * ------------------------------------------------------------
   */
  const handleSubmit = async (event) => {
    event.preventDefault();

    setErrors((previous) => ({
      ...previous,
      submit: "",
    }));

    if (!validateForm()) {
      return;
    }

    if (!phoneVerified) {
      setErrors((previous) => ({
        ...previous,
        submit:
          "Please verify your phone number with OTP before creating your account.",
      }));

      return;
    }

    if (!verificationToken) {
      setErrors((previous) => ({
        ...previous,
        submit:
          "Phone verification is incomplete. Please verify your phone number again.",
      }));

      return;
    }

    setLoading(true);

    try {
      await registerUser({
        full_name:
          formData.full_name.trim(),

        email:
          formData.email.trim(),

        phone:
          getInternationalPhone(
            formData.phone
          ),

        password:
          formData.password,

        verificationToken,
      });

      successToast(
        "Account created successfully."
      );

      navigate("/login");
    } catch (registrationError) {
      console.error(
        "Registration error:",
        registrationError
      );

      const message =
        registrationError
          ?.response
          ?.data
          ?.message ||
        registrationError?.message ||
        "Registration failed. Please try again.";

      setErrors((previous) => ({
        ...previous,
        submit: message,
      }));

      errorToast(message);
    } finally {
      setLoading(false);
    }
  };

  const formatTimer = () => {
    const minutes = Math.floor(
      remainingSeconds / 60
    );

    const seconds =
      remainingSeconds % 60;

    return `${minutes}:${String(
      seconds
    ).padStart(2, "0")}`;
  };

  const inputClass =
    "w-full h-[52px] rounded-xl border bg-white px-4 text-sm outline-none transition focus:ring-4";

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(180deg, #F7FAFF 0%, #FFFFFF 55%, #F7FAFF 100%)",
      }}
    >
      <div className="mx-auto flex min-h-screen max-w-[1250px] flex-col px-5 py-6 sm:px-8 lg:px-10">
        {/* HEADER */}
        <header className="flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center"
          >
            <img
              src={dataLatticeLogo}
              alt="DataLattice"
              className="h-9 w-auto"
            />
          </Link>

          <Link
            to="/login"
            className="text-sm font-semibold"
            style={{
              color: "#0C5FF5",
            }}
          >
            Already have an account?
          </Link>
        </header>

        {/* MAIN */}
        <main className="flex flex-1 items-center py-10 lg:py-14">
          <div className="grid w-full gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            {/* LEFT */}
            <motion.section
              initial={{
                opacity: 0,
                x: -20,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.55,
              }}
              className="max-w-[520px]"
            >
              <div
                className="mb-5 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-bold"
                style={{
                  borderColor: "#CFE0FA",
                  background: "#EFF6FF",
                  color: "#0C5FF5",
                }}
              >
                <FaGraduationCap
                  size={13}
                />
                DataLattice Learning
              </div>

              <h1
                className="text-4xl font-extrabold tracking-tight sm:text-5xl"
                style={{
                  color: "#0A1832",
                }}
              >
                Build the skills
                <span
                  className="block"
                  style={{
                    background:
                      "linear-gradient(90deg, #0C5FF5, #0289F9, #3531E7)",
                    WebkitBackgroundClip:
                      "text",
                    WebkitTextFillColor:
                      "transparent",
                  }}
                >
                  that move you forward.
                </span>
              </h1>

              <p
                className="mt-5 max-w-[470px] text-base leading-7"
                style={{
                  color: "#66758B",
                }}
              >
                Create your DataLattice
                account and start exploring
                practical learning paths built
                around data, projects and
                career-ready skills.
              </p>

              <div className="mt-9 space-y-5">
                <div className="flex gap-4">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                    style={{
                      background:
                        "#EAF3FF",
                      color: "#0C5FF5",
                    }}
                  >
                    <FaBookOpen
                      size={15}
                    />
                  </div>

                  <div>
                    <h3
                      className="text-sm font-bold"
                      style={{
                        color: "#0A1832",
                      }}
                    >
                      Practical programs
                    </h3>

                    <p
                      className="mt-1 text-sm leading-6"
                      style={{
                        color: "#718096",
                      }}
                    >
                      Learn concepts through
                      structured lessons and
                      real project work.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                    style={{
                      background:
                        "#EAF8FF",
                      color: "#0289F9",
                    }}
                  >
                    <FaUsers size={15} />
                  </div>

                  <div>
                    <h3
                      className="text-sm font-bold"
                      style={{
                        color: "#0A1832",
                      }}
                    >
                      Learn with guidance
                    </h3>

                    <p
                      className="mt-1 text-sm leading-6"
                      style={{
                        color: "#718096",
                      }}
                    >
                      Build your capability with
                      mentor-led and structured
                      learning.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                    style={{
                      background:
                        "#EFEEFF",
                      color: "#3531E7",
                    }}
                  >
                    <FaChartLine
                      size={15}
                    />
                  </div>

                  <div>
                    <h3
                      className="text-sm font-bold"
                      style={{
                        color: "#0A1832",
                      }}
                    >
                      Build career readiness
                    </h3>

                    <p
                      className="mt-1 text-sm leading-6"
                      style={{
                        color: "#718096",
                      }}
                    >
                      Turn what you learn into
                      useful, demonstrable work.
                    </p>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* RIGHT FORM */}
            <motion.section
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.55,
                delay: 0.05,
              }}
              className="mx-auto w-full max-w-[560px]"
            >
              <div
                className="rounded-[28px] border bg-white p-6 shadow-[0_25px_80px_rgba(10,24,50,0.12)] sm:p-8"
                style={{
                  borderColor:
                    "#DCE6F5",
                }}
              >
                <div className="mb-7">
                  <h2
                    className="text-2xl font-extrabold tracking-tight"
                    style={{
                      color: "#0A1832",
                    }}
                  >
                    Create your account
                  </h2>

                  <p
                    className="mt-1.5 text-sm"
                    style={{
                      color: "#718096",
                    }}
                  >
                    Fill in your details to get
                    started.
                  </p>
                </div>

                <form
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  {/* NAME */}
                  <div>
                    <label
                      className="mb-2 block text-xs font-bold"
                      style={{
                        color: "#0A1832",
                      }}
                    >
                      Full name
                    </label>

                    <div className="relative">
                      <FaUser
                        className="absolute left-4 top-1/2 -translate-y-1/2"
                        style={{
                          color: "#8A98AD",
                        }}
                        size={13}
                      />

                      <input
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
                        className={`${inputClass} pl-10`}
                        style={{
                          borderColor:
                            errors.full_name
                              ? "#FCA5A5"
                              : "#DCE6F5",
                          color: "#0A1832",
                        }}
                      />
                    </div>

                    {errors.full_name && (
                      <p className="mt-1.5 text-xs text-red-600">
                        {errors.full_name}
                      </p>
                    )}
                  </div>

                  {/* EMAIL */}
                  <div>
                    <label
                      className="mb-2 block text-xs font-bold"
                      style={{
                        color: "#0A1832",
                      }}
                    >
                      Email address
                    </label>

                    <div className="relative">
                      <FaEnvelope
                        className="absolute left-4 top-1/2 -translate-y-1/2"
                        style={{
                          color: "#8A98AD",
                        }}
                        size={13}
                      />

                      <input
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
                        className={`${inputClass} pl-10`}
                        style={{
                          borderColor:
                            errors.email
                              ? "#FCA5A5"
                              : "#DCE6F5",
                          color: "#0A1832",
                        }}
                      />
                    </div>

                    {errors.email && (
                      <p className="mt-1.5 text-xs text-red-600">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* PHONE */}
                  <div>
                    <label
                      className="mb-2 block text-xs font-bold"
                      style={{
                        color: "#0A1832",
                      }}
                    >
                      Phone number
                    </label>

                    <div className="relative">
                      <FaPhone
                        className="absolute left-4 top-1/2 -translate-y-1/2"
                        style={{
                          color: "#8A98AD",
                        }}
                        size={12}
                      />

                      <input
                        type="tel"
                        name="phone"
                        value={
                          formData.phone
                        }
                        onChange={
                          handleChange
                        }
                        placeholder="+91 6300226652"
                        autoComplete="tel"
                        inputMode="tel"
                        disabled={
                          phoneVerified
                        }
                        className={`${inputClass} pl-10 pr-32 disabled:bg-slate-50`}
                        style={{
                          borderColor:
                            errors.phone
                              ? "#FCA5A5"
                              : phoneVerified
                              ? "#A7E3C0"
                              : "#DCE6F5",
                          color: "#0A1832",
                        }}
                      />

                      {phoneVerified ? (
                        <div
                          className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-1.5 text-xs font-bold"
                          style={{
                            color: "#16803C",
                          }}
                        >
                          <FaCheckCircle
                            size={13}
                          />
                          Verified
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={
                            handleRequestOtp
                          }
                          disabled={
                            otpLoading ||
                            !msg91Ready
                          }
                          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg px-3 py-2 text-[11px] font-bold text-white transition disabled:cursor-not-allowed disabled:opacity-50"
                          style={{
                            background:
                              "#0C5FF5",
                          }}
                        >
                          {otpLoading
                            ? "Sending..."
                            : "Verify"}
                        </button>
                      )}
                    </div>

                    {errors.phone && (
                      <p className="mt-1.5 text-xs text-red-600">
                        {errors.phone}
                      </p>
                    )}

                    {!phoneVerified &&
                      !msg91Ready && (
                        <p
                          className="mt-1.5 text-[11px]"
                          style={{
                            color:
                              "#94A3B8",
                          }}
                        >
                          Loading secure OTP
                          verification...
                        </p>
                      )}
                  </div>

                  {/* OTP */}
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
                        className="rounded-2xl border p-4"
                        style={{
                          borderColor:
                            "#CFE0FA",
                          background:
                            "#F7FAFF",
                        }}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p
                              className="text-xs font-bold"
                              style={{
                                color:
                                  "#0A1832",
                              }}
                            >
                              Enter OTP
                            </p>

                            <p
                              className="mt-1 text-[11px]"
                              style={{
                                color:
                                  "#718096",
                              }}
                            >
                              Enter the code sent
                              to your phone.
                            </p>
                          </div>

                          <button
                            type="button"
                            onClick={
                              handleChangePhone
                            }
                            className="text-[11px] font-bold"
                            style={{
                              color:
                                "#0C5FF5",
                            }}
                          >
                            Change
                          </button>
                        </div>

                        <div className="mt-3 flex gap-2">
                          <input
                            ref={
                              otpInputRef
                            }
                            type="text"
                            value={otp}
                            onChange={
                              handleOtpChange
                            }
                            placeholder="Enter OTP"
                            inputMode="numeric"
                            autoComplete="one-time-code"
                            className="h-[48px] min-w-0 flex-1 rounded-xl border bg-white px-4 text-center text-base font-bold tracking-[0.25em] outline-none focus:ring-4"
                            style={{
                              borderColor:
                                errors.otp
                                  ? "#FCA5A5"
                                  : "#DCE6F5",
                              color:
                                "#0A1832",
                            }}
                          />

                          <button
                            type="button"
                            onClick={
                              handleVerifyOtp
                            }
                            disabled={
                              verifyLoading ||
                              otp.length < 4
                            }
                            className="h-[48px] rounded-xl px-4 text-xs font-bold text-white disabled:opacity-50"
                            style={{
                              background:
                                "linear-gradient(90deg, #0C5FF5, #3531E7)",
                            }}
                          >
                            {verifyLoading
                              ? "..."
                              : "Confirm"}
                          </button>
                        </div>

                        {errors.otp && (
                          <p className="mt-2 text-xs text-red-600">
                            {errors.otp}
                          </p>
                        )}

                        <div className="mt-3 flex items-center justify-between text-[11px]">
                          <span
                            style={{
                              color:
                                "#7A879A",
                            }}
                          >
                            {remainingSeconds >
                            0
                              ? `Expires in ${formatTimer()}`
                              : "OTP expired"}
                          </span>

                          {resendCountdown >
                          0 ? (
                            <span
                              style={{
                                color:
                                  "#94A3B8",
                              }}
                            >
                              Resend in{" "}
                              {
                                resendCountdown
                              }
                              s
                            </span>
                          ) : (
                            <button
                              type="button"
                              onClick={
                                handleResendOtp
                              }
                              className="inline-flex items-center gap-1.5 font-bold"
                              style={{
                                color:
                                  "#0C5FF5",
                              }}
                            >
                              <FaRedo
                                size={9}
                              />
                              Resend OTP
                            </button>
                          )}
                        </div>
                      </motion.div>
                    )}

                  {/* PASSWORD */}
                  <div>
                    <label
                      className="mb-2 block text-xs font-bold"
                      style={{
                        color: "#0A1832",
                      }}
                    >
                      Password
                    </label>

                    <div className="relative">
                      <FaLock
                        className="absolute left-4 top-1/2 -translate-y-1/2"
                        style={{
                          color: "#8A98AD",
                        }}
                        size={13}
                      />

                      <input
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
                        placeholder="At least 8 characters"
                        autoComplete="new-password"
                        className={`${inputClass} pl-10 pr-11`}
                        style={{
                          borderColor:
                            errors.password
                              ? "#FCA5A5"
                              : "#DCE6F5",
                          color: "#0A1832",
                        }}
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowPassword(
                            (previous) =>
                              !previous
                          )
                        }
                        className="absolute right-4 top-1/2 -translate-y-1/2"
                        style={{
                          color:
                            "#8A98AD",
                        }}
                      >
                        {showPassword ? (
                          <FaEyeSlash
                            size={14}
                          />
                        ) : (
                          <FaEye
                            size={14}
                          />
                        )}
                      </button>
                    </div>

                    {errors.password && (
                      <p className="mt-1.5 text-xs text-red-600">
                        {errors.password}
                      </p>
                    )}
                  </div>

                  {/* CONFIRM PASSWORD */}
                  <div>
                    <label
                      className="mb-2 block text-xs font-bold"
                      style={{
                        color: "#0A1832",
                      }}
                    >
                      Confirm password
                    </label>

                    <div className="relative">
                      <FaLock
                        className="absolute left-4 top-1/2 -translate-y-1/2"
                        style={{
                          color: "#8A98AD",
                        }}
                        size={13}
                      />

                      <input
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
                        placeholder="Re-enter your password"
                        autoComplete="new-password"
                        className={`${inputClass} pl-10 pr-11`}
                        style={{
                          borderColor:
                            errors.confirm_password
                              ? "#FCA5A5"
                              : "#DCE6F5",
                          color: "#0A1832",
                        }}
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(
                            (previous) =>
                              !previous
                          )
                        }
                        className="absolute right-4 top-1/2 -translate-y-1/2"
                        style={{
                          color:
                            "#8A98AD",
                        }}
                      >
                        {showConfirmPassword ? (
                          <FaEyeSlash
                            size={14}
                          />
                        ) : (
                          <FaEye
                            size={14}
                          />
                        )}
                      </button>
                    </div>

                    {errors.confirm_password && (
                      <p className="mt-1.5 text-xs text-red-600">
                        {
                          errors.confirm_password
                        }
                      </p>
                    )}
                  </div>

                  {/* TERMS */}
                  <label className="flex cursor-pointer items-start gap-3 pt-1">
                    <input
                      type="checkbox"
                      required
                      className="mt-0.5 h-4 w-4 accent-[#0C5FF5]"
                    />

                    <span
                      className="text-[11px] leading-5"
                      style={{
                        color:
                          "#718096",
                      }}
                    >
                      I agree to the DataLattice
                      terms and understand that
                      my information will be used
                      to create my learning account.
                    </span>
                  </label>

                  {/* SUBMIT ERROR */}
                  {errors.submit && (
                    <motion.div
                      initial={{
                        opacity: 0,
                        y: -4,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      className="rounded-xl border px-4 py-3 text-xs leading-5"
                      style={{
                        borderColor:
                          "#FFCACA",
                        background:
                          "#FFF5F5",
                        color: "#D92D20",
                      }}
                    >
                      {errors.submit}
                    </motion.div>
                  )}

                  {/* SUBMIT */}
                  <button
                    type="submit"
                    disabled={
                      loading ||
                      !phoneVerified
                    }
                    className="group flex h-[54px] w-full items-center justify-center gap-2 rounded-xl text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
                    style={{
                      background:
                        "linear-gradient(90deg, #0C5FF5 0%, #0289F9 50%, #3531E7 100%)",
                      boxShadow:
                        "0 12px 28px rgba(12,95,245,0.20)",
                    }}
                  >
                    {loading ? (
                      <>
                        <FaRedo
                          className="animate-spin"
                          size={13}
                        />
                        Creating account...
                      </>
                    ) : (
                      <>
                        Create account
                        <FaArrowRight
                          className="transition-transform group-hover:translate-x-1"
                          size={13}
                        />
                      </>
                    )}
                  </button>
                </form>

                {/* SECURITY */}
                <div
                  className="mt-5 flex items-center justify-center gap-2 border-t pt-5 text-[11px]"
                  style={{
                    borderColor:
                      "#EEF2F7",
                    color: "#8290A3",
                  }}
                >
                  <FaShieldAlt
                    style={{
                      color: "#0289F9",
                    }}
                    size={12}
                  />

                  <span>
                    Phone verification is
                    handled securely through OTP.
                  </span>
                </div>

                <div className="mt-4 text-center">
                  <Link
                    to="/login"
                    className="inline-flex items-center gap-2 text-xs font-bold"
                    style={{
                      color: "#0C5FF5",
                    }}
                  >
                    <FaArrowLeft
                      size={10}
                    />
                    Back to login
                  </Link>
                </div>
              </div>
            </motion.section>
          </div>
        </main>

        {/* FOOTER */}
        <footer className="py-5 text-center">
          <p
            className="text-[11px]"
            style={{
              color: "#9AA7B8",
            }}
          >
            © {new Date().getFullYear()}{" "}
            DataLattice. Learn · Build · Grow.
          </p>
        </footer>
      </div>
    </div>
  );
}