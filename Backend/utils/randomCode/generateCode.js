// Import Third-Party npm packages.
import crypto from "crypto";

const generateCode = (length) => {
  let code = "";

  // Number(length) of digit generate.
  for (let i = 0; i < length; i++) {
    code += crypto.randomInt(0, 10); // Random digit (0, 9).
  }

  return code;
};

export default generateCode;
