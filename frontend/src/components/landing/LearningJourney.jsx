import { motion } from "framer-motion";
import {
  FaArrowRight,
  FaBriefcase,
  FaCode,
  FaDatabase,
  FaGraduationCap,
  FaProjectDiagram,
} from "react-icons/fa";

const journeySteps = [
  {
    number: "STEP 1",
    title: "Learn",
    description: "Concepts through live & recorded sessions",
    icon: FaGraduationCap,
    color: "#2878F6",
    soft: "#EAF2FF",
  },
  {
    number: "STEP 2",
    title: "Practice",
    description: "Hands-on assignments and quizzes",
    icon: FaCode,
    color: "#12AFC8",
    soft: "#E8FAFC",
  },
  {
    number: "STEP 3",
    title: "Build",
    description: "Real-world projects and portfolio",
    icon: FaProjectDiagram,
    color: "#7130E8",
    soft: "#F1EAFE",
  },
  {
    number: "STEP 4",
    title: "Prepare",
    description: "Mock interviews and career guidance",
    icon: FaDatabase,
    color: "#F28A00",
    soft: "#FFF3DF",
  },
  {
    number: "STEP 5",
    title: "Grow",
    description: "Step into your dream career",
    icon: FaBriefcase,
    color: "#0EAD7D",
    soft: "#E6F8F2",
  },
];

function LearningJourney() {
  return (
    <section
      id="journey"
      className="
        relative
        overflow-hidden
        bg-[#F7FAFF]
        py-10
        sm:py-12
        lg:py-14
      "
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* ==================================================
            HEADER
        ================================================== */}

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            ease: "easeOut",
          }}
          viewport={{
            once: true,
            amount: 0.25,
          }}
          className="mx-auto max-w-3xl text-center"
        >
          {/* BADGE */}

          <div className="inline-flex items-center rounded-full border border-[#BCD5FF] bg-[#EAF2FF] px-4 py-1.5">
            <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#2878F6]">
              How It Works
            </span>
          </div>

          {/* HEADING */}

          <h2
            className="
              mt-4
              text-3xl
              font-bold
              tracking-[-0.045em]
              text-[#091A38]
              sm:text-4xl
              lg:text-[42px]
            "
          >
            Your Learning Journey
          </h2>

          {/* DESCRIPTION */}

          <p
            className="
              mx-auto
              mt-3
              max-w-2xl
              text-sm
              leading-6
              text-[#7B8CA8]
              sm:text-base
              sm:leading-7
            "
          >
            A simple, structured path to help you go from learning to a
            successful career.
          </p>
        </motion.div>

        {/* ==================================================
            JOURNEY STEPS
        ================================================== */}

        <div
          className="
            relative
            mx-auto
            mt-12
            max-w-6xl
            sm:mt-14
            lg:mt-16
          "
        >
          {/* ==================================================
              DESKTOP CONNECTING LINE
          ================================================== */}

          <div
            className="
              pointer-events-none
              absolute
              left-[9%]
              right-[9%]
              top-[38px]
              hidden
              h-[3px]
              lg:block
            "
          >
            <div
              className="
                absolute
                inset-0
                rounded-full
                bg-gradient-to-r
                from-[#2878F6]
                via-[#7130E8]
                to-[#0EAD7D]
              "
            />
          </div>

          {/* ==================================================
              STEPS
          ================================================== */}

          <div
            className="
              grid
              gap-9
              lg:grid-cols-5
              lg:gap-0
            "
          >
            {journeySteps.map((step, index) => {
              const Icon = step.icon;

              return (
                <motion.div
                  key={step.number}
                  initial={{
                    opacity: 0,
                    y: 16,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.06,
                    ease: "easeOut",
                  }}
                  viewport={{
                    once: true,
                    amount: 0.2,
                  }}
                  className="
                    relative
                    flex
                    flex-col
                    items-center
                    text-center
                  "
                >
                  {/* ==================================================
                      MOBILE CONNECTOR
                  ================================================== */}

                  {index < journeySteps.length - 1 && (
                    <div
                      className="
                        absolute
                        left-1/2
                        top-[68px]
                        h-8
                        w-[2px]
                        -translate-x-1/2
                        lg:hidden
                      "
                      style={{
                        background:
                          "linear-gradient(to bottom, #2878F6, #12AFC8)",
                      }}
                    />
                  )}

                  {/* ==================================================
                      ICON NODE
                  ================================================== */}

                  <motion.div
                    whileHover={{
                      scale: 1.05,
                    }}
                    transition={{
                      duration: 0.2,
                    }}
                    className="
                      relative
                      z-10
                      flex
                      h-[76px]
                      w-[76px]
                      items-center
                      justify-center
                      rounded-full
                      text-white
                      shadow-[0_10px_24px_rgba(20,90,180,0.20)]
                    "
                    style={{
                      backgroundColor: step.color,
                    }}
                  >
                    <Icon size={24} />

                    {/* STEP BADGE */}

                    <span
                      className="
                        absolute
                        -bottom-6
                        rounded-full
                        px-2.5
                        py-1
                        text-[9px]
                        font-bold
                        uppercase
                        tracking-wide
                      "
                      style={{
                        backgroundColor: step.soft,
                        color: step.color,
                      }}
                    >
                      {step.number}
                    </span>
                  </motion.div>

                  {/* ==================================================
                      CONTENT
                  ================================================== */}

                  <div className="mt-10 px-2">
                    <h3
                      className="
                        text-base
                        font-bold
                        tracking-[-0.02em]
                        text-[#091A38]
                        sm:text-lg
                      "
                    >
                      {step.title}
                    </h3>

                    <p
                      className="
                        mx-auto
                        mt-1.5
                        max-w-[180px]
                        text-xs
                        leading-5
                        text-[#8191AA]
                        sm:text-[13px]
                      "
                    >
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ==================================================
            CTA
        ================================================== */}

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
            delay: 0.2,
            ease: "easeOut",
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          className="
            mt-10
            flex
            justify-center
            sm:mt-12
          "
        >
          <button
            type="button"
            className="
              group
              inline-flex
              items-center
              gap-3
              rounded-full
              bg-gradient-to-r
              from-[#1267F5]
              to-[#11B5C8]
              px-6
              py-3
              text-sm
              font-bold
              text-white
              shadow-[0_10px_24px_rgba(18,103,245,0.20)]
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:shadow-[0_14px_30px_rgba(18,103,245,0.25)]
            "
          >
            Start Your Journey Today

            <FaArrowRight
              size={12}
              className="
                transition-transform
                duration-300
                group-hover:translate-x-1
              "
            />
          </button>
        </motion.div>
      </div>
    </section>
  );
}

export default LearningJourney;