import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import Hero from "../components/landing/Hero";
import Stats from "../components/landing/Stats";
import WhyDataWave from "../components/landing/WhyDataWave";
import LearningJourney from "../components/landing/LearningJourney";
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

        <Hero />


        <Stats />


        <div
          id="courses"
          className="scroll-mt-24"
        >

          <FeaturedCourses />

        </div>


        <div
          id="why-Data Lattice"
          className="scroll-mt-24"
        >

          <WhyDataWave />

        </div>


        <div
          id="programs"
          className="scroll-mt-24"
        >

          <LearningJourney />

        </div>


        <div
          id="success"
          className="scroll-mt-24"
        >

          <SuccessStories />

        </div>


        <div
          id="faq"
          className="scroll-mt-24"
        >

          <FAQ />

        </div>


        <CTA />

      </main>


      <Footer />

    </div>

  );

}


export default Home;