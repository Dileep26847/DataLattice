import { useEffect, useState } from "react";
import {
  getAvailableQuizzes,
  getQuizQuestions,
  startQuiz,
  submitQuiz,
} from "../../services/studentQuizService";

function QuizSection({ courseId }) {
  const user = JSON.parse(localStorage.getItem("user"));

  const [quiz, setQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});

  const [attemptId, setAttemptId] = useState(null);

  const [started, setStarted] = useState(false);
  const [result, setResult] = useState(null);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [error, setError] = useState("");

  // ======================================
  // Load Quiz
  // ======================================

  useEffect(() => {
    if (!courseId || !user?.id) {
      setLoading(false);
      return;
    }

    loadQuiz();
  }, [courseId]);

  const loadQuiz = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getAvailableQuizzes(user.id);

      const courseQuiz = (data.quizzes || []).find(
        (item) =>
          Number(item.course_id) === Number(courseId)
      );

      setQuiz(courseQuiz || null);
    } catch (err) {
      console.error("Quiz loading error:", err);

      setError(
        err?.response?.data?.message ||
          "Unable to load quiz."
      );
    } finally {
      setLoading(false);
    }
  };

  // ======================================
  // Start Quiz
  // ======================================

  const handleStartQuiz = async () => {
    if (!quiz) return;

    try {
      setLoading(true);
      setError("");

      const questionData =
        await getQuizQuestions(quiz.id);

      const quizQuestions =
        questionData.questions || [];

      if (quizQuestions.length === 0) {
        setError(
          "This quiz does not have any questions yet."
        );
        return;
      }

      const attemptData = await startQuiz({
        quiz_id: quiz.id,
        student_id: user.id,
        total_questions:
          quizQuestions.length,
      });

      setQuestions(quizQuestions);

      setAttemptId(attemptData.attemptId);

      setAnswers({});

      setCurrentQuestion(0);

      setResult(null);

      setStarted(true);
    } catch (err) {
      console.error("Start quiz error:", err);

      setError(
        err?.response?.data?.message ||
          "Unable to start quiz."
      );
    } finally {
      setLoading(false);
    }
  };

  // ======================================
  // Select Answer
  // ======================================

  const handleAnswerChange = (
    questionId,
    selectedOption
  ) => {
    setAnswers((previous) => ({
      ...previous,
      [questionId]: selectedOption,
    }));
  };

  // ======================================
  // Previous Question
  // ======================================

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(
        currentQuestion - 1
      );
    }
  };

  // ======================================
  // Next Question
  // ======================================

  const handleNext = () => {
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

  const handleSubmitQuiz = async () => {
    if (!attemptId || !quiz) return;

    try {
      setSubmitting(true);
      setError("");

      const formattedAnswers =
        questions.map((question) => ({
          question_id: question.id,
          selected_option:
            answers[question.id] ?? null,
        }));

      const data = await submitQuiz({
        attemptId,
        quizId: quiz.id,
        answers: formattedAnswers,
      });

      setResult(data.result);

      setStarted(false);
    } catch (err) {
      console.error(
        "Submit quiz error:",
        err
      );

      setError(
        err?.response?.data?.message ||
          "Unable to submit quiz."
      );
    } finally {
      setSubmitting(false);
    }
  };

  // ======================================
  // Loading
  // ======================================

  if (loading) {
    return (
      <div className="mt-10 bg-white rounded-3xl shadow-lg p-8">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />

          <p className="text-slate-500 font-medium">
            Loading quiz...
          </p>
        </div>
      </div>
    );
  }

  // ======================================
  // Error
  // ======================================

  if (error) {
    return (
      <div className="mt-10 bg-white rounded-3xl shadow-lg p-8">
        <div className="flex items-start gap-4">
          <div className="text-3xl">
            ⚠️
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              Quiz Error
            </h2>

            <p className="mt-2 text-red-500">
              {error}
            </p>

            <button
              onClick={loadQuiz}
              className="mt-5 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ======================================
  // No Quiz
  // ======================================

  if (
    !quiz &&
    !started &&
    !result
  ) {
    return (
      <div className="mt-10 bg-white rounded-3xl shadow-lg p-8">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center text-3xl">
            📝
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              Course Quiz
            </h2>

            <p className="text-slate-500 mt-1">
              No published quiz is available
              for this course yet.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ======================================
  // Result Screen
  // ======================================

  if (result) {
    const passed =
      result.status === "PASS";

    return (
      <div className="mt-10 bg-white rounded-3xl shadow-xl overflow-hidden">

        <div className="bg-gradient-to-r from-indigo-600 to-cyan-500 px-8 py-12 text-center text-white">

          <div className="text-6xl">
            {passed ? "🏆" : "📊"}
          </div>

          <h2 className="text-4xl font-black mt-5">
            {passed
              ? "Quiz Passed!"
              : "Quiz Completed"}
          </h2>

          <p className="mt-3 text-white/80">
            {passed
              ? "Excellent work! You successfully passed the quiz."
              : "Keep learning and try again."}
          </p>

        </div>

        <div className="p-8">

          <div className="text-center mb-8">

            <p className="text-slate-500">
              Your Score
            </p>

            <p className="text-6xl font-black text-indigo-600 mt-2">
              {result.percentage}%
            </p>

          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

            <div className="bg-slate-50 rounded-2xl p-5 text-center">
              <p className="text-sm text-slate-500">
                Score
              </p>

              <p className="text-2xl font-bold mt-2">
                {result.score}
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-5 text-center">
              <p className="text-sm text-slate-500">
                Total
              </p>

              <p className="text-2xl font-bold mt-2">
                {result.totalMarks}
              </p>
            </div>

            <div className="bg-green-50 rounded-2xl p-5 text-center">
              <p className="text-sm text-slate-500">
                Correct
              </p>

              <p className="text-2xl font-bold text-green-600 mt-2">
                {result.correct}
              </p>
            </div>

            <div className="bg-red-50 rounded-2xl p-5 text-center">
              <p className="text-sm text-slate-500">
                Wrong
              </p>

              <p className="text-2xl font-bold text-red-500 mt-2">
                {result.wrong}
              </p>
            </div>

          </div>

          {passed && (
            <div className="mt-8 rounded-2xl bg-green-50 border border-green-200 p-6 text-center">

              <div className="text-3xl">
                🎓
              </div>

              <h3 className="text-xl font-bold text-green-700 mt-2">
                Certificate Eligible
              </h3>

              <p className="text-green-600 mt-1">
                You have successfully completed
                the quiz.
              </p>

            </div>
          )}

        </div>
      </div>
    );
  }

  // ======================================
  // Active Quiz
  // ======================================

  if (started) {
    const question =
      questions[currentQuestion];

    const selectedAnswer =
      answers[question.id];

    const progress =
      ((currentQuestion + 1) /
        questions.length) *
      100;

    const isLastQuestion =
      currentQuestion ===
      questions.length - 1;

    return (
      <div className="mt-10 bg-white rounded-3xl shadow-xl overflow-hidden">

        {/* Quiz Header */}

        <div className="px-8 py-7 border-b border-slate-100">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

            <div>
              <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wide">
                Course Quiz
              </p>

              <h2 className="text-2xl font-black text-slate-800 mt-1">
                {quiz.title}
              </h2>
            </div>

            <div className="px-4 py-2 rounded-xl bg-indigo-50 text-indigo-700 font-bold">
              {currentQuestion + 1} /{" "}
              {questions.length}
            </div>

          </div>

          {/* Progress */}

          <div className="mt-6">

            <div className="flex justify-between text-sm mb-2">

              <span className="text-slate-500">
                Quiz Progress
              </span>

              <span className="font-bold text-indigo-600">
                {Math.round(progress)}%
              </span>

            </div>

            <div className="h-3 bg-slate-100 rounded-full overflow-hidden">

              <div
                className="h-full bg-gradient-to-r from-indigo-600 to-cyan-500 rounded-full transition-all duration-500"
                style={{
                  width: `${progress}%`,
                }}
              />

            </div>

          </div>

        </div>

        {/* Question */}

        <div className="p-8">

          <div className="mb-8">

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-700 font-semibold text-sm">
              Question{" "}
              {currentQuestion + 1}
            </div>

            <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mt-5 leading-relaxed">
              {question.question}
            </h3>

            <p className="text-slate-400 mt-2">
              Choose the best answer.
            </p>

          </div>

          {/* Answer Options */}

          <div className="space-y-4">

            {[
              {
                value: 1,
                text: question.option1,
                letter: "A",
              },
              {
                value: 2,
                text: question.option2,
                letter: "B",
              },
              {
                value: 3,
                text: question.option3,
                letter: "C",
              },
              {
                value: 4,
                text: question.option4,
                letter: "D",
              },
            ].map((option) => {

              const selected =
                Number(selectedAnswer) ===
                option.value;

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() =>
                    handleAnswerChange(
                      question.id,
                      option.value
                    )
                  }
                  className={`w-full text-left flex items-center gap-4 p-5 rounded-2xl border-2 transition-all duration-200 ${
                    selected
                      ? "border-indigo-600 bg-indigo-50 shadow-md"
                      : "border-slate-200 bg-white hover:border-indigo-300 hover:bg-indigo-50/40"
                  }`}
                >

                  <span
                    className={`w-11 h-11 rounded-xl flex items-center justify-center font-black flex-shrink-0 ${
                      selected
                        ? "bg-indigo-600 text-white"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {option.letter}
                  </span>

                  <span
                    className={`text-lg font-medium ${
                      selected
                        ? "text-indigo-700"
                        : "text-slate-700"
                    }`}
                  >
                    {option.text}
                  </span>

                  <span className="ml-auto">

                    {selected ? (
                      <span className="w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center">
                        ✓
                      </span>
                    ) : (
                      <span className="w-7 h-7 rounded-full border-2 border-slate-300" />
                    )}

                  </span>

                </button>
              );
            })}

          </div>

          {/* Navigation */}

          <div className="mt-10 pt-6 border-t border-slate-100 flex flex-col sm:flex-row justify-between gap-4">

            <button
              type="button"
              onClick={handlePrevious}
              disabled={
                currentQuestion === 0
              }
              className="px-7 py-3 rounded-xl border border-slate-200 font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              ← Previous
            </button>

            {!isLastQuestion ? (
              <button
                type="button"
                onClick={handleNext}
                disabled={!selectedAnswer}
                className="px-8 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Next Question →
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmitQuiz}
                disabled={
                  !selectedAnswer ||
                  submitting
                }
                className="px-8 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {submitting
                  ? "Submitting..."
                  : "✓ Submit Quiz"}
              </button>
            )}

          </div>

        </div>

      </div>
    );
  }

  // ======================================
  // Quiz Introduction Card
  // ======================================

  return (
    <div className="mt-10 bg-white rounded-3xl shadow-xl overflow-hidden">

      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 p-8 md:p-10 text-white">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">

          <div>

            <div className="flex items-center gap-4">

              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-4xl">
                📝
              </div>

              <div>

                <p className="text-white/80 font-semibold">
                  Final Assessment
                </p>

                <h2 className="text-3xl font-black mt-1">
                  {quiz.title}
                </h2>

              </div>

            </div>

            <p className="mt-5 text-white/80 max-w-2xl leading-7">
              {quiz.description ||
                "Test your knowledge and complete the course assessment."}
            </p>

          </div>

          <button
            onClick={handleStartQuiz}
            className="flex-shrink-0 bg-white text-indigo-700 hover:bg-indigo-50 px-8 py-4 rounded-2xl font-black shadow-lg transition-all"
          >
            ▶ Start Quiz
          </button>

        </div>

      </div>

      <div className="p-8">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

          <div className="bg-slate-50 rounded-2xl p-5 text-center">
            <div className="text-2xl">
              ❓
            </div>

            <p className="text-slate-500 text-sm mt-2">
              Questions
            </p>

            <p className="font-black text-xl mt-1">
              {quiz.total_questions}
            </p>
          </div>

          <div className="bg-slate-50 rounded-2xl p-5 text-center">
            <div className="text-2xl">
              🎯
            </div>

            <p className="text-slate-500 text-sm mt-2">
              Total Marks
            </p>

            <p className="font-black text-xl mt-1">
              {quiz.total_marks}
            </p>
          </div>

          <div className="bg-slate-50 rounded-2xl p-5 text-center">
            <div className="text-2xl">
              ⏱️
            </div>

            <p className="text-slate-500 text-sm mt-2">
              Time Limit
            </p>

            <p className="font-black text-xl mt-1">
              {quiz.time_limit
                ? `${quiz.time_limit} min`
                : "No limit"}
            </p>
          </div>

          <div className="bg-slate-50 rounded-2xl p-5 text-center">
            <div className="text-2xl">
              🏆
            </div>

            <p className="text-slate-500 text-sm mt-2">
              Passing Marks
            </p>

            <p className="font-black text-xl mt-1">
              {quiz.passing_marks}
            </p>
          </div>

        </div>

        <div className="mt-6 p-5 rounded-2xl bg-indigo-50 border border-indigo-100">

          <p className="text-indigo-700 font-semibold">
            💡 Tip
          </p>

          <p className="text-indigo-600 text-sm mt-1">
            Read each question carefully before
            selecting your answer. You can move
            back to previous questions before
            submitting.
          </p>

        </div>

      </div>

    </div>
  );
}

export default QuizSection;