import { FaGraduationCap, FaLaptopCode, FaCertificate } from "react-icons/fa";
import { motion } from "framer-motion";

function AboutDataWave() {
  const features = [
    {
      icon: <FaGraduationCap size={30} />,
      title: "Expert Mentors",
      desc: "Learn from experienced professionals with real-world industry knowledge.",
    },
    {
      icon: <FaLaptopCode size={30} />,
      title: "Hands-on Learning",
      desc: "Practice with real projects to build practical skills and confidence.",
    },
    {
      icon: <FaCertificate size={30} />,
      title: "Certification",
      desc: "Earn certificates after completing your courses successfully.",
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-8">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-5xl font-bold">
            Why Choose DataWave?
          </h2>

          <p className="mt-5 text-gray-600 max-w-3xl mx-auto">
            DataWave is an online learning platform designed to help students
            gain industry-ready skills through interactive courses and practical
            learning experiences.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">

          {features.map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -8 }}
              className="bg-slate-50 rounded-3xl p-8 shadow-lg text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center mx-auto">
                {feature.icon}
              </div>

              <h3 className="text-2xl font-bold mt-6">
                {feature.title}
              </h3>

              <p className="text-gray-500 mt-4">
                {feature.desc}
              </p>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}

export default AboutDataWave;