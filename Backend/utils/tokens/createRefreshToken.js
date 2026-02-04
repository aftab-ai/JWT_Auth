// Import Third-Party npm packages.
import crypto from "crypto";

// Generate 64bytes data convert into 128 characters of hex string(refresh-token).
const createRefreshToken = () => {
  return crypto.randomBytes(64).toString("hex");
};

export default createRefreshToken;
