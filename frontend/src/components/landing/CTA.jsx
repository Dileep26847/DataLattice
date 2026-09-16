import { motion, useReducedMotion } from "framer-motion";
import {
  FaArrowRight,
  FaChartLine,
  FaDatabase,
  FaProjectDiagram,
} from "react-icons/fa";

const programSignals = [
  {
    label: "Data Science",
    icon: FaChartLine,
  },
  {
    label: "Data Analytics",
    icon: FaDatabase,
  },
  {
    label: "Project-based learning",
    icon: FaProjectDiagram,
  },
];

export default function CTA() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-white px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24"
    >
      <div className="mx-auto w-full max-w-7xl">
        <motion.div
          initial={
            shouldReduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 20,
                }
          }
          whileInView={
            shouldReduceMotion
              ? undefined
              : {
                  opacity: 1,
                  y: 0,
                }
          }
          viewport={{
            once: true,
            amount: 0.25,
          }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.65,
            ease: "easeOut",
          }}
          className="
            relative
            overflow-hidden
            rounded-[30px]
            bg-[#0A1832]
          "
        >
          {/* =================================================
              QUIET BRAND ACCENT
          ================================================= */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              right-[-120px]
              top-[-150px]
              h-[430px]
              w-[430px]
              rounded-full
              opacity-30
              blur-3xl
            "
            style={{
              background:
                "radial-gradient(circle, rgba(53,49,231,0.55) 0%, rgba(53,49,231,0) 70%)",
            }}
          />

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              bottom-[-180px]
              left-[35%]
              h-[420px]
              w-[420px]
              rounded-full
              opacity-20
              blur-3xl
            "
            style={{
              background:
                "radial-gradient(circle, rgba(2,137,249,0.6) 0%, rgba(2,137,249,0) 70%)",
            }}
          />

          {/* =================================================
              CONTENT
          ================================================= */}

          <div
            className="
              relative
              z-10
              grid
              gap-12
              px-7
              py-10
              sm:px-10
              sm:py-12
              lg:grid-cols-[1fr_0.65fr]
              lg:items-end
              lg:px-14
              lg:py-14
              xl:px-16
            "
          >
            {/* =================================================
                LEFT
            ================================================= */}

            <div className="max-w-3xl">
              {/* Eyebrow */}

              <div className="flex items-center gap-3">
                <span className="h-px w-9 bg-[#0289F9]" />

                <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#4CA7FF]">
                  Start your next step
                </p>
              </div>

              {/* Heading */}

              <h2
                className="
                  mt-6
                  text-4xl
                  font-semibold
                  leading-[1.02]
                  tracking-[-0.05em]
                  text-white
                  sm:text-5xl
                  lg:text-[60px]
                "
              >
                Learn data.
                <br />
                <span className="bg-gradient-to-r from-[#0C5FF5] via-[#0289F9] to-[#3531E7] bg-clip-text text-transparent">
                  Build capability.
                </span>
              </h2>

              {/* Description */}

              <p
                className="
                  mt-6
                  max-w-2xl
                  text-sm
                  leading-7
                  text-white/55
                  sm:text-base
                  sm:leading-7
                "
              >
                Choose a focused learning path, strengthen your technical
                skills, practice what you learn, and build projects that show
                what you can do.
              </p>

              {/* =================================================
                  PROGRAM SIGNALS
              ================================================= */}

              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
                {programSignals.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.label}
                      className="
                        flex
                        items-center
                        gap-2
                        text-xs
                        font-medium
                        text-white/65
                      "
                    >
                      <span
                        className="
                          flex
                          h-7
                          w-7
                          items-center
                          justify-center
                          rounded-lg
                          border
                          border-white/10
                          bg-white/[0.05]
                        "
                      >
                        <Icon className="text-[11px] text-[#0289F9]" />
                      </span>

                      {item.label}
                    </div>
                  );
                })}
              </div>

              {/* =================================================
                  ACTIONS
              ================================================= */}

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <motion.a
                  href="/courses"
                  whileHover={
                    shouldReduceMotion
                      ? undefined
                      : {
                          y: -2,
                        }
                  }
                  whileTap={
                    shouldReduceMotion
                      ? undefined
                      : {
                          scale: 0.98,
                        }
                  }
                  className="
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-[#0C5FF5]
                    px-6
                    py-3.5
                    text-sm
                    font-semibold
                    text-white
                    shadow-[0_12px_28px_rgba(12,95,245,0.25)]
                    transition-colors
                    duration-200
                    hover:bg-[#0289F9]
                  "
                >
                  Explore programs
                  <FaArrowRight className="text-[10px]" />
                </motion.a>

                <motion.a
                  href="/login"
                  whileHover={
                    shouldReduceMotion
                      ? undefined
                      : {
                          y: -2,
                        }
                  }
                  className="
                    inline-flex
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-white/15
                    bg-white/[0.04]
                    px-6
                    py-3.5
                    text-sm
                    font-semibold
                    text-white
                    transition-all
                    duration-200
                    hover:border-white/25
                    hover:bg-white/[0.08]
                  "
                >
                  Sign in
                </motion.a>
              </div>
            </div>

            {/* =================================================
                RIGHT — SIMPLE CLOSING VISUAL
            ================================================= */}

            <div className="lg:flex lg:justify-end">
              <motion.div
                initial={
                  shouldReduceMotion
                    ? false
                    : {
                        opacity: 0,
                        x: 20,
                      }
                }
                whileInView={
                  shouldReduceMotion
                    ? undefined
                    : {
                        opacity: 1,
                        x: 0,
                      }
                }
                viewport={{
                  once: true,
                  amount: 0.25,
                }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.7,
                  delay: shouldReduceMotion ? 0 : 0.1,
                }}
                className="
                  relative
                  w-full
                  max-w-[330px]
                  lg:mb-1
                "
              >
                {/* Top label */}

                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-white/35">
                    Your next move
                  </span>

                  <span className="text-[9px] font-bold tracking-[0.16em] text-[#0289F9]">
                    01
                  </span>
                </div>

                {/* Main statement */}

                <div className="py-7">
                  <p
                    className="
                      text-2xl
                      font-semibold
                      leading-[1.15]
                      tracking-[-0.035em]
                      text-white
                      sm:text-3xl
                    "
                  >
                    Start with a skill.
                    <br />
                    <span className="text-white/40">
                      Leave with something
                    </span>
                    <br />
                    <span className="text-[#0289F9]">you can show.</span>
                  </p>
                </div>

                {/* Progress line */}

                <div className="border-t border-white/10 pt-5">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] uppercase tracking-[0.16em] text-white/30">
                      Learn
                    </span>

                    <span className="text-[9px] uppercase tracking-[0.16em] text-white/30">
                      Build
                    </span>

                    <span className="text-[9px] uppercase tracking-[0.16em] text-white/30">
                      Grow
                    </span>
                  </div>

                  <div className="mt-4 h-1 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      initial={{
                        width: 0,
                      }}
                      whileInView={{
                        width: "100%",
                      }}
                      viewport={{
                        once: true,
                      }}
                      transition={{
                        duration: shouldReduceMotion ? 0 : 1.1,
                        ease: "easeOut",
                      }}
                      className="
                        h-full
                        rounded-full
                        bg-gradient-to-r
                        from-[#0C5FF5]
                        via-[#0289F9]
                        to-[#3531E7]
                      "
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* =================================================
              BOTTOM BRAND LINE
          ================================================= */}

          <div
            className="
              relative
              z-10
              border-t
              border-white/[0.08]
              px-7
              py-4
              sm:px-10
              lg:px-14
              xl:px-16
            "
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-white/25">
                DataLattice
              </p>

              <p className="text-[10px] text-white/30">
                Learn · Build · Grow
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}