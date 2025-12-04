// Import local file-modules.
import User from "../models/User.js";
import hashPassword from "../utils/hashPassword.js";

// User registration controller.
const signUp = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // Check duplicate email.
    const isEmailExist = await User.findOne({ email });
    if (isEmailExist) {
      return res.status(409).json({ message: "Email already exist!" });
    }

    // Hash user password.
    const hashedPassword = await hashPassword(password);

    // Save user data to database.
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User successfully created." });
  } catch (error) {
    next(error);
  }
};

export default { signUp };
