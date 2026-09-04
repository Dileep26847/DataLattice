import StudentTable from "./StudentTable";

function StudentManagement() {

  return (

    <div className="space-y-6">

      <div>

        <h1 className="text-3xl font-bold text-slate-800">
          Student Management
        </h1>

        <p className="text-slate-500 mt-1">
          Manage students, profiles, batches and enrollment.
        </p>

      </div>

      <StudentTable />

    </div>

  );
}

export default StudentManagement;