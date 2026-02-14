// Import Environment Variables.
import config from "../../config/index.js";

// Node environment.
const isProd = config.keys.nodeENV === "production";

// Cookie centralize options.
const cookieOptions = {
  httpOnly: true,
  path: "/",
  secure: isProd,
  sameSite: isProd ? "strict" : "lax",
};

// Clear cookie.
const clearTokenCookie = (res, cookieName) => {
  res.clearCookie(cookieName, cookieOptions);
};

export default clearTokenCookie;
