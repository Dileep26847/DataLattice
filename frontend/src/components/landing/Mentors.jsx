import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import {
  FaArrowRight,
  FaLinkedinIn,
  FaUserTie,
} from "react-icons/fa";

import { getPublicMentors } from "../../services/mentorService";

// ============================================================
// DATALATTICE MENTORS
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

        if (!mounted) return;

        if (
          response?.success &&
          Array.isArray(response.mentors)
        ) {
          setMentors(response.mentors);
        } else {
          setMentors([]);
        }
      } catch (err) {
        console.error("Unable to load public mentors:", err);

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
        bg-[#F8FAFD]
        py-14
        sm:py-16
        lg:py-20
      "
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-7 lg:px-8">

        {/* ====================================================
            HEADER
        ==================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 14,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.55,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          className="mx-auto max-w-3xl text-center"
        >
          {/* badge */}

          <div
            className="
              inline-flex
              items-center
              rounded-full
              border
              border-[#BFD8FF]
              bg-[#F1F6FF]
              px-3
              py-1.5
              text-[9px]
              font-bold
              uppercase
              tracking-[0.08em]
              text-[#0C5FF5]
            "
          >
            OUR MENTORS
          </div>

          {/* heading */}

          <h2
            className="
              mt-5
              text-3xl
              font-semibold
              leading-[1.05]
              tracking-[-0.045em]
              text-[#0A1832]
              sm:text-4xl
              lg:text-[42px]
            "
          >
            Learn From Industry Experts
          </h2>

          {/* description */}

          <p
            className="
              mx-auto
              mt-4
              max-w-2xl
              text-sm
              leading-6
              text-slate-500
              sm:text-[15px]
              sm:leading-7
            "
          >
            Get mentored by experienced professionals who bring
            real-world insights to your learning journey.
          </p>
        </motion.div>

        {/* ====================================================
            LOADING
        ==================================================== */}

        {loading && <MentorLoadingState />}

        {/* ====================================================
            ERROR
        ==================================================== */}

        {!loading &&
          error &&
          mentors.length === 0 && (
            <MentorEmptyState message={error} />
          )}

        {/* ====================================================
            EMPTY
        ==================================================== */}

        {!loading &&
          !error &&
          mentors.length === 0 && (
            <MentorEmptyState
              message="Mentor profiles will appear here as they are published by the DataLattice team."
            />
          )}

        {/* ====================================================
            MENTOR GRID
        ==================================================== */}

        {!loading && mentors.length > 0 && (
          <>
            <div
              className="
                mt-10
                grid
                gap-5
                sm:grid-cols-2
                lg:grid-cols-4
              "
            >
              {visibleMentors.map((mentor, index) => (
                <MentorCard
                  key={mentor.id || mentor._id || index}
                  mentor={mentor}
                  index={index}
                />
              ))}
            </div>

            {/* ==================================================
                VIEW ALL
            ================================================== */}

            {mentors.length > 4 && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 10,
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
                className="mt-12 flex justify-center"
              >
                <button
                  type="button"
                  className="
                    inline-flex
                    items-center
                    gap-2
                    text-sm
                    font-semibold
                    text-[#0C5FF5]
                    transition-all
                    duration-300
                    hover:gap-3
                  "
                >
                  View All Mentors
                  <FaArrowRight size={11} />
                </button>
              </motion.div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

// ============================================================
// MENTOR CARD
// ============================================================

function MentorCard({ mentor, index }) {
  const name =
    mentor?.full_name ||
    mentor?.name ||
    "Data Mentor";

  const designation =
    mentor?.designation ||
    mentor?.role ||
    "Industry Mentor";

  const specialization =
    mentor?.specialization ||
    mentor?.expertise ||
    "Data & Technology";

  const experience =
    mentor?.experience ||
    mentor?.experience_years ||
    "Professional";

  const description =
    mentor?.bio ||
    mentor?.description ||
    `Experienced ${designation.toLowerCase()} helping learners connect practical skills with real-world work.`;

  const image =
    mentor?.profile_image ||
    mentor?.profileImage ||
    mentor?.image ||
    mentor?.photo ||
    mentor?.avatar ||
    null;

  const linkedin =
    mentor?.linkedin_url ||
    mentor?.linkedinUrl ||
    mentor?.linkedin ||
    "";

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
      transition={{
        duration: 0.45,
        delay: index * 0.07,
        ease: [0.22, 1, 0.36, 1],
      }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      whileHover={{
        y: -5,
      }}
      className="
        group
        overflow-hidden
        rounded-[20px]
        border
        border-slate-200
        bg-white
        shadow-[0_8px_28px_rgba(10,24,50,0.045)]
        transition-shadow
        duration-300
        hover:shadow-[0_18px_40px_rgba(10,24,50,0.09)]
      "
    >
      {/* ======================================================
          IMAGE
      ====================================================== */}

      <div className="relative mx-4 mt-4 h-[178px] overflow-hidden rounded-[14px] bg-[#EEF4FB]">
        {image ? (
          <img
            src={image}
            alt={name}
            className="
              h-full
              w-full
              object-cover
              transition-transform
              duration-500
              group-hover:scale-[1.035]
            "
            onError={(event) => {
              event.currentTarget.style.display = "none";
              event.currentTarget.nextSibling.style.display = "flex";
            }}
          />
        ) : null}

        {/* fallback avatar */}

        <div
          className={`
            absolute
            inset-0
            items-center
            justify-center
            bg-gradient-to-br
            from-[#0C5FF5]
            via-[#0289F9]
            to-[#3531E7]
            text-4xl
            font-semibold
            text-white
            ${image ? "hidden" : "flex"}
          `}
        >
          {getInitials(name)}
        </div>
      </div>

      {/* ======================================================
          CONTENT
      ====================================================== */}

      <div className="px-4 pb-4 pt-4">

        {/* designation + experience */}

        <div className="flex items-center gap-2">
          <span
            className="
              rounded-full
              bg-[#F0F6FF]
              px-2.5
              py-1
              text-[8px]
              font-semibold
              uppercase
              tracking-[0.04em]
              text-[#0C5FF5]
            "
          >
            {specialization}
          </span>

          <span
            className="
              rounded-full
              bg-[#F5F6F8]
              px-2.5
              py-1
              text-[8px]
              font-semibold
              text-slate-500
            "
          >
            {formatExperience(experience)}
          </span>
        </div>

        {/* name */}

        <h3
          className="
            mt-3
            truncate
            text-[17px]
            font-semibold
            tracking-[-0.025em]
            text-[#0A1832]
          "
          title={name}
        >
          {name}
        </h3>

        {/* designation */}

        <p
          className="
            mt-1
            text-[10px]
            font-medium
            text-slate-400
          "
        >
          {designation}
        </p>

        {/* description */}

        <p
          className="
            mt-3
            line-clamp-2
            min-h-[38px]
            text-[11px]
            leading-[1.65]
            text-slate-500
          "
        >
          {description}
        </p>

        {/* ====================================================
            FOOTER
        ==================================================== */}

        <div
          className="
            mt-4
            flex
            items-center
            justify-between
            border-t
            border-slate-100
            pt-3.5
          "
        >
          {linkedin ? (
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${name} LinkedIn profile`}
              className="
                inline-flex
                items-center
                gap-2
                text-[10px]
                font-semibold
                text-[#0289F9]
                transition-colors
                duration-200
                hover:text-[#0C5FF5]
              "
            >
              <span
                className="
                  flex
                  h-6
                  w-6
                  items-center
                  justify-center
                  rounded-full
                  bg-[#EAF5FF]
                  text-[#0289F9]
                "
              >
                <FaLinkedinIn size={11} />
              </span>

              LinkedIn
            </a>
          ) : (
            <span
              className="
                inline-flex
                items-center
                gap-2
                text-[10px]
                font-semibold
                text-[#0289F9]
              "
            >
              <span
                className="
                  flex
                  h-6
                  w-6
                  items-center
                  justify-center
                  rounded-full
                  bg-[#EAF5FF]
                  text-[#0289F9]
                "
              >
                <FaLinkedinIn size={11} />
              </span>

              LinkedIn
            </span>
          )}

          <span
            className="
              text-[11px]
              text-slate-400
              transition-transform
              duration-300
              group-hover:translate-x-0.5
            "
          >
            ↗
          </span>
        </div>
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
        mt-10
        grid
        gap-5
        sm:grid-cols-2
        lg:grid-cols-4
      "
    >
      {[1, 2, 3, 4].map((item) => (
        <div
          key={item}
          className="
            overflow-hidden
            rounded-[20px]
            border
            border-slate-200
            bg-white
          "
        >
          <div className="m-4 h-[178px] animate-pulse rounded-[14px] bg-slate-100" />

          <div className="px-4 pb-5">
            <div className="flex gap-2">
              <div className="h-5 w-20 animate-pulse rounded-full bg-slate-100" />
              <div className="h-5 w-16 animate-pulse rounded-full bg-slate-100" />
            </div>

            <div className="mt-3 h-5 w-32 animate-pulse rounded bg-slate-200" />

            <div className="mt-2 h-3 w-24 animate-pulse rounded bg-slate-100" />

            <div className="mt-4 space-y-2">
              <div className="h-2.5 w-full animate-pulse rounded bg-slate-100" />
              <div className="h-2.5 w-4/5 animate-pulse rounded bg-slate-100" />
            </div>

            <div className="mt-4 border-t border-slate-100 pt-3">
              <div className="h-6 w-20 animate-pulse rounded-full bg-slate-100" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ============================================================
// EMPTY / ERROR STATE
// ============================================================

function MentorEmptyState({ message }) {
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
        mx-auto
        mt-10
        flex
        min-h-[180px]
        max-w-2xl
        flex-col
        items-center
        justify-center
        rounded-[20px]
        border
        border-dashed
        border-slate-300
        bg-white
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
// HELPERS
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

function formatExperience(value) {
  if (!value) {
    return "Professional";
  }

  if (typeof value === "number") {
    return `${value}+ years`;
  }

  const text = String(value);

  if (/year/i.test(text)) {
    return text;
  }

  return text;
}

export default Mentors;