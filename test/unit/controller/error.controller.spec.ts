import { describe, beforeEach, afterEach, expect, test, jest } from '@jest/globals';
import { Request, Response, NextFunction } from 'express';

import { errorNotFound, errorHandler } from '../../../src/controller/error.controller';
import * as config from '../../../src/config';
import { MOCK_ERROR } from '../../mock/data';
import { log } from '../../../src/utils/logger';

jest.mock('../../../src/utils/logger', () => ({
    log: {
        error: jest.fn()
    }
}));

const req = {} as Request;

const mockResponse = () => {
    const res = {} as Response;
    res.status = jest.fn().mockReturnValue(res) as any;
    res.render = jest.fn().mockReturnValue(res) as any;
    res.send = jest.fn().mockReturnValue(res) as any;
    return res;
};

const next = jest.fn() as NextFunction;

describe('Error controller tests', () => {
    beforeEach(() => {});

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('Test page not found', () => {
        test('should render the not found page', () => {
            const res = mockResponse();

            errorNotFound(req, res);

            expect(res.status).toBeCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(404);

            expect(res.render).toBeCalledTimes(1);
            expect(res.render).toHaveBeenCalledWith(config.NOT_FOUND);
        });
    });

    describe('Error handler tests', () => {
        test('should call console.log, res.status and render the error page', () => {
            const res = mockResponse();
            res.statusCode = 500;
            const errorLogMessage = 'Error 500: Error message';

            errorHandler(MOCK_ERROR, req, res, next);

            expect(log.error).toHaveBeenCalledTimes(1);
            expect(log.error).toHaveBeenCalledWith(errorLogMessage);

            expect(res.render).toBeCalledTimes(1);
            expect(res.render).toBeCalledWith(config.ERROR_PAGE);

            expect(res.status).toBeCalledTimes(1);
            expect(res.status).toBeCalledWith(res.statusCode);
        });

        test('should handle alternate status code received', () => {
            const res = mockResponse();
            res.statusCode = 418;
            const errorLogMessage = 'Error 418: Error message';

            errorHandler(MOCK_ERROR, req, res, next);

            expect(log.error).toHaveBeenCalledTimes(1);
            expect(log.error).toHaveBeenCalledWith(errorLogMessage);

            expect(res.render).toBeCalledTimes(1);
            expect(res.render).toBeCalledWith(config.ERROR_PAGE);

            expect(res.status).toBeCalledTimes(1);
            expect(res.status).toBeCalledWith(res.statusCode);
        });

        test('should log alternate error message', () => {
            const res = mockResponse();
            MOCK_ERROR.message = '';
            const errorLogMessage =
				'Error 500: An error has occurred. Re-routing to the error screen';

            errorHandler(MOCK_ERROR, req, res, next);

            expect(log.error).toHaveBeenCalledTimes(1);
            expect(log.error).toHaveBeenCalledWith(errorLogMessage);

            expect(res.render).toBeCalledTimes(1);
            expect(res.render).toBeCalledWith(config.ERROR_PAGE);
        });
    });
});
