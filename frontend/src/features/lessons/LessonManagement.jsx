import LessonTable from "./LessonTable";

function LessonManagement() {

  return (

    <div className="space-y-6">

      <div>

        <h1 className="text-3xl font-bold text-slate-800">
          Lesson Management
        </h1>

        <p className="text-slate-500 mt-1">
          Manage lessons inside your LMS.
        </p>

      </div>

      <LessonTable />

    </div>

  );
}

export default LessonManagement;