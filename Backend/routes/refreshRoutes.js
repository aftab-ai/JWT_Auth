// Import Third-Party npm packages.
import express from "express";

// Import local-file modules.
import controllers from "../controllers/index.js";
import refreshLimiter from "../middlewares/refreshLimiter.js";

// Express sub routes.
const router = express.Router();

// Protected routes.
// POST --> Token Refresh Route.
router.post("/", refreshLimiter, controllers.refreshControllers.refresh);

export default router;
