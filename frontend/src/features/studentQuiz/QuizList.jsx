import { useEffect, useState } from "react";
import { FaClock, FaBookOpen, FaPlay } from "react-icons/fa";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import { getAvailableQuizzes } from "../../services/studentQuizService";

function QuizList({ setQuiz, setStep }) {

    const user = JSON.parse(localStorage.getItem("user"));

    const [quizzes, setQuizzes] = useState([]);

    const [loading, setLoading] = useState(true);

    // ======================================
    // Load Available Quizzes
    // ======================================

    const fetchQuizzes = async () => {

        try {

            const data = await getAvailableQuizzes(user.id);

            setQuizzes(data.quizzes || []);

        } catch (err) {

            console.log(err);

            toast.error("Failed to load quizzes");

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchQuizzes();

    }, []);

    // ======================================
    // Loading
    // ======================================

    if (loading) {

        return (

            <div className="flex justify-center items-center h-screen">

                <h2 className="text-2xl font-bold">

                    Loading Quizzes...

                </h2>

            </div>

        );

    }

    // ======================================
    // Empty
    // ======================================

    if (quizzes.length === 0) {

        return (

            <div className="flex justify-center items-center h-screen">

                <div className="bg-white rounded-3xl shadow-lg p-12 text-center">

                    <FaBookOpen
                        size={60}
                        className="mx-auto text-indigo-600"
                    />

                    <h2 className="text-3xl font-bold mt-6">

                        No Quiz Available

                    </h2>

                    <p className="text-slate-500 mt-3">

                        Your mentor hasn't published any quizzes yet.

                    </p>

                </div>

            </div>

        );

    }

    return (

        <div className="max-w-7xl mx-auto px-8 py-10">

            {/* Header */}

            <div className="mb-10">

                <p className="text-indigo-600 font-semibold">

                    Student Portal

                </p>

                <h1 className="text-5xl font-black mt-2">

                    Available Quizzes

                </h1>

                <p className="text-slate-500 mt-4">

                    Complete quizzes to test your knowledge and improve your learning progress.

                </p>

            </div>

            {/* Quiz Cards */}

            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">

                {quizzes.map((quiz) => (

                    <motion.div

                        key={quiz.id}

                        whileHover={{
                            y: -8,
                            scale: 1.02
                        }}

                        className="bg-white rounded-3xl shadow-lg overflow-hidden"

                    >

                        {/* Banner */}

                        <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 p-8 text-white">

                            <h2 className="text-2xl font-bold">

                                {quiz.title}

                            </h2>

                            <p className="mt-3 text-white/80">

                                {quiz.course_name}

                            </p>

                        </div>

                        {/* Body */}

                        <div className="p-6">

                            <p className="text-slate-600">

                                {quiz.description}
                            </p>

                            <div className="space-y-3 mt-6">

                                <div className="flex justify-between">

                                    <span>

                                        Questions

                                    </span>

                                    <strong>

                                        {quiz.total_questions}

                                    </strong>

                                </div>

                                <div className="flex justify-between">

                                    <span>

                                        Total Marks

                                    </span>

                                    <strong>

                                        {quiz.total_marks}

                                    </strong>

                                </div>

                                <div className="flex justify-between">

                                    <span>

                                        Passing Marks

                                    </span>

                                    <strong>

                                        {quiz.passing_marks}

                                    </strong>

                                </div>

                                <div className="flex justify-between">

                                    <span className="flex items-center gap-2">

                                        <FaClock />

                                        Time

                                    </span>

                                    <strong>

                                        {quiz.time_limit} Minutes

                                    </strong>

                                </div>

                            </div>

                            <button

                                onClick={() => {

                                    setQuiz(quiz);

                                    setStep("instructions");

                                }}

                                className="mt-8 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl font-bold flex justify-center items-center gap-3"

                            >

                                <FaPlay />

                                Start Quiz

                            </button>

                        </div>

                    </motion.div>

                ))}

            </div>

        </div>

    );

}

export default QuizList;