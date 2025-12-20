// Import Third-Party npm packages.
import crypto from "crypto";

// Import Environment Variables.
import config from "../../config/keys.js";

// CSRF-Token Hash.
const hashCSRFToken = (token) => {
  return crypto
    .createHmac("sha256", config.csrfTokenSecret) // Hash with csrfSecret.
    .update(token) // Feed data into the hash.
    .digest("hex"); // 64 chracters of hex string(csrf-token).
};

export default hashCSRFToken;
