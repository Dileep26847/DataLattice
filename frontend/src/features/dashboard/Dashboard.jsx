import { useEffect, useState } from "react";

import {
  FaUserGraduate,
  FaBookOpen,
  FaChalkboardTeacher,
  FaLayerGroup,
} from "react-icons/fa";

import DashboardLayout from "../../components/layout/DashboardLayout";

import Card from "../../components/ui/Card";
import StatCard from "../../components/ui/StatCard";

import { getDashboard } from "../../services/dashboardService";

function Dashboard() {

  const [stats, setStats] = useState({

    students: 0,

    mentors: 0,

    courses: 0,

    batches: 0,

  });

  const [recentStudents, setRecentStudents] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    loadDashboard();

  }, []);

  const loadDashboard = async () => {

    try {

      const res = await getDashboard();

      setStats(res.stats);

      setRecentStudents(res.recentStudents);

    }

    catch (err) {

      console.log(err);

    }

    finally {

      setLoading(false);

    }

  };

  if (loading) {

    return (

      <DashboardLayout>

        <div className="text-center py-20 text-xl">

          Loading Dashboard...

        </div>

      </DashboardLayout>

    );

  }

  return (

    <DashboardLayout>

      <div className="mb-8">

        <h1 className="text-4xl font-bold">

          Dashboard

        </h1>

        <p className="text-gray-500 mt-2">

          Welcome back 👋

        </p>

      </div>

      {/* Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <StatCard

          title="Students"

          value={stats.students}

          icon={<FaUserGraduate />}

          color="bg-cyan-600"

        />

        <StatCard

          title="Courses"

          value={stats.courses}

          icon={<FaBookOpen />}

          color="bg-green-600"

        />

        <StatCard

          title="Mentors"

          value={stats.mentors}

          icon={<FaChalkboardTeacher />}

          color="bg-orange-600"

        />

        <StatCard

          title="Batches"

          value={stats.batches}

          icon={<FaLayerGroup />}

          color="bg-purple-600"

        />

      </div>

      {/* Recent Students */}

      <div className="mt-8">

        <Card>

          <h2 className="text-2xl font-bold mb-6">

            Recent Students

          </h2>

          <table className="w-full">

            <thead>

              <tr className="border-b">

                <th className="text-left py-3">

                  Name

                </th>

                <th className="text-left">

                  Email

                </th>

                <th className="text-left">

                  Joined

                </th>

              </tr>

            </thead>

            <tbody>

              {

                recentStudents.map((student) => (

                  <tr

                    key={student.id}

                    className="border-b hover:bg-slate-50"

                  >

                    <td className="py-4">

                      {student.full_name}

                    </td>

                    <td>

                      {student.email}

                    </td>

                    <td>

                      {

                        new Date(

                          student.created_at

                        ).toLocaleDateString()

                      }

                    </td>

                  </tr>

                ))

              }

            </tbody>

          </table>

        </Card>

      </div>

    </DashboardLayout>

  );

}

export default Dashboard;