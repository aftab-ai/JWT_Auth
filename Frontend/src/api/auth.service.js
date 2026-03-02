// Import local modules.
import axiosInstance from "./axiosInstance";

// Login request.
const loginRequest = async (credentials) => {
  const { data } = await axiosInstance.post("/auth/signin", credentials);
  return data;
};

// Fetch current user.
let currentUserPromise = null;
const currentUserRequest = () => {
  // If no req running then start one.
  if (!currentUserPromise) {
    currentUserPromise = axiosInstance
      .get("/auth/current-user")
      .then((res) => res.data)
      .finally(() => {
        currentUserPromise = null;
      });
  }
  return currentUserPromise;
};

// Refresh token request.
let mountUserOnStartup = null;
const mountUserRequest = () => {
  // If no req running then start one.
  if (!mountUserOnStartup) {
    mountUserOnStartup = axiosInstance
      .post("/auth/auth-refresh")
      .then((res) => res)
      .finally(() => {
        mountUserOnStartup = null;
      });
  }
  return mountUserOnStartup;
};

// Logout request.
const logoutRequest = async () => {
  await axiosInstance.post("/auth/logout");
};

export default {
  loginRequest,
  currentUserRequest,
  mountUserRequest,
  logoutRequest,
};
