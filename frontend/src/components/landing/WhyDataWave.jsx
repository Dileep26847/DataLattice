import { motion } from "framer-motion";

import {
  FaArrowRight,
  FaChartLine,
  FaCode,
  FaDatabase,
  FaLightbulb,
  FaProjectDiagram,
} from "react-icons/fa";

// ============================================================
// DATALATTICE VALUE SYSTEM
// ============================================================

const valueCards = [
  {
    number: "01",
    title: "Learn with direction",
    description:
      "Follow a focused learning path built around the skills and concepts that matter for your chosen data discipline.",
    icon: FaDatabase,
    tag: "FOUNDATION",
  },

  {
    number: "02",
    title: "Practice with purpose",
    description:
      "Move beyond passive lessons through exercises, practical work and project-oriented learning experiences.",
    icon: FaCode,
    tag: "PRACTICE",
  },

  {
    number: "03",
    title: "Build real capability",
    description:
      "Turn concepts into tangible projects that help connect technical knowledge with practical problem solving.",
    icon: FaProjectDiagram,
    tag: "PROJECTS",
  },

  {
    number: "04",
    title: "See your progress",
    description:
      "Make learning measurable with progress signals that help you understand where you are and what comes next.",
    icon: FaChartLine,
    tag: "PROGRESS",
  },
];

// ============================================================
// MAIN COMPONENT
// ============================================================

function WhyDataWave() {
  return (
    <section className="relative overflow-hidden bg-white pt-4 pb-12 sm:pt-6 sm:pb-14 lg:pt-8 lg:pb-16">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-7 lg:px-8">
        {/* ====================================================
            SECTION INTRO
        ==================================================== */}

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true, amount: 0.25 }}
          className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end"
        >
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0C5FF5]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#0289F9]" />
              Why DataLattice
            </div>

            <h2 className="mt-4 text-4xl font-semibold leading-[1.04] tracking-[-0.045em] text-[#0A1832] sm:text-5xl lg:text-[58px]">
              Learning should
              <span className="block bg-gradient-to-r from-[#0C5FF5] via-[#0289F9] to-[#3531E7] bg-clip-text text-transparent">
                move somewhere.
              </span>
            </h2>
          </div>

          <div className="max-w-xl lg:ml-auto">
            <p className="text-base leading-7 text-slate-500 sm:text-lg">
              DataLattice connects knowledge, practice, projects and
              measurable progress into one continuous learning experience.
            </p>

            <div className="mt-5 flex items-center gap-3 text-sm font-medium text-[#0A1832]">
              <span className="h-px w-10 bg-[#0C5FF5]" />
              From learning to capability
            </div>
          </div>
        </motion.div>

        {/* ====================================================
            FEATURED LEARNING EXPERIENCE
        ==================================================== */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08 }}
          viewport={{ once: true, amount: 0.15 }}
          className="mt-12 overflow-hidden rounded-[28px] bg-[#0A1832] shadow-[0_24px_70px_rgba(10,24,50,0.12)] sm:mt-14"
        >
          <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
            {/* ==================================================
                LEFT EDITORIAL PANEL
            ================================================== */}

            <div className="relative overflow-hidden p-7 sm:p-9 lg:p-11">
              {/* restrained background accent */}
              <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#0C5FF5]/10 blur-3xl" />

              <div className="relative">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                    The DataLattice method
                  </span>

                  <span className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-[#0289F9]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#0289F9]" />
                    Connected
                  </span>
                </div>

                <div className="mt-12">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-[#0289F9]">
                    <FaLightbulb size={18} />
                  </div>

                  <h3 className="mt-6 max-w-md text-3xl font-semibold leading-tight tracking-[-0.035em] text-white sm:text-4xl">
                    From knowing
                    <span className="block text-[#0289F9]">to doing.</span>
                  </h3>

                  <p className="mt-4 max-w-md text-sm leading-6 text-slate-300 sm:text-base sm:leading-7">
                    Every part of the learning experience is connected so that
                    knowledge can become practical capability.
                  </p>
                </div>

                <div className="mt-10 border-t border-white/10 pt-6">
                  <p className="text-xs font-medium leading-5 text-slate-400">
                    Learn the concept. Apply it. Build with it. Measure the
                    result.
                  </p>
                </div>
              </div>
            </div>

            {/* ==================================================
                RIGHT LEARNING PATH
            ================================================== */}

            <div className="bg-[#F7FAFF] p-6 sm:p-8 lg:p-11">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                    Learning path
                  </p>

                  <h4 className="mt-2 text-xl font-semibold tracking-[-0.025em] text-[#0A1832]">
                    Four stages. One direction.
                  </h4>
                </div>

                <span className="hidden text-xs font-medium text-slate-400 sm:block">
                  01 — 04
                </span>
              </div>

              <LearningPath />

              <div className="mt-8 flex items-center gap-3 border-t border-slate-200 pt-5">
                <div className="h-2 w-2 rounded-full bg-[#0C5FF5]" />

                <p className="text-xs leading-5 text-slate-500">
                  Progress compounds through every stage.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ====================================================
            FOUR VALUE POINTS
        ==================================================== */}

        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {valueCards.map((card, index) => (
            <ValueCard key={card.number} card={card} index={index} />
          ))}
        </div>

        {/* ====================================================
            BOTTOM STATEMENT
        ==================================================== */}

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-10 flex flex-col gap-4 border-t border-slate-200 pt-7 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <p className="text-sm font-semibold text-[#0A1832] sm:text-base">
              A learning system designed for capability.
            </p>

            <p className="mt-1 text-xs text-slate-400 sm:text-sm">
              Knowledge becomes more useful when it is connected to practice.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#0C5FF5]">
            Built around progress
            <FaArrowRight size={10} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================
// LEARNING PATH
// ============================================================

function LearningPath() {
  const stages = [
    {
      number: "01",
      title: "Learn",
      description: "Understand the fundamentals",
      icon: FaDatabase,
    },
    {
      number: "02",
      title: "Practice",
      description: "Apply what you know",
      icon: FaCode,
    },
    {
      number: "03",
      title: "Build",
      description: "Create practical work",
      icon: FaProjectDiagram,
    },
    {
      number: "04",
      title: "Measure",
      description: "Review and improve",
      icon: FaChartLine,
    },
  ];

  return (
    <div className="mt-8">
      {stages.map((stage, index) => {
        const Icon = stage.icon;

        return (
          <motion.div
            key={stage.number}
            initial={{ opacity: 0, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.4,
              delay: index * 0.08,
            }}
            viewport={{ once: true }}
            className="group relative flex gap-4"
          >
            {/* connector */}
            {index < stages.length - 1 && (
              <div className="absolute bottom-0 left-[19px] top-12 w-px bg-slate-200" />
            )}

            {/* icon */}
            <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-[#0C5FF5] transition-colors duration-300 group-hover:border-[#0C5FF5]/30 group-hover:bg-[#0C5FF5] group-hover:text-white">
              <Icon size={14} />
            </div>

            {/* content */}
            <div className="flex flex-1 items-start justify-between gap-4 border-b border-slate-200 pb-5 pt-0">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-semibold text-[#0289F9]">
                    {stage.number}
                  </span>

                  <h5 className="text-sm font-semibold text-[#0A1832]">
                    {stage.title}
                  </h5>
                </div>

                <p className="mt-1 text-xs leading-5 text-slate-400">
                  {stage.description}
                </p>
              </div>

              {index === stages.length - 1 && (
                <span className="mt-1 hidden text-[10px] font-semibold uppercase tracking-[0.12em] text-[#3531E7] sm:block">
                  Improve
                </span>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

// ============================================================
// VALUE CARD
// ============================================================

function ValueCard({ card, index }) {
  const Icon = card.icon;

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.45,
        delay: index * 0.06,
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      whileHover={{ y: -4 }}
      className="group relative rounded-[22px] border border-slate-200 bg-white p-5 transition-all duration-300 hover:border-[#0C5FF5]/20 hover:shadow-[0_18px_45px_rgba(10,24,50,0.08)] sm:p-6"
    >
      {/* top accent */}
      <div className="absolute left-5 right-5 top-0 h-px bg-gradient-to-r from-[#0C5FF5] via-[#0289F9] to-[#3531E7] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="flex items-start justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F1F6FF] text-[#0C5FF5] transition-all duration-300 group-hover:bg-[#0C5FF5] group-hover:text-white">
          <Icon size={15} />
        </div>

        <span className="text-[10px] font-medium tracking-[0.16em] text-slate-300">
          {card.number}
        </span>
      </div>

      <p className="mt-6 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#0289F9]">
        {card.tag}
      </p>

      <h3 className="mt-2 text-lg font-semibold tracking-[-0.025em] text-[#0A1832]">
        {card.title}
      </h3>

      <p className="mt-2.5 text-sm leading-6 text-slate-500">
        {card.description}
      </p>

      <div className="mt-6 flex items-center gap-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-[#0C5FF5]" />
        <span className="h-1.5 w-5 rounded-full bg-[#0289F9]" />
        <span className="h-1.5 w-2 rounded-full bg-[#3531E7]" />
      </div>
    </motion.article>
  );
}

export default WhyDataWave;