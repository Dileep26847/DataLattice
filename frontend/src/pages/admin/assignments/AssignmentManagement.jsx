import DashboardLayout from "../../components/layout/DashboardLayout";
import AssignmentTable from "./AssignmentTable";

function AssignmentManagement() {

    return (

        <DashboardLayout>

            <div className="space-y-6">

                {/* ======================================
                    Header
                ====================================== */}

                <div>

                    <h1 className="text-3xl font-bold text-slate-800">

                        Assignment Management

                    </h1>

                    <p className="text-slate-500 mt-1">

                        Create, manage and organize assignments
                        for your LMS courses.

                    </p>

                </div>

                {/* ======================================
                    Assignment Table
                ====================================== */}

                <AssignmentTable />

            </div>

        </DashboardLayout>

    );

}

export default AssignmentManagement;