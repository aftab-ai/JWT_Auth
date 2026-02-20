// Third-Party modules.
import axios from "axios";

// Axios-Instance
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL, // API base url.
  withCredentials: true, // Allow cookies.
});

let csrfToken = null; // CSRF-Token saves in memory.
let isRefreshing = false; // Refresh req is running or not.
let refreshPromise = null; // Hold the refresh res promise.

// Export csrf-token.
export const setCSRFToken = (token) => {
  csrfToken = token;
};

// Request interceptors.
axiosInstance.interceptors.request.use((config) => {
  // If csrf-token is available then send it with every req of headers.
  if (csrfToken) {
    config.headers["x-csrf-token"] = csrfToken;
  }
  return config;
});

// Response interceptors.
axiosInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    // Only retry if 401, not retried yet and refresh route false.
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/token-refresh")
    ) {
      originalRequest._retry = true;

      try {
        if (!isRefreshing) {
          isRefreshing = true;

          refreshPromise = axiosInstance
            .post("/auth/token-refresh")
            .then((response) => {
              // Set new CSRF token if returned.
              if (response?.data?.data?.csrfToken) {
                setCSRFToken(response.data.data.csrfToken);
              }
              return response;
            })
            .finally(() => {
              isRefreshing = false;
            });
        }

        await refreshPromise;

        return axiosInstance(originalRequest); // Retry original req.
      } catch (refreshError) {
        return Promise.reject(refreshError); // Refresh failed, user is logged out.
      }
    }
    return Promise.reject(error); // No refresh-token or other error.
  },
);

export default axiosInstance;
