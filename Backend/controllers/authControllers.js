// Import local file-modules.
import User from "../models/User.js";
import hashPassword from "../utils/password/hashPassword.js";
import comparePassword from "../utils/password/comparePassword.js";
import createAccessToken from "../utils/tokens/createAccessToken.js";
import setAccessTokenCookie from "../utils/cookies/setAccessTokenCookie.js";
import createRefreshToken from "../utils/tokens/createRefreshToken.js";
import setRefreshTokenCookie from "../utils/cookies/setRefreshTokenCookie.js";
import hashRefreshToken from "../utils/tokens/hashRefreshToken.js";
import parseDeviceName from "../utils/device/parseDeviceName.js";
import createCSRFtoken from "../utils/tokens/createCSRFtoken.js";
import hashCSRFtoken from "../utils/tokens/hashCSRFtoken.js";

// User registration(signUp) controller.
const signUp = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // Check duplicate email.
    const isEmailExist = await User.findOne({ email });
    if (isEmailExist) {
      res.statusCode = 409;
      throw new Error("Email already exist!");
    }

    // Hash user password.
    const hashedPassword = await hashPassword(password);

    // Save user data to database.
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({
      code: 201,
      status: true,
      message: "User registered successfully.",
    });
  } catch (error) {
    next(error);
  }
};

// User authentication(login) controller.
const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find user in database.
    const user = await User.findOne({ email });
    if (!user) {
      res.statusCode = 401;
      throw new Error("Invalid credentials!");
    }

    // Compare the password.
    const match = await comparePassword(password, user.password);
    if (!match) {
      res.statusCode = 401;
      throw new Error("Invalid credentials!");
    }

    // Refresh Token.
    const refreshToken = createRefreshToken();
    // Hash Refresh Token.
    const hashedRefreshToken = hashRefreshToken(refreshToken);
    // CSRF(Cross-Site Request Forgery) Token.
    const csrfToken = createCSRFtoken();
    // Hash CSRF Token.
    const hashedCSRFtoken = hashCSRFtoken(csrfToken);

    // Parse user device info.
    const deviceName = parseDeviceName(req.headers["user-agent"]);

    // Sessions limits to 10.
    if (user.sessions.length >= 10) user.sessions.shift();

    // Create new session.
    const newSession = {
      hashCSRFtoken: hashedCSRFtoken,
      csrfExpires: new Date(Date.now() + 1000 * 60 * 30),
      hashRefreshToken: hashedRefreshToken,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      device: {
        ip: req.ip,
        userAgent: req.headers["user-agent"],
        deviceName: deviceName,
      },
    };

    user.sessions.push(newSession);

    // Get sessionId
    const sessionId = user.sessions[user.sessions.length - 1]._id.toString();

    // Access Token.
    const accessToken = createAccessToken(user, sessionId);

    // User Sessions save to DB.
    await user.save();

    // Cookie.
    setAccessTokenCookie(res, accessToken);
    setRefreshTokenCookie(res, refreshToken);

    res.status(200).json({
      code: 200,
      status: true,
      message: "User signIn successfully.",
      data: { csrfToken: csrfToken },
    });
  } catch (error) {
    next(error);
  }
};

export default { signUp, signIn };
