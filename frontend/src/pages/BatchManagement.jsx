import AdminSidebar from "../components/admin/AdminSidebar";
import AdminTopbar from "../components/admin/AdminTopbar";
import BatchTable from "../components/admin/batch/BatchTable";

function BatchManagement() {

  return (

    <div className="flex bg-slate-100 min-h-screen">

      <AdminSidebar />

      <main className="flex-1 overflow-auto p-8">

        <div className="space-y-8">

          <AdminTopbar />

          <div>

            <h1 className="text-4xl font-black text-slate-800">

              Batch Management

            </h1>

            <p className="text-slate-500 mt-2">

              Create batches, assign students and manage training programs.

            </p>

          </div>

          <BatchTable />

        </div>

      </main>

    </div>

  );

}

export default BatchManagement;