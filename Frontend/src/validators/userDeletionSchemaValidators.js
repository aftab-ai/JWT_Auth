// Third-Party modules.
import { z } from "zod";

// Login Form-Validation.
const userDeletionSchemaValidators = z.object({
  // Password
  password: z
    .string()
    .trim()
    .min(1, "Password is required!")
    .min(8, "Password must be at least 8 characters long!"),
});

export default userDeletionSchemaValidators;
