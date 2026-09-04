const supportModel = require("../models/supportModel");

// ==========================================
// Student Create Ticket
// ==========================================
exports.createTicket = (req, res) => {
  const student_id = req.user.id;

  const {
    category,
    title,
    description,
    attachment,
  } = req.body;

  supportModel.createTicket(
    {
      student_id,
      category,
      title,
      description,
      attachment,
    },
    (err, result) => {
      if (err) {
        console.log("=================================");
        console.log("CREATE TICKET ERROR");
        console.log(err);
        console.log("=================================");

        return res.status(500).json({
          success: false,
          message: err.message,
          error: err,
        });
      }

      res.status(201).json({
        success: true,
        message: "Ticket created successfully",
        ticketId: result.insertId,
      });
    }
  );
};

// ==========================================
// Student My Tickets
// ==========================================
exports.getMyTickets = (req, res) => {
  supportModel.getMyTickets(
    req.user.id,
    (err, tickets) => {
      if (err) {
        console.log("=================================");
        console.log("GET MY TICKETS ERROR");
        console.log(err);
        console.log("=================================");

        return res.status(500).json({
          success: false,
          message: err.message,
          error: err,
        });
      }

      res.status(200).json({
        success: true,
        total: tickets.length,
        tickets,
      });
    }
  );
};

// ==========================================
// Admin Get All Tickets
// ==========================================
exports.getAllTickets = (req, res) => {
  supportModel.getAllTickets((err, tickets) => {
    if (err) {
      console.log("=================================");
      console.log("GET ALL TICKETS ERROR");
      console.log(err);
      console.log("=================================");

      return res.status(500).json({
        success: false,
        message: err.message,
        error: err,
      });
    }

    res.status(200).json({
      success: true,
      total: tickets.length,
      tickets,
    });
  });
};

// ==========================================
// Get Ticket By ID
// ==========================================
exports.getTicketById = (req, res) => {
  const { id } = req.params;

  supportModel.getTicketById(id, (err, result) => {
    if (err) {
      console.log("=================================");
      console.log("GET TICKET ERROR");
      console.log(err);
      console.log("=================================");

      return res.status(500).json({
        success: false,
        message: err.message,
        error: err,
      });
    }

    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found",
      });
    }

    res.status(200).json({
      success: true,
      ticket: result[0],
    });
  });
};

// ==========================================
// Admin Reply Ticket
// ==========================================
exports.replyTicket = (req, res) => {
  const { id } = req.params;

  const {
    admin_reply,
    status,
  } = req.body;

  supportModel.replyTicket(
    id,
    admin_reply,
    status,
    (err, result) => {
      if (err) {
        console.log("=================================");
        console.log("REPLY TICKET ERROR");
        console.log(err);
        console.log("=================================");

        return res.status(500).json({
          success: false,
          message: err.message,
          error: err,
        });
      }

      res.status(200).json({
        success: true,
        message: "Reply sent successfully",
      });
    }
  );
};