// Import Third-Party npm packages.
import mongoose from "mongoose";

// Import local file-modules.
import models from "../models/index.js";
import hashPassword from "../utils/password/hashPassword.js";
import compareHashPassword from "../utils/password/compareHashPassword.js";
import createAccessToken from "../utils/tokens/createAccessToken.js";
import setAccessTokenCookie from "../utils/cookies/setAccessTokenCookie.js";
import createRefreshToken from "../utils/tokens/createRefreshToken.js";
import setRefreshTokenCookie from "../utils/cookies/setRefreshTokenCookie.js";
import hashRefreshToken from "../utils/tokens/hashRefreshToken.js";
import parseDeviceName from "../utils/userDevice/parseDeviceName.js";
import createCSRFToken from "../utils/tokens/createCSRFToken.js";
import hashCSRFToken from "../utils/tokens/hashCSRFToken.js";
import generateCode from "../utils/randomCode/generateCode.js";
import sendEmail from "../utils/sendEmail/sendEmail.js";
import clearTokenCookie from "../utils/cookies/clearTokenCookie.js";
import hashRandomCode from "../utils/randomCode/hashRandomCode.js";
import compareHashCode from "../utils/randomCode/compareHashCode.js";

// ====> User Registration(signUp) controller.
const signUp = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // Check duplicate email.
    const isEmailExist = await models.User.findOne({ email });
    if (isEmailExist) {
      res.statusCode = 409;
      throw new Error("Email already exist!");
    }

    // Hash user password.
    const hashedPassword = await hashPassword(password);

    // Save user data to database.
    const newUser = new models.User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    res.status(201).json({
      statusCode: 201,
      status: true,
      message: "User registered successfully.",
    });
  } catch (error) {
    next(error);
  }
};

// ====> User Authentication(login) controller.
const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find user in database.
    const user = await models.User.findOne({ email }).select("+password");
    if (!user) {
      res.statusCode = 401;
      throw new Error("Invalid credentials!");
    }

    // Compare the password.
    const verifyPassword = await compareHashPassword(password, user.password);
    if (!verifyPassword) {
      res.statusCode = 401;
      throw new Error("Invalid credentials!");
    }

    // Refresh-Token.
    const refreshToken = createRefreshToken();
    // Hash Refresh-Token.
    const hashedRefreshToken = hashRefreshToken(refreshToken);
    // CSRF-Token(Cross-Site Request Forgery).
    const csrfToken = createCSRFToken();
    // Hash CSRF Token.
    const hashedCSRFToken = hashCSRFToken(csrfToken);

    // Parse user device info.
    const deviceName = parseDeviceName(req.headers["user-agent"]);

    // Fetch user sessions(Ascending Order).
    let sessions = await models.Session.find({ user: user._id }).sort({
      createdAt: 1,
    });
    // Sessions limits to 10.
    if (sessions.length >= 10) {
      await models.Session.deleteOne({ _id: sessions[0]._id });
      sessions.shift();
    }

    // Create new session.
    const newSession = new models.Session({
      user: user._id,
      hashRefreshToken: hashedRefreshToken,
      hashCSRFToken: hashedCSRFToken,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      device: {
        ip: req.ip,
        userAgent: req.headers["user-agent"],
        deviceName: deviceName,
      },
    });
    await newSession.save();

    // Get sessionId
    const sessionId = newSession._id.toString();

    // Access Token.
    const accessToken = createAccessToken(user, sessionId);

    // Cookie.
    setAccessTokenCookie(res, accessToken);
    setRefreshTokenCookie(res, refreshToken);

    res.status(200).json({
      statusCode: 200,
      status: true,
      message: "User LoggedIn successfully.",
      data: { csrfToken: csrfToken },
    });
  } catch (error) {
    next(error);
  }
};

// ====> Token Refresh controller.
const tokenRefresh = async (req, res, next) => {
  try {
    // Check User-Authentication.
    if (!req.user && !req.session && !req.hashedRefreshToken) {
      res.statusCode = 401;
      throw new Error("User is not authenticated!");
    }
    // Fetch from validateRefreshToken middleware.
    const user = req.user;
    const session = req.session;
    const hashedRefreshToken = req.hashedRefreshToken;

    // Create new Refresh-Token.
    const newRefreshToken = createRefreshToken();
    const newHashRefreshToken = hashRefreshToken(newRefreshToken);

    // New Session/Refresh-Token expires time.
    const newExpiresTime = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);

    // Create new CSRF-Token.
    const newCSRFToken = createCSRFToken();
    const newHashCSRFToken = hashCSRFToken(newCSRFToken);

    // Atomic Token-Rotation.
    const result = await models.Session.updateOne(
      {
        _id: session._id,
        hashRefreshToken: hashedRefreshToken,
      },
      {
        $set: {
          hashRefreshToken: newHashRefreshToken,
          expiresAt: newExpiresTime,
          hashCSRFToken: newHashCSRFToken,
        },
      }
    );

    // If no document updated -> Race Condition or Stolen Token.
    if (result.modifiedCount === 0) {
      await models.Session.deleteOne({ _id: session._id });
      res.statusCode = 409;
      throw new Error("Refresh Conflict! - Session removed, Login again.");
    }

    // Fetch session id.
    const sessionId = session._id;
    // Create new Access-Token.
    const newAccessToken = createAccessToken(user, sessionId);

    // Set updated token-cookies.
    setAccessTokenCookie(res, newAccessToken);
    setRefreshTokenCookie(res, newRefreshToken);

    res.status(200).json({
      statusCode: 200,
      status: true,
      message: "Token refreshed successfully.",
      data: { csrfToken: newCSRFToken },
    });
  } catch (error) {
    next(error);
  }
};

// ====> Send-Email-Verification-Code controller.
const emailVerificationCode = async (req, res, next) => {
  try {
    // Check User-Authentication.
    if (!req.userId) {
      res.statusCode = 401;
      throw new Error("User is not authenticated!");
    }
    // Fetch user-id via middleware;
    const userId = req.userId;
    // Fetch user-email.
    const { email } = req.body;

    // Find user.
    const user = await models.User.findOne({ email, _id: userId });
    if (!user) {
      res.statusCode = 401;
      throw new Error("Invalid credentials!");
    }

    // Check email-verification.
    if (user.isEmailVerified) {
      res.statusCode = 400;
      throw new Error("Email already verified!");
    }

    // Generate 6 digit verification code, save in DB.
    const code = generateCode(6);
    // Hash Code.
    const hashedCode = await hashRandomCode(code);
    user.emailVerification = {
      hashCode: hashedCode,
      expiresAt: Date.now() + 1000 * 60 * 2,
    };
    await user.save();

    // Send email-verification code via Email.
    try {
      await sendEmail({
        emailTo: user.email,
        subject: "Email-Verification code.",
        data: code,
        content: "verify your account.",
      });
    } catch (error) {
      res.statusCode = 500;
      next(error);
    }

    res.status(200).json({
      statusCode: 200,
      status: true,
      message: "User verification code sent successfully.",
    });
  } catch (error) {
    next(error);
  }
};

// ====> Email-Verification(Verify user email via code) controller.
const verifyEmail = async (req, res, next) => {
  try {
    // Check User-Authentication.
    if (!req.userId) {
      res.statusCode = 401;
      throw new Error("User is not authenticated!");
    }
    // Fetch user-id via middleware.
    const userId = req.userId;
    // Fetch user email and code.
    const { email, code } = req.body;

    // Find user.
    const user = await models.User.findOne({ email, _id: userId }).select(
      "+emailVerification.hashCode"
    );
    if (!user) {
      res.statusCode = 401;
      throw new Error("Invalid credentials!");
    }

    // Check email-verification.
    if (user.isEmailVerified) {
      res.statusCode = 400;
      throw new Error("Email already verified!");
    }

    // Check Code expiry.
    if (
      !user.emailVerification ||
      !user.emailVerification.hashCode ||
      user.emailVerification.expiresAt < new Date()
    ) {
      res.statusCode = 400;
      throw new Error("Verification code is invalid or expired!");
    }

    // Verify code.
    const verifyCode = await compareHashCode(
      code,
      user.emailVerification.hashCode
    );
    if (!verifyCode) {
      res.statusCode = 400;
      throw new Error("Code is invalid!");
    }

    user.isEmailVerified = true; // Email-Verified true.
    user.emailVerification = undefined;
    await user.save();

    // Remove all user-sessoins.
    await models.Session.deleteMany({ user: userId });

    clearTokenCookie(res, "accessToken"); // Clear accessToken cookie.
    clearTokenCookie(res, "refreshToken"); // Clear refreshToken cookie.

    res.status(200).json({
      statusCode: 200,
      status: true,
      message: "User verified successfully. Please, Login again.",
      data: { csrfToken: null },
    });
  } catch (error) {
    next(error);
  }
};

// ====> Send Password-Reset-Code controller.
const requestPasswordReset = async (req, res, next) => {
  try {
    // Check User-Authentication.
    if (!req.userId) {
      res.statusCode = 401;
      throw new Error("User is not authenticated!");
    }
    // Fetch userId.
    const userId = req.userId;
    // Fetch Passwords.
    const { oldPassword } = req.body;

    // Fetch user.
    const user = await models.User.findById(userId).select("+password");
    // Velidate user.
    if (!user) {
      res.statusCode = 401;
      throw new Error("User not found!");
    }

    // Verify password.
    const verifyOldPassword = await compareHashPassword(
      oldPassword,
      user.password
    );
    if (!verifyOldPassword) {
      res.statusCode = 401;
      throw new Error("Invalid credentials!");
    }

    // Generate 6 digit verification code, save in DB.
    const code = generateCode(6);
    // Hash Code.
    const hashedCode = await hashRandomCode(code);

    const passwordReset = new models.PasswordReset({
      user: userId,
      hashCode: hashedCode,
      expiresAt: Date.now() + 1000 * 60 * 2,
      attempts: 0,
    });
    await passwordReset.save();

    // Send email-verification code via Email.
    try {
      await sendEmail({
        emailTo: user.email,
        subject: "Password-Reset code.",
        data: code,
        content: "reset your password.",
      });
    } catch (error) {
      res.statusCode = 500;
      next(error);
    }
  } catch (error) {
    next(error);
  }

  res.status(200).json({
    statusCode: 200,
    status: true,
    message: "Password-Reset-Code sent successfully.",
  });
};

// ====> Password-Reset(Reset password after code-verification) controller.
const verifyPasswordReset = async (req, res, next) => {
  try {
    // Check User-Authentication.
    if (!req.userId) {
      res.statusCode = 401;
      throw new Error("User is not authenticated!");
    }
    // Fetch userId.
    const userId = req.userId;
    // Fetch code, newPassword.
    const { code, newPassword } = req.body;

    // Fetch passwordReset and update.
    const passwordReset = await models.PasswordReset.findOne({
      user: userId,
      usedAt: { $exists: false },
      expiresAt: { $gt: Date.now() },
    }).select("+hashCode");
    // Check passwordReset.
    if (!passwordReset) {
      res.statusCode = 400;
      throw new Error("Reset-Code expires or invalid!");
    }

    // Attempts increase.
    passwordReset.attempts += 1;
    await passwordReset.save();

    // Check Attempts.
    if (passwordReset.attempts > 3) {
      res.statusCode = 429;
      throw new Error("Too many attempts!");
    }

    // Verify code.
    const verifyCode = await compareHashCode(code, passwordReset.hashCode);
    if (!verifyCode) {
      res.statusCode = 400;
      throw new Error("Code is invalid!");
    }

    // Hash new password.
    const newhashedPassword = await hashPassword(newPassword);

    // Fetch user and update.
    const user = await models.User.findById(userId).select("+password");
    user.password = newhashedPassword;
    user.passwordChangedAt = new Date();
    await user.save();

    passwordReset.usedAt = new Date();
    await passwordReset.save();

    // Remove all user-sessoins.
    await models.PasswordReset.deleteMany({ user: userId });
    await models.Session.deleteMany({ user: userId });

    clearTokenCookie(res, "accessToken"); // Clear accessToken cookie.
    clearTokenCookie(res, "refreshToken"); // Clear refreshToken cookie.

    res.status(200).json({
      statusCode: 200,
      status: true,
      message: "User password-reset successfully. Please, Login again.",
      data: { csrfToken: null },
    });
  } catch (error) {
    next(error);
  }
};

// ====> User Logout(session-over) controller.
const logout = async (req, res, next) => {
  try {
    // Check User-Authentication.
    if (!userId && req.hashedRefreshToken) {
      res.statusCode = 401;
      throw new Error("User is not authenticated!");
    }
    // Fetch user id from middleware.
    const userId = req.user._id;
    // Fetch Hash-Refresh-Token from middleware.
    const hashedRefreshToken = req.hashedRefreshToken;

    // Remove user-session holding that Refresh-Token-Hash.
    await models.Session.deleteOne({
      user: userId,
      hashRefreshToken: hashedRefreshToken,
    });

    clearTokenCookie(res, "accessToken"); // Clear accessToken cookie.
    clearTokenCookie(res, "refreshToken"); // Clear refreshToken cookie.

    res.status(200).json({
      statusCode: 200,
      status: true,
      message: "User logged out successfully.",
      data: { csrfToken: null },
    });
  } catch (error) {
    next(error);
  }
};

// ====> User Logout-All(all-session-over) controller.
const logoutAll = async (req, res, next) => {
  try {
    // Check User Authentication.
    if (!userId) {
      res.statusCode = 401;
      throw new Error("User is not authenticated!");
    }
    // Fetch user id from middleware.
    const userId = req.user._id;

    // Remove all user-sessoins.
    await models.Session.deleteMany({ user: userId });

    clearTokenCookie(res, "accessToken"); // Clear accessToken cookie.
    clearTokenCookie(res, "refreshToken"); // Clear refreshToken cookie.

    res.status(200).json({
      statusCode: 200,
      status: true,
      message: "User logged out successfully from all the sessions.",
      data: { csrfToken: null },
    });
  } catch (error) {
    next(error);
  }
};

// ====> User Account-Deletion controller.
const deleteUser = async (req, res, next) => {
  // MonogoDB session.
  const session = await mongoose.startSession();

  try {
    // Transaction Start.
    session.startTransaction();

    // Check User Authentication.
    if (!userId) {
      res.statusCode = 401;
      throw new Error("User is not authenticated!");
    }
    // Fetch userId.
    const userId = req.userId;
    // Fetch password.
    const { password } = req.body;

    // Fetch user.
    const user = await models.User.findById(userId)
      .select("+password")
      .session(session);
    // Check user.
    if (!user) {
      res.statusCode = 401;
      throw new Error("User not found!");
    }

    // Compare the password.
    const verifyPassword = await compareHashPassword(password, user.password);
    if (!verifyPassword) {
      res.statusCode = 401;
      throw new Error("Invalid credentials!");
    }

    // Delete user.
    await models.PasswordReset.deleteMany({ user: userId }).session(session);
    await models.Session.deleteMany({ user: userId }).session(session);
    await models.User.deleteOne({ _id: userId }).session(session);

    // Finalize the Transaction.
    await session.commitTransaction();

    // Clear cookies.
    clearTokenCookie(res, "accessToken"); // Clear accessToken cookie.
    clearTokenCookie(res, "refreshToken"); // Clear refreshToken cookie.

    res.status(200).json({
      statusCode: 200,
      status: true,
      message: "User-Account deleted successfully.",
      data: { csrfToken: null },
    });
  } catch (error) {
    // Only abort if transaction is still active.
    if (session.inTransaction()) {
      await session.abortTransaction();
    }
    next(error);
  } finally {
    session.endSession(); // Session End.
  }
};

export default {
  signUp,
  signIn,
  tokenRefresh,
  emailVerificationCode,
  verifyEmail,
  requestPasswordReset,
  verifyPasswordReset,
  logout,
  logoutAll,
  deleteUser,
};
