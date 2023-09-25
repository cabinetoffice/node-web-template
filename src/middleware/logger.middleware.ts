import { NextFunction, Request, Response } from "express";

export const logger = function (req: Request, res: Response, next: NextFunction) {
    console.log(`${req.method} ${req.route.path}`);
    next();
};
