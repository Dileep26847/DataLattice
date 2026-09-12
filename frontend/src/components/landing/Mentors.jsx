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
// DATALATTICE MENTOR VISUAL SYSTEM
// ============================================================

const mentorAccents = [
  {
    label: "DATA",
    icon: <FaDatabase />,
  },

  {
    label: "ANALYTICS",
    icon: <FaChartLine />,
  },

  {
    label: "PRACTICAL",
    icon: <FaBriefcase />,
  },

  {
    label: "GUIDANCE",
    icon: <FaUserTie />,
  },
];


// ============================================================
// MAIN COMPONENT
// ============================================================

function Mentors() {

  const [
    mentors,
    setMentors,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState("");


  // ==========================================================
  // LOAD PUBLIC MENTORS
  // ==========================================================

  useEffect(() => {

    let mounted = true;


    const loadMentors = async () => {

      try {

        setLoading(true);
        setError("");


        const response =
          await getPublicMentors();


        if (!mounted) {
          return;
        }


        if (
          response?.success &&
          Array.isArray(
            response.mentors
          )
        ) {

          setMentors(
            response.mentors
          );

        } else {

          setMentors([]);

        }

      }

      catch (err) {

        console.error(
          "Unable to load public mentors:",
          err
        );


        if (mounted) {

          setError(
            "Mentor information is temporarily unavailable."
          );

        }

      }

      finally {

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


  // ==========================================================
  // DISPLAY LIMIT
  // ==========================================================

  const visibleMentors =
    mentors.slice(
      0,
      4
    );


  return (

    <section
      id="mentors"
      className="
        relative
        overflow-hidden
        border-t
        border-slate-200
        bg-[#F8FBFF]
        py-12
        sm:py-14
        lg:py-16
      "
    >

      {/* ======================================================
          CONTENT
      ====================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          w-full
          max-w-7xl
          px-5
          sm:px-8
          lg:px-8
        "
      >

        {/* ====================================================
            HEADER
        ==================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 16,
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

          {/* ==================================================
              HEADER CONTENT
          ================================================== */}

          <div
            className="
              max-w-2xl
            "
          >

            <div
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-blue-100
                bg-blue-50
                px-3.5
                py-2
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.18em]
                text-[#1463FF]
              "
            >

              <span
                className="
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-[#06B6D4]
                "
              />

              Learn with guidance

            </div>


            <h2
              className="
                mt-5
                text-3xl
                font-semibold
                leading-[1.08]
                tracking-[-0.04em]
                text-[#0B1B3A]
                sm:text-4xl
                lg:text-[46px]
              "
            >

              Meet the people
              <span
                className="
                  text-[#1463FF]
                "
              >
                {" "}behind the learning.
              </span>

            </h2>


            <p
              className="
                mt-4
                max-w-xl
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

          </div>


          {/* ==================================================
              DIRECTORY STATUS
          ================================================== */}

          <div
            className="
              flex
              shrink-0
              items-center
              gap-3
              rounded-2xl
              border
              border-slate-200
              bg-white
              px-4
              py-3
              shadow-sm
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
                bg-[#0B1B3A]
                text-[#67E8F9]
              "
            >

              <FaUserTie
                size={14}
              />

            </div>


            <div>

              <p
                className="
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.18em]
                  text-slate-400
                "
              >
                Mentor directory
              </p>


              <p
                className="
                  mt-0.5
                  text-xs
                  font-semibold
                  text-[#0B1B3A]
                "
              >
                Live platform profiles

              </p>

            </div>

          </div>

        </motion.div>


        {/* ====================================================
            DATA SIGNAL
        ==================================================== */}

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
            duration: 0.45,
            delay: 0.08,
          }}
          viewport={{
            once: true,
          }}
          className="
            mt-7
            flex
            flex-wrap
            items-center
            gap-x-5
            gap-y-3
            border-y
            border-slate-200
            py-3
          "
        >

          <span
            className="
              text-[9px]
              font-semibold
              uppercase
              tracking-[0.18em]
              text-slate-400
            "
          >
            MENTOR NETWORK
          </span>


          <div
            className="
              hidden
              h-3
              w-px
              bg-slate-200
              sm:block
            "
          />


          {mentorAccents.map(
            (
              item,
              index
            ) => (

              <div
                key={
                  item.label
                }
                className="
                  flex
                  items-center
                  gap-1.5
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.12em]
                  text-slate-500
                "
              >

                <span
                  className="
                    text-[#1463FF]
                  "
                >
                  {item.icon}
                </span>

                {item.label}

              </div>

            )
          )}

        </motion.div>


        {/* ====================================================
            LOADING
        ==================================================== */}

        {loading && (
          <MentorLoadingState />
        )}


        {/* ====================================================
            ERROR
        ==================================================== */}

        {!loading &&
          error &&
          mentors.length === 0 && (
            <MentorEmptyState
              message={
                error
              }
            />
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

        {!loading &&
          mentors.length > 0 && (

            <div
              className="
                mt-7
                grid
                gap-4
                sm:grid-cols-2
                lg:grid-cols-4
              "
            >

              {visibleMentors.map(
                (
                  mentor,
                  index
                ) => (

                  <MentorCard
                    key={
                      mentor.id
                    }
                    mentor={
                      mentor
                    }
                    index={
                      index
                    }
                  />

                )
              )}

            </div>

          )}


        {/* ====================================================
            BOTTOM INFO
        ==================================================== */}

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
            duration: 0.45,
            delay: 0.12,
          }}
          viewport={{
            once: true,
          }}
          className="
            mt-5
            flex
            flex-col
            items-start
            justify-between
            gap-4
            rounded-2xl
            border
            border-slate-200
            bg-white
            px-5
            py-4
            shadow-sm
            sm:flex-row
            sm:items-center
            sm:px-6
          "
        >

          <div
            className="
              flex
              items-center
              gap-3
            "
          >

            <div
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-blue-50
                text-[#1463FF]
              "
            >

              <FaChartLine
                size={13}
              />

            </div>


            <div>

              <p
                className="
                  text-sm
                  font-semibold
                  text-[#0B1B3A]
                "
              >
                Guidance is part of the learning system.
              </p>


              <p
                className="
                  mt-0.5
                  text-[11px]
                  text-slate-400
                "
              >
                Public mentor profiles are connected directly to platform data.

              </p>

            </div>

          </div>


          <div
            className="
              flex
              items-center
              gap-2
              text-[9px]
              font-semibold
              uppercase
              tracking-[0.16em]
              text-[#06B6D4]
            "
          >

            <span
              className="
                h-1.5
                w-1.5
                rounded-full
                bg-[#06B6D4]
              "
            />

            Live profile data

            <FaArrowRight
              size={8}
            />

          </div>

        </motion.div>

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
      index %
      mentorAccents.length
    ];


  const initials =
    getInitials(
      mentor.full_name
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
        delay:
          index * 0.07,
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      whileHover={{
        y: -4,
      }}
      className="
        group
        relative
        overflow-hidden
        rounded-[22px]
        border
        border-slate-200
        bg-white
        shadow-[0_10px_35px_rgba(11,27,58,0.055)]
        transition-all
        duration-300
        hover:border-blue-100
        hover:shadow-[0_18px_45px_rgba(11,27,58,0.10)]
      "
    >

      {/* ====================================================
          TOP DATA BAR
      ==================================================== */}

      <div
        className="
          h-1
          w-full
          bg-gradient-to-r
          from-[#0B1B3A]
          via-[#1463FF]
          to-[#06B6D4]
        "
      />


      {/* ====================================================
          PROFILE AREA
      ==================================================== */}

      <div
        className="
          relative
          overflow-hidden
          px-5
          pb-5
          pt-5
        "
      >

        {/* ==================================================
            SUBTLE DATA VISUAL
        ================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            right-[-25px]
            top-[-25px]
            h-28
            w-28
            rounded-full
            border
            border-blue-100
            bg-blue-50/50
          "
        />


        <div
          className="
            pointer-events-none
            absolute
            right-4
            top-4
            h-16
            w-16
            rounded-full
            border
            border-cyan-100
          "
        />


        {/* ==================================================
            NUMBER
        ================================================== */}

        <div
          className="
            relative
            z-10
            flex
            items-center
            justify-between
          "
        >

          <span
            className="
              rounded-full
              border
              border-blue-100
              bg-blue-50
              px-2.5
              py-1.5
              text-[8px]
              font-semibold
              tracking-[0.14em]
              text-[#1463FF]
            "
          >
            MENTOR {String(
              index + 1
            ).padStart(
              2,
              "0"
            )}
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


        {/* ==================================================
            AVATAR
        ================================================== */}

        <div
          className="
            relative
            z-10
            mt-6
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-2xl
            bg-[#0B1B3A]
            text-lg
            font-semibold
            text-white
            shadow-[0_10px_25px_rgba(11,27,58,0.14)]
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
              bg-[#06B6D4]
            "
          />

        </div>


        {/* ==================================================
            NAME + DESIGNATION
        ================================================== */}

        <div
          className="
            relative
            z-10
            mt-4
          "
        >

          <p
            className="
              text-[9px]
              font-semibold
              uppercase
              tracking-[0.16em]
              text-[#1463FF]
            "
          >
            {mentor.designation ||
              "Data Mentor"}
          </p>


          <h3
            className="
              mt-1.5
              truncate
              text-lg
              font-semibold
              tracking-[-0.02em]
              text-[#0B1B3A]
            "
            title={
              mentor.full_name
            }
          >
            {mentor.full_name}
          </h3>

        </div>


        {/* ==================================================
            SPECIALIZATION
        ================================================== */}

        <div
          className="
            relative
            z-10
            mt-4
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
                mt-0.5
                flex
                h-7
                w-7
                shrink-0
                items-center
                justify-center
                rounded-lg
                bg-white
                text-[#1463FF]
                shadow-sm
              "
            >

              {accent.icon}

            </div>


            <div
              className="
                min-w-0
              "
            >

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
                {mentor.specialization ||
                  "Data and technology"}
              </p>

            </div>

          </div>

        </div>


        {/* ==================================================
            EXPERIENCE
        ================================================== */}

        <div
          className="
            mt-4
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
              text-[#0B1B3A]
            "
          >
            {mentor.experience ||
              "Professional"}
          </span>

        </div>

      </div>


      {/* ====================================================
          CARD FOOTER
      ==================================================== */}

      <div
        className="
          flex
          items-center
          justify-between
          border-t
          border-slate-100
          bg-slate-50/70
          px-5
          py-3.5
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
          DataLattice Mentor
        </span>


        <span
          className="
            flex
            items-center
            gap-1.5
            text-[10px]
            font-semibold
            text-[#1463FF]
            transition-transform
            duration-300
            group-hover:translate-x-0.5
          "
        >

          Guidance

          <FaArrowRight
            size={8}
          />

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
        mt-7
        grid
        gap-4
        sm:grid-cols-2
        lg:grid-cols-4
      "
    >

      {[1, 2, 3, 4].map(
        (
          item
        ) => (

          <div
            key={
              item
            }
            className="
              overflow-hidden
              rounded-[22px]
              border
              border-slate-200
              bg-white
              shadow-sm
            "
          >

            <div
              className="
                h-1
                animate-pulse
                bg-slate-200
              "
            />


            <div
              className="
                space-y-4
                p-5
              "
            >

              <div
                className="
                  flex
                  justify-between
                "
              >

                <div
                  className="
                    h-5
                    w-20
                    animate-pulse
                    rounded-full
                    bg-slate-200
                  "
                />


                <div
                  className="
                    h-3
                    w-14
                    animate-pulse
                    rounded-full
                    bg-slate-100
                  "
                />

              </div>


              <div
                className="
                  h-16
                  w-16
                  animate-pulse
                  rounded-2xl
                  bg-slate-200
                "
              />


              <div
                className="
                  h-3
                  w-24
                  animate-pulse
                  rounded-full
                  bg-slate-200
                "
              />


              <div
                className="
                  h-5
                  w-36
                  animate-pulse
                  rounded-full
                  bg-slate-200
                "
              />


              <div
                className="
                  h-14
                  animate-pulse
                  rounded-xl
                  bg-slate-100
                "
              />


              <div
                className="
                  h-5
                  animate-pulse
                  rounded-full
                  bg-slate-100
                "
              />

            </div>

          </div>

        )
      )}

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

    <div
      className="
        mt-7
        flex
        min-h-[190px]
        flex-col
        items-center
        justify-center
        rounded-[22px]
        border
        border-dashed
        border-slate-300
        bg-white
        px-6
        text-center
        shadow-sm
      "
    >

      <div
        className="
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-2xl
          bg-blue-50
          text-[#1463FF]
        "
      >

        <FaUserTie
          size={17}
        />

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

    </div>

  );

}


// ============================================================
// INITIALS
// ============================================================

function getInitials(
  name
) {

  if (!name) {

    return "DL";

  }


  const parts =
    name
      .trim()
      .split(/\s+/)
      .filter(Boolean);


  if (
    parts.length === 1
  ) {

    return parts[0]
      .slice(
        0,
        2
      )
      .toUpperCase();

  }


  return (
    parts[0][0] +
    parts[
      parts.length - 1
    ][0]
  ).toUpperCase();

}


export default Mentors;