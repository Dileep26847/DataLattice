import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { getCourseAssignments } from "../../services/studentAssignmentService";
import StudentAssignmentCard from "./StudentAssignmentCard";

function StudentAssignments({ courseId }) {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (courseId) {
      loadAssignments();
    }
  }, [courseId]);

  const loadAssignments = async () => {
    try {
      setLoading(true);

      const data = await getCourseAssignments(courseId);

      setAssignments(data.assignments || []);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load assignments");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="mt-10 bg-white rounded-2xl p-6 shadow">
        Loading assignments...
      </div>
    );
  }

  return (
    <div className="mt-10">
      <h2 className="text-3xl font-bold mb-6">
        Assignments
      </h2>

      {assignments.length === 0 ? (
        <div className="bg-white rounded-2xl p-8 shadow text-center text-slate-500">
          No assignments found.
        </div>
      ) : (
        <div className="grid lg:grid-cols-2 gap-6">
          {assignments.map((assignment) => (
            <StudentAssignmentCard
              key={assignment.id}
              assignment={assignment}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default StudentAssignments;