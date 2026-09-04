import Sidebar from "../dashboard/Sidebar";
import Topbar from "../dashboard/Topbar";
import { Outlet } from "react-router-dom";

function DashboardLayout() {

    return (

        <div className="
            min-h-screen
            bg-slate-100
            flex
            overflow-hidden
        ">

            {/* =====================================================
                STUDENT SIDEBAR
            ===================================================== */}

            <Sidebar />


            {/* =====================================================
                MAIN AREA
            ===================================================== */}

            <div className="
                flex-1
                min-w-0
                flex
                flex-col
                overflow-hidden
            ">

                {/* =================================================
                    STUDENT TOPBAR
                ================================================= */}

                <div className="
                    shrink-0
                    p-3
                    sm:p-4
                    lg:p-5
                    pb-0
                ">

                    <Topbar />

                </div>


                {/* =================================================
                    PAGE CONTENT
                ================================================= */}

                <main className="
                    flex-1
                    min-w-0
                    overflow-y-auto
                    overflow-x-hidden
                    p-3
                    sm:p-4
                    lg:p-5
                ">

                    <div className="
                        w-full
                        max-w-[1700px]
                        mx-auto
                    ">

                        <Outlet />

                    </div>

                </main>

            </div>

        </div>

    );

}

export default DashboardLayout;