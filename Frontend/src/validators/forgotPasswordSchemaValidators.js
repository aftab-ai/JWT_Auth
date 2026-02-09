// Third-Party modules.
import { z } from "zod";

// Forgot-Password validation.
const forgotPasswordSchemaValidators = z.object({
  // Email
  email: z
    .string()
    .trim()
    .min(1, "Email is required!")
    .email("Email is invalid!"),
});

export default forgotPasswordSchemaValidators;
