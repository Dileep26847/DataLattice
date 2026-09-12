import { useEffect, useState } from "react";

import {
    FaBell,
    FaCalendarAlt,
    FaSearch,
    FaMoon,
    FaChevronDown,
    FaUser,
    FaCog,
    FaSignOutAlt,
} from "react-icons/fa";

import {
    useNavigate,
} from "react-router-dom";


// ============================================================
// STUDENT TOPBAR
// ============================================================

function Topbar() {

    const navigate = useNavigate();


    // ============================================================
    // USER
    // ============================================================

    const getStoredUser = () => {

        try {

            return (
                JSON.parse(
                    localStorage.getItem("user")
                ) || {}
            );

        } catch {

            return {};

        }

    };


    const [user, setUser] = useState(
        getStoredUser
    );


    const [profileOpen, setProfileOpen] =
        useState(false);


    const [search, setSearch] =
        useState("");


    // ============================================================
    // SYNC USER
    // ============================================================

    useEffect(() => {

        const handleStorage = () => {

            setUser(
                getStoredUser()
            );

        };


        window.addEventListener(
            "storage",
            handleStorage
        );


        return () => {

            window.removeEventListener(
                "storage",
                handleStorage
            );

        };

    }, []);


    // ============================================================
    // USER INFORMATION
    // ============================================================

    const fullName =
        user?.full_name ||
        "Student";


    const firstName =
        fullName
            .trim()
            .split(/\s+/)[0] ||
        "Student";


    const avatar =
        user?.profile_image ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(
            fullName
        )}&background=1463FF&color=fff&size=200`;


    // ============================================================
    // LOGOUT
    // ============================================================

    const logout = () => {

        localStorage.clear();

        navigate(
            "/login",
            {
                replace: true,
            }
        );

    };


    // ============================================================
    // SEARCH
    // ============================================================

    const handleSearch = (event) => {

        event.preventDefault();


        const query =
            search.trim();


        if (!query) {

            return;

        }


        console.log(
            "Student search:",
            query
        );

    };


    // ============================================================
    // CLOSE PROFILE
    // ============================================================

    const closeProfile = () => {

        setProfileOpen(false);

    };


    // ============================================================
    // RENDER
    // ============================================================

    return (

        <header
            className="
                relative
                z-30
                w-full
            "
        >

            {/* ====================================================
                PROFESSIONAL GLASS CONTAINER
            ==================================================== */}

            <div
                className="
                    relative
                    overflow-visible
                    rounded-[18px]
                    border
                    border-white/75
                    bg-white/48
                    shadow-[0_8px_30px_rgba(11,27,58,0.06)]
                    backdrop-blur-[24px]
                    backdrop-saturate-150
                "
            >

                {/* ==================================================
                    GLASS TOP HIGHLIGHT
                ================================================== */}

                <div
                    className="
                        pointer-events-none
                        absolute
                        inset-x-0
                        top-0
                        h-px
                        rounded-full
                        bg-white/95
                    "
                />


                {/* ==================================================
                    GLASS INNER LIGHT
                ================================================== */}

                <div
                    className="
                        pointer-events-none
                        absolute
                        inset-0
                        rounded-[18px]
                        bg-gradient-to-br
                        from-white/55
                        via-transparent
                        to-[#EAF2FF]/25
                    "
                />


                {/* ==================================================
                    VERY SUBTLE GLASS EDGE
                ================================================== */}

                <div
                    className="
                        pointer-events-none
                        absolute
                        inset-[1px]
                        rounded-[17px]
                        border
                        border-white/25
                    "
                />


                {/* ==================================================
                    TOPBAR CONTENT
                ================================================== */}

                <div
                    className="
                        relative
                        px-4
                        py-2.5
                        sm:px-5
                        lg:px-6
                    "
                >

                    <div
                        className="
                            flex
                            flex-col
                            gap-2.5
                            xl:flex-row
                            xl:items-center
                            xl:justify-between
                            xl:gap-5
                        "
                    >

                        {/* ==================================================
                            LEFT SIDE
                        ================================================== */}

                        <div
                            className="
                                min-w-0
                                flex-1
                            "
                        >

                            {/* ==================================================
                                WELCOME
                            ================================================== */}

                            <h1
                                className="
                                    text-[20px]
                                    font-extrabold
                                    leading-tight
                                    tracking-[-0.03em]
                                    text-[#0B1B3A]
                                    sm:text-[22px]
                                    lg:text-[24px]
                                "
                            >

                                Welcome back, {firstName} 👋

                            </h1>


                            {/* ==================================================
                                DESCRIPTION
                            ================================================== */}

                            <p
                                className="
                                    mt-0.5
                                    text-[12px]
                                    leading-4
                                    text-[#64748B]
                                    sm:text-[13px]
                                "
                            >

                                Let's continue your learning
                                journey today.

                            </p>

                        </div>


                        {/* ==================================================
                            RIGHT SIDE
                        ================================================== */}

                        <div
                            className="
                                flex
                                w-full
                                flex-wrap
                                items-center
                                gap-1.5
                                xl:w-auto
                                xl:shrink-0
                                xl:justify-end
                            "
                        >

                            {/* ==================================================
                                SEARCH
                            ================================================== */}

                            <form
                                onSubmit={
                                    handleSearch
                                }
                                className="
                                    relative
                                    min-w-0
                                    w-full
                                    sm:w-[220px]
                                    lg:w-[250px]
                                    xl:w-[240px]
                                "
                            >

                                <FaSearch
                                    className="
                                        pointer-events-none
                                        absolute
                                        left-3
                                        top-1/2
                                        -translate-y-1/2
                                        text-[#94A3B8]
                                        text-[12px]
                                    "
                                />


                                <input
                                    type="text"
                                    value={search}
                                    onChange={(event) =>
                                        setSearch(
                                            event.target.value
                                        )
                                    }
                                    placeholder="Search courses..."
                                    className="
                                        h-9
                                        w-full
                                        rounded-lg
                                        border
                                        border-white/75
                                        bg-white/42
                                        pl-9
                                        pr-3
                                        text-[13px]
                                        text-[#0B1B3A]
                                        placeholder:text-[#94A3B8]
                                        shadow-[inset_0_1px_0_rgba(255,255,255,0.75),0_3px_12px_rgba(11,27,58,0.02)]
                                        outline-none
                                        backdrop-blur-xl
                                        transition-all
                                        duration-200
                                        focus:border-[#1463FF]/25
                                        focus:bg-white/70
                                        focus:shadow-[0_5px_16px_rgba(20,99,255,0.06)]
                                        focus:ring-4
                                        focus:ring-[#1463FF]/8
                                    "
                                />

                            </form>


                            {/* ==================================================
                                CALENDAR
                            ================================================== */}

                            <button
                                type="button"
                                onClick={() =>
                                    navigate(
                                        "/student/calendar"
                                    )
                                }
                                title="Calendar"
                                className="
                                    group
                                    flex
                                    h-9
                                    w-9
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-lg
                                    border
                                    border-white/75
                                    bg-white/42
                                    text-[#64748B]
                                    shadow-[inset_0_1px_0_rgba(255,255,255,0.75),0_3px_12px_rgba(11,27,58,0.02)]
                                    backdrop-blur-xl
                                    transition-all
                                    duration-200
                                    hover:-translate-y-0.5
                                    hover:border-white
                                    hover:bg-[#EAF2FF]/75
                                    hover:text-[#1463FF]
                                    hover:shadow-[0_6px_16px_rgba(20,99,255,0.07)]
                                "
                            >

                                <FaCalendarAlt
                                    size={12}
                                    className="
                                        transition-transform
                                        duration-200
                                        group-hover:scale-105
                                    "
                                />

                            </button>


                            {/* ==================================================
                                DARK MODE
                            ================================================== */}

                            <button
                                type="button"
                                title="Dark mode"
                                className="
                                    group
                                    flex
                                    h-9
                                    w-9
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-lg
                                    border
                                    border-white/75
                                    bg-white/42
                                    text-[#64748B]
                                    shadow-[inset_0_1px_0_rgba(255,255,255,0.75),0_3px_12px_rgba(11,27,58,0.02)]
                                    backdrop-blur-xl
                                    transition-all
                                    duration-200
                                    hover:-translate-y-0.5
                                    hover:border-white
                                    hover:bg-[#EAF2FF]/75
                                    hover:text-[#1463FF]
                                "
                            >

                                <FaMoon
                                    size={12}
                                    className="
                                        transition-transform
                                        duration-200
                                        group-hover:rotate-12
                                    "
                                />

                            </button>


                            {/* ==================================================
                                NOTIFICATIONS
                            ================================================== */}

                            <button
                                type="button"
                                onClick={() =>
                                    navigate(
                                        "/student/settings"
                                    )
                                }
                                title="Notifications"
                                className="
                                    group
                                    relative
                                    flex
                                    h-9
                                    w-9
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-lg
                                    border
                                    border-white/75
                                    bg-white/42
                                    text-[#64748B]
                                    shadow-[inset_0_1px_0_rgba(255,255,255,0.75),0_3px_12px_rgba(11,27,58,0.02)]
                                    backdrop-blur-xl
                                    transition-all
                                    duration-200
                                    hover:-translate-y-0.5
                                    hover:border-white
                                    hover:bg-[#EAF2FF]/75
                                    hover:text-[#1463FF]
                                "
                            >

                                <FaBell
                                    size={12}
                                    className="
                                        transition-transform
                                        duration-200
                                        group-hover:scale-105
                                    "
                                />


                                <span
                                    className="
                                        absolute
                                        -right-1
                                        -top-1
                                        flex
                                        h-4
                                        min-w-4
                                        items-center
                                        justify-center
                                        rounded-full
                                        border-2
                                        border-white
                                        bg-[#1463FF]
                                        px-0.5
                                        text-[7px]
                                        font-bold
                                        leading-none
                                        text-white
                                        shadow-[0_2px_8px_rgba(20,99,255,0.22)]
                                    "
                                >

                                    3

                                </span>

                            </button>


                            {/* ==================================================
                                PROFILE
                            ================================================== */}

                            <div
                                className="
                                    relative
                                    shrink-0
                                "
                            >

                                <button
                                    type="button"
                                    onClick={() =>
                                        setProfileOpen(
                                            (previous) =>
                                                !previous
                                        )
                                    }
                                    className="
                                        group
                                        flex
                                        items-center
                                        gap-1.5
                                        rounded-lg
                                        border
                                        border-transparent
                                        bg-white/18
                                        px-1
                                        py-0.5
                                        transition-all
                                        duration-200
                                        hover:border-white/75
                                        hover:bg-white/45
                                        hover:shadow-[0_5px_15px_rgba(11,27,58,0.035)]
                                    "
                                >

                                    {/* Avatar */}

                                    <img
                                        src={avatar}
                                        alt="Student profile"
                                        className="
                                            h-8
                                            w-8
                                            rounded-lg
                                            border-2
                                            border-white/90
                                            object-cover
                                            shadow-[0_4px_12px_rgba(11,27,58,0.08)]
                                        "
                                        onError={(event) => {

                                            event.currentTarget.src =
                                                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                                    fullName
                                                )}&background=1463FF&color=fff&size=200`;

                                        }}
                                    />


                                    {/* User Details */}

                                    <div
                                        className="
                                            hidden
                                            min-w-0
                                            max-w-[110px]
                                            text-left
                                            md:block
                                        "
                                    >

                                        <p
                                            className="
                                                truncate
                                                text-[12px]
                                                font-bold
                                                leading-tight
                                                text-[#0B1B3A]
                                            "
                                        >

                                            {fullName}

                                        </p>


                                        <p
                                            className="
                                                mt-0.5
                                                text-[9px]
                                                font-medium
                                                capitalize
                                                leading-tight
                                                text-[#64748B]
                                            "
                                        >

                                            {user?.role ||
                                                "student"}

                                        </p>

                                    </div>


                                    <FaChevronDown
                                        className={`
                                            hidden
                                            text-[8px]
                                            text-[#64748B]
                                            transition-transform
                                            duration-200
                                            sm:block
                                            ${
                                                profileOpen
                                                    ? "rotate-180"
                                                    : ""
                                            }
                                        `}
                                    />

                                </button>


                                {/* ==================================================
                                    PROFILE DROPDOWN
                                ================================================== */}

                                {profileOpen && (

                                    <>

                                        {/* Backdrop */}

                                        <button
                                            type="button"
                                            aria-label="Close profile menu"
                                            onClick={
                                                closeProfile
                                            }
                                            className="
                                                fixed
                                                inset-0
                                                z-40
                                                cursor-default
                                            "
                                        />


                                        {/* ==================================================
                                            GLASS DROPDOWN
                                        ================================================== */}

                                        <div
                                            className="
                                                absolute
                                                right-0
                                                top-full
                                                z-50
                                                mt-2
                                                w-[230px]
                                                overflow-hidden
                                                rounded-2xl
                                                border
                                                border-white/80
                                                bg-white/75
                                                p-2
                                                shadow-[0_24px_65px_rgba(11,27,58,0.15)]
                                                backdrop-blur-[26px]
                                                backdrop-saturate-150
                                            "
                                        >

                                            {/* Glass Highlight */}

                                            <div
                                                className="
                                                    pointer-events-none
                                                    absolute
                                                    inset-x-0
                                                    top-0
                                                    h-px
                                                    bg-white
                                                "
                                            />


                                            {/* ==================================================
                                                ACCOUNT
                                            ================================================== */}

                                            <div
                                                className="
                                                    relative
                                                    mb-1
                                                    rounded-xl
                                                    border
                                                    border-white/70
                                                    bg-[#F5F9FF]/70
                                                    px-3
                                                    py-2.5
                                                "
                                            >

                                                <p
                                                    className="
                                                        text-[9px]
                                                        font-bold
                                                        uppercase
                                                        tracking-[0.1em]
                                                        text-[#94A3B8]
                                                    "
                                                >

                                                    Signed in as

                                                </p>


                                                <p
                                                    className="
                                                        mt-1
                                                        truncate
                                                        text-sm
                                                        font-bold
                                                        text-[#0B1B3A]
                                                    "
                                                >

                                                    {fullName}

                                                </p>

                                            </div>


                                            {/* ==================================================
                                                PROFILE
                                            ================================================== */}

                                            <button
                                                type="button"
                                                onClick={() => {

                                                    closeProfile();

                                                    navigate(
                                                        "/student/profile"
                                                    );

                                                }}
                                                className="
                                                    flex
                                                    w-full
                                                    items-center
                                                    gap-3
                                                    rounded-xl
                                                    px-3
                                                    py-2.5
                                                    text-left
                                                    text-sm
                                                    font-medium
                                                    text-[#64748B]
                                                    transition-all
                                                    duration-200
                                                    hover:bg-[#EAF2FF]/80
                                                    hover:text-[#1463FF]
                                                "
                                            >

                                                <span
                                                    className="
                                                        flex
                                                        h-8
                                                        w-8
                                                        items-center
                                                        justify-center
                                                        rounded-lg
                                                        border
                                                        border-white/80
                                                        bg-[#EAF2FF]/75
                                                        text-[#1463FF]
                                                        shadow-sm
                                                    "
                                                >

                                                    <FaUser
                                                        size={12}
                                                    />

                                                </span>


                                                <span>
                                                    My Profile
                                                </span>

                                            </button>


                                            {/* ==================================================
                                                SETTINGS
                                            ================================================== */}

                                            <button
                                                type="button"
                                                onClick={() => {

                                                    closeProfile();

                                                    navigate(
                                                        "/student/settings"
                                                    );

                                                }}
                                                className="
                                                    flex
                                                    w-full
                                                    items-center
                                                    gap-3
                                                    rounded-xl
                                                    px-3
                                                    py-2.5
                                                    text-left
                                                    text-sm
                                                    font-medium
                                                    text-[#64748B]
                                                    transition-all
                                                    duration-200
                                                    hover:bg-[#EAF2FF]/80
                                                    hover:text-[#1463FF]
                                                "
                                            >

                                                <span
                                                    className="
                                                        flex
                                                        h-8
                                                        w-8
                                                        items-center
                                                        justify-center
                                                        rounded-lg
                                                        border
                                                        border-white/80
                                                        bg-white/50
                                                        text-[#64748B]
                                                    "
                                                >

                                                    <FaCog
                                                        size={12}
                                                    />

                                                </span>


                                                <span>
                                                    Settings
                                                </span>

                                            </button>


                                            {/* ==================================================
                                                LOGOUT
                                            ================================================== */}

                                            <div
                                                className="
                                                    mt-1
                                                    border-t
                                                    border-white/70
                                                    pt-1
                                                "
                                            >

                                                <button
                                                    type="button"
                                                    onClick={
                                                        logout
                                                    }
                                                    className="
                                                        flex
                                                        w-full
                                                        items-center
                                                        gap-3
                                                        rounded-xl
                                                        px-3
                                                        py-2.5
                                                        text-left
                                                        text-sm
                                                        font-medium
                                                        text-red-600
                                                        transition-all
                                                        duration-200
                                                        hover:bg-red-50/80
                                                    "
                                                >

                                                    <span
                                                        className="
                                                            flex
                                                            h-8
                                                            w-8
                                                            items-center
                                                            justify-center
                                                            rounded-lg
                                                            border
                                                            border-red-100/70
                                                            bg-red-50/70
                                                            text-red-500
                                                        "
                                                    >

                                                        <FaSignOutAlt
                                                            size={12}
                                                        />

                                                    </span>


                                                    <span>
                                                        Logout
                                                    </span>

                                                </button>

                                            </div>

                                        </div>

                                    </>

                                )}

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </header>

    );

}


export default Topbar;