import axios from 'axios';

axios.defaults.withCredentials = true; // Important to send cookies with requests

const instance = axios.create({
  baseURL: 'http://127.0.0.1:8000', // Backend URL
  withCredentials: true, // Send cookies and session info
});

export default instance;
