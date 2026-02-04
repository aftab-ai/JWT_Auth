// Import Third-Party npm packages.
import mongoose from "mongoose";

// Password-Reset Schema.
const passwordResetSchema = new mongoose.Schema(
  {
    // UserId.
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    // Hash Code.
    hashCode: {
      type: String,
      required: true,
      select: false,
    },

    // Code Expiry.
    expiresAt: {
      type: Date,
      required: true,
    },

    // Attempts for Password-Reset.
    attempts: {
      type: Number,
      default: 0,
    },

    // Used Once.
    usedAt: {
      type: Date,
      index: true,
    },
  },
  { timestamps: true }
);

// Auto-delete expired hashCode.
passwordResetSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Password-Reset Model.
const PasswordReset = mongoose.model("PasswordReset", passwordResetSchema);

export default PasswordReset;
