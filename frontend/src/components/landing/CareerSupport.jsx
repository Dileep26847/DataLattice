import React from "react";
import { motion } from "framer-motion";

import {
  FaFileAlt,
  FaUsers,
  FaClipboard,
  FaLayerGroup,
  FaChartLine,
} from "react-icons/fa";

// ============================================================
// CAREER SUPPORT
// ============================================================

const supportItems = [
  {
    title: "Resume Guidance",
    description:
      "Get expert feedback on your resume to highlight your skills and projects effectively.",
    icon: FaFileAlt,
    color: "#1769F5",
    iconBg: "#EEF5FF",
  },
  {
    title: "Mock Interviews",
    description:
      "Practice with realistic interview scenarios and receive actionable feedback.",
    icon: FaUsers,
    color: "#3531E7",
    iconBg: "#F0F0FF",
  },
  {
    title: "Interview Preparation",
    description:
      "Prepare for technical and behavioral interviews with structured guidance.",
    icon: FaClipboard,
    color: "#0289F9",
    iconBg: "#EAF8FF",
  },
  {
    title: "Portfolio Guidance",
    description:
      "Build a compelling portfolio that showcases your best work to potential employers.",
    icon: FaLayerGroup,
    color: "#F28C00",
    iconBg: "#FFF8E8",
  },
  {
    title: "Job-Search Support",
    description:
      "Get guidance on job search strategies, applications and professional networking.",
    icon: FaChartLine,
    color: "#0BA978",
    iconBg: "#ECFBF5",
  },
];

// ============================================================
// MAIN COMPONENT
// ============================================================

function CareerSupport() {
  return (
    <section
      id="career-support"
      className="
        relative
        overflow-hidden
        bg-[#F8FAFD]
        py-16
        sm:py-20
        lg:py-[76px]
      "
    >
      {/* ======================================================
          BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0">
        <div
          className="
            absolute
            left-1/2
            top-[42%]
            h-[520px]
            w-[720px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-[#1769F5]/[0.018]
            blur-3xl
          "
        />
      </div>

      {/* ======================================================
          CONTAINER
      ====================================================== */}

      <div
        className="
          relative
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
            y: 18,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1],
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          className="
            mx-auto
            max-w-3xl
            text-center
          "
        >
          {/* Badge */}

          <div
            className="
              inline-flex
              items-center
              rounded-full
              border
              border-[#BFD8FF]
              bg-[#F1F6FF]
              px-3.5
              py-1.5
            "
          >
            <span
              className="
                text-[9px]
                font-bold
                uppercase
                tracking-[0.08em]
                text-[#1769F5]
              "
            >
              Career Support
            </span>
          </div>

          {/* Heading */}

          <h2
            className="
              mt-5
              text-[32px]
              font-bold
              leading-[1.08]
              tracking-[-0.045em]
              text-[#081733]
              sm:text-[40px]
              lg:text-[44px]
            "
          >
            Your Career, Our Priority
          </h2>

          {/* Description */}

          <p
            className="
              mx-auto
              mt-4
              max-w-[620px]
              text-[13px]
              leading-6
              text-slate-500
              sm:text-[14px]
              sm:leading-7
            "
          >
            We provide structured career support to help you navigate your
            professional journey with confidence.
          </p>
        </motion.div>

        {/* ====================================================
            SUPPORT CARDS
        ==================================================== */}

        <div
          className="
            mx-auto
            mt-10
            grid
            max-w-[1050px]
            grid-cols-1
            gap-4
            sm:mt-12
            sm:grid-cols-2
            lg:grid-cols-6
            lg:gap-4
          "
        >
          {/* --------------------------------------------------
              FIRST THREE CARDS
          -------------------------------------------------- */}

          {supportItems.slice(0, 3).map((item, index) => (
            <SupportCard
              key={item.title}
              item={item}
              index={index}
              className="
                lg:col-span-2
              "
            />
          ))}

          {/* --------------------------------------------------
              SECOND ROW
          -------------------------------------------------- */}

          {supportItems.slice(3, 5).map((item, index) => (
            <SupportCard
              key={item.title}
              item={item}
              index={index + 3}
              className="
                lg:col-span-2
                lg:col-start-auto
              "
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// SUPPORT CARD
// ============================================================

function SupportCard({
  item,
  index,
  className = "",
}) {
  const Icon = item.icon;

  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 20,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      whileHover={{
        y: -4,
      }}
      className={`
        group
        relative
        min-h-[148px]
        overflow-hidden
        rounded-[18px]
        border
        border-slate-200/90
        bg-white
        shadow-[0_10px_28px_rgba(10,24,50,0.055)]
        transition-shadow
        duration-300
        hover:shadow-[0_16px_36px_rgba(10,24,50,0.09)]
        ${className}
      `}
    >
      {/* ====================================================
          TOP ACCENT
      ==================================================== */}

      <div
        className="
          absolute
          inset-x-0
          top-0
          h-[3px]
        "
        style={{
          backgroundColor: item.color,
        }}
      />

      {/* ====================================================
          CARD CONTENT
      ==================================================== */}

      <div className="px-5 pb-5 pt-6 sm:px-5.5">
        {/* Icon */}

        <div
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-[10px]
            transition-transform
            duration-300
            group-hover:scale-[1.04]
          "
          style={{
            backgroundColor: item.iconBg,
            color: item.color,
          }}
        >
          <Icon size={15} />
        </div>

        {/* Title */}

        <h3
          className="
            mt-4
            text-[13px]
            font-bold
            leading-5
            tracking-[-0.02em]
            text-[#0A1832]
            sm:text-[14px]
          "
        >
          {item.title}
        </h3>

        {/* Description */}

        <p
          className="
            mt-1.5
            max-w-[290px]
            text-[10px]
            leading-[1.65]
            text-slate-500
            sm:text-[10.5px]
          "
        >
          {item.description}
        </p>
      </div>
    </motion.article>
  );
}

export default CareerSupport;