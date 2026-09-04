import SupportTable from "../components/admin/support/SupportTable";

function AdminSupport() {
  return (
    <div className="w-full space-y-6">

      {/* ======================================
          PAGE HEADER
      ====================================== */}

      <div>
        <h1 className="text-3xl font-black text-slate-800">
          Support Center
        </h1>

        <p className="mt-1 text-slate-500">
          Manage tickets and customer support requests.
        </p>
      </div>


      {/* ======================================
          SUPPORT MANAGEMENT
      ====================================== */}

      <SupportTable />

    </div>
  );
}

export default AdminSupport;