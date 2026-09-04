import { useEffect, useState } from "react";
import {
  FaUserGraduate,
  FaBookOpen,
  FaHeadset,
  FaDollarSign,
} from "react-icons/fa";

import { getDashboard } from "../../services/adminService";
import StatCard from "../common/StatCard";

function AdminStats() {

  const [stats, setStats] = useState({
    students: 0,
    courses: 0,
    tickets: 0,
    revenue: 0,
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {

    try {

      const data = await getDashboard();

      setStats(data.stats);

    } catch (err) {

      console.log(err);

    }

  };

  const cards = [

    {
      title: "Students",
      value: stats.students,
      icon: <FaUserGraduate />,
      color: "bg-cyan-100",
      iconColor: "text-cyan-600",
    },

    {
      title: "Courses",
      value: stats.courses,
      icon: <FaBookOpen />,
      color: "bg-emerald-100",
      iconColor: "text-emerald-600",
    },

    {
      title: "Open Tickets",
      value: stats.tickets,
      icon: <FaHeadset />,
      color: "bg-amber-100",
      iconColor: "text-amber-600",
    },

    {
      title: "Revenue",
      value: "Coming Soon",
      icon: <FaDollarSign />,
      color: "bg-violet-100",
      iconColor: "text-violet-600",
    },

  ];

  return (

    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

      {

        cards.map((card, index) => (

          <StatCard

            key={index}

            title={card.title}

            value={card.value}

            icon={card.icon}

            color={card.color}

            iconColor={card.iconColor}

          />

        ))

      }

    </div>

  );

}

export default AdminStats;