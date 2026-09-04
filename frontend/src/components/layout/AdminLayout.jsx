import { Outlet } from "react-router-dom";

import AdminSidebar from "../admin/AdminSidebar";
import AdminTopbar from "../admin/AdminTopbar";

function AdminLayout() {

  return (

    <div className="flex min-h-screen bg-slate-100">

      {/* =====================================================
          ADMIN SIDEBAR
          Rendered ONCE for the entire admin portal
      ===================================================== */}

      <AdminSidebar />


      {/* =====================================================
          ADMIN MAIN AREA
      ===================================================== */}

      <div className="flex-1 min-w-0 flex flex-col overflow-hidden">

        {/* ===================================================
            ADMIN TOPBAR
            Rendered ONCE for the entire admin portal
        =================================================== */}

        <div className="shrink-0 p-5 pb-0">

          <AdminTopbar />

        </div>


        {/* ===================================================
            ADMIN PAGE CONTENT

            React Router renders the child route here.
        =================================================== */}

        <main className="flex-1 min-w-0 overflow-y-auto p-5">

          <div className="w-full max-w-[1700px] mx-auto">

            <Outlet />

          </div>

        </main>

      </div>

    </div>

  );

}

export default AdminLayout;