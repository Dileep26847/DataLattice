import { motion } from "framer-motion";

export default function CTA() {
  return (
    <section className="py-24 px-6 bg-white">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto rounded-[40px] overflow-hidden bg-gradient-to-r from-indigo-700 via-blue-600 to-cyan-500 text-white p-16 relative"
      >

        <div className="relative z-10 max-w-3xl">

          <h2 className="text-5xl font-bold leading-tight">
            Ready to Build Your Dream Career?
          </h2>

          <p className="mt-6 text-lg text-indigo-100">
            Join thousands of learners mastering AI, Full Stack,
            UI/UX, Data Science and more with DataWave.
          </p>

          <button className="mt-10 bg-white text-indigo-700 px-8 py-4 rounded-xl font-bold hover:scale-105 transition">
            Start Learning Today
          </button>

        </div>

        <div className="absolute -right-24 -top-24 w-72 h-72 rounded-full bg-white/10 blur-3xl"></div>
        <div className="absolute right-32 bottom-0 w-52 h-52 rounded-full bg-cyan-300/20 blur-3xl"></div>

      </motion.div>

    </section>
  );
}