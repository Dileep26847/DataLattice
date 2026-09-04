import { useState } from "react";
import toast from "react-hot-toast";

import LessonForm from "./LessonForm";
import { addLesson } from "../../services/lessonManagementService";

function AddLessonModal({
  close,
  refresh,
}) {

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({

    course_id: "",

    title: "",

    description: "",

    video_url: "",

    pdf_url: "",

    lesson_order: "",

  });

  const handleChange = (e) => {

    setForm({

      ...form,

      [e.target.name]: e.target.value,

    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (

      !form.course_id ||

      !form.title ||

      !form.lesson_order

    ) {

      return toast.error(

        "Course, Lesson Title and Lesson Order are required."

      );

    }

    try {

      setLoading(true);

      await addLesson({

        ...form,

        course_id: Number(form.course_id),

        lesson_order: Number(form.lesson_order),

      });

      toast.success("Lesson Added Successfully");

      refresh();

      close();

    }

    catch (err) {

      console.log(err);

      toast.error("Failed to add lesson");

    }

    finally {

      setLoading(false);

    }

  };

  return (

    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-6">

      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl p-8 overflow-y-auto max-h-[95vh]">

        <div className="flex justify-between items-center mb-8">

          <div>

            <h2 className="text-3xl font-black">

              Add New Lesson

            </h2>

            <p className="text-slate-500 mt-2">

              Create a new lesson for any course.

            </p>

          </div>

          <button

            onClick={close}

            className="text-3xl font-bold text-slate-500 hover:text-red-500"

          >

            ✕

          </button>

        </div>

        <LessonForm

          form={form}

          handleChange={handleChange}

          handleSubmit={handleSubmit}

          loading={loading}

          buttonText="Add Lesson"

          close={close}

        />

      </div>

    </div>

  );

}

export default AddLessonModal;