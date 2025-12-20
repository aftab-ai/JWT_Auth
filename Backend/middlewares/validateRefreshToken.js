// Import local file-modules.
import models from "../models/index.js";
import hashRefreshToken from "../utils/tokens/hashRefreshToken.js";

const validateRefreshToken = async (req, res, next) => {
  try {
    // Fetch Refresh-Token.
    const refreshToken = req.cookies?.refreshToken;
    // Check Token.
    if (!refreshToken) {
      res.statusCode = 401;
      throw new Error("Refresh-Token is missing!");
    }

    // Hash the Refresh-Token.
    const hashedRefreshToken = hashRefreshToken(refreshToken);

    // Fetch session by Refresh-Token hash.
    const session = await models.Session.findOne({
      hashRefreshToken: hashedRefreshToken,
    }).select("+hashRefreshToken +hashCSRFToken");

    // Check Session.
    if (!session) {
      res.statusCode = 401;
      throw new Error("Refresh-Token is invalid!");
    }

    // Check Session Revoked.
    if (session.revokedAt) {
      res.statusCode = 403;
      throw new Error("Session has been revoked!");
    }

    // Check Session Expiry.
    if (session.expiresAt < Date.now()) {
      // Immediately revoke/delete session
      await models.Session.deleteOne({ _id: session._id });
      res.statusCode = 401;
      throw new Error("Refresh-Token has expired! Please login again.");
    }

    // Fetch user
    const user = await models.User.findById(session.user);
    if (!user) {
      res.statusCode = 401;
      throw new Error("User not found!");
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
