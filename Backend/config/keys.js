// Import environment variables.
const {
  NODE_ENV,
  PORT,
  MONGODB_CONNECTION_URL,
  JWT_ACCESS_SECRET,
  JWT_EXPIRE,
  JWT_ISSUER,
  JWT_AUDIENCE,
  JWT_REFRESH_SECRET,
} = process.env;

export default {
  nodeENV: NODE_ENV,
  port: PORT,
  mongodbURL: MONGODB_CONNECTION_URL,
  jwtAccessSecret: JWT_ACCESS_SECRET,
  jwtExpire: JWT_EXPIRE,
  jwtIssuer: JWT_ISSUER,
  jwtAudience: JWT_AUDIENCE,
  jwtRefreshSecret: JWT_REFRESH_SECRET,
};
