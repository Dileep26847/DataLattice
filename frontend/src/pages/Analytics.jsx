import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaBook,
  FaLayerGroup,
  FaFileAlt,
  FaClipboardList,
  FaVideo,
  FaTicketAlt,
  FaCertificate,
  FaGraduationCap,
} from "react-icons/fa";

import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminTopbar from "../../components/admin/AdminTopbar";

import { getAnalytics } from "../../services/analyticsService";


// ==========================================
// Stat Card
// ==========================================

function StatCard({
  title,
  value,
  icon: Icon,
  description,
}) {

  return (

    <div className="bg-white rounded-3xl shadow-lg p-6">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm font-semibold text-slate-500">
            {title}
          </p>

          <h3 className="text-3xl font-black text-slate-800 mt-2">
            {value ?? 0}
          </h3>

          {description && (

            <p className="text-xs text-slate-400 mt-2">
              {description}
            </p>

          )}

        </div>

        <div className="w-14 h-14 rounded-2xl bg-cyan-100 text-cyan-600 flex items-center justify-center">

          <Icon className="text-2xl" />

        </div>

      </div>

    </div>

  );

}


// ==========================================
// Analytics Page
// ==========================================

function Analytics() {

  const [analytics, setAnalytics] = useState(null);

  const [loading, setLoading] = useState(true);

  const loadAnalytics = async () => {

    try {

      setLoading(true);

      const data = await getAnalytics();

      if (!data?.success) {

        throw new Error(
          data?.message || "Failed to load analytics"
        );

      }

      setAnalytics(data);

    } catch (error) {

      console.error(
        "ANALYTICS FRONTEND ERROR:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
        "Failed to load analytics"
      );

    } finally {

      setLoading(false);

    }

  };


  useEffect(() => {

    loadAnalytics();

  }, []);


  // ==========================================
  // Loading
  // ==========================================

  if (loading) {

    return (

      <div className="flex min-h-screen bg-slate-100">

        <AdminSidebar />

        <main className="flex-1 p-8">

          <AdminTopbar />

          <div className="flex items-center justify-center min-h-[60vh]">

            <div className="text-center">

              <div className="w-12 h-12 border-4 border-cyan-600 border-t-transparent rounded-full animate-spin mx-auto" />

              <p className="mt-5 text-slate-500 font-semibold">
                Loading Analytics...
              </p>

            </div>

          </div>

        </main>

      </div>

    );

  }


  // ==========================================
  // Data
  // ==========================================

  const overview =
    analytics?.overview || {};


  const lessonAnalytics =
    analytics?.lessonAnalytics || {};


  const assignmentAnalytics =
    analytics?.assignmentAnalytics || {};


  const certificateAnalytics =
    analytics?.certificateAnalytics || {};


  // ==========================================
  // Page
  // ==========================================

  return (

    <div className="flex min-h-screen bg-slate-100">

      <AdminSidebar />

      <main className="flex-1 overflow-y-auto">

        <div className="p-8 space-y-8">

          <AdminTopbar />


          {/* ==================================
              PAGE HEADER
          ================================== */}

          <div>

            <h1 className="text-4xl font-black text-slate-800">
              Analytics & Reports
            </h1>

            <p className="text-slate-500 mt-2">
              Monitor Data Lattice LMS performance,
              learning activity and platform growth.
            </p>

          </div>


          {/* ==================================
              OVERVIEW
          ================================== */}

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">

            <StatCard
              title="Students"
              value={overview.total_students}
              icon={FaUserGraduate}
              description="Registered students"
            />

            <StatCard
              title="Mentors"
              value={overview.total_mentors}
              icon={FaChalkboardTeacher}
              description="Platform mentors"
            />

            <StatCard
              title="Courses"
              value={overview.total_courses}
              icon={FaBook}
              description="Published courses"
            />

            <StatCard
              title="Batches"
              value={overview.total_batches}
              icon={FaLayerGroup}
              description="Learning batches"
            />

            <StatCard
              title="Enrollments"
              value={overview.total_enrollments}
              icon={FaGraduationCap}
              description="Course enrollments"
            />

            <StatCard
              title="Lessons"
              value={overview.total_lessons}
              icon={FaFileAlt}
              description="Course lessons"
            />

            <StatCard
              title="Assignments"
              value={overview.total_assignments}
              icon={FaClipboardList}
              description="Assignments created"
            />

            <StatCard
              title="Live Classes"
              value={overview.total_live_classes}
              icon={FaVideo}
              description="Scheduled sessions"
            />

            <StatCard
              title="Support Tickets"
              value={overview.total_support_tickets}
              icon={FaTicketAlt}
              description="Total support requests"
            />

            <StatCard
              title="Certificates"
              value={overview.total_certificates}
              icon={FaCertificate}
              description="Certificates generated"
            />

          </div>


          {/* ==================================
              DATA SUMMARY
          ================================== */}

          <div className="grid lg:grid-cols-2 gap-8">


            {/* Student Growth */}

            <div className="bg-white rounded-3xl shadow-lg p-8">

              <div className="flex justify-between items-center mb-6">

                <div>

                  <h2 className="text-2xl font-black text-slate-800">
                    Student Growth
                  </h2>

                  <p className="text-sm text-slate-500 mt-1">
                    Monthly student registrations
                  </p>

                </div>

              </div>

              <div className="space-y-4">

                {analytics?.studentGrowth?.length > 0 ? (

                  analytics.studentGrowth.map(
                    (item) => (

                      <div
                        key={item.month}
                        className="flex items-center justify-between border-b border-slate-100 pb-3"
                      >

                        <span className="font-semibold text-slate-600">
                          {item.month_label}
                        </span>

                        <span className="font-black text-cyan-600">
                          {item.students}
                        </span>

                      </div>

                    )
                  )

                ) : (

                  <div className="py-10 text-center text-slate-400">
                    No student growth data available.
                  </div>

                )}

              </div>

            </div>


            {/* Enrollment Growth */}

            <div className="bg-white rounded-3xl shadow-lg p-8">

              <div className="mb-6">

                <h2 className="text-2xl font-black text-slate-800">
                  Enrollment Growth
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  Monthly course enrollments
                </p>

              </div>

              <div className="space-y-4">

                {analytics?.enrollmentGrowth?.length > 0 ? (

                  analytics.enrollmentGrowth.map(
                    (item) => (

                      <div
                        key={item.month}
                        className="flex items-center justify-between border-b border-slate-100 pb-3"
                      >

                        <span className="font-semibold text-slate-600">
                          {item.month_label}
                        </span>

                        <span className="font-black text-cyan-600">
                          {item.enrollments}
                        </span>

                      </div>

                    )
                  )

                ) : (

                  <div className="py-10 text-center text-slate-400">
                    No enrollment data available.
                  </div>

                )}

              </div>

            </div>

          </div>


          {/* ==================================
              COURSE ANALYTICS
          ================================== */}

          <div className="bg-white rounded-3xl shadow-lg p-8">

            <div className="mb-6">

              <h2 className="text-2xl font-black text-slate-800">
                Course Analytics
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Course enrollment and lesson performance.
              </p>

            </div>


            <div className="overflow-x-auto">

              <table className="w-full">

                <thead>

                  <tr className="border-b border-slate-200">

                    <th className="text-left py-4">
                      Course
                    </th>

                    <th className="text-center py-4">
                      Enrollments
                    </th>

                    <th className="text-center py-4">
                      Lessons
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {analytics?.courseAnalytics?.length > 0 ? (

                    analytics.courseAnalytics.map(
                      (course) => (

                        <tr
                          key={course.id}
                          className="border-b border-slate-100 hover:bg-slate-50"
                        >

                          <td className="py-4 font-semibold text-slate-700">
                            {course.title}
                          </td>

                          <td className="text-center font-bold text-cyan-600">
                            {course.enrollments}
                          </td>

                          <td className="text-center font-bold text-slate-600">
                            {course.lessons}
                          </td>

                        </tr>

                      )
                    )

                  ) : (

                    <tr>

                      <td
                        colSpan="3"
                        className="py-12 text-center text-slate-400"
                      >
                        No course analytics available.
                      </td>

                    </tr>

                  )}

                </tbody>

              </table>

            </div>

          </div>


          {/* ==================================
              LEARNING CONTENT
          ================================== */}

          <div className="grid md:grid-cols-3 gap-6">

            <div className="bg-white rounded-3xl shadow-lg p-7">

              <p className="text-sm font-semibold text-slate-500">
                Total Lessons
              </p>

              <h3 className="text-3xl font-black mt-2">
                {lessonAnalytics.total_lessons || 0}
              </h3>

              <p className="text-sm text-slate-400 mt-3">
                Video Lessons:{" "}
                {lessonAnalytics.video_lessons || 0}
              </p>

              <p className="text-sm text-slate-400 mt-1">
                PDF Lessons:{" "}
                {lessonAnalytics.pdf_lessons || 0}
              </p>

            </div>


            <div className="bg-white rounded-3xl shadow-lg p-7">

              <p className="text-sm font-semibold text-slate-500">
                Assignment Submissions
              </p>

              <h3 className="text-3xl font-black mt-2">
                {assignmentAnalytics.total_submissions || 0}
              </h3>

              <p className="text-sm text-slate-400 mt-3">
                Submitted:{" "}
                {assignmentAnalytics.submitted || 0}
              </p>

              <p className="text-sm text-slate-400 mt-1">
                Graded:{" "}
                {assignmentAnalytics.graded || 0}
              </p>

            </div>


            <div className="bg-white rounded-3xl shadow-lg p-7">

              <p className="text-sm font-semibold text-slate-500">
                Certificates
              </p>

              <h3 className="text-3xl font-black mt-2">
                {certificateAnalytics.total_certificates || 0}
              </h3>

              <p className="text-sm text-slate-400 mt-3">
                Certificates generated for students.
              </p>

            </div>

          </div>


          {/* ==================================
              BATCH ANALYTICS
          ================================== */}

          <div className="bg-white rounded-3xl shadow-lg p-8">

            <div className="mb-6">

              <h2 className="text-2xl font-black text-slate-800">
                Batch Analytics
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Student distribution across batches.
              </p>

            </div>


            <div className="overflow-x-auto">

              <table className="w-full">

                <thead>

                  <tr className="border-b border-slate-200">

                    <th className="text-left py-4">
                      Batch
                    </th>

                    <th className="text-center py-4">
                      Students
                    </th>

                    <th className="text-center py-4">
                      Live Classes
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {analytics?.batchAnalytics?.length > 0 ? (

                    analytics.batchAnalytics.map(
                      (batch) => (

                        <tr
                          key={batch.id}
                          className="border-b border-slate-100"
                        >

                          <td className="py-4 font-semibold">
                            {batch.batch_name}
                          </td>

                          <td className="text-center font-bold text-cyan-600">
                            {batch.students}
                          </td>

                          <td className="text-center font-bold">
                            {batch.live_classes}
                          </td>

                        </tr>

                      )
                    )

                  ) : (

                    <tr>

                      <td
                        colSpan="3"
                        className="py-12 text-center text-slate-400"
                      >
                        No batch analytics available.
                      </td>

                    </tr>

                  )}

                </tbody>

              </table>

            </div>

          </div>


          {/* ==================================
              REFRESH
          ================================== */}

          <div className="flex justify-end">

            <button
              onClick={loadAnalytics}
              className="px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-semibold transition"
            >
              Refresh Analytics
            </button>

          </div>

        </div>

      </main>

    </div>

  );

}

export default Analytics;