// Import Environment Variables.
import config from "../../config/index.js";

// Access-Token Cookie setup.
const setAccessTokenCookie = (res, token) => {
  // Node environment.
  const isProd = config.keys.nodeENV === "production";

  // Cookie centralize options.
  const cookieOptions = {
    httpOnly: true, // Protect againt XSS.
    path: "/",
    secure: isProd, // Only HTTPS in production.
    // Blocks CSRF(cross-site request fetch) unless using cross-domain auth.
    sameSite: isProd ? "strict" : "lax",
  };

  // Access-Token cookie.
  res.cookie("accessToken", token, {
    ...cookieOptions,
    maxAge: 1000 * 60 * 15,
  });
};

export default setAccessTokenCookie;
