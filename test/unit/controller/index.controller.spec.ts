import { describe, expect, test, jest } from '@jest/globals';
import { Request, Response } from 'express';

import { get, post } from '../../../src/controllers/index.controller';
import * as config from '../../../src/config';

const mockReq = {} as Request;
const mockRes = {
    render: jest.fn() as any,
    send: jest.fn() as any
} as Response;

describe("Index controller tests", () => {

    beforeEach (() => {
        jest.clearAllMocks();
    });

    test("should render the landing", async () => {

        get(mockReq, mockRes);

        expect(mockRes.render).toBeCalledTimes(1);
        expect(mockRes.render).toHaveBeenCalledWith(config.LANDING_PAGE);
    });

    test("sends a post request", async () => {

        post(mockReq, mockRes);

        expect(mockRes.send).toBeCalledTimes(1);
        expect(mockRes.send).toHaveBeenCalledWith("post request test");
    });

});