import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

import { FaPlus } from "react-icons/fa";

import { getQuestionsByQuiz } from "../../services/questionService";

import QuestionCard from "./QuestionCard";
import QuestionFormModal from "./QuestionFormModal";

function QuestionList({ quizId: propQuizId }) {

    const { quizId: urlQuizId } = useParams();

    const quizId = propQuizId || urlQuizId;

    const [questions, setQuestions] = useState([]);

    const [open, setOpen] = useState(false);

    // ======================================
    // Load Questions
    // ======================================

    const loadQuestions = async () => {

        try {

            const data = await getQuestionsByQuiz(quizId);

            setQuestions(data.questions || []);

        } catch (err) {

            console.log(err);

            toast.error("Failed to load questions");

        }

    };

    useEffect(() => {

        if (quizId) {
            loadQuestions();
        }

    }, [quizId]);

    return (

        <div>

            {/* Header */}

            <div className="flex justify-between items-center mb-8">

                <div>

                    <h1 className="text-4xl font-bold">

                        Question Management

                    </h1>

                    <p className="text-slate-500 mt-2">

                        Create and manage quiz questions.

                    </p>

                </div>

                <button
                    onClick={() => setOpen(true)}
                    className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-xl flex items-center gap-3"
                >

                    <FaPlus />

                    Add Question

                </button>

            </div>

            {/* Empty State */}

            {questions.length === 0 ? (

                <div className="bg-white rounded-3xl shadow-lg p-16 text-center">

                    <h2 className="text-2xl font-bold">

                        No Questions Found

                    </h2>

                    <p className="text-slate-500 mt-3">

                        Create your first question.

                    </p>

                </div>

            ) : (

                <div className="grid lg:grid-cols-2 gap-6">

                    {questions.map((question) => (

                        <QuestionCard
                            key={question.id}
                            question={question}
                            reload={loadQuestions}
                        />

                    ))}

                </div>

            )}

            {/* Add Modal */}

            {

                open &&

                <QuestionFormModal
                    quizId={quizId}
                    reload={loadQuestions}
                    close={() => setOpen(false)}
                />

            }

        </div>

    );

}

export default QuestionList;