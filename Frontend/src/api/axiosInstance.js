// Third-Party modules.
import axios from "axios";
import authAutoLogoutHandler from "./auth.autoLogoutHandler";

let csrfToken = null; // CSRF-Token saves in memory.
let isRefreshing = false; // Refresh req is running or not.
let refreshPromise = null; // Hold the refresh res promise.

// Export csrf-token.
export const setCSRFToken = (token) => {
  csrfToken = token;
};

// Axios-Instance
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL, // API base url.
  withCredentials: true, // Allow cookies.
});

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
      ["ACCESS_TOKEN_EXPIRED", "ACCESS_TOKEN_MISSING"].includes(
        error.response?.data?.code,
      ) &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/auth-refresh")
    ) {
      originalRequest._retry = true;

      try {
        if (!isRefreshing) {
          isRefreshing = true;

          refreshPromise = axiosInstance
            .post("/auth/auth-refresh")
            .finally(() => {
              isRefreshing = false;
            });
        }

        await refreshPromise;
        return axiosInstance(originalRequest); // Retry original req.
      } catch (refreshError) {
        // Logout for expired session or invalid token.
        if (
          [401, 403, 409].includes(refreshError.response?.status) &&
          [
            // "ACCESS_TOKEN_MISSING",
            "ACCESS_TOKEN_INVALID",
            "ACCESS_TOKEN_MALFORMED",
            "PASSWORD_CHANGED",
            "SESSION_REVOKED",
            "SESSION_NOT_FOUND",
            "SESSION_EXPIRED",
            "REFRESH_TOKEN_MISSING",
            "REFRESH_CONFLICT",
          ].includes(refreshError.response?.data?.code)
        ) {
          authAutoLogoutHandler.triggerLogout(); // Trigger user log out.
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
