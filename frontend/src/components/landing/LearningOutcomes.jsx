import React from "react";
import { motion } from "framer-motion";

import {
  FaFolderOpen,
  FaMicrochip,
  FaCommentAlt,
  FaCompass,
  FaChartLine,
} from "react-icons/fa";

// ============================================================
// LEARNING OUTCOMES DATA
// ============================================================

const outcomes = [
  {
    title: "Portfolio Development",
    description:
      "Build a professional portfolio showcasing real projects and technical skills.",
    icon: FaFolderOpen,
    accent: "#0C5FF5",
    iconBg: "#EEF5FF",
  },
  {
    title: "Real Project Experience",
    description:
      "Work on industry-relevant projects that demonstrate practical ability.",
    icon: FaMicrochip,
    accent: "#0289F9",
    iconBg: "#EAF8FF",
  },
  {
    title: "Interview Preparation",
    description:
      "Practice with mock interviews, technical assessments and feedback sessions.",
    icon: FaCommentAlt,
    accent: "#3531E7",
    iconBg: "#F0F0FF",
  },
  {
    title: "Career Guidance",
    description:
      "Get structured guidance on career paths, skill gaps and professional growth.",
    icon: FaCompass,
    accent: "#F28C00",
    iconBg: "#FFF8E8",
  },
  {
    title: "Skill Development",
    description:
      "Develop in-demand technical and professional skills through hands-on learning.",
    icon: FaChartLine,
    accent: "#0BA978",
    iconBg: "#ECFBF5",
  },
];

// ============================================================
// MAIN COMPONENT
// ============================================================

function LearningOutcomes() {
  return (
    <section
      id="learning-outcomes"
      className="
        relative
        overflow-hidden
        border-t
        border-slate-100
        bg-white
        py-12
        sm:py-14
        lg:py-16
      "
    >
      <div
        className="
          mx-auto
          w-full
          max-w-7xl
          px-5
          sm:px-7
          lg:px-8
        "
      >
        {/* ====================================================
            HEADER
        ==================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 14,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          className="text-center"
        >
          {/* Badge */}

          <div
            className="
              inline-flex
              items-center
              rounded-full
              border
              border-[#0C5FF5]/15
              bg-[#F1F6FF]
              px-3
              py-1.5
              text-[9px]
              font-semibold
              uppercase
              tracking-[0.12em]
              text-[#0C5FF5]
            "
          >
            Learning Outcomes
          </div>

          {/* Heading */}

          <h2
            className="
              mt-4
              text-3xl
              font-semibold
              leading-[1.08]
              tracking-[-0.045em]
              text-[#0A1832]
              sm:text-4xl
              lg:text-[42px]
            "
          >
            Real Skills. Real Growth.
          </h2>

          {/* Description */}

          <p
            className="
              mx-auto
              mt-3
              max-w-2xl
              text-sm
              leading-6
              text-slate-500
              sm:text-base
              sm:leading-7
            "
          >
            Our programs are designed to build practical skills that matter
            in the real world.
          </p>
        </motion.div>

        {/* ====================================================
            OUTCOME CARDS
        ==================================================== */}

        <div
          className="
            mt-8
            grid
            gap-3
            sm:grid-cols-2
            lg:grid-cols-5
          "
        >
          {outcomes.map((outcome, index) => (
            <OutcomeCard
              key={outcome.title}
              outcome={outcome}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// OUTCOME CARD
// ============================================================

function OutcomeCard({ outcome, index }) {
  const Icon = outcome.icon;

  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 18,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.45,
        delay: index * 0.07,
        ease: [0.22, 1, 0.36, 1],
      }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      whileHover={{
        y: -4,
      }}
      className="
        group
        relative
        overflow-hidden
        rounded-[18px]
        border
        border-slate-200
        bg-white
        shadow-[0_8px_24px_rgba(10,24,50,0.045)]
        transition-all
        duration-300
        hover:border-slate-300
        hover:shadow-[0_16px_35px_rgba(10,24,50,0.08)]
      "
    >
      {/* ====================================================
          TOP ACCENT
      ==================================================== */}

      <div
        className="h-[3px] w-full"
        style={{
          backgroundColor: outcome.accent,
        }}
      />

      {/* ====================================================
          CONTENT
      ==================================================== */}

      <div className="p-5">
        {/* Icon */}

        <div
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            transition-transform
            duration-300
            group-hover:scale-105
          "
          style={{
            backgroundColor: outcome.iconBg,
            color: outcome.accent,
          }}
        >
          <Icon size={15} />
        </div>

        {/* Title */}

        <h3
          className="
            mt-4
            min-h-[40px]
            text-sm
            font-semibold
            leading-5
            tracking-[-0.02em]
            text-[#0A1832]
          "
        >
          {outcome.title}
        </h3>

        {/* Description */}

        <p
          className="
            mt-2
            text-[11px]
            leading-[1.65]
            text-slate-500
          "
        >
          {outcome.description}
        </p>
      </div>
    </motion.article>
  );
}

export default LearningOutcomes;