// Import Third-Party npm packages.
import express from "express";

// Import local-file modules.
import controllers from "../controllers/index.js";

// Express sub routes.
const router = express.Router();

// Public routes.
// POST --> User registration route.
router.post("/signUp", controllers.authControllers.signUp);

export default router;
