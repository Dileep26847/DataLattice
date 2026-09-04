import StatsCards from "../components/dashboard/StatsCards";
import ContinueLearning from "../components/dashboard/ContinueLearning";
import MyCourses from "../components/dashboard/MyCourses";
import ProgressChart from "../components/dashboard/ProgressChart";
import UpcomingClasses from "../components/dashboard/UpcomingClasses";
import Activity from "../components/dashboard/Activity";
import Assignments from "../components/dashboard/Assignments";

function StudentDashboard() {

    return (

        <div className="
            w-full
            max-w-[1700px]
            mx-auto
            px-4
            sm:px-6
            lg:px-8
            xl:px-10
            py-5
            sm:py-6
            lg:py-8
        ">

            <section>
                <StatsCards />
            </section>

            <section className="mt-6">
                <ContinueLearning />
            </section>

            <section className="mt-7">
                <MyCourses />
            </section>

            <section className="
                mt-7
                grid
                grid-cols-1
                xl:grid-cols-[minmax(0,1.45fr)_minmax(360px,0.8fr)]
                gap-6
                items-stretch
            ">

                <div className="
                    min-w-0
                    h-full
                ">
                    <ProgressChart />
                </div>

                <div className="
                    min-w-0
                    h-full
                ">
                    <UpcomingClasses />
                </div>

            </section>

            <section className="
                mt-6
                grid
                grid-cols-1
                xl:grid-cols-2
                gap-6
                items-stretch
            ">

                <div className="
                    min-w-0
                    h-full
                ">
                    <Assignments />
                </div>

                <div className="
                    min-w-0
                    h-full
                ">
                    <Activity />
                </div>

            </section>

            <div className="h-6" />

        </div>

    );

}

export default StudentDashboard;