import {
  motion,
} from "framer-motion";

import {
  FaUserGraduate,
  FaBookOpen,
  FaBriefcase,
  FaChalkboardTeacher,
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
    icon: <FaChalkboardTeacher />,
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
        border-y
        border-[#1463FF]
        bg-[#1463FF]
      "
    >

      {/* ======================================================
          BACKGROUND DATA LAYER
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

        {/* Soft blue atmosphere */}

        <div
          className="
            absolute
            -left-32
            top-1/2
            h-64
            w-64
            -translate-y-1/2
            rounded-full
            bg-white/[0.06]
            blur-3xl
          "
        />


        <div
          className="
            absolute
            right-[-120px]
            top-1/2
            h-72
            w-72
            -translate-y-1/2
            rounded-full
            bg-white/[0.05]
            blur-3xl
          "
        />


        {/* ==================================================
            TECHNICAL DATA LINE
        ================================================== */}

        <svg
          className="
            absolute
            inset-0
            h-full
            w-full
            opacity-70
          "
          viewBox="0 0 1440 180"
          preserveAspectRatio="none"
        >

          <path
            d="
              M0 118
              C120 102 175 132 280 108
              C390 82 440 112 555 98
              C670 84 715 106 820 88
              C935 68 990 101 1090 82
              C1200 61 1280 86 1440 58
            "
            fill="none"
            stroke="white"
            strokeOpacity="0.14"
            strokeWidth="1"
          />


          <path
            d="
              M0 130
              C120 114 175 144 280 120
              C390 94 440 124 555 110
              C670 96 715 118 820 100
              C935 80 990 113 1090 94
              C1200 73 1280 98 1440 70
            "
            fill="none"
            stroke="white"
            strokeOpacity="0.08"
            strokeWidth="1"
            strokeDasharray="4 9"
          />

        </svg>


        {/* ==================================================
            DATA NODES
        ================================================== */}

        <span
          className="
            absolute
            left-[18%]
            top-[42%]
            h-1.5
            w-1.5
            rounded-full
            bg-white/70
            shadow-[0_0_0_5px_rgba(255,255,255,0.08)]
          "
        />


        <span
          className="
            absolute
            left-[39%]
            top-[30%]
            h-1.5
            w-1.5
            rounded-full
            bg-white/60
            shadow-[0_0_0_5px_rgba(255,255,255,0.07)]
          "
        />


        <span
          className="
            absolute
            left-[62%]
            top-[40%]
            h-1.5
            w-1.5
            rounded-full
            bg-white/60
            shadow-[0_0_0_5px_rgba(255,255,255,0.07)]
          "
        />


        <span
          className="
            absolute
            right-[18%]
            top-[27%]
            h-1.5
            w-1.5
            rounded-full
            bg-white/60
            shadow-[0_0_0_5px_rgba(255,255,255,0.07)]
          "
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
          py-7
          sm:px-7
          sm:py-8
          lg:px-8
          lg:py-9
        "
      >

        {/* ==================================================
            SMALL SECTION LABEL
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
            amount: 0.4,
          }}
          transition={{
            duration: 0.45,
          }}
          className="
            mb-5
            flex
            items-center
            gap-2
          "
        >

          <span
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
              tracking-[0.2em]
              text-white/70
            "
          >
            DataLattice at a glance
          </span>

        </motion.div>


        {/* ==================================================
            METRICS
        ================================================== */}

        <div
          className="
            grid
            grid-cols-2
            lg:grid-cols-4
          "
        >

          {stats.map(
            (
              item,
              index
            ) => (

              <StatItem
                key={item.title}
                item={item}
                index={index}
              />

            )
          )}

        </div>


        {/* ==================================================
            BOTTOM DATA INDICATOR
        ================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            scaleX: 0,
          }}
          whileInView={{
            opacity: 1,
            scaleX: 1,
          }}
          viewport={{
            once: true,
            amount: 0.4,
          }}
          transition={{
            delay: 0.35,
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            mt-6
            h-px
            origin-left
            bg-white/20
          "
        />

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
        y: 12,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.35,
      }}
      transition={{
        delay: index * 0.08,
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -2,
      }}
      className={`
        group
        relative
        flex
        items-center
        gap-3
        py-2
        pr-4
        sm:gap-4
        sm:py-3
        sm:pr-6
        lg:py-1
        ${
          index > 0
            ? "border-l border-white/20 pl-4 sm:pl-6"
            : ""
        }
        ${
          index === 2
            ? "max-lg:border-l-0 max-lg:pl-0"
            : ""
        }
        ${
          index === 3
            ? "max-lg:pl-4 sm:max-lg:pl-6"
            : ""
        }
      `}
    >

      {/* ==================================================
          ICON
      ================================================== */}

      <div
        className="
          flex
          h-10
          w-10
          shrink-0
          items-center
          justify-center
          rounded-xl
          border
          border-white/20
          bg-white/10
          text-white
          transition-all
          duration-300
          group-hover:bg-white/15
          group-hover:border-white/30
          sm:h-11
          sm:w-11
        "
      >

        {item.icon}

      </div>


      {/* ==================================================
          VALUE + DESCRIPTION
      ================================================== */}

      <div
        className="
          min-w-0
        "
      >

        <div
          className="
            flex
            items-baseline
            gap-2
          "
        >

          <span
            className="
              text-2xl
              font-bold
              leading-none
              tracking-[-0.035em]
              text-white
              sm:text-3xl
            "
          >
            {item.number}
          </span>


          {/* Small active indicator */}

          <span
            className="
              h-1.5
              w-1.5
              rounded-full
              bg-white
              opacity-70
            "
          />

        </div>


        <p
          className="
            mt-1
            text-xs
            font-semibold
            text-white
            sm:text-sm
          "
        >
          {item.title}
        </p>


        <p
          className="
            mt-0.5
            hidden
            truncate
            text-[10px]
            font-normal
            text-white/65
            sm:block
          "
        >
          {item.description}
        </p>

      </div>

    </motion.div>

  );

}


export default Stats;