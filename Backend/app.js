// Import Third-Party npm packages.
import "dotenv/config";
import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";

// Import local file-modules.
import connectMongoDB from "./init/mongodb.js";
import routes from "./routes/index.js";
import middlewares from "./middlewares/index.js";
import controllers from "./controllers/index.js";

// Initialize express app.
const app = express();

// Initialize MongoDB database connection.
connectMongoDB();

// Third-Party Middleware.
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(morgan("dev"));
app.use(cookieParser());

// Routes.
// Auth Routes.
app.use("/api/v1/auth", routes.authRoutes);

// Refresh Routes.
app.use("/api/v1/refresh-token", routes.refreshRoutes);

// 404 Not-Found route.
app.use(controllers.notFound);

// Error handling middlewares.
app.use(middlewares.errorHandler);

export default app;
