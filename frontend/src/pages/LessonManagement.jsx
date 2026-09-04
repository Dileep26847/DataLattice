import AdminSidebar from "../components/admin/AdminSidebar";
import AdminTopbar from "../components/admin/AdminTopbar";
import LessonTable from "../components/admin/lesson/LessonTable";

function LessonManagement() {

  return (

    <div className="flex bg-slate-100 min-h-screen">

      <AdminSidebar />

      <main className="flex-1 p-8 overflow-auto">

        <div className="space-y-8">

          <AdminTopbar />

          <div>

            <h1 className="text-4xl font-black text-slate-800">

              Lesson Management

            </h1>

            <p className="text-slate-500 mt-2">

              Create, organize and manage lessons for every course.

            </p>

          </div>

          <LessonTable />

        </div>

      </main>

    </div>

  );a

}

export default LessonManagement;