import { useEffect } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import Hero from "../components/landing/Hero";
import TrustSection from "../components/landing/TrustSection";
import FeaturedCourses from "../components/landing/FeaturedCourses";
import LearningJourney from "../components/landing/LearningJourney";
import WhyDataWave from "../components/landing/WhyDataWave";
import RealProjects from "../components/landing/RealProjects";
import SuccessStories from "../components/landing/SuccessStories";
import Mentors from "../components/landing/Mentors";
import LearningOutcomes from "../components/landing/LearningOutcomes";
import CareerSupport from "../components/landing/CareerSupport";
import CTA from "../components/landing/CTA";
import FAQ from "../components/landing/FAQ";
import Newsletter from "../components/landing/Newsletter";

/* =========================================================
   HOME
   ========================================================= */

function Home() {
  /* =======================================================
     HASH / SECTION SCROLLING
     ======================================================= */

  useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash;

      if (!hash) {
        window.scrollTo({
          top: 0,
          behavior: "auto",
        });

        return;
      }

      const element = document.querySelector(hash);

      if (!element) {
        return;
      }

      const navbarOffset = 72;

      const elementTop =
        element.getBoundingClientRect().top +
        window.scrollY;

      window.scrollTo({
        top: Math.max(elementTop - navbarOffset, 0),
        behavior: "smooth",
      });
    };

    const timer = window.setTimeout(scrollToHash, 80);

    window.addEventListener("hashchange", scrollToHash);

    return () => {
      window.clearTimeout(timer);

      window.removeEventListener(
        "hashchange",
        scrollToHash
      );
    };
  }, []);

  return (
    <div
      id="home-page"
      className="
        min-h-screen
        w-full
        overflow-x-hidden
        bg-white
        text-[#0B1B3A]
      "
    >
      {/* =====================================================
          NAVIGATION
          ===================================================== */}

      <Navbar />

      {/* =====================================================
          MAIN CONTENT
          ===================================================== */}

      <main className="w-full">

        {/* ===================================================
            HERO
            =================================================== */}

        <Hero />

        {/* ===================================================
            TRUSTED COMPANIES / INSTITUTIONS
            =================================================== */}

        <TrustSection />

        {/* ===================================================
            FEATURED COURSES / PROGRAMS
            =================================================== */}

        <FeaturedCourses />

        {/* ===================================================
            LEARNING JOURNEY
            =================================================== */}

        <LearningJourney />

        {/* ===================================================
            WHY DATALATTICE
            =================================================== */}

        <WhyDataWave />

        {/* ===================================================
            REAL PROJECTS
            Comes below Learning Journey / Why DataLattice
            =================================================== */}

        <RealProjects />

        {/* ===================================================
            SUCCESS STORIES
            =================================================== */}

        <SuccessStories />

        {/* ===================================================
            MENTORS
            =================================================== */}

        <Mentors />

        {/* ===================================================
            LEARNING OUTCOMES
            =================================================== */}

        <LearningOutcomes />

        {/* ===================================================
            CAREER SUPPORT
            =================================================== */}

        <CareerSupport />

        {/* ===================================================
            FINAL CTA
            =================================================== */}

        <CTA />

        {/* ===================================================
            FAQ
            =================================================== */}

        <FAQ />

        {/* ===================================================
            NEWSLETTER / STAY UPDATED
            =================================================== */}

        <Newsletter />

      </main>

      {/* =====================================================
          FOOTER
          Footer lives in /components, not /landing
          ===================================================== */}

      <Footer />
    </div>
  );
}

export default Home;