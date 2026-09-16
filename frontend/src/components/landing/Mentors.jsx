import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import {
  FaArrowRight,
  FaBriefcase,
  FaChartLine,
  FaDatabase,
  FaUserTie,
} from "react-icons/fa";

import { getPublicMentors } from "../../services/mentorService";

// ============================================================
// DATALATTICE MENTOR ACCENTS
// ============================================================

const mentorAccents = [
  {
    label: "DATA",
    icon: FaDatabase,
  },
  {
    label: "ANALYTICS",
    icon: FaChartLine,
  },
  {
    label: "PRACTICAL",
    icon: FaBriefcase,
  },
  {
    label: "GUIDANCE",
    icon: FaUserTie,
  },
];

// ============================================================
// MAIN COMPONENT
// ============================================================

function Mentors() {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==========================================================
  // LOAD PUBLIC MENTORS
  // ==========================================================

  useEffect(() => {
    let mounted = true;

    const loadMentors = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getPublicMentors();

        if (!mounted) {
          return;
        }

        if (
          response?.success &&
          Array.isArray(response.mentors)
        ) {
          setMentors(response.mentors);
        } else {
          setMentors([]);
        }
      } catch (err) {
        console.error(
          "Unable to load public mentors:",
          err
        );

        if (mounted) {
          setError(
            "Mentor information is temporarily unavailable."
          );
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadMentors();

    return () => {
      mounted = false;
    };
  }, []);

  const visibleMentors = mentors.slice(0, 4);

  return (
    <section
      id="mentors"
      className="
        relative
        overflow-hidden
        border-t
        border-slate-200
        bg-white
        py-11
        sm:py-13
        lg:py-15
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
        {/* ====================================================
            HEADER
        ==================================================== */}

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
            duration: 0.5,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          className="
            flex
            flex-col
            gap-5
            lg:flex-row
            lg:items-end
            lg:justify-between
          "
        >
          <div className="max-w-3xl">
            <div
              className="
                flex
                items-center
                gap-2
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.18em]
                text-[#0C5FF5]
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

              Learn with guidance
            </div>

            <h2
              className="
                mt-4
                text-3xl
                font-semibold
                leading-[1.06]
                tracking-[-0.045em]
                text-[#0A1832]
                sm:text-4xl
                lg:text-[48px]
              "
            >
              Meet the people
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
                behind the learning.
              </span>
            </h2>
          </div>

          <div
            className="
              max-w-lg
              lg:ml-auto
            "
          >
            <p
              className="
                text-sm
                leading-6
                text-slate-500
                sm:text-base
                sm:leading-7
              "
            >
              Learn from mentors whose experience can help connect
              technical concepts with practical problem solving.
            </p>

            <div
              className="
                mt-4
                flex
                items-center
                gap-3
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.16em]
                text-slate-400
              "
            >
              <span
                className="
                  h-px
                  w-8
                  bg-gradient-to-r
                  from-[#0C5FF5]
                  to-[#3531E7]
                "
              />

              Public mentor profiles

              {mentors.length > 0 && (
                <span className="text-[#0289F9]">
                  {mentors.length} available
                </span>
              )}
            </div>
          </div>
        </motion.div>

        {/* ====================================================
            MENTOR GRID
        ==================================================== */}

        {loading && <MentorLoadingState />}

        {!loading &&
          error &&
          mentors.length === 0 && (
            <MentorEmptyState message={error} />
          )}

        {!loading &&
          !error &&
          mentors.length === 0 && (
            <MentorEmptyState
              message="Mentor profiles will appear here as they are published by the DataLattice team."
            />
          )}

        {!loading && mentors.length > 0 && (
          <div
            className="
              mt-8
              grid
              gap-4
              sm:grid-cols-2
              lg:grid-cols-4
            "
          >
            {visibleMentors.map(
              (mentor, index) => (
                <MentorCard
                  key={mentor.id}
                  mentor={mentor}
                  index={index}
                />
              )
            )}
          </div>
        )}

        {/* ====================================================
            BOTTOM INFO
        ==================================================== */}

        {!loading && mentors.length > 0 && (
          <motion.div
            initial={{
              opacity: 0,
              y: 8,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.4,
            }}
            viewport={{
              once: true,
            }}
            className="
              mt-5
              flex
              flex-col
              gap-3
              border-t
              border-slate-200
              pt-4
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >
            <div className="flex items-center gap-2.5">
              <span
                className="
                  flex
                  h-7
                  w-7
                  items-center
                  justify-center
                  rounded-lg
                  bg-[#0A1832]
                  text-white
                "
              >
                <FaUserTie size={11} />
              </span>

              <p
                className="
                  text-xs
                  leading-5
                  text-slate-500
                "
              >
                Guidance is part of the DataLattice learning
                experience.
              </p>
            </div>

            <div
              className="
                flex
                items-center
                gap-2
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.14em]
                text-[#0C5FF5]
              "
            >
              Mentor network

              <FaArrowRight size={8} />
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

// ============================================================
// MENTOR CARD
// ============================================================

function MentorCard({
  mentor,
  index,
}) {
  const accent =
    mentorAccents[
      index % mentorAccents.length
    ];

  const Icon = accent.icon;

  const initials = getInitials(
    mentor?.full_name
  );

  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 14,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.45,
        delay: index * 0.06,
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
        relative
        flex
        min-h-[340px]
        flex-col
        overflow-hidden
        rounded-[22px]
        border
        border-slate-200
        bg-white
        shadow-[0_10px_35px_rgba(10,24,50,0.05)]
        transition-all
        duration-300
        hover:border-[#0C5FF5]/20
        hover:shadow-[0_18px_45px_rgba(10,24,50,0.09)]
      "
    >
      {/* ======================================================
          TOP ACCENT
      ====================================================== */}

      <div
        className="
          h-[3px]
          w-full
          bg-gradient-to-r
          from-[#0C5FF5]
          via-[#0289F9]
          to-[#3531E7]
        "
      />

      {/* ======================================================
          CARD CONTENT
      ====================================================== */}

      <div
        className="
          flex
          flex-1
          flex-col
          p-5
        "
      >
        {/* ====================================================
            CARD TOP
        ==================================================== */}

        <div
          className="
            flex
            items-start
            justify-between
            gap-3
          "
        >
          <span
            className="
              rounded-full
              bg-[#F1F6FF]
              px-2.5
              py-1.5
              text-[8px]
              font-semibold
              uppercase
              tracking-[0.14em]
              text-[#0C5FF5]
            "
          >
            Mentor{" "}
            {String(index + 1).padStart(2, "0")}
          </span>

          <span
            className="
              text-[8px]
              font-semibold
              uppercase
              tracking-[0.14em]
              text-slate-300
            "
          >
            {accent.label}
          </span>
        </div>

        {/* ====================================================
            AVATAR
        ==================================================== */}

        <div
          className="
            relative
            mt-6
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-2xl
            bg-gradient-to-br
            from-[#0C5FF5]
            via-[#0289F9]
            to-[#3531E7]
            text-lg
            font-semibold
            text-white
            shadow-[0_10px_25px_rgba(12,95,245,0.20)]
          "
        >
          {initials}

          <span
            className="
              absolute
              bottom-[-3px]
              right-[-3px]
              h-3.5
              w-3.5
              rounded-full
              border-2
              border-white
              bg-[#0289F9]
            "
          />
        </div>

        {/* ====================================================
            NAME
        ==================================================== */}

        <div className="mt-5">
          <p
            className="
              text-[8px]
              font-semibold
              uppercase
              tracking-[0.15em]
              text-[#0289F9]
            "
          >
            {mentor?.designation ||
              "Data Mentor"}
          </p>

          <h3
            className="
              mt-1.5
              truncate
              text-lg
              font-semibold
              tracking-[-0.025em]
              text-[#0A1832]
            "
            title={mentor?.full_name}
          >
            {mentor?.full_name}
          </h3>
        </div>

        {/* ====================================================
            SPECIALIZATION
        ==================================================== */}

        <div
          className="
            mt-5
            rounded-xl
            border
            border-slate-100
            bg-[#F8FBFF]
            p-3
          "
        >
          <div
            className="
              flex
              items-start
              gap-2.5
            "
          >
            <div
              className="
                flex
                h-8
                w-8
                shrink-0
                items-center
                justify-center
                rounded-lg
                bg-white
                text-[#0C5FF5]
                shadow-sm
                ring-1
                ring-slate-100
              "
            >
              <Icon size={12} />
            </div>

            <div className="min-w-0">
              <p
                className="
                  text-[8px]
                  font-semibold
                  uppercase
                  tracking-[0.14em]
                  text-slate-400
                "
              >
                Specialization
              </p>

              <p
                className="
                  mt-1
                  line-clamp-2
                  text-xs
                  leading-5
                  text-slate-600
                "
              >
                {mentor?.specialization ||
                  "Data and technology"}
              </p>
            </div>
          </div>
        </div>

        {/* ====================================================
            EXPERIENCE
        ==================================================== */}

        <div
          className="
            mt-auto
            pt-5
          "
        >
          <div
            className="
              flex
              items-center
              justify-between
              border-t
              border-slate-100
              pt-4
            "
          >
            <span
              className="
                text-[8px]
                font-semibold
                uppercase
                tracking-[0.14em]
                text-slate-400
              "
            >
              Experience
            </span>

            <span
              className="
                text-[11px]
                font-semibold
                text-[#0A1832]
              "
            >
              {mentor?.experience ||
                "Professional"}
            </span>
          </div>
        </div>
      </div>

      {/* ======================================================
          CARD FOOTER
      ====================================================== */}

      <div
        className="
          flex
          items-center
          justify-between
          border-t
          border-slate-100
          bg-[#FAFCFF]
          px-5
          py-3.5
        "
      >
        <span
          className="
            text-[8px]
            font-semibold
            uppercase
            tracking-[0.13em]
            text-slate-400
          "
        >
          DataLattice Mentor
        </span>

        <span
          className="
            flex
            items-center
            gap-1.5
            text-[9px]
            font-semibold
            text-[#0C5FF5]
            transition-transform
            duration-300
            group-hover:translate-x-0.5
          "
        >
          Guidance

          <FaArrowRight size={7} />
        </span>
      </div>
    </motion.article>
  );
}

// ============================================================
// LOADING STATE
// ============================================================

function MentorLoadingState() {
  return (
    <div
      className="
        mt-8
        grid
        gap-4
        sm:grid-cols-2
        lg:grid-cols-4
      "
    >
      {[1, 2, 3, 4].map((item) => (
        <div
          key={item}
          className="
            min-h-[340px]
            animate-pulse
            overflow-hidden
            rounded-[22px]
            border
            border-slate-200
            bg-white
          "
        >
          <div className="h-[3px] bg-slate-100" />

          <div className="p-5">
            <div className="flex justify-between">
              <div className="h-5 w-20 rounded-full bg-slate-100" />
              <div className="h-3 w-12 rounded-full bg-slate-100" />
            </div>

            <div className="mt-6 h-16 w-16 rounded-2xl bg-slate-100" />

            <div className="mt-5 h-2 w-20 rounded bg-slate-100" />

            <div className="mt-2 h-5 w-32 rounded bg-slate-200" />

            <div className="mt-5 h-[70px] rounded-xl bg-slate-100" />

            <div className="mt-5 border-t border-slate-100 pt-4">
              <div className="flex justify-between">
                <div className="h-2 w-16 rounded bg-slate-100" />
                <div className="h-3 w-20 rounded bg-slate-100" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ============================================================
// EMPTY STATE
// ============================================================

function MentorEmptyState({
  message,
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 10,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="
        mt-8
        flex
        min-h-[180px]
        flex-col
        items-center
        justify-center
        rounded-[22px]
        border
        border-dashed
        border-slate-300
        bg-[#F8FBFF]
        px-6
        text-center
      "
    >
      <div
        className="
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-xl
          bg-[#0A1832]
          text-white
        "
      >
        <FaUserTie size={15} />
      </div>

      <p
        className="
          mt-4
          max-w-md
          text-sm
          leading-6
          text-slate-500
        "
      >
        {message}
      </p>
    </motion.div>
  );
}

// ============================================================
// INITIALS
// ============================================================

function getInitials(name) {
  if (!name) {
    return "DL";
  }

  const parts = name
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (parts.length === 1) {
    return parts[0]
      .slice(0, 2)
      .toUpperCase();
  }

  return (
    parts[0][0] +
    parts[parts.length - 1][0]
  ).toUpperCase();
}

export default Mentors;