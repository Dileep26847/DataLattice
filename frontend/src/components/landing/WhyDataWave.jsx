import React from "react";
import { motion } from "framer-motion";

import {
  FaVideo,
  FaBriefcase,
  FaUsers,
  FaAward,
} from "react-icons/fa";

// ============================================================
// WHY DATALATTICE
// ============================================================

const features = [
  {
    title: "Live & Recorded",
    subtitle: "Classes",
    description:
      "Flexible learning, anytime anywhere. Access material whenever you need.",
    icon: FaVideo,
    iconColor: "#0C8BFF",
    glowColor: "rgba(12,139,255,0.18)",
    lineColor: "#0C8BFF",
  },
  {
    title: "Real-World",
    subtitle: "Projects",
    description:
      "Build a strong portfolio that stands out to recruiters and tech leaders.",
    icon: FaBriefcase,
    iconColor: "#00C9D8",
    glowColor: "rgba(0,201,216,0.18)",
    lineColor: "#00C9D8",
  },
  {
    title: "Expert Mentors",
    subtitle: "",
    description:
      "Learn directly from industry professionals working at top tech firms.",
    icon: FaUsers,
    iconColor: "#9B5CFF",
    glowColor: "rgba(155,92,255,0.18)",
    lineColor: "#9B5CFF",
  },
  {
    title: "Career Support",
    subtitle: "",
    description:
      "Get end-to-end guidance, extensive mock interviews and robust placement assistance.",
    icon: FaAward,
    iconColor: "#FFB800",
    glowColor: "rgba(255,184,0,0.18)",
    lineColor: "#FFB800",
  },
];

// ============================================================
// MAIN COMPONENT
// ============================================================

function WhyDataWave() {
  return (
    <section
      className="
        relative
        overflow-hidden
        bg-[#081A36]
        px-5
        py-20
        sm:px-7
        sm:py-24
        lg:px-8
        lg:py-[88px]
      "
    >
      {/* ======================================================
          SUBTLE BACKGROUND GLOW
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-0
          h-[420px]
          w-[800px]
          -translate-x-1/2
          rounded-full
          bg-[#0C5FF5]/[0.055]
          blur-[110px]
        "
      />

      {/* ======================================================
          CONTENT CONTAINER
      ====================================================== */}

      <div className="relative mx-auto w-full max-w-[1000px]">
        {/* ====================================================
            SECTION HEADER
        ==================================================== */}

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.25 }}
          className="text-center"
        >
          {/* Badge */}

          <div className="inline-flex items-center rounded-full border border-[#0C5FF5]/40 bg-[#0C5FF5]/10 px-3 py-1.5">
            <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#1687FF] sm:text-[10px]">
              Why DataLattice
            </span>
          </div>

          {/* Heading */}

          <h2
            className="
              mx-auto
              mt-5
              max-w-[850px]
              text-3xl
              font-bold
              leading-[1.08]
              tracking-[-0.035em]
              text-white
              sm:text-4xl
              md:text-[40px]
              lg:text-[42px]
            "
          >
            More Than a Course. A Complete Learning
            <span className="block">Experience.</span>
          </h2>

          {/* Description */}

          <p
            className="
              mx-auto
              mt-5
              max-w-[610px]
              text-sm
              leading-6
              text-slate-400
              sm:text-[15px]
              sm:leading-7
            "
          >
            Everything you need to go from zero to job-ready - structured,
            supported, and results-driven.
          </p>
        </motion.div>

        {/* ====================================================
            FEATURE CARDS
        ==================================================== */}

        <div
          className="
            mt-12
            grid
            gap-4
            sm:mt-14
            sm:grid-cols-2
            lg:grid-cols-4
          "
        >
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              feature={feature}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// FEATURE CARD
// ============================================================

function FeatureCard({ feature, index }) {
  const Icon = feature.icon;

  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 22,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.45,
        delay: index * 0.07,
        ease: "easeOut",
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      whileHover={{
        y: -5,
      }}
      className="
        group
        relative
        min-h-[250px]
        overflow-hidden
        rounded-[20px]
        border
        border-white/[0.08]
        bg-gradient-to-b
        from-[#12294D]
        to-[#102545]
        p-7
        shadow-[0_18px_45px_rgba(0,0,0,0.14)]
        transition-all
        duration-300
        hover:border-white/[0.14]
        hover:shadow-[0_22px_55px_rgba(0,0,0,0.22)]
        sm:min-h-[270px]
        sm:p-8
      "
    >
      {/* ====================================================
          CARD GLOW
      ==================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -right-16
          -top-16
          h-40
          w-40
          rounded-full
          opacity-0
          blur-3xl
          transition-opacity
          duration-500
          group-hover:opacity-100
        "
        style={{
          backgroundColor: feature.glowColor,
        }}
      />

      {/* ====================================================
          ICON
      ==================================================== */}

      <div
        className="
          relative
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-[16px]
          border
          transition-all
          duration-300
        "
        style={{
          color: feature.iconColor,
          borderColor: `${feature.iconColor}45`,
          backgroundColor: `${feature.iconColor}10`,
          boxShadow: `0 8px 25px ${feature.glowColor}`,
        }}
      >
        <Icon size={21} />

        {/* Small inner glow */}

        <div
          className="pointer-events-none absolute inset-0 rounded-[16px] opacity-50"
          style={{
            boxShadow: `inset 0 0 18px ${feature.glowColor}`,
          }}
        />
      </div>

      {/* ====================================================
          TEXT
      ==================================================== */}

      <div className="relative mt-5">
        <h3 className="text-[17px] font-bold leading-[1.15] text-white">
          {feature.title}

          {feature.subtitle && (
            <span className="block">{feature.subtitle}</span>
          )}
        </h3>

        <p className="mt-2.5 max-w-[205px] text-[12px] leading-[1.7] text-slate-400 sm:text-[13px]">
          {feature.description}
        </p>
      </div>

      {/* ====================================================
          BOTTOM ACCENT
      ==================================================== */}

      <div className="absolute bottom-7 left-7 sm:left-8">
        <div className="flex items-center gap-0">
          <span
            className="h-[2px] w-7 rounded-full"
            style={{
              backgroundColor: feature.lineColor,
            }}
          />

          <span
            className="h-[2px] w-7 rounded-full opacity-20"
            style={{
              backgroundColor: feature.lineColor,
            }}
          />
        </div>
      </div>
    </motion.article>
  );
}

export default WhyDataWave;