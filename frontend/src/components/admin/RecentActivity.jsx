import { useEffect, useState } from "react";
import {
  FaUserGraduate,
  FaBookOpen,
  FaHeadset,
} from "react-icons/fa";

import Card from "../common/Card";
import { getDashboard } from "../../services/adminService";

function RecentActivity() {

  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [tickets, setTickets] = useState([]);

  useEffect(() => {

    loadData();

  }, []);

  const loadData = async () => {

    try {

      const data = await getDashboard();

      setStudents(data.recentStudents || []);
      setCourses(data.recentCourses || []);
      setTickets(data.recentTickets || []);

    } catch (err) {

      console.log(err);

    }

  };

  const activities = [

    ...students.map((item) => ({
      id: `student-${item.id}`,
      icon: <FaUserGraduate className="text-cyan-600" />,
      title: item.full_name,
      subtitle: "New Student Registered",
    })),

    ...courses.map((item) => ({
      id: `course-${item.id}`,
      icon: <FaBookOpen className="text-emerald-600" />,
      title: item.title,
      subtitle: "New Course Published",
    })),

    ...tickets.map((item) => ({
      id: `ticket-${item.id}`,
      icon: <FaHeadset className="text-orange-500" />,
      title: item.full_name,
      subtitle: `${item.category} Support Ticket`,
    })),

  ].slice(0, 10);

  return (

    <Card

      title="Recent Activity"

      subtitle="Latest LMS updates"

    >

      <div className="space-y-5">

        {

          activities.length === 0 ?

          (

            <p className="text-center text-slate-500 py-10">

              No Activity Found

            </p>

          )

          :

          (

            activities.map((activity) => (

              <div

                key={activity.id}

                className="flex items-center gap-4 border-b pb-4"

              >

                <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center">

                  {activity.icon}

                </div>

                <div>

                  <h3 className="font-bold">

                    {activity.title}

                  </h3>

                  <p className="text-sm text-slate-500">

                    {activity.subtitle}

                  </p>

                </div>

              </div>

            ))

          )

        }

      </div>

    </Card>

  );

}

export default RecentActivity;