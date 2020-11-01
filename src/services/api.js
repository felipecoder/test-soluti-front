import axios from "axios";
import { getToken } from "./auth";

export const storage = "http://api-soluti";

const api = axios.create({
  baseURL: "http://api-soluti/api"
});

api.interceptors.request.use(async config => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;