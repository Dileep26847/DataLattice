import {
  FaArrowUp,
  FaChartLine,
  FaDatabase,
  FaGithub,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";

import {
  Link,
} from "react-router-dom";

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
        border-t
        border-slate-800
        bg-slate-950
        text-white
      "
    >

      <div
        className="
          mx-auto
          max-w-7xl
          px-6
          py-16
          sm:px-8
          lg:px-12
        "
      >

        {/* ==================================================
            MAIN FOOTER
        ================================================== */}

        <div
          className="
            grid
            gap-12
            md:grid-cols-2
            lg:grid-cols-[1.4fr_0.7fr_0.8fr_0.9fr]
          "
        >

          {/* ==================================================
              BRAND
          ================================================== */}

          <div>

            <Link
              to="/"
              className="
                inline-flex
                items-center
                rounded-xl
                focus:outline-none
                focus:ring-2
                focus:ring-cyan-400
                focus:ring-offset-2
                focus:ring-offset-slate-950
              "
              aria-label="DataLattice home"
            >

              <img
                src={dataLatticeLogo}
                alt="DataLattice"
                className="
                  w-[190px]
                  max-w-full
                  object-contain
                  brightness-0
                  invert
                "
              />

            </Link>


            <p
              className="
                mt-5
                max-w-md
                text-sm
                leading-7
                text-slate-400
              "
            >

              DataLattice helps learners develop practical
              Data Science and Data Analytics capability through
              structured learning, hands-on practice, projects,
              progress tracking and mentorship.

            </p>


            {/* ==================================================
                PROGRAM SIGNALS
            ================================================== */}

            <div
              className="
                mt-7
                flex
                flex-wrap
                gap-2
              "
            >

              <span
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-white/10
                  bg-white/[0.04]
                  px-3
                  py-2
                  text-xs
                  font-medium
                  text-slate-300
                "
              >

                <FaChartLine
                  className="
                    text-cyan-300
                  "
                />

                Data Science

              </span>


              <span
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-white/10
                  bg-white/[0.04]
                  px-3
                  py-2
                  text-xs
                  font-medium
                  text-slate-300
                "
              >

                <FaDatabase
                  className="
                    text-indigo-300
                  "
                />

                Data Analytics

              </span>

            </div>

          </div>


          {/* ==================================================
              EXPLORE
          ================================================== */}

          <div>

            <h3
              className="
                mb-5
                text-xs
                font-bold
                uppercase
                tracking-[0.2em]
                text-white
              "
            >
              Explore
            </h3>


            <ul
              className="
                space-y-3
                text-sm
                text-slate-400
              "
            >

              <li>

                <Link
                  to="/"
                  className="
                    transition-colors
                    hover:text-white
                  "
                >
                  Home
                </Link>

              </li>


              <li>

                <Link
                  to="/courses"
                  className="
                    transition-colors
                    hover:text-white
                  "
                >
                  Programs
                </Link>

              </li>


              <li>

                <a
                  href="/#why-datalattice"
                  className="
                    transition-colors
                    hover:text-white
                  "
                >
                  Why DataLattice
                </a>

              </li>


              <li>

                <a
                  href="/#programs"
                  className="
                    transition-colors
                    hover:text-white
                  "
                >
                  Learning Journey
                </a>

              </li>


              <li>

                <a
                  href="/#mentors"
                  className="
                    transition-colors
                    hover:text-white
                  "
                >
                  Mentors
                </a>

              </li>

            </ul>

          </div>


          {/* ==================================================
              LEARNING
          ================================================== */}

          <div>

            <h3
              className="
                mb-5
                text-xs
                font-bold
                uppercase
                tracking-[0.2em]
                text-white
              "
            >
              Learning
            </h3>


            <ul
              className="
                space-y-3
                text-sm
                text-slate-400
              "
            >

              <li>

                <a
                  href="/#success-stories"
                  className="
                    transition-colors
                    hover:text-white
                  "
                >
                  Learning Outcomes
                </a>

              </li>


              <li>

                <a
                  href="/#faq-section"
                  className="
                    transition-colors
                    hover:text-white
                  "
                >
                  FAQ
                </a>

              </li>


              <li>

                <Link
                  to="/login"
                  className="
                    transition-colors
                    hover:text-white
                  "
                >
                  Student Login
                </Link>

              </li>


              <li>

                <Link
                  to="/register"
                  className="
                    transition-colors
                    hover:text-white
                  "
                >
                  Create Account
                </Link>

              </li>

            </ul>

          </div>


          {/* ==================================================
              CONNECT
          ================================================== */}

          <div>

            <h3
              className="
                mb-5
                text-xs
                font-bold
                uppercase
                tracking-[0.2em]
                text-white
              "
            >
              Connect
            </h3>


            <p
              className="
                text-sm
                leading-6
                text-slate-400
              "
            >

              Follow DataLattice as the platform grows,
              or use the available support channels when
              you need assistance.

            </p>


            {/* ==================================================
                SOCIAL ICONS
            ================================================== */}

            <div
              className="
                mt-6
                flex
                gap-3
              "
            >

              <span
                aria-label="LinkedIn coming soon"
                title="LinkedIn"
                className="
                  flex
                  h-10
                  w-10
                  cursor-default
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-white/10
                  bg-white/[0.04]
                  text-slate-500
                "
              >

                <FaLinkedin />

              </span>


              <span
                aria-label="Instagram coming soon"
                title="Instagram"
                className="
                  flex
                  h-10
                  w-10
                  cursor-default
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-white/10
                  bg-white/[0.04]
                  text-slate-500
                "
              >

                <FaInstagram />

              </span>


              <span
                aria-label="GitHub coming soon"
                title="GitHub"
                className="
                  flex
                  h-10
                  w-10
                  cursor-default
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-white/10
                  bg-white/[0.04]
                  text-slate-500
                "
              >

                <FaGithub />

              </span>

            </div>


            {/* ==================================================
                BACK TO TOP
            ================================================== */}

            <button
              type="button"
              onClick={handleBackToTop}
              className="
                mt-7
                inline-flex
                items-center
                gap-2
                rounded-xl
                border
                border-white/10
                bg-white/[0.05]
                px-5
                py-3
                text-sm
                font-semibold
                text-white
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:bg-white/[0.1]
                focus:outline-none
                focus:ring-2
                focus:ring-cyan-400
                focus:ring-offset-2
                focus:ring-offset-slate-950
              "
            >

              <FaArrowUp
                className="
                  text-cyan-300
                "
              />

              Back to Top

            </button>

          </div>

        </div>


        {/* ======================================================
            FOOTER DIVIDER
        ====================================================== */}

        <div
          className="
            mt-14
            border-t
            border-slate-800
            pt-7
          "
        >

          <div
            className="
              flex
              flex-col
              gap-5
              md:flex-row
              md:items-center
              md:justify-between
            "
          >

            <p
              className="
                text-xs
                leading-5
                text-slate-500
              "
            >

              © 2026 DataLattice. All Rights Reserved.

            </p>


            <div
              className="
                flex
                flex-wrap
                items-center
                gap-x-5
                gap-y-2
                text-xs
                text-slate-500
              "
            >

              <span>
                Learn
              </span>

              <span
                className="
                  text-slate-700
                "
              >
                •
              </span>

              <span>
                Build
              </span>

              <span
                className="
                  text-slate-700
                "
              >
                •
              </span>

              <span>
                Grow
              </span>

            </div>

          </div>

        </div>

      </div>

    </footer>

  );

}


export default Footer;