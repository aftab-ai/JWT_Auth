// Import Third-Party npm packages.
import jwt from "jsonwebtoken";

// Import Environment Variables.
import config from "../../config/index.js";

// Generate JWT Access Token.
const createAccessToken = (user, sessionId) => {
  const token = jwt.sign(
    {
      // Paload.
      id: user._id,
      role: user.role,
      sessionId,
    },
    config.keys.jwtAccessSecret, // JWT Access Secret.
    {
      expiresIn: config.keys.jwtExpire, // Token expiry time.
      issuer: config.keys.jwtIssuer, // Token issuer.
      audience: config.keys.jwtAudience, // Token audience.
    },
  );

  return token;
};

export default createAccessToken;
