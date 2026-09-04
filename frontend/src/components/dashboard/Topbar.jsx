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
    // DATE
    // ============================================================

    const today =
        new Date().toLocaleDateString(
            "en-US",
            {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
            }
        );


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
        )}&background=4f46e5&color=fff&size=200`;


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
                rounded-2xl
                bg-white
                border
                border-slate-200
                shadow-sm
            "
        >

            <div
                className="
                    px-5
                    sm:px-6
                    lg:px-7
                    py-4
                "
            >

                <div
                    className="
                        flex
                        flex-col
                        xl:flex-row
                        xl:items-center
                        xl:justify-between
                        gap-5
                    "
                >

                    {/* ==================================================
                        LEFT SIDE
                    ================================================== */}

                    <div className="min-w-0">

                        <div className="flex items-center gap-2">

                            <span
                                className="
                                    inline-flex
                                    items-center
                                    gap-2
                                    rounded-full
                                    bg-indigo-50
                                    px-2.5
                                    py-1
                                    text-[10px]
                                    font-bold
                                    uppercase
                                    tracking-wider
                                    text-indigo-600
                                "
                            >

                                <span
                                    className="
                                        w-1.5
                                        h-1.5
                                        rounded-full
                                        bg-indigo-600
                                    "
                                />

                                Student Portal

                            </span>

                        </div>


                        <h1
                            className="
                                mt-2
                                text-2xl
                                sm:text-3xl
                                font-black
                                tracking-tight
                                text-slate-900
                            "
                        >

                            Welcome back, {firstName} 👋

                        </h1>


                        <p
                            className="
                                mt-1
                                text-sm
                                text-slate-500
                            "
                        >

                            Let's continue your learning
                            journey today.

                        </p>


                        <div
                            className="
                                mt-3
                                flex
                                items-center
                                gap-2
                                text-xs
                                sm:text-sm
                                text-slate-500
                            "
                        >

                            <FaCalendarAlt
                                className="text-indigo-600"
                            />

                            <span>
                                {today}
                            </span>

                        </div>

                    </div>


                    {/* ==================================================
                        RIGHT SIDE
                    ================================================== */}

                    <div
                        className="
                            flex
                            flex-wrap
                            items-center
                            gap-2.5
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
                                w-full
                                sm:w-64
                                lg:w-72
                            "
                        >

                            <FaSearch
                                className="
                                    absolute
                                    left-3.5
                                    top-1/2
                                    -translate-y-1/2
                                    text-slate-400
                                    text-sm
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
                                    w-full
                                    h-11
                                    rounded-xl
                                    bg-slate-100
                                    border
                                    border-transparent
                                    pl-10
                                    pr-4
                                    text-sm
                                    text-slate-700
                                    placeholder:text-slate-400
                                    outline-none
                                    transition-all
                                    focus:bg-white
                                    focus:border-indigo-200
                                    focus:ring-4
                                    focus:ring-indigo-50
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
                                w-11
                                h-11
                                shrink-0
                                rounded-xl
                                bg-slate-100
                                text-slate-600
                                flex
                                items-center
                                justify-center
                                hover:bg-indigo-50
                                hover:text-indigo-600
                                transition-all
                            "
                        >

                            <FaCalendarAlt />

                        </button>


                        {/* ==================================================
                            DARK MODE
                        ================================================== */}

                        <button
                            type="button"
                            title="Dark mode"
                            className="
                                w-11
                                h-11
                                shrink-0
                                rounded-xl
                                bg-slate-100
                                text-slate-600
                                flex
                                items-center
                                justify-center
                                hover:bg-slate-200
                                transition-all
                            "
                        >

                            <FaMoon />

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
                                relative
                                w-11
                                h-11
                                shrink-0
                                rounded-xl
                                bg-slate-100
                                text-slate-600
                                flex
                                items-center
                                justify-center
                                hover:bg-indigo-50
                                hover:text-indigo-600
                                transition-all
                            "
                        >

                            <FaBell />

                            <span
                                className="
                                    absolute
                                    -top-1
                                    -right-1
                                    min-w-4.5
                                    h-4.5
                                    px-1
                                    rounded-full
                                    bg-red-500
                                    text-white
                                    text-[9px]
                                    font-bold
                                    flex
                                    items-center
                                    justify-center
                                    border-2
                                    border-white
                                "
                            >

                                3

                            </span>

                        </button>


                        {/* ==================================================
                            PROFILE
                        ================================================== */}

                        <div className="relative">

                            <button
                                type="button"
                                onClick={() =>
                                    setProfileOpen(
                                        (previous) =>
                                            !previous
                                    )
                                }
                                className="
                                    flex
                                    items-center
                                    gap-2.5
                                    rounded-xl
                                    px-1.5
                                    py-1
                                    hover:bg-slate-50
                                    transition-all
                                "
                            >

                                <img
                                    src={avatar}
                                    alt="Student profile"
                                    className="
                                        w-10
                                        h-10
                                        rounded-xl
                                        object-cover
                                        shadow-sm
                                    "
                                    onError={(event) => {

                                        event.currentTarget.src =
                                            `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                                fullName
                                            )}&background=4f46e5&color=fff&size=200`;

                                    }}
                                />


                                <div
                                    className="
                                        hidden
                                        md:block
                                        text-left
                                        max-w-32
                                    "
                                >

                                    <p
                                        className="
                                            text-sm
                                            font-bold
                                            text-slate-800
                                            truncate
                                        "
                                    >

                                        {fullName}

                                    </p>

                                    <p
                                        className="
                                            text-[11px]
                                            text-slate-500
                                            capitalize
                                        "
                                    >

                                        {user?.role ||
                                            "student"}

                                    </p>

                                </div>


                                <FaChevronDown
                                    className={`
                                        hidden
                                        sm:block
                                        text-[10px]
                                        text-slate-400
                                        transition-transform
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


                                    {/* Menu */}

                                    <div
                                        className="
                                            absolute
                                            right-0
                                            top-full
                                            mt-2
                                            z-50
                                            w-60
                                            rounded-2xl
                                            bg-white
                                            border
                                            border-slate-200
                                            shadow-xl
                                            p-2
                                        "
                                    >

                                        {/* Account */}

                                        <div
                                            className="
                                                px-3
                                                py-2.5
                                                mb-1
                                                border-b
                                                border-slate-100
                                            "
                                        >

                                            <p
                                                className="
                                                    text-[10px]
                                                    font-bold
                                                    uppercase
                                                    tracking-wider
                                                    text-slate-400
                                                "
                                            >

                                                Signed in as

                                            </p>

                                            <p
                                                className="
                                                    mt-1
                                                    text-sm
                                                    font-bold
                                                    text-slate-800
                                                    truncate
                                                "
                                            >

                                                {fullName}

                                            </p>

                                        </div>


                                        {/* Profile */}

                                        <button
                                            type="button"
                                            onClick={() => {

                                                closeProfile();

                                                navigate(
                                                    "/student/profile"
                                                );

                                            }}
                                            className="
                                                w-full
                                                flex
                                                items-center
                                                gap-3
                                                px-3
                                                py-2.5
                                                rounded-xl
                                                text-sm
                                                text-slate-600
                                                hover:bg-indigo-50
                                                hover:text-indigo-600
                                                transition
                                            "
                                        >

                                            <FaUser />

                                            <span>
                                                My Profile
                                            </span>

                                        </button>


                                        {/* Settings */}

                                        <button
                                            type="button"
                                            onClick={() => {

                                                closeProfile();

                                                navigate(
                                                    "/student/settings"
                                                );

                                            }}
                                            className="
                                                w-full
                                                flex
                                                items-center
                                                gap-3
                                                px-3
                                                py-2.5
                                                rounded-xl
                                                text-sm
                                                text-slate-600
                                                hover:bg-indigo-50
                                                hover:text-indigo-600
                                                transition
                                            "
                                        >

                                            <FaCog />

                                            <span>
                                                Settings
                                            </span>

                                        </button>


                                        {/* Logout */}

                                        <div
                                            className="
                                                mt-1
                                                pt-1
                                                border-t
                                                border-slate-100
                                            "
                                        >

                                            <button
                                                type="button"
                                                onClick={
                                                    logout
                                                }
                                                className="
                                                    w-full
                                                    flex
                                                    items-center
                                                    gap-3
                                                    px-3
                                                    py-2.5
                                                    rounded-xl
                                                    text-sm
                                                    text-red-600
                                                    hover:bg-red-50
                                                    transition
                                                "
                                            >

                                                <FaSignOutAlt />

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

        </header>

    );

}

export default Topbar;