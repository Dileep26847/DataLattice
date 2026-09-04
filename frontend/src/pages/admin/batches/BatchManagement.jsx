import DashboardLayout from "../../components/layout/DashboardLayout";
import BatchTable from "./BatchTable";

function BatchManagement() {

    return (

        <DashboardLayout>

            <div className="space-y-6">

                {/* ======================================
                    Header
                ====================================== */}

                <div>

                    <h1 className="text-3xl font-bold text-slate-800">

                        Batch Management

                    </h1>

                    <p className="text-slate-500 mt-1">

                        Create, manage and organize student batches.

                    </p>

                </div>

                {/* ======================================
                    Batch Table
                ====================================== */}

                <BatchTable />

            </div>

        </DashboardLayout>

    );

}

export default BatchManagement;