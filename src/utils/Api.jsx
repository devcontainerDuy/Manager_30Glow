import axios from "axios";
import { store } from "../stores/store";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
//header (request, token)
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// ['status:true, message:"true", data:["name": true,
//     "role": "manager",
//     "uid": "USMq8UL1731740487",
//     "token": "1|uh7IeyiPKFSqWgkQzmG2aP1QZM2bGvodVvUdNyjKe76eccbc",
//     "expiry": 1731783026]]

api.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.auth.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
