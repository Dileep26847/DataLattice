import { motion } from "framer-motion";

import heroImage from "../../assets/hero-woman.png";

import {
  FaArrowRight,
  FaChartSimple,
  FaCode,
  FaCheck,
  FaPlay,
  FaAward,
  FaArrowTrendUp,
} from "react-icons/fa6";

/* =========================================================
   FEATURE PILL
   ========================================================= */

function FeaturePill({ icon, children }) {
  return (
    <div
      className="
        inline-flex
        h-[34px]
        shrink-0
        items-center
        gap-2
        rounded-full
        border
        border-[#E2E8F0]
        bg-white
        px-4
        py-[9px]
        text-[13px]
        font-semibold
        text-[#1E293B]
        shadow-[0_2px_4px_rgba(10,24,50,0.03)]
        whitespace-nowrap
      "
    >
      <span className="flex items-center justify-center text-[#0C5FF5]">
        {icon || <FaCheck size={11} />}
      </span>

      {children}
    </div>
  );
}

/* =========================================================
   FLOATING IMAGE BADGE
   ========================================================= */

function FloatingBadge({
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
        gap-2.5
        ${
          variant === "blue"
            ? "rounded-full"
            : "rounded-[14px]"
        }
        ${
          variant === "blue"
            ? "text-white"
            : "bg-white text-[#0A1832]"
        }
        ${
          variant === "blue"
            ? "shadow-[0_2px_4px_rgba(12,95,245,0.09),0_10px_12px_rgba(12,95,245,0.22)]"
            : "shadow-[0_2px_2px_rgba(10,24,50,0.03),0_8px_10px_rgba(10,24,50,0.09)]"
        }
        ${className}
      `}
    >
      {icon}

      <div className="leading-none">
        <p
          className={`
            whitespace-nowrap
            text-[14px]
            font-bold
            ${
              variant === "blue"
                ? "text-white"
                : "text-[#0A1832]"
            }
          `}
        >
          {title}
        </p>

        {subtitle && (
          <p
            className="
              mt-1
              whitespace-nowrap
              text-[10px]
              font-normal
              text-[#64748B]
            "
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
      {/* Top-left glow */}

      <div
        className="
          absolute
          -left-[180px]
          -top-[140px]
          h-[400px]
          w-[400px]
          rounded-full
          bg-blue-100/70
          blur-[90px]
        "
      />

      {/* Right glow */}

      <div
        className="
          absolute
          left-[63%]
          top-[200px]
          h-[500px]
          w-[500px]
          rounded-full
          bg-blue-100/60
          blur-[110px]
        "
      />

      {/* Center top glow */}

      <div
        className="
          absolute
          left-[42%]
          -top-[100px]
          h-[300px]
          w-[300px]
          rounded-full
          bg-slate-100/70
          blur-[90px]
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
        overflow-hidden
        bg-gradient-to-br
        from-[#F0F6FF]
        via-[#F8FAFC]
        to-[#EEF4FF]
      "
    >
      <HeroBackground />

      {/* =====================================================
          MAIN HERO
      ===================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          flex
          w-full
          max-w-[1440px]
          flex-col
          gap-10
          px-5
          py-16
          sm:px-8
          sm:py-20
          lg:flex-row
          lg:items-center
          lg:gap-16
          lg:px-[120px]
          lg:py-[100px]
        "
      >
        {/* =================================================
            LEFT
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
            flex
            min-w-0
            flex-1
            flex-col
            items-start
            gap-0
          "
        >
          {/* =================================================
              BADGE
          ================================================= */}

          <div
            className="
              inline-flex
              shrink-0
              items-center
              gap-2
              rounded-full
              border
              border-[rgba(12,95,245,0.18)]
              bg-[rgba(12,95,245,0.08)]
              px-[18px]
              py-2
            "
          >
            <span
              className="
                h-[6px]
                w-[6px]
                shrink-0
                rounded-full
                bg-[#0C5FF5]
              "
            />

            <span
              className="
                text-[11px]
                font-bold
                uppercase
                text-[#0C5FF5]
              "
            >
              Skills for a brighter tomorrow
            </span>
          </div>

          {/* =================================================
              HEADING
          ================================================= */}

          <h1
            className="
              mt-[40px]
              w-full
              max-w-[576px]
              text-[46px]
              font-extrabold
              leading-[1.05]
              tracking-[-0.045em]
              text-[#0A1832]

              sm:text-[56px]

              lg:text-[68px]
              lg:leading-[1.1]
            "
          >
            Learn Technology.

            <br />

            <span
              className="
                bg-gradient-to-r
                from-[#0C5FF5]
                via-[#0289F9]
                to-[#3531E7]
                bg-clip-text
                text-transparent
              "
            >
              Build What Matters.
            </span>
          </h1>

          {/* =================================================
              DESCRIPTION
          ================================================= */}

          <p
            className="
              mt-[40px]
              w-full
              max-w-[576px]
              text-[15px]
              font-normal
              leading-[1.65]
              text-[#475569]

              sm:text-[16px]

              lg:text-[18px]
            "
          >
            Practical, career-focused programs with live
            learning, real-world projects, expert mentorship
            and structured career support.
          </p>

          {/* =================================================
              ACTIONS
          ================================================= */}

          <div
            className="
              mt-[40px]
              flex
              flex-wrap
              items-center
              gap-4
            "
          >
            <a
              href="#programs"
              className="
                inline-flex
                h-[52px]
                items-center
                justify-center
                gap-[10px]
                rounded-[14px]
                bg-[#0C5FF5]
                px-8
                py-4
                text-[16px]
                font-bold
                text-white
                shadow-[0_2px_3px_rgba(12,95,245,0.13),0_8px_12px_rgba(12,95,245,0.25)]
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:bg-[#0955DC]
              "
            >
              Explore Programs

              <FaArrowRight size={14} />
            </a>

            <a
              href="#journey"
              className="
                inline-flex
                h-[52px]
                items-center
                justify-center
                gap-2
                rounded-[14px]
                border-[1.5px]
                border-[#CBD5E1]
                bg-white
                px-8
                py-4
                text-[16px]
                font-semibold
                text-[#0A1832]
                shadow-[0_4px_6px_rgba(10,24,50,0.06)]
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:border-[#0C5FF5]
                hover:text-[#0C5FF5]
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
                  bg-[#0C5FF5]
                  text-white
                "
              >
                <FaPlay size={7} />
              </span>

              See How It Works
            </a>
          </div>

          {/* =================================================
              BENEFIT PILLS
          ================================================= */}

          <div
            className="
              mt-[40px]
              flex
              w-full
              flex-wrap
              content-start
              gap-[10px]
            "
          >
            <FeaturePill
              icon={<FaChartSimple size={11} />}
            >
              Practical Learning
            </FeaturePill>

            <FeaturePill
              icon={<FaCode size={11} />}
            >
              Real Projects
            </FeaturePill>

            <FeaturePill
              icon={<FaAward size={11} />}
            >
              Expert Mentorship
            </FeaturePill>

            <FeaturePill
              icon={<FaArrowTrendUp size={11} />}
            >
              Career Support
            </FeaturePill>
          </div>
        </motion.div>

        {/* =================================================
            RIGHT IMAGE
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
            flex
            h-auto
            min-h-[420px]
            w-full
            shrink-0
            items-center
            justify-center

            sm:min-h-[500px]

            lg:h-[540px]
            lg:w-[580px]
          "
        >
          {/* =================================================
              IMAGE CONTAINER
          ================================================= */}

          <div
            className="
              relative
              h-[420px]
              w-full
              overflow-visible
              rounded-[28px]
              shadow-[0_8px_24px_rgba(12,95,245,0.08),0_32px_64px_rgba(10,24,50,0.16)]

              sm:h-[500px]
              sm:w-[540px]
            "
          >
            {/* Image */}

            <img
              src={heroImage}
              alt="Student learning technology with laptop"
              className="
                absolute
                inset-0
                h-full
                w-full
                rounded-[28px]
                object-cover
              "
            />

            {/* Overlay */}

            <div
              className="
                absolute
                inset-0
                rounded-[28px]
                bg-gradient-to-br
                from-transparent
                via-transparent
                to-[rgba(12,95,245,0.06)]
              "
            />

            {/* =================================================
                PYTHON
            ================================================= */}

            <FloatingBadge
              icon={
                <span
                  className="
                    h-3
                    w-3
                    rounded-full
                    bg-[#FFC629]
                  "
                />
              }
              title="Python"
              className="
                left-[-44px]
                top-[52px]
                px-4
                py-2.5

                max-sm:left-[8px]
              "
            />

            {/* =================================================
                SQL
            ================================================= */}

            <FloatingBadge
              icon={
                <span
                  className="
                    h-3
                    w-3
                    rounded-full
                    bg-[#1478FF]
                  "
                />
              }
              title="SQL"
              className="
                left-[430px]
                top-[90px]
                px-4
                py-2.5

                max-sm:left-auto
                max-sm:right-[8px]
              "
            />

            {/* =================================================
                AI / ML
            ================================================= */}

            <FloatingBadge
              icon={
                <span
                  className="
                    h-3
                    w-3
                    rounded-full
                    bg-[#4A45E8]
                  "
                />
              }
              title="AI / ML"
              className="
                left-[-52px]
                top-[220px]
                px-4
                py-2.5

                max-sm:left-[8px]
              "
            />

            {/* =================================================
                PROJECTS
            ================================================= */}

            <FloatingBadge
              icon={
                <span
                  className="
                    flex
                    h-5
                    w-5
                    items-center
                    justify-center
                    rounded-full
                    text-emerald-500
                  "
                >
                  <FaCheck size={14} />
                </span>
              }
              title="Projects"
              subtitle="15+ Built"
              className="
                left-[396px]
                top-[300px]
                gap-3
                px-4
                py-3

                max-sm:left-auto
                max-sm:right-[8px]
              "
            />

            {/* =================================================
                CAREER GROWTH
            ================================================= */}

            <FloatingBadge
              icon={
                <FaArrowTrendUp
                  size={15}
                  className="text-white"
                />
              }
              title="Career Growth"
              variant="blue"
              className="
                left-[140px]
                top-[420px]
                gap-2.5
                px-5
                py-3

                max-sm:left-1/2
                max-sm:-translate-x-1/2
              "
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;