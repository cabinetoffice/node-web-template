import { describe, expect, test, jest, afterEach } from '@jest/globals';
import { Request, Response, NextFunction } from 'express';

import { setNonce } from '../../../src/middleware/nonce.middleware';

describe('Nonce Middleware test suites', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    test('Should call crypto.randomBytes... metho set nonceScript value and call next middleware', () => {
        const res = { locals: {} } as Response;
        const next = jest.fn() as NextFunction;

        setNonce({} as Request, res, next);

        expect(res.locals.nonceScript).toBeTruthy;
        expect(res.locals.nonceScript?.length).toEqual(32);
        expect(next).toBeCalledTimes(1);
    });
});
