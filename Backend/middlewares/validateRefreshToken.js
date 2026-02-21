// Import local file-modules.
import models from "../models/index.js";
import hashRefreshToken from "../utils/tokens/hashRefreshToken.js";
import { AppError } from "./errorHandler.js";

const validateRefreshToken = async (req, res, next) => {
  try {
    // Fetch Refresh-Token.
    const refreshToken = req.cookies?.refreshToken;
    // Check Token.
    if (!refreshToken) {
      throw new AppError(
        "Refresh-Token is missing!",
        "REFRESH_TOKEN_MISSING",
        401,
      );
    }

    // Hash the Refresh-Token.
    const hashedRefreshToken = hashRefreshToken(refreshToken);

    // Fetch session by Refresh-Token hash.
    const session = await models.Session.findOne({
      hashRefreshToken: hashedRefreshToken,
    }).select("+hashRefreshToken +hashCSRFToken");

    // Check Session.
    if (!session) {
      throw new AppError("Session not found!", "SESSION_NOT_FOUND", 401);
    }

    // Check Session Revoked.
    if (session.revokedAt) {
      throw new AppError("Session has been revoked!", "SESSION_REVOKED", 403);
    }

    // Check Session Expiry.
    if (session.expiresAt < Date.now()) {
      // Immediately revoke/delete session.
      await models.Session.deleteOne({ _id: session._id });
      throw new AppError(
        "Refresh-Token has expired! Please sign in again.",
        "REFRESH_TOKEN_EXPIRED",
        401,
      );
    }

    // Fetch user
    const user = await models.User.findById(session.user);
    if (!user) {
      throw new AppError("User not found!", "USER_NOT_FOUND", 401);
    }

    // Attach to request for next middleware/controller.
    req.user = user;
    req.session = session;
    req.hashedRefreshToken = hashedRefreshToken;

    next();
  } catch (error) {
    next(error);
  }
};

export default validateRefreshToken;
