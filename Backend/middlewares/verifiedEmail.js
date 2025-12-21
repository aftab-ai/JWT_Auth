const verifiedEmail = (req, res, next) => {
  // Get user verification.
  const verifyUserEmail = req.user.isEmailVerified;

  // Check user verification.
  if (!verifyUserEmail) {
    res.statusCode = 403;
    throw new Error("Please verify your email first!");
  }
  next();
};

export default verifiedEmail;
