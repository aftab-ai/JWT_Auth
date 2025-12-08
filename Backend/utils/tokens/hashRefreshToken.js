// Import Third-Party npm packages.
import crypto from "crypto";

// Import Environment Variables.
import config from "../../config/keys.js";

// Refresh-Token Hash
const hashRefreshToken = (token) => {
  return crypto
    .createHmac("sha256", config.jwtRefreshSecret) // Hash with jwtRefreshSecret.
    .update(token) // Feed data into the hash.
    .digest("hex"); // 64 chracters of hex string(refresh-token).
};

export default hashRefreshToken;
