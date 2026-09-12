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
      className="relative overflow-hidden bg-white px-6 py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={
            shouldReduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 24,
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
            amount: 0.3,
          }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.7,
          }}
          className="relative overflow-hidden rounded-[2.5rem] bg-slate-950 px-7 py-12 text-white sm:px-12 sm:py-16 lg:px-16"
        >
          <div className="absolute inset-0">
            <div
              className="absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
                backgroundSize: "42px 42px",
              }}
            />

            <div className="absolute -left-20 -top-24 h-72 w-72 rounded-full bg-indigo-500/25 blur-3xl" />

            <div className="absolute -bottom-32 right-0 h-96 w-96 rounded-full bg-cyan-400/15 blur-3xl" />

            {!shouldReduceMotion && (
              <>
                <motion.div
                  className="absolute left-[58%] top-[18%] h-2 w-2 rounded-full bg-indigo-300"
                  animate={{
                    y: [0, 22, 0],
                    opacity: [0.35, 1, 0.35],
                  }}
                  transition={{
                    duration: 3.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                <motion.div
                  className="absolute right-[18%] top-[54%] h-1.5 w-1.5 rounded-full bg-cyan-300"
                  animate={{
                    x: [0, -18, 0],
                    opacity: [0.25, 1, 0.25],
                  }}
                  transition={{
                    duration: 2.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                />

                <motion.div
                  className="absolute bottom-[18%] right-[38%] h-2 w-2 rounded-full bg-sky-300"
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.25, 1, 0.25],
                  }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                />
              </>
            )}
          </div>

          <div className="relative z-10 grid gap-12 lg:grid-cols-[1fr_0.72fr] lg:items-center">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-cyan-300" />

                <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-300">
                  Start your next step
                </p>
              </div>

              <h2 className="mt-5 text-4xl font-bold tracking-[-0.04em] sm:text-5xl lg:text-6xl">
                Learn data.
                <br />
                <span className="text-cyan-300">Build capability.</span>
              </h2>

              <p className="mt-6 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
                Choose a focused learning path, strengthen your technical
                skills, practice what you learn, and build projects that show
                what you can do.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {programSignals.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.label}
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2.5 text-sm font-medium text-slate-300"
                    >
                      <Icon className="text-xs text-cyan-300" />
                      {item.label}
                    </div>
                  );
                })}
              </div>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href="/courses"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3.5 text-sm font-bold text-slate-950 transition-transform duration-300 hover:-translate-y-0.5 hover:bg-slate-100"
                >
                  Explore programs
                  <FaArrowRight className="text-xs" />
                </a>

                <a
                  href="/login"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/[0.04] px-6 py-3.5 text-sm font-bold text-white transition-colors duration-300 hover:bg-white/[0.09]"
                >
                  Sign in
                </a>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="relative mx-auto aspect-square max-w-[360px]">
                <div className="absolute inset-[15%] rounded-full border border-white/10" />

                <div className="absolute inset-[28%] rounded-full border border-cyan-300/20" />

                <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-[2rem] border border-cyan-300/20 bg-cyan-300/10 shadow-[0_0_60px_rgba(34,211,238,0.12)]">
                  <div className="flex h-full items-center justify-center">
                    <FaChartLine className="text-3xl text-cyan-300" />
                  </div>
                </div>

                <div className="absolute left-[7%] top-[28%] flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06]">
                  <FaDatabase className="text-lg text-indigo-300" />
                </div>

                <div className="absolute bottom-[16%] left-[21%] flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06]">
                  <FaProjectDiagram className="text-lg text-sky-300" />
                </div>

                <div className="absolute right-[8%] top-[21%] flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06]">
                  <FaChartLine className="text-lg text-cyan-300" />
                </div>

                <svg
                  viewBox="0 0 360 360"
                  className="absolute inset-0 h-full w-full"
                  aria-hidden="true"
                >
                  <path
                    d="M 70 125 C 125 100, 145 145, 180 180"
                    fill="none"
                    stroke="rgba(255,255,255,0.12)"
                    strokeWidth="1"
                  />

                  <path
                    d="M 180 180 C 210 210, 245 235, 275 280"
                    fill="none"
                    stroke="rgba(255,255,255,0.12)"
                    strokeWidth="1"
                  />

                  <path
                    d="M 180 180 C 210 145, 245 110, 290 100"
                    fill="none"
                    stroke="rgba(255,255,255,0.12)"
                    strokeWidth="1"
                  />

                  {!shouldReduceMotion && (
                    <motion.circle
                      r="3"
                      fill="#67e8f9"
                      animate={{
                        cx: [70, 180, 290],
                        cy: [125, 180, 100],
                      }}
                      transition={{
                        duration: 3.2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  )}
                </svg>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}