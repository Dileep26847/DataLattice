import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUser,
  FaPhone,
  FaArrowRight,
  FaCheck,
  FaShieldHalved,
  FaArrowLeft,
  FaChevronDown,
  FaRotateRight,
} from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { verifySignupOtp } from "../../services/authService";
import { successToast } from "../../utils/toast";

const MSG91_WIDGET_ID = import.meta.env.VITE_MSG91_WIDGET_ID;
const MSG91_WIDGET_TOKEN = import.meta.env.VITE_MSG91_WIDGET_TOKEN;

const MSG91_WIDGET_SCRIPT_ID =
  "datalattice-msg91-otp-script";

const MSG91_WIDGET_SCRIPT_URL =
  "https://verify.msg91.com/otp-provider.js";

const MSG91_INIT_KEY =
  "__datalatticeMsg91Initialized";

const COUNTRIES = [
  {
    code: "IN",
    name: "India",
    dialCode: "+91",
    maxLength: 10,
  },
  {
    code: "US",
    name: "United States",
    dialCode: "+1",
    maxLength: 10,
  },
  {
    code: "CA",
    name: "Canada",
    dialCode: "+1",
    maxLength: 10,
  },
  {
    code: "GB",
    name: "United Kingdom",
    dialCode: "+44",
    maxLength: 10,
  },
  {
    code: "AU",
    name: "Australia",
    dialCode: "+61",
    maxLength: 9,
  },
  {
    code: "AE",
    name: "United Arab Emirates",
    dialCode: "+971",
    maxLength: 9,
  },
  {
    code: "SG",
    name: "Singapore",
    dialCode: "+65",
    maxLength: 8,
  },
  {
    code: "MY",
    name: "Malaysia",
    dialCode: "+60",
    maxLength: 10,
  },
  {
    code: "DE",
    name: "Germany",
    dialCode: "+49",
    maxLength: 11,
  },
  {
    code: "FR",
    name: "France",
    dialCode: "+33",
    maxLength: 9,
  },
  {
    code: "IT",
    name: "Italy",
    dialCode: "+39",
    maxLength: 10,
  },
  {
    code: "ES",
    name: "Spain",
    dialCode: "+34",
    maxLength: 9,
  },
  {
    code: "NZ",
    name: "New Zealand",
    dialCode: "+64",
    maxLength: 9,
  },
  {
    code: "JP",
    name: "Japan",
    dialCode: "+81",
    maxLength: 10,
  },
  {
    code: "KR",
    name: "South Korea",
    dialCode: "+82",
    maxLength: 10,
  },
  {
    code: "BR",
    name: "Brazil",
    dialCode: "+55",
    maxLength: 11,
  },
  {
    code: "ZA",
    name: "South Africa",
    dialCode: "+27",
    maxLength: 9,
  },
  {
    code: "SA",
    name: "Saudi Arabia",
    dialCode: "+966",
    maxLength: 9,
  },
  {
    code: "QA",
    name: "Qatar",
    dialCode: "+974",
    maxLength: 8,
  },
  {
    code: "KW",
    name: "Kuwait",
    dialCode: "+965",
    maxLength: 8,
  },
];

const OTP_EXPIRY_SECONDS = 15 * 60;
const RESEND_SECONDS = 60;

/* ============================================================
   MSG91 RESPONSE HELPERS
============================================================ */

const getNestedValue = (
  data,
  paths = []
) => {
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

const extractMsg91RequestId = (
  data
) => {
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

const extractMsg91AccessToken = (
  data
) => {
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

const getFriendlyMsg91Error = (
  error
) => {
  if (!error) {
    return "Unable to send OTP. Please try again.";
  }

  if (typeof error === "string") {
    return error;
  }

  return (
    error?.message ||
    error?.error ||
    error?.description ||
    error?.data?.message ||
    "Unable to send OTP. Please try again."
  );
};

/* ============================================================
   VALIDATION
============================================================ */

const isValidName = (value) => {
  return /^[A-Za-zÀ-ÿ][A-Za-zÀ-ÿ\s.'-]{1,49}$/.test(
    value.trim()
  );
};

const isValidIndianPhone = (
  value
) => {
  return /^[6-9]\d{9}$/.test(value);
};

const isValidPhone = (
  value,
  country
) => {
  const digits =
    value.replace(/\D/g, "");

  if (!country) {
    return false;
  }

  if (
    digits.length < 7 ||
    digits.length > country.maxLength
  ) {
    return false;
  }

  if (country.code === "IN") {
    return isValidIndianPhone(
      digits
    );
  }

  return true;
};

const getInternationalPhone = (
  country,
  localPhone
) => {
  const digits =
    localPhone.replace(/\D/g, "");

  return `${country.dialCode}${digits}`;
};

const getMsg91Identifier = (
  internationalPhone
) => {
  return internationalPhone.replace(
    /\+/g,
    ""
  );
};

/* ============================================================
   COMPONENT
============================================================ */

export default function HeroSignupCard() {
  const navigate = useNavigate();

  const countryDropdownRef =
    useRef(null);

  const otpInputRef =
    useRef(null);

  const [
    msg91Ready,
    setMsg91Ready,
  ] = useState(false);

  const [
    selectedCountry,
    setSelectedCountry,
  ] = useState(COUNTRIES[0]);

  const [
    countryOpen,
    setCountryOpen,
  ] = useState(false);

  const [
    fullName,
    setFullName,
  ] = useState("");

  const [
    localPhone,
    setLocalPhone,
  ] = useState("");

  const [otp, setOtp] =
    useState("");

  const [
    step,
    setStep,
  ] = useState("details");

  const [
    msg91RequestId,
    setMsg91RequestId,
  ] = useState(null);

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    verifyLoading,
    setVerifyLoading,
  ] = useState(false);

  const [
    resendLoading,
    setResendLoading,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState("");

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

  /* ==========================================================
     MSG91 SDK INITIALIZATION
  ========================================================== */

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
            clearInterval(
              intervalId
            );
          }

          console.error(
            "MSG91 OTP SDK initialization function was not found."
          );

          setMsg91Ready(false);
        }

        return;
      }

      try {
        if (!window[MSG91_INIT_KEY]) {
          window.initSendOTP({
            widgetId:
              MSG91_WIDGET_ID,

            tokenAuth:
              MSG91_WIDGET_TOKEN,

            identifier: "",

            exposeMethods: true,

            success: () => {},

            failure: (
              sdkError
            ) => {
              console.error(
                "MSG91 widget initialization error:",
                sdkError
              );
            },
          });

          window[MSG91_INIT_KEY] =
            true;
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
        document.createElement(
          "script"
        );

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

    intervalId =
      window.setInterval(
        initialize,
        100
      );

    initialize();

    return () => {
      cancelled = true;

      if (intervalId) {
        clearInterval(
          intervalId
        );
      }
    };
  }, []);

  /* ==========================================================
     OTP TIMER
  ========================================================== */

  useEffect(() => {
    if (!otpExpiresAt) {
      return undefined;
    }

    const updateCountdown =
      () => {
        const seconds =
          Math.max(
            0,
            Math.ceil(
              (otpExpiresAt -
                Date.now()) /
                1000
            )
          );

        setRemainingSeconds(
          seconds
        );

        if (seconds <= 0) {
          setOtpExpiresAt(
            null
          );
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

  /* ==========================================================
     RESEND TIMER
  ========================================================== */

  useEffect(() => {
    if (!resendAvailableAt) {
      return undefined;
    }

    const updateCountdown =
      () => {
        const seconds =
          Math.max(
            0,
            Math.ceil(
              (resendAvailableAt -
                Date.now()) /
                1000
            )
          );

        setResendCountdown(
          seconds
        );

        if (seconds <= 0) {
          setResendAvailableAt(
            null
          );
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

  /* ==========================================================
     COUNTRY DROPDOWN
  ========================================================== */

  useEffect(() => {
    const handleOutsideClick =
      (event) => {
        if (
          countryDropdownRef.current &&
          !countryDropdownRef.current.contains(
            event.target
          )
        ) {
          setCountryOpen(false);
        }
      };

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, []);

  /* ==========================================================
     OTP FOCUS
  ========================================================== */

  useEffect(() => {
    if (step !== "otp") {
      return undefined;
    }

    const timeout =
      window.setTimeout(
        () => {
          otpInputRef.current?.focus();
        },
        150
      );

    return () =>
      clearTimeout(timeout);
  }, [step]);

  /* ==========================================================
     VALIDATE DETAILS
  ========================================================== */

  const validateDetails =
    () => {
      const name =
        fullName.trim();

      const phone =
        localPhone.replace(
          /\D/g,
          ""
        );

      if (!name) {
        return "Please enter your name.";
      }

      if (!isValidName(name)) {
        return "Please enter a valid name.";
      }

      if (!phone) {
        return "Please enter your phone number.";
      }

      if (
        !isValidPhone(
          phone,
          selectedCountry
        )
      ) {
        if (
          selectedCountry.code ===
          "IN"
        ) {
          return "Please enter a valid 10-digit Indian mobile number.";
        }

        return `Please enter a valid ${selectedCountry.name} phone number.`;
      }

      return "";
    };

  /* ==========================================================
     SEND OTP
  ========================================================== */

  const handleRequestOtp = (
    event
  ) => {
    event.preventDefault();

    setError("");

    const validationError =
      validateDetails();

    if (validationError) {
      setError(
        validationError
      );
      return;
    }

    if (
      !MSG91_WIDGET_ID ||
      !MSG91_WIDGET_TOKEN
    ) {
      setError(
        "OTP service is not configured. Please contact support."
      );

      console.error(
        "Missing VITE_MSG91_WIDGET_ID or VITE_MSG91_WIDGET_TOKEN."
      );

      return;
    }

    if (
      !msg91Ready ||
      !areMsg91MethodsReady()
    ) {
      setError(
        "OTP service is still loading. Please wait a moment and try again."
      );

      return;
    }

    const internationalPhone =
      getInternationalPhone(
        selectedCountry,
        localPhone
      );

    const identifier =
      getMsg91Identifier(
        internationalPhone
      );

    setLoading(true);

    try {
      window.sendOtp(
        identifier,

        (data) => {
          console.log(
            "MSG91 OTP REQUEST SUCCESS:",
            data
          );

          const requestId =
            extractMsg91RequestId(
              data
            );

          if (!requestId) {
            console.error(
              "MSG91 OTP response did not contain a request ID:",
              data
            );

            setLoading(false);

            setError(
              "OTP was sent, but the verification session could not be created. Please try again."
            );

            return;
          }

          sessionStorage.setItem(
            "datalattice_demo_lead",
            JSON.stringify({
              fullName:
                fullName.trim(),

              phone:
                internationalPhone,

              country:
                selectedCountry.code,

              dialCode:
                selectedCountry.dialCode,
            })
          );

          setMsg91RequestId(
            requestId
          );

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

          setStep("otp");

          setLoading(false);

          successToast(
            "OTP sent successfully."
          );
        },

        (sdkError) => {
          console.error(
            "MSG91 OTP REQUEST ERROR:",
            sdkError
          );

          setLoading(false);

          setError(
            getFriendlyMsg91Error(
              sdkError
            )
          );
        }
      );
    } catch (sdkError) {
      console.error(
        "MSG91 sendOtp exception:",
        sdkError
      );

      setLoading(false);

      setError(
        getFriendlyMsg91Error(
          sdkError
        )
      );
    }
  };

  /* ==========================================================
     VERIFY OTP
  ========================================================== */

  const handleVerifyOtp = (
    event
  ) => {
    event.preventDefault();

    setError("");

    const cleanOtp =
      otp.replace(/\D/g, "");

    if (
      cleanOtp.length !== 4 &&
      cleanOtp.length !== 6
    ) {
      setError(
        "Please enter the OTP sent to your phone."
      );

      return;
    }

    if (!msg91RequestId) {
      setError(
        "Your OTP session has expired. Please request a new OTP."
      );

      return;
    }

    if (
      otpExpiresAt &&
      Date.now() > otpExpiresAt
    ) {
      setError(
        "This OTP has expired. Please request a new OTP."
      );

      return;
    }

    if (
      typeof window.verifyOtp !==
      "function"
    ) {
      setError(
        "OTP verification service is not ready. Please refresh and try again."
      );

      return;
    }

    const internationalPhone =
      getInternationalPhone(
        selectedCountry,
        localPhone
      );

    setVerifyLoading(true);

    try {
      window.verifyOtp(
        Number(cleanOtp),

        (data) => {
          console.log(
            "MSG91 OTP VERIFY SUCCESS:",
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

            setVerifyLoading(
              false
            );

            setError(
              "OTP was verified, but the verification token was not returned. Please try again."
            );

            return;
          }

          verifySignupOtp(
            internationalPhone,
            cleanOtp,
            accessToken
          )
            .then(
              (response) => {
                if (
                  !response?.verificationToken
                ) {
                  throw new Error(
                    "DataLattice verification token was not returned."
                  );
                }

                sessionStorage.setItem(
                  "datalattice_demo_verification",
                  JSON.stringify({
                    verificationToken:
                      response.verificationToken,

                    phone:
                      internationalPhone,

                    fullName:
                      fullName.trim(),

                    verifiedAt:
                      new Date().toISOString(),
                  })
                );

                window.dispatchEvent(
                  new CustomEvent(
                    "datalattice:demo-verified"
                  )
                );

                setVerifyLoading(
                  false
                );

                successToast(
                  "Phone number verified successfully."
                );

                navigate(
                  "/demo/student"
                );
              }
            )
            .catch(
              (backendError) => {
                console.error(
                  "DataLattice OTP verification error:",
                  backendError
                );

                setVerifyLoading(
                  false
                );

                setError(
                  backendError
                    ?.response
                    ?.data
                    ?.message ||
                    backendError?.message ||
                    "Phone verification could not be completed. Please try again."
                );
              }
            );
        },

        (sdkError) => {
          console.error(
            "MSG91 OTP VERIFY ERROR:",
            sdkError
          );

          setVerifyLoading(
            false
          );

          setError(
            getFriendlyMsg91Error(
              sdkError
            )
          );
        },

        msg91RequestId
      );
    } catch (sdkError) {
      console.error(
        "MSG91 verifyOtp exception:",
        sdkError
      );

      setVerifyLoading(false);

      setError(
        getFriendlyMsg91Error(
          sdkError
        )
      );
    }
  };

  /* ==========================================================
     RESEND OTP
  ========================================================== */

  const handleResendOtp =
    () => {
      setError("");

      if (!msg91RequestId) {
        setError(
          "Your OTP session is no longer available. Please request a new OTP."
        );

        return;
      }

      if (resendCountdown > 0) {
        return;
      }

      if (
        typeof window.retryOtp !==
        "function"
      ) {
        setError(
          "OTP resend service is not ready. Please try again."
        );

        return;
      }

      setResendLoading(true);

      try {
        window.retryOtp(
          "11",

          (data) => {
            console.log(
              "MSG91 OTP RESEND SUCCESS:",
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

            setResendLoading(
              false
            );

            successToast(
              "A new OTP has been sent."
            );
          },

          (sdkError) => {
            console.error(
              "MSG91 OTP RESEND ERROR:",
              sdkError
            );

            setResendLoading(
              false
            );

            setError(
              getFriendlyMsg91Error(
                sdkError
              )
            );
          },

          msg91RequestId
        );
      } catch (sdkError) {
        console.error(
          "MSG91 retryOtp exception:",
          sdkError
        );

        setResendLoading(false);

        setError(
          getFriendlyMsg91Error(
            sdkError
          )
        );
      }
    };

  /* ==========================================================
     CHANGE PHONE
  ========================================================== */

  const handleChangePhone =
    () => {
      setStep("details");

      setOtp("");

      setError("");

      setMsg91RequestId(null);

      setOtpExpiresAt(null);

      setResendAvailableAt(
        null
      );

      setRemainingSeconds(0);

      setResendCountdown(0);
    };

  /* ==========================================================
     TIMER FORMAT
  ========================================================== */

  const formattedExpiry =
    () => {
      const minutes =
        Math.floor(
          remainingSeconds /
            60
        );

      const seconds =
        remainingSeconds % 60;

      return `${minutes}:${String(
        seconds
      ).padStart(2, "0")}`;
    };

  /* ==========================================================
     UI
  ========================================================== */

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 12,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.45,
        ease: "easeOut",
      }}
      className="w-full max-w-[374px]"
    >
      <div
        className="relative overflow-visible rounded-[24px] border bg-white"
        style={{
          borderColor:
            "#DCE6F5",
          boxShadow:
            "0 22px 55px rgba(10,24,50,0.13)",
        }}
      >
        

        <div className="px-6 pb-6 pt-7 sm:px-7">
          <AnimatePresence mode="wait">
            {step === "details" ? (
              <motion.div
                key="details"
                initial={{
                  opacity: 0,
                  y: 5,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -5,
                }}
                transition={{
                  duration: 0.22,
                }}
              >
                {/* =================================================
                   ICON
                ================================================= */}

                <div
                  className="mb-4 flex h-11 w-11 items-center justify-center rounded-[14px]"
                  style={{
                    background:
                      "linear-gradient(135deg, #0C5FF5 0%, #0289F9 100%)",
                    boxShadow:
                      "0 8px 18px rgba(12,95,245,0.20)",
                  }}
                >
                  <FaUser
                    className="text-white"
                    size={16}
                  />
                </div>

                {/* =================================================
                   HEADING
                ================================================= */}

                <h3
                  className="text-[24px] font-extrabold leading-[1.15] tracking-[-0.035em]"
                  style={{
                    color:
                      "#0A1832",
                  }}
                >
                  Explore{" "}
                  <span
                    style={{
                      background:
                        "linear-gradient(90deg, #0C5FF5 0%, #0289F9 55%, #3531E7 100%)",
                      WebkitBackgroundClip:
                        "text",
                      WebkitTextFillColor:
                        "transparent",
                    }}
                  >
                    DataLattice
                  </span>
                </h3>

                <p
                  className="mt-2 max-w-[310px] text-[12px] leading-[1.65]"
                  style={{
                    color:
                      "#748399",
                  }}
                >
                  Enter your details to
                  start exploring our
                  learning experience.
                </p>

                {/* =================================================
                   FORM
                ================================================= */}

                <form
                  onSubmit={
                    handleRequestOtp
                  }
                  className="mt-6"
                >
                  {/* NAME */}
                  <div>
                    <label
                      className="sr-only"
                      htmlFor="hero-full-name"
                    >
                      Full Name
                    </label>

                    <div className="relative">
                      <FaUser
                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2"
                        style={{
                          color:
                            "#92A0B3",
                        }}
                        size={13}
                      />

                      <input
                        id="hero-full-name"
                        type="text"
                        value={
                          fullName
                        }
                        onChange={(
                          event
                        ) => {
                          setFullName(
                            event.target
                              .value
                          );

                          setError(
                            ""
                          );
                        }}
                        placeholder="Full Name"
                        autoComplete="name"
                        className="h-[49px] w-full rounded-[16px] border bg-white pl-11 pr-4 text-[13px] outline-none transition focus:border-[#0C5FF5] focus:ring-4 focus:ring-[#0C5FF5]/10"
                        style={{
                          borderColor:
                            "#DCE6F5",
                          color:
                            "#0A1832",
                        }}
                      />
                    </div>
                  </div>

                  {/* PHONE */}
                  <div className="mt-3.5">
                    <label
                      className="sr-only"
                      htmlFor="hero-phone"
                    >
                      Phone Number
                    </label>

                    <div
                      className="relative flex h-[49px] w-full rounded-[16px] border bg-white transition focus-within:border-[#0C5FF5] focus-within:ring-4 focus-within:ring-[#0C5FF5]/10"
                      style={{
                        borderColor:
                          "#DCE6F5",
                      }}
                    >
                      {/* COUNTRY SELECTOR */}
                      <div
                        ref={
                          countryDropdownRef
                        }
                        className="relative flex shrink-0 items-center"
                      >
                        <button
                          type="button"
                          onClick={() =>
                            setCountryOpen(
                              (
                                previous
                              ) =>
                                !previous
                            )
                          }
                          className="flex h-full items-center gap-2 rounded-l-[16px] px-4 text-[12px] font-semibold"
                          style={{
                            color:
                              "#0A1832",
                          }}
                        >
                          <span>
                            {
                              selectedCountry.code
                            }
                          </span>

                          <span
                            style={{
                              color:
                                "#718096",
                            }}
                          >
                            {
                              selectedCountry.dialCode
                            }
                          </span>

                          <FaChevronDown
                            size={8}
                            style={{
                              color:
                                "#8C9AAF",
                            }}
                          />
                        </button>

                        {/* COUNTRY MENU */}
                        <AnimatePresence>
                          {countryOpen && (
                            <motion.div
                              initial={{
                                opacity: 0,
                                y: 4,
                              }}
                              animate={{
                                opacity: 1,
                                y: 0,
                              }}
                              exit={{
                                opacity: 0,
                                y: 4,
                              }}
                              className="absolute left-0 top-[54px] z-[100] max-h-[245px] w-[225px] overflow-y-auto rounded-[14px] border bg-white p-1.5 shadow-[0_18px_45px_rgba(10,24,50,0.16)]"
                              style={{
                                borderColor:
                                  "#DCE6F5",
                              }}
                            >
                              {COUNTRIES.map(
                                (
                                  country
                                ) => (
                                  <button
                                    key={
                                      country.code
                                    }
                                    type="button"
                                    onClick={() => {
                                      setSelectedCountry(
                                        country
                                      );

                                      setLocalPhone(
                                        ""
                                      );

                                      setCountryOpen(
                                        false
                                      );

                                      setError(
                                        ""
                                      );
                                    }}
                                    className="flex w-full items-center justify-between rounded-[9px] px-3 py-2 text-left text-[11px] transition hover:bg-[#F4F7FB]"
                                    style={{
                                      color:
                                        "#0A1832",
                                    }}
                                  >
                                    <span>
                                      {
                                        country.name
                                      }
                                    </span>

                                    <span
                                      style={{
                                        color:
                                          "#718096",
                                      }}
                                    >
                                      {
                                        country.dialCode
                                      }
                                    </span>
                                  </button>
                                )
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* DIVIDER */}
                      <div
                        className="my-2.5 w-px"
                        style={{
                          background:
                            "#E5EBF3",
                        }}
                      />

                      {/* PHONE INPUT */}
                      <div className="relative flex min-w-0 flex-1 items-center">
                        <FaPhone
                          className="pointer-events-none absolute left-3"
                          style={{
                            color:
                              "#92A0B3",
                          }}
                          size={11}
                        />

                        <input
                          id="hero-phone"
                          type="tel"
                          value={
                            localPhone
                          }
                          onChange={(
                            event
                          ) => {
                            const digits =
                              event.target.value.replace(
                                /\D/g,
                                ""
                              );

                            setLocalPhone(
                              digits.slice(
                                0,
                                selectedCountry.maxLength
                              )
                            );

                            setError(
                              ""
                            );
                          }}
                          placeholder="Phone Number"
                          autoComplete="tel"
                          inputMode="numeric"
                          className="h-full min-w-0 flex-1 rounded-r-[16px] bg-transparent pl-8 pr-3 text-[13px] outline-none"
                          style={{
                            color:
                              "#0A1832",
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* ERROR */}
                  {error && (
                    <motion.div
                      initial={{
                        opacity: 0,
                        height: 0,
                      }}
                      animate={{
                        opacity: 1,
                        height: "auto",
                      }}
                      className="mt-3 rounded-[12px] border px-3 py-2.5 text-[11px] leading-4"
                      style={{
                        borderColor:
                          "#FFCACA",
                        background:
                          "#FFF5F5",
                        color:
                          "#D92D20",
                      }}
                    >
                      {error}
                    </motion.div>
                  )}

                  {/* SIGN UP */}
                  <button
                    type="submit"
                    disabled={
                      loading
                    }
                    className="group mt-3.5 flex h-[50px] w-full items-center justify-center gap-2 rounded-[16px] text-[13px] font-bold text-white transition duration-200 hover:-translate-y-[1px] disabled:cursor-not-allowed disabled:opacity-60"
                    style={{
                      background:
                        "linear-gradient(90deg, #0C5FF5 0%, #0289F9 50%, #3531E7 100%)",
                      boxShadow:
                        "0 12px 25px rgba(12,95,245,0.20)",
                    }}
                  >
                    {loading ? (
                      <>
                        <FaRotateRight
                          className="animate-spin"
                          size={12}
                        />

                        Sending OTP...
                      </>
                    ) : (
                      <>
                        SIGN UP

                        <FaArrowRight
                          className="transition-transform duration-200 group-hover:translate-x-1"
                          size={11}
                        />
                      </>
                    )}
                  </button>
                </form>

                {/* =================================================
                   PRIVACY MESSAGE
                ================================================= */}

                <div
                  className="mt-4 flex items-start gap-2.5 rounded-[14px] px-3.5 py-3"
                  style={{
                    background:
                      "#F3F7FD",
                  }}
                >
                  <div className="mt-0.5 shrink-0">
                    <FaShieldHalved
                      style={{
                        color:
                          "#0C5FF5",
                      }}
                      size={11}
                    />
                  </div>

                  <p
                    className="text-[9px] leading-[1.5]"
                    style={{
                      color:
                        "#718096",
                    }}
                  >
                    Your phone number is
                    used only to verify your
                    access and provide the
                    DataLattice learning
                    experience.
                  </p>
                </div>

                {!msg91Ready && (
                  <p
                    className="mt-2 text-center text-[9px]"
                    style={{
                      color:
                        "#9AA7B7",
                    }}
                  >
                    Preparing secure
                    verification...
                  </p>
                )}
              </motion.div>
            ) : (
              /* =================================================
                 OTP SCREEN
              ================================================= */

              <motion.div
                key="otp"
                initial={{
                  opacity: 0,
                  x: 8,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                exit={{
                  opacity: 0,
                  x: -8,
                }}
                transition={{
                  duration: 0.22,
                }}
              >
                {/* BACK */}
                <button
                  type="button"
                  onClick={
                    handleChangePhone
                  }
                  className="mb-5 inline-flex items-center gap-1.5 text-[11px] font-semibold"
                  style={{
                    color:
                      "#0C5FF5",
                  }}
                >
                  <FaArrowLeft
                    size={9}
                  />

                  Change number
                </button>

                {/* OTP ICON */}
                <div
                  className="mb-4 flex h-11 w-11 items-center justify-center rounded-[14px]"
                  style={{
                    background:
                      "linear-gradient(135deg, #0C5FF5, #3531E7)",
                    boxShadow:
                      "0 8px 18px rgba(12,95,245,0.18)",
                  }}
                >
                  <FaCheck
                    className="text-white"
                    size={16}
                  />
                </div>

                {/* OTP HEADING */}
                <h3
                  className="text-[24px] font-extrabold leading-[1.15] tracking-[-0.035em]"
                  style={{
                    color:
                      "#0A1832",
                  }}
                >
                  Verify your{" "}
                  <span
                    style={{
                      background:
                        "linear-gradient(90deg, #0C5FF5, #0289F9, #3531E7)",
                      WebkitBackgroundClip:
                        "text",
                      WebkitTextFillColor:
                        "transparent",
                    }}
                  >
                    number
                  </span>
                </h3>

                <p
                  className="mt-2 text-[12px] leading-5"
                  style={{
                    color:
                      "#748399",
                  }}
                >
                  Enter the verification
                  code sent to
                </p>

                <p
                  className="mt-1 text-[13px] font-bold"
                  style={{
                    color:
                      "#0A1832",
                  }}
                >
                  {
                    selectedCountry.dialCode
                  }{" "}
                  {localPhone}
                </p>

                {/* OTP FORM */}
                <form
                  onSubmit={
                    handleVerifyOtp
                  }
                  className="mt-6"
                >
                  <label
                    className="sr-only"
                    htmlFor="hero-otp"
                  >
                    Verification code
                  </label>

                  <input
                    ref={
                      otpInputRef
                    }
                    id="hero-otp"
                    type="text"
                    value={otp}
                    onChange={(
                      event
                    ) => {
                      const digits =
                        event.target.value.replace(
                          /\D/g,
                          ""
                        );

                      setOtp(
                        digits.slice(
                          0,
                          6
                        )
                      );

                      setError(
                        ""
                      );
                    }}
                    placeholder="Enter verification code"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    className="h-[52px] w-full rounded-[16px] border bg-white px-4 text-center text-lg font-bold tracking-[0.3em] outline-none transition focus:border-[#0C5FF5] focus:ring-4 focus:ring-[#0C5FF5]/10"
                    style={{
                      borderColor:
                        "#DCE6F5",
                      color:
                        "#0A1832",
                    }}
                  />

                  {/* OTP META */}
                  <div className="mt-2.5 flex items-center justify-between">
                    <span
                      className="text-[10px]"
                      style={{
                        color:
                          "#7C899B",
                      }}
                    >
                      {remainingSeconds >
                      0
                        ? `Expires in ${formattedExpiry()}`
                        : "OTP expired"}
                    </span>

                    {resendCountdown >
                    0 ? (
                      <span
                        className="text-[10px]"
                        style={{
                          color:
                            "#9AA7B7",
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
                        disabled={
                          resendLoading
                        }
                        className="inline-flex items-center gap-1.5 text-[10px] font-bold disabled:opacity-50"
                        style={{
                          color:
                            "#0C5FF5",
                        }}
                      >
                        <FaRotateRight
                          className={
                            resendLoading
                              ? "animate-spin"
                              : ""
                          }
                          size={9}
                        />

                        {resendLoading
                          ? "Sending..."
                          : "Resend OTP"}
                      </button>
                    )}
                  </div>

                  {/* OTP ERROR */}
                  {error && (
                    <motion.div
                      initial={{
                        opacity: 0,
                        height: 0,
                      }}
                      animate={{
                        opacity: 1,
                        height: "auto",
                      }}
                      className="mt-3 rounded-[12px] border px-3 py-2.5 text-[11px] leading-4"
                      style={{
                        borderColor:
                          "#FFCACA",
                        background:
                          "#FFF5F5",
                        color:
                          "#D92D20",
                      }}
                    >
                      {error}
                    </motion.div>
                  )}

                  {/* VERIFY BUTTON */}
                  <button
                    type="submit"
                    disabled={
                      verifyLoading ||
                      otp.length < 4
                    }
                    className="group mt-4 flex h-[50px] w-full items-center justify-center gap-2 rounded-[16px] text-[13px] font-bold text-white transition duration-200 hover:-translate-y-[1px] disabled:cursor-not-allowed disabled:opacity-60"
                    style={{
                      background:
                        "linear-gradient(90deg, #0C5FF5 0%, #0289F9 50%, #3531E7 100%)",
                      boxShadow:
                        "0 12px 25px rgba(12,95,245,0.20)",
                    }}
                  >
                    {verifyLoading ? (
                      <>
                        <FaRotateRight
                          className="animate-spin"
                          size={12}
                        />

                        Verifying...
                      </>
                    ) : (
                      <>
                        VERIFY

                        <FaArrowRight
                          className="transition-transform group-hover:translate-x-1"
                          size={11}
                        />
                      </>
                    )}
                  </button>
                </form>

                {/* SECURITY */}
                <div
                  className="mt-4 flex items-start gap-2.5 rounded-[14px] px-3.5 py-3"
                  style={{
                    background:
                      "#F3F7FD",
                  }}
                >
                  <FaShieldHalved
                    className="mt-0.5 shrink-0"
                    style={{
                      color:
                        "#0C5FF5",
                    }}
                    size={11}
                  />

                  <p
                    className="text-[9px] leading-[1.5]"
                    style={{
                      color:
                        "#718096",
                    }}
                  >
                    Your verification is
                    handled securely through
                    DataLattice and MSG91.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}