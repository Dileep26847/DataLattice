import MentorTable from "./MentorTable";


// ============================================================
// MENTOR MANAGEMENT
// ============================================================
//
// IMPORTANT:
// This page is already rendered inside:
//
// /admin
//   └── AdminLayout
//        ├── AdminSidebar
//        ├── AdminTopbar
//        └── Outlet
//
// Therefore this component MUST NOT render:
// - DashboardLayout
// - AdminLayout
// - Sidebar
// - Topbar
// - AdminSidebar
// - AdminTopbar
//
// It should contain page content only.
// ============================================================

function MentorManagement() {

  return (

    <div className="space-y-6">


      {/* ======================================================
          PAGE HEADER
      ====================================================== */}

      <div>

        <h1
          className="
            text-3xl
            sm:text-4xl
            font-black
            text-slate-800
          "
        >
          Mentor Management
        </h1>


        <p
          className="
            text-slate-500
            mt-2
          "
        >
          Manage mentors, trainers and instructors.
        </p>

      </div>


      {/* ======================================================
          MENTOR TABLE
      ====================================================== */}

      <MentorTable />


    </div>

  );

}


export default MentorManagement;