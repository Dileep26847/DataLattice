import React, { useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import {
  FiArrowRight,
  FiMinus,
  FiPlus,
} from "react-icons/fi";

/* =========================================================
   DATALATTICE FAQ
   ========================================================= */

const faqs = [
  {
    question: "What are the prerequisites for these programs?",
    answer:
      "Our programs are designed to be accessible to learners at different stages. The specific prerequisites may vary depending on the program, but you can begin with the fundamentals and build your skills progressively.",
  },
  {
    question: "Are the classes live or recorded?",
    answer:
      "The learning experience can include structured sessions and recorded learning resources so that learners can follow the material and revisit important concepts when needed.",
  },
  {
    question: "Will I work on real-world projects?",
    answer:
      "Yes. Practical project work is an important part of the learning experience. You will have opportunities to apply what you learn to projects that demonstrate your skills.",
  },
  {
    question: "Will I receive a certificate after completion?",
    answer:
      "Program completion and certificate details depend on the specific learning path. You will receive the relevant information before enrolling.",
  },
  {
    question: "Do you provide placement assistance?",
    answer:
      "Career support may include guidance around portfolios, interview preparation, career direction and other practical steps that can help you prepare for opportunities.",
  },
  {
    question: "Can I switch my batch if needed?",
    answer:
      "Batch changes may be possible depending on availability and the circumstances. Please contact the team to discuss your requirements.",
  },
  {
    question: "What is the refund policy?",
    answer:
      "Refund eligibility depends on the applicable program terms. Please review the specific refund conditions before completing your enrollment.",
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
              y: 10,
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
        amount: 0.2,
      }}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.4,
        delay: shouldReduceMotion ? 0 : index * 0.035,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="border-b border-[#E5EBF3]"
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="
          group
          flex
          w-full
          items-center
          justify-between
          gap-6
          py-5
          text-left
          sm:py-[18px]
        "
      >
        {/* Question */}

        <span
          className={`
            text-[13px]
            font-semibold
            leading-6
            tracking-[-0.01em]
            transition-colors
            duration-200
            sm:text-[14px]
            ${
              isOpen
                ? "text-[#0C5FF5]"
                : "text-[#172B4D] group-hover:text-[#0C5FF5]"
            }
          `}
        >
          {item.question}
        </span>

        {/* Plus / Minus */}

        <span
          className={`
            flex
            h-6
            w-6
            shrink-0
            items-center
            justify-center
            rounded-full
            transition-all
            duration-200
            ${
              isOpen
                ? "bg-[#0C5FF5] text-white"
                : "bg-[#EEF5FF] text-[#0C5FF5] group-hover:bg-[#E4EFFF]"
            }
          `}
        >
          {isOpen ? (
            <FiMinus size={12} />
          ) : (
            <FiPlus size={12} />
          )}
        </span>
      </button>

      {/* Answer */}

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
              duration: shouldReduceMotion ? 0 : 0.25,
              ease: "easeOut",
            }}
            className="overflow-hidden"
          >
            <div className="pb-5 pr-10">
              <p className="max-w-2xl text-[13px] leading-6 text-[#6B7A90]">
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
   MAIN FAQ
   ========================================================= */

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(-1);
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="faq"
      className="
        relative
        w-full
        overflow-hidden
        bg-white
        px-5
        py-16
        sm:px-8
        sm:py-20
        lg:px-10
        lg:py-24
      "
    >
      {/* =====================================================
          FAQ CONTENT
      ===================================================== */}

      <div
        className="
          mx-auto
          w-full
          max-w-[760px]
        "
      >
        {/* =================================================
            HEADER
        ================================================= */}

        <motion.div
          initial={
            shouldReduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 12,
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
            duration: shouldReduceMotion ? 0 : 0.55,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="text-center"
        >
          {/* Eyebrow */}

          <div
            className="
              inline-flex
              items-center
              justify-center
              rounded-full
              border
              border-[#CFE0FF]
              bg-[#F5F9FF]
              px-3
              py-1.5
            "
          >
            <span
              className="
                text-[8px]
                font-bold
                uppercase
                tracking-[0.16em]
                text-[#0C5FF5]
                sm:text-[9px]
              "
            >
              Frequently Asked Questions
            </span>
          </div>

          {/* Heading */}

          <h2
            className="
              mt-5
              text-[32px]
              font-black
              leading-[1.05]
              tracking-[-0.045em]
              text-[#0A1832]
              sm:text-[38px]
              lg:text-[40px]
            "
          >
            Got Questions? We've Got Answers.
          </h2>

          {/* Description */}

          <p
            className="
              mx-auto
              mt-4
              max-w-[620px]
              text-[12px]
              font-medium
              leading-6
              text-[#8290A4]
              sm:text-[13px]
            "
          >
            Everything you need to know about our technology
            programs, mentorship structure, and support model.
          </p>
        </motion.div>

        {/* =================================================
            QUESTIONS
        ================================================= */}

        <div
          className="
            mt-12
            border-t
            border-[#E5EBF3]
            sm:mt-14
          "
        >
          {faqs.map((item, index) => (
            <FAQItem
              key={item.question}
              item={item}
              index={index}
              isOpen={openIndex === index}
              onToggle={() =>
                setOpenIndex(
                  openIndex === index ? -1 : index
                )
              }
              shouldReduceMotion={shouldReduceMotion}
            />
          ))}
        </div>

        {/* =================================================
            VIEW ALL FAQS
        ================================================= */}

        <motion.div
          initial={
            shouldReduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 8,
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
            duration: shouldReduceMotion ? 0 : 0.45,
          }}
          className="mt-8 flex justify-center"
        >
          <motion.a
            href="/faq"
            whileHover={
              shouldReduceMotion
                ? undefined
                : {
                    y: -1,
                  }
            }
            whileTap={
              shouldReduceMotion
                ? undefined
                : {
                    scale: 0.98,
                  }
            }
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-full
              border
              border-[#CFE0FF]
              bg-[#F5F9FF]
              px-5
              py-2.5
              text-[10px]
              font-semibold
              text-[#0C5FF5]
              transition-all
              duration-200
              hover:border-[#0C5FF5]
              hover:bg-[#EEF5FF]
            "
          >
            View All FAQs

            <FiArrowRight size={12} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}