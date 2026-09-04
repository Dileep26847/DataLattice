import {
  FaTicketAlt,
  FaSpinner,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";

function SupportStats({ tickets }) {

  const total = tickets.length;

  const open = tickets.filter(
    (t) => t.status === "Open"
  ).length;

  const progress = tickets.filter(
    (t) => t.status === "In Progress"
  ).length;

  const resolved = tickets.filter(
    (t) => t.status === "Resolved"
  ).length;

  const cards = [

    {
      title: "Total Tickets",
      value: total,
      icon: <FaTicketAlt size={24} />,
      bg: "bg-cyan-100",
      color: "text-cyan-600",
    },

    {
      title: "Open",
      value: open,
      icon: <FaExclamationCircle size={24} />,
      bg: "bg-rose-100",
      color: "text-rose-600",
    },

    {
      title: "In Progress",
      value: progress,
      icon: <FaSpinner size={24} />,
      bg: "bg-amber-100",
      color: "text-amber-600",
    },

    {
      title: "Resolved",
      value: resolved,
      icon: <FaCheckCircle size={24} />,
      bg: "bg-emerald-100",
      color: "text-emerald-600",
    },

  ];

  return (

    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

      {

        cards.map((card, index) => (

          <div
            key={index}
            className="bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-slate-100"
          >

            <div className="flex justify-between items-center">

              <div>

                <p className="text-slate-500 text-sm">

                  {card.title}

                </p>

                <h2 className="text-4xl font-black mt-3">

                  {card.value}

                </h2>

              </div>

              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center ${card.bg}`}
              >

                <div className={card.color}>

                  {card.icon}

                </div>

              </div>

            </div>

          </div>

        ))

      }

    </div>

  );

}

export default SupportStats;