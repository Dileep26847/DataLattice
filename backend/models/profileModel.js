const db = require("../database/db");

// ==========================
// Get Profile By User ID
// ==========================
const getProfileByUserId = (userId, callback) => {
  const sql = `
    SELECT
      users.id,
      users.full_name,
      users.email,
      users.role,
      user_profiles.phone,
      user_profiles.bio,
      user_profiles.profile_image
    FROM users
    LEFT JOIN user_profiles
    ON users.id = user_profiles.user_id
    WHERE users.id = ?
  `;

  db.query(sql, [userId], callback);
};

// ==========================
// Create Profile
// ==========================
const createProfile = (profile, callback) => {
  const sql = `
    INSERT INTO user_profiles
    (user_id, phone, bio, profile_image)
    VALUES (?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      profile.user_id,
      profile.phone,
      profile.bio,
      profile.profile_image,
    ],
    callback
  );
};

// ==========================
// Update Profile
// ==========================
const updateProfile = (userId, profile, callback) => {
  const sql = `
    UPDATE user_profiles
    SET
      phone = ?,
      bio = ?,
      profile_image = ?
    WHERE user_id = ?
  `;

  db.query(
    sql,
    [
      profile.phone,
      profile.bio,
      profile.profile_image,
      userId,
    ],
    callback
  );
};

// ======================================
// Update User Basic Information
// ======================================

const updateUserBasicInfo = (
    userId,
    fullName,
    callback
) => {

    const sql = `
        UPDATE users
        SET full_name = ?
        WHERE id = ?
    `;

    db.query(
        sql,
        [
            fullName,
            userId
        ],
        callback
    );

};
// ==========================
// Check Existing Profile
// ==========================
const checkProfile = (userId, callback) => {
  db.query(
    "SELECT * FROM user_profiles WHERE user_id = ?",
    [userId],
    callback
  );
};

module.exports = {
    getProfileByUserId,
    createProfile,
    updateProfile,
    checkProfile,
    updateUserBasicInfo
};