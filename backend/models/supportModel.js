const db = require("../database/db");

// ==========================================
// Student Create Ticket
// ==========================================
const createTicket = (ticket, callback) => {

  const sql = `
    INSERT INTO support_tickets
    (
      student_id,
      category,
      title,
      description,
      attachment,
      status
    )
    VALUES (?, ?, ?, ?, ?, 'Open')
  `;

  db.query(
    sql,
    [
      ticket.student_id,
      ticket.category,
      ticket.title,
      ticket.description,
      ticket.attachment || null,
    ],
    callback
  );

};

// ==========================================
// Student My Tickets
// ==========================================
const getMyTickets = (studentId, callback) => {

  const sql = `
    SELECT *
    FROM support_tickets
    WHERE student_id = ?
    ORDER BY created_at DESC
  `;

  db.query(sql, [studentId], callback);

};

// ==========================================
// Admin Get All Tickets
// ==========================================
const getAllTickets = (callback) => {

  const sql = `
    SELECT
      support_tickets.*,
      users.full_name,
      users.email
    FROM support_tickets
    INNER JOIN users
      ON users.id = support_tickets.student_id
    ORDER BY support_tickets.created_at DESC
  `;

  db.query(sql, callback);

};

// ==========================================
// Get Ticket By ID
// ==========================================
const getTicketById = (id, callback) => {

  const sql = `
    SELECT
      support_tickets.*,
      users.full_name,
      users.email
    FROM support_tickets
    INNER JOIN users
      ON users.id = support_tickets.student_id
    WHERE support_tickets.id = ?
  `;

  db.query(sql, [id], callback);

};

// ==========================================
// Admin Reply Ticket
// ==========================================
const replyTicket = (
  id,
  admin_reply,
  status,
  callback
) => {

  const sql = `
    UPDATE support_tickets
    SET
      admin_reply = ?,
      status = ?
    WHERE id = ?
  `;

  db.query(
    sql,
    [
      admin_reply,
      status,
      id,
    ],
    callback
  );

};

// ==========================================
// Export All Functions
// ==========================================
module.exports = {
  createTicket,
  getMyTickets,
  getAllTickets,
  getTicketById,
  replyTicket,
};