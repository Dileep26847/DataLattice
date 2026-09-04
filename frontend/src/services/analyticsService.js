import axios from "axios";
import API_BASE_URL from "../config/api";

// ==========================================
// TOKEN
// ==========================================

const getToken = () => {

  return localStorage.getItem("token");

};


// ==========================================
// AUTH CONFIG
// ==========================================

const authConfig = () => ({

  headers: {

    Authorization: `Bearer ${getToken()}`,

  },

});


// ==========================================
// GET ANALYTICS OVERVIEW
// ==========================================

export const getAnalyticsOverview = async () => {

  const response = await axios.get(

    `${API_BASE_URL}/admin/analytics/overview`,

    authConfig()

  );

  return response.data;

};