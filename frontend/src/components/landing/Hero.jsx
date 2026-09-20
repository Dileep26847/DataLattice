import React from "react";
import { motion } from "framer-motion";

import heroImage from "../../assets/hero-woman.png";

import {
  FaArrowRight,
  FaChartSimple,
  FaCode,
  FaDatabase,
  FaPlay,
  FaCheck,
} from "react-icons/fa6";

/* =========================================================
   FEATURE PILL
   ========================================================= */

function FeaturePill({ icon, children }) {
  return (
    <div
      className="
        inline-flex
        h-[28px]
        items-center
        gap-2
        rounded-full
        border
        border-slate-200
        bg-white
        px-3
        text-[10px]
        font-semibold
        text-slate-600
        shadow-[0_5px_16px_rgba(15,23,42,0.07)]
        whitespace-nowrap
      "
    >
      <span className="flex items-center justify-center text-[#1463FF]">
        {icon || <FaCheck size={8} />}
      </span>

      {children}
    </div>
  );
}

/* =========================================================
   FLOATING IMAGE LABEL
   ========================================================= */

function FloatingLabel({
  icon,
  title,
  subtitle,
  className = "",
  variant = "white",
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.94,
        y: 8,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
      }}
      transition={{
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`
        absolute
        z-30
        flex
        items-center
        gap-2
        rounded-xl
        border
        border-white
        px-3
        py-2
        shadow-[0_10px_28px_rgba(15,23,42,0.12)]
        ${variant === "blue"
          ? "bg-[#1463FF] text-white"
          : "bg-white text-[#0B1B3A]"
        }
        ${className}
      `}
    >
      <span
        className={`
          flex
          h-5
          w-5
          items-center
          justify-center
          rounded-full
          ${variant === "blue"
            ? "bg-white/15 text-white"
            : "bg-blue-50 text-[#1463FF]"
          }
        `}
      >
        {icon}
      </span>

      <div className="leading-none">
        <p
          className={`
            whitespace-nowrap
            text-[9px]
            font-bold
            ${variant === "blue"
              ? "text-white"
              : "text-[#0B1B3A]"
            }
          `}
        >
          {title}
        </p>

        {subtitle && (
          <p
            className={`
              mt-1
              whitespace-nowrap
              text-[7px]
              font-medium
              ${variant === "blue"
                ? "text-white/80"
                : "text-slate-400"
              }
            `}
          >
            {subtitle}
          </p>
        )}
      </div>
    </motion.div>
  );
}

/* =========================================================
   HERO BACKGROUND
   ========================================================= */

function HeroBackground() {
  return (
    <div
      aria-hidden="true"
      className="
        pointer-events-none
        absolute
        inset-0
        overflow-hidden
      "
    >
      {/* Main blue atmosphere */}

      <div
        className="
          absolute
          -left-[180px]
          top-[80px]
          h-[520px]
          w-[520px]
          rounded-full
          bg-blue-100/40
          blur-[110px]
        "
      />

      <div
        className="
          absolute
          right-[-180px]
          top-[-80px]
          h-[560px]
          w-[560px]
          rounded-full
          bg-sky-100/45
          blur-[120px]
        "
      />

      {/* Bottom grid */}

      <div
        className="
          absolute
          bottom-0
          left-0
          right-0
          h-[150px]
          opacity-[0.55]
          [background-image:linear-gradient(to_right,rgba(148,163,184,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.10)_1px,transparent_1px)]
          [background-size:72px_72px]
          [mask-image:linear-gradient(to_bottom,transparent,black)]
        "
      />
    </div>
  );
}

/* =========================================================
   HERO
   ========================================================= */

function Hero() {
  return (
    <section
      id="home"
      className="
        relative
        min-h-[calc(100vh-66px)]
        overflow-hidden
        bg-gradient-to-b
        from-[#f7faff]
        via-[#f2f7ff]
        to-[#eef5ff]
      "
    >
      <HeroBackground />

      {/* =====================================================
          MAIN HERO CONTAINER
          ===================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          flex
          min-h-[calc(100vh-66px)]
          w-full
          max-w-[1400px]
          items-center
          px-6
          py-10
          sm:px-8
          lg:px-12
          xl:px-16
        "
      >
        <div
          className="
            grid
            w-full
            items-center
            gap-8
            lg:grid-cols-[0.96fr_1.04fr]
            lg:gap-4
            xl:grid-cols-[0.95fr_1.05fr]
          "
        >
          {/* =================================================
              LEFT CONTENT
              ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              x: -25,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              relative
              z-20
              mx-auto
              w-full
              max-w-[650px]
              lg:mx-0
            "
          >
            {/* EYEBROW */}

            <div
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-blue-200
                bg-blue-50/90
                px-3
                py-1.5
                text-[9px]
                font-extrabold
                uppercase
                tracking-[0.07em]
                text-[#1463FF]
                shadow-sm
                sm:px-3.5
                sm:text-[10px]
              "
            >
              <span
                className="
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-[#1463FF]
                "
              />

              Skills for a brighter tomorrow
            </div>

            {/* HEADING */}

            <h1
              className="
                mt-6
                max-w-[620px]
                text-[43px]
                font-extrabold
                leading-[0.98]
                tracking-[-0.055em]
                text-[#091A3A]
                sm:mt-7
                sm:text-[52px]
                md:text-[58px]
                lg:mt-8
                lg:text-[60px]
                xl:text-[64px]
              "
            >
              Learn Technology.
              <br />

              <span
                className="
                  bg-gradient-to-r
                  from-[#087CFF]
                  via-[#1463FF]
                  to-[#3749F5]
                  bg-clip-text
                  text-transparent
                "
              >
                Build What
                <br />
                Matters.
              </span>
            </h1>

            {/* DESCRIPTION */}

            <p
              className="
                mt-6
                max-w-[570px]
                text-[14px]
                font-medium
                leading-[1.7]
                text-slate-500
                sm:text-[15px]
                lg:text-[15px]
                xl:text-[16px]
              "
            >
              Practical, career-focused programs with live learning,
              real-world projects, expert mentorship and structured
              career support.
            </p>

            {/* BUTTONS */}

            <div
              className="
                mt-7
                flex
                flex-wrap
                items-center
                gap-3
              "
            >
              {/* Explore Programs */}

              <a
                href="#programs"
                className="
                  inline-flex
                  h-[42px]
                  items-center
                  justify-center
                  gap-3
                  rounded-xl
                  bg-[#1463FF]
                  px-5
                  text-[11px]
                  font-bold
                  text-white
                  shadow-[0_10px_24px_rgba(20,99,255,0.24)]
                  transition-all
                  duration-200
                  hover:-translate-y-0.5
                  hover:bg-[#0d55e8]
                  hover:shadow-[0_14px_30px_rgba(20,99,255,0.28)]
                  sm:h-[44px]
                  sm:px-6
                  sm:text-[12px]
                "
              >
                Explore Programs

                <FaArrowRight size={10} />
              </a>

              {/* See How It Works */}

              <a
                href="#journey"
                className="
                  inline-flex
                  h-[42px]
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  px-5
                  text-[11px]
                  font-bold
                  text-[#17233F]
                  shadow-[0_6px_18px_rgba(15,23,42,0.06)]
                  transition-all
                  duration-200
                  hover:-translate-y-0.5
                  hover:border-blue-200
                  hover:text-[#1463FF]
                  sm:h-[44px]
                  sm:px-6
                  sm:text-[12px]
                "
              >
                <span
                  className="
                    flex
                    h-5
                    w-5
                    items-center
                    justify-center
                    rounded-full
                    bg-[#1463FF]
                    text-white
                  "
                >
                  <FaPlay size={7} />
                </span>

                See How It Works
              </a>
            </div>

            {/* FEATURE PILLS */}

            <div
              className="
                mt-7
                flex
                max-w-[620px]
                flex-wrap
                gap-2
              "
            >
              <FeaturePill icon={<FaChartSimple size={8} />}>
                Practical Learning
              </FeaturePill>

              <FeaturePill icon={<FaCode size={8} />}>
                Real Projects
              </FeaturePill>

              <FeaturePill icon={<FaCheck size={8} />}>
                Expert Mentorship
              </FeaturePill>

              <FeaturePill icon={<FaChartSimple size={8} />}>
                Career Support
              </FeaturePill>
            </div>
          </motion.div>

          {/* =================================================
              RIGHT IMAGE COMPOSITION
              ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              x: 25,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.8,
              delay: 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              relative
              mx-auto
              flex
              min-h-[410px]
              w-full
              max-w-[650px]
              items-center
              justify-center
              lg:min-h-[500px]
              xl:min-h-[530px]
            "
          >
            {/* SOFT IMAGE PANEL */}

            <div
              className="
                absolute
                right-[2%]
                top-[7%]
                h-[76%]
                w-[91%]
                rounded-[28px]
                border
                border-white/70
                bg-gradient-to-br
                from-[#edf5ff]
                via-[#eaf3ff]
                to-[#f8fbff]
                shadow-[0_30px_70px_rgba(42,77,125,0.10)]
              "
            />

            {/* subtle inner glow */}

            <div
              className="
                absolute
                right-[6%]
                top-[12%]
                h-[64%]
                w-[78%]
                rounded-[30px]
                bg-white/30
                blur-[20px]
              "
            />

            {/* =================================================
                ACTUAL PERSON IMAGE

                IMPORTANT:
                No overflow-hidden here.
                This prevents the transparent PNG from
                getting chopped.
                ================================================= */}

            <motion.img
              src={heroImage}
              alt="Student learning technology with laptop"
              className="
                relative
                z-10
                block
                h-auto
                w-[95%]
                max-w-[620px]
                object-contain
                drop-shadow-[0_24px_35px_rgba(15,23,42,0.14)]
                sm:w-[92%]
                lg:w-[96%]
              "
              animate={{
                y: [0, -4, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 5,
                ease: "easeInOut",
              }}
            />

            {/* =================================================
                PYTHON
                ================================================= */}

            <FloatingLabel
              icon={
                <span className="h-2 w-2 rounded-full bg-[#FFC629]" />
              }
              title="Python"
              className="
                left-[0%]
                top-[20%]
                sm:left-[2%]
                lg:left-[0%]
              "
            />

            {/* =================================================
                AI / ML
                ================================================= */}

            <FloatingLabel
              icon={
                <span className="h-2 w-2 rounded-full bg-[#4A45E8]" />
              }
              title="AI / ML"
              className="
                left-[0%]
                top-[46%]
                sm:left-[1%]
                lg:left-[-1%]
              "
            />

            {/* =================================================
                SQL
                ================================================= */}

            <FloatingLabel
              icon={
                <span className="h-2 w-2 rounded-full bg-[#1478FF]" />
              }
              title="SQL"
              className="
                right-[0%]
                top-[26%]
                sm:right-[1%]
                lg:right-[-1%]
              "
            />

            {/* =================================================
                PROJECTS
                ================================================= */}

            <FloatingLabel
              icon={
                <FaCheck
                  size={9}
                  className="text-emerald-500"
                />
              }
              title="Projects"
              subtitle="15+ Built"
              className="
                right-[0%]
                top-[57%]
                sm:right-[1%]
                lg:right-[-1%]
              "
            />

            {/* =================================================
                CAREER GROWTH
                ================================================= */}

            <FloatingLabel
              icon={<FaChartSimple size={9} />}
              title="Career Growth"
              variant="blue"
              className="
                bottom-[5%]
                left-1/2
                -translate-x-1/2
                sm:bottom-[3%]
              "
            />
          </motion.div>
        </div>
      </div>

      {/* =====================================================
          BOTTOM TRANSITION
          ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          bottom-0
          left-0
          right-0
          h-16
          bg-gradient-to-t
          from-[#eef5ff]
          to-transparent
        "
      />
    </section>
  );
}

export default Hero;