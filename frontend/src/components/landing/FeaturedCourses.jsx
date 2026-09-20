import { motion } from "framer-motion";

import {
  FaArrowRight,
  FaChartLine,
  FaDatabase,
  FaProjectDiagram,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import {
  isDemoVerified,
  openHomeSignupGate,
} from "./landing/HomeAccessGate";

/* =========================================================
   DATALATTICE FEATURED PROGRAMS

   IMPORTANT:
   Keep this list limited to the existing homepage programs.
   Do NOT add additional courses here.
   ========================================================= */

const programs = [
  {
    id: "data-science",

    number: "01",

    title: "Data Science",

    shortDescription:
      "Build practical skills in Python, statistics and machine learning.",

    description:
      "Build a strong foundation in Python, statistics, machine learning and practical data science through project-based learning.",

    icon: FaProjectDiagram,

    accent: "from-[#0C5FF5] to-[#0289F9]",

    iconBackground: "bg-[#0C5FF5]",

    skills: [
      "Python",
      "Statistics",
      "Machine Learning",
      "Projects",
    ],

    footer: "Python • ML • Real Projects",
  },

  {
    id: "data-analytics",

    number: "02",

    title: "Data Analytics",

    shortDescription:
      "Turn business data into insights using SQL, dashboards and visualization.",

    description:
      "Learn how to transform business data into useful insights using SQL, dashboards, visualization and analytical thinking.",

    icon: FaChartLine,

    accent: "from-[#0289F9] to-[#3531E7]",

    iconBackground: "bg-[#0289F9]",

    skills: [
      "SQL",
      "Visualization",
      "Power BI",
      "Insights",
    ],

    footer: "SQL • Power BI • Business Insights",
  },
];

/* =========================================================
   FEATURED COURSES
   ========================================================= */

function FeaturedCourses() {
  const navigate = useNavigate();

  /* =======================================================
     ACCESS / PROGRAM ACTION

     Existing behavior is intentionally preserved:

     Verified visitor
       → /courses

     New visitor
       → HomeAccessGate
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
        py-16
        sm:py-20
        lg:py-24
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
          overflow-hidden
        "
      >
        {/* Right glow */}

        <div
          className="
            absolute
            -right-40
            top-10
            h-[380px]
            w-[380px]
            rounded-full
            bg-[#0289F9]
            opacity-[0.035]
            blur-[110px]
          "
        />

        {/* Left glow */}

        <div
          className="
            absolute
            -left-40
            bottom-0
            h-[320px]
            w-[320px]
            rounded-full
            bg-[#0C5FF5]
            opacity-[0.025]
            blur-[100px]
          "
        />
      </div>

      {/* =====================================================
          HOMEPAGE ALIGNED CONTENT

          Same general width/padding system as the homepage.
          ===================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          w-full
          max-w-[1280px]
          px-5
          sm:px-7
          lg:px-8
          xl:px-10
        "
      >
        {/* ===================================================
            SECTION HEADER
            =================================================== */}

        <div
          className="
            flex
            flex-col
            gap-5
            sm:flex-row
            sm:items-end
            sm:justify-between
          "
        >
          {/* =================================================
              LEFT
              ================================================= */}

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
              duration: 0.55,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {/* Eyebrow */}

            <div
              className="
                inline-flex
                items-center
                rounded-full
                border
                border-[#D9E8FF]
                bg-[#F3F8FF]
                px-3
                py-1.5
              "
            >
              <span
                className="
                  text-[8px]
                  font-extrabold
                  uppercase
                  tracking-[0.12em]
                  text-[#1463FF]
                  sm:text-[9px]
                "
              >
                Our Programs
              </span>
            </div>

            {/* Heading */}

            <h2
              className="
                mt-4
                text-[28px]
                font-black
                leading-[1.05]
                tracking-[-0.045em]
                text-[#0B1B3A]
                sm:text-[34px]
                lg:text-[38px]
              "
            >
              Most In-Demand Tech Programs
            </h2>

            {/* Description */}

            <p
              className="
                mt-3
                max-w-[680px]
                text-[12px]
                font-medium
                leading-5
                text-[#64748B]
                sm:text-[13px]
                sm:leading-6
              "
            >
              Industry-relevant curriculum, hands-on projects
              and expert mentorship to help you build a
              successful career.
            </p>
          </motion.div>

          {/* =================================================
              VIEW ALL
              ================================================= */}

          <motion.button
            type="button"
            onClick={handleViewProgram}
            initial={{
              opacity: 0,
              x: 12,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.5,
            }}
            className="
              group
              inline-flex
              w-fit
              shrink-0
              items-center
              gap-1.5
              self-start
              rounded-full
              px-2
              py-2
              text-[10px]
              font-bold
              text-[#1463FF]
              transition-all
              duration-200
              hover:text-[#0B1B3A]
              sm:self-auto
            "
          >
            <span>View All Programs</span>

            <FaArrowRight
              size={9}
              className="
                transition-transform
                duration-200
                group-hover:translate-x-1
              "
            />
          </motion.button>
        </div>

        {/* ===================================================
            PROGRAM CARDS
            =================================================== */}

        <div
          className="
            mt-8
            grid
            grid-cols-1
            gap-3
            sm:mt-9
            sm:grid-cols-2
            sm:gap-4
            lg:gap-5
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
        y: 18,
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
        duration: 0.55,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        group
        relative
        min-w-0
        overflow-hidden
        rounded-[20px]
        border
        border-[#E3EAF4]
        bg-white
        shadow-[0_8px_28px_rgba(11,27,58,0.055)]
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-[0_16px_40px_rgba(11,27,58,0.09)]
      "
    >
      {/* ===================================================
          TOP COLOR STRIPE
          =================================================== */}

      <div
        className={`
          h-[4px]
          w-full
          bg-gradient-to-r
          ${program.accent}
        `}
      />

      {/* ===================================================
          CARD CONTENT
          =================================================== */}

      <div
        className="
          flex
          min-h-[205px]
          flex-col
          p-4
          sm:min-h-[215px]
          sm:p-5
          lg:p-5
        "
      >
        {/* =================================================
            TOP ROW
            ================================================= */}

        <div
          className="
            flex
            items-start
            justify-between
            gap-3
          "
        >
          {/* Title area */}

          <div className="min-w-0">
            {/* Program number */}

            <p
              className="
                text-[8px]
                font-extrabold
                uppercase
                tracking-[0.14em]
                text-[#94A3B8]
              "
            >
              Program {program.number}
            </p>

            {/* Title */}

            <h3
              className="
                mt-1.5
                truncate
                text-[20px]
                font-black
                tracking-[-0.035em]
                text-[#0B1B3A]
                sm:text-[22px]
              "
            >
              {program.title}
            </h3>
          </div>

          {/* Icon */}

          <div
            className={`
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-[11px]
              text-white
              shadow-[0_7px_18px_rgba(12,95,245,0.18)]
              ${program.iconBackground}
            `}
          >
            <Icon size={15} />
          </div>
        </div>

        {/* =================================================
            DESCRIPTION
            ================================================= */}

        <p
          className="
            mt-3
            max-w-[470px]
            text-[10px]
            font-medium
            leading-[1.55]
            text-[#64748B]
            sm:text-[11px]
            sm:leading-[1.6]
          "
        >
          {program.shortDescription}
        </p>

        {/* =================================================
            SKILLS
            ================================================= */}

        <div
          className="
            mt-4
            flex
            min-w-0
            flex-wrap
            gap-1.5
          "
        >
          {program.skills.map((skill) => (
            <span
              key={skill}
              className="
                inline-flex
                items-center
                rounded-full
                border
                border-[#E4EBF5]
                bg-[#F8FAFD]
                px-2
                py-1
                text-[8px]
                font-semibold
                leading-none
                text-[#526174]
                sm:text-[9px]
              "
            >
              {skill}
            </span>
          ))}
        </div>

        {/* =================================================
            CARD FOOTER
            ================================================= */}

        <div
          className="
            mt-auto
            flex
            items-center
            justify-between
            gap-3
            border-t
            border-[#EEF2F7]
            pt-4
          "
        >
          {/* Learning path */}

          <div
            className="
              min-w-0
            "
          >
            <p
              className="
                truncate
                text-[8px]
                font-semibold
                text-[#64748B]
                sm:text-[9px]
              "
            >
              {program.footer}
            </p>
          </div>

          {/* Learn More */}

          <button
            type="button"
            onClick={onView}
            className="
              group/button
              inline-flex
              shrink-0
              items-center
              gap-1.5
              rounded-full
              bg-[#1463FF]
              px-3
              py-2
              text-[9px]
              font-bold
              text-white
              shadow-[0_7px_18px_rgba(20,99,255,0.16)]
              transition-all
              duration-200
              hover:-translate-y-0.5
              hover:bg-[#0B1B3A]
              sm:px-3.5
            "
          >
            <span>Learn More</span>

            <FaArrowRight
              size={8}
              className="
                transition-transform
                duration-200
                group-hover/button:translate-x-0.5
              "
            />
          </button>
        </div>
      </div>
    </motion.article>
  );
}

export default FeaturedCourses;