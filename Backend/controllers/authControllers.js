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
import { AppError } from "../middlewares/errorHandler.js";

// Public controllers.
// ====> User-Registration(signup) controller.
const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // Check duplicate email.
    const isEmailExist = await models.User.findOne({ email });
    if (isEmailExist) {
      throw new AppError("Email already exist!", "DUPLICATE_EMAIL", 409);
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
      code: "USER_CREATED",
      message: "User registered successfully. Please sign in to continue.",
    });
  } catch (error) {
    next(error);
  }
};

// ====> Send Forgot-Password-Code controller.
const forgotPassword = async (req, res, next) => {
  try {
    // Fetch email.
    const { email } = req.body;

    // Fetch user.
    const user = await models.User.findOne({ email });
    // Check user.
    if (!user) {
      throw new AppError("User not found!", "USER_NOT_FOUND", 401);
    }

    // Generate code.
    const code = generateCode(6);
    // Hash code.
    const hashedCode = await hashRandomCode(code);

    const forgotPassword = new models.ForgotPassword({
      user: user._id,
      hashCode: hashedCode,
      expiresAt: Date.now() + 1000 * 60 * 2,
      attempts: 0,
    });
    await forgotPassword.save();

    // Send forgot-password-code via Email.
    await sendEmail({
      emailTo: user.email,
      subject: "Forgot-Password code.",
      data: code,
      content: "reset your password.",
    });

    res.status(200).json({
      statusCode: 200,
      status: true,
      code: "VERIFICATION_CODE_SENT",
      message: "Forgot-Password-Code sent successfully.",
    });
  } catch (error) {
    next(error);
  }
};

// ====> Forgot-Password(reset password after code-verification) controller.
const verifyForgotPassword = async (req, res, next) => {
  try {
    // Fetch data.
    const { email, code, newPassword } = req.body;

    // Fetch user.
    const user = await models.User.findOne({ email }).select("+password");
    // Check user.
    if (!user) {
      throw new AppError("User not found!", "USER_NOT_FOUND", 401);
    }

    // Fetch forgotPassword and update.
    const forgotPassword = await models.ForgotPassword.findOne({
      user: user._id,
      usedAt: { $exists: false },
      expiresAt: { $gt: Date.now() },
    }).select("+hashCode");
    // Check passwordReset.
    if (!forgotPassword) {
      throw new AppError(
        "Reset-Code expires!",
        "VERIFICATION_CODE_EXPIRES",
        400,
      );
    }

    // Attempts increase.
    forgotPassword.attempts += 1;
    await forgotPassword.save();

    // Check Attempts.
    if (forgotPassword.attempts > 3) {
      throw new AppError("Too many attempts!", "TOO_MANY_ATTEMPTS", 429);
    }

    // Verify code.
    const verifyCode = await compareHashCode(code, forgotPassword.hashCode);
    if (!verifyCode) {
      throw new AppError("Code is invalid!", "VERIFICAION_CODE_INVALID", 400);
    }

    // Hash new password.
    const newhashedPassword = await hashPassword(newPassword);

    // Fetch user and update.
    user.password = newhashedPassword;
    user.passwordChangedAt = new Date();
    await user.save();

    forgotPassword.usedAt = new Date();
    await forgotPassword.save();

    // Remove all user-sessoins.
    await models.ForgotPassword.deleteMany({ user: user._id });
    await models.Session.deleteMany({ user: user._id });

    res.status(200).json({
      statusCode: 200,
      status: true,
      code: "PASSWORD_RESET_SUCCESSFULL",
      message: "User Password-Reset successfully. Please log in to continue.",
    });
  } catch (error) {
    next(error);
  }
};

// ====> User-Authentication(login) controller.
const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find user in database.
    const user = await models.User.findOne({ email }).select("+password");
    if (!user) {
      throw new AppError("Invalid credentials!", "INVALID_CREDENTIALS", 401);
    }

    // Compare the password.
    const verifyPassword = await compareHashPassword(password, user.password);
    if (!verifyPassword) {
      throw new AppError("Invalid credentials!", "INVALID_CREDENTIALS", 401);
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
      code: "USER_AUTHENTICATED",
      message: "User logged in successfully.",
      data: { csrfToken: csrfToken },
    });
  } catch (error) {
    next(error);
  }
};

// Protected controllers.
// ====> Current-User controller.
const currentUser = async (req, res, next) => {
  try {
    // Check User-Authentication.
    if (!req.userId) {
      throw new AppError(
        "User is not authenticated!",
        "USER_NOT-AUTHENTICATED",
        401,
      );
    }
    // Fetch user-id via middleware;
    const userId = req.userId;

    // Find user.
    const user = await models.User.findById(userId);
    if (!user) {
      throw new AppError("User not found!", "USER_NOT_FOUND", 401);
    }

    res.status(200).json({
      statusCode: 200,
      status: true,
      code: "CURRENT_USER",
      message: "Get current user successfully.",
      data: { userId: user._id, username: user.username, role: user.role },
    });
  } catch (error) {
    next(error);
  }
};

// ====> Token-Refresh controller.
const tokenRefresh = async (req, res, next) => {
  try {
    // Fetch from validateRefreshToken middleware.
    const { user, session, hashedRefreshToken } = req;
    if (!user || !session || !hashedRefreshToken) {
      throw new AppError("Session is not found!", "SESSION_NOT_FOUND", 401);
    }

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
      },
    );

    // If no document updated -> Race Condition or Stolen Token.
    if (result.modifiedCount === 0) {
      await models.Session.deleteOne({ _id: session._id });
      throw new AppError(
        "Refresh Conflict! - Session removed, Login again.",
        "REFRESH_CONFLICT",
        409,
      );
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
      code: "TOKEN_REFRESHED",
      message: "Token refreshed successfully.",
      data: { csrfToken: newCSRFToken },
    });
  } catch (error) {
    next(error);
  }
};

// ====> Send Email-Verification-Code controller.
const emailVerificationCode = async (req, res, next) => {
  try {
    // Fetch user-id via middleware;
    const userId = req.userId;
    // Check User-Authentication.
    if (!userId) {
      throw new AppError(
        "User is not authenticated!",
        "USER_NOT_AUTHENTICATED",
        401,
      );
    }
    // Fetch user-email.
    const { email } = req.body;

    // Find user.
    const user = await models.User.findOne({ email, _id: userId });
    if (!user) {
      throw new AppError("User not found!", "USER_NOT_FOUND", 401);
    }

    // Check email-verification.
    if (user.isEmailVerified) {
      throw new AppError("Email already verified!", "VERIFIED_USER", 400);
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
    await sendEmail({
      emailTo: user.email,
      subject: "Email-Verification code.",
      data: code,
      content: "verify your account.",
    });

    res.status(200).json({
      statusCode: 200,
      status: true,
      code: "USER_VERIFICATION_CODE_SENT",
      message: "User verification code sent successfully.",
    });
  } catch (error) {
    next(error);
  }
};

// ====> Email-Verification(Verify user email via code) controller.
const verifyEmail = async (req, res, next) => {
  try {
    // Fetch user-id via middleware.
    const userId = req.userId;
    // Check User-Authentication.
    if (!userId) {
      throw new AppError(
        "User is not authenticated!",
        "USER_NOT_AUTHENTICATED",
        401,
      );
    }
    // Fetch user email and code.
    const { email, code } = req.body;

    // Find user.
    const user = await models.User.findOne({ email, _id: userId }).select(
      "+emailVerification.hashCode",
    );
    if (!user) {
      throw new AppError("User not found!", "USER_NOT_FOUND", 401);
    }

    // Check email-verification.
    if (user.isEmailVerified) {
      throw new AppError("Email already verified!", "VERIFIED_USER", 400);
    }

    // Check Code expiry.
    if (
      !user.emailVerification ||
      !user.emailVerification.hashCode ||
      user.emailVerification.expiresAt < new Date()
    ) {
      throw new AppError(
        "Verification code is expired!",
        "VERIFICATION_CODE_EXPIRED",
        400,
      );
    }

    // Verify code.
    const verifyCode = await compareHashCode(
      code,
      user.emailVerification.hashCode,
    );
    if (!verifyCode) {
      throw new AppError("Code is invalid!", "VERIFICATION_CODE_INVALID", 400);
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
      code: "USER_VERIFIED",
      message: "User verified successfully. Please log in again.",
      data: { csrfToken: null },
    });
  } catch (error) {
    next(error);
  }
};

// ====> Send Password-Reset-Code controller.
const requestPasswordReset = async (req, res, next) => {
  try {
    // Fetch userId.
    const userId = req.userId;
    // Check User-Authentication.
    if (!userId) {
      throw new AppError(
        "User is not authenticated!",
        "USER_NOT_AUTHENTICATED",
        401,
      );
    }
    // Fetch Passwords.
    const { oldPassword } = req.body;

    // Fetch user.
    const user = await models.User.findById(userId).select("+password");
    // Velidate user.
    if (!user) {
      throw new AppError("User not found!", "USER_NOT_FOUND", 401);
    }

    // Verify password.
    const verifyOldPassword = await compareHashPassword(
      oldPassword,
      user.password,
    );
    if (!verifyOldPassword) {
      throw new AppError("Invalid credentials!", "INVALID_CREDENTIALS", 401);
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
    await sendEmail({
      emailTo: user.email,
      subject: "Password-Reset code.",
      data: code,
      content: "reset your password.",
    });

    res.status(200).json({
      statusCode: 200,
      status: true,
      code: "PASSWORD_RESET_CODE_SENT",
      message: "Password-Reset-Code sent successfully.",
    });
  } catch (error) {
    next(error);
  }
};

// ====> Password-Reset(Reset password after code-verification) controller.
const verifyPasswordReset = async (req, res, next) => {
  try {
    // Fetch userId.
    const userId = req.userId;
    // Check User-Authentication.
    if (!userId) {
      throw new AppError(
        "User is not authenticated!",
        "USER_NOT_AUTHENTICATED",
        401,
      );
    }
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
      throw new AppError(
        "Reset-Code expires!",
        "PASSWORD_RESET_CODE_EXPIRES",
        400,
      );
    }

    // Attempts increase.
    passwordReset.attempts += 1;
    await passwordReset.save();

    // Check Attempts.
    if (passwordReset.attempts > 3) {
      throw new AppError("Too many attempts!", "TOO_MANY_ATTEMPTS", 429);
    }

    // Verify code.
    const verifyCode = await compareHashCode(code, passwordReset.hashCode);
    if (!verifyCode) {
      throw new AppError("Code is invalid!", "INVALID_CODE", 400);
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
      code: "PASSWORD_RESET",
      message: "User password-reset successfully. Please log in again.",
      data: { csrfToken: null },
    });
  } catch (error) {
    next(error);
  }
};

// ====> User-Logout(session-over) controller.
const logout = async (req, res, next) => {
  try {
    // Fetch user id from middleware.
    const userId = req.user._id;
    // Fetch Hash-Refresh-Token from middleware.
    const hashedRefreshToken = req.hashedRefreshToken;

    // Check User-Authentication.
    if (!userId && !hashedRefreshToken) {
      throw new AppError(
        "User is not authenticated!",
        "USER_NOT_AUTHENTICATED",
        401,
      );
    }

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
      code: "USER_LOGGED_OUT",
      message: "User logged out successfully.",
      data: { csrfToken: null },
    });
  } catch (error) {
    next(error);
  }
};

// ====> User-Logout-All(all-session-over) controller.
const logoutAll = async (req, res, next) => {
  try {
    // Fetch user id from middleware.
    const userId = req.user._id;
    // Check User-Authentication.
    if (!userId) {
      throw new AppError(
        "User is not authenticated!",
        "USER_NOT_AUTHENTICATED",
        401,
      );
    }

    // Remove all user-sessoins.
    await models.Session.deleteMany({ user: userId });

    clearTokenCookie(res, "accessToken"); // Clear accessToken cookie.
    clearTokenCookie(res, "refreshToken"); // Clear refreshToken cookie.

    res.status(200).json({
      statusCode: 200,
      status: true,
      code: "SESSIONS_DELETED",
      message: "User logged out successfully from all the sessions.",
      data: { csrfToken: null },
    });
  } catch (error) {
    next(error);
  }
};

// ====> User-Account-Deletion controller.
const deleteUser = async (req, res, next) => {
  // MonogoDB session.
  const session = await mongoose.startSession();

  try {
    // Transaction Start.
    session.startTransaction();

    // Fetch userId.
    const userId = req.userId;
    // Check User Authentication.
    if (!userId) {
      throw new AppError(
        "User is not authenticated!",
        "USER_NOT_AUTHENTICATED",
        401,
      );
    }
    // Fetch password.
    const { password } = req.body;

    // Fetch user.
    const user = await models.User.findById(userId)
      .select("+password")
      .session(session);
    // Check user.
    if (!user) {
      throw new AppError("User not found!", "USER_NOT_FOUND", 401);
    }

    // Compare the password.
    const verifyPassword = await compareHashPassword(password, user.password);
    if (!verifyPassword) {
      throw new AppError("Invalid credentials!", "INVALID_CREDENTIALS", 401);
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
      code: "USER_DELETED",
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
  signup,
  forgotPassword,
  verifyForgotPassword,
  signin,
  currentUser,
  tokenRefresh,
  emailVerificationCode,
  verifyEmail,
  requestPasswordReset,
  verifyPasswordReset,
  logout,
  logoutAll,
  deleteUser,
};
