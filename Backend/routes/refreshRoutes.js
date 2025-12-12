// Import Third-Party npm packages.
import express from "express";

// Import local-file modules.
import controllers from "../controllers/index.js";
import middlewares from "../middlewares/index.js";

// Express sub routes.
const router = express.Router();

// Protected routes.
// POST --> Token Refresh Route.
router.post(
  "/",
  middlewares.refreshLimiter, // Minimize token-refresh attempt.
  middlewares.validateRefreshToken, // Refresh-Token middleware.
  controllers.refreshControllers.refresh // Refresh Controller.
);

export default router;
