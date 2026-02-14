import http from "http";
// Import local file-modules.
import app from "./app.js";
// Import Environment Variables.
import config from "./config/index.js";

// Create http Server.
const server = http.createServer(app);

// Port
const port = config.keys.port;

// Listening Server.
server.listen(port, () => {
  console.log(`Server is running on Port: ${port}.`);
});
