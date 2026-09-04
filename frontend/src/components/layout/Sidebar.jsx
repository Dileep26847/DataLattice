import {
  FaHome,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaBookOpen,
  FaLayerGroup,
  FaClipboardList,
  FaBook,
  FaVideo,
  FaCertificate,
  FaChartBar,
  FaCog,
  FaSignOutAlt,
  FaHeadset,
} from "react-icons/fa";

import { NavLink } from "react-router-dom";

// ==========================================
// Admin Menu Items
// ==========================================

const menuItems = [
  {
    name: "Dashboard",
    icon: <FaHome />,
    path: "/admin/dashboard",
  },

  {
    name: "Students",
    icon: <FaUserGraduate />,
    path: "/admin/students",
  },

  {
    name: "Mentors",
    icon: <FaChalkboardTeacher />,
    path: "/admin/mentors",
  },

  {
    name: "Courses",
    icon: <FaBookOpen />,
    path: "/admin/courses",
  },

  {
    name: "Lessons",
    icon: <FaBook />,
    path: "/admin/lessons",
  },

  {
    name: "Batches",
    icon: <FaLayerGroup />,
    path: "/admin/batches",
  },

  {
    name: "Assignments",
    icon: <FaClipboardList />,
    path: "/admin/assignments",
  },

  {
    name: "Live Classes",
    icon: <FaVideo />,
    path: "/admin/live-classes",
  },

  {
    name: "Certificates",
    icon: <FaCertificate />,
    path: "/admin/certificates",
  },

  // ==========================================
  // Support
  // ==========================================

  {
    name: "Support",
    icon: <FaHeadset />,
    path: "/admin/support",
  },

  {
    name: "Analytics",
    icon: <FaChartBar />,
    path: "/admin/analytics",
  },

  {
    name: "Settings",
    icon: <FaCog />,
    path: "/admin/settings",
  },
];

// ==========================================
// Sidebar
// ==========================================

function Sidebar() {
  return (
    <aside className="w-72 min-h-screen bg-slate-900 text-white flex flex-col shadow-2xl">

      {/* ======================================
          Logo
      ====================================== */}

      <div className="px-8 py-8 border-b border-slate-800">

        <h1 className="text-3xl font-extrabold tracking-wide text-cyan-400">
          Data Lattice
        </h1>

        <p className="text-sm text-slate-400 mt-1">
          Learning Management System
        </p>

      </div>

      {/* ======================================
          Navigation
      ====================================== */}

      <nav className="flex-1 mt-6 px-4 overflow-y-auto">

        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-4 px-5 py-4 rounded-xl mb-2 transition-all duration-200 ${
                isActive
                  ? "bg-cyan-600 text-white shadow-lg"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`
            }
          >

            <span className="text-xl">
              {item.icon}
            </span>

            <span className="font-medium">
              {item.name}
            </span>

          </NavLink>
        ))}

      </nav>

      {/* ======================================
          Footer
      ====================================== */}

      <div className="border-t border-slate-800 p-5">

        <button
          className="w-full flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700 transition py-3 rounded-xl"
        >
          <FaSignOutAlt />

          Logout
        </button>

      </div>

    </aside>
  );
}

export default Sidebar;