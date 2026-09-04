import { useState } from "react";
import toast from "react-hot-toast";

import AssignmentForm from "./AssignmentForm";
import { createAssignment } from "../../services/assignmentService";

function AddAssignmentModal({
  close,
  refresh,
}) {

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({

    course_id: "",

    title: "",

    description: "",

    due_date: "",

    total_marks: 100,

    attachment_url: "",

  });

  const handleChange = (e) => {

    setForm({

      ...form,

      [e.target.name]: e.target.value,

    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!form.course_id || !form.title) {

      return toast.error(
        "Course and Assignment Title are required."
      );

    }

    try {

      setLoading(true);

      await createAssignment({

        ...form,

        course_id: Number(form.course_id),

        total_marks: Number(form.total_marks),

      });

      toast.success("Assignment Created Successfully");

      refresh();

      close();

    }

    catch (err) {

      console.log(err);

      toast.error("Failed to create assignment");

    }

    finally {

      setLoading(false);

    }

  };

  return (

    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-6">

      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl p-8 max-h-[95vh] overflow-auto">

        <div className="flex justify-between items-center mb-8">

          <div>

            <h2 className="text-3xl font-black">

              Create Assignment

            </h2>

            <p className="text-slate-500 mt-2">

              Create a new assignment.

            </p>

          </div>

          <button

            onClick={close}

            className="text-3xl hover:text-red-500"

          >

            ✕

          </button>

        </div>

        <AssignmentForm

          form={form}

          handleChange={handleChange}

          handleSubmit={handleSubmit}

          loading={loading}

          buttonText="Create Assignment"

          close={close}

        />

      </div>

    </div>

  );

}

export default AddAssignmentModal;