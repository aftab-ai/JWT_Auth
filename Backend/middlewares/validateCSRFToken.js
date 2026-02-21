// Import Third-Party npm packages.
import crypto from "crypto";

// Import local file-modules.
import hashCSRFToken from "../utils/tokens/hashCSRFToken.js";
import { AppError } from "./errorHandler.js";

const validateCSRFToken = (req, res, next) => {
  try {
    // Fetch from middleware.
    const session = req.session;
    // Check session.
    if (!session) {
      throw new AppError("Session not found!", "SESSION_NOT_FOUND", 401);
    }

    if (session.revokedAt) {
      throw new AppError("Session has been revoked!", "SESSION_REVOKED", 403);
    }

    // Fetch CSRF-Token.
    const csrfToken = req.headers["x-csrf-token"];
    // Check csrfToken.
    if (!csrfToken) {
      throw new AppError("CSRF-Token is missing!", "CSRF_TOKEN_MISSING", 401);
    }

    // Hash CSRF-Token.
    const hashedCSRFtoken = hashCSRFToken(csrfToken);

    // Validate CSRF-Token with always the same compare time(no-leak timinig info).
    const isValid = crypto.timingSafeEqual(
      Buffer.from(hashedCSRFtoken, "hex"),
      Buffer.from(session.hashCSRFToken, "hex"),
    );

    if (!isValid) {
      throw new AppError("CSRF-Token is invalid!", "CSRF_TOKEN_INVALID", 401);
    }

    next();
  } catch (error) {
    next(error);
  }
};

export default validateCSRFToken;
