import axios from "axios";

import API_BASE_URL from "../config/api";

const API = `${API_BASE_URL}/support`;

const headers = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

// ==========================
// Student - Create Ticket
// ==========================
export const createTicket = async (ticket) => {
  const res = await axios.post(API, ticket, {
    headers: headers(),
  });

  return res.data;
};

// ==========================
// Student - My Tickets
// ==========================
export const getStudentTickets = async () => {
  const res = await axios.get(`${API}/my`, {
    headers: headers(),
  });

  return res.data;
};

// ==========================
// Admin - All Tickets
// ==========================
export const getTickets = async () => {
  const res = await axios.get(API, {
    headers: headers(),
  });

  return res.data;
};

// ==========================
// Admin - Single Ticket
// ==========================
export const getTicket = async (id) => {
  const res = await axios.get(`${API}/${id}`, {
    headers: headers(),
  });

  return res.data;
};

// ==========================
// Admin - Reply Ticket
// ==========================
export const replyTicket = async (id, data) => {
  const res = await axios.put(`${API}/${id}/reply`, data, {
    headers: headers(),
  });

  return res.data;
};