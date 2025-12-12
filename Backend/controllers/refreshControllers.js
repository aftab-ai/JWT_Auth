// Import local file-modules.
import User from "../models/User.js";
import createRefreshToken from "../utils/tokens/createRefreshToken.js";
import hashRefreshToken from "../utils/tokens/hashRefreshToken.js";
import createAccessToken from "../utils/tokens/createAccessToken.js";
import createCSRFtoken from "../utils/tokens/createCSRFtoken.js";
import hashCSRFtoken from "../utils/tokens/hashCSRFtoken.js";
import setAccessTokenCookie from "../utils/cookies/setAccessTokenCookie.js";
import setRefreshTokenCookie from "../utils/cookies/setRefreshTokenCookie.js";

// Token refresh controller.
const refresh = async (req, res, next) => {
  try {
    // Fetch Refresh-Token.
    const token = req.cookies.refreshToken;

    // Check Token.
    if (!token) {
      res.statusCode = 401;
      throw new Error("Refresh-Token is missing!");
    }

    // Hash the Refresh-Token.
    const tokenHash = hashRefreshToken(token);

    // Fetch user by session token hash.
    const user = await User.findOne({ "sessions.hashRefreshToken": tokenHash });
    if (!user) {
      res.statusCode = 403;
      throw new Error("Refresh-Token is invalid!");
    }

    // Fetch the exact session.
    const session = user.sessions.find((s) => s.hashRefreshToken === tokenHash);
    if (!session) {
      res.statusCode = 403;
      throw new Error("Session is invalid!");
    }

    // Check session expiry.
    if (session.expires < new Date()) {
      // Remove expired session atomically.
      await User.updateOne(
        { _id: user._id },
        { $pull: { sessions: { hashRefreshToken: tokenHash } } }
      );
      res.statusCode = 403;
      throw new Error("Refresh-token is expired!, Please Login");
    }

    // Create new Refresh-Token.
    const newRefreshToken = createRefreshToken();
    const newHashRefreshToken = hashRefreshToken(newRefreshToken);

    // Fetch session id.
    const sessionId = session._id;

    // Create new Access-Token.
    const newAccessToken = createAccessToken(user, sessionId);
    console.log(newAccessToken);

    // New Session/Refresh-Token expires time.
    const newExpiresTime = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);

    // Create new CSRF-Token.
    const newCSRFtoken = createCSRFtoken();
    const newHashCSRFtoken = hashCSRFtoken(newCSRFtoken);
    const newCSRFexpires = new Date(Date.now() + 1000 * 60 * 30);

    // Atomic Token-Rotation.
    const result = await User.updateOne(
      {
        _id: user._id,
        "sessions.hashRefreshToken": tokenHash,
      },
      {
        $set: {
          "sessions.$.hashRefreshToken": newHashRefreshToken,
          "sessions.$.expires": newExpiresTime,
          "sessions.$.hashCSRFtoken": newHashCSRFtoken,
          "sessions.$.csrfExpires": newCSRFexpires,
        },
      }
    );

    // If no document updated -> Race Condition or Stolen Token.
    if (result.modifiedCount === 0) {
      await User.updateOne(
        { _id: user._id },
        { $pull: { sessions: { hashRefreshToken: tokenHash } } }
      );
      res.statusCode = 409;
      throw new Error("Refresh Coflict! - Session removed, Login again.");
    }

    // Set updated token-cookies.
    setAccessTokenCookie(res, newAccessToken);
    setRefreshTokenCookie(res, newRefreshToken);

    res.status(200).json({
      code: 200,
      status: true,
      message: "Token refresh successfully.",
      data: { csrfToken: newCSRFtoken },
    });
  } catch (error) {
    next(error);
  }
};

export default { refresh };
