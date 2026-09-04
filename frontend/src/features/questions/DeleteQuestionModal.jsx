import toast from "react-hot-toast";

import { deleteQuestion } from "../../services/questionService";

function DeleteQuestionModal({
  question,
  reload,
  close,
}) {

  const handleDelete = async () => {

    try {

      await deleteQuestion(question.id);

      toast.success("Question Deleted Successfully");

      reload();

      close();

    } catch (err) {

      console.log(err);

      toast.error("Failed to delete question");

    }

  };

  return (

    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

      <div className="bg-white rounded-3xl p-8 w-[450px]">

        <h2 className="text-2xl font-bold">
          Delete Question
        </h2>

        <p className="mt-5 text-slate-600">
          Are you sure you want to delete this question?
        </p>

        <p className="mt-3 font-semibold">
          "{question.question}"
        </p>

        <div className="flex justify-end gap-4 mt-8">

          <button
            onClick={close}
            className="bg-gray-300 hover:bg-gray-400 px-5 py-3 rounded-xl"
          >
            Cancel
          </button>

          <button
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-xl"
          >
            Delete
          </button>

        </div>

      </div>

    </div>

  );

}

export default DeleteQuestionModal;