// Import Third-Party npm packages.
import bcrypt from "bcryptjs";

// Password Hash.
const hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    // Asynchronously generate salt.
    bcrypt.genSalt(12, (error, salt) => {
      if (error) {
        return reject(error);
      }

      // Asynchronously generate hash.
      bcrypt.hash(password, salt, (error, hash) => {
        if (error) {
          return reject(error);
        }

        resolve(hash);
      });
    });
  });
};

export default hashPassword;
