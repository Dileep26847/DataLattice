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
} from "react-icons/fa6";


// ============================================================
// DATALATTICE PUBLIC NAVIGATION
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
  // LOGGED-IN NAVIGATION
  // ==========================================================

  const dashboardLinkClass =
    ({ isActive }) => {

      return `
        relative
        rounded-xl
        px-3
        py-2
        text-sm
        font-semibold
        tracking-[-0.01em]
        transition-all
        duration-200
        ${
          isActive
            ? "bg-white/70 text-[#1463FF] shadow-sm"
            : "text-[#0B1B3A]/75 hover:bg-white/45 hover:text-[#1463FF]"
        }
      `;

    };


  // ==========================================================
  // RENDER
  // ==========================================================

  return (

    <>

      {/* ======================================================
          GLASSMORPHISM NAVBAR
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
          border-b
          border-white/65
          bg-white/45
          shadow-[0_8px_32px_rgba(11,27,58,0.06)]
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


        <div
          className="
            relative
            flex
            h-[76px]
            w-full
            items-center
            justify-between
            px-5
            sm:px-7
            lg:px-8
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
              gap-2.5
              -translate-y-1
            "
          >

            {/* Logo mark */}

            <div
              className="
                relative
                flex
                h-10
                w-10
                items-center
                justify-center
                overflow-hidden
                rounded-xl
                border
                border-white/75
                bg-white/60
                shadow-[0_8px_24px_rgba(11,27,58,0.08)]
                backdrop-blur-md
                transition-all
                duration-300
                group-hover:bg-white/80
                group-hover:shadow-[0_10px_28px_rgba(20,99,255,0.12)]
              "
            >

              <div
                className="
                  absolute
                  h-5
                  w-5
                  rounded-full
                  border-[2px]
                  border-[#1463FF]
                "
              />


              <div
                className="
                  absolute
                  h-2
                  w-2
                  rounded-full
                  bg-[#06B6D4]
                "
              />


              <span
                className="
                  absolute
                  left-[7px]
                  top-[8px]
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-[#1463FF]
                "
              />


              <span
                className="
                  absolute
                  bottom-[8px]
                  right-[7px]
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-[#1463FF]
                "
              />

            </div>


            {/* Wordmark */}

            <div>

              <div
                className="
                  text-[20px]
                  font-extrabold
                  leading-none
                  tracking-[-0.045em]
                  text-[#0B1B3A]
                "
              >

                DataLattice

              </div>


              <div
                className="
                  mt-1
                  text-[8px]
                  font-bold
                  uppercase
                  leading-none
                  tracking-[0.18em]
                  text-[#64748B]
                "
              >

                Learn • Build • Grow

              </div>

            </div>

          </Link>


          {/* ==================================================
              DESKTOP PUBLIC NAVIGATION
          ================================================== */}

          {!token && (

            <nav
              className="
                hidden
                items-center
                gap-1
                rounded-2xl
                border
                border-white/55
                bg-white/25
                p-1
                shadow-[0_6px_22px_rgba(11,27,58,0.035)]
                backdrop-blur-md
                lg:absolute
                lg:left-1/2
                lg:top-1/2
                lg:flex
                lg:-translate-x-1/2
                lg:-translate-y-1/2
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
                      rounded-xl
                      px-4
                      py-2
                      text-[14px]
                      font-semibold
                      tracking-[-0.01em]
                      text-[#0B1B3A]/70
                      transition-all
                      duration-200
                      hover:bg-white/60
                      hover:text-[#1463FF]
                    "
                  >

                    {item.label}

                  </button>

                )
              )}

            </nav>

          )}


          {/* ==================================================
              LOGGED-IN DESKTOP NAVIGATION
          ================================================== */}

          {token && (

            <nav
              className="
                hidden
                items-center
                gap-1
                rounded-2xl
                border
                border-white/55
                bg-white/25
                p-1
                shadow-[0_6px_22px_rgba(11,27,58,0.035)]
                backdrop-blur-md
                lg:absolute
                lg:left-1/2
                lg:top-1/2
                lg:flex
                lg:-translate-x-1/2
                lg:-translate-y-1/2
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
              DESKTOP RIGHT SIDE
          ================================================== */}

          <div
            className="
              ml-auto
              hidden
              items-center
              lg:flex
            "
          >

            {!token ? (

              <Link
                to="/login"
                className="
                  inline-flex
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-white/25
                  bg-[#1463FF]
                  px-5
                  py-2.5
                  text-[14px]
                  font-bold
                  tracking-[-0.01em]
                  text-white
                  shadow-[0_8px_24px_rgba(20,99,255,0.20)]
                  transition-all
                  duration-200
                  hover:-translate-y-0.5
                  hover:bg-[#0B1B3A]
                  hover:shadow-[0_12px_30px_rgba(11,27,58,0.20)]
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-[#1463FF]
                  focus-visible:ring-offset-2
                "
              >

                Login

              </Link>

            ) : (

              <div
                className="
                  flex
                  items-center
                  gap-3
                  rounded-2xl
                  border
                  border-white/55
                  bg-white/35
                  px-2
                  py-1.5
                  shadow-[0_6px_22px_rgba(11,27,58,0.04)]
                  backdrop-blur-md
                "
              >

                <div
                  className="
                    flex
                    items-center
                    gap-2.5
                  "
                >

                  <img
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                      user?.full_name ||
                        "User"
                    )}&background=1463FF&color=fff`}
                    alt="Profile"
                    className="
                      h-8
                      w-8
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
                        text-xs
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
                        text-[10px]
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
                    rounded-xl
                    px-3
                    py-2
                    text-sm
                    font-semibold
                    text-[#64748B]
                    transition-all
                    duration-200
                    hover:bg-white/60
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
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              border
              border-white/70
              bg-white/55
              text-[#0B1B3A]
              shadow-[0_6px_20px_rgba(11,27,58,0.06)]
              backdrop-blur-md
              transition-all
              duration-200
              hover:bg-white/75
              hover:text-[#1463FF]
              lg:hidden
            "
          >

            {mobileOpen ? (
              <FaXmark size={18} />
            ) : (
              <FaBars size={18} />
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

            {/* Backdrop */}

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


            {/* Glass Menu */}

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
                left-4
                right-4
                top-[84px]
                z-[95]
                overflow-hidden
                rounded-2xl
                border
                border-white/70
                bg-white/65
                p-3
                shadow-[0_24px_70px_rgba(11,27,58,0.14)]
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


              {!token ? (

                <>

                  <div
                    className="
                      space-y-1
                    "
                  >

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
                            rounded-xl
                            border
                            border-transparent
                            px-4
                            py-3
                            text-left
                            text-sm
                            font-semibold
                            text-[#0B1B3A]
                            transition-all
                            duration-200
                            hover:border-white/70
                            hover:bg-white/60
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


                  <div
                    className="
                      mt-2
                      border-t
                      border-white/70
                      pt-3
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
                        rounded-xl
                        bg-[#1463FF]
                        px-4
                        py-3
                        text-sm
                        font-bold
                        text-white
                        shadow-[0_10px_24px_rgba(20,99,255,0.18)]
                        transition-all
                        duration-200
                        hover:bg-[#0B1B3A]
                      "
                    >

                      Login

                    </Link>

                  </div>

                </>

              ) : (

                <div
                  className="
                    space-y-1
                  "
                >

                  {/* User */}

                  <div
                    className="
                      mb-2
                      flex
                      items-center
                      gap-3
                      rounded-xl
                      border
                      border-white/70
                      bg-white/50
                      p-3
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
                        h-10
                        w-10
                        rounded-full
                        ring-2
                        ring-white/80
                      "
                    />


                    <div>

                      <p
                        className="
                          text-sm
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
                          text-[11px]
                          capitalize
                          text-[#64748B]
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
                      mt-2
                      w-full
                      rounded-xl
                      border
                      border-transparent
                      px-4
                      py-3
                      text-left
                      text-sm
                      font-semibold
                      text-red-600
                      transition-all
                      duration-200
                      hover:border-red-100
                      hover:bg-red-50/70
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