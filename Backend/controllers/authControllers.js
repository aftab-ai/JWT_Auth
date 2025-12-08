// Import local file-modules.
import User from "../models/User.js";
import hashPassword from "../utils/hashPassword.js";
import comparePassword from "../utils/comparePassword.js";
import createAccessToken from "../utils/createAccessToken.js";
import setAccessTokenCookie from "../utils/setAccessTokenCookie.js";
import createRefreshToken from "../utils/createRefreshToken.js";
import setRefreshTokenCookie from "../utils/setRefreshTokenCookie.js";
import hashRefreshToken from "../utils/hashRefreshToken.js";

// User registration(signUp) controller.
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

    res.status(201).json({
      code: 201,
      status: true,
      message: "User registered successfully.",
    });
  } catch (error) {
    next(error);
  }
};

// User authentication(login) controller.
const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find user in database.
    const user = await User.findOne({ email });
    if (!user) {
      res.code = 401;
      throw new Error("Invalid credentials!");
    }

    // Compare the password.
    const match = await comparePassword(password, user.password);
    if (!match) {
      res.code = 401;
      throw new Error("Invalid credentials!");
    }

    // Access Token.
    const accessToken = createAccessToken(user);
    // Refresh Token.
    const refreshToken = createRefreshToken();
    // Hash Refresh Token.
    const hashedRefreshToken = hashRefreshToken(refreshToken);

    // Save Refresh-Token to DB.
    user.hashRefreshToken = hashedRefreshToken;
    await user.save();

    // Cookie.
    setAccessTokenCookie(res, accessToken);
    setRefreshTokenCookie(res, refreshToken);

    res.status(200).json({
      code: 200,
      status: true,
      message: "User signIn successfully.",
    });
  } catch (error) {
    next(error);
  }
};

export default { signUp, signIn };
