import {
  useEffect,
  useState,
} from "react";

import {
  FaSearch,
  FaBookOpen,
  FaArrowRight,
} from "react-icons/fa";

import {
  motion,
} from "framer-motion";

import CourseCard from "../components/CourseCard";

import {
  getAllCourses,
  searchCourses,
} from "../services/courseService";


// ============================================================
// DATALATTICE ACTIVE COURSE CATALOGUE
// ============================================================

const ACTIVE_COURSES = [
  "data science",
  "data analytics",
];


// ============================================================
// CHECK WHETHER COURSE BELONGS TO ACTIVE CATALOGUE
// ============================================================

const isActiveCourse = (course) => {

  if (!course?.title) {
    return false;
  }

  const title =
    String(course.title)
      .trim()
      .toLowerCase();

  return ACTIVE_COURSES.some(
    (activeCourse) =>
      title === activeCourse
  );

};


// ============================================================
// FILTER ONLY ACTIVE DATALATTICE COURSES
// ============================================================

const filterActiveCourses = (courses) => {

  if (!Array.isArray(courses)) {
    return [];
  }

  return courses.filter(
    isActiveCourse
  );

};


function Courses() {

  const [courses, setCourses] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [searching, setSearching] =
    useState(false);


  // ==========================================================
  // LOAD COURSES
  // ==========================================================

  const fetchCourses = async () => {

    try {

      setLoading(true);

      const data =
        await getAllCourses();

      const activeCourses =
        filterActiveCourses(
          data?.courses
        );

      setCourses(
        activeCourses
      );

    }

    catch (error) {

      console.error(
        "FETCH COURSES ERROR:",
        error
      );

      setCourses([]);

    }

    finally {

      setLoading(false);

    }

  };


  // ==========================================================
  // INITIAL LOAD
  // ==========================================================

  useEffect(() => {

    fetchCourses();

  }, []);


  // ==========================================================
  // SEARCH
  // ==========================================================

  useEffect(() => {

    const keyword =
      search.trim();


    // Restore complete active catalogue
    // when search is empty.

    if (!keyword) {
      return;
    }


    const timer =
      setTimeout(
        async () => {

          try {

            setSearching(true);

            const data =
              await searchCourses(
                keyword
              );

            const activeCourses =
              filterActiveCourses(
                data?.courses
              );

            setCourses(
              activeCourses
            );

          }

          catch (error) {

            console.error(
              "SEARCH COURSES ERROR:",
              error
            );

            setCourses([]);

          }

          finally {

            setSearching(false);

          }

        },
        400
      );


    return () =>
      clearTimeout(timer);

  }, [search]);


  // ==========================================================
  // HANDLE SEARCH CHANGE
  // ==========================================================

  const handleSearchChange =
    (event) => {

      const value =
        event.target.value;

      setSearch(value);


      // Restore only the two active
      // DataLattice programs.

      if (!value.trim()) {

        fetchCourses();

      }

    };


  // ==========================================================
  // LOADING
  // ==========================================================

  if (loading) {

    return (

      <div
        className="
          min-h-screen
          bg-slate-50
          flex
          items-center
          justify-center
        "
      >

        <div className="text-center">

          <div
            className="
              mx-auto
              w-12
              h-12
              rounded-full
              border-4
              border-slate-200
              border-t-indigo-600
              animate-spin
            "
          />

          <p
            className="
              mt-5
              text-slate-500
              font-medium
            "
          >
            Loading courses...
          </p>

        </div>

      </div>

    );

  }


  // ==========================================================
  // UI
  // ==========================================================

  return (

    <div
      className="
        min-h-screen
        bg-slate-50
      "
    >


      {/* ======================================================
          HERO
      ====================================================== */}

      <section
        className="
          relative
          overflow-hidden
          bg-slate-950
          text-white
        "
      >

        {/* Glow */}

        <div
          className="
            absolute
            -top-40
            -left-40
            w-96
            h-96
            rounded-full
            bg-indigo-600/30
            blur-3xl
          "
        />

        <div
          className="
            absolute
            -bottom-40
            -right-40
            w-96
            h-96
            rounded-full
            bg-purple-600/30
            blur-3xl
          "
        />


        <div
          className="
            relative
            max-w-7xl
            mx-auto
            px-6
            lg:px-10
            py-24
            lg:py-28
          "
        >

          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
            }}
            className="max-w-3xl"
          >

            <div
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-white/10
                bg-white/5
                px-4
                py-2
                text-sm
                text-indigo-200
              "
            >

              <FaBookOpen />

              Data Lattice Learning

            </div>


            <h1
              className="
                mt-7
                text-5xl
                lg:text-7xl
                font-black
                tracking-tight
              "
            >

              Build skills.
              <br />

              <span
                className="
                  text-indigo-400
                "
              >
                Build your career.
              </span>

            </h1>


            <p
              className="
                mt-6
                max-w-2xl
                text-lg
                lg:text-xl
                leading-8
                text-slate-300
              "
            >

              Choose from our focused career
              programs in Data Science and
              Data Analytics, designed around
              practical learning and real-world
              projects.

            </p>


            {/* SEARCH */}

            <div
              className="
                mt-10
                max-w-2xl
                relative
              "
            >

              <FaSearch
                className="
                  absolute
                  left-5
                  top-1/2
                  -translate-y-1/2
                  text-slate-400
                "
              />


              <input
                type="text"
                value={search}
                onChange={
                  handleSearchChange
                }
                placeholder="
                  Search Data Science or Data Analytics...
                "
                className="
                  w-full
                  rounded-2xl
                  border
                  border-white/10
                  bg-white
                  px-14
                  py-5
                  text-slate-900
                  shadow-2xl
                  outline-none
                  transition
                  placeholder:text-slate-400
                  focus:ring-4
                  focus:ring-indigo-400/20
                "
              />


              {searching && (

                <div
                  className="
                    absolute
                    right-5
                    top-1/2
                    -translate-y-1/2
                    w-5
                    h-5
                    rounded-full
                    border-2
                    border-slate-300
                    border-t-indigo-600
                    animate-spin
                  "
                />

              )}

            </div>

          </motion.div>

        </div>

      </section>


      {/* ======================================================
          COURSE SECTION
      ====================================================== */}

      <section
        className="
          max-w-7xl
          mx-auto
          px-6
          lg:px-10
          py-20
        "
      >


        {/* HEADER */}

        <div
          className="
            flex
            flex-col
            sm:flex-row
            sm:items-end
            sm:justify-between
            gap-5
            mb-10
          "
        >

          <div>

            <p
              className="
                text-sm
                font-bold
                uppercase
                tracking-widest
                text-indigo-600
              "
            >
              Explore
            </p>


            <h2
              className="
                mt-2
                text-4xl
                lg:text-5xl
                font-black
                tracking-tight
                text-slate-950
              "
            >
              Our Programs
            </h2>


            <p
              className="
                mt-3
                text-slate-500
              "
            >
              Two focused learning paths.
              One goal — building career-ready
              data professionals.
            </p>

          </div>


          <div
            className="
              inline-flex
              items-center
              gap-2
              self-start
              rounded-full
              bg-indigo-50
              px-5
              py-3
              font-bold
              text-indigo-700
            "
          >

            {courses.length}

            <span
              className="
                font-medium
              "
            >
              {courses.length === 1
                ? "Program"
                : "Programs"
              }
            </span>

          </div>

        </div>


        {/* ====================================================
            NO COURSES
        ==================================================== */}

        {courses.length === 0 ? (

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="
              rounded-3xl
              border
              border-slate-200
              bg-white
              px-6
              py-24
              text-center
              shadow-sm
            "
          >

            <div
              className="
                mx-auto
                flex
                h-16
                w-16
                items-center
                justify-center
                rounded-2xl
                bg-slate-100
                text-slate-400
              "
            >

              <FaBookOpen size={25} />

            </div>


            <h3
              className="
                mt-6
                text-2xl
                font-bold
                text-slate-900
              "
            >

              {search
                ? "No matching programs"
                : "Programs currently unavailable"
              }

            </h3>


            <p
              className="
                mt-3
                text-slate-500
              "
            >

              {search
                ? "Try searching for Data Science or Data Analytics."
                : "Our programs will appear here once they are published."
              }

            </p>


            {search && (

              <button
                onClick={() => {
                  setSearch("");
                  fetchCourses();
                }}
                className="
                  mt-6
                  inline-flex
                  items-center
                  gap-2
                  font-semibold
                  text-indigo-600
                  hover:text-indigo-700
                "
              >

                Clear Search

                <FaArrowRight />

              </button>

            )}

          </motion.div>

        ) : (

          /* ==================================================
             COURSE GRID
          ================================================== */

          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 0.5,
            }}
            className="
              grid
              gap-7
              md:grid-cols-2
              xl:grid-cols-2
            "
          >

            {courses.map(
              (course, index) => (

                <motion.div
                  key={course.id}
                  initial={{
                    opacity: 0,
                    y: 25,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.45,
                    delay:
                      Math.min(
                        index * 0.05,
                        0.3
                      ),
                  }}
                >

                  <CourseCard
                    course={course}
                  />

                </motion.div>

              )
            )}

          </motion.div>

        )}

      </section>

    </div>

  );

}


export default Courses;