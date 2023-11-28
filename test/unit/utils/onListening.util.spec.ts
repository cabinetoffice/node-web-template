import { describe, afterEach, expect, test, jest } from '@jest/globals';

import * as config from '../../../src/config';
import { log } from '../../../src/utils/logger';
import { onListening } from '../../../src/utils/onListening';

jest.mock('../../../src/utils/logger', () => ({
    log: {
        info: jest.fn()
    }
}));

describe('On listening test', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    test('should log port and base URL', () => {
        const listeningLog = `Listening on ${config.PORT}, from ${config.BASE_URL}`;

        onListening();

        expect(log.info).toBeCalledTimes(1);
        expect(log.info).toHaveBeenCalledWith(listeningLog);
    });
});
