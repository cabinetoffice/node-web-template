import { NextFunction, Request, Response } from "express";

export const errorNotFound = (err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(404);
    next(new Error(`Not found - ${req.originalUrl}`));
};

export const errorHandler = (err: Error, req: Request, res: Response, _next: NextFunction) => {
    const statusCode = (!res.statusCode || res.statusCode === 200) ? 500 : res.statusCode;
    const errorMessage = err.message || "An error has occured. Re-routing to the error screen";

    console.log(statusCode, errorMessage);
    res.status(statusCode).send(errorMessage);
};
