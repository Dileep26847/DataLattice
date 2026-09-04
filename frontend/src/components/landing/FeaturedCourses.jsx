import { motion } from "framer-motion";
import {
  FaLaptopCode,
  FaRobot,
  FaPalette,
  FaDatabase,
} from "react-icons/fa";

const courses = [
  {
    title: "Full Stack Development",
    icon: <FaLaptopCode size={32} />,
    color: "from-indigo-500 to-blue-500",
    students: "2.4K Students",
  },
  {
    title: "Artificial Intelligence",
    icon: <FaRobot size={32} />,
    color: "from-purple-500 to-pink-500",
    students: "1.8K Students",
  },
  {
    title: "UI / UX Design",
    icon: <FaPalette size={32} />,
    color: "from-orange-400 to-red-500",
    students: "950 Students",
  },
  {
    title: "Data Science",
    icon: <FaDatabase size={32} />,
    color: "from-green-500 to-emerald-500",
    students: "1.2K Students",
  },
];

function FeaturedCourses() {
  return (
    <section className="py-24 bg-slate-50">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center">

          <p className="text-indigo-600 font-semibold uppercase tracking-wider">
            Featured Programs
          </p>

          <h2 className="text-5xl font-bold mt-4 text-slate-900">
            Learn Future-Ready Skills
          </h2>

          <p className="mt-6 text-slate-500 max-w-2xl mx-auto">
            Industry-designed programs with live mentorship,
            real-world projects and career guidance.
          </p>

        </div>

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mt-16">

          {courses.map((course, index) => (

            <motion.div
              key={index}
              whileHover={{
                y: -10,
                scale: 1.03,
              }}
              className="rounded-3xl bg-white shadow-xl overflow-hidden"
            >

              <div
                className={`h-44 bg-gradient-to-r ${course.color} flex items-center justify-center text-white`}
              >
                {course.icon}
              </div>

              <div className="p-8">

                <h3 className="text-2xl font-bold">
                  {course.title}
                </h3>

                <p className="mt-3 text-gray-500">
                  {course.students}
                </p>

                <button className="mt-8 w-full rounded-xl bg-indigo-600 py-3 text-white font-semibold hover:bg-indigo-700 transition">
                  View Course
                </button>

              </div>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default FeaturedCourses;