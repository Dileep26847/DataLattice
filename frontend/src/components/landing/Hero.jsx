import React from "react";
import { motion } from "framer-motion";
import {
  FaArrowRight,
  FaChartLine,
  FaDatabase,
  FaCode,
  FaBrain,
  FaPlay,
  FaCheck,
  FaRobot,
  FaLayerGroup,
  FaBolt,
  FaCircleCheck,
} from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

import { requireHomeDemoAccess } from "./HomeAccessGate";
import HeroSignupCard from "./HeroSignupCard";

/* =========================================================
   DATALATTICE HERO
   ========================================================= */

const COLORS = {
  navy: "#0A1832",
  blue: "#0C5FF5",
  cyan: "#0289F9",
  violet: "#3531E7",
  white: "#FFFFFF",
};

/* =========================================================
   BACKGROUND
   ========================================================= */

function HeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Soft blue glow */}
      <div
        className="
          absolute
          -left-40
          -top-40
          h-[420px]
          w-[420px]
          rounded-full
          opacity-30
          blur-3xl
        "
        style={{
          background:
            "radial-gradient(circle, rgba(12,95,245,0.18) 0%, rgba(12,95,245,0) 70%)",
        }}
      />

      {/* Cyan glow */}
      <div
        className="
          absolute
          right-[22%]
          top-[12%]
          h-[300px]
          w-[300px]
          rounded-full
          opacity-25
          blur-3xl
        "
        style={{
          background:
            "radial-gradient(circle, rgba(2,137,249,0.16) 0%, rgba(2,137,249,0) 70%)",
        }}
      />

      {/* Violet glow */}
      <div
        className="
          absolute
          bottom-[-180px]
          right-[-100px]
          h-[420px]
          w-[420px]
          rounded-full
          opacity-20
          blur-3xl
        "
        style={{
          background:
            "radial-gradient(circle, rgba(53,49,231,0.18) 0%, rgba(53,49,231,0) 70%)",
        }}
      />

      {/* Technical grid */}
      <div
        className="
          absolute
          inset-0
          opacity-[0.035]
        "
        style={{
          backgroundImage: `
            linear-gradient(rgba(10,24,50,0.8) 1px, transparent 1px),
            linear-gradient(90deg, rgba(10,24,50,0.8) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      {/* Fine grid */}
      <div
        className="
          absolute
          inset-0
          opacity-[0.018]
        "
        style={{
          backgroundImage: `
            linear-gradient(rgba(12,95,245,0.7) 1px, transparent 1px),
            linear-gradient(90deg, rgba(12,95,245,0.7) 1px, transparent 1px)
          `,
          backgroundSize: "12px 12px",
        }}
      />
    </div>
  );
}

/* =========================================================
   FLOATING BADGE
   ========================================================= */

function FloatingBadge({
  icon,
  title,
  subtitle,
  className = "",
  delay = 0,
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 12,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.55,
        delay,
      }}
      className={`
        absolute
        z-20
        hidden
        items-center
        gap-2.5
        rounded-2xl
        border
        border-white/70
        bg-white/90
        px-3
        py-2.5
        shadow-[0_14px_35px_rgba(10,24,50,0.10)]
        backdrop-blur-md
        sm:flex
        ${className}
      `}
    >
      <div
        className="
          flex
          h-8
          w-8
          shrink-0
          items-center
          justify-center
          rounded-xl
          text-white
        "
        style={{
          background:
            "linear-gradient(135deg, #0C5FF5 0%, #0289F9 55%, #3531E7 100%)",
        }}
      >
        {icon}
      </div>

      <div>
        <p className="text-[10px] font-bold text-[#0A1832]">
          {title}
        </p>

        <p className="mt-0.5 text-[9px] font-medium text-[#64748B]">
          {subtitle}
        </p>
      </div>
    </motion.div>
  );
}

/* =========================================================
   HERO PRODUCT VISUAL
   ========================================================= */

function LearningPlatformVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[540px]">
      {/* Ambient glow */}
      <div
        className="
          absolute
          left-1/2
          top-1/2
          h-[390px]
          w-[390px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          opacity-20
          blur-3xl
        "
        style={{
          background:
            "linear-gradient(135deg, #0C5FF5 0%, #0289F9 50%, #3531E7 100%)",
        }}
      />

      {/* Floating badges */}
      <FloatingBadge
        icon={<FaCode size={12} />}
        title="Python"
        subtitle="Core skill"
        className="-left-2 top-[16%]"
        delay={0.2}
      />

      <FloatingBadge
        icon={<FaDatabase size={12} />}
        title="SQL"
        subtitle="Data foundations"
        className="-right-2 top-[27%]"
        delay={0.35}
      />

      <FloatingBadge
        icon={<FaBrain size={12} />}
        title="AI & ML"
        subtitle="Technology track"
        className="-left-5 bottom-[20%]"
        delay={0.5}
      />

      <FloatingBadge
        icon={<FaLayerGroup size={12} />}
        title="Projects"
        subtitle="Build real work"
        className="-right-4 bottom-[12%]"
        delay={0.65}
      />

      {/* Main product frame */}
      <motion.div
        initial={{
          opacity: 0,
          y: 25,
          scale: 0.96,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        transition={{
          duration: 0.75,
          ease: "easeOut",
        }}
        className="
          relative
          z-10
          overflow-hidden
          rounded-[30px]
          border
          border-white/80
          bg-white
          shadow-[0_35px_90px_rgba(10,24,50,0.15)]
        "
      >
        {/* Top browser bar */}
        <div
          className="
            flex
            h-11
            items-center
            justify-between
            border-b
            border-[#EAF0F7]
            bg-[#FBFDFF]
            px-4
          "
        >
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#E2E8F0]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#E2E8F0]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#E2E8F0]" />
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden text-[8px] font-bold text-[#94A3B8] sm:block">
              DATALATTICE
            </span>

            <div
              className="
                flex
                h-6
                w-6
                items-center
                justify-center
                rounded-lg
                text-white
              "
              style={{
                background:
                  "linear-gradient(135deg, #0C5FF5, #0289F9, #3531E7)",
              }}
            >
              <FaBolt size={9} />
            </div>
          </div>
        </div>

        {/* Dashboard body */}
        <div className="p-4 sm:p-5">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#64748B]">
                My Learning
              </p>

              <h3 className="mt-1 text-base font-black tracking-[-0.025em] text-[#0A1832] sm:text-lg">
                Build your data skills.
              </h3>
            </div>

            <div
              className="
                hidden
                rounded-full
                px-3
                py-1.5
                text-[9px]
                font-bold
                text-white
                sm:block
              "
              style={{
                background:
                  "linear-gradient(90deg, #0C5FF5, #0289F9, #3531E7)",
              }}
            >
              Learning
            </div>
          </div>

          {/* Progress card */}
          <div
            className="
              mt-4
              rounded-[20px]
              p-4
              text-white
            "
            style={{
              background:
                "linear-gradient(135deg, #0A1832 0%, #102D60 55%, #3531E7 100%)",
            }}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[9px] font-medium text-white/60">
                  Current progress
                </p>

                <p className="mt-1 text-xl font-black tracking-[-0.03em]">
                  82%
                </p>
              </div>

              <div
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-xl
                  bg-white/10
                  text-[#7DD3FC]
                "
              >
                <FaChartLine size={14} />
              </div>
            </div>

            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "82%" }}
                transition={{
                  duration: 1.2,
                  delay: 0.5,
                  ease: "easeOut",
                }}
                className="h-full rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, #0C5FF5, #0289F9, #7C73FF)",
                }}
              />
            </div>

            <div className="mt-2 flex justify-between">
              <span className="text-[8px] text-white/50">
                18 lessons completed
              </span>

              <span className="text-[8px] font-bold text-white/70">
                Keep going
              </span>
            </div>
          </div>

          {/* Skills */}
          <div className="mt-4 grid grid-cols-2 gap-3">
            {/* Python */}
            <SkillCard
              icon={<FaCode size={12} />}
              title="Python"
              value="92%"
              progress="92%"
            />

            {/* SQL */}
            <SkillCard
              icon={<FaDatabase size={12} />}
              title="SQL"
              value="78%"
              progress="78%"
            />
          </div>

          {/* Chart + next lesson */}
          <div className="mt-4 grid grid-cols-[1.1fr_0.9fr] gap-3">
            {/* Chart */}
            <div className="rounded-[18px] border border-[#EAF0F7] bg-[#FBFDFF] p-3">
              <div className="flex items-center justify-between">
                <p className="text-[9px] font-bold text-[#0A1832]">
                  Learning activity
                </p>

                <span className="text-[8px] font-semibold text-[#0289F9]">
                  This week
                </span>
              </div>

              <div className="relative mt-3 h-[70px] overflow-hidden">
                {/* Horizontal guides */}
                <div className="absolute left-0 right-0 top-[15%] border-t border-[#EEF3F8]" />
                <div className="absolute left-0 right-0 top-[50%] border-t border-[#EEF3F8]" />
                <div className="absolute left-0 right-0 top-[85%] border-t border-[#EEF3F8]" />

                <svg
                  viewBox="0 0 240 70"
                  className="absolute inset-0 h-full w-full"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient
                      id="heroLineGradient"
                      x1="0"
                      y1="0"
                      x2="1"
                      y2="0"
                    >
                      <stop
                        offset="0%"
                        stopColor="#0C5FF5"
                      />
                      <stop
                        offset="50%"
                        stopColor="#0289F9"
                      />
                      <stop
                        offset="100%"
                        stopColor="#3531E7"
                      />
                    </linearGradient>

                    <linearGradient
                      id="heroAreaGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor="#0C5FF5"
                        stopOpacity="0.16"
                      />
                      <stop
                        offset="100%"
                        stopColor="#0C5FF5"
                        stopOpacity="0"
                      />
                    </linearGradient>
                  </defs>

                  <path
                    d="
                      M0 58
                      C18 54, 25 48, 42 51
                      C58 54, 65 34, 82 38
                      C99 42, 105 24, 123 29
                      C141 34, 150 18, 166 24
                      C184 31, 192 12, 208 18
                      C222 23, 231 12, 240 8
                      L240 70
                      L0 70 Z
                    "
                    fill="url(#heroAreaGradient)"
                  />

                  <path
                    d="
                      M0 58
                      C18 54, 25 48, 42 51
                      C58 54, 65 34, 82 38
                      C99 42, 105 24, 123 29
                      C141 34, 150 18, 166 24
                      C184 31, 192 12, 208 18
                      C222 23, 231 12, 240 8
                    "
                    fill="none"
                    stroke="url(#heroLineGradient)"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />

                  <circle
                    cx="208"
                    cy="18"
                    r="4"
                    fill="#FFFFFF"
                    stroke="#3531E7"
                    strokeWidth="3"
                  />
                </svg>
              </div>
            </div>

            {/* Next lesson */}
            <div className="rounded-[18px] bg-[#F5F9FF] p-3">
              <p className="text-[8px] font-bold uppercase tracking-[0.12em] text-[#64748B]">
                Next lesson
              </p>

              <div className="mt-2 flex h-7 w-7 items-center justify-center rounded-lg bg-[#E7F1FF] text-[#0C5FF5]">
                <FaBrain size={11} />
              </div>

              <p className="mt-2 text-[9px] font-black leading-3.5 text-[#0A1832]">
                Machine Learning
                <br />
                Foundations
              </p>

              <div className="mt-2 flex items-center gap-1">
                <FaPlay
                  size={7}
                  className="text-[#0289F9]"
                />

                <span className="text-[7px] font-semibold text-[#64748B]">
                  24 min
                </span>
              </div>
            </div>
          </div>

          {/* Bottom learning features */}
          <div className="mt-4 grid grid-cols-3 gap-2">
            <MiniFeature
              icon={<FaCircleCheck size={9} />}
              text="Mentorship"
            />

            <MiniFeature
              icon={<FaLayerGroup size={9} />}
              text="Projects"
            />

            <MiniFeature
              icon={<FaRobot size={9} />}
              text="AI Skills"
            />
          </div>
        </div>
      </motion.div>

      {/* Floating gradient orb */}
      <motion.div
        animate={{
          y: [0, -10, 0],
          rotate: [0, 4, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          -bottom-5
          left-[18%]
          z-0
          h-12
          w-12
          rounded-full
          opacity-70
          blur-xl
        "
        style={{
          background:
            "linear-gradient(135deg, #0C5FF5, #3531E7)",
        }}
      />

      <motion.div
        animate={{
          y: [0, 9, 0],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
        className="
          absolute
          -right-1
          top-[8%]
          z-0
          h-10
          w-10
          rounded-full
          opacity-60
          blur-xl
        "
        style={{
          background: "#0289F9",
        }}
      />
    </div>
  );
}

/* =========================================================
   SKILL CARD
   ========================================================= */

function SkillCard({
  icon,
  title,
  value,
  progress,
}) {
  return (
    <div
      className="
        rounded-[18px]
        border
        border-[#EAF0F7]
        bg-white
        p-3
      "
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className="
              flex
              h-7
              w-7
              items-center
              justify-center
              rounded-lg
              bg-[#EAF2FF]
              text-[#0C5FF5]
            "
          >
            {icon}
          </div>

          <span className="text-[9px] font-bold text-[#0A1832]">
            {title}
          </span>
        </div>

        <span className="text-[8px] font-black text-[#0C5FF5]">
          {value}
        </span>
      </div>

      <div className="mt-2 h-1 overflow-hidden rounded-full bg-[#EEF3F8]">
        <div
          className="h-full rounded-full"
          style={{
            width: progress,
            background:
              "linear-gradient(90deg, #0C5FF5, #0289F9, #3531E7)",
          }}
        />
      </div>
    </div>
  );
}

/* =========================================================
   MINI FEATURE
   ========================================================= */

function MiniFeature({ icon, text }) {
  return (
    <div
      className="
        flex
        items-center
        justify-center
        gap-1.5
        rounded-xl
        border
        border-[#EAF0F7]
        bg-white
        px-2
        py-2
      "
    >
      <span className="text-[#0C5FF5]">
        {icon}
      </span>

      <span className="text-[7px] font-bold text-[#64748B] sm:text-[8px]">
        {text}
      </span>
    </div>
  );
}

/* =========================================================
   HERO
   ========================================================= */

function Hero() {
  const navigate = useNavigate();

  const handleExplorePrograms =
    requireHomeDemoAccess(() => {
      navigate("/courses");
    });

  const handleWatchDemo =
    requireHomeDemoAccess(() => {
      navigate("/courses");
    });

  return (
    <section
      className="
        relative
        min-h-[calc(100vh-74px)]
        overflow-hidden
        bg-white
        pt-[74px]
      "
    >
      <HeroBackground />

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-[1500px]
          px-5
          pb-10
          pt-8
          sm:px-8
          sm:pt-10
          lg:px-10
          lg:pb-12
          lg:pt-12
          xl:px-12
        "
      >
        {/* =================================================
            MAIN THREE COLUMN HERO
            ================================================= */}

        <div
          className="
            grid
            items-center
            gap-10
            lg:grid-cols-[0.92fr_1.18fr_0.88fr]
            lg:gap-7
            xl:grid-cols-[0.92fr_1.2fr_0.88fr]
            xl:gap-10
          "
        >
          {/* =================================================
              LEFT — HERO CONTENT
              ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              x: -24,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.7,
              ease: "easeOut",
            }}
            className="relative z-20 max-w-[590px]"
          >
            {/* Eyebrow */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#DCE9FF] bg-[#F5F9FF] px-3.5 py-2">
              <span
                className="
                  flex
                  h-5
                  w-5
                  items-center
                  justify-center
                  rounded-full
                  text-white
                "
                style={{
                  background:
                    "linear-gradient(135deg, #0C5FF5, #0289F9, #3531E7)",
                }}
              >
                <FaBolt size={8} />
              </span>

              <span className="text-[10px] font-bold tracking-[0.04em] text-[#0C5FF5] sm:text-[11px]">
                DATA EDUCATION, REIMAGINED
              </span>
            </div>

            {/* Heading */}
            <h1
              className="
                max-w-[620px]
                text-[42px]
                font-black
                leading-[0.98]
                tracking-[-0.055em]
                text-[#0A1832]
                sm:text-[53px]
                lg:text-[48px]
                xl:text-[58px]
              "
            >
              Learn data.
              <br />

              <span
                className="
                  bg-clip-text
                  text-transparent
                "
                style={{
                  backgroundImage:
                    "linear-gradient(100deg, #0C5FF5 0%, #0289F9 48%, #3531E7 100%)",
                }}
              >
                Build what matters.
              </span>
            </h1>

            {/* Description */}
            <p
              className="
                mt-5
                max-w-[520px]
                text-sm
                font-medium
                leading-6
                text-[#64748B]
                sm:text-[15px]
                sm:leading-7
              "
            >
              Practical data programs built around
              real skills, real projects, expert
              mentorship, and the confidence to take
              your next career step.
            </p>

            {/* CTA */}
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <motion.button
                type="button"
                onClick={handleExplorePrograms}
                whileHover={{
                  y: -2,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                className="
                  group
                  inline-flex
                  items-center
                  justify-center
                  gap-2.5
                  rounded-full
                  px-6
                  py-3.5
                  text-sm
                  font-bold
                  text-white
                  shadow-[0_14px_30px_rgba(12,95,245,0.24)]
                  transition-all
                  duration-200
                  hover:shadow-[0_18px_38px_rgba(12,95,245,0.30)]
                "
                style={{
                  background:
                    "linear-gradient(100deg, #0C5FF5 0%, #0289F9 52%, #3531E7 100%)",
                }}
              >
                Explore Programs

                <FaArrowRight
                  size={11}
                  className="
                    transition-transform
                    duration-200
                    group-hover:translate-x-1
                  "
                />
              </motion.button>

              <motion.button
                type="button"
                onClick={handleWatchDemo}
                whileHover={{
                  y: -2,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                className="
                  group
                  inline-flex
                  items-center
                  justify-center
                  gap-2.5
                  rounded-full
                  border
                  border-[#DCE5F1]
                  bg-white
                  px-6
                  py-3.5
                  text-sm
                  font-bold
                  text-[#0A1832]
                  shadow-[0_8px_24px_rgba(10,24,50,0.06)]
                  transition-all
                  duration-200
                  hover:border-[#BFD3F2]
                  hover:shadow-[0_12px_30px_rgba(10,24,50,0.09)]
                "
              >
                <span
                  className="
                    flex
                    h-6
                    w-6
                    items-center
                    justify-center
                    rounded-full
                    bg-[#EAF2FF]
                    text-[#0C5FF5]
                    transition-colors
                    group-hover:bg-[#0C5FF5]
                    group-hover:text-white
                  "
                >
                  <FaPlay size={8} />
                </span>

                See How It Works
              </motion.button>
            </div>

            {/* Learning points */}
            <div className="mt-7 flex flex-wrap gap-x-5 gap-y-3">
              {[
                "Practical learning",
                "Real projects",
                "Expert mentorship",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2"
                >
                  <span
                    className="
                      flex
                      h-5
                      w-5
                      items-center
                      justify-center
                      rounded-full
                      bg-[#EAF2FF]
                      text-[#0C5FF5]
                    "
                  >
                    <FaCheck size={8} />
                  </span>

                  <span className="text-[10px] font-semibold text-[#475569] sm:text-[11px]">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* Small trust line */}
            <div className="mt-8 border-t border-[#EAF0F7] pt-5">
              <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
                <span className="text-[9px] font-bold uppercase tracking-[0.13em] text-[#94A3B8]">
                  Learn
                </span>

                <span className="h-px w-5 bg-[#CBD5E1]" />

                <span className="text-[9px] font-bold uppercase tracking-[0.13em] text-[#94A3B8]">
                  Build
                </span>

                <span className="h-px w-5 bg-[#CBD5E1]" />

                <span className="text-[9px] font-bold uppercase tracking-[0.13em] text-[#94A3B8]">
                  Apply
                </span>

                <span className="h-px w-5 bg-[#CBD5E1]" />

                <span className="text-[9px] font-bold uppercase tracking-[0.13em] text-[#0C5FF5]">
                  Grow
                </span>
              </div>
            </div>
          </motion.div>

          {/* =================================================
              MIDDLE — NEW PRODUCT VISUAL
              ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              y: 25,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
              delay: 0.12,
              ease: "easeOut",
            }}
            className="
              order-first
              flex
              min-h-[430px]
              items-center
              justify-center
              lg:order-none
              lg:min-h-[570px]
            "
          >
            <LearningPlatformVisual />
          </motion.div>

          {/* =================================================
              RIGHT — EXISTING SIGNUP CARD
              ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              x: 24,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.7,
              delay: 0.2,
              ease: "easeOut",
            }}
            className="
              flex
              items-center
              justify-center
              lg:justify-end
            "
          >
            <HeroSignupCard />
          </motion.div>
        </div>

        {/* =================================================
            MOBILE / DESKTOP DATA STRIP
            ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 12,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
            delay: 0.5,
          }}
          className="
            mx-auto
            mt-8
            flex
            max-w-[1050px]
            flex-wrap
            items-center
            justify-center
            gap-x-6
            gap-y-3
            border-t
            border-[#EAF0F7]
            pt-5
            lg:mt-3
          "
        >
          <div className="flex items-center gap-2">
            <span
              className="
                flex
                h-7
                w-7
                items-center
                justify-center
                rounded-lg
                bg-[#EAF2FF]
                text-[#0C5FF5]
              "
            >
              <FaCode size={10} />
            </span>

            <span className="text-[10px] font-bold text-[#475569]">
              Python
            </span>
          </div>

          <div className="hidden h-4 w-px bg-[#DCE5F1] sm:block" />

          <div className="flex items-center gap-2">
            <span
              className="
                flex
                h-7
                w-7
                items-center
                justify-center
                rounded-lg
                bg-[#EAF2FF]
                text-[#0289F9]
              "
            >
              <FaDatabase size={10} />
            </span>

            <span className="text-[10px] font-bold text-[#475569]">
              SQL
            </span>
          </div>

          <div className="hidden h-4 w-px bg-[#DCE5F1] sm:block" />

          <div className="flex items-center gap-2">
            <span
              className="
                flex
                h-7
                w-7
                items-center
                justify-center
                rounded-lg
                bg-[#EEEFFE]
                text-[#3531E7]
              "
            >
              <FaBrain size={10} />
            </span>

            <span className="text-[10px] font-bold text-[#475569]">
              AI & Machine Learning
            </span>
          </div>

          <div className="hidden h-4 w-px bg-[#DCE5F1] sm:block" />

          <div className="flex items-center gap-2">
            <span
              className="
                flex
                h-7
                w-7
                items-center
                justify-center
                rounded-lg
                bg-[#EAF2FF]
                text-[#0C5FF5]
              "
            >
              <FaChartLine size={10} />
            </span>

            <span className="text-[10px] font-bold text-[#475569]">
              Analytics
            </span>
          </div>

          <div className="hidden h-4 w-px bg-[#DCE5F1] sm:block" />

          <div className="flex items-center gap-2">
            <span
              className="
                flex
                h-7
                w-7
                items-center
                justify-center
                rounded-lg
                bg-[#EAF2FF]
                text-[#0C5FF5]
              "
            >
              <FaLayerGroup size={10} />
            </span>

            <span className="text-[10px] font-bold text-[#475569]">
              Real Projects
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;