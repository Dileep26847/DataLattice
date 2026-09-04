const db = require("../database/db");

const PROFILE_FIELDS = [
    "batch_id",
    "admission_date",
    "education",
    "college_name",
    "graduation_year",
    "phone",
    "address",
    "city",
    "state",
    "country",
    "linkedin_url",
    "github_url",
    "resume_url",
    "profile_image",
    "certificate_status",
    "placement_status",
];

const createStudentProfile = (profile, callback) => {
    const sql = `
        INSERT INTO student_profiles
        (user_id, ${PROFILE_FIELDS.join(", ")})
        VALUES (?, ${PROFILE_FIELDS.map(() => "?").join(", ")})
    `;

    db.query(sql, [profile.user_id, ...PROFILE_FIELDS.map((field) => profile[field] ?? null)], callback);
};

const getAllStudentProfiles = (callback) => {
    const sql = `
        SELECT sp.*, u.full_name, u.email, u.role,
               b.batch_name
        FROM student_profiles sp
        INNER JOIN users u ON u.id = sp.user_id
        LEFT JOIN batches b ON b.id = sp.batch_id
        WHERE u.role = 'student'
        ORDER BY sp.id DESC
    `;
    db.query(sql, callback);
};

const getStudentProfileById = (profileId, callback) => {
    const sql = `
        SELECT sp.*, u.full_name, u.email, u.role,
               b.batch_name
        FROM student_profiles sp
        INNER JOIN users u ON u.id = sp.user_id
        LEFT JOIN batches b ON b.id = sp.batch_id
        WHERE sp.id = ?
        LIMIT 1
    `;
    db.query(sql, [profileId], callback);
};

const getProfileByUserId = (userId, callback) => {
    const sql = `
        SELECT sp.*, u.full_name, u.email, u.role,
               b.batch_name
        FROM student_profiles sp
        INNER JOIN users u ON u.id = sp.user_id
        LEFT JOIN batches b ON b.id = sp.batch_id
        WHERE sp.user_id = ? AND u.role = 'student'
        LIMIT 1
    `;
    db.query(sql, [userId], callback);
};

const updateStudentProfile = (profileId, profile, callback) => {
    const updates = PROFILE_FIELDS.filter((field) => Object.prototype.hasOwnProperty.call(profile, field));
    if (!updates.length) return callback(null);

    const sql = `UPDATE student_profiles SET ${updates.map((field) => `${field} = ?`).join(", ")} WHERE id = ?`;
    db.query(sql, [...updates.map((field) => profile[field]), profileId], callback);
};

const updateStudentProfileByUserId = (profileId, userId, profile, callback) => {
    const updates = PROFILE_FIELDS.filter((field) => Object.prototype.hasOwnProperty.call(profile, field));
    if (!updates.length) return callback(null, { affectedRows: 0 });

    const sql = `UPDATE student_profiles SET ${updates.map((field) => `${field} = ?`).join(", ")} WHERE id = ? AND user_id = ?`;
    db.query(sql, [...updates.map((field) => profile[field]), profileId, userId], callback);
};

const deleteStudentProfile = (profileId, callback) => {
    db.query("DELETE FROM student_profiles WHERE id = ?", [profileId], callback);
};

const deleteStudentProfileByUserId = (profileId, userId, callback) => {
    db.query("DELETE FROM student_profiles WHERE id = ? AND user_id = ?", [profileId, userId], callback);
};

module.exports = {
    createStudentProfile,
    getAllStudentProfiles,
    getStudentProfileById,
    getProfileByUserId,
    updateStudentProfile,
    updateStudentProfileByUserId,
    deleteStudentProfile,
    deleteStudentProfileByUserId,
};