import "dotenv/config";
import express from "express";

// Initialize express app.
const app = express();

// Third-Party Middleware.
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

export default app;
