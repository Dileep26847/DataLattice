import React from "react";
import { motion } from "framer-motion";

/* =========================================================
   DATALATTICE — SUCCESS STORIES / LEARNER TESTIMONIALS
   UI ONLY
   ========================================================= */

const stories = [
  {
    quote:
      "The hands-on projects and mentorship gave me the confidence to transition into a data analytics role. The structured learning path made all the difference.",
    name: "Sarah Jenkins",
    program: "Data Analytics Program",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
  },
  {
    quote:
      "I built a real-world portfolio that immediately caught the attention of recruiters. The mock interviews polished my tech presence completely.",
    name: "David Chen",
    program: "Full Stack Development Program",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
  },
  {
    quote:
      "Transitioning from academia to industry was challenging, but the mentors here guided me step-by-step through machine learning applications.",
    name: "Dr. Amanda Ross",
    program: "Data Science & AI Program",
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=200&q=80",
  },
];

function SuccessStories() {
  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-7 lg:px-8">

        {/* =================================================
            HEADER
        ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 18,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.55,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          className="mx-auto max-w-3xl text-center"
        >
          {/* Badge */}

          <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5">
            <span className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#1769F5]">
              Our Learners
            </span>
          </div>

          {/* Heading */}

          <h2 className="mt-5 text-4xl font-bold leading-[1.08] tracking-[-0.04em] text-[#081733] sm:text-5xl lg:text-[50px]">
            What Our Learners Say
          </h2>

          {/* Description */}

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base sm:leading-7">
            Hear from learners who have transformed their careers through
            DATALATTICE programs.
          </p>
        </motion.div>

        {/* =================================================
            TESTIMONIAL CARDS
        ================================================= */}

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {stories.map((story, index) => (
            <StoryCard
              key={story.name}
              story={story}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   STORY CARD
   ========================================================= */

function StoryCard({ story, index }) {
  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 22,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      whileHover={{
        y: -4,
      }}
      className="
        flex
        min-h-[288px]
        flex-col
        rounded-[20px]
        border
        border-slate-200
        bg-white
        px-7
        py-7
        shadow-[0_12px_30px_rgba(10,24,50,0.06)]
        transition-shadow
        duration-300
        hover:shadow-[0_18px_40px_rgba(10,24,50,0.09)]
        sm:px-7
        sm:py-7
      "
    >
      {/* =================================================
          QUOTE ICON
      ================================================= */}

      <div className="flex h-[38px] w-[38px] items-center justify-center rounded-[10px] bg-[#EEF5FF]">
        <span className="text-[25px] font-bold leading-none text-[#1769F5]">
          ”
        </span>
      </div>

      {/* =================================================
          QUOTE
      ================================================= */}

      <p className="mt-5 text-[13px] font-medium leading-[1.65] text-[#243550] sm:text-[13.5px]">
        “{story.quote}”
      </p>

      {/* =================================================
          DIVIDER
      ================================================= */}

      <div className="mt-auto pt-7">
        <div className="h-px w-full bg-slate-200" />

        {/* =================================================
            LEARNER INFO
        ================================================= */}

        <div className="mt-5 flex items-center gap-3">
          <img
            src={story.image}
            alt={story.name}
            className="
              h-10
              w-10
              shrink-0
              rounded-full
              object-cover
              ring-1
              ring-slate-200
            "
          />

          <div className="min-w-0">
            <h3 className="truncate text-[12px] font-bold text-[#172641]">
              {story.name}
            </h3>

            <p className="mt-0.5 text-[10px] font-medium text-slate-400">
              {story.program}
            </p>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default SuccessStories;