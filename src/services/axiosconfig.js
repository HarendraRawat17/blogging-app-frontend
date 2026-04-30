import axios from "axios";

export const api = axios.create({
  baseURL: "https://blogging-app-backend-uvia.onrender.com/api/",
  withCredentials: true
});
