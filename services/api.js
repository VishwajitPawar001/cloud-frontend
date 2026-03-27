import axios from "axios";

const api = axios.create({
  baseURL: "https://cloud-backend-ahwr.onrender.com"
});

api.interceptors.request.use((config) => {
  console.log("API Request URL:", config.baseURL + config.url);
  return config;
});

export default api;