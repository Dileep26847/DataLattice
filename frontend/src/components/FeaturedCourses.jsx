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

    accent:
      "#1463FF",

    accentSoft:
      "rgba(20,99,255,0.08)",

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

    accent:
      "#06B6D4",

    accentSoft:
      "rgba(6,182,212,0.08)",

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
      id="programs"
      className="
        relative
        overflow-hidden
        bg-[#F7FAFF]
        py-12
        sm:py-14
        lg:py-16
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

        {/* ==================================================
            TECHNICAL GRID
        ================================================== */}

        <div
          className="
            absolute
            inset-0
            opacity-[0.45]
          "
          style={{
            backgroundImage:
              "linear-gradient(rgba(20,99,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(20,99,255,0.045) 1px, transparent 1px)",
            backgroundSize:
              "54px 54px",
          }}
        />


        {/* ==================================================
            LEFT ATMOSPHERE
        ================================================== */}

        <motion.div
          animate={{
            x: [0, 25, 0],
            y: [0, -15, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            -left-48
            top-16
            h-[420px]
            w-[420px]
            rounded-full
            bg-blue-100/45
            blur-[120px]
          "
        />


        {/* ==================================================
            RIGHT ATMOSPHERE
        ================================================== */}

        <motion.div
          animate={{
            x: [0, -25, 0],
            y: [0, 18, 0],
            scale: [1, 1.07, 1],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            -right-44
            top-[30%]
            h-[460px]
            w-[460px]
            rounded-full
            bg-cyan-100/30
            blur-[120px]
          "
        />


        {/* ==================================================
            DATA FLOW
        ================================================== */}

        <svg
          className="
            absolute
            left-0
            top-[8%]
            h-[300px]
            w-full
            opacity-[0.55]
          "
          viewBox="0 0 1440 300"
          fill="none"
          preserveAspectRatio="none"
        >

          <path
            d="
              M-40 245
              C120 210 190 230 315 175
              C430 125 485 175 600 125
              C715 75 770 120 895 80
              C1020 40 1110 75 1220 38
              C1310 8 1370 28 1480 -10
            "
            stroke="#BFDBFE"
            strokeWidth="1.2"
            strokeLinecap="round"
          />


          <path
            d="
              M-40 265
              C120 230 190 250 315 195
              C430 145 485 195 600 145
              C715 95 770 140 895 100
              C1020 60 1110 95 1220 58
              C1310 28 1370 48 1480 10
            "
            stroke="#DFF6FF"
            strokeWidth="1"
            strokeDasharray="5 10"
            strokeLinecap="round"
          />

        </svg>


        {/* ==================================================
            DATA NODES
        ================================================== */}

        <span
          className="
            absolute
            left-[12%]
            top-[22%]
            h-1.5
            w-1.5
            rounded-full
            bg-[#1463FF]/45
            shadow-[0_0_0_6px_rgba(20,99,255,0.06)]
          "
        />


        <span
          className="
            absolute
            left-[31%]
            top-[16%]
            h-1.5
            w-1.5
            rounded-full
            bg-[#06B6D4]/45
            shadow-[0_0_0_6px_rgba(6,182,212,0.06)]
          "
        />


        <span
          className="
            absolute
            right-[34%]
            top-[25%]
            h-1.5
            w-1.5
            rounded-full
            bg-[#1463FF]/40
            shadow-[0_0_0_6px_rgba(20,99,255,0.05)]
          "
        />


        <span
          className="
            absolute
            right-[12%]
            top-[17%]
            h-1.5
            w-1.5
            rounded-full
            bg-[#06B6D4]/40
            shadow-[0_0_0_6px_rgba(6,182,212,0.05)]
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
            SECTION HEADER
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
            amount: 0.25,
          }}
          className="
            flex
            flex-col
            gap-5
            lg:flex-row
            lg:items-end
            lg:justify-between
          "
        >

          {/* ==================================================
              LEFT HEADER
          ================================================== */}

          <div
            className="
              max-w-2xl
            "
          >

            <div
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-blue-100
                bg-white
                px-3.5
                py-2
                text-[10px]
                font-semibold
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
                  rounded-full
                  bg-[#06B6D4]
                "
              />

              Focused Programs

            </div>


            <h2
              className="
                mt-5
                text-3xl
                font-semibold
                leading-[1.08]
                tracking-[-0.04em]
                text-[#0B1B3A]
                sm:text-4xl
                lg:text-[46px]
              "
            >

              Build skills that
              <span
                className="
                  text-[#1463FF]
                "
              >
                {" "}move with data.
              </span>

            </h2>


            <p
              className="
                mt-4
                max-w-xl
                text-sm
                leading-6
                text-slate-500
                sm:text-base
                sm:leading-7
              "
            >

              Two focused learning paths designed around practical
              tools, real projects and the skills modern data teams
              expect.

            </p>

          </div>


          {/* ==================================================
              RIGHT HEADER NOTE
          ================================================== */}

          <div
            className="
              hidden
              items-center
              gap-3
              rounded-2xl
              border
              border-slate-200
              bg-white
              px-4
              py-3
              shadow-sm
              lg:flex
            "
          >

            <div
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-xl
                bg-blue-50
                text-[#1463FF]
              "
            >

              <FaDatabase
                size={14}
              />

            </div>


            <div>

              <p
                className="
                  text-xs
                  font-semibold
                  text-[#0B1B3A]
                "
              >
                Practical by design
              </p>


              <p
                className="
                  mt-0.5
                  text-[10px]
                  text-slate-400
                "
              >
                Learn → build → apply

              </p>

            </div>

          </div>

        </motion.div>


        {/* ====================================================
            PROGRAMS
        ==================================================== */}

        <div
          className="
            mt-8
            grid
            gap-5
            lg:grid-cols-2
            lg:gap-6
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
            y: 12,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.15,
            duration: 0.5,
          }}
          viewport={{
            once: true,
          }}
          className="
            mt-5
            flex
            flex-col
            items-start
            justify-between
            gap-4
            rounded-2xl
            border
            border-slate-200
            bg-white
            px-5
            py-4
            shadow-sm
            sm:flex-row
            sm:items-center
            sm:px-6
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
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-cyan-50
                text-[#06B6D4]
              "
            >

              <FaChartBar
                size={14}
              />

            </div>


            <div>

              <p
                className="
                  text-sm
                  font-semibold
                  text-[#0B1B3A]
                "
              >
                Start with the path that fits your goal.
              </p>


              <p
                className="
                  mt-0.5
                  text-[11px]
                  leading-5
                  text-slate-400
                "
              >
                Explore the curriculum and choose your direction.

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
              rounded-full
              border
              border-blue-100
              bg-blue-50
              px-4
              py-2.5
              text-xs
              font-semibold
              text-[#1463FF]
              transition-all
              duration-300
              hover:border-blue-200
              hover:bg-[#1463FF]
              hover:text-white
            "
          >

            Explore programs

            <FaArrowRight
              size={10}
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
        y: 22,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        delay:
          index * 0.1,
        duration: 0.55,
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
        y: -4,
      }}
      className="
        group
        relative
        overflow-hidden
        rounded-[24px]
        border
        border-slate-200
        bg-white
        shadow-[0_14px_45px_rgba(11,27,58,0.06)]
        transition-shadow
        duration-500
        hover:shadow-[0_22px_60px_rgba(11,27,58,0.10)]
      "
    >

      {/* ====================================================
          ACCENT LINE
      ==================================================== */}

      <div
        className="
          h-[3px]
          w-full
        "
        style={{
          backgroundColor:
            program.accent,
        }}
      />


      <div
        className="
          p-5
          sm:p-6
          lg:p-7
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

            <p
              className="
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.2em]
                text-slate-400
              "
            >
              {program.eyebrow}
            </p>


            <h3
              className="
                mt-1.5
                text-2xl
                font-semibold
                tracking-[-0.035em]
                text-[#0B1B3A]
                sm:text-3xl
              "
            >
              {program.title}
            </h3>

          </div>


          {/* ==================================================
              ICON
          ================================================== */}

          <div
            className="
              flex
              h-11
              w-11
              shrink-0
              items-center
              justify-center
              rounded-xl
              border
              border-slate-100
              text-[#1463FF]
              transition-transform
              duration-300
              group-hover:scale-105
            "
            style={{
              backgroundColor:
                program.accentSoft,
              color:
                program.accent,
            }}
          >

            {program.icon}

          </div>

        </div>


        {/* ==================================================
            DESCRIPTION
        ================================================== */}

        <p
          className="
            mt-4
            max-w-xl
            text-sm
            leading-6
            text-slate-500
          "
        >
          {program.description}
        </p>


        {/* ==================================================
            DATA VISUALIZATION
        ================================================== */}

        <div
          className="
            relative
            mt-5
            overflow-hidden
            rounded-2xl
            border
            border-slate-200
            bg-[#F8FBFF]
            p-4
          "
        >

          <ProgramVisualization
            type={
              program.visualization
            }
          />

        </div>


        {/* ==================================================
            SKILLS
        ================================================== */}

        <div
          className="
            mt-5
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
                  y: 4,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay:
                    0.12 +
                    skillIndex *
                      0.04,
                  duration: 0.25,
                }}
                viewport={{
                  once: true,
                }}
                className="
                  rounded-full
                  border
                  border-slate-200
                  bg-slate-50
                  px-3
                  py-1.5
                  text-[10px]
                  font-medium
                  text-slate-600
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
            mt-6
            flex
            items-center
            justify-between
            gap-4
            border-t
            border-slate-100
            pt-5
          "
        >

          <div>

            <p
              className="
                text-[10px]
                font-medium
                uppercase
                tracking-[0.14em]
                text-slate-400
              "
            >
              Learning path
            </p>


            <p
              className="
                mt-1
                text-xs
                font-medium
                text-slate-500
              "
            >
              Explore the curriculum

            </p>

          </div>


          <motion.button
            type="button"
            whileHover={{
              x: 2,
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
              px-4
              py-2.5
              text-xs
              font-semibold
              text-white
              shadow-[0_8px_20px_rgba(20,99,255,0.16)]
              transition-all
              duration-300
              hover:bg-[#0B1B3A]
              hover:shadow-[0_10px_25px_rgba(11,27,58,0.16)]
              sm:px-5
            "
          >

            View Program

            <FaArrowRight
              size={10}
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
          SUBTLE HOVER LIGHT
      ==================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -right-20
          -top-20
          h-40
          w-40
          rounded-full
          bg-blue-100/40
          opacity-0
          blur-3xl
          transition-opacity
          duration-500
          group-hover:opacity-100
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
          h-36
          sm:h-40
        "
      >

        {/* ==================================================
            DATA NODES
        ================================================== */}

        <DataNode
          icon={
            <FaTable
              size={12}
            />
          }
          label="DATA"
          position="left-0 top-4"
          delay={0}
        />


        <DataNode
          icon={
            <FaPython
              size={12}
            />
          }
          label="PYTHON"
          position="left-[25%] top-[52%]"
          delay={0.15}
        />


        <DataNode
          icon={
            <FaProjectDiagram
              size={12}
            />
          }
          label="ML"
          position="left-[51%] top-3"
          delay={0.3}
        />


        <DataNode
          icon={
            <FaChartLine
              size={12}
            />
          }
          label="INSIGHT"
          position="right-0 top-[52%]"
          delay={0.45}
        />


        {/* ==================================================
            CONNECTIONS
        ================================================== */}

        <AnimatedConnection
          className="
            left-[12%]
            top-[38%]
            w-[19%]
            rotate-[18deg]
          "
          delay={0}
        />


        <AnimatedConnection
          className="
            left-[38%]
            top-[40%]
            w-[19%]
            -rotate-[18deg]
          "
          delay={0.18}
        />


        <AnimatedConnection
          className="
            left-[63%]
            top-[40%]
            w-[19%]
            rotate-[18deg]
          "
          delay={0.36}
        />


        {/* ==================================================
            MOVING DATA PULSE
        ================================================== */}

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
            top-[39%]
            h-1.5
            w-1.5
            rounded-full
            bg-[#06B6D4]
            shadow-[0_0_10px_rgba(6,182,212,0.65)]
          "
        />


        {/* ==================================================
            MINI CHART
        ================================================== */}

        <div
          className="
            absolute
            bottom-0
            left-0
            right-0
            flex
            h-6
            items-end
            gap-1
            opacity-70
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
                    0.05,
                  duration:
                    0.45,
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


  // ==========================================================
  // DATA ANALYTICS VISUALIZATION
  // ==========================================================

  return (

    <div
      className="
        relative
        h-36
        sm:h-40
      "
    >

      {/* ==================================================
          SQL PANEL
      ================================================== */}

      <div
        className="
          absolute
          left-0
          top-1
          h-32
          w-[46%]
          rounded-xl
          border
          border-slate-200
          bg-white
          p-3
          shadow-sm
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
              text-[8px]
              font-semibold
              uppercase
              tracking-[0.12em]
              text-slate-400
            "
          >
            SQL DATA
          </span>


          <FaDatabase
            size={10}
            className="
              text-[#06B6D4]
            "
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
                    0.08,
                  duration:
                    0.65,
                  ease:
                    "easeOut",
                }}
                viewport={{
                  once: true,
                }}
                className="
                  h-1.5
                  rounded-full
                  bg-gradient-to-r
                  from-[#1463FF]
                  to-[#06B6D4]
                "
              />

            )
          )}

        </div>

      </div>


      {/* ==================================================
          INSIGHTS CHART
      ================================================== */}

      <div
        className="
          absolute
          right-0
          top-1
          h-32
          w-[48%]
          rounded-xl
          border
          border-slate-200
          bg-white
          p-3
          shadow-sm
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
              text-[8px]
              font-semibold
              uppercase
              tracking-[0.12em]
              text-slate-400
            "
          >
            INSIGHTS
          </span>


          <FaChartBar
            size={10}
            className="
              text-[#1463FF]
            "
          />

        </div>


        <div
          className="
            relative
            mt-2
            h-20
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
              stroke="#1463FF"
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={{
                pathLength: 0,
              }}
              whileInView={{
                pathLength: 1,
              }}
              transition={{
                duration: 1.7,
                ease: "easeInOut",
              }}
              viewport={{
                once: true,
              }}
            />


            <motion.path
              d="
                M5 78
                C35 72,
                60 74,
                88 66
                S125 68,
                150 55
                S190 52,
                215 44
              "
              stroke="#DCE7F7"
              strokeWidth="1"
              strokeDasharray="4 6"
              strokeLinecap="round"
              initial={{
                pathLength: 0,
              }}
              whileInView={{
                pathLength: 1,
              }}
              transition={{
                delay: 0.15,
                duration: 1.4,
              }}
              viewport={{
                once: true,
              }}
            />

          </svg>


          {/* ==================================================
              MOVING POINT
          ================================================== */}

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
              h-1.5
              w-1.5
              rounded-full
              bg-[#06B6D4]
              shadow-[0_0_10px_rgba(6,182,212,0.65)]
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
            0.7,
            0.25,
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
          top-[46%]
          h-9
          w-9
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          border
          border-[#06B6D4]/30
          bg-cyan-50
        "
      >

        <div
          className="
            absolute
            inset-2
            rounded-full
            bg-[#06B6D4]/15
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
            1.4,
            0.8,
          ],
          opacity: [
            0.25,
            0.8,
            0.25,
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
          top-[46%]
          h-1.5
          w-1.5
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-[#1463FF]
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
        scale: 0.9,
      }}
      whileInView={{
        opacity: 1,
        scale: 1,
      }}
      transition={{
        delay,
        duration: 0.4,
      }}
      viewport={{
        once: true,
      }}
      animate={{
        y: [
          0,
          -3,
          0,
        ],
      }}
      className={`
        absolute
        ${position}
        z-10
        flex
        items-center
        gap-1.5
        rounded-lg
        border
        border-slate-200
        bg-white
        px-2
        py-1.5
        shadow-sm
      `}
    >

      <span
        className="
          flex
          h-5
          w-5
          items-center
          justify-center
          rounded-md
          bg-blue-50
          text-[#1463FF]
        "
      >
        {icon}
      </span>


      <span
        className="
          text-[8px]
          font-semibold
          tracking-[0.06em]
          text-slate-500
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
        duration: 0.6,
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
        border-[#1463FF]/25
        ${className}
      `}
    />

  );

}


export default FeaturedCourses;