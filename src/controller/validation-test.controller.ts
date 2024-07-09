import { Request, Response } from 'express';
import { log } from '../utils/logger';
import * as config from '../config';

export const get = (_req: Request, res: Response) => {
    return res.render(config.VALIDATION_TEST);
};

export const post = (req: Request, res: Response) => {
    const firstName = req.body.first_name;

    log.info(`First Name: ${firstName}`);

    return res.redirect(config.LANDING_PAGE);
};
