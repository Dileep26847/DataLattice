import React from "react";
import { motion } from "framer-motion";
import {
  FaArrowRight,
  FaLinkedinIn,
  FaQuoteLeft,
  FaRocket,
  FaLightbulb,
  FaUsers,
  FaGraduationCap,
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
   LEADER CARD
   ========================================================= */

function LeaderCard({ leader, index }) {
  const imageSrc = leader?.image || "";

  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 30,
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
        delay: index * 0.08,
        ease: "easeOut",
      }}
      whileHover={{
        y: -7,
      }}
      className="
        group
        overflow-hidden
        rounded-[28px]
        border
        border-[#E6EDF7]
        bg-white
        shadow-[0_16px_45px_rgba(11,27,58,0.07)]
        transition-shadow
        duration-300
        hover:shadow-[0_24px_60px_rgba(20,99,255,0.14)]
      "
    >
      {/* Image */}

      <div className="p-4 sm:p-5">
        <div
          className="
            relative
            overflow-hidden
            rounded-[24px]
            bg-[#EAF2FF]
          "
        >
          {imageSrc ? (
            <img
              src={imageSrc}
              alt={`Demo profile of ${leader.name}`}
              loading="lazy"
              className="
                h-[280px]
                w-full
                object-cover
                object-center
                transition-transform
                duration-500
                group-hover:scale-[1.035]
                sm:h-[320px]
              "
            />
          ) : (
            <div
              className="
                flex
                h-[280px]
                items-center
                justify-center
                bg-[#EAF2FF]
                text-sm
                font-semibold
                text-[#64748B]
                sm:h-[320px]
              "
            >
              Demo Photo
            </div>
          )}

          {/* Demo badge */}

          <div
            className="
              absolute
              left-4
              top-4
              rounded-full
              border
              border-white/80
              bg-white/90
              px-3
              py-1.5
              text-[10px]
              font-black
              uppercase
              tracking-[0.12em]
              text-[#1463FF]
              shadow-sm
              backdrop-blur
            "
          >
            Demo Profile
          </div>

          {/* LinkedIn button */}

          <button
            type="button"
            aria-label={`LinkedIn profile for ${leader.name}`}
            className="
              absolute
              bottom-4
              right-4
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              bg-[#1463FF]
              text-white
              shadow-lg
              transition-all
              duration-200
              hover:scale-105
              hover:bg-[#0B1B3A]
            "
          >
            <FaLinkedinIn size={14} />
          </button>
        </div>

        {/* Content */}

        <div className="px-1 pb-1 pt-5">
          <p
            className="
              text-[11px]
              font-black
              uppercase
              tracking-[0.15em]
              text-[#1463FF]
            "
          >
            {leader.role}
          </p>

          <h3
            className="
              mt-2
              text-2xl
              font-black
              tracking-tight
              text-[#0B1B3A]
            "
          >
            {leader.name}
          </h3>

          <p
            className="
              mt-3
              text-sm
              leading-7
              text-[#64748B]
            "
          >
            {leader.bio}
          </p>

          {/* Quote */}

          <div
            className="
              mt-5
              rounded-[20px]
              bg-[#F5F9FF]
              p-4
            "
          >
            <FaQuoteLeft
              size={16}
              className="text-[#1463FF]/40"
            />

            <p
              className="
                mt-2
                text-sm
                font-semibold
                leading-6
                text-[#334155]
              "
            >
              “{leader.quote}”
            </p>
          </div>
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
        py-20
        sm:py-24
        lg:py-28
      "
    >
      {/* ===================================================
          BACKGROUND DECORATION
          =================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -left-40
          top-20
          h-80
          w-80
          rounded-full
          bg-[#1463FF]/5
          blur-3xl
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-40
          top-32
          h-96
          w-96
          rounded-full
          bg-[#06B6D4]/5
          blur-3xl
        "
      />

      <div
        className="
          relative
          mx-auto
          max-w-7xl
          px-5
          sm:px-8
          lg:px-10
        "
      >
        {/* =================================================
            SECTION HEADER
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
          }}
          transition={{
            duration: 0.55,
          }}
          className="
            mx-auto
            max-w-3xl
            text-center
          "
        >
          <span
            className="
              inline-flex
              items-center
              rounded-full
              border
              border-[#1463FF]/15
              bg-[#F5F9FF]
              px-4
              py-2
              text-[11px]
              font-black
              uppercase
              tracking-[0.16em]
              text-[#1463FF]
            "
          >
            The people behind DataLattice
          </span>

          <h2
            className="
              mt-5
              text-3xl
              font-black
              leading-tight
              tracking-tight
              text-[#0B1B3A]
              sm:text-4xl
              lg:text-5xl
            "
          >
            Meet the minds behind{" "}
            <span className="text-[#1463FF]">
              DataLattice.
            </span>
          </h2>

          <p
            className="
              mx-auto
              mt-5
              max-w-2xl
              text-sm
              leading-7
              text-[#64748B]
              sm:text-base
            "
          >
            A team focused on making data education practical,
            accessible, and connected to real career opportunities.
          </p>
        </motion.div>

        {/* =================================================
            LEADERS
            ================================================= */}

        <div
          className="
            mt-12
            grid
            gap-6
            md:grid-cols-2
            lg:grid-cols-3
          "
        >
          {leaders.map((leader, index) => (
            <LeaderCard
              key={leader.id}
              leader={leader}
              index={index}
            />
          ))}
        </div>

        {/* =================================================
            VISION
            ================================================= */}

        <motion.div
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
            amount: 0.15,
          }}
          transition={{
            duration: 0.55,
          }}
          className="
            mt-16
            overflow-hidden
            rounded-[32px]
            border
            border-[#E6EDF7]
            bg-[#F5F9FF]
          "
        >
          <div
            className="
              grid
              items-center
              gap-8
              p-7
              sm:p-10
              lg:grid-cols-[1fr_auto]
              lg:p-12
            "
          >
            <div>
              <span
                className="
                  text-[11px]
                  font-black
                  uppercase
                  tracking-[0.18em]
                  text-[#1463FF]
                "
              >
                Our Vision
              </span>

              <h3
                className="
                  mt-3
                  max-w-2xl
                  text-2xl
                  font-black
                  leading-tight
                  tracking-tight
                  text-[#0B1B3A]
                  sm:text-3xl
                  lg:text-4xl
                "
              >
                Make data skills more{" "}
                <span className="text-[#1463FF]">
                  accessible and useful.
                </span>
              </h3>

              <p
                className="
                  mt-5
                  max-w-2xl
                  text-sm
                  leading-7
                  text-[#64748B]
                  sm:text-base
                "
              >
                We want learners to leave every program with
                more than a certificate — practical skills,
                meaningful projects, mentor guidance, and a
                clearer next step.
              </p>
            </div>

            <div
              className="
                flex
                min-w-[180px]
                flex-col
                items-center
                justify-center
                rounded-[26px]
                bg-[#0B1B3A]
                px-8
                py-8
                text-center
                shadow-xl
              "
            >
              <span className="text-3xl font-black text-white">
                Learn.
              </span>

              <span className="text-3xl font-black text-[#67E8F9]">
                Build.
              </span>

              <span className="text-3xl font-black text-[#1463FF]">
                Grow.
              </span>
            </div>
          </div>
        </motion.div>

        {/* =================================================
            PRINCIPLES
            ================================================= */}

        <div className="mt-16">
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
            }}
            className="text-center"
          >
            <span
              className="
                text-[11px]
                font-black
                uppercase
                tracking-[0.18em]
                text-[#1463FF]
              "
            >
              What guides us
            </span>

            <h3
              className="
                mt-3
                text-2xl
                font-black
                tracking-tight
                text-[#0B1B3A]
                sm:text-3xl
              "
            >
              Built around what matters.
            </h3>
          </motion.div>

          <div
            className="
              mt-8
              grid
              gap-4
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
                    y: 20,
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
                    duration: 0.45,
                    delay: index * 0.06,
                  }}
                  whileHover={{
                    y: -5,
                  }}
                  className="
                    rounded-[24px]
                    border
                    border-[#E6EDF7]
                    bg-white
                    p-6
                    shadow-[0_12px_35px_rgba(11,27,58,0.05)]
                    transition-shadow
                    duration-300
                    hover:shadow-[0_18px_40px_rgba(20,99,255,0.10)]
                  "
                >
                  <div
                    className="
                      flex
                      h-11
                      w-11
                      items-center
                      justify-center
                      rounded-2xl
                      bg-[#EAF2FF]
                      text-[#1463FF]
                    "
                  >
                    <Icon size={18} />
                  </div>

                  <h4
                    className="
                      mt-5
                      font-black
                      text-[#0B1B3A]
                    "
                  >
                    {principle.title}
                  </h4>

                  <p
                    className="
                      mt-2
                      text-sm
                      leading-6
                      text-[#64748B]
                    "
                  >
                    {principle.text}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* =================================================
            BOTTOM CTA STRIP
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
          }}
          transition={{
            duration: 0.55,
          }}
          className="
            mt-16
            flex
            flex-col
            items-start
            justify-between
            gap-6
            rounded-[28px]
            bg-gradient-to-r
            from-[#1463FF]
            to-[#0B1B3A]
            px-7
            py-8
            shadow-[0_20px_60px_rgba(20,99,255,0.18)]
            sm:px-10
            lg:flex-row
            lg:items-center
          "
        >
          <div>
            <p
              className="
                text-[11px]
                font-black
                uppercase
                tracking-[0.18em]
                text-[#A5F3FC]
              "
            >
              Start your journey
            </p>

            <h3
              className="
                mt-2
                text-2xl
                font-black
                text-white
                sm:text-3xl
              "
            >
              Build skills that move you forward.
            </h3>
          </div>

          <a
            href="#courses"
            className="
              inline-flex
              shrink-0
              items-center
              gap-3
              rounded-full
              bg-white
              px-6
              py-3.5
              text-sm
              font-black
              text-[#0B1B3A]
              shadow-lg
              transition-all
              duration-200
              hover:-translate-y-0.5
              hover:shadow-xl
            "
          >
            Explore Programs

            <FaArrowRight size={13} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}