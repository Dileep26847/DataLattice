import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  useEffect,
  useState,
} from "react";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import {
  FaBars,
  FaXmark,
  FaArrowRight,
} from "react-icons/fa6";

import dataLatticeLogo from "../assets/datalattice-logo.png";

// ============================================================
// DATALATTICE PUBLIC NAVIGATION
// ============================================================

const publicNavigation = [
  {
    label: "Home",
    href: "#home",
  },
  {
    label: "Programs",
    href: "#programs",
  },
  {
    label: "Journey",
    href: "#journey",
  },
  {
    label: "Mentors",
    href: "#mentors",
  },
  {
    label: "Outcomes",
    href: "#outcomes",
  },
  {
    label: "About",
    href: "#about",
  },
];

// ============================================================
// COMPONENT
// ============================================================

function Navbar() {
  const navigate = useNavigate();

  const location = useLocation();

  const [mobileOpen, setMobileOpen] =
    useState(false);

  // ==========================================================
  // AUTH STATE
  // ==========================================================

  const [authState, setAuthState] = useState(() => {
    try {
      const storedUser =
        localStorage.getItem("user");

      const storedToken =
        localStorage.getItem("token");

      return {
        token: storedToken || null,
        user: storedUser
          ? JSON.parse(storedUser)
          : null,
      };
    } catch {
      return {
        token: null,
        user: null,
      };
    }
  });

  // ==========================================================
  // REFRESH AUTH STATE
  // ==========================================================

  const refreshAuthState = () => {
    try {
      const storedUser =
        localStorage.getItem("user");

      const storedToken =
        localStorage.getItem("token");

      setAuthState({
        token: storedToken || null,
        user: storedUser
          ? JSON.parse(storedUser)
          : null,
      });
    } catch {
      setAuthState({
        token: null,
        user: null,
      });
    }
  };

  // ==========================================================
  // AUTH CHANGE LISTENERS
  // ==========================================================

  useEffect(() => {
    const handleAuthChange = () => {
      refreshAuthState();
    };

    window.addEventListener(
      "Data Lattice-auth-change",
      handleAuthChange
    );

    window.addEventListener(
      "storage",
      handleAuthChange
    );

    return () => {
      window.removeEventListener(
        "Data Lattice-auth-change",
        handleAuthChange
      );

      window.removeEventListener(
        "storage",
        handleAuthChange
      );
    };
  }, []);

  // ==========================================================
  // CURRENT AUTH VALUES
  // ==========================================================

  const token = authState.token;

  const user = authState.user;

  // ==========================================================
  // APPLICATION AREAS
  // ==========================================================

  const isStudentArea =
    location.pathname === "/student" ||
    location.pathname.startsWith("/student/");

  const isAdminArea =
    location.pathname === "/admin" ||
    location.pathname.startsWith("/admin/");

  const isMentorArea =
    location.pathname === "/mentor" ||
    location.pathname.startsWith("/mentor/");

  const isDashboardArea =
    isStudentArea ||
    isAdminArea ||
    isMentorArea;

  // ==========================================================
  // NAVBAR MODE
  // ==========================================================

  const showAuthenticatedNavbar =
    Boolean(token) && isDashboardArea;

  const showPublicNavbar =
    !showAuthenticatedNavbar;

  // ==========================================================
  // CLOSE MOBILE MENU ON ROUTE CHANGE
  // ==========================================================

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // ==========================================================
  // LOCK BODY WHEN MOBILE MENU IS OPEN
  // ==========================================================

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow =
        "hidden";
    } else {
      document.body.style.overflow =
        "";
    }

    return () => {
      document.body.style.overflow =
        "";
    };
  }, [mobileOpen]);

  // ==========================================================
  // LOGOUT
  // ==========================================================

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setAuthState({
      token: null,
      user: null,
    });

    setMobileOpen(false);

    window.dispatchEvent(
      new Event("Data Lattice-auth-change")
    );

    navigate("/", {
      replace: true,
    });
  };

  // ==========================================================
  // PUBLIC SECTION NAVIGATION
  // ==========================================================

  const handleSectionNavigation = (
    href
  ) => {
    setMobileOpen(false);

    if (location.pathname !== "/") {
      navigate(`/${href}`);

      return;
    }

    const element =
      document.querySelector(href);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // ==========================================================
  // DASHBOARD LINK STYLE
  // ==========================================================

  const dashboardLinkClass =
    ({ isActive }) => {
      return `
        relative
        rounded-lg
        px-2.5
        py-1.5
        text-[13px]
        font-semibold
        tracking-[-0.01em]
        transition-all
        duration-200
        ${
          isActive
            ? "text-[#1463FF]"
            : "text-[#0B1B3A]/75 hover:text-[#1463FF]"
        }
      `;
    };

  // ==========================================================
  // PUBLIC NAV LINK STYLE
  // ==========================================================

  const publicLinkClass = `
    relative
    rounded-lg
    px-2.5
    py-1.5
    text-[13px]
    font-semibold
    tracking-[-0.01em]
    text-[#0B1B3A]/75
    transition-colors
    duration-200
    hover:text-[#1463FF]
  `;

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <>
      {/* ======================================================
          FULL-WIDTH FIXED TOP NAVBAR
      ====================================================== */}

      <motion.header
        initial={{
          y: -20,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 0.55,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          fixed
          inset-x-0
          top-0
          z-[100]
          w-full
          border-b
          border-white/60
          bg-white/65
          shadow-[0_6px_22px_rgba(11,27,58,0.05)]
          backdrop-blur-xl
          backdrop-saturate-150
        "
      >
        {/* ====================================================
            SUBTLE GLASS HIGHLIGHT
        ==================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            inset-x-0
            bottom-0
            h-px
            bg-gradient-to-r
            from-transparent
            via-white/90
            to-transparent
          "
        />

        {/* ====================================================
            NAVBAR CONTENT

            Reduced from 76px to 64px.
        ==================================================== */}

        <div
          className="
            relative
            mx-auto
            flex
            h-[64px]
            w-full
            items-center
            justify-between
           px-7
sm:px-9
lg:px-10
xl:px-12
          "
        >
          {/* ==================================================
              LOGO
          ================================================== */}

          <Link
  to="/"
  onClick={() =>
    setMobileOpen(false)
  }
  className="
    group
    flex
    shrink-0
    items-center
  "
>
  <img
    src={dataLatticeLogo}
    alt="DataLattice"
    className="
      h-[44px]
      w-auto
      max-w-[178px]
      object-contain
      object-left
      transition-transform
      duration-200
      group-hover:scale-[1.01]
    "
  />
</Link>

          {/* ==================================================
              DESKTOP PUBLIC NAVIGATION
          ================================================== */}

          {showPublicNavbar && (
            <nav
              className="
                hidden
                items-center
                gap-0.5
                lg:absolute
                lg:left-1/2
                lg:top-1/2
                lg:flex
                lg:-translate-x-1/2
                lg:-translate-y-1/2
              "
              aria-label="Public navigation"
            >
              {publicNavigation.map(
                (item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() =>
                      handleSectionNavigation(
                        item.href
                      )
                    }
                    className={
                      publicLinkClass
                    }
                  >
                    {item.label}
                  </button>
                )
              )}
            </nav>
          )}

          {/* ==================================================
              DESKTOP AUTHENTICATED NAVIGATION
          ================================================== */}

          {showAuthenticatedNavbar && (
            <nav
              className="
                hidden
                items-center
                gap-0.5
                lg:absolute
                lg:left-1/2
                lg:top-1/2
                lg:flex
                lg:-translate-x-1/2
                lg:-translate-y-1/2
              "
              aria-label="Dashboard navigation"
            >
              {/* =================================================
                  STUDENT NAVIGATION
              ================================================= */}

              {isStudentArea &&
                user?.role === "student" && (
                  <>
                    <NavLink
                      to="/student/dashboard"
                      className={
                        dashboardLinkClass
                      }
                    >
                      Dashboard
                    </NavLink>

                    <NavLink
                      to="/student/my-courses"
                      className={
                        dashboardLinkClass
                      }
                    >
                      My Learning
                    </NavLink>

                    <NavLink
                      to="/student/live-classes"
                      className={
                        dashboardLinkClass
                      }
                    >
                      Live Classes
                    </NavLink>
                  </>
                )}

              {/* =================================================
                  ADMIN NAVIGATION
              ================================================= */}

              {isAdminArea &&
                user?.role === "admin" && (
                  <>
                    <NavLink
                      to="/admin/dashboard"
                      className={
                        dashboardLinkClass
                      }
                    >
                      Dashboard
                    </NavLink>

                    <NavLink
                      to="/admin/students"
                      className={
                        dashboardLinkClass
                      }
                    >
                      Students
                    </NavLink>

                    <NavLink
                      to="/admin/courses"
                      className={
                        dashboardLinkClass
                      }
                    >
                      Courses
                    </NavLink>
                  </>
                )}

              {/* =================================================
                  MENTOR NAVIGATION
              ================================================= */}

              {isMentorArea &&
                user?.role === "mentor" && (
                  <>
                    <NavLink
                      to="/mentor/dashboard"
                      className={
                        dashboardLinkClass
                      }
                    >
                      Dashboard
                    </NavLink>

                    <NavLink
                      to="/mentor/courses"
                      className={
                        dashboardLinkClass
                      }
                    >
                      My Courses
                    </NavLink>

                    <NavLink
                      to="/mentor/live-classes"
                      className={
                        dashboardLinkClass
                      }
                    >
                      Live Classes
                    </NavLink>
                  </>
                )}
            </nav>
          )}

          {/* ==================================================
              DESKTOP RIGHT SIDE
          ================================================== */}

          <div
            className="
              ml-auto
              hidden
              items-center
              gap-2
              lg:flex
            "
          >
            {/* ==================================================
                LOGIN
            ================================================== */}

            {showPublicNavbar && (
              <>
                <Link
                  to="/login"
                  className="
                    inline-flex
                    items-center
                    justify-center
                    rounded-lg
                    border
                    border-slate-200
                    bg-white/70
                    px-4
                    py-2
                    text-[13px]
                    font-bold
                    tracking-[-0.01em]
                    text-[#1463FF]
                    shadow-[0_3px_12px_rgba(11,27,58,0.04)]
                    transition-all
                    duration-200
                    hover:-translate-y-0.5
                    hover:text-[#0B1B3A]
                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-[#1463FF]
                    focus-visible:ring-offset-2
                  "
                >
                  Login
                </Link>

                {/* ==================================================
                    GET STARTED
                ================================================== */}

                <Link
                  to="/register"
                  className="
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    rounded-lg
                    border
                    border-[#0B1B3A]/20
                    bg-[#1463FF]
                    px-4
                    py-2
                    text-[13px]
                    font-bold
                    tracking-[-0.01em]
                    text-white
                    shadow-[0_7px_20px_rgba(20,99,255,0.20)]
                    transition-all
                    duration-200
                    hover:-translate-y-0.5
                    hover:bg-[#0B1B3A]
                    hover:shadow-[0_10px_26px_rgba(11,27,58,0.18)]
                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-[#1463FF]
                    focus-visible:ring-offset-2
                  "
                >
                  <span>
                    Get Started
                  </span>

                  <FaArrowRight
                    size={11}
                    aria-hidden="true"
                  />
                </Link>
              </>
            )}

            {/* ==================================================
                AUTHENTICATED USER
            ================================================== */}

            {showAuthenticatedNavbar && (
              <div
                className="
                  flex
                  items-center
                  gap-2
                  rounded-xl
                  border
                  border-white/60
                  bg-white/45
                  px-1.5
                  py-1
                  shadow-[0_5px_18px_rgba(11,27,58,0.04)]
                  backdrop-blur-md
                "
              >
                <div
                  className="
                    flex
                    items-center
                    gap-2
                  "
                >
                  <img
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                      user?.full_name ||
                        "User"
                    )}&background=1463FF&color=fff`}
                    alt="Profile"
                    className="
                      h-7
                      w-7
                      rounded-full
                      ring-2
                      ring-white/80
                    "
                  />

                  <div
                    className="
                      hidden
                      xl:block
                    "
                  >
                    <p
                      className="
                        text-[11px]
                        font-bold
                        leading-tight
                        text-[#0B1B3A]
                      "
                    >
                      {user?.full_name ||
                        "User"}
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
                        "Student"}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={logout}
                  className="
                    rounded-lg
                    px-2.5
                    py-1.5
                    text-[12px]
                    font-semibold
                    text-[#64748B]
                    transition-colors
                    duration-200
                    hover:text-red-600
                  "
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* ==================================================
              MOBILE MENU BUTTON
          ================================================== */}

          <button
            type="button"
            aria-label={
              mobileOpen
                ? "Close menu"
                : "Open menu"
            }
            aria-expanded={mobileOpen}
            onClick={() =>
              setMobileOpen(
                (previous) =>
                  !previous
              )
            }
            className="
              ml-2
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-lg
              border
              border-white/70
              bg-white/55
              text-[#0B1B3A]
              shadow-[0_5px_16px_rgba(11,27,58,0.05)]
              backdrop-blur-md
              transition-colors
              duration-200
              hover:text-[#1463FF]
              lg:hidden
            "
          >
            {mobileOpen ? (
              <FaXmark size={16} />
            ) : (
              <FaBars size={16} />
            )}
          </button>
        </div>
      </motion.header>

      {/* ======================================================
          MOBILE MENU
      ====================================================== */}

      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* ==================================================
                BACKDROP
            ================================================== */}

            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              onClick={() =>
                setMobileOpen(false)
              }
              className="
                fixed
                inset-0
                z-[90]
                bg-[#0B1B3A]/10
                backdrop-blur-md
                lg:hidden
              "
            />

            {/* ==================================================
                MOBILE GLASS MENU
            ================================================== */}

            <motion.div
              initial={{
                opacity: 0,
                y: -12,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -12,
              }}
              transition={{
                duration: 0.22,
              }}
              className="
                fixed
                left-3
                right-3
                top-[72px]
                z-[95]
                overflow-hidden
                rounded-xl
                border
                border-white/70
                bg-white/75
                p-2.5
                shadow-[0_22px_60px_rgba(11,27,58,0.13)]
                backdrop-blur-2xl
                backdrop-saturate-150
                lg:hidden
              "
            >
              {/* Glass highlight */}

              <div
                className="
                  pointer-events-none
                  absolute
                  inset-x-0
                  top-0
                  h-px
                  bg-white/90
                "
              />

              {/* ==================================================
                  MOBILE PUBLIC NAVIGATION
              ================================================== */}

              {showPublicNavbar && (
                <>
                  <div className="space-y-0.5">
                    {publicNavigation.map(
                      (item) => (
                        <button
                          key={
                            item.label
                          }
                          type="button"
                          onClick={() =>
                            handleSectionNavigation(
                              item.href
                            )
                          }
                          className="
                            flex
                            w-full
                            items-center
                            justify-between
                            rounded-lg
                            px-3
                            py-2.5
                            text-left
                            text-[13px]
                            font-semibold
                            text-[#0B1B3A]
                            transition-colors
                            duration-200
                            hover:text-[#1463FF]
                          "
                        >
                          <span>
                            {item.label}
                          </span>

                          <span
                            className="
                              text-[#1463FF]
                            "
                          >
                            →
                          </span>
                        </button>
                      )
                    )}
                  </div>

                  {/* ==================================================
                      MOBILE ACTIONS
                  ================================================== */}

                  <div
                    className="
                      mt-2
                      flex
                      flex-col
                      gap-2
                      border-t
                      border-white/70
                      pt-2.5
                    "
                  >
                    <Link
                      to="/login"
                      onClick={() =>
                        setMobileOpen(
                          false
                        )
                      }
                      className="
                        flex
                        w-full
                        items-center
                        justify-center
                        rounded-lg
                        border
                        border-slate-200
                        bg-white/75
                        px-4
                        py-2.5
                        text-[13px]
                        font-bold
                        text-[#1463FF]
                        transition-colors
                        duration-200
                        hover:text-[#0B1B3A]
                      "
                    >
                      Login
                    </Link>

                    <Link
                      to="/register"
                      onClick={() =>
                        setMobileOpen(
                          false
                        )
                      }
                      className="
                        flex
                        w-full
                        items-center
                        justify-center
                        gap-2
                        rounded-lg
                        border
                        border-[#0B1B3A]/20
                        bg-[#1463FF]
                        px-4
                        py-2.5
                        text-[13px]
                        font-bold
                        text-white
                        shadow-[0_8px_20px_rgba(20,99,255,0.17)]
                        transition-all
                        duration-200
                        hover:bg-[#0B1B3A]
                      "
                    >
                      <span>
                        Get Started
                      </span>

                      <FaArrowRight
                        size={11}
                        aria-hidden="true"
                      />
                    </Link>
                  </div>
                </>
              )}

              {/* ==================================================
                  MOBILE AUTHENTICATED NAVIGATION
              ================================================== */}

              {showAuthenticatedNavbar && (
                <div className="space-y-0.5">
                  {/* User */}

                  <div
                    className="
                      mb-2
                      flex
                      items-center
                      gap-3
                      rounded-lg
                      border
                      border-white/70
                      bg-white/50
                      p-2.5
                      shadow-sm
                      backdrop-blur-md
                    "
                  >
                    <img
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                        user?.full_name ||
                          "User"
                      )}&background=1463FF&color=fff`}
                      alt="Profile"
                      className="
                        h-9
                        w-9
                        rounded-full
                        ring-2
                        ring-white/80
                      "
                    />

                    <div>
                      <p
                        className="
                          text-[13px]
                          font-bold
                          text-[#0B1B3A]
                        "
                      >
                        {user?.full_name ||
                          "User"}
                      </p>

                      <p
                        className="
                          mt-0.5
                          text-[10px]
                          capitalize
                          text-[#64748B]
                        "
                      >
                        {user?.role ||
                          "Student"}
                      </p>
                    </div>
                  </div>

                  {/* =================================================
                      STUDENT MOBILE NAVIGATION
                  ================================================= */}

                  {isStudentArea &&
                    user?.role ===
                      "student" && (
                      <>
                        <NavLink
                          to="/student/dashboard"
                          onClick={() =>
                            setMobileOpen(
                              false
                            )
                          }
                          className={
                            dashboardLinkClass
                          }
                        >
                          Dashboard
                        </NavLink>

                        <NavLink
                          to="/student/my-courses"
                          onClick={() =>
                            setMobileOpen(
                              false
                            )
                          }
                          className={
                            dashboardLinkClass
                          }
                        >
                          My Learning
                        </NavLink>

                        <NavLink
                          to="/student/live-classes"
                          onClick={() =>
                            setMobileOpen(
                              false
                            )
                          }
                          className={
                            dashboardLinkClass
                          }
                        >
                          Live Classes
                        </NavLink>
                      </>
                    )}

                  {/* =================================================
                      ADMIN MOBILE NAVIGATION
                  ================================================= */}

                  {isAdminArea &&
                    user?.role ===
                      "admin" && (
                      <>
                        <NavLink
                          to="/admin/dashboard"
                          onClick={() =>
                            setMobileOpen(
                              false
                            )
                          }
                          className={
                            dashboardLinkClass
                          }
                        >
                          Dashboard
                        </NavLink>

                        <NavLink
                          to="/admin/students"
                          onClick={() =>
                            setMobileOpen(
                              false
                            )
                          }
                          className={
                            dashboardLinkClass
                          }
                        >
                          Students
                        </NavLink>

                        <NavLink
                          to="/admin/courses"
                          onClick={() =>
                            setMobileOpen(
                              false
                            )
                          }
                          className={
                            dashboardLinkClass
                          }
                        >
                          Courses
                        </NavLink>
                      </>
                    )}

                  {/* =================================================
                      MENTOR MOBILE NAVIGATION
                  ================================================= */}

                  {isMentorArea &&
                    user?.role ===
                      "mentor" && (
                      <>
                        <NavLink
                          to="/mentor/dashboard"
                          onClick={() =>
                            setMobileOpen(
                              false
                            )
                          }
                          className={
                            dashboardLinkClass
                          }
                        >
                          Dashboard
                        </NavLink>

                        <NavLink
                          to="/mentor/courses"
                          onClick={() =>
                            setMobileOpen(
                              false
                            )
                          }
                          className={
                            dashboardLinkClass
                          }
                        >
                          My Courses
                        </NavLink>

                        <NavLink
                          to="/mentor/live-classes"
                          onClick={() =>
                            setMobileOpen(
                              false
                            )
                          }
                          className={
                            dashboardLinkClass
                          }
                        >
                          Live Classes
                        </NavLink>
                      </>
                    )}

                  {/* Logout */}

                  <button
                    type="button"
                    onClick={logout}
                    className="
                      mt-2
                      w-full
                      rounded-lg
                      px-3
                      py-2.5
                      text-left
                      text-[13px]
                      font-semibold
                      text-red-600
                      transition-colors
                      duration-200
                      hover:text-red-700
                    "
                  >
                    Logout
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;