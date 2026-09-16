import {
  FaArrowUp,
  FaChartLine,
  FaDatabase,
  FaGithub,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";

import { Link } from "react-router-dom";

import dataLatticeLogo from "../assets/datalattice-logo.png";

function Footer() {
  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer
      id="footer"
      className="
        relative
        overflow-hidden
        bg-[#0A1832]
        text-white
      "
    >
      {/* =====================================================
          SUBTLE BRAND ACCENT
      ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          right-[-180px]
          top-[-220px]
          h-[500px]
          w-[500px]
          rounded-full
          opacity-20
          blur-3xl
        "
        style={{
          background:
            "radial-gradient(circle, rgba(53,49,231,0.55) 0%, rgba(53,49,231,0) 70%)",
        }}
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          bottom-[-220px]
          left-[-160px]
          h-[450px]
          w-[450px]
          rounded-full
          opacity-15
          blur-3xl
        "
        style={{
          background:
            "radial-gradient(circle, rgba(2,137,249,0.55) 0%, rgba(2,137,249,0) 70%)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* =====================================================
            MAIN FOOTER
        ===================================================== */}

        <div className="grid gap-12 py-14 sm:py-16 lg:grid-cols-[1.5fr_0.7fr_0.8fr_0.9fr] lg:gap-14 lg:py-20">
          {/* ===================================================
              BRAND
          =================================================== */}

          <div className="max-w-md">
            <Link
              to="/"
              aria-label="DataLattice home"
              className="
                inline-flex
                rounded-lg
                focus:outline-none
                focus:ring-2
                focus:ring-[#0289F9]
                focus:ring-offset-2
                focus:ring-offset-[#0A1832]
              "
            >
              <img
                src={dataLatticeLogo}
                alt="DataLattice"
                className="
                  w-[175px]
                  max-w-full
                  object-contain
                  brightness-0
                  invert
                "
              />
            </Link>

            <p
              className="
                mt-6
                max-w-md
                text-sm
                leading-7
                text-white/50
              "
            >
              DataLattice helps learners develop practical Data Science and
              Data Analytics capability through structured learning, hands-on
              practice, projects, progress tracking and mentorship.
            </p>

            {/* Program focus */}

            <div className="mt-7 flex flex-wrap gap-5">
              <div className="flex items-center gap-2 text-xs font-medium text-white/55">
                <FaChartLine className="text-[#0289F9]" />
                Data Science
              </div>

              <div className="flex items-center gap-2 text-xs font-medium text-white/55">
                <FaDatabase className="text-[#3531E7]" />
                Data Analytics
              </div>
            </div>
          </div>

          {/* ===================================================
              EXPLORE
          =================================================== */}

          <div>
            <h3 className="mb-5 text-[9px] font-bold uppercase tracking-[0.22em] text-white/80">
              Explore
            </h3>

            <ul className="space-y-3.5 text-sm text-white/45">
              <li>
                <Link
                  to="/"
                  className="transition-colors duration-200 hover:text-[#4CA7FF]"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/courses"
                  className="transition-colors duration-200 hover:text-[#4CA7FF]"
                >
                  Programs
                </Link>
              </li>

              <li>
                <a
                  href="/#why-datalattice"
                  className="transition-colors duration-200 hover:text-[#4CA7FF]"
                >
                  Why DataLattice
                </a>
              </li>

              <li>
                <a
                  href="/#mentors"
                  className="transition-colors duration-200 hover:text-[#4CA7FF]"
                >
                  Mentors
                </a>
              </li>

              <li>
                <a
                  href="/#success-stories"
                  className="transition-colors duration-200 hover:text-[#4CA7FF]"
                >
                  Learning Outcomes
                </a>
              </li>
            </ul>
          </div>

          {/* ===================================================
              LEARNING
          =================================================== */}

          <div>
            <h3 className="mb-5 text-[9px] font-bold uppercase tracking-[0.22em] text-white/80">
              Learning
            </h3>

            <ul className="space-y-3.5 text-sm text-white/45">
              <li>
                <a
                  href="/#faq"
                  className="transition-colors duration-200 hover:text-[#4CA7FF]"
                >
                  FAQ
                </a>
              </li>

              <li>
                <Link
                  to="/login"
                  className="transition-colors duration-200 hover:text-[#4CA7FF]"
                >
                  Student Login
                </Link>
              </li>

              <li>
                <Link
                  to="/register"
                  className="transition-colors duration-200 hover:text-[#4CA7FF]"
                >
                  Create Account
                </Link>
              </li>

              <li>
                <Link
                  to="/courses"
                  className="transition-colors duration-200 hover:text-[#4CA7FF]"
                >
                  Explore Programs
                </Link>
              </li>
            </ul>
          </div>

          {/* ===================================================
              CONNECT
          =================================================== */}

          <div>
            <h3 className="mb-5 text-[9px] font-bold uppercase tracking-[0.22em] text-white/80">
              Connect
            </h3>

            <p className="max-w-xs text-sm leading-6 text-white/45">
              Follow DataLattice as the platform grows, or use the available
              support channels when you need assistance.
            </p>

            {/* Social icons */}

            <div className="mt-6 flex gap-2.5">
              <span
                aria-label="LinkedIn coming soon"
                title="LinkedIn"
                className="
                  flex
                  h-9
                  w-9
                  cursor-default
                  items-center
                  justify-center
                  rounded-lg
                  border
                  border-white/10
                  bg-white/[0.035]
                  text-white/30
                "
              >
                <FaLinkedin size={14} />
              </span>

              <span
                aria-label="Instagram coming soon"
                title="Instagram"
                className="
                  flex
                  h-9
                  w-9
                  cursor-default
                  items-center
                  justify-center
                  rounded-lg
                  border
                  border-white/10
                  bg-white/[0.035]
                  text-white/30
                "
              >
                <FaInstagram size={14} />
              </span>

              <span
                aria-label="GitHub coming soon"
                title="GitHub"
                className="
                  flex
                  h-9
                  w-9
                  cursor-default
                  items-center
                  justify-center
                  rounded-lg
                  border
                  border-white/10
                  bg-white/[0.035]
                  text-white/30
                "
              >
                <FaGithub size={14} />
              </span>
            </div>

            {/* Back to top */}

            <button
              type="button"
              onClick={handleBackToTop}
              className="
                mt-6
                inline-flex
                items-center
                gap-2
                text-xs
                font-semibold
                text-white/55
                transition-colors
                duration-200
                hover:text-[#4CA7FF]
                focus:outline-none
                focus:ring-2
                focus:ring-[#0289F9]
                focus:ring-offset-2
                focus:ring-offset-[#0A1832]
              "
            >
              <span
                className="
                  flex
                  h-7
                  w-7
                  items-center
                  justify-center
                  rounded-lg
                  border
                  border-white/10
                  bg-white/[0.04]
                "
              >
                <FaArrowUp size={10} />
              </span>

              Back to top
            </button>
          </div>
        </div>

        {/* =====================================================
            BOTTOM BAR
        ===================================================== */}

        <div className="border-t border-white/[0.08]">
          <div
            className="
              flex
              flex-col
              gap-3
              py-6
              text-xs
              md:flex-row
              md:items-center
              md:justify-between
            "
          >
            <p className="text-white/30">
              © 2026 DataLattice. All Rights Reserved.
            </p>

            <div className="flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.16em] text-white/25">
              <span>Learn</span>

              <span className="text-[#0289F9]/40">·</span>

              <span>Build</span>

              <span className="text-[#0289F9]/40">·</span>

              <span>Grow</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;