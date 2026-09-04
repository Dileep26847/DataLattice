
import LiveClassTable from "../../components/admin/liveClass/LiveClassTable";

function LiveClassManagement() {
  return (
    <div className="flex min-h-screen bg-slate-100">



      {/* ================================
          MAIN CONTENT
      ================================= */}

      <main className="flex-1 overflow-auto p-8">

        <div className="space-y-8">

        


          {/* ================================
              PAGE HEADER
          ================================= */}

          <div>
            <h1 className="text-4xl font-black text-slate-800">
              Live Class Management
            </h1>

            <p className="mt-2 text-slate-500">
              Schedule and manage all live classes.
            </p>
          </div>


          {/* ================================
              LIVE CLASS MANAGEMENT
          ================================= */}

          <LiveClassTable />

        </div>

      </main>

    </div>
  );
}

export default LiveClassManagement;