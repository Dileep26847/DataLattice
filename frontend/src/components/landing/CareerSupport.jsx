import React from "react";
import { motion } from "framer-motion";

import {
  FaArrowRight,
  FaBriefcase,
  FaCheck,
  FaChartLine,
  FaFileAlt,
  FaLayerGroup,
  FaUsers,
} from "react-icons/fa";

// ============================================================
// CAREER SUPPORT
// CAREER LAUNCHPAD EXPERIENCE
// ============================================================

const supportItems = [
  {
    title: "Resume",
    subtitle: "Make your profile count",
    description:
      "Shape your experience, projects and technical skills into a resume that communicates your value clearly.",
    icon: FaFileAlt,
    color: "#0C5FF5",
    position: "resume",
  },
  {
    title: "Interviews",
    subtitle: "Practice with confidence",
    description:
      "Simulate technical and behavioral interviews, identify gaps and improve with structured feedback.",
    icon: FaUsers,
    color: "#3531E7",
    position: "interview",
  },
  {
    title: "Portfolio",
    subtitle: "Show what you can build",
    description:
      "Turn your strongest projects into a portfolio that demonstrates practical capability.",
    icon: FaLayerGroup,
    color: "#0289F9",
    position: "portfolio",
  },
  {
    title: "Career Strategy",
    subtitle: "Know your next move",
    description:
      "Get guidance around roles, applications, networking and the direction of your career.",
    icon: FaChartLine,
    color: "#0BA978",
    position: "strategy",
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
        border-t
        border-slate-200
        bg-[#F7FAFF]
        py-16
        sm:py-20
        lg:py-24
      "
    >
      {/* ======================================================
          BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0">
        {/* soft glow */}

        <div
          className="
            absolute
            left-1/2
            top-[48%]
            h-[620px]
            w-[620px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-[#0C5FF5]/[0.035]
            blur-3xl
          "
        />

        {/* decorative dots */}

        <div className="absolute left-[8%] top-[20%] h-1.5 w-1.5 rounded-full bg-[#0C5FF5]/30" />
        <div className="absolute right-[12%] top-[28%] h-1.5 w-1.5 rounded-full bg-[#3531E7]/30" />
        <div className="absolute bottom-[18%] left-[16%] h-1.5 w-1.5 rounded-full bg-[#0289F9]/30" />
        <div className="absolute bottom-[22%] right-[17%] h-1.5 w-1.5 rounded-full bg-[#0BA978]/30" />

        {/* subtle grid */}

        <div
          className="
            absolute
            inset-0
            opacity-[0.018]
            [background-image:linear-gradient(#0A1832_1px,transparent_1px),linear-gradient(90deg,#0A1832_1px,transparent_1px)]
            [background-size:48px_48px]
          "
        />
      </div>

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
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          className="mx-auto max-w-3xl text-center"
        >
          <div
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-[#0C5FF5]/15
              bg-white
              px-3.5
              py-1.5
              text-[9px]
              font-semibold
              uppercase
              tracking-[0.17em]
              text-[#0C5FF5]
              shadow-[0_4px_15px_rgba(12,95,245,0.05)]
            "
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#0289F9] opacity-50" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#0289F9]" />
            </span>

            Career Support
          </div>

          <h2
            className="
              mt-5
              text-3xl
              font-semibold
              leading-[1.04]
              tracking-[-0.05em]
              text-[#0A1832]
              sm:text-4xl
              lg:text-[52px]
            "
          >
            Don't just learn.
            <span
              className="
                block
                bg-gradient-to-r
                from-[#0C5FF5]
                via-[#0289F9]
                to-[#3531E7]
                bg-clip-text
                text-transparent
              "
            >
              Launch your career.
            </span>
          </h2>

          <p
            className="
              mx-auto
              mt-5
              max-w-2xl
              text-sm
              leading-6
              text-slate-500
              sm:text-base
              sm:leading-7
            "
          >
            From your first resume to your next opportunity, get practical
            support at the moments that matter.
          </p>
        </motion.div>

        {/* ====================================================
            CAREER LAUNCHPAD
        ==================================================== */}

        <div className="relative mx-auto mt-14 max-w-6xl lg:mt-20">
          {/* ==================================================
              DESKTOP CAREER PATH
          ================================================== */}

          <div className="hidden lg:block">
            <CareerPathDesktop />
          </div>

          {/* ==================================================
              MOBILE CAREER PATH
          ================================================== */}

          <div className="lg:hidden">
            <CareerPathMobile />
          </div>
        </div>

        {/* ====================================================
            BOTTOM STRIP
        ==================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 12,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
            delay: 0.25,
          }}
          viewport={{
            once: true,
          }}
          className="
            mx-auto
            mt-12
            flex
            max-w-3xl
            flex-col
            items-center
            justify-between
            gap-4
            rounded-2xl
            border
            border-slate-200
            bg-white
            px-5
            py-4
            shadow-[0_8px_30px_rgba(10,24,50,0.04)]
            sm:flex-row
            sm:px-6
          "
        >
          <div className="flex items-center gap-3">
            <div
              className="
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-lg
                bg-[#ECF9F4]
                text-[#0BA978]
              "
            >
              <FaCheck size={11} />
            </div>

            <div>
              <p className="text-xs font-semibold text-[#0A1832]">
                Built around your next step
              </p>

              <p className="mt-0.5 text-[10px] text-slate-400">
                Practical guidance, not generic advice.
              </p>
            </div>
          </div>

          <div
            className="
              flex
              items-center
              gap-2
              text-[9px]
              font-semibold
              uppercase
              tracking-[0.14em]
              text-[#0C5FF5]
            "
          >
            Career Launchpad

            <FaArrowRight size={8} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================
// DESKTOP PATH
// ============================================================

function CareerPathDesktop() {
  return (
    <div className="relative min-h-[590px]">
      {/* ======================================================
          MAIN PATH
      ====================================================== */}

      <svg
        className="
          pointer-events-none
          absolute
          left-0
          top-0
          h-full
          w-full
          overflow-visible
        "
        viewBox="0 0 1100 590"
        fill="none"
        preserveAspectRatio="none"
      >
        {/* background path */}

        <motion.path
          d="
            M 120 135
            C 250 35,
              390 35,
              480 190
            C 530 275,
              550 315,
              620 330
            C 720 355,
              805 300,
              865 385
            C 920 460,
              1000 445,
              1025 470
          "
          stroke="#E7EEF8"
          strokeWidth="8"
          strokeLinecap="round"
        />

        {/* animated path */}

        <motion.path
          initial={{
            pathLength: 0,
            opacity: 0,
          }}
          whileInView={{
            pathLength: 1,
            opacity: 1,
          }}
          transition={{
            duration: 1.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          viewport={{
            once: true,
          }}
          d="
            M 120 135
            C 250 35,
              390 35,
              480 190
            C 530 275,
              550 315,
              620 330
            C 720 355,
              805 300,
              865 385
            C 920 460,
              1000 445,
              1025 470
          "
          stroke="url(#careerGradient)"
          strokeWidth="4"
          strokeLinecap="round"
        />

        <defs>
          <linearGradient
            id="careerGradient"
            x1="100"
            y1="100"
            x2="1000"
            y2="500"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#0C5FF5" />
            <stop offset="0.5" stopColor="#0289F9" />
            <stop offset="1" stopColor="#3531E7" />
          </linearGradient>
        </defs>
      </svg>

      {/* ======================================================
          CENTER HUB
      ====================================================== */}

      <CareerHub />

      {/* ======================================================
          RESUME
      ====================================================== */}

      <DesktopSupportCard
        item={supportItems[0]}
        className="left-0 top-6"
        delay={0.15}
      />

      {/* ======================================================
          INTERVIEW
      ====================================================== */}

      <DesktopSupportCard
        item={supportItems[1]}
        className="right-0 top-6"
        delay={0.28}
      />

      {/* ======================================================
          PORTFOLIO
      ====================================================== */}

      <DesktopSupportCard
        item={supportItems[2]}
        className="bottom-2 left-[8%]"
        delay={0.4}
      />

      {/* ======================================================
          STRATEGY
      ====================================================== */}

      <DesktopSupportCard
        item={supportItems[3]}
        className="bottom-2 right-[8%]"
        delay={0.52}
      />
    </div>
  );
}

// ============================================================
// DESKTOP CARD
// ============================================================

function DesktopSupportCard({
  item,
  className,
  delay,
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
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      viewport={{
        once: true,
      }}
      whileHover={{
        y: -7,
        scale: 1.015,
      }}
      className={`
        group
        absolute
        z-10
        w-[285px]
        overflow-hidden
        rounded-[24px]
        border
        border-slate-200
        bg-white
        p-5
        shadow-[0_15px_45px_rgba(10,24,50,0.07)]
        transition-shadow
        duration-300
        hover:shadow-[0_24px_55px_rgba(10,24,50,0.12)]
        ${className}
      `}
    >
      {/* top accent */}

      <div
        className="absolute inset-x-0 top-0 h-[3px]"
        style={{
          backgroundColor: item.color,
        }}
      />

      <div className="flex items-start justify-between">
        <div
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-xl
            bg-[#F1F6FF]
          "
          style={{
            color: item.color,
          }}
        >
          <Icon size={16} />
        </div>
      </div>

      <p
        className="
          mt-5
          text-[9px]
          font-semibold
          uppercase
          tracking-[0.15em]
        "
        style={{
          color: item.color,
        }}
      >
        {item.subtitle}
      </p>

      <h3
        className="
          mt-1.5
          text-lg
          font-semibold
          tracking-[-0.03em]
          text-[#0A1832]
        "
      >
        {item.title}
      </h3>

      <p className="mt-2 text-[11px] leading-5 text-slate-500">
        {item.description}
      </p>

      <div
        className="
          mt-4
          flex
          items-center
          gap-1.5
          text-[8px]
          font-semibold
          uppercase
          tracking-[0.14em]
          text-slate-400
          transition-colors
          group-hover:text-[#0C5FF5]
        "
      >
        Explore support

        <FaArrowRight
          size={7}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      </div>
    </motion.article>
  );
}

// ============================================================
// CAREER HUB
// ============================================================

function CareerHub() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.85,
      }}
      whileInView={{
        opacity: 1,
        scale: 1,
      }}
      transition={{
        duration: 0.65,
        delay: 0.25,
        ease: [0.22, 1, 0.36, 1],
      }}
      viewport={{
        once: true,
      }}
      className="
        absolute
        left-1/2
        top-[47%]
        z-30
        -translate-x-1/2
        -translate-y-1/2
      "
    >
      {/* outer glow */}

      <motion.div
        animate={{
          scale: [1, 1.12, 1],
          opacity: [0.35, 0.12, 0.35],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          inset-[-28px]
          rounded-full
          bg-[#0C5FF5]/10
          blur-xl
        "
      />

      {/* orbit */}

      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "linear",
        }}
        className="
          absolute
          inset-[-15px]
          rounded-full
          border
          border-dashed
          border-[#0C5FF5]/20
        "
      >
        <span
          className="
            absolute
            -right-1
            top-1/2
            h-2.5
            w-2.5
            -translate-y-1/2
            rounded-full
            bg-[#0289F9]
            shadow-[0_0_12px_rgba(2,137,249,0.5)]
          "
        />
      </motion.div>

      {/* hub */}

      <div
        className="
          relative
          flex
          h-48
          w-48
          flex-col
          items-center
          justify-center
          rounded-full
          border
          border-white
          bg-[#0A1832]
          text-white
          shadow-[0_25px_65px_rgba(10,24,50,0.25)]
        "
      >
        {/* inner ring */}

        <div
          className="
            absolute
            inset-3
            rounded-full
            border
            border-white/10
          "
        />

        <div
          className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-2xl
            bg-gradient-to-br
            from-[#0C5FF5]
            to-[#3531E7]
            shadow-[0_8px_25px_rgba(12,95,245,0.3)]
          "
        >
          <FaBriefcase size={19} />
        </div>

        <p
          className="
            mt-4
            text-[8px]
            font-semibold
            uppercase
            tracking-[0.22em]
            text-white/45
          "
        >
          Career Launchpad
        </p>

        <h3
          className="
            mt-1
            text-lg
            font-semibold
            tracking-[-0.03em]
          "
        >
          Your Next Move
        </h3>

        <div className="mt-3 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#38D9A9]" />

          <span className="text-[8px] font-medium uppercase tracking-[0.14em] text-white/45">
            Support activated
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// ============================================================
// MOBILE PATH
// ============================================================

function CareerPathMobile() {
  return (
    <div className="relative">
      {/* vertical connection */}

      <div
        className="
          absolute
          bottom-12
          left-[24px]
          top-12
          w-px
          bg-gradient-to-b
          from-[#0C5FF5]
          via-[#0289F9]
          to-[#3531E7]
        "
      />

      <div className="space-y-4">
        {supportItems.map((item, index) => (
          <MobileSupportCard
            key={item.title}
            item={item}
            index={index}
          />
        ))}
      </div>

      {/* mobile hub */}

      <motion.div
        initial={{
          opacity: 0,
          scale: 0.9,
        }}
        whileInView={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 0.5,
        }}
        viewport={{
          once: true,
        }}
        className="
          relative
          mt-6
          overflow-hidden
          rounded-[24px]
          bg-[#0A1832]
          p-6
          text-white
          shadow-[0_18px_45px_rgba(10,24,50,0.18)]
        "
      >
        <div
          className="
            absolute
            -right-12
            -top-12
            h-32
            w-32
            rounded-full
            bg-[#0C5FF5]/20
            blur-2xl
          "
        />

        <div className="relative flex items-center gap-4">
          <div
            className="
              flex
              h-12
              w-12
              shrink-0
              items-center
              justify-center
              rounded-2xl
              bg-gradient-to-br
              from-[#0C5FF5]
              to-[#3531E7]
            "
          >
            <FaBriefcase size={17} />
          </div>

          <div>
            <p className="text-[8px] font-semibold uppercase tracking-[0.18em] text-white/45">
              Career Launchpad
            </p>

            <h3 className="mt-1 text-base font-semibold">
              Your Next Move
            </h3>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ============================================================
// MOBILE SUPPORT CARD
// ============================================================

function MobileSupportCard({
  item,
  index,
}) {
  const Icon = item.icon;

  return (
    <motion.article
      initial={{
        opacity: 0,
        x: -15,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
      }}
      transition={{
        duration: 0.4,
        delay: index * 0.07,
      }}
      viewport={{
        once: true,
      }}
      className="
        relative
        ml-11
        overflow-hidden
        rounded-[20px]
        border
        border-slate-200
        bg-white
        p-5
        shadow-[0_10px_30px_rgba(10,24,50,0.05)]
      "
    >
      {/* accent */}

      <div
        className="absolute inset-x-0 top-0 h-[3px]"
        style={{
          backgroundColor: item.color,
        }}
      />

      <div className="flex items-start gap-4">
        <div
          className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-[#F1F6FF]
          "
          style={{
            color: item.color,
          }}
        >
          <Icon size={15} />
        </div>

        <div>
          <p
            className="
              text-[8px]
              font-semibold
              uppercase
              tracking-[0.14em]
            "
            style={{
              color: item.color,
            }}
          >
            {item.subtitle}
          </p>

          <h3 className="mt-1 text-sm font-semibold text-[#0A1832]">
            {item.title}
          </h3>

          <p className="mt-1.5 text-[11px] leading-5 text-slate-500">
            {item.description}
          </p>
        </div>
      </div>
    </motion.article>
  );
}

export default CareerSupport;