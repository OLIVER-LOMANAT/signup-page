// In lib/axios.js - update the timeout
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const axiosInstance = axios.create({
    baseURL: `${API_BASE_URL}/api`,
    withCredentials: true,
    timeout: 30000, // Increased from 10000 to 30000 (30 seconds)
});