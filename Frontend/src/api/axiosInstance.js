// Third-Party modules.
import axios from "axios";

// Import local modules.
import authAutoLogoutHandler from "./auth.autoLogoutHandler";

// ---------------------
// Axios-Instance
// ---------------------
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL, // API base url.
  withCredentials: true, // Allow cookies.
});

// ---------------------
// CSRF-Token
// ---------------------
let csrfToken = null; // CSRF-Token saves in memory.
// Export csrf-token.
export const setCSRFToken = (token) => {
  csrfToken = token;
};

// ---------------------
// Request Interceptor
// ---------------------
// Add CSRF-Token if available.
axiosInstance.interceptors.request.use((config) => {
  if (csrfToken) {
    config.headers["x-csrf-token"] = csrfToken;
  }
  return config;
});

// ---------------------
// Response Interceptors
// ---------------------
let csrfRefreshPromise = null; // Hold csrf refresh promise.
let accessRefreshPromise = null; // Hold access token refresh promise.

// Auth-Refresh interceptor.
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (!originalRequest || originalRequest._retry) {
      return Promise.reject(error);
    }

    const status = error.response?.status;
    const code = error.response?.data?.code;

    // Only retry if 401, token expired, not retried yet and refresh route false.
    if (
      status === 401 &&
      ["ACCESS_TOKEN_MISSING", "ACCESS_TOKEN_EXPIRED"].includes(code) &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/auth-refresh")
    ) {
      originalRequest._retry = true;

      try {
        // If no refresh is running, start one.
        if (!accessRefreshPromise) {
          accessRefreshPromise = axiosInstance
            .post("/auth/auth-refresh")
            .finally(() => {
              accessRefreshPromise = null;
            });
        }

        // Wait for refresh to complete.
        await accessRefreshPromise;

        // Retry the original request
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Logout if session or tokens are invalid.
        if (
          [401, 403, 409].includes(refreshError.response?.status) &&
          [
            "NOT_AUTHENTICATED",
            "ACCESS_TOKEN_INVALID",
            "ACCESS_TOKEN_MALFORMED",
            "USER_NOT_FOUND",
            "PASSWORD_CHANGED",
            "SESSION_REVOKED",
            "SESSION_NOT_FOUND",
            "SESSION_EXPIRED",
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

// CSRF-Refresh interceptor.
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (!originalRequest || originalRequest._retry) {
      return Promise.reject(error);
    }

    const status = error.response?.status;
    const code = error.response?.data?.code;

    // Only retry if 401, response code match, not retried yet and refresh route false.
    if (
      status === 401 &&
      code === "CSRF_TOKEN_MISSING" &&
      !originalRequest._csrfRetry &&
      !originalRequest.url.includes("/auth/csrf-refresh")
    ) {
      originalRequest._csrfRetry = true;

      try {
        // If no refresh is running, start one.
        if (!csrfRefreshPromise) {
          csrfRefreshPromise = (async () => {
            const response = await axiosInstance.post("/auth/csrf-refresh");
            if (response?.data?.data?.csrfToken) {
              setCSRFToken(response.data.data.csrfToken);
            }

            return response;
          })().finally(() => {
            csrfRefreshPromise = null;
          });
        }

        // Wait for refresh to complete.
        await csrfRefreshPromise;

        // Retry the original request
        return axiosInstance(originalRequest);
      } catch (csrfError) {
        // Logout if token is invalid.
        if (
          csrfError.response?.status === 401 &&
          csrfError.response?.data?.code === "CSRF_TOKEN_INVALID"
        ) {
          authAutoLogoutHandler.triggerLogout(); // Trigger user log out.
        }
        return Promise.reject(csrfError);
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
