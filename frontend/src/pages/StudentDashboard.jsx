import StatsCards from "../components/dashboard/StatsCards";
import ContinueLearning from "../components/dashboard/ContinueLearning";


// ============================================================
// DATALATTICE STUDENT DASHBOARD
// ============================================================

function StudentDashboard() {

    return (

        <main
            className="
                min-h-full
                w-full
                bg-[#F5F9FF]
            "
        >

            {/* ==================================================
                MAIN DASHBOARD CONTENT
            ================================================== */}

            <div
                className="
                    mx-auto
                    w-full
                    max-w-[1440px]
                    px-4
                    pb-8
                    pt-5
                    sm:px-5
                    sm:pb-10
                    sm:pt-6
                    lg:px-6
                    lg:pb-12
                    lg:pt-7
                    xl:px-8
                "
            >

                {/* ==================================================
                    LEARNING OVERVIEW
                ================================================== */}

                <section
                    aria-label="Learning overview"
                    className="
                        w-full
                    "
                >

                    <StatsCards />

                </section>


                {/* ==================================================
                    CONTINUE LEARNING
                ================================================== */}

                <section
                    aria-label="Continue learning"
                    className="
                        mt-5
                        w-full
                        min-w-0
                    "
                >

                    <ContinueLearning />

                </section>


                {/* ==================================================
                    RESERVED DASHBOARD SPACE
                   
                    Other dashboard modules such as:
                    - My Courses
                    - Progress Chart
                    - Upcoming Classes
                    - Assignments
                    - Activity

                    are intentionally not rendered here.
                   
                    Their existing files remain untouched so their
                    functionality can be reused in future screens.
                ================================================== */}

                <div
                    className="
                        h-5
                        sm:h-6
                    "
                />

            </div>

        </main>

    );

}


export default StudentDashboard;