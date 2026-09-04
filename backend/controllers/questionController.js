const questionModel = require("../models/questionModel");

// ======================================
// Create Question
// ======================================

exports.createQuestion = (req, res) => {

    const {
        quiz_id,
        question,
        option1,
        option2,
        option3,
        option4,
        correct_option,
        marks
    } = req.body;

    if (
        !quiz_id ||
        !question ||
        !option1 ||
        !option2 ||
        !option3 ||
        !option4
    ) {
        return res.status(400).json({
            success: false,
            message: "All question fields are required."
        });
    }

    questionModel.createQuestion(
        {
            quiz_id,
            question,
            option1,
            option2,
            option3,
            option4,
            correct_option,
            marks
        },
        (err) => {

            if (err) {

                return res.status(500).json({
                    success: false,
                    message: err.message
                });

            }

            return res.status(201).json({
                success: true,
                message: "Question Created Successfully"
            });

        }
    );

};

// ======================================
// Get Questions By Quiz
// ======================================

exports.getQuestionsByQuiz = (req, res) => {

    questionModel.getQuestionsByQuiz(
        req.params.quizId,
        (err, questions) => {

            if (err) {

                return res.status(500).json({
                    success: false,
                    message: err.message
                });

            }

            return res.json({
                success: true,
                total: questions.length,
                questions
            });

        }
    );

};

// ======================================
// Get Question By ID
// ======================================

exports.getQuestionById = (req, res) => {

    questionModel.getQuestionById(
        req.params.id,
        (err, result) => {

            if (err) {

                return res.status(500).json({
                    success: false,
                    message: err.message
                });

            }

            if (result.length === 0) {

                return res.status(404).json({
                    success: false,
                    message: "Question Not Found"
                });

            }

            return res.json({
                success: true,
                question: result[0]
            });

        }
    );

};

// ======================================
// Update Question
// ======================================

exports.updateQuestion = (req, res) => {

    questionModel.updateQuestion(
        req.params.id,
        req.body,
        (err) => {

            if (err) {

                return res.status(500).json({
                    success: false,
                    message: err.message
                });

            }

            return res.json({
                success: true,
                message: "Question Updated Successfully"
            });

        }
    );

};

// ======================================
// Delete Question
// ======================================

exports.deleteQuestion = (req, res) => {

    questionModel.deleteQuestion(
        req.params.id,
        (err) => {

            if (err) {

                return res.status(500).json({
                    success: false,
                    message: err.message
                });

            }

            return res.json({
                success: true,
                message: "Question Deleted Successfully"
            });

        }
    );

};