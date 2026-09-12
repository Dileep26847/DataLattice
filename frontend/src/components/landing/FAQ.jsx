import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  FaArrowRight,
  FaBookOpen,
  FaChevronDown,
  FaCircle,
  FaQuestionCircle,
} from "react-icons/fa";

const faqs = [
  {
    q: "What can I learn with DataLattice?",
    a: "DataLattice currently focuses on two public learning paths: Data Science and Data Analytics. Each path is designed around structured learning, practical skill development, and project-based application.",
    icon: FaBookOpen,
  },
  {
    q: "Do I need prior coding experience?",
    a: "Prior experience depends on the learning path and your starting point. The programs are structured to build foundational concepts before moving into more practical and advanced topics.",
    icon: FaQuestionCircle,
  },
  {
    q: "How does the learning journey work?",
    a: "The learning experience follows a practical progression: learn the fundamentals, practice the concepts, complete assessments and exercises, build projects, and continue developing career-ready capability.",
    icon: FaCircle,
  },
  {
    q: "Can I track my learning progress?",
    a: "Yes. Student learning activity is connected to the DataLattice learning platform, where progress, lessons, assessments, assignments, projects, and other learning activity can be managed as part of the student experience.",
    icon: FaCircle,
  },
  {
    q: "Are projects part of the learning experience?",
    a: "Projects are an important part of the DataLattice learning approach. The goal is to move beyond theory and give learners opportunities to apply concepts and build practical work.",
    icon: FaCircle,
  },
  {
    q: "How do I get started?",
    a: "Choose the Data Science or Data Analytics path that matches your goals, review the available program information, and continue through the registration and learning workflow.",
    icon: FaArrowRight,
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  const toggleFaq = (index) => {
    setOpen((current) => (current === index ? -1 : index));
  };

  return (
    <section
      id="faq-section"
      className="relative overflow-hidden bg-slate-50 py-24 sm:py-28"
    >
      <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-indigo-100/70 blur-3xl" />
      <div className="absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-cyan-100/60 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <motion.div
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                    x: -24,
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
              amount: 0.3,
            }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.65,
            }}
            className="lg:sticky lg:top-28"
          >
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-indigo-600" />

              <p className="text-xs font-bold uppercase tracking-[0.24em] text-indigo-600">
                FAQ
              </p>
            </div>

            <h2 className="mt-5 text-4xl font-bold tracking-[-0.04em] text-slate-950 sm:text-5xl">
              Questions before you{" "}
              <span className="text-indigo-600">start.</span>
            </h2>

            <p className="mt-6 max-w-lg text-base leading-7 text-slate-600">
              A few things to know about the DataLattice learning experience,
              programs, progress tracking, and project-based approach.
            </p>

            <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-white">
                  <FaQuestionCircle className="text-sm" />
                </div>

                <div>
                  <p className="font-bold text-slate-950">
                    Still have a question?
                  </p>

                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    Use the available contact or support channels if you need
                    help with something specific.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                    x: 24,
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
              duration: shouldReduceMotion ? 0 : 0.65,
              delay: shouldReduceMotion ? 0 : 0.08,
            }}
            className="space-y-4"
          >
            {faqs.map((faq, index) => {
              const isOpen = open === index;
              const Icon = faq.icon;

              return (
                <div
                  key={faq.q}
                  className={`overflow-hidden rounded-3xl border bg-white transition-all duration-300 ${
                    isOpen
                      ? "border-indigo-200 shadow-lg shadow-indigo-100/50"
                      : "border-slate-200 shadow-sm hover:border-slate-300"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                    className="flex w-full items-center gap-4 p-5 text-left sm:p-6"
                  >
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl transition-colors duration-300 ${
                        isOpen
                          ? "bg-indigo-600 text-white"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      <Icon className="text-sm" />
                    </div>

                    <span className="flex-1 pr-3 text-base font-bold text-slate-950 sm:text-lg">
                      {faq.q}
                    </span>

                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                        isOpen
                          ? "bg-indigo-50 text-indigo-600"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      <FaChevronDown
                        className={`text-xs transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-answer-${index}`}
                        initial={
                          shouldReduceMotion
                            ? false
                            : {
                                height: 0,
                                opacity: 0,
                              }
                        }
                        animate={{
                          height: "auto",
                          opacity: 1,
                        }}
                        exit={
                          shouldReduceMotion
                            ? undefined
                            : {
                                height: 0,
                                opacity: 0,
                              }
                        }
                        transition={{
                          duration: shouldReduceMotion ? 0 : 0.25,
                        }}
                      >
                        <div className="border-t border-slate-100 px-5 pb-6 pt-5 pl-[4.5rem] sm:px-6 sm:pb-7 sm:pl-[5rem]">
                          <p className="max-w-2xl text-sm leading-7 text-slate-600">
                            {faq.a}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}