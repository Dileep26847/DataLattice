import React from "react";
import { motion } from "framer-motion";
import {
  FaArrowRight,
  FaChartBar,
  FaBrain,
  FaShoppingCart,
} from "react-icons/fa";

/* =========================================================
   REAL PROJECTS
   ========================================================= */

const projects = [
  {
    category: "DATA ANALYTICS",
    title: "Sales Analytics Dashboard",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=85",
    icon: FaChartBar,
    tags: ["Power BI", "Data Modeling", "DAX"],
  },
  {
    category: "DATA SCIENCE & AI",
    title: "Customer Churn Prediction",
    image:
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=1200&q=85",
    icon: FaBrain,
    tags: ["Python", "Machine Learning", "Scikit-Learn"],
  },
  {
    category: "FULL STACK DEVELOPMENT",
    title: "E-Commerce Web Application",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=85",
    icon: FaShoppingCart,
    tags: ["React", "Node.js", "MongoDB"],
  },
];

/* =========================================================
   REAL PROJECTS
   ========================================================= */

function RealProjects() {
  return (
    <section
      id="projects"
      className="
        relative
        overflow-hidden
        bg-[#F7F9FD]
        py-14
        sm:py-16
        lg:py-20
      "
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-7 lg:px-10">
        {/* =================================================
            HEADER
        ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 18,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.55,
            ease: "easeOut",
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          className="mx-auto max-w-3xl text-center"
        >
          {/* Badge */}

          <div className="inline-flex items-center rounded-full border border-[#BCD5FF] bg-[#EAF2FF] px-4 py-1.5">
            <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#1769F5]">
              Real Projects
            </span>
          </div>

          {/* Heading */}

          <h2
            className="
              mt-4
              text-3xl
              font-bold
              leading-[1.08]
              tracking-[-0.04em]
              text-[#081733]
              sm:text-4xl
              lg:text-[44px]
            "
          >
            Build. Showcase. Stand Out.
          </h2>

          {/* Description */}

          <p
            className="
              mx-auto
              mt-4
              max-w-2xl
              text-sm
              leading-6
              text-[#7B8CA8]
              sm:text-base
              sm:leading-7
            "
          >
            Work on industry-relevant projects and build a portfolio that
            gets you noticed by top companies.
          </p>
        </motion.div>

        {/* =================================================
            PROJECT GRID
        ================================================= */}

        <div
          className="
            mt-10
            grid
            gap-5
            md:grid-cols-2
            lg:grid-cols-3
            lg:gap-6
          "
        >
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
            />
          ))}
        </div>

        {/* =================================================
            VIEW MORE
        ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 12,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.45,
            delay: 0.15,
            ease: "easeOut",
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          className="mt-8 flex justify-center"
        >
          <button
            type="button"
            className="
              group
              inline-flex
              items-center
              gap-3
              rounded-xl
              bg-gradient-to-r
              from-[#1769F5]
              to-[#1160F0]
              px-6
              py-3.5
              text-sm
              font-semibold
              text-white
              shadow-[0_10px_25px_rgba(23,105,245,0.22)]
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:shadow-[0_14px_32px_rgba(23,105,245,0.28)]
              active:translate-y-0
            "
          >
            <span>View More Projects</span>

            <FaArrowRight
              size={13}
              className="
                transition-transform
                duration-300
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
   PROJECT CARD
   ========================================================= */

function ProjectCard({ project, index }) {
  const Icon = project.icon;

  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 20,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      whileHover={{
        y: -4,
      }}
      className="
        group
        overflow-hidden
        rounded-[20px]
        border
        border-slate-200/80
        bg-white
        shadow-[0_10px_30px_rgba(10,24,50,0.06)]
        transition-shadow
        duration-300
        hover:shadow-[0_18px_45px_rgba(10,24,50,0.11)]
      "
    >
      {/* =================================================
          PROJECT IMAGE
      ================================================= */}

      <div className="relative aspect-[1.95/1] overflow-hidden bg-slate-100">
        <img
          src={project.image}
          alt={project.title}
          className="
            h-full
            w-full
            object-cover
            transition-transform
            duration-700
            ease-out
            group-hover:scale-[1.04]
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-gradient-to-t
            from-black/10
            via-transparent
            to-transparent
            opacity-0
            transition-opacity
            duration-300
            group-hover:opacity-100
          "
        />
      </div>

      {/* =================================================
          PROJECT CONTENT
      ================================================= */}

      <div className="px-5 pb-5 pt-5 sm:px-[22px] sm:pb-[22px]">
        {/* Category */}

        <div className="flex items-center gap-2">
          <div
            className="
              flex
              h-5
              w-5
              items-center
              justify-center
              rounded-md
              bg-blue-50
              text-[#1769F5]
            "
          >
            <Icon size={9} />
          </div>

          <p
            className="
              text-[9px]
              font-bold
              uppercase
              tracking-[0.08em]
              text-[#1769F5]
            "
          >
            {project.category}
          </p>
        </div>

        {/* Title */}

        <h3
          className="
            mt-2
            text-lg
            font-bold
            tracking-[-0.025em]
            text-[#0A1832]
            sm:text-[18px]
          "
        >
          {project.title}
        </h3>

        {/* Tags */}

        <div className="mt-3.5 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="
                rounded-full
                bg-[#F0F5FF]
                px-3
                py-1.5
                text-[10px]
                font-medium
                text-[#4B76C7]
              "
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

export default RealProjects;