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
      res.code = 409;
      throw new Error("Email already exist!");
    }

    // Hash user password.
    const hashedPassword = await hashPassword(password);

    // Save user data to database.
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res
      .status(201)
      .json({
        code: 201,
        status: true,
        message: "User registered successfully.",
      });
  } catch (error) {
    next(error);
  }
};

export default { signUp };
