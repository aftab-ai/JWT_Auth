// Import Third-Party npm packages.
import crypto from "crypto";

// Import local file-modules.
import hashCSRFToken from "../utils/tokens/hashCSRFToken.js";

const validateCSRFToken = (req, res, next) => {
  try {
    // Fetch from middleware.
    const session = req.session;
    // Check session.
    if (!session) {
      res.statusCode = 401;
      throw new Error("Session is not available!");
    }

    if (session.revokedAt) {
      res.statusCode = 401;
      throw new Error("Session has been revoked!");
    }

    // Fetch CSRF-Token.
    const csrfToken = req.headers["x-csrf-token"];
    // Check csrfToken.
    if (!csrfToken) {
      res.statusCode = 403;
      throw new Error("CSRF-Token is missing!");
    }

    // Hash CSRF-Token.
    const hashedCSRFtoken = hashCSRFToken(csrfToken);

    // Validate CSRF-Token with always the same compare time(no-leak timinig info).
    const isValid = crypto.timingSafeEqual(
      Buffer.from(hashedCSRFtoken, "hex"),
      Buffer.from(session.hashCSRFToken, "hex"),
    );

    if (!isValid) {
      res.statusCode = 403;
      throw new Error("CSRF-Token is invalid!");
    }

    next();
  } catch (error) {
    next(error);
  }
};

export default validateCSRFToken;
