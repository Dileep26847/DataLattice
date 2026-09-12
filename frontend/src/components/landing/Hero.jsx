import {
  motion,
} from "framer-motion";

import {
  FaArrowRight,
  FaBookOpen,
  FaGraduationCap,
  FaLaptopCode,
  FaPlay,
  FaUsers,
  FaVideo,
  FaChartLine,
} from "react-icons/fa";

import {
  useNavigate,
} from "react-router-dom";

import heroImage from "../../assets/datalattice-hero-middle.png";

import HeroSignupCard from "./HeroSignupCard";


// ============================================================
// HERO
// ============================================================

function Hero() {

  const navigate =
    useNavigate();


  // ==========================================================
  // WHATSAPP
  // ==========================================================

  const openWhatsApp = () => {

    window.open(
      "https://wa.me/917204376429",
      "_blank",
      "noopener,noreferrer"
    );

  };


  // ==========================================================
  // RENDER
  // ==========================================================

  return (

    <section
      id="home"
      className="
        relative
        min-h-[calc(100vh-78px)]
        overflow-hidden
        bg-[#F4F9FF]
      "
    >

      {/* ======================================================
          DATALATTICE OPTION 2 HERO BACKGROUND

          Visual language:
          - light blue technical atmosphere
          - layered data surfaces
          - subtle geometric depth
          - flowing analytical lines
          - fine data nodes
          - restrained blue / cyan accents
          - no purple
          - foreground content remains clean
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          overflow-hidden
        "
      >

        {/* ==================================================
            BASE TECHNICAL LIGHTING
        ================================================== */}

        <div
          className="
            absolute
            -left-[18%]
            -top-[35%]
            h-[760px]
            w-[760px]
            rounded-full
            bg-blue-100/55
            blur-[110px]
          "
        />


        <div
          className="
            absolute
            right-[-20%]
            top-[-18%]
            h-[720px]
            w-[720px]
            rounded-full
            bg-cyan-50/70
            blur-[120px]
          "
        />


        <div
          className="
            absolute
            bottom-[-35%]
            left-[38%]
            h-[620px]
            w-[620px]
            rounded-full
            bg-blue-100/45
            blur-[120px]
          "
        />


        {/* ==================================================
            LARGE ANGLED DATA SURFACES
        ================================================== */}

        <div
          className="
            absolute
            right-[-8%]
            top-[2%]
            h-[430px]
            w-[58%]
            rotate-[7deg]
            rounded-[80px]
            border
            border-blue-100/55
            bg-gradient-to-br
            from-white/30
            via-blue-50/35
            to-blue-100/25
            opacity-80
          "
        />


        <div
          className="
            absolute
            right-[-14%]
            top-[12%]
            h-[360px]
            w-[52%]
            rotate-[7deg]
            rounded-[70px]
            border
            border-blue-100/40
            bg-white/20
            opacity-70
          "
        />


        <div
          className="
            absolute
            left-[-14%]
            bottom-[8%]
            h-[250px]
            w-[54%]
            -rotate-[5deg]
            rounded-[70px]
            border
            border-blue-100/40
            bg-white/25
            opacity-70
          "
        />


        {/* ==================================================
            FINE TECHNICAL GRID
        ================================================== */}

        <div
          className="
            absolute
            inset-0
            opacity-[0.24]
            [background-image:linear-gradient(rgba(37,99,235,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.055)_1px,transparent_1px)]
            [background-size:56px_56px]
          "
        />


        {/* ==================================================
            LEFT DATA FLOW
        ================================================== */}

        <svg
          className="
            absolute
            left-[-5%]
            top-[4%]
            h-[690px]
            w-[68%]
            opacity-[0.48]
          "
          viewBox="0 0 900 690"
          fill="none"
          preserveAspectRatio="none"
          aria-hidden="true"
        >

          <path
            d="
              M-80 560
              C50 520 105 540 180 455
              C270 350 335 445 420 350
              C505 255 565 325 650 225
              C735 125 810 145 980 35
            "
            stroke="#60A5FA"
            strokeWidth="1.4"
            strokeLinecap="round"
          />


          <path
            d="
              M-80 590
              C55 550 110 570 195 485
              C285 390 345 475 435 380
              C520 290 580 350 670 255
              C755 165 820 180 980 75
            "
            stroke="#BFDBFE"
            strokeWidth="1"
            strokeDasharray="4 9"
            strokeLinecap="round"
          />


          <path
            d="
              M-50 625
              C80 590 125 600 210 525
              C300 445 355 510 450 425
              C540 345 595 390 685 305
              C770 225 835 235 980 130
            "
            stroke="#DBEAFE"
            strokeWidth="1"
            strokeDasharray="2 12"
            strokeLinecap="round"
          />

        </svg>


        {/* ==================================================
            RIGHT DATA FLOW
        ================================================== */}

        <svg
          className="
            absolute
            right-[-7%]
            top-[5%]
            h-[600px]
            w-[62%]
            opacity-[0.52]
          "
          viewBox="0 0 820 600"
          fill="none"
          preserveAspectRatio="none"
          aria-hidden="true"
        >

          <path
            d="
              M-60 510
              C70 470 110 495 185 420
              C260 345 300 395 375 310
              C455 220 515 275 595 190
              C665 115 725 130 875 35
            "
            stroke="#38BDF8"
            strokeWidth="1.4"
            strokeLinecap="round"
          />


          <path
            d="
              M-60 545
              C75 505 115 530 200 455
              C280 385 320 430 395 345
              C480 260 530 310 615 225
              C690 150 735 170 875 90
            "
            stroke="#BFDBFE"
            strokeWidth="1"
            strokeDasharray="5 10"
            strokeLinecap="round"
          />

        </svg>


        {/* ==================================================
            CENTRAL TECHNICAL ARC
        ================================================== */}

        <div
          className="
            absolute
            left-[58%]
            top-[46%]
            h-[470px]
            w-[470px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            border
            border-blue-100/55
          "
        />


        <div
          className="
            absolute
            left-[58%]
            top-[46%]
            h-[560px]
            w-[560px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            border
            border-blue-50/75
          "
        />


        <div
          className="
            absolute
            left-[58%]
            top-[46%]
            h-[650px]
            w-[650px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            border
            border-blue-50/50
          "
        />


        {/* ==================================================
            DATA NODES
        ================================================== */}

        <div
          className="
            absolute
            left-[8%]
            top-[28%]
            h-2
            w-2
            rounded-full
            bg-[#1463FF]/65
            shadow-[0_0_0_7px_rgba(20,99,255,0.08)]
          "
        />


        <div
          className="
            absolute
            left-[19%]
            top-[18%]
            h-1.5
            w-1.5
            rounded-full
            bg-[#06B6D4]/60
            shadow-[0_0_0_6px_rgba(6,182,212,0.08)]
          "
        />


        <div
          className="
            absolute
            left-[31%]
            top-[12%]
            h-2
            w-2
            rounded-full
            bg-[#1463FF]/55
            shadow-[0_0_0_7px_rgba(20,99,255,0.07)]
          "
        />


        <div
          className="
            absolute
            left-[48%]
            top-[21%]
            h-1.5
            w-1.5
            rounded-full
            bg-[#06B6D4]/55
            shadow-[0_0_0_6px_rgba(6,182,212,0.08)]
          "
        />


        <div
          className="
            absolute
            right-[28%]
            top-[16%]
            h-2
            w-2
            rounded-full
            bg-[#1463FF]/55
            shadow-[0_0_0_7px_rgba(20,99,255,0.07)]
          "
        />


        <div
          className="
            absolute
            right-[12%]
            top-[32%]
            h-1.5
            w-1.5
            rounded-full
            bg-[#06B6D4]/55
            shadow-[0_0_0_6px_rgba(6,182,212,0.07)]
          "
        />


        <div
          className="
            absolute
            right-[18%]
            bottom-[19%]
            h-2
            w-2
            rounded-full
            bg-[#1463FF]/45
            shadow-[0_0_0_7px_rgba(20,99,255,0.07)]
          "
        />


        <div
          className="
            absolute
            left-[42%]
            bottom-[18%]
            h-1.5
            w-1.5
            rounded-full
            bg-[#06B6D4]/50
            shadow-[0_0_0_6px_rgba(6,182,212,0.07)]
          "
        />


        {/* ==================================================
            DATA CONNECTIONS
        ================================================== */}

        <svg
          className="
            absolute
            inset-0
            h-full
            w-full
            opacity-[0.22]
          "
          viewBox="0 0 1440 800"
          preserveAspectRatio="none"
          aria-hidden="true"
        >

          <line
            x1="110"
            y1="245"
            x2="315"
            y2="150"
            stroke="#60A5FA"
            strokeWidth="1"
            strokeDasharray="3 8"
          />


          <line
            x1="315"
            y1="150"
            x2="500"
            y2="220"
            stroke="#93C5FD"
            strokeWidth="1"
            strokeDasharray="3 8"
          />


          <line
            x1="500"
            y1="220"
            x2="690"
            y2="135"
            stroke="#BFDBFE"
            strokeWidth="1"
            strokeDasharray="3 8"
          />


          <line
            x1="770"
            y1="170"
            x2="960"
            y2="245"
            stroke="#60A5FA"
            strokeWidth="1"
            strokeDasharray="3 8"
          />


          <line
            x1="960"
            y1="245"
            x2="1150"
            y2="155"
            stroke="#93C5FD"
            strokeWidth="1"
            strokeDasharray="3 8"
          />


          <line
            x1="1150"
            y1="155"
            x2="1360"
            y2="230"
            stroke="#BFDBFE"
            strokeWidth="1"
            strokeDasharray="3 8"
          />

        </svg>


        {/* ==================================================
            SMALL INSIGHT SIGNAL

            DATA FLOW PANEL REMOVED COMPLETELY.
        ================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            x: 8,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            delay: 1,
            duration: 0.6,
          }}
          className="
            absolute
            bottom-[13%]
            right-[5%]
            hidden
            rounded-xl
            border
            border-blue-100/75
            bg-white/65
            px-3
            py-2.5
            shadow-sm
            backdrop-blur-sm
            lg:block
          "
        >

          <div
            className="
              flex
              items-center
              gap-2
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


            <span
              className="
                text-[8px]
                font-bold
                uppercase
                tracking-[0.18em]
                text-slate-400
              "
            >
              Insights
            </span>

          </div>


          <div
            className="
              mt-2
              flex
              items-center
              gap-1.5
            "
          >

            <span
              className="
                h-1.5
                w-1.5
                rounded-full
                bg-blue-200
              "
            />


            <span
              className="
                h-1.5
                w-1.5
                rounded-full
                bg-blue-300
              "
            />


            <span
              className="
                h-1.5
                w-1.5
                rounded-full
                bg-blue-400
              "
            />


            <span
              className="
                h-1.5
                w-1.5
                rounded-full
                bg-[#1463FF]
              "
            />

          </div>

        </motion.div>


        {/* ==================================================
            TEXT PROTECTION LAYER
        ================================================== */}

        <div
          className="
            absolute
            left-0
            top-0
            h-full
            w-[52%]
            bg-white/22
            backdrop-blur-[0.5px]
          "
        />


        {/* ==================================================
            SOFT EDGE DEPTH
        ================================================== */}

        <div
          className="
            absolute
            inset-0
            bg-[radial-gradient(circle_at_58%_45%,transparent_42%,rgba(244,249,255,0.32)_82%,rgba(238,246,255,0.70)_100%)]
          "
        />


        {/* ==================================================
            TOP / BOTTOM BOUNDARIES
        ================================================== */}

        <div
          className="
            absolute
            inset-x-0
            top-0
            h-px
            bg-blue-100/70
          "
        />


        <div
          className="
            absolute
            inset-x-0
            bottom-0
            h-px
            bg-blue-100/60
          "
        />

      </div>


      {/* ======================================================
          MAIN CONTENT

          LEFT TEXT AND SIGNUP CARD NOW SHARE THE SAME
          TOP ALIGNMENT.

          CENTER VISUAL REMAINS VERTICALLY CENTERED.
      ====================================================== */}

      <div
        className="
          relative
          z-10
          w-full
          px-5
          pb-8
          pt-[94px]
          sm:px-7
          sm:pb-10
          sm:pt-[98px]
          lg:px-8
          lg:pb-12
          lg:pt-[102px]
        "
      >

        <div
          className="
            grid
            items-start
            gap-10
            lg:grid-cols-[minmax(0,1.08fr)_minmax(280px,0.72fr)_390px]
            lg:gap-2
            xl:grid-cols-[minmax(0,1.12fr)_minmax(310px,0.78fr)_400px]
            xl:gap-4
          "
        >

          {/* ==================================================
              LEFT HERO CONTENT

              TOP ALIGNED WITH SIGNUP CARD.
          ================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              x: -30,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              min-w-0
              lg:pr-2
              xl:pr-3
            "
          >

            {/* =================================================
                MAIN HEADING
            ================================================= */}

            <motion.h1
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.12,
                duration: 0.65,
              }}
              className="
                max-w-none
                text-[34px]
                font-bold
                leading-[1.08]
                tracking-[-0.035em]
                text-[#0B1B3A]
                sm:text-[40px]
                md:text-[44px]
                lg:text-[40px]
                xl:text-[45px]
              "
            >

              <span
                className="
                  block
                  whitespace-nowrap
                "
              >

                <span>
                  Get Job-Ready with{" "}
                </span>


                <span
                  className="
                    text-[#1463FF]
                  "
                >
                
                </span>

              </span>


              <span
                className="
                  mt-1
                  block
                  whitespace-nowrap
                "
              >

                <span>
                  Real World - {" "}
                </span>


                <span
                  className="
                    text-[#1463FF]
                  "
                >
                  Data Skills
                </span>

              </span>

            </motion.h1>


            {/* =================================================
                DESCRIPTION
            ================================================= */}

            <motion.p
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.22,
                duration: 0.5,
              }}
              className="
                mt-6
                max-w-[590px]
                text-base
                font-normal
                leading-7
                text-slate-600
                sm:text-lg
                sm:leading-8
              "
            >

              Learn Data Science and Data Analytics from industry
              experts, work on real projects, attend live classes,
              and build a career you’re proud of — only at DataLattice.

            </motion.p>


            {/* =================================================
                BENEFITS
            ================================================= */}

            <div
              className="
                mt-7
                grid
                grid-cols-1
                gap-3
                sm:grid-cols-3
              "
            >

              <HeroBenefit
                icon={<FaBookOpen />}
                title="Industry-Relevant Curriculum"
                description="Learn skills companies use."
                delay={0.3}
              />


              <HeroBenefit
                icon={<FaUsers />}
                title="Expert Mentors"
                description="Learn from experienced professionals."
                delay={0.38}
              />


              <HeroBenefit
                icon={<FaChartLine />}
                title="Real Projects & Certification"
                description="Build practical career skills."
                delay={0.46}
              />

            </div>


            {/* =================================================
                CTA
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
                delay: 0.5,
                duration: 0.5,
              }}
              className="
                mt-7
                flex
                flex-col
                gap-3
                sm:flex-row
              "
            >

              <motion.button
                type="button"
                whileHover={{
                  y: -2,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                onClick={() =>
                  navigate("/courses")
                }
                className="
                  group
                  inline-flex
                  items-center
                  justify-center
                  gap-3
                  rounded-full
                  bg-[#1463FF]
                  px-7
                  py-4
                  text-sm
                  font-bold
                  text-white
                  shadow-[0_15px_35px_rgba(20,99,255,0.22)]
                  transition-all
                  duration-300
                  hover:bg-[#0B1B3A]
                  hover:shadow-[0_20px_42px_rgba(11,27,58,0.22)]
                  sm:text-base
                "
              >

                Explore Programs


                <FaArrowRight
                  className="
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                />

              </motion.button>


              <motion.button
                type="button"
                whileHover={{
                  y: -2,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                onClick={() =>
                  navigate("/courses")
                }
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-3
                  rounded-full
                  border
                  border-[#1463FF]/25
                  bg-white/80
                  px-7
                  py-4
                  text-sm
                  font-semibold
                  text-[#0B1B3A]
                  shadow-sm
                  backdrop-blur
                  transition-all
                  duration-300
                  hover:border-[#1463FF]/45
                  hover:bg-white
                  hover:shadow-lg
                  sm:text-base
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
                    bg-blue-50
                    text-[#1463FF]
                  "
                >

                  <FaPlay
                    size={10}
                  />

                </span>


                Free Demo

              </motion.button>

            </motion.div>


            {/* =================================================
                TRUST
            ================================================= */}

            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                delay: 0.65,
                duration: 0.5,
              }}
              className="
                mt-7
                flex
                items-center
                gap-5
              "
            >

              <div
                className="
                  flex
                  items-center
                "
              >

                <div className="flex -space-x-2">

                  <TrustAvatar
                    name="Learner 1"
                    seed="learner-one"
                  />


                  <TrustAvatar
                    name="Learner 2"
                    seed="learner-two"
                  />


                  <TrustAvatar
                    name="Learner 3"
                    seed="learner-three"
                  />

                </div>


                <div
                  className="
                    ml-2
                    flex
                    h-10
                    items-center
                    rounded-full
                    bg-blue-50
                    px-3
                    text-sm
                    font-bold
                    text-[#1463FF]
                  "
                >
                  +150
                </div>

              </div>


              <div
                className="
                  hidden
                  h-10
                  w-px
                  bg-slate-200
                  sm:block
                "
              />


              <div>

                <div
                  className="
                    flex
                    items-center
                    gap-1
                    text-amber-400
                  "
                >

                  ★
                  ★
                  ★
                  ★
                  ★


                  <span
                    className="
                      ml-1
                      text-sm
                      font-bold
                      text-slate-700
                    "
                  >
                    4.8/5
                  </span>

                </div>


                <p
                  className="
                    mt-1
                    text-xs
                    font-normal
                    text-slate-500
                  "
                >
                  Trusted by 150+ learners
                </p>

              </div>

            </motion.div>

          </motion.div>


          {/* ==================================================
              CENTER HERO VISUAL

              Remains vertically centered independently.
          ================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.94,
              x: 15,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              x: 0,
            }}
            transition={{
              delay: 0.2,
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              relative
              hidden
              min-h-[540px]
              items-center
              justify-center
              lg:flex
            "
          >

            {/* Main soft visual atmosphere */}

            <div
              className="
                absolute
                left-1/2
                top-1/2
                h-[390px]
                w-[390px]
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                bg-blue-100/45
                blur-3xl
              "
            />


            {/* Circular visual frame */}

            <div
              className="
                absolute
                left-1/2
                top-1/2
                h-[410px]
                w-[410px]
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                border
                border-blue-100/75
                bg-white/55
                shadow-[0_25px_80px_rgba(15,23,42,0.06)]
                backdrop-blur-sm
              "
            />


            {/* Secondary circular frame */}

            <div
              className="
                absolute
                left-1/2
                top-1/2
                h-[475px]
                w-[475px]
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                border
                border-blue-50/80
              "
            />


            {/* =================================================
                REAL DATALATTICE HERO IMAGE
            ================================================= */}

            <motion.div
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                relative
                z-10
                w-[330px]
                overflow-hidden
                rounded-[28px]
                border
                border-white
                bg-white
                p-3
                shadow-[0_35px_80px_rgba(15,23,42,0.12)]
                xl:w-[365px]
              "
            >

              <img
                src={heroImage}
                alt="DataLattice learning platform"
                className="
                  block
                  h-auto
                  w-full
                  rounded-[20px]
                  object-cover
                "
              />

            </motion.div>


            {/* =================================================
                LIVE CLASSES
            ================================================= */}

            <motion.div
              initial={{
                opacity: 0,
                x: -20,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                delay: 0.75,
                duration: 0.5,
              }}
              className="
                absolute
                left-0
                top-[105px]
                z-20
                flex
                items-center
                gap-3
                rounded-2xl
                border
                border-slate-200
                bg-white
                px-3
                py-3
                shadow-[0_18px_40px_rgba(15,23,42,0.10)]
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
                  bg-blue-50
                  text-[#1463FF]
                "
              >

                <FaVideo
                  size={15}
                />

              </div>


              <div>

                <p
                  className="
                    text-xs
                    font-bold
                    text-slate-900
                  "
                >
                  Live Classes
                </p>


                <p
                  className="
                    mt-0.5
                    text-[10px]
                    font-normal
                    text-slate-500
                  "
                >
                  with Mentors
                </p>

              </div>

            </motion.div>


            {/* =================================================
                HANDS-ON PROJECTS
            ================================================= */}

            <motion.div
              initial={{
                opacity: 0,
                x: -20,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                delay: 0.9,
                duration: 0.5,
              }}
              className="
                absolute
                bottom-[125px]
                left-[-10px]
                z-20
                flex
                items-center
                gap-3
                rounded-2xl
                border
                border-slate-200
                bg-white
                px-3
                py-3
                shadow-[0_18px_40px_rgba(15,23,42,0.10)]
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
                  bg-blue-50
                  text-[#1463FF]
                "
              >

                <FaLaptopCode
                  size={15}
                />

              </div>


              <div>

                <p
                  className="
                    text-xs
                    font-bold
                    text-slate-900
                  "
                >
                  Hands-on
                </p>


                <p
                  className="
                    mt-0.5
                    text-[10px]
                    font-normal
                    text-slate-500
                  "
                >
                  Projects
                </p>

              </div>

            </motion.div>


            {/* =================================================
                CAREER SUPPORT
            ================================================= */}

            <motion.div
              initial={{
                opacity: 0,
                x: 20,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                delay: 1,
                duration: 0.5,
              }}
              className="
                absolute
                bottom-[65px]
                right-[-5px]
                z-20
                flex
                items-center
                gap-3
                rounded-2xl
                border
                border-slate-200
                bg-white
                px-3
                py-3
                shadow-[0_18px_40px_rgba(15,23,42,0.10)]
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
                  bg-blue-50
                  text-[#1463FF]
                "
              >

                <FaUsers
                  size={15}
                />

              </div>


              <div>

                <p
                  className="
                    text-xs
                    font-bold
                    text-slate-900
                  "
                >
                  Career
                </p>


                <p
                  className="
                    mt-0.5
                    text-[10px]
                    font-normal
                    text-slate-500
                  "
                >
                  Support
                </p>

              </div>

            </motion.div>


            {/* =================================================
                CENTER CAPTION
            ================================================= */}

            <div
              className="
                absolute
                bottom-[5px]
                left-1/2
                z-20
                -translate-x-1/2
                whitespace-nowrap
                text-sm
                font-semibold
                italic
                text-[#1463FF]
              "
            >
              Your Future Starts Here
            </div>

          </motion.div>


          {/* ==================================================
              SIGNUP PANEL

              TOP ALIGNED WITH HERO HEADING.
          ================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              x: 30,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              delay: 0.15,
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              relative
              mx-auto
              flex
              w-full
              max-w-[400px]
              items-start
              justify-center
              lg:ml-auto
            "
          >

            {/* Card atmosphere */}

            <div
              className="
                pointer-events-none
                absolute
                -inset-4
                rounded-[36px]
                bg-blue-100/30
                blur-2xl
              "
            />


            {/* Actual signup component */}

            <HeroSignupCard />

          </motion.div>

        </div>


        {/* ======================================================
            PROGRAM STRIP

            Final Hero content strip.
            No duplicate statistics.
        ====================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.8,
            duration: 0.55,
          }}
          className="
            mt-8
            grid
            grid-cols-1
            gap-3
            sm:grid-cols-2
            lg:grid-cols-4
          "
        >

          <ProgramCard
            icon={<FaBookOpen />}
            title="Data Science & Analytics"
            subtitle="Decode data. Drive impact."
          />


          <ProgramCard
            icon={<FaLaptopCode />}
            title="SQL & Python"
            subtitle="Build practical data skills."
          />


          <ProgramCard
            icon={<FaChartLine />}
            title="Power BI & Analytics"
            subtitle="Turn data into insights."
          />


          <ProgramCard
            icon={<FaGraduationCap />}
            title="Career Preparation"
            subtitle="Projects, mentorship & job readiness."
          />

        </motion.div>

      </div>


      {/* ======================================================
          WHATSAPP FLOATING BUTTON
      ====================================================== */}

      <motion.button
        initial={{
          opacity: 0,
          scale: 0.85,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          delay: 1.1,
          duration: 0.45,
        }}
        whileHover={{
          y: -3,
          scale: 1.03,
        }}
        whileTap={{
          scale: 0.97,
        }}
        onClick={openWhatsApp}
        className="
          fixed
          bottom-5
          right-5
          z-50
          flex
          items-center
          gap-2.5
          rounded-full
          bg-[#25D366]
          px-5
          py-3.5
          text-sm
          font-bold
          text-white
          shadow-[0_15px_35px_rgba(37,211,102,0.28)]
          transition-all
          duration-300
          hover:shadow-[0_18px_42px_rgba(37,211,102,0.35)]
          sm:bottom-6
          sm:right-6
        "
        aria-label="Chat with us on WhatsApp"
      >

        <span
          className="
            flex
            h-7
            w-7
            items-center
            justify-center
            rounded-full
            border
            border-white/30
            bg-white/10
            text-lg
          "
        >
          ◔
        </span>


        <span>
          Chat with us
        </span>

      </motion.button>

    </section>

  );

}


// ============================================================
// HERO BENEFIT
// ============================================================

function HeroBenefit({
  icon,
  title,
  description,
  delay = 0,
}) {

  return (

    <motion.div
      initial={{
        opacity: 0,
        y: 12,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        delay,
        duration: 0.45,
      }}
      whileHover={{
        y: -3,
      }}
      className="
        rounded-2xl
        border
        border-slate-200
        bg-white/90
        p-3
        shadow-sm
        backdrop-blur
        transition-shadow
        hover:shadow-md
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
          {icon}
        </div>


        <div
          className="
            min-w-0
          "
        >

          <p
            className="
              text-[11px]
              font-bold
              leading-4
              text-slate-900
            "
          >
            {title}
          </p>


          <p
            className="
              mt-1
              text-[9px]
              font-normal
              leading-4
              text-slate-500
            "
          >
            {description}
          </p>

        </div>

      </div>

    </motion.div>

  );

}


// ============================================================
// TRUST AVATAR
// ============================================================

function TrustAvatar({
  name,
  seed,
}) {

  return (

    <img
      src={`https://api.dicebear.com/9.x/personas/svg?seed=${seed}`}
      alt={name}
      className="
        h-10
        w-10
        rounded-full
        border-2
        border-white
        bg-slate-100
      "
    />

  );

}


// ============================================================
// PROGRAM CARD
// ============================================================

function ProgramCard({
  icon,
  title,
  subtitle,
}) {

  return (

    <motion.div
      whileHover={{
        y: -3,
      }}
      className="
        flex
        min-w-0
        items-center
        gap-3
        rounded-2xl
        border
        border-blue-100
        bg-white
        p-4
        shadow-sm
        transition-all
        duration-300
        hover:shadow-md
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
          bg-blue-50
          text-[#1463FF]
        "
      >
        {icon}
      </div>


      <div
        className="
          min-w-0
          flex-1
        "
      >

        <p
          className="
            text-sm
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
            text-[11px]
            font-normal
            text-slate-500
          "
        >
          {subtitle}
        </p>

      </div>


      <div
        className="
          flex
          h-8
          w-8
          shrink-0
          items-center
          justify-center
          rounded-full
          bg-blue-50
          text-[#1463FF]
        "
      >

        <FaArrowRight
          size={11}
        />

      </div>

    </motion.div>

  );

}


export default Hero;