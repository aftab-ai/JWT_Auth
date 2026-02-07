// Third-Party modules.
import { z } from "zod";

// Signup Form-Validation.
const signupSchemaValidators = z
  .object({
    // Username
    username: z
      .string()
      .trim()
      .min(1, "Username is required!")
      .regex(/^[a-zA-Z0-9_]+$/, "Only letters, numbers & underscores allowed!")
      .min(3, "Username must be at least 3 characters long!"),

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
      .regex(/[A-Z]/, "At least one uppercase letter required!")
      .regex(/[a-z]/, "At least one lowercase letter required!")
      .regex(/[0-9]/, "At least one number required!")
      .regex(/[^A-Za-z0-9]/, "At least one special character required!")
      .regex(/^\S*$/, "Password must not contain spaces!")
      .min(8, "Password must be at least 8 characters long!"),

    // Confirm-Password
    confirmPassword: z.string().min(1, "Please, Enter password again!"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password doesn't match!",
    path: ["confirmPassword"],
  });

export default signupSchemaValidators;
