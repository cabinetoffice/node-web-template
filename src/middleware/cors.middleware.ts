import { NextFunction, Request, Response } from "express";
import cors from "cors";

import * as config from "../config";

export const setCors = (req: Request, _res: Response, next: NextFunction) => {
    cors({
        origin: [config.CDN_HOST, config.BASE_URL],
        credentials: true
    });
    next();
};
