// Import local file-modules.
import { AppError } from "./errorHandler.js";

const authorizeRole = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      // Check userRole.
      if (!req.role) {
        throw new AppError(
          "Unauthorized! No role assigned.",
          "USER_UNAUTHORIZED",
          401,
        );
      }

      // Check if user role is allowed
      if (!allowedRoles.includes(req.role)) {
        throw new AppError(
          "Forbidden: Insufficient permissions.",
          "USER_FORBIDDEN",
          403,
        );
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

export default authorizeRole;
