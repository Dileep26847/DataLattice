import { motion } from "framer-motion";

import {
  FaChartLine,
  FaCode,
  FaDatabase,
  FaLightbulb,
  FaProjectDiagram,
} from "react-icons/fa";


// ============================================================
// DATALATTICE VALUE SYSTEM
// ============================================================

const valueCards = [
  {
    number: "01",
    title: "Learn with direction",
    description:
      "Follow a focused learning path built around the skills and concepts that matter for your chosen data discipline.",
    icon: <FaDatabase />,
    tag: "FOUNDATION",
  },

  {
    number: "02",
    title: "Practice with purpose",
    description:
      "Move beyond passive lessons through exercises, practical work and project-oriented learning experiences.",
    icon: <FaCode />,
    tag: "PRACTICE",
  },

  {
    number: "03",
    title: "Build real capability",
    description:
      "Turn concepts into tangible projects that help connect technical knowledge with practical problem solving.",
    icon: <FaProjectDiagram />,
    tag: "PROJECTS",
  },

  {
    number: "04",
    title: "See your progress",
    description:
      "Make learning measurable with progress signals that help you understand where you are and what comes next.",
    icon: <FaChartLine />,
    tag: "PROGRESS",
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
        bg-[#0B1B3A]
        py-16
        sm:py-20
        lg:py-24
      "
    >

      {/* ======================================================
          BACKGROUND DATA FIELD
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          overflow-hidden
        "
        aria-hidden="true"
      >

        {/* ==================================================
            TECH GRID
        ================================================== */}

        <div
          className="
            absolute
            inset-0
            opacity-[0.055]
          "
          style={{
            backgroundImage:
              "linear-gradient(rgba(148,163,184,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.7) 1px, transparent 1px)",
            backgroundSize:
              "52px 52px",
          }}
        />


        {/* ==================================================
            TOP DATA TRACE
        ================================================== */}

        <svg
          className="
            absolute
            left-0
            top-0
            h-[240px]
            w-full
          "
          viewBox="0 0 1440 240"
          fill="none"
          preserveAspectRatio="none"
        >

          <path
            d="
              M-20 190
              C120 165 170 205 300 150
              C420 100 470 160 590 112
              C720 60 790 118 910 82
              C1030 48 1120 80 1225 42
              C1310 12 1370 38 1460 5
            "
            stroke="#1463FF"
            strokeOpacity="0.16"
            strokeWidth="1"
          />


          <path
            d="
              M-20 208
              C120 183 170 223 300 168
              C420 118 470 178 590 130
              C720 78 790 136 910 100
              C1030 66 1120 98 1225 60
              C1310 30 1370 56 1460 23
            "
            stroke="#06B6D4"
            strokeOpacity="0.1"
            strokeWidth="1"
            strokeDasharray="5 9"
          />

        </svg>


        {/* ==================================================
            AMBIENT BLUE
        ================================================== */}

        <motion.div
          animate={{
            x: [0, 40, 0],
            y: [0, -20, 0],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            -left-48
            top-20
            h-[420px]
            w-[420px]
            rounded-full
            bg-[#1463FF]/[0.055]
            blur-[130px]
          "
        />


        {/* ==================================================
            AMBIENT CYAN
        ================================================== */}

        <motion.div
          animate={{
            x: [0, -35, 0],
            y: [0, 25, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            -right-48
            bottom-0
            h-[440px]
            w-[440px]
            rounded-full
            bg-[#06B6D4]/[0.045]
            blur-[130px]
          "
        />


        {/* ==================================================
            DATA POINTS
        ================================================== */}

        <span
          className="
            absolute
            left-[8%]
            top-[28%]
            h-1
            w-1
            rounded-full
            bg-[#06B6D4]/60
          "
        />


        <span
          className="
            absolute
            left-[28%]
            top-[16%]
            h-1
            w-1
            rounded-full
            bg-[#1463FF]/60
          "
        />


        <span
          className="
            absolute
            right-[24%]
            top-[21%]
            h-1
            w-1
            rounded-full
            bg-[#06B6D4]/60
          "
        />


        <span
          className="
            absolute
            right-[8%]
            bottom-[24%]
            h-1
            w-1
            rounded-full
            bg-[#1463FF]/60
          "
        />

      </div>


      {/* ======================================================
          CONTENT
      ====================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          w-full
          max-w-7xl
          px-5
          sm:px-7
          lg:px-8
        "
      >

        {/* ====================================================
            INTRO + SYSTEM
        ==================================================== */}

        <div
          className="
            grid
            gap-10
            lg:grid-cols-[0.78fr_1.22fr]
            lg:items-center
            lg:gap-12
          "
        >

          {/* ==================================================
              LEFT MESSAGE
          ================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              x: -20,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.6,
            }}
            viewport={{
              once: true,
              amount: 0.25,
            }}
          >

            {/* ==================================================
                EYEBROW
            ================================================== */}

            <div
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-white/10
                bg-white/[0.045]
                px-3.5
                py-2
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.18em]
                text-[#67E8F9]
              "
            >

              <span
                className="
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-[#06B6D4]
                  shadow-[0_0_9px_rgba(6,182,212,0.7)]
                "
              />

              Why DataLattice

            </div>


            {/* ==================================================
                HEADING
            ================================================== */}

            <h2
              className="
                mt-6
                max-w-xl
                text-4xl
                font-semibold
                leading-[1.05]
                tracking-[-0.045em]
                text-white
                sm:text-5xl
                lg:text-[54px]
              "
            >

              Learning should
              <span
                className="
                  block
                  text-[#67E8F9]
                "
              >
                move somewhere.
              </span>

            </h2>


            <p
              className="
                mt-5
                max-w-lg
                text-sm
                leading-7
                text-slate-400
                sm:text-base
              "
            >

              DataLattice connects knowledge, practice, projects and
              measurable progress into one continuous learning
              system.

            </p>


            {/* ==================================================
                SYSTEM SIGNALS
            ================================================== */}

            <div
              className="
                mt-7
                grid
                max-w-md
                grid-cols-2
                gap-x-6
                gap-y-4
                border-t
                border-white/10
                pt-5
              "
            >

              <Signal
                value="01"
                label="Focused path"
              />


              <Signal
                value="02"
                label="Practical work"
              />


              <Signal
                value="03"
                label="Real projects"
              />


              <Signal
                value="04"
                label="Measured progress"
              />

            </div>

          </motion.div>


          {/* ==================================================
              RIGHT LEARNING SYSTEM
          ================================================== */}

          <LearningSystem />

        </div>


        {/* ====================================================
            CAPABILITY STRIP
        ==================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
            delay: 0.1,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          className="
            mt-10
            border-y
            border-white/10
            py-5
          "
        >

          <div
            className="
              grid
              gap-5
              sm:grid-cols-2
              lg:grid-cols-4
            "
          >

            {valueCards.map(
              (
                card,
                index
              ) => (

                <Capability
                  key={
                    card.number
                  }
                  card={
                    card
                  }
                  index={
                    index
                  }
                />

              )
            )}

          </div>

        </motion.div>


        {/* ====================================================
            BOTTOM STATEMENT
        ==================================================== */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          transition={{
            duration: 0.6,
            delay: 0.15,
          }}
          viewport={{
            once: true,
          }}
          className="
            mt-7
            flex
            flex-col
            gap-4
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >

          <div
            className="
              flex
              items-center
              gap-3
            "
          >

            <div
              className="
                h-px
                w-10
                bg-[#06B6D4]/50
              "
            />

            <p
              className="
                text-xs
                font-medium
                text-slate-500
              "
            >
              One connected system from first concept to real capability.
            </p>

          </div>


          <div
            className="
              flex
              items-center
              gap-2
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.16em]
              text-[#67E8F9]
            "
          >

            <span
              className="
                h-1.5
                w-1.5
                rounded-full
                bg-[#06B6D4]
              "
            />

            Learning engine active

          </div>

        </motion.div>

      </div>

    </section>

  );

}


// ============================================================
// SIGNAL
// ============================================================

function Signal({
  value,
  label,
}) {

  return (

    <div
      className="
        flex
        items-center
        gap-3
      "
    >

      <span
        className="
          text-[10px]
          font-medium
          tracking-[0.16em]
          text-[#06B6D4]
        "
      >
        {value}
      </span>


      <span
        className="
          text-xs
          font-medium
          text-slate-400
        "
      >
        {label}
      </span>

    </div>

  );

}


// ============================================================
// LEARNING SYSTEM
// ============================================================

function LearningSystem() {

  const nodes = [
    {
      label: "LEARN",
      detail: "Foundation",
      x: "9%",
      y: "70%",
      icon: <FaDatabase />,
    },

    {
      label: "PRACTICE",
      detail: "Application",
      x: "31%",
      y: "28%",
      icon: <FaCode />,
    },

    {
      label: "BUILD",
      detail: "Projects",
      x: "63%",
      y: "68%",
      icon: <FaProjectDiagram />,
    },

    {
      label: "MEASURE",
      detail: "Progress",
      x: "89%",
      y: "25%",
      icon: <FaChartLine />,
    },
  ];


  return (

    <motion.div
      initial={{
        opacity: 0,
        scale: 0.98,
      }}
      whileInView={{
        opacity: 1,
        scale: 1,
      }}
      transition={{
        duration: 0.7,
        delay: 0.08,
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      className="
        relative
        min-h-[360px]
        overflow-hidden
        rounded-[26px]
        border
        border-white/10
        bg-[#06152E]
        shadow-[0_30px_80px_rgba(0,0,0,0.22)]
        sm:min-h-[390px]
      "
    >

      {/* ==================================================
          SYSTEM HEADER
      ================================================== */}

      <div
        className="
          absolute
          left-5
          right-5
          top-5
          z-20
          flex
          items-center
          justify-between
        "
      >

        <div>

          <p
            className="
              text-[9px]
              font-semibold
              uppercase
              tracking-[0.2em]
              text-slate-500
            "
          >
            DATALATTICE SYSTEM
          </p>


          <p
            className="
              mt-1
              text-sm
              font-medium
              text-white
            "
          >
            Learning flow
          </p>

        </div>


        <div
          className="
            flex
            items-center
            gap-2
            rounded-full
            border
            border-[#06B6D4]/15
            bg-[#06B6D4]/[0.05]
            px-2.5
            py-1.5
          "
        >

          <span
            className="
              h-1.5
              w-1.5
              rounded-full
              bg-[#06B6D4]
              shadow-[0_0_8px_rgba(6,182,212,0.7)]
            "
          />

          <span
            className="
              text-[8px]
              font-semibold
              uppercase
              tracking-[0.12em]
              text-[#67E8F9]
            "
          >
            Active
          </span>

        </div>

      </div>


      {/* ==================================================
          TECHNICAL GRID
      ================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.055]
        "
        style={{
          backgroundImage:
            "linear-gradient(rgba(148,163,184,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.8) 1px, transparent 1px)",
          backgroundSize:
            "34px 34px",
        }}
      />


      {/* ==================================================
          SYSTEM ORBIT
      ================================================== */}

      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: "linear",
        }}
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[230px]
          w-[230px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          border
          border-dashed
          border-[#1463FF]/15
          sm:h-[260px]
          sm:w-[260px]
        "
      />


      <motion.div
        animate={{
          rotate: -360,
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear",
        }}
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[150px]
          w-[150px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          border
          border-[#06B6D4]/10
        "
      />


      {/* ==================================================
          FLOW SVG
      ================================================== */}

      <svg
        viewBox="0 0 800 420"
        preserveAspectRatio="none"
        className="
          absolute
          inset-0
          h-full
          w-full
        "
        fill="none"
      >

        <motion.path
          d="
            M70 300
            C130 290 155 170 250 150
            C340 130 370 300 465 285
            C555 270 610 125 720 105
          "
          stroke="url(#systemFlow)"
          strokeWidth="2"
          strokeDasharray="7 8"
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
            ease: "easeInOut",
          }}
          viewport={{
            once: true,
          }}
        />


        <motion.circle
          r="4"
          fill="#06B6D4"
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: [
              0,
              1,
              1,
              0,
            ],
          }}
          transition={{
            duration: 3.2,
            repeat: Infinity,
            ease: "linear",
          }}
        >

          <animateMotion
            dur="3.2s"
            repeatCount="indefinite"
            path="
              M70 300
              C130 290 155 170 250 150
              C340 130 370 300 465 285
              C555 270 610 125 720 105
            "
          />

        </motion.circle>


        <defs>

          <linearGradient
            id="systemFlow"
            x1="0"
            y1="0"
            x2="1"
            y2="0"
          >

            <stop
              offset="0%"
              stopColor="#06B6D4"
            />

            <stop
              offset="50%"
              stopColor="#1463FF"
            />

            <stop
              offset="100%"
              stopColor="#67E8F9"
            />

          </linearGradient>

        </defs>

      </svg>


      {/* ==================================================
          SYSTEM NODES
      ================================================== */}

      {nodes.map(
        (
          node,
          index
        ) => (

          <motion.div
            key={
              node.label
            }
            initial={{
              opacity: 0,
              scale: 0.8,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              delay:
                0.25 +
                index * 0.12,
              duration: 0.45,
            }}
            viewport={{
              once: true,
            }}
            className="
              absolute
              z-10
              -translate-x-1/2
              -translate-y-1/2
            "
            style={{
              left:
                node.x,
              top:
                node.y,
            }}
          >

            <motion.div
              animate={{
                y: [
                  0,
                  -4,
                  0,
                ],
              }}
              transition={{
                duration:
                  3 +
                  index *
                    0.35,
                repeat:
                  Infinity,
                ease:
                  "easeInOut",
              }}
              className="
                flex
                flex-col
                items-center
              "
            >

              <div
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-white/10
                  bg-[#0B1B3A]
                  text-[#67E8F9]
                  shadow-[0_0_25px_rgba(6,182,212,0.08)]
                  sm:h-12
                  sm:w-12
                "
              >

                {node.icon}

              </div>


              <div
                className="
                  mt-2
                  whitespace-nowrap
                  text-center
                "
              >

                <p
                  className="
                    text-[9px]
                    font-semibold
                    tracking-[0.1em]
                    text-white
                  "
                >
                  {node.label}
                </p>


                <p
                  className="
                    mt-0.5
                    text-[8px]
                    font-medium
                    text-slate-500
                  "
                >
                  {node.detail}
                </p>

              </div>

            </motion.div>

          </motion.div>

        )
      )}


      {/* ==================================================
          CENTRAL ENGINE
      ================================================== */}

      <div
        className="
          absolute
          left-1/2
          top-1/2
          z-20
          -translate-x-1/2
          -translate-y-1/2
        "
      >

        <motion.div
          animate={{
            scale: [
              1,
              1.05,
              1,
            ],
          }}
          transition={{
            duration: 2.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            relative
            flex
            h-20
            w-20
            items-center
            justify-center
            rounded-full
            border
            border-[#06B6D4]/25
            bg-[#0B1B3A]/95
            shadow-[0_0_45px_rgba(6,182,212,0.12)]
          "
        >

          <div
            className="
              absolute
              inset-2
              rounded-full
              border
              border-[#1463FF]/20
            "
          />


          <FaLightbulb
            className="
              relative
              z-10
              text-[#67E8F9]
            "
            size={21}
          />

        </motion.div>


        <div
          className="
            absolute
            left-1/2
            top-full
            mt-3
            -translate-x-1/2
            whitespace-nowrap
            text-center
          "
        >

          <p
            className="
              text-[9px]
              font-semibold
              uppercase
              tracking-[0.16em]
              text-[#67E8F9]
            "
          >
            Learning Engine
          </p>

        </div>

      </div>


      {/* ==================================================
          BOTTOM SYSTEM READOUT
      ================================================== */}

      <div
        className="
          absolute
          bottom-5
          left-5
          right-5
          flex
          items-center
          justify-between
          border-t
          border-white/10
          pt-3
        "
      >

        <span
          className="
            text-[8px]
            font-medium
            uppercase
            tracking-[0.16em]
            text-slate-600
          "
        >
          DATA → SKILL → CAPABILITY
        </span>


        <span
          className="
            text-[8px]
            font-medium
            text-slate-600
          "
        >
          DL-04
        </span>

      </div>

    </motion.div>

  );

}


// ============================================================
// CAPABILITY
// ============================================================

function Capability({
  card,
  index,
}) {

  return (

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
        duration: 0.4,
        delay:
          index * 0.06,
      }}
      viewport={{
        once: true,
      }}
      className="
        group
        relative
        flex
        min-h-[112px]
        items-start
        gap-4
        border-l
        border-white/10
        pl-4
        transition-colors
        duration-300
        hover:border-[#06B6D4]/40
      "
    >

      {/* ==================================================
          ICON
      ================================================== */}

      <div
        className="
          flex
          h-9
          w-9
          shrink-0
          items-center
          justify-center
          rounded-lg
          border
          border-white/10
          bg-white/[0.035]
          text-[#67E8F9]
          transition-all
          duration-300
          group-hover:border-[#06B6D4]/25
          group-hover:bg-[#06B6D4]/[0.06]
        "
      >

        {card.icon}

      </div>


      <div
        className="
          min-w-0
        "
      >

        <div
          className="
            flex
            items-center
            gap-2
          "
        >

          <span
            className="
              text-[8px]
              font-medium
              tracking-[0.14em]
              text-[#06B6D4]
            "
          >
            {card.number}
          </span>


          <span
            className="
              text-[8px]
              font-semibold
              uppercase
              tracking-[0.12em]
              text-slate-600
            "
          >
            {card.tag}
          </span>

        </div>


        <h3
          className="
            mt-2
            text-sm
            font-semibold
            text-white
          "
        >
          {card.title}
        </h3>


        <p
          className="
            mt-1.5
            text-xs
            leading-5
            text-slate-500
          "
        >
          {card.description}
        </p>

      </div>

    </motion.div>

  );

}


export default WhyDataWave;