import {
  FaTimes,
  FaUserGraduate,
  FaEnvelope,
  FaFolderOpen,
  FaCalendarAlt,
  FaClipboardList,
  FaCommentDots,
} from "react-icons/fa";

function TicketDetailsModal({ ticket, close }) {

  if (!ticket) return null;

  const statusColor = (status) => {

    switch (status) {

      case "Resolved":
        return "bg-green-100 text-green-700";

      case "In Progress":
        return "bg-yellow-100 text-yellow-700";

      default:
        return "bg-red-100 text-red-700";

    }

  };

  return (

    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-6">

      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl overflow-hidden">

        {/* Header */}

        <div className="flex justify-between items-center px-8 py-6 border-b">

          <div>

            <h2 className="text-3xl font-black text-slate-800">

              👁 Ticket Details

            </h2>

            <p className="text-slate-500 mt-1">

              View complete support request.

            </p>

          </div>

          <button

            onClick={close}

            className="w-12 h-12 rounded-full bg-slate-100 hover:bg-red-500 hover:text-white transition"

          >

            <FaTimes className="mx-auto"/>

          </button>

        </div>

        <div className="p-8 space-y-8">

          {/* Student Info */}

          <div className="bg-slate-50 rounded-3xl border p-6">

            <h3 className="text-xl font-bold mb-6">

              Student Information

            </h3>

            <div className="grid md:grid-cols-2 gap-6">

              <div className="flex gap-4">

                <FaUserGraduate
                  className="text-cyan-600 mt-1"
                />

                <div>

                  <p className="text-sm text-slate-500">

                    Student

                  </p>

                  <h4 className="font-bold">

                    {ticket.full_name}

                  </h4>

                </div>

              </div>

              <div className="flex gap-4">

                <FaEnvelope
                  className="text-indigo-600 mt-1"
                />

                <div>

                  <p className="text-sm text-slate-500">

                    Email

                  </p>

                  <h4 className="font-semibold">

                    {ticket.email}

                  </h4>

                </div>

              </div>

              <div className="flex gap-4">

                <FaFolderOpen
                  className="text-green-600 mt-1"
                />

                <div>

                  <p className="text-sm text-slate-500">

                    Category

                  </p>

                  <h4>

                    {ticket.category}

                  </h4>

                </div>

              </div>

              <div className="flex gap-4">

                <FaCalendarAlt
                  className="text-orange-500 mt-1"
                />

                <div>

                  <p className="text-sm text-slate-500">

                    Created

                  </p>

                  <h4>

                    {new Date(ticket.created_at).toLocaleDateString()}

                  </h4>

                </div>

              </div>

            </div>

          </div>

          {/* Ticket */}

          <div className="border rounded-3xl p-6">

            <div className="flex items-center justify-between">

              <h3 className="text-xl font-bold flex items-center gap-3">

                <FaClipboardList/>

                Ticket

              </h3>

              <span

                className={`px-4 py-2 rounded-full font-semibold ${statusColor(ticket.status)}`}

              >

                {ticket.status}

              </span>

            </div>

            <div className="mt-6">

              <h2 className="text-2xl font-bold">

                {ticket.title}

              </h2>

              <p className="mt-4 leading-8 text-slate-600">

                {ticket.description}

              </p>

            </div>

          </div>

          {/* Reply */}

          <div className="border rounded-3xl p-6">

            <h3 className="text-xl font-bold flex items-center gap-3 mb-5">

              <FaCommentDots/>

              Admin Reply

            </h3>

            {

              ticket.admin_reply ?

              (

                <div className="bg-green-50 border border-green-200 rounded-2xl p-5">

                  <p className="leading-8">

                    {ticket.admin_reply}

                  </p>

                </div>

              )

              :

              (

                <div className="bg-slate-100 rounded-2xl p-5 text-slate-500">

                  No reply has been sent yet.

                </div>

              )

            }

          </div>

          {/* Footer */}

          <div className="flex justify-end">

            <button

              onClick={close}

              className="px-8 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-semibold"

            >

              Close

            </button>

          </div>

        </div>

      </div>

    </div>

  );

}

export default TicketDetailsModal;