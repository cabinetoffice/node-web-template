import { NextFunction, Request, Response } from "express";

export const errorHandler = (err: Error, req: Request, res: Response, _next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send("Something Broke!");
};

export default [errorHandler];