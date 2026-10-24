
import axios from "axios";

export const saveToken = (
  accessToken: string,
  refreshToken: string
) => {
  localStorage.setItem("token", accessToken);
  localStorage.setItem("refresh", refreshToken);
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const axiosRequest = axios.create({
  baseURL: import.meta.env.VITE_API,
});

axiosRequest.interceptors.request.use(
  (config) => {
    const token = getToken();

    if (token) {
      config.headers.set(
        "Authorization",
        `Bearer ${token}`
      );
    }

    return config;
  },
  (error) => Promise.reject(error)
);
