import {
  FaSearch,
  FaMoon,
  FaUserCircle,
} from "react-icons/fa";

import NotificationBell from "../NotificationBell";


// ==========================================
// TOPBAR
// ==========================================

function Topbar() {

  // ==========================================
  // CURRENT USER
  // ==========================================

  const user = JSON.parse(
    localStorage.getItem("user")
  );


  // ==========================================
  // RENDER
  // ==========================================

  return (

    <header
      className="
        bg-white
        h-20
        shadow-sm
        border-b
        border-gray-200
        flex
        items-center
        justify-between
        px-8
        relative
        z-[100]
      "
    >

      {/* ======================================
          LEFT SECTION
      ====================================== */}

      <div>

        <h1
          className="
            text-2xl
            font-bold
            text-slate-800
          "
        >

          Data Lattice Admin

        </h1>


        <p
          className="
            text-sm
            text-gray-500
          "
        >

          Welcome back,{" "}

          {user?.full_name ||
            "Administrator"}{" "}

          👋

        </p>

      </div>


      {/* ======================================
          CENTER SEARCH
      ====================================== */}

      <div
        className="
          hidden
          lg:flex
          items-center
          relative
          w-[420px]
        "
      >

        <FaSearch
          className="
            absolute
            left-4
            text-gray-400
          "
        />


        <input
          type="text"
          placeholder="Search students, courses, mentors..."
          className="
            w-full
            pl-12
            pr-4
            py-3
            rounded-xl
            border
            border-gray-300
            outline-none
            focus:ring-2
            focus:ring-cyan-500
            focus:border-cyan-500
            transition
          "
        />

      </div>


      {/* ======================================
          RIGHT SECTION
      ====================================== */}

      <div
        className="
          flex
          items-center
          gap-6
        "
      >

        {/* ====================================
            NOTIFICATIONS
        ==================================== */}

        <div
          className="
            relative
            shrink-0
          "
          style={{
            zIndex: 999999,
          }}
        >

          <NotificationBell />

        </div>


        {/* ====================================
            DARK MODE
        ==================================== */}

        <button
          type="button"
          aria-label="Toggle dark mode"
          className="
            w-11
            h-11
            rounded-xl
            flex
            items-center
            justify-center
            hover:bg-slate-100
            transition
          "
        >

          <FaMoon
            className="
              text-2xl
              text-gray-600
              hover:text-cyan-600
              transition
            "
          />

        </button>


        {/* ====================================
            ADMIN PROFILE
        ==================================== */}

        <div
          className="
            flex
            items-center
            gap-3
            bg-slate-100
            px-4
            py-2
            rounded-xl
          "
        >

          <FaUserCircle
            className="
              text-4xl
              text-cyan-600
            "
          />


          <div>

            <h3
              className="
                font-semibold
                text-slate-800
              "
            >

              {user?.full_name ||
                "Admin"}

            </h3>


            <p
              className="
                text-xs
                text-gray-500
              "
            >

              Super Administrator

            </p>

          </div>

        </div>

      </div>

    </header>

  );

}


// ==========================================
// EXPORT
// ==========================================

export default Topbar;