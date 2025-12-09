// Import Third-Party npm packages.
import mongoose from "mongoose";

// Session Schema.
const sessionSchema = new mongoose.Schema(
  {
    hashCSRFtoken: { type: String, required: true }, // Hash CSRF Token.
    csrfExpires: { type: Date, required: true }, // CSRF Expiry.
    hashRefreshToken: { type: String, required: true, index: true }, // Hash Refresh Token.
    expires: { type: Date, required: true }, // Expiry Date.
    // User Device Details.
    device: {
      ip: String,
      userAgent: String,
      deviceName: { type: String, default: "Unknown Device" },
    },
  },
  { timestamps: true }
);

// User Schema.
const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, minlength: 8 },
    role: { type: String, default: "user" },
    sessions: { type: [sessionSchema], default: [] },
  },
  { timestamps: true }
);

// User model.
const User = mongoose.model("user", userSchema);

export default User;
