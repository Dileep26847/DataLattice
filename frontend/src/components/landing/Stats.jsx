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
   ========================================================= */

const stats = [
  {
    icon: FaUserGraduate,
    number: "150+",
    title: "Students",
    description: "Learning with DataLattice",
    color: "#0C5FF5",
  },
  {
    icon: FaBookOpen,
    number: "15+",
    title: "Courses",
    description: "Career-focused programs",
    color: "#0289F9",
  },
  {
    icon: FaBriefcase,
    number: "95%",
    title: "Placement",
    description: "Career outcomes",
    color: "#3531E7",
  },
  {
    icon: FaChalkboard,
    number: "15+",
    title: "Mentors",
    description: "Industry professionals",
    color: "#0BA978",
  },
];

/* =========================================================
   STATS
   Compact proof section — intentionally NOT full page
   ========================================================= */

function Stats() {
  return (
    <section
      className="
        relative
        bg-white
        px-5
        py-10
        sm:px-7
        sm:py-12
        lg:px-8
        lg:py-14
      "
    >
      <div
        className="
          relative
          mx-auto
          max-w-7xl
        "
      >
        {/* =================================================
            MAIN STATS PANEL
            ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            relative
            overflow-hidden
            rounded-[28px]
            border
            border-slate-200
            bg-[#F7FAFF]
            shadow-[0_20px_60px_rgba(10,24,50,0.07)]
          "
        >
          {/* =================================================
              BACKGROUND DETAILS
              ================================================= */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              -left-24
              -top-24
              h-64
              w-64
              rounded-full
              bg-[#0C5FF5]/[0.06]
              blur-3xl
            "
          />

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              -bottom-32
              right-0
              h-72
              w-72
              rounded-full
              bg-[#3531E7]/[0.045]
              blur-3xl
            "
          />

          {/* subtle grid */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              inset-0
              opacity-[0.025]
              [background-image:linear-gradient(#0A1832_1px,transparent_1px),linear-gradient(90deg,#0A1832_1px,transparent_1px)]
              [background-size:40px_40px]
            "
          />

          {/* =================================================
              CONTENT
              ================================================= */}

          <div
            className="
              relative
              z-10
              grid
              lg:grid-cols-[0.75fr_1.25fr]
            "
          >
            {/* =================================================
                LEFT INTRO
                ================================================= */}

            <motion.div
              initial={{
                opacity: 0,
                x: -15,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.55,
              }}
              className="
                flex
                flex-col
                justify-center
                border-b
                border-slate-200
                px-6
                py-7
                sm:px-8
                sm:py-8
                lg:border-b-0
                lg:border-r
                lg:px-9
                lg:py-9
              "
            >
              {/* eyebrow */}

              <div className="flex items-center gap-2.5">
                <span
                  className="
                    h-1.5
                    w-1.5
                    rounded-full
                    bg-[#0C5FF5]
                    shadow-[0_0_10px_rgba(12,95,245,0.45)]
                  "
                />

                <span
                  className="
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.18em]
                    text-[#0C5FF5]
                  "
                >
                  DataLattice by the numbers
                </span>
              </div>

              {/* heading */}

              <h2
                className="
                  mt-3
                  text-2xl
                  font-bold
                  leading-[1.08]
                  tracking-[-0.04em]
                  text-[#0A1832]
                  sm:text-[28px]
                "
              >
                Built around
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
                  real outcomes.
                </span>
              </h2>

              <p
                className="
                  mt-3
                  max-w-[330px]
                  text-[11px]
                  font-medium
                  leading-5
                  text-slate-500
                  sm:text-xs
                "
              >
                A growing learning ecosystem connecting
                students, courses, mentors and career
                opportunities.
              </p>

              {/* tiny live indicator */}

              <div
                className="
                  mt-5
                  flex
                  items-center
                  gap-2
                "
              >
                <span className="relative flex h-2 w-2">
                  <span
                    className="
                      absolute
                      inline-flex
                      h-full
                      w-full
                      animate-ping
                      rounded-full
                      bg-[#0BA978]
                      opacity-40
                    "
                  />

                  <span
                    className="
                      relative
                      inline-flex
                      h-2
                      w-2
                      rounded-full
                      bg-[#0BA978]
                    "
                  />
                </span>

                <span
                  className="
                    text-[8px]
                    font-semibold
                    uppercase
                    tracking-[0.14em]
                    text-slate-400
                  "
                >
                  Growing every day
                </span>
              </div>
            </motion.div>

            {/* =================================================
                RIGHT STATS
                ================================================= */}

            <div
              className="
                grid
                grid-cols-2
                sm:grid-cols-4
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

          {/* =================================================
              BOTTOM ACCENT
              ================================================= */}

          <div
            aria-hidden="true"
            className="
              absolute
              bottom-0
              left-0
              h-[2px]
              w-full
              bg-gradient-to-r
              from-[#0C5FF5]
              via-[#0289F9]
              to-[#3531E7]
              opacity-70
            "
          />
        </motion.div>
      </div>
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
        y: 15,
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
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -3,
      }}
      className={`
        group
        relative
        border-b
        border-slate-200
        px-5
        py-6
        transition-colors
        duration-300
        hover:bg-white
        sm:px-5
        lg:border-b-0
        lg:border-l
        lg:px-6
        lg:py-8
        ${index >= 2 ? "sm:border-b-0" : ""}
      `}
    >
      {/* =================================================
          ICON + INDEX
          ================================================= */}

      <div
        className="
          flex
          items-center
          justify-between
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
            border
            border-slate-200
            bg-white
            shadow-[0_5px_15px_rgba(10,24,50,0.04)]
            transition-all
            duration-300
            group-hover:scale-105
          "
          style={{
            color: item.color,
          }}
        >
          <Icon size={13} />
        </div>

        <span
          className="
            text-[8px]
            font-bold
            tracking-[0.14em]
            text-slate-300
          "
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* =================================================
          NUMBER
          ================================================= */}

      <div className="mt-5">
        <AnimatedNumber value={item.number} />
      </div>

      {/* =================================================
          TITLE
          ================================================= */}

      <h3
        className="
          mt-1.5
          text-xs
          font-bold
          tracking-[-0.01em]
          text-[#0A1832]
          sm:text-sm
        "
      >
        {item.title}
      </h3>

      {/* =================================================
          DESCRIPTION
          ================================================= */}

      <p
        className="
          mt-1
          max-w-[145px]
          text-[9px]
          font-medium
          leading-4
          text-slate-400
          sm:text-[10px]
        "
      >
        {item.description}
      </p>

      {/* =================================================
          HOVER LINE
          ================================================= */}

      <motion.div
        initial={{
          width: 0,
        }}
        whileHover={{
          width: 42,
        }}
        className="
          absolute
          bottom-0
          left-0
          h-[2px]
        "
        style={{
          backgroundColor: item.color,
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

      /* smooth ease-out */

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
        text-[32px]
        font-black
        leading-none
        tracking-[-0.055em]
        text-[#0A1832]
        sm:text-[36px]
        lg:text-[40px]
      "
    >
      {displayValue}
    </span>
  );
}

export default Stats;