// Third-Party modules.
import { z } from "zod";

// Verify Forgot-Password validation.
const verifyForgotPasswordSchemaValidators = z
  .object({
    // Code(OTP)
    code: z
      .string()
      .trim()
      .min(1, "Code is required!")
      .length(6, "Code must be exactly 6 digits!")
      .regex(/^\d{6}$/, "Code must contain only numbers!"),

    // New-Password
    newPassword: z
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
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Password doesn't match!",
    path: ["confirmPassword"],
  });

export default verifyForgotPasswordSchemaValidators;
