import { describe, beforeEach, afterEach, expect, test, jest } from '@jest/globals';

import { onError } from '../../../src/utils/onError';

import { MOCK_SERVER_ERROR } from '../../mock/text.mock';

const spyConsoleError = jest.spyOn(console, "error");
const spyProcessExit = jest.spyOn(process, "exit");

describe ("onError util tests", () => {

    beforeEach(() => {
        spyConsoleError.mockImplementation(() => {/**/});
        spyProcessExit.mockImplementation(() => { return undefined as never; });
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    test("should call console.error with the port and error code", () => {

        const error = { syscall: 'listen', code: 'EACCES' };

        onError(error);

        expect(spyConsoleError).toBeCalledTimes(1);
        expect(spyConsoleError).toBeCalledWith(MOCK_SERVER_ERROR);

        expect(spyProcessExit).toBeCalledTimes(1);
        expect(spyProcessExit).toBeCalledWith(1);

    });

    test("should throw error when sycall does not equal listen", () => {

        const error = { syscall: 'connect', code: 'EACCES' };

        expect(() => {
            onError(error);
        }).toThrow();

    });
    test("should throw error when invalid code is entered", () => {

        const error = { syscall: 'listen', code: 'BLA' };

        expect(() => {
            onError(error);
        }).toThrow();

    });

});
