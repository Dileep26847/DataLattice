import { motion } from "framer-motion";
import {
  FaArrowRight,
  FaChartBar,
  FaChartLine,
  FaDatabase,
  FaLayerGroup,
  FaProjectDiagram,
  FaPython,
  FaTable,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import {
  isDemoVerified,
  openHomeSignupGate,
} from "./landing/HomeAccessGate";

/* =========================================================
   DATALATTICE DESIGN SYSTEM

   Navy       #0A1832
   Primary    #0C5FF5
   Cyan       #0289F9
   Violet     #3531E7
   White      #FFFFFF

   Gradient:
   #0C5FF5 → #0289F9 → #3531E7
   ========================================================= */

const BRAND_GRADIENT =
  "linear-gradient(135deg, #0C5FF5 0%, #0289F9 50%, #3531E7 100%)";

/* =========================================================
   REAL PUBLIC PROGRAMS

   Keep this content aligned with the existing homepage.
   ========================================================= */

const programs = [
  {
    id: "data-science",
    eyebrow: "PROGRAM 01",
    title: "Data Science",

    description:
      "Build a strong foundation in Python, statistics, machine learning and practical data science through project-based learning.",

    icon: FaProjectDiagram,

    accent: "#0C5FF5",

    skills: [
      "Python",
      "Statistics",
      "Machine Learning",
      "Real Projects",
    ],

    visual: "science",
  },

  {
    id: "data-analytics",
    eyebrow: "PROGRAM 02",
    title: "Data Analytics",

    description:
      "Learn how to transform business data into useful insights using SQL, dashboards, visualization and analytical thinking.",

    icon: FaChartLine,

    accent: "#0289F9",

    skills: [
      "SQL",
      "Data Visualization",
      "Power BI",
      "Business Insights",
    ],

    visual: "analytics",
  },
];

/* =========================================================
   FEATURED COURSES
   ========================================================= */

function FeaturedCourses() {
  const navigate = useNavigate();

  /* =======================================================
     PROGRAM ACTION

     New visitor:
       → open HomeAccessGate

     Verified visitor:
       → /courses
     ======================================================= */

  const handleViewProgram = (event) => {
    event?.preventDefault?.();
    event?.stopPropagation?.();

    if (isDemoVerified()) {
      navigate("/courses");
      return;
    }

    openHomeSignupGate();
  };

  return (
    <section
      id="programs"
      className="
        relative
        overflow-hidden
        bg-white
        py-20
        sm:py-24
        lg:py-28
      "
    >
      {/* =====================================================
          VERY SUBTLE BACKGROUND
          ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
        "
      >
        <div
          className="
            absolute
            -right-40
            top-20
            h-[420px]
            w-[420px]
            rounded-full
            opacity-[0.055]
            blur-[110px]
          "
          style={{
            background: BRAND_GRADIENT,
          }}
        />

        <div
          className="
            absolute
            -left-48
            bottom-0
            h-[360px]
            w-[360px]
            rounded-full
            bg-[#0289F9]
            opacity-[0.035]
            blur-[110px]
          "
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
          w-full
          max-w-[1280px]
          px-5
          sm:px-8
          lg:px-10
        "
      >
        {/* ===================================================
            SECTION INTRO
            =================================================== */}

        <div
          className="
            grid
            gap-8
            lg:grid-cols-[1fr_auto]
            lg:items-end
          "
        >
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
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {/* Eyebrow */}

            <div className="flex items-center gap-3">
              <span
                className="
                  h-px
                  w-9
                "
                style={{
                  background: BRAND_GRADIENT,
                }}
              />

              <span
                className="
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.2em]
                  text-[#0C5FF5]
                "
              >
                Focused programs
              </span>
            </div>

            {/* Heading */}

            <h2
              className="
                mt-5
                max-w-[700px]
                text-[35px]
                font-black
                leading-[1.02]
                tracking-[-0.05em]
                text-[#0A1832]
                sm:text-[45px]
                lg:text-[52px]
              "
            >
              Choose a direction.
              <br />

              <span
                className="
                  bg-clip-text
                  text-transparent
                "
                style={{
                  backgroundImage: BRAND_GRADIENT,
                }}
              >
                Build the skills.
              </span>
            </h2>

            <p
              className="
                mt-5
                max-w-[590px]
                text-sm
                font-medium
                leading-6
                text-[#64748B]
                sm:text-[15px]
                sm:leading-7
              "
            >
              Focused learning paths for people who want
              practical data skills, hands-on projects and
              a clearer path from learning to doing.
            </p>
          </motion.div>

          {/* =================================================
              SMALL EDITORIAL NOTE
              ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              x: 15,
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
              delay: 0.1,
            }}
            className="
              hidden
              items-center
              gap-3
              border-l
              border-[#E6EDF7]
              pl-5
              lg:flex
            "
          >
            <div
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                bg-[#F5F9FF]
                text-[#0C5FF5]
              "
            >
              <FaLayerGroup size={15} />
            </div>

            <div>
              <p className="text-xs font-bold text-[#0A1832]">
                Two focused paths
              </p>

              <p className="mt-1 text-[10px] font-medium text-[#94A3B8]">
                Learn what matters for your goal.
              </p>
            </div>
          </motion.div>
        </div>

        {/* ===================================================
            PROGRAMS
            =================================================== */}

        <div
          className="
            mt-12
            grid
            gap-6
            lg:grid-cols-2
            lg:gap-7
          "
        >
          {programs.map((program, index) => (
            <ProgramCard
              key={program.id}
              program={program}
              index={index}
              onView={handleViewProgram}
            />
          ))}
        </div>

        {/* ===================================================
            BOTTOM ACTION
            =================================================== */}

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
          }}
          transition={{
            duration: 0.5,
            delay: 0.15,
          }}
          className="
            mt-7
            flex
            flex-col
            gap-4
            rounded-[22px]
            border
            border-[#E6EDF7]
            bg-[#F8FBFF]
            px-5
            py-5
            sm:flex-row
            sm:items-center
            sm:justify-between
            sm:px-7
          "
        >
          <div>
            <p className="text-sm font-bold text-[#0A1832]">
              Not sure which path fits you?
            </p>

            <p className="mt-1 text-[11px] font-medium text-[#64748B]">
              Explore both programs and compare what you’ll learn.
            </p>
          </div>

          <button
            type="button"
            onClick={handleViewProgram}
            className="
              group
              inline-flex
              w-fit
              items-center
              gap-2
              rounded-full
              px-5
              py-2.5
              text-xs
              font-bold
              text-white
              shadow-[0_10px_24px_rgba(12,95,245,0.18)]
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:shadow-[0_14px_30px_rgba(12,95,245,0.24)]
            "
            style={{
              background: BRAND_GRADIENT,
            }}
          >
            Explore all programs

            <FaArrowRight
              size={10}
              className="
                transition-transform
                duration-200
                group-hover:translate-x-1
              "
            />
          </button>
        </motion.div>
      </div>
    </section>
  );
}

/* =========================================================
   PROGRAM CARD
   ========================================================= */

function ProgramCard({
  program,
  index,
  onView,
}) {
  const Icon = program.icon;

  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 25,
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
        duration: 0.65,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        group
        overflow-hidden
        rounded-[28px]
        border
        border-[#E6EDF7]
        bg-white
        shadow-[0_12px_45px_rgba(10,24,50,0.055)]
        transition-all
        duration-500
        hover:-translate-y-1
        hover:shadow-[0_24px_65px_rgba(10,24,50,0.10)]
      "
    >
      {/* ===================================================
          TOP GRADIENT
          =================================================== */}

      <div
        className="h-[4px] w-full"
        style={{
          background: BRAND_GRADIENT,
        }}
      />

      <div className="p-6 sm:p-7 lg:p-8">
        {/* =================================================
            CARD HEADER
            ================================================= */}

        <div className="flex items-start justify-between gap-5">
          <div>
            <p
              className="
                text-[9px]
                font-bold
                uppercase
                tracking-[0.2em]
                text-[#94A3B8]
              "
            >
              {program.eyebrow}
            </p>

            <h3
              className="
                mt-2
                text-[27px]
                font-black
                tracking-[-0.04em]
                text-[#0A1832]
                sm:text-[31px]
              "
            >
              {program.title}
            </h3>
          </div>

          <div
            className="
              flex
              h-12
              w-12
              shrink-0
              items-center
              justify-center
              rounded-2xl
              text-white
              shadow-[0_10px_24px_rgba(12,95,245,0.16)]
            "
            style={{
              background: BRAND_GRADIENT,
            }}
          >
            <Icon size={19} />
          </div>
        </div>

        {/* =================================================
            DESCRIPTION
            ================================================= */}

        <p
          className="
            mt-5
            max-w-[570px]
            text-sm
            font-medium
            leading-6
            text-[#64748B]
          "
        >
          {program.description}
        </p>

        {/* =================================================
            PROGRAM VISUAL
            ================================================= */}

        <ProgramVisual type={program.visual} />

        {/* =================================================
            SKILLS
            ================================================= */}

        <div className="mt-6">
          <p
            className="
              text-[9px]
              font-bold
              uppercase
              tracking-[0.16em]
              text-[#94A3B8]
            "
          >
            What you’ll work with
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            {program.skills.map((skill) => (
              <span
                key={skill}
                className="
                  rounded-full
                  border
                  border-[#E6EDF7]
                  bg-[#F8FBFF]
                  px-3
                  py-1.5
                  text-[10px]
                  font-semibold
                  text-[#475569]
                "
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* =================================================
            FOOTER
            ================================================= */}

        <div
          className="
            mt-7
            flex
            flex-col
            gap-4
            border-t
            border-[#E6EDF7]
            pt-5
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#94A3B8]">
              Learning approach
            </p>

            <p className="mt-1 text-xs font-semibold text-[#0A1832]">
              Learn → build → apply
            </p>
          </div>

          <button
            type="button"
            onClick={onView}
            className="
              group/button
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-full
              border
              border-[#D8E5F7]
              bg-white
              px-5
              py-2.5
              text-xs
              font-bold
              text-[#0C5FF5]
              transition-all
              duration-300
              hover:border-transparent
              hover:text-white
            "
            style={{
              "--hover-gradient": BRAND_GRADIENT,
            }}
          >
            <span
              className="
                absolute
                pointer-events-none
              "
            />

            <span className="relative z-10">
              View Program
            </span>

            <FaArrowRight
              size={10}
              className="
                relative
                z-10
                transition-transform
                duration-200
                group-hover/button:translate-x-1
              "
            />
          </button>
        </div>
      </div>
    </motion.article>
  );
}

/* =========================================================
   PROGRAM VISUAL
   ========================================================= */

function ProgramVisual({ type }) {
  if (type === "science") {
    return <DataScienceVisual />;
  }

  return <DataAnalyticsVisual />;
}

/* =========================================================
   DATA SCIENCE VISUAL
   ========================================================= */

function DataScienceVisual() {
  return (
    <div
      className="
        relative
        mt-6
        h-[190px]
        overflow-hidden
        rounded-[22px]
        border
        border-[#E6EDF7]
        bg-[#F8FBFF]
      "
    >
      {/* Background grid */}

      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage: `
            linear-gradient(rgba(12,95,245,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(12,95,245,0.05) 1px, transparent 1px)
          `,
          backgroundSize: "30px 30px",
        }}
      />

      {/* Main visual */}

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative h-[125px] w-[80%]">
          {/* Connection lines */}

          <div
            className="
              absolute
              left-[18%]
              top-[50%]
              h-px
              w-[24%]
              rotate-[-18deg]
              bg-[#B9D2FF]
            "
          />

          <div
            className="
              absolute
              left-[43%]
              top-[50%]
              h-px
              w-[23%]
              rotate-[18deg]
              bg-[#B9D2FF]
            "
          />

          <div
            className="
              absolute
              left-[65%]
              top-[50%]
              h-px
              w-[20%]
              rotate-[-15deg]
              bg-[#B9D2FF]
            "
          />

          {/* Data node */}

          <VisualNode
            icon={<FaTable size={12} />}
            label="DATA"
            className="left-0 top-[32%]"
          />

          {/* Python */}

          <VisualNode
            icon={<FaPython size={12} />}
            label="PYTHON"
            className="left-[27%] top-[4%]"
            highlighted
          />

          {/* ML */}

          <VisualNode
            icon={<FaProjectDiagram size={12} />}
            label="ML"
            className="left-[51%] top-[51%]"
          />

          {/* Insight */}

          <VisualNode
            icon={<FaChartLine size={12} />}
            label="INSIGHT"
            className="right-0 top-[4%]"
            highlighted
          />

          {/* Center */}

          <motion.div
            animate={{
              scale: [1, 1.08, 1],
            }}
            transition={{
              duration: 2.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              absolute
              left-1/2
              top-1/2
              flex
              h-12
              w-12
              -translate-x-1/2
              -translate-y-1/2
              items-center
              justify-center
              rounded-2xl
              text-white
              shadow-[0_12px_30px_rgba(12,95,245,0.20)]
            "
            style={{
              background: BRAND_GRADIENT,
            }}
          >
            <FaChartBar size={16} />
          </motion.div>

          {/* Data pulse */}

          <motion.span
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [0.8, 1.3, 0.8],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="
              absolute
              left-[22%]
              top-[43%]
              h-2
              w-2
              rounded-full
              bg-[#0289F9]
            "
          />
        </div>
      </div>

      {/* Caption */}

      <div
        className="
          absolute
          bottom-3
          left-4
          rounded-full
          border
          border-[#DCE8F7]
          bg-white/90
          px-3
          py-1.5
          text-[8px]
          font-bold
          uppercase
          tracking-[0.12em]
          text-[#64748B]
        "
      >
        From raw data to insight
      </div>
    </div>
  );
}

/* =========================================================
   DATA ANALYTICS VISUAL
   ========================================================= */

function DataAnalyticsVisual() {
  return (
    <div
      className="
        relative
        mt-6
        h-[190px]
        overflow-hidden
        rounded-[22px]
        border
        border-[#E6EDF7]
        bg-[#F8FBFF]
        p-4
      "
    >
      <div className="grid h-full grid-cols-[0.8fr_1.2fr] gap-3">
        {/* SQL panel */}

        <div
          className="
            rounded-2xl
            border
            border-[#E6EDF7]
            bg-white
            p-3
          "
        >
          <div className="flex items-center justify-between">
            <span className="text-[8px] font-bold uppercase tracking-[0.12em] text-[#94A3B8]">
              SQL
            </span>

            <FaDatabase
              size={10}
              className="text-[#0289F9]"
            />
          </div>

          <div className="mt-4 space-y-3">
            {[
              "72%",
              "54%",
              "86%",
              "63%",
            ].map((width, index) => (
              <div
                key={index}
                className="h-1.5 overflow-hidden rounded-full bg-[#EEF4FB]"
              >
                <motion.div
                  initial={{
                    width: 0,
                  }}
                  whileInView={{
                    width,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    duration: 0.7,
                    delay: index * 0.08,
                  }}
                  className="h-full rounded-full"
                  style={{
                    background: BRAND_GRADIENT,
                  }}
                />
              </div>
            ))}
          </div>

          <div className="mt-5 flex items-center gap-2">
            <FaTable
              size={9}
              className="text-[#0C5FF5]"
            />

            <span className="text-[8px] font-semibold text-[#64748B]">
              Structured data
            </span>
          </div>
        </div>

        {/* Analytics panel */}

        <div
          className="
            rounded-2xl
            border
            border-[#E6EDF7]
            bg-white
            p-3
          "
        >
          <div className="flex items-center justify-between">
            <span className="text-[8px] font-bold uppercase tracking-[0.12em] text-[#94A3B8]">
              INSIGHTS
            </span>

            <FaChartBar
              size={10}
              className="text-[#0C5FF5]"
            />
          </div>

          <div className="relative mt-3 h-[72px]">
            <svg
              viewBox="0 0 260 80"
              className="h-full w-full"
              fill="none"
              preserveAspectRatio="none"
            >
              <path
                d="M0 65 C30 60 40 55 70 58 C98 61 108 39 135 44 C160 49 168 28 190 34 C215 40 228 17 260 10"
                stroke="#DCE7F5"
                strokeWidth="1"
              />

              <motion.path
                d="M0 65 C30 60 40 55 70 58 C98 61 108 39 135 44 C160 49 168 28 190 34 C215 40 228 17 260 10"
                stroke="url(#analyticsGradient)"
                strokeWidth="3"
                strokeLinecap="round"
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
                  duration: 1.5,
                  ease: "easeInOut",
                }}
              />

              <defs>
                <linearGradient
                  id="analyticsGradient"
                  x1="0"
                  y1="0"
                  x2="1"
                  y2="0"
                >
                  <stop
                    offset="0%"
                    stopColor="#0C5FF5"
                  />
                  <stop
                    offset="50%"
                    stopColor="#0289F9"
                  />
                  <stop
                    offset="100%"
                    stopColor="#3531E7"
                  />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="mt-2 flex items-center gap-2">
            <span
              className="
                h-1.5
                w-1.5
                rounded-full
              "
              style={{
                background: BRAND_GRADIENT,
              }}
            />

            <span className="text-[8px] font-semibold text-[#64748B]">
              Turn data into decisions
            </span>
          </div>
        </div>
      </div>

      {/* Small floating label */}

      <div
        className="
          absolute
          bottom-3
          left-1/2
          -translate-x-1/2
          rounded-full
          border
          border-[#DCE8F7]
          bg-white/95
          px-3
          py-1.5
          text-[8px]
          font-bold
          uppercase
          tracking-[0.12em]
          text-[#64748B]
          shadow-sm
        "
      >
        Data → insight → decision
      </div>
    </div>
  );
}

/* =========================================================
   VISUAL NODE
   ========================================================= */

function VisualNode({
  icon,
  label,
  className,
  highlighted = false,
}) {
  return (
    <motion.div
      animate={{
        y: [0, -3, 0],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={`
        absolute
        ${className}
        flex
        items-center
        gap-1.5
        rounded-xl
        border
        px-2.5
        py-2
        shadow-sm
        ${
          highlighted
            ? "border-[#CFE0FF] bg-white"
            : "border-[#E6EDF7] bg-white/90"
        }
      `}
    >
      <span
        className="
          flex
          h-6
          w-6
          items-center
          justify-center
          rounded-lg
          bg-[#F0F6FF]
          text-[#0C5FF5]
        "
      >
        {icon}
      </span>

      <span
        className="
          text-[8px]
          font-bold
          tracking-[0.06em]
          text-[#475569]
        "
      >
        {label}
      </span>
    </motion.div>
  );
}

export default FeaturedCourses;