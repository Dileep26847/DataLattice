import { useEffect, useState } from "react";

import {
    FaHome,
    FaBookOpen,
    FaVideo,
    FaClipboardList,
    FaCertificate,
    FaHeadset,
    FaCalendarAlt,
    FaCog,
    FaSignOutAlt,
    FaFire,
    FaChevronRight,
} from "react-icons/fa";

import {
    NavLink,
    useNavigate,
} from "react-router-dom";

import { motion } from "framer-motion";

import { getProfile } from "../../services/profileService";


// ============================================================
// STUDENT SIDEBAR
// ============================================================

function Sidebar() {

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
        getStoredUser()
    );


    // ============================================================
    // LOAD PROFILE
    // ============================================================

    useEffect(() => {

        const loadProfile = async () => {

            try {

                const data =
                    await getProfile();

                if (
                    data?.success &&
                    data?.profile
                ) {

                    setUser(
                        data.profile
                    );

                    localStorage.setItem(
                        "user",
                        JSON.stringify(
                            data.profile
                        )
                    );

                }

            } catch (error) {

                console.error(
                    "Failed to load student profile:",
                    error
                );

            }

        };

        loadProfile();

    }, []);


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
    // MENU
    // ============================================================

    const mainMenu = [

        {
            title: "Dashboard",
            icon: <FaHome />,
            path: "/student/dashboard",
        },

        {
            title: "My Learning",
            icon: <FaBookOpen />,
            path: "/student/my-courses",
        },

        {
            title: "Live Classes",
            icon: <FaVideo />,
            path: "/student/live-classes",
        },

        {
            title: "Assignments",
            icon: <FaClipboardList />,
            path: "/student/assignments",
        },

        {
            title: "Certificates",
            icon: <FaCertificate />,
            path: "/student/certificates",
        },

    ];


    const supportMenu = [

        {
            title: "Help Center",
            icon: <FaHeadset />,
            path: "/student/support",
        },

        {
            title: "Calendar",
            icon: <FaCalendarAlt />,
            path: "/student/calendar",
        },

    ];


    const systemMenu = [

        {
            title: "Settings",
            icon: <FaCog />,
            path: "/student/settings",
        },

    ];


    // ============================================================
    // PROFILE DATA
    // ============================================================

    const studentName =
        user?.full_name || "Student";

    const studentRole =
        user?.role || "student";

    const defaultAvatar =
        `https://ui-avatars.com/api/?name=${encodeURIComponent(
            studentName
        )}&background=4f46e5&color=fff&size=200`;

    const profileImage =
        user?.profile_image ||
        defaultAvatar;


    // ============================================================
    // MENU ITEM
    // ============================================================

    const renderMenuItem = (item) => (

        <NavLink
            key={item.title}
            to={item.path}
            className={({ isActive }) => {

                return `
                    group
                    relative
                    flex
                    items-center
                    gap-3
                    px-3
                    py-3
                    rounded-xl
                    transition-all
                    duration-200
                    ${
                        isActive
                            ? "bg-indigo-600 text-white shadow-sm"
                            : "text-slate-600 hover:bg-indigo-50 hover:text-indigo-600"
                    }
                `;

            }}
        >

            {({ isActive }) => (

                <>

                    {/* Active indicator */}

                    {isActive && (

                        <span
                            className="
                                absolute
                                left-0
                                top-1/2
                                -translate-y-1/2
                                w-1
                                h-6
                                rounded-r-full
                                bg-white
                            "
                        />

                    )}


                    {/* Icon */}

                    <span
                        className={`
                            w-9
                            h-9
                            rounded-lg
                            flex
                            items-center
                            justify-center
                            text-base
                            shrink-0
                            transition-all
                            ${
                                isActive
                                    ? "bg-white/15 text-white"
                                    : "bg-slate-100 text-slate-500 group-hover:bg-white group-hover:text-indigo-600"
                            }
                        `}
                    >

                        {item.icon}

                    </span>


                    {/* Label */}

                    <span
                        className="
                            flex-1
                            text-sm
                            font-semibold
                            truncate
                        "
                    >

                        {item.title}

                    </span>


                    {/* Arrow */}

                    <FaChevronRight
                        className={`
                            text-[10px]
                            transition-all
                            ${
                                isActive
                                    ? "opacity-100"
                                    : "opacity-0 group-hover:opacity-100"
                            }
                        `}
                    />

                </>

            )}

        </NavLink>

    );


    // ============================================================
    // RENDER
    // ============================================================

    return (

        <aside
            className="
                w-[260px]
                shrink-0
                h-screen
                sticky
                top-0
                bg-white
                border-r
                border-slate-200
                flex
                flex-col
            "
        >

            {/* ====================================================
                BRAND
            ==================================================== */}

            <div
                className="
                    px-5
                    pt-5
                    pb-4
                    border-b
                    border-slate-100
                "
            >

                <div className="flex items-center gap-3">

                    <div
                        className="
                            w-10
                            h-10
                            rounded-xl
                            bg-indigo-600
                            text-white
                            flex
                            items-center
                            justify-center
                            text-lg
                            font-black
                            shadow-md
                            shadow-indigo-100
                        "
                    >

                        S

                    </div>


                    <div className="min-w-0">

                        <h1
                            className="
                                text-xl
                                font-black
                                tracking-tight
                                text-slate-900
                            "
                        >

                            Data Lattice

                        </h1>

                        <p
                            className="
                                text-[9px]
                                font-bold
                                tracking-[0.12em]
                                text-slate-400
                            "
                        >

                            LEARN • BUILD • GET HIRED

                        </p>

                    </div>

                </div>

            </div>


            {/* ====================================================
                PROFILE
            ==================================================== */}

            <div className="px-4 pt-4">

                <button
                    type="button"
                    onClick={() =>
                        navigate(
                            "/student/profile"
                        )
                    }
                    className="
                        w-full
                        rounded-xl
                        bg-slate-50
                        border
                        border-slate-100
                        p-3
                        text-left
                        hover:bg-indigo-50
                        hover:border-indigo-100
                        transition-all
                    "
                >

                    <div className="flex items-center gap-3">

                        <img
                            src={profileImage}
                            alt="Student profile"
                            className="
                                w-10
                                h-10
                                rounded-lg
                                object-cover
                                shrink-0
                            "
                            onError={(event) => {

                                event.currentTarget.src =
                                    defaultAvatar;

                            }}
                        />


                        <div className="min-w-0 flex-1">

                            <h2
                                className="
                                    text-sm
                                    font-bold
                                    text-slate-800
                                    truncate
                                "
                            >

                                {studentName}

                            </h2>

                            <p
                                className="
                                    text-xs
                                    text-slate-500
                                    capitalize
                                    mt-0.5
                                "
                            >

                                {studentRole}

                            </p>

                        </div>


                        <FaChevronRight
                            className="
                                text-[10px]
                                text-slate-400
                            "
                        />

                    </div>

                </button>


                {/* ==================================================
                    STREAK
                ================================================== */}

                <div
                    className="
                        mt-3
                        rounded-xl
                        bg-indigo-50
                        border
                        border-indigo-100
                        px-3
                        py-3
                    "
                >

                    <div className="flex items-center justify-between">

                        <div className="flex items-center gap-2.5">

                            <div
                                className="
                                    w-8
                                    h-8
                                    rounded-lg
                                    bg-white
                                    flex
                                    items-center
                                    justify-center
                                    text-orange-500
                                    shadow-sm
                                "
                            >

                                <FaFire />

                            </div>


                            <div>

                                <p
                                    className="
                                        text-[10px]
                                        text-slate-500
                                    "
                                >

                                    Learning Streak

                                </p>

                                <p
                                    className="
                                        text-sm
                                        font-bold
                                        text-slate-800
                                    "
                                >

                                    12 Days

                                </p>

                            </div>

                        </div>


                        <span
                            className="
                                text-xs
                                font-bold
                                text-indigo-600
                            "
                        >

                            82%

                        </span>

                    </div>


                    <div
                        className="
                            mt-2
                            h-1.5
                            rounded-full
                            bg-white
                            overflow-hidden
                        "
                    >

                        <div
                            className="
                                h-full
                                w-[82%]
                                rounded-full
                                bg-indigo-600
                            "
                        />

                    </div>

                </div>

            </div>


            {/* ====================================================
                NAVIGATION
            ==================================================== */}

            <div
                className="
                    flex-1
                    overflow-y-auto
                    px-4
                    py-5
                    scrollbar-thin
                "
            >

                {/* MAIN */}

                <section>

                    <p
                        className="
                            px-2
                            mb-2
                            text-[10px]
                            font-bold
                            uppercase
                            tracking-widest
                            text-slate-400
                        "
                    >

                        Main Menu

                    </p>

                    <nav className="space-y-1">

                        {mainMenu.map(
                            renderMenuItem
                        )}

                    </nav>

                </section>


                {/* SUPPORT */}

                <section className="mt-6">

                    <p
                        className="
                            px-2
                            mb-2
                            text-[10px]
                            font-bold
                            uppercase
                            tracking-widest
                            text-slate-400
                        "
                    >

                        Support

                    </p>

                    <nav className="space-y-1">

                        {supportMenu.map(
                            renderMenuItem
                        )}

                    </nav>

                </section>


                {/* SYSTEM */}

                <section className="mt-6">

                    <p
                        className="
                            px-2
                            mb-2
                            text-[10px]
                            font-bold
                            uppercase
                            tracking-widest
                            text-slate-400
                        "
                    >

                        System

                    </p>

                    <nav className="space-y-1">

                        {systemMenu.map(
                            renderMenuItem
                        )}

                    </nav>

                </section>

            </div>


            {/* ====================================================
                LOGOUT
            ==================================================== */}

            <div
                className="
                    px-4
                    py-4
                    border-t
                    border-slate-100
                "
            >

                <motion.button
                    type="button"
                    whileHover={{
                        scale: 1.01,
                    }}
                    whileTap={{
                        scale: 0.98,
                    }}
                    onClick={logout}
                    className="
                        w-full
                        flex
                        items-center
                        justify-center
                        gap-2.5
                        rounded-xl
                        border
                        border-red-100
                        bg-red-50
                        py-3
                        text-sm
                        text-red-600
                        font-semibold
                        hover:bg-red-100
                        transition-all
                    "
                >

                    <FaSignOutAlt />

                    Logout

                </motion.button>

            </div>

        </aside>

    );

}

export default Sidebar;