// Third-Party modules.
import { z } from "zod";

// Login Form-Validation.
const emailVerificationSchemaValidators = z.object({
  // Email
  email: z
    .string()
    .trim()
    .min(1, "Email is required!")
    .email("Email is invalid!"),

  // Code(OTP)
  code: z
    .string()
    .trim()
    .min(1, "Code is required!")
    .length(6, "Code must be exactly 6 digits!")
    .regex(/^\d{6}$/, "Code must contain only numbers!"),
});

export default emailVerificationSchemaValidators;
