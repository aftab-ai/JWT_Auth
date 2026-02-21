// Import local file-modules.
import config from "../config/index.js";

// Custom error class.
export class AppError extends Error {
  constructor(message, code, statusCode = 500) {
    super(message);
    this.code = code; // Business logic code.
    this.statusCode = statusCode; // HTTP status code.
  }
}

// Custom Error-handler middleware.
const errorHandler = (error, req, res, next) => {
  // Uses error's statusCode if defined, otherwise fallback to 500.
  const statusCode = error.statusCode || 500;

  // Node environment.
  const isDev = config.keys.nodeENV === "development";

  res.status(statusCode).json({
    statusCode,
    status: statusCode >= 200 && statusCode < 300, // True for success codes.
    code: error.code || "INTERNAL_SERVER_ERROR", // Business logic code.
    message: error.message || "Something went wrong!",
    ...(isDev && { stack: error.stack }), // Show stack only in development.
  });
};

export default errorHandler;
