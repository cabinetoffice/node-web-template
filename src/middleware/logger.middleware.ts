import { NextFunction, Request, Response } from 'express';
import { log } from '../utils/logger';

export const logger = (req: Request, _res: Response, next: NextFunction) => {
    log.infoRequest(req, `${req.method} ${req.path}`);
    next();
};
