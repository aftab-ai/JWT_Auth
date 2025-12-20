// Import Third-Party npm packages.
import crypto from "crypto";

// Cross-Site Request Forgery token.
// Generate 32bytes data convert into 64 characters of hex string(csrf-token).
const createCSRFToken = () => {
  return crypto.randomBytes(32).toString("hex");
};

export default createCSRFToken;
