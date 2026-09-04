import toast from "react-hot-toast";

import { deleteQuiz } from "../../services/quizService";

function DeleteQuizModal({
  quiz,
  close,
  reload,
}) {

  const handleDelete = async () => {

    try {

      await deleteQuiz(quiz.id);

      toast.success("Quiz Deleted");

      reload();

      close();

    } catch (err) {

      console.log(err);

      toast.error("Delete Failed");

    }

  };

  return (

    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white rounded-3xl p-8 w-[450px]">

        <h2 className="text-3xl font-bold">

          Delete Quiz

        </h2>

        <p className="mt-6 text-slate-600">

          Are you sure you want to delete

          <strong> {quiz.title}</strong> ?

        </p>

        <div className="flex justify-end gap-4 mt-8">

          <button
            onClick={close}
            className="bg-gray-300 px-5 py-3 rounded-xl"
          >

            Cancel

          </button>

          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-5 py-3 rounded-xl"
          >

            Delete

          </button>

        </div>

      </div>

    </div>

  );

}

export default DeleteQuizModal;