import React from "react";
import { motion } from "framer-motion";
import {
  FaArrowRight,
  FaChartLine,
  FaDatabase,
  FaCode,
  FaBrain,
  FaPlay,
  FaCheck,
  FaRobot,
  FaProjectDiagram,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { requireHomeDemoAccess } from "./HomeAccessGate";
import HeroSignupCard from "./HeroSignupCard";

/* =========================================================
   DATALATTICE HERO
   =========================================================

   Layout:

   ┌─────────────────────────────────────────────────────────┐
   │                        NAVBAR                           │
   ├─────────────────────────────────────────────────────────┤
   │                                                         │
   │  LEFT                  MIDDLE                  RIGHT    │
   │                                                         │
   │  Hero heading          DataLattice             Signup   │
   │  Description           Graph                   Card     │
   │  Buttons               Network                          │
   │  Learning points                                        │
   │                                                         │
   └─────────────────────────────────────────────────────────┘

   IMPORTANT:
   ---------------------------------------------------------
   This file does not modify:
   - Navbar
   - HomeAccessGate
   - HeroSignupCard
   - authentication
   - OTP
   - navigation logic
   - backend functionality

   Only the Hero presentation/layout/background is handled here.
   ========================================================= */


/* =========================================================
   HERO BACKGROUND
   ========================================================= */

function BackgroundNetwork() {
  const dots = [
    {
      left: "28%",
      top: "13%",
      size: "5px",
      delay: 0,
      duration: 4.5,
    },
    {
      left: "39%",
      top: "27%",
      size: "4px",
      delay: 0.8,
      duration: 5,
    },
    {
      left: "54%",
      top: "11%",
      size: "4px",
      delay: 1.2,
      duration: 4.2,
    },
    {
      left: "67%",
      top: "26%",
      size: "5px",
      delay: 0.5,
      duration: 5.2,
    },
    {
      left: "79%",
      top: "15%",
      size: "4px",
      delay: 1.8,
      duration: 4.8,
    },
    {
      left: "91%",
      top: "45%",
      size: "4px",
      delay: 1.1,
      duration: 5.5,
    },
    {
      left: "64%",
      top: "79%",
      size: "4px",
      delay: 2,
      duration: 4.7,
    },
    {
      left: "38%",
      top: "82%",
      size: "4px",
      delay: 1.6,
      duration: 5.3,
    },
    {
      left: "17%",
      top: "68%",
      size: "4px",
      delay: 0.9,
      duration: 4.9,
    },
  ];

  return (
    <div
      aria-hidden="true"
      className="
        pointer-events-none
        absolute
        inset-0
        z-0
        overflow-hidden
      "
    >
      {/* =====================================================
          CLEAN WHITE BASE
          ===================================================== */}

      <div
        className="
          absolute
          inset-0
          bg-white
        "
      />

      {/* =====================================================
          SOFT BLUE DEPTH LAYERS

          These are intentionally subtle.
          No colorful gradients.
          ===================================================== */}

      <motion.div
        className="
          absolute
          -left-[12%]
          top-[10%]
          h-[420px]
          w-[520px]
          rounded-full
          bg-[#F5F9FF]
          blur-[90px]
        "
        animate={{
          x: [0, 22, 0],
          y: [0, 12, 0],
          opacity: [0.7, 0.9, 0.7],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="
          absolute
          right-[-12%]
          top-[15%]
          h-[420px]
          w-[500px]
          rounded-full
          bg-[#F5F9FF]
          blur-[100px]
        "
        animate={{
          x: [0, -20, 0],
          y: [0, 16, 0],
          opacity: [0.6, 0.85, 0.6],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="
          absolute
          bottom-[-22%]
          left-[34%]
          h-[340px]
          w-[520px]
          rounded-full
          bg-[#EAF2FF]
          blur-[110px]
          opacity-30
        "
        animate={{
          x: [0, 28, 0],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* =====================================================
          PRIMARY TECHNICAL GRID
          ===================================================== */}

      <div
        className="
          absolute
          inset-0
          opacity-[0.052]
        "
        style={{
          backgroundImage: `
            linear-gradient(
              to right,
              #0B1B3A 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              #0B1B3A 1px,
              transparent 1px
            )
          `,
          backgroundSize: "38px 38px",
        }}
      />

      {/* =====================================================
          MICRO GRID
          ===================================================== */}

      <div
        className="
          absolute
          inset-0
          opacity-[0.018]
        "
        style={{
          backgroundImage: `
            linear-gradient(
              to right,
              #1463FF 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              #1463FF 1px,
              transparent 1px
            )
          `,
          backgroundSize: "9px 9px",
        }}
      />

      {/* =====================================================
          LARGE FLOWING DATA LINES
          ===================================================== */}

      <svg
        viewBox="0 0 1600 760"
        preserveAspectRatio="none"
        className="
          absolute
          inset-0
          h-full
          w-full
        "
      >
        {/* Upper blue path */}

        <motion.path
          d="
            M-120 185
            C120 105
            300 210
            505 165
            C730 115
            850 45
            1060 92
            C1270 138
            1440 115
            1710 180
          "
          fill="none"
          stroke="#1463FF"
          strokeWidth="1"
          strokeOpacity="0.08"
          initial={{
            pathLength: 0,
          }}
          animate={{
            pathLength: 1,
          }}
          transition={{
            duration: 3.5,
            ease: "easeOut",
          }}
        />

        {/* Middle cyan path */}

        <motion.path
          d="
            M-100 430
            C150 350
            310 485
            530 410
            C735 340
            880 270
            1070 325
            C1280 385
            1440 325
            1700 405
          "
          fill="none"
          stroke="#06B6D4"
          strokeWidth="1"
          strokeOpacity="0.045"
          initial={{
            pathLength: 0,
          }}
          animate={{
            pathLength: 1,
          }}
          transition={{
            duration: 4.2,
            delay: 0.3,
            ease: "easeOut",
          }}
        />

        {/* Lower architectural curve */}

        <path
          d="
            M90 780
            C280 585
            475 690
            690 565
            C900 445
            1120 475
            1330 595
            C1450 665
            1540 690
            1660 650
          "
          fill="none"
          stroke="#0B1B3A"
          strokeWidth="0.8"
          strokeOpacity="0.03"
        />

        {/* Large circular architectural arc */}

        <path
          d="
            M-80 610
            C190 330
            505 250
            795 305
            C1085 360
            1335 525
            1660 390
          "
          fill="none"
          stroke="#1463FF"
          strokeWidth="0.8"
          strokeOpacity="0.032"
        />

        {/* Secondary circular arc */}

        <path
          d="
            M330 810
            C490 525
            760 390
            1015 445
            C1260 500
            1420 635
            1580 800
          "
          fill="none"
          stroke="#06B6D4"
          strokeWidth="0.8"
          strokeOpacity="0.032"
        />
      </svg>

      {/* =====================================================
          SECONDARY DATA CONNECTIONS
          ===================================================== */}

      <svg
        viewBox="0 0 1600 760"
        preserveAspectRatio="none"
        className="
          absolute
          inset-0
          h-full
          w-full
        "
      >
        <path
          d="M120 145 L430 145 L570 230"
          fill="none"
          stroke="#1463FF"
          strokeWidth="0.7"
          strokeOpacity="0.03"
        />

        <path
          d="M720 105 L850 165 L1110 125"
          fill="none"
          stroke="#1463FF"
          strokeWidth="0.7"
          strokeOpacity="0.03"
        />

        <path
          d="M1040 590 L1230 520 L1490 575"
          fill="none"
          stroke="#06B6D4"
          strokeWidth="0.7"
          strokeOpacity="0.028"
        />

        <path
          d="M180 530 L340 470 L510 505"
          fill="none"
          stroke="#1463FF"
          strokeWidth="0.7"
          strokeOpacity="0.025"
        />
      </svg>

      {/* =====================================================
          ANIMATED DATA POINTS
          ===================================================== */}

      {dots.map((dot, index) => (
        <motion.span
          key={index}
          className="
            absolute
            rounded-full
            bg-[#1463FF]
          "
          style={{
            left: dot.left,
            top: dot.top,
            width: dot.size,
            height: dot.size,
          }}
          animate={{
            opacity: [0.1, 0.55, 0.1],
            scale: [0.8, 1.15, 0.8],
          }}
          transition={{
            duration: dot.duration,
            delay: dot.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Cyan point */}

      <motion.span
        className="
          absolute
          left-[46%]
          top-[18%]
          h-1.5
          w-1.5
          rounded-full
          bg-[#06B6D4]
        "
        animate={{
          y: [0, -5, 0],
          opacity: [0.1, 0.4, 0.1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Second cyan point */}

      <motion.span
        className="
          absolute
          left-[72%]
          top-[74%]
          h-1.5
          w-1.5
          rounded-full
          bg-[#06B6D4]
        "
        animate={{
          y: [0, 5, 0],
          opacity: [0.08, 0.35, 0.08],
        }}
        transition={{
          duration: 4.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* =====================================================
          TOP EDGE
          ===================================================== */}

      <div
        className="
          absolute
          left-0
          right-0
          top-0
          h-px
          bg-[#E6EDF7]
        "
      />

      {/* =====================================================
          BOTTOM EDGE
          ===================================================== */}

      <div
        className="
          absolute
          bottom-0
          left-0
          right-0
          h-px
          bg-[#E6EDF7]
        "
      />
    </div>
  );
}


/* =========================================================
   DATALATTICE MIDDLE GRAPH
   ========================================================= */

function LatticeVisual() {
  const nodes = [
    {
      id: "python",
      left: "15%",
      top: "39%",
      label: "Python",
      icon: FaCode,
      active: true,
    },
    {
      id: "sql",
      left: "55%",
      top: "22%",
      label: "SQL",
      icon: FaDatabase,
      active: false,
    },
    {
      id: "analytics",
      left: "82%",
      top: "43%",
      label: "Analytics",
      icon: FaChartLine,
      active: true,
    },
    {
      id: "machine-learning",
      left: "34%",
      top: "76%",
      label: "Machine Learning",
      icon: FaBrain,
      active: false,
    },
    {
      id: "projects",
      left: "72%",
      top: "76%",
      label: "Projects",
      icon: FaProjectDiagram,
      active: true,
    },
  ];

  return (
    <div className="relative h-full w-full">

      {/* =====================================================
          GRAPH FRAME
          ===================================================== */}

      <div
        className="
          absolute
          inset-0
          overflow-hidden
          rounded-[26px]
          border
          border-[#DDE8F7]
          bg-white/80
          shadow-[0_18px_45px_rgba(11,27,58,0.07)]
          backdrop-blur-sm
        "
      >

        {/* ===================================================
            GRAPH GRID
            =================================================== */}

        <div
          className="
            absolute
            inset-0
            opacity-[0.05]
          "
          style={{
            backgroundImage: `
              linear-gradient(
                #1463FF 1px,
                transparent 1px
              ),
              linear-gradient(
                90deg,
                #1463FF 1px,
                transparent 1px
              )
            `,
            backgroundSize: "30px 30px",
          }}
        />

        {/* ===================================================
            GRAPH HEADER
            =================================================== */}

        <div
          className="
            absolute
            left-0
            right-0
            top-0
            z-30
            flex
            h-10
            items-center
            justify-between
            border-b
            border-[#E6EDF7]
            bg-white/92
            px-4
            backdrop-blur-md
          "
        >
          <div className="flex items-center gap-2">
            <span
              className="
                h-1.5
                w-1.5
                rounded-full
                bg-[#1463FF]
              "
            />

            <span
              className="
                text-[7px]
                font-black
                uppercase
                tracking-[0.18em]
                text-[#0B1B3A]
              "
            >
              DataLattice
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <span
              className="
                h-1.5
                w-1.5
                rounded-full
                bg-[#E6EDF7]
              "
            />

            <span
              className="
                h-1.5
                w-1.5
                rounded-full
                bg-[#E6EDF7]
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
        </div>

        {/* ===================================================
            NETWORK SVG
            =================================================== */}

        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="
            absolute
            inset-x-[4%]
            top-[9%]
            h-[84%]
            w-[92%]
          "
          aria-hidden="true"
        >
          {/* Main network */}

          <motion.path
            d="
              M15 39
              L55 22
              L82 43
              L72 76
              L34 76
              Z
            "
            fill="none"
            stroke="#1463FF"
            strokeWidth="0.38"
            strokeOpacity="0.28"
            initial={{
              pathLength: 0,
            }}
            animate={{
              pathLength: 1,
            }}
            transition={{
              duration: 1.8,
              ease: "easeInOut",
            }}
          />

          {/* Cross line */}

          <path
            d="M15 39 L72 76"
            fill="none"
            stroke="#1463FF"
            strokeWidth="0.22"
            strokeOpacity="0.13"
          />

          {/* Cyan route */}

          <path
            d="M34 76 L82 43"
            fill="none"
            stroke="#06B6D4"
            strokeWidth="0.28"
            strokeOpacity="0.23"
            strokeDasharray="2 2"
          />

          {/* Vertical route */}

          <path
            d="M55 22 L34 76"
            fill="none"
            stroke="#1463FF"
            strokeWidth="0.2"
            strokeOpacity="0.12"
          />

          {/* Core connections */}

          <path
            d="M50 52 L15 39"
            fill="none"
            stroke="#1463FF"
            strokeWidth="0.2"
            strokeOpacity="0.15"
          />

          <path
            d="M50 52 L55 22"
            fill="none"
            stroke="#1463FF"
            strokeWidth="0.2"
            strokeOpacity="0.15"
          />

          <path
            d="M50 52 L82 43"
            fill="none"
            stroke="#06B6D4"
            strokeWidth="0.2"
            strokeOpacity="0.14"
          />

          <path
            d="M50 52 L34 76"
            fill="none"
            stroke="#1463FF"
            strokeWidth="0.2"
            strokeOpacity="0.13"
          />

          <path
            d="M50 52 L72 76"
            fill="none"
            stroke="#1463FF"
            strokeWidth="0.2"
            strokeOpacity="0.13"
          />

          {/* =================================================
              MOVING DATA SIGNAL
              ================================================= */}

          <motion.circle
            r="1"
            fill="#1463FF"
            initial={{
              cx: 15,
              cy: 39,
              opacity: 0,
            }}
            animate={{
              cx: [
                15,
                55,
                82,
                72,
                34,
                15,
              ],
              cy: [
                39,
                22,
                43,
                76,
                76,
                39,
              ],
              opacity: [
                0,
                1,
                1,
                1,
                1,
                0,
              ],
            }}
            transition={{
              duration: 5.8,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </svg>

        {/* ===================================================
            CENTRAL CORE
            =================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.75,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.65,
            delay: 0.45,
          }}
          className="
            absolute
            left-1/2
            top-1/2
            z-40
            -translate-x-1/2
            -translate-y-1/2
          "
        >
          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "linear",
            }}
            className="
              flex
              h-[72px]
              w-[72px]
              items-center
              justify-center
              rounded-full
              border
              border-[#1463FF]/20
              bg-white
              shadow-[0_15px_35px_rgba(20,99,255,0.12)]
              sm:h-[78px]
              sm:w-[78px]
            "
          >
            <div
              className="
                flex
                h-[53px]
                w-[53px]
                items-center
                justify-center
                rounded-full
                border
                border-[#E6EDF7]
                bg-[#F5F9FF]
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
                  bg-[#1463FF]
                  text-white
                  shadow-[0_8px_18px_rgba(20,99,255,0.24)]
                "
              >
                <FaChartLine size={13} />
              </div>
            </div>
          </motion.div>

          <div
            className="
              absolute
              left-1/2
              top-full
              mt-1.5
              -translate-x-1/2
              whitespace-nowrap
              text-center
            "
          >
            <p
              className="
                text-[6px]
                font-black
                uppercase
                tracking-[0.15em]
                text-[#0B1B3A]
              "
            >
              Skills → Projects
            </p>

            <p
              className="
                mt-0.5
                text-[5px]
                font-semibold
                text-[#64748B]
              "
            >
              Projects → Careers
            </p>
          </div>
        </motion.div>

        {/* ===================================================
            GRAPH NODES
            =================================================== */}

        {nodes.map((node, index) => {
          const Icon = node.icon;

          return (
            <motion.div
              key={node.id}
              initial={{
                opacity: 0,
                scale: 0.75,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                duration: 0.45,
                delay: 0.35 + index * 0.1,
              }}
              className="
                absolute
                z-40
              "
              style={{
                left: node.left,
                top: node.top,
                transform:
                  "translate(-50%, -50%)",
              }}
            >
              <motion.div
                animate={
                  node.active
                    ? {
                        y: [0, -3, 0],
                      }
                    : undefined
                }
                transition={
                  node.active
                    ? {
                        duration: 3.4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }
                    : undefined
                }
                className="
                  flex
                  items-center
                  gap-1.5
                  rounded-xl
                  border
                  border-[#E2EAF5]
                  bg-white
                  px-2
                  py-1.5
                  shadow-[0_8px_20px_rgba(11,27,58,0.07)]
                "
              >
                <span
                  className={`
                    flex
                    h-5
                    w-5
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    ${
                      node.active
                        ? "bg-[#1463FF] text-white"
                        : "bg-[#EAF2FF] text-[#1463FF]"
                    }
                  `}
                >
                  <Icon size={8} />
                </span>

                <span
                  className="
                    whitespace-nowrap
                    text-[6px]
                    font-black
                    text-[#0B1B3A]
                    sm:text-[7px]
                  "
                >
                  {node.label}
                </span>
              </motion.div>
            </motion.div>
          );
        })}

        {/* ===================================================
            CURRENT FOCUS
            =================================================== */}

        <div
          className="
            absolute
            bottom-2.5
            left-2.5
            right-2.5
            z-40
            flex
            items-center
            justify-between
            rounded-xl
            border
            border-[#E6EDF7]
            bg-white/95
            px-3
            py-2
            shadow-[0_8px_20px_rgba(11,27,58,0.05)]
            backdrop-blur
          "
        >
          <div>
            <p
              className="
                text-[5px]
                font-bold
                uppercase
                tracking-[0.14em]
                text-[#64748B]
              "
            >
              Current focus
            </p>

            <p
              className="
                mt-0.5
                text-[7px]
                font-black
                text-[#0B1B3A]
                sm:text-[8px]
              "
            >
              Build real-world skills
            </p>
          </div>

          <div className="flex items-center gap-1">
            <span
              className="
                h-1.5
                w-1.5
                rounded-full
                bg-[#1463FF]
              "
            />

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
                h-1.5
                w-1.5
                rounded-full
                bg-[#DDE6F2]
              "
            />
          </div>
        </div>
      </div>
    </div>
  );
}


/* =========================================================
   DATA STICKERS
   ---------------------------------------------------------
   These are decorative background/space elements only.
   They don't replace or modify any existing component.
   ========================================================= */

function DataStickers() {
  return (
    <>
      {/* =====================================================
          PYTHON
          ===================================================== */}

      <motion.div
        initial={{
          opacity: 0,
          y: 8,
        }}
        animate={{
          opacity: 1,
          y: [0, -3, 0],
        }}
        transition={{
          opacity: {
            duration: 0.5,
            delay: 0.8,
          },
          y: {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
        className="
          pointer-events-none
          absolute
          bottom-[3%]
          left-[-2%]
          z-50
          hidden
          items-center
          gap-1.5
          rounded-xl
          border
          border-[#E6EDF7]
          bg-white
          px-2
          py-1.5
          shadow-[0_8px_22px_rgba(11,27,58,0.07)]
          md:flex
        "
      >
        <span
          className="
            flex
            h-5
            w-5
            items-center
            justify-center
            rounded-lg
            bg-[#EAF2FF]
            text-[#1463FF]
          "
        >
          <FaCode size={8} />
        </span>

        <div>
          <p
            className="
              text-[5px]
              font-bold
              uppercase
              tracking-[0.1em]
              text-[#64748B]
            "
          >
            Code
          </p>

          <p
            className="
              text-[7px]
              font-black
              text-[#0B1B3A]
            "
          >
            Python
          </p>
        </div>
      </motion.div>


      {/* =====================================================
          SQL
          ===================================================== */}

      <motion.div
        initial={{
          opacity: 0,
          y: -8,
        }}
        animate={{
          opacity: 1,
          y: [0, 3, 0],
        }}
        transition={{
          opacity: {
            duration: 0.5,
            delay: 1,
          },
          y: {
            duration: 4.5,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
        className="
          pointer-events-none
          absolute
          left-[45%]
          top-[-5%]
          z-50
          hidden
          items-center
          gap-1.5
          rounded-xl
          border
          border-[#E6EDF7]
          bg-white
          px-2
          py-1.5
          shadow-[0_8px_22px_rgba(11,27,58,0.07)]
          md:flex
        "
      >
        <span
          className="
            flex
            h-5
            w-5
            items-center
            justify-center
            rounded-lg
            bg-[#EAF2FF]
            text-[#1463FF]
          "
        >
          <FaDatabase size={8} />
        </span>

        <div>
          <p
            className="
              text-[5px]
              font-bold
              uppercase
              tracking-[0.1em]
              text-[#64748B]
            "
          >
            Query
          </p>

          <p
            className="
              text-[7px]
              font-black
              text-[#0B1B3A]
            "
          >
            SQL
          </p>
        </div>
      </motion.div>


      {/* =====================================================
          ANALYTICS
          ===================================================== */}

      <motion.div
        initial={{
          opacity: 0,
          x: 8,
        }}
        animate={{
          opacity: 1,
          x: [0, 3, 0],
        }}
        transition={{
          opacity: {
            duration: 0.5,
            delay: 1.15,
          },
          x: {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
        className="
          pointer-events-none
          absolute
          bottom-[14%]
          right-[-2%]
          z-50
          hidden
          items-center
          gap-1.5
          rounded-xl
          border
          border-[#E6EDF7]
          bg-white
          px-2
          py-1.5
          shadow-[0_8px_22px_rgba(11,27,58,0.07)]
          md:flex
        "
      >
        <span
          className="
            flex
            h-5
            w-5
            items-center
            justify-center
            rounded-lg
            bg-[#EAF2FF]
            text-[#1463FF]
          "
        >
          <FaChartLine size={8} />
        </span>

        <div>
          <p
            className="
              text-[5px]
              font-bold
              uppercase
              tracking-[0.1em]
              text-[#64748B]
            "
          >
            Insight
          </p>

          <p
            className="
              text-[7px]
              font-black
              text-[#0B1B3A]
            "
          >
            Analytics
          </p>
        </div>
      </motion.div>


      {/* =====================================================
          AI & ML
          ===================================================== */}

      <motion.div
        initial={{
          opacity: 0,
          scale: 0.9,
        }}
        animate={{
          opacity: 1,
          scale: [1, 1.03, 1],
        }}
        transition={{
          opacity: {
            duration: 0.5,
            delay: 1.3,
          },
          scale: {
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
        className="
          pointer-events-none
          absolute
          bottom-[-5%]
          right-[28%]
          z-50
          hidden
          items-center
          gap-1.5
          rounded-full
          border
          border-[#E6EDF7]
          bg-white
          px-2
          py-1.5
          shadow-[0_8px_22px_rgba(11,27,58,0.06)]
          md:flex
        "
      >
        <FaRobot
          size={8}
          className="text-[#1463FF]"
        />

        <span
          className="
            text-[6px]
            font-black
            text-[#0B1B3A]
          "
        >
          AI & ML
        </span>
      </motion.div>
    </>
  );
}


/* =========================================================
   MAIN HERO
   ========================================================= */

function Hero() {
  const navigate = useNavigate();

  /* =======================================================
     EXISTING PROTECTED NAVIGATION
     ======================================================= */

  const handleExplorePrograms =
    requireHomeDemoAccess(() => {
      navigate("/courses");
    });

  const handleWatchDemo =
    requireHomeDemoAccess(() => {
      navigate("/courses");
    });

  return (
    <section
      className="
        relative
        overflow-hidden
        border-b
        border-[#E6EDF7]
        bg-white
        min-h-[calc(100vh-74px)]
        pt-[74px]
      "
    >

      {/* =====================================================
          BACKGROUND ONLY
          ===================================================== */}

      <BackgroundNetwork />


      {/* =====================================================
          MAIN CONTENT FRAME
          ===================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          flex
          min-h-[calc(100vh-74px)]
          max-w-[1500px]
          flex-col
          justify-center
          px-5
          py-7
          sm:px-7
          sm:py-8
          lg:px-8
          lg:py-8
          xl:px-10
        "
      >

        {/* ===================================================
            THREE COLUMN HERO
            =================================================== */}

        <div
          className="
            grid
            items-center

            lg:grid-cols-[0.84fr_1.08fr_0.58fr]
            lg:gap-5

            xl:grid-cols-[0.86fr_1.10fr_0.58fr]
            xl:gap-6
          "
        >

          {/* =================================================
              LEFT COLUMN
              ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              x: -24,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.65,
              ease: "easeOut",
            }}
            className="
              relative
              z-30
              w-full
              max-w-[525px]
            "
          >

            {/* =================================================
                EYEBROW
                ================================================= */}

            <motion.div
              initial={{
                opacity: 0,
                y: 8,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.45,
                delay: 0.1,
              }}
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-[#E0EAF7]
                bg-white
                px-3.5
                py-2
                shadow-[0_5px_18px_rgba(11,27,58,0.04)]
              "
            >
              <span
                className="
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-[#1463FF]
                "
              />

              <span
                className="
                  text-[8px]
                  font-black
                  uppercase
                  tracking-[0.15em]
                  text-[#0B1B3A]
                  sm:text-[9px]
                "
              >
                Data education, reimagined
              </span>
            </motion.div>


            {/* =================================================
                MAIN HEADING
                ================================================= */}

            <motion.h1
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.65,
                delay: 0.17,
              }}
              className="
                mt-5
                max-w-[510px]
                text-[3rem]
                font-black
                leading-[0.94]
                tracking-[-0.058em]
                text-[#0B1B3A]

                sm:text-[3.3rem]

                md:text-[3.55rem]

                lg:text-[3.55rem]

                xl:text-[3.9rem]
              "
            >
              Learn data.

              <br />

              <span className="text-[#1463FF]">
                Build what
              </span>

              <br />

              <span className="text-[#1463FF]">
                matters.
              </span>
            </motion.h1>


            {/* =================================================
                CYAN ACCENT
                ================================================= */}

            <motion.div
              initial={{
                width: 0,
              }}
              animate={{
                width: "88px",
              }}
              transition={{
                duration: 0.65,
                delay: 0.65,
              }}
              className="
                mt-4
                h-1
                rounded-full
                bg-[#06B6D4]
              "
            />


            {/* =================================================
                DESCRIPTION
                ================================================= */}

            <motion.p
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.55,
                delay: 0.34,
              }}
              className="
                mt-4
                max-w-[500px]
                text-[13px]
                leading-6
                text-[#64748B]

                sm:text-[14px]

                lg:text-[13px]

                xl:text-[14px]
              "
            >
              Practical data programs built around skills,
              projects, mentorship, and the confidence to take
              your next career step.
            </motion.p>


            {/* =================================================
                ACTION BUTTONS
                ================================================= */}

            <motion.div
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.55,
                delay: 0.47,
              }}
              className="
                mt-5
                flex
                flex-col
                gap-2.5
                sm:flex-row
              "
            >

              {/* =================================================
                  EXPLORE PROGRAMS
                  ================================================= */}

              <button
                type="button"
                onClick={handleExplorePrograms}
                className="
                  group
                  inline-flex
                  items-center
                  justify-center
                  gap-2.5
                  rounded-full
                  bg-[#1463FF]
                  px-5
                  py-3
                  text-[13px]
                  font-black
                  text-white
                  shadow-[0_12px_28px_rgba(20,99,255,0.20)]
                  transition-all
                  duration-200
                  hover:-translate-y-0.5
                  hover:bg-[#0B1B3A]
                "
              >
                Explore Programs

                <FaArrowRight
                  size={10}
                  className="
                    transition-transform
                    duration-200
                    group-hover:translate-x-1
                  "
                />
              </button>


              {/* =================================================
                  SEE HOW IT WORKS
                  ================================================= */}

              <button
                type="button"
                onClick={handleWatchDemo}
                className="
                  group
                  inline-flex
                  items-center
                  justify-center
                  gap-2.5
                  rounded-full
                  border
                  border-[#E1E9F4]
                  bg-white
                  px-5
                  py-3
                  text-[13px]
                  font-black
                  text-[#0B1B3A]
                  shadow-[0_8px_22px_rgba(11,27,58,0.05)]
                  transition-all
                  duration-200
                  hover:-translate-y-0.5
                  hover:border-[#1463FF]/30
                  hover:text-[#1463FF]
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
                    bg-[#EAF2FF]
                    text-[#1463FF]
                    transition-colors
                    duration-200
                    group-hover:bg-[#1463FF]
                    group-hover:text-white
                  "
                >
                  <FaPlay size={6} />
                </span>

                See How It Works
              </button>
            </motion.div>


            {/* =================================================
                LEARNING POINTS
                ================================================= */}

            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                duration: 0.5,
                delay: 0.7,
              }}
              className="
                mt-5
                flex
                flex-wrap
                items-center
                gap-x-3
                gap-y-2
                border-t
                border-[#E6EDF7]
                pt-3.5
              "
            >
              {[
                "Practical learning",
                "Real projects",
                "Expert mentorship",
              ].map((item, index) => (
                <React.Fragment key={item}>

                  <div
                    className="
                      flex
                      items-center
                      gap-1.5
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
                        bg-[#EAF2FF]
                        text-[#1463FF]
                      "
                    >
                      <FaCheck size={6} />
                    </span>

                    <span
                      className="
                        text-[7px]
                        font-bold
                        text-[#64748B]
                        sm:text-[8px]
                      "
                    >
                      {item}
                    </span>
                  </div>

                  {index < 2 && (
                    <span
                      className="
                        hidden
                        h-1
                        w-1
                        rounded-full
                        bg-[#CBD5E1]
                        sm:block
                      "
                    />
                  )}

                </React.Fragment>
              ))}
            </motion.div>

          </motion.div>


          {/* =================================================
              MIDDLE COLUMN
              EXISTING GRAPH
              ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.96,
              x: 12,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              x: 0,
            }}
            transition={{
              duration: 0.7,
              delay: 0.2,
              ease: "easeOut",
            }}
            className="
              relative
              mt-8
              h-[285px]
              w-full
              min-w-0

              sm:h-[305px]

              md:h-[320px]

              lg:mt-0
              lg:h-[340px]

              xl:h-[355px]
            "
          >

            <LatticeVisual />

            {/* Decorative data stickers */}

            <DataStickers />

          </motion.div>


          {/* =================================================
              RIGHT COLUMN
              EXISTING SIGNUP CARD
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
              duration: 0.65,
              delay: 0.32,
              ease: "easeOut",
            }}
            className="
              relative
              z-[70]
              mt-8
              flex
              w-full
              items-center
              justify-center

              lg:mt-0
              lg:min-h-[355px]
            "
          >

            {/* =================================================
                IMPORTANT:

                HeroSignupCard is NOT scaled vertically.

                It keeps its own original dimensions/proportions.
                ================================================= */}

            <div
              className="
                relative
                w-full
                max-w-[350px]
              "
            >
              <HeroSignupCard />
            </div>

          </motion.div>

        </div>


        {/* =====================================================
            HERO BOTTOM STRIP

            No statistics here.
            ===================================================== */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.5,
            delay: 1,
          }}
          className="
            relative
            z-30
            mt-5
            flex
            items-center
            justify-between
            border-t
            border-[#E6EDF7]
            pt-3
          "
        >

          <p
            className="
              text-[7px]
              font-black
              uppercase
              tracking-[0.17em]
              text-[#94A3B8]
              sm:text-[8px]
            "
          >
            Learn → Build → Apply → Grow
          </p>

          <div
            className="
              hidden
              items-center
              gap-2.5
              sm:flex
            "
          >
            <span
              className="
                text-[7px]
                font-semibold
                text-[#94A3B8]
              "
            >
              Data Science
            </span>

            <span
              className="
                h-1
                w-1
                rounded-full
                bg-[#CBD5E1]
              "
            />

            <span
              className="
                text-[7px]
                font-semibold
                text-[#94A3B8]
              "
            >
              Data Analytics
            </span>
          </div>

        </motion.div>

      </div>


      {/* =====================================================
          MOBILE LAYOUT

          On mobile the three desktop columns naturally stack.
          The existing signup component appears once here.

          Desktop card above is hidden on mobile through the
          lg-only wrapper below.
          ===================================================== */}

      <div
        className="
          relative
          z-[70]
          mx-auto
          mt-2
          block
          w-[min(100%,360px)]
          px-5
          pb-7
          lg:hidden
        "
      >
        {/* ===================================================
            MOBILE CARD

            This uses the SAME existing HeroSignupCard.
            =================================================== */}

        <div
          className="
            overflow-hidden
            rounded-[22px]
            border
            border-[#E6EDF7]
            bg-white
            shadow-[0_15px_40px_rgba(11,27,58,0.10)]
          "
        >
          <HeroSignupCard />
        </div>
      </div>

    </section>
  );
}

export default Hero;