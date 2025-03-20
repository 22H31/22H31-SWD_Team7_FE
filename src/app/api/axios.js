import axios from "axios";

export const api = axios.create({
  // baseURL: "https://beteam720250214143214.azurewebsites.net/api/",
  baseURL: "https://swdteam7-hfgrdwa4dfhbe0ga.southeastasia-01.azurewebsites.net/api/",

  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
});
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Lấy token từ localStorage (hoặc từ nguồn khác)
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