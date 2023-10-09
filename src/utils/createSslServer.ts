import { Express } from "express";
import * as http from "http";
import * as https from "https";
import { readFileSync } from "fs";
import * as config from "../config";

export const createSslServer = (app: Express) => {
    if (config.PATH_SSL_PRIVATE_KEY && config.PATH_SSL_CERTIFICATE) {
        const optionSSL = {
            key: readFileSync(config.PATH_SSL_PRIVATE_KEY),
            cert: readFileSync(config.PATH_SSL_CERTIFICATE)
        };
        return https.createServer(optionSSL, app);
    } else {
        console.error("Error: Key or Cert cannot be found, starting HTTP Server as backup");
        return http.createServer(app);
    }
};
