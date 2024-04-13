// axiosConfig.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080/api/v1/auth', // Your Spring Boot backend URL
  timeout: 5000, // Request timeout (optional)
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
