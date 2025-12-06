// Import environment variables.
const {
  PORT,
  MONGODB_CONNECTION_URL,
  JWT_ACCESS_SECRET,
  JWT_EXPIRE,
  JWT_ISSUER,
  JWT_AUDIENCE,
} = process.env;

export default {
  port: PORT,
  mongodbURL: MONGODB_CONNECTION_URL,
  jwtAccessSecret: JWT_ACCESS_SECRET,
  jwtExpire: JWT_EXPIRE,
  jwtIssuer: JWT_ISSUER,
  jwtAudience: JWT_AUDIENCE,
};
