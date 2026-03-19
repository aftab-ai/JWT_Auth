// Security & Attack Prevention.
const securityAndAttackPrevention = [
  {
    id: 1,
    key: "CSRF Protection System",
    value: [
      "Cryptographically generated 32-byte CSRF tokens.",
      "Stored hashed in database.",
      "Sent via API and validated per session.",
    ],
  },
  {
    id: 2,
    key: "Password Security",
    value: "Bcrypt hashing with salt rounds (12).",
  },
  {
    id: 3,
    key: "Secure Password Reset Flow",
    value: [
      "Crypto-generated reset codes.",
      "Hashed storage with 2-minute expiration.",
    ],
  },
  {
    id: 4,
    key: "Email Verification System",
    value: "Token-based verification using short-lived secure codes.",
  },
  {
    id: 5,
    key: "Rate Limiting",
    value: "IP-based protection against brute-force and abuse.",
  },
  {
    id: 6,
    key: "CORS Whitelisting (Production-grade)",
    value: [
      "Dynamic origin validation.",
      "Strict allowed headers and methods.",
      "Credentials-enabled secure requests.",
    ],
  },
  {
    id: 7,
    key: "Secure HTTP Headers",
    value: "Implemented via middleware to mitigate common vulnerabilities.",
  },
  {
    id: 8,
    key: "Centralized Error Handling",
    value: "Custom error handler for consistent API responses.",
  },
];

export default securityAndAttackPrevention;
