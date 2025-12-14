// Import Third-Party npm packages.
import crypto from "crypto";

// Import local file-modules.
import hashCSRFtoken from "../utils/tokens/hashCSRFtoken.js";

const validateCSRFtoken = (req, res, next) => {
  try {
    // Fetch from middleware.
    const session = req.session;
    // Check session.
    if (!session) {
      res.statusCode = 401;
      throw new Error("Session is not available!");
    }

    // Fetch CSRF-Token.
    const csrfToken = req.headers["x-csrf-token"];
    // Check csrfToken.
    if (!csrfToken) {
      res.statusCode = 403;
      throw new Error("CSRF-Token is missing!");
    }

    // Check CSRF-Token expiry.
    if (session.csrfExpires < new Date()) {
      res.statusCode = 403;
      throw new Error("CSRF-Token is expired!");
    }

    // Hash CSRF-Token.
    const hashedCSRFtoken = hashCSRFtoken(csrfToken);

    // Validate CSRF-Token with always the same compare time(no-leak timinig info).
    const isValid =
      hashedCSRFtoken === session.hashCSRFtoken &&
      crypto.timingSafeEqual(
        Buffer.from(hashedCSRFtoken, "hex"),
        Buffer.from(session.hashCSRFtoken, "hex")
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

export default validateCSRFtoken;
