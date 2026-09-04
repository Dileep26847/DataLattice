import { Link } from "react-router-dom";
import { FaExclamationTriangle, FaHome } from "react-icons/fa";
import { motion } from "framer-motion";

function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center px-6">

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-3xl shadow-2xl p-12 max-w-xl w-full text-center"
      >

        <FaExclamationTriangle
          className="text-yellow-500 mx-auto"
          size={80}
        />

        <h1 className="text-7xl font-bold mt-6">
          404
        </h1>

        <h2 className="text-3xl font-bold mt-4">
          Page Not Found
        </h2>

        <p className="text-gray-500 mt-4 leading-7">
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>

        <Link
          to="/"
          className="inline-flex items-center gap-3 mt-10 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold transition"
        >
          <FaHome />
          Back to Home
        </Link>

      </motion.div>

    </div>
  );
}

export default NotFound;