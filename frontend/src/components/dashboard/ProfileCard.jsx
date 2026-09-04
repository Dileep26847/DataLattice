import {
  FaUserGraduate,
  FaEnvelope,
  FaTrophy,
  FaFire,
  FaMedal,
  FaArrowRight,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function ProfileCard() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-3xl shadow-lg overflow-hidden"
    >
      {/* Header */}

      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 h-28"></div>

      {/* Profile */}

      <div className="px-8 pb-8 text-center">

        <img
          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
            user?.full_name || "Student"
          )}&background=2563eb&color=fff&size=200`}
          alt="Profile"
          className="w-28 h-28 rounded-full mx-auto -mt-14 border-4 border-white shadow-lg"
        />

        <h2 className="text-2xl font-bold mt-5">
          {user?.full_name}
        </h2>

        <div className="flex justify-center items-center gap-2 mt-2 text-gray-500">

          <FaEnvelope />

          <span className="text-sm">
            {user?.email}
          </span>

        </div>

        <span className="inline-flex items-center gap-2 mt-5 bg-blue-100 text-blue-700 px-5 py-2 rounded-full font-semibold">

          <FaUserGraduate />

          Student

        </span>

        {/* Stats */}

        <div className="grid grid-cols-3 gap-4 mt-8">

          <div className="bg-slate-100 rounded-2xl py-4">

            <FaFire className="mx-auto text-orange-500 text-2xl" />

            <h3 className="font-bold text-xl mt-2">
              7
            </h3>

            <p className="text-xs text-gray-500">
              Day Streak
            </p>

          </div>

          <div className="bg-slate-100 rounded-2xl py-4">

            <FaTrophy className="mx-auto text-yellow-500 text-2xl" />

            <h3 className="font-bold text-xl mt-2">
              1280
            </h3>

            <p className="text-xs text-gray-500">
              XP
            </p>

          </div>

          <div className="bg-slate-100 rounded-2xl py-4">

            <FaMedal className="mx-auto text-green-600 text-2xl" />

            <h3 className="font-bold text-xl mt-2">
              5
            </h3>

            <p className="text-xs text-gray-500">
              Level
            </p>

          </div>

        </div>

        <Link
          to="/profile"
          className="mt-8 inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition"
        >
          View Profile

          <FaArrowRight />

        </Link>

      </div>

    </motion.div>
  );
}

export default ProfileCard;