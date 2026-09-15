import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUser,
  FaPhone,
  FaArrowRight,
  FaCheck,
  FaShieldHalved,
  FaArrowLeft,
  FaChevronDown,
} from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

import {
  requestSignupOtp,
  verifySignupOtp,
} from "../../services/authService";

import {
  successToast,
  errorToast,
} from "../../utils/toast";

/* =========================================================
   COUNTRY CODES

   India is intentionally first and selected by default.
   The phone number itself is stored without the country
   code. The complete international number is generated
   only when communicating with the OTP API.
   ========================================================= */

const COUNTRY_CODES = [
  {
    code: "IN",
    name: "India",
    dialCode: "+91",
    flag: "🇮🇳",
    maxLength: 10,
  },
  {
    code: "US",
    name: "United States",
    dialCode: "+1",
    flag: "🇺🇸",
    maxLength: 10,
  },
  {
    code: "CA",
    name: "Canada",
    dialCode: "+1",
    flag: "🇨🇦",
    maxLength: 10,
  },
  {
    code: "GB",
    name: "United Kingdom",
    dialCode: "+44",
    flag: "🇬🇧",
    maxLength: 10,
  },
  {
    code: "AU",
    name: "Australia",
    dialCode: "+61",
    flag: "🇦🇺",
    maxLength: 9,
  },
  {
    code: "AE",
    name: "United Arab Emirates",
    dialCode: "+971",
    flag: "🇦🇪",
    maxLength: 9,
  },
  {
    code: "SG",
    name: "Singapore",
    dialCode: "+65",
    flag: "🇸🇬",
    maxLength: 8,
  },
  {
    code: "MY",
    name: "Malaysia",
    dialCode: "+60",
    flag: "🇲🇾",
    maxLength: 10,
  },
  {
    code: "DE",
    name: "Germany",
    dialCode: "+49",
    flag: "🇩🇪",
    maxLength: 11,
  },
  {
    code: "FR",
    name: "France",
    dialCode: "+33",
    flag: "🇫🇷",
    maxLength: 9,
  },
  {
    code: "IT",
    name: "Italy",
    dialCode: "+39",
    flag: "🇮🇹",
    maxLength: 10,
  },
  {
    code: "ES",
    name: "Spain",
    dialCode: "+34",
    flag: "🇪🇸",
    maxLength: 9,
  },
  {
    code: "NZ",
    name: "New Zealand",
    dialCode: "+64",
    flag: "🇳🇿",
    maxLength: 10,
  },
  {
    code: "JP",
    name: "Japan",
    dialCode: "+81",
    flag: "🇯🇵",
    maxLength: 10,
  },
  {
    code: "KR",
    name: "South Korea",
    dialCode: "+82",
    flag: "🇰🇷",
    maxLength: 10,
  },
  {
    code: "BR",
    name: "Brazil",
    dialCode: "+55",
    flag: "🇧🇷",
    maxLength: 11,
  },
  {
    code: "ZA",
    name: "South Africa",
    dialCode: "+27",
    flag: "🇿🇦",
    maxLength: 9,
  },
  {
    code: "SA",
    name: "Saudi Arabia",
    dialCode: "+966",
    flag: "🇸🇦",
    maxLength: 9,
  },
  {
    code: "QA",
    name: "Qatar",
    dialCode: "+974",
    flag: "🇶🇦",
    maxLength: 8,
  },
  {
    code: "KW",
    name: "Kuwait",
    dialCode: "+965",
    flag: "🇰🇼",
    maxLength: 8,
  },
];

/* =========================================================
   DATALATTICE HERO SIGNUP CARD

   Flow:
   1. Name + Country Code + Phone
   2. Send OTP
   3. OTP verification
   4. Redirect to Demo Student Panel

   IMPORTANT:
   This component does NOT create a normal student account.
   Existing OTP infrastructure is reused.
   ========================================================= */

function HeroSignupCard() {
  const navigate = useNavigate();

  /* =========================================================
     FORM STATE
     ========================================================= */

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");

  /*
   * India is the default country.
   */
  const [selectedCountry, setSelectedCountry] = useState(
    COUNTRY_CODES[0]
  );

  const [countryDropdownOpen, setCountryDropdownOpen] =
    useState(false);

  /* =========================================================
     OTP STATE
     ========================================================= */

  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("details");

  const [otpLoading, setOtpLoading] = useState(false);
  const [otpVerifying, setOtpVerifying] = useState(false);

  const [verificationExpiresAt, setVerificationExpiresAt] =
    useState(null);

  const [resendAvailableAt, setResendAvailableAt] =
    useState(null);

  const [resendRemaining, setResendRemaining] =
    useState(0);

  /* =========================================================
     ERRORS
     ========================================================= */

  const [errors, setErrors] = useState({});

  /* =========================================================
     OTP COUNTDOWN
     ========================================================= */

  useEffect(() => {
    if (!resendAvailableAt) {
      setResendRemaining(0);
      return undefined;
    }

    const updateCountdown = () => {
      const remainingMs = Math.max(
        0,
        resendAvailableAt - Date.now()
      );

      const remainingSeconds = Math.ceil(
        remainingMs / 1000
      );

      setResendRemaining(remainingSeconds);

      if (remainingSeconds === 0) {
        setResendAvailableAt(null);
      }
    };

    updateCountdown();

    const interval = window.setInterval(
      updateCountdown,
      1000
    );

    return () => {
      window.clearInterval(interval);
    };
  }, [resendAvailableAt]);

  /* =========================================================
     CLOSE COUNTRY DROPDOWN WHEN CLICKING OUTSIDE
     ========================================================= */

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        !event.target.closest(
          "[data-country-selector]"
        )
      ) {
        setCountryDropdownOpen(false);
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

  /* =========================================================
     NAME VALIDATION
     ========================================================= */

  const validateName = (value) => {
    const name = value.trim();

    if (!name) {
      return "Please enter your name.";
    }

    if (name.length < 2) {
      return "Please enter your full name.";
    }

    if (!/^[A-Za-zÀ-ÿ\s.'-]+$/.test(name)) {
      return "Please enter a valid name.";
    }

    return "";
  };

  /* =========================================================
     PHONE VALIDATION

     The phone input contains only the local number.
     The country dial code is handled separately.
     ========================================================= */

  const validatePhone = (value) => {
    const phoneValue = value.replace(/\D/g, "");

    if (!phoneValue) {
      return "Please enter your phone number.";
    }

    if (
      phoneValue.length < 7 ||
      phoneValue.length > selectedCountry.maxLength
    ) {
      return `Please enter a valid ${selectedCountry.name} phone number.`;
    }

    /*
     * Indian mobile numbers should normally start with
     * 6, 7, 8 or 9.
     */
    if (
      selectedCountry.code === "IN" &&
      !/^[6-9]\d{9}$/.test(phoneValue)
    ) {
      return "Please enter a valid 10-digit Indian mobile number.";
    }

    return "";
  };

  /* =========================================================
     BUILD COMPLETE INTERNATIONAL PHONE NUMBER
     ========================================================= */

  const getInternationalPhone = () => {
    const localPhone = phone
      .replace(/\D/g, "")
      .trim();

    return `${selectedCountry.dialCode}${localPhone}`;
  };

  /* =========================================================
     NAME CHANGE
     ========================================================= */

  const handleNameChange = (event) => {
    const value = event.target.value;

    setFullName(value);

    setErrors((previous) => ({
      ...previous,
      fullName: "",
      form: "",
    }));
  };

  /* =========================================================
     PHONE CHANGE

     Only numeric digits are stored.
     ========================================================= */

  const handlePhoneChange = (event) => {
    const value = event.target.value
      .replace(/\D/g, "")
      .slice(0, selectedCountry.maxLength);

    setPhone(value);

    setErrors((previous) => ({
      ...previous,
      phone: "",
      form: "",
    }));
  };

  /* =========================================================
     COUNTRY CHANGE
     ========================================================= */

  const handleCountryChange = (country) => {
    setSelectedCountry(country);
    setCountryDropdownOpen(false);

    /*
     * Re-trim the existing phone number according to the
     * newly selected country's expected local length.
     */
    setPhone((previous) =>
      previous
        .replace(/\D/g, "")
        .slice(0, country.maxLength)
    );

    setErrors((previous) => ({
      ...previous,
      phone: "",
      form: "",
    }));
  };

  /* =========================================================
     REQUEST OTP
     ========================================================= */

  const handleRequestOtp = async (event) => {
    event.preventDefault();

    const nameError = validateName(fullName);
    const phoneError = validatePhone(phone);

    const newErrors = {};

    if (nameError) {
      newErrors.fullName = nameError;
    }

    if (phoneError) {
      newErrors.phone = phoneError;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setOtpLoading(true);

    setErrors({});

    const internationalPhone =
      getInternationalPhone();

    try {
      const data = await requestSignupOtp(
        internationalPhone
      );

      /*
       * Keep the lead information locally for the next
       * demo-panel step.
       *
       * This does NOT replace backend lead creation.
       */
      sessionStorage.setItem(
        "datalattice_demo_lead",
        JSON.stringify({
          full_name: fullName.trim(),
          phone: internationalPhone,
          country_code: selectedCountry.code,
          dial_code: selectedCountry.dialCode,
          local_phone: phone.trim(),
          created_at: new Date().toISOString(),
        })
      );

      setOtp("");
      setStep("otp");

      setVerificationExpiresAt(
        data?.expiresAt || null
      );

      setResendAvailableAt(
        Date.now() + 60000
      );

      successToast(
        data?.message ||
          "OTP sent successfully."
      );
    } catch (error) {
      console.error(
        "DATALATTICE OTP REQUEST ERROR:",
        error
      );

      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Unable to send OTP. Please try again.";

      setErrors({
        phone: message,
      });

      errorToast(message);
    } finally {
      setOtpLoading(false);
    }
  };

  /* =========================================================
     VERIFY OTP
     ========================================================= */

  const handleVerifyOtp = async (event) => {
    event.preventDefault();

    if (!/^\d{6}$/.test(otp)) {
      setErrors({
        otp: "Please enter the 6-digit OTP.",
      });

      return;
    }

    setOtpVerifying(true);

    setErrors({});

    const internationalPhone =
      getInternationalPhone();

    try {
      const data = await verifySignupOtp(
        internationalPhone,
        otp
      );

      /*
       * Save verification information for the demo panel.
       *
       * The demo panel can use this temporary session state
       * until we connect the proper Lead backend flow.
       */
      sessionStorage.setItem(
        "datalattice_demo_verification",
        JSON.stringify({
          verified: true,
          verificationToken:
            data?.verificationToken || "",
          verified_at: new Date().toISOString(),
        })
      );

      /*
       * Tell HomeAccessGate that OTP verification has
       * completed successfully.
       *
       * HomeAccessGate uses this event to close the
       * floating signup modal.
       */
      window.dispatchEvent(
        new CustomEvent(
          "datalattice:demo-verified"
        )
      );

      successToast(
        data?.message ||
          "Phone number verified successfully."
      );

      /*
       * Redirect the visitor to the DataLattice demo
       * student experience.
       */
      window.setTimeout(() => {
        navigate("/demo/student", {
          replace: true,
        });
      }, 500);
    } catch (error) {
      console.error(
        "DATALATTICE OTP VERIFICATION ERROR:",
        error
      );

      const message =
        error?.response?.data?.message ||
        error?.message ||
        "OTP verification failed. Please try again.";

      setErrors({
        otp: message,
      });

      errorToast(message);
    } finally {
      setOtpVerifying(false);
    }
  };

  /* =========================================================
     CHANGE PHONE
     ========================================================= */

  const handleChangePhone = () => {
    setStep("details");
    setOtp("");
    setVerificationExpiresAt(null);
    setResendAvailableAt(null);

    setErrors({});
  };

  /* =========================================================
     RESEND OTP
     ========================================================= */

  const handleResendOtp = async () => {
    if (resendRemaining > 0 || otpLoading) {
      return;
    }

    const phoneError = validatePhone(phone);

    if (phoneError) {
      setErrors({
        phone: phoneError,
      });

      return;
    }

    setOtpLoading(true);

    setErrors({});

    const internationalPhone =
      getInternationalPhone();

    try {
      const data = await requestSignupOtp(
        internationalPhone
      );

      setOtp("");

      setVerificationExpiresAt(
        data?.expiresAt || null
      );

      setResendAvailableAt(
        Date.now() + 60000
      );

      successToast(
        data?.message ||
          "A new OTP has been sent."
      );
    } catch (error) {
      console.error(
        "DATALATTICE OTP RESEND ERROR:",
        error
      );

      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Unable to resend OTP.";

      setErrors({
        otp: message,
      });

      errorToast(message);
    } finally {
      setOtpLoading(false);
    }
  };

  /* =========================================================
     SHARED INPUT STYLE
     ========================================================= */

  const inputClass = `
    w-full
    rounded-full
    border
    border-[#E6EDF7]
    bg-white
    py-3.5
    pl-12
    pr-5
    text-sm
    font-medium
    text-[#111827]
    outline-none
    placeholder:text-[#94A3B8]
    transition-all
    duration-200
    hover:border-[#C9D7EA]
    focus:border-[#1463FF]
    focus:ring-4
    focus:ring-[#1463FF]/10
  `;

  /* =========================================================
     RENDER
     ========================================================= */

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 18,
        scale: 0.98,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      transition={{
        duration: 0.45,
        ease: "easeOut",
      }}
      className="
        relative
        z-20
        w-full
        max-w-[430px]
        rounded-[26px]
        border
        border-[#E6EDF7]
        bg-white
        px-5
        py-6
        shadow-[0_24px_70px_rgba(11,27,58,0.12)]
        sm:px-7
        sm:py-7
      "
    >
      {/* =====================================================
          HEADER
          ===================================================== */}

      <div className="text-center">
        <div
          className="
            mx-auto
            mb-3
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-2xl
          "
          style={{
            backgroundColor: "#EAF2FF",
            color: "#1463FF",
          }}
        >
          {step === "details" ? (
            <FaUser size={17} />
          ) : (
            <FaShieldHalved size={17} />
          )}
        </div>

        <h2
          className="
            text-[25px]
            font-black
            tracking-[-0.035em]
            text-[#0B1B3A]
            sm:text-[27px]
          "
        >
          {step === "details" ? (
            <>
              Explore{" "}
              <span className="text-[#1463FF]">
                DataLattice
              </span>
            </>
          ) : (
            <>
              Verify Your{" "}
              <span className="text-[#1463FF]">
                Number
              </span>
            </>
          )}
        </h2>

        <p className="mt-1.5 text-xs font-medium leading-5 text-[#64748B]">
          {step === "details"
            ? "Enter your details to start exploring our learning experience."
            : `Enter the 6-digit OTP sent to ${getInternationalPhone()}.`}
        </p>
      </div>

      {/* =====================================================
          FORM ERROR
          ===================================================== */}

      <AnimatePresence>
        {errors.form && (
          <motion.div
            initial={{
              opacity: 0,
              height: 0,
            }}
            animate={{
              opacity: 1,
              height: "auto",
            }}
            exit={{
              opacity: 0,
              height: 0,
            }}
            className="
              mt-4
              rounded-2xl
              border
              border-red-200
              bg-red-50
              px-4
              py-3
              text-xs
              font-medium
              text-red-600
            "
          >
            {errors.form}
          </motion.div>
        )}
      </AnimatePresence>

      {/* =====================================================
          DETAILS STEP
          ===================================================== */}

      {step === "details" && (
        <motion.form
          key="details"
          initial={{
            opacity: 0,
            x: -12,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          exit={{
            opacity: 0,
            x: 12,
          }}
          onSubmit={handleRequestOtp}
          noValidate
          className="mt-6 space-y-4"
        >
          {/* FULL NAME */}

          <div>
            <div className="relative">
              <FaUser
                className="
                  pointer-events-none
                  absolute
                  left-5
                  top-1/2
                  -translate-y-1/2
                  text-[#94A3B8]
                "
                size={15}
              />

              <input
                type="text"
                name="full_name"
                value={fullName}
                onChange={handleNameChange}
                placeholder="Full Name"
                autoComplete="name"
                autoFocus
                className={inputClass}
              />
            </div>

            {errors.fullName && (
              <p className="mt-1.5 px-3 text-[11px] text-red-500">
                {errors.fullName}
              </p>
            )}
          </div>

          {/* PHONE */}

          <div>
            <div
              data-country-selector
              className="
                relative
                flex
                w-full
                overflow-visible
                rounded-full
                border
                border-[#E6EDF7]
                bg-white
                transition-all
                duration-200
                hover:border-[#C9D7EA]
                focus-within:border-[#1463FF]
                focus-within:ring-4
                focus-within:ring-[#1463FF]/10
              "
            >
              {/* PHONE ICON */}

              <div
                className="
                  pointer-events-none
                  flex
                  shrink-0
                  items-center
                  pl-5
                  text-[#94A3B8]
                "
              >
                <FaPhone size={15} />
              </div>

              {/* COUNTRY SELECTOR */}

              <button
                type="button"
                onClick={() =>
                  setCountryDropdownOpen(
                    (previous) => !previous
                  )
                }
                aria-label="Select country code"
                aria-expanded={
                  countryDropdownOpen
                }
                className="
                  ml-2
                  flex
                  shrink-0
                  items-center
                  gap-1.5
                  border-r
                  border-[#E6EDF7]
                  px-3
                  py-1
                  text-sm
                  font-semibold
                  text-[#0B1B3A]
                  outline-none
                "
              >
                <span className="text-base leading-none">
                  {selectedCountry.flag}
                </span>

                <span>
                  {selectedCountry.dialCode}
                </span>

                <FaChevronDown
                  size={9}
                  className={`ml-0.5 text-[#94A3B8] transition-transform duration-200 ${
                    countryDropdownOpen
                      ? "rotate-180"
                      : ""
                  }`}
                />
              </button>

              {/* PHONE INPUT */}

              <input
                type="tel"
                name="phone"
                value={phone}
                onChange={handlePhoneChange}
                placeholder="Phone Number"
                autoComplete="tel-national"
                inputMode="numeric"
                maxLength={
                  selectedCountry.maxLength
                }
                className="
                  min-w-0
                  flex-1
                  rounded-r-full
                  bg-transparent
                  py-3.5
                  pl-3
                  pr-5
                  text-sm
                  font-medium
                  text-[#111827]
                  outline-none
                  placeholder:text-[#94A3B8]
                "
              />

              {/* COUNTRY DROPDOWN */}

              <AnimatePresence>
                {countryDropdownOpen && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: -6,
                      scale: 0.98,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      y: -6,
                      scale: 0.98,
                    }}
                    transition={{
                      duration: 0.16,
                    }}
                    className="
                      absolute
                      left-0
                      right-0
                      top-[calc(100%+8px)]
                      z-[60]
                      max-h-64
                      overflow-y-auto
                      rounded-2xl
                      border
                      border-[#E6EDF7]
                      bg-white
                      p-1.5
                      shadow-[0_20px_50px_rgba(11,27,58,0.16)]
                    "
                  >
                    {COUNTRY_CODES.map(
                      (country) => {
                        const isSelected =
                          selectedCountry.code ===
                          country.code;

                        return (
                          <button
                            key={country.code}
                            type="button"
                            onClick={() =>
                              handleCountryChange(
                                country
                              )
                            }
                            className={`
                              flex
                              w-full
                              items-center
                              gap-3
                              rounded-xl
                              px-3
                              py-2.5
                              text-left
                              transition-colors
                              ${
                                isSelected
                                  ? "bg-[#EAF2FF]"
                                  : "hover:bg-[#F5F9FF]"
                              }
                            `}
                          >
                            <span className="text-lg leading-none">
                              {country.flag}
                            </span>

                            <span className="min-w-0 flex-1">
                              <span
                                className={`
                                  block
                                  truncate
                                  text-xs
                                  font-semibold
                                  ${
                                    isSelected
                                      ? "text-[#1463FF]"
                                      : "text-[#0B1B3A]"
                                  }
                                `}
                              >
                                {country.name}
                              </span>
                            </span>

                            <span
                              className="
                                shrink-0
                                text-xs
                                font-bold
                                text-[#64748B]
                              "
                            >
                              {country.dialCode}
                            </span>

                            {isSelected && (
                              <FaCheck
                                size={11}
                                className="shrink-0 text-[#1463FF]"
                              />
                            )}
                          </button>
                        );
                      }
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {errors.phone && (
              <p className="mt-1.5 px-3 text-[11px] text-red-500">
                {errors.phone}
              </p>
            )}
          </div>

          {/* SIGN UP / CONTINUE */}

          <motion.button
            type="submit"
            disabled={otpLoading}
            whileHover={
              otpLoading
                ? undefined
                : {
                    y: -1,
                  }
            }
            whileTap={
              otpLoading
                ? undefined
                : {
                    scale: 0.985,
                  }
            }
            className="
              group
              mx-auto
              flex
              w-full
              items-center
              justify-center
              gap-2
              rounded-full
              bg-[#1463FF]
              px-7
              py-3.5
              text-sm
              font-bold
              text-white
              shadow-[0_12px_28px_rgba(20,99,255,0.22)]
              transition-all
              duration-200
              hover:bg-[#0F57E6]
              hover:shadow-[0_16px_34px_rgba(20,99,255,0.28)]
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            {otpLoading
              ? "SENDING OTP..."
              : "SIGN UP"}

            {!otpLoading && (
              <FaArrowRight
                size={12}
                className="
                  transition-transform
                  duration-200
                  group-hover:translate-x-1
                "
              />
            )}
          </motion.button>

          {/* PRIVACY NOTE */}

          <div
            className="
              flex
              items-start
              gap-2
              rounded-2xl
              bg-[#F5F9FF]
              px-3.5
              py-3
            "
          >
            <FaShieldHalved
              className="mt-0.5 shrink-0 text-[#1463FF]"
              size={12}
            />

            <p className="text-[10px] leading-[1.5] text-[#64748B]">
              Your phone number is used only to verify
              your access and provide the DataLattice
              learning experience.
            </p>
          </div>
        </motion.form>
      )}

      {/* =====================================================
          OTP STEP
          ===================================================== */}

      {step === "otp" && (
        <motion.form
          key="otp"
          initial={{
            opacity: 0,
            x: 12,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          exit={{
            opacity: 0,
            x: -12,
          }}
          onSubmit={handleVerifyOtp}
          noValidate
          className="mt-6"
        >
          {/* VERIFIED PHONE */}

          <div
            className="
              mb-4
              flex
              items-center
              justify-between
              rounded-2xl
              border
              border-[#E6EDF7]
              bg-[#F8FBFF]
              px-4
              py-3
            "
          >
            <div className="flex min-w-0 items-center gap-3">
              <div
                className="
                  flex
                  h-9
                  w-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-[#EAF2FF]
                  text-[#1463FF]
                "
              >
                <FaPhone size={13} />
              </div>

              <div className="min-w-0">
                <p className="text-[10px] font-medium text-[#64748B]">
                  OTP sent to
                </p>

                <p className="truncate text-xs font-bold text-[#0B1B3A]">
                  {getInternationalPhone()}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleChangePhone}
              className="
                shrink-0
                text-[10px]
                font-bold
                text-[#1463FF]
                hover:underline
              "
            >
              Change
            </button>
          </div>

          {/* OTP INPUT */}

          <div>
            <label
              htmlFor="datalattice-hero-otp"
              className="
                mb-2
                block
                px-2
                text-xs
                font-semibold
                text-[#334155]
              "
            >
              Enter OTP
            </label>

            <input
              id="datalattice-hero-otp"
              type="text"
              value={otp}
              onChange={(event) => {
                const value =
                  event.target.value
                    .replace(/\D/g, "")
                    .slice(0, 6);

                setOtp(value);

                setErrors((previous) => ({
                  ...previous,
                  otp: "",
                }));
              }}
              placeholder="••••••"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
              autoFocus
              className="
                w-full
                rounded-2xl
                border
                border-[#E6EDF7]
                bg-white
                px-5
                py-4
                text-center
                text-xl
                font-extrabold
                tracking-[0.45em]
                text-[#0B1B3A]
                outline-none
                placeholder:tracking-[0.35em]
                placeholder:text-[#CBD5E1]
                transition-all
                focus:border-[#1463FF]
                focus:ring-4
                focus:ring-[#1463FF]/10
              "
            />

            {errors.otp && (
              <p className="mt-1.5 px-2 text-[11px] text-red-500">
                {errors.otp}
              </p>
            )}
          </div>

          {/* VERIFY */}

          <motion.button
            type="submit"
            disabled={
              otpVerifying ||
              otp.length !== 6
            }
            whileHover={
              otpVerifying ||
              otp.length !== 6
                ? undefined
                : {
                    y: -1,
                  }
            }
            whileTap={
              otpVerifying ||
              otp.length !== 6
                ? undefined
                : {
                    scale: 0.985,
                  }
            }
            className="
              group
              mt-4
              flex
              w-full
              items-center
              justify-center
              gap-2
              rounded-full
              bg-[#1463FF]
              px-7
              py-3.5
              text-sm
              font-bold
              text-white
              shadow-[0_12px_28px_rgba(20,99,255,0.22)]
              transition-all
              duration-200
              hover:bg-[#0F57E6]
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            {otpVerifying
              ? "VERIFYING..."
              : "VERIFY & EXPLORE"}

            {!otpVerifying && (
              <FaArrowRight
                size={12}
                className="
                  transition-transform
                  duration-200
                  group-hover:translate-x-1
                "
              />
            )}
          </motion.button>

          {/* RESEND */}

          <div className="mt-4 text-center">
            {resendRemaining > 0 ? (
              <p className="text-[11px] text-[#94A3B8]">
                Resend OTP{" "}
                in{" "}
                <span className="font-bold text-[#64748B]">
                  {resendRemaining}s
                </span>
              </p>
            ) : (
              <button
                type="button"
                onClick={handleResendOtp}
                disabled={otpLoading}
                className="
                  text-[11px]
                  font-bold
                  text-[#1463FF]
                  hover:underline
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                {otpLoading
                  ? "Sending..."
                  : "Resend OTP"}
              </button>
            )}
          </div>

          {/* BACK */}

          <button
            type="button"
            onClick={handleChangePhone}
            className="
              mx-auto
              mt-4
              flex
              items-center
              gap-1.5
              text-[11px]
              font-semibold
              text-[#64748B]
              transition-colors
              hover:text-[#0B1B3A]
            "
          >
            <FaArrowLeft size={9} />
            Use a different number
          </button>

          {/* SECURITY NOTE */}

          <div
            className="
              mt-5
              flex
              items-start
              gap-2
              rounded-2xl
              bg-[#F5F9FF]
              px-3.5
              py-3
            "
          >
            <FaCheck
              className="mt-0.5 shrink-0 text-[#1463FF]"
              size={12}
            />

            <p className="text-[10px] leading-[1.5] text-[#64748B]">
              Your number is securely verified before
              giving you access to the DataLattice demo
              learning experience.
            </p>
          </div>

          {/* Keep variable intentionally referenced so
              expiry information from the existing OTP
              service remains available for future UI. */}
          {verificationExpiresAt && null}
        </motion.form>
      )}
    </motion.div>
  );
}

export default HeroSignupCard;