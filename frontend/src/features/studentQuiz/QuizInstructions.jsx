import { FaClock, FaBookOpen, FaCheckCircle } from "react-icons/fa";
import toast from "react-hot-toast";

import { startQuiz } from "../../services/studentQuizService";

function QuizInstructions({

    quiz,

    setAttemptId,

    setStep

}) {

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    // ======================================
    // Start Quiz
    // ======================================

    const handleStartQuiz = async () => {

        try {

            const response = await startQuiz({

                quiz_id: quiz.id,

                student_id: user.id,

                total_questions: quiz.total_questions

            });

            setAttemptId(response.attemptId);

            toast.success("Quiz Started");

            setStep("quiz");

        } catch (err) {

            console.log(err);

            toast.error("Unable to start quiz");

        }

    };

    return (

        <div className="min-h-screen bg-slate-100 flex justify-center items-center p-8">

            <div className="bg-white rounded-3xl shadow-xl max-w-4xl w-full p-10">

                {/* Header */}

                <div className="text-center">

                    <h1 className="text-4xl font-black">

                        {quiz.title}

                    </h1>

                    <p className="mt-4 text-slate-500">

                        Read all the instructions carefully before starting the quiz.

                    </p>

                </div>

                {/* Quiz Information */}

                <div className="grid md:grid-cols-3 gap-6 mt-10">

                    <div className="bg-indigo-50 rounded-2xl p-6">

                        <FaBookOpen
                            className="text-indigo-600"
                            size={32}
                        />

                        <h3 className="mt-4 font-bold">

                            Questions

                        </h3>

                        <p className="text-3xl font-black mt-2">

                            {quiz.total_questions}

                        </p>

                    </div>

                    <div className="bg-green-50 rounded-2xl p-6">

                        <FaClock
                            className="text-green-600"
                            size={32}
                        />

                        <h3 className="mt-4 font-bold">

                            Duration

                        </h3>

                        <p className="text-3xl font-black mt-2">

                            {quiz.time_limit} Min

                        </p>

                    </div>

                    <div className="bg-yellow-50 rounded-2xl p-6">

                        <FaCheckCircle
                            className="text-yellow-600"
                            size={32}
                        />

                        <h3 className="mt-4 font-bold">

                            Total Marks

                        </h3>

                        <p className="text-3xl font-black mt-2">

                            {quiz.total_marks}

                        </p>

                    </div>

                </div>

                {/* Rules */}

                <div className="mt-10">

                    <h2 className="text-2xl font-bold">

                        Instructions

                    </h2>

                    <ul className="mt-5 space-y-3 text-slate-700">

                        <li>
                            ✅ Read each question carefully before answering.
                        </li>

                        <li>
                            ✅ Every question has only one correct answer.
                        </li>

                        <li>
                            ✅ Timer starts immediately after clicking Start Quiz.
                        </li>

                        <li>
                            ✅ The quiz will auto-submit when the timer ends.
                        </li>

                        <li>
                            ✅ You cannot edit answers after submission.
                        </li>

                        <li>
                            ✅ Your score will be calculated automatically.
                        </li>

                    </ul>

                </div>

                {/* Buttons */}

                <div className="flex justify-end gap-4 mt-10">

                    <button

                        onClick={() => setStep("list")}

                        className="px-6 py-3 rounded-xl bg-gray-300 hover:bg-gray-400"

                    >

                        Back

                    </button>

                    <button

                        onClick={handleStartQuiz}

                        className="px-8 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold"

                    >

                        Start Quiz

                    </button>

                </div>

            </div>

        </div>

    );

}

export default QuizInstructions;