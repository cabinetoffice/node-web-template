import { NextFunction, Request, Response } from 'express';

import { log } from '../utils/logger';
import * as config from '../config';

export const errorNotFound = (_req: Request, res: Response) => {
    return res.status(404).render(config.NOT_FOUND);
};

export const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
    const statusCode = !res.statusCode || res.statusCode === 200 ? 500 : res.statusCode;
    const errorMessage = err.message || 'An error has occured. Re-routing to the error screen';

    log.error(`Error ${statusCode}: ${errorMessage}`);
    res.status(statusCode).render(config.ERROR_PAGE);
};
