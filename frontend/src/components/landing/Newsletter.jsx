import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FiCheck, FiMail } from "react-icons/fi";

export default function Newsletter() {
  const shouldReduceMotion = useReducedMotion();

  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) return;

    setSubmitted(true);
    setEmail("");
  };

  return (
    <section
      id="newsletter"
      className="
        relative
        overflow-hidden
        border-t
        border-[#DCE7F5]
        bg-[#EEF6FF]
        px-5
        py-14
        sm:px-8
        sm:py-16
        lg:px-10
        lg:py-[58px]
      "
    >
      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          overflow-hidden
        "
      >
        {/* left glow */}

        <div
          className="
            absolute
            -left-32
            top-1/2
            h-[260px]
            w-[260px]
            -translate-y-1/2
            rounded-full
            bg-[#0C5FF5]/[0.035]
            blur-3xl
          "
        />

        {/* right glow */}

        <div
          className="
            absolute
            -right-32
            top-1/2
            h-[280px]
            w-[280px]
            -translate-y-1/2
            rounded-full
            bg-[#3531E7]/[0.035]
            blur-3xl
          "
        />

        {/* subtle grid */}

        <div
          className="
            absolute
            inset-0
            opacity-[0.018]
          "
          style={{
            backgroundImage: `
              linear-gradient(#0A1832 1px, transparent 1px),
              linear-gradient(90deg, #0A1832 1px, transparent 1px)
            `,
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div className="relative z-10 mx-auto max-w-2xl text-center">
        {/* =================================================
            ICON
        ================================================= */}

        <motion.div
          initial={
            shouldReduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 12,
                  scale: 0.92,
                }
          }
          whileInView={
            shouldReduceMotion
              ? undefined
              : {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }
          }
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.45,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            mx-auto
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            border
            border-[#BFD8FF]
            bg-white
            text-[#0C5FF5]
            shadow-[0_5px_18px_rgba(12,95,245,0.06)]
            sm:h-11
            sm:w-11
          "
        >
          <FiMail size={16} />
        </motion.div>

        {/* =================================================
            HEADING
        ================================================= */}

        <motion.h2
          initial={
            shouldReduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 14,
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
            delay: shouldReduceMotion ? 0 : 0.05,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            mt-5
            text-3xl
            font-semibold
            leading-tight
            tracking-[-0.045em]
            text-[#0A1832]
            sm:text-[36px]
          "
        >
          Stay Updated
        </motion.h2>

        {/* =================================================
            DESCRIPTION
        ================================================= */}

        <motion.p
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
            amount: 0.3,
          }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.5,
            delay: shouldReduceMotion ? 0 : 0.1,
          }}
          className="
            mx-auto
            mt-2.5
            max-w-lg
            text-xs
            leading-5
            text-[#718198]
            sm:text-[13px]
            sm:leading-6
          "
        >
          Get the latest updates on new programs, workshops and career
          opportunities.
        </motion.p>

        {/* =================================================
            SUBSCRIBE FORM
        ================================================= */}

        <motion.form
          onSubmit={handleSubmit}
          initial={
            shouldReduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 14,
                  scale: 0.98,
                }
          }
          whileInView={
            shouldReduceMotion
              ? undefined
              : {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }
          }
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.55,
            delay: shouldReduceMotion ? 0 : 0.15,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            mx-auto
            mt-6
            flex
            w-full
            max-w-[480px]
            items-center
            rounded-full
            border
            border-[#D4DFEC]
            bg-white
            p-1
            shadow-[0_8px_25px_rgba(10,24,50,0.07)]
            transition-all
            duration-300
            focus-within:border-[#0C5FF5]/30
            focus-within:shadow-[0_10px_30px_rgba(12,95,245,0.10)]
          "
        >
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setSubmitted(false);
            }}
            placeholder="Enter your email address"
            required
            className="
              min-w-0
              flex-1
              bg-transparent
              px-3
              py-2.5
              text-[11px]
              font-medium
              text-[#0A1832]
              outline-none
              placeholder:text-[#A4B1C1]
              sm:px-4
              sm:text-xs
            "
          />

          <motion.button
            type="submit"
            whileHover={
              shouldReduceMotion
                ? undefined
                : {
                    scale: 1.025,
                  }
            }
            whileTap={
              shouldReduceMotion
                ? undefined
                : {
                    scale: 0.97,
                  }
            }
            className="
              flex
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-[#0C5FF5]
              px-5
              py-2.5
              text-[10px]
              font-semibold
              text-white
              shadow-[0_5px_14px_rgba(12,95,245,0.22)]
              transition-colors
              duration-200
              hover:bg-[#0289F9]
              sm:px-6
              sm:text-[11px]
            "
          >
            {submitted ? (
              <span className="flex items-center gap-1.5">
                <FiCheck size={12} />
                Subscribed
              </span>
            ) : (
              "Subscribe"
            )}
          </motion.button>
        </motion.form>

        {/* =================================================
            SUCCESS MESSAGE
        ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            height: 0,
          }}
          animate={{
            opacity: submitted ? 1 : 0,
            height: submitted ? "auto" : 0,
          }}
          className="overflow-hidden"
        >
          <p className="pt-3 text-[10px] font-medium text-[#0BA978]">
            You're on the list. We'll keep you updated.
          </p>
        </motion.div>
      </div>
    </section>
  );
}