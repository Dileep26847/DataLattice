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
          sm:px-8
          lg:px-8
        "
      >

        {/* ====================================================
            HEADER
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

              How DataLattice Works

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

              A learning path with
              <span
                className="
                  text-[#1463FF]
                "
              >
                {" "}momentum.
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

              Move from choosing your direction to building practical
              capability through a connected learning experience.

            </p>

          </div>


          {/* ==================================================
              JOURNEY STATUS
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
                bg-[#0B1B3A]
                text-[#67E8F9]
              "
            >

              <FaChartLine
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
                Five connected stages
              </p>


              <p
                className="
                  mt-0.5
                  text-[10px]
                  text-slate-400
                "
              >
                Direction → Capability

              </p>

            </div>

          </div>

        </motion.div>


        {/* ====================================================
            JOURNEY PIPELINE
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
            mt-8
            overflow-hidden
            rounded-[24px]
            border
            border-slate-200
            bg-[#F8FBFF]
            shadow-[0_16px_50px_rgba(11,27,58,0.06)]
          "
        >

          {/* ==================================================
              PIPELINE HEADER
          ================================================== */}

          <div
            className="
              flex
              flex-col
              gap-3
              border-b
              border-slate-200
              px-5
              py-4
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

              <span
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-lg
                  bg-[#0B1B3A]
                  text-[#67E8F9]
                "
              >

                <FaProjectDiagram
                  size={12}
                />

              </span>


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
                  LEARNING PIPELINE
                </p>


                <p
                  className="
                    mt-0.5
                    text-xs
                    font-semibold
                    text-[#0B1B3A]
                  "
                >
                  From first direction to next career step
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

              Connected journey

            </div>

          </div>


          {/* ==================================================
              DESKTOP PIPELINE
          ================================================== */}

          <div
            className="
              relative
              hidden
              px-5
              pb-7
              pt-8
              lg:block
              lg:px-6
            "
          >

            {/* ==================================================
                CONNECTION BASE
            ================================================== */}

            <div
              className="
                absolute
                left-[10%]
                right-[10%]
                top-[73px]
                h-px
                bg-slate-200
              "
            />


            {/* ==================================================
                ACTIVE CONNECTION
            ================================================== */}

            <motion.div
              initial={{
                width: "0%",
              }}
              whileInView={{
                width: "80%",
              }}
              transition={{
                duration: 1.8,
                ease: "easeInOut",
              }}
              viewport={{
                once: true,
                amount: 0.2,
              }}
              className="
                absolute
                left-[10%]
                top-[72px]
                h-[2px]
                bg-gradient-to-r
                from-[#1463FF]
                via-[#1463FF]
                to-[#06B6D4]
              "
            />


            {/* ==================================================
                MOVING DATA SIGNAL
            ================================================== */}

            <motion.span
              initial={{
                left: "10%",
                opacity: 0,
              }}
              whileInView={{
                left: "90%",
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
                repeatDelay: 1,
                ease: "easeInOut",
              }}
              className="
                absolute
                top-[68px]
                z-20
                h-2
                w-2
                -translate-x-1/2
                rounded-full
                bg-[#06B6D4]
                shadow-[0_0_12px_rgba(6,182,212,0.55)]
              "
            />


            {/* ==================================================
                JOURNEY STEPS
            ================================================== */}

            <div
              className="
                grid
                grid-cols-5
                gap-4
              "
            >

              {journeySteps.map(
                (
                  step,
                  index
                ) => (

                  <DesktopJourneyStep
                    key={
                      step.number
                    }
                    step={
                      step
                    }
                    index={
                      index
                    }
                  />

                )
              )}

            </div>

          </div>


          {/* ==================================================
              MOBILE PIPELINE
          ================================================== */}

          <div
            className="
              px-5
              py-5
              lg:hidden
            "
          >

            <div
              className="
                relative
                ml-4
                border-l
                border-slate-200
                pl-7
              "
            >

              {/* ==================================================
                  ACTIVE VERTICAL LINE
              ================================================== */}

              <motion.div
                initial={{
                  height: "0%",
                }}
                whileInView={{
                  height: "100%",
                }}
                transition={{
                  duration: 1.5,
                  ease: "easeInOut",
                }}
                viewport={{
                  once: true,
                  amount: 0.15,
                }}
                className="
                  absolute
                  left-[-1px]
                  top-0
                  w-[2px]
                  bg-gradient-to-b
                  from-[#1463FF]
                  to-[#06B6D4]
                "
              />


              <div
                className="
                  space-y-4
                "
              >

                {journeySteps.map(
                  (
                    step,
                    index
                  ) => (

                    <MobileJourneyStep
                      key={
                        step.number
                      }
                      step={
                        step
                      }
                      index={
                        index
                      }
                    />

                  )
                )}

              </div>

            </div>

          </div>

        </motion.div>


        {/* ====================================================
            BOTTOM OUTCOME STRIP
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
                size={13}
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
                  text-[11px]
                  text-slate-400
                "
              >
                Knowledge becomes practice, practice becomes projects, and projects become capability.

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
// DESKTOP JOURNEY STEP
// ============================================================

function DesktopJourneyStep({
  step,
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
          index * 0.08,
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      className="
        relative
        z-10
        min-w-0
      "
    >

      {/* ==================================================
          NUMBER NODE
      ================================================== */}

      <div
        className="
          mx-auto
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-full
          border
          border-blue-100
          bg-white
          text-[9px]
          font-semibold
          text-[#1463FF]
          shadow-[0_6px_18px_rgba(11,27,58,0.07)]
        "
      >

        {step.number}

      </div>


      {/* ==================================================
          ICON
      ================================================== */}

      <motion.div
        whileHover={{
          y: -3,
          scale: 1.03,
        }}
        className="
          mx-auto
          mt-5
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-2xl
          border
          border-slate-200
          bg-white
          text-lg
          text-[#1463FF]
          shadow-[0_8px_25px_rgba(11,27,58,0.06)]
          transition-all
          duration-300
          hover:border-blue-100
          hover:bg-blue-50
        "
      >

        {step.icon}

      </motion.div>


      {/* ==================================================
          CONTENT
      ================================================== */}

      <div
        className="
          mt-4
          text-center
        "
      >

        <p
          className="
            text-[8px]
            font-semibold
            uppercase
            tracking-[0.18em]
            text-[#06B6D4]
          "
        >
          {step.signal}
        </p>


        <h3
          className="
            mx-auto
            mt-2
            max-w-[175px]
            text-sm
            font-semibold
            leading-5
            text-[#0B1B3A]
          "
        >
          {step.title}
        </h3>


        <p
          className="
            mx-auto
            mt-2
            max-w-[185px]
            text-[11px]
            leading-5
            text-slate-400
          "
        >
          {step.description}
        </p>

      </div>

    </motion.article>

  );

}


// ============================================================
// MOBILE JOURNEY STEP
// ============================================================

function MobileJourneyStep({
  step,
  index,
}) {

  return (

    <motion.article
      initial={{
        opacity: 0,
        x: 12,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
      }}
      transition={{
        duration: 0.4,
        delay:
          index * 0.06,
      }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      className="
        relative
      "
    >

      {/* ==================================================
          NODE
      ================================================== */}

      <div
        className="
          absolute
          -left-[49px]
          top-4
          flex
          h-9
          w-9
          items-center
          justify-center
          rounded-full
          border
          border-blue-100
          bg-white
          text-[9px]
          font-semibold
          text-[#1463FF]
          shadow-[0_5px_15px_rgba(11,27,58,0.07)]
        "
      >

        {step.number}

      </div>


      {/* ==================================================
          MOBILE CONTENT
      ================================================== */}

      <div
        className="
          rounded-2xl
          border
          border-slate-200
          bg-white
          p-4
          shadow-[0_8px_25px_rgba(11,27,58,0.045)]
        "
      >

        <div
          className="
            flex
            items-start
            gap-4
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

            {step.icon}

          </div>


          <div
            className="
              min-w-0
            "
          >

            <p
              className="
                text-[8px]
                font-semibold
                uppercase
                tracking-[0.16em]
                text-[#06B6D4]
              "
            >
              {step.signal}
            </p>


            <h3
              className="
                mt-1.5
                text-sm
                font-semibold
                leading-5
                text-[#0B1B3A]
              "
            >
              {step.title}
            </h3>


            <p
              className="
                mt-1.5
                text-xs
                leading-5
                text-slate-400
              "
            >
              {step.description}
            </p>

          </div>

        </div>


        {/* ==================================================
            STAGE STATUS
        ================================================== */}

        <div
          className="
            mt-3
            flex
            items-center
            gap-2
            border-t
            border-slate-100
            pt-3
            text-[9px]
            font-medium
            text-slate-400
          "
        >

          <FaCheck
            size={8}
            className="
              text-[#06B6D4]
            "
          />

          Connected learning stage

        </div>

      </div>

    </motion.article>

  );

}


export default LearningJourney;