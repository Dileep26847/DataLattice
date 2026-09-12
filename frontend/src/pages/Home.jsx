import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import Hero from "../components/landing/Hero";
import Stats from "../components/landing/Stats";
import WhyDataWave from "../components/landing/WhyDataWave";
import LearningJourney from "../components/landing/LearningJourney";
import Mentors from "../components/landing/Mentors";
import SuccessStories from "../components/landing/SuccessStories";
import FAQ from "../components/landing/FAQ";
import CTA from "../components/landing/CTA";

import FeaturedCourses from "../components/FeaturedCourses";


function Home() {

  return (

    <div
      className="
        min-h-screen
        overflow-x-hidden
        bg-white
      "
    >

      <Navbar />


      <main>

        {/* ==================================================
            HERO
        ================================================== */}

        <div
          id="home"
          className="scroll-mt-24"
        >

          <Hero />

        </div>


        {/* ==================================================
            LEARNING SIGNALS
        ================================================== */}

        <Stats />


        {/* ==================================================
            PROGRAMS
        ================================================== */}

        <div
          id="courses"
          className="scroll-mt-24"
        >

          <FeaturedCourses />

        </div>


        {/* ==================================================
            WHY DATALATTICE
        ================================================== */}

        <div
          id="why-datalattice"
          className="scroll-mt-24"
        >

          <WhyDataWave />

        </div>


        {/* ==================================================
            LEARNING JOURNEY
        ================================================== */}

        <div
          id="programs"
          className="scroll-mt-24"
        >

          <LearningJourney />

        </div>


        {/* ==================================================
            MENTORS
        ================================================== */}

        <div
          id="mentors"
          className="scroll-mt-24"
        >

          <Mentors />

        </div>


        {/* ==================================================
            LEARNING OUTCOMES
        ================================================== */}

        <div
          id="success-stories"
          className="scroll-mt-24"
        >

          <SuccessStories />

        </div>


        {/* ==================================================
            FAQ
        ================================================== */}

        <div
          id="faq-section"
          className="scroll-mt-24"
        >

          <FAQ />

        </div>


        {/* ==================================================
            FINAL CTA
        ================================================== */}

        <CTA />

      </main>


      <Footer />

    </div>

  );

}


export default Home;