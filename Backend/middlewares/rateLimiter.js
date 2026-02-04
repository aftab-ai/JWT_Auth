// Import Third-Party npm packages.
import { rateLimit, ipKeyGenerator } from "express-rate-limit";

const rateLimiter = (windowMs, max) => {
  return rateLimit({
    windowMs: windowMs,
    max: max,
    standardHeaders: true, // Adds modern RFC headers.
    legacyHeaders: false, // Disables old headers
    keyGenerator: (req) => ipKeyGenerator(req), // IP-based limiting IPv4 + IPv6 safe key generator.

    handler: (req, res, next) => {
      res.statusCode = 429;
      const error = new Error("Too many attempts. Try again later.");
      next(error);
    },
  });
};

export default rateLimiter;
