import axios from "axios";

import API_BASE_URL from "../config/api";

const API = `${API_BASE_URL}/admin`;

const token = () => localStorage.getItem("token");

// ======================================
// Dashboard
// ======================================

export const getDashboard = async () => {

    const response = await axios.get(

        `${API}/dashboard`,

        {

            headers: {

                Authorization: `Bearer ${token()}`

            }

        }

    );

    return response.data;

};