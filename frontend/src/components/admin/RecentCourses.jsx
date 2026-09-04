import { useEffect, useState } from "react";
import {
  FaBookOpen,
  FaUserTie,
} from "react-icons/fa";

import { getDashboard } from "../../services/adminService";
import Card from "../common/Card";
import Button from "../common/Button";

function RecentCourses() {

  const [courses, setCourses] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {

    try {

      const data = await getDashboard();

      setCourses(data.recentCourses || []);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }

  };

  return (

    <Card

      title="Recent Courses"

      subtitle="Latest published courses"

      action={

        <Button size="sm">

          View All

        </Button>

      }

    >

      {

        loading ?

        (

          <div className="text-center py-10 text-slate-500">

            Loading Courses...

          </div>

        )

        :

        courses.length === 0 ?

        (

          <div className="text-center py-10 text-slate-500">

            No Courses Found

          </div>

        )

        :

        (

          <div className="space-y-5">

            {

              courses.map((course) => (

                <div

                  key={course.id}

                  className="flex justify-between items-center p-5 rounded-2xl border border-slate-200 hover:border-cyan-500 hover:shadow-lg transition-all"

                >

                  <div>

                    <h3 className="font-bold text-lg flex items-center gap-3">

                      <FaBookOpen className="text-cyan-600" />

                      {course.title}

                    </h3>

                    <p className="text-slate-500 mt-2 flex items-center gap-2">

                      <FaUserTie />

                      {course.instructor}

                    </p>

                  </div>

                  <div className="text-right">

                    <h2 className="text-2xl font-black text-emerald-600">

                      ₹{course.price}

                    </h2>

                  </div>

                </div>

              ))

            }

          </div>

        )

      }

    </Card>

  );

}

export default RecentCourses;