// Import Environment Variables.
import config from "../../config/keys.js";

// Refresh-Token Cookie setup.
const setRefreshTokenCookie = (res, token) => {
  // Node enviroment.
  const isProd = config.nodeENV === "production";

  // Refresh-Token Cookie.
  res.cookie("refreshToken", token, {
    httpOnly: true, // Protect againt XSS.
    secure: isProd, // Only HTTPS in production.
    // Blocks CSRF(cross-site request fetch) unless using cross-domain auth.
    sameSite: isProd ? "strict" : "lax",
    maxAge: 1000 * 60 * 60 * 24 * 7,
    path: "/",
  });
};

export default setRefreshTokenCookie;
