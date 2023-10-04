import { describe, expect, test, jest } from '@jest/globals';
import { Request, Response } from 'express';

import { get, post } from '../../../src/controllers/index.controller';
import * as config from '../../../src/config';

const req = {} as Request;
const res = {
    render: jest.fn() as any,
    send: jest.fn() as any
} as Response;

describe("Index controller tests", () => {

    beforeEach (() => {
        jest.clearAllMocks();
    });

    test("should render the landing", async () => {

        get(req, res);

        expect(res.render).toBeCalledTimes(1);
        expect(res.render).toHaveBeenCalledWith(config.LANDING_PAGE);
    });

    test("sends a post request", async () => {

        post(req, res);

        expect(res.send).toBeCalledTimes(1);
        expect(res.send).toHaveBeenCalledWith("post request test");
    });

});