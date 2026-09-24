import React from "react";
import { motion } from "framer-motion";

import {
  FaGlobe,
  FaDatabase,
  FaCloud,
  FaMicrochip,
  FaChartPie,
  FaCode,
} from "react-icons/fa";

/* =========================================================
   TRUSTED COMPANIES / INSTITUTIONS
   ========================================================= */

const trustedCompanies = [
  {
    name: "TechCorp",
    icon: FaGlobe,
    color: "#2563EB",
    background: "#EFF6FF",
  },
  {
    name: "InnovateCo",
    icon: FaCode,
    color: "#10B981",
    background: "#ECFDF5",
  },
  {
    name: "DataFlow",
    icon: FaDatabase,
    color: "#F59E0B",
    background: "#FFFBEB",
  },
  {
    name: "Cloud Base",
    icon: FaCloud,
    color: "#7C3AED",
    background: "#F5F3FF",
  },
  {
    name: "NextGen",
    icon: FaMicrochip,
    color: "#F43F5E",
    background: "#FFF1F2",
  },
  {
    name: "AnalytiQ",
    icon: FaChartPie,
    color: "#10B981",
    background: "#ECFDF5",
  },
];

/* =========================================================
   TRUST SECTION
   ========================================================= */

function TrustSection() {
  return (
    <section
      id="trust-section"
      className="
        relative
        w-full
        overflow-hidden
        border-y
        border-slate-100
        bg-[#F8FAFF]
        py-10
        sm:py-12
        lg:py-14
      "
    >
      {/* ===================================================
          CONTENT
          =================================================== */}

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
            LABEL
            ================================================= */}

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
            duration: 0.45,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          className="
            flex
            items-center
            justify-center
            gap-3
          "
        >
          <span
            className="
              hidden
              h-px
              w-6
              bg-slate-200
              sm:block
            "
          />

          <p
            className="
              text-center
              text-[9px]
              font-semibold
              uppercase
              tracking-[0.12em]
              text-slate-400
              sm:text-[10px]
              sm:tracking-[0.14em]
            "
          >
            Trusted by learners from top companies and institutions
          </p>

          <span
            className="
              hidden
              h-px
              w-6
              bg-slate-200
              sm:block
            "
          />
        </motion.div>

        {/* =================================================
            COMPANY LIST
            ================================================= */}

        <div
          className="
            mx-auto
            mt-7
            grid
            w-full
            max-w-6xl
            grid-cols-2
            gap-3
            sm:grid-cols-3
            md:grid-cols-6
            md:gap-4
          "
        >
          {trustedCompanies.map((company, index) => (
            <TrustCompany
              key={company.name}
              company={company}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   TRUST COMPANY
   ========================================================= */

function TrustCompany({ company, index }) {
  const Icon = company.icon;

  return (
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
        delay: index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      whileHover={{
        y: -2,
      }}
      className="
        group
        flex
        min-w-0
        items-center
        justify-center
        gap-2.5
        rounded-xl
        border
        border-slate-200
        bg-white
        px-3
        py-3
        shadow-[0_4px_14px_rgba(10,24,50,0.035)]
        transition-all
        duration-300
        hover:border-slate-300
        hover:shadow-[0_8px_22px_rgba(10,24,50,0.07)]
        sm:px-4
        sm:py-3.5
      "
    >
      {/* Icon */}

      <div
        className="
          flex
          h-7
          w-7
          shrink-0
          items-center
          justify-center
          rounded-lg
          transition-transform
          duration-300
          group-hover:scale-105
        "
        style={{
          backgroundColor: company.background,
          color: company.color,
        }}
      >
        <Icon size={12} />
      </div>

      {/* Company Name */}

      <span
        className="
          min-w-0
          truncate
          text-[10px]
          font-semibold
          tracking-[-0.01em]
          text-[#334155]
          sm:text-[11px]
        "
      >
        {company.name}
      </span>
    </motion.div>
  );
}

export default TrustSection;