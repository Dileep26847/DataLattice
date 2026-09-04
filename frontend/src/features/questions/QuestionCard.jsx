import { useState } from "react";
import {
  FaEdit,
  FaTrash,
  FaCheckCircle,
} from "react-icons/fa";

import QuestionFormModal from "./QuestionFormModal";
import DeleteQuestionModal from "./DeleteQuestionModal";

function QuestionCard({
  question,
  reload,
}) {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  return (
    <>
      <div className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-xl transition">

        <div className="flex justify-between items-start">

          <div>

            <h2 className="text-xl font-bold">
              {question.question}
            </h2>

            <div className="mt-5 space-y-2">

              <p>
                <strong>A :</strong> {question.option1}
              </p>

              <p>
                <strong>B :</strong> {question.option2}
              </p>

              <p>
                <strong>C :</strong> {question.option3}
              </p>

              <p>
                <strong>D :</strong> {question.option4}
              </p>

            </div>

            <div className="mt-5 flex items-center gap-2 text-green-600 font-semibold">

              <FaCheckCircle />

              Correct Option :
              {question.correct_option}

            </div>

            {
              question.marks && (

                <p className="mt-2 text-slate-600">

                  Marks :
                  <strong> {question.marks}</strong>

                </p>

              )
            }

          </div>

        </div>

        <div className="flex gap-4 mt-8">

          <button
            onClick={() => setOpenEdit(true)}
            className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-xl flex justify-center items-center gap-2"
          >

            <FaEdit />

            Edit

          </button>

          <button
            onClick={() => setOpenDelete(true)}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl flex justify-center items-center gap-2"
          >

            <FaTrash />

            Delete

          </button>

        </div>

      </div>

      {
        openEdit && (

          <QuestionFormModal
            editQuestion={question}
            reload={reload}
            close={() => setOpenEdit(false)}
          />

        )
      }

      {
        openDelete && (

          <DeleteQuestionModal
            question={question}
            reload={reload}
            close={() => setOpenDelete(false)}
          />

        )
      }

    </>
  );
}

export default QuestionCard;