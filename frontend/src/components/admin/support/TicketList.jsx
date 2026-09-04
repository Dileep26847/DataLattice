import { useEffect, useState } from "react";
import { getStudentTickets } from "../../../services/supportService";
import {
  FaClock,
  FaCheckCircle,
  FaTools,
} from "react-icons/fa";

function TicketList() {

  const [tickets, setTickets] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    loadTickets();

  }, []);

  const loadTickets = async () => {

    try {

      const data = await getStudentTickets();

      setTickets(data.tickets);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }

  };

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

  if (loading) {

    return (

      <div className="bg-white rounded-3xl shadow-lg p-8">

        Loading Tickets...

      </div>

    );

  }

  return (

    <div className="bg-white rounded-3xl shadow-xl p-8">

      <div className="flex justify-between items-center mb-8">

        <div>

          <p className="text-indigo-600 font-semibold">

            Support

          </p>

          <h2 className="text-3xl font-black">

            My Tickets

          </h2>

        </div>

      </div>

      {
        tickets.length === 0 ? (

          <div className="text-center py-16 text-slate-500">

            No Tickets Found

          </div>

        ) : (

          <div className="space-y-6">

            {

              tickets.map((ticket) => (

                <div
                  key={ticket.id}
                  className="border rounded-2xl p-6 hover:shadow-md transition"
                >

                  <div className="flex justify-between">

                    <div>

                      <h3 className="text-xl font-bold">

                        {ticket.title}

                      </h3>

                      <p className="text-slate-500 mt-2">

                        {ticket.description}

                      </p>

                    </div>

                    <span
                      className={`px-4 py-2 rounded-full text-sm font-semibold ${statusColor(
                        ticket.status
                      )}`}
                    >

                      {ticket.status}

                    </span>

                  </div>

                  <div className="flex gap-6 mt-5 text-slate-500">

                    <span className="flex items-center gap-2">

                      <FaTools />

                      {ticket.category}

                    </span>

                    <span className="flex items-center gap-2">

                      <FaClock />

                      {new Date(
                        ticket.created_at
                      ).toLocaleDateString()}

                    </span>

                  </div>

                  {

                    ticket.admin_reply && (

                      <div className="mt-6 bg-slate-100 rounded-2xl p-5">

                        <div className="flex items-center gap-2 text-green-700 font-semibold">

                          <FaCheckCircle />

                          Admin Reply

                        </div>

                        <p className="mt-3">

                          {ticket.admin_reply}

                        </p>

                      </div>

                    )

                  }

                </div>

              ))

            }

          </div>

        )

      }

    </div>

  );

}

export default TicketList;