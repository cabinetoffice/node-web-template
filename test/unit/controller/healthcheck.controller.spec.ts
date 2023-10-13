import { describe, expect, afterEach, test, jest } from '@jest/globals';
import { Request, Response } from 'express';

import { get } from "../../../src/controller/healthcheck.controller";
import { MOCK_OK_RESPONSE } from '../../mock/text.mock';

const req = {} as Request;

const mockResponse = () => {
    const res = {} as Response;
    res.status = jest.fn().mockReturnValue(res) as any;
    res.send = jest.fn().mockReturnValue(res) as any;
    return res;
};

describe("Healthcheck controller test suites", () => {

    afterEach(() => {
        jest.resetAllMocks();
    });

    test("correct value for res.status and res.send", () => {
        const res = mockResponse();

        get(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(MOCK_OK_RESPONSE);
    });
});
