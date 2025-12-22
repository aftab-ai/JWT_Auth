// Import Third-Party npm packages.
import express from "express";

// Import local-file modules.
import controllers from "../controllers/index.js";
import validators from "../validators/authValidators.js";
import validate from "../validators/validate.js";
import middlewares from "../middlewares/index.js";

// Express sub routes.
const router = express.Router();

// Public routes.
// ====> POST, User-Registration route.
router.post(
  "/signUp",
  middlewares.rateLimiter(1000 * 60 * 60, 5), // Minimize registration attempts(5/1h).
  validators.signUpValidators, // Validate signUp credentials.
  validate, // Send validation errors messages.
  controllers.authControllers.signUp // SignUp authController.
);

// ====> POST, Forgot-Password route.
router.post(
  "/request-forgot-password",
  middlewares.rateLimiter(1000 * 60 * 60, 5),
  validators.requestForgotPasswordValidators,
  validate,
  controllers.authControllers.forgotPassword
);

// ====> POST, User-Authentication(login) route.
router.post(
  "/signIn",
  middlewares.rateLimiter(1000 * 60 * 15, 5), // Minimize logIn attempts(5/15m).
  validators.signInValidators,
  validate,
  controllers.authControllers.signIn
);

// Protected routes.
// ====> POST, Token-Refresh Route.
router.post(
  "/token-refresh",
  middlewares.rateLimiter(1000 * 60 * 60, 20), // Minimize token-refresh attempt(20/1h).
  middlewares.validateRefreshToken, // Refresh-Token middleware.
  middlewares.validateCSRFToken, // CSRF-Token Validation.
  controllers.authControllers.tokenRefresh // Token Refresh Controller.
);

// ====> POST, Send Email-Verification-Code route.
router.post(
  "/send-email-verification-code",
  validators.emailValidators,
  validate,
  middlewares.authMiddleware, // Access-Token validate middleware.
  middlewares.validateCSRFToken, // CSRF-Token validate middleware.
  controllers.authControllers.emailVerificationCode
);

// ====> POST, Email-Verification route.
router.post(
  "/verify-email",
  validators.verifyEmailValidators,
  validate,
  middlewares.authMiddleware,
  middlewares.validateCSRFToken,
  controllers.authControllers.verifyEmail
);

// ====> POST, Send Password-Reset-Code route.
router.post(
  "/request-password-reset",
  middlewares.rateLimiter(1000 * 60 * 60, 3), // Minimize password-reset attempts(3/1h).
  validators.requestPasswordResetValidators,
  validate,
  middlewares.authMiddleware,
  middlewares.validateCSRFToken,
  middlewares.verifiedEmail, // Check email-verification.
  controllers.authControllers.requestPasswordReset
);

// ====> POST, Password-Reset route.
router.post(
  "/verify-password-reset",
  middlewares.rateLimiter(1000 * 60 * 60, 3), // Minimize password-reset attempts(3/1h).
  validators.verifyPasswordResetValidators,
  validate,
  middlewares.authMiddleware,
  middlewares.validateCSRFToken,
  middlewares.verifiedEmail,
  controllers.authControllers.verifyPasswordReset
);

// ====> POST, User-Logout(Session Over) route.
router.post(
  "/logout",
  middlewares.validateRefreshToken, // Refresh-Token validate middleware.
  middlewares.validateCSRFToken, // CSRF-Token validate middleware.
  controllers.authControllers.logout
);

// ====> POST, User-Logout(All-Sessions Over) route.
router.post(
  "/logout-all",
  middlewares.validateRefreshToken,
  middlewares.validateCSRFToken,
  controllers.authControllers.logoutAll
);

// ====> DELETE, User-Account-Deletion route.
router.delete(
  "/delete-user",
  middlewares.rateLimiter(1000 * 60 * 60, 5), // Minimize delete attempts(5/1h).
  validators.deleteUserValidators,
  validate,
  middlewares.authMiddleware,
  middlewares.validateCSRFToken,
  controllers.authControllers.deleteUser
);

export default router;
