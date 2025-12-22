// Import Third-Party npm packages.
import { check } from "express-validator";

// ====> Check signUp credentials validation.
const signUpValidators = [
  // Username.
  check("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required!")
    .bail()
    .isLength({ min: 3, max: 30 })
    .withMessage("Username must be between 3 and 30 characters!")
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage(
      "Username can contain only letters, numbers, and underscores!"
    ),

  // Email.
  check("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required!")
    .bail()
    .isEmail()
    .withMessage("Email is invalid!")
    .normalizeEmail(),

  // Password.
  check("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required!")
    .bail()
    .matches(/[A-Z]/)
    .withMessage("Password must have at least 1 uppercase letter!")
    .matches(/[a-z]/)
    .withMessage("Password must have at least 1 lowercase letter!")
    .matches(/[0-9]/)
    .withMessage("Password must have at least 1 number!")
    .matches(/[^\w\s]/)
    .withMessage("Password must have at least 1 special character! No spaces.")
    .isLength({ min: 8, max: 128 }) // Reject huge password: Prevent DOS.
    .withMessage("Password must be between 8 to 128 characters long!"),
];

// ====> Check request-forgot-password credentials validation.
const requestForgotPasswordValidators = [
  // Email.
  check("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required!")
    .bail()
    .isEmail()
    .withMessage("Email is invalid!")
    .normalizeEmail(),
];

// ====> Check verify-forgot-password credentials validation.
const verifyForgotPasswordValidators = [
  // Email.
  check("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required!")
    .bail()
    .isEmail()
    .withMessage("Email is invalid!")
    .normalizeEmail(),

  // Code.
  check("code")
    .trim()
    .notEmpty()
    .withMessage("Code is required!")
    .bail()
    .matches(/^\d{6}$/)
    .withMessage("Code must be a 6-digit code!"),

  // New-Password.
  check("newPassword")
    .trim()
    .notEmpty()
    .withMessage("Password is required!")
    .bail()
    .matches(/[A-Z]/)
    .withMessage("Password must have at least 1 uppercase letter!")
    .matches(/[a-z]/)
    .withMessage("Password must have at least 1 lowercase letter!")
    .matches(/[0-9]/)
    .withMessage("Password must have at least 1 number!")
    .matches(/[^\w\s]/)
    .withMessage("Password must have at least 1 special character! No spaces.")
    .isLength({ min: 8, max: 128 }) // Reject huge password: Prevent DOS.
    .withMessage("Password must be between 8 to 128 characters long!"),
];

// ====> Check signIn credentials validation.
const signInValidators = [
  // Email.
  check("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required!")
    .bail()
    .isEmail()
    .withMessage("Email is invalid!")
    .normalizeEmail(),

  // Password.
  check("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required!")
    .bail()
    .isLength({ min: 8, max: 128 }) // Reject huge password: Prevent DOS.
    .withMessage("Password is invalid!"),
];

// ====> Check send email-verification credentials validation.
const emailValidators = [
  // Email.
  check("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required!")
    .bail()
    .isEmail()
    .withMessage("Email is invalid!")
    .normalizeEmail(),
];

// ====> Check user email-verification credentials validation.
const verifyEmailValidators = [
  // Email.
  check("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required!")
    .bail()
    .isEmail()
    .withMessage("Email is invalid!")
    .normalizeEmail(),

  // Code.
  check("code")
    .trim()
    .notEmpty()
    .withMessage("Code is required!")
    .bail()
    .matches(/^\d{6}$/)
    .withMessage("Code must be a 6-digit code!"),
];

// ====> Check user request-password-reset credentials validation.
const requestPasswordResetValidators = [
  // Old-Password.
  check("oldPassword")
    .trim()
    .notEmpty()
    .withMessage("Password is required!")
    .bail()
    .isLength({ min: 8, max: 128 }) // Reject huge password: Prevent DOS.
    .withMessage("Password is invalid!"),
];

// ====> Check user verify-password-reset credentials validation.
const verifyPasswordResetValidators = [
  // Code.
  check("code")
    .trim()
    .notEmpty()
    .withMessage("Code is required!")
    .bail()
    .matches(/^\d{6}$/)
    .withMessage("Code must be a 6-digit code!"),

  // New-Password.
  check("newPassword")
    .trim()
    .notEmpty()
    .withMessage("Password is required!")
    .bail()
    .matches(/[A-Z]/)
    .withMessage("Password must have at least 1 uppercase letter!")
    .matches(/[a-z]/)
    .withMessage("Password must have at least 1 lowercase letter!")
    .matches(/[0-9]/)
    .withMessage("Password must have at least 1 number!")
    .matches(/[^\w\s]/)
    .withMessage("Password must have at least 1 special character! No spaces.")
    .isLength({ min: 8, max: 128 }) // Reject huge password: Prevent DOS.
    .withMessage("Password must be between 8 to 128 characters long!"),
];

// ====> Check user-deletion credentials validation.
const deleteUserValidators = [
  // Password.
  check("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required!")
    .bail()
    .isLength({ min: 8, max: 128 }) // Reject huge password: Prevent DOS.
    .withMessage("Password is invalid!"),
];

export default {
  signUpValidators,
  requestForgotPasswordValidators,
  verifyForgotPasswordValidators,
  signInValidators,
  emailValidators,
  verifyEmailValidators,
  requestPasswordResetValidators,
  verifyPasswordResetValidators,
  deleteUserValidators,
};
