// Import Third-Party npm packages.
import "dotenv/config";
import express from "express";

// Import local file-modules.
import connectMongoDB from "./init/mongodb.js";
import routes from "./routes/index.js";

// Initialize express app.
const app = express();

// Initialize MongoDB database connection.
connectMongoDB();

// Third-Party Middleware.
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Routes.
// Auth Routes.
app.use("/api/v1/auth", routes.authRoutes);

export default app;
