import React from "react";
import {
  FaTwitter,
  FaLinkedinIn,
  FaFacebookF,
  FaYoutube,
  FaArrowRight,
} from "react-icons/fa";

// ============================================================
// DATALATTICE FOOTER
// ============================================================

const footerColumns = [
  {
    title: "Programs",
    links: [
      "Data Analytics",
      "Data Science",
      "Full Stack Development",
      "UI/UX Design",
      "Cloud & DevOps",
    ],
  },
  {
    title: "Company",
    links: [
      "About Us",
      "Our Mentors",
      "Student Stories",
      "Blog",
      "Careers",
    ],
  },
  {
    title: "Support",
    links: [
      "Contact Us",
      "FAQs",
      "Refund Policy",
      "Terms & Conditions",
      "Privacy Policy",
    ],
  },
];

const socialLinks = [
  {
    label: "Twitter",
    icon: FaTwitter,
    href: "#",
  },
  {
    label: "LinkedIn",
    icon: FaLinkedinIn,
    href: "#",
  },
  {
    label: "Facebook",
    icon: FaFacebookF,
    href: "#",
  },
  {
    label: "YouTube",
    icon: FaYoutube,
    href: "#",
  },
];

function Footer() {
  return (
    <footer
      className="
        relative
        w-full
        overflow-hidden
        bg-[#07152E]
        text-white
      "
    >
      {/* ======================================================
          TOP ACCENT
      ====================================================== */}

      <div
        className="
          absolute
          inset-x-0
          top-0
          h-[2px]
          bg-gradient-to-r
          from-[#0C5FF5]
          via-[#0289F9]
          to-[#3531E7]
        "
      />

      {/* ======================================================
          SUBTLE BACKGROUND GLOW
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="
            absolute
            -right-40
            -top-40
            h-[420px]
            w-[420px]
            rounded-full
            bg-[#0C5FF5]/[0.07]
            blur-3xl
          "
        />

        <div
          className="
            absolute
            -bottom-48
            left-1/3
            h-[420px]
            w-[420px]
            rounded-full
            bg-[#3531E7]/[0.045]
            blur-3xl
          "
        />
      </div>

      <div
        className="
          relative
          mx-auto
          w-full
          max-w-7xl
          px-5
          py-14
          sm:px-7
          sm:py-16
          lg:px-8
          lg:py-18
        "
      >
        {/* ====================================================
            MAIN FOOTER GRID
        ==================================================== */}

        <div
          className="
            grid
            gap-12
            sm:gap-14
            md:grid-cols-[1.55fr_1fr_1fr_1fr]
            md:gap-8
            lg:gap-16
          "
        >
          {/* ==================================================
              BRAND
          ================================================== */}

          <div className="min-w-0">
            {/* Logo */}

            <a
              href="#"
              className="
                inline-flex
                items-center
                gap-3
                outline-none
              "
            >
              <span
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-gradient-to-br
                  from-[#0C5FF5]
                  to-[#0289F9]
                  text-[18px]
                  font-black
                  text-white
                  shadow-[0_8px_24px_rgba(12,95,245,0.25)]
                "
              >
                D
              </span>

              <span
                className="
                  text-[18px]
                  font-extrabold
                  tracking-[-0.025em]
                  text-white
                "
              >
                DATALATTICE
              </span>
            </a>

            {/* Description */}

            <p
              className="
                mt-5
                max-w-[320px]
                text-[13px]
                font-medium
                leading-6
                text-white/50
              "
            >
              Empowering the next generation of tech professionals
              with practical, industry-relevant skills and
              real-world project experience.
            </p>

            {/* Social links */}

            <div className="mt-6 flex items-center gap-2.5">
              {socialLinks.map((social) => {
                const Icon = social.icon;

                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-white/10
                      bg-white/[0.035]
                      text-white/45
                      transition-all
                      duration-200
                      hover:-translate-y-0.5
                      hover:border-[#0C5FF5]/50
                      hover:bg-[#0C5FF5]
                      hover:text-white
                    "
                  >
                    <Icon size={12} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* ==================================================
              FOOTER COLUMNS
          ================================================== */}

          {footerColumns.map((column) => (
            <FooterColumn
              key={column.title}
              title={column.title}
              links={column.links}
            />
          ))}
        </div>

        {/* ====================================================
            DIVIDER
        ==================================================== */}

        <div
          className="
            mt-12
            h-px
            w-full
            bg-white/[0.08]
            sm:mt-14
          "
        />

        {/* ====================================================
            BOTTOM BAR
        ==================================================== */}

        <div
          className="
            flex
            flex-col
            gap-4
            pt-5
            sm:flex-row
            sm:items-center
            sm:justify-between
            sm:pt-6
          "
        >
          {/* Copyright */}

          <p
            className="
              text-[11px]
              font-medium
              leading-5
              text-white/35
              sm:text-[12px]
            "
          >
            © 2026 DataLattice. All rights reserved.
          </p>

          {/* Tagline */}

          <div
            className="
              flex
              items-center
              gap-2
              text-[9px]
              font-semibold
              uppercase
              tracking-[0.16em]
              text-white/30
            "
          >
            <span>Learn</span>

            <span className="text-[#0C5FF5]/70">·</span>

            <span>Build</span>

            <span className="text-[#0C5FF5]/70">·</span>

            <span>Grow</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ============================================================
// FOOTER COLUMN
// ============================================================

function FooterColumn({ title, links }) {
  return (
    <div className="min-w-0">
      {/* Column title */}

      <h3
        className="
          text-[13px]
          font-semibold
          tracking-[-0.01em]
          text-white
        "
      >
        {title}
      </h3>

      {/* Links */}

      <ul className="mt-5 space-y-3">
        {links.map((link) => (
          <li key={link}>
            <a
              href="#"
              className="
                group
                inline-flex
                items-center
                gap-1.5
                text-[12px]
                font-medium
                leading-5
                text-white/45
                transition-all
                duration-200
                hover:text-white/90
              "
            >
              <span>{link}</span>

              <FaArrowRight
                size={7}
                className="
                  -translate-x-1
                  opacity-0
                  transition-all
                  duration-200
                  group-hover:translate-x-0
                  group-hover:opacity-70
                "
              />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Footer;