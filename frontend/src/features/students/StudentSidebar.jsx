import {
  FaHome,
  FaBookOpen,
  FaGraduationCap,
  FaUserCircle,
  FaCog,
  FaLifeRing,
  FaSignOutAlt,
} from "react-icons/fa";

import { NavLink, useNavigate } from "react-router-dom";

function StudentSidebar() {

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");

  };

  const menu = [
  {
    title: "Dashboard",
    path: "/student/dashboard",
    icon: <FaHome />,
  },

  {
    title: "Browse Courses",
    path: "/courses",
    icon: <FaBookOpen />,
  },

  {
    title: "My Courses",
    path: "/student/my-courses",
    icon: <FaGraduationCap />,
  },

  {
    title: "Support",
    path: "/student/support",
    icon: <FaLifeRing />,
  },

  {
    title: "Profile",
    path: "/student/profile",
    icon: <FaUserCircle />,
  },

  {
    title: "Settings",
    path: "/student/settings",
    icon: <FaCog />,
  },
];

  return (

    <aside className="w-72 min-h-screen bg-white border-r shadow-xl flex flex-col justify-between">

      <div>

        {/* Logo */}

        <div className="p-8 border-b">

          <h1 className="text-3xl font-black text-cyan-600">

            Data Lattice

          </h1>

          <p className="text-slate-500 mt-2">

            Student Portal

          </p>

        </div>

        {/* Profile */}

        <div className="text-center p-8">

          <img

            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
              user?.full_name || "Student"
            )}&background=0891b2&color=fff&size=200`}

            alt="Profile"

            className="w-24 h-24 rounded-full mx-auto shadow-lg"

          />

          <h2 className="font-bold text-xl mt-4">

            {user?.full_name}

          </h2>

          <p className="text-slate-500 capitalize">

            {user?.role}

          </p>

        </div>

        {/* Menu */}

        <nav className="px-5 space-y-2">

          {

            menu.map((item) => (

              <NavLink

                key={item.title}

                to={item.path}

                className={({ isActive }) =>

                  `flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 ${
                    isActive
                      ? "bg-cyan-600 text-white shadow-lg"
                      : "hover:bg-cyan-50 text-slate-600"
                  }`

                }

              >

                <span className="text-xl">

                  {item.icon}

                </span>

                <span className="font-semibold">

                  {item.title}

                </span>

              </NavLink>

            ))

          }

        </nav>

      </div>

      {/* Logout */}

      <div className="p-6">

        <button

          onClick={logout}

          className="w-full bg-red-500 hover:bg-red-600 text-white py-4 rounded-2xl flex items-center justify-center gap-3 font-semibold"

        >

          <FaSignOutAlt />

          Logout

        </button>

      </div>

    </aside>

  );

}

export default StudentSidebar;