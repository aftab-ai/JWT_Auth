// Import Third-Party npm packages.
import mongoose from "mongoose";

// ====> Email Verification Schema.
const emailVerificationSchema = new mongoose.Schema(
  {
    // Hash Code.
    hashCode: {
      type: String,
      select: false,
    },

    // Code Expiry.
    expiresAt: Date,
  },
  { _id: false }
);

// ====> User Schema.
const userSchema = new mongoose.Schema(
  {
    // Username.
    username: { type: String, required: true, trim: true },

    // Email.
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },

    // Password.
    password: { type: String, required: true, minlength: 8, select: false },

    // User role.
    role: {
      type: String,
      enum: ["user", "admin", "superAdmin"],
      default: "user",
    },

    // Password-Change Date.
    passwordChangedAt: Date,

    // User Email Validation.
    isEmailVerified: { type: Boolean, default: false },

    // User Email Verification.
    emailVerification: emailVerificationSchema,
  },
  { timestamps: true }
);

// User Model.
const User = mongoose.model("User", userSchema);

export default User;
