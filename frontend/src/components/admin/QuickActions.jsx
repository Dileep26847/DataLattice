import {
  FaBook,
  FaUserGraduate,
  FaHeadset,
  FaCertificate,
  FaUserTie,
  FaCog,
} from "react-icons/fa";

import Card from "../common/Card";

function QuickActions() {

  const actions = [

    {
      title: "Add Course",
      icon: <FaBook />,
      color: "bg-cyan-600",
    },

    {
      title: "Add Student",
      icon: <FaUserGraduate />,
      color: "bg-emerald-600",
    },

    {
      title: "Support",
      icon: <FaHeadset />,
      color: "bg-amber-500",
    },

    {
      title: "Certificates",
      icon: <FaCertificate />,
      color: "bg-violet-600",
    },

    {
      title: "Mentors",
      icon: <FaUserTie />,
      color: "bg-pink-600",
    },

    {
      title: "Settings",
      icon: <FaCog />,
      color: "bg-slate-700",
    },

  ];

  return (

    <Card
      title="Quick Actions"
      subtitle="Frequently used admin shortcuts"
    >

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">

        {

          actions.map((action, index) => (

            <button
              key={index}
              className="
                group
                rounded-2xl
                p-6
                text-white
                transition-all
                duration-300
                hover:scale-105
                hover:shadow-xl
              "
              style={{
                background:
                  action.color === "bg-cyan-600"
                    ? "#0891b2"
                    : action.color === "bg-emerald-600"
                    ? "#059669"
                    : action.color === "bg-amber-500"
                    ? "#f59e0b"
                    : action.color === "bg-violet-600"
                    ? "#7c3aed"
                    : action.color === "bg-pink-600"
                    ? "#db2777"
                    : "#334155",
              }}
            >

              <div className="text-3xl transition-transform duration-300 group-hover:scale-125">

                {action.icon}

              </div>

              <h3 className="mt-5 font-bold text-lg">

                {action.title}

              </h3>

            </button>

          ))

        }

      </div>

    </Card>

  );

}

export default QuickActions;