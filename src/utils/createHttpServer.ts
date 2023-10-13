import { Express } from "express";
import * as http from "http";

export const createHttpServer = (app: Express) => {
    return http.createServer(app);
};
