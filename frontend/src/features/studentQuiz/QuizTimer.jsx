import { useEffect, useState } from "react";
import { FaClock } from "react-icons/fa";

function QuizTimer({

    minutes,

    onFinish

}) {

    const [timeLeft, setTimeLeft] = useState(

        minutes * 60

    );

    useEffect(() => {

        if (timeLeft <= 0) {

            onFinish();

            return;

        }

        const timer = setInterval(() => {

            setTimeLeft(prev => prev - 1);

        }, 1000);

        return () => clearInterval(timer);

    }, [timeLeft]);

    const mins = Math.floor(

        timeLeft / 60

    );

    const secs = timeLeft % 60;

    return (

        <div className="bg-red-50 border border-red-200 rounded-2xl px-6 py-4 flex items-center gap-4">

            <FaClock

                className="text-red-600"

                size={24}

            />

            <div>

                <p className="text-sm text-slate-500">

                    Time Remaining

                </p>

                <h2 className="text-2xl font-bold text-red-600">

                    {String(mins).padStart(2, "0")}:

                    {String(secs).padStart(2, "0")}

                </h2>

            </div>

        </div>

    );

}

export default QuizTimer;