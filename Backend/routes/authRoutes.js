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
// POST --> User registration route.
router.post(
  "/signUp",
  middlewares.rateLimiter.registrationLimiter, // Minimize registration attempts.
  validators.signUpValidators, // Validate signUp credentials.
  validate, // Send validation errors messages.
  controllers.authControllers.signUp // SignUp authController.
);

// POST --> User authentication(login) route.
router.post(
  "/signIn",
  middlewares.rateLimiter.loginLimiter, // Minimize logIn attempts.
  validators.signInValidators,
  validate,
  controllers.authControllers.signIn
);

// Protected routes.
// POST --> Email-Verification route.
router.post(
  "/send-verification-email",
  validators.emailValidators,
  validate,
  middlewares.authMiddleware, // Access-Token validate middleware.
  middlewares.validateCSRFtoken, // CSRF-Token validate middleware.
  controllers.authControllers.sendVerificationCode
);

// POST --> User-Verification route.
router.post(
  "/verify-email",
  validators.verifyUserValidators,
  validate,
  middlewares.authMiddleware,
  middlewares.validateCSRFtoken,
  controllers.authControllers.verifyEmail
);

// POST --> User logout(Session Over) route.
router.post(
  "/logout",
  middlewares.validateRefreshToken, // Refresh-Token validate middleware.
  middlewares.validateCSRFtoken, // CSRF-Token validate middleware.
  controllers.authControllers.logout
);

// POST --> User logout(All-Session Over) route.
router.post(
  "/logout-all",
  middlewares.validateRefreshToken,
  middlewares.validateCSRFtoken,
  controllers.authControllers.logoutAll
);

// DELETE --> User account-deletion route.
router.delete(
  "/delete-user",
  middlewares.rateLimiter.deleteUserLimiter,
  validators.deleteUserValidators,
  validate,
  middlewares.authMiddleware,
  middlewares.validateCSRFtoken,
  controllers.authControllers.deleteUser
);

export default router;
