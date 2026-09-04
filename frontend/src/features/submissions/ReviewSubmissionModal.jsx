import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import SubmissionForm from "./SubmissionForm";
import { reviewSubmission } from "../../services/submissionService";

function ReviewSubmissionModal({
  submission,
  close,
  refresh,
}) {

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({

    marks: "",

    feedback: "",

    status: "Pending",

  });

  useEffect(() => {

    if (submission) {

      setForm({

        marks: submission.marks || "",

        feedback: submission.feedback || "",

        status: submission.status || "Pending",

      });

    }

  }, [submission]);

  const handleChange = (e) => {

    setForm({

      ...form,

      [e.target.name]: e.target.value,

    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      await reviewSubmission(

        submission.id,

        {

          ...form,

          marks: Number(form.marks),

        }

      );

      toast.success("Submission Reviewed Successfully");

      refresh();

      close();

    }

    catch (err) {

      console.log(err);

      toast.error("Review Failed");

    }

    finally {

      setLoading(false);

    }

  };

  return (

    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-6">

      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl p-8">

        <div className="flex justify-between items-center mb-8">

          <div>

            <h2 className="text-3xl font-black">

              Review Submission

            </h2>

            <p className="text-slate-500 mt-2">

              {submission.assignment_title}

            </p>

          </div>

          <button
            onClick={close}
            className="text-3xl hover:text-red-500"
          >
            ✕
          </button>

        </div>

        <SubmissionForm

          form={form}

          handleChange={handleChange}

          handleSubmit={handleSubmit}

          loading={loading}

          close={close}

        />

      </div>

    </div>

  );

}

export default ReviewSubmissionModal;