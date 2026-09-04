import BatchTable from "./BatchTable";

function BatchManagement() {

  return (

    <div className="space-y-6">

      <div>

        <h1 className="text-3xl font-bold text-slate-800">
          Batch Management
        </h1>

        <p className="text-slate-500 mt-1">
          Create, manage and organize training batches.
        </p>

      </div>

      <BatchTable />

    </div>

  );

}

export default BatchManagement;