import { FaCheckCircle } from "react-icons/fa";

function QuestionPalette({

    questions,

    answers,

    currentQuestion,

    setCurrentQuestion

}) {

    const isAnswered = (questionId) => {

        return answers.some(

            answer =>

                answer.question_id === questionId

        );

    };

    return (

        <div className="bg-white rounded-3xl shadow-lg p-6 sticky top-8">

            {/* Header */}

            <div className="flex items-center gap-3">

                <FaCheckCircle

                    className="text-green-600"

                    size={24}

                />

                <h2 className="text-2xl font-bold">

                    Question Palette

                </h2>

            </div>

            <p className="text-slate-500 mt-2">

                Click any question to navigate instantly.

            </p>

            {/* Grid */}

            <div className="grid grid-cols-5 gap-4 mt-8">

                {

                    questions.map((question, index) => {

                        const answered = isAnswered(

                            question.id

                        );

                        const active =

                            currentQuestion === index;

                        return (

                            <button

                                key={question.id}

                                onClick={() =>

                                    setCurrentQuestion(index)

                                }

                                className={`

                                    h-12

                                    rounded-xl

                                    font-bold

                                    transition

                                    ${

                                        active

                                            ? "bg-indigo-600 text-white"

                                            : answered

                                                ? "bg-green-500 text-white"

                                                : "bg-slate-200 hover:bg-slate-300"

                                    }

                                `}

                            >

                                {index + 1}

                            </button>

                        );

                    })

                }

            </div>

            {/* Legend */}

            <div className="mt-10 space-y-3 text-sm">

                <div className="flex items-center gap-3">

                    <div className="w-5 h-5 rounded bg-indigo-600"></div>

                    <span>

                        Current Question

                    </span>

                </div>

                <div className="flex items-center gap-3">

                    <div className="w-5 h-5 rounded bg-green-500"></div>

                    <span>

                        Answered

                    </span>

                </div>

                <div className="flex items-center gap-3">

                    <div className="w-5 h-5 rounded bg-slate-300"></div>

                    <span>

                        Not Answered

                    </span>

                </div>

            </div>

            {/* Progress */}

            <div className="mt-8 border-t pt-6">

                <div className="flex justify-between">

                    <span>

                        Answered

                    </span>

                    <strong>

                        {answers.length}

                    </strong>

                </div>

                <div className="flex justify-between mt-3">

                    <span>

                        Remaining

                    </span>

                    <strong>

                        {questions.length - answers.length}

                    </strong>

                </div>

                <div className="flex justify-between mt-3">

                    <span>

                        Total

                    </span>

                    <strong>

                        {questions.length}

                    </strong>

                </div>

            </div>

        </div>

    );

}

export default QuestionPalette;