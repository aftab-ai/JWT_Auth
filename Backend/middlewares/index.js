// Import local middlewares file-module.
import errorHandler from "./errorHandler.js";
import rateLimiter from "./rateLimiter.js";
import validateRefreshToken from "./validateRefreshToken.js";
import validateCSRFtoken from "./validateCSRFtoken.js";
import authMiddleware from "./authMiddleware.js";
import authorizeRole from "./authorizeRole.js";
import verifiedEmail from "./verifiedEmail.js";

export default {
  errorHandler,
  rateLimiter,
  validateRefreshToken,
  validateCSRFtoken,
  authMiddleware,
  authorizeRole,
  verifiedEmail,
};
