const db =
    require("../database/db");

// ======================================
// GET USER PASSWORD
// ======================================

const getUserPassword = (
    userId,
    callback
) => {

    const sql = `
        SELECT
            password
        FROM users
        WHERE id = ?
        LIMIT 1
    `;

    db.query(
        sql,
        [userId],
        callback
    );

};


// ======================================
// UPDATE PASSWORD
// ======================================

const updatePassword = (
    userId,
    password,
    callback
) => {

    const sql = `
        UPDATE users
        SET password = ?
        WHERE id = ?
    `;

    db.query(
        sql,
        [
            password,
            userId,
        ],
        callback
    );

};


// ======================================
// EXPORTS
// ======================================

module.exports = {

    getUserPassword,

    updatePassword,

};