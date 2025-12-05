// Import Third-Party npm packages.
import { check } from "express-validator";

// Check signUp credentials validation.
const signUpValidators = [
  // Username.
  check("username").notEmpty().withMessage("Username is required!"),

  // Email.
  check("email")
    .isEmail()
    .withMessage("Email is invalid!")
    .notEmpty()
    .withMessage("Email is required!"),

  // Password.
  check("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long!")
    .notEmpty()
    .withMessage("Password is required!"),
];

export default { signUpValidators };
