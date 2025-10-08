// In your FRONTEND: src/lib/axios.js
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const axiosInstance = axios.create({
    baseURL: `${API_BASE_URL}/api`,
    withCredentials: true,
    timeout: 30000, // ← Make sure this is 30000
});