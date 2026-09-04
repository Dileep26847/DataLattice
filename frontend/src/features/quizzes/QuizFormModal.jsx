import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  createQuiz,
  updateQuiz,
} from "../../services/quizService";

import {
  getCourses,
} from "../../services/courseService";

function QuizFormModal({
  close,
  reload,
  editQuiz,
}) {
  const [courses, setCourses] = useState([]);

  const [formData, setFormData] = useState({
    course_id: "",
    title: "",
    description: "",
    time_limit: 30,
    passing_marks: 40,
    total_marks: 100,
    status: "Draft",
  });

  // ======================================
  // Load Courses + Edit Data
  // ======================================

  useEffect(() => {
    loadCourses();

    if (editQuiz) {
      setFormData({
        course_id: editQuiz.course_id || "",
        title: editQuiz.title || "",
        description: editQuiz.description || "",
        time_limit: editQuiz.time_limit || 30,
        passing_marks: editQuiz.passing_marks || 40,
        total_marks: editQuiz.total_marks || 100,
        status: editQuiz.status || "Draft",
      });
    }
  }, [editQuiz]);

  // ======================================
  // Load Courses
  // ======================================

  const loadCourses = async () => {
    try {
      const data = await getCourses();
      setCourses(data.courses || []);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load courses");
    }
  };

  // ======================================
  // Handle Change
  // ======================================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ======================================
  // Submit
  // ======================================

  const handleSubmit = async () => {
    if (!formData.course_id) {
      return toast.error("Please select a course");
    }

    if (!formData.title.trim()) {
      return toast.error("Quiz title is required");
    }

    try {
      if (editQuiz) {
        await updateQuiz(editQuiz.id, formData);
        toast.success("Quiz Updated Successfully");
      } else {
        await createQuiz(formData);
        toast.success("Quiz Created Successfully");
      }

      reload();
      close();
    } catch (err) {
      console.log(err);
      toast.error("Operation Failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

      <div className="bg-white rounded-3xl shadow-xl w-full max-w-2xl p-8">

        <div className="flex justify-between items-center mb-8">

          <h2 className="text-3xl font-bold">
            {editQuiz ? "Edit Quiz" : "Create Quiz"}
          </h2>

          <button
            onClick={close}
            className="text-2xl font-bold text-gray-500 hover:text-red-500"
          >
            ✕
          </button>

        </div>

        <div className="space-y-5">

          {/* Course */}

          <div>
            <label className="block mb-2 font-semibold">
              Course
            </label>

            <select
              name="course_id"
              value={formData.course_id}
              onChange={handleChange}
              className="w-full border rounded-xl p-3"
            >
              <option value="">
                Select Course
              </option>

              {courses.map((course) => (
                <option
                  key={course.id}
                  value={course.id}
                >
                  {course.title}
                </option>
              ))}
            </select>
          </div>

          {/* Title */}

          <div>
            <label className="block mb-2 font-semibold">
              Quiz Title
            </label>

            <input
              type="text"
              name="title"
              placeholder="Enter Quiz Title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border rounded-xl p-3"
            />
          </div>

          {/* Description */}

          <div>
            <label className="block mb-2 font-semibold">
              Description
            </label>

            <textarea
              rows="4"
              name="description"
              placeholder="Quiz Description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border rounded-xl p-3"
            />
          </div>

          {/* Numbers */}

          <div className="grid grid-cols-3 gap-4">

            <div>
              <label className="block mb-2 font-semibold">
                Time (Minutes)
              </label>

              <input
                type="number"
                name="time_limit"
                value={formData.time_limit}
                onChange={handleChange}
                className="w-full border rounded-xl p-3"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">
                Passing Marks
              </label>

              <input
                type="number"
                name="passing_marks"
                value={formData.passing_marks}
                onChange={handleChange}
                className="w-full border rounded-xl p-3"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">
                Total Marks
              </label>

              <input
                type="number"
                name="total_marks"
                value={formData.total_marks}
                onChange={handleChange}
                className="w-full border rounded-xl p-3"
              />
            </div>

          </div>

          {/* Status */}

          <div>
            <label className="block mb-2 font-semibold">
              Status
            </label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border rounded-xl p-3"
            >
              <option value="Draft">
                Draft
              </option>

              <option value="Published">
                Published
              </option>
            </select>
          </div>

        </div>

        {/* Buttons */}

        <div className="flex justify-end gap-4 mt-8">

          <button
            onClick={close}
            className="px-6 py-3 rounded-xl bg-gray-300 hover:bg-gray-400"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white"
          >
            {editQuiz ? "Update Quiz" : "Create Quiz"}
          </button>

        </div>

      </div>

    </div>
  );
}

export default QuizFormModal;