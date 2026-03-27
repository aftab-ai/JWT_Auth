// Import Third-Party npm packages.
import "dotenv/config";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import helmet from "helmet";

// Import local file-modules.
import config from "./config/index.js";
import connectMongoDB from "./init/mongodb.js";
import routes from "./routes/index.js";
import middlewares from "./middlewares/index.js";
import controllers from "./controllers/index.js";

// Initialize express app.
const app = express();

// Setup __dirname in ES modules.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Use the client IP forwarded by that proxy.
app.set("trust proxy", 1);

// Automatically setting HTTP security headers.
app.use(helmet());

// CORS middleware.
app.use(config.cors.corsMiddleware);

// Initialize MongoDB database connection.
connectMongoDB();

// Third-Party Middleware.
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../Frontend/dist")));

// Routes.
// Auth Routes.
app.use("/api/v1/auth", routes.authRoutes);

// 404 Not-Found route.
app.use(controllers.notFound);

// Catch-all for React routing.
app.get(/^\/(?!api).*/, (req, res, next) => {
  (res.sendFile(path.join(__dirname, "../Frontend/dist", "index.html")),
    (error) => {
      if (error) {
        next(error); // Pass any file errors to custom error handler.
      }
    });
});

// Error handling middlewares.
app.use(middlewares.errorHandler);

export default app;
