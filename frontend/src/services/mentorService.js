import axios from "axios";
import API_BASE_URL from "../config/api";

const API = `${API_BASE_URL}/admin`;

const getToken = () => localStorage.getItem("token");

const authConfig = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});

// ===============================
// Get All Mentors
// ===============================

export const getMentors = async () => {

  const response = await axios.get(

    `${API}/mentors`,

    authConfig()

  );

  return response.data;

};

// ======================================
// GET PUBLIC MENTORS
// PUBLIC WEBSITE
// ======================================

export const getPublicMentors = async () => {

  const response = await axios.get(
    `${API_BASE_URL}/mentors/public`
  );

  return response.data;

};

// ===============================
// Create Mentor
// ===============================

export const createMentor = async (mentor) => {

  const response = await axios.post(

    `${API}/create-mentor`,

    mentor,

    authConfig()

  );

  return response.data;

};

// ===============================
// Update Mentor
// ===============================

export const updateMentor = async (id, mentor) => {

  const response = await axios.put(

    `${API}/update-mentor/${id}`,

    mentor,

    authConfig()

  );

  return response.data;

};

// ===============================
// Delete Mentor
// ===============================

export const deleteMentor = async (id) => {

  const response = await axios.delete(

    `${API}/delete-mentor/${id}`,

    authConfig()

  );

  return response.data;

};