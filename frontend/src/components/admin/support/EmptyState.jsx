import { FaInbox } from "react-icons/fa";

function EmptyState() {

  return (

    <div className="bg-white rounded-3xl shadow-lg border border-slate-100 py-20">

      <div className="flex flex-col items-center">

        <div className="w-24 h-24 rounded-full bg-slate-100 flex items-center justify-center">

          <FaInbox
            className="text-slate-400"
            size={34}
          />

        </div>

        <h2 className="text-2xl font-black text-slate-700 mt-8">

          No Support Tickets Found

        </h2>

        <p className="text-slate-500 mt-3">

          Support requests from students will appear here.

        </p>

      </div>

    </div>

  );

}

export default EmptyState;