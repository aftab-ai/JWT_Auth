// Import Third-Party npm packages.
import { rateLimit } from "express-rate-limit";

// User-Registration Limiter(max: 5/15m).
const registrationLimiter = rateLimit({
  windowMs: 1000 * 60 * 15,
  max: 5,

  handler: (req, res, next) => {
    res.statusCode = 429;
    const error = new Error("Too many attempts. Try again later.");
    next(error);
  },
});

// Login Limiter(max: 5/15m).
const loginLimiter = rateLimit({
  windowMs: 1000 * 60 * 15,
  max: 5,

  handler: (req, res, next) => {
    res.statusCode = 429;
    const error = new Error("Too many attempts. Try again later.");
    next(error);
  },
});

// Refresh Limiter(max: 20/1h).
const refreshTokenLimiter = rateLimit({
  windowMs: 1000 * 60 * 60,
  max: 20,

  handler: (req, res, next) => {
    res.statusCode = 429;
    const error = new Error("Too many attempts. Try again later.");
    next(error);
  },
});

// User-Deletion Limiter(max: 3/15m).
const deleteUserLimiter = rateLimit({
  windowMs: 1000 * 60 * 15,
  max: 3,

  handler: (req, res, next) => {
    res.statusCode = 429;
    const error = new Error("Too many attempts. Try again later.");
    next(error);
  },
});

export default {
  registrationLimiter,
  loginLimiter,
  refreshTokenLimiter,
  deleteUserLimiter,
};
