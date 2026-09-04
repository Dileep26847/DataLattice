import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white">

      <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-4 gap-12">

        <div>

          <h2 className="text-3xl font-bold">
            DataWave
          </h2>

          <p className="mt-5 text-slate-400">
            Learn. Build. Get Hired.
          </p>

        </div>

        <div>

          <h3 className="font-bold mb-5">
            Platform
          </h3>

          <p>Courses</p>
          <p>Mentors</p>
          <p>Dashboard</p>

        </div>

        <div>

          <h3 className="font-bold mb-5">
            Company
          </h3>

          <p>About</p>
          <p>Contact</p>
          <p>Careers</p>

        </div>

        <div>

          <h3 className="font-bold mb-5">
            Follow Us
          </h3>

          <div className="flex gap-4 text-2xl">

            <FaLinkedin />

            <FaGithub />

            <FaInstagram />

          </div>

        </div>

      </div>

      <div className="border-t border-slate-800 py-6 text-center text-slate-400">

        © 2026 DataWave. All Rights Reserved.

      </div>

    </footer>
  );
}