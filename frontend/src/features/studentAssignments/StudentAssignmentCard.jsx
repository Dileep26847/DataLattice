import { useEffect, useState } from "react";

import {
  FaFilePdf,
  FaUpload,
  FaCheckCircle,
  FaClock,
  FaExternalLinkAlt,
} from "react-icons/fa";

import toast from "react-hot-toast";

import AssignmentSubmissionModal
  from "./AssignmentSubmissionModal";

import {
  getMySubmission,
} from "../../services/studentAssignmentService";


function StudentAssignmentCard({
  assignment,
}) {

  const [open, setOpen] = useState(false);

  const [submission, setSubmission] =
    useState(null);

  const [checkingSubmission, setCheckingSubmission] =
    useState(true);


  // ======================================
  // Check Submission Status
  // ======================================

  useEffect(() => {

    checkSubmission();

  }, [assignment.id]);


  const checkSubmission = async () => {

    try {

      setCheckingSubmission(true);

      const data =
        await getMySubmission(
          assignment.id
        );

      if (data.submitted) {

        setSubmission(
          data.submission
        );

      } else {

        setSubmission(null);

      }

    } catch (err) {

      console.error(
        "Submission status error:",
        err
      );

    } finally {

      setCheckingSubmission(false);

    }

  };


  // ======================================
  // Modal Closed
  // Refresh Status
  // ======================================

  const handleCloseModal = () => {

    setOpen(false);

    checkSubmission();

  };


  // ======================================
  // Loading
  // ======================================

  if (checkingSubmission) {

    return (

      <div className="bg-white rounded-3xl shadow-lg p-6">

        <div className="animate-pulse">

          <div className="h-6 bg-slate-200 rounded w-2/3"></div>

          <div className="h-4 bg-slate-200 rounded w-full mt-4"></div>

          <div className="h-4 bg-slate-200 rounded w-4/5 mt-2"></div>

          <div className="h-12 bg-slate-200 rounded-xl mt-6"></div>

        </div>

      </div>

    );

  }


  return (

    <>

      {/* ==================================
          Assignment Card
      ================================== */}

      <div className="bg-white rounded-3xl shadow-lg p-6">

        {/* Title */}

        <h2 className="text-xl font-bold text-slate-800">

          {assignment.title}

        </h2>


        {/* Description */}

        <p className="text-slate-500 mt-3">

          {assignment.description}

        </p>


        {/* Assignment Details */}

        <div className="mt-5 space-y-2 text-slate-700">

          <p>

            📅 Due:

            <span className="font-semibold ml-2">

              {assignment.due_date}

            </span>

          </p>

          <p>

            🎯 Marks:

            <span className="font-semibold ml-2">

              {assignment.total_marks}

            </span>

          </p>

        </div>


        {/* ==================================
            Attachment
        ================================== */}

        {assignment.attachment_url && (

          <a
            href={assignment.attachment_url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mt-5 font-semibold"
          >

            <FaFilePdf />

            View Attachment

            <FaExternalLinkAlt
              className="text-xs"
            />

          </a>

        )}


        {/* ==================================
            Submission Status
        ================================== */}

        {submission ? (

          <div className="mt-6">

            {/* Submitted Badge */}

            <div className="bg-green-50 border border-green-200 rounded-2xl p-5">

              <div className="flex items-center gap-3">

                <FaCheckCircle
                  className="text-green-600 text-xl"
                />

                <div>

                  <h3 className="font-bold text-green-700">

                    Assignment Submitted

                  </h3>

                  <p className="text-sm text-green-600 mt-1">

                    Your submission has been received.

                  </p>

                </div>

              </div>


              {/* Submitted Date */}

              {submission.submitted_at && (

                <div className="flex items-center gap-2 text-sm text-slate-600 mt-4">

                  <FaClock />

                  Submitted:

                  <span className="font-semibold">

                    {new Date(
                      submission.submitted_at
                    ).toLocaleString()}

                  </span>

                </div>

              )}


              {/* Submission Link */}

              {submission.submission_url && (

                <a
                  href={submission.submission_url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 mt-4 text-blue-600 hover:text-blue-700 font-semibold"
                >

                  <FaExternalLinkAlt />

                  View My Submission

                </a>

              )}


              {/* ==================================
                  Review Information
              ================================== */}

              {submission.status && (

                <div className="mt-5 pt-4 border-t border-green-200">

                  <p className="text-sm text-slate-500">

                    Status

                  </p>

                  <span
                    className={`inline-block mt-1 px-3 py-1 rounded-full text-sm font-semibold ${
                      submission.status === "Reviewed"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >

                    {submission.status}

                  </span>

                </div>

              )}


              {/* Marks */}

              {submission.marks !== null &&
                submission.marks !== undefined && (

                  <div className="mt-4">

                    <p className="text-sm text-slate-500">

                      Marks

                    </p>

                    <p className="text-2xl font-bold text-slate-800">

                      {submission.marks}

                      <span className="text-base text-slate-400">

                        {" "}
                        / {assignment.total_marks}

                      </span>

                    </p>

                  </div>

                )}


              {/* Feedback */}

              {submission.feedback && (

                <div className="mt-4">

                  <p className="text-sm text-slate-500">

                    Mentor Feedback

                  </p>

                  <p className="mt-1 text-slate-700 bg-white rounded-xl p-3 border">

                    {submission.feedback}

                  </p>

                </div>

              )}

            </div>

          </div>

        ) : (

          /* ==================================
             Not Submitted
          ================================== */

          <button
            onClick={() => setOpen(true)}
            className="mt-6 bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 font-semibold transition"
          >

            <FaUpload />

            Submit Assignment

          </button>

        )}

      </div>


      {/* ==================================
          Submission Modal
      ================================== */}

      {open && (

        <AssignmentSubmissionModal
          assignment={assignment}
          close={handleCloseModal}
        />

      )}

    </>

  );

}

export default StudentAssignmentCard;