import { useState } from "react";
import { Link } from "react-router-dom";

import {
  FaClock,
  FaEdit,
  FaTrash,
  FaCheckCircle,
  FaQuestionCircle,
} from "react-icons/fa";

import QuizFormModal from "./QuizFormModal";
import DeleteQuizModal from "./DeleteQuizModal";

function QuizCard({
  quiz,
  reload,
}) {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  return (
    <>
      <div className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-xl transition">

        {/* Header */}

        <div className="flex justify-between items-start">

          <div>

            <h2 className="text-2xl font-bold">
              {quiz.title}
            </h2>

            <p className="text-slate-500 mt-2">
              {quiz.description}
            </p>

          </div>

          <span
            className={`px-4 py-2 rounded-full text-sm font-semibold ${
              quiz.status === "Published"
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {quiz.status}
          </span>

        </div>

        {/* Details */}

        <div className="mt-8 space-y-4">

          <div className="flex items-center gap-3">

            <FaClock className="text-blue-600" />

            <span>
              Time Limit :
              <strong> {quiz.time_limit} Minutes</strong>
            </span>

          </div>

          <div className="flex items-center gap-3">

            <FaCheckCircle className="text-green-600" />

            <span>
              Passing Marks :
              <strong> {quiz.passing_marks}</strong>
            </span>

          </div>

          <div className="flex items-center gap-3">

            <FaCheckCircle className="text-purple-600" />

            <span>
              Total Marks :
              <strong> {quiz.total_marks}</strong>
            </span>

          </div>

        </div>

        {/* Buttons */}

        <div className="grid grid-cols-3 gap-3 mt-8">

          <button
            onClick={() => setOpenEdit(true)}
            className="bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-xl flex justify-center items-center gap-2 transition"
          >
            <FaEdit />
            Edit
          </button>

          <button
            onClick={() => setOpenDelete(true)}
            className="bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl flex justify-center items-center gap-2 transition"
          >
            <FaTrash />
            Delete
          </button>

          <Link
            to={`/admin/quizzes/${quiz.id}/questions`}
            className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl flex justify-center items-center gap-2 transition"
          >
            <FaQuestionCircle />
            Questions
          </Link>

        </div>

      </div>

      {/* Edit Modal */}

      {openEdit && (
        <QuizFormModal
          editQuiz={quiz}
          reload={reload}
          close={() => setOpenEdit(false)}
        />
      )}

      {/* Delete Modal */}

      {openDelete && (
        <DeleteQuizModal
          quiz={quiz}
          reload={reload}
          close={() => setOpenDelete(false)}
        />
      )}
    </>
  );
}

export default QuizCard;