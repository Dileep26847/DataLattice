import React from "react";
import { motion } from "framer-motion";

import heroImage from "../../assets/hero-reference.png";

import {
  FaArrowRight,
  FaChartLine,
  FaCode,
  FaDatabase,
  FaCheck,
} from "react-icons/fa6";

/* ============================================================
   DATALATTICE HERO
   ============================================================

   DESIGN SOURCE:
   Reference Hero screenshot supplied by the user.

   FUNCTIONALITY:
   - Existing anchor destinations are preserved.
   - No backend/API functionality is introduced or changed.
   - Existing Home.jsx integration remains unchanged.
   - This component is presentation/UI focused.
   ============================================================ */


/* ============================================================
   FEATURE PILL
   ============================================================ */

function FeaturePill({ icon, children }) {
  return (
    <div
      className="
        inline-flex
        h-[25px]
        items-center
        gap-[6px]
        rounded-full
        border
        border-[#E3E9F2]
        bg-white
        px-[10px]
        py-[5px]
        text-[9px]
        font-semibold
        leading-none
        text-[#27364D]
        shadow-[0_2px_7px_rgba(15,23,42,0.045)]
        sm:h-[27px]
        sm:px-[11px]
        sm:text-[10px]
      "
    >
      <span
        className="
          flex
          h-[14px]
          w-[14px]
          shrink-0
          items-center
          justify-center
          rounded-full
          text-[#1463FF]
        "
      >
        {icon || <FaCheck size={8} />}
      </span>

      <span className="whitespace-nowrap">
        {children}
      </span>
    </div>
  );
}


/* ============================================================
   FLOATING IMAGE LABEL
   ============================================================ */

function FloatingLabel({
  icon,
  children,
  position = "",
  variant = "default",
}) {
  const variantClasses =
    variant === "green"
      ? `
          border-[#E7F5EE]
          bg-white
          text-[#20334D]
        `
      : `
          border-[#E6EAF1]
          bg-white
          text-[#20334D]
        `;

  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.94,
        y: 5,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
      }}
      transition={{
        duration: 0.45,
        ease: "easeOut",
      }}
      className={`
        absolute
        z-20
        flex
        h-[31px]
        items-center
        gap-[7px]
        rounded-[11px]
        border
        px-[10px]
        shadow-[0_7px_20px_rgba(15,23,42,0.11)]
        ${variantClasses}
        ${position}
      `}
    >
      <span
        className={`
          flex
          h-[8px]
          w-[8px]
          shrink-0
          rounded-full
          ${
            variant === "yellow"
              ? "bg-[#FFD12F]"
              : variant === "green"
                ? "border-[1.5px] border-[#19C985] bg-white"
                : "bg-[#1463FF]"
          }
        `}
      >
        {variant === "green" && (
          <span className="m-auto h-[3px] w-[3px] rounded-full bg-[#19C985]" />
        )}
      </span>

      <span
        className="
          whitespace-nowrap
          text-[9px]
          font-bold
          leading-none
        "
      >
        {children}
      </span>
    </motion.div>
  );
}


/* ============================================================
   CAREER GROWTH LABEL
   ============================================================ */

function CareerGrowthLabel() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 8,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.5,
        delay: 0.45,
        ease: "easeOut",
      }}
      className="
        absolute
        bottom-[10px]
        left-[50%]
        z-30
        flex
        -translate-x-1/2
        items-center
        gap-[7px]
        rounded-[11px]
        bg-[#1463FF]
        px-[12px]
        py-[8px]
        text-white
        shadow-[0_8px_20px_rgba(20,99,255,0.25)]
      "
    >
      <FaChartLine size={10} />

      <span
        className="
          whitespace-nowrap
          text-[9px]
          font-bold
          leading-none
        "
      >
        Career Growth
      </span>
    </motion.div>
  );
}


/* ============================================================
   HERO IMAGE AREA
   ============================================================ */

function HeroVisual() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        x: 22,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      transition={{
        duration: 0.7,
        delay: 0.05,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        relative
        mx-auto
        flex
        w-full
        max-w-[395px]
        items-center
        justify-center
        lg:mx-0
        lg:max-w-[395px]
      "
    >
      {/* ======================================================
          MAIN IMAGE
          ====================================================== */}

      <div
        className="
          relative
          w-full
          overflow-visible
        "
      >
        <div
          className="
            relative
            overflow-hidden
            rounded-[22px]
            bg-[#EAF2FC]
            shadow-[0_20px_40px_rgba(15,23,42,0.13)]
          "
        >
          <motion.img
            src={heroImage}
            alt="DataLattice student learning technology"
            className="
              block
              aspect-[1.085/1]
              w-full
              object-cover
              object-center
            "
            animate={{
              scale: [1, 1.008, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 7,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* ==================================================
            PYTHON LABEL
            ================================================== */}

        <FloatingLabel
          variant="yellow"
          position="
            -left-[32px]
            top-[38px]
            sm:-left-[31px]
          "
        >
          Python
        </FloatingLabel>

        {/* ==================================================
            AI / ML LABEL
            ================================================== */}

        <FloatingLabel
          position="
            -left-[38px]
            top-[160px]
            sm:-left-[38px]
          "
        >
          AI / ML
        </FloatingLabel>

        {/* ==================================================
            SQL LABEL
            ================================================== */}

        <FloatingLabel
          position="
            -right-[1px]
            top-[62px]
            sm:-right-[1px]
          "
        >
          SQL
        </FloatingLabel>

        {/* ==================================================
            PROJECTS LABEL
            ================================================== */}

        <FloatingLabel
          variant="green"
          position="
            -right-[2px]
            top-[221px]
            sm:-right-[1px]
          "
        >
          <span className="flex items-center gap-[5px]">
            <span
              className="
                flex
                h-[13px]
                w-[13px]
                items-center
                justify-center
                rounded-full
                border-[1.5px]
                border-[#19C985]
              "
            >
              <FaCheck
                size={7}
                className="text-[#19C985]"
              />
            </span>

            Projects
          </span>
        </FloatingLabel>

        {/* ==================================================
            PROJECT COUNT
            ================================================== */}

        <div
          className="
            absolute
            right-[18px]
            top-[249px]
            z-20
            rounded-b-[10px]
            bg-white
            px-[9px]
            pb-[5px]
            pt-[1px]
            text-[7px]
            font-semibold
            text-slate-400
            shadow-[0_4px_12px_rgba(15,23,42,0.06)]
          "
        >
          15+ Built
        </div>

        {/* ==================================================
            CAREER GROWTH
            ================================================== */}

        <CareerGrowthLabel />
      </div>
    </motion.div>
  );
}


/* ============================================================
   HERO
   ============================================================ */

function Hero() {
  return (
    <section
      id="home"
      className="
        relative
        overflow-hidden
        bg-[#F1F6FE]
        pt-[73px]
        sm:pt-[76px]
        lg:pt-[76px]
      "
    >
      {/* ======================================================
          SOFT BACKGROUND LIGHT
          ====================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          overflow-hidden
        "
      >
        <div
          className="
            absolute
            -left-[180px]
            top-[45px]
            h-[420px]
            w-[420px]
            rounded-full
            bg-[#DDEBFF]
            opacity-45
            blur-[100px]
          "
        />

        <div
          className="
            absolute
            right-[-180px]
            top-[-100px]
            h-[430px]
            w-[430px]
            rounded-full
            bg-[#E7F0FF]
            opacity-70
            blur-[100px]
          "
        />
      </div>

      {/* ======================================================
          MAIN HERO CONTAINER
          ====================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          grid
          min-h-[520px]
          w-full
          max-w-[1200px]
          items-center
          gap-8
          px-5
          pb-[42px]
          pt-[50px]
          sm:px-8
          lg:grid-cols-[1.08fr_0.92fr]
          lg:gap-[45px]
          lg:px-5
          lg:pb-[64px]
          lg:pt-[58px]
          xl:grid-cols-[1.08fr_0.92fr]
        "
      >
        {/* ====================================================
            LEFT CONTENT
            ==================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            x: -20,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.65,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            relative
            z-10
            w-full
            max-w-[500px]
          "
        >
          {/* ==================================================
              EYEBROW
              ================================================== */}

          <div
            className="
              inline-flex
              h-[23px]
              items-center
              gap-[6px]
              rounded-full
              border
              border-[#C7DBFF]
              bg-[#E0ECFF]
              px-[11px]
              text-[8px]
              font-extrabold
              uppercase
              tracking-[0.045em]
              text-[#1463FF]
              sm:h-[24px]
              sm:px-[12px]
              sm:text-[8.5px]
            "
          >
            <span
              className="
                h-[5px]
                w-[5px]
                rounded-full
                bg-[#1463FF]
              "
            />

            Skills for a brighter tomorrow
          </div>

          {/* ==================================================
              HEADING
              ================================================== */}

          <h1
            className="
              mt-[34px]
              max-w-[500px]
              text-[45px]
              font-extrabold
              leading-[0.98]
              tracking-[-0.055em]
              text-[#091A3A]
              sm:mt-[35px]
              sm:text-[51px]
              lg:text-[53px]
              xl:text-[56px]
            "
          >
            Learn Technology.
            <br />

            <span
              className="
                bg-gradient-to-r
                from-[#087BFF]
                via-[#1267F5]
                to-[#3947E8]
                bg-clip-text
                text-transparent
              "
            >
              Build What
              <br />
              Matters.
            </span>
          </h1>

          {/* ==================================================
              DESCRIPTION
              ================================================== */}

          <p
            className="
              mt-[30px]
              max-w-[470px]
              text-[13px]
              font-medium
              leading-[1.65]
              text-[#61708A]
              sm:mt-[31px]
              sm:text-[14px]
              lg:text-[14px]
            "
          >
            Practical, career-focused programs with live learning,
            real-world projects, expert mentorship and structured
            career support.
          </p>

          {/* ==================================================
              ACTION BUTTONS
              ================================================== */}

          <div
            className="
              mt-[29px]
              flex
              flex-wrap
              items-center
              gap-[12px]
            "
          >
            {/* Explore Programs */}

            <a
              href="#programs"
              className="
                inline-flex
                h-[38px]
                items-center
                justify-center
                gap-[12px]
                rounded-[10px]
                border
                border-[#0D59E8]
                bg-[#1463FF]
                px-[21px]
                text-[10px]
                font-bold
                text-white
                shadow-[0_7px_16px_rgba(20,99,255,0.24)]
                transition-all
                duration-200
                hover:-translate-y-[1px]
                hover:bg-[#0955D8]
                hover:shadow-[0_10px_22px_rgba(20,99,255,0.27)]
                active:translate-y-0
                sm:h-[39px]
                sm:px-[23px]
                sm:text-[10.5px]
              "
            >
              <span>
                Explore Programs
              </span>

              <FaArrowRight size={10} />
            </a>

            {/* See How It Works */}

            <a
              href="#journey"
              className="
                inline-flex
                h-[38px]
                items-center
                justify-center
                rounded-[10px]
                border
                border-[#D0D9E6]
                bg-white
                px-[21px]
                text-[10px]
                font-bold
                text-[#182A46]
                shadow-[0_3px_9px_rgba(15,23,42,0.06)]
                transition-all
                duration-200
                hover:-translate-y-[1px]
                hover:border-[#B8C9E5]
                hover:bg-[#FAFCFF]
                sm:h-[39px]
                sm:px-[23px]
                sm:text-[10.5px]
              "
            >
              See How It Works
            </a>
          </div>

          {/* ==================================================
              FEATURE PILLS
              ================================================== */}

          <div
            className="
              mt-[29px]
              flex
              max-w-[475px]
              flex-wrap
              gap-[7px]
            "
          >
            <FeaturePill>
              Practical Learning
            </FeaturePill>

            <FeaturePill
              icon={
                <FaCode size={8} />
              }
            >
              Real Projects
            </FeaturePill>

            <FeaturePill
              icon={
                <span
                  className="
                    text-[10px]
                    leading-none
                  "
                >
                  ♙
                </span>
              }
            >
              Expert Mentorship
            </FeaturePill>

            <FeaturePill
              icon={
                <FaChartLine size={8} />
              }
            >
              Career Support
            </FeaturePill>
          </div>
        </motion.div>

        {/* ====================================================
            RIGHT VISUAL
            ==================================================== */}

        <div
          className="
            relative
            z-10
            flex
            min-h-[330px]
            w-full
            items-center
            justify-center
            pt-[15px]
            sm:min-h-[370px]
            lg:min-h-[390px]
            lg:pt-0
          "
        >
          <HeroVisual />
        </div>
      </div>

      {/* ======================================================
          MOBILE IMAGE SPACING
          ====================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          bottom-0
          left-0
          right-0
          h-[35px]
          bg-gradient-to-t
          from-[#EEF4FC]
          to-transparent
        "
      />
    </section>
  );
}

export default Hero;