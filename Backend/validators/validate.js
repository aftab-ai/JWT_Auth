// Import Third-Party npm packages.
import { validationResult } from "express-validator";

// Validation result messages.
const validate = (req, res, next) => {
  const errors = validationResult(req); // Fetch errors from request.
  const mappedErrors = {}; // Save validation errors.

  // Check the errors.
  if (Object.keys(errors.errors).length === 0) {
    next();
  } else {
    // Save the errors to mappedErrors object.
    errors.errors.map((error) => {
      mappedErrors[error.path] = error.msg;
    });

    res.status(400).json(mappedErrors);
  }
};

export default validate;
