import {
  FaBell,
  FaSearch,
} from "react-icons/fa";

function StudentTopbar() {

  const user = JSON.parse(localStorage.getItem("user"));

  return (

    <header className="bg-white shadow-sm border-b px-8 py-5 flex justify-between items-center">

      {/* Left */}

      <div>

        <h1 className="text-3xl font-black text-slate-800">

          Welcome Back 👋

        </h1>

        <p className="text-slate-500 mt-1">

          Continue your learning journey.

        </p>

      </div>

      {/* Right */}

      <div className="flex items-center gap-6">

        {/* Search */}

        <div className="relative">

          <FaSearch
            className="absolute left-4 top-4 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search..."
            className="pl-12 pr-5 py-3 rounded-2xl bg-slate-100 outline-none w-80"
          />

        </div>

        {/* Notification */}

        <button
          className="relative w-12 h-12 rounded-full bg-slate-100 hover:bg-cyan-100 transition flex items-center justify-center"
        >

          <FaBell className="text-slate-600" />

          <span
            className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-red-500"
          />

        </button>

        {/* Avatar */}

        <div className="flex items-center gap-3">

          <img

            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
              user?.full_name || "Student"
            )}&background=0891b2&color=fff&size=200`}

            alt="Student"

            className="w-12 h-12 rounded-full"

          />

          <div>

            <h3 className="font-bold">

              {user?.full_name}

            </h3>

            <p className="text-sm text-slate-500 capitalize">

              {user?.role}

            </p>

          </div>

        </div>

      </div>

    </header>

  );

}

export default StudentTopbar;