import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaGithub,
  FaArrowUp,
} from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-slate-950 text-white">

      <div className="max-w-7xl mx-auto px-8 py-20">

        <div className="grid md:grid-cols-4 gap-12">

          {/* Logo */}

          <div>

            <h2 className="text-4xl font-bold text-blue-500">
              Data Lattice
            </h2>

            <p className="mt-5 text-gray-400 leading-7">
              Data Lattice is a modern Learning Management System helping students
              master industry-ready skills through high-quality online courses.
            </p>

          </div>

          {/* Links */}

          <div>

            <h3 className="text-xl font-bold mb-6">
              Quick Links
            </h3>

            <ul className="space-y-3 text-gray-400">

              <li>
                <Link to="/" className="hover:text-white">
                  Home
                </Link>
              </li>

              <li>
                <Link to="/courses" className="hover:text-white">
                  Courses
                </Link>
              </li>

              <li>
                <Link to="/login" className="hover:text-white">
                  Login
                </Link>
              </li>

              <li>
                <Link to="/register" className="hover:text-white">
                  Register
                </Link>
              </li>

            </ul>

          </div>

          {/* Support */}

          <div>

            <h3 className="text-xl font-bold mb-6">
              Support
            </h3>

            <ul className="space-y-3 text-gray-400">

              <li className="hover:text-white cursor-pointer">
                Help Center
              </li>

              <li className="hover:text-white cursor-pointer">
                Privacy Policy
              </li>

              <li className="hover:text-white cursor-pointer">
                Terms & Conditions
              </li>

              <li className="hover:text-white cursor-pointer">
                Contact Us
              </li>

            </ul>

          </div>

          {/* Social */}

          <div>

            <h3 className="text-xl font-bold mb-6">
              Connect
            </h3>

            <div className="flex gap-4">

              <a
                href="#"
                className="bg-slate-800 p-3 rounded-xl hover:bg-blue-600 transition"
              >
                <FaFacebook />
              </a>

              <a
                href="#"
                className="bg-slate-800 p-3 rounded-xl hover:bg-pink-600 transition"
              >
                <FaInstagram />
              </a>

              <a
                href="#"
                className="bg-slate-800 p-3 rounded-xl hover:bg-sky-600 transition"
              >
                <FaLinkedin />
              </a>

              <a
                href="#"
                className="bg-slate-800 p-3 rounded-xl hover:bg-gray-600 transition"
              >
                <FaGithub />
              </a>

            </div>

            <button
              onClick={() =>
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                })
              }
              className="mt-8 bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-xl flex items-center gap-2"
            >
              <FaArrowUp />
              Back to Top
            </button>

          </div>

        </div>

        <div className="border-t border-slate-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center">

          <p className="text-gray-500">
            © 2026 Data Lattice LMS. All Rights Reserved.
          </p>

          <p className="text-gray-500 mt-4 md:mt-0">
            Built with ❤️ using React, Node.js & MySQL
          </p>

        </div>

      </div>

    </footer>
  );
}

export default Footer;