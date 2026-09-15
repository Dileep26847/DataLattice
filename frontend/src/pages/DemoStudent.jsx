import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import {
  FaArrowRight,
  FaAward,
  FaBolt,
  FaBookOpen,
  FaBriefcase,
  FaCalendarCheck,
  FaCheck,
  FaChevronDown,
  FaCirclePlay,
  FaClock,
  FaCode,
  FaDatabase,
  FaFileLines,
  FaGraduationCap,
  FaLaptopCode,
  FaLayerGroup,
  FaLock,
  FaPlay,
  FaRobot,
  FaStar,
  FaUsers,
} from "react-icons/fa6";

/* =========================================================
   DEMO CURRICULUM
========================================================= */

const dataScienceModules = [
  {
    number: "01",
    title: "Python for Data Science",
    description:
      "Build a strong programming foundation with Python, functions, collections and data handling.",
    duration: "4 Weeks",
  },
  {
    number: "02",
    title: "NumPy & Pandas",
    description:
      "Work with real datasets using NumPy, Pandas and efficient data manipulation techniques.",
    duration: "3 Weeks",
  },
  {
    number: "03",
    title: "Statistics & Probability",
    description:
      "Understand descriptive statistics, probability, distributions, hypothesis testing and inference.",
    duration: "4 Weeks",
  },
  {
    number: "04",
    title: "SQL & Databases",
    description:
      "Master SQL queries, joins, aggregations, subqueries and analytical database workflows.",
    duration: "4 Weeks",
  },
  {
    number: "05",
    title: "Exploratory Data Analysis",
    description:
      "Discover patterns, trends and relationships through structured exploratory analysis.",
    duration: "3 Weeks",
  },
  {
    number: "06",
    title: "Data Visualization",
    description:
      "Create meaningful visual stories using Matplotlib, Seaborn and business dashboards.",
    duration: "3 Weeks",
  },
  {
    number: "07",
    title: "Machine Learning",
    description:
      "Learn supervised and unsupervised machine learning algorithms through practical projects.",
    duration: "6 Weeks",
  },
  {
    number: "08",
    title: "Advanced Machine Learning",
    description:
      "Explore ensemble methods, model optimization, feature engineering and evaluation.",
    duration: "4 Weeks",
  },
  {
    number: "09",
    title: "Deep Learning",
    description:
      "Understand neural networks, deep learning workflows and modern model architectures.",
    duration: "4 Weeks",
  },
  {
    number: "10",
    title: "NLP & Generative AI",
    description:
      "Explore NLP, LLMs, prompt engineering, embeddings and practical GenAI applications.",
    duration: "5 Weeks",
  },
  {
    number: "11",
    title: "Deployment & MLOps",
    description:
      "Learn how machine learning solutions are prepared and deployed for real-world usage.",
    duration: "3 Weeks",
  },
  {
    number: "12",
    title: "Industry Capstone",
    description:
      "Build an end-to-end portfolio project combining the complete data science workflow.",
    duration: "6 Weeks",
  },
];

const dataAnalyticsModules = [
  {
    number: "01",
    title: "Excel for Analytics",
    description:
      "Master formulas, functions, pivot tables, lookups and analytical spreadsheet workflows.",
    duration: "3 Weeks",
  },
  {
    number: "02",
    title: "Statistics for Analytics",
    description:
      "Build practical statistical thinking for business and data-driven decision making.",
    duration: "3 Weeks",
  },
  {
    number: "03",
    title: "SQL Fundamentals",
    description:
      "Query, filter, aggregate and join business datasets using industry-standard SQL.",
    duration: "4 Weeks",
  },
  {
    number: "04",
    title: "Advanced SQL",
    description:
      "Work with CTEs, window functions, subqueries and advanced analytical queries.",
    duration: "3 Weeks",
  },
  {
    number: "05",
    title: "Python for Analytics",
    description:
      "Use Python and Pandas to automate analysis and work efficiently with datasets.",
    duration: "4 Weeks",
  },
  {
    number: "06",
    title: "Data Cleaning",
    description:
      "Prepare messy real-world data through cleaning, transformation and validation.",
    duration: "3 Weeks",
  },
  {
    number: "07",
    title: "Data Visualization",
    description:
      "Turn complex datasets into clear visual insights and decision-ready reports.",
    duration: "3 Weeks",
  },
  {
    number: "08",
    title: "Power BI",
    description:
      "Build interactive dashboards, reports and business intelligence solutions.",
    duration: "5 Weeks",
  },
  {
    number: "09",
    title: "Business Analytics",
    description:
      "Connect data analysis with KPIs, business questions and strategic decisions.",
    duration: "4 Weeks",
  },
  {
    number: "10",
    title: "Advanced Analytics",
    description:
      "Explore forecasting, segmentation, analytical frameworks and advanced reporting.",
    duration: "4 Weeks",
  },
  {
    number: "11",
    title: "Case Studies",
    description:
      "Solve realistic business problems across sales, marketing, finance and operations.",
    duration: "4 Weeks",
  },
  {
    number: "12",
    title: "Industry Capstone",
    description:
      "Create a complete analytics project suitable for your portfolio and interviews.",
    duration: "5 Weeks",
  },
];

/* =========================================================
   DEMO AVAILABLE COURSES
   ONLY THESE TWO COURSES ARE SHOWN ON THE DEMO PAGE.
========================================================= */

const availableCourses = [
  {
    id: "data-science",
    title: "Data Science",
    description:
      "Master Python, statistics, SQL, machine learning, AI and real-world data science projects.",
    category: "Data Science",
    duration: "10–12 Months",
    level: "Beginner to Advanced",
    icon: FaRobot,
    accent: "#1463FF",
    skills: [
      "Python",
      "Statistics",
      "SQL",
      "Machine Learning",
      "Deep Learning",
      "Generative AI",
    ],
  },
  {
    id: "data-analytics",
    title: "Data Analytics",
    description:
      "Learn Excel, SQL, Python, Power BI and business analytics through practical projects.",
    category: "Data Analytics",
    duration: "6–8 Months",
    level: "Beginner to Advanced",
    icon: FaLayerGroup,
    accent: "#06B6D4",
    skills: [
      "Excel",
      "SQL",
      "Python",
      "Power BI",
      "Data Visualization",
      "Business Analytics",
    ],
  },
];

/* =========================================================
   DEMO VIDEOS
========================================================= */

const demoVideos = [
  {
    title: "Introduction to Data Science",
    category: "Data Science",
    duration: "12:42",
    youtubeId: "u2zsY-2uZiE",
    description:
      "Understand the data science workflow and how modern teams turn data into decisions.",
  },
  {
    title: "Python for Data Science",
    category: "Python",
    duration: "18:25",
    youtubeId: "JDcZBzb46ts",
    description:
      "Get an introduction to Python concepts used throughout practical data science.",
  },
  {
    title: "Analytics Learning Preview",
    category: "Data Analytics",
    duration: "15:10",
    youtubeId: "u2zsY-2uZiE",
    description:
      "Explore how analytical thinking connects data, dashboards and business decisions.",
  },
];

/* =========================================================
   DEMO MENTORS
========================================================= */

const mentors = [
  {
    name: "Arjun Mehta",
    role: "Senior Data Scientist",
    company: "Industry Mentor",
    experience: "9+ Years",
    initials: "AM",
    expertise: "Machine Learning • Python • AI",
  },
  {
    name: "Priya Sharma",
    role: "Analytics Lead",
    company: "Industry Mentor",
    experience: "8+ Years",
    initials: "PS",
    expertise: "Power BI • SQL • Business Analytics",
  },
  {
    name: "Rahul Verma",
    role: "ML Engineer",
    company: "Industry Mentor",
    experience: "7+ Years",
    initials: "RV",
    expertise: "Deep Learning • NLP • MLOps",
  },
  {
    name: "Ananya Rao",
    role: "Data Analytics Manager",
    company: "Industry Mentor",
    experience: "10+ Years",
    initials: "AR",
    expertise: "BI • Strategy • Data Storytelling",
  },
];

/* =========================================================
   DEMO ASSIGNMENTS
========================================================= */

const assignments = [
  {
    title: "Customer Churn Analysis",
    type: "Data Science",
    status: "In Progress",
    due: "Friday",
    progress: 68,
  },
  {
    title: "Power BI Sales Dashboard",
    type: "Data Analytics",
    status: "Upcoming",
    due: "Monday",
    progress: 20,
  },
  {
    title: "SQL Business Case Study",
    type: "SQL",
    status: "Completed",
    due: "Completed",
    progress: 100,
  },
];

/* =========================================================
   DEMO PROJECTS
========================================================= */

const projects = [
  {
    title: "Customer Churn Prediction",
    category: "Machine Learning",
    description:
      "Build a complete ML workflow to identify customers at risk of leaving.",
    skills: ["Python", "Pandas", "Scikit-learn"],
  },
  {
    title: "Executive Sales Dashboard",
    category: "Business Intelligence",
    description:
      "Create an interactive business dashboard for monitoring sales performance.",
    skills: ["SQL", "Power BI", "DAX"],
  },
  {
    title: "E-commerce Analytics",
    category: "Data Analytics",
    description:
      "Analyze customer behavior, revenue trends and product performance.",
    skills: ["Python", "SQL", "Visualization"],
  },
];

/* =========================================================
   NAVBAR
========================================================= */

function DemoNavbar() {
  return (
    <header className="fixed left-0 right-0 top-0 z-[100] px-3 pt-3 sm:px-5 sm:pt-4 lg:px-8">
      <div className="mx-auto flex h-[68px] max-w-[1420px] items-center justify-between rounded-[22px] border border-white/70 bg-white/65 px-4 shadow-[0_12px_40px_rgba(11,27,58,0.12)] backdrop-blur-2xl sm:h-[74px] sm:px-5 lg:px-6">
        <Link
          to="/"
          className="flex items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1463FF] shadow-[0_8px_20px_rgba(20,99,255,0.22)]">
            <span className="text-lg font-black text-white">
              D
            </span>
          </div>

          <div className="hidden sm:block">
            <div className="text-[15px] font-black tracking-tight text-[#0B1B3A]">
              DataLattice
            </div>

            <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#64748B]">
              Learning Preview
            </div>
          </div>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden items-center gap-2 rounded-full border border-[#E6EDF7] bg-white/70 px-3 py-2 text-xs font-semibold text-[#64748B] sm:flex">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Demo Access
          </div>

          <Link
            to="/enroll/payment"
            className="inline-flex items-center gap-2 rounded-xl bg-[#1463FF] px-4 py-2.5 text-xs font-bold text-white shadow-[0_8px_20px_rgba(20,99,255,0.22)] transition hover:-translate-y-0.5 hover:bg-[#0f56e5] sm:px-5 sm:text-sm"
          >
            Join Now
            <FaArrowRight size={11} />
          </Link>
        </div>
      </div>
    </header>
  );
}

/* =========================================================
   PROGRESS RING
========================================================= */

function ProgressRing({
  value = 0,
  size = 86,
  stroke = 8,
}) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset =
    circumference -
    (value / 100) * circumference;

  return (
    <div
      className="relative shrink-0"
      style={{
        width: size,
        height: size,
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#EAF2FF"
          strokeWidth={stroke}
        />

        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#1463FF"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>

      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-sm font-black text-[#0B1B3A]">
          {value}%
        </span>
      </div>
    </div>
  );
}

/* =========================================================
   CURRICULUM CARD
========================================================= */

function CurriculumCard({
  title,
  description,
  modules,
  active,
  onClick,
  icon: Icon,
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ y: -3 }}
      className={`w-full rounded-[24px] border p-5 text-left transition sm:p-6 ${
        active
          ? "border-[#1463FF] bg-[#F5F9FF] shadow-[0_16px_40px_rgba(20,99,255,0.10)]"
          : "border-[#E6EDF7] bg-white hover:border-[#BFD2F7] hover:shadow-[0_16px_35px_rgba(11,27,58,0.07)]"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
              active
                ? "bg-[#1463FF] text-white"
                : "bg-[#EAF2FF] text-[#1463FF]"
            }`}
          >
            <Icon size={20} />
          </div>

          <div>
            <h3 className="text-lg font-black text-[#0B1B3A]">
              {title}
            </h3>

            <p className="mt-1 text-xs font-semibold text-[#64748B]">
              {modules.length} modules
            </p>
          </div>
        </div>

        {active && (
          <span className="rounded-full bg-[#1463FF] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
            Active
          </span>
        )}
      </div>

      <p className="mt-5 text-sm leading-6 text-[#64748B]">
        {description}
      </p>

      <div className="mt-5 flex items-center justify-between border-t border-[#E6EDF7] pt-4">
        <span className="text-xs font-bold text-[#0B1B3A]">
          Career-focused curriculum
        </span>

        <FaArrowRight
          size={12}
          className={
            active
              ? "text-[#1463FF]"
              : "text-[#94A3B8]"
          }
        />
      </div>
    </motion.button>
  );
}

/* =========================================================
   MAIN PAGE
========================================================= */

export default function DemoStudent() {
  const [selectedProgram, setSelectedProgram] =
    useState("Data Analytics");

  const [activeVideo, setActiveVideo] =
    useState(demoVideos[0]);

  const [showAllModules, setShowAllModules] =
    useState(false);

  const selectedModules = useMemo(() => {
    return selectedProgram === "Data Science"
      ? dataScienceModules
      : dataAnalyticsModules;
  }, [selectedProgram]);

  const visibleModules = showAllModules
    ? selectedModules
    : selectedModules.slice(0, 6);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#F5F9FF] text-[#111827]">
      <DemoNavbar />

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative overflow-hidden bg-white pt-32 sm:pt-36 lg:pt-40">
        <div className="mx-auto max-w-[1420px] px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24">
          <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
            <motion.div
              initial={{
                opacity: 0,
                y: 24,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.55,
              }}
            >
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#D9E6FF] bg-[#F5F9FF] px-3.5 py-2 text-[10px] font-black uppercase tracking-[0.14em] text-[#1463FF] sm:text-xs">
                <FaBolt size={10} />
                Student Learning Preview
              </div>

              <h1 className="max-w-4xl text-4xl font-black leading-[1.03] tracking-[-0.04em] text-[#0B1B3A] sm:text-5xl lg:text-6xl xl:text-[70px]">
                Your journey from{" "}
                <span className="text-[#1463FF]">
                  learning
                </span>{" "}
                to career starts here.
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-7 text-[#64748B] sm:text-lg sm:leading-8">
                Explore how the DataLattice student
                experience brings structured learning,
                live classes, projects, mentors,
                assessments and career support into one
                connected learning environment.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/enroll/payment"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#1463FF] px-6 py-3.5 text-sm font-black text-white shadow-[0_12px_30px_rgba(20,99,255,0.22)] transition hover:-translate-y-0.5 hover:bg-[#0f56e5]"
                >
                  Start Your Journey
                  <FaArrowRight size={12} />
                </Link>

                <a
                  href="#curriculum"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#DCE5F3] bg-white px-6 py-3.5 text-sm font-black text-[#0B1B3A] transition hover:border-[#1463FF] hover:text-[#1463FF]"
                >
                  Explore Curriculum
                </a>
              </div>

              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
                {[
                  "Live learning",
                  "Real projects",
                  "Industry mentors",
                  "Career support",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 text-xs font-bold text-[#64748B]"
                  >
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#EAF2FF] text-[#1463FF]">
                      <FaCheck size={9} />
                    </span>
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{
                opacity: 0,
                x: 30,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.6,
                delay: 0.1,
              }}
              className="relative"
            >
              <div className="rounded-[30px] border border-[#E6EDF7] bg-white p-4 shadow-[0_25px_70px_rgba(11,27,58,0.10)] sm:p-5">
                <div className="rounded-[24px] bg-[#0B1B3A] p-5 text-white sm:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/50">
                        Student Dashboard
                      </p>

                      <h2 className="mt-2 text-xl font-black sm:text-2xl">
                        Welcome back 👋
                      </h2>
                    </div>

                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10">
                      <FaGraduationCap size={18} />
                    </div>
                  </div>

                  <div className="mt-7 rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-xs font-bold text-white/50">
                          Current Learning Path
                        </p>

                        <h3 className="mt-1 text-lg font-black">
                          Data Analytics
                        </h3>

                        <p className="mt-1 text-xs text-white/50">
                          Module 08 of 12
                        </p>
                      </div>

                      <ProgressRing
                        value={82}
                        size={76}
                        stroke={7}
                      />
                    </div>

                    <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "82%" }}
                        transition={{
                          duration: 1,
                          delay: 0.5,
                        }}
                        className="h-full rounded-full bg-[#1463FF]"
                      />
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                      <FaCirclePlay
                        className="text-[#06B6D4]"
                        size={15}
                      />

                      <p className="mt-3 text-xl font-black">
                        24
                      </p>

                      <p className="text-[10px] font-semibold text-white/50">
                        Lessons watched
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                      <FaCode
                        className="text-[#1463FF]"
                        size={15}
                      />

                      <p className="mt-3 text-xl font-black">
                        08
                      </p>

                      <p className="text-[10px] font-semibold text-white/50">
                        Projects completed
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-5 -left-3 hidden rounded-2xl border border-[#E6EDF7] bg-white px-4 py-3 shadow-[0_16px_35px_rgba(11,27,58,0.12)] sm:flex sm:items-center sm:gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EAF2FF] text-[#1463FF]">
                  <FaAward size={15} />
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wide text-[#94A3B8]">
                    Next milestone
                  </p>

                  <p className="text-xs font-black text-[#0B1B3A]">
                    Certificate Ready
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =====================================================
          STATS
      ===================================================== */}

      <section className="border-y border-[#E6EDF7] bg-white">
        <div className="mx-auto grid max-w-[1420px] grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: FaBookOpen,
              value: "24+",
              label: "Learning modules",
            },
            {
              icon: FaUsers,
              value: "15+",
              label: "Industry mentors",
            },
            {
              icon: FaLaptopCode,
              value: "20+",
              label: "Practical projects",
            },
            {
              icon: FaBriefcase,
              value: "360°",
              label: "Career support",
            },
          ].map((stat, index) => {
            const Icon = stat.icon;

            return (
              <motion.div
                key={stat.label}
                initial={{
                  opacity: 0,
                  y: 18,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.08,
                }}
                className={`flex items-center gap-3 px-5 py-7 sm:px-8 sm:py-9 ${
                  index !== 0
                    ? "border-l border-[#E6EDF7]"
                    : ""
                } ${
                  index >= 2
                    ? "border-t border-[#E6EDF7] lg:border-t-0"
                    : ""
                }`}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F5F9FF] text-[#1463FF]">
                  <Icon size={16} />
                </div>

                <div>
                  <p className="text-xl font-black text-[#0B1B3A] sm:text-2xl">
                    {stat.value}
                  </p>

                  <p className="mt-0.5 text-[10px] font-bold text-[#64748B] sm:text-xs">
                    {stat.label}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* =====================================================
          AVAILABLE COURSES
          ONLY DATA SCIENCE + DATA ANALYTICS
      ===================================================== */}

      <section
        id="available-courses"
        className="bg-[#F5F9FF] py-16 sm:py-20 lg:py-24"
      >
        <div className="mx-auto max-w-[1420px] px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex rounded-full border border-[#D9E6FF] bg-white px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.14em] text-[#1463FF]">
              Available Courses
            </span>

            <h2 className="mt-4 text-3xl font-black tracking-[-0.03em] text-[#0B1B3A] sm:text-4xl lg:text-5xl">
              Choose your career path.
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#64748B] sm:text-base">
              The DataLattice learning experience is
              focused on two career-ready programs built
              around practical skills, projects and
              industry requirements.
            </p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {availableCourses.map((course, index) => {
              const Icon = course.icon;

              return (
                <motion.div
                  key={course.id}
                  initial={{
                    opacity: 0,
                    y: 24,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    margin: "-80px",
                  }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                  }}
                  whileHover={{
                    y: -5,
                  }}
                  className="group rounded-[28px] border border-[#E6EDF7] bg-white p-5 shadow-[0_14px_40px_rgba(11,27,58,0.05)] transition-shadow hover:shadow-[0_22px_55px_rgba(11,27,58,0.09)] sm:p-7"
                >
                  <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex items-start gap-4">
                      <div
                        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-white shadow-lg"
                        style={{
                          backgroundColor:
                            course.accent,
                        }}
                      >
                        <Icon size={23} />
                      </div>

                      <div>
                        <span className="text-[10px] font-black uppercase tracking-[0.14em] text-[#64748B]">
                          {course.category}
                        </span>

                        <h3 className="mt-1 text-2xl font-black tracking-tight text-[#0B1B3A]">
                          {course.title}
                        </h3>

                        <div className="mt-2 flex flex-wrap gap-2">
                          <span className="rounded-full bg-[#F5F9FF] px-2.5 py-1 text-[10px] font-bold text-[#64748B]">
                            {course.duration}
                          </span>

                          <span className="rounded-full bg-[#F5F9FF] px-2.5 py-1 text-[10px] font-bold text-[#64748B]">
                            {course.level}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#E6EDF7] text-[#94A3B8] transition group-hover:border-[#1463FF] group-hover:text-[#1463FF] sm:flex">
                      <FaArrowRight size={12} />
                    </div>
                  </div>

                  <p className="mt-6 max-w-2xl text-sm leading-7 text-[#64748B]">
                    {course.description}
                  </p>

                  <div className="mt-6">
                    <p className="text-xs font-black uppercase tracking-[0.12em] text-[#0B1B3A]">
                      What you will learn
                    </p>

                    <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
                      {course.skills.map(
                        (skill) => (
                          <div
                            key={skill}
                            className="flex items-center gap-2 rounded-xl border border-[#E6EDF7] bg-[#FAFCFF] px-3 py-2.5"
                          >
                            <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#EAF2FF] text-[#1463FF]">
                              <FaCheck size={7} />
                            </span>

                            <span className="text-[11px] font-bold text-[#475569]">
                              {skill}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  <div className="mt-7 border-t border-[#E6EDF7] pt-5">
                    <Link
                      to="/enroll/payment"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#0B1B3A] px-5 py-3.5 text-sm font-black text-white transition hover:bg-[#1463FF]"
                    >
                      Explore {course.title}
                      <FaArrowRight size={11} />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          LEARNING PATH SWITCHER
      ===================================================== */}

      <section
        id="curriculum"
        className="bg-white py-16 sm:py-20 lg:py-24"
      >
        <div className="mx-auto max-w-[1420px] px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-[10px] font-black uppercase tracking-[0.16em] text-[#1463FF]">
              Learning Paths
            </span>

            <h2 className="mt-3 text-3xl font-black tracking-[-0.03em] text-[#0B1B3A] sm:text-4xl">
              Learn through a structured career path.
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#64748B] sm:text-base">
              Choose the program you want to preview
              and explore how the complete curriculum
              progresses from fundamentals to industry
              projects.
            </p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            <CurriculumCard
              title="Data Science"
              description="A complete pathway covering Python, statistics, SQL, machine learning, AI and deployment."
              modules={dataScienceModules}
              active={
                selectedProgram === "Data Science"
              }
              onClick={() =>
                setSelectedProgram(
                  "Data Science"
                )
              }
              icon={FaRobot}
            />

            <CurriculumCard
              title="Data Analytics"
              description="A practical pathway covering Excel, SQL, Python, Power BI, visualization and business analytics."
              modules={dataAnalyticsModules}
              active={
                selectedProgram === "Data Analytics"
              }
              onClick={() =>
                setSelectedProgram(
                  "Data Analytics"
                )
              }
              icon={FaLayerGroup}
            />
          </div>

          <div className="mt-8 rounded-[28px] border border-[#E6EDF7] bg-[#F5F9FF] p-5 sm:p-7">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#1463FF] text-white">
                    {selectedProgram ===
                    "Data Science" ? (
                      <FaRobot size={17} />
                    ) : (
                      <FaLayerGroup size={17} />
                    )}
                  </div>

                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.14em] text-[#64748B]">
                      Selected pathway
                    </p>

                    <h3 className="text-xl font-black text-[#0B1B3A]">
                      {selectedProgram}
                    </h3>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div>
                  <p className="text-2xl font-black text-[#0B1B3A]">
                    {selectedModules.length}
                  </p>

                  <p className="text-[10px] font-bold text-[#64748B]">
                    Modules
                  </p>
                </div>

                <div className="h-9 w-px bg-[#DCE5F3]" />

                <div>
                  <p className="text-2xl font-black text-[#0B1B3A]">
                    100+
                  </p>

                  <p className="text-[10px] font-bold text-[#64748B]">
                    Learning hours
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {visibleModules.map(
              (module, index) => (
                <motion.div
                  key={module.number}
                  initial={{
                    opacity: 0,
                    y: 16,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    duration: 0.35,
                    delay: index * 0.04,
                  }}
                  className="rounded-[22px] border border-[#E6EDF7] bg-white p-5 transition hover:-translate-y-1 hover:border-[#C9D9F5] hover:shadow-[0_14px_35px_rgba(11,27,58,0.06)]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="text-xs font-black text-[#1463FF]">
                      {module.number}
                    </span>

                    <span className="flex items-center gap-1.5 text-[10px] font-bold text-[#94A3B8]">
                      <FaClock size={9} />
                      {module.duration}
                    </span>
                  </div>

                  <h4 className="mt-4 text-base font-black text-[#0B1B3A]">
                    {module.title}
                  </h4>

                  <p className="mt-2 text-xs leading-6 text-[#64748B]">
                    {module.description}
                  </p>
                </motion.div>
              )
            )}
          </div>

          {selectedModules.length > 6 && (
            <div className="mt-7 flex justify-center">
              <button
                type="button"
                onClick={() =>
                  setShowAllModules(
                    (current) => !current
                  )
                }
                className="inline-flex items-center gap-2 rounded-xl border border-[#DCE5F3] bg-white px-5 py-3 text-xs font-black text-[#0B1B3A] transition hover:border-[#1463FF] hover:text-[#1463FF]"
              >
                {showAllModules
                  ? "Show Less"
                  : `View All ${selectedModules.length} Modules`}

                <FaChevronDown
                  size={10}
                  className={`transition ${
                    showAllModules
                      ? "rotate-180"
                      : ""
                  }`}
                />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* =====================================================
          CONTINUE LEARNING
      ===================================================== */}

      <section className="bg-[#F5F9FF] py-16 sm:py-20">
        <div className="mx-auto max-w-[1420px] px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              className="rounded-[28px] border border-[#E6EDF7] bg-white p-5 shadow-[0_15px_40px_rgba(11,27,58,0.05)] sm:p-7"
            >
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-[0.15em] text-[#1463FF]">
                    Continue Learning
                  </span>

                  <h2 className="mt-2 text-2xl font-black text-[#0B1B3A]">
                    Power BI Dashboard Design
                  </h2>

                  <p className="mt-2 max-w-xl text-sm leading-6 text-[#64748B]">
                    Continue where you left off and
                    learn how to create decision-ready
                    dashboards using real business data.
                  </p>
                </div>

                <ProgressRing
                  value={82}
                  size={92}
                  stroke={8}
                />
              </div>

              <div className="mt-7 h-2 overflow-hidden rounded-full bg-[#EAF2FF]">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "82%" }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    duration: 1,
                  }}
                  className="h-full rounded-full bg-[#1463FF]"
                />
              </div>

              <div className="mt-4 flex items-center justify-between text-[10px] font-bold text-[#64748B]">
                <span>
                  Module 08 of 12
                </span>

                <span>
                  82% complete
                </span>
              </div>

              <button
                type="button"
                onClick={() =>
                  setActiveVideo(demoVideos[0])
                }
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#1463FF] px-5 py-3 text-xs font-black text-white transition hover:bg-[#0f56e5]"
              >
                <FaPlay size={9} />
                Continue Lesson
              </button>
            </motion.div>

            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              className="rounded-[28px] border border-[#E6EDF7] bg-[#0B1B3A] p-6 text-white"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
                <FaCalendarCheck size={17} />
              </div>

              <p className="mt-6 text-[10px] font-black uppercase tracking-[0.15em] text-white/50">
                Next Live Class
              </p>

              <h3 className="mt-2 text-xl font-black">
                Advanced SQL Workshop
              </h3>

              <div className="mt-5 space-y-3">
                <div className="flex items-center gap-3 text-xs font-semibold text-white/65">
                  <FaClock size={12} />
                  Tomorrow • 7:00 PM
                </div>

                <div className="flex items-center gap-3 text-xs font-semibold text-white/65">
                  <FaUsers size={12} />
                  48 students registered
                </div>
              </div>

              <button
                type="button"
                className="mt-7 w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-xs font-black text-white transition hover:bg-white/15"
              >
                View Class Details
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =====================================================
          VIDEO / LIVE LEARNING
      ===================================================== */}

      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-[1420px] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.15em] text-[#1463FF]">
                Learn by Doing
              </span>

              <h2 className="mt-3 text-3xl font-black tracking-[-0.03em] text-[#0B1B3A] sm:text-4xl">
                Video lessons & live learning.
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-[#64748B]">
                Combine self-paced video learning with
                instructor-led sessions and practical
                workshops.
              </p>
            </div>

            <div className="hidden rounded-full border border-[#E6EDF7] bg-[#F5F9FF] px-4 py-2 text-xs font-bold text-[#64748B] sm:flex sm:items-center sm:gap-2">
              <FaCirclePlay className="text-[#1463FF]" />
              Demo content
            </div>
          </div>

          <div className="mt-9 grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
            <div className="overflow-hidden rounded-[28px] border border-[#E6EDF7] bg-[#0B1B3A] shadow-[0_20px_55px_rgba(11,27,58,0.12)]">
              <div className="aspect-video">
                <iframe
                  title={activeVideo.title}
                  src={`https://www.youtube.com/embed/${activeVideo.youtubeId}`}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              <div className="p-5 sm:p-6">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-bold text-white/70">
                    {activeVideo.category}
                  </span>

                  <span className="flex items-center gap-1.5 text-[10px] font-bold text-white/45">
                    <FaClock size={8} />
                    {activeVideo.duration}
                  </span>
                </div>

                <h3 className="mt-3 text-xl font-black text-white">
                  {activeVideo.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-white/55">
                  {activeVideo.description}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {demoVideos.map((video) => (
                <button
                  type="button"
                  key={video.title}
                  onClick={() =>
                    setActiveVideo(video)
                  }
                  className={`w-full rounded-[22px] border p-4 text-left transition ${
                    activeVideo.title ===
                    video.title
                      ? "border-[#1463FF] bg-[#F5F9FF]"
                      : "border-[#E6EDF7] bg-white hover:border-[#C9D9F5]"
                  }`}
                >
                  <div className="flex gap-4">
                    <div className="relative flex h-20 w-28 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#0B1B3A]">
                      <img
                        src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                        alt={video.title}
                        className="h-full w-full object-cover opacity-70"
                      />

                      <span className="absolute flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#1463FF]">
                        <FaPlay size={9} />
                      </span>
                    </div>

                    <div className="min-w-0">
                      <span className="text-[9px] font-black uppercase tracking-[0.12em] text-[#1463FF]">
                        {video.category}
                      </span>

                      <h4 className="mt-1 line-clamp-2 text-sm font-black text-[#0B1B3A]">
                        {video.title}
                      </h4>

                      <span className="mt-2 flex items-center gap-1 text-[10px] font-bold text-[#94A3B8]">
                        <FaClock size={8} />
                        {video.duration}
                      </span>
                    </div>
                  </div>
                </button>
              ))}

              <div className="rounded-[22px] border border-dashed border-[#C9D9F5] bg-[#F5F9FF] p-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#1463FF] text-white">
                    <FaUsers size={15} />
                  </div>

                  <div>
                    <h4 className="text-sm font-black text-[#0B1B3A]">
                      Weekly mentor sessions
                    </h4>

                    <p className="mt-1 text-xs leading-5 text-[#64748B]">
                      Ask questions, review projects and
                      receive guidance directly from
                      industry mentors.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          STUDENT WORKSPACE
      ===================================================== */}

      <section className="bg-[#F5F9FF] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-[1420px] px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-[10px] font-black uppercase tracking-[0.15em] text-[#1463FF]">
              Student Workspace
            </span>

            <h2 className="mt-3 text-3xl font-black tracking-[-0.03em] text-[#0B1B3A] sm:text-4xl">
              Everything you need in one learning space.
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#64748B]">
              The student experience is designed to keep
              learning, practice, projects and career
              preparation connected.
            </p>
          </div>

          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: FaBookOpen,
                title: "Lessons",
                value: "36",
                text: "Available lessons",
              },
              {
                icon: FaFileLines,
                title: "Assignments",
                value: "12",
                text: "Practical tasks",
              },
              {
                icon: FaCode,
                title: "Projects",
                value: "08",
                text: "Portfolio projects",
              },
              {
                icon: FaAward,
                title: "Certificates",
                value: "02",
                text: "Career credentials",
              },
            ].map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  initial={{
                    opacity: 0,
                    y: 18,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.06,
                  }}
                  className="rounded-[22px] border border-[#E6EDF7] bg-white p-5 shadow-[0_10px_30px_rgba(11,27,58,0.04)]"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF2FF] text-[#1463FF]">
                    <Icon size={15} />
                  </div>

                  <p className="mt-5 text-2xl font-black text-[#0B1B3A]">
                    {item.value}
                  </p>

                  <h3 className="mt-1 text-sm font-black text-[#0B1B3A]">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-[10px] font-semibold text-[#64748B]">
                    {item.text}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          ASSIGNMENTS
      ===================================================== */}

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-[1420px] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.15em] text-[#1463FF]">
                Practice
              </span>

              <h2 className="mt-3 text-3xl font-black tracking-[-0.03em] text-[#0B1B3A] sm:text-4xl">
                Assignments that build real skills.
              </h2>
            </div>

            <p className="max-w-md text-sm leading-6 text-[#64748B]">
              Practice isn't optional. Every learning path
              includes hands-on assignments designed around
              real-world scenarios.
            </p>
          </div>

          <div className="mt-9 overflow-hidden rounded-[26px] border border-[#E6EDF7] bg-white">
            <div className="hidden grid-cols-[1.5fr_0.7fr_0.7fr_0.8fr] gap-4 border-b border-[#E6EDF7] bg-[#F5F9FF] px-5 py-4 text-[10px] font-black uppercase tracking-[0.1em] text-[#64748B] md:grid">
              <span>Assignment</span>
              <span>Type</span>
              <span>Due</span>
              <span>Progress</span>
            </div>

            {assignments.map(
              (assignment, index) => (
                <div
                  key={assignment.title}
                  className={`grid gap-4 px-5 py-5 md:grid-cols-[1.5fr_0.7fr_0.7fr_0.8fr] md:items-center ${
                    index !==
                    assignments.length - 1
                      ? "border-b border-[#E6EDF7]"
                      : ""
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EAF2FF] text-[#1463FF]">
                        <FaFileLines size={13} />
                      </div>

                      <div>
                        <h3 className="text-sm font-black text-[#0B1B3A]">
                          {assignment.title}
                        </h3>

                        <span className="mt-1 block text-[10px] font-semibold text-[#94A3B8] md:hidden">
                          {assignment.type}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="hidden text-xs font-bold text-[#64748B] md:block">
                    {assignment.type}
                  </div>

                  <div className="flex items-center justify-between md:block">
                    <span className="text-[10px] font-bold text-[#94A3B8] md:hidden">
                      Due
                    </span>

                    <span className="text-xs font-bold text-[#64748B]">
                      {assignment.due}
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <span
                        className={`rounded-full px-2.5 py-1 text-[9px] font-black ${
                          assignment.status ===
                          "Completed"
                            ? "bg-emerald-50 text-emerald-600"
                            : assignment.status ===
                                "In Progress"
                              ? "bg-[#EAF2FF] text-[#1463FF]"
                              : "bg-amber-50 text-amber-600"
                        }`}
                      >
                        {assignment.status}
                      </span>

                      <span className="text-[10px] font-black text-[#0B1B3A]">
                        {assignment.progress}%
                      </span>
                    </div>

                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#EAF2FF]">
                      <div
                        className="h-full rounded-full bg-[#1463FF]"
                        style={{
                          width: `${assignment.progress}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* =====================================================
          MENTORS
      ===================================================== */}

      <section className="bg-[#F5F9FF] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-[1420px] px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-[10px] font-black uppercase tracking-[0.15em] text-[#1463FF]">
              Industry Mentors
            </span>

            <h2 className="mt-3 text-3xl font-black tracking-[-0.03em] text-[#0B1B3A] sm:text-4xl">
              Learn from people who have done the work.
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#64748B]">
              Get practical guidance from professionals
              across data science, analytics, machine
              learning and business intelligence.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {mentors.map((mentor, index) => (
              <motion.div
                key={mentor.name}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.07,
                }}
                className="rounded-[24px] border border-[#E6EDF7] bg-white p-5 transition hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(11,27,58,0.07)]"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0B1B3A] text-sm font-black text-white">
                    {mentor.initials}
                  </div>

                  <div>
                    <h3 className="text-sm font-black text-[#0B1B3A]">
                      {mentor.name}
                    </h3>

                    <p className="mt-1 text-[10px] font-bold text-[#1463FF]">
                      {mentor.role}
                    </p>
                  </div>
                </div>

                <div className="mt-5 border-t border-[#E6EDF7] pt-4">
                  <p className="text-xs font-bold text-[#64748B]">
                    {mentor.company}
                  </p>

                  <p className="mt-2 text-[10px] font-semibold text-[#94A3B8]">
                    {mentor.experience}
                  </p>

                  <p className="mt-4 text-xs leading-5 text-[#64748B]">
                    {mentor.expertise}
                  </p>
                </div>

                <div className="mt-5 flex items-center gap-1 text-[#F59E0B]">
                  {[1, 2, 3, 4, 5].map(
                    (star) => (
                      <FaStar
                        key={star}
                        size={10}
                      />
                    )
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          PROJECT LAB
      ===================================================== */}

      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-[1420px] px-4 sm:px-6 lg:px-8">
          <div className="grid items-end gap-5 lg:grid-cols-[1fr_auto]">
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.15em] text-[#1463FF]">
                Project Lab
              </span>

              <h2 className="mt-3 text-3xl font-black tracking-[-0.03em] text-[#0B1B3A] sm:text-4xl">
                Build a portfolio that proves your skills.
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-[#64748B]">
                Projects are designed to move you beyond
                tutorials and into realistic data problems
                that can be discussed confidently in
                interviews.
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-[#E6EDF7] bg-[#F5F9FF] px-4 py-3">
              <FaCode
                size={14}
                className="text-[#1463FF]"
              />

              <span className="text-xs font-black text-[#0B1B3A]">
                Portfolio Ready
              </span>
            </div>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.08,
                }}
                className="group rounded-[26px] border border-[#E6EDF7] bg-white p-6 shadow-[0_12px_35px_rgba(11,27,58,0.04)] transition hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(11,27,58,0.08)]"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EAF2FF] text-[#1463FF]">
                    <FaDatabase size={17} />
                  </div>

                  <span className="rounded-full bg-[#F5F9FF] px-2.5 py-1 text-[9px] font-black uppercase tracking-wide text-[#64748B]">
                    Project {index + 1}
                  </span>
                </div>

                <span className="mt-6 block text-[10px] font-black uppercase tracking-[0.13em] text-[#1463FF]">
                  {project.category}
                </span>

                <h3 className="mt-2 text-xl font-black text-[#0B1B3A]">
                  {project.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-[#64748B]">
                  {project.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.skills.map(
                    (skill) => (
                      <span
                        key={skill}
                        className="rounded-lg border border-[#E6EDF7] bg-[#FAFCFF] px-2.5 py-1.5 text-[10px] font-bold text-[#64748B]"
                      >
                        {skill}
                      </span>
                    )
                  )}
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-[#E6EDF7] pt-5">
                  <span className="text-[10px] font-bold text-[#94A3B8]">
                    Guided project
                  </span>

                  <FaArrowRight
                    size={11}
                    className="text-[#1463FF] transition group-hover:translate-x-1"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          CERTIFICATE
      ===================================================== */}

      <section className="bg-[#F5F9FF] py-16 sm:py-20">
        <div className="mx-auto max-w-[1420px] px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-[30px] border border-[#E6EDF7] bg-white">
            <div className="grid lg:grid-cols-[0.75fr_1.25fr]">
              <div className="bg-[#0B1B3A] p-7 text-white sm:p-9">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
                  <FaAward size={22} />
                </div>

                <p className="mt-7 text-[10px] font-black uppercase tracking-[0.15em] text-white/45">
                  Your achievement
                </p>

                <h2 className="mt-2 text-2xl font-black sm:text-3xl">
                  Earn a career-ready certificate.
                </h2>

                <p className="mt-4 text-sm leading-6 text-white/55">
                  Complete the required learning path,
                  assessments and projects to demonstrate
                  your skills.
                </p>
              </div>

              <div className="p-7 sm:p-9">
                <div className="rounded-[24px] border border-[#DCE5F3] bg-[#FAFCFF] p-5 sm:p-7">
                  <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-[0.16em] text-[#1463FF]">
                        DataLattice
                      </p>

                      <h3 className="mt-2 text-xl font-black text-[#0B1B3A]">
                        Professional Data Analytics
                        Certificate
                      </h3>

                      <p className="mt-2 text-xs font-semibold text-[#64748B]">
                        Industry-focused learning
                        achievement
                      </p>
                    </div>

                    <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-[#1463FF]/15 bg-white text-[#1463FF]">
                      <FaAward size={22} />
                    </div>
                  </div>

                  <div className="mt-7 grid gap-3 sm:grid-cols-3">
                    {[
                      "Curriculum completed",
                      "Projects completed",
                      "Assessments passed",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-2 rounded-xl bg-white px-3 py-3"
                      >
                        <FaCheck
                          size={9}
                          className="text-[#1463FF]"
                        />

                        <span className="text-[10px] font-bold text-[#64748B]">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CAREER SUPPORT
      ===================================================== */}

      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-[1420px] px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-[10px] font-black uppercase tracking-[0.15em] text-[#1463FF]">
              Career Support
            </span>

            <h2 className="mt-3 text-3xl font-black tracking-[-0.03em] text-[#0B1B3A] sm:text-4xl">
              Learning is only the beginning.
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#64748B]">
              DataLattice connects technical learning with
              the practical preparation required to move
              toward your next career opportunity.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: FaFileLines,
                title: "Resume Building",
                text: "Create a professional resume that highlights your strongest projects and skills.",
              },
              {
                icon: FaUsers,
                title: "Mock Interviews",
                text: "Practice technical and behavioral interviews with structured mentor feedback.",
              },
              {
                icon: FaBriefcase,
                title: "Career Guidance",
                text: "Understand suitable roles, skill gaps and practical next steps.",
              },
              {
                icon: FaStar,
                title: "Profile Building",
                text: "Develop a portfolio that communicates your capabilities clearly to employers.",
              },
            ].map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.07,
                  }}
                  className="rounded-[23px] border border-[#E6EDF7] bg-white p-5 transition hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(11,27,58,0.06)]"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EAF2FF] text-[#1463FF]">
                    <Icon size={16} />
                  </div>

                  <h3 className="mt-5 text-base font-black text-[#0B1B3A]">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-xs leading-6 text-[#64748B]">
                    {item.text}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          LEARNING JOURNEY
      ===================================================== */}

      <section className="bg-[#F5F9FF] py-16 sm:py-20">
        <div className="mx-auto max-w-[1420px] px-4 sm:px-6 lg:px-8">
          <div className="grid gap-5 lg:grid-cols-5">
            {[
              {
                number: "01",
                title: "Learn",
                text: "Build your technical foundation through structured lessons.",
                icon: FaBookOpen,
              },
              {
                number: "02",
                title: "Practice",
                text: "Strengthen your understanding with assignments and quizzes.",
                icon: FaBolt,
              },
              {
                number: "03",
                title: "Build",
                text: "Apply your knowledge through realistic projects.",
                icon: FaCode,
              },
              {
                number: "04",
                title: "Mentor",
                text: "Get feedback and guidance from industry professionals.",
                icon: FaUsers,
              },
              {
                number: "05",
                title: "Grow",
                text: "Prepare for interviews and your next career opportunity.",
                icon: FaBriefcase,
              },
            ].map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.number}
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.06,
                  }}
                  className="relative rounded-[23px] border border-[#E6EDF7] bg-white p-5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-[#1463FF]">
                      {item.number}
                    </span>

                    <Icon
                      size={15}
                      className="text-[#94A3B8]"
                    />
                  </div>

                  <h3 className="mt-6 text-lg font-black text-[#0B1B3A]">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-xs leading-6 text-[#64748B]">
                    {item.text}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-[1100px] px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            className="overflow-hidden rounded-[30px] bg-[#0B1B3A] px-6 py-10 text-center sm:px-10 sm:py-14"
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-white">
              <FaGraduationCap size={22} />
            </div>

            <h2 className="mx-auto mt-6 max-w-3xl text-3xl font-black tracking-[-0.03em] text-white sm:text-4xl lg:text-5xl">
              Ready to turn your data skills into a career?
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/55 sm:text-base">
              Choose your learning path, learn from
              industry mentors, build real projects and
              start preparing for your next opportunity.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                to="/enroll/payment"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#1463FF] px-6 py-3.5 text-sm font-black text-white transition hover:bg-[#0f56e5]"
              >
                Join DataLattice
                <FaArrowRight size={11} />
              </Link>

              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/10 px-6 py-3.5 text-sm font-black text-white transition hover:bg-white/15"
              >
                Back to Home
              </Link>
            </div>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[10px] font-bold text-white/40">
              <span className="flex items-center gap-1.5">
                <FaCheck size={8} />
                Structured curriculum
              </span>

              <span className="flex items-center gap-1.5">
                <FaCheck size={8} />
                Practical projects
              </span>

              <span className="flex items-center gap-1.5">
                <FaCheck size={8} />
                Industry mentorship
              </span>

              <span className="flex items-center gap-1.5">
                <FaLock size={8} />
                Secure enrollment
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="border-t border-[#E6EDF7] bg-white py-8">
        <div className="mx-auto flex max-w-[1420px] flex-col gap-4 px-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#1463FF] text-sm font-black text-white">
              D
            </div>

            <div>
              <p className="text-sm font-black text-[#0B1B3A]">
                DataLattice
              </p>

              <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-[#94A3B8]">
                Learn • Build • Grow
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-[10px] font-bold text-[#64748B]">
            <Link
              to="/"
              className="transition hover:text-[#1463FF]"
            >
              Home
            </Link>

            <Link
              to="/enroll/payment"
              className="transition hover:text-[#1463FF]"
            >
              Join Now
            </Link>

            <span>© {new Date().getFullYear()} DataLattice</span>
          </div>
        </div>
      </footer>
    </div>
  );
}