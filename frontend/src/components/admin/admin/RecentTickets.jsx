import { useEffect, useState } from "react";
import { getDashboard } from "../../services/adminService";

function RecentTickets() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTickets();
  }, []);

  const loadTickets = async () => {
    try {
      const data = await getDashboard();
      setTickets(data.recentTickets);
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

  return (
    <div className="bg-white rounded-3xl shadow-lg p-8">

      <div className="flex justify-between items-center mb-8">

        <div>

          <h2 className="text-3xl font-black">

            Recent Support Tickets

          </h2>

          <p className="text-slate-500">

            Latest student support requests

          </p>

        </div>

      </div>

      {loading ? (

        <div className="py-10">

          Loading...

        </div>

      ) : (

        <table className="w-full">

          <thead>

            <tr className="border-b text-left">

              <th className="pb-4">Student</th>

              <th>Category</th>

              <th>Status</th>

            </tr>

          </thead>

          <tbody>

            {tickets.map((ticket) => (

              <tr
                key={ticket.id}
                className="border-b hover:bg-slate-50"
              >

                <td className="py-5 font-semibold">

                  {ticket.full_name}

                </td>

                <td>

                  {ticket.category}

                </td>

                <td>

                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold ${statusColor(
                      ticket.status
                    )}`}
                  >

                    {ticket.status}

                  </span>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      )}

    </div>
  );
}

export default RecentTickets;