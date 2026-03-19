import axios from "axios";

const api = axios.create({
  baseURL: "https://cloud-backend-ahwr.onrender.com//api"
});

export default api;