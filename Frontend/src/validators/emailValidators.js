// Third-Party modules.
import { z } from "zod";

// Login Form-Validation.
const emailValidators = (validEmail) =>
  z
    .object({
      // Email
      email: z
        .string()
        .trim()
        .min(1, "Email is required!")
        .email("Email is invalid!"),
    })
    .refine((data) => data.email === validEmail, {
      message: "Please enter a valid email!",
      path: ["email"],
    });

export default emailValidators;
