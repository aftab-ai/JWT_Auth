// Import Third-Party npm packages.
import jwt from "jsonwebtoken";

// Import Environment Variables.
import config from "../config/keys.js";

// Import local file-modules.
import models from "../models/index.js";

// User authentication middleware.
const authMiddleware = async (req, res, next) => {
  try {
    // Fetch Access-Token form cookie.
    const accessToken = req.cookies?.accessToken;
    // Check Token.
    if (!accessToken) {
      res.statusCode = 401;
      throw new Error("Access-Token is missing!");
    }

    let decoded;
    try {
      // Access-Token Validation.
      decoded = jwt.verify(
        accessToken, // User token.
        config.jwtAccessSecret, // JWT Access Secret.
        {
          issuer: config.jwtIssuer, // Token issuer.
          audience: config.jwtAudience, // Token audience.
        }
      );
    } catch (error) {
      res.statusCode = 401;
      throw new Error("Access-Token is expired or invalid!");
    }

    // Check user-data.
    if (!decoded?.id || !decoded?.sessionId || !decoded?.role) {
      res.statusCode = 401;
      throw new Error("Access-Token is malformed!");
    }
    // Fetch user-data.
    const { id: userId, role, sessionId } = decoded;

    // Fetch user.
    const user = await models.User.findById(userId);
    // Check user.
    if (!user) {
      res.statusCode = 401;
      throw new Error("User not found!");
    }

    // Password Changed Invalidation.
    if (
      user.passwordChangedAt &&
      decoded.iat * 1000 < user.passwordChangedAt.getTime()
    ) {
      res.status(401);
      throw new Error("Password changed. Please sign in again!");
    }

    // Fetch user session.
    const session = await models.Session.findById(sessionId).select(
      "+hashCSRFToken"
    );
    // Check session.
    if (!session) {
      res.statusCode = 401;
      throw new Error("Session not found!");
    }
    if (session.revokedAt) {
      res.statusCode = 401;
      throw new Error("Session has been revoked!");
    }
    if (session.expiresAt < Date.now()) {
      res.statusCode = 401;
      throw new Error("Session has expired!");
    }

    // Attach user + session.
    req.userId = userId;
    req.user = user;
    req.role = role;
    req.sessionId = sessionId;
    req.session = session;

    next();
  } catch (error) {
    next(error);
  }
};

export default authMiddleware;
