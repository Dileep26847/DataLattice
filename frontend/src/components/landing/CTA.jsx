import { motion, useReducedMotion } from "framer-motion";
import {
  FaArrowRight,
  FaChartLine,
  FaCode,
  FaDatabase,
  FaRocket,
} from "react-icons/fa6";

const signals = [
  {
    label: "Data",
    icon: FaDatabase,
    position: "left-[10%] top-[24%]",
  },
  {
    label: "Analytics",
    icon: FaChartLine,
    position: "right-[10%] top-[27%]",
  },
  {
    label: "Projects",
    icon: FaCode,
    position: "left-[15%] bottom-[20%]",
  },
  {
    label: "Career",
    icon: FaRocket,
    position: "right-[14%] bottom-[18%]",
  },
];

export default function CTA() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="contact"
      className="
        relative
        isolate
        overflow-hidden
        bg-[#08172F]
        min-h-[430px]
        w-full
      "
    >
      {/* =====================================================
          BACKGROUND GRID
      ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.055]
        "
        style={{
          backgroundImage: `
            linear-gradient(
              rgba(255,255,255,0.8) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255,255,255,0.8) 1px,
              transparent 1px
            )
          `,
          backgroundSize: "48px 48px",
        }}
      />

      {/* =====================================================
          LARGE AMBIENT GLOWS
      ===================================================== */}

      <motion.div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[430px]
          w-[430px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-[#0C5FF5]/10
          blur-[100px]
        "
        animate={
          shouldReduceMotion
            ? undefined
            : {
                scale: [1, 1.15, 1],
                opacity: [0.45, 0.7, 0.45],
              }
        }
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-32
          top-[-180px]
          h-[420px]
          w-[420px]
          rounded-full
          bg-[#3531E7]/15
          blur-[110px]
        "
        animate={
          shouldReduceMotion
            ? undefined
            : {
                x: [0, -35, 0],
                y: [0, 25, 0],
              }
        }
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* =====================================================
          ANIMATED LIGHT PATHS
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
        <motion.div
          className="
            absolute
            left-[-10%]
            top-[48%]
            h-px
            w-[120%]
            bg-gradient-to-r
            from-transparent
            via-[#0289F9]/50
            to-transparent
          "
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  x: ["-10%", "10%", "-10%"],
                }
          }
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="
            absolute
            left-[50%]
            top-[-20%]
            h-[140%]
            w-px
            bg-gradient-to-b
            from-transparent
            via-[#0C5FF5]/30
            to-transparent
          "
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  opacity: [0.2, 0.6, 0.2],
                }
          }
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* =====================================================
          FLOATING SIGNALS
      ===================================================== */}

      {!shouldReduceMotion &&
        signals.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={item.label}
              className={`
                absolute
                z-10
                hidden
                items-center
                gap-2
                rounded-full
                border
                border-white/10
                bg-white/[0.045]
                px-3
                py-2
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.14em]
                text-white/45
                backdrop-blur-md
                sm:flex
                ${item.position}
              `}
              initial={{
                opacity: 0,
                y: 10,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              animate={{
                y: [0, index % 2 === 0 ? -8 : 8, 0],
              }}
              transition={{
                opacity: {
                  duration: 0.5,
                  delay: index * 0.12,
                },
                y: {
                  duration: 4 + index * 0.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
            >
              <Icon className="text-[#0289F9]" size={10} />

              {item.label}
            </motion.div>
          );
        })}

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <div
        className="
          relative
          z-20
          mx-auto
          flex
          min-h-[430px]
          w-full
          max-w-7xl
          items-center
          justify-center
          px-5
          py-14
          sm:px-8
          lg:px-10
        "
      >
        <div className="relative w-full max-w-[820px] text-center">
          {/* =================================================
              ORBIT
          ================================================= */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              left-1/2
              top-1/2
              h-[270px]
              w-[270px]
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              border
              border-[#0C5FF5]/10
              sm:h-[330px]
              sm:w-[330px]
            "
          />

          <motion.div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              left-1/2
              top-1/2
              h-[215px]
              w-[215px]
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              border
              border-[#0289F9]/20
              border-dashed
              sm:h-[265px]
              sm:w-[265px]
            "
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    rotate: 360,
                  }
            }
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* =================================================
              CENTER GLOW
          ================================================= */}

          <motion.div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              left-1/2
              top-[42%]
              h-28
              w-28
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              bg-[#0C5FF5]/20
              blur-[55px]
            "
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    scale: [1, 1.35, 1],
                    opacity: [0.4, 0.8, 0.4],
                  }
            }
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* =================================================
              EYEBROW
          ================================================= */}

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
              amount: 0.4,
            }}
            transition={{
              duration: 0.5,
            }}
            className="
              relative
              z-10
              mx-auto
              flex
              w-fit
              items-center
              gap-2
              rounded-full
              border
              border-[#0289F9]/20
              bg-[#0289F9]/[0.06]
              px-3.5
              py-1.5
            "
          >
            <motion.span
              className="
                h-1.5
                w-1.5
                rounded-full
                bg-[#0289F9]
              "
              animate={
                shouldReduceMotion
                  ? undefined
                  : {
                      opacity: [1, 0.35, 1],
                    }
              }
              transition={{
                duration: 1.8,
                repeat: Infinity,
              }}
            />

            <span
              className="
                text-[9px]
                font-bold
                uppercase
                tracking-[0.22em]
                text-[#4CA7FF]
              "
            >
              Your next move
            </span>
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
              amount: 0.4,
            }}
            transition={{
              duration: 0.65,
              delay: 0.05,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              relative
              z-10
              mt-5
              text-[36px]
              font-black
              leading-[1]
              tracking-[-0.055em]
              text-white
              sm:text-[48px]
              lg:text-[56px]
            "
          >
            Ready to build
            <br />

            <span
              className="
                bg-gradient-to-r
                from-[#0C5FF5]
                via-[#0289F9]
                to-[#6E63FF]
                bg-clip-text
                text-transparent
              "
            >
              your future?
            </span>
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
              amount: 0.4,
            }}
            transition={{
              duration: 0.55,
              delay: 0.12,
            }}
            className="
              relative
              z-10
              mx-auto
              mt-5
              max-w-[590px]
              text-[13px]
              font-medium
              leading-6
              text-white/45
              sm:text-[14px]
            "
          >
            Build practical technology skills through structured
            learning, real projects and expert mentorship.
          </motion.p>

          {/* =================================================
              ACTIONS
          ================================================= */}

          <motion.div
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
              amount: 0.4,
            }}
            transition={{
              duration: 0.55,
              delay: 0.2,
            }}
            className="
              relative
              z-10
              mt-7
              flex
              flex-col
              items-center
              justify-center
              gap-3
              sm:flex-row
            "
          >
            {/* Primary */}

            <motion.a
              href="/courses"
              whileHover={
                shouldReduceMotion
                  ? undefined
                  : {
                      y: -3,
                      scale: 1.02,
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
                group
                relative
                inline-flex
                items-center
                justify-center
                gap-2
                overflow-hidden
                rounded-xl
                bg-[#0C5FF5]
                px-6
                py-3.5
                text-xs
                font-bold
                text-white
                shadow-[0_12px_35px_rgba(12,95,245,0.3)]
              "
            >
              {/* Button shine */}

              <span
                aria-hidden="true"
                className="
                  absolute
                  inset-y-0
                  -left-20
                  w-12
                  rotate-[20deg]
                  bg-white/20
                  blur-md
                  transition-all
                  duration-700
                  group-hover:left-[110%]
                "
              />

              <span className="relative z-10">
                Explore Programs
              </span>

              <FaArrowRight
                className="
                  relative
                  z-10
                  text-[10px]
                  transition-transform
                  duration-200
                  group-hover:translate-x-1
                "
              />
            </motion.a>

            {/* Secondary */}

            <motion.a
              href="/login"
              whileHover={
                shouldReduceMotion
                  ? undefined
                  : {
                      y: -3,
                    }
              }
              className="
                inline-flex
                items-center
                justify-center
                rounded-xl
                border
                border-white/20
                bg-white/[0.025]
                px-6
                py-3.5
                text-xs
                font-bold
                text-white/85
                backdrop-blur-sm
                transition-all
                duration-200
                hover:border-[#0289F9]/50
                hover:bg-white/[0.06]
                hover:text-white
              "
            >
              Talk to Our Team
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* =====================================================
          BOTTOM LIGHT LINE
      ===================================================== */}

      <motion.div
        aria-hidden="true"
        className="
          absolute
          bottom-0
          left-0
          h-px
          w-full
          bg-gradient-to-r
          from-transparent
          via-[#0289F9]
          to-transparent
        "
        animate={
          shouldReduceMotion
            ? undefined
            : {
                opacity: [0.3, 1, 0.3],
              }
        }
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </section>
  );
}