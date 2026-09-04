import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import AssignmentForm from "./AssignmentForm";
import { updateAssignment } from "../../services/assignmentService";

function EditAssignmentModal({
  assignment,
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

  useEffect(() => {

    if (assignment) {

      setForm({

        course_id: assignment.course_id || "",

        title: assignment.title || "",

        description: assignment.description || "",

        due_date: assignment.due_date?.split("T")[0] || "",

        total_marks: assignment.total_marks || 100,

        attachment_url: assignment.attachment_url || "",

      });

    }

  }, [assignment]);

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

      await updateAssignment(

        assignment.id,

        {

          ...form,

          course_id: Number(form.course_id),

          total_marks: Number(form.total_marks),

        }

      );

      toast.success("Assignment Updated Successfully");

      refresh();

      close();

    }

    catch (err) {

      console.log(err);

      toast.error("Update Failed");

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

              Edit Assignment

            </h2>

            <p className="text-slate-500 mt-2">

              Update assignment details.

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

          buttonText="Update Assignment"

          close={close}

        />

      </div>

    </div>

  );

}

export default EditAssignmentModal;