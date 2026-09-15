import { motion } from "framer-motion";

import {
  FaArrowRight,
  FaBriefcase,
  FaChartLine,
  FaCheck,
  FaCode,
  FaDatabase,
  FaGraduationCap,
  FaProjectDiagram,
  FaPlay,
  FaBolt,
  FaLayerGroup,
} from "react-icons/fa";


// ============================================================
// DATALATTICE LEARNING JOURNEY
// ============================================================

const journeySteps = [
  {
    number: "01",
    title: "Choose your program",
    shortTitle: "Choose",
    description:
      "Start with the data discipline that matches the direction you want to develop.",
    icon: <FaGraduationCap />,
    signal: "DIRECTION",
  },

  {
    number: "02",
    title: "Learn the foundations",
    shortTitle: "Learn",
    description:
      "Build your understanding through structured lessons, concepts and guided learning.",
    icon: <FaDatabase />,
    signal: "FOUNDATION",
  },

  {
    number: "03",
    title: "Practice the skills",
    shortTitle: "Practice",
    description:
      "Apply what you learn through exercises and practical problem-solving activities.",
    icon: <FaCode />,
    signal: "APPLICATION",
  },

  {
    number: "04",
    title: "Build projects",
    shortTitle: "Build",
    description:
      "Bring multiple skills together through project-oriented work and real-world scenarios.",
    icon: <FaProjectDiagram />,
    signal: "CAPABILITY",
  },

  {
    number: "05",
    title: "Develop your career",
    shortTitle: "Career",
    description:
      "Use your learning progress, projects and skills as a foundation for your next career step.",
    icon: <FaBriefcase />,
    signal: "NEXT STEP",
  },
];


// ============================================================
// MAIN COMPONENT
// ============================================================

function LearningJourney() {
  return (
    <section
      className="
        relative
        overflow-hidden
        bg-white
        py-14
        sm:py-16
        lg:py-20
      "
    >

      {/* ======================================================
          BACKGROUND
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
            opacity-[0.32]
          "
          style={{
            backgroundImage:
              "linear-gradient(rgba(20,99,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(20,99,255,0.04) 1px, transparent 1px)",
            backgroundSize: "52px 52px",
          }}
        />

        {/* Left blue glow */}

        <motion.div
          animate={{
            x: [0, 35, 0],
            y: [0, -20, 0],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            -left-56
            top-[20%]
            h-[430px]
            w-[430px]
            rounded-full
            bg-blue-100/40
            blur-[120px]
          "
        />

        {/* Right cyan glow */}

        <motion.div
          animate={{
            x: [0, -25, 0],
            y: [0, 25, 0],
            scale: [1, 1.06, 1],
          }}
          transition={{
            duration: 17,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            -right-52
            bottom-[5%]
            h-[420px]
            w-[420px]
            rounded-full
            bg-cyan-100/40
            blur-[120px]
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
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.25,
          }}
          transition={{
            duration: 0.65,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            max-w-3xl
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
              bg-blue-50
              px-3.5
              py-2
              text-[10px]
              font-bold
              uppercase
              tracking-[0.18em]
              text-[#1463FF]
            "
          >

            <motion.span
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className="
                h-1.5
                w-1.5
                rounded-full
                bg-[#06B6D4]
              "
            />

            How DataLattice Works

          </div>


          <h2
            className="
              mt-5
              text-3xl
              font-semibold
              leading-[1.05]
              tracking-[-0.045em]
              text-[#0B1B3A]
              sm:text-4xl
              lg:text-[50px]
            "
          >
            Learn.
            <span className="text-[#1463FF]">
              {" "}Build.
            </span>
            <span className="text-[#06B6D4]">
              {" "}Grow.
            </span>
          </h2>


          <p
            className="
              mt-4
              max-w-2xl
              text-sm
              leading-6
              text-slate-500
              sm:text-base
              sm:leading-7
            "
          >
            Move from choosing your direction to building practical
            capability through a connected learning experience.
          </p>

        </motion.div>


        {/* ====================================================
            MAIN DASHBOARD
        ==================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 35,
            scale: 0.985,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          viewport={{
            once: true,
            amount: 0.12,
          }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            relative
            mt-9
          "
        >

          {/* ==================================================
              FLOATING TOP LEFT CARD
          ================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              x: -25,
              y: 15,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            animate={{
              y: [0, -7, 0],
            }}
            transition={{
              y: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              },
              opacity: {
                duration: 0.5,
              },
              x: {
                duration: 0.5,
              },
            }}
            className="
              absolute
              -left-2
              top-16
              z-30
              hidden
              w-[210px]
              rounded-2xl
              border
              border-white
              bg-white/90
              p-3
              shadow-[0_20px_50px_rgba(11,27,58,0.12)]
              backdrop-blur-xl
              xl:block
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
                  items-center
                  justify-center
                  rounded-xl
                  bg-blue-50
                  text-[#1463FF]
                "
              >
                <FaPlay size={11} />
              </div>


              <div>

                <p
                  className="
                    text-[10px]
                    font-bold
                    text-[#0B1B3A]
                  "
                >
                  Learn directly
                </p>

                <p
                  className="
                    mt-0.5
                    text-[9px]
                    text-slate-400
                  "
                >
                  Guided learning
                </p>

              </div>

            </div>

          </motion.div>


          {/* ==================================================
              FLOATING TOP RIGHT CARD
          ================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              x: 25,
              y: 10,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            animate={{
              y: [0, 6, 0],
            }}
            transition={{
              y: {
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
              },
              opacity: {
                duration: 0.5,
              },
              x: {
                duration: 0.5,
              },
            }}
            className="
              absolute
              -right-2
              top-8
              z-30
              hidden
              w-[210px]
              rounded-2xl
              border
              border-white
              bg-white/90
              p-3
              shadow-[0_20px_50px_rgba(11,27,58,0.12)]
              backdrop-blur-xl
              xl:block
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
                  items-center
                  justify-center
                  rounded-xl
                  bg-cyan-50
                  text-[#06B6D4]
                "
              >
                <FaChartLine size={13} />
              </div>


              <div className="min-w-0">

                <div
                  className="
                    flex
                    items-center
                    justify-between
                    gap-3
                  "
                >

                  <p
                    className="
                      text-[10px]
                      font-bold
                      text-[#0B1B3A]
                    "
                  >
                    Track Progress
                  </p>

                  <span
                    className="
                      text-[9px]
                      font-bold
                      text-[#1463FF]
                    "
                  >
                    82%
                  </span>

                </div>


                <div
                  className="
                    mt-2
                    h-1.5
                    overflow-hidden
                    rounded-full
                    bg-slate-100
                  "
                >

                  <motion.div
                    initial={{
                      width: 0,
                    }}
                    whileInView={{
                      width: "82%",
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      duration: 1.3,
                    }}
                    className="
                      h-full
                      rounded-full
                      bg-gradient-to-r
                      from-[#1463FF]
                      to-[#06B6D4]
                    "
                  />

                </div>

              </div>

            </div>

          </motion.div>


          {/* ==================================================
              DASHBOARD FRAME
          ================================================== */}

          <div
            className="
              relative
              overflow-hidden
              rounded-[30px]
              border
              border-slate-200
              bg-white
              shadow-[0_30px_100px_rgba(11,27,58,0.12)]
            "
          >

            {/* =================================================
                DASHBOARD TOP BAR
            ================================================= */}

            <div
              className="
                flex
                items-center
                justify-between
                border-b
                border-slate-100
                px-5
                py-4
                sm:px-7
                sm:py-5
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
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-xl
                    bg-[#1463FF]
                    text-white
                    shadow-[0_8px_20px_rgba(20,99,255,0.22)]
                  "
                >

                  <FaLayerGroup
                    size={15}
                  />

                </div>


                <div>

                  <p
                    className="
                      text-[8px]
                      font-bold
                      uppercase
                      tracking-[0.18em]
                      text-slate-400
                    "
                  >
                    DATALATTICE
                  </p>

                  <p
                    className="
                      mt-0.5
                      text-xs
                      font-semibold
                      text-[#0B1B3A]
                    "
                  >
                    Learning Platform
                  </p>

                </div>

              </div>


              {/* Top status */}

              <div
                className="
                  flex
                  items-center
                  gap-1.5
                "
              >

                <span
                  className="
                    h-2
                    w-2
                    rounded-full
                    bg-slate-200
                  "
                />

                <span
                  className="
                    h-2
                    w-2
                    rounded-full
                    bg-slate-300
                  "
                />

                <motion.span
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                  className="
                    h-2
                    w-2
                    rounded-full
                    bg-[#06B6D4]
                  "
                />

              </div>

            </div>


            {/* =================================================
                DASHBOARD BODY
            ================================================= */}

            <div
              className="
                relative
                bg-[#F8FBFF]
                p-5
                sm:p-7
                lg:p-8
              "
            >

              {/* Grid */}

              <div
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  opacity-[0.35]
                "
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(20,99,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(20,99,255,0.04) 1px, transparent 1px)",
                  backgroundSize: "46px 46px",
                }}
              />


              {/* =================================================
                  INTRO AREA
              ================================================= */}

              <div
                className="
                  relative
                  z-10
                  flex
                  flex-col
                  gap-5
                  lg:flex-row
                  lg:items-end
                  lg:justify-between
                "
              >

                <div>

                  <p
                    className="
                      text-[9px]
                      font-bold
                      uppercase
                      tracking-[0.18em]
                      text-slate-400
                    "
                  >
                    Your learning space
                  </p>

                  <h3
                    className="
                      mt-2
                      text-xl
                      font-semibold
                      tracking-[-0.03em]
                      text-[#0B1B3A]
                      sm:text-2xl
                    "
                  >
                    Build your skills step by step.
                  </h3>

                  <p
                    className="
                      mt-2
                      max-w-xl
                      text-[11px]
                      leading-5
                      text-slate-400
                      sm:text-xs
                    "
                  >
                    A connected experience where learning,
                    practice and projects move together.
                  </p>

                </div>


                {/* Progress badge */}

                <div
                  className="
                    flex
                    w-fit
                    items-center
                    gap-3
                    rounded-2xl
                    border
                    border-blue-100
                    bg-white
                    px-4
                    py-3
                    shadow-sm
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

                    <FaChartLine
                      size={13}
                    />

                  </div>


                  <div>

                    <p
                      className="
                        text-[9px]
                        text-slate-400
                      "
                    >
                      Learning progress
                    </p>

                    <p
                      className="
                        mt-0.5
                        text-sm
                        font-bold
                        text-[#0B1B3A]
                      "
                    >
                      82%
                    </p>

                  </div>

                </div>

              </div>


              {/* =================================================
                  ACTIVE PROGRAM
              ================================================= */}

              <motion.div
                initial={{
                  opacity: 0,
                  y: 12,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.5,
                  delay: 0.15,
                }}
                className="
                  relative
                  z-10
                  mt-6
                  overflow-hidden
                  rounded-[22px]
                  border
                  border-blue-100
                  bg-white
                  p-4
                  shadow-sm
                  sm:p-5
                "
              >

                <div
                  className="
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
                        flex
                        h-11
                        w-11
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        bg-blue-50
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
                          text-[8px]
                          font-bold
                          uppercase
                          tracking-[0.15em]
                          text-[#06B6D4]
                        "
                      >
                        Active learning path
                      </p>

                      <h4
                        className="
                          mt-1
                          text-sm
                          font-semibold
                          text-[#0B1B3A]
                        "
                      >
                        Data Analytics
                      </h4>

                    </div>

                  </div>


                  <div
                    className="
                      flex
                      items-center
                      gap-2
                    "
                  >

                    <span
                      className="
                        rounded-full
                        bg-blue-50
                        px-3
                        py-1.5
                        text-[9px]
                        font-bold
                        text-[#1463FF]
                      "
                    >
                      12 modules
                    </span>

                    <span
                      className="
                        rounded-full
                        bg-cyan-50
                        px-3
                        py-1.5
                        text-[9px]
                        font-bold
                        text-[#0891B2]
                      "
                    >
                      In progress
                    </span>

                  </div>

                </div>


                {/* Progress */}

                <div
                  className="
                    mt-5
                  "
                >

                  <div
                    className="
                      flex
                      items-center
                      justify-between
                      text-[9px]
                    "
                  >

                    <span
                      className="
                        text-slate-400
                      "
                    >
                      32 lessons completed
                    </span>

                    <span
                      className="
                        font-semibold
                        text-[#1463FF]
                      "
                    >
                      82%
                    </span>

                  </div>


                  <div
                    className="
                      relative
                      mt-2
                      h-2
                      overflow-hidden
                      rounded-full
                      bg-slate-100
                    "
                  >

                    <motion.div
                      initial={{
                        width: "0%",
                      }}
                      whileInView={{
                        width: "82%",
                      }}
                      viewport={{
                        once: true,
                      }}
                      transition={{
                        duration: 1.4,
                        ease: [
                          0.22,
                          1,
                          0.36,
                          1,
                        ],
                      }}
                      className="
                        relative
                        h-full
                        rounded-full
                        bg-gradient-to-r
                        from-[#1463FF]
                        to-[#06B6D4]
                      "
                    >

                      <motion.span
                        animate={{
                          x: [
                            "-20px",
                            "100px",
                          ],
                          opacity: [0, 1, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="
                          absolute
                          right-0
                          top-0
                          h-full
                          w-12
                          bg-white/40
                          blur-sm
                        "
                      />

                    </motion.div>

                  </div>

                </div>

              </motion.div>


              {/* =================================================
                  FEATURE CARDS
              ================================================= */}

              <div
                className="
                  relative
                  z-10
                  mt-4
                  grid
                  grid-cols-2
                  gap-3
                  lg:grid-cols-4
                "
              >

                <FeatureCard
                  icon={<FaPlay />}
                  title="Live Classes"
                  subtitle="Learn directly"
                  type="blue"
                  delay={0}
                />

                <FeatureCard
                  icon={<FaProjectDiagram />}
                  title="Projects"
                  subtitle="Build practically"
                  type="cyan"
                  delay={0.08}
                />

                <FeatureCard
                  icon={<FaCode />}
                  title="Practice"
                  subtitle="Exercises & skills"
                  type="blue"
                  delay={0.16}
                />

                <FeatureCard
                  icon={<FaBriefcase />}
                  title="Career"
                  subtitle="Grow with confidence"
                  type="cyan"
                  delay={0.24}
                />

              </div>


              {/* =================================================
                  LOWER ACTIVITY PANEL
              ================================================= */}

              <div
                className="
                  relative
                  z-10
                  mt-4
                  grid
                  gap-4
                  lg:grid-cols-[1.2fr_0.8fr]
                "
              >

                {/* Weekly goal */}

                <motion.div
                  initial={{
                    opacity: 0,
                    y: 12,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: 0.2,
                  }}
                  className="
                    rounded-[20px]
                    border
                    border-slate-200
                    bg-white
                    p-4
                    sm:p-5
                  "
                >

                  <div
                    className="
                      flex
                      items-center
                      justify-between
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
                          items-center
                          justify-center
                          rounded-xl
                          bg-cyan-50
                          text-[#06B6D4]
                        "
                      >

                        <FaBolt
                          size={13}
                        />

                      </div>


                      <div>

                        <p
                          className="
                            text-[8px]
                            font-bold
                            uppercase
                            tracking-[0.14em]
                            text-slate-400
                          "
                        >
                          Weekly learning goal
                        </p>

                        <p
                          className="
                            mt-0.5
                            text-xs
                            font-semibold
                            text-[#0B1B3A]
                          "
                        >
                          4 of 5 sessions completed
                        </p>

                      </div>

                    </div>


                    <span
                      className="
                        text-sm
                        font-bold
                        text-[#1463FF]
                      "
                    >
                      80%
                    </span>

                  </div>


                  <div
                    className="
                      mt-4
                      flex
                      gap-2
                    "
                  >

                    {[1, 1, 1, 1, 0].map(
                      (completed, index) => (
                        <motion.div
                          key={index}
                          initial={{
                            scaleX: 0,
                          }}
                          whileInView={{
                            scaleX: 1,
                          }}
                          viewport={{
                            once: true,
                          }}
                          transition={{
                            delay:
                              index * 0.08,
                            duration: 0.35,
                          }}
                          className={`
                            h-2
                            flex-1
                            origin-left
                            rounded-full
                            ${
                              completed
                                ? "bg-[#1463FF]"
                                : "bg-slate-100"
                            }
                          `}
                        />
                      )
                    )}

                  </div>

                </motion.div>


                {/* Next step */}

                <motion.div
                  initial={{
                    opacity: 0,
                    y: 12,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: 0.3,
                  }}
                  className="
                    flex
                    items-center
                    justify-between
                    gap-4
                    rounded-[20px]
                    border
                    border-[#0B1B3A]
                    bg-[#0B1B3A]
                    p-4
                    sm:p-5
                  "
                >

                  <div>

                    <p
                      className="
                        text-[8px]
                        font-bold
                        uppercase
                        tracking-[0.15em]
                        text-cyan-200/60
                      "
                    >
                      Next milestone
                    </p>

                    <p
                      className="
                        mt-1
                        text-sm
                        font-semibold
                        text-white
                      "
                    >
                      Build your first project
                    </p>

                    <p
                      className="
                        mt-1
                        text-[9px]
                        text-white/45
                      "
                    >
                      Turn knowledge into capability.
                    </p>

                  </div>


                  <motion.div
                    animate={{
                      x: [0, 4, 0],
                    }}
                    transition={{
                      duration: 1.8,
                      repeat: Infinity,
                    }}
                    className="
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      bg-white/10
                      text-cyan-200
                    "
                  >

                    <FaArrowRight
                      size={12}
                    />

                  </motion.div>

                </motion.div>

              </div>

            </div>

          </div>


          {/* ==================================================
              FLOATING BOTTOM RIGHT CARD
          ================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              x: 25,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            animate={{
              y: [0, -6, 0],
            }}
            transition={{
              y: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              },
              opacity: {
                duration: 0.5,
              },
              x: {
                duration: 0.5,
              },
            }}
            className="
              absolute
              -bottom-7
              -right-2
              z-30
              hidden
              w-[215px]
              rounded-2xl
              border
              border-white
              bg-white/95
              p-3
              shadow-[0_20px_50px_rgba(11,27,58,0.14)]
              backdrop-blur-xl
              xl:block
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
                  items-center
                  justify-center
                  rounded-xl
                  bg-blue-50
                  text-[#1463FF]
                "
              >

                <FaProjectDiagram
                  size={13}
                />

              </div>


              <div>

                <p
                  className="
                    text-[10px]
                    font-bold
                    text-[#0B1B3A]
                  "
                >
                  Real Projects
                </p>

                <p
                  className="
                    mt-0.5
                    text-[9px]
                    text-slate-400
                  "
                >
                  Build practical experience
                </p>

              </div>

            </div>

          </motion.div>

        </motion.div>


        {/* ====================================================
            FIVE LEARNING STAGES
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
          viewport={{
            once: true,
            amount: 0.15,
          }}
          transition={{
            duration: 0.6,
            delay: 0.1,
          }}
          className="
            mt-8
          "
        >

          <div
            className="
              mb-4
              flex
              items-end
              justify-between
            "
          >

            <div>

              <p
                className="
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.18em]
                  text-[#06B6D4]
                "
              >
                Your path
              </p>

              <h3
                className="
                  mt-1
                  text-lg
                  font-semibold
                  tracking-[-0.025em]
                  text-[#0B1B3A]
                "
              >
                Five stages. One connected journey.
              </h3>

            </div>


            <div
              className="
                hidden
                items-center
                gap-2
                text-[9px]
                font-semibold
                text-slate-400
                sm:flex
              "
            >

              <span>
                Start
              </span>

              <FaArrowRight
                size={8}
              />

              <span>
                Capability
              </span>

            </div>

          </div>


          <div
            className="
              grid
              gap-3
              sm:grid-cols-2
              lg:grid-cols-5
            "
          >

            {journeySteps.map(
              (step, index) => (
                <JourneyCard
                  key={step.number}
                  step={step}
                  index={index}
                />
              )
            )}

          </div>

        </motion.div>


        {/* ====================================================
            FINAL MESSAGE
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
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.5,
            delay: 0.15,
          }}
          className="
            mt-5
            flex
            flex-col
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
            sm:justify-between
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

              <FaCheck
                size={12}
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
                Every stage builds on the previous one.
              </p>

              <p
                className="
                  mt-0.5
                  text-[10px]
                  leading-4
                  text-slate-400
                "
              >
                Knowledge becomes practice, practice becomes projects,
                and projects become capability.
              </p>

            </div>

          </div>


          <div
            className="
              flex
              items-center
              gap-2
              text-xs
              font-semibold
              text-[#1463FF]
            "
          >

            <span>
              Learn
            </span>

            <FaArrowRight
              size={9}
            />

            <span>
              Build
            </span>

            <FaArrowRight
              size={9}
            />

            <span>
              Grow
            </span>

          </div>

        </motion.div>

      </div>

    </section>
  );
}


// ============================================================
// FEATURE CARD
// ============================================================

function FeatureCard({
  icon,
  title,
  subtitle,
  type,
  delay,
}) {
  const cyan =
    type === "cyan";

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 14,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 0.45,
        delay,
      }}
      whileHover={{
        y: -4,
      }}
      className="
        group
        rounded-[18px]
        border
        border-slate-200
        bg-white
        p-4
        shadow-[0_8px_25px_rgba(11,27,58,0.04)]
        transition-shadow
        duration-300
        hover:shadow-[0_15px_35px_rgba(11,27,58,0.08)]
      "
    >

      <div
        className={`
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-xl
          ${
            cyan
              ? "bg-cyan-50 text-[#06B6D4]"
              : "bg-blue-50 text-[#1463FF]"
          }
        `}
      >
        {icon}
      </div>


      <p
        className="
          mt-3
          text-xs
          font-semibold
          text-[#0B1B3A]
        "
      >
        {title}
      </p>


      <p
        className="
          mt-0.5
          text-[9px]
          text-slate-400
        "
      >
        {subtitle}
      </p>

    </motion.div>
  );
}


// ============================================================
// JOURNEY CARD
// ============================================================

function JourneyCard({
  step,
  index,
}) {
  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 18,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={{
        duration: 0.45,
        delay: index * 0.07,
      }}
      whileHover={{
        y: -5,
      }}
      className="
        group
        relative
        overflow-hidden
        rounded-[20px]
        border
        border-slate-200
        bg-white
        p-4
        shadow-[0_8px_25px_rgba(11,27,58,0.04)]
        transition-shadow
        duration-300
        hover:shadow-[0_16px_35px_rgba(11,27,58,0.08)]
      "
    >

      {/* Top animated signal */}

      <motion.div
        initial={{
          width: "0%",
        }}
        whileInView={{
          width: "100%",
        }}
        viewport={{
          once: true,
        }}
        transition={{
          duration: 0.8,
          delay: index * 0.08,
        }}
        className="
          absolute
          left-0
          top-0
          h-[2px]
          bg-gradient-to-r
          from-[#1463FF]
          to-[#06B6D4]
        "
      />


      <div
        className="
          flex
          items-start
          justify-between
          gap-3
        "
      >

        <div
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            bg-blue-50
            text-[#1463FF]
            transition-all
            duration-300
            group-hover:bg-[#1463FF]
            group-hover:text-white
          "
        >
          {step.icon}
        </div>


        <span
          className="
            text-[9px]
            font-bold
            tracking-[0.12em]
            text-slate-300
          "
        >
          {step.number}
        </span>

      </div>


      <p
        className="
          mt-4
          text-[8px]
          font-bold
          uppercase
          tracking-[0.15em]
          text-[#06B6D4]
        "
      >
        {step.signal}
      </p>


      <h4
        className="
          mt-1.5
          text-xs
          font-semibold
          leading-5
          text-[#0B1B3A]
        "
      >
        {step.title}
      </h4>


      <p
        className="
          mt-1.5
          text-[9px]
          leading-4
          text-slate-400
        "
      >
        {step.description}
      </p>


      <div
        className="
          mt-4
          flex
          items-center
          gap-2
          border-t
          border-slate-100
          pt-3
          text-[8px]
          font-semibold
          uppercase
          tracking-[0.08em]
          text-slate-400
        "
      >

        <span
          className="
            flex
            h-4
            w-4
            items-center
            justify-center
            rounded-full
            bg-cyan-50
            text-[#06B6D4]
          "
        >

          <FaCheck
            size={7}
          />

        </span>

        Connected stage

      </div>

    </motion.article>
  );
}


export default LearningJourney;