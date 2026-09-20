import React from "react";
import { motion } from "framer-motion";

const companies = [
  {
    name: "TechCorp",
    icon: "✦",
    iconClass: "bg-blue-50 text-blue-500",
  },
  {
    name: "InnovateCo",
    icon: "◉",
    iconClass: "bg-emerald-50 text-emerald-500",
  },
  {
    name: "DataFlow",
    icon: "▤",
    iconClass: "bg-amber-50 text-amber-500",
  },
  {
    name: "CloudBase",
    icon: "☁",
    iconClass: "bg-violet-50 text-violet-500",
  },
  {
    name: "NextGen",
    icon: "✿",
    iconClass: "bg-rose-50 text-rose-500",
  },
  {
    name: "AnalytiQ",
    icon: "◔",
    iconClass: "bg-emerald-50 text-emerald-500",
  },
];

function TrustedCompanies() {
  return (
    <section
      className="
        relative
        w-full
        overflow-hidden
        border-t
        border-slate-100
        bg-[#f8fafc]
      "
    >
      {/* =====================================================
          CONTENT
          Compact height so this section feels like a
          continuation of the Hero instead of a new page.
          ===================================================== */}

      <div
        className="
          mx-auto
          flex
          w-full
          max-w-7xl
          flex-col
          items-center
          px-5
          py-8
          sm:px-7
          sm:py-9
          lg:px-8
          lg:py-10
        "
      >
        {/* ===================================================
            SECTION LABEL
            =================================================== */}

        <div
          className="
            flex
            w-full
            max-w-[700px]
            items-center
            justify-center
            gap-3
          "
        >
          <span
            className="
              h-px
              flex-1
              max-w-[110px]
              bg-slate-200
            "
          />

          <p
            className="
              whitespace-nowrap
              text-center
              text-[7px]
              font-bold
              uppercase
              tracking-[0.08em]
              text-slate-400
              sm:text-[8px]
            "
          >
            Trusted by learners from top companies and institutions
          </p>

          <span
            className="
              h-px
              flex-1
              max-w-[110px]
              bg-slate-200
            "
          />
        </div>

        {/* ===================================================
            COMPANY CARDS
            =================================================== */}

        <div
          className="
            mt-5
            grid
            w-full
            max-w-[1080px]
            grid-cols-2
            gap-3
            sm:grid-cols-3
            lg:mt-6
            lg:grid-cols-6
            lg:gap-5
          "
        >
          {companies.map((company, index) => (
            <motion.div
              key={company.name}
              initial={{
                opacity: 0,
                y: 8,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.4,
              }}
              transition={{
                duration: 0.35,
                delay: index * 0.04,
                ease: "easeOut",
              }}
              className="
                flex
                h-[42px]
                items-center
                justify-center
                gap-2
                rounded-lg
                border
                border-slate-200/80
                bg-white
                px-3
                shadow-[0_3px_12px_rgba(15,23,42,0.035)]
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:shadow-[0_7px_20px_rgba(15,23,42,0.07)]
                sm:h-[44px]
              "
            >
              {/* Icon */}

              <span
                className={`
                  flex
                  h-5
                  w-5
                  shrink-0
                  items-center
                  justify-center
                  rounded-md
                  text-[9px]
                  font-bold
                  ${company.iconClass}
                `}
              >
                {company.icon}
              </span>

              {/* Company name */}

              <span
                className="
                  whitespace-nowrap
                  text-[9px]
                  font-bold
                  tracking-[-0.01em]
                  text-slate-700
                  sm:text-[10px]
                "
              >
                {company.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TrustedCompanies;