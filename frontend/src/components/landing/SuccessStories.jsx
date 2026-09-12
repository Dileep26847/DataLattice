import { motion, useReducedMotion } from "framer-motion";
import {
  FaArrowRight,
  FaChartLine,
  FaCheck,
  FaDatabase,
  FaLaptopCode,
  FaProjectDiagram,
  FaRocket,
} from "react-icons/fa";

const learningSignals = [
  {
    number: "01",
    label: "Learn",
    title: "Build the foundation",
    description:
      "Develop the technical concepts and practical understanding needed to work confidently with data.",
    icon: FaDatabase,
  },
  {
    number: "02",
    label: "Practice",
    title: "Turn knowledge into skill",
    description:
      "Reinforce learning through structured exercises, assessments, and hands-on practice.",
    icon: FaLaptopCode,
  },
  {
    number: "03",
    label: "Build",
    title: "Create real project work",
    description:
      "Apply your learning by building projects that demonstrate how you think, solve, and deliver.",
    icon: FaProjectDiagram,
  },
  {
    number: "04",
    label: "Grow",
    title: "Develop career readiness",
    description:
      "Turn your growing technical capability into a stronger portfolio and clearer career direction.",
    icon: FaRocket,
  },
];

const progressBars = [
  { label: "Foundations", value: 82 },
  { label: "Practice", value: 68 },
  { label: "Projects", value: 54 },
  { label: "Career readiness", value: 41 },
];

function AnimatedChart({ shouldReduceMotion }) {
  return (
    <div className="relative h-full min-h-[360px] overflow-hidden rounded-[2rem] bg-slate-950 p-6 text-white sm:p-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.22),transparent_32%),radial-gradient(circle_at_80%_80%,rgba(6,182,212,0.16),transparent_30%)]" />

      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      <div className="relative z-10 flex h-full flex-col">
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">
              Learning signal
            </p>

            <h3 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
              Capability compounds.
            </h3>

            <p className="mt-3 max-w-md text-sm leading-6 text-slate-400">
              The goal is not to collect course completions. It is to move from
              understanding to practical capability.
            </p>
          </div>

          <div className="hidden rounded-2xl border border-white/10 bg-white/5 p-3 sm:block">
            <FaChartLine className="text-xl text-cyan-300" />
          </div>
        </div>

        <div className="relative mt-8 flex-1">
          <div className="absolute inset-x-0 top-1/2 h-px bg-white/10" />

          <div className="absolute inset-x-0 bottom-5 top-4">
            <svg
              viewBox="0 0 640 250"
              className="h-full w-full overflow-visible"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <defs>
                <linearGradient
                  id="datalattice-progress-gradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#818cf8" />
                  <stop offset="50%" stopColor="#38bdf8" />
                  <stop offset="100%" stopColor="#22d3ee" />
                </linearGradient>

                <linearGradient
                  id="datalattice-area-gradient"
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop
                    offset="0%"
                    stopColor="#38bdf8"
                    stopOpacity="0.22"
                  />
                  <stop
                    offset="100%"
                    stopColor="#38bdf8"
                    stopOpacity="0"
                  />
                </linearGradient>
              </defs>

              <path
                d="M 0 220 C 70 214, 85 190, 145 198 C 205 206, 218 156, 275 166 C 330 176, 344 120, 395 132 C 445 144, 468 92, 510 103 C 555 115, 570 55, 640 30 L 640 250 L 0 250 Z"
                fill="url(#datalattice-area-gradient)"
              />

              <motion.path
                d="M 0 220 C 70 214, 85 190, 145 198 C 205 206, 218 156, 275 166 C 330 176, 344 120, 395 132 C 445 144, 468 92, 510 103 C 555 115, 570 55, 640 30"
                fill="none"
                stroke="url(#datalattice-progress-gradient)"
                strokeWidth="4"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, amount: 0.45 }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 1.8,
                  ease: "easeInOut",
                }}
              />
            </svg>

            {!shouldReduceMotion && (
              <motion.div
                className="absolute left-0 top-[72%] h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_20px_rgba(103,232,249,0.9)]"
                animate={{
                  left: ["0%", "99%"],
                  top: ["72%", "12%"],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            )}

            <div className="absolute bottom-0 left-0 right-0 flex justify-between text-[10px] font-medium uppercase tracking-[0.16em] text-slate-600">
              <span>Start</span>
              <span>Practice</span>
              <span>Build</span>
              <span>Grow</span>
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <p className="text-xs text-slate-500">Focus</p>
            <p className="mt-1 font-semibold">Skills</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <p className="text-xs text-slate-500">Method</p>
            <p className="mt-1 font-semibold">Practice</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <p className="text-xs text-slate-500">Outcome</p>
            <p className="mt-1 font-semibold">Capability</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProgressPanel({ shouldReduceMotion }) {
  return (
    <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6 sm:p-8">
      <div className="flex items-start justify-between gap-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-600">
            The DataLattice approach
          </p>

          <h3 className="mt-3 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
            Progress should be visible.
          </h3>
        </div>

        <div className="hidden h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm sm:flex">
          <FaChartLine className="text-indigo-600" />
        </div>
      </div>

      <p className="mt-4 text-sm leading-6 text-slate-600">
        Learning becomes more meaningful when students can see how knowledge,
        practice, projects, and career preparation connect.
      </p>

      <div className="mt-8 space-y-5">
        {progressBars.map((item, index) => (
          <div key={item.label}>
            <div className="mb-2 flex items-center justify-between gap-4">
              <span className="text-sm font-semibold text-slate-800">
                {item.label}
              </span>

              <span className="text-xs font-bold text-slate-400">
                {String(item.value).padStart(2, "0")}
              </span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-slate-200">
              <motion.div
                className="h-full rounded-full bg-slate-950"
                initial={{ width: 0 }}
                whileInView={{ width: `${item.value}%` }}
                viewport={{ once: true, amount: 0.7 }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.9,
                  delay: shouldReduceMotion ? 0 : index * 0.08,
                  ease: "easeOut",
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center gap-3 border-t border-slate-200 pt-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-100">
          <FaCheck className="text-sm text-indigo-600" />
        </div>

        <p className="text-sm font-medium leading-5 text-slate-600">
          Learn something. Apply it. Measure the progress. Build again.
        </p>
      </div>
    </div>
  );
}

export default function SuccessStories() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="success-stories"
      className="relative overflow-hidden bg-white py-24 sm:py-28"
    >
      <div className="absolute left-0 top-24 h-72 w-72 rounded-full bg-indigo-100/60 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-cyan-100/50 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.65 }}
          className="max-w-3xl"
        >
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-indigo-600" />

            <p className="text-xs font-bold uppercase tracking-[0.24em] text-indigo-600">
              Learning outcomes
            </p>
          </div>

          <h2 className="mt-5 text-4xl font-bold tracking-[-0.04em] text-slate-950 sm:text-5xl lg:text-6xl">
            Turn learning into{" "}
            <span className="text-indigo-600">something you can show.</span>
          </h2>

          <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            DataLattice is designed around a simple progression: understand the
            fundamentals, practice the skill, build meaningful projects, and
            develop the confidence to take the next step.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: -24 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.7,
              delay: shouldReduceMotion ? 0 : 0.05,
            }}
          >
            <AnimatedChart shouldReduceMotion={shouldReduceMotion} />
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: 24 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.7,
              delay: shouldReduceMotion ? 0 : 0.12,
            }}
          >
            <ProgressPanel shouldReduceMotion={shouldReduceMotion} />
          </motion.div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {learningSignals.map((signal, index) => {
            const Icon = signal.icon;

            return (
              <motion.article
                key={signal.number}
                initial={
                  shouldReduceMotion
                    ? false
                    : { opacity: 0, y: 18 }
                }
                whileInView={
                  shouldReduceMotion
                    ? undefined
                    : { opacity: 1, y: 0 }
                }
                viewport={{ once: true, amount: 0.35 }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.55,
                  delay: shouldReduceMotion ? 0 : index * 0.07,
                }}
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : { y: -4 }
                }
                className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-xl"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold tracking-[0.18em] text-slate-300">
                    {signal.number}
                  </span>

                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 transition-colors duration-300 group-hover:bg-indigo-50">
                    <Icon className="text-sm text-slate-700 transition-colors duration-300 group-hover:text-indigo-600" />
                  </div>
                </div>

                <p className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">
                  {signal.label}
                </p>

                <h3 className="mt-2 text-lg font-bold tracking-tight text-slate-950">
                  {signal.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                  {signal.description}
                </p>
              </motion.article>
            );
          })}
        </div>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.6 }}
          className="mt-10 flex flex-col gap-5 rounded-[2rem] border border-slate-200 bg-slate-950 p-7 text-white sm:flex-row sm:items-center sm:justify-between sm:p-8"
        >
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-300">
              Build proof, not promises
            </p>

            <h3 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
              Your projects become part of the story.
            </h3>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              A strong learning journey should leave you with practical work,
              clearer skills, and evidence of what you can actually do.
            </p>
          </div>

          <motion.a
            href="/courses"
            whileHover={shouldReduceMotion ? undefined : { x: 4 }}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-bold text-slate-950 transition-colors hover:bg-slate-100"
          >
            Explore programs
            <FaArrowRight className="text-xs" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}