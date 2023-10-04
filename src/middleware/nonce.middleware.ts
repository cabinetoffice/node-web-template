import { NextFunction, Request, Response } from "express";
import crypto from "crypto";

export const setNonce = function (_req: Request, res: Response, next: NextFunction) {
    // https://github.com/helmetjs/helmet/blob/main/middlewares/content-security-policy/README.md
    res.locals.nonceScript = crypto.randomBytes(16).toString("hex");
    next();
};
