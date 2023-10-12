import { describe, beforeEach, afterEach, expect, test, jest } from '@jest/globals';

import * as config from '../../../src/config'
import { onListening } from '../../../src/utils/onListening'

const spyConsoleLog = jest.spyOn(console, "log");

describe ("On listening test", () => {

    beforeEach(() => {
        spyConsoleLog.mockImplementation(() => {/**/});

    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    test("should log port and base URL", async () => {

    const listeningLog = `Listening on ${config.PORT}, from ${config.BASE_URL}`;    
    
    onListening();
    
    expect(spyConsoleLog).toBeCalledTimes(1);
    expect(spyConsoleLog).toHaveBeenCalledWith(listeningLog);


    })
})
