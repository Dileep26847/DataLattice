import { motion } from "framer-motion";
import {
  FaLaptopCode,
  FaCertificate,
  FaUserGraduate,
  FaBriefcase,
} from "react-icons/fa";

const features = [
  {
    icon: <FaLaptopCode size={34} />,
    title: "Project-Based Learning",
    description:
      "Build real-world projects that strengthen your portfolio.",
  },
  {
    icon: <FaCertificate size={34} />,
    title: "Verified Certificates",
    description:
      "Earn industry-recognized certificates after every program.",
  },
  {
    icon: <FaUserGraduate size={34} />,
    title: "Expert Mentorship",
    description:
      "Learn directly from experienced professionals.",
  },
  {
    icon: <FaBriefcase size={34} />,
    title: "Placement Support",
    description:
      "Resume reviews, mock interviews and career guidance.",
  },
];

function WhyDataWave() {
  return (
    <section className="py-24 bg-white">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center">

          <p className="text-indigo-600 font-semibold uppercase">
            Why Choose DataWave
          </p>

          <h2 className="text-5xl font-bold mt-4">
            Everything You Need To Launch Your Career
          </h2>

        </div>

        <div className="grid lg:grid-cols-2 gap-8 mt-16">

          {features.map((item, index) => (

            <motion.div
              key={index}
              whileHover={{ scale: 1.03 }}
              className="rounded-3xl border bg-slate-50 p-8 shadow-lg"
            >

              <div className="w-16 h-16 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center">

                {item.icon}

              </div>

              <h3 className="text-2xl font-bold mt-6">

                {item.title}

              </h3>

              <p className="mt-4 text-slate-600">

                {item.description}

              </p>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default WhyDataWave;