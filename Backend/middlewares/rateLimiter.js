// Import Third-Party npm packages.
import { rateLimit } from "express-rate-limit";

const rateLimiter = (windowMs, max) => {
  return rateLimit({
    windowMs: windowMs,
    max: max,

    handler: (req, res, next) => {
      res.statusCode = 429;
      const error = new Error("Too many attempts. Try again later.");
      next(error);
    },
  });
};

export default rateLimiter;
