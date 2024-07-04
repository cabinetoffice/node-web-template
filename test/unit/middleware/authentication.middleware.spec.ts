jest.mock('../../../src/utils/logger', () => ({
    log: {
        infoRequest: jest.fn(),
        errorRequest: jest.fn(),
    },
}));
jest.mock('../../../src/config/index.ts', () => ({
    __esModule: true,
    NODE_ENV: null,
}));
jest.mock('@co-digital/login');

import { describe, expect, test, jest, afterEach } from '@jest/globals';
import { Request, Response, NextFunction } from 'express';

import { authentication } from '../../../src/middleware/authentication.middleware';
import { log } from '../../../src/utils/logger';
import * as config from '../../../src/config';

import { mockRequest, mockResponse, mockNext } from '../../mock/express.mock';
import { colaAuthenticationMiddleware } from '@co-digital/login';
import { MOCK_ERROR } from '../../mock/data';

const configMock = config as { NODE_ENV: string };
const logInfoRequestMock = log.infoRequest as jest.Mock;
const logErrorRequestMock = log.errorRequest as jest.Mock;
const colaAuthenticationMiddlewareMock =
	colaAuthenticationMiddleware as jest.Mock;

describe('Authentication Middleware test suites', () => {
    let req: Request;
    let res: Response;
    let next: NextFunction;

    beforeEach(() => {
        req = mockRequest();
        res = mockResponse();
        next = mockNext;
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    test('Should call next if auth feature is enabled', () => {
        configMock.NODE_ENV = 'production';

        authentication(req, res, next);

        expect(logInfoRequestMock).toHaveBeenCalledWith(
            req,
            'Authenticating through COLA...'
        );
        expect(colaAuthenticationMiddlewareMock).toHaveBeenCalledTimes(1);
    });

    test('should call res.render with not-available view if auth feature is disabled', () => {
        configMock.NODE_ENV = 'development';

        authentication(req, res, next);

        expect(logInfoRequestMock).toHaveBeenCalledTimes(1);
        expect(logInfoRequestMock).toHaveBeenCalledWith(
            req,
            'sorry, auth service not available right now'
        );
    });

    test('should call next with error object if error is thrown', () => {
        configMock.NODE_ENV = 'production';

        colaAuthenticationMiddlewareMock.mockImplementationOnce(() => {
            throw new Error(MOCK_ERROR.message);
        });

        authentication(req, res, next);

        expect(logErrorRequestMock).toHaveBeenCalledTimes(1);
        expect(logErrorRequestMock).toHaveBeenCalledWith(req, MOCK_ERROR.message);
        expect(next).toHaveBeenCalledTimes(1);
    });
});
