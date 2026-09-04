import { useState } from "react";

import QuizList from "../features/quizzes/QuizList";
import QuizFormModal from "../features/quizzes/QuizFormModal";

function AdminQuizPage() {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-8">

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-4xl font-bold">
            Quiz Management
          </h1>

          <p className="text-slate-500">
            Create and manage quizzes.
          </p>

        </div>

        <button
          onClick={() => setOpen(true)}
          className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-xl font-semibold"
        >
          + Create Quiz
        </button>

      </div>

      <QuizList />

      {open && (
        <QuizFormModal
          close={() => setOpen(false)}
          reload={() => window.location.reload()}
        />
      )}

    </div>
  );
}

export default AdminQuizPage;