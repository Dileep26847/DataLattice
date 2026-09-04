import {
  FaChartLine,
  FaCheckCircle,
  FaClock,
  FaUsers,
} from "react-icons/fa";

function SupportAnalytics({ tickets }) {

  const total = tickets.length;

  const resolved = tickets.filter(
    t => t.status === "Resolved"
  ).length;

  const open = tickets.filter(
    t => t.status === "Open"
  ).length;

  const resolutionRate =
    total === 0
      ? 0
      : Math.round((resolved / total) * 100);

  const cards = [

    {
      title: "Resolution Rate",
      value: `${resolutionRate}%`,
      icon: <FaChartLine />,
      color: "bg-cyan-100 text-cyan-600",
    },

    {
      title: "Open Tickets",
      value: open,
      icon: <FaClock />,
      color: "bg-amber-100 text-amber-600",
    },

    {
      title: "Resolved",
      value: resolved,
      icon: <FaCheckCircle />,
      color: "bg-emerald-100 text-emerald-600",
    },

    {
      title: "Students Helped",
      value: total,
      icon: <FaUsers />,
      color: "bg-indigo-100 text-indigo-600",
    },

  ];

  return (

    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

      {

        cards.map((card, index) => (

          <div
            key={index}
            className="bg-white rounded-3xl p-6 shadow-lg border border-slate-100 hover:shadow-xl transition-all"
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
                className={`w-16 h-16 rounded-2xl flex items-center justify-center ${card.color}`}
              >

                {card.icon}

              </div>

            </div>

          </div>

        ))

      }

    </div>

  );

}

export default SupportAnalytics;