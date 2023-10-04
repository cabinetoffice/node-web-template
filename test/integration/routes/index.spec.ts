jest.mock('../../../src/middleware/logger.middleware');

import { Request, Response, NextFunction } from 'express';
import { jest, beforeEach, describe, expect, test } from '@jest/globals';
import request from 'supertest';
import app from '../../../src/app';
import { logger } from '../../../src/middleware/logger.middleware';
import * as config from '../../../src/config';
import { MOCK_GET_INFO_RESPONSE, MOCK_POST_INFO_RESPONSE } from '../../mock/text.mock';

const mockedLogger = logger as jest.Mock<typeof logger>;
mockedLogger.mockImplementation((req: Request, res: Response, next: NextFunction) => next());

describe('Endpoint integration tests', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('GET tests', () => {
        test("renders the info page", async () => {
            const res = await request(app).get(config.LANDING_URL);

            expect(res.status).toEqual(200);
            expect(res.text).toContain(MOCK_GET_INFO_RESPONSE);
            expect(mockedLogger).toHaveBeenCalledTimes(1);
        });
    });
    describe('POST tests', () => {
        test("Sends post request test", async () => {
            const res = await request(app).post('/');

            expect(res.status).toEqual(200);
            expect(res.text).toContain(MOCK_POST_INFO_RESPONSE);
            expect(mockedLogger).toHaveBeenCalledTimes(1);
        });
    });
});
