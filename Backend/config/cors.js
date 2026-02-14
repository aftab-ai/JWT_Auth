// Import Third-Party npm packages.
import cors from "cors";

// Import Environment Variables.
import config from "./keys.js";

// Node environment.
const isProd = config.nodeENV === "production";

// Allowed origin from environment variable.
const whitelist = (config.corsWhitelist || null)
  .split(",") // Comma-separated string into an array.
  .map((origin) => origin.trim().replace(/\/$/, "")); // Removes extra space with trailing slash.

// CORS option.
const corsOption = !isProd
  ? { origin: true, credentials: true }
  : {
      // Prevents blocking tools like Postman or server-side requests.
      origin: (origin, callback) => {
        if (!origin) return callback(null, true);

        // Checks if the request’s origin is in the whitelist array.
        if (whitelist.includes(origin)) {
          return callback(null, true);
        }

        console.warn(`Blocked by CORS: ${origin}`);
        return callback(new Error("Not allowed by CORS!"));
      },
      // Specifies which HTTP methods are allowed for cross-origin requests.
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],

      // Specifies which HTTP headers can be sent by the client in cross-origin requests.
      allowedHeaders: ["Content-Type", "Authorization"],

      // Allows the browser to send cookies with requests.
      credentials: true,

      // Older brower that don't handle (204 No Content).
      optionsSuccessStatus: 200,
    };

// CORS middleware.
const corsMiddleware = cors(corsOption);

export default { corsOption, corsMiddleware };
