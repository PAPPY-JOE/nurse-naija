import axios from 'axios';

// Create an instance of axios with the base URL
const api = axios.create({
  // baseURL: "http://localhost:8000"
  baseURL: "https://repealable-janetta-endless.ngrok-free.dev/",
  headers: {
    "ngrok-skip-browser-warning": "true"
  }
});

// Export the Axios instance
export default api;
