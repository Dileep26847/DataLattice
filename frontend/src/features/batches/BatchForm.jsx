import { useEffect, useState } from "react";
import Button from "../../components/common/Button";
import { getCourses } from "../../services/courseManagementService";

function BatchForm({
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

    }

    catch (err) {

      console.log(err);

    }

  };

  return (

    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >

      {/* Batch Name */}

      <div>

        <label className="block mb-2 font-semibold">

          Batch Name

        </label>

        <input
          type="text"
          name="batch_name"
          value={form.batch_name}
          onChange={handleChange}
          placeholder="Java Full Stack - Aug 2026"
          className="w-full rounded-xl border border-slate-300 px-5 py-4 outline-none"
        />

      </div>

      {/* Course */}

      <div>

        <label className="block mb-2 font-semibold">

          Course

        </label>

        <select
          name="course_id"
          value={form.course_id}
          onChange={handleChange}
          className="w-full rounded-xl border border-slate-300 px-5 py-4 outline-none"
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

      {/* Mentor */}

      <div>

        <label className="block mb-2 font-semibold">

          Mentor Name

        </label>

        <input
          type="text"
          name="mentor_name"
          value={form.mentor_name}
          onChange={handleChange}
          placeholder="John David"
          className="w-full rounded-xl border border-slate-300 px-5 py-4 outline-none"
        />

      </div>

      {/* Dates */}

      <div className="grid lg:grid-cols-2 gap-6">

        <div>

          <label className="block mb-2 font-semibold">

            Start Date

          </label>

          <input
            type="date"
            name="start_date"
            value={form.start_date}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 px-5 py-4 outline-none"
          />

        </div>

        <div>

          <label className="block mb-2 font-semibold">

            End Date

          </label>

          <input
            type="date"
            name="end_date"
            value={form.end_date}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 px-5 py-4 outline-none"
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
          value={form.status}
          onChange={handleChange}
          className="w-full rounded-xl border border-slate-300 px-5 py-4 outline-none"
        >

          <option value="Upcoming">

            Upcoming

          </option>

          <option value="Ongoing">

            Ongoing

          </option>

          <option value="Completed">

            Completed

          </option>

        </select>

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

export default BatchForm;