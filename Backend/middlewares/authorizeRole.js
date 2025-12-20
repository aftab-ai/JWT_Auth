const authorizeRole = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      // Check userRole.
      if (!req.role) {
        res.statusCode = 401;
        throw new Error("Unauthorized! No role assigned.");
      }

      // Check if user role is allowed
      if (!allowedRoles.includes(req.role)) {
        res.statusCode = 403;
        throw new Error("Forbidden: Insufficient permissions.");
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

export default authorizeRole;
