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
    FaUser,
    FaChevronRight,
} from "react-icons/fa";

import {
    NavLink,
    useNavigate,
} from "react-router-dom";

import { motion } from "framer-motion";

import { getProfile } from "../../services/profileService";


// ======================================
// Student Sidebar
// ======================================

function Sidebar() {

    const navigate = useNavigate();

    // ======================================
    // Stored User
    // ======================================

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


    // ======================================
    // Load Latest Profile
    // ======================================

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


    // ======================================
    // Logout
    // ======================================

    const logout = () => {

        localStorage.clear();

        navigate("/login", {
            replace: true,
        });

    };


    // ======================================
    // Navigation
    // ======================================

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


    // ======================================
    // Avatar
    // ======================================

    const studentName =
        user?.full_name ||
        "Student";

    const defaultAvatar =
        `https://ui-avatars.com/api/?name=${encodeURIComponent(
            studentName
        )}&background=4f46e5&color=fff&size=200`;

    const profileImage =
        user?.profile_image ||
        defaultAvatar;


    // ======================================
    // Navigation Item
    // ======================================

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
                    gap-4
                    px-4
                    py-3.5
                    rounded-2xl
                    transition-all
                    duration-200
                    ${
                        isActive
                            ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                            : "text-slate-600 hover:bg-indigo-50 hover:text-indigo-600"
                    }
                `;

            }}
        >

            {({ isActive }) => (

                <>

                    {/* Active Indicator */}

                    {isActive && (

                        <span className="
                            absolute
                            left-0
                            top-1/2
                            -translate-y-1/2
                            w-1
                            h-7
                            rounded-r-full
                            bg-white
                        " />

                    )}


                    {/* Icon */}

                    <span
                        className={`
                            w-10
                            h-10
                            rounded-xl
                            flex
                            items-center
                            justify-center
                            text-lg
                            transition-all
                            ${
                                isActive
                                    ? "bg-white/15 text-white"
                                    : "bg-slate-100 group-hover:bg-white group-hover:text-indigo-600"
                            }
                        `}
                    >

                        {item.icon}

                    </span>


                    {/* Title */}

                    <span className="font-semibold flex-1">

                        {item.title}

                    </span>


                    {/* Arrow */}

                    <FaChevronRight
                        className={`
                            text-xs
                            transition-all
                            ${
                                isActive
                                    ? "opacity-100 translate-x-0"
                                    : "opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0"
                            }
                        `}
                    />

                </>

            )}

        </NavLink>

    );


    // ======================================
    // Render
    // ======================================

    return (

        <aside
            className="
                w-80
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

            {/* ==================================
                BRAND
            ================================== */}

            <div className="px-7 pt-7 pb-6">

                <div className="flex items-center gap-3">

                    <div
                        className="
                            w-11
                            h-11
                            rounded-2xl
                            bg-indigo-600
                            text-white
                            flex
                            items-center
                            justify-center
                            text-xl
                            font-black
                            shadow-lg
                            shadow-indigo-200
                        "
                    >

                        S

                    </div>


                    <div>

                        <h1 className="
                            text-2xl
                            font-black
                            tracking-tight
                            text-slate-900
                        ">

                            Data Lattice

                        </h1>

                        <p className="
                            text-xs
                            font-medium
                            text-slate-400
                            tracking-wide
                        ">

                            LEARN • BUILD • GET HIRED

                        </p>

                    </div>

                </div>

            </div>


            {/* ==================================
                STUDENT PROFILE
            ================================== */}

            <div className="px-6">

                <button
                    onClick={() =>
                        navigate(
                            "/student/profile"
                        )
                    }
                    className="
                        w-full
                        rounded-2xl
                        bg-slate-50
                        border
                        border-slate-100
                        p-4
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
                                w-12
                                h-12
                                rounded-xl
                                object-cover
                                shadow-sm
                            "
                            onError={(event) => {

                                event.currentTarget.src =
                                    defaultAvatar;

                            }}
                        />


                        <div className="min-w-0 flex-1">

                            <h2 className="
                                font-bold
                                text-slate-800
                                truncate
                            ">

                                {studentName}

                            </h2>

                            <p className="
                                text-sm
                                text-slate-500
                                capitalize
                            ">

                                {user?.role ||
                                    "student"}

                            </p>

                        </div>


                        <FaChevronRight
                            className="
                                text-xs
                                text-slate-400
                            "
                        />

                    </div>

                </button>


                {/* Learning Streak */}

                <div className="
                    mt-4
                    rounded-2xl
                    bg-gradient-to-r
                    from-indigo-50
                    to-blue-50
                    border
                    border-indigo-100
                    p-4
                ">

                    <div className="
                        flex
                        items-center
                        justify-between
                    ">

                        <div className="
                            flex
                            items-center
                            gap-2
                        ">

                            <div className="
                                w-9
                                h-9
                                rounded-xl
                                bg-white
                                flex
                                items-center
                                justify-center
                                text-orange-500
                                shadow-sm
                            ">

                                <FaFire />

                            </div>

                            <div>

                                <p className="
                                    text-xs
                                    text-slate-500
                                ">

                                    Learning Streak

                                </p>

                                <p className="
                                    font-bold
                                    text-slate-800
                                ">

                                    12 Days

                                </p>

                            </div>

                        </div>


                        <span className="
                            text-xs
                            font-bold
                            text-indigo-600
                        ">

                            🔥

                        </span>

                    </div>


                    {/* Progress */}

                    <div className="mt-4">

                        <div className="
                            flex
                            justify-between
                            text-xs
                            mb-2
                        ">

                            <span className="text-slate-500">

                                Learning Level

                            </span>

                            <span className="
                                font-bold
                                text-indigo-600
                            ">

                                82%

                            </span>

                        </div>


                        <div className="
                            h-2
                            rounded-full
                            bg-white
                            overflow-hidden
                        ">

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

            </div>


            {/* ==================================
                NAVIGATION
            ================================== */}

            <div className="
                flex-1
                overflow-y-auto
                px-5
                py-6
            ">

                {/* Main */}

                <div>

                    <p className="
                        px-3
                        mb-3
                        text-[11px]
                        font-bold
                        uppercase
                        tracking-widest
                        text-slate-400
                    ">

                        Main Menu

                    </p>


                    <nav className="space-y-1.5">

                        {mainMenu.map(
                            renderMenuItem
                        )}

                    </nav>

                </div>


                {/* Support */}

                <div className="mt-7">

                    <p className="
                        px-3
                        mb-3
                        text-[11px]
                        font-bold
                        uppercase
                        tracking-widest
                        text-slate-400
                    ">

                        Support

                    </p>


                    <nav className="space-y-1.5">

                        {supportMenu.map(
                            renderMenuItem
                        )}

                    </nav>

                </div>


                {/* System */}

                <div className="mt-7">

                    <p className="
                        px-3
                        mb-3
                        text-[11px]
                        font-bold
                        uppercase
                        tracking-widest
                        text-slate-400
                    ">

                        System

                    </p>


                    <nav className="space-y-1.5">

                        {systemMenu.map(
                            renderMenuItem
                        )}

                    </nav>

                </div>

            </div>


            {/* ==================================
                LOGOUT
            ================================== */}

            <div className="
                px-5
                pb-5
                pt-3
                border-t
                border-slate-100
            ">

                <motion.button
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
                        gap-3
                        rounded-2xl
                        border
                        border-red-100
                        bg-red-50
                        py-3.5
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