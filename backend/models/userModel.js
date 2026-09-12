const db = require("../database/db");


// ==========================================
// Find User By Email
// ==========================================

const findUserByEmail = (
    email,
    callback
) => {

    const sql = `
        SELECT *
        FROM users
        WHERE email = ?
    `;


    db.query(
        sql,
        [
            email,
        ],
        callback
    );

};


// ==========================================
// Find User By Phone
// ==========================================

const findUserByPhone = (
    phone,
    callback
) => {

    const sql = `
        SELECT *
        FROM users
        WHERE phone = ?
    `;


    db.query(
        sql,
        [
            phone,
        ],
        callback
    );

};


// ==========================================
// Create User
// ==========================================

const createUser = (
    user,
    callback
) => {

    const sql = `
        INSERT INTO users
        (
            full_name,
            email,
            phone,
            phone_verified_at,
            password,
            role
        )
        VALUES
        (
            ?,
            ?,
            ?,
            ?,
            ?,
            ?
        )
    `;


    db.query(
        sql,
        [
            user.full_name,

            user.email,

            user.phone,

            user.phone_verified_at || null,

            user.password,

            user.role,
        ],
        callback
    );

};


// ==========================================
// Exports
// ==========================================

module.exports = {

    findUserByEmail,

    findUserByPhone,

    createUser,

};