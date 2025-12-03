import mongoose from "mongoose";

// User Schema.
const userSchema = new mongoose.Schema(
  {
    username: { type: String, require: true },
    email: { type: String, require: true, unique: true, trim: true },
    password: { type: String, require: true, minlength: 6 },
    role: { type: String, default: "user" },
  },
  { timestamps: true }
);

// User model.
const User = mongoose.model("user", userSchema);

export default User;
