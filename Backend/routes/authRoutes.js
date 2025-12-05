// Import Third-Party npm packages.
import express from "express";

// Import local-file modules.
import controllers from "../controllers/index.js";
import validators from "../validators/authValidators.js";
import validate from "../validators/validate.js";

// Express sub routes.
const router = express.Router();

// Public routes.
// POST --> User registration route.
router.post(
  "/signUp",
  validators.signUpValidators, // Validate signUp credentials.
  validate, // Send validation errors messages.
  controllers.authControllers.signUp // SignUp authController.
);

export default router;
