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
} from "react-icons/fa6";

/* =========================================================
   DATALATTICE STATS

   IMPORTANT:
   These values are kept from the existing website content.
   ========================================================= */

const stats = [
  {
    icon: FaUserGraduate,
    number: "150+",
    title: "Students",
    description: "Learning with DataLattice",
  },
  {
    icon: FaBookOpen,
    number: "15+",
    title: "Courses",
    description: "Career-focused programs",
  },
  {
    icon: FaBriefcase,
    number: "95%",
    title: "Placement",
    description: "Career outcomes",
  },
  {
    icon: FaChalkboard,
    number: "15+",
    title: "Mentors",
    description: "Industry professionals",
  },
];

/* =========================================================
   STATISTICS SECTION
   ========================================================= */

function Stats() {
  return (
    <section
      className="
        relative
        overflow-hidden
        bg-[#0A1832]
      "
    >
      {/* =====================================================
          SUBTLE BACKGROUND
          ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
        "
      >
        {/* Main blue glow */}

        <div
          className="
            absolute
            -left-40
            top-1/2
            h-[420px]
            w-[420px]
            -translate-y-1/2
            rounded-full
            opacity-20
            blur-[120px]
          "
          style={{
            background:
              "linear-gradient(135deg, #0C5FF5, #0289F9)",
          }}
        />

        {/* Small violet glow */}

        <div
          className="
            absolute
            -right-32
            bottom-[-160px]
            h-[380px]
            w-[380px]
            rounded-full
            opacity-20
            blur-[110px]
          "
          style={{
            background: "#3531E7",
          }}
        />

        {/* Very subtle grid */}

        <div
          className="
            absolute
            inset-0
            opacity-[0.025]
          "
          style={{
            backgroundImage: `
              linear-gradient(
                rgba(255,255,255,0.7) 1px,
                transparent 1px
              ),
              linear-gradient(
                90deg,
                rgba(255,255,255,0.7) 1px,
                transparent 1px
              )
            `,
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      {/* =====================================================
          CONTENT
          ===================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-[1280px]
          px-5
          py-16
          sm:px-8
          sm:py-20
          lg:px-10
          lg:py-[92px]
        "
      >
        <div
          className="
            grid
            items-center
            gap-12
            lg:grid-cols-[0.82fr_1.18fr]
            lg:gap-16
            xl:gap-24
          "
        >
          {/* =================================================
              LEFT EDITORIAL CONTENT
              ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              x: -20,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.25,
            }}
            transition={{
              duration: 0.65,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {/* Eyebrow */}

            <div className="flex items-center gap-3">
              <span
                className="
                  h-px
                  w-8
                  bg-[#0289F9]
                "
              />

              <span
                className="
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.2em]
                  text-[#7DD3FC]
                "
              >
                DataLattice by the numbers
              </span>
            </div>

            {/* Heading */}

            <h2
              className="
                mt-5
                max-w-[500px]
                text-[34px]
                font-black
                leading-[1.02]
                tracking-[-0.045em]
                text-white
                sm:text-[42px]
                lg:text-[46px]
              "
            >
              A growing community
              <br />

              <span
                className="
                  bg-clip-text
                  text-transparent
                "
                style={{
                  backgroundImage:
                    "linear-gradient(100deg, #0C5FF5 0%, #0289F9 50%, #7C73FF 100%)",
                }}
              >
                learning with purpose.
              </span>
            </h2>

            {/* Description */}

            <p
              className="
                mt-5
                max-w-[450px]
                text-sm
                font-medium
                leading-6
                text-white/55
                sm:text-[15px]
                sm:leading-7
              "
            >
              DataLattice brings together learners,
              focused programs, experienced mentors,
              and career-oriented learning in one
              growing ecosystem.
            </p>

            {/* Small supporting line */}

            <div
              className="
                mt-7
                flex
                items-center
                gap-3
              "
            >
              <div
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/10
                  bg-white/[0.05]
                "
              >
                <span
                  className="
                    h-2
                    w-2
                    rounded-full
                  "
                  style={{
                    background:
                      "linear-gradient(135deg, #0C5FF5, #0289F9, #3531E7)",
                  }}
                />
              </div>

              <p
                className="
                  text-[10px]
                  font-semibold
                  leading-4
                  text-white/45
                "
              >
                Learn practical skills.
                <br />
                Build work you can show.
              </p>
            </div>
          </motion.div>

          {/* =================================================
              RIGHT — STATISTICS
              ================================================= */}

          <div
            className="
              grid
              grid-cols-1
              border-t
              border-white/10
              sm:grid-cols-2
              sm:border-l
              sm:border-t-0
            "
          >
            {stats.map((item, index) => (
              <StatItem
                key={item.title}
                item={item}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>

      {/* =====================================================
          BOTTOM ACCENT
          ===================================================== */}

      <div
        aria-hidden="true"
        className="
          absolute
          bottom-0
          left-0
          h-px
          w-full
          opacity-60
        "
        style={{
          background:
            "linear-gradient(90deg, transparent, #0C5FF5, #0289F9, #3531E7, transparent)",
        }}
      />
    </section>
  );
}

/* =========================================================
   STAT ITEM
   ========================================================= */

function StatItem({
  item,
  index,
}) {
  const Icon = item.icon;

  return (
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
        amount: 0.25,
      }}
      transition={{
        duration: 0.55,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        group
        relative
        border-b
        border-white/10
        px-1
        py-7
        sm:border-b
        sm:px-7
        sm:py-8
        lg:px-9
        lg:py-9
      "
    >
      {/* Desktop vertical separator */}

      {index % 2 === 1 && (
        <div
          aria-hidden="true"
          className="
            absolute
            bottom-8
            left-0
            top-8
            hidden
            w-px
            bg-white/10
            sm:block
          "
        />
      )}

      {/* Icon */}

      <div className="flex items-center justify-between">
        <div
          className="
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-xl
            border
            border-white/10
            bg-white/[0.045]
            text-[#7DD3FC]
            transition-all
            duration-300
            group-hover:border-[#0289F9]/40
            group-hover:bg-[#0289F9]/10
            group-hover:text-white
          "
        >
          <Icon size={14} />
        </div>

        <span
          className="
            text-[9px]
            font-bold
            uppercase
            tracking-[0.14em]
            text-white/20
          "
        >
          0{index + 1}
        </span>
      </div>

      {/* Number */}

      <div className="mt-6">
        <AnimatedNumber value={item.number} />
      </div>

      {/* Title */}

      <h3
        className="
          mt-2
          text-sm
          font-bold
          text-white
          sm:text-[15px]
        "
      >
        {item.title}
      </h3>

      {/* Description */}

      <p
        className="
          mt-1.5
          max-w-[190px]
          text-[10px]
          font-medium
          leading-4
          text-white/40
        "
      >
        {item.description}
      </p>

      {/* Small hover accent */}

      <div
        className="
          absolute
          bottom-0
          left-0
          h-px
          w-0
          transition-all
          duration-500
          group-hover:w-20
        "
        style={{
          background:
            "linear-gradient(90deg, #0C5FF5, #0289F9, #3531E7)",
        }}
      />
    </motion.div>
  );
}

/* =========================================================
   ANIMATED NUMBER
   ========================================================= */

function AnimatedNumber({
  value,
}) {
  const numberRef = useRef(null);

  const isInView = useInView(
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

    const numericValue = parseInt(
      value.replace(/[^0-9]/g, ""),
      10
    );

    const suffix = value.replace(
      /[0-9]/g,
      ""
    );

    if (Number.isNaN(numericValue)) {
      setDisplayValue(value);
      return undefined;
    }

    const duration = 1000;
    const startTime = performance.now();

    let frameId;

    const animateNumber = (
      currentTime
    ) => {
      const elapsed =
        currentTime - startTime;

      const progress = Math.min(
        elapsed / duration,
        1
      );

      const eased =
        1 -
        Math.pow(
          1 - progress,
          3
        );

      const currentValue =
        Math.floor(
          numericValue * eased
        );

      setDisplayValue(
        `${currentValue}${suffix}`
      );

      if (progress < 1) {
        frameId =
          requestAnimationFrame(
            animateNumber
          );
      } else {
        setDisplayValue(value);
      }
    };

    frameId =
      requestAnimationFrame(
        animateNumber
      );

    return () => {
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
    };
  }, [isInView, value]);

  return (
    <span
      ref={numberRef}
      className="
        block
        text-[42px]
        font-black
        leading-none
        tracking-[-0.055em]
        text-white
        sm:text-[48px]
        lg:text-[52px]
      "
    >
      {displayValue}
    </span>
  );
}

export default Stats;