// Import local file-modules.
import User from "../models/User.js";
import hashRefreshToken from "../utils/tokens/hashRefreshToken.js";

const validateRefreshToken = async (req, res, next) => {
  try {
    // Fetch Refresh-Token.
    const refreshToken = req.cookies.refreshToken;
    // Check Token.
    if (!refreshToken) {
      res.statusCode = 401;
      throw new Error("Refresh-Token is missing!");
    }

    // Hash the Refresh-Token.
    const hashedRefreshToken = hashRefreshToken(refreshToken);

    // Fetch user by Refresh-Token hash.
    const user = await User.findOne({
      "sessions.hashRefreshToken": hashedRefreshToken,
    });
    // Check User.
    if (!user) {
      res.statusCode = 401;
      throw new Error("Refresh-Token is invalid!");
    }

    // Fetch the exact session.
    const session = user.sessions.find(
      (s) => s.hashRefreshToken === hashedRefreshToken
    );
    // Check Session.
    if (!session) {
      res.statusCode = 401;
      throw new Error("Session is invalid!");
    }

    // Check session expiry.
    if (session.expires < new Date()) {
      // Remove expired session atomically.
      await User.updateOne(
        { _id: user._id },
        { $pull: { sessions: { hashRefreshToken: hashedRefreshToken } } }
      );
      res.statusCode = 401;
      throw new Error("Refresh-token is expired!, Please Login");
    }

    // Attach to request for next middleware/controller.
    req.user = user;
    req.session = session;
    req.hashRefreshToken = hashedRefreshToken;

    next();
  } catch (error) {
    next(error);
  }
};

export default validateRefreshToken;
