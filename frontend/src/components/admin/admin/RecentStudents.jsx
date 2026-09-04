import { useEffect, useState } from "react";
import { getDashboard } from "../../services/adminService";

function RecentStudents() {

  const [students, setStudents] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    loadStudents();

  }, []);

  const loadStudents = async () => {

    try {

      const data = await getDashboard();

      setStudents(data.recentStudents);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="bg-white rounded-3xl shadow-lg p-8">

      <div className="flex justify-between items-center mb-8">

        <div>

          <h2 className="text-3xl font-black">

            Recent Students

          </h2>

          <p className="text-slate-500">

            Latest registered students

          </p>

        </div>

      </div>

      {

        loading ? (

          <div className="py-10">

            Loading...

          </div>

        ) : (

          <table className="w-full">

            <thead>

              <tr className="text-left border-b">

                <th className="pb-4">Student</th>

                <th>Email</th>

                <th>Joined</th>

              </tr>

            </thead>

            <tbody>

              {

                students.map((student) => (

                  <tr
                    key={student.id}
                    className="border-b hover:bg-slate-50"
                  >

                    <td className="py-5 flex items-center gap-4">

                      <img
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                          student.full_name
                        )}&background=0891b2&color=fff`}
                        alt=""
                        className="w-12 h-12 rounded-full"
                      />

                      <span className="font-semibold">

                        {student.full_name}

                      </span>

                    </td>

                    <td>

                      {student.email}

                    </td>

                    <td>

                      {

                        new Date(student.created_at)

                        .toLocaleDateString()

                      }

                    </td>

                  </tr>

                ))

              }

            </tbody>

          </table>

        )

      }

    </div>

  );

}

export default RecentStudents;