// Import Environment Variables.
import config from "../../config/keys.js";

// Refresh-Token Cookie setup.
const setRefreshTokenCookie = (res, token) => {
  // Node environment.
  const isProd = config.nodeENV === "production";

  // Cookie centralize options.
  const cookieOptions = {
    httpOnly: true, // Protect againt XSS.
    path: "/",
  };

  // Refresh-Token Cookie.
  res.cookie("refreshToken", token, {
    ...cookieOptions,
    secure: isProd, // Only HTTPS in production.
    // Blocks CSRF(cross-site request fetch) unless using cross-domain auth.
    sameSite: isProd ? "strict" : "lax",
    maxAge: 1000 * 60 * 60 * 24 * 7,
  });
};

export default setRefreshTokenCookie;
