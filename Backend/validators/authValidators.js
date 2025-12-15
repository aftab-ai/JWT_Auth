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
    .isLength({ max: 128 }) // Reject huge password: Prevent DOS.
    .withMessage("Password is too long!")
    .notEmpty()
    .withMessage("Password is required!"),
];

// Check signIn credentials validation.
const signInValidators = [
  // Email.
  check("email")
    .isEmail()
    .withMessage("Email is invalid!")
    .notEmpty()
    .withMessage("Email is required!"),

  // Passward.
  check("password")
    .isLength({ max: 128 }) // Reject huge password: Prevent DOS.
    .withMessage("Invalid password!")
    .notEmpty()
    .withMessage("Password is required!"),
];

// Check email-verification credentials validation.
const emailValidators = [
  // Email.
  check("email")
    .isEmail()
    .withMessage("Email is invalid!")
    .notEmpty()
    .withMessage("Email is required!"),
];

// Check user-verification credentials validation.
const verifyUserValidators = [
  // Email.
  check("email")
    .isEmail()
    .withMessage("Email is invalid!")
    .notEmpty()
    .withMessage("Email is required!"),

  // Code.
  check("code").notEmpty().withMessage("Code is required!"),
];

// Check user-deletion credentials validation.
const deleteUserValidators = [
  // Passward.
  check("password")
    .isLength({ max: 128 }) // Reject huge password: Prevent DOS.
    .withMessage("Invalid password!")
    .notEmpty()
    .withMessage("Password is required!"),
];

export default {
  signUpValidators,
  signInValidators,
  emailValidators,
  verifyUserValidators,
  deleteUserValidators,
};
