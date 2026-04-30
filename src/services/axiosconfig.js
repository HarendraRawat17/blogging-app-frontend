import axios from "axios";

export const api = axios.create({
  // baseURL: "http://localhost:3001/api/"
   baseURL: "https://blogging-app-backend-uvia.onrender.com/api/",
  withCredentials: true
});