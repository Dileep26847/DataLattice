import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  createQuestion,
  updateQuestion,
} from "../../services/questionService";

function QuestionFormModal({
  quizId,
  editQuestion,
  reload,
  close,
}) {
  const [formData, setFormData] = useState({
    quiz_id: quizId || "",
    question: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    correct_option: "1",
    marks: 1,
  });

  useEffect(() => {
    if (editQuestion) {
      setFormData({
        quiz_id: editQuestion.quiz_id,
        question: editQuestion.question,
        option1: editQuestion.option1,
        option2: editQuestion.option2,
        option3: editQuestion.option3,
        option4: editQuestion.option4,
        correct_option: editQuestion.correct_option,
        marks: editQuestion.marks || 1,
      });
    }
  }, [editQuestion]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      if (!formData.question.trim()) {
        return toast.error("Question is required");
      }

      if (
        !formData.option1 ||
        !formData.option2 ||
        !formData.option3 ||
        !formData.option4
      ) {
        return toast.error("All options are required");
      }

      if (editQuestion) {
        await updateQuestion(editQuestion.id, formData);
        toast.success("Question Updated Successfully");
      } else {
        await createQuestion(formData);
        toast.success("Question Added Successfully");
      }

      reload();
      close();

    } catch (err) {
      console.log(err);
      toast.error("Operation Failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

      <div className="bg-white rounded-3xl shadow-xl w-full max-w-3xl p-8">

        <div className="flex justify-between items-center mb-8">

          <h2 className="text-3xl font-bold">
            {editQuestion ? "Edit Question" : "Add Question"}
          </h2>

          <button
            onClick={close}
            className="text-3xl text-gray-500 hover:text-red-600"
          >
            ×
          </button>

        </div>

        <div className="space-y-5">

          <textarea
            rows="3"
            name="question"
            placeholder="Enter Question"
            value={formData.question}
            onChange={handleChange}
            className="w-full border rounded-xl p-4"
          />

          <input
            type="text"
            name="option1"
            placeholder="Option A"
            value={formData.option1}
            onChange={handleChange}
            className="w-full border rounded-xl p-3"
          />

          <input
            type="text"
            name="option2"
            placeholder="Option B"
            value={formData.option2}
            onChange={handleChange}
            className="w-full border rounded-xl p-3"
          />

          <input
            type="text"
            name="option3"
            placeholder="Option C"
            value={formData.option3}
            onChange={handleChange}
            className="w-full border rounded-xl p-3"
          />

          <input
            type="text"
            name="option4"
            placeholder="Option D"
            value={formData.option4}
            onChange={handleChange}
            className="w-full border rounded-xl p-3"
          />

          <div className="grid grid-cols-2 gap-4">

            <div>

              <label className="block mb-2 font-semibold">
                Correct Option
              </label>

              <select
                name="correct_option"
                value={formData.correct_option}
                onChange={handleChange}
                className="w-full border rounded-xl p-3"
              >
                <option value="1">Option A</option>
                <option value="2">Option B</option>
                <option value="3">Option C</option>
                <option value="4">Option D</option>
              </select>

            </div>

            <div>

              <label className="block mb-2 font-semibold">
                Marks
              </label>

              <input
                type="number"
                name="marks"
                value={formData.marks}
                onChange={handleChange}
                className="w-full border rounded-xl p-3"
              />

            </div>

          </div>

        </div>

        <div className="flex justify-end gap-4 mt-8">

          <button
            onClick={close}
            className="px-6 py-3 rounded-xl bg-gray-300 hover:bg-gray-400"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white"
          >
            {editQuestion ? "Update Question" : "Save Question"}
          </button>

        </div>

      </div>

    </div>
  );
}

export default QuestionFormModal;