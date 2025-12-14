// Import environment variables.
const {
  NODE_ENV,
  PORT,
  MONGODB_CONNECTION_URL,
  JWT_ACCESS_SECRET,
  JWT_EXPIRE,
  JWT_ISSUER,
  JWT_AUDIENCE,
  REFRESH_TOKEN_SECRET,
  CSRF_TOKEN_SECRET,
  SENDER_EMAIL,
  SENDER_EMAIL_PASSWORD,
} = process.env;

export default {
  nodeENV: NODE_ENV,
  port: PORT,
  mongodbURL: MONGODB_CONNECTION_URL,
  jwtAccessSecret: JWT_ACCESS_SECRET,
  jwtExpire: JWT_EXPIRE,
  jwtIssuer: JWT_ISSUER,
  jwtAudience: JWT_AUDIENCE,
  refreshTokenSecret: REFRESH_TOKEN_SECRET,
  csrfTokenSecret: CSRF_TOKEN_SECRET,
  senderEmail: SENDER_EMAIL,
  senderEmailPass: SENDER_EMAIL_PASSWORD,
};
