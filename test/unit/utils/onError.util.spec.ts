import { describe, beforeEach, afterEach, expect, test, jest } from '@jest/globals';

import { onError } from '../../../src/utils/onError';

const spyConsoleError = jest.spyOn(console, "error");
const spyConsoleProcess = jest.spyOn(process, "exit");
const spyExit = jest.spyOn(process, 'exit');

describe ("onError util tests", () => {

    beforeEach(() => {
        spyConsoleError.mockImplementation(() => {/**/});
        spyExit.mockImplementation(() => { return undefined as never });
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    test("should call console.error with the port and error code", async () => {

        const error = { syscall: 'listen', code: 'EACCES' };

        onError(error);
        expect(spyConsoleProcess).toBeCalledTimes(1);
        expect(spyExit).toBeCalledWith(1);

    })

});