// Import Third-Party npm packages.
import { rateLimit } from "express-rate-limit";

// Login Limiter(max: 5).
const loginLimiter = rateLimit({
  windowMs: 1000 * 60,
  max: 5,

  handler: (req, res, next) => {
    res.code = 429;
    const error = new Error("Too many login attempts. Try again later.");
    next(error);
  },
});

export default loginLimiter;
