import { motion, useReducedMotion } from "framer-motion";

import {
  FaArrowRight,
  FaDatabase,
  FaLaptopCode,
  FaProjectDiagram,
  FaRocket,
} from "react-icons/fa";

/* =========================================================
   DATALATTICE SUCCESS STORIES
   OUTCOME STORY SYSTEM
   ========================================================= */

const learningSignals = [
  {
    number: "01",
    label: "Learn",
    title: "Build the foundation",
    description:
      "Develop the technical concepts and practical understanding needed to work confidently with data.",
    icon: FaDatabase,
  },
  {
    number: "02",
    label: "Practice",
    title: "Turn knowledge into skill",
    description:
      "Reinforce learning through structured exercises, assessments, and hands-on practice.",
    icon: FaLaptopCode,
  },
  {
    number: "03",
    label: "Build",
    title: "Create real project work",
    description:
      "Apply your learning by building projects that demonstrate how you think, solve, and deliver.",
    icon: FaProjectDiagram,
  },
  {
    number: "04",
    label: "Grow",
    title: "Develop career readiness",
    description:
      "Turn your growing technical capability into a stronger portfolio and clearer career direction.",
    icon: FaRocket,
  },
];

/* =========================================================
   MAIN COMPONENT
   ========================================================= */

export default function SuccessStories() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="success-stories"
      className="
        relative
        overflow-hidden
        bg-[#F7FAFF]
        py-16
        sm:py-20
        lg:py-24
      "
    >
      <div
        className="
          mx-auto
          w-full
          max-w-7xl
          px-5
          sm:px-8
          lg:px-10
        "
      >
        {/* =====================================================
            INTRO
        ===================================================== */}

        <motion.div
          initial={
            shouldReduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 20,
                }
          }
          whileInView={
            shouldReduceMotion
              ? undefined
              : {
                  opacity: 1,
                  y: 0,
                }
          }
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.6,
          }}
          className="
            grid
            gap-8
            lg:grid-cols-[0.9fr_1.1fr]
            lg:items-end
          "
        >
          {/* left */}

          <div>
            <div
              className="
                flex
                items-center
                gap-3
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.22em]
                text-[#0C5FF5]
              "
            >
              <span
                className="
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-[#0289F9]
                "
              />

              Learning outcomes
            </div>

            <h2
              className="
                mt-4
                max-w-xl
                text-4xl
                font-semibold
                leading-[1.02]
                tracking-[-0.05em]
                text-[#0A1832]
                sm:text-5xl
                lg:text-[58px]
              "
            >
              Learning should
              <span
                className="
                  block
                  bg-gradient-to-r
                  from-[#0C5FF5]
                  via-[#0289F9]
                  to-[#3531E7]
                  bg-clip-text
                  text-transparent
                "
              >
                leave evidence.
              </span>
            </h2>
          </div>

          {/* right */}

          <div className="lg:pb-1">
            <p
              className="
                max-w-2xl
                text-sm
                leading-7
                text-slate-500
                sm:text-base
              "
            >
              DataLattice is designed around a simple progression:
              understand the fundamentals, practice the skill, build
              meaningful projects, and develop the confidence to take
              the next step.
            </p>
          </div>
        </motion.div>

        {/* =====================================================
            FEATURE STATEMENT
        ===================================================== */}

        <div
          className="
            mt-12
            grid
            overflow-hidden
            rounded-[30px]
            bg-[#0A1832]
            lg:grid-cols-[1.05fr_0.95fr]
          "
        >
          {/* ===================================================
              BIG STATEMENT
          =================================================== */}

          <motion.div
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                    x: -25,
                  }
            }
            whileInView={
              shouldReduceMotion
                ? undefined
                : {
                    opacity: 1,
                    x: 0,
                  }
            }
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.7,
            }}
            className="
              relative
              flex
              min-h-[390px]
              flex-col
              justify-between
              overflow-hidden
              p-7
              sm:p-10
              lg:p-12
            "
          >
            {/* structural lines */}

            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                inset-0
                opacity-[0.045]
              "
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
                backgroundSize: "46px 46px",
              }}
            />

            {/* accent line */}

            <div
              aria-hidden="true"
              className="
                absolute
                left-0
                top-0
                h-full
                w-1
                bg-gradient-to-b
                from-[#0C5FF5]
                via-[#0289F9]
                to-[#3531E7]
              "
            />

            <div className="relative z-10">
              <p
                className="
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.2em]
                  text-[#0289F9]
                "
              >
                The outcome
              </p>

              <h3
                className="
                  mt-6
                  max-w-2xl
                  text-3xl
                  font-semibold
                  leading-[1.08]
                  tracking-[-0.04em]
                  text-white
                  sm:text-4xl
                  lg:text-[48px]
                "
              >
                Don't just finish a
                <span className="text-[#0289F9]">
                  {" "}course.
                </span>
                <br />
                Build something
                <span className="text-[#3531E7]">
                  {" "}useful.
                </span>
              </h3>
            </div>

            <div
              className="
                relative
                z-10
                mt-10
                flex
                items-end
                justify-between
                gap-6
              "
            >
              <p
                className="
                  max-w-md
                  text-xs
                  leading-6
                  text-white/45
                  sm:text-sm
                "
              >
                A strong learning journey should leave you with
                practical work, clearer skills, and evidence of what
                you can actually do.
              </p>

              <div
                aria-hidden="true"
                className="
                  hidden
                  h-20
                  w-20
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[#0289F9]/30
                  sm:flex
                "
              >
                <div
                  className="
                    h-10
                    w-10
                    rounded-full
                    bg-gradient-to-br
                    from-[#0C5FF5]
                    via-[#0289F9]
                    to-[#3531E7]
                    shadow-[0_0_30px_rgba(12,95,245,0.3)]
                  "
                />
              </div>
            </div>
          </motion.div>

          {/* ===================================================
              OUTCOME MARKER
          =================================================== */}

          <motion.div
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                    x: 25,
                  }
            }
            whileInView={
              shouldReduceMotion
                ? undefined
                : {
                    opacity: 1,
                    x: 0,
                  }
            }
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.7,
              delay: shouldReduceMotion ? 0 : 0.1,
            }}
            className="
              relative
              flex
              min-h-[390px]
              items-center
              overflow-hidden
              border-t
              border-white/[0.08]
              bg-[#0D2040]
              px-7
              py-10
              sm:px-10
              lg:border-l
              lg:border-t-0
              lg:px-12
            "
          >
            {/* large number */}

            <div
              aria-hidden="true"
              className="
                absolute
                -right-4
                -top-12
                select-none
                text-[190px]
                font-black
                leading-none
                tracking-[-0.08em]
                text-white/[0.035]
              "
            >
              04
            </div>

            <div className="relative z-10 w-full">
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
                    text-white/35
                  "
                >
                  What you carry forward
                </span>

                <span
                  className="
                    text-[10px]
                    font-bold
                    tracking-[0.16em]
                    text-[#0289F9]
                  "
                >
                  01 — 04
                </span>
              </div>

              <div className="mt-10">
                <p
                  className="
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.2em]
                    text-[#0289F9]
                  "
                >
                  Practical capability
                </p>

                <p
                  className="
                    mt-4
                    max-w-md
                    text-2xl
                    font-semibold
                    leading-[1.2]
                    tracking-[-0.03em]
                    text-white
                    sm:text-3xl
                  "
                >
                  Knowledge becomes more valuable when
                  you can demonstrate it.
                </p>
              </div>

              {/* small outcome list */}

              <div
                className="
                  mt-10
                  border-t
                  border-white/10
                  pt-5
                "
              >
                <div
                  className="
                    flex
                    items-center
                    justify-between
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.16em]
                  "
                >
                  <span className="text-white/30">
                    Skills
                  </span>

                  <span className="text-white/55">
                    Projects
                  </span>

                  <span className="text-white/75">
                    Direction
                  </span>
                </div>

                <div
                  className="
                    mt-4
                    h-1
                    overflow-hidden
                    rounded-full
                    bg-white/10
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
                      duration: shouldReduceMotion
                        ? 0
                        : 1.2,
                      ease: "easeOut",
                    }}
                    className="
                      h-full
                      rounded-full
                      bg-gradient-to-r
                      from-[#0C5FF5]
                      via-[#0289F9]
                      to-[#3531E7]
                    "
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* =====================================================
            OUTCOME STORY
        ===================================================== */}

        <div className="mt-14">
          <div
            className="
              flex
              flex-col
              gap-2
              sm:flex-row
              sm:items-end
              sm:justify-between
            "
          >
            <div>
              <p
                className="
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.2em]
                  text-[#0289F9]
                "
              >
                From learning to doing
              </p>

              <h3
                className="
                  mt-2
                  text-2xl
                  font-semibold
                  tracking-[-0.035em]
                  text-[#0A1832]
                  sm:text-3xl
                "
              >
                The work changes as you grow.
              </h3>
            </div>

            <p
              className="
                text-[10px]
                text-slate-400
              "
            >
              Four stages of development
            </p>
          </div>

          {/* =================================================
              STORY TIMELINE
          ================================================= */}

          <div
            className="
              relative
              mt-10
            "
          >
            {/* animated central line */}

            <div
              aria-hidden="true"
              className="
                absolute
                bottom-5
                left-[18px]
                top-5
                w-px
                bg-slate-200
                lg:left-1/2
              "
            />

            <motion.div
              aria-hidden="true"
              initial={{
                scaleY: 0,
              }}
              whileInView={{
                scaleY: 1,
              }}
              viewport={{
                once: true,
                amount: 0.15,
              }}
              transition={{
                duration: shouldReduceMotion
                  ? 0
                  : 1.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                absolute
                bottom-5
                left-[18px]
                top-5
                w-px
                origin-top
                bg-gradient-to-b
                from-[#0C5FF5]
                via-[#0289F9]
                to-[#3531E7]
                lg:left-1/2
              "
            />

            <div className="space-y-10 lg:space-y-14">
              {learningSignals.map(
                (signal, index) => (
                  <OutcomeRow
                    key={signal.number}
                    signal={signal}
                    index={index}
                    shouldReduceMotion={
                      shouldReduceMotion
                    }
                  />
                )
              )}
            </div>
          </div>
        </div>

        {/* =====================================================
            FINAL CTA
        ===================================================== */}

        <motion.div
          initial={
            shouldReduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 18,
                }
          }
          whileInView={
            shouldReduceMotion
              ? undefined
              : {
                  opacity: 1,
                  y: 0,
                }
          }
          viewport={{
            once: true,
          }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.6,
          }}
          className="
            mt-14
            flex
            flex-col
            gap-5
            border-t
            border-[#DCE5F1]
            pt-7
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <div>
            <p
              className="
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.18em]
                text-[#0C5FF5]
              "
            >
              Ready to build?
            </p>

            <h3
              className="
                mt-1.5
                text-xl
                font-semibold
                tracking-[-0.03em]
                text-[#0A1832]
                sm:text-2xl
              "
            >
              Explore where your learning can start.
            </h3>
          </div>

          <motion.a
            href="/courses"
            whileHover={
              shouldReduceMotion
                ? undefined
                : {
                    x: 4,
                  }
            }
            className="
              inline-flex
              shrink-0
              items-center
              gap-3
              rounded-xl
              bg-[#0C5FF5]
              px-5
              py-3
              text-xs
              font-semibold
              text-white
              shadow-[0_10px_25px_rgba(12,95,245,0.18)]
              transition-all
              duration-200
              hover:bg-[#0289F9]
            "
          >
            Explore programs

            <FaArrowRight size={10} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

/* =========================================================
   OUTCOME ROW
   ========================================================= */

function OutcomeRow({
  signal,
  index,
  shouldReduceMotion,
}) {
  const Icon = signal.icon;

  const isEven = index % 2 === 0;

  return (
    <motion.article
      initial={
        shouldReduceMotion
          ? false
          : {
              opacity: 0,
              y: 20,
            }
      }
      whileInView={
        shouldReduceMotion
          ? undefined
          : {
              opacity: 1,
              y: 0,
            }
      }
      viewport={{
        once: true,
        amount: 0.25,
      }}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.55,
        delay: shouldReduceMotion
          ? 0
          : index * 0.06,
      }}
      className="
        relative
        grid
        grid-cols-[38px_1fr]
        gap-5
        lg:grid-cols-[1fr_70px_1fr]
        lg:items-center
        lg:gap-8
      "
    >
      {/* ===================================================
          LEFT SIDE
      =================================================== */}

      <div
        className={`
          ${
            isEven
              ? "lg:col-start-1 lg:row-start-1"
              : "lg:col-start-3 lg:row-start-1"
          }
          ${
            isEven
              ? "lg:text-right"
              : "lg:text-left"
          }
        `}
      >
        <p
          className="
            text-[9px]
            font-semibold
            uppercase
            tracking-[0.2em]
            text-[#0289F9]
          "
        >
          {signal.number} · {signal.label}
        </p>

        <h4
          className="
            mt-2
            text-xl
            font-semibold
            tracking-[-0.03em]
            text-[#0A1832]
            sm:text-2xl
          "
        >
          {signal.title}
        </h4>

        <p
          className="
            mt-2
            max-w-lg
            text-xs
            leading-6
            text-slate-500
            sm:text-sm
            sm:leading-6
            lg:ml-auto
          "
        >
          {signal.description}
        </p>
      </div>

      {/* ===================================================
          CENTER MARKER
      =================================================== */}

      <div
        className="
          relative
          z-10
          col-start-1
          row-start-1
          flex
          h-[38px]
          w-[38px]
          items-center
          justify-center
          rounded-full
          border
          border-[#CFE0F7]
          bg-[#F7FAFF]
          text-[#0C5FF5]
          lg:col-start-2
          lg:row-start-1
          lg:h-[54px]
          lg:w-[54px]
        "
      >
        <div
          className="
            flex
            h-7
            w-7
            items-center
            justify-center
            rounded-full
            bg-gradient-to-br
            from-[#0C5FF5]
            via-[#0289F9]
            to-[#3531E7]
            text-white
            shadow-[0_6px_18px_rgba(12,95,245,0.2)]
            lg:h-9
            lg:w-9
          "
        >
          <Icon size={11} />
        </div>
      </div>

      {/* ===================================================
          RIGHT SIDE — VISUAL NUMBER
      =================================================== */}

      <div
        className={`
          hidden
          lg:block
          ${
            isEven
              ? "lg:col-start-3"
              : "lg:col-start-1"
          }
          lg:row-start-1
        `}
      >
        <span
          className="
            block
            select-none
            text-[80px]
            font-black
            leading-none
            tracking-[-0.08em]
            text-[#0A1832]/[0.045]
          "
        >
          {signal.number}
        </span>
      </div>
    </motion.article>
  );
}