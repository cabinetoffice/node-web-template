import { NextFunction, Request, Response } from 'express';
import { randomBytes } from 'crypto';

export const setNonce = (_req: Request, res: Response, next: NextFunction) => {
    // https://github.com/helmetjs/helmet/blob/main/middlewares/content-security-policy/README.md
    res.locals.nonceScript = randomBytes(16).toString('hex');
    next();
};
