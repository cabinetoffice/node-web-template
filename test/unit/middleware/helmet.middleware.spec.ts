jest.mock('helmet');

import { describe, expect, test, jest, afterEach } from '@jest/globals';
import { Request, Response, NextFunction } from 'express';
import helmet from "helmet";

import { setHelmet } from "../../../src/middleware/helmet.middleware";
import { MOCK_HELMET_VALUE } from '../../mock/data';

describe("Helmet Middleware test suites", () => {

    afterEach(() => {
        jest.resetAllMocks();
    });

    test("Should call helmet methos and next middleware", () => {
        const mockHelmet = helmet as unknown as jest.Mock;
        const next = jest.fn() as NextFunction;

        setHelmet({} as Request, {} as Response, next);

        expect(mockHelmet).toHaveBeenCalledTimes(1);
        expect(mockHelmet).toHaveBeenCalledWith(MOCK_HELMET_VALUE);
        expect(next).toBeCalledTimes(1);
    });
});
