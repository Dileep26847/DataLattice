import React from "react";
import {
  FaTwitter,
  FaLinkedinIn,
  FaFacebookF,
  FaYoutube,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#0A1832] text-white">
      {/* =====================================================
          MAIN FOOTER
      ===================================================== */}

      <div className="mx-auto w-full max-w-7xl px-6 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-18">
        <div
          className="
            grid
            gap-12
            md:grid-cols-[1.5fr_1fr_1fr_1fr]
            md:gap-10
            lg:gap-16
          "
        >
          {/* =================================================
              BRAND
          ================================================= */}

          <div className="max-w-[330px]">
            {/* Logo */}

            <div className="flex items-center gap-3">
              <div
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  bg-[#0C5FF5]
                  shadow-[0_8px_22px_rgba(12,95,245,0.25)]
                "
              >
                <span className="text-lg font-black text-white">
                  D
                </span>
              </div>

              <span
                className="
                  text-[18px]
                  font-extrabold
                  tracking-[-0.02em]
                  text-white
                "
              >
                DATALATTICE
              </span>
            </div>

            {/* Description */}

            <p
              className="
                mt-6
                max-w-[310px]
                text-[14px]
                font-medium
                leading-6
                text-white/55
              "
            >
              Empowering the next generation of tech
              professionals with practical, industry-relevant
              skills and real-world project experience.
            </p>

            {/* Social Icons */}

            <div className="mt-6 flex items-center gap-3">
              {[
                {
                  label: "Twitter",
                  icon: FaTwitter,
                },
                {
                  label: "LinkedIn",
                  icon: FaLinkedinIn,
                },
                {
                  label: "Facebook",
                  icon: FaFacebookF,
                },
                {
                  label: "YouTube",
                  icon: FaYoutube,
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <a
                    key={item.label}
                    href="#"
                    aria-label={item.label}
                    className="
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-white/10
                      bg-white/[0.04]
                      text-white/55
                      transition-all
                      duration-200
                      hover:border-[#0289F9]/50
                      hover:bg-[#0C5FF5]
                      hover:text-white
                    "
                  >
                    <Icon size={13} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* =================================================
              PROGRAMS
          ================================================= */}

          <FooterColumn
            title="Programs"
            links={[
              "Data Analytics",
              "Data Science",
              "Full Stack Development",
              "UI/UX Design",
              "Cloud & DevOps",
            ]}
          />

          {/* =================================================
              COMPANY
          ================================================= */}

          <FooterColumn
            title="Company"
            links={[
              "About Us",
              "Our Mentors",
              "Student Stories",
              "Blog",
              "Careers",
            ]}
          />

          {/* =================================================
              SUPPORT
          ================================================= */}

          <FooterColumn
            title="Support"
            links={[
              "Contact Us",
              "FAQs",
              "Refund Policy",
              "Terms & Conditions",
              "Privacy Policy",
            ]}
          />
        </div>

        {/* =====================================================
            BOTTOM LINE
        ===================================================== */}

        <div
          className="
            mt-12
            border-t
            border-white/10
            pt-5
            sm:mt-14
            sm:pt-6
          "
        >
          <div
            className="
              flex
              flex-col
              gap-3
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >
            <p
              className="
                text-[12px]
                font-medium
                text-white/35
                sm:text-[13px]
              "
            >
              © 2026 DataLattice. All rights reserved.
            </p>

            <p
              className="
                text-[11px]
                font-bold
                uppercase
                tracking-[0.16em]
                text-white/30
              "
            >
              Learn · Build · Grow
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* =========================================================
   FOOTER COLUMN
   ========================================================= */

function FooterColumn({ title, links }) {
  return (
    <div>
      <h3
        className="
          text-[14px]
          font-bold
          tracking-[-0.01em]
          text-white
        "
      >
        {title}
      </h3>

      <ul className="mt-5 space-y-3.5">
        {links.map((link) => (
          <li key={link}>
            <a
              href="#"
              className="
                text-[13px]
                font-medium
                leading-5
                text-white/45
                transition-colors
                duration-200
                hover:text-white
              "
            >
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}