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
  FaGraduationCap,
  FaBars,
  FaXmark,
  FaArrowRight,
  FaBookOpen,
  FaLayerGroup,
  FaStar,
  FaCircleQuestion,
  FaChartLine,
} from "react-icons/fa6";


// ============================================================
// NAVIGATION DATA
// ============================================================

const publicNavigation = [
  {
    label: "Home",
    href: "#home",
    icon: FaGraduationCap,
  },
  {
    label: "Courses",
    href: "#courses",
    icon: FaBookOpen,
  },
  {
    label: "Programs",
    href: "#programs",
    icon: FaLayerGroup,
  },
  {
    label: "Why Us",
    href: "#why-Data Lattice",
    icon: FaChartLine,
  },
  {
    label: "Success",
    href: "#success",
    icon: FaStar,
  },
  {
    label: "FAQ",
    href: "#faq",
    icon: FaCircleQuestion,
  },
];


// ============================================================
// COMPONENT
// ============================================================

function Navbar() {

  const navigate = useNavigate();

  const location = useLocation();

  const [scrolled, setScrolled] =
    useState(false);

  const [mobileOpen, setMobileOpen] =
    useState(false);


  // ==========================================================
  // SAFE USER PARSE
  // ==========================================================

  const getStoredUser = () => {

    try {

      const storedUser =
        localStorage.getItem("user");

      return storedUser
        ? JSON.parse(storedUser)
        : null;

    } catch {

      return null;

    }

  };


  const token =
    localStorage.getItem("token");

  const user =
    getStoredUser();


  // ==========================================================
  // SCROLL DETECTION
  // ==========================================================

  useEffect(() => {

    const handleScroll = () => {

      setScrolled(
        window.scrollY > 24
      );

    };


    handleScroll();

    window.addEventListener(
      "scroll",
      handleScroll,
      { passive: true }
    );


    return () => {

      window.removeEventListener(
        "scroll",
        handleScroll
      );

    };

  }, []);


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

    setMobileOpen(false);

    navigate("/login", {
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


    if (
      location.pathname !== "/"
    ) {

      navigate(
        `/${href}`
      );

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
  // NAV LINK CLASS
  // ==========================================================

  const dashboardLinkClass =
    ({ isActive }) => {

      return `
        relative
        px-3
        py-2
        text-sm
        font-semibold
        transition-all
        duration-300
        ${
          isActive
            ? "text-indigo-600"
            : "text-slate-600 hover:text-indigo-600"
        }
      `;

    };


  // ==========================================================
  // RENDER
  // ==========================================================

  return (

    <>

      {/* ======================================================
          DESKTOP / MAIN NAVBAR
      ====================================================== */}

      <motion.header

        initial={{
          y: -30,
          opacity: 0,
        }}

        animate={{
          y: 0,
          opacity: 1,
        }}

        transition={{
          duration: 0.65,
          ease: [0.22, 1, 0.36, 1],
        }}

        className={`
          fixed
          top-0
          left-0
          right-0
          z-[100]
          transition-all
          duration-500
          ${
            scrolled
              ? `
                bg-white/85
                backdrop-blur-2xl
                border-b
                border-slate-200/70
                shadow-[0_10px_40px_rgba(15,23,42,0.08)]
              `
              : `
                bg-white/95
                backdrop-blur-xl
                border-b
                border-slate-100
              `
          }
        `}
      >

        <div
          className={`
            mx-auto
            max-w-7xl
            px-5
            sm:px-7
            lg:px-8
            flex
            items-center
            justify-between
            transition-all
            duration-500
            ${
              scrolled
                ? "h-[68px]"
                : "h-[78px]"
            }
          `}
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
              items-center
              gap-3
              shrink-0
            "
          >

            <motion.div
              whileHover={{
                rotate: -5,
                scale: 1.05,
              }}

              whileTap={{
                scale: 0.95,
              }}

              className="
                relative
                flex
                h-11
                w-11
                items-center
                justify-center
                overflow-hidden
                rounded-2xl
                bg-gradient-to-br
                from-indigo-600
                via-violet-600
                to-purple-600
                text-white
                shadow-[0_8px_25px_rgba(79,70,229,0.28)]
              "
            >

              <FaGraduationCap
                size={21}
              />

              <span
                className="
                  absolute
                  inset-0
                  bg-white/20
                  opacity-0
                  transition-opacity
                  duration-300
                  group-hover:opacity-100
                "
              />

            </motion.div>


            <div className="hidden sm:block">

              <div
                className="
                  bg-gradient-to-r
                  from-indigo-600
                  via-violet-600
                  to-purple-600
                  bg-clip-text
                  text-2xl
                  font-black
                  tracking-tight
                  text-transparent
                "
              >

                Data Lattice

              </div>


              <div
                className="
                  -mt-1
                  text-[10px]
                  font-semibold
                  tracking-[0.16em]
                  text-slate-400
                  uppercase
                "
              >

                Learn Without Limits

              </div>

            </div>

          </Link>


          {/* ==================================================
              PUBLIC DESKTOP NAVIGATION
          ================================================== */}

          {!token && (

            <nav
              className="
                hidden
                lg:flex
                items-center
                gap-1
                rounded-full
                border
                border-slate-200/70
                bg-slate-50/70
                p-1.5
              "
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
                    className="
                      relative
                      rounded-full
                      px-4
                      py-2.5
                      text-sm
                      font-semibold
                      text-slate-600
                      transition-all
                      duration-300
                      hover:bg-white
                      hover:text-indigo-600
                      hover:shadow-sm
                    "
                  >

                    {item.label}

                  </button>

                )
              )}

            </nav>

          )}


          {/* ==================================================
              LOGGED-IN NAVIGATION
          ================================================== */}

          {token && (

            <nav
              className="
                hidden
                lg:flex
                items-center
                gap-1
              "
            >

              <NavLink
                to="/"
                className={
                  dashboardLinkClass
                }
              >
                Home
              </NavLink>


              <NavLink
                to="/courses"
                className={
                  dashboardLinkClass
                }
              >
                Courses
              </NavLink>


              {user?.role ===
                "student" && (
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
                    to="/my-courses"
                    className={
                      dashboardLinkClass
                    }
                  >
                    My Learning
                  </NavLink>


                  <NavLink
                    to="/live-classes"
                    className={
                      dashboardLinkClass
                    }
                  >
                    Live Classes
                  </NavLink>

                </>
              )}


              {user?.role ===
                "admin" && (

                <NavLink
                  to="/admin/dashboard"
                  className={
                    dashboardLinkClass
                  }
                >
                  Admin
                </NavLink>

              )}


              {user?.role ===
                "mentor" && (

                <NavLink
                  to="/mentor/dashboard"
                  className={
                    dashboardLinkClass
                  }
                >
                  Mentor
                </NavLink>

              )}

            </nav>

          )}


          {/* ==================================================
              RIGHT SIDE
          ================================================== */}

          <div
            className="
              hidden
              lg:flex
              items-center
              gap-3
            "
          >

            {!token ? (

              <>

                <Link
                  to="/login"
                  className="
                    rounded-full
                    px-5
                    py-2.5
                    text-sm
                    font-bold
                    text-slate-700
                    transition-all
                    duration-300
                    hover:bg-slate-100
                    hover:text-indigo-600
                  "
                >

                  Login

                </Link>


                <Link
                  to="/register"
                  className="
                    group
                    relative
                    overflow-hidden
                    rounded-full
                    bg-gradient-to-r
                    from-indigo-600
                    via-violet-600
                    to-purple-600
                    px-6
                    py-3
                    text-sm
                    font-bold
                    text-white
                    shadow-[0_8px_25px_rgba(79,70,229,0.25)]
                    transition-all
                    duration-300
                    hover:-translate-y-0.5
                    hover:shadow-[0_12px_35px_rgba(79,70,229,0.35)]
                  "
                >

                  <span
                    className="
                      relative
                      z-10
                      flex
                      items-center
                      gap-2
                    "
                  >

                    Get Started

                    <FaArrowRight
                      className="
                        transition-transform
                        duration-300
                        group-hover:translate-x-1
                      "
                    />

                  </span>

                </Link>

              </>

            ) : (

              <>

                <div
                  className="
                    hidden
                    xl:flex
                    items-center
                    gap-3
                    rounded-full
                    border
                    border-slate-200
                    bg-white
                    px-3
                    py-1.5
                  "
                >

                  <img
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                      user?.full_name ||
                        "User"
                    )}&background=4f46e5&color=fff`}
                    alt="Profile"
                    className="
                      h-9
                      w-9
                      rounded-full
                    "
                  />


                  <div
                    className="
                      pr-2
                    "
                  >

                    <p
                      className="
                        text-xs
                        font-bold
                        text-slate-800
                      "
                    >

                      {user?.full_name ||
                        "User"}

                    </p>

                    <p
                      className="
                        text-[10px]
                        font-medium
                        capitalize
                        text-slate-400
                      "
                    >

                      {user?.role ||
                        "Student"}

                    </p>

                  </div>

                </div>


                <motion.button
                  type="button"
                  onClick={logout}
                  whileHover={{
                    y: -1,
                  }}
                  whileTap={{
                    scale: 0.96,
                  }}
                  className="
                    rounded-full
                    border
                    border-red-100
                    bg-red-50
                    px-5
                    py-2.5
                    text-sm
                    font-bold
                    text-red-600
                    transition-colors
                    duration-300
                    hover:bg-red-600
                    hover:text-white
                  "
                >

                  Logout

                </motion.button>

              </>

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
            onClick={() =>
              setMobileOpen(
                !mobileOpen
              )
            }
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-xl
              border
              border-slate-200
              bg-white
              text-slate-700
              shadow-sm
              transition-all
              duration-300
              hover:border-indigo-200
              hover:text-indigo-600
              lg:hidden
            "
          >

            {mobileOpen ? (
              <FaTimes size={19} />
            ) : (
              <FaBars size={19} />
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
                bg-slate-950/30
                backdrop-blur-sm
                lg:hidden
              "
            />


            <motion.div

              initial={{
                opacity: 0,
                y: -20,
                scale: 0.98,
              }}

              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}

              exit={{
                opacity: 0,
                y: -20,
                scale: 0.98,
              }}

              transition={{
                duration: 0.25,
              }}

              className="
                fixed
                left-4
                right-4
                top-[84px]
                z-[95]
                max-h-[calc(100vh-105px)]
                overflow-y-auto
                rounded-3xl
                border
                border-slate-200
                bg-white
                p-4
                shadow-[0_25px_80px_rgba(15,23,42,0.18)]
                lg:hidden
              "
            >

              {!token ? (

                <div
                  className="
                    space-y-1
                  "
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
                        className="
                          flex
                          w-full
                          items-center
                          gap-4
                          rounded-2xl
                          px-4
                          py-3.5
                          text-left
                          font-semibold
                          text-slate-700
                          transition-all
                          hover:bg-indigo-50
                          hover:text-indigo-600
                        "
                      >

                        <item.icon />

                        {item.label}

                      </button>

                    )
                  )}


                  <div
                    className="
                      mt-3
                      grid
                      grid-cols-2
                      gap-3
                      border-t
                      border-slate-100
                      pt-4
                    "
                  >

                    <Link
                      to="/login"
                      className="
                        rounded-2xl
                        border
                        border-slate-200
                        px-4
                        py-3
                        text-center
                        text-sm
                        font-bold
                        text-slate-700
                      "
                    >

                      Login

                    </Link>


                    <Link
                      to="/register"
                      className="
                        rounded-2xl
                        bg-indigo-600
                        px-4
                        py-3
                        text-center
                        text-sm
                        font-bold
                        text-white
                      "
                    >

                      Get Started

                    </Link>

                  </div>

                </div>

              ) : (

                <div
                  className="
                    space-y-1
                  "
                >

                  <div
                    className="
                      mb-3
                      flex
                      items-center
                      gap-3
                      rounded-2xl
                      bg-slate-50
                      p-4
                    "
                  >

                    <img
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                        user?.full_name ||
                          "User"
                      )}&background=4f46e5&color=fff`}
                      alt="Profile"
                      className="
                        h-11
                        w-11
                        rounded-full
                      "
                    />

                    <div>

                      <p
                        className="
                          font-bold
                          text-slate-800
                        "
                      >

                        {user?.full_name ||
                          "User"}

                      </p>

                      <p
                        className="
                          text-xs
                          capitalize
                          text-slate-400
                        "
                      >

                        {user?.role ||
                          "Student"}

                      </p>

                    </div>

                  </div>


                  <NavLink
                    to="/"
                    className={
                      dashboardLinkClass
                    }
                  >
                    Home
                  </NavLink>


                  <NavLink
                    to="/courses"
                    className={
                      dashboardLinkClass
                    }
                  >
                    Courses
                  </NavLink>


                  {user?.role ===
                    "student" && (
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
                        to="/my-courses"
                        className={
                          dashboardLinkClass
                        }
                      >
                        My Learning
                      </NavLink>


                      <NavLink
                        to="/live-classes"
                        className={
                          dashboardLinkClass
                        }
                      >
                        Live Classes
                      </NavLink>

                    </>
                  )}


                  {user?.role ===
                    "admin" && (

                    <NavLink
                      to="/admin/dashboard"
                      className={
                        dashboardLinkClass
                      }
                    >
                      Admin
                    </NavLink>

                  )}


                  {user?.role ===
                    "mentor" && (

                    <NavLink
                      to="/mentor/dashboard"
                      className={
                        dashboardLinkClass
                      }
                    >
                      Mentor
                    </NavLink>

                  )}


                  <button
                    type="button"
                    onClick={logout}
                    className="
                      mt-3
                      w-full
                      rounded-2xl
                      bg-red-50
                      px-4
                      py-3.5
                      text-sm
                      font-bold
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


export default Navbar;