// Import Third-Party npm packages.
import jwt from "jsonwebtoken";

// Import local file-modules.
import config from "../config/keys.js";

// Generate JWT Access Token.
const createAccessToken = (user) => {
  const token = jwt.sign(
    {
      // Paload.
      _id: user._id,
      email: user.email,
      role: user.role,
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
