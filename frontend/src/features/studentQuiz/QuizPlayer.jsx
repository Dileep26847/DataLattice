import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
    getQuizQuestions,
    submitQuiz
} from "../../services/studentQuizService";

import QuizTimer from "./QuizTimer";
import QuestionPalette from "./QuestionPalette";

function QuizPlayer({

    quiz,

    attemptId,

    setResult,

    setStep

}) {

    const [questions, setQuestions] = useState([]);

    const [loading, setLoading] = useState(true);

    const [currentQuestion, setCurrentQuestion] = useState(0);

    const [answers, setAnswers] = useState([]);

    // ======================================
    // Load Questions
    // ======================================

    const loadQuestions = async () => {

        try {

            const data =
                await getQuizQuestions(
                    quiz.id
                );

            setQuestions(
                data.questions || []
            );

        } catch (err) {

            console.log(err);

            toast.error(
                "Unable to load questions"
            );

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        loadQuestions();

    }, []);

    // ======================================
    // Select Answer
    // ======================================

    const selectOption = (

        questionId,

        option

    ) => {

        const exists = answers.find(

            item =>
                item.question_id ===
                questionId

        );

        if (exists) {

            setAnswers(

                answers.map(item =>

                    item.question_id ===
                    questionId

                        ? {

                            ...item,

                            selected_option:
                                option

                        }

                        : item

                )

            );

        }

        else {

            setAnswers([

                ...answers,

                {

                    question_id:
                        questionId,

                    selected_option:
                        option

                }

            ]);

        }

    };

    // ======================================
    // Current Answer
    // ======================================

    const currentAnswer = (

        questionId

    ) => {

        const found = answers.find(

            item =>
                item.question_id ===
                questionId

        );

        return found
            ? found.selected_option
            : null;

    };

    // ======================================
    // Previous Question
    // ======================================

    const previousQuestion = () => {

        if (

            currentQuestion > 0

        ) {

            setCurrentQuestion(

                currentQuestion - 1

            );

        }

    };

    // ======================================
    // Next Question
    // ======================================

    const nextQuestion = () => {

        if (

            currentQuestion <
            questions.length - 1

        ) {

            setCurrentQuestion(

                currentQuestion + 1

            );

        }

    };

    // ======================================
    // Submit Quiz
    // ======================================

    const handleSubmit = async () => {

        try {

            const response =
                await submitQuiz({

                    attemptId,

                    quizId:
                        quiz.id,

                    answers

                });

            toast.success(
                "Quiz Submitted"
            );

            setResult(
                response.result
            );

            setStep(
                "result"
            );

        }

        catch (err) {

            console.log(err);

            toast.error(
                "Submission Failed"
            );

        }

    };

    // ======================================
    // Loading
    // ======================================

    if (loading) {

        return (

            <div className="min-h-screen flex justify-center items-center">

                <h2 className="text-3xl font-bold">

                    Loading Questions...

                </h2>

            </div>

        );

    }

    const question =
        questions[currentQuestion];
            return (

        <div className="min-h-screen bg-slate-100">

            {/* Header */}

            <div className="bg-white shadow">

                <div className="max-w-7xl mx-auto px-8 py-6 flex justify-between items-center">

                    <div>

                        <h1 className="text-3xl font-black">

                            {quiz.title}

                        </h1>

                        <p className="text-slate-500 mt-2">

                            Question

                            {currentQuestion + 1}

                            of

                            {questions.length}

                        </p>

                    </div>

                    <QuizTimer

                        minutes={quiz.time_limit}

                        onFinish={handleSubmit}

                    />

                </div>

            </div>

            {/* Body */}

            <div className="max-w-7xl mx-auto grid lg:grid-cols-4 gap-8 p-8">

                {/* Question */}

                <div className="lg:col-span-3">

                    <div className="bg-white rounded-3xl shadow-lg p-10">

                        {/* Progress */}

                        <div className="mb-8">

                            <div className="flex justify-between">

                                <span className="font-semibold">

                                    Progress

                                </span>

                                <span>

                                    {currentQuestion + 1}

                                    /

                                    {questions.length}

                                </span>

                            </div>

                            <div className="mt-3 h-3 rounded-full bg-slate-200">

                                <div

                                    className="h-3 rounded-full bg-indigo-600 transition-all"

                                    style={{

                                        width: `${((currentQuestion + 1) / questions.length) * 100}%`

                                    }}

                                />

                            </div>

                        </div>

                        {/* Question */}

                        <h2 className="text-2xl font-bold leading-relaxed">

                            {question.question}

                        </h2>

                        {/* Options */}

                        <div className="mt-10 space-y-5">

                            {[

                                question.option1,

                                question.option2,

                                question.option3,

                                question.option4

                            ].map((option, index) => {

                                const selected =

                                    currentAnswer(question.id) === index + 1;

                                return (

                                    <button

                                        key={index}

                                        onClick={() =>

                                            selectOption(

                                                question.id,

                                                index + 1

                                            )

                                        }

                                        className={`

                                            w-full

                                            text-left

                                            rounded-2xl

                                            p-5

                                            border-2

                                            transition

                                            ${selected

                                                ? "border-indigo-600 bg-indigo-50"

                                                : "border-slate-200 hover:border-indigo-400"}

                                        `}

                                    >

                                        <div className="flex items-center gap-5">

                                            <div

                                                className={`

                                                    w-10

                                                    h-10

                                                    rounded-full

                                                    flex

                                                    justify-center

                                                    items-center

                                                    font-bold

                                                    ${selected

                                                        ? "bg-indigo-600 text-white"

                                                        : "bg-slate-200"}

                                                `}

                                            >

                                                {String.fromCharCode(65 + index)}

                                            </div>

                                            <span className="text-lg">

                                                {option}

                                            </span>

                                        </div>

                                    </button>

                                );

                            })}

                        </div>

                        {/* Navigation */}

                        <div className="flex justify-between mt-12">

                            <button

                                onClick={previousQuestion}

                                disabled={currentQuestion === 0}

                                className="px-8 py-3 rounded-xl bg-gray-300 disabled:opacity-50"

                            >

                                Previous

                            </button>

                            {

                                currentQuestion === questions.length - 1

                                    ? (

                                        <button

                                            onClick={handleSubmit}

                                            className="px-8 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white"

                                        >

                                            Submit Quiz

                                        </button>

                                    )

                                    : (

                                        <button

                                            onClick={nextQuestion}

                                            className="px-8 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white"

                                        >

                                            Next

                                        </button>

                                    )

                            }

                        </div>

                    </div>

                </div>

                {/* Sidebar */}

                <div>

                    <QuestionPalette

                        questions={questions}

                        answers={answers}

                        currentQuestion={currentQuestion}

                        setCurrentQuestion={setCurrentQuestion}

                    />

                </div>

            </div>

        </div>

    );

}

export default QuizPlayer;