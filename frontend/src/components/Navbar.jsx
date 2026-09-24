import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { useEffect, useState } from "react";

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

import {
  requireHomeDemoAccess,
} from "./landing/HomeAccessGate";

// ============================================================
// PUBLIC NAVIGATION
// ============================================================

const publicNavigation = [
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
  {
    label: "Pricing",
    href: "#pricing",
  },
];

// ============================================================
// COMPONENT
// ============================================================

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileOpen, setMobileOpen] = useState(false);

  // ==========================================================
  // AUTH STATE
  // ==========================================================

  const [authState, setAuthState] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user");
      const storedToken = localStorage.getItem("token");

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
  // AUTH REFRESH
  // ==========================================================

  const refreshAuthState = () => {
    try {
      const storedUser = localStorage.getItem("user");
      const storedToken = localStorage.getItem("token");

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
  // VALUES
  // ==========================================================

  const token = authState.token;
  const user = authState.user;

  // ==========================================================
  // AREAS
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
  // BODY LOCK
  // ==========================================================

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
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
  // SECTION NAVIGATION
  // ==========================================================

  const navigateToSection = (href) => {
    setMobileOpen(false);

    /*
     * If we are not on Home, go to Home first.
     */
    if (location.pathname !== "/") {
      navigate(`/${href}`);
      return;
    }

    const element = document.querySelector(href);

    if (!element) {
      return;
    }

    const navbarHeight = 80;

    const elementTop =
      element.getBoundingClientRect().top +
      window.scrollY;

    window.scrollTo({
      top: Math.max(
        elementTop - navbarHeight,
        0
      ),
      behavior: "smooth",
    });
  };

  // ==========================================================
  // PROTECTED SECTION NAVIGATION
  // ==========================================================

  const handleSectionNavigation = (href) => {
    const continueNavigation = () => {
      navigateToSection(href);
    };

    requireHomeDemoAccess(
      continueNavigation
    )({
      preventDefault: () => {},
      stopPropagation: () => {},
    });
  };

  // ==========================================================
  // DASHBOARD LINK STYLE
  // ==========================================================

  const dashboardLinkClass = ({ isActive }) => {
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
          ? "text-[#0C5FF5]"
          : "text-[#0A1832]/70 hover:text-[#0C5FF5]"
      }
    `;
  };

  // ==========================================================
  // PUBLIC LINK STYLE
  // ==========================================================

  const publicLinkClass = `
    relative
    rounded-lg
    px-2
    py-1.5
    text-[15px]
    font-medium
    tracking-[-0.01em]
    text-[#0A1832]
    transition-colors
    duration-200
    hover:text-[#0C5FF5]
  `;

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <>
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
          border-[#E2E8F0]
          bg-white
        "
      >
        <div
          className="
            relative
            mx-auto
            flex
            h-[80px]
            w-full
            items-center
            justify-between
            px-5
            sm:px-8
            lg:px-10
            xl:px-[120px]
          "
        >
          {/* ==================================================
              LOGO
          ================================================== */}

          <Link
            to="/"
            onClick={(event) => {
              setMobileOpen(false);

              if (location.pathname === "/") {
                event.preventDefault();

                navigateToSection("#home");
              }
            }}
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
                h-[40px]
                w-auto
                max-w-[217px]
                object-contain
                object-left
                transition-transform
                duration-200
                group-hover:scale-[1.01]
              "
            />
          </Link>

          {/* ==================================================
              DESKTOP PUBLIC NAV
          ================================================== */}

          {showPublicNavbar && (
            <nav
              className="
                hidden
                items-center
                gap-5
                lg:absolute
                lg:left-1/2
                lg:top-1/2
                lg:flex
                lg:-translate-x-1/2
                lg:-translate-y-1/2
                xl:gap-8
              "
              aria-label="Public navigation"
            >
              {publicNavigation.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() =>
                    handleSectionNavigation(
                      item.href
                    )
                  }
                  className={publicLinkClass}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          )}

          {/* ==================================================
              AUTHENTICATED NAV
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
              {isStudentArea &&
                user?.role === "student" && (
                  <>
                    <NavLink
                      to="/student/dashboard"
                      className={dashboardLinkClass}
                    >
                      Dashboard
                    </NavLink>

                    <NavLink
                      to="/student/my-courses"
                      className={dashboardLinkClass}
                    >
                      My Learning
                    </NavLink>

                    <NavLink
                      to="/student/live-classes"
                      className={dashboardLinkClass}
                    >
                      Live Classes
                    </NavLink>
                  </>
                )}

              {isAdminArea &&
                user?.role === "admin" && (
                  <>
                    <NavLink
                      to="/admin/dashboard"
                      className={dashboardLinkClass}
                    >
                      Dashboard
                    </NavLink>

                    <NavLink
                      to="/admin/students"
                      className={dashboardLinkClass}
                    >
                      Students
                    </NavLink>

                    <NavLink
                      to="/admin/courses"
                      className={dashboardLinkClass}
                    >
                      Courses
                    </NavLink>
                  </>
                )}

              {isMentorArea &&
                user?.role === "mentor" && (
                  <>
                    <NavLink
                      to="/mentor/dashboard"
                      className={dashboardLinkClass}
                    >
                      Dashboard
                    </NavLink>

                    <NavLink
                      to="/mentor/courses"
                      className={dashboardLinkClass}
                    >
                      My Courses
                    </NavLink>

                    <NavLink
                      to="/mentor/live-classes"
                      className={dashboardLinkClass}
                    >
                      Live Classes
                    </NavLink>
                  </>
                )}
            </nav>
          )}

          {/* ==================================================
              RIGHT SIDE
          ================================================== */}

          <div
            className="
              ml-auto
              hidden
              shrink-0
              items-center
              gap-3
              lg:flex
            "
          >
            {showPublicNavbar && (
              <>
                <Link
                  to="/login"
                  className="
                    inline-flex
                    h-[48px]
                    items-center
                    justify-center
                    rounded-xl
                    px-6
                    py-3
                    text-[15px]
                    font-semibold
                    text-[#64748B]
                    transition-colors
                    duration-200
                    hover:text-[#0C5FF5]
                  "
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="
                    inline-flex
                    h-[48px]
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-[#0C5FF5]
                    px-6
                    py-3
                    text-[15px]
                    font-semibold
                    text-white
                    shadow-[0_8px_18px_rgba(12,95,245,0.20)]
                    transition-all
                    duration-200
                    hover:-translate-y-0.5
                    hover:bg-[#0955dc]
                  "
                >
                  Get Started

                  <FaArrowRight
                    size={12}
                    aria-hidden="true"
                  />
                </Link>
              </>
            )}

            {showAuthenticatedNavbar && (
              <div
                className="
                  flex
                  items-center
                  gap-2
                  rounded-xl
                  border
                  border-[#E2E8F0]
                  bg-white
                  px-1.5
                  py-1
                  shadow-sm
                "
              >
                <div className="flex items-center gap-2">
                  <img
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                      user?.full_name || "User"
                    )}&background=0C5FF5&color=fff`}
                    alt="Profile"
                    className="
                      h-8
                      w-8
                      rounded-full
                      ring-2
                      ring-white
                    "
                  />

                  <div className="hidden xl:block">
                    <p
                      className="
                        text-[11px]
                        font-bold
                        leading-tight
                        text-[#0A1832]
                      "
                    >
                      {user?.full_name || "User"}
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
                      {user?.role || "Student"}
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
              MOBILE BUTTON
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
                (previous) => !previous
              )
            }
            className="
              ml-auto
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-lg
              border
              border-[#E2E8F0]
              bg-white
              text-[#0A1832]
              shadow-sm
              transition-colors
              duration-200
              hover:text-[#0C5FF5]
              lg:hidden
            "
          >
            {mobileOpen ? (
              <FaXmark size={17} />
            ) : (
              <FaBars size={17} />
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
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() =>
                setMobileOpen(false)
              }
              className="
                fixed
                inset-0
                z-[90]
                bg-[#0A1832]/10
                backdrop-blur-sm
                lg:hidden
              "
            />

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
                top-[84px]
                z-[95]
                max-h-[calc(100vh-100px)]
                overflow-y-auto
                rounded-2xl
                border
                border-[#E2E8F0]
                bg-white
                p-3
                shadow-[0_22px_60px_rgba(10,24,50,0.15)]
                lg:hidden
              "
            >
              {showPublicNavbar && (
                <>
                  <div className="space-y-1">
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
                          className="
                            flex
                            w-full
                            items-center
                            justify-between
                            rounded-xl
                            px-3
                            py-3
                            text-left
                            text-[14px]
                            font-semibold
                            text-[#0A1832]
                            transition-colors
                            duration-200
                            hover:bg-[#EFF6FF]
                            hover:text-[#0C5FF5]
                          "
                        >
                          <span>
                            {item.label}
                          </span>

                          <span className="text-[#0C5FF5]">
                            →
                          </span>
                        </button>
                      )
                    )}
                  </div>

                  <div
                    className="
                      mt-3
                      flex
                      flex-col
                      gap-2
                      border-t
                      border-[#E2E8F0]
                      pt-3
                    "
                  >
                    <Link
                      to="/login"
                      onClick={() =>
                        setMobileOpen(false)
                      }
                      className="
                        flex
                        w-full
                        items-center
                        justify-center
                        rounded-xl
                        border
                        border-[#E2E8F0]
                        bg-white
                        px-4
                        py-3
                        text-[14px]
                        font-semibold
                        text-[#0C5FF5]
                      "
                    >
                      Login
                    </Link>

                    <Link
                      to="/register"
                      onClick={() =>
                        setMobileOpen(false)
                      }
                      className="
                        flex
                        w-full
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        bg-[#0C5FF5]
                        px-4
                        py-3
                        text-[14px]
                        font-semibold
                        text-white
                      "
                    >
                      Get Started

                      <FaArrowRight
                        size={12}
                        aria-hidden="true"
                      />
                    </Link>
                  </div>
                </>
              )}

              {showAuthenticatedNavbar && (
                <div className="space-y-1">
                  <div
                    className="
                      mb-2
                      flex
                      items-center
                      gap-3
                      rounded-xl
                      border
                      border-[#E2E8F0]
                      bg-[#F8FAFC]
                      p-3
                    "
                  >
                    <img
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                        user?.full_name ||
                          "User"
                      )}&background=0C5FF5&color=fff`}
                      alt="Profile"
                      className="
                        h-10
                        w-10
                        rounded-full
                      "
                    />

                    <div>
                      <p
                        className="
                          text-[13px]
                          font-bold
                          text-[#0A1832]
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

                  {isStudentArea &&
                    user?.role === "student" && (
                      <>
                        <MobileNavLink
                          to="/student/dashboard"
                          onClick={() =>
                            setMobileOpen(false)
                          }
                        >
                          Dashboard
                        </MobileNavLink>

                        <MobileNavLink
                          to="/student/my-courses"
                          onClick={() =>
                            setMobileOpen(false)
                          }
                        >
                          My Learning
                        </MobileNavLink>

                        <MobileNavLink
                          to="/student/live-classes"
                          onClick={() =>
                            setMobileOpen(false)
                          }
                        >
                          Live Classes
                        </MobileNavLink>
                      </>
                    )}

                  {isAdminArea &&
                    user?.role === "admin" && (
                      <>
                        <MobileNavLink
                          to="/admin/dashboard"
                          onClick={() =>
                            setMobileOpen(false)
                          }
                        >
                          Dashboard
                        </MobileNavLink>

                        <MobileNavLink
                          to="/admin/students"
                          onClick={() =>
                            setMobileOpen(false)
                          }
                        >
                          Students
                        </MobileNavLink>

                        <MobileNavLink
                          to="/admin/courses"
                          onClick={() =>
                            setMobileOpen(false)
                          }
                        >
                          Courses
                        </MobileNavLink>
                      </>
                    )}

                  {isMentorArea &&
                    user?.role === "mentor" && (
                      <>
                        <MobileNavLink
                          to="/mentor/dashboard"
                          onClick={() =>
                            setMobileOpen(false)
                          }
                        >
                          Dashboard
                        </MobileNavLink>

                        <MobileNavLink
                          to="/mentor/courses"
                          onClick={() =>
                            setMobileOpen(false)
                          }
                        >
                          My Courses
                        </MobileNavLink>

                        <MobileNavLink
                          to="/mentor/live-classes"
                          onClick={() =>
                            setMobileOpen(false)
                          }
                        >
                          Live Classes
                        </MobileNavLink>
                      </>
                    )}

                  <button
                    type="button"
                    onClick={logout}
                    className="
                      mt-2
                      w-full
                      rounded-xl
                      px-3
                      py-3
                      text-left
                      text-[14px]
                      font-semibold
                      text-red-600
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

/* =========================================================
   MOBILE NAV LINK
   ========================================================= */

function MobileNavLink({
  to,
  onClick,
  children,
}) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className="
        block
        rounded-xl
        px-3
        py-3
        text-[14px]
        font-semibold
        text-[#0A1832]/80
        transition-colors
        duration-200
        hover:bg-[#EFF6FF]
        hover:text-[#0C5FF5]
      "
    >
      {children}
    </NavLink>
  );
}

export default Navbar;