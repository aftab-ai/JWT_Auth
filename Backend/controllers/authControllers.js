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
import generateCode from "../utils/randomCode/generateCode.js";
import sendEmail from "../utils/sendEmail/sendEmail.js";

// Import Environment Variables.
import config from "../config/keys.js";

// Node environment.
const isProd = config.nodeENV === "production";

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

// Email-Verification(Send verification-code to user email) controller.
const sendVerificationCode = async (req, res, next) => {
  try {
    // Fetch user-email.
    const { email } = req.body;
    // Fetch user-id via middleware;
    const userId = req.userId;

    // Find user.
    const user = await User.findOne({ email, _id: userId });
    if (!user) {
      res.statusCode = 401;
      throw new Error("User not found!");
    }

    // Generate 6 digit verification code, save in DB.
    const code = generateCode(6);
    user.verificationCode = code;
    await user.save();

    // Send email-verification code via Email.
    try {
      await sendEmail({
        emailTo: user.email,
        subject: "Email verification code.",
        data: code,
        content: "Verify your account.",
      });
    } catch (error) {
      res.statusCode = 500;
      throw new Error("Unable to send email!");
    }

    res.status(200).json({
      code: 200,
      status: true,
      message: "User verification code sent successfully!",
    });
  } catch (error) {
    next(error);
  }
};

// User logout(session-over) controller.
const logout = async (req, res, next) => {
  try {
    // Fetch user id from middleware.
    const userId = req.user._id;
    // Check userId.
    if (!userId) {
      res.statusCode = 401;
      throw new Error("Refresh-Token is missing or invalid!");
    }
    // Fetch Hash-Refresh-Token from middleware.
    const hashedRefreshToken = req.hashedRefreshToken;
    // Check hahsedRefreshToken.
    if (!hashedRefreshToken) {
      res.statusCode = 401;
      throw new Error("Refresh-Token is missing!");
    }

    // Remove user-session holding that Refresh-Token-Hash.
    await User.updateOne(
      { _id: userId },
      { $pull: { sessions: { hashRefreshToken: hashedRefreshToken } } }
    );

    // Cookie centralize options.
    const cookieOptions = {
      httpOnly: true,
      path: "/",
    };

    // Clear accessToken-cookie.
    res.clearCookie("accessToken", "", {
      ...cookieOptions,
      secure: isProd,
      sameSite: isProd ? "strict" : "lax",
    });
    // Clear refreshToken-cookie.
    res.clearCookie("refreshToken", "", {
      ...cookieOptions,
      secure: isProd,
      sameSite: isProd ? "strict" : "lax",
    });

    res.status(200).json({
      code: 200,
      status: true,
      message: "User logged out successfully.",
    });
  } catch (error) {
    next(error);
  }
};

// User logout-all(all-session-over) controller.
const logoutAll = async (req, res, next) => {
  try {
    // Fetch user id from middleware.
    const userId = req.user._id;
    // Check userId.
    if (!userId) {
      res.statusCode = 401;
      throw new Error("Refresh-Token is missing or invalid!");
    }

    // Remove all user-sessoins.
    await User.updateOne({ _id: userId }, { $set: { sessions: [] } });

    // Cookie centralize options.
    const cookieOptions = {
      httpOnly: true,
      path: "/",
    };

    // Clear accessToken-cookie.
    res.clearCookie("accessToken", "", {
      ...cookieOptions,
      secure: isProd,
      sameSite: isProd ? "strict" : "lax",
    });
    // Clear refreshToken-cookie.
    res.clearCookie("refreshToken", "", {
      ...cookieOptions,
      secure: isProd,
      sameSite: isProd ? "strict" : "lax",
    });

    res.status(200).json({
      code: 200,
      status: true,
      message: "User logged out successfully from all the sessions.",
    });
  } catch (error) {
    next(error);
  }
};

export default { signUp, signIn, sendVerificationCode, logout, logoutAll };
