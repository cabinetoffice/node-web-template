import { describe, expect, beforeEach, test, jest, afterEach } from '@jest/globals';
import { Request, Response, NextFunction } from 'express';

import { logger } from "../../../src/middleware/logger.middleware";
import { GET_REQUEST_MOCK } from '../../mock/data';

const spyConsoleLog = jest.spyOn(console, "log");

const mockReq = GET_REQUEST_MOCK as Request;
const mockRes = {} as Response;
const mockNext = jest.fn() as NextFunction;

describe("Logger Middleware test suites", () => {

    beforeEach(() => {
        spyConsoleLog.mockImplementation(() => {/**/});
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    test("Should log the method and route path", () => {

        logger(mockReq, mockRes, mockNext);

        expect(spyConsoleLog).toHaveBeenCalledTimes(1);
        expect(spyConsoleLog).toHaveBeenCalledWith(`${req.method} ${req.path}`);
        expect(next).toBeCalledTimes(1);
    });
});