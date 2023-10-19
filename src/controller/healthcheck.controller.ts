import { Request, Response } from 'express';

export const get = (_req: Request, res: Response) => {
    res.status(200).send('OK');
};
