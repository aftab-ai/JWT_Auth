const authorizeRole = (role) => {
  return (req, res, next) => {
    try {
      // Check userRole.
      if (!req.role) {
        res.statusCode = 401;
        throw new Error("Unauthorized!");
      }

      // Fetch userRole from authMiddleware.
      const userRole = req.role;
      if (!userRole) {
        res.statusCode = 403;
        throw new Error("User role not assigned!");
      }

      // Check user role.
      if (userRole !== role) {
        res.statusCode = 403;
        throw new Error("Forbidden: Permissions denied!");
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

export default authorizeRole;
