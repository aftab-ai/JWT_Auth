// Import local modules.
import axiosInstance from "./axiosInstance";

// Login request.
const loginRequest = async (credentials) => {
  const { data } = await axiosInstance.post("/auth/signin", credentials);
  return data;
};

// Fetch current user.
const currentUserRequest = async () => {
  const { data } = await axiosInstance.get("/auth/current-user");
  return data;
};

// Logout request.
const logoutRequest = async () => {
  await axiosInstance.post("/auth/logout");
};

export default { loginRequest, currentUserRequest, logoutRequest };
