import { motion } from "framer-motion";

import {
  FaArrowRight,
  FaBriefcase,
  FaCode,
  FaDatabase,
  FaGraduationCap,
  FaProjectDiagram,
} from "react-icons/fa";

// ============================================================
// DATALATTICE LEARNING JOURNEY
// CHAIN SYSTEM
// ============================================================

const journeySteps = [
  {
    number: "01",
    title: "Choose your program",
    description:
      "Start with the data discipline that matches the direction you want to develop.",
    icon: FaGraduationCap,
    signal: "DIRECTION",
  },

  {
    number: "02",
    title: "Learn the foundations",
    description:
      "Build your understanding through structured lessons, concepts and guided learning.",
    icon: FaDatabase,
    signal: "FOUNDATION",
  },

  {
    number: "03",
    title: "Practice the skills",
    description:
      "Apply what you learn through exercises and practical problem-solving activities.",
    icon: FaCode,
    signal: "APPLICATION",
  },

  {
    number: "04",
    title: "Build projects",
    description:
      "Bring multiple skills together through project-oriented work and real-world scenarios.",
    icon: FaProjectDiagram,
    signal: "CAPABILITY",
  },

  {
    number: "05",
    title: "Develop your career",
    description:
      "Use your learning progress, projects and skills as a foundation for your next career step.",
    icon: FaBriefcase,
    signal: "NEXT STEP",
  },
];

// ============================================================
// MAIN COMPONENT
// ============================================================

function LearningJourney() {
  return (
    <section className="relative overflow-hidden bg-[#F7FAFF] py-12 sm:py-14 lg:py-16">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-7 lg:px-8">
        {/* ====================================================
            HEADER
        ==================================================== */}

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.25 }}
          className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#0C5FF5]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#0289F9]" />
              Learning Journey
            </div>

            <h2 className="mt-4 text-4xl font-semibold leading-[1.05] tracking-[-0.045em] text-[#0A1832] sm:text-5xl lg:text-[54px]">
              One step connects
              <span className="block bg-gradient-to-r from-[#0C5FF5] via-[#0289F9] to-[#3531E7] bg-clip-text text-transparent">
                to the next.
              </span>
            </h2>
          </div>

          <div className="max-w-xl lg:ml-auto">
            <p className="text-sm leading-6 text-slate-500 sm:text-base sm:leading-7">
              Move from choosing your direction to building practical
              capability through a connected learning experience.
            </p>
          </div>
        </motion.div>

        {/* ====================================================
            CHAIN EXPERIENCE
        ==================================================== */}

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.08 }}
          viewport={{ once: true, amount: 0.15 }}
          className="mt-10 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_20px_60px_rgba(10,24,50,0.07)] sm:mt-12"
        >
          {/* ==================================================
              CHAIN HEADER
          ================================================== */}

          <div className="flex flex-col gap-3 border-b border-slate-100 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                The learning path
              </p>

              <p className="mt-1 text-sm font-semibold text-[#0A1832]">
                Every stage strengthens the next.
              </p>
            </div>

            <div className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-400">
              <span className="h-1.5 w-1.5 rounded-full bg-[#0C5FF5]" />
              Connected journey
            </div>
          </div>

          {/* ==================================================
              DESKTOP CHAIN
          ================================================== */}

          <div className="hidden px-8 pb-10 pt-12 lg:block">
            <DesktopChain />
          </div>

          {/* ==================================================
              MOBILE CHAIN
          ================================================== */}

          <div className="px-5 pb-8 pt-8 lg:hidden">
            <MobileChain />
          </div>
        </motion.div>

        {/* ====================================================
            STAGE DETAILS
        ==================================================== */}

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {journeySteps.map((step, index) => (
            <JourneyDetail
              key={step.number}
              step={step}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// DESKTOP CHAIN
// ============================================================

function DesktopChain() {
  return (
    <div className="relative">
      {/* ======================================================
          CHAIN RAIL
      ====================================================== */}

      <div className="absolute left-[8%] right-[8%] top-[74px] h-[6px] rounded-full bg-slate-100" />

      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{
          duration: 1.1,
          ease: [0.22, 1, 0.36, 1],
        }}
        viewport={{ once: true }}
        className="absolute left-[8%] right-[8%] top-[74px] h-[3px] origin-left rounded-full bg-gradient-to-r from-[#0C5FF5] via-[#0289F9] to-[#3531E7]"
      />

      {/* ======================================================
          STAGES + ATTACHING LINKS
      ====================================================== */}

      <div className="relative grid grid-cols-5 items-center">
        {journeySteps.map((step, index) => (
          <div
            key={step.number}
            className="relative flex justify-center"
          >
            <ChainStage
              step={step}
              index={index}
            />

            {index < journeySteps.length - 1 && (
              <ChainConnector index={index} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// CHAIN STAGE
// ============================================================

function ChainStage({ step, index }) {
  const Icon = step.icon;

  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.75,
      }}
      whileInView={{
        opacity: 1,
        scale: 1,
      }}
      transition={{
        duration: 0.45,
        delay: 0.15 + index * 0.16,
        ease: [0.22, 1, 0.36, 1],
      }}
      viewport={{
        once: true,
      }}
      className="relative z-20"
    >
      {/* outer ring */}
      <motion.div
        initial={{
          scale: 0.7,
          opacity: 0,
        }}
        whileInView={{
          scale: 1,
          opacity: 1,
        }}
        transition={{
          duration: 0.45,
          delay: 0.2 + index * 0.16,
        }}
        viewport={{
          once: true,
        }}
        className="flex h-[116px] w-[116px] items-center justify-center rounded-full border border-slate-200 bg-white shadow-[0_12px_30px_rgba(10,24,50,0.08)]"
      >
        {/* accent ring */}
        <div className="absolute h-[94px] w-[94px] rounded-full border border-[#0C5FF5]/10" />

        {/* center */}
        <motion.div
          whileHover={{
            scale: 1.06,
          }}
          className="flex h-[66px] w-[66px] items-center justify-center rounded-full bg-gradient-to-br from-[#0C5FF5] via-[#0289F9] to-[#3531E7] text-white shadow-[0_8px_25px_rgba(12,95,245,0.25)]"
        >
          <Icon size={21} />
        </motion.div>

        {/* number */}
        <span className="absolute -top-2 right-2 flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 bg-white text-[9px] font-bold text-[#0A1832] shadow-sm">
          {step.number}
        </span>
      </motion.div>

      {/* small stage label */}
      <motion.div
        initial={{
          opacity: 0,
          y: 6,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.4,
          delay: 0.3 + index * 0.16,
        }}
        viewport={{
          once: true,
        }}
        className="mt-4 text-center"
      >
        <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#0289F9]">
          {step.signal}
        </p>

        <p className="mt-1 text-xs font-semibold text-[#0A1832]">
          {step.title}
        </p>
      </motion.div>
    </motion.div>
  );
}

// ============================================================
// CHAIN CONNECTOR
// ============================================================

function ChainConnector({ index }) {
  return (
    <div className="pointer-events-none absolute left-[50%] top-[74px] z-10 flex w-full translate-x-[56px] items-center justify-center">
      {/* ====================================================
          CHAIN LINKS
      ==================================================== */}

      <motion.div
        initial={{
          opacity: 0,
          scaleX: 0,
          rotate: 32,
        }}
        whileInView={{
          opacity: 1,
          scaleX: 1,
          rotate: 32,
        }}
        transition={{
          duration: 0.42,
          delay: 0.48 + index * 0.16,
          ease: [0.22, 1, 0.36, 1],
        }}
        viewport={{
          once: true,
        }}
        className="absolute h-[34px] w-[70px] rounded-full border-[5px] border-[#0C5FF5]"
      />

      <motion.div
        initial={{
          opacity: 0,
          scaleX: 0,
          rotate: -32,
        }}
        whileInView={{
          opacity: 1,
          scaleX: 1,
          rotate: -32,
        }}
        transition={{
          duration: 0.42,
          delay: 0.66 + index * 0.16,
          ease: [0.22, 1, 0.36, 1],
        }}
        viewport={{
          once: true,
        }}
        className="absolute h-[34px] w-[70px] rounded-full border-[5px] border-[#0289F9]"
      />

      {/* small central joint */}
      <motion.div
        initial={{
          scale: 0,
          opacity: 0,
        }}
        whileInView={{
          scale: 1,
          opacity: 1,
        }}
        transition={{
          duration: 0.25,
          delay: 0.88 + index * 0.16,
        }}
        viewport={{
          once: true,
        }}
        className="absolute h-3 w-3 rounded-full bg-[#3531E7] shadow-[0_0_12px_rgba(53,49,231,0.35)]"
      />
    </div>
  );
}

// ============================================================
// MOBILE CHAIN
// ============================================================

function MobileChain() {
  return (
    <div className="relative mx-auto max-w-md">
      {/* vertical rail */}
      <div className="absolute bottom-8 left-[44px] top-8 w-[5px] rounded-full bg-slate-100" />

      <motion.div
        initial={{
          scaleY: 0,
        }}
        whileInView={{
          scaleY: 1,
        }}
        transition={{
          duration: 1.5,
          ease: [0.22, 1, 0.36, 1],
        }}
        viewport={{
          once: true,
        }}
        className="absolute bottom-8 left-[45px] top-8 w-[3px] origin-top rounded-full bg-gradient-to-b from-[#0C5FF5] via-[#0289F9] to-[#3531E7]"
      />

      <div className="relative space-y-8">
        {journeySteps.map((step, index) => {
          const Icon = step.icon;

          return (
            <MobileChainStage
              key={step.number}
              step={step}
              index={index}
              Icon={Icon}
            />
          );
        })}
      </div>
    </div>
  );
}

// ============================================================
// MOBILE CHAIN STAGE
// ============================================================

function MobileChainStage({
  step,
  index,
  Icon,
}) {
  return (
    <div className="relative flex items-center gap-5">
      {/* chain node */}
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.7,
        }}
        whileInView={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 0.4,
          delay: 0.15 + index * 0.14,
        }}
        viewport={{
          once: true,
        }}
        className="relative z-20 flex h-[90px] w-[90px] shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white shadow-[0_10px_25px_rgba(10,24,50,0.08)]"
      >
        <div className="absolute inset-[8px] rounded-full border border-[#0C5FF5]/10" />

        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#0C5FF5] via-[#0289F9] to-[#3531E7] text-white">
          <Icon size={17} />
        </div>

        <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full border border-slate-200 bg-white text-[8px] font-bold text-[#0A1832] shadow-sm">
          {step.number}
        </span>
      </motion.div>

      {/* content */}
      <motion.div
        initial={{
          opacity: 0,
          x: 10,
        }}
        whileInView={{
          opacity: 1,
          x: 0,
        }}
        transition={{
          duration: 0.4,
          delay: 0.2 + index * 0.14,
        }}
        viewport={{
          once: true,
        }}
        className="flex-1"
      >
        <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#0289F9]">
          {step.signal}
        </p>

        <h4 className="mt-1 text-sm font-semibold text-[#0A1832]">
          {step.title}
        </h4>

        <p className="mt-1.5 text-xs leading-5 text-slate-500">
          {step.description}
        </p>
      </motion.div>
    </div>
  );
}

// ============================================================
// STAGE DETAIL CARD
// ============================================================

function JourneyDetail({ step, index }) {
  const Icon = step.icon;

  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 12,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.4,
        delay: index * 0.05,
      }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      className="group border-t border-slate-200 pt-4"
    >
      <div className="flex items-start gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-[#0C5FF5] shadow-sm ring-1 ring-slate-200 transition-colors duration-300 group-hover:bg-[#0C5FF5] group-hover:text-white">
          <Icon size={12} />
        </div>

        <div>
          <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#0289F9]">
            {step.number} · {step.signal}
          </p>

          <h4 className="mt-1 text-sm font-semibold tracking-[-0.02em] text-[#0A1832]">
            {step.title}
          </h4>

          <p className="mt-1.5 text-xs leading-5 text-slate-500">
            {step.description}
          </p>
        </div>
      </div>
    </motion.article>
  );
}

export default LearningJourney;