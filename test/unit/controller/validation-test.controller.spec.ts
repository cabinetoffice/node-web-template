jest.mock('../../../src/utils/logger');

import { describe, expect, afterEach, test, jest } from '@jest/globals';
import { Request, Response } from 'express';

import { get, post } from '../../../src/controller/validation-test.controller';
import * as config from '../../../src/config';
import { log } from '../../../src/utils/logger';

import { MOCK_POST_VALIDATION_TEST } from '../../mock/data';
import { MOCK_POST_VALIDATION_TEST_RESPONSE } from '../../mock/text.mock';

const req = {
    body: MOCK_POST_VALIDATION_TEST,
} as Request;

const mockResponse = () => {
    const res = {} as Response;
    res.render = jest.fn().mockReturnValue(res) as any;
    res.redirect = jest.fn().mockReturnValue(res) as any;
    return res;
};

describe('Validation test controller test suites', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('validation test GET tests', () => {
        test('should render validation test page', () => {
            const res = mockResponse();

            get(req, res);

            expect(res.render).toHaveBeenCalledWith(config.VALIDATION_TEST);
        });
    });

    describe('validation-test POST tests', () => {
        test('should redirect to landing-page on POST request', () => {
            const res = mockResponse();

            post(req, res);

            expect(res.redirect).toBeCalledWith(config.LANDING_PAGE);
        });
        test('should log GitHub handle and More Details on POST request', () => {
            const res = mockResponse();

            const mockLogInfo = log.info as jest.Mock;

            post(req, res);

            expect(mockLogInfo).toHaveBeenCalledWith(
                MOCK_POST_VALIDATION_TEST_RESPONSE
            );
        });
    });
});
