import { motion } from "framer-motion";
import {
  FaArrowRight,
  FaBookOpen,
  FaCheck,
  FaCode,
  FaGraduationCap,
  FaLaptopCode,
  FaPlay,
  FaUsers,
} from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();

  return (
    <section
      id="home"
      className="
        relative
        overflow-hidden
        bg-[#f8faff]
        pt-24
        sm:pt-28
        lg:pt-32
      "
    >
      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        {/* Grid */}

        <div
          className="
            absolute
            inset-0
            opacity-[0.035]
          "
          style={{
            backgroundImage:
              "linear-gradient(#4f46e5 1px, transparent 1px), linear-gradient(90deg, #4f46e5 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Glow 1 */}

        <motion.div
          animate={{
            x: [0, 40, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            -top-40
            -left-40
            h-[500px]
            w-[500px]
            rounded-full
            bg-indigo-300/20
            blur-3xl
          "
        />

        {/* Glow 2 */}

        <motion.div
          animate={{
            x: [0, -30, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            right-[-180px]
            top-[180px]
            h-[500px]
            w-[500px]
            rounded-full
            bg-purple-300/20
            blur-3xl
          "
        />

      </div>

      {/* =====================================================
          CONTENT
      ====================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-7xl
          px-6
          pb-20
          sm:px-8
          lg:px-10
          lg:pb-28
        "
      >

        <div
          className="
            grid
            items-center
            gap-16
            lg:grid-cols-[1.02fr_0.98fr]
            lg:gap-10
          "
        >

          {/* =================================================
              LEFT CONTENT
          ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              x: -50,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
            }}
          >

            {/* Eyebrow */}

            <motion.div
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.15,
                duration: 0.6,
              }}
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-indigo-100
                bg-white/80
                px-4
                py-2
                text-sm
                font-semibold
                text-indigo-600
                shadow-sm
                backdrop-blur
              "
            >
              <span
                className="
                  flex
                  h-2
                  w-2
                  rounded-full
                  bg-indigo-500
                "
              />

              India's modern learning platform

            </motion.div>


            {/* Heading */}

            <h1
              className="
                mt-7
                max-w-3xl
                text-5xl
                font-black
                leading-[0.98]
                tracking-[-0.045em]
                text-slate-950
                sm:text-6xl
                lg:text-[76px]
              "
            >

              Learn Skills.

              <br />

              <span
                className="
                  bg-gradient-to-r
                  from-indigo-600
                  via-violet-600
                  to-fuchsia-600
                  bg-clip-text
                  text-transparent
                "
              >
                Build Projects.
              </span>

              <br />

              Build Your Career.

            </h1>


            {/* Description */}

            <p
              className="
                mt-7
                max-w-2xl
                text-base
                leading-8
                text-slate-600
                sm:text-lg
              "
            >
              Master AI, Full Stack Development, Data Science,
              UI/UX, Cloud and DevOps through expert-led classes,
              real-world projects, live mentorship and
              career-focused learning.
            </p>


            {/* CTA */}

            <div
              className="
                mt-9
                flex
                flex-col
                gap-3
                sm:flex-row
              "
            >

              <motion.button
                whileHover={{
                  scale: 1.03,
                  y: -2,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                onClick={() => navigate("/courses")}
                className="
                  group
                  inline-flex
                  items-center
                  justify-center
                  gap-3
                  rounded-2xl
                  bg-gradient-to-r
                  from-indigo-600
                  to-violet-600
                  px-7
                  py-4
                  text-base
                  font-bold
                  text-white
                  shadow-[0_18px_40px_rgba(79,70,229,0.25)]
                  transition
                  hover:shadow-[0_22px_50px_rgba(79,70,229,0.35)]
                "
              >

                Start Learning

                <FaArrowRight
                  className="
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                />

              </motion.button>


              <motion.button
                whileHover={{
                  scale: 1.03,
                  y: -2,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                onClick={() => navigate("/courses")}
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-3
                  rounded-2xl
                  border
                  border-slate-200
                  bg-white
                  px-7
                  py-4
                  text-base
                  font-bold
                  text-slate-800
                  shadow-sm
                  transition
                  hover:border-indigo-200
                  hover:shadow-lg
                "
              >

                <span
                  className="
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-full
                    bg-indigo-50
                    text-indigo-600
                  "
                >
                  <FaPlay size={11} />
                </span>

                Explore Courses

              </motion.button>

            </div>


            {/* Trust points */}

            <div
              className="
                mt-9
                flex
                flex-wrap
                gap-x-6
                gap-y-3
              "
            >

              {[
                "Live Classes",
                "Real Projects",
                "Industry Mentors",
                "Certificates",
              ].map((item) => (

                <div
                  key={item}
                  className="
                    flex
                    items-center
                    gap-2
                    text-sm
                    font-medium
                    text-slate-600
                  "
                >

                  <span
                    className="
                      flex
                      h-5
                      w-5
                      items-center
                      justify-center
                      rounded-full
                      bg-emerald-50
                      text-emerald-600
                    "
                  >
                    <FaCheck size={9} />
                  </span>

                  {item}

                </div>

              ))}

            </div>

          </motion.div>


          {/* =================================================
              RIGHT PRODUCT PREVIEW
          ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              x: 50,
              scale: 0.96,
            }}
            animate={{
              opacity: 1,
              x: 0,
              scale: 1,
            }}
            transition={{
              duration: 0.9,
              delay: 0.15,
              ease: "easeOut",
            }}
            className="
              relative
              mx-auto
              w-full
              max-w-[590px]
            "
          >

            {/* Ambient glow */}

            <div
              className="
                absolute
                inset-x-12
                top-12
                h-[420px]
                rounded-full
                bg-indigo-500/20
                blur-3xl
              "
            />


            {/* Main Product Card */}

            <motion.div
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                relative
                rounded-[30px]
                border
                border-white
                bg-white/90
                p-3
                shadow-[0_35px_90px_rgba(15,23,42,0.16)]
                backdrop-blur-xl
              "
            >

              <div
                className="
                  overflow-hidden
                  rounded-[24px]
                  border
                  border-slate-100
                  bg-[#f8faff]
                "
              >

                {/* Window header */}

                <div
                  className="
                    flex
                    items-center
                    justify-between
                    border-b
                    border-slate-100
                    bg-white
                    px-5
                    py-4
                  "
                >

                  <div className="flex items-center gap-2">

                    <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                    <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                    <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />

                  </div>

                  <div
                    className="
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-[0.2em]
                      text-indigo-500
                    "
                  >
                    Data Lattice LMS
                  </div>

                  <div className="w-10" />

                </div>


                {/* Dashboard preview */}

                <div className="p-5 sm:p-7">

                  <div className="flex items-center justify-between">

                    <div>

                      <p
                        className="
                          text-[11px]
                          font-bold
                          uppercase
                          tracking-widest
                          text-slate-400
                        "
                      >
                        Learning Hub
                      </p>

                      <h3
                        className="
                          mt-1
                          text-xl
                          font-black
                          text-slate-900
                        "
                      >
                        Everything you need to grow.
                      </h3>

                    </div>

                    <div
                      className="
                        flex
                        h-12
                        w-12
                        items-center
                        justify-center
                        rounded-2xl
                        bg-gradient-to-br
                        from-indigo-500
                        to-violet-600
                        text-white
                        shadow-lg
                        shadow-indigo-200
                      "
                    >
                      <FaGraduationCap size={21} />
                    </div>

                  </div>


                  {/* Feature stats */}

                  <div
                    className="
                      mt-6
                      grid
                      grid-cols-3
                      gap-3
                    "
                  >

                    <PreviewStat
                      icon={<FaBookOpen />}
                      value="50+"
                      label="Courses"
                    />

                    <PreviewStat
                      icon={<FaLaptopCode />}
                      value="100+"
                      label="Projects"
                    />

                    <PreviewStat
                      icon={<FaUsers />}
                      value="10K+"
                      label="Learners"
                    />

                  </div>


                  {/* Learning paths */}

                  <div className="mt-5">

                    <div className="mb-3 flex items-center justify-between">

                      <h4
                        className="
                          text-sm
                          font-bold
                          text-slate-900
                        "
                      >
                        Popular Learning Paths
                      </h4>

                      <span
                        className="
                          text-xs
                          font-semibold
                          text-indigo-600
                        "
                      >
                        Explore all
                      </span>

                    </div>


                    <div className="space-y-3">

                      <PreviewCourse
                        icon={<FaCode />}
                        title="Full Stack Development"
                        subtitle="Build production-ready applications"
                        progress="Career focused"
                      />

                      <PreviewCourse
                        icon={<FaLaptopCode />}
                        title="AI & Machine Learning"
                        subtitle="Build intelligent real-world projects"
                        progress="Project based"
                      />

                      <PreviewCourse
                        icon={<FaGraduationCap />}
                        title="Data Science"
                        subtitle="Learn analytics from fundamentals"
                        progress="Mentor led"
                      />

                    </div>

                  </div>

                </div>

              </div>

            </motion.div>


            {/* =================================================
                FLOATING LEARNERS CARD
            ================================================= */}

            <motion.div
              animate={{
                y: [0, -12, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                absolute
                -left-5
                top-24
                hidden
                rounded-2xl
                border
                border-white
                bg-white
                p-4
                shadow-[0_20px_45px_rgba(15,23,42,0.14)]
                sm:block
              "
            >

              <div className="flex items-center gap-3">

                <div
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-xl
                    bg-indigo-50
                    text-indigo-600
                  "
                >
                  <FaUsers size={16} />
                </div>

                <div>

                  <p
                    className="
                      text-lg
                      font-black
                      text-slate-900
                    "
                  >
                    10K+
                  </p>

                  <p
                    className="
                      text-[11px]
                      font-medium
                      text-slate-500
                    "
                  >
                    Active learners
                  </p>

                </div>

              </div>

            </motion.div>


            {/* =================================================
                FLOATING CAREER CARD
            ================================================= */}

            <motion.div
              animate={{
                y: [0, 10, 0],
              }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                absolute
                -right-4
                bottom-20
                hidden
                rounded-2xl
                border
                border-white
                bg-white
                p-4
                shadow-[0_20px_45px_rgba(15,23,42,0.14)]
                sm:block
              "
            >

              <div className="flex items-center gap-3">

                <div
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-xl
                    bg-emerald-50
                    text-emerald-600
                  "
                >
                  <FaArrowRight size={15} />
                </div>

                <div>

                  <p
                    className="
                      text-sm
                      font-black
                      text-slate-900
                    "
                  >
                    Career Ready
                  </p>

                  <p
                    className="
                      text-[11px]
                      font-medium
                      text-slate-500
                    "
                  >
                    Learn → Build → Grow
                  </p>

                </div>

              </div>

            </motion.div>


            {/* =================================================
                LIVE CLASS FLOATING CARD
            ================================================= */}

            <motion.div
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 1,
                duration: 0.7,
              }}
              className="
                absolute
                bottom-2
                left-1/2
                hidden
                -translate-x-1/2
                items-center
                gap-3
                rounded-2xl
                bg-slate-950
                px-4
                py-3
                text-white
                shadow-2xl
                sm:flex
              "
            >

              <span
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-xl
                  bg-white/10
                "
              >
                <span
                  className="
                    h-2
                    w-2
                    rounded-full
                    bg-emerald-400
                  "
                />
              </span>

              <div>

                <p
                  className="
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-wider
                    text-slate-400
                  "
                >
                  Live learning
                </p>

                <p
                  className="
                    text-xs
                    font-semibold
                  "
                >
                  Learn with mentors in real time
                </p>

              </div>

            </motion.div>

          </motion.div>

        </div>

      </div>

    </section>
  );
}


/* ============================================================
   PREVIEW STAT
============================================================ */

function PreviewStat({
  icon,
  value,
  label,
}) {
  return (
    <motion.div
      whileHover={{
        y: -3,
      }}
      className="
        rounded-2xl
        border
        border-slate-100
        bg-white
        p-3
        shadow-sm
      "
    >

      <div
        className="
          flex
          h-8
          w-8
          items-center
          justify-center
          rounded-lg
          bg-indigo-50
          text-indigo-600
        "
      >
        {icon}
      </div>

      <p
        className="
          mt-2
          text-lg
          font-black
          text-slate-900
        "
      >
        {value}
      </p>

      <p
        className="
          text-[10px]
          font-medium
          text-slate-400
        "
      >
        {label}
      </p>

    </motion.div>
  );
}


/* ============================================================
   PREVIEW COURSE
============================================================ */

function PreviewCourse({
  icon,
  title,
  subtitle,
  progress,
}) {
  return (
    <motion.div
      whileHover={{
        x: 4,
      }}
      className="
        flex
        items-center
        gap-3
        rounded-2xl
        border
        border-slate-100
        bg-white
        p-3
        shadow-sm
      "
    >

      <div
        className="
          flex
          h-11
          w-11
          shrink-0
          items-center
          justify-center
          rounded-xl
          bg-indigo-50
          text-indigo-600
        "
      >
        {icon}
      </div>

      <div className="min-w-0 flex-1">

        <p
          className="
            truncate
            text-xs
            font-bold
            text-slate-900
          "
        >
          {title}
        </p>

        <p
          className="
            mt-0.5
            truncate
            text-[10px]
            text-slate-400
          "
        >
          {subtitle}
        </p>

      </div>

      <span
        className="
          hidden
          rounded-full
          bg-emerald-50
          px-2.5
          py-1
          text-[9px]
          font-bold
          text-emerald-600
          sm:block
        "
      >
        {progress}
      </span>

    </motion.div>
  );
}

export default Hero;