import { useParams } from "react-router-dom";

import QuestionList from "../features/questions/QuestionList";

function QuestionManagement() {

  const { quizId } = useParams();

  return (

    <div className="min-h-screen bg-slate-100">

      <div className="max-w-7xl mx-auto px-8 py-10">

        <QuestionList quizId={quizId} />

      </div>

    </div>

  );

}

export default QuestionManagement;