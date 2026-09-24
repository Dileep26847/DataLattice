import { motion } from "framer-motion";

import {
  FaArrowRight,
  FaChartSimple,
  FaMicrochip,
  FaCode,
  FaLayerGroup,
  FaCloud,
  FaChevronRight,
} from "react-icons/fa6";

import { useNavigate } from "react-router-dom";

import {
  isDemoVerified,
  openHomeSignupGate,
} from "./HomeAccessGate";

/* =========================================================
   DATALATTICE FEATURED PROGRAMS

   Matches the supplied Figma programs section.
   ========================================================= */

const programs = [
  {
    id: "data-analytics",

    number: "01",

    title: "Data Analytics",

    shortDescription:
      "Turn data into decisions. Learn SQL, Excel, Power BI and more.",

    icon: FaChartSimple,

    accent:
      "from-[#2563EB] to-[#06B6D4]",

    iconBackground:
      "bg-[#EFF6FF]",

    iconBorder:
      "border-[#BFDBFE]",

    iconColor:
      "text-[#2563EB]",

    tagBackground:
      "bg-[#EFF6FF]",

    tagColor:
      "text-[#2563EB]",

    skills: [
      "SQL",
      "Excel",
      "Power BI",
      "Tableau",
    ],
  },

  {
    id: "data-science-ai",

    number: "02",

    title: "Data Science & AI",

    shortDescription:
      "Build intelligent solutions with Python, ML and real-world projects.",

    icon: FaMicrochip,

    accent:
      "from-[#0289F9] to-[#7C3AED]",

    iconBackground:
      "bg-[#F0F4FF]",

    iconBorder:
      "border-[#C7D2FE]",

    iconColor:
      "text-[#6366F1]",

    tagBackground:
      "bg-[#EEF2FF]",

    tagColor:
      "text-[#6366F1]",

    skills: [
      "Python",
      "ML",
      "TensorFlow",
      "Stats",
    ],
  },

  {
    id: "full-stack",

    number: "03",

    title: "Full Stack Development",

    shortDescription:
      "Become a versatile developer with modern technologies.",

    icon: FaCode,

    accent:
      "from-[#3531E7] to-[#06B6D4]",

    iconBackground:
      "bg-[#EFF6FF]",

    iconBorder:
      "border-[#BAE6FD]",

    iconColor:
      "text-[#0891B2]",

    tagBackground:
      "bg-[#ECFEFF]",

    tagColor:
      "text-[#0891B2]",

    skills: [
      "React",
      "Node.js",
      "MongoDB",
      "APIs",
    ],
  },

  {
    id: "ui-ux",

    number: "04",

    title: "UI/UX Design",

    shortDescription:
      "Design user experiences that delight and engage.",

    icon: FaLayerGroup,

    accent:
      "from-[#F59E0B] to-[#F97316]",

    iconBackground:
      "bg-[#FFFBEB]",

    iconBorder:
      "border-[#FDE68A]",

    iconColor:
      "text-[#D97706]",

    tagBackground:
      "bg-[#FFFBEB]",

    tagColor:
      "text-[#D97706]",

    skills: [
      "Figma",
      "Research",
      "Prototyping",
      "Design",
    ],
  },

  {
    id: "cloud-devops",

    number: "05",

    title: "Cloud & DevOps",

    shortDescription:
      "Learn cloud, DevOps and automation at production scale.",

    icon: FaCloud,

    accent:
      "from-[#10B981] to-[#0891B2]",

    iconBackground:
      "bg-[#ECFDF5]",

    iconBorder:
      "border-[#A7F3D0]",

    iconColor:
      "text-[#059669]",

    tagBackground:
      "bg-[#ECFDF5]",

    tagColor:
      "text-[#059669]",

    skills: [
      "AWS",
      "Docker",
      "Kubernetes",
      "CI/CD",
    ],
  },
];

/* =========================================================
   FEATURED COURSES
   ========================================================= */

function FeaturedCourses() {
  const navigate = useNavigate();

  /* =======================================================
     ACCESS / PROGRAM ACTION
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
        bg-gradient-to-b
        from-[#F8FAFF]
        to-white
        px-5
        pt-[20px]
        pb-[70px]
        sm:px-8
        sm:pt-[25px]
        sm:pb-[85px]
        lg:px-[120px]
        lg:pt-[30px]
        lg:pb-[100px]
      "
    >
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          flex
          w-full
          max-w-[1200px]
          flex-col
          items-center
          gap-5
          text-center
        "
      >
        {/* Eyebrow */}

        <motion.div
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
            amount: 0.3,
          }}
          transition={{
            duration: 0.5,
          }}
          className="
            inline-flex
            items-center
            rounded-full
            border
            border-[#BFDBFE]
            bg-[#EFF6FF]
            px-4
            py-[7px]
          "
        >
          <span
            className="
              text-[11px]
              font-bold
              uppercase
              text-[#2563EB]
            "
          >
            Our Programs
          </span>
        </motion.div>

        {/* Heading */}

        <motion.h2
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
            delay: 0.05,
          }}
          className="
            w-full
            text-center
            text-[32px]
            font-extrabold
            leading-[1.2]
            tracking-[-0.04em]
            text-[#0A1832]

            sm:text-[38px]

            lg:text-[42px]
          "
        >
          Most In-Demand Tech Programs
        </motion.h2>

        {/* Description */}

        <motion.p
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
            amount: 0.3,
          }}
          transition={{
            duration: 0.5,
            delay: 0.1,
          }}
          className="
            w-full
            max-w-[580px]
            text-center
            text-[14px]
            font-normal
            leading-[1.7]
            text-[#64748B]

            sm:text-[15px]

            lg:text-[17px]
          "
        >
          Industry-relevant curriculum, hands-on expert
          mentorship to help you build a successful career.
        </motion.p>
      </div>

      {/* =====================================================
          PROGRAMS GRID
      ===================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          mt-14
          grid
          w-full
          max-w-[1200px]
          grid-cols-1
          gap-5

          sm:grid-cols-2

          lg:grid-cols-5
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
        amount: 0.15,
      }}
      transition={{
        duration: 0.55,
        delay: index * 0.07,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        group
        relative
        flex
        min-w-0
        h-[460px]
        flex-col
        overflow-hidden
        rounded-[20px]
        border
        border-[#E2E8F0]
        bg-white
        shadow-[0_4px_12px_rgba(10,24,50,0.02),0_16px_40px_-4px_rgba(10,24,50,0.06)]
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-[0_8px_20px_rgba(10,24,50,0.06),0_20px_48px_-4px_rgba(10,24,50,0.09)]
      "
    >
      {/* ===================================================
          TOP ACCENT
      =================================================== */}

      <div
        className={`
          h-[6px]
          w-full
          shrink-0
          bg-gradient-to-r
          ${program.accent}
        `}
      />

      {/* ===================================================
          CONTENT
      =================================================== */}

      <div
        className="
          flex
          min-h-0
          flex-1
          w-full
          flex-col
          items-start
          gap-5
          p-7
        "
      >
        {/* =================================================
            ICON
        ================================================= */}

        <div
          className={`
            flex
            h-[52px]
            w-[52px]
            shrink-0
            items-center
            justify-center
            rounded-[14px]
            border
            ${program.iconBackground}
            ${program.iconBorder}
          `}
        >
          <Icon
            size={26}
            className={program.iconColor}
          />
        </div>

        {/* =================================================
            TITLE + DESCRIPTION
        ================================================= */}

        <div
          className="
            flex
            w-full
            flex-col
            items-start
            gap-2
          "
        >
          <h3
            className="
              w-full
              text-[18px]
              font-extrabold
              leading-normal
              tracking-[-0.02em]
              text-[#0A1832]
            "
          >
            {program.title}
          </h3>

          <p
            className="
              line-clamp-4
              w-full
              overflow-hidden
              text-[13px]
              font-normal
              leading-[1.6]
              text-[#64748B]
            "
          >
            {program.shortDescription}
          </p>
        </div>

        {/* =================================================
            TAGS
        ================================================= */}

        <div
          className="
            flex
            w-full
            flex-wrap
            content-start
            gap-[6px]
          "
        >
          {program.skills.map((skill) => (
            <span
              key={skill}
              className={`
                inline-flex
                items-center
                rounded-full
                px-[10px]
                py-1
                text-[11px]
                font-semibold
                leading-normal
                ${program.tagBackground}
                ${program.tagColor}
              `}
            >
              {skill}
            </span>
          ))}
        </div>

        {/* =================================================
            FOOTER
        ================================================= */}

        <div
          className="
            mt-auto
            flex
            w-full
            items-center
            gap-[6px]
          "
        >
          <button
            type="button"
            onClick={onView}
            className={`
              group/button
              inline-flex
              items-center
              gap-[6px]
              text-[14px]
              font-bold
              ${program.tagColor}
              transition-all
              duration-200
            `}
          >
            <span>
              Learn More
            </span>

            <FaChevronRight
              size={11}
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