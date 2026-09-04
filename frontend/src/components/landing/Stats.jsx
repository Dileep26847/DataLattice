import { motion } from "framer-motion";
import {
  FaUserGraduate,
  FaBookOpen,
  FaBriefcase,
  FaChalkboardTeacher,
} from "react-icons/fa";

const stats = [
  {
    icon: <FaUserGraduate size={30} />,
    number: "10K+",
    title: "Students",
    color: "bg-indigo-100 text-indigo-600",
  },
  {
    icon: <FaBookOpen size={30} />,
    number: "150+",
    title: "Courses",
    color: "bg-orange-100 text-orange-600",
  },
  {
    icon: <FaBriefcase size={30} />,
    number: "95%",
    title: "Placement",
    color: "bg-green-100 text-green-600",
  },
  {
    icon: <FaChalkboardTeacher size={30} />,
    number: "50+",
    title: "Mentors",
    color: "bg-pink-100 text-pink-600",
  },
];

function Stats() {
  return (
    <section className="py-20 bg-white">

      <div className="max-w-7xl mx-auto px-6">

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {stats.map((item, index) => (

            <motion.div
              key={index}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
              className="rounded-3xl bg-white shadow-lg border p-8"
            >

              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center ${item.color}`}
              >
                {item.icon}
              </div>

              <h2 className="text-5xl font-bold mt-6">
                {item.number}
              </h2>

              <p className="mt-2 text-gray-500">
                {item.title}
              </p>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default Stats;