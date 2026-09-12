import { useEffect, useState } from "react";

import { motion } from "framer-motion";

import {
    FaUser,
    FaEnvelope,
    FaPhone,
    FaLock,
    FaEye,
    FaEyeSlash,
    FaGraduationCap,
    FaArrowRight,
    FaCheck,
    FaShieldHalved,
} from "react-icons/fa6";

import {
    Link,
    useNavigate,
} from "react-router-dom";

import {
    registerUser,
    requestSignupOtp,
    verifySignupOtp,
} from "../../services/authService";

import {
    successToast,
    errorToast,
} from "../../utils/toast";


// ============================================================
// HERO SIGNUP CARD
// ============================================================

function HeroSignupCard() {

    const navigate = useNavigate();


    // ============================================================
    // FORM
    // ============================================================

    const [formData, setFormData] = useState({

        full_name: "",

        email: "",

        phone: "",

        password: "",

        graduation_year: "",

    });


    // ============================================================
    // STATE
    // ============================================================

    const [errors, setErrors] = useState({});

    const [showPassword, setShowPassword] =
        useState(false);

    const [loading, setLoading] =
        useState(false);

    const [otpLoading, setOtpLoading] =
        useState(false);

    const [otpVerifying, setOtpVerifying] =
        useState(false);

    const [otp, setOtp] =
        useState("");

    const [phoneVerified, setPhoneVerified] =
        useState(false);

    const [verificationToken, setVerificationToken] =
        useState("");

    const [verificationExpiresAt, setVerificationExpiresAt] =
        useState(null);

    const [resendAvailableAt, setResendAvailableAt] =
        useState(null);

    const [resendRemaining, setResendRemaining] =
        useState(0);

    const [acceptedTerms, setAcceptedTerms] =
        useState(false);


    // ============================================================
    // OTP COUNTDOWN
    // ============================================================

    useEffect(() => {

        if (!resendAvailableAt) {

            setResendRemaining(0);

            return;

        }


        const updateCountdown = () => {

            const remainingMs =
                Math.max(
                    0,
                    resendAvailableAt - Date.now()
                );


            const remainingSeconds =
                Math.ceil(
                    remainingMs / 1000
                );


            setResendRemaining(
                remainingSeconds
            );


            if (remainingSeconds === 0) {

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

            window.clearInterval(
                interval
            );

        };

    }, [resendAvailableAt]);


    // ============================================================
    // HANDLE CHANGE
    // ============================================================

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

            form: "",

        }));


        if (name === "phone") {

            setPhoneVerified(false);

            setVerificationToken("");

            setOtp("");

            setVerificationExpiresAt(null);

            setResendAvailableAt(null);

        }

    };


    // ============================================================
    // VALIDATE NAME
    // ============================================================

    const validateName = (name) => {

        const value =
            name.trim();


        if (!value) {

            return "Full name is required.";

        }


        if (value.length < 2) {

            return "Enter your full name.";

        }


        if (!/^[A-Za-zÀ-ÿ\s.'-]+$/.test(value)) {

            return "Please enter a valid name.";

        }


        return "";

    };


    // ============================================================
    // VALIDATE EMAIL
    // ============================================================

    const validateEmail = (email) => {

        const value =
            email.trim();


        if (!value) {

            return "Email address is required.";

        }


        if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)
        ) {

            return "Please enter a valid email.";

        }


        return "";

    };


    // ============================================================
    // VALIDATE PHONE
    // ============================================================

    const validatePhone = (phone) => {

        const value =
            phone.trim();


        if (!value) {

            return "Phone number is required.";

        }


        if (!/^[0-9+\-\s()]{10,15}$/.test(value)) {

            return "Please enter a valid phone number.";

        }


        return "";

    };


    // ============================================================
    // VALIDATE PASSWORD
    // ============================================================

    const validatePassword = (password) => {

        if (!password) {

            return "Password is required.";

        }


        if (password.length < 6) {

            return "Password must contain at least 6 characters.";

        }


        return "";

    };


    // ============================================================
    // VALIDATE FORM
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


        if (!acceptedTerms) {

            newErrors.terms =
                "Please accept the terms to continue.";

        }


        if (!phoneVerified) {

            newErrors.phone =
                "Please verify your phone number with OTP.";

        }


        setErrors(newErrors);


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

            setErrors((previous) => ({

                ...previous,

                phone:
                    phoneError,

            }));

            return;

        }


        setOtpLoading(true);


        setErrors((previous) => ({

            ...previous,

            phone: "",

            form: "",

        }));


        try {

            const data =
                await requestSignupOtp(
                    formData.phone.trim()
                );


            setPhoneVerified(false);

            setVerificationToken("");

            setOtp("");

            setVerificationExpiresAt(
                data?.expiresAt ||
                null
            );


            setResendAvailableAt(
                Date.now() + 60000
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


            setErrors((previous) => ({

                ...previous,

                phone:
                    message,

            }));


            errorToast(
                message
            );

        }

        finally {

            setOtpLoading(false);

        }

    };


    // ============================================================
    // VERIFY OTP
    // ============================================================

    const handleVerifyOtp = async () => {

        if (!/^\d{6}$/.test(otp)) {

            setErrors((previous) => ({

                ...previous,

                otp:
                    "Enter the 6-digit OTP.",

            }));

            return;

        }


        setOtpVerifying(true);


        setErrors((previous) => ({

            ...previous,

            otp: "",

            form: "",

        }));


        try {

            const data =
                await verifySignupOtp(
                    formData.phone.trim(),
                    otp
                );


            setPhoneVerified(true);

            setVerificationToken(
                data?.verificationToken ||
                ""
            );

            setVerificationExpiresAt(
                data?.verificationExpiresAt ||
                null
            );

            setResendAvailableAt(null);


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
                "OTP verification failed.";


            setErrors((previous) => ({

                ...previous,

                otp:
                    message,

            }));


            errorToast(
                message
            );

        }

        finally {

            setOtpVerifying(false);

        }

    };


    // ============================================================
    // CHANGE PHONE
    // ============================================================

    const handleChangePhone = () => {

        setPhoneVerified(false);

        setVerificationToken("");

        setVerificationExpiresAt(null);

        setOtp("");

        setResendAvailableAt(null);

        setErrors((previous) => ({

            ...previous,

            phone: "",

            otp: "",

            form: "",

        }));

    };


    // ============================================================
    // SUBMIT
    // ============================================================

    const handleSubmit = async (event) => {

        event.preventDefault();


        if (!validateForm()) {

            return;

        }


        if (!verificationToken) {

            setErrors((previous) => ({

                ...previous,

                form:
                    "Phone verification is required before creating your account.",

            }));

            return;

        }


        setLoading(true);


        try {

            const data =
                await registerUser({

                    full_name:
                        formData.full_name
                            .trim(),

                    email:
                        formData.email
                            .trim()
                            .toLowerCase(),

                    phone:
                        formData.phone
                            .trim(),

                    password:
                        formData.password,

                    verificationToken,

                    graduation_year:
                        formData.graduation_year,

                });


            successToast(
                data?.message ||
                "Account created successfully."
            );


            setTimeout(() => {

                navigate(
                    "/login",
                    {
                        replace: true,
                    }
                );

            }, 700);

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

            setLoading(false);

        }

    };


    // ============================================================
    // INPUT CLASS
    // ============================================================

    const inputClass = `
        w-full
        rounded-full
        border
        border-slate-300
        bg-white
        py-3.5
        pl-12
        pr-5
        text-sm
        font-medium
        text-slate-700
        outline-none
        placeholder:text-slate-500
        transition-all
        duration-200
        hover:border-slate-400
        focus:border-slate-500
        focus:bg-white
        focus:ring-0
    `;


    // ============================================================
    // PASSWORD INPUT CLASS
    // ============================================================

    const passwordInputClass = `
        w-full
        rounded-full
        border
        border-slate-300
        bg-white
        py-3.5
        pl-12
        pr-12
        text-sm
        font-medium
        text-slate-700
        outline-none
        placeholder:text-slate-500
        transition-all
        duration-200
        hover:border-slate-400
        focus:border-slate-500
        focus:bg-white
        focus:ring-0
    `;


    // ============================================================
    // SELECT CLASS
    // ============================================================

    const selectClass = `
        w-full
        appearance-none
        rounded-full
        border
        border-slate-300
        bg-white
        py-3.5
        pl-12
        pr-11
        text-sm
        font-medium
        text-slate-500
        outline-none
        transition-all
        duration-200
        hover:border-slate-400
        focus:border-slate-500
        focus:bg-white
        focus:ring-0
    `;


    // ============================================================
    // RENDER
    // ============================================================

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
                max-w-[470px]
                rounded-[24px]
                border
                border-slate-200
                bg-white
                px-6
                py-6
                shadow-[0_20px_60px_rgba(15,23,42,0.12)]
                sm:px-7
                sm:py-7
            "
        >

            {/* =====================================================
                CARD HEADER
            ====================================================== */}

            <div
                className="
                    text-center
                "
            >

                <h2
                    className="
                        text-[25px]
                        font-black
                        tracking-[-0.03em]
                        text-slate-950
                        sm:text-[27px]
                    "
                >

                    Join{" "}

                    <span
                        className="
                            bg-gradient-to-r
                            from-blue-600
                            via-indigo-600
                            to-sky-500
                            bg-clip-text
                            text-transparent
                        "
                    >
                        DataLattice
                    </span>

                </h2>


                <p
                    className="
                        mt-1.5
                        text-xs
                        font-medium
                        text-slate-500
                    "
                >

                    Start your learning journey today.

                </p>

            </div>


            {/* =====================================================
                SERVER ERROR
            ====================================================== */}

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


            {/* =====================================================
                FORM
            ====================================================== */}

            <form
                onSubmit={handleSubmit}
                noValidate
                className="mt-5 space-y-3.5"
            >

                {/* =================================================
                    FULL NAME
                ================================================== */}

                <div>

                    <div className="relative">

                        <FaUser
                            className="
                                pointer-events-none
                                absolute
                                left-5
                                top-1/2
                                -translate-y-1/2
                                text-slate-400
                            "
                            size={15}
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
                            placeholder="Full Name"
                            autoComplete="name"
                            className={
                                inputClass
                            }
                        />

                    </div>


                    {errors.full_name && (

                        <p
                            className="
                                mt-1
                                px-3
                                text-[11px]
                                text-red-500
                            "
                        >

                            {errors.full_name}

                        </p>

                    )}

                </div>


                {/* =================================================
                    EMAIL
                ================================================== */}

                <div>

                    <div className="relative">

                        <FaEnvelope
                            className="
                                pointer-events-none
                                absolute
                                left-5
                                top-1/2
                                -translate-y-1/2
                                text-slate-400
                            "
                            size={15}
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
                            placeholder="Email Address"
                            autoComplete="email"
                            className={
                                inputClass
                            }
                        />

                    </div>


                    {errors.email && (

                        <p
                            className="
                                mt-1
                                px-3
                                text-[11px]
                                text-red-500
                            "
                        >

                            {errors.email }

                        </p>

                    )}

                </div>


                {/* =================================================
                    PHONE
                ================================================== */}

                <div>

                    <div
                        className="
                            flex
                            items-center
                            gap-3
                        "
                    >

                        <div
                            className="
                                relative
                                min-w-0
                                flex-1
                            "
                        >

                            <FaPhone
                                className="
                                    pointer-events-none
                                    absolute
                                    left-5
                                    top-1/2
                                    -translate-y-1/2
                                    text-slate-400
                                "
                                size={15}
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
                                placeholder="Phone Number"
                                autoComplete="tel"
                                inputMode="tel"
                                disabled={
                                    phoneVerified
                                }
                                className={`
                                    ${inputClass}
                                    ${phoneVerified
                                        ? "bg-slate-50 pr-12"
                                        : ""
                                    }
                                `}
                            />


                            {phoneVerified && (

                                <FaCheck
                                    className="
                                        pointer-events-none
                                        absolute
                                        right-5
                                        top-1/2
                                        -translate-y-1/2
                                        text-emerald-500
                                    "
                                    size={15}
                                />

                            )}

                        </div>


                        {!phoneVerified && (

                            <button
                                type="button"
                                onClick={
                                    handleRequestOtp
                                }
                                disabled={
                                    otpLoading ||
                                    resendRemaining > 0
                                }
                                className="
                                    shrink-0
                                    rounded-full
                                    border
                                    border-slate-200
                                    bg-white
                                    px-5
                                    py-3.5
                                    text-[11px]
                                    font-semibold
                                    text-slate-700
                                    transition-all
                                    duration-200
                                    hover:border-slate-400
                                    hover:bg-slate-50
                                    disabled:cursor-not-allowed
                                    disabled:opacity-50
                                "
                            >

                                {otpLoading

                                    ? "SENDING..."

                                    : resendRemaining > 0

                                        ? `RESEND ${resendRemaining}s`

                                        : "SEND OTP"

                                }

                            </button>

                        )}


                        {phoneVerified && (

                            <span
                                className="
                                    shrink-0
                                    rounded-full
                                    border
                                    border-emerald-200
                                    bg-emerald-50
                                    px-4
                                    py-3.5
                                    text-[11px]
                                    font-bold
                                    text-emerald-600
                                "
                            >

                                VERIFIED

                            </span>

                        )}

                    </div>


                    {errors.phone && (

                        <p
                            className="
                                mt-1
                                px-3
                                text-[11px]
                                text-red-500
                            "
                        >

                            {errors.phone}

                        </p>

                    )}

                </div>


                {/* =================================================
                    OTP VERIFICATION
                ================================================== */}

                {!phoneVerified && verificationExpiresAt && (

                    <motion.div

                        initial={{
                            opacity: 0,
                            y: -4,
                        }}

                        animate={{
                            opacity: 1,
                            y: 0,
                        }}

                        className="
                            rounded-2xl
                            border
                            border-slate-200
                            bg-slate-50
                            p-4
                        "
                    >

                        <div
                            className="
                                flex
                                items-center
                                gap-2
                            "
                        >

                            <FaShieldHalved
                                className="text-slate-500"
                                size={13}
                            />

                            <p
                                className="
                                    text-xs
                                    font-semibold
                                    text-slate-700
                                "
                            >

                                Verify your phone number

                            </p>

                        </div>


                        <p
                            className="
                                mt-1
                                text-[11px]
                                leading-relaxed
                                text-slate-500
                            "
                        >

                            Enter the 6-digit verification code
                            sent to your phone.

                        </p>


                        <div
                            className="
                                mt-3
                                flex
                                items-center
                                gap-2
                            "
                        >

                            <input
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

                                        form: "",

                                    }));

                                }}
                                placeholder="6-digit OTP"
                                inputMode="numeric"
                                autoComplete="one-time-code"
                                maxLength={6}
                                className="
                                    min-w-0
                                    flex-1
                                    rounded-full
                                    border
                                    border-slate-300
                                    bg-white
                                    px-5
                                    py-3.5
                                    text-sm
                                    font-semibold
                                    tracking-[0.22em]
                                    text-slate-800
                                    outline-none
                                    transition-all
                                    duration-200
                                    placeholder:tracking-normal
                                    placeholder:text-slate-400
                                    focus:border-slate-500
                                    focus:ring-0
                                "
                            />


                            <button
                                type="button"
                                onClick={
                                    handleVerifyOtp
                                }
                                disabled={
                                    otpVerifying ||
                                    otp.length !== 6
                                }
                                className="
                                    shrink-0
                                    rounded-full
                                    bg-slate-900
                                    px-5
                                    py-3.5
                                    text-[11px]
                                    font-bold
                                    text-white
                                    transition-all
                                    duration-200
                                    hover:bg-slate-800
                                    disabled:cursor-not-allowed
                                    disabled:opacity-50
                                "
                            >

                                {otpVerifying
                                    ? "VERIFYING..."
                                    : "VERIFY"
                                }

                            </button>

                        </div>


                        {errors.otp && (

                            <p
                                className="
                                    mt-1.5
                                    px-2
                                    text-[11px]
                                    text-red-500
                                "
                            >

                                {errors.otp}

                            </p>

                        )}


                        <button
                            type="button"
                            onClick={
                                handleChangePhone
                            }
                            className="
                                mt-3
                                px-2
                                text-[11px]
                                font-semibold
                                text-slate-500
                                transition-colors
                                hover:text-slate-800
                            "
                        >

                            Change phone number

                        </button>

                    </motion.div>

                )}


                {/* =================================================
                    PASSWORD
                ================================================== */}

                <div>

                    <div className="relative">

                        <FaLock
                            className="
                                pointer-events-none
                                absolute
                                left-5
                                top-1/2
                                -translate-y-1/2
                                text-slate-400
                            "
                            size={15}
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
                            placeholder="Password"
                            autoComplete="new-password"
                            className={
                                passwordInputClass
                            }
                        />


                        <button
                            type="button"
                            onClick={() =>
                                setShowPassword(
                                    (previous) =>
                                        !previous
                                )
                            }
                            aria-label={
                                showPassword
                                    ? "Hide password"
                                    : "Show password"
                            }
                            className="
                                absolute
                                right-5
                                top-1/2
                                flex
                                -translate-y-1/2
                                items-center
                                justify-center
                                text-slate-400
                                transition-colors
                                hover:text-slate-700
                            "
                        >

                            {showPassword
                                ? (
                                    <FaEyeSlash
                                        size={16}
                                    />
                                )
                                : (
                                    <FaEye
                                        size={16}
                                    />
                                )
                            }

                        </button>

                    </div>


                    {errors.password && (

                        <p
                            className="
                                mt-1
                                px-3
                                text-[11px]
                                text-red-500
                            "
                        >

                            {errors.password}

                        </p>

                    )}

                </div>


                {/* =================================================
                    GRADUATION YEAR
                ================================================== */}

                <div>

                    <div className="relative">

                        <FaGraduationCap
                            className="
                                pointer-events-none
                                absolute
                                left-5
                                top-1/2
                                z-10
                                -translate-y-1/2
                                text-slate-400
                            "
                            size={15}
                        />


                        <select
                            name="graduation_year"
                            value={
                                formData.graduation_year
                            }
                            onChange={
                                handleChange
                            }
                            className={
                                selectClass
                            }
                        >

                            <option
                                value=""
                            >
                                Graduation Year
                            </option>

                            <option value="2024">
                                2024
                            </option>

                            <option value="2025">
                                2025
                            </option>

                            <option value="2026">
                                2026
                            </option>

                            <option value="2027">
                                2027
                            </option>

                            <option value="2028">
                                2028
                            </option>

                            <option value="2029">
                                2029
                            </option>

                            <option value="2030">
                                2030
                            </option>

                            <option value="2031">
                                2031
                            </option>

                            <option value="2032">
                                2032
                            </option>

                            <option value="2033">
                                2033
                            </option>

                            <option value="2034">
                                2034
                            </option>

                            <option value="2035">
                                2035
                            </option>

                        </select>


                        <span
                            className="
                                pointer-events-none
                                absolute
                                right-5
                                top-1/2
                                -translate-y-1/2
                                text-slate-400
                            "
                        >

                            <svg
                                width="12"
                                height="8"
                                viewBox="0 0 12 8"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >

                                <path
                                    d="M1 1.5L6 6.5L11 1.5"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />

                            </svg>

                        </span>

                    </div>

                </div>


                {/* =================================================
                    CONSENT
                ================================================== */}

                <div className="pt-1">

                    <label
                        className="
                            flex
                            cursor-pointer
                            items-start
                            gap-2.5
                            px-1
                        "
                    >

                        <input
                            type="checkbox"
                            checked={acceptedTerms}
                            onChange={(event) =>
                                setAcceptedTerms(
                                    event.target.checked
                                )
                            }
                            className="
                                mt-0.5
                                h-4
                                w-4
                                shrink-0
                                cursor-pointer
                                accent-blue-600
                            "
                        />


                        <span
                            className="
                                text-[10px]
                                leading-[1.45]
                                text-slate-500
                            "
                        >

                            I authorize DataLattice and its
                            representatives to contact me with
                            updates and notifications via Email,
                            SMS, WhatsApp, and Call. This consent
                            is subject to our Terms & Conditions
                            and Privacy Policy.

                        </span>

                    </label>


                    {errors.terms && (

                        <p
                            className="
                                mt-1
                                px-3
                                text-[11px]
                                text-red-500
                            "
                        >

                            {errors.terms}

                        </p>

                    )}

                </div>


                {/* =================================================
                    SIGN UP BUTTON
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
                            ? undefined
                            : {
                                y: -1,
                            }
                    }

                    whileTap={
                        loading ||
                        !phoneVerified
                            ? undefined
                            : {
                                scale: 0.985,
                            }
                    }

                    className="
                        group
                        mx-auto
                        mt-2
                        flex
                        min-w-[145px]
                        items-center
                        justify-center
                        gap-2
                        rounded-full
                        bg-gradient-to-r
                        from-blue-600
                        via-indigo-600
                        to-sky-500
                        px-8
                        py-3.5
                        text-sm
                        font-bold
                        text-white
                        shadow-[0_10px_25px_rgba(37,99,235,0.20)]
                        transition-all
                        duration-200
                        hover:shadow-[0_14px_30px_rgba(37,99,235,0.28)]
                        disabled:cursor-not-allowed
                        disabled:opacity-50
                    "
                >

                    {loading

                        ? "Creating account..."

                        : "SIGN UP"

                    }


                    {!loading && (

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


                {/* =================================================
                    LOGIN
                ================================================== */}

                <p
                    className="
                        pt-1
                        text-center
                        text-[11px]
                        text-slate-400
                    "
                >

                    Already have an account?{" "}

                    <Link
                        to="/login"
                        className="
                            font-bold
                            text-blue-600
                            transition-colors
                            hover:text-indigo-600
                        "
                    >
                        Login here
                    </Link>

                </p>

            </form>

        </motion.div>

    );

}


export default HeroSignupCard;