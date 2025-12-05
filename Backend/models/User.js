import mongoose from "mongoose";

// User Schema.
const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, minlength: 8 },
    role: { type: String, default: "user" },
  },
  { timestamps: true }
);

// User model.
const User = mongoose.model("user", userSchema);

export default User;
