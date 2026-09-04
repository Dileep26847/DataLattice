import { useEffect, useState } from "react";
import Button from "../../components/common/Button";
import { getCourses } from "../../services/courseManagementService";

function LessonForm({
  form,
  handleChange,
  handleSubmit,
  loading,
  buttonText,
  close,
}) {

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const data = await getCourses();
      setCourses(data.courses || []);
    } catch (err) {
      console.log(err);
    }
  };

  return (

    <form
      onSubmit={handleSubmit}
      className="space-y-8"
    >

      {/* Course */}

      <div>

        <label className="block mb-2 font-semibold">
          Course
        </label>

        <select
          name="course_id"
          value={form.course_id}
          onChange={handleChange}
          className="w-full rounded-2xl border border-slate-300 px-5 py-4 outline-none focus:ring-2 focus:ring-cyan-500"
        >

          <option value="">
            Select Course
          </option>

          {

            courses.map((course) => (

              <option
                key={course.id}
                value={course.id}
              >
                {course.title}
              </option>

            ))

          }

        </select>

      </div>

      {/* Lesson Title */}

      <div>

        <label className="block mb-2 font-semibold">
          Lesson Title
        </label>

        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Introduction to React"
          className="w-full rounded-2xl border border-slate-300 px-5 py-4 outline-none focus:ring-2 focus:ring-cyan-500"
        />

      </div>

      {/* Description */}

      <div>

        <label className="block mb-2 font-semibold">
          Description
        </label>

        <textarea
          rows="5"
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Lesson description..."
          className="w-full rounded-2xl border border-slate-300 px-5 py-4 resize-none outline-none focus:ring-2 focus:ring-cyan-500"
        />

      </div>

      {/* Video + PDF */}

      <div className="grid lg:grid-cols-2 gap-6">

        <div>

          <label className="block mb-2 font-semibold">
            Video URL
          </label>

          <input
            type="text"
            name="video_url"
            value={form.video_url}
            onChange={handleChange}
            placeholder="https://..."
            className="w-full rounded-2xl border border-slate-300 px-5 py-4 outline-none focus:ring-2 focus:ring-cyan-500"
          />

        </div>

        <div>

          <label className="block mb-2 font-semibold">
            PDF URL
          </label>

          <input
            type="text"
            name="pdf_url"
            value={form.pdf_url}
            onChange={handleChange}
            placeholder="https://..."
            className="w-full rounded-2xl border border-slate-300 px-5 py-4 outline-none focus:ring-2 focus:ring-cyan-500"
          />

        </div>

      </div>

      {/* Lesson Order */}

      <div>

        <label className="block mb-2 font-semibold">
          Lesson Order
        </label>

        <input
          type="number"
          name="lesson_order"
          value={form.lesson_order}
          onChange={handleChange}
          placeholder="1"
          className="w-full rounded-2xl border border-slate-300 px-5 py-4 outline-none focus:ring-2 focus:ring-cyan-500"
        />

      </div>

      {/* Buttons */}

      <div className="flex justify-end gap-4">

        <Button
          type="button"
          variant="secondary"
          onClick={close}
        >
          Cancel
        </Button>

        <Button
          type="submit"
          disabled={loading}
        >
          {loading ? "Saving..." : buttonText}
        </Button>

      </div>

    </form>

  );

}

export default LessonForm;