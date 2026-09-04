import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminTopbar from "../../components/admin/AdminTopbar";
import StudentsTable from "../../components/admin/StudentsTable";

function ManageStudents() {
  return (
    <div className="flex bg-slate-100 min-h-screen">

      {/* Sidebar */}

      <AdminSidebar />

      {/* Main Content */}

      <main className="flex-1 p-8 overflow-y-auto">

        <div className="space-y-8">

          {/* Topbar */}

          <AdminTopbar />

          {/* Header */}

          <div>

            <h1 className="text-4xl font-bold">
              Student Management
            </h1>

            <p className="text-gray-500 mt-2">
              View, search and manage all registered students.
            </p>

          </div>

          {/* Students Table */}

          <StudentsTable />

        </div>

      </main>

    </div>
  );
}

export default ManageStudents;