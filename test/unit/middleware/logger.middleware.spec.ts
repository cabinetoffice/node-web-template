import { describe, expect, test, jest, afterEach } from '@jest/globals';
import { Request, Response, NextFunction } from 'express';

import { logger } from '../../../src/middleware/logger.middleware';
import { log } from '../../../src/utils/logger';
import { GET_REQUEST_MOCK } from '../../mock/data';

jest.mock('../../../src/utils/logger', () => ({
    log: {
        infoRequest: jest.fn()
    }
}));

const req = GET_REQUEST_MOCK as Request;
const res = {} as Response;
const next = jest.fn() as NextFunction;

describe('Logger Middleware test suites', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    test('Should log the method and route path', () => {
        logger(req, res, next);

        expect(log.infoRequest).toHaveBeenCalledTimes(1);
        expect(log.infoRequest).toHaveBeenCalledWith(req, 'GET /test');
        expect(next).toBeCalledTimes(1);
    });
});
