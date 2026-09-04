const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userModel = require("../models/userModel");

// ================= REGISTER =================

exports.register = async (req, res) => {

    try {

        const { full_name, email, password } = req.body;

        if (!full_name || !email || !password) {

            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });

        }

        userModel.findUserByEmail(email, async (err, users) => {

            if (err) {

                return res.status(500).json({
                    success: false,
                    message: err.message
                });

            }

            if (users.length > 0) {

                return res.status(400).json({
                    success: false,
                    message: "Email already exists"
                });

            }

            const hashedPassword = await bcrypt.hash(password, 10);

            userModel.createUser(
                {
                    full_name,
                    email,
                    password: hashedPassword,
                    role: "student"
                },
                (err) => {

                    if (err) {

                        return res.status(500).json({
                            success: false,
                            message: err.message
                        });

                    }

                    res.status(201).json({
                        success: true,
                        message: "Student Registered Successfully"
                    });

                }
            );

        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// ================= LOGIN =================

exports.login = (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {

        return res.status(400).json({
            success: false,
            message: "Email and Password are required"
        });

    }

    userModel.findUserByEmail(email, async (err, users) => {

        if (err) {

            return res.status(500).json({
                success: false,
                message: err.message
            });

        }

        if (users.length === 0) {

            return res.status(404).json({
                success: false,
                message: "User Not Found"
            });

        }

        const user = users[0];

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {

            return res.status(401).json({
                success: false,
                message: "Invalid Password"
            });

        }

        const token = jwt.sign(

            {
                id: user.id,
                email: user.email,
                role: user.role
            },

            process.env.JWT_SECRET,

            {
                expiresIn: "1d"
            }

        );

        res.json({

            success: true,
            message: "Login Successful",
            token,

            user: {
                id: user.id,
                full_name: user.full_name,
                email: user.email,
                role: user.role
            }

        });

    });

};