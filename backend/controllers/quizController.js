const quizModel = require("../models/quizModel");

// ======================================
// Create Quiz
// ======================================

exports.createQuiz = (req, res) => {

    const {
        course_id,
        title,
        description,
        time_limit,
        passing_marks,
        total_marks,
        status
    } = req.body;

    if (!course_id || !title) {

        return res.status(400).json({
            success: false,
            message: "Course and Quiz Title are required."
        });

    }

    quizModel.createQuiz(
        {
            course_id,
            title,
            description,
            time_limit,
            passing_marks,
            total_marks,
            status
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
                message: "Quiz Created Successfully"
            });

        }
    );

};

// ======================================
// Get All Quizzes
// ======================================

exports.getAllQuizzes = (req, res) => {

    quizModel.getAllQuizzes((err, quizzes) => {

        if (err) {

            return res.status(500).json({
                success: false,
                message: err.message
            });

        }

        return res.json({
            success: true,
            total: quizzes.length,
            quizzes
        });

    });

};

// ======================================
// Get Quiz By ID
// ======================================

exports.getQuizById = (req, res) => {

    quizModel.getQuizById(
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
                    message: "Quiz Not Found"
                });

            }

            return res.json({
                success: true,
                quiz: result[0]
            });

        }
    );

};

// ======================================
// Update Quiz
// ======================================

exports.updateQuiz = (req, res) => {

    quizModel.updateQuiz(
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
                message: "Quiz Updated Successfully"
            });

        }
    );

};

// ======================================
// Delete Quiz
// ======================================

exports.deleteQuiz = (req, res) => {

    quizModel.deleteQuiz(
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
                message: "Quiz Deleted Successfully"
            });

        }
    );

};