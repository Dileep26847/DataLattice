import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";


// ============================================================
// PUBLIC PAGES
// ============================================================

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Courses from "./pages/Courses";
import CourseDetails from "./pages/CourseDetails";
import NotFound from "./pages/NotFound";


// ============================================================
// STUDENT PAGES
// ============================================================

import StudentDashboard from "./pages/StudentDashboard";
import MyCourses from "./pages/MyCourses";
import LearningPage from "./pages/LearningPage";
import Support from "./pages/Support";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import LiveClasses from "./pages/LiveClasses";
import Assignments from "./pages/Assignments";
import Certificates from "./pages/Certificates";
import Calendar from "./pages/Calendar";


// ============================================================
// ADMIN DASHBOARD
// ============================================================

import AdminDashboard from "./pages/AdminDashboard";


// ============================================================
// ADMIN MANAGEMENT FEATURES
// ============================================================

import StudentManagement from "./features/students/StudentManagement";
import MentorManagement from "./features/mentors/MentorManagement";
import CourseManagement from "./features/courses/CourseManagement";
import LessonManagement from "./features/lessons/LessonManagement";
import BatchManagement from "./features/batches/BatchManagement";
import AssignmentManagement from "./features/assignments/AssignmentManagement";
import SubmissionManagement from "./features/submissions/SubmissionManagement";


// ============================================================
// ADMIN PAGES
// ============================================================

import LiveClassManagement from "./pages/admin/LiveClassManagement";
import AdminSupport from "./pages/AdminSupport";


// ============================================================
// ADMIN ANALYTICS / REPORTING
// ============================================================

import Analytics from "./pages/admin/Analytics";
import Reports from "./pages/admin/Reports";


// ============================================================
// OTHER STUDENT PAGES
// ============================================================

import CertificateView from "./pages/CertificateView";


// ============================================================
// AUTHORIZATION
// ============================================================

import ProtectedRoute from "./components/ProtectedRoute";


// ============================================================
// STUDENT LAYOUT
// ============================================================

import DashboardLayout from "./components/layout/DashboardLayout";


// ============================================================
// ADMIN LAYOUT
// ============================================================

import AdminLayout from "./components/layout/AdminLayout";


// ============================================================
// APP
// ============================================================

function App() {

  return (

    <BrowserRouter>

      <Routes>


        {/* ========================================================
            ========================================================
            PUBLIC APPLICATION
            ========================================================
            ======================================================== */}

        <Route
          path="/"
          element={<Home />}
        />


        <Route
          path="/login"
          element={<Login />}
        />


        <Route
          path="/register"
          element={<Register />}
        />


        <Route
          path="/courses"
          element={<Courses />}
        />


        <Route
          path="/courses/:id"
          element={<CourseDetails />}
        />


        {/* ========================================================
            ========================================================
            STUDENT APPLICATION
            ========================================================
            ========================================================

            IMPORTANT:

            DashboardLayout is mounted ONCE.

            It owns:

            - Student Sidebar
            - Student Topbar
            - Student page container

            Individual student pages must NOT render:

            - Sidebar
            - Topbar
            - AdminSidebar
            - AdminTopbar

            They should contain page content only.
        ======================================================== */}

        <Route
          path="/student"
          element={

            <ProtectedRoute
              allowedRole="student"
            >

              <DashboardLayout />

            </ProtectedRoute>

          }
        >


          {/* ======================================================
              STUDENT DEFAULT
          ====================================================== */}

          <Route
            index
            element={
              <Navigate
                to="dashboard"
                replace
              />
            }
          />


          {/* ======================================================
              STUDENT DASHBOARD
          ====================================================== */}

          <Route
            path="dashboard"
            element={<StudentDashboard />}
          />


          {/* ======================================================
              MY COURSES
          ====================================================== */}

          <Route
            path="my-courses"
            element={<MyCourses />}
          />


          {/* ======================================================
              LEARNING
          ====================================================== */}

          <Route
            path="learn/:courseId"
            element={<LearningPage />}
          />


          {/* ======================================================
              LIVE CLASSES
          ====================================================== */}

          <Route
            path="live-classes"
            element={<LiveClasses />}
          />


          {/* ======================================================
              ASSIGNMENTS
          ====================================================== */}

          <Route
            path="assignments"
            element={<Assignments />}
          />


          {/* ======================================================
              CERTIFICATES
          ====================================================== */}

          <Route
            path="certificates"
            element={<Certificates />}
          />


          {/* ======================================================
              CERTIFICATE VIEW
          ====================================================== */}

          <Route
            path="certificates/:id"
            element={<CertificateView />}
          />


          {/* ======================================================
              PROFILE
          ====================================================== */}

          <Route
            path="profile"
            element={<Profile />}
          />


          {/* ======================================================
              SUPPORT
          ====================================================== */}

          <Route
            path="support"
            element={<Support />}
          />


          {/* ======================================================
              CALENDAR
          ====================================================== */}

          <Route
            path="calendar"
            element={<Calendar />}
          />


          {/* ======================================================
              SETTINGS
          ====================================================== */}

          <Route
            path="settings"
            element={<Settings />}
          />

        </Route>


        {/* ========================================================
            ========================================================
            ADMIN APPLICATION
            ========================================================
            ========================================================

            IMPORTANT:

            AdminLayout is mounted ONCE.

            It owns:

            - AdminSidebar
            - AdminTopbar
            - Admin content container

            Every admin route below renders ONLY its page content.

            NEVER put:

            <AdminSidebar />
            <AdminTopbar />

            inside these pages.
        ======================================================== */}

        <Route
          path="/admin"
          element={

            <ProtectedRoute
              allowedRole="admin"
            >

              <AdminLayout />

            </ProtectedRoute>

          }
        >


          {/* ======================================================
              ADMIN DEFAULT
          ====================================================== */}

          <Route
            index
            element={
              <Navigate
                to="dashboard"
                replace
              />
            }
          />


          {/* ======================================================
              ADMIN DASHBOARD
          ====================================================== */}

          <Route
            path="dashboard"
            element={<AdminDashboard />}
          />


          {/* ======================================================
              STUDENT MANAGEMENT
          ====================================================== */}

          <Route
            path="students"
            element={<StudentManagement />}
          />


          {/* ======================================================
              MENTOR MANAGEMENT
          ====================================================== */}

          <Route
            path="mentors"
            element={<MentorManagement />}
          />


          {/* ======================================================
              COURSE MANAGEMENT
          ====================================================== */}

          <Route
            path="courses"
            element={<CourseManagement />}
          />


          {/* ======================================================
              LESSON MANAGEMENT
          ====================================================== */}

          <Route
            path="lessons"
            element={<LessonManagement />}
          />


          {/* ======================================================
              BATCH MANAGEMENT
          ====================================================== */}

          <Route
            path="batches"
            element={<BatchManagement />}
          />


          {/* ======================================================
              ASSIGNMENT MANAGEMENT
          ====================================================== */}

          <Route
            path="assignments"
            element={<AssignmentManagement />}
          />


          {/* ======================================================
              LIVE CLASS MANAGEMENT
          ====================================================== */}

          <Route
            path="live-classes"
            element={<LiveClassManagement />}
          />


          {/* ======================================================
              SUBMISSION MANAGEMENT
          ====================================================== */}

          <Route
            path="submissions"
            element={<SubmissionManagement />}
          />


          {/* ======================================================
              ADMIN SUPPORT
          ====================================================== */}

          <Route
            path="support"
            element={<AdminSupport />}
          />


          {/* ======================================================
              ADMIN ANALYTICS
          ====================================================== */}

          <Route
            path="analytics"
            element={<Analytics />}
          />


          {/* ======================================================
              ADMIN REPORTS
          ====================================================== */}

          <Route
            path="reports"
            element={<Reports />}
          />


          {/* ======================================================
              ADMIN SETTINGS
          ====================================================== */}

          <Route
            path="settings"
            element={<Settings />}
          />

        </Route>


        {/* ========================================================
            ========================================================
            GLOBAL 404
            ========================================================
            ======================================================== */}

        <Route
          path="*"
          element={<NotFound />}
        />


      </Routes>

    </BrowserRouter>

  );

}


export default App;