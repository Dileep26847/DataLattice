import heroImage from "../../assets/hero.png";

import { FaStar } from "react-icons/fa";

import { motion } from "framer-motion";

import HeroSignupCard from "../HeroSignupCard";


// ============================================================
// DATA VISUAL BACKGROUND
// ============================================================

function DataVisualBackground() {

  const nodes = [
    { left: "8%", top: "20%", size: 5 },
    { left: "17%", top: "72%", size: 4 },
    { left: "29%", top: "14%", size: 4 },
    { left: "42%", top: "78%", size: 5 },
    { left: "57%", top: "18%", size: 4 },
    { left: "70%", top: "72%", size: 5 },
    { left: "82%", top: "27%", size: 4 },
    { left: "91%", top: "65%", size: 5 },
  ];


  return (

    <div
      aria-hidden="true"
      className="
        pointer-events-none
        absolute
        inset-0
        overflow-hidden
      "
    >

      {/* =====================================================
          VERY LIGHT DATA GRID
      ====================================================== */}

      <div
        className="
          absolute
          inset-0
          opacity-[0.22]
          [background-image:linear-gradient(to_right,rgba(148,163,184,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.10)_1px,transparent_1px)]
          [background-size:72px_72px]
          [mask-image:linear-gradient(to_bottom,black,transparent_85%)]
        "
      />


      {/* =====================================================
          DATA CONNECTIONS
      ====================================================== */}

      <svg
        className="
          absolute
          inset-0
          h-full
          w-full
          opacity-[0.34]
        "
        viewBox="0 0 1440 760"
        preserveAspectRatio="none"
      >

        <path
          d="M70 170 C190 105 255 245 365 175 S565 105 675 195 S875 290 985 180 S1195 100 1370 170"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="text-blue-300"
        />

        <path
          d="M40 575 C170 505 245 625 365 545 S560 470 690 565 S890 650 1015 535 S1220 480 1400 555"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="text-slate-300"
        />

        <path
          d="M180 40 L180 690"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="3 9"
          className="text-slate-300"
        />

        <path
          d="M1080 50 L1080 700"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="3 9"
          className="text-blue-200"
        />

      </svg>


      {/* =====================================================
          DATA NODES
      ====================================================== */}

      {nodes.map((node, index) => (

        <motion.span
          key={index}
          className="
            absolute
            rounded-full
            bg-blue-400
            ring-4
            ring-blue-100/60
          "
          style={{
            left: node.left,
            top: node.top,
            width: node.size,
            height: node.size,
          }}
          animate={{
            opacity: [0.35, 0.75, 0.35],
            scale: [1, 1.18, 1],
          }}
          transition={{
            duration: 3.5 + index * 0.25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.2,
          }}
        />

      ))}


      {/* =====================================================
          ANALYTICS SIGNAL
      ====================================================== */}

      <motion.div
        className="
          absolute
          right-[7%]
          top-[15%]
          hidden
          h-20
          w-36
          rounded-xl
          border
          border-slate-200/70
          bg-white/45
          p-3
          backdrop-blur-[2px]
          lg:block
        "
        initial={{
          opacity: 0,
          y: 8,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.8,
          delay: 0.7,
        }}
      >

        <div
          className="
            flex
            items-end
            gap-1.5
          "
        >

          <span className="h-5 w-1.5 rounded-full bg-blue-200" />
          <span className="h-8 w-1.5 rounded-full bg-blue-300" />
          <span className="h-6 w-1.5 rounded-full bg-blue-200" />
          <span className="h-11 w-1.5 rounded-full bg-blue-400" />
          <span className="h-9 w-1.5 rounded-full bg-blue-300" />
          <span className="h-14 w-1.5 rounded-full bg-blue-500/70" />

        </div>


        <div
          className="
            mt-2
            flex
            items-center
            justify-between
            text-[7px]
            font-semibold
            uppercase
            tracking-[0.18em]
            text-slate-400
          "
        >

          <span>DATA</span>

          <span>+24.8%</span>

        </div>

      </motion.div>


      {/* =====================================================
          MODEL SIGNAL
      ====================================================== */}

      <motion.div
        className="
          absolute
          bottom-[13%]
          left-[6%]
          hidden
          items-center
          gap-2
          rounded-full
          border
          border-slate-200/70
          bg-white/55
          px-3
          py-2
          text-[8px]
          font-semibold
          uppercase
          tracking-[0.16em]
          text-slate-400
          backdrop-blur-[2px]
          lg:flex
        "
        initial={{
          opacity: 0,
          x: -8,
        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        transition={{
          duration: 0.8,
          delay: 1,
        }}
      >

        <span
          className="
            h-1.5
            w-1.5
            rounded-full
            bg-blue-400
          "
        />

        MODEL • INSIGHT • ACTION

      </motion.div>

    </div>

  );

}


// ============================================================
// HERO
// ============================================================

function Hero() {

  return (

    <section
      className="
        relative
        min-h-[90vh]
        overflow-hidden
        bg-gradient-to-b
        from-white
        via-slate-50
        to-slate-50
      "
    >

      {/* =====================================================
          DATA VISUAL LAYER
      ====================================================== */}

      <DataVisualBackground />


      {/* =====================================================
          HERO CONTENT
      ====================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          grid
          max-w-7xl
          items-center
          gap-14
          px-6
          py-16
          lg:grid-cols-2
          lg:gap-16
          lg:px-8
          lg:py-20
        "
      >

        {/* ===================================================
            LEFT CONTENT
        ==================================================== */}

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

          <span
            className="
              inline-flex
              items-center
              rounded-full
              border
              border-blue-100
              bg-white/80
              px-5
              py-2
              text-sm
              font-semibold
              text-blue-700
              shadow-sm
              backdrop-blur-sm
            "
          >

            🚀 Learn from Industry Experts

          </span>


          <h1
            className="
              mt-7
              text-5xl
              font-extrabold
              leading-[1.05]
              tracking-[-0.045em]
              text-slate-950
              sm:text-6xl
              lg:text-7xl
            "
          >

            Learn{" "}

            <span
              className="
                text-blue-600
              "
            >

              Without

            </span>

            <br />

            Limits.

          </h1>


          <p
            className="
              mt-7
              max-w-xl
              text-lg
              leading-8
              text-slate-600
              sm:text-xl
            "
          >

            Build real-world skills with industry experts.

            Learn AI, Web Development,

            UI/UX, DevOps, Data Science,

            Cloud Computing and much more.

          </p>


          {/* =================================================
              RATING
          ================================================== */}

          <div
            className="
              mt-7
              flex
              flex-wrap
              items-center
              gap-2
            "
          >

            <div
              className="
                flex
                items-center
                gap-1
              "
            >

              <FaStar className="text-yellow-400" />
              <FaStar className="text-yellow-400" />
              <FaStar className="text-yellow-400" />
              <FaStar className="text-yellow-400" />
              <FaStar className="text-yellow-400" />

            </div>


            <span
              className="
                text-sm
                font-medium
                text-slate-600
              "
            >

              4.9 Rating (12,000+ Reviews)

            </span>

          </div>


          {/* =================================================
              ACTIONS
          ================================================== */}

          <div
            className="
              mt-9
              flex
              flex-wrap
              gap-4
            "
          >

            <button
              type="button"
              className="
                rounded-2xl
                bg-blue-600
                px-8
                py-4
                text-sm
                font-bold
                text-white
                shadow-[0_10px_25px_rgba(37,99,235,0.16)]
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:bg-blue-700
                hover:shadow-[0_14px_30px_rgba(37,99,235,0.22)]
              "
            >

              Explore Courses

            </button>


            <button
              type="button"
              className="
                rounded-2xl
                border
                border-slate-300
                bg-white/70
                px-8
                py-4
                text-sm
                font-semibold
                text-slate-700
                backdrop-blur-sm
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:bg-white
                hover:border-slate-400
              "
            >

              Become Mentor

            </button>

          </div>

        </motion.div>


        {/* ===================================================
            RIGHT SIDE
        ==================================================== */}

        <motion.div
          className="
            relative
            flex
            min-h-[520px]
            items-center
            justify-center
          "
          initial={{
            opacity: 0,
            x: 50,
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

          {/* =================================================
              HERO IMAGE
          ================================================== */}

          <motion.img
            src={heroImage}
            alt="DataLattice learning"
            className="
              relative
              z-10
              w-full
              max-w-xl
            "
            animate={{
              y: [0, -15, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 4,
              ease: "easeInOut",
            }}
          />


          {/* =================================================
              STUDENTS
          ================================================== */}

          <motion.div
            className="
              absolute
              left-0
              top-10
              z-20
              rounded-3xl
              border
              border-slate-200
              bg-white/90
              px-6
              py-4
              shadow-[0_18px_45px_rgba(15,23,42,0.10)]
              backdrop-blur-sm
            "
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 3,
              ease: "easeInOut",
            }}
          >

            <h2
              className="
                text-3xl
                font-bold
                text-blue-600
              "
            >

              50K+

            </h2>


            <p
              className="
                text-sm
                text-slate-500
              "
            >

              Students

            </p>

          </motion.div>


          {/* =================================================
              COURSES
          ================================================== */}

          <motion.div
            className="
              absolute
              bottom-10
              right-0
              z-20
              rounded-3xl
              border
              border-slate-200
              bg-white/90
              px-6
              py-4
              shadow-[0_18px_45px_rgba(15,23,42,0.10)]
              backdrop-blur-sm
            "
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 3,
              ease: "easeInOut",
            }}
          >

            <h2
              className="
                text-3xl
                font-bold
                text-blue-600
              "
            >

              120+

            </h2>


            <p
              className="
                text-sm
                text-slate-500
              "
            >

              Courses

            </p>

          </motion.div>


          {/* =================================================
              SIGNUP CARD
          ================================================== */}

          <div
            className="
              relative
              z-30
              hidden
              w-full
              max-w-[470px]
              lg:block
            "
          >

            <HeroSignupCard />

          </div>

        </motion.div>

      </div>

    </section>

  );

}


export default Hero;