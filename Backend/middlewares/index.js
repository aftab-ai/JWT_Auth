// Import local middlewares file-module.
import errorHandler from "./errorHandler.js";
import loginLimiter from "./loginLimiter.js";
import refreshLimiter from "./refreshLimiter.js";
import validateRefreshToken from "./validateRefreshToken.js";

export default {
  errorHandler,
  loginLimiter,
  refreshLimiter,
  validateRefreshToken,
};
