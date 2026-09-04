import { useEffect, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  FaGraduationCap,
  FaBars,
  FaTimes,
  FaChevronDown,
  FaUserCircle,
} from "react-icons/fa";

function Navbar() {

  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(null);
  const [mobileOpen, setMobileOpen] =
    useState(false);

  const [profileOpen, setProfileOpen] =
    useState(false);


  // ============================================================
  // LOAD AUTH USER
  // ============================================================

  const loadUser = () => {

    const token =
      localStorage.getItem("token");

    const storedUser =
      localStorage.getItem("user");

    if (!token || !storedUser) {

      setUser(null);

      return;

    }

    try {

      const parsedUser =
        JSON.parse(storedUser);

      if (
        parsedUser &&
        parsedUser.id &&
        parsedUser.role
      ) {

        setUser(parsedUser);

      }

      else {

        setUser(null);

      }

    } catch (error) {

      console.error(
        "NAVBAR USER PARSE ERROR:",
        error
      );

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      setUser(null);

    }

  };


  // ============================================================
  // INITIAL AUTH CHECK
  // ============================================================

  useEffect(() => {

    loadUser();

  }, []);


  // ============================================================
  // LISTEN FOR LOGIN / LOGOUT
  // ============================================================

  useEffect(() => {

    const handleStorageChange = () => {

      loadUser();

    };

    window.addEventListener(
      "storage",
      handleStorageChange
    );

    window.addEventListener(
      "Data Lattice-auth-change",
      handleStorageChange
    );

    return () => {

      window.removeEventListener(
        "storage",
        handleStorageChange
      );

      window.removeEventListener(
        "Data Lattice-auth-change",
        handleStorageChange
      );

    };

  }, []);


  // ============================================================
  // CLOSE MOBILE MENU ON ROUTE CHANGE
  // ============================================================

  useEffect(() => {

    setMobileOpen(false);
    setProfileOpen(false);

  }, [location.pathname]);


  // ============================================================
  // SMOOTH SCROLL
  // ============================================================

  const scrollToSection = (
    sectionId
  ) => {

    setMobileOpen(false);

    setProfileOpen(false);

    if (location.pathname !== "/") {

      navigate(
        `/#${sectionId}`
      );

      return;

    }

    const element =
      document.getElementById(
        sectionId
      );

    if (!element) {
      return;
    }

    const navbarHeight = 80;

    const elementPosition =
      element.getBoundingClientRect()
        .top;

    const offsetPosition =
      elementPosition +
      window.pageYOffset -
      navbarHeight;

    window.scrollTo({

      top: offsetPosition,

      behavior: "smooth",

    });

  };


  // ============================================================
  // LOGOUT
  // ============================================================

  const handleLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    setUser(null);

    setProfileOpen(false);

    setMobileOpen(false);

    window.dispatchEvent(
      new Event("Data Lattice-auth-change")
    );

    navigate(
      "/",
      { replace: true }
    );

  };


  // ============================================================
  // DISPLAY NAME
  // ============================================================

  const getDisplayName = () => {

    if (!user) {
      return "";
    }

    return (
      user.full_name ||
      user.name ||
      user.email?.split("@")[0] ||
      "User"
    );

  };


  // ============================================================
  // ROLE LABEL
  // ============================================================

  const getRoleLabel = () => {

    if (!user?.role) {
      return "";
    }

    return (
      user.role.charAt(0).toUpperCase() +
      user.role.slice(1)
    );

  };


  // ============================================================
  // AUTHENTICATED NAVIGATION
  // ============================================================

  const authenticatedLinks = () => {

    if (!user) {
      return null;
    }

    if (user.role === "admin") {

      return (
        <>
          <Link
            to="/admin/dashboard"
            className="
              px-3
              py-2
              text-sm
              font-semibold
              text-slate-600
              hover:text-blue-600
              transition
            "
          >
            Admin
          </Link>
        </>
      );

    }

    if (user.role === "mentor") {

      return (
        <>
          <Link
            to="/mentor/dashboard"
            className="
              px-3
              py-2
              text-sm
              font-semibold
              text-slate-600
              hover:text-blue-600
            "
          >
            Dashboard
          </Link>
        </>
      );

    }

    return (
      <>
        <Link
          to="/student/dashboard"
          className="
            px-3
            py-2
            text-sm
            font-semibold
            text-slate-600
            hover:text-blue-600
            transition
          "
        >
          Dashboard
        </Link>

        <Link
          to="/student/my-courses"
          className="
            px-3
            py-2
            text-sm
            font-semibold
            text-slate-600
            hover:text-blue-600
            transition
          "
        >
          My Courses
        </Link>
      </>
    );

  };


  return (

    <>
      <nav
        className="
          fixed
          top-0
          left-0
          right-0
          z-50
          h-20
          bg-white/95
          backdrop-blur-md
          border-b
          border-slate-200
          shadow-sm
        "
      >

        <div className="
          max-w-7xl
          mx-auto
          h-full
          px-5
          lg:px-8
          flex
          items-center
          justify-between
        ">

          {/* ==================================================
              LOGO
          ================================================== */}

          <button
            type="button"
            onClick={() =>
              scrollToSection("home")
            }
            className="
              flex
              items-center
              gap-3
              shrink-0
            "
          >

            <div className="
              w-11
              h-11
              rounded-xl
              bg-blue-600
              text-white
              flex
              items-center
              justify-center
              shadow-lg
              shadow-blue-600/20
            ">

              <FaGraduationCap
                className="text-xl"
              />

            </div>

            <div className="text-left">

              <div className="
                text-xl
                font-extrabold
                tracking-tight
                text-blue-600
              ">
                Data Lattice
              </div>

              <div className="
                text-[11px]
                font-medium
                text-slate-400
                -mt-1
              ">
                Learn Without Limits
              </div>

            </div>

          </button>


          {/* ==================================================
              DESKTOP NAVIGATION
          ================================================== */}

          <div className="
            hidden
            lg:flex
            items-center
            gap-1
          ">

            <button
              type="button"
              onClick={() =>
                scrollToSection("home")
              }
              className="
                px-4
                py-2
                text-sm
                font-semibold
                text-slate-700
                hover:text-blue-600
                transition
              "
            >
              Home
            </button>


            <Link
              to="/courses"
              className="
                px-4
                py-2
                text-sm
                font-semibold
                text-slate-700
                hover:text-blue-600
                transition
              "
            >
              Courses
            </Link>


            <button
              type="button"
              onClick={() =>
                scrollToSection("about")
              }
              className="
                px-4
                py-2
                text-sm
                font-semibold
                text-slate-700
                hover:text-blue-600
                transition
              "
            >
              About
            </button>


            <button
              type="button"
              onClick={() =>
                scrollToSection("learning")
              }
              className="
                px-4
                py-2
                text-sm
                font-semibold
                text-slate-700
                hover:text-blue-600
                transition
              "
            >
              Learning
            </button>


            {authenticatedLinks()}

          </div>


          {/* ==================================================
              RIGHT SIDE
          ================================================== */}

          <div className="
            hidden
            lg:flex
            items-center
            gap-3
          ">

            {!user ? (

              <>

                <Link
                  to="/login"
                  className="
                    px-5
                    py-2.5
                    rounded-xl
                    text-sm
                    font-bold
                    text-blue-600
                    hover:bg-blue-50
                    transition
                  "
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="
                    px-5
                    py-2.5
                    rounded-xl
                    bg-blue-600
                    text-white
                    text-sm
                    font-bold
                    shadow-lg
                    shadow-blue-600/20
                    hover:bg-blue-700
                    transition
                  "
                >
                  Get Started
                </Link>

              </>

            ) : (

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
                    gap-3
                    rounded-xl
                    px-3
                    py-2
                    hover:bg-slate-50
                    transition
                  "
                >

                  <div className="
                    w-10
                    h-10
                    rounded-full
                    bg-blue-600
                    text-white
                    flex
                    items-center
                    justify-center
                    font-bold
                  ">
                    {getDisplayName()
                      .charAt(0)
                      .toUpperCase()}
                  </div>

                  <div className="text-left">

                    <div className="
                      text-sm
                      font-bold
                      text-slate-800
                      max-w-[120px]
                      truncate
                    ">
                      {getDisplayName()}
                    </div>

                    <div className="
                      text-xs
                      text-slate-400
                    ">
                      {getRoleLabel()}
                    </div>

                  </div>

                  <FaChevronDown className="
                    text-xs
                    text-slate-400
                  " />

                </button>


                {profileOpen && (

                  <div className="
                    absolute
                    right-0
                    top-14
                    w-56
                    rounded-2xl
                    bg-white
                    border
                    border-slate-200
                    shadow-xl
                    p-2
                  ">

                    {user.role === "student" && (

                      <>

                        <Link
                          to="/student/dashboard"
                          className="
                            block
                            px-4
                            py-3
                            rounded-xl
                            text-sm
                            font-medium
                            hover:bg-slate-50
                          "
                        >
                          Dashboard
                        </Link>

                        <Link
                          to="/student/my-courses"
                          className="
                            block
                            px-4
                            py-3
                            rounded-xl
                            text-sm
                            font-medium
                            hover:bg-slate-50
                          "
                        >
                          My Courses
                        </Link>

                      </>

                    )}


                    {user.role === "admin" && (

                      <Link
                        to="/admin/dashboard"
                        className="
                          block
                          px-4
                          py-3
                          rounded-xl
                          text-sm
                          font-medium
                          hover:bg-slate-50
                        "
                      >
                        Admin Dashboard
                      </Link>

                    )}


                    <button
                      type="button"
                      onClick={handleLogout}
                      className="
                        w-full
                        text-left
                        px-4
                        py-3
                        rounded-xl
                        text-sm
                        font-semibold
                        text-red-600
                        hover:bg-red-50
                      "
                    >
                      Logout
                    </button>

                  </div>

                )}

              </div>

            )}

          </div>


          {/* ==================================================
              MOBILE BUTTON
          ================================================== */}

          <button
            type="button"
            onClick={() =>
              setMobileOpen(
                (previous) =>
                  !previous
              )
            }
            className="
              lg:hidden
              w-11
              h-11
              rounded-xl
              bg-slate-100
              text-slate-700
              flex
              items-center
              justify-center
            "
            aria-label="Toggle navigation"
          >

            {mobileOpen
              ? <FaTimes />
              : <FaBars />
            }

          </button>

        </div>


        {/* ====================================================
            MOBILE MENU
        ===================================================== */}

        {mobileOpen && (

          <div className="
            lg:hidden
            bg-white
            border-t
            border-slate-200
            shadow-xl
            px-5
            py-5
          ">

            <div className="
              flex
              flex-col
              gap-1
            ">

              <button
                type="button"
                onClick={() =>
                  scrollToSection("home")
                }
                className="
                  text-left
                  px-4
                  py-3
                  rounded-xl
                  font-semibold
                  hover:bg-slate-50
                "
              >
                Home
              </button>


              <Link
                to="/courses"
                className="
                  px-4
                  py-3
                  rounded-xl
                  font-semibold
                  hover:bg-slate-50
                "
              >
                Courses
              </Link>


              <button
                type="button"
                onClick={() =>
                  scrollToSection("about")
                }
                className="
                  text-left
                  px-4
                  py-3
                  rounded-xl
                  font-semibold
                  hover:bg-slate-50
                "
              >
                About
              </button>


              <button
                type="button"
                onClick={() =>
                  scrollToSection("learning")
                }
                className="
                  text-left
                  px-4
                  py-3
                  rounded-xl
                  font-semibold
                  hover:bg-slate-50
                "
              >
                Learning
              </button>


              {user && user.role === "student" && (

                <>

                  <Link
                    to="/student/dashboard"
                    className="
                      px-4
                      py-3
                      rounded-xl
                      font-semibold
                      hover:bg-slate-50
                    "
                  >
                    Dashboard
                  </Link>

                  <Link
                    to="/student/my-courses"
                    className="
                      px-4
                      py-3
                      rounded-xl
                      font-semibold
                      hover:bg-slate-50
                    "
                  >
                    My Courses
                  </Link>

                </>

              )}


              {user?.role === "admin" && (

                <Link
                  to="/admin/dashboard"
                  className="
                    px-4
                    py-3
                    rounded-xl
                    font-semibold
                    hover:bg-slate-50
                  "
                >
                  Admin
                </Link>

              )}


              {!user ? (

                <div className="
                  grid
                  grid-cols-2
                  gap-3
                  mt-3
                  pt-4
                  border-t
                  border-slate-200
                ">

                  <Link
                    to="/login"
                    className="
                      text-center
                      px-4
                      py-3
                      rounded-xl
                      border
                      border-blue-200
                      text-blue-600
                      font-bold
                    "
                  >
                    Login
                  </Link>

                  <Link
                    to="/register"
                    className="
                      text-center
                      px-4
                      py-3
                      rounded-xl
                      bg-blue-600
                      text-white
                      font-bold
                    "
                  >
                    Get Started
                  </Link>

                </div>

              ) : (

                <div className="
                  mt-3
                  pt-4
                  border-t
                  border-slate-200
                ">

                  <div className="
                    flex
                    items-center
                    gap-3
                    px-3
                    mb-3
                  ">

                    <div className="
                      w-10
                      h-10
                      rounded-full
                      bg-blue-600
                      text-white
                      flex
                      items-center
                      justify-center
                      font-bold
                    ">

                      {getDisplayName()
                        .charAt(0)
                        .toUpperCase()}

                    </div>

                    <div>

                      <div className="font-bold">
                        {getDisplayName()}
                      </div>

                      <div className="
                        text-xs
                        text-slate-400
                      ">
                        {getRoleLabel()}
                      </div>

                    </div>

                  </div>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="
                      w-full
                      px-4
                      py-3
                      rounded-xl
                      bg-red-50
                      text-red-600
                      font-bold
                    "
                  >
                    Logout
                  </button>

                </div>

              )}

            </div>

          </div>

        )}

      </nav>


      {/* ======================================================
          NAVBAR SPACING
      ====================================================== */}

      <div className="h-20" />

    </>

  );

}

export default Navbar;