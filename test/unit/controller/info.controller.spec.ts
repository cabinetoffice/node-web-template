import { describe, expect, test, jest } from '@jest/globals';
import { Request, Response } from 'express';

import { get, post } from '../../../src/controller/info.controller';
import * as config from '../../../src/config';

const req = {} as Request;

const mockResponse = () => {
    const res = {} as Response;
    res.render = jest.fn().mockReturnValue(res) as any;
    res.send = jest.fn().mockReturnValue(res) as any;
    return res;
};


describe("Info controller tests", () => {

    afterEach (() => {
        jest.resetAllMocks();
    });

    test("should render the landing", async () => {
        const res = mockResponse();

        get(req, res);

        expect(res.render).toBeCalledTimes(1);
        expect(res.render).toHaveBeenCalledWith(config.LANDING_PAGE);
    });

    test("sends a post request", async () => {

        const res = mockResponse();

        post(req, res);

        expect(res.send).toBeCalledTimes(1);
        expect(res.send).toHaveBeenCalledWith("post request test");
    });

});