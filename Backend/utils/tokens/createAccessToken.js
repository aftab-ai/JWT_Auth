// Import Third-Party npm packages.
import jwt from "jsonwebtoken";

// Import Environment Variables.
import config from "../../config/keys.js";

// Generate JWT Access Token.
const createAccessToken = (user, sessionId) => {
  const token = jwt.sign(
    {
      // Paload.
      id: user._id,
      role: user.role,
      sessionId,
    },
    config.jwtAccessSecret, // JWT Access Secret.
    {
      expiresIn: config.jwtExpire, // Token expiry time.
      issuer: config.jwtIssuer, // Token issuer.
      audience: config.jwtAudience, // Token audience.
    }
  );

  return token;
};

export default createAccessToken;
