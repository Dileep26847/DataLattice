import AdminStats from "../components/admin/AdminStats";
import QuickActions from "../components/admin/QuickActions";
import RecentCourses from "../components/admin/RecentCourses";
import RecentActivity from "../components/admin/RecentActivity";

import StudentGrowthChart from "../components/admin/charts/StudentGrowthChart";
import CourseDistributionChart from "../components/admin/charts/CourseDistributionChart";
import SupportAnalyticsChart from "../components/admin/charts/SupportAnalyticsChart";


function AdminDashboard() {

    return (

        <div className="space-y-8">

            {/* =====================================================
                ADMIN DASHBOARD CONTENT

                IMPORTANT:
                Sidebar and Topbar are provided by AdminLayout.
                Do NOT add them here.
            ===================================================== */}


            {/* =====================================================
                STATISTICS
            ===================================================== */}

            <AdminStats />


            {/* =====================================================
                STUDENT GROWTH + QUICK ACTIONS
            ===================================================== */}

            <div className="grid xl:grid-cols-3 gap-8">

                <div className="xl:col-span-2">

                    <StudentGrowthChart />

                </div>

                <QuickActions />

            </div>


            {/* =====================================================
                COURSE + SUPPORT ANALYTICS
            ===================================================== */}

            <div className="grid xl:grid-cols-3 gap-8">

                <RecentCourses />

                <CourseDistributionChart />

                <SupportAnalyticsChart />

            </div>


            {/* =====================================================
                RECENT ACTIVITY
            ===================================================== */}

            <RecentActivity />

        </div>

    );

}


export default AdminDashboard;