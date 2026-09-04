import CourseTable from "./CourseTable";

function CourseManagement() {

  return (

    <div className="space-y-6">

      <div>

        <h1 className="text-3xl font-bold text-slate-800">
          Course Management
        </h1>

        <p className="text-slate-500 mt-1">
          Manage all LMS courses.
        </p>

      </div>

      <CourseTable />

    </div>

  );
}

export default CourseManagement;