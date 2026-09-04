const bcrypt = require("bcryptjs");

const mentorModel = require("../models/mentorModel");

// ======================================
// Create Mentor
// ======================================

exports.createMentor = async (req, res) => {

  try {

    const {

      full_name,
      email,
      password,
      phone,
      designation,
      specialization,
      experience,

    } = req.body;

    if (!full_name || !email || !password) {

      return res.status(400).json({

        success: false,

        message: "Full Name, Email and Password are required."

      });

    }

    const hashedPassword = await bcrypt.hash(password, 10);

    mentorModel.createMentor(

      {

        full_name,

        email,

        password: hashedPassword,

        phone,

        designation,

        specialization,

        experience,

      },

      (err, result) => {

        if (err) {

          console.log(err);

          return res.status(500).json({

            success: false,

            message: err.message,

          });

        }

        res.status(201).json({

          success: true,

          message: "Mentor Created Successfully",

          user_id: result.user_id,

        });

      }

    );

  }

  catch (err) {

    console.log(err);

    res.status(500).json({

      success: false,

      message: "Internal Server Error",

    });

  }

};

// ======================================
// Get All Mentors
// ======================================

exports.getMentors = (req, res) => {

  mentorModel.getMentors(

    (err, mentors) => {

      if (err) {

        console.log(err);

        return res.status(500).json({

          success: false,

          message: err.message,

        });

      }

      res.json({

        success: true,

        total: mentors.length,

        mentors,

      });

    }

  );

};

// ======================================
// Update Mentor
// ======================================

exports.updateMentor = (req, res) => {

  const { id } = req.params;

  mentorModel.updateMentor(

    id,

    req.body,

    (err) => {

      if (err) {

        console.log(err);

        return res.status(500).json({

          success: false,

          message: err.message,

        });

      }

      res.json({

        success: true,

        message: "Mentor Updated Successfully",

      });

    }

  );

};

// ======================================
// Delete Mentor
// ======================================

exports.deleteMentor = (req, res) => {

  const { id } = req.params;

  mentorModel.deleteMentor(

    id,

    (err) => {

      if (err) {

        console.log(err);

        return res.status(500).json({

          success: false,

          message: err.message,

        });

      }

      res.json({

        success: true,

        message: "Mentor Deleted Successfully",

      });

    }

  );

};