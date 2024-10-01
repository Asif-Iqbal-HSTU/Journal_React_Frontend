// src/axios.js

import axios from 'axios';

// Create an Axios instance with the base URL
const instance = axios.create({
  baseURL: 'http://127.0.0.1:8000', // Base URL (change here when needed)
});

export default instance;
