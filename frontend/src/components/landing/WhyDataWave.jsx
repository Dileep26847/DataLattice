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
// Figma section: why-section
// ============================================================

const features = [
  {
    title: "Live & Recorded Classes",
    description:
      "Flexible learning, anytime anywhere. Access material whenever you need.",
    icon: FaVideo,
    iconColor: "#0C8BFF",
    glowColor: "rgba(12, 139, 255, 0.18)",
  },
  {
    title: "Real-World Projects",
    description:
      "Build a strong portfolio that stands out to recruiters and tech leaders.",
    icon: FaBriefcase,
    iconColor: "#00C9D8",
    glowColor: "rgba(0, 201, 216, 0.18)",
  },
  {
    title: "Expert Mentors",
    description:
      "Learn directly from industry professionals working at top tech firms.",
    icon: FaUsers,
    iconColor: "#9B5CFF",
    glowColor: "rgba(155, 92, 255, 0.18)",
  },
  {
    title: "Career Support",
    description:
      "Get end-to-end guidance, extensive mock interviews and robust placement assistance.",
    icon: FaAward,
    iconColor: "#FFB800",
    glowColor: "rgba(255, 184, 0, 0.18)",
  },
];

// ============================================================
// MAIN COMPONENT
// ============================================================

function WhyData() {
  return (
    <section
      id="why-datalattice"
      className="
        relative
        w-full
        overflow-hidden
        bg-[#081A36]
      "
    >
      {/* ======================================================
          BACKGROUND ORB — TOP LEFT
          Figma: orb-tl
          ====================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -left-[120px]
          -top-[80px]
          h-[480px]
          w-[480px]
          rounded-full
          bg-[#0C5FF5]/[0.07]
          blur-[110px]
        "
      />

      {/* ======================================================
          BACKGROUND ORB — BOTTOM RIGHT
          Figma: orb-br
          ====================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-[120px]
          top-[300px]
          h-[560px]
          w-[560px]
          rounded-full
          bg-[#1267F5]/[0.06]
          blur-[120px]
        "
      />

      {/* ======================================================
          MAIN CONTENT
          Figma:
          x = 120
          width = 1200
          ====================================================== */}

      <div
        className="
          relative
          mx-auto
          w-full
          max-w-[1200px]
          px-5
          py-[72px]
          sm:px-8
          sm:py-[90px]
          lg:px-0
          lg:py-[120px]
        "
      >
        {/* ====================================================
            SECTION HEADER
            Figma:
            section-header
            width: 1200
            height: 238
            ==================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 18,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.55,
            ease: "easeOut",
          }}
          viewport={{
            once: true,
            amount: 0.25,
          }}
          className="
            flex
            flex-col
            items-center
            text-center
          "
        >
          {/* ==================================================
              EYEBROW
              Figma:
              eyebrow-badge
              width: 135px
              height: 30px
              ================================================== */}

          <div
            className="
              inline-flex
              h-[30px]
              items-center
              rounded-full
              border
              border-[#0C8BFF]/35
              bg-[#0C8BFF]/[0.10]
              px-4
            "
          >
            <span
              className="
                text-[10px]
                font-bold
                uppercase
                tracking-[0.08em]
                text-[#1687FF]
              "
            >
              Why DataLattice
            </span>
          </div>

          {/* ==================================================
              HEADING
              Figma:
              y = 50
              height = 110
              ================================================== */}

          <h2
            className="
              mt-5
              max-w-[1200px]
              text-center
              text-[34px]
              font-bold
              leading-[1.16]
              tracking-[-0.045em]
              text-white
              sm:text-[38px]
              md:text-[40px]
              lg:text-[42px]
            "
          >
            More Than a Course. A Complete Learning
            <span className="block">
              Experience.
            </span>
          </h2>

          {/* ==================================================
              DESCRIPTION
              Figma:
              width = 580
              y = 180
              ================================================== */}

          <p
            className="
              mt-5
              max-w-[580px]
              text-center
              text-[14px]
              leading-7
              text-[#7F8EA8]
              sm:text-[15px]
            "
          >
            Everything you need to go from zero to job-ready -
            structured, supported, and results-driven.
          </p>
        </motion.div>

        {/* ====================================================
            FEATURE GRID
            Figma:
            why-grid
            x = 120
            y = 430
            width = 1200
            ==================================================== */}

        <div
          className="
            mt-[72px]
            grid
            grid-cols-1
            gap-6
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
// Figma:
// why-card
// width = 282px
// height = 343px
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
        y: -4,
      }}
      className="
        group
        relative
        min-h-[343px]
        overflow-hidden
        rounded-[20px]
        border
        border-white/[0.07]
        bg-[#102545]
        shadow-[0_18px_45px_rgba(0,0,0,0.14)]
        transition-all
        duration-300
        hover:border-white/[0.13]
        hover:shadow-[0_24px_55px_rgba(0,0,0,0.22)]
      "
    >
      {/* ======================================================
          CARD HOVER GLOW
          ====================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-20
          -top-20
          h-[190px]
          w-[190px]
          rounded-full
          opacity-0
          blur-[65px]
          transition-opacity
          duration-500
          group-hover:opacity-100
        "
        style={{
          backgroundColor: feature.glowColor,
        }}
      />

      {/* ======================================================
          ICON OUTER
          Figma:
          x = 40
          y = 40
          width = 72
          height = 72
          ====================================================== */}

      <div
        className="
          absolute
          left-10
          top-10
          flex
          h-[72px]
          w-[72px]
          items-center
          justify-center
          rounded-[18px]
          border
          transition-all
          duration-300
        "
        style={{
          color: feature.iconColor,
          borderColor: `${feature.iconColor}42`,
          backgroundColor: `${feature.iconColor}10`,
          boxShadow: `0 10px 30px ${feature.glowColor}`,
        }}
      >
        <Icon size={32} />

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-0
            rounded-[18px]
            opacity-50
          "
          style={{
            boxShadow: `inset 0 0 20px ${feature.glowColor}`,
          }}
        />
      </div>

      {/* ======================================================
          CONTENT
          Figma:
          x = 40
          y = 136
          width = 202
          ====================================================== */}

      <div
        className="
          absolute
          left-10
          top-[136px]
          w-[202px]
        "
      >
        <h3
          className="
            max-w-[202px]
            text-[17px]
            font-bold
            leading-[1.45]
            tracking-[-0.025em]
            text-white
          "
        >
          {feature.title}
        </h3>

        <p
          className="
            mt-[10px]
            max-w-[202px]
            text-[12px]
            leading-[1.65]
            text-[#8291A9]
            sm:text-[13px]
          "
        >
          {feature.description}
        </p>
      </div>

      {/* ======================================================
          ACCENT LINE
          Figma:
          x = 40
          y = 300
          width = 48
          height = 3
          ====================================================== */}

      <div
        className="
          absolute
          bottom-[40px]
          left-10
          h-[3px]
          w-12
          rounded-full
        "
        style={{
          backgroundColor: feature.iconColor,
          boxShadow: `0 0 14px ${feature.glowColor}`,
        }}
      />
    </motion.article>
  );
}

export default WhyData;