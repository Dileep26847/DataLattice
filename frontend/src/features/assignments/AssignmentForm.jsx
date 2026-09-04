import { useEffect, useState } from "react";
import Button from "../../components/common/Button";
import { getCourses } from "../../services/courseManagementService";

function AssignmentForm({
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

      {/* Assignment Title */}

      <div>

        <label className="block mb-2 font-semibold">

          Assignment Title

        </label>

        <input

          type="text"

          name="title"

          value={form.title}

          onChange={handleChange}

          placeholder="React Dashboard Assignment"

          className="w-full rounded-xl border border-slate-300 px-5 py-4 outline-none"

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

          placeholder="Assignment Description..."

          className="w-full rounded-xl border border-slate-300 px-5 py-4 resize-none outline-none"

        />

      </div>

      {/* Due Date + Marks */}

      <div className="grid md:grid-cols-2 gap-6">

        <div>

          <label className="block mb-2 font-semibold">

            Due Date

          </label>

          <input

            type="date"

            name="due_date"

            value={form.due_date}

            onChange={handleChange}

            className="w-full rounded-xl border border-slate-300 px-5 py-4 outline-none"

          />

        </div>

        <div>

          <label className="block mb-2 font-semibold">

            Total Marks

          </label>

          <input

            type="number"

            name="total_marks"

            value={form.total_marks}

            onChange={handleChange}

            placeholder="100"

            className="w-full rounded-xl border border-slate-300 px-5 py-4 outline-none"

          />

        </div>

      </div>

      {/* Attachment */}

      <div>

        <label className="block mb-2 font-semibold">

          Attachment URL

        </label>

        <input

          type="text"

          name="attachment_url"

          value={form.attachment_url}

          onChange={handleChange}

          placeholder="https://example.com/file.pdf"

          className="w-full rounded-xl border border-slate-300 px-5 py-4 outline-none"

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

export default AssignmentForm;