// src/api.js

import axios from "axios";

// Axios instance with backend base URL
const API = axios.create({
  baseURL: "http://localhost:5000/api", // backend root
});

export default API;
