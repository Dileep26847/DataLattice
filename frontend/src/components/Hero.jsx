import heroImage from "../assets/hero.png";
import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";

function Hero() {
  return (
    <section className="bg-gradient-to-b from-white via-slate-50 to-white min-h-[90vh] flex items-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 grid lg:grid-cols-2 gap-20 items-center">

        {/* Left Content */}

        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >

          <span className="inline-block bg-blue-100 text-blue-700 px-5 py-2 rounded-full text-sm font-semibold">
            🚀 Learn from Industry Experts
          </span>

          <h1 className="mt-8 text-6xl lg:text-7xl font-extrabold leading-tight text-gray-900">

            Learn{" "}

            <span className="text-blue-600">

              Without

            </span>

            <br />

            Limits.

          </h1>

          <p className="mt-8 text-xl leading-9 text-gray-600 max-w-xl">

            Build real-world skills with industry experts.

            Learn AI, Web Development,

            UI/UX, DevOps, Data Science,

            Cloud Computing and much more.

          </p>

          <div className="flex items-center gap-2 mt-8">

            <FaStar className="text-yellow-400" />
            <FaStar className="text-yellow-400" />
            <FaStar className="text-yellow-400" />
            <FaStar className="text-yellow-400" />
            <FaStar className="text-yellow-400" />

            <span className="text-gray-600 font-medium">

              4.9 Rating (12,000+ Reviews)

            </span>

          </div>

          <div className="mt-10 flex flex-wrap gap-5">

            <button className="bg-blue-600 hover:bg-blue-700 transition text-white px-8 py-4 rounded-2xl shadow-lg">

              Explore Courses

            </button>

            <button className="border border-gray-300 hover:bg-gray-100 transition px-8 py-4 rounded-2xl">

              Become Mentor

            </button>

          </div>

        </motion.div>

        {/* Right Image */}

        <motion.div
          className="relative flex justify-center"
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >

          <motion.img
            src={heroImage}
            alt="Hero"
            className="w-full max-w-xl"
            animate={{
              y: [0, -15, 0]
            }}
            transition={{
              repeat: Infinity,
              duration: 4
            }}
          />

          {/* Students */}

          <motion.div
            className="absolute top-10 left-0 bg-white rounded-3xl shadow-xl px-6 py-4"
            animate={{
              y: [0, -10, 0]
            }}
            transition={{
              repeat: Infinity,
              duration: 3
            }}
          >

            <h2 className="text-3xl font-bold text-blue-600">

              50K+

            </h2>

            <p className="text-gray-500">

              Students

            </p>

          </motion.div>

          {/* Courses */}

          <motion.div
            className="absolute bottom-10 right-0 bg-white rounded-3xl shadow-xl px-6 py-4"
            animate={{
              y: [0, 10, 0]
            }}
            transition={{
              repeat: Infinity,
              duration: 3
            }}
          >

            <h2 className="text-3xl font-bold text-green-600">

              120+

            </h2>

            <p className="text-gray-500">

              Courses

            </p>

          </motion.div>

        </motion.div>

      </div>
    </section>
  );
}

export default Hero;