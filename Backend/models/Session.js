// Import Third-Party npm packages.
import mongoose from "mongoose";

// Session Schema.
const sessionSchema = new mongoose.Schema(
  {
    // UserId.
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    // Hash Refresh-Token.
    hashRefreshToken: {
      type: String,
      required: true,
      select: false,
      index: true,
    },

    // Hash CSRF-Token
    hashCSRFToken: { type: String, required: true, select: false },

    // Session Expiry.
    expiresAt: { type: Date, required: true },

    // User Device Details.
    device: {
      ip: String,
      userAgent: String,
      deviceName: { type: String, default: "Unknown Device" },
    },

    // Session Revoked Date.
    revokedAt: {
      type: Date,
      index: true,
    },
  },
  { timestamps: true }
);

// Auto-delete expired sessions.
sessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Session Model.
const Session = mongoose.model("Session", sessionSchema);

export default Session;
