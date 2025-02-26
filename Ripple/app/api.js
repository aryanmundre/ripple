import axios from 'axios';

// Set your Firebase-hosted Django backend base URL
const api = axios.create({
  baseURL: '127.0.0.1:8000/api',  // Replace with your Firebase-hosted URL
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;