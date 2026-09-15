import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  motion,
  useInView,
} from "framer-motion";

import {
  FaUserGraduate,
  FaBookOpen,
  FaBriefcase,
  FaChalkboard,
  FaArrowRight,
} from "react-icons/fa";


// ============================================================
// DATALATTICE STATS
// ============================================================

const stats = [
  {
    icon: <FaUserGraduate />,
    number: "150+",
    title: "Students",
    description: "Learning with DataLattice",
  },

  {
    icon: <FaBookOpen />,
    number: "15+",
    title: "Courses",
    description: "Career-focused programs",
  },

  {
    icon: <FaBriefcase />,
    number: "95%",
    title: "Placement",
    description: "Career outcomes",
  },

  {
    icon: <FaChalkboard />,
    number: "15+",
    title: "Mentors",
    description: "Industry professionals",
  },
];


// ============================================================
// COMPONENT
// ============================================================

function Stats() {
  return (
    <section
      className="
        relative
        overflow-hidden
        bg-[#1463FF]
      "
    >

      {/* ======================================================
          ANIMATED BACKGROUND SYSTEM
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

        {/* ==================================================
            LEFT GLOW
        ================================================== */}

        <motion.div
          animate={{
            x: [0, 45, 0],
            y: [0, -20, 0],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            -left-48
            top-1/2
            h-[430px]
            w-[430px]
            -translate-y-1/2
            rounded-full
            bg-cyan-300/[0.08]
            blur-[120px]
          "
        />


        {/* ==================================================
            RIGHT GLOW
        ================================================== */}

        <motion.div
          animate={{
            x: [0, -40, 0],
            y: [0, 25, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            -right-48
            top-1/3
            h-[450px]
            w-[450px]
            rounded-full
            bg-white/[0.07]
            blur-[125px]
          "
        />


        {/* ==================================================
            TECHNICAL GRID
        ================================================== */}

        <div
          className="
            absolute
            inset-0
            opacity-[0.11]
          "
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.24) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.24) 1px, transparent 1px)",
            backgroundSize:
              "48px 48px",
          }}
        />


        {/* ==================================================
            LARGE ORBIT
        ================================================== */}

        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 42,
            repeat: Infinity,
            ease: "linear",
          }}
          className="
            absolute
            left-1/2
            top-1/2
            h-[500px]
            w-[500px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            border
            border-white/[0.055]
          "
        >

          <span
            className="
              absolute
              left-1/2
              top-0
              h-2
              w-2
              -translate-x-1/2
              rounded-full
              bg-white/50
              shadow-[0_0_18px_rgba(255,255,255,0.55)]
            "
          />

        </motion.div>


        {/* ==================================================
            SECOND ORBIT
        ================================================== */}

        <motion.div
          animate={{
            rotate: -360,
          }}
          transition={{
            duration: 58,
            repeat: Infinity,
            ease: "linear",
          }}
          className="
            absolute
            left-1/2
            top-1/2
            h-[680px]
            w-[680px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            border
            border-white/[0.035]
          "
        >

          <span
            className="
              absolute
              right-[8%]
              top-[22%]
              h-1.5
              w-1.5
              rounded-full
              bg-cyan-200/60
              shadow-[0_0_15px_rgba(165,243,252,0.6)]
            "
          />

        </motion.div>


        {/* ==================================================
            DATA FLOW SVG
        ================================================== */}

        <svg
          className="
            absolute
            inset-0
            h-full
            w-full
          "
          viewBox="0 0 1440 300"
          preserveAspectRatio="none"
          fill="none"
        >

          {/* Main data line */}

          <motion.path
            d="
              M-40 188
              C120 155 190 192 315 158
              C435 125 490 168 610 132
              C730 98 780 140 900 106
              C1020 72 1080 110 1195 80
              C1300 53 1380 78 1480 48
            "
            stroke="white"
            strokeOpacity="0.14"
            strokeWidth="1"
            initial={{
              pathLength: 0,
            }}
            whileInView={{
              pathLength: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 2.2,
              ease: "easeInOut",
            }}
          />


          {/* Secondary dashed line */}

          <path
            d="
              M-40 204
              C120 171 190 208 315 174
              C435 141 490 184 610 148
              C730 114 780 156 900 122
              C1020 88 1080 126 1195 96
              C1300 69 1380 94 1480 64
            "
            stroke="white"
            strokeOpacity="0.07"
            strokeWidth="1"
            strokeDasharray="4 10"
          />


          {/* Upper line */}

          <path
            d="
              M-30 72
              C140 50 230 82 380 58
              C520 36 600 68 740 46
              C870 26 960 55 1080 38
              C1210 20 1320 44 1470 20
            "
            stroke="white"
            strokeOpacity="0.045"
            strokeWidth="1"
            strokeDasharray="2 12"
          />

        </svg>


        {/* ==================================================
            MOVING DATA SIGNAL
        ================================================== */}

        <motion.div
          animate={{
            x: [
              "-20%",
              "120%",
            ],
            opacity: [
              0,
              0.9,
              0.9,
              0,
            ],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "linear",
          }}
          className="
            absolute
            left-0
            top-[62%]
            h-px
            w-44
            bg-gradient-to-r
            from-transparent
            via-cyan-100
            to-transparent
          "
        />


        {/* ==================================================
            FLOATING DATA POINTS
        ================================================== */}

        <DataPoint
          left="8%"
          top="24%"
          delay={0}
        />

        <DataPoint
          left="20%"
          top="70%"
          delay={1.3}
        />

        <DataPoint
          left="34%"
          top="21%"
          delay={2.1}
        />

        <DataPoint
          left="51%"
          top="76%"
          delay={0.7}
        />

        <DataPoint
          left="66%"
          top="23%"
          delay={1.8}
        />

        <DataPoint
          left="81%"
          top="69%"
          delay={1}
        />

        <DataPoint
          left="94%"
          top="31%"
          delay={2.6}
        />

      </div>


      {/* ======================================================
          MAIN CONTENT
      ====================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          w-full
          max-w-7xl
          px-5
          py-12
          sm:px-7
          sm:py-14
          lg:px-8
          lg:py-16
        "
      >

        {/* ==================================================
            HEADER
        ================================================== */}

        <motion.div
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
            amount: 0.3,
          }}
          transition={{
            duration: 0.6,
            ease: [
              0.22,
              1,
              0.36,
              1,
            ],
          }}
          className="
            mx-auto
            max-w-xl
            text-center
          "
        >

          {/* =================================================
              EYEBROW
          ================================================= */}

          <div
            className="
              inline-flex
              items-center
              gap-2.5
              rounded-full
              border
              border-white/20
              bg-white/[0.08]
              px-4
              py-2
              backdrop-blur-md
            "
          >

            <motion.span
              animate={{
                scale: [
                  1,
                  1.6,
                  1,
                ],
                opacity: [
                  0.5,
                  1,
                  0.5,
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                h-1.5
                w-1.5
                rounded-full
                bg-white
              "
            />

            <span
              className="
                text-[9px]
                font-bold
                uppercase
                tracking-[0.22em]
                text-white/75
              "
            >
              DataLattice at a glance
            </span>

          </div>


          {/* =================================================
              HEADLINE
          ================================================= */}

          <h2
            className="
              mt-4
              text-2xl
              font-semibold
              leading-tight
              tracking-[-0.04em]
              text-white
              sm:text-3xl
            "
          >
            Learning powered by

            <span
              className="
                ml-2
                text-cyan-100
              "
            >
              real outcomes.
            </span>

          </h2>


          {/* =================================================
              DESCRIPTION
          ================================================= */}

          <p
            className="
              mx-auto
              mt-3
              max-w-lg
              text-xs
              leading-5
              text-white/55
              sm:text-sm
            "
          >
            A growing learning ecosystem connecting students,
            programs, mentors and career outcomes.
          </p>

        </motion.div>


        {/* ==================================================
            STATS AREA
        ================================================== */}

        <div
          className="
            relative
            mx-auto
            mt-10
            max-w-6xl
          "
        >

          {/* =================================================
              DESKTOP CENTER SIGNAL
          ================================================= */}

          <div
            className="
              pointer-events-none
              absolute
              left-1/2
              top-1/2
              z-20
              hidden
              -translate-x-1/2
              -translate-y-1/2
              lg:block
            "
          >

            <motion.div
              animate={{
                scale: [
                  0.85,
                  1.12,
                  0.85,
                ],
                opacity: [
                  0.35,
                  0.75,
                  0.35,
                ],
              }}
              transition={{
                duration: 2.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-full
                border
                border-white/20
                bg-white/[0.08]
                backdrop-blur-md
              "
            >

              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="
                  flex
                  items-center
                  justify-center
                "
              >

                <FaArrowRight
                  size={14}
                  className="
                    text-cyan-100
                  "
                />

              </motion.div>

            </motion.div>

          </div>


          {/* =================================================
              DESKTOP CONNECTING LINE
          ================================================= */}

          <div
            className="
              pointer-events-none
              absolute
              left-[10%]
              right-[10%]
              top-1/2
              hidden
              h-px
              -translate-y-1/2
              bg-white/[0.10]
              lg:block
            "
          >

            <motion.div
              animate={{
                x: [
                  "-20%",
                  "120%",
                ],
              }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "linear",
              }}
              className="
                absolute
                left-0
                top-0
                h-px
                w-24
                bg-gradient-to-r
                from-transparent
                via-cyan-200/80
                to-transparent
              "
            />

          </div>


          {/* =================================================
              STAT GRID
          ================================================= */}

          <div
            className="
              grid
              grid-cols-1
              gap-4
              sm:grid-cols-2
              lg:grid-cols-4
              lg:gap-3
            "
          >

            {stats.map(
              (
                item,
                index
              ) => (

                <StatItem
                  key={
                    item.title
                  }
                  item={
                    item
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
            SMALL BOTTOM STATUS
        ================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 8,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            delay: 0.8,
            duration: 0.5,
          }}
          className="
            mt-8
            flex
            items-center
            justify-center
            gap-2
          "
        >

          <motion.span
            animate={{
              scale: [
                1,
                1.5,
                1,
              ],
              opacity: [
                0.35,
                1,
                0.35,
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="
              h-1
              w-1
              rounded-full
              bg-cyan-200
            "
          />

          <span
            className="
              text-[9px]
              font-medium
              uppercase
              tracking-[0.18em]
              text-white/35
            "
          >
            Growing every day
          </span>

          <motion.span
            animate={{
              scale: [
                1,
                1.5,
                1,
              ],
              opacity: [
                0.35,
                1,
                0.35,
              ],
            }}
            transition={{
              duration: 2,
              delay: 0.4,
              repeat: Infinity,
            }}
            className="
              h-1
              w-1
              rounded-full
              bg-cyan-200
            "
          />

        </motion.div>

      </div>

    </section>
  );
}


// ============================================================
// STAT ITEM
// ============================================================

function StatItem({
  item,
  index,
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 25,
        scale: 0.96,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      viewport={{
        once: true,
        amount: 0.25,
      }}
      transition={{
        delay:
          index * 0.12,
        duration: 0.65,
        ease: [
          0.22,
          1,
          0.36,
          1,
        ],
      }}
      whileHover={{
        y: -5,
      }}
      className="
        group
        relative
      "
    >

      {/* ==================================================
          CARD
      ================================================== */}

      <div
        className="
          relative
          overflow-hidden
          rounded-[22px]
          border
          border-white/[0.13]
          bg-white/[0.075]
          p-5
          backdrop-blur-md
          transition-all
          duration-500
          group-hover:border-white/[0.28]
          group-hover:bg-white/[0.11]
          group-hover:shadow-[0_20px_50px_rgba(11,27,58,0.16)]
          sm:p-6
          lg:min-h-[158px]
        "
      >

        {/* =================================================
            CARD LIGHT
        ================================================= */}

        <motion.div
          animate={{
            scale: [
              1,
              1.18,
              1,
            ],
            opacity: [
              0.35,
              0.65,
              0.35,
            ],
          }}
          transition={{
            duration: 4,
            delay:
              index * 0.35,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            pointer-events-none
            absolute
            -right-16
            -top-16
            h-32
            w-32
            rounded-full
            bg-cyan-200/[0.08]
            blur-3xl
          "
        />


        {/* =================================================
            TOP ROW
        ================================================= */}

        <div
          className="
            relative
            z-10
            flex
            items-start
            justify-between
          "
        >

          {/* ICON */}

          <motion.div
            whileHover={{
              rotate: -6,
              scale: 1.08,
            }}
            transition={{
              duration: 0.25,
            }}
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-xl
              border
              border-white/20
              bg-white/[0.10]
              text-white
              shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]
            "
          >
            {item.icon}
          </motion.div>


          {/* LIVE STATUS */}

          <div
            className="
              flex
              items-center
              gap-1.5
              rounded-full
              border
              border-white/10
              bg-white/[0.06]
              px-2
              py-1
            "
          >

            <motion.span
              animate={{
                opacity: [
                  0.35,
                  1,
                  0.35,
                ],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                h-1.5
                w-1.5
                rounded-full
                bg-cyan-200
              "
            />

            <span
              className="
                text-[7px]
                font-bold
                uppercase
                tracking-[0.12em]
                text-white/45
              "
            >
              Active
            </span>

          </div>

        </div>


        {/* =================================================
            NUMBER
        ================================================= */}

        <div
          className="
            relative
            z-10
            mt-5
          "
        >

          <div
            className="
              flex
              items-baseline
              gap-2
            "
          >

            <AnimatedNumber
              value={
                item.number
              }
            />

            <span
              className="
                h-1.5
                w-1.5
                rounded-full
                bg-cyan-200/80
                shadow-[0_0_10px_rgba(165,243,252,0.55)]
              "
            />

          </div>


          {/* TITLE */}

          <p
            className="
              mt-1.5
              text-sm
              font-semibold
              text-white
            "
          >
            {item.title}
          </p>


          {/* DESCRIPTION */}

          <p
            className="
              mt-1
              text-[10px]
              leading-4
              text-white/50
            "
          >
            {item.description}
          </p>

        </div>


        {/* =================================================
            CARD BOTTOM SIGNAL
        ================================================= */}

        <div
          className="
            absolute
            bottom-0
            left-5
            right-5
            h-px
            overflow-hidden
            bg-white/[0.08]
          "
        >

          <motion.div
            animate={{
              x: [
                "-100%",
                "250%",
              ],
            }}
            transition={{
              duration: 3.2,
              delay:
                index * 0.4,
              repeat: Infinity,
              ease: "linear",
            }}
            className="
              h-full
              w-16
              bg-gradient-to-r
              from-transparent
              via-cyan-200/70
              to-transparent
            "
          />

        </div>

      </div>


      {/* ==================================================
          DESKTOP SEPARATOR
      ================================================== */}

      {index <
        stats.length - 1 && (
        <div
          className="
            pointer-events-none
            absolute
            -right-2
            top-1/2
            hidden
            h-14
            w-px
            -translate-y-1/2
            bg-white/[0.10]
            lg:block
          "
        />
      )}

    </motion.div>
  );
}


// ============================================================
// ANIMATED NUMBER
// ============================================================

function AnimatedNumber({
  value,
}) {
  const numberRef =
    useRef(null);

  const isInView =
    useInView(
      numberRef,
      {
        once: true,
        amount: 0.5,
      }
    );

  const [displayValue, setDisplayValue] =
    useState("0");

  useEffect(() => {
    if (!isInView) {
      return undefined;
    }

    const numericValue =
      parseInt(
        value.replace(
          /[^0-9]/g,
          ""
        ),
        10
      );

    const suffix =
      value.replace(
        /[0-9]/g,
        ""
      );

    if (
      Number.isNaN(
        numericValue
      )
    ) {
      setDisplayValue(
        value
      );

      return undefined;
    }

    const duration =
      1100;

    const startTime =
      performance.now();

    let frameId;

    const animateNumber = (
      currentTime
    ) => {
      const elapsed =
        currentTime -
        startTime;

      const progress =
        Math.min(
          elapsed /
            duration,
          1
        );

      /*
       * Smooth ease-out.
       */
      const eased =
        1 -
        Math.pow(
          1 - progress,
          3
        );

      const currentValue =
        Math.floor(
          numericValue *
            eased
        );

      setDisplayValue(
        `${currentValue}${suffix}`
      );

      if (
        progress <
        1
      ) {
        frameId =
          requestAnimationFrame(
            animateNumber
          );
      } else {
        /*
         * Always finish with
         * the original exact value.
         */
        setDisplayValue(
          value
        );
      }
    };

    frameId =
      requestAnimationFrame(
        animateNumber
      );

    return () => {
      if (frameId) {
        cancelAnimationFrame(
          frameId
        );
      }
    };
  }, [
    isInView,
    value,
  ]);

  return (
    <motion.span
      ref={numberRef}
      className="
        text-3xl
        font-bold
        leading-none
        tracking-[-0.045em]
        text-white
        sm:text-4xl
      "
    >
      {displayValue}
    </motion.span>
  );
}


// ============================================================
// FLOATING DATA POINT
// ============================================================

function DataPoint({
  left,
  top,
  delay,
}) {
  return (
    <motion.span
      className="
        absolute
        h-1.5
        w-1.5
        rounded-full
        bg-white/55
        shadow-[0_0_0_5px_rgba(255,255,255,0.045)]
      "
      style={{
        left,
        top,
      }}
      animate={{
        x: [
          0,
          4,
          0,
        ],
        y: [
          0,
          -8,
          0,
        ],
        scale: [
          0.8,
          1.25,
          0.8,
        ],
        opacity: [
          0.3,
          0.9,
          0.3,
        ],
      }}
      transition={{
        duration: 3.5,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}


export default Stats;