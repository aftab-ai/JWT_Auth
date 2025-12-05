// Import Third-Party npm packages.
import bcrypt from "bcryptjs";

// Compare user password.
const comparePassword = (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

export default comparePassword;
