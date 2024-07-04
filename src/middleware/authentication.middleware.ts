import { NextFunction, Request, Response } from 'express';
import { log } from '../utils/logger';
import { colaAuthenticationMiddleware } from '@co-digital/login';

import * as config from '../config';

export const authentication = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        if (!process.env.SESSION_APP_KEY) {
            throw new Error('SESSION_APP_KEY environment variable is not set.');
        }

        if (config.NODE_ENV === 'production') {
            log.infoRequest(req, 'Authenticating through COLA...');
            return colaAuthenticationMiddleware(req, res, next);
        }

        log.infoRequest(req, 'sorry, auth service not available right now');
        next();

    } catch (err: any) {
        log.errorRequest(req, err.message);
        next(err);
    }
};

