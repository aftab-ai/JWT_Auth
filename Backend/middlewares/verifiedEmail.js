const verifiedEmail = (req, res, next) => {
  // Get user verification.
  const verifiedUserEmail = req.user.isEmailVerified;

  // Check user verification.
  if (!verifiedUserEmail) {
    res.statusCode = 403;
    throw new Error("Please verify your email first!");
  }
  next();
};

export default verifiedEmail;
