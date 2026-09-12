import Sidebar from "../dashboard/Sidebar";
import Topbar from "../dashboard/Topbar";
import { Outlet } from "react-router-dom";


// ============================================================
// DASHBOARD LAYOUT
// ============================================================

function DashboardLayout() {

    return (

        <div
            className="
                h-screen
                w-full
                overflow-hidden
                bg-[#F5F9FF]
                flex
            "
        >

            {/* =====================================================
                STUDENT SIDEBAR

                The sidebar is locked to the viewport height.
                Only the main content area is allowed to scroll.
            ===================================================== */}

            <aside
                className="
                    h-screen
                    shrink-0
                    overflow-hidden
                "
            >

                <Sidebar />

            </aside>


            {/* =====================================================
                MAIN APPLICATION AREA
            ===================================================== */}

            <div
                className="
                    flex
                    h-screen
                    min-w-0
                    flex-1
                    flex-col
                    overflow-hidden
                "
            >

                {/* =================================================
                    STUDENT TOPBAR

                    The topbar stays fixed within the application
                    shell while the page content scrolls below it.
                ================================================= */}

                <div
                    className="
                        shrink-0
                        px-3
                        pt-3
                        sm:px-4
                        sm:pt-4
                        lg:px-5
                        lg:pt-5
                    "
                >

                    <Topbar />

                </div>


                {/* =================================================
                    PAGE CONTENT

                    IMPORTANT:
                    This is the ONLY scrolling area.
                ================================================= */}

                <main
                    className="
                        min-h-0
                        min-w-0
                        flex-1
                        overflow-x-hidden
                        overflow-y-auto
                        px-3
                        pb-3
                        sm:px-4
                        sm:pb-4
                        lg:px-5
                        lg:pb-5
                    "
                >

                    <div
                        className="
                            mx-auto
                            w-full
                            max-w-[1700px]
                        "
                    >

                        <Outlet />

                    </div>

                </main>

            </div>

        </div>

    );

}


export default DashboardLayout;