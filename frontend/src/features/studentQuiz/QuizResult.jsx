import {
    FaTrophy,
    FaCheckCircle,
    FaTimesCircle,
    FaPercentage,
    FaArrowLeft
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

function QuizResult({ result }) {

    const navigate = useNavigate();

    if (!result) {

        return (

            <div className="min-h-screen flex justify-center items-center">

                <h2 className="text-3xl font-bold">

                    Result Not Found

                </h2>

            </div>

        );

    }

    const passed = result.status === "PASS";

    return (

        <div className="min-h-screen bg-slate-100 flex justify-center items-center p-8">

            <div className="bg-white rounded-3xl shadow-xl w-full max-w-4xl p-10">

                {/* Header */}

                <div className="text-center">

                    <div
                        className={`

                            w-24

                            h-24

                            rounded-full

                            mx-auto

                            flex

                            items-center

                            justify-center

                            ${

                                passed

                                    ? "bg-green-100"

                                    : "bg-red-100"

                            }

                        `}
                    >

                        <FaTrophy

                            size={45}

                            className={

                                passed

                                    ? "text-green-600"

                                    : "text-red-600"

                            }

                        />

                    </div>

                    <h1 className="text-4xl font-black mt-6">

                        Quiz Completed

                    </h1>

                    <p className="text-slate-500 mt-3">

                        Your quiz has been evaluated successfully.

                    </p>

                </div>

                {/* Status */}

                <div className="mt-10 flex justify-center">

                    <span
                        className={`

                            px-8

                            py-3

                            rounded-full

                            text-lg

                            font-bold

                            ${

                                passed

                                    ? "bg-green-100 text-green-700"

                                    : "bg-red-100 text-red-700"

                            }

                        `}
                    >

                        {result.status}

                    </span>

                </div>

                {/* Statistics */}

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">

                    <div className="bg-indigo-50 rounded-2xl p-6 text-center">

                        <FaTrophy
                            size={30}
                            className="mx-auto text-indigo-600"
                        />

                        <p className="mt-4 text-slate-500">

                            Score

                        </p>

                        <h2 className="text-3xl font-black mt-2">

                            {result.score}

                        </h2>

                    </div>

                    <div className="bg-green-50 rounded-2xl p-6 text-center">

                        <FaCheckCircle
                            size={30}
                            className="mx-auto text-green-600"
                        />

                        <p className="mt-4 text-slate-500">

                            Correct

                        </p>

                        <h2 className="text-3xl font-black mt-2">

                            {result.correct}

                        </h2>

                    </div>

                    <div className="bg-red-50 rounded-2xl p-6 text-center">

                        <FaTimesCircle
                            size={30}
                            className="mx-auto text-red-600"
                        />

                        <p className="mt-4 text-slate-500">

                            Wrong

                        </p>

                        <h2 className="text-3xl font-black mt-2">

                            {result.wrong}

                        </h2>

                    </div>

                    <div className="bg-yellow-50 rounded-2xl p-6 text-center">

                        <FaPercentage
                            size={30}
                            className="mx-auto text-yellow-600"
                        />

                        <p className="mt-4 text-slate-500">

                            Percentage

                        </p>

                        <h2 className="text-3xl font-black mt-2">

                            {result.percentage}%

                        </h2>

                    </div>

                </div>

                {/* Footer */}

                <div className="mt-12 flex justify-center">

                    <button

                        onClick={() => navigate("/student/dashboard")}

                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-2xl flex items-center gap-3"

                    >

                        <FaArrowLeft />

                        Back To Dashboard

                    </button>

                </div>

            </div>

        </div>

    );

}

export default QuizResult;