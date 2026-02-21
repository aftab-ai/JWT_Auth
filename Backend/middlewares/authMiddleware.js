// Import Third-Party npm packages.
import jwt from "jsonwebtoken";

// Import Environment Variables.
import config from "../config/index.js";

// Import local file-modules.
import models from "../models/index.js";
import { AppError } from "./errorHandler.js";

// User authentication middleware.
const authMiddleware = async (req, res, next) => {
  try {
    // Fetch Access-Token form cookie.
    const accessToken = req.cookies?.accessToken;
    // Check Token.
    if (!accessToken) {
      throw new AppError(
        "Access-Token is missing!",
        "ACCESS_TOKEN_MISSING",
        401,
      );
    }

    let decoded;
    try {
      // Access-Token Validation.
      decoded = jwt.verify(
        accessToken, // User token.
        config.keys.jwtAccessSecret, // JWT Access Secret.
        {
          issuer: config.keys.jwtIssuer, // Token issuer.
          audience: config.keys.jwtAudience, // Token audience.
        },
      );
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        throw new AppError(
          "Access-Token is expired!",
          "ACCESS_TOKEN_EXPIRED",
          401,
        );
      }
      throw new AppError(
        "Access-Token is invalid!",
        "ACCESS_TOKEN_INVALID",
        401,
      );
    }

    // Check user-data.
    if (!decoded?.id || !decoded?.sessionId || !decoded?.role) {
      throw new AppError(
        "Access-Token is malformed!",
        "ACCESS_TOKEN_MALFORMED",
        401,
      );
    }
    // Fetch user-data.
    const { id: userId, sessionId, role } = decoded;

    // Fetch user.
    const user = await models.User.findById(userId);
    // Check user.
    if (!user) {
      throw new AppError("User not found!", "USER_NOT_FOUND", 401);
    }

    // Password Changed Invalidation.
    if (
      user.passwordChangedAt &&
      decoded.iat * 1000 < user.passwordChangedAt.getTime()
    ) {
      throw new AppError(
        "Password changed. Please sign in again!",
        "PASSWORD_CHANGED",
        401,
      );
    }

    // Fetch user session.
    const session =
      await models.Session.findById(sessionId).select("+hashCSRFToken");
    // Check session.
    if (!session) {
      throw new AppError("Session not found!", "SESSION_NOT_FOUND", 401);
    }
    if (session.revokedAt) {
      throw new AppError("Session has been revoked!", "SESSION_REVOKED", 403);
    }
    if (session.expiresAt < Date.now()) {
      throw new AppError("Session has expired!", "SESSION_EXPIRED", 401);
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
