import {
  FaUserGraduate,
  FaBook,
  FaClipboardList,
  FaGraduationCap,
} from "react-icons/fa";

function AnalyticsStats({ stats, loading }) {

  const cards = [

    {
      title: "Total Students",
      value: stats?.students ?? 0,
      icon: <FaUserGraduate />,
      iconStyle: "bg-cyan-100 text-cyan-600",
    },

    {
      title: "Total Courses",
      value: stats?.courses ?? 0,
      icon: <FaBook />,
      iconStyle: "bg-blue-100 text-blue-600",
    },

    {
      title: "Total Enrollments",
      value: stats?.enrollments ?? 0,
      icon: <FaGraduationCap />,
      iconStyle: "bg-green-100 text-green-600",
    },

    {
      title: "Total Assignments",
      value: stats?.assignments ?? 0,
      icon: <FaClipboardList />,
      iconStyle: "bg-purple-100 text-purple-600",
    },

  ];

  return (

    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

      {cards.map((card) => (

        <div
          key={card.title}
          className="
            bg-white
            rounded-3xl
            shadow-lg
            p-6
            border
            border-slate-100
          "
        >

          <div className="flex items-center justify-between">

            <div>

              <p className="text-slate-500 font-medium">
                {card.title}
              </p>

              <h2 className="text-3xl font-black text-slate-800 mt-2">

                {loading ? "..." : card.value}

              </h2>

            </div>

            <div
              className={`
                p-4
                rounded-2xl
                text-2xl
                ${card.iconStyle}
              `}
            >
              {card.icon}
            </div>

          </div>

        </div>

      ))}

    </div>

  );

}

export default AnalyticsStats;