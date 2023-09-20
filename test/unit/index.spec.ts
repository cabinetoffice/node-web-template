import { describe, expect, test } from '@jest/globals';

import { RESULT } from '../mock/data';

describe("Tests suites", () => {
    test('1 + 2 to equal 3', () => {
        expect(1 + 2).toBe(RESULT);
    });
});