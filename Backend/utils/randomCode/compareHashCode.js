// Import Third-Party npm packages.
import bcrypt from "bcryptjs";

// Compare user password.
const compareHashCode = (code, hashedCode) => {
  return bcrypt.compare(code, hashedCode);
};

export default compareHashCode;
