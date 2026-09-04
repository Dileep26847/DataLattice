import AssignmentTable from "./AssignmentTable";

function AssignmentManagement() {

  return (

    <div className="space-y-6">

      <div>

        <h1 className="text-3xl font-bold text-slate-800">
          Assignment Management
        </h1>

        <p className="text-slate-500 mt-1">
          Create assignments, manage deadlines and review student work.
        </p>

      </div>

      <AssignmentTable />

    </div>

  );

}

export default AssignmentManagement;