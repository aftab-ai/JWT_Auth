// Import Third-Party npm packages.
import { rateLimit } from "express-rate-limit";

// Refresh Limiter(max: 10).
const refreshLimiter = rateLimit({
  windowMs: 1000 * 30,
  max: 10,

  handler: (req, res, next) => {
    res.statusCode = 429;
    const error = new Error("Too many refresh attempts. Try again later.");
    next(error);
  },
});

export default refreshLimiter;
