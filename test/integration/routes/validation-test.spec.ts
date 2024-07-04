jest.mock('../../../src/middleware/logger.middleware');
jest.mock('../../../src/middleware/authentication.middleware');
jest.mock('../../../src/utils/logger');

import { jest, beforeEach, describe, expect, test } from '@jest/globals';
import { Request, Response, NextFunction } from 'express';
import request from 'supertest';

import app from '../../../src/app';
import * as config from '../../../src/config';
import { logger } from '../../../src/middleware/logger.middleware';
import { log } from '../../../src/utils/logger';
import { authentication } from '../../../src/middleware/authentication.middleware';

import {
    MOCK_REDIRECT_MESSAGE,
    MOCK_GET_VALIDATION_TEST_RESPONSE,
    MOCK_POST_VALIDATION_TEST_RESPONSE,
} from '../../mock/text.mock';
import { MOCK_POST_VALIDATION_TEST } from '../../mock/data';
import { ErrorMessages } from '../../../src/validation/error.messages';

const mockedLogger = logger as jest.Mock<typeof logger>;
mockedLogger.mockImplementation(
    (req: Request, res: Response, next: NextFunction) => next()
);
const mockedAuth = authentication as jest.Mock<typeof authentication>;
mockedAuth.mockImplementation(
    (_req: Request, _res: Response, next: NextFunction) => next()
);

describe('validation-test endpoint integration tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('GET tests', () => {
        test('renders the validation-test page', async () => {
            const res = await request(app).get(config.VALIDATION_TEST_URL);

            expect(res.status).toEqual(200);
            expect(res.text).toContain(MOCK_GET_VALIDATION_TEST_RESPONSE);
            expect(mockedLogger).toHaveBeenCalledTimes(1);
            expect(mockedAuth).toHaveBeenCalledTimes(1);
        });
    });

    describe('POST tests', () => {
        test('Should redirect to landing page after POST request', async () => {
            const res = await request(app)
                .post(config.VALIDATION_TEST_URL)
                .send(MOCK_POST_VALIDATION_TEST);

            expect(res.status).toEqual(302);
            expect(res.text).toContain(MOCK_REDIRECT_MESSAGE);
            expect(mockedLogger).toHaveBeenCalledTimes(1);
            expect(mockedAuth).toHaveBeenCalledTimes(1);
        });

        test('Should render the same page with error messages after POST request', async () => {
            const res = await request(app)
                .post(config.VALIDATION_TEST_URL)
                .send({
                    first_name: '',
                    description: '1000chars.'.repeat(100) + ':)',
                });

            expect(res.status).toEqual(200);
            expect(res.text).toContain(ErrorMessages.TEST_FIRST_NAME);
            expect(res.text).toContain(ErrorMessages.TEST_DESCRIPTION_LENGTH);
            expect(res.text).toContain(MOCK_GET_VALIDATION_TEST_RESPONSE);
            expect(mockedLogger).toHaveBeenCalledTimes(1);
            expect(mockedAuth).toHaveBeenCalledTimes(1);
        });

        test('Should log the First Name and More Details on POST request.', async () => {
            const mockLog = log.info as jest.Mock;
            const res = await request(app)
                .post(config.VALIDATION_TEST_URL)
                .send(MOCK_POST_VALIDATION_TEST);

            expect(mockLog).toBeCalledWith(MOCK_POST_VALIDATION_TEST_RESPONSE);
            expect(res.text).toContain(MOCK_REDIRECT_MESSAGE);
            expect(mockedLogger).toHaveBeenCalledTimes(1);
            expect(mockedAuth).toHaveBeenCalledTimes(1);
        });
    });
});
