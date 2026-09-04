import AdminSidebar from "../components/admin/AdminSidebar";
import AdminTopbar from "../components/admin/AdminTopbar";
import AdminStats from "../components/admin/AdminStats";
import QuickActions from "../components/admin/QuickActions";
import RecentCourses from "../components/admin/RecentCourses";

import StudentGrowthChart from "../components/admin/charts/StudentGrowthChart";

function AdminDashboard() {

  return (

    <div className="flex min-h-screen bg-slate-100">

      {/* Sidebar */}

      <AdminSidebar />

      {/* Main */}

      <main className="flex-1 p-8">

        <div className="space-y-8">

          {/* Topbar */}

          <AdminTopbar />

          {/* Statistics */}

          <AdminStats />

          {/* Charts + Quick Actions */}

          <div className="grid xl:grid-cols-3 gap-8">

            <div className="xl:col-span-2">

              <StudentGrowthChart />

            </div>

            <QuickActions />

          </div>

          {/* Recent Courses */}

          <RecentCourses />

        </div>

      </main>

    </div>

  );

}

export default AdminDashboard;