import {
  motion,
} from "framer-motion";

import {
  FaArrowRight,
  FaChartBar,
  FaChartLine,
  FaDatabase,
  FaProjectDiagram,
  FaPython,
  FaTable,
} from "react-icons/fa";

import {
  useNavigate,
} from "react-router-dom";


// ============================================================
// DATALATTICE PUBLIC PROGRAMS
// ============================================================

const programs = [

  {
    id: "data-science",

    eyebrow: "PROGRAM 01",

    title: "Data Science",

    description:
      "Build a strong foundation in Python, statistics, machine learning and practical data science through project-based learning.",

    icon: (
      <FaProjectDiagram
        size={22}
      />
    ),

    gradient:
      "from-[#1463FF] via-[#1687F8] to-[#06B6D4]",

    cardBackground:
      "from-[#DCEBFF] via-[#E7F6FF] to-[#D8F8FA]",

    accent:
      "text-[#1463FF]",

    iconBackground:
      "bg-white/70",

    visualizationBackground:
      "bg-white/45",

    skills: [
      "Python",
      "Statistics",
      "Machine Learning",
      "Real Projects",
    ],

    visualization: "science",

  },


  {
    id: "data-analytics",

    eyebrow: "PROGRAM 02",

    title: "Data Analytics",

    description:
      "Learn how to transform business data into useful insights using SQL, dashboards, visualization and analytical thinking.",

    icon: (
      <FaChartLine
        size={22}
      />
    ),

    gradient:
      "from-[#06B6D4] via-[#1599E8] to-[#1463FF]",

    cardBackground:
      "from-[#D8F8FA] via-[#E5F4FF] to-[#DCEBFF]",

    accent:
      "text-[#06B6D4]",

    iconBackground:
      "bg-white/70",

    visualizationBackground:
      "bg-white/45",

    skills: [
      "SQL",
      "Data Visualization",
      "Power BI",
      "Business Insights",
    ],

    visualization: "analytics",

  },

];


// ============================================================
// FEATURED COURSES
// ============================================================

function FeaturedCourses() {

  const navigate =
    useNavigate();


  // ==========================================================
  // VIEW PROGRAM
  // ==========================================================

  const handleViewProgram = () => {

    navigate(
      "/courses"
    );

  };


  // ==========================================================
  // RENDER
  // ==========================================================

  return (

    <section
      className="
        relative
        overflow-hidden
        bg-[#F5F9FF]
        py-20
        sm:py-24
        lg:py-28
      "
    >

      {/* ======================================================
          BACKGROUND DATA SYSTEM
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

        {/* Technical grid */}

        <div
          className="
            absolute
            inset-0
            opacity-[0.035]
          "
          style={{
            backgroundImage:
              "linear-gradient(rgba(20,99,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(20,99,255,0.8) 1px, transparent 1px)",
            backgroundSize:
              "52px 52px",
          }}
        />


        {/* Left blue atmosphere */}

        <motion.div
          animate={{
            x: [0, 35, 0],
            y: [0, -15, 0],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            -left-40
            top-20
            h-[420px]
            w-[420px]
            rounded-full
            bg-[#1463FF]/[0.045]
            blur-[110px]
          "
        />


        {/* Right cyan atmosphere */}

        <motion.div
          animate={{
            x: [0, -35, 0],
            y: [0, 25, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            right-[-120px]
            top-[30%]
            h-[480px]
            w-[480px]
            rounded-full
            bg-[#06B6D4]/[0.04]
            blur-[120px]
          "
        />


        {/* ==================================================
            TECHNICAL DATA LINE
        ================================================== */}

        <svg
          className="
            absolute
            inset-x-0
            top-0
            h-52
            w-full
            opacity-60
          "
          viewBox="0 0 1440 200"
          preserveAspectRatio="none"
        >

          <path
            d="
              M0 128
              C110 112 180 145 280 120
              C390 92 450 120 555 106
              C670 91 730 116 825 94
              C945 68 1010 104 1100 88
              C1210 68 1290 91 1440 62
            "
            fill="none"
            stroke="#1463FF"
            strokeOpacity="0.10"
            strokeWidth="1"
          />


          <path
            d="
              M0 141
              C110 125 180 158 280 133
              C390 105 450 133 555 119
              C670 104 730 129 825 107
              C945 81 1010 117 1100 101
              C1210 81 1290 104 1440 75
            "
            fill="none"
            stroke="#06B6D4"
            strokeOpacity="0.08"
            strokeWidth="1"
            strokeDasharray="4 9"
          />

        </svg>


        {/* Data nodes */}

        <span
          className="
            absolute
            left-[18%]
            top-[15%]
            h-1.5
            w-1.5
            rounded-full
            bg-[#1463FF]/45
            shadow-[0_0_0_5px_rgba(20,99,255,0.05)]
          "
        />


        <span
          className="
            absolute
            left-[39%]
            top-[10%]
            h-1.5
            w-1.5
            rounded-full
            bg-[#06B6D4]/45
            shadow-[0_0_0_5px_rgba(6,182,212,0.05)]
          "
        />


        <span
          className="
            absolute
            right-[20%]
            top-[18%]
            h-1.5
            w-1.5
            rounded-full
            bg-[#1463FF]/40
            shadow-[0_0_0_5px_rgba(20,99,255,0.05)]
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
          max-w-7xl
          px-5
          sm:px-8
          lg:px-10
          xl:px-12
        "
      >

        {/* ====================================================
            SECTION HEADER
        ==================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.65,
          }}
          viewport={{
            once: true,
            amount: 0.25,
          }}
          className="
            mx-auto
            max-w-3xl
            text-center
          "
        >

          {/* Eyebrow */}

          <div
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-[#1463FF]/10
              bg-white
              px-4
              py-2
              text-xs
              font-bold
              uppercase
              tracking-[0.18em]
              text-[#1463FF]
              shadow-sm
            "
          >

            <span
              className="
                h-1.5
                w-1.5
                animate-pulse
                rounded-full
                bg-[#1463FF]
              "
            />

            Focused Programs

          </div>


          {/* Heading */}

          <h2
            className="
              mt-6
              text-4xl
              font-black
              leading-tight
              tracking-[-0.04em]
              text-[#0B1B3A]
              sm:text-5xl
              lg:text-6xl
            "
          >

            Choose Your{" "}

            <span
              className="
                bg-gradient-to-r
                from-[#1463FF]
                to-[#06B6D4]
                bg-clip-text
                text-transparent
              "
            >
              Data Path
            </span>

          </h2>


          {/* Description */}

          <p
            className="
              mx-auto
              mt-5
              max-w-2xl
              text-base
              leading-7
              text-[#64748B]
              sm:text-lg
              sm:leading-8
            "
          >

            Two focused programs.
            Practical skills.
            Real projects.
            One clear direction toward becoming confident with data.

          </p>

        </motion.div>


        {/* ====================================================
            PROGRAMS
        ==================================================== */}

        <div
          className="
            mt-12
            grid
            gap-7
            lg:grid-cols-2
            lg:gap-8
          "
        >

          {programs.map(
            (
              program,
              index
            ) => (

              <ProgramCard
                key={
                  program.id
                }
                program={
                  program
                }
                index={
                  index
                }
                onView={
                  handleViewProgram
                }
              />

            )
          )}

        </div>


        {/* ====================================================
            BOTTOM MESSAGE
        ==================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 15,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.2,
            duration: 0.55,
          }}
          viewport={{
            once: true,
          }}
          className="
            mt-9
            flex
            flex-col
            items-center
            justify-between
            gap-5
            rounded-2xl
            border
            border-[#E6EDF7]
            bg-white
            px-6
            py-5
            shadow-[0_12px_35px_rgba(11,27,58,0.05)]
            sm:flex-row
            sm:px-7
          "
        >

          <div
            className="
              flex
              items-center
              gap-3
              text-center
              sm:text-left
            "
          >

            <div
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-[#EAF2FF]
                text-[#1463FF]
              "
            >

              <FaDatabase
                size={15}
              />

            </div>


            <div>

              <p
                className="
                  text-sm
                  font-bold
                  text-[#0B1B3A]
                "
              >
                Built around practical data skills
              </p>


              <p
                className="
                  mt-0.5
                  text-xs
                  text-[#64748B]
                "
              >
                Learn the tools, concepts and workflows used in real data work.
              </p>

            </div>

          </div>


          <button
            type="button"
            onClick={
              handleViewProgram
            }
            className="
              group
              inline-flex
              shrink-0
              items-center
              gap-2
              text-sm
              font-bold
              text-[#1463FF]
              transition-colors
              hover:text-[#0B1B3A]
            "
          >

            Explore programs

            <FaArrowRight
              size={12}
              className="
                transition-transform
                duration-200
                group-hover:translate-x-1
              "
            />

          </button>

        </motion.div>

      </div>

    </section>

  );

}


// ============================================================
// PROGRAM CARD
// ============================================================

function ProgramCard({
  program,
  index,
  onView,
}) {

  return (

    <motion.article
      initial={{
        opacity: 0,
        y: 35,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        delay:
          index * 0.12,
        duration: 0.65,
        ease: [
          0.22,
          1,
          0.36,
          1,
        ],
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      whileHover={{
        y: -7,
      }}
      className="
        group
        relative
        overflow-hidden
        rounded-[30px]
        border
        border-[#1463FF]/15
        bg-white
        shadow-[0_20px_60px_rgba(11,27,58,0.09)]
        transition-all
        duration-500
        hover:border-[#1463FF]/25
        hover:shadow-[0_28px_75px_rgba(20,99,255,0.16)]
      "
    >

      {/* ====================================================
          MAIN COLOR BACKGROUND
      ==================================================== */}

      <div
        className={`
          pointer-events-none
          absolute
          inset-0
          bg-gradient-to-br
          ${program.cardBackground}
        `}
      />


      {/* ====================================================
          SOFT ANIMATED COLOR WASH
      ==================================================== */}

      <motion.div
        animate={{
          x: [
            "-15%",
            "15%",
            "-15%",
          ],
          y: [
            "-8%",
            "8%",
            "-8%",
          ],
          scale: [
            1,
            1.12,
            1,
          ],
          opacity: [
            0.20,
            0.32,
            0.20,
          ],
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          pointer-events-none
          absolute
          -left-24
          -top-24
          h-[360px]
          w-[360px]
          rounded-full
          bg-[#1463FF]/30
          blur-[90px]
        "
      />


      <motion.div
        animate={{
          x: [
            "10%",
            "-15%",
            "10%",
          ],
          y: [
            "10%",
            "-10%",
            "10%",
          ],
          scale: [
            1,
            1.15,
            1,
          ],
          opacity: [
            0.16,
            0.28,
            0.16,
          ],
        }}
        transition={{
          duration: 13,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          pointer-events-none
          absolute
          -bottom-28
          -right-20
          h-[380px]
          w-[380px]
          rounded-full
          bg-[#06B6D4]/25
          blur-[100px]
        "
      />


      {/* ====================================================
          SOFT CENTER LIGHT
      ==================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[280px]
          w-[280px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-white/25
          blur-[90px]
        "
      />


      {/* ====================================================
          SUBTLE CARD GRID
      ==================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.25]
        "
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(rgba(20,99,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(20,99,255,0.08) 1px, transparent 1px)",
          backgroundSize:
            "44px 44px",
        }}
      />


      {/* ====================================================
          SLOW MOVING DATA GLOW
      ==================================================== */}

      <motion.div
        animate={{
          x: [
            "-120%",
            "120%",
          ],
          opacity: [
            0,
            0.55,
            0,
          ],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "linear",
        }}
        className="
          pointer-events-none
          absolute
          left-0
          top-[28%]
          h-px
          w-1/2
          bg-gradient-to-r
          from-transparent
          via-[#06B6D4]/45
          to-transparent
          blur-[1px]
        "
      />


      <motion.div
        animate={{
          x: [
            "120%",
            "-120%",
          ],
          opacity: [
            0,
            0.35,
            0,
          ],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "linear",
          delay: 2,
        }}
        className="
          pointer-events-none
          absolute
          right-0
          top-[72%]
          h-px
          w-1/3
          bg-gradient-to-r
          from-transparent
          via-[#1463FF]/40
          to-transparent
          blur-[1px]
        "
      />


      {/* ====================================================
          TOP COLOR BAR
      ==================================================== */}

      <div
        className={`
          relative
          z-20
          h-1.5
          w-full
          bg-gradient-to-r
          ${program.gradient}
        `}
      />


      {/* ====================================================
          CONTENT
      ==================================================== */}

      <div
        className="
          relative
          z-10
          p-6
          sm:p-8
          lg:p-9
        "
      >

        {/* ==================================================
            HEADER
        ================================================== */}

        <div
          className="
            flex
            items-start
            justify-between
            gap-5
          "
        >

          <div>

            <div
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-[#1463FF]/10
                bg-white/60
                px-3
                py-1.5
                shadow-sm
                backdrop-blur-sm
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

              <p
                className="
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.2em]
                  text-[#1463FF]
                "
              >
                {program.eyebrow}
              </p>

            </div>


            <h3
              className="
                mt-3
                text-3xl
                font-bold
                tracking-[-0.035em]
                text-[#0B1B3A]
                sm:text-4xl
              "
            >
              {program.title}
            </h3>

          </div>


          {/* Program icon */}

          <motion.div
            animate={{
              y: [
                0,
                -4,
                0,
              ],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className={`
              relative
              flex
              h-14
              w-14
              shrink-0
              items-center
              justify-center
              rounded-2xl
              ${program.iconBackground}
              ${program.accent}
              border
              border-white/80
              shadow-[0_10px_25px_rgba(20,99,255,0.12)]
              backdrop-blur-sm
              transition-all
              duration-300
              group-hover:scale-105
              group-hover:-rotate-2
            `}
          >

            <span
              className="
                absolute
                inset-1
                rounded-xl
                border
                border-[#1463FF]/5
              "
            />

            {program.icon}

          </motion.div>

        </div>


        {/* ==================================================
            DESCRIPTION
        ================================================== */}

        <p
          className="
            mt-5
            max-w-xl
            text-sm
            leading-7
            text-[#475569]
            sm:text-base
          "
        >
          {program.description}
        </p>


        {/* ==================================================
            DATA VISUALIZATION
        ================================================== */}

        <div
          className={`
            relative
            mt-7
            overflow-hidden
            rounded-2xl
            border
            border-white/80
            ${program.visualizationBackground}
            p-4
            shadow-[0_10px_30px_rgba(11,27,58,0.06)]
            backdrop-blur-sm
            sm:p-5
          `}
        >

          {/* Visualization grid */}

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              opacity-60
            "
            aria-hidden="true"
            style={{
              backgroundImage:
                "linear-gradient(rgba(20,99,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(20,99,255,0.06) 1px, transparent 1px)",
              backgroundSize:
                "30px 30px",
            }}
          />


          {/* Animated scanning line */}

          <motion.div
            animate={{
              x: [
                "-100%",
                "100%",
              ],
              opacity: [
                0,
                0.7,
                0,
              ],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear",
            }}
            className="
              pointer-events-none
              absolute
              left-0
              top-0
              h-full
              w-1/3
              bg-gradient-to-r
              from-transparent
              via-[#06B6D4]/10
              to-transparent
              blur-sm
            "
          />


          <div
            className="
              relative
              z-10
            "
          >

            <ProgramVisualization
              type={
                program.visualization
              }
            />

          </div>

        </div>


        {/* ==================================================
            SKILLS
        ================================================== */}

        <div
          className="
            mt-6
            flex
            flex-wrap
            gap-2
          "
        >

          {program.skills.map(
            (
              skill,
              skillIndex
            ) => (

              <motion.span
                key={
                  skill
                }
                initial={{
                  opacity: 0,
                  y: 5,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay:
                    0.15 +
                    skillIndex *
                      0.05,
                  duration: 0.3,
                }}
                viewport={{
                  once: true,
                }}
                className="
                  rounded-full
                  border
                  border-white/80
                  bg-white/55
                  px-3
                  py-1.5
                  text-[11px]
                  font-semibold
                  text-[#475569]
                  shadow-sm
                  backdrop-blur-sm
                  transition-all
                  duration-200
                  hover:border-[#1463FF]/20
                  hover:bg-white/80
                  hover:text-[#1463FF]
                "
              >
                {skill}
              </motion.span>

            )
          )}

        </div>


        {/* ==================================================
            ACTION
        ================================================== */}

        <div
          className="
            mt-8
            flex
            items-center
            justify-between
            gap-4
            border-t
            border-[#1463FF]/10
            pt-6
          "
        >

          <div>

            <p
              className="
                text-xs
                font-semibold
                text-[#64748B]
              "
            >
              Learning path
            </p>


            <p
              className="
                mt-1
                text-sm
                font-semibold
                text-[#0B1B3A]
              "
            >
              Explore the curriculum
            </p>

          </div>


          <motion.button
            type="button"
            whileHover={{
              x: 3,
              scale: 1.02,
            }}
            whileTap={{
              scale: 0.97,
            }}
            onClick={
              onView
            }
            className="
              group/button
              inline-flex
              items-center
              gap-2
              rounded-full
              bg-[#1463FF]
              px-5
              py-3
              text-xs
              font-bold
              text-white
              shadow-[0_10px_25px_rgba(20,99,255,0.25)]
              transition-all
              duration-300
              hover:bg-[#0B1B3A]
              hover:shadow-[0_12px_30px_rgba(11,27,58,0.18)]
              sm:px-6
              sm:text-sm
            "
          >

            View Program

            <FaArrowRight
              size={11}
              className="
                transition-transform
                duration-200
                group-hover/button:translate-x-1
              "
            />

          </motion.button>

        </div>

      </div>


      {/* ====================================================
          FLOATING DATA POINTS
      ==================================================== */}

      <motion.span
        animate={{
          y: [
            0,
            -10,
            0,
          ],
          opacity: [
            0.35,
            0.8,
            0.35,
          ],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          pointer-events-none
          absolute
          right-[24%]
          top-[23%]
          z-20
          h-2
          w-2
          rounded-full
          bg-[#06B6D4]
          shadow-[0_0_14px_rgba(6,182,212,0.6)]
        "
      />


      <motion.span
        animate={{
          y: [
            0,
            8,
            0,
          ],
          opacity: [
            0.25,
            0.7,
            0.25,
          ],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          pointer-events-none
          absolute
          bottom-[27%]
          left-[13%]
          z-20
          h-1.5
          w-1.5
          rounded-full
          bg-[#1463FF]
          shadow-[0_0_12px_rgba(20,99,255,0.5)]
        "
      />

    </motion.article>

  );

}


// ============================================================
// PROGRAM VISUALIZATION
// ============================================================

function ProgramVisualization({
  type,
}) {

  if (
    type ===
    "science"
  ) {

    return (

      <div
        className="
          relative
          h-44
          sm:h-48
        "
      >

        {/* Data nodes */}

        <DataNode
          icon={
            <FaTable
              size={13}
            />
          }
          label="DATA"
          position="left-1 top-5"
          delay={0}
        />


        <DataNode
          icon={
            <FaPython
              size={13}
            />
          }
          label="PYTHON"
          position="left-[25%] top-[55%]"
          delay={0.2}
        />


        <DataNode
          icon={
            <FaProjectDiagram
              size={13}
            />
          }
          label="ML"
          position="left-[51%] top-4"
          delay={0.4}
        />


        <DataNode
          icon={
            <FaChartLine
              size={13}
            />
          }
          label="INSIGHT"
          position="right-0 top-[55%]"
          delay={0.6}
        />


        {/* Connecting path */}

        <AnimatedConnection
          className="
            left-[13%]
            top-[39%]
            w-[20%]
            rotate-[18deg]
          "
          delay={0}
        />


        <AnimatedConnection
          className="
            left-[38%]
            top-[42%]
            w-[20%]
            -rotate-[18deg]
          "
          delay={0.25}
        />


        <AnimatedConnection
          className="
            left-[63%]
            top-[42%]
            w-[19%]
            rotate-[18deg]
          "
          delay={0.5}
        />


        {/* Moving data pulse */}

        <motion.div
          animate={{
            x: [
              "0%",
              "100%",
            ],
            opacity: [
              0,
              1,
              1,
              0,
            ],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "linear",
          }}
          className="
            absolute
            left-[12%]
            top-[40%]
            h-1.5
            w-1.5
            rounded-full
            bg-[#06B6D4]
            shadow-[0_0_12px_rgba(6,182,212,0.9)]
          "
        />


        {/* Mini chart */}

        <div
          className="
            absolute
            bottom-0
            left-0
            right-0
            flex
            h-7
            items-end
            gap-1
            opacity-80
          "
        >

          {[
            25,
            38,
            31,
            52,
            46,
            67,
            58,
            78,
            70,
            92,
          ].map(
            (
              height,
              index
            ) => (

              <motion.div
                key={
                  index
                }
                initial={{
                  height: 0,
                }}
                whileInView={{
                  height:
                    `${height}%`,
                }}
                transition={{
                  delay:
                    index *
                    0.06,
                  duration:
                    0.5,
                  ease:
                    "easeOut",
                }}
                viewport={{
                  once: true,
                }}
                className="
                  flex-1
                  rounded-t
                  bg-gradient-to-t
                  from-[#1463FF]
                  to-[#06B6D4]
                "
              />

            )
          )}

        </div>

      </div>

    );

  }


  return (

    <div
      className="
        relative
        h-44
        sm:h-48
      "
    >

      {/* ==================================================
          SQL DATA PANEL
      ================================================== */}

      <div
        className="
          absolute
          left-0
          top-2
          h-36
          w-[46%]
          rounded-2xl
          border
          border-[#CFE2F2]
          bg-white/65
          p-3
          shadow-[0_8px_25px_rgba(11,27,58,0.06)]
          backdrop-blur-sm
        "
      >

        <div
          className="
            flex
            items-center
            justify-between
          "
        >

          <span
            className="
              text-[9px]
              font-bold
              uppercase
              tracking-wider
              text-[#64748B]
            "
          >
            SQL DATA
          </span>


          <FaDatabase
            size={11}
            className="text-[#06B6D4]"
          />

        </div>


        <div
          className="
            mt-4
            space-y-2
          "
        >

          {[70, 48, 84, 62].map(
            (
              width,
              index
            ) => (

              <motion.div
                key={
                  index
                }
                initial={{
                  width: 0,
                }}
                whileInView={{
                  width:
                    `${width}%`,
                }}
                transition={{
                  delay:
                    index *
                    0.1,
                  duration:
                    0.7,
                  ease:
                    "easeOut",
                }}
                viewport={{
                  once: true,
                }}
                className="
                  h-2
                  rounded-full
                  bg-gradient-to-r
                  from-[#06B6D4]
                  to-[#1463FF]
                "
              />

            )
          )}

        </div>

      </div>


      {/* ==================================================
          CHART PANEL
      ================================================== */}

      <div
        className="
          absolute
          right-0
          top-2
          h-36
          w-[48%]
          rounded-2xl
          border
          border-[#CFE2F2]
          bg-white/65
          p-3
          shadow-[0_8px_25px_rgba(11,27,58,0.06)]
          backdrop-blur-sm
        "
      >

        <div
          className="
            flex
            items-center
            justify-between
          "
        >

          <span
            className="
              text-[9px]
              font-bold
              uppercase
              tracking-wider
              text-[#64748B]
            "
          >
            INSIGHTS
          </span>


          <FaChartBar
            size={11}
            className="text-[#1463FF]"
          />

        </div>


        <div
          className="
            relative
            mt-3
            h-24
          "
        >

          <svg
            viewBox="0 0 220 90"
            className="
              h-full
              w-full
              overflow-visible
            "
            fill="none"
          >

            {/* Light reference line */}

            <path
              d="
                M5 78
                C30 70,
                35 76,
                58 65
                S88 60,
                105 55
                S135 57,
                150 45
                S180 48,
                215 30
              "
              stroke="#D9E6F7"
              strokeWidth="2"
              strokeLinecap="round"
            />


            {/* Main analytics line */}

            <motion.path
              d="
                M5 72
                C30 64,
                35 70,
                58 55
                S88 50,
                105 43
                S135 48,
                150 30
                S180 35,
                215 12
              "
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              className="
                text-[#1463FF]
              "
              initial={{
                pathLength: 0,
              }}
              whileInView={{
                pathLength: 1,
              }}
              transition={{
                duration: 1.8,
                ease: "easeInOut",
              }}
              viewport={{
                once: true,
              }}
            />

          </svg>


          {/* Moving point */}

          <motion.div
            animate={{
              x: [
                "5%",
                "92%",
              ],
              y: [
                "70%",
                "10%",
              ],
              opacity: [
                0,
                1,
                1,
                0,
              ],
            }}
            transition={{
              duration: 2.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              absolute
              left-0
              top-0
              h-2
              w-2
              rounded-full
              bg-[#06B6D4]
              shadow-[0_0_14px_rgba(6,182,212,0.8)]
            "
          />

        </div>

      </div>


      {/* ==================================================
          CENTER CONNECTOR
      ================================================== */}

      <motion.div
        animate={{
          opacity: [
            0.25,
            0.8,
            0.25,
          ],
          scale: [
            0.95,
            1.05,
            0.95,
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          left-1/2
          top-[48%]
          h-10
          w-10
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          border
          border-[#1463FF]/25
          bg-[#1463FF]/[0.06]
          shadow-[0_0_25px_rgba(20,99,255,0.10)]
        "
      >

        <div
          className="
            absolute
            inset-2
            rounded-full
            bg-[#06B6D4]/20
          "
        />

      </motion.div>


      {/* ==================================================
          DATA PULSE
      ================================================== */}

      <motion.div
        animate={{
          scale: [
            0.8,
            1.5,
            0.8,
          ],
          opacity: [
            0.2,
            0.8,
            0.2,
          ],
        }}
        transition={{
          duration: 2.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          left-1/2
          top-[48%]
          h-2
          w-2
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-[#06B6D4]
          shadow-[0_0_10px_rgba(6,182,212,0.7)]
        "
      />

    </div>

  );

}


// ============================================================
// DATA NODE
// ============================================================

function DataNode({
  icon,
  label,
  position,
  delay,
}) {

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
        delay,
        duration: 0.45,
      }}
      viewport={{
        once: true,
      }}
      animate={{
        y: [
          0,
          -4,
          0,
        ],
      }}
      className={`
        absolute
        ${position}
        z-10
        flex
        items-center
        gap-2
        rounded-xl
        border
        border-[#CFE2F2]
        bg-white/75
        px-2.5
        py-2
        shadow-[0_6px_18px_rgba(11,27,58,0.07)]
        backdrop-blur-sm
      `}
    >

      <span
        className="
          flex
          h-6
          w-6
          items-center
          justify-center
          rounded-lg
          bg-[#EAF2FF]
          text-[#1463FF]
        "
      >
        {icon}
      </span>


      <span
        className="
          text-[9px]
          font-bold
          tracking-[0.08em]
          text-[#64748B]
        "
      >
        {label}
      </span>

    </motion.div>

  );

}


// ============================================================
// ANIMATED CONNECTION
// ============================================================

function AnimatedConnection({
  className,
  delay = 0,
}) {

  return (

    <motion.div
      initial={{
        scaleX: 0,
        opacity: 0,
      }}
      whileInView={{
        scaleX: 1,
        opacity: 1,
      }}
      transition={{
        delay,
        duration: 0.7,
        ease: "easeOut",
      }}
      viewport={{
        once: true,
      }}
      className={`
        absolute
        z-0
        h-px
        origin-left
        border-t
        border-dashed
        border-[#1463FF]/30
        ${className}
      `}
    />

  );

}


export default FeaturedCourses;