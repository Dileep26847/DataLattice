import { Link } from "react-router-dom";
import {
  FaStar,
  FaUserGraduate,
  FaHeart,
  FaClock,
} from "react-icons/fa";
import { motion } from "framer-motion";

function CourseCard({ course }) {
  return (
    <motion.div
      whileHover={{
        y: -10,
        scale: 1.02,
      }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl"
    >
      {/* Thumbnail */}

      <div className="relative">

        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-60 object-cover"
        />

        <button className="absolute top-4 right-4 bg-white p-3 rounded-full shadow-lg hover:bg-red-500 hover:text-white transition">
          <FaHeart />
        </button>

        <span className="absolute bottom-4 left-4 bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
          Bestseller
        </span>

      </div>

      {/* Body */}

      <div className="p-6">

        <h2 className="text-2xl font-bold text-gray-800 line-clamp-2">
          {course.title}
        </h2>

        <p className="text-gray-500 mt-4 line-clamp-3">
          {course.description}
        </p>

        <div className="flex items-center gap-2 mt-5 text-gray-600">

          <FaUserGraduate className="text-blue-600" />

          <span>{course.instructor}</span>

        </div>

        <div className="flex items-center gap-2 mt-3 text-gray-500">

          <FaClock />

          <span>40 Hours</span>

        </div>

        <div className="flex justify-between items-center mt-6">

          <div className="flex items-center gap-1">

            <FaStar className="text-yellow-400" />
            <FaStar className="text-yellow-400" />
            <FaStar className="text-yellow-400" />
            <FaStar className="text-yellow-400" />
            <FaStar className="text-yellow-400" />

            <span className="ml-2 text-gray-600">
              4.9
            </span>

          </div>

          <h3 className="text-3xl font-bold text-blue-600">
            ₹{course.price}
          </h3>

        </div>

        <Link to={`/courses/${course.id}`}>

          <button className="w-full mt-8 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-4 rounded-2xl font-bold transition">

            View Details →

          </button>

        </Link>

      </div>

    </motion.div>
  );
}

export default CourseCard;