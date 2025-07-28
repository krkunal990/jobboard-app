import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api/v1/",
});

api.interceptors.request.use(
  async (config) => {
    const access = localStorage.getItem("access");
    config.headers.Authorization = access ? `Bearer ${access}` : "";
    return config;
  },
  (error) => Promise.reject(error)
);

// 🔁 Interceptor for expired access token
api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;
    if (
      err.response?.data?.code === "token_not_valid" &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const refresh = localStorage.getItem("refresh");
        const res = await axios.post("http://localhost:8000/api/v1/token/refresh/", {
          refresh,
        });
        const newAccess = res.data.access;
        localStorage.setItem("access", newAccess);
        originalRequest.headers.Authorization = `Bearer ${newAccess}`;
        return api(originalRequest); // retry original request
      } catch (refreshErr) {
        localStorage.clear();
        window.location.href = "/";
        return Promise.reject(refreshErr);
      }
    }
    return Promise.reject(err);
  }
);

export default api;
