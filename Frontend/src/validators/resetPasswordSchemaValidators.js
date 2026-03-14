// Third-Party modules.
import { z } from "zod";

// Verify Reset-Password validation.
const resetPasswordSchemaValidators = z.object({
  // Old-Password
  oldPassword: z
    .string()
    .trim()
    .min(1, "Password is required!")
    .min(8, "Password must be at least 8 characters long!"),
});

export default resetPasswordSchemaValidators;
