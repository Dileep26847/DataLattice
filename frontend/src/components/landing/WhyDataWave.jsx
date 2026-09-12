import { motion } from "framer-motion";

import {
  FaArrowRight,
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
    visual: "path",
  },

  {
    number: "02",
    title: "Practice with purpose",
    description:
      "Move beyond passive lessons through exercises, practical work and project-oriented learning experiences.",
    icon: <FaCode />,
    tag: "PRACTICE",
    visual: "code",
  },

  {
    number: "03",
    title: "Build real capability",
    description:
      "Turn concepts into tangible projects that help connect technical knowledge with practical problem solving.",
    icon: <FaProjectDiagram />,
    tag: "PROJECTS",
    visual: "project",
  },

  {
    number: "04",
    title: "See your progress",
    description:
      "Make learning measurable with progress signals that help you understand where you are and what comes next.",
    icon: <FaChartLine />,
    tag: "PROGRESS",
    visual: "analytics",
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
        border-t
        border-slate-200
        bg-white 
        py-12
        sm:py-14
        lg:py-16
      "
    >

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
            y: 16,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
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
              HEADER CONTENT
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
                bg-blue-50
                px-3.5
                py-2
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.18em]
                text-[#1463FF]
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

              Why DataLattice

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

              Learning should
              <span
                className="
                  text-[#1463FF]
                "
              >
                {" "}move somewhere.
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

              DataLattice connects knowledge, practice, projects and
              measurable progress into one continuous learning
              experience.

            </p>

          </div>


          {/* ==================================================
              HEADER SIGNAL
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

              <FaLightbulb
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
                One connected system
              </p>


              <p
                className="
                  mt-0.5
                  text-[10px]
                  text-slate-400
                "
              >
                Learn • Practice • Build • Measure

              </p>

            </div>

          </div>

        </motion.div>


        {/* ====================================================
            MAIN LEARNING SYSTEM
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
            duration: 0.6,
            delay: 0.08,
          }}
          viewport={{
            once: true,
            amount: 0.15,
          }}
          className="
            relative
            mt-8
            overflow-hidden
            rounded-[24px]
            border
            border-slate-200
            bg-[#F8FBFF]
            shadow-[0_16px_50px_rgba(11,27,58,0.06)]
          "
        >

          <div
            className="
              grid
              lg:grid-cols-[0.72fr_1.28fr]
            "
          >

            {/* ==================================================
                LEFT SYSTEM INFORMATION
            ================================================== */}

            <div
              className="
                border-b
                border-slate-200
                p-5
                sm:p-6
                lg:border-b-0
                lg:border-r
                lg:p-7
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
                    font-semibold
                    uppercase
                    tracking-[0.2em]
                    text-slate-400
                  "
                >
                  DATALATTICE METHOD
                </span>


                <span
                  className="
                    flex
                    items-center
                    gap-1.5
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.12em]
                    text-[#06B6D4]
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

                  Active

                </span>

              </div>


              <div
                className="
                  mt-7
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-2xl
                  bg-[#0B1B3A]
                  text-[#67E8F9]
                  shadow-[0_8px_20px_rgba(11,27,58,0.12)]
                "
              >

                <FaLightbulb
                  size={18}
                />

              </div>


              <h3
                className="
                  mt-5
                  max-w-sm
                  text-2xl
                  font-semibold
                  leading-tight
                  tracking-[-0.03em]
                  text-[#0B1B3A]
                  sm:text-3xl
                "
              >

                From knowing
                <span
                  className="
                    block
                    text-[#1463FF]
                  "
                >
                  to doing.

                </span>

              </h3>


              <p
                className="
                  mt-3
                  max-w-sm
                  text-sm
                  leading-6
                  text-slate-500
                "
              >

                Every part of the learning experience is connected
                so that knowledge can become practical capability.

              </p>


              {/* ==================================================
                  PROCESS SIGNAL
              ================================================== */}

              <div
                className="
                  mt-6
                  flex
                  items-center
                  gap-2
                "
              >

                <div
                  className="
                    h-1
                    w-10
                    rounded-full
                    bg-[#1463FF]
                  "
                />


                <div
                  className="
                    h-1
                    w-6
                    rounded-full
                    bg-[#06B6D4]
                  "
                />


                <div
                  className="
                    h-1
                    w-3
                    rounded-full
                    bg-slate-200
                  "
                />

              </div>


              <p
                className="
                  mt-3
                  text-[10px]
                  font-medium
                  text-slate-400
                "
              >
                Progress compounds through every stage.

              </p>

            </div>


            {/* ==================================================
                RIGHT FLOW
            ================================================== */}

            <LearningFlow />

          </div>

        </motion.div>


        {/* ====================================================
            CAPABILITY ROW
        ==================================================== */}

        <div
          className="
            mt-5
            grid
            gap-4
            sm:grid-cols-2
            lg:grid-cols-4
          "
        >

          {valueCards.map(
            (
              card,
              index
            ) => (

              <ValueCard
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


        {/* ====================================================
            BOTTOM ACTION STRIP
        ==================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 10,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.45,
            delay: 0.1,
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

          <div>

            <p
              className="
                text-sm
                font-semibold
                text-[#0B1B3A]
              "
            >
              A learning system designed for capability.
            </p>


            <p
              className="
                mt-0.5
                text-[11px]
                text-slate-400
              "
            >
              Learn the concept. Apply it. Build with it. Measure the result.

            </p>

          </div>


          <div
            className="
              inline-flex
              items-center
              gap-2
              text-xs
              font-semibold
              text-[#1463FF]
            "
          >

            Built around progress

            <FaArrowRight
              size={10}
            />

          </div>

        </motion.div>

      </div>

    </section>

  );

}


// ============================================================
// LEARNING FLOW
// ============================================================

function LearningFlow() {

  const nodes = [
    {
      number: "01",
      label: "Learn",
      detail: "Understand",
      icon: <FaDatabase />,
    },

    {
      number: "02",
      label: "Practice",
      detail: "Apply",
      icon: <FaCode />,
    },

    {
      number: "03",
      label: "Build",
      detail: "Create",
      icon: <FaProjectDiagram />,
    },

    {
      number: "04",
      label: "Measure",
      detail: "Improve",
      icon: <FaChartLine />,
    },
  ];


  return (

    <div
      className="
        relative
        min-h-[285px]
        overflow-hidden
        bg-white
        p-5
        sm:min-h-[315px]
        sm:p-6
        lg:p-7
      "
    >

      {/* ==================================================
          HEADER
      ================================================== */}

      <div
        className="
          relative
          z-10
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
              tracking-[0.18em]
              text-slate-400
            "
          >
            LEARNING FLOW
          </p>


          <p
            className="
              mt-1
              text-sm
              font-semibold
              text-[#0B1B3A]
            "
          >
            One stage feeds the next.

          </p>

        </div>


        <div
          className="
            rounded-full
            border
            border-blue-100
            bg-blue-50
            px-2.5
            py-1.5
            text-[8px]
            font-semibold
            uppercase
            tracking-[0.12em]
            text-[#1463FF]
          "
        >
          Continuous

        </div>

      </div>


      {/* ==================================================
          FLOW AREA
      ================================================== */}

      <div
        className="
          relative
          mt-7
          h-[185px]
        "
      >

        {/* ==================================================
            FLOW LINE
        ================================================== */}

        <svg
          viewBox="0 0 800 180"
          preserveAspectRatio="none"
          className="
            absolute
            left-0
            right-0
            top-0
            h-full
            w-full
          "
          fill="none"
        >

          <motion.path
            d="
              M60 135
              C145 135 145 45 255 45
              C350 45 365 140 460 140
              C560 140 575 55 740 55
            "
            stroke="#D8E7FF"
            strokeWidth="3"
            strokeLinecap="round"
            initial={{
              pathLength: 0,
            }}
            whileInView={{
              pathLength: 1,
            }}
            transition={{
              duration: 1.4,
              ease: "easeInOut",
            }}
            viewport={{
              once: true,
            }}
          />


          <motion.path
            d="
              M60 135
              C145 135 145 45 255 45
              C350 45 365 140 460 140
              C560 140 575 55 740 55
            "
            stroke="#1463FF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="1 14"
            initial={{
              strokeDashoffset: 0,
            }}
            animate={{
              strokeDashoffset: [
                0,
                -120,
              ],
            }}
            transition={{
              duration: 2.8,
              repeat: Infinity,
              ease: "linear",
            }}
          />

        </svg>


        {/* ==================================================
            NODES
        ================================================== */}

        <div
          className="
            absolute
            inset-0
            flex
            items-start
            justify-between
          "
        >

          {nodes.map(
            (
              node,
              index
            ) => (

              <FlowNode
                key={
                  node.number
                }
                node={
                  node
                }
                index={
                  index
                }
              />

            )
          )}

        </div>


        {/* ==================================================
            CENTRAL SIGNAL
        ================================================== */}

        <motion.div
          animate={{
            scale: [
              1,
              1.05,
              1,
            ],
            opacity: [
              0.75,
              1,
              0.75,
            ],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            left-1/2
            top-[51%]
            -translate-x-1/2
            -translate-y-1/2
          "
        >

          <div
            className="
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-full
              border
              border-cyan-100
              bg-white
              shadow-[0_8px_30px_rgba(20,99,255,0.10)]
            "
          >

            <div
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-full
                bg-[#0B1B3A]
                text-[#67E8F9]
              "
            >

              <FaLightbulb
                size={14}
              />

            </div>

          </div>

        </motion.div>

      </div>


      {/* ==================================================
          FOOTER SIGNAL
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
          border-slate-100
          pt-3
          sm:left-6
          sm:right-6
          lg:left-7
          lg:right-7
        "
      >

        <span
          className="
            text-[8px]
            font-medium
            uppercase
            tracking-[0.14em]
            text-slate-400
          "
        >
          KNOWLEDGE → CAPABILITY
        </span>


        <span
          className="
            text-[8px]
            font-semibold
            text-[#06B6D4]
          "
        >
          DL / FLOW
        </span>

      </div>

    </div>

  );

}


// ============================================================
// FLOW NODE
// ============================================================

function FlowNode({
  node,
  index,
}) {

  return (

    <motion.div
      initial={{
        opacity: 0,
        y: 10,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        delay:
          0.15 +
          index * 0.1,
        duration: 0.4,
      }}
      viewport={{
        once: true,
      }}
      className="
        relative
        z-10
        flex
        flex-col
        items-center
      "
    >

      <motion.div
        animate={{
          y: [
            0,
            -3,
            0,
          ],
        }}
        transition={{
          duration:
            3 +
            index *
              0.25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-xl
          border
          border-blue-100
          bg-white
          text-[#1463FF]
          shadow-[0_6px_20px_rgba(11,27,58,0.07)]
          sm:h-11
          sm:w-11
        "
      >

        {node.icon}

      </motion.div>


      <div
        className="
          mt-2
          text-center
        "
      >

        <div
          className="
            flex
            items-center
            justify-center
            gap-1.5
          "
        >

          <span
            className="
              text-[8px]
              font-semibold
              text-[#06B6D4]
            "
          >
            {node.number}
          </span>


          <p
            className="
              text-[9px]
              font-semibold
              text-[#0B1B3A]
            "
          >
            {node.label}
          </p>

        </div>


        <p
          className="
            mt-0.5
            text-[8px]
            text-slate-400
          "
        >
          {node.detail}
        </p>

      </div>

    </motion.div>

  );

}


// ============================================================
// VALUE CARD
// ============================================================

function ValueCard({
  card,
  index,
}) {

  return (

    <motion.article
      initial={{
        opacity: 0,
        y: 14,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.45,
        delay:
          index * 0.06,
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      whileHover={{
        y: -3,
      }}
      className="
        group
        relative
        overflow-hidden
        rounded-[20px]
        border
        border-slate-200
        bg-white
        p-5
        shadow-[0_10px_35px_rgba(11,27,58,0.045)]
        transition-all
        duration-300
        hover:border-blue-100
        hover:shadow-[0_16px_42px_rgba(11,27,58,0.08)]
      "
    >

      {/* ====================================================
          TOP ACCENT
      ==================================================== */}

      <div
        className="
          absolute
          left-0
          right-0
          top-0
          h-[2px]
          bg-gradient-to-r
          from-[#1463FF]
          to-[#06B6D4]
        "
      />


      {/* ====================================================
          HEADER
      ==================================================== */}

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
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            bg-blue-50
            text-[#1463FF]
            transition-all
            duration-300
            group-hover:bg-[#0B1B3A]
            group-hover:text-[#67E8F9]
          "
        >

          {card.icon}

        </div>


        <span
          className="
            text-[10px]
            font-medium
            tracking-[0.16em]
            text-slate-300
          "
        >
          {card.number}
        </span>

      </div>


      {/* ====================================================
          TAG
      ==================================================== */}

      <p
        className="
          mt-5
          text-[9px]
          font-semibold
          uppercase
          tracking-[0.18em]
          text-[#06B6D4]
        "
      >
        {card.tag}
      </p>


      {/* ====================================================
          TITLE
      ==================================================== */}

      <h3
        className="
          mt-2
          text-lg
          font-semibold
          tracking-[-0.02em]
          text-[#0B1B3A]
        "
      >
        {card.title}
      </h3>


      {/* ====================================================
          DESCRIPTION
      ==================================================== */}

      <p
        className="
          mt-2.5
          text-sm
          leading-6
          text-slate-500
        "
      >
        {card.description}
      </p>


      {/* ====================================================
          VISUAL
      ==================================================== */}

      <CardVisual
        type={
          card.visual
        }
      />

    </motion.article>

  );

}


// ============================================================
// CARD VISUAL
// ============================================================

function CardVisual({
  type,
}) {

  if (
    type ===
    "path"
  ) {

    return (

      <div
        className="
          relative
          mt-5
          h-9
          overflow-hidden
          rounded-xl
          border
          border-slate-100
          bg-[#F8FBFF]
        "
      >

        <div
          className="
            absolute
            left-3
            right-3
            top-1/2
            h-px
            -translate-y-1/2
            bg-slate-200
          "
        />


        <motion.div
          initial={{
            width: "0%",
          }}
          whileInView={{
            width: "76%",
          }}
          transition={{
            duration: 1,
            ease: "easeOut",
          }}
          viewport={{
            once: true,
          }}
          className="
            absolute
            left-3
            top-1/2
            h-1
            -translate-y-1/2
            rounded-full
            bg-gradient-to-r
            from-[#1463FF]
            to-[#06B6D4]
          "
        />


        {[18, 42, 67, 88].map(
          (
            position,
            index
          ) => (

            <motion.span
              key={
                position
              }
              initial={{
                scale: 0,
              }}
              whileInView={{
                scale: 1,
              }}
              transition={{
                delay:
                  0.15 +
                  index *
                    0.1,
              }}
              viewport={{
                once: true,
              }}
              className="
                absolute
                top-1/2
                h-2.5
                w-2.5
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                border-2
                border-white
                bg-[#06B6D4]
              "
              style={{
                left:
                  `${position}%`,
              }}
            />

          )
        )}

      </div>

    );

  }


  if (
    type ===
    "code"
  ) {

    return (

      <div
        className="
          mt-5
          overflow-hidden
          rounded-xl
          border
          border-slate-100
          bg-[#0B1B3A]
          p-3
          font-mono
          text-[8px]
          leading-4
        "
      >

        <div
          className="
            flex
            gap-1
            pb-1.5
          "
        >

          <span
            className="
              h-1.5
              w-1.5
              rounded-full
              bg-slate-600
            "
          />

          <span
            className="
              h-1.5
              w-1.5
              rounded-full
              bg-slate-600
            "
          />

          <span
            className="
              h-1.5
              w-1.5
              rounded-full
              bg-slate-600
            "
          />

        </div>


        <motion.div
          animate={{
            opacity: [
              0.55,
              1,
              0.55,
            ],
          }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
          }}
          className="
            text-slate-400
          "
        >

          <span
            className="
              text-[#67E8F9]
            "
          >
            data
          </span>{" "}
          = load_dataset()

          <br />

          <span
            className="
              text-blue-300
            "
          >
            data
          </span>{" "}
          = clean(data)

          <br />

          <span
            className="
              text-cyan-200
            "
          >
            insight
          </span>{" "}
          = analyze(data)

        </motion.div>

      </div>

    );

  }


  if (
    type ===
    "project"
  ) {

    return (

      <div
        className="
          mt-5
          grid
          h-10
          grid-cols-6
          items-end
          gap-1.5
          rounded-xl
          border
          border-slate-100
          bg-[#F8FBFF]
          p-2.5
        "
      >

        {[35, 58, 44, 78, 66, 92].map(
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
                  0.07,
                duration:
                  0.5,
              }}
              viewport={{
                once: true,
              }}
              className="
                min-h-[5px]
                rounded-t-sm
                bg-gradient-to-t
                from-[#1463FF]
                to-[#06B6D4]
              "
            />

          )
        )}

      </div>

    );

  }


  return (

    <div
      className="
        mt-5
        flex
        h-10
        items-end
        gap-1.5
        rounded-xl
        border
        border-slate-100
        bg-[#F8FBFF]
        px-2.5
        py-2
      "
    >

      {[30, 45, 38, 65, 52, 78, 70, 90].map(
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
            animate={{
              opacity: [
                0.55,
                1,
                0.55,
              ],
            }}
            transition={{
              height: {
                delay:
                  index *
                  0.05,
                duration:
                  0.45,
              },
              opacity: {
                delay:
                  index *
                  0.07,
                duration:
                  2,
                repeat:
                  Infinity,
              },
            }}
            viewport={{
              once: true,
            }}
            className="
              flex-1
              rounded-t-sm
              bg-gradient-to-t
              from-[#1463FF]
              to-[#06B6D4]
            "
          />

        )
      )}

    </div>

  );

}


export default WhyDataWave;