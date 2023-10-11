#!/usr/bin/env node

/**
 * Module dependencies.
 */

import * as config from "./config";
import app from "./app";

import { createHttpsServer } from "./utils/createHttpsServer";
import { createHttpServer } from "./utils/createHttpServer";
import { onError } from "./utils/onError";
import { onListening } from "./utils/onListening";

/**
 * Get port from environment and store in Express.
 */

app.set("port", config.PORT);

/**
 * Create HTTP or HTTPS server.
 */

const server = config.NODE_SSL_ENABLED === "true" ? createHttpsServer(app) : createHttpServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(config.PORT);

/**
 * Event listener for HTTP server "error" event.
 */

server.on("error", onError);
server.on("listening", onListening);
