import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getRecentCourses } from "../../services/dashboardService";

function RecentCourses() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    if (user?.id) {
      fetchCourses();
    }
  }, []);

  const fetchCourses = async () => {
    try {
      const data = await getRecentCourses(user.id);
      setCourses(data.courses);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg p-8">

      <h2 className="text-2xl font-bold mb-8">
        Recent Courses
      </h2>

      {courses.length === 0 ? (
        <div className="text-center text-gray-500 py-10">
          No enrolled courses yet.
        </div>
      ) : (
        <div className="space-y-5">

          {courses.map((course) => (

            <motion.div
              key={course.id}
              whileHover={{ x: 5 }}
              className="border rounded-2xl p-5 flex gap-5 items-center"
            >

              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-20 h-20 rounded-xl object-cover"
              />

              <div className="flex-1">

                <h3 className="font-bold text-lg">
                  {course.title}
                </h3>

                <p className="text-gray-500 text-sm mt-2">
                  {course.description.substring(0, 80)}...
                </p>

                <p className="text-blue-600 mt-2 text-sm">
                  {course.instructor}
                </p>

              </div>

            </motion.div>

          ))}

        </div>
      )}

    </div>
  );
}

export default RecentCourses;