import React from "react";
import { motion } from "framer-motion";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import Hero from "../components/landing/Hero";
import HomeAccessGate from "../components/landing/HomeAccessGate";

import Stats from "../components/landing/Stats";
import WhyDataWave from "../components/landing/WhyDataWave";
import LearningJourney from "../components/landing/LearningJourney";
import Mentors from "../components/landing/Mentors";
import SuccessStories from "../components/landing/SuccessStories";
import Leadership from "../components/landing/Leadership";
import FAQ from "../components/landing/FAQ";
import CTA from "../components/landing/CTA";

import FeaturedCourses from "../components/FeaturedCourses";

/* =========================================================
   DATALATTICE HOME PAGE
   ========================================================= */

/* =========================================================
   WHATSAPP BUTTON
   ========================================================= */

function WhatsAppButton() {
  return (
    <motion.a
      href="https://wa.me/917204376429"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with DataLattice on WhatsApp"
      title="Chat with DataLattice on WhatsApp"
      initial={{
        opacity: 0,
        scale: 0.8,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      transition={{
        duration: 0.5,
        delay: 0.4,
        ease: "easeOut",
      }}
      whileHover={{
        scale: 1.08,
        y: -3,
      }}
      whileTap={{
        scale: 0.95,
      }}
      className="
        fixed
        bottom-5
        right-5
        z-[9999]
        flex
        h-14
        w-14
        items-center
        justify-center
        rounded-full
        border-2
        border-white
        shadow-[0_10px_30px_rgba(37,211,102,0.30)]
        sm:bottom-6
        sm:right-6
      "
      style={{
        backgroundColor: "#25D366",
      }}
    >
      <svg
        width="29"
        height="29"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M20.52 3.48A11.82 11.82 0 0 0 12.08 0C5.46 0 0.08 5.38 0.08 12c0 2.11.55 4.17 1.6 5.98L.02 24l6.17-1.62A11.9 11.9 0 0 0 12.08 24C18.7 24 24.08 18.62 24.08 12c0-3.21-1.25-6.23-3.56-8.52Z"
          fill="white"
        />

        <path
          d="M17.52 13.93c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.47-.89-.79-1.49-1.76-1.66-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.21 5.08 4.5.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z"
          fill="#25D366"
        />
      </svg>
    </motion.a>
  );
}

/* =========================================================
   MAIN HOME COMPONENT
   ========================================================= */

function Home() {
  return (
    <HomeAccessGate>
      <div className="min-h-screen bg-white">
        {/* ===================================================
            PUBLIC NAVBAR
            =================================================== */}

        <Navbar />

        {/* ===================================================
            MAIN HOMEPAGE
            =================================================== */}

        <main>
          {/* Hero */}

          <Hero />

          {/* Stats */}

          <Stats />

          {/* Featured Programs */}

          <FeaturedCourses />

          {/* Why DataLattice */}

          <WhyDataWave />

          {/* Learning Journey */}

          <LearningJourney />

          {/* Mentors */}

          <Mentors />

          {/* Leadership */}

          <Leadership />

          {/* Success Stories */}

          <SuccessStories />

          {/* FAQ */}

          <FAQ />

          {/* Final CTA */}

          <CTA />
        </main>

        {/* ===================================================
            FOOTER
            =================================================== */}

        <Footer />

        {/* ===================================================
            HOME-PAGE-ONLY WHATSAPP BUTTON

            Mounted here so it stays fixed while the user
            scrolls through the entire homepage.
            =================================================== */}

        <WhatsAppButton />
      </div>
    </HomeAccessGate>
  );
}

export default Home;