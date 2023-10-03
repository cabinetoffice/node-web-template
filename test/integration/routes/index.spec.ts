jest.mock("../../../src/middleware/logger.middleware");

import { NextFunction } from 'express';
import { describe, expect, test } from '@jest/globals';
import request from 'supertest';
import app from '../../../src/app';
import { logger } from "../../../src/middleware/logger.middleware";

describe('Endpoint integration tests', () => {

    beforeEach(() => {
        jest.resetAllMocks();
        (logger as jest.Mock).mockImplementation((_req, _res, next: NextFunction) => next());
    });

    describe('GET tests', () => {
        test("renders the info page", async () => {
            const res = await request(app).get('/info');

            expect(res.status).toEqual(200);
            expect(logger).toHaveBeenCalledTimes(1);
        });
    });
    describe('POST tests', () => {
        test("Sends post request test", async () => {
            const res = await request(app).post('/');

            expect(res.status).toEqual(200);
            expect(logger).toHaveBeenCalledTimes(1);
        });
    });
});
