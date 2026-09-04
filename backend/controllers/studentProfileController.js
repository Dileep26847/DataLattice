const studentProfileModel = require("../models/studentProfileModel");

// ======================================
// Create Student Profile
// ======================================

exports.createStudentProfile = (req, res) => {

  const profile = { ...req.body };

  // --------------------------------------
  // Student can only create their own
  // profile.
  // Admin can create a profile for a
  // selected student.
  // --------------------------------------

  if (req.user.role === "student") {
    profile.user_id = req.user.id;
  }

  if (!profile.user_id) {
    return res.status(400).json({
      success: false,
      message: "User ID is required.",
    });
  }

  studentProfileModel.createStudentProfile(
    profile,
    (err) => {

      if (err) {

        return res.status(500).json({
          success: false,
          message: err.message,
        });

      }

      return res.status(201).json({
        success: true,
        message: "Student Profile Created Successfully",
      });

    }
  );

};


// ======================================
// Get All Student Profiles
// ======================================
// Admin only.
// Route protection is also applied.
// ======================================

exports.getAllStudentProfiles = (req, res) => {

  studentProfileModel.getAllStudentProfiles(
    (err, profiles) => {

      if (err) {

        return res.status(500).json({
          success: false,
          message: err.message,
        });

      }

      return res.status(200).json({
        success: true,
        total: profiles.length,
        profiles,
      });

    }
  );

};


// ======================================
// Get Student Profile By ID
// ======================================

exports.getStudentProfileById = (req, res) => {

  const profileId = Number(req.params.id);

  if (!profileId) {

    return res.status(400).json({
      success: false,
      message: "Valid profile ID is required.",
    });

  }

  studentProfileModel.getStudentProfileById(
    profileId,
    (err, result) => {

      if (err) {

        return res.status(500).json({
          success: false,
          message: err.message,
        });

      }

      if (result.length === 0) {

        return res.status(404).json({
          success: false,
          message: "Student Profile Not Found",
        });

      }

      const profile = result[0];

      // --------------------------------------
      // Student can only view their own
      // profile.
      // --------------------------------------

      if (
        req.user.role === "student" &&
        Number(req.user.id) !== Number(profile.user_id)
      ) {

        return res.status(403).json({
          success: false,
          message: "You are not authorized to access this profile.",
        });

      }

      return res.status(200).json({
        success: true,
        profile,
      });

    }
  );

};


// ======================================
// Get Profile By User ID
// ======================================

exports.getProfileByUserId = (req, res) => {

  const requestedUserId = Number(req.params.userId);

  if (!requestedUserId) {

    return res.status(400).json({
      success: false,
      message: "Valid user ID is required.",
    });

  }

  // --------------------------------------
  // Student can only request their own
  // user ID.
  // --------------------------------------

  if (
    req.user.role === "student" &&
    Number(req.user.id) !== requestedUserId
  ) {

    return res.status(403).json({
      success: false,
      message: "You are not authorized to access this profile.",
    });

  }

  studentProfileModel.getProfileByUserId(
    requestedUserId,
    (err, result) => {

      if (err) {

        return res.status(500).json({
          success: false,
          message: err.message,
        });

      }

      if (result.length === 0) {

        return res.status(404).json({
          success: false,
          message: "Profile Not Found",
        });

      }

      return res.status(200).json({
        success: true,
        profile: result[0],
      });

    }
  );

};


// ======================================
// Update Student Profile
// ======================================

exports.updateStudentProfile = (req, res) => {

  const profileId = Number(req.params.id);

  if (!profileId) {

    return res.status(400).json({
      success: false,
      message: "Valid profile ID is required.",
    });

  }

  // --------------------------------------
  // Admin can update any profile.
  // Student must own the profile.
  // --------------------------------------

  if (req.user.role === "admin") {

    studentProfileModel.updateStudentProfile(
      profileId,
      req.body,
      (err) => {

        if (err) {

          return res.status(500).json({
            success: false,
            message: err.message,
          });

        }

        return res.status(200).json({
          success: true,
          message: "Student Profile Updated Successfully",
        });

      }
    );

    return;
  }

  // --------------------------------------
  // Student ownership update
  // --------------------------------------

  studentProfileModel.updateStudentProfileByUserId(
    profileId,
    req.user.id,
    req.body,
    (err, result) => {

      if (err) {

        return res.status(500).json({
          success: false,
          message: err.message,
        });

      }

      if (result.affectedRows === 0) {

        return res.status(403).json({
          success: false,
          message: "You are not authorized to update this profile.",
        });

      }

      return res.status(200).json({
        success: true,
        message: "Student Profile Updated Successfully",
      });

    }
  );

};


// ======================================
// Delete Student Profile
// ======================================

exports.deleteStudentProfile = (req, res) => {

  const profileId = Number(req.params.id);

  if (!profileId) {

    return res.status(400).json({
      success: false,
      message: "Valid profile ID is required.",
    });

  }

  // --------------------------------------
  // Admin can delete any profile.
  // Student can delete only their own.
  // --------------------------------------

  if (req.user.role === "admin") {

    studentProfileModel.deleteStudentProfile(
      profileId,
      (err) => {

        if (err) {

          return res.status(500).json({
            success: false,
            message: err.message,
          });

        }

        return res.status(200).json({
          success: true,
          message: "Student Profile Deleted Successfully",
        });

      }
    );

    return;
  }

  studentProfileModel.deleteStudentProfileByUserId(
    profileId,
    req.user.id,
    (err, result) => {

      if (err) {

        return res.status(500).json({
          success: false,
          message: err.message,
        });

      }

      if (result.affectedRows === 0) {

        return res.status(403).json({
          success: false,
          message: "You are not authorized to delete this profile.",
        });

      }

      return res.status(200).json({
        success: true,
        message: "Student Profile Deleted Successfully",
      });

    }
  );

};