// Import local file-modules.
import config from "../config/keys.js";

// Custom Error-handler middleware.
const errorHandler = (error, req, res, next) => {
  const statusCode = res.statusCode || 500; // If code not exist then use 500.

  // Node environment.
  const isDev = config.nodeENV === "development";

  res.status(statusCode).json({
    statusCode,
    status: false,
    message: error.message,
    ...(isDev && { stack: error.stack }),
  });
};

export default errorHandler;
