import { useEffect, useState } from "react";
import toast from "react-hot-toast";



import AnalyticsStats from "../../components/admin/analytics/AnalyticsStats";

import AnalyticsStudentGrowthChart from "../../components/admin/charts/AnalyticsStudentGrowthChart";
import AnalyticsCourseDistributionChart from "../../components/admin/charts/AnalyticsCourseDistributionChart";

import { getAnalyticsOverview } from "../../services/analyticsService";

import {
  FaChartLine,
  FaUsers,
  FaBookOpen,
  FaClipboardList,
  FaGraduationCap,
} from "react-icons/fa";


// ==========================================
// ANALYTICS PAGE
// ==========================================

function Analytics() {

  // ==========================================
  // STATS
  // ==========================================

  const [stats, setStats] = useState({

    students: 0,

    courses: 0,

    assignments: 0,

    enrollments: 0,

  });


  // ==========================================
  // STUDENT GROWTH
  // ==========================================

  const [studentGrowth, setStudentGrowth] =
    useState([]);


  // ==========================================
  // COURSE DISTRIBUTION
  // ==========================================

  const [courseDistribution, setCourseDistribution] =
    useState([]);


  // ==========================================
  // LOADING
  // ==========================================

  const [loading, setLoading] =
    useState(true);


  // ==========================================
  // LOAD ANALYTICS
  // ==========================================

  useEffect(() => {

    loadAnalytics();

  }, []);


  // ==========================================
  // LOAD ANALYTICS FUNCTION
  // ==========================================

  const loadAnalytics = async () => {

    try {

      setLoading(true);


      const data =
        await getAnalyticsOverview();


      console.log(
        "ANALYTICS DATA:",
        data
      );


      // ==========================================
      // STATS
      // ==========================================

      setStats(

        data?.stats || {

          students: 0,

          courses: 0,

          assignments: 0,

          enrollments: 0,

        }

      );


      // ==========================================
      // STUDENT GROWTH
      // ==========================================

      setStudentGrowth(

        Array.isArray(
          data?.studentGrowth
        )

          ? data.studentGrowth

          : []

      );


      // ==========================================
      // COURSE DISTRIBUTION
      // ==========================================

      setCourseDistribution(

        Array.isArray(
          data?.courseDistribution
        )

          ? data.courseDistribution

          : []

      );

    }

    catch (error) {

      console.error(
        "ANALYTICS FRONTEND ERROR:",
        error
      );


      toast.error(
        "Failed to load analytics"
      );

    }

    finally {

      setLoading(false);

    }

  };


  // ==========================================
  // RENDER
  // ==========================================

  return (

    <div className="flex min-h-screen bg-slate-100">



      {/* ==========================================
          MAIN CONTENT
      ========================================== */}

      <main className="flex-1 overflow-y-auto">


        <div className="p-8 space-y-8">


        

          {/* ==========================================
              PAGE HEADER
          ========================================== */}

          <div>

            <h1
              className="
                text-4xl
                font-black
                text-slate-800
              "
            >

              Analytics & Reports

            </h1>


            <p
              className="
                text-slate-500
                mt-2
                max-w-3xl
              "
            >

              Monitor platform performance,
              student growth, enrollments,
              courses and learning activity.

            </p>

          </div>


          {/* ==========================================
              KPI STATS
          ========================================== */}

          <AnalyticsStats

            stats={stats}

            loading={loading}

          />


          {/* ==========================================
              MAIN ANALYTICS CHARTS
          ========================================== */}

          <div
            className="
              grid
              xl:grid-cols-2
              gap-8
            "
          >


            {/* ==========================================
                STUDENT GROWTH
            ========================================== */}

            <AnalyticsStudentGrowthChart

              data={studentGrowth}

            />


            {/* ==========================================
                COURSE DISTRIBUTION
            ========================================== */}

            <AnalyticsCourseDistributionChart

              data={courseDistribution}

            />

          </div>


          {/* ==========================================
              ANALYTICS SUMMARY
          ========================================== */}

          <div>

            <div className="mb-6">

              <h2
                className="
                  text-2xl
                  font-black
                  text-slate-800
                "
              >

                Platform Overview

              </h2>


              <p className="text-slate-500 mt-1">

                Quick overview of your LMS activity.

              </p>

            </div>


            <div
              className="
                grid
                sm:grid-cols-2
                xl:grid-cols-4
                gap-6
              "
            >


              {/* ======================================
                  STUDENTS
              ====================================== */}

              <div
                className="
                  bg-white
                  rounded-3xl
                  shadow-lg
                  p-7
                  border
                  border-slate-100
                "
              >

                <div className="flex items-center gap-4">

                  <div
                    className="
                      bg-cyan-100
                      text-cyan-600
                      p-4
                      rounded-2xl
                    "
                  >

                    <FaUsers
                      className="text-2xl"
                    />

                  </div>


                  <div>

                    <p className="text-sm text-slate-500">

                      Total Students

                    </p>


                    <h3
                      className="
                        text-3xl
                        font-black
                        text-slate-800
                      "
                    >

                      {loading

                        ? "..."

                        : Number(
                            stats.students || 0
                          ).toLocaleString()

                      }

                    </h3>

                  </div>

                </div>

              </div>


              {/* ======================================
                  COURSES
              ====================================== */}

              <div
                className="
                  bg-white
                  rounded-3xl
                  shadow-lg
                  p-7
                  border
                  border-slate-100
                "
              >

                <div className="flex items-center gap-4">

                  <div
                    className="
                      bg-blue-100
                      text-blue-600
                      p-4
                      rounded-2xl
                    "
                  >

                    <FaBookOpen
                      className="text-2xl"
                    />

                  </div>


                  <div>

                    <p className="text-sm text-slate-500">

                      Total Courses

                    </p>


                    <h3
                      className="
                        text-3xl
                        font-black
                        text-slate-800
                      "
                    >

                      {loading

                        ? "..."

                        : Number(
                            stats.courses || 0
                          ).toLocaleString()

                      }

                    </h3>

                  </div>

                </div>

              </div>


              {/* ======================================
                  ENROLLMENTS
              ====================================== */}

              <div
                className="
                  bg-white
                  rounded-3xl
                  shadow-lg
                  p-7
                  border
                  border-slate-100
                "
              >

                <div className="flex items-center gap-4">

                  <div
                    className="
                      bg-purple-100
                      text-purple-600
                      p-4
                      rounded-2xl
                    "
                  >

                    <FaGraduationCap
                      className="text-2xl"
                    />

                  </div>


                  <div>

                    <p className="text-sm text-slate-500">

                      Total Enrollments

                    </p>


                    <h3
                      className="
                        text-3xl
                        font-black
                        text-slate-800
                      "
                    >

                      {loading

                        ? "..."

                        : Number(
                            stats.enrollments || 0
                          ).toLocaleString()

                      }

                    </h3>

                  </div>

                </div>

              </div>


              {/* ======================================
                  ASSIGNMENTS
              ====================================== */}

              <div
                className="
                  bg-white
                  rounded-3xl
                  shadow-lg
                  p-7
                  border
                  border-slate-100
                "
              >

                <div className="flex items-center gap-4">

                  <div
                    className="
                      bg-orange-100
                      text-orange-600
                      p-4
                      rounded-2xl
                    "
                  >

                    <FaClipboardList
                      className="text-2xl"
                    />

                  </div>


                  <div>

                    <p className="text-sm text-slate-500">

                      Total Assignments

                    </p>


                    <h3
                      className="
                        text-3xl
                        font-black
                        text-slate-800
                      "
                    >

                      {loading

                        ? "..."

                        : Number(
                            stats.assignments || 0
                          ).toLocaleString()

                      }

                    </h3>

                  </div>

                </div>

              </div>

            </div>

          </div>


          {/* ==========================================
              DATA SUMMARY
          ========================================== */}

          <div
            className="
              grid
              lg:grid-cols-2
              gap-8
            "
          >


            {/* ==========================================
                STUDENT GROWTH SUMMARY
            ========================================== */}

            <div
              className="
                bg-white
                rounded-3xl
                shadow-lg
                p-8
              "
            >

              <div
                className="
                  flex
                  items-center
                  gap-4
                  mb-6
                "
              >

                <div
                  className="
                    bg-cyan-100
                    text-cyan-600
                    p-4
                    rounded-2xl
                  "
                >

                  <FaChartLine
                    className="text-2xl"
                  />

                </div>


                <div>

                  <h2
                    className="
                      text-2xl
                      font-black
                      text-slate-800
                    "
                  >

                    Student Growth Data

                  </h2>


                  <p className="text-slate-500 mt-1">

                    Registration periods available.

                  </p>

                </div>

              </div>


              {loading ? (

                <div
                  className="
                    h-32
                    flex
                    items-center
                    justify-center
                    text-slate-400
                  "
                >

                  Loading...

                </div>

              ) : (

                <div>

                  <div
                    className="
                      flex
                      items-end
                      justify-between
                      border-b
                      border-slate-100
                      pb-4
                    "
                  >

                    <div>

                      <p className="text-sm text-slate-500">

                        Reporting Periods

                      </p>


                      <p
                        className="
                          text-3xl
                          font-black
                          text-slate-800
                          mt-1
                        "
                      >

                        {studentGrowth.length}

                      </p>

                    </div>


                    <FaChartLine
                      className="
                        text-4xl
                        text-cyan-400
                      "
                    />

                  </div>


                  {studentGrowth.length === 0 ? (

                    <p
                      className="
                        text-sm
                        text-slate-400
                        mt-5
                      "
                    >

                      No student growth records
                      are available yet.

                    </p>

                  ) : (

                    <p
                      className="
                        text-sm
                        text-slate-500
                        mt-5
                      "
                    >

                      Student registration data
                      is being displayed in the
                      growth chart above.

                    </p>

                  )}

                </div>

              )}

            </div>


            {/* ==========================================
                COURSE SUMMARY
            ========================================== */}

            <div
              className="
                bg-white
                rounded-3xl
                shadow-lg
                p-8
              "
            >

              <div
                className="
                  flex
                  items-center
                  gap-4
                  mb-6
                "
              >

                <div
                  className="
                    bg-blue-100
                    text-blue-600
                    p-4
                    rounded-2xl
                  "
                >

                  <FaBookOpen
                    className="text-2xl"
                  />

                </div>


                <div>

                  <h2
                    className="
                      text-2xl
                      font-black
                      text-slate-800
                    "
                  >

                    Course Distribution

                  </h2>


                  <p className="text-slate-500 mt-1">

                    Categories currently represented.

                  </p>

                </div>

              </div>


              <div>

                <div
                  className="
                    flex
                    items-end
                    justify-between
                    border-b
                    border-slate-100
                    pb-4
                  "
                >

                  <div>

                    <p className="text-sm text-slate-500">

                      Categories

                    </p>


                    <p
                      className="
                        text-3xl
                        font-black
                        text-slate-800
                        mt-1
                      "
                    >

                      {courseDistribution.length}

                    </p>

                  </div>


                  <FaBookOpen
                    className="
                      text-4xl
                      text-blue-400
                    "
                  />

                </div>


                {courseDistribution.length === 0 ? (

                  <p
                    className="
                      text-sm
                      text-slate-400
                      mt-5
                    "
                  >

                    No course category data
                    is available yet.

                  </p>

                ) : (

                  <div className="mt-5 space-y-3">

                    {courseDistribution
                      .slice(0, 5)
                      .map((item, index) => (

                        <div
                          key={`${item.name}-${index}`}
                          className="
                            flex
                            items-center
                            justify-between
                            bg-slate-50
                            rounded-xl
                            px-4
                            py-3
                          "
                        >

                          <span
                            className="
                              text-sm
                              font-semibold
                              text-slate-700
                            "
                          >

                            {item.name ||
                              "Uncategorized"}

                          </span>


                          <span
                            className="
                              text-sm
                              font-black
                              text-slate-800
                            "
                          >

                            {Number(
                              item.value || 0
                            )}

                          </span>

                        </div>

                      ))
                    }

                  </div>

                )}

              </div>

            </div>

          </div>


          {/* ==========================================
              REPORTS
          ========================================== */}

          <div
            className="
              bg-white
              rounded-3xl
              shadow-lg
              p-8
            "
          >

            <div>

              <h2
                className="
                  text-2xl
                  font-black
                  text-slate-800
                "
              >

                Reports

              </h2>


              <p className="text-slate-500 mt-1">

                Generate and review LMS
                performance reports.

              </p>

            </div>


            <div
              className="
                grid
                md:grid-cols-3
                gap-6
                mt-8
              "
            >


              {/* ======================================
                  STUDENT REPORT
              ====================================== */}

              <div
                className="
                  border
                  border-slate-200
                  rounded-2xl
                  p-6
                  hover:shadow-md
                  transition
                "
              >

                <div
                  className="
                    bg-cyan-100
                    text-cyan-600
                    w-fit
                    p-3
                    rounded-xl
                    mb-4
                  "
                >

                  <FaUsers />

                </div>


                <h3
                  className="
                    font-bold
                    text-slate-800
                  "
                >

                  Student Report

                </h3>


                <p
                  className="
                    text-sm
                    text-slate-500
                    mt-2
                  "
                >

                  Student registration and
                  activity data.

                </p>

              </div>


              {/* ======================================
                  COURSE REPORT
              ====================================== */}

              <div
                className="
                  border
                  border-slate-200
                  rounded-2xl
                  p-6
                  hover:shadow-md
                  transition
                "
              >

                <div
                  className="
                    bg-blue-100
                    text-blue-600
                    w-fit
                    p-3
                    rounded-xl
                    mb-4
                  "
                >

                  <FaBookOpen />

                </div>


                <h3
                  className="
                    font-bold
                    text-slate-800
                  "
                >

                  Course Report

                </h3>


                <p
                  className="
                    text-sm
                    text-slate-500
                    mt-2
                  "
                >

                  Course performance and
                  enrollment data.

                </p>

              </div>


              {/* ======================================
                  ENROLLMENT REPORT
              ====================================== */}

              <div
                className="
                  border
                  border-slate-200
                  rounded-2xl
                  p-6
                  hover:shadow-md
                  transition
                "
              >

                <div
                  className="
                    bg-purple-100
                    text-purple-600
                    w-fit
                    p-3
                    rounded-xl
                    mb-4
                  "
                >

                  <FaGraduationCap />

                </div>


                <h3
                  className="
                    font-bold
                    text-slate-800
                  "
                >

                  Enrollment Report

                </h3>


                <p
                  className="
                    text-sm
                    text-slate-500
                    mt-2
                  "
                >

                  Enrollment trends and
                  statistics.

                </p>

              </div>

            </div>

          </div>

        </div>

      </main>

    </div>

  );

}


export default Analytics;