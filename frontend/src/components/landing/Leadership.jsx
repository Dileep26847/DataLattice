import React from "react";
import { motion } from "framer-motion";

import {
  FaArrowRight,
  FaGraduationCap,
  FaRocket,
  FaUsers,
  FaLightbulb,
  FaQuoteLeft,
} from "react-icons/fa";

/* =========================================================
   DEMO LEADERSHIP DATA

   These are temporary demo profiles.
   Replace them later with the real DataLattice
   founder / CEO / leadership information.
   ========================================================= */

const leaders = [
  {
    id: 1,
    name: "Arjun Mehta",
    role: "Founder & CEO",
    image: "https://i.pravatar.cc/700?img=12",
    bio:
      "Building DataLattice around practical data education, strong mentorship, and career-ready learning.",
    quote:
      "The right skills can turn data into opportunity.",
  },
  {
    id: 2,
    name: "Maya Sharma",
    role: "Chief Learning Officer",
    image: "https://i.pravatar.cc/700?img=47",
    bio:
      "Designing learning experiences that connect concepts, projects, mentors, and real-world problem solving.",
    quote:
      "Learning becomes powerful when it leads to real work.",
  },
  {
    id: 3,
    name: "Ryan Carter",
    role: "Head of Curriculum",
    image: "https://i.pravatar.cc/700?img=53",
    bio:
      "Shaping hands-on curricula across analytics, data science, AI, and modern industry workflows.",
    quote:
      "A strong curriculum should prepare learners to build.",
  },
];

/* =========================================================
   LEADERSHIP PRINCIPLES
   ========================================================= */

const principles = [
  {
    id: 1,
    icon: FaGraduationCap,
    title: "Learner First",
    text:
      "Every experience starts with what helps learners progress with confidence.",
  },
  {
    id: 2,
    icon: FaRocket,
    title: "Practical by Design",
    text:
      "Projects, practice, and real workflows turn knowledge into usable skills.",
  },
  {
    id: 3,
    icon: FaUsers,
    title: "People Matter",
    text:
      "Mentors and communities provide guidance that courses alone cannot.",
  },
  {
    id: 4,
    icon: FaLightbulb,
    title: "Build for Tomorrow",
    text:
      "We evolve with the tools, roles, and skills shaping the data industry.",
  },
];

/* =========================================================
   LEADER ROW
   ========================================================= */

function LeaderRow({ leader, index }) {
  return (
    <motion.article
      initial={{
        opacity: 0,
        x: 28,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        duration: 0.55,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        group
        relative
        flex
        gap-4
        border-b
        border-white/10
        py-5
        last:border-b-0
        sm:gap-5
      "
    >
      {/* Number */}

      <div
        className="
          hidden
          w-7
          shrink-0
          pt-1
          text-[9px]
          font-semibold
          tracking-[0.15em]
          text-white/25
          sm:block
        "
      >
        0{index + 1}
      </div>

      {/* Image */}

      <div
        className="
          relative
          h-[92px]
          w-[78px]
          shrink-0
          overflow-hidden
          rounded-xl
          bg-white/10
          sm:h-[104px]
          sm:w-[88px]
        "
      >
        <img
          src={leader.image}
          alt={`Demo profile of ${leader.name}`}
          loading="lazy"
          className="
            h-full
            w-full
            object-cover
            object-center
            grayscale-[15%]
            transition-transform
            duration-500
            group-hover:scale-[1.05]
          "
        />

        <div
          className="
            absolute
            inset-x-0
            bottom-0
            h-8
            bg-gradient-to-t
            from-[#0A1832]/70
            to-transparent
          "
        />
      </div>

      {/* Content */}

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p
              className="
                text-[8px]
                font-semibold
                uppercase
                tracking-[0.16em]
                text-[#0289F9]
              "
            >
              {leader.role}
            </p>

            <h3
              className="
                mt-1
                text-lg
                font-semibold
                tracking-[-0.025em]
                text-white
                sm:text-xl
              "
            >
              {leader.name}
            </h3>
          </div>

          <motion.div
            whileHover={{
              x: 3,
            }}
            className="
              mt-1
              flex
              h-7
              w-7
              shrink-0
              items-center
              justify-center
              rounded-full
              border
              border-white/10
              text-[#0289F9]
              transition-colors
              duration-300
              group-hover:border-[#0289F9]/40
              group-hover:bg-[#0289F9]/10
            "
          >
            <FaArrowRight size={9} />
          </motion.div>
        </div>

        <p
          className="
            mt-2
            max-w-lg
            text-[10px]
            leading-5
            text-white/50
            sm:text-[11px]
          "
        >
          {leader.bio}
        </p>

        <div
          className="
            mt-3
            flex
            items-start
            gap-2
          "
        >
          <FaQuoteLeft
            size={8}
            className="mt-1 shrink-0 text-[#0289F9]/70"
          />

          <p
            className="
              text-[9px]
              font-medium
              leading-4
              text-white/65
            "
          >
            {leader.quote}
          </p>
        </div>
      </div>
    </motion.article>
  );
}

/* =========================================================
   LEADERSHIP COMPONENT
   ========================================================= */

export default function Leadership() {
  return (
    <section
      id="leadership"
      className="
        relative
        overflow-hidden
        bg-white
        py-12
        sm:py-14
        lg:py-16
      "
    >
      <div
        className="
          mx-auto
          w-full
          max-w-7xl
          px-5
          sm:px-7
          lg:px-8
        "
      >
        {/* =================================================
            MAIN LEADERSHIP PANEL
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
          viewport={{
            once: true,
            amount: 0.15,
          }}
          transition={{
            duration: 0.65,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            relative
            overflow-hidden
            rounded-[28px]
            bg-[#0A1832]
          "
        >
          {/* Subtle accent line */}

          <div
            className="
              absolute
              left-0
              top-0
              h-1
              w-full
              bg-gradient-to-r
              from-[#0C5FF5]
              via-[#0289F9]
              to-[#3531E7]
            "
          />

          {/* Very subtle background structure */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              right-[-100px]
              top-[-120px]
              h-[300px]
              w-[300px]
              rounded-full
              border
              border-[#0C5FF5]/10
            "
          />

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              right-[-55px]
              top-[-75px]
              h-[210px]
              w-[210px]
              rounded-full
              border
              border-[#0289F9]/10
            "
          />

          <div
            className="
              relative
              grid
              lg:grid-cols-[0.85fr_1.15fr]
            "
          >
            {/* =================================================
                LEFT EDITORIAL SIDE
            ================================================= */}

            <div
              className="
                relative
                flex
                flex-col
                justify-between
                p-7
                sm:p-9
                lg:min-h-[590px]
                lg:p-11
              "
            >
              <div>
                {/* Label */}

                <div
                  className="
                    inline-flex
                    items-center
                    gap-2
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.18em]
                    text-[#0289F9]
                  "
                >
                  <span
                    className="
                      h-1.5
                      w-1.5
                      rounded-full
                      bg-[#0289F9]
                    "
                  />

                  Leadership
                </div>

                {/* Heading */}

                <h2
                  className="
                    mt-6
                    max-w-xl
                    text-4xl
                    font-semibold
                    leading-[1.02]
                    tracking-[-0.045em]
                    text-white
                    sm:text-5xl
                    lg:text-[52px]
                  "
                >
                  The people
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
                    shaping the journey.
                  </span>
                </h2>

                {/* Description */}

                <p
                  className="
                    mt-5
                    max-w-md
                    text-sm
                    leading-6
                    text-white/55
                    sm:text-base
                    sm:leading-7
                  "
                >
                  A team focused on making data education practical,
                  accessible, and connected to real career opportunities.
                </p>
              </div>

              {/* Vision */}

              <div
                className="
                  mt-10
                  border-t
                  border-white/10
                  pt-6
                  lg:mt-auto
                "
              >
                <p
                  className="
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.18em]
                    text-[#0289F9]
                  "
                >
                  Our vision
                </p>

                <h3
                  className="
                    mt-3
                    max-w-md
                    text-xl
                    font-semibold
                    leading-7
                    tracking-[-0.025em]
                    text-white
                    sm:text-2xl
                  "
                >
                  Make data skills more{" "}
                  <span className="text-[#0289F9]">
                    accessible and useful.
                  </span>
                </h3>

                <p
                  className="
                    mt-3
                    max-w-md
                    text-[11px]
                    leading-5
                    text-white/45
                    sm:text-xs
                    sm:leading-6
                  "
                >
                  We want learners to leave every program with more
                  than a certificate — practical skills, meaningful
                  projects, mentor guidance, and a clearer next step.
                </p>

                {/* Learning progression */}

                <div
                  className="
                    mt-6
                    flex
                    items-center
                    gap-2
                  "
                >
                  <span
                    className="
                      text-xs
                      font-semibold
                      text-white
                    "
                  >
                    Learn
                  </span>

                  <span className="h-px w-8 bg-white/20" />

                  <span
                    className="
                      text-xs
                      font-semibold
                      text-[#0289F9]
                    "
                  >
                    Build
                  </span>

                  <span className="h-px w-8 bg-white/20" />

                  <span
                    className="
                      text-xs
                      font-semibold
                      text-[#3531E7]
                    "
                  >
                    Grow
                  </span>
                </div>
              </div>
            </div>

            {/* =================================================
                RIGHT LEADERSHIP DIRECTORY
            ================================================= */}

            <div
              className="
                border-t
                border-white/10
                bg-white/[0.025]
                px-6
                py-5
                sm:px-9
                sm:py-7
                lg:border-l
                lg:border-t-0
                lg:px-10
                lg:py-9
              "
            >
              {/* Directory heading */}

              <div
                className="
                  flex
                  items-center
                  justify-between
                  border-b
                  border-white/10
                  pb-4
                "
              >
                <div>
                  <p
                    className="
                      text-[8px]
                      font-semibold
                      uppercase
                      tracking-[0.18em]
                      text-white/30
                    "
                  >
                    Leadership team
                  </p>

                  <p
                    className="
                      mt-1
                      text-sm
                      font-semibold
                      text-white
                    "
                  >
                    The people behind DataLattice
                  </p>
                </div>

                <span
                  className="
                    rounded-full
                    border
                    border-[#0289F9]/20
                    bg-[#0289F9]/10
                    px-2.5
                    py-1.5
                    text-[8px]
                    font-semibold
                    uppercase
                    tracking-[0.12em]
                    text-[#0289F9]
                  "
                >
                  Team
                </span>
              </div>

              {/* Leaders */}

              <div className="mt-1">
                {leaders.map((leader, index) => (
                  <LeaderRow
                    key={leader.id}
                    leader={leader}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* =================================================
            PRINCIPLES
        ================================================= */}

        <div className="mt-7">
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
              duration: 0.45,
            }}
            className="
              flex
              flex-col
              gap-2
              sm:flex-row
              sm:items-end
              sm:justify-between
            "
          >
            <div>
              <p
                className="
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.18em]
                  text-[#0289F9]
                "
              >
                What guides us
              </p>

              <h3
                className="
                  mt-1.5
                  text-xl
                  font-semibold
                  tracking-[-0.03em]
                  text-[#0A1832]
                  sm:text-2xl
                "
              >
                Built around what matters.
              </h3>
            </div>

            <p
              className="
                max-w-md
                text-[11px]
                leading-5
                text-slate-400
              "
            >
              The principles behind how we design learning and
              build the DataLattice experience.
            </p>
          </motion.div>

          {/* Principle strip */}

          <div
            className="
              mt-4
              grid
              overflow-hidden
              rounded-[20px]
              border
              border-slate-200
              bg-white
              sm:grid-cols-2
              lg:grid-cols-4
            "
          >
            {principles.map((principle, index) => {
              const Icon = principle.icon;

              return (
                <motion.div
                  key={principle.id}
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
                    amount: 0.15,
                  }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.05,
                  }}
                  className="
                    group
                    border-b
                    border-slate-200
                    p-5
                    transition-colors
                    duration-300
                    hover:bg-[#F7FAFF]
                    sm:border-r
                    sm:last:border-r-0
                    lg:border-b-0
                  "
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="
                        flex
                        h-9
                        w-9
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        bg-[#F0F6FF]
                        text-[#0C5FF5]
                        transition-all
                        duration-300
                        group-hover:bg-[#0C5FF5]
                        group-hover:text-white
                      "
                    >
                      <Icon size={13} />
                    </div>

                    <div>
                      <h4
                        className="
                          text-sm
                          font-semibold
                          text-[#0A1832]
                        "
                      >
                        {principle.title}
                      </h4>

                      <p
                        className="
                          mt-1.5
                          text-[10px]
                          leading-5
                          text-slate-400
                        "
                      >
                        {principle.text}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* =================================================
            SMALL CLOSING STRIP
        ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.4,
          }}
          className="
            mt-4
            flex
            flex-wrap
            items-center
            justify-between
            gap-3
            border-t
            border-slate-200
            pt-4
          "
        >
          <div
            className="
              flex
              items-center
              gap-2
              text-[9px]
              font-semibold
              uppercase
              tracking-[0.14em]
              text-slate-400
            "
          >
            <span
              className="
                h-1.5
                w-1.5
                rounded-full
                bg-[#0289F9]
              "
            />

            Leadership with purpose
          </div>

          <a
            href="#courses"
            className="
              group
              inline-flex
              items-center
              gap-2
              text-[10px]
              font-semibold
              text-[#0C5FF5]
              transition-colors
              duration-200
              hover:text-[#3531E7]
            "
          >
            Explore Programs

            <FaArrowRight
              size={8}
              className="
                transition-transform
                duration-200
                group-hover:translate-x-1
              "
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
}