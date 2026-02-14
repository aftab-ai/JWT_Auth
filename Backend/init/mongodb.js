// Import Third-Party npm packages.
import mongoose from "mongoose";

// Import Environment Variables.
import config from "../config/index.js";

// MonogoDB Connection URL.
const mongodbURL = config.keys.mongodbURL;

// Connect MongoDB Database Server.
const connectMongoDB = async () => {
  try {
    await mongoose.connect(mongodbURL);
    console.log("MongoDB database connected successfully.");
  } catch (error) {
    console.log(error.message);
  }
};

export default connectMongoDB;
