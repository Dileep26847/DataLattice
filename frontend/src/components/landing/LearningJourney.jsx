import { motion } from "framer-motion";
import {
  FaUserPlus,
  FaBookReader,
  FaCode,
  FaCertificate,
  FaBriefcase,
} from "react-icons/fa";

const steps = [
  {
    icon: <FaUserPlus />,
    title: "Enroll",
    desc: "Choose your career path.",
  },
  {
    icon: <FaBookReader />,
    title: "Learn",
    desc: "Study with expert mentors.",
  },
  {
    icon: <FaCode />,
    title: "Build",
    desc: "Complete real-world projects.",
  },
  {
    icon: <FaCertificate />,
    title: "Certificate",
    desc: "Earn verified certifications.",
  },
  {
    icon: <FaBriefcase />,
    title: "Get Hired",
    desc: "Placement assistance & interviews.",
  },
];

export default function LearningJourney() {
  return (
    <section className="py-24 bg-slate-50">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center">

          <p className="uppercase text-indigo-600 font-semibold">
            Learning Journey
          </p>

          <h2 className="text-5xl font-bold mt-4">
            Your Roadmap to Success
          </h2>

        </div>

        <div className="grid md:grid-cols-5 gap-8 mt-20">

          {steps.map((step, index) => (

            <motion.div
              key={index}
              whileHover={{ y: -10 }}
              className="text-center"
            >

              <div className="w-20 h-20 mx-auto rounded-full bg-indigo-600 text-white flex items-center justify-center text-3xl shadow-xl">

                {step.icon}

              </div>

              <h3 className="mt-6 text-xl font-bold">

                {step.title}

              </h3>

              <p className="mt-3 text-gray-500">

                {step.desc}

              </p>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
}