const { PORT, MONGODB_CONNECTION_URL } = process.env;

export default {
  port: PORT,
  mongodbURL: MONGODB_CONNECTION_URL,
};
