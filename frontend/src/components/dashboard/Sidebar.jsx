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
    FaChevronRight,
} from "react-icons/fa";

import {
    NavLink,
    useNavigate,
} from "react-router-dom";

import { motion } from "framer-motion";


// ============================================================
// STUDENT SIDEBAR
// ============================================================

function Sidebar() {

    const navigate = useNavigate();


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
    // MAIN MENU
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


    // ============================================================
    // SUPPORT MENU
    // ============================================================

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


    // ============================================================
    // SYSTEM MENU
    // ============================================================

    const systemMenu = [

        {
            title: "Settings",
            icon: <FaCog />,
            path: "/student/settings",
        },

    ];


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
                    h-[44px]
                    items-center
                    gap-3
                    rounded-xl
                    px-3
                    transition-all
                    duration-200
                    ${
                        isActive
                            ? "bg-[#1463FF] text-white shadow-[0_7px_18px_rgba(20,99,255,0.16)]"
                            : "text-[#64748B] hover:bg-[#EAF2FF] hover:text-[#1463FF]"
                    }
                `;

            }}
        >

            {({ isActive }) => (

                <>

                    {/* ==================================================
                        ACTIVE INDICATOR
                    ================================================== */}

                    {isActive && (

                        <span
                            className="
                                absolute
                                left-0
                                top-1/2
                                h-5
                                w-1
                                -translate-y-1/2
                                rounded-r-full
                                bg-white
                            "
                        />

                    )}


                    {/* ==================================================
                        ICON
                    ================================================== */}

                    <span
                        className={`
                            flex
                            h-[34px]
                            w-[34px]
                            shrink-0
                            items-center
                            justify-center
                            rounded-lg
                            text-[15px]
                            transition-all
                            duration-200
                            ${
                                isActive
                                    ? "bg-white/15 text-white"
                                    : "bg-white text-[#64748B] shadow-[0_2px_8px_rgba(11,27,58,0.035)] group-hover:bg-[#F5F9FF] group-hover:text-[#1463FF]"
                            }
                        `}
                    >

                        {item.icon}

                    </span>


                    {/* ==================================================
                        LABEL
                    ================================================== */}

                    <span
                        className="
                            min-w-0
                            flex-1
                            truncate
                            text-[15px]
                            font-semibold
                            leading-none
                            tracking-[-0.01em]
                        "
                    >

                        {item.title}

                    </span>


                    {/* ==================================================
                        ARROW
                    ================================================== */}

                    <FaChevronRight
                        className={`
                            shrink-0
                            text-[9px]
                            transition-all
                            duration-200
                            ${
                                isActive
                                    ? "translate-x-0 opacity-100"
                                    : "-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
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
                sticky
                top-0
                flex
                h-screen
                w-[250px]
                shrink-0
                flex-col
                overflow-hidden
                border-r
                border-[#E6EDF7]
                bg-[#F5F9FF]
            "
        >

            {/* ====================================================
                BRAND
            ==================================================== */}

            <div
                className="
                    flex
                    h-[76px]
                    shrink-0
                    items-center
                    bg-white/75
                    px-4
                "
            >

                <div
                    className="
                        flex
                        items-center
                        gap-3
                    "
                >

                    {/* ==================================================
                        LOGO MARK
                    ================================================== */}

                    <div
                        className="
                            flex
                            h-10
                            w-10
                            shrink-0
                            items-center
                            justify-center
                            rounded-xl
                            bg-[#1463FF]
                            text-[18px]
                            font-extrabold
                            text-white
                            shadow-[0_7px_18px_rgba(20,99,255,0.16)]
                        "
                    >

                        S

                    </div>


                    {/* ==================================================
                        BRAND TEXT
                    ================================================== */}

                    <div
                        className="
                            min-w-0
                        "
                    >

                        <h1
                            className="
                                truncate
                                text-[18px]
                                font-extrabold
                                leading-none
                                tracking-[-0.04em]
                                text-[#0B1B3A]
                            "
                        >

                            Data Lattice

                        </h1>


                        <p
                            className="
                                mt-1
                                truncate
                                text-[8px]
                                font-bold
                                uppercase
                                leading-none
                                tracking-[0.14em]
                                text-[#64748B]
                            "
                        >

                            Learn • Build • Get Hired

                        </p>

                    </div>

                </div>

            </div>


            {/* ====================================================
                NAVIGATION
            ==================================================== */}

            <div
                className="
                    min-h-0
                    flex-1
                    overflow-hidden
                    px-3
                    py-4
                "
            >

                {/* ==================================================
                    MAIN MENU
                ================================================== */}

                <section>

                    <p
                        className="
                            mb-2
                            px-2
                            text-[10px]
                            font-bold
                            uppercase
                            tracking-[0.14em]
                            text-[#64748B]
                        "
                    >

                        Main Menu

                    </p>


                    <nav
                        className="
                            space-y-1
                        "
                    >

                        {mainMenu.map(
                            renderMenuItem
                        )}

                    </nav>

                </section>


                {/* ==================================================
                    SUPPORT
                ================================================== */}

                <section
                    className="
                        mt-4
                    "
                >

                    <p
                        className="
                            mb-2
                            px-2
                            text-[10px]
                            font-bold
                            uppercase
                            tracking-[0.14em]
                            text-[#64748B]
                        "
                    >

                        Support

                    </p>


                    <nav
                        className="
                            space-y-1
                        "
                    >

                        {supportMenu.map(
                            renderMenuItem
                        )}

                    </nav>

                </section>


                {/* ==================================================
                    SYSTEM
                ================================================== */}

                <section
                    className="
                        mt-4
                    "
                >

                    <p
                        className="
                            mb-2
                            px-2
                            text-[10px]
                            font-bold
                            uppercase
                            tracking-[0.14em]
                            text-[#64748B]
                        "
                    >

                        System

                    </p>


                    <nav
                        className="
                            space-y-1
                        "
                    >

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
                    shrink-0
                    bg-white/65
                    px-3
                    py-3
                "
            >

                <motion.button
                    type="button"
                    whileHover={{
                        y: -1,
                    }}
                    whileTap={{
                        scale: 0.98,
                    }}
                    onClick={logout}
                    className="
                        flex
                        h-10
                        w-full
                        items-center
                        justify-center
                        gap-2.5
                        rounded-xl
                        border
                        border-[#E6EDF7]
                        bg-white
                        text-[14px]
                        font-semibold
                        text-[#64748B]
                        shadow-[0_3px_12px_rgba(11,27,58,0.03)]
                        transition-all
                        duration-200
                        hover:border-red-100
                        hover:bg-red-50
                        hover:text-red-600
                    "
                >

                    <FaSignOutAlt
                        size={14}
                    />

                    Logout

                </motion.button>

            </div>

        </aside>

    );

}


export default Sidebar;