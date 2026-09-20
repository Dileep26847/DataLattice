import { motion } from "framer-motion";
import {
  FaArrowRight,
  FaBriefcase,
  FaCode,
  FaDatabase,
  FaGraduationCap,
  FaProjectDiagram,
} from "react-icons/fa";

const journeySteps = [
  {
    number: "STEP 1",
    title: "Learn",
    description: "Concepts through live & recorded sessions",
    icon: FaGraduationCap,
    color: "#2878F6",
    soft: "#EAF2FF",
  },
  {
    number: "STEP 2",
    title: "Practice",
    description: "Hands-on assignments and quizzes",
    icon: FaCode,
    color: "#12AFC8",
    soft: "#E8FAFC",
  },
  {
    number: "STEP 3",
    title: "Build",
    description: "Real-world projects and portfolio",
    icon: FaProjectDiagram,
    color: "#7130E8",
    soft: "#F1EAFE",
  },
  {
    number: "STEP 4",
    title: "Prepare",
    description: "Mock interviews and career guidance",
    icon: FaDatabase,
    color: "#F28A00",
    soft: "#FFF3DF",
  },
  {
    number: "STEP 5",
    title: "Grow",
    description: "Step into your dream career",
    icon: FaBriefcase,
    color: "#0EAD7D",
    soft: "#E6F8F2",
  },
];

function LearningJourney() {
  return (
    <section className="relative overflow-hidden bg-[#F7FAFF] py-14 sm:py-16 lg:min-h-[650px] lg:py-20">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* ==================================================
            HEADER
        ================================================== */}

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true, amount: 0.3 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="inline-flex items-center rounded-full border border-[#BCD5FF] bg-[#EAF2FF] px-4 py-1.5">
            <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#2878F6]">
              How It Works
            </span>
          </div>

          <h2 className="mt-5 text-4xl font-bold tracking-[-0.045em] text-[#091A38] sm:text-5xl lg:text-[44px]">
            Your Learning Journey
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-[#7B8CA8] sm:text-base sm:leading-7">
            A simple, structured path to help you go from learning to a
            successful career.
          </p>
        </motion.div>

        {/* ==================================================
            JOURNEY
        ================================================== */}

        <div className="relative mx-auto mt-16 max-w-6xl sm:mt-20 lg:mt-24">
          {/* desktop connecting line */}
          <div className="pointer-events-none absolute left-[9%] right-[9%] top-[38px] hidden h-[3px] lg:block">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#2878F6] via-[#7130E8] to-[#0EAD7D]" />
          </div>

          <div className="grid gap-12 lg:grid-cols-5 lg:gap-0">
            {journeySteps.map((step, index) => {
              const Icon = step.icon;

              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.45,
                    delay: index * 0.08,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.25,
                  }}
                  className="relative flex flex-col items-center text-center"
                >
                  {/* mobile connector */}
                  {index < journeySteps.length - 1 && (
                    <div
                      className="absolute left-1/2 top-[76px] h-12 w-[2px] -translate-x-1/2 lg:hidden"
                      style={{
                        background:
                          "linear-gradient(to bottom, #2878F6, #12AFC8)",
                      }}
                    />
                  )}

                  {/* ==================================================
                      ICON NODE
                  ================================================== */}

                  <motion.div
                    whileHover={{ scale: 1.06 }}
                    transition={{ duration: 0.2 }}
                    className="relative z-10 flex h-[76px] w-[76px] items-center justify-center rounded-full text-white shadow-[0_12px_28px_rgba(20,90,180,0.22)]"
                    style={{
                      backgroundColor: step.color,
                    }}
                  >
                    <Icon size={25} />

                    {/* step badge */}
                    <span
                      className="absolute -bottom-7 rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide"
                      style={{
                        backgroundColor: step.soft,
                        color: step.color,
                      }}
                    >
                      {step.number}
                    </span>
                  </motion.div>

                  {/* ==================================================
                      CONTENT
                  ================================================== */}

                  <div className="mt-12 px-2">
                    <h3 className="text-base font-bold tracking-[-0.02em] text-[#091A38] sm:text-lg">
                      {step.title}
                    </h3>

                    <p className="mx-auto mt-2 max-w-[180px] text-xs leading-5 text-[#8191AA] sm:text-[13px]">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ==================================================
            CTA
        ================================================== */}

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          viewport={{ once: true }}
          className="mt-14 flex justify-center sm:mt-16"
        >
          <button
            type="button"
            className="group inline-flex items-center gap-4 rounded-full bg-gradient-to-r from-[#1267F5] to-[#11B5C8] px-7 py-3.5 text-sm font-bold text-white shadow-[0_12px_28px_rgba(18,103,245,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_34px_rgba(18,103,245,0.28)]"
          >
            Start Your Journey Today
            <FaArrowRight
              size={13}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>
        </motion.div>
      </div>
    </section>
  );
}

export default LearningJourney;