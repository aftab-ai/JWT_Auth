import "dotenv/config";
import express from "express";
import connectMongoDB from "./init/mongodb.js";

// Initialize express app.
const app = express();

// Initialize MongoDB database connection.
connectMongoDB();

// Third-Party Middleware.
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

export default app;
