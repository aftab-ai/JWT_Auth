import http from "http";
import app from "./app.js";
import config from "./config/keys.js";

// Create http Server.
const server = http.createServer(app);

// Port
const port = config.port;

// Listening Server.
server.listen(port, () => {
  console.log(`Server is running on Port: ${port}!`);
});
