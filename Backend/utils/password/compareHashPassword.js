// Import Third-Party npm packages.
import bcrypt from "bcryptjs";

// Compare user password.
const compareHashPassword = (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

export default compareHashPassword;
