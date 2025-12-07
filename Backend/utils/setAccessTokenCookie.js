// Import Environment Variables.
import config from "../config/keys.js";

// Access-Token Cookie setup.
const setAccessTokenCookie = (res, token) => {
  // Node environment.
  const isProd = config.nodeENV === "production";

  // Access-Token cookie.
  res.cookie("accessToken", token, {
    httpOnly: true, // Protect againt XSS.
    secure: isProd, // Only HTTPS in production.
    // Blocks CSRF(cross-site request fetch) unless using cross-domain auth.
    sameSite: isProd ? "strict" : "lax",
    maxAge: 1000 * 60 * 15,
    path: "/",
  });
};

export default setAccessTokenCookie;
