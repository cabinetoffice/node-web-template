import { createHttpServer } from '../../../src/utils/createHttpServer';
import * as http from 'http';
import { Express } from 'express';

jest.mock('express');

jest.mock('http', () => ({
    createServer: jest.fn()
}));

describe('HTTP server tests ', () => {

    afterEach(() => {
        jest.resetAllMocks();
    });

    test('should return an http.Server instance', () => {

        const app = {} as Express;
        createHttpServer(app);
        expect(http.createServer).toBeCalled();
        expect(http.createServer).toBeCalledWith(app);
    });
});
