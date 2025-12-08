// Import Third-Party npm packages.
import mongoose from "mongoose";

// User Schema.
const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, minlength: 8 },
    role: { type: String, default: "user" },
    hashRefreshToken: { type: String, required: true, index: true },
  },
  { timestamps: true }
);

// User model.
const User = mongoose.model("user", userSchema);

export default User;
