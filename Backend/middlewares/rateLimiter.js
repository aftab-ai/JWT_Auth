// Import Third-Party npm packages.
import { rateLimit, ipKeyGenerator } from "express-rate-limit";

// Import local file-modules.
import { AppError } from "./errorHandler.js";

const rateLimiter = (windowMs, max) => {
  return rateLimit({
    windowMs: windowMs,
    max: max,
    standardHeaders: true, // Adds modern RFC headers.
    legacyHeaders: false, // Disables old headers
    keyGenerator: (req) => ipKeyGenerator(req), // IP-based limiting IPv4 + IPv6 safe key generator.

    handler: (req, res, next) => {
      const error = new AppError(
        "Too many attempts. Try again later.",
        "TOO_MANY_ATTEMPTS",
        429,
      );
      next(error);
    },
  });
};

export default rateLimiter;
