import AdminSidebar from "../components/admin/AdminSidebar";
import AdminTopbar from "../components/admin/AdminTopbar";

import PageHeader from "../components/common/PageHeader";
import Button from "../components/common/Button";

import CourseTable from "../components/admin/course/CourseTable";

function CourseManagement() {

  return (

    <div className="flex min-h-screen bg-slate-100">

      <AdminSidebar />

      <main className="flex-1 overflow-y-auto">

        <div className="p-8 space-y-8">

          <AdminTopbar />

          <PageHeader

            title="Course Management"

            subtitle="Create, edit, publish and manage all LMS courses."

            action={

              <Button>

                + Add Course

              </Button>

            }

          />

          <CourseTable />

        </div>

      </main>

    </div>

  );

}

export default CourseManagement;