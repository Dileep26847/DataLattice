import { useState } from "react";
import toast from "react-hot-toast";
import { FaTimes, FaLink, FaPaperPlane } from "react-icons/fa";

import { submitAssignment } from "../../services/studentAssignmentService";

function AssignmentSubmissionModal({
  assignment,
  close,
}) {

  const user = JSON.parse(localStorage.getItem("user"));

  const [loading, setLoading] = useState(false);

  const [submissionUrl, setSubmissionUrl] = useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!submissionUrl) {

      return toast.error("Please enter your submission URL.");

    }

    try {

      setLoading(true);

      await submitAssignment({

        assignment_id: assignment.id,

        student_id: user.id,

        submission_url: submissionUrl,

      });

      toast.success("Assignment submitted successfully!");

      close();

    }

    catch (err) {

      console.log(err);

      toast.error(

        err.response?.data?.message ||

        "Submission failed."

      );

    }

    finally {

      setLoading(false);

    }

  };

  return (

    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-6">

      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl">

        {/* Header */}

        <div className="flex justify-between items-center border-b p-6">

          <div>

            <h2 className="text-2xl font-bold">

              Submit Assignment

            </h2>

            <p className="text-slate-500 mt-1">

              {assignment.title}

            </p>

          </div>

          <button

            onClick={close}

            className="text-2xl hover:text-red-500"

          >

            <FaTimes />

          </button>

        </div>

        {/* Form */}

        <form

          onSubmit={handleSubmit}

          className="p-6 space-y-6"

        >

          <div>

            <label className="block font-semibold mb-2">

              Submission Link

            </label>

            <div className="relative">

              <FaLink className="absolute left-4 top-4 text-slate-400" />

              <input

                type="text"

                value={submissionUrl}

                onChange={(e)=>setSubmissionUrl(e.target.value)}

                placeholder="Paste Google Drive / GitHub / PDF link"

                className="w-full border border-slate-300 rounded-xl py-4 pl-12 pr-4 outline-none focus:ring-2 focus:ring-cyan-500"

              />

            </div>

            <p className="text-sm text-slate-500 mt-2">

              Example:

              https://drive.google.com/

            </p>

          </div>

          <div className="bg-cyan-50 rounded-xl p-4">

            <h3 className="font-bold">

              Assignment Details

            </h3>

            <div className="mt-3 space-y-2 text-sm">

              <p>

                📅 Due Date:

                <span className="font-semibold ml-2">

                  {assignment.due_date}

                </span>

              </p>

              <p>

                🎯 Total Marks:

                <span className="font-semibold ml-2">

                  {assignment.total_marks}

                </span>

              </p>

            </div>

          </div>

          <div className="flex justify-end gap-4">

            <button

              type="button"

              onClick={close}

              className="px-6 py-3 rounded-xl bg-slate-200 hover:bg-slate-300"

            >

              Cancel

            </button>

            <button

              type="submit"

              disabled={loading}

              className="px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white flex items-center gap-2"

            >

              <FaPaperPlane />

              {

                loading

                ?

                "Submitting..."

                :

                "Submit Assignment"

              }

            </button>

          </div>

        </form>

      </div>

    </div>

  );

}

export default AssignmentSubmissionModal;