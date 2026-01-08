import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000",
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;