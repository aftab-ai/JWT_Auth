// Third-Party modules.
import axios from "axios";

// Axios-Instance
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL, // API base url.
  withCredentials: true, // Allow cookies.
});

export default axiosInstance;
