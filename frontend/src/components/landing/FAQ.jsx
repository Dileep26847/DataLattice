import React, { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  FiArrowRight,
  FiArrowUpRight,
  FiCheck,
  FiMinus,
  FiPlus,
} from "react-icons/fi";

/* =========================================================
   DATALATTICE FAQ
   ========================================================= */

const faqs = [
  {
    number: "01",
    question: "What is DataLattice?",
    answer:
      "DataLattice is a practical learning platform focused on helping learners build real skills in data science, data analytics and related career paths through structured learning and project-based practice.",
  },
  {
    number: "02",
    question: "What programs are available?",
    answer:
      "Our current programs include Data Science and Data Analytics. Each program focuses on building strong fundamentals, practical skills and project experience.",
  },
  {
    number: "03",
    question: "Are the programs suitable for beginners?",
    answer:
      "Yes. The learning journey is designed to start with the fundamentals and gradually move toward practical application and project work.",
  },
  {
    number: "04",
    question: "Will I work on real projects?",
    answer:
      "Yes. Practical project work is an important part of the learning experience. The goal is to help you turn what you learn into work you can actually demonstrate.",
  },
  {
    number: "05",
    question: "Do I need prior programming experience?",
    answer:
      "Prior experience can be helpful, but it is not required for starting from the fundamentals. The appropriate starting point depends on the program and your current skill level.",
  },
  {
    number: "06",
    question: "How do I choose between Data Science and Data Analytics?",
    answer:
      "Data Analytics focuses more on working with business data, SQL, visualization, dashboards and insights. Data Science goes further into Python, statistics, machine learning and practical data science workflows.",
  },
  {
    number: "07",
    question: "Can I explore the programs before enrolling?",
    answer:
      "Yes. You can explore the available programs and understand what each learning path covers before deciding to continue.",
  },
];

/* =========================================================
   FAQ ITEM
   ========================================================= */

function FAQItem({
  item,
  index,
  isOpen,
  onToggle,
  shouldReduceMotion,
}) {
  return (
    <motion.div
      initial={
        shouldReduceMotion
          ? false
          : {
              opacity: 0,
              y: 16,
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
        amount: 0.15,
      }}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.45,
        delay: shouldReduceMotion ? 0 : index * 0.04,
      }}
      className="border-b border-[#DCE5F1] last:border-b-0"
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="group flex w-full items-start gap-4 py-5 text-left sm:gap-6 sm:py-6"
      >
        {/* Number */}

        <span
          className={`
            mt-0.5
            w-7
            shrink-0
            text-[10px]
            font-bold
            tracking-[0.12em]
            transition-colors
            duration-200
            ${
              isOpen
                ? "text-[#0C5FF5]"
                : "text-[#9AA8BA] group-hover:text-[#0C5FF5]"
            }
          `}
        >
          {item.number}
        </span>

        {/* Question */}

        <span className="flex-1 pr-2">
          <span
            className={`
              block
              text-base
              font-semibold
              leading-7
              tracking-[-0.015em]
              transition-colors
              duration-200
              sm:text-[17px]
              ${
                isOpen
                  ? "text-[#0C5FF5]"
                  : "text-[#0A1832] group-hover:text-[#0C5FF5]"
              }
            `}
          >
            {item.question}
          </span>
        </span>

        {/* Icon */}

        <span
          className={`
            flex
            h-8
            w-8
            shrink-0
            items-center
            justify-center
            rounded-full
            border
            transition-all
            duration-200
            ${
              isOpen
                ? "border-[#0C5FF5] bg-[#0C5FF5] text-white"
                : "border-[#CBD7E5] bg-white text-[#0A1832] group-hover:border-[#0C5FF5]"
            }
          `}
        >
          {isOpen ? <FiMinus size={14} /> : <FiPlus size={14} />}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{
              height: 0,
              opacity: 0,
            }}
            animate={{
              height: "auto",
              opacity: 1,
            }}
            exit={{
              height: 0,
              opacity: 0,
            }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.24,
              ease: "easeOut",
            }}
            className="overflow-hidden"
          >
            <div className="ml-11 max-w-2xl pb-6 pr-10 sm:ml-[52px]">
              <p className="text-sm leading-7 text-[#5E6D81] sm:text-[15px]">
                {item.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* =========================================================
   MAIN COMPONENT
   ========================================================= */

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="faq"
      className="relative overflow-hidden bg-[#F7FAFF] py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* ===================================================
            MAIN FAQ FRAME
        =================================================== */}

        <div className="overflow-hidden rounded-[30px] bg-[#0A1832]">
          <div className="grid lg:grid-cols-[0.78fr_1.22fr]">
            {/* =================================================
                LEFT EDITORIAL PANEL
            ================================================= */}

            <div className="relative overflow-hidden p-7 sm:p-10 lg:p-12">
              {/* Subtle grid */}

              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-[0.035]"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
                  backgroundSize: "44px 44px",
                }}
              />

              {/* Gradient glow */}

              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-32 -left-24 h-72 w-72 rounded-full blur-3xl"
                style={{
                  background:
                    "radial-gradient(circle, rgba(12,95,245,0.25) 0%, rgba(12,95,245,0) 70%)",
                }}
              />

              <div className="relative z-10 flex min-h-[470px] flex-col">
                {/* Label */}

                <div className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#0289F9]" />

                  <span className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#4CA7FF]">
                    Before you start
                  </span>
                </div>

                {/* Heading */}

                <h2 className="mt-7 max-w-md text-4xl font-semibold leading-[1.02] tracking-[-0.05em] text-white sm:text-5xl lg:text-[52px]">
                  Questions
                  <br />
                  <span className="bg-gradient-to-r from-[#0C5FF5] via-[#0289F9] to-[#3531E7] bg-clip-text text-transparent">
                    before you
                  </span>
                  <br />
                  begin?
                </h2>

                <p className="mt-6 max-w-sm text-sm leading-7 text-white/55">
                  Choosing a learning path is easier when you know what to
                  expect. We have answered some of the questions learners ask
                  before getting started.
                </p>

                {/* Small checklist */}

                <div className="mt-8 space-y-3">
                  {[
                    "Understand the learning paths",
                    "Know what practical work involves",
                    "Choose where to begin",
                  ].map((text) => (
                    <div
                      key={text}
                      className="flex items-center gap-3 text-xs text-white/70"
                    >
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#0C5FF5]/15 text-[#4CA7FF]">
                        <FiCheck size={11} />
                      </span>

                      {text}
                    </div>
                  ))}
                </div>

                {/* Bottom marker */}

                <div className="mt-auto pt-10">
                  <div className="flex items-end justify-between border-t border-white/10 pt-5">
                    <div>
                      <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-white/30">
                        DataLattice
                      </p>

                      <p className="mt-1 text-xs text-white/50">
                        Learn. Build. Grow.
                      </p>
                    </div>

                    <span className="text-5xl font-black leading-none tracking-[-0.08em] text-white/[0.06]">
                      FAQ
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* =================================================
                RIGHT QUESTIONS PANEL
            ================================================= */}

            <div className="bg-white p-6 sm:p-8 lg:p-10">
              {/* Header */}

              <div className="mb-2 flex items-center justify-between">
                <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#0C5FF5]">
                  Common questions
                </p>

                <span className="text-[10px] font-medium text-[#9AA8BA]">
                  {String(faqs.length).padStart(2, "0")} answers
                </span>
              </div>

              {/* FAQ list */}

              <div className="border-t border-[#DCE5F1]">
                {faqs.map((item, index) => (
                  <FAQItem
                    key={item.question}
                    item={item}
                    index={index}
                    isOpen={openIndex === index}
                    onToggle={() =>
                      setOpenIndex(openIndex === index ? -1 : index)
                    }
                    shouldReduceMotion={shouldReduceMotion}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ===================================================
            BOTTOM CTA
        =================================================== */}

        <motion.div
          initial={
            shouldReduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 15,
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
            duration: shouldReduceMotion ? 0 : 0.5,
          }}
          className="
            mt-6
            flex
            flex-col
            gap-5
            rounded-2xl
            border
            border-[#DCE5F1]
            bg-white
            px-6
            py-6
            sm:flex-row
            sm:items-center
            sm:justify-between
            sm:px-8
          "
        >
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#0289F9]">
              Ready when you are
            </p>

            <h3 className="mt-1.5 text-lg font-semibold tracking-[-0.025em] text-[#0A1832] sm:text-xl">
              Explore the learning paths.
            </h3>
          </div>

          <motion.a
            href="/courses"
            whileHover={
              shouldReduceMotion
                ? undefined
                : {
                    x: 3,
                  }
            }
            className="
              inline-flex
              shrink-0
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-[#0C5FF5]
              px-5
              py-3
              text-xs
              font-semibold
              text-white
              shadow-[0_10px_24px_rgba(12,95,245,0.18)]
              transition-colors
              duration-200
              hover:bg-[#0289F9]
            "
          >
            Explore programs
            <FiArrowRight size={13} />
          </motion.a>
        </motion.div>

        {/* ===================================================
            SMALL NAVIGATION HINT
        =================================================== */}

        <div className="mt-5 flex justify-end">
          <a
            href="/courses"
            className="group inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7B8A9E] transition-colors hover:text-[#0C5FF5]"
          >
            View all programs

            <FiArrowUpRight
              size={12}
              className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
        </div>
      </div>
    </section>
  );
}