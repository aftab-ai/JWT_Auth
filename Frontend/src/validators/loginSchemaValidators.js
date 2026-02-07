// Third-Party modules.
import { z } from "zod";

// Login Form-Validation.
const loginSchemaValidators = z.object({
  // Email
  email: z
    .string()
    .trim()
    .min(1, "Email is required!")
    .email("Email is invalid!"),

  // Password
  password: z
    .string()
    .trim()
    .min(1, "Password is required!")
    .min(8, "Password must be at least 8 characters long!"),
});

export default loginSchemaValidators;
