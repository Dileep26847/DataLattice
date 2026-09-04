import SearchBar from "../common/SearchBar";
import Button from "../common/Button";
import NotificationBell from "../NotificationBell";


// ==========================================
// ADMIN TOPBAR
// ==========================================

function AdminTopbar() {

  // ==========================================
  // CURRENT USER
  // ==========================================

  const user = JSON.parse(
    localStorage.getItem("user")
  );


  // ==========================================
  // CURRENT DATE
  // ==========================================

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


  // ==========================================
  // RENDER
  // ==========================================

  return (

    <div
      className="
        bg-white
        rounded-3xl
        shadow-lg
        border
        border-slate-100
        p-6
        relative
        z-50
      "
    >

      <div
        className="
          flex
          flex-col
          xl:flex-row
          justify-between
          gap-6
          items-center
        "
      >

        {/* ======================================
            LEFT SECTION
        ====================================== */}

        <div>

          <h1
            className="
              text-4xl
              font-black
              text-slate-800
            "
          >

            Welcome Back 👋

          </h1>


          <p
            className="
              text-slate-500
              mt-2
            "
          >

            {user?.full_name || "Administrator"}

          </p>


          <p
            className="
              text-slate-400
              text-sm
              mt-1
            "
          >

            {today}

          </p>

        </div>


        {/* ======================================
            RIGHT SECTION
        ====================================== */}

        <div
          className="
            flex
            items-center
            gap-4
            w-full
            xl:w-auto
            relative
          "
        >

          {/* ====================================
              SEARCH
          ==================================== */}

          <div
            className="
              w-80
              hidden
              lg:block
            "
          >

            <SearchBar
              value=""
              onChange={() => {}}
              placeholder="Search..."
            />

          </div>


          {/* ====================================
              NOTIFICATION
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
              NEW COURSE
          ==================================== */}

          <Button
            size="sm"
          >

            + New Course

          </Button>


          {/* ====================================
              ADMIN PROFILE
          ==================================== */}

          <img
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
              user?.full_name || "Admin"
            )}&background=0891b2&color=fff&size=128`}
            alt="Admin"
            className="
              w-14
              h-14
              rounded-full
              border-4
              border-cyan-100
              shrink-0
            "
          />

        </div>

      </div>

    </div>

  );

}


// ==========================================
// EXPORT
// ==========================================

export default AdminTopbar;