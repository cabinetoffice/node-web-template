import { describe, expect, test, jest } from '@jest/globals';
import { Request, Response, NextFunction } from 'express';

import { errorNotFound, errorHandler } from '../../../src/controllers/error.controller';
import * as config from '../../../src/config';
import { EXPECTED_ERROR_MOCK } from '../../mock/data';

const spyConsoleLog = jest.spyOn(console, "log");

const mockReq = {} as Request;
const mockRes = {
    status: jest.fn().mockReturnThis() as any,
    statusCode: 200,
    send: jest.fn() as any,
    render: jest.fn() as any
} as Response;
const mockNext = jest.fn() as NextFunction;

const mockErr: Error = {
  name: 'Error',
  message: 'Error message',
  stack: 'Error stack trace',
}

describe ("Error controller tests", () => {

    beforeEach(() => {
      spyConsoleLog.mockImplementation(() => {/**/});
      jest.clearAllMocks();
    });

    describe("Test page not found", () => {

      test("should render the error page", async () => {
        errorNotFound(mockReq, mockRes);
        expect(mockRes.status).toBeCalledTimes(1);
        expect(mockRes.status).toHaveBeenCalledWith(404);

        expect(mockRes.render).toBeCalledTimes(1);
        expect(mockRes.render).toHaveBeenCalledWith(config.NOT_FOUND);

      });
    });

    describe("Test error handler", () => {

      test("should log 500 code if request is successful", async () => {

        mockRes.statusCode = 500;
        errorHandler(mockErr, mockReq, mockRes, mockNext);

        expect(spyConsoleLog).toHaveBeenCalledTimes(1);
        expect(spyConsoleLog).toHaveBeenCalledWith(EXPECTED_ERROR_MOCK);

        expect(mockRes.send).toBeCalledTimes(1);
        expect(mockRes.send).toBeCalledWith(mockErr.message);

        expect(mockRes.status).toBeCalledTimes(1);
        expect(mockRes.status).toBeCalledWith(mockRes.statusCode);

    });
  });
});