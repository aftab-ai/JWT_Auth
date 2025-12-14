// Import local middlewares file-module.
import errorHandler from "./errorHandler.js";
import loginLimiter from "./loginLimiter.js";
import refreshLimiter from "./refreshLimiter.js";
import validateRefreshToken from "./validateRefreshToken.js";
import validateCSRFtoken from "./validateCSRFtoken.js";
import authMiddleware from "./authMiddleware.js";
import authorizeRole from "./authorizeRole.js";

export default {
  errorHandler,
  loginLimiter,
  refreshLimiter,
  validateRefreshToken,
  validateCSRFtoken,
  authMiddleware,
  authorizeRole,
};
