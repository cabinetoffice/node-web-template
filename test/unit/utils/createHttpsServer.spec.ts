import { describe, afterEach, expect, test, jest } from '@jest/globals';

import * as https from 'https';
import { Express } from 'express';

import { createHttpsServer } from '../../../src/utils/createHttpsServer';

jest.mock('fs', () => ({
    readFileSync: jest.fn().mockReturnValue('')
}));

jest.mock('https', () => ({
    createServer: jest.fn()
}));

describe('HTTPS server test', () => {

    afterEach(() => {
        jest.resetAllMocks();
    });

    test('should return an https.Server instance', () => {

        const app = {} as Express;
        const options = {
            key: '',
            cert: ''
        };

        createHttpsServer(app);
        expect(https.createServer).toBeCalled();
        expect(https.createServer).toBeCalledWith(options, app);

    });
});
