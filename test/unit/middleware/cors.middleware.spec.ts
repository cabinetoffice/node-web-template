jest.mock('cors');

import { describe, expect, test, jest, afterEach } from '@jest/globals';
import { Request, Response, NextFunction } from 'express';
import cors from "cors";

import { setCors } from "../../../src/middleware/cors.middleware"
import { MOCK_CORS_VALUE } from '../../mock/data';

describe("CORS Middleware test suites", () => {

    afterEach(() => {
        jest.resetAllMocks();
    });

    test("Should call cors methos and next middleware", () => {
        const mockCors = cors as jest.Mock;
        const next = jest.fn() as NextFunction;

        setCors({} as Request, {} as Response, next);

        expect(mockCors).toHaveBeenCalledTimes(1);
        expect(mockCors).toHaveBeenCalledWith(MOCK_CORS_VALUE);
        expect(next).toBeCalledTimes(1);
    });
});