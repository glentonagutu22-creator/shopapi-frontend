import axios from "axios";

const api = axios.create({
  baseURL: "https://shopapi-backend-itks.onrender.com",
});

export default api;